import { FaTrashAlt } from "react-icons/fa";
import Button from "../../../components/Buttons/Button";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const Cart = () => {
	const [cart, refetch] = useCart();
	const totalPrice = cart.reduce((total, item) => total + item.price, 0);
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	console.log("card current user: ", user);

	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure to Delete?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				axiosSecure.delete(`/carts/${id}`).then((res) => {
					if (res.data.deletedCount > 0) {
						Swal.fire({
							title: "Deleted!",
							text: "Your Order has been deleted.",
							icon: "success",
						});
						refetch();
					}
				});
			}
		});
	};
	return (
		<div>
			<div className="flex justify-between mb-8 ">
				<h2 className="text-3xl">Items: {cart.length}</h2>
				<h2 className="text-3xl">Total Price: {totalPrice}</h2>
				{cart.length > 0 ? (
					<Link to="/dashboard/payment">
						<Button>Pay</Button>
					</Link>
				) : (
					<Button disabled={true}>Pay</Button>
				)}
			</div>
			<div className="overflow-x-auto">
				<table className="table w-full">
					{/* head */}
					<thead>
						<tr>
							<th>#</th>
							<th>Image</th>
							<th>Name</th>
							<th>Price</th>
							<th className="pl-8">Action</th>
						</tr>
					</thead>
					<tbody>
						{cart.map((item, idx) => (
							<tr key={item._id}>
								<td>{idx + 1}</td>
								<td>
									<div className="avatar">
										<div className="mask mask-squircle h-12 w-12">
											<img
												src={item.image}
												alt="Avatar"
											/>
										</div>
									</div>
								</td>
								<td>{item.name}</td>
								<td>{item.price}</td>
								<td>
									<button
										onClick={() => handleDelete(item._id)}
										className="btn btn-ghost btn-lg"
									>
										<FaTrashAlt className="text-red-500"></FaTrashAlt>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}; 

export default Cart;
