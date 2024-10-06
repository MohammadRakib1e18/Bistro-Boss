import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
	const axiosSecure = useAxiosSecure();
	const { data: users = [], refetch } = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const res = await axiosSecure.get("/users");
			return res.data;
		},
	});
	const handleMakeAdmin = (user) => {
		axiosSecure.patch(`/users/admin/${user._id}`)
		.then(res => {
			if(res.data.modifiedCount>0){
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: `${user.name} is Admin now`,
					showConfirmButton: false,
					timer: 1500,
				});
				refetch();
			}
		})
	}
	const handleDeleteUser = (id) => {
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
				axiosSecure.delete(`/users/${id}`)
				.then((res) => {
					if (res.data.deletedCount > 0) {
						Swal.fire({
							title: "Deleted!",
							text: "The User has been deleted.",
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
				<h2 className="text-3xl">All Users</h2>
				<h2 className="text-3xl">Total Users: {users.length}</h2>
			</div>
			<div className="overflow-x-auto">
				<table className="table table-zebra">
					{/* head */}
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Email</th>
							<th className="pl-9">Role</th>
							<th className="pl-8">Action</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, idx) => (
							<tr key={user._id}>
								<td>{idx + 1}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>
									{user.roll === "admin" ? (
										"Admin"
									) : (
										<button
											onClick={() =>
												handleMakeAdmin(user)
											}
											className=" btn btn-lg bg-orange-500"
										>
											<FaUsers className="text-white text-2xl"></FaUsers>
										</button>
									)}
								</td>
								<td>
									<button
										onClick={() =>
											handleDeleteUser(user._id)
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

export default AllUsers;
