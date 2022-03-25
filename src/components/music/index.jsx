function Music({ image, name, artists, album }) {
	return (
		<div className="music">
			<img src={album.images[0].url} alt="album" />
			<h2>{name}</h2>
			<h3>{artists[0].name}</h3>
			<h4>{album.name}</h4>
			<button className="select">Select</button>
		</div>
	);
}

export default Music;
