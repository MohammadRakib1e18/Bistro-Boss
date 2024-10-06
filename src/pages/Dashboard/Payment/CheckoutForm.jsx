import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "../../../components/Buttons/Button";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = () => {
	const [error, setError] = useState("");
	const [transactionId, setTransactionId] = useState("");
	const [clientSecret, setClientSecret] = useState("");
	const stripe = useStripe();
	const elements = useElements();
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const [cart, refetch] = useCart();
	const totalPrice = cart.reduce((total, item) => total + item.price, 0);

	useEffect(() => {
		if(totalPrice > 0){
			axiosSecure
				.post("/create-payment-intent", { price: totalPrice })
				.then((res) => {
					console.log(res.data.clientSecret);
					setClientSecret(res.data.clientSecret);
				});
		}
	}, [axiosSecure, totalPrice]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		const card = elements.getElement(CardElement);
		if (card == null) {
			return;
		}
		// Use your card Element with other Stripe.js APIs
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card,
		});

		if (error) {
			console.log("[error]", error);
			setError(error.message);
		} else {
			console.log("[PaymentMethod]", paymentMethod);
			setError("");
		}
		const { paymentIntent, error: confirmError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						email: user?.email || "anonymous",
						name: user?.displayName || "anonymous",
					},
				},
			});

		if (confirmError) {
			console.log("confirm error");
		} else {
			console.log("payment intent", paymentIntent);
			if (paymentIntent.status === "succeeded") {
				setTransactionId(paymentIntent.id);
				// now save the payment in the database
				const payment = {
					email: user.email,
					price: totalPrice,
					transactionId: paymentIntent.id,
					date: new Date(), // utc date convert, use moment js to
					cartId: cart.map((item) => item._id),
					menuItemId: cart.map((item) => item.menuId),
					status: "pending",
				};

				const res = await axiosSecure.post("/payments", payment);
				console.log("payment saved: ", res.data);
				refetch();
				if(res.data?.paymentResult?.insertedId){
					Swal.fire({
						position: "top-end",
						icon: "success",
						title: 'Thank you for the payment',
						showConfirmButton: false,
						timer: 1500,
					});
				}
			}
		}
	};
	return (
		<form
			className="bg-[#9b99971e] shadow-lg rounded-lg p-4"
			onSubmit={handleSubmit}
		>
			<CardElement
				className="bg-[#fcfcfc]  p-6 rounded-md"
				options={{
					style: {
						base: {
							fontSize: "18px",
							color: "#424770",
							"::placeholder": {
								color: "#aab7c4",
							},
						},
						invalid: {
							color: "#9e2146",
						},
					},
				}}
			/>

			<Button
				className="py-2 w-full text-white mt-5 rounded-md"
				type="submit"
				disabled={!stripe || !clientSecret}
			>
				Pay
			</Button>
			<p className="text-red-600">{error}</p>
			{transactionId && (
				<p className="mt-2">
					Transaction ID:{" "}
					<span className="text-green-600 font-bold italic">
						{transactionId}
					</span>
				</p>
			)}
		</form>
	);
};

export default CheckoutForm;
