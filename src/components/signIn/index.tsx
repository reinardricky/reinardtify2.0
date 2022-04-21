import { useEffect, useState, FC } from "react";
import { login } from "../../core/redux/token-slice";
import {
	addUserProfile,
	logOutUserProfile,
} from "../../core/redux/userProfile-slice";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";

const SignIn: FC = () => {
	const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
	const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_CALLBACK;
	const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
	const RESPONSE_TYPE = "token";
	const SCOPE = "playlist-modify-private";

	const dispatch = useDispatch();
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		var now = new Date().getTime();
		const hash = window.location.hash;
		let tokenLocal = window.localStorage.getItem("token");

		if (!token && hash) {
			tokenLocal = (
				hash
					.substring(1)
					.split("&")
					.find((elem: string) => elem.startsWith("access_token")) as string
			).split("=")[1];
			window.localStorage.setItem("setupTime", now.toString());
		}
		window.location.hash = "";
		setToken(tokenLocal);
		dispatch(login(tokenLocal));
		window.localStorage.setItem("token", String(tokenLocal));

		if (token) {
			axios
				.get("https://api.spotify.com/v1/me", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(function (response) {
					dispatch(addUserProfile(response.data));
				});
		}

		var setupTime = parseInt(String(localStorage.getItem("setupTime")));
		if (now - setupTime > 3600 * 1000) {
			window.localStorage.setItem("setupTime", now.toString());
			window.localStorage.setItem("token", "");
			dispatch(login(null));
			setToken(null);
		}
	}, [token, dispatch]);

	const logout = () => {
		setToken(null);
		window.localStorage.setItem("token", "");
		dispatch(login(null));
		dispatch(logOutUserProfile());
	};
	return (
		<>
			{!token ? (
				<Button
					style={{
						borderRadius: 10,
						backgroundColor: "#1ED760",
						color: "white",
						padding: "5px 15px",
						margin: "10px 10px",
						fontSize: "22px",
						fontWeight: 900,
					}}
					startIcon={<LoginIcon />}
					href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
				>
					Login to Spotify
				</Button>
			) : (
				<Button
					variant="contained"
					sx={{
						borderRadius: 1,
						backgroundColor: "#323031",
						color: "#bbd1ea",
						padding: "7px 20px",
						margin: "10px auto",
						fontSize: "22px",
						fontWeight: 900,
						"&:hover": {
							backgroundColor: "#323031",
						},
						"@media(max-width: 670px)": {
							fontSize: "15px",
						},
					}}
					onClick={logout}
					endIcon={<LogoutIcon />}
				>
					Logout
				</Button>
			)}
		</>
	);
};

export default SignIn;
