const MusicItem = ({ track, onSelectedTrack }) => {
	const { album, name, artists, isSelected } = track;
	return (
		<div className="music">
			<div className="music-left">
				<img src={album.images[0].url} alt="album" />
				<div className="music-name">
					<h2>{name}</h2>
					<h3>{artists[0].name}</h3>
					<h4>{album.name}</h4>
				</div>
			</div>

			<div className="select-align">
				<button className="select" onClick={() => onSelectedTrack(track)}>
					{" "}
					{isSelected ? "Deselect" : "Select"}
				</button>
			</div>
		</div>
	);
};

export default MusicItem;
