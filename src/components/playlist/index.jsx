import "./playlist.css";

function Playlist({ playlist, handleChange, handleSubmit }) {
	return (
		<>
			<h1>Create Playlist</h1>
			<div className="playlist">
				<form onSubmit={handleSubmit}>
					<h2>Title</h2>
					<input
						type="text"
						className="playlist-title"
						placeholder="Insert Playlist Title"
						name="title"
						minLength={10}
						value={playlist.title}
						onChange={handleChange}
					/>
					<h3>minimum 10 characters</h3>
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
		</>
	);
}

export default Playlist;
