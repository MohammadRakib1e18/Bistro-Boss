import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
	const { name, image, price, recipe, _id } = item;
	const { user } = useAuth();
	const [, refetch] = useCart();
	const navigate = useNavigate();
	const location = useLocation();
	const axiosSecure = useAxiosSecure();

	const handleAddToCart = () => {
		if (user && user.email) {
			const cartItem = {
				menuId: _id,
				email: user.email,
				name,
				image,
				price,
			};
			axiosSecure.post("/carts", cartItem).then((res) => {
				console.log("added res: ", res.data);
				if (res.data.insertedId) {
					Swal.fire({
						position: "top-end",
						icon: "success",
						title: `${name} added to your cart`,
						showConfirmButton: false,
						timer: 1500,
					});
					refetch();
				}
			});
		} else {
			Swal.fire({
				title: "You aren't Logged In",
				text: "Please, login to add to the cart",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, login!",
			}).then((result) => {
				if (result.isConfirmed) {
					navigate("/login", { state: { from: location } });
				}
			});
		}
	};
	return (
		<div className="card bg-base-100 w-96 shadow-xl mx-auto">
			<figure>
				<img src={image} alt="Shoes" />
			</figure>
			<p className="absolute top-8 right-8 bg-black text-white ">
				{price}
			</p>
			<div className="card-body flex flex-col items-center">
				<h2 className="card-title">{name}</h2>
				<p>{recipe}</p>
				<div className="card-actions justify-end">
					<button
						onClick={handleAddToCart}
						className="btn btn-primary"
					>
						Add to Card
					</button>
				</div>
			</div>
		</div>
	);
};

export default FoodCard;
