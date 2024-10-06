import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Main></Main>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "/menu",
				element: <Menu></Menu>,
			},
			{
				path: "/order/:category",
				element: <Order></Order>,
			},
			{
				path: "/login",
				element: <Login></Login>,
			},
			{
				path: "/signup",
				element: <SignUp></SignUp>,
			},
		],
	},
	{
		path: "/dashboard",
		element: <Dashboard></Dashboard>,
		children: [
			// normal user routes
			{
				path: "/dashboard/cart",
				element: <Cart></Cart>,
			},
			{
				path: "/dashboard/userHome",
				element: <UserHome></UserHome>,
			},
			{
				path: "/dashboard/payment",
				element: <Payment></Payment>,
			},
			{
				path: "/dashboard/paymentHistory",
				element: <PaymentHistory></PaymentHistory>,
			},
			// admin only routes
			{
				path: "/dashboard/addItems",
				element: <AddItems></AddItems>,
			},
			{
				path: "/dashboard/adminHome",
				element: <AdminHome></AdminHome>,
			},
			{
				path: "/dashboard/manageItems",
				element: <ManageItems></ManageItems>,
			},
			{
				path: "/dashboard/updateItem/:id",
				element: <UpdateItem></UpdateItem>,
				loader: ({ params }) =>
					fetch(
						`https://bistro-boss-server-neon.vercel.app/menu/${params.id}`
					),
			},
			{
				path: "/dashboard/users",
				element: <AllUsers></AllUsers>,
			},
		],
	},
]);
