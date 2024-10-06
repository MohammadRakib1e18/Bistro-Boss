import { NavLink, Outlet } from "react-router-dom";
import {
	FaAd,
	FaBook,
	FaCalendar,
	FaHome,
	FaList,
	FaSearch,
	FaShoppingCart,
	FaUsers,
	FaUtensils,
} from "react-icons/fa";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
	const [cart] = useCart();

	//TODO: get isAdmin value form the database.
	const [isAdmin] = useAdmin();
	return (
		<div className="flex">
			<div className="min-h-screen w-64 bg-orange-400">
				<ul className="menu p-4">
					{isAdmin ? (
						<>
							<li>
								<NavLink to="/dashboard/adminHome">
									<FaHome></FaHome>
									Admin Home
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/addItems">
									<FaUtensils></FaUtensils>
									Add Items
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/manageItems">
									<FaList></FaList>
									Manage Items
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/bookings">
									<FaBook></FaBook>
									Manage Bookings
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/users">
									<FaUsers></FaUsers>
									All Users
								</NavLink>
							</li>
						</>
					) : (
						<>
							<li>
								<NavLink to="/dashboard/userHome">
									<FaHome></FaHome>
									User Home
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/reservation">
									<FaCalendar></FaCalendar>
									Reservation
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/cart">
									<FaShoppingCart></FaShoppingCart>
									My Cart ({cart.length})
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/review">
									<FaAd></FaAd>
									Add a Review
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/paymentHistory">
									<FaList></FaList>
									Payment History
								</NavLink>
							</li>
						</>
					)}
					<div className="divider"></div>
					{/* shared nav links */}
					<li>
						<NavLink to="/">
							<FaHome></FaHome>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to="/order/salad">
							<FaSearch></FaSearch>
							Menu
						</NavLink>
					</li>
				</ul>
			</div>
			<div className="flex-1 p-8">
				<Outlet></Outlet>
			</div>
		</div>
	);
};

export default Dashboard;
