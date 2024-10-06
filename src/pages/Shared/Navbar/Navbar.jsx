import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useCart from "../../../hooks/useCart";
import Button from "../../../components/Buttons/Button";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {
	const { logOut, user } = useContext(AuthContext);
	const [isAdmin] = useAdmin();
	const [cart] = useCart();
	const location = useLocation();

	const handleLogOut = () => {
		logOut()
			.then(() => {})
			.catch((error) => console.log(error));
	};

	const isActive = (path) => location.pathname === path;

	const navOptions = (
		<>
			<li>
				<Link to="/" className={isActive("/") ? "active" : "inActive"}>
					Home
				</Link>
			</li>
			<li>
				<Link
					to="/menu"
					className={isActive("/menu") ? "active" : "inActive"}
				>
					Menu
				</Link>
			</li>
			<li>
				<Link
					to="/order/salad"
					className={isActive("/order/salad") ? "active" : "inActive"}
				>
					Order Food
				</Link>
			</li>
			{user && isAdmin && (
				<li>
					<Link to="/dashboard/adminHome">Dashboard</Link>
				</li>
			)}
			{user && !isAdmin && (
				<li>
					<Link to="/dashboard/userHome">Dashboard</Link>
				</li>
			)}
			<li>
				<Link to="/dashboard/cart" className="btn">
					<span className="text-xl">
						<FaShoppingCart />
					</span>
					<div className="badge badge-secondary ml-2">
						+{cart.length}
					</div>
				</Link>
			</li>
		</>
	);
	return (
		<div>
			<div className="navbar backdrop-blur-md fixed max-w-screen-2xl z-10 bg-opacity-50 bg-black text-white">
				<div className="navbar-start">
					<div className="dropdown">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost lg:hidden"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
						>
							{navOptions}
						</ul>
					</div>
					<a className="btn btn-ghost text-xl">Bistro Boss</a>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal px-1 items-center">
						{navOptions}
					</ul>
				</div>
				<div className="navbar-end">
					{user ? (
						<Button onClick={handleLogOut}>Log out</Button>
					) : (
						<>
							<Link to="/login">
								<Button>Login</Button>
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
