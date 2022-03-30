import React, { useState, useEffect } from "react";

function Music({ name, artists, album, uri }) {
	const [buttonText, setButtonText] = useState("Select");
	const changeText = text => setButtonText(text);

	useEffect(() => {
		const saved = localStorage.getItem(`${uri}`);
		if (saved === "selected") {
			changeText("Deselect");
		}
	});

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
				<button
					className="select"
					onClick={() => {
						if (buttonText === "Select") {
							changeText("Deselect");
							localStorage.setItem(`${uri}`, "selected");
						} else {
							changeText("Select");
							localStorage.setItem(`${uri}`, "");
						}
					}}
				>
					{buttonText}
				</button>
			</div>
		</div>
	);
}

export default Music;
