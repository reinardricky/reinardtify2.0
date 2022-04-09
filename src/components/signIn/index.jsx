import { useEffect, useState } from "react";
import { login } from "../../redux/token-slice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./signIn.css";

function SignIn() {
	const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
	const REDIRECT_URI = "http://localhost:3000/home";
	const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
	const RESPONSE_TYPE = "token";
	const SCOPE = "playlist-modify-private";

	const dispatch = useDispatch();
	const [token, setToken] = useState("");

	useEffect(() => {
		var now = new Date().getTime();
		const hash = window.location.hash;
		let token = window.localStorage.getItem("token");

		if (!token && hash) {
			token = hash
				.substring(1)
				.split("&")
				.find(elem => elem.startsWith("access_token"))
				.split("=")[1];
			window.localStorage.setItem("setupTime", now);
		}
		window.location.hash = "";
		setToken(token);
		dispatch(login(token));
		window.localStorage.setItem("token", token);

		var setupTime = localStorage.getItem("setupTime");
		if (now - setupTime > 3600 * 1000) {
			window.localStorage.clear();
			dispatch(login(""));
		}
	}, [dispatch, token]);

	const logout = () => {
		setToken("");
		window.localStorage.setItem("token", "");
		dispatch(login(""));
	};
	return (
		<>
			{!token ? (
				<div className="login">
					<a
						href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
					>
						Login to Spotify
					</a>
				</div>
			) : (
				<Link to="/">
					<button className="logout" onClick={logout}>
						Logout
					</button>
				</Link>
			)}
		</>
	);
}

export default SignIn;
