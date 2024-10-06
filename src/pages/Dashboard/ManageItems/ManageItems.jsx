import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
	const [menu, , refetch] = useMenu();
	const axiosSecure = useAxiosSecure();
	const handleDeleteItem = (id) => {
		Swal.fire({
			title: "Are you sure to Delete?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const res = await axiosSecure.delete(`/menu/${id}`);
				console.log('delete res: ', res);
				if (res.data.deletedCount > 0) {
					refetch();
					Swal.fire({
						title: "Deleted!",
						text: "Delete successful",
						icon: "success",
					});
				}
			}
		});
	};
	return (
		<div>
			<SectionTitle
				heading="Manage All Items"
				subHeading={"Hurry up"}
			></SectionTitle>
			<div className="overflow-x-auto">
				<table className="table w-full">
					{/* head */}
					<thead>
						<tr>
							<th>#</th>
							<th>Image</th>
							<th>Name</th>
							<th>Price</th>
							<th className="pl-9">Edit</th>
							<th className="pl-8">Delete</th>
						</tr>
					</thead>
					<tbody>
						{menu.map((item, idx) => (
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
									<Link to={`/dashboard/updateItem/${item._id}`}>
										<button className="btn btn-ghost bg-orange-500 btn-lg">
											<FaEdit className="text-white"></FaEdit>
										</button>
									</Link>
								</td>
								<td>
									<button
										onClick={() =>
											handleDeleteItem(item._id)
										}
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

export default ManageItems;
