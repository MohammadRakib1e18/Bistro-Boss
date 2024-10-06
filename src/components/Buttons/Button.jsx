
const Button = ({onClick, className, children, ...rest}) => {
    return (
		<button
			onClick={onClick}
			className={`bg-[#f88f2ce0] text-[#b91818e1] border-2 border-[#b9181848] rounded-full w-[120px] py-1 font-bold ${className}`}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;