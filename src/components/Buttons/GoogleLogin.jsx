import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const   GoogleLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

	const handleGoogleSignIn = () => {
		googleSignIn().
        then(res => {
            const userInfo = {
                name: res.user?.displayName,
                email: res.user?.email,
            }
            axiosPublic.post('/users', userInfo)
            .then((res) => {
                if(!res.insertedId){
                    Swal.fire({
						title: "Already Registered!",
						text: "Try with different email",
						icon: "error",
					});
                }
                else navigate('/');
            })
        });
	};
	return (
		<button onClick={handleGoogleSignIn} className="w-full px-4 py-2  border flex justify-center gap-2 border-slate-200  rounded-lg text-slate-700  hover:border-slate-400  hover:text-slate-900 hover:shadow transition duration-150">
			<img
				className="w-6 h-6"
				src="https://www.svgrepo.com/show/475656/google-color.svg"
				loading="lazy"
				alt="google logo"
			/>
			<span>Google</span>
		</button>
	);
};

export default GoogleLogin;
