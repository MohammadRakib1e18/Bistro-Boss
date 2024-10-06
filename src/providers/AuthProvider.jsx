import { createContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const googleProvider = new GoogleAuthProvider();
	const axiosPublic = useAxiosPublic();

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const googleSignIn = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

	const updateUserProfile = (name) => {
		setLoading(true);
		return updateProfile(auth.currentUser, {
			displayName: name,
		});
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			if (currentUser) {
				// get token and store client
				const userInfo = { email: currentUser.email };
				axiosPublic.post("/jwt", userInfo).then((res) => {
					console.log("jwt called response: ", res.data);
					if (res.data.token) {
						localStorage.setItem("access-token", res.data.token);
						setLoading(false);
					}
				});
			} else {
				//TODO: remove token (if token stored in client side: Local storage, caching in memory)
				localStorage.removeItem("access-token");
				setLoading(false);
			}
		});
		return () => {
			return unsubscribe();
		};
	}, [axiosPublic]);

	const authInfo = {
		user,
		loading,
		signIn,
		googleSignIn,
		createUser,
		updateUserProfile,
		logOut,
		setUser,
		setLoading,
	};
	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
