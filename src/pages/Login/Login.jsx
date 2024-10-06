import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import GoogleLogin from "../../components/Buttons/GoogleLogin";
import Swal from "sweetalert2";

const Login = () => {
	const { signIn } = useContext(AuthContext);
	const location = useLocation();
	const navigate = useNavigate();

	const from = location.state?.from?.pathname || "/";

	const handleLogin = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;
		signIn(email, password).then((res) => {
			const user = res.user;
			console.log("logged in user: ", user);
			Swal.fire({
				title: "User Login Successful.",
				showClass: {
					popup: "animate__animated animate__fadeInDown",
				},
				hideClass: {
					popup: "animate__animated animate__fadeOutUp",
				},
			});
			navigate(from, { replace: true });
		});
	};
	return (
		<div className="hero bg-base-200 min-h-screen">
			<div className="hero-content flex flex-col lg:flex-row-reverse">
				<div className="text-center lg:text-left">
					<h1 className="text-5xl font-bold">Login now!</h1>
					<p className="py-6">
						Provident cupiditate voluptatem et in. Quaerat fugiat ut
						assumenda excepturi exercitationem quasi. In deleniti
						eaque aut repudiandae et a id nisi.
					</p>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit. Quasi repellat, quisquam libero amet, facilis
						dolores inventore a odit odio obcaecati illum omnis
						tempora ad consectetur nulla iste qui nobis minus fuga
						maiores assumenda, recusandae dolorum! Iure, delectus
						magnam labore quae et veniam exercitationem illum cum
						voluptatum atque facere similique obcaecati molestiae
						suscipit perferendis eius doloremque esse aut dolorum.
						In quasi eius animi repellendus eos nihil quisquam.
						Placeat ipsum provident qui iure, vel pariatur culpa
						magnam cumque eos temporibus tempora molestiae sapiente
						officia ipsa eveniet sequi deleniti, sed hic fuga beatae
						quos vitae quam? Eaque tenetur placeat, veniam
						reiciendis est amet?
					</p>
				</div>
				<div className="card bg-base-100 w-2/5 shrink-0 shadow-2xl">
					<form onSubmit={handleLogin} className="card-body">
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
							<label className="label">
								<a
									href="#"
									className="label-text-alt link link-hover"
								>
									Forgot password?
								</a>
							</label>
						</div>
						<div className="form-control mt-6">
							<button className="btn btn-primary">Login</button>
						</div>
						<p className="">
							<small>
								New Here?
								<Link
									to="/signup"
									className="text-primary font-bold hover:underline"
								>
									{" "}
									Create Account
								</Link>
							</small>
						</p>
					</form>
					<div className="mb-4">
						<p className="text-center text-slate-400 relative -top-4">
							------------------ OR -------------------
						</p>
						<GoogleLogin className=" w-[120px]"></GoogleLogin>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
