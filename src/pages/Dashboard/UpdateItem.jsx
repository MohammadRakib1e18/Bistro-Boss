import { useForm } from "react-hook-form";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
	const { name, category, price, recipe, _id } = useLoaderData();
	const { register, handleSubmit, reset } = useForm();
	const axiosPublic = useAxiosPublic();
	const axiosSecure = useAxiosSecure();
	const onSubmit = async (data) => {
		console.log(data);
		const imageFile = { image: data.image[0] };
		const res = await axiosPublic.post(image_hosting_api, imageFile, {
			headers: { "content-type": "multipart/form-data" },
		});
		console.log(res.data);
		if (res.data?.success) {
			const menuItem = {
				name: data.name,
				category: data.category,
				price: parseFloat(data.price),
				recipe: data.recipe,
				image: res.data.data.display_url,
			};
			const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
			if (menuRes.data.modifiedCount>0) {
				// show success popup
				reset();
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: `${data.name} is updated to the menu`,
					showConfirmButton: false,
					timer: 1500,
				});
			}
		}
	};
	return (
		<div>
			<SectionTitle
				heading="Update an Item"
				subHeading="Refresh info"
			></SectionTitle>
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-control w-full my-6">
						<label className="label">
							<span className="label-text">Recipe Name*</span>
						</label>
						<input
							{...register("name", { required: true })}
							required
							defaultValue={name}
							type="text"
							placeholder="Recipe Name"
							className="input input-bordered w-full"
						/>
					</div>
					<div className="flex gap-x-6">
						{/* category */}
						<div className="form-control w-full my-6">
							<label className="label">
								<span className="label-text">Category</span>
							</label>
							<select
								defaultValue={category}
								{...register("category", { required: true })}
								className="select select-bordered w-full"
							>
								<option disabled value="default">
									Select a category
								</option>
								<option value="salad">Salad</option>
								<option value="pizza">Pizza</option>
								<option value="soup">Soup</option>
								<option value="dessert">Dessert</option>
								<option value="drinks">Drinks</option>
							</select>
						</div>
						{/* price */}
						<div className="form-control w-full my-6">
							<label className="label">
								<span className="label-text">Price*</span>
							</label>
							<input
								{...register("price", { required: true })}
								defaultValue={price}
								type="number"
								placeholder="Price"
								className="input input-bordered w-full"
							/>
						</div>
					</div>
					<label className="form-control">
						<div className="label">
							<span className="label-text">Recipe Details</span>
						</div>
						<textarea
							{...register("recipe", { required: true })}
							defaultValue={recipe}
							className="textarea textarea-bordered h-24"
							placeholder="Recipe Details"
						></textarea>
					</label>
					<div className="form-control w-full my-6">
						<input
							type="file"
							{...register("image", { required: true })}
							className="file-input w-full max-w-xs"
						/>
					</div>

					<button className="btn bg-slate-700 text-slate-50 uppercase">
						Update menu Item
					</button>
				</form>
			</div>
		</div>
	);
};

export default UpdateItem;
