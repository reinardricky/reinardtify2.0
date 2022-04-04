import { useEffect, useState } from "react";
import { login } from "../../redux/token-slice";
import { useDispatch } from "react-redux";

function SignIn() {
	const CLIENT_ID = "865b9e94d4c2418e8c6845065e5c0dbe";
	const REDIRECT_URI = "http://localhost:3000";
	const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
	const RESPONSE_TYPE = "token";
	const SCOPE = "playlist-modify-private";

	const dispatch = useDispatch();
	const [token, setToken] = useState("");

	useEffect(() => {
		const hash = window.location.hash;
		let token = window.localStorage.getItem("token");

		if (!token && hash) {
			token = hash
				.substring(1)
				.split("&")
				.find(elem => elem.startsWith("access_token"))
				.split("=")[1];

			window.location.hash = "";
			window.localStorage.setItem("token", token);
		}

		setToken(token);
		dispatch(login(token));
	}, [dispatch]);

	const logout = () => {
		setToken("");
		window.localStorage.removeItem("token");
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
				<button className="logout" onClick={logout}>
					Logout
				</button>
			)}
		</>
	);
}

export default SignIn;
