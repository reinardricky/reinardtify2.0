import "./playlist.css";

function Playlist({ playlist, handleChange, handleSubmit }) {
	return (
		<div className="addPlaylist">
			<div className="container">
				<h1>Create Playlist</h1>
				<div className="playlist">
					<form onSubmit={handleSubmit}>
						<h2>Title</h2>
						<input
							type="text"
							className="playlist-title"
							placeholder="Insert Playlist Title"
							name="title"
							value={playlist.title}
							onChange={handleChange}
						/>
						<h2>Description</h2>
						<input
							type="text"
							className="playlist-desc"
							placeholder="Insert Playlist Description"
							name="description"
							value={playlist.description}
							onChange={handleChange}
						/>
						<br />
						<input type="submit" className="submit" value="Add Playlist" />
					</form>
				</div>
			</div>
		</div>
	);
}

export default Playlist;
