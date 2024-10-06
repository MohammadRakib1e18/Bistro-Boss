import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Category = () => {
	return (
		<section>
			<SectionTitle
				subHeading={"From 11:00am to 10:00pm"}
				heading={"ORDER ONLINE"}
			></SectionTitle>
			<Swiper
				slidesPerView={3.2}
				spaceBetween={10}
				centeredSlides={true}
				pagination={{
					clickable: true,
				}}
				modules={[Pagination]}
				className="mySwiper my-8 border border-indigo-100"
			>
				<SwiperSlide>
					<img src={slide1} alt="" />
					<h3 className="text-4xl uppercase text-white text-center -mt-16 relative -left-[100px]">
						Salad
					</h3>
				</SwiperSlide>
				<SwiperSlide>
					<img src={slide2} alt="" />
					<h3 className="text-4xl uppercase text-white text-center -mt-16 relative -left-[100px]">
						Salad
					</h3>
				</SwiperSlide>
				<SwiperSlide>
					<img src={slide3} alt="" />
					<h3 className="text-4xl uppercase text-white text-center -mt-16 relative -left-[100px]">
						Salad
					</h3>
				</SwiperSlide>
				<SwiperSlide>
					<img src={slide4} alt="" />
					<h3 className="text-4xl uppercase text-white text-center -mt-16 relative -left-[100px]">
						Salad
					</h3>
				</SwiperSlide>
				<SwiperSlide>
					<img src={slide5} alt="" />
					<h3 className="text-4xl uppercase text-white text-center -mt-16 relative -left-[100px]">
						Salad
					</h3>
				</SwiperSlide>
			</Swiper>
		</section>
	);
};

export default Category;
