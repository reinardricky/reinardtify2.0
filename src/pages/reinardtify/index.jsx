import { useEffect, useState } from "react";
import axios from "axios";
import Playlist from "../../components/playlist";
import SearchBar from "../../components/searchbar";
import MusicItem from "../../components/music/musicItem";
import "../../components/music/music.css";
import SignIn from "../../components/signIn";
import { useSelector } from "react-redux";

function Reinardtify() {
	const token = useSelector(state => state.token.value);

	const [searchKey, setSearchKey] = useState("");
	const [tracks, setTrack] = useState([]);
	const [playlist, setPlaylist] = useState({
		title: "",
		description: "",
	});

	const [selectedTracks, setSelectedTracks] = useState([]);
	const [combinedTracks, setCombinedTracks] = useState([]);

	const HeaderToken = () => {
		return {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
	};

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

	const renderSearchItems = () =>
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

	const playlistAdd = async e => {
		e.preventDefault();
		console.log(selectedTracks);
		const uris = selectedTracks.map(item => item.uri);
		console.log(uris);
		axios
			.get("https://api.spotify.com/v1/me", HeaderToken())
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
						HeaderToken()
					)
					.then(function (response) {
						axios.post(
							`https://api.spotify.com/v1/playlists/${response.data.id}/tracks`,
							{ uris: uris },
							HeaderToken()
						);
						alert("Playlist Added");
					});
			});
	};

	const searchTrack = async e => {
		e.preventDefault();
		const { data } = await axios.get(
			"https://api.spotify.com/v1/search",
			{
				params: {
					q: searchKey,
					type: "track",
				},
			},
			HeaderToken()
		);

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
					<SignIn />
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
							{renderSearchItems()}
						</>
					) : (
						<h1>Please login to Search tracks and Create playlist</h1>
					)}
				</div>
			</div>
		</>
	);
}

export default Reinardtify;
