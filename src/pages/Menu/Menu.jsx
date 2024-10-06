import Cover from "../Shared/Cover/Cover";
import menuImg from "../../assets/menu/banner3.jpg";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import soupImg from "../../assets/menu/soup-bg.jpg";
import pizzaImg from "../../assets/menu/pizza-bg.jpg";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useMenu from "../../hooks/useMenu";
import MenuCategory from "./MenuCategory";

const Menu = () => {
	const [menu] = useMenu();
	const dessert = menu.filter((item) => item.category === "dessert");
	const soup = menu.filter((item) => item.category === "soup");
	const salad = menu.filter((item) => item.category === "salad");
	const pizza = menu.filter((item) => item.category === "pizza");
	const offered = menu.filter((item) => item.category === "offered");
	return (
		<div>
			<Cover img={menuImg} title="our menu"></Cover>
			<SectionTitle
				subHeading="Don't Miss"
				heading="Today's offer"
			></SectionTitle>
			<MenuCategory items={offered}></MenuCategory>
			<MenuCategory
				items={dessert}
				title="dessert"
				img={dessertImg}
			></MenuCategory>
			<MenuCategory
				items={salad}
				title="salad"
				img={saladImg}
			></MenuCategory>
			<MenuCategory
				items={soup}
				title="soup"
				img={soupImg}
			></MenuCategory>
			<MenuCategory
				items={pizza}
				title="pizza"
				img={pizzaImg}
			></MenuCategory>
		</div>
	);
};
export default Menu;
