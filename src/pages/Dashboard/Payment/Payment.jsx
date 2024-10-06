import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
// TODO: get the pk key from stripe
const stripePromise = loadStripe(
	import.meta.env.VITE_Stripe_Payment_Gateway_PK
);

const Payment = () => {
	return (
		<div>
			<SectionTitle
				heading="Payment"
				subHeading="Please pay to eat"
			></SectionTitle>
			<div className="lg:w-2/3 mx-auto">
				<Elements stripe={stripePromise}>
					<CheckoutForm></CheckoutForm>
				</Elements>
			</div>
		</div>
	);
};

export default Payment;
