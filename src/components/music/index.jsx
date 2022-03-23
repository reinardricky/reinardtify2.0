function Music({ image, name, artist, album }) {
	return (
		<div className="music">
			<img src={image} alt="album" />
			<h2>{name}</h2>
			<h3>{artist}</h3>
			<h4>{album}</h4>
			<button className="select">Select</button>
		</div>
	);
}

export default Music;
