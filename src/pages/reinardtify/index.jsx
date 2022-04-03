import { useEffect, useState } from "react";
import axios from "axios";
import Playlist from "../../components/playlist";
import SearchBar from "../../components/searchbar";
import MusicItem from "../../components/music/musicItem";
import "../../components/music/music.css";

function Reinardtify() {
	const CLIENT_ID = "865b9e94d4c2418e8c6845065e5c0dbe";
	const REDIRECT_URI = "http://localhost:3000";
	const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
	const RESPONSE_TYPE = "token";
	const SCOPE = "playlist-modify-private";

	const [token, setToken] = useState("");
	const [searchKey, setSearchKey] = useState("");
	const [tracks, setTrack] = useState([]);
	const [playlist, setPlaylist] = useState({
		title: "",
		description: "",
	});

	const [selectedTracks, setSelectedTracks] = useState([]);
	const [combinedTracks, setCombinedTracks] = useState([]);

	const handleSelectedTrack = track => {
		const alreadySelected = selectedTracks.find(t => t.uri === track.uri);
		alreadySelected
			? setSelectedTracks(selectedTracks.filter(t => t.uri !== track.uri))
			: setSelectedTracks(selectedTracks => [...selectedTracks, track]);
	};

	useEffect(
		e => {
			const combinedTrackWithSelectedTrack = tracks.map(track => ({
				...track,
				isSelected: selectedTracks.find(t => t.uri === track.uri),
			}));
			setCombinedTracks(combinedTrackWithSelectedTrack);
		},
		[selectedTracks, tracks]
	);

	const renderPlayListItems = () =>
		combinedTracks.map(item => {
			const { uri } = item;
			return (
				<MusicItem
					key={uri}
					track={item}
					onSelectedTrack={handleSelectedTrack}
				/>
			);
		});

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

	const playlistAdd = async e => {
		e.preventDefault();
		const uris = selectedTracks.map(item => item.uri);
		console.log(uris);
		axios
			.get("https://api.spotify.com/v1/me", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(function (response) {
				console.log(response);
				axios
					.post(
						`https://api.spotify.com/v1/users/${response.data.id}/playlists`,
						{
							name: playlist.title,
							description: playlist.description,
							public: false,
						},
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					)
					.then(function (response) {
						axios.post(
							`https://api.spotify.com/v1/playlists/${response.data.id}/tracks`,
							{ uris: uris },
							{
								headers: {
									Authorization: `Bearer ${token}`,
								},
							}
						);
						alert("Playlist Added");
					});
			});
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

	const handleSearchChange = e => {
		setSearchKey(e.target.value);
	};

	const handlePlaylistChange = e => {
		const { name, value } = e.target;
		setPlaylist({ ...playlist, [name]: value });
	};

	return (
		<>
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
							<Playlist
								playlist={playlist}
								handleChange={handlePlaylistChange}
								handleSubmit={playlistAdd}
							/>
							<h1>Search tracks</h1>

							<SearchBar
								searchTrack={searchTrack}
								handleSearchChange={handleSearchChange}
							/>
						</>
					) : (
						<h1>Please login to Search tracks and Create playlist</h1>
					)}
					{renderPlayListItems()}
				</div>
			</div>
		</>
	);
}

export default Reinardtify;
