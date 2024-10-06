import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import GoogleLogin from "../../components/Buttons/GoogleLogin";

const SignUp = () => {
	const { createUser, updateUserProfile } = useContext(AuthContext);
	const navigate = useNavigate();
	const axiosPublic = useAxiosPublic();

	const handleSignUp = (event) => {
		event.preventDefault();
		const form = event.target;
		const name = form.name.value;
		const email = form.email.value;
		const password = form.password.value;
		createUser(email, password).then((res) => {
			const user = res.user;
			console.log("register user:", user);
			updateUserProfile(name)
				.then(() => {
					const userInfo = {
						name,
						email,
					};
					axiosPublic.post("/users", userInfo).then((res) => {
						if (res.insertedId) {
							Swal.fire({
								position: "top-end",
								icon: "success",
								title: "Registration Successful",
								showConfirmButton: false,
								timer: 1500,
							});
							navigate("/");
						}
					});
				})
				.catch((err) => console.log("update user profile err: ", err));
		});
	};
	return (
		<div className="hero bg-base-200 min-h-screen">
			<div className="hero-content flex-col lg:flex-row-reverse">
				<div className="text-center lg:text-left">
					<h1 className="text-5xl font-bold">Sign Up now!</h1>
					<p className="py-6">
						Provident cupiditate voluptatem et in. Quaerat fugiat ut
						assumenda excepturi exercitationem quasi. In deleniti
						eaque aut repudiandae et a id nisi.
					</p>
				</div>
				<div className="card bg-base-100 w-2/5 shrink-0 shadow-2xl">
					<form onSubmit={handleSignUp} className="card-body">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Name</span>
							</label>
							<input
								type="text"
								name="name"
								placeholder="name"
								className="input input-bordered"
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								name="email"
								placeholder="email"
								className="input input-bordered"
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								name="password"
								placeholder="password"
								className="input input-bordered"
								required
							/>
						</div>
						<div className="form-control mt-6">
							<input
								type="submit"
								value="Create Account"
								className="btn btn-primary"
							/>
						</div>

						<p className="">
							<small>
								Already have an account?
								<Link
									to="/login"
									className="text-primary font-bold hover:underline"
								>
									{" "}
									Please Login
								</Link>
							</small>
						</p>
					</form>
					<div className="mb-4">
						<p className="text-center text-slate-400 relative -top-4" >------------------ OR -------------------</p>
						<GoogleLogin className=' w-[120px]'></GoogleLogin>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
