import { useEffect, useState } from "react";
import axios from "axios";
import Music from "../../components/music";
import "./searchbar.css";

function Reinardtify({ children }) {
	const CLIENT_ID = "865b9e94d4c2418e8c6845065e5c0dbe";
	const REDIRECT_URI = "http://localhost:3000";
	const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
	const RESPONSE_TYPE = "token";
	const SCOPE = "playlist-modify-private";

	const [token, setToken] = useState("");
	const [searchKey, setSearchKey] = useState("");
	const [tracks, setTrack] = useState([]);

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
	}, []);

	const logout = () => {
		setToken("");
		window.localStorage.removeItem("token");
	};

	const searchTrack = async e => {
		e.preventDefault();
		const { data } = await axios.get("https://api.spotify.com/v1/search", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				q: searchKey,
				type: "track",
			},
		});

		setTrack(data.tracks.items);
	};

	return (
		<div className="music-list">
			<div className="container">
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
				{token ? (
					<>
						<h1>Search tracks</h1>
						<form className="searching" onSubmit={searchTrack}>
							<input
								id="search-bar"
								type="search"
								placeholder="Search..."
								onKeyPress={e =>
									e.key === "Enter" && setSearchKey(e.target.value)
								}
								required
							/>
							<i className="fa fa-search"></i>
						</form>
					</>
				) : (
					<h1>Please login to Search tracks</h1>
				)}

				{tracks.map(tracks => (
					<Music key={tracks.id} {...tracks} />
				))}
			</div>
		</div>
	);
}

export default Reinardtify;
