import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
	return (
		<div className="featured-item bg-fixed pb-10 pt-6 text-white">
			<SectionTitle
				subHeading={"Check it out"}
				heading={"Featured item"}
			></SectionTitle>
			<div className="md:flex justify-center items-center p-4">
				<div>
					<img src={featuredImg} alt="" />
				</div>
				<div className="md:pl-10">
					<p>Sep 12, 2023</p>
					<p className="uppercase">Where can I get some?</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						A aliquam culpa voluptates eligendi. Vel, dolorem. Nihil
						obcaecati ea officiis itaque sed commodi sequi iste est
						odio, ducimus, soluta laboriosam, delectus quo vel quod
						tempora tempore? Nostrum, sit ea? Placeat nulla autem
						rerum aut iusto velit assumenda fugit atque iure quas!
					</p>
					<button className="btn btn-outline text-white border-0 border-b-4 mt-4">
						Order Now
					</button>
				</div>
			</div>
		</div>
	);
};

export default Featured;
