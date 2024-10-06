import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";

const Main = () => {
	const location = useLocation();
	const pathName = location.pathname;
	const noHeaderFooter = pathName.includes("login")|| pathName.includes("signup");
	return (
		<div>
			{noHeaderFooter || <Navbar></Navbar>}
			<Outlet></Outlet>
			{noHeaderFooter || <Footer></Footer>}
		</div>
	);
};

export default Main;
