
const SectionTitle = ({heading, subHeading}) => {
    return (
		<div className="mx-auto md:w-6/12 my-8 text-center">
			<p className="text-[#e0ac32] mb-2 italic">---{subHeading}---</p>
			<h3 className="text-4xl uppercase border-y-4 py-4 ">{heading}</h3>
		</div>
	);
};

export default SectionTitle;