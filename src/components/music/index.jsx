import "./music.css";
import { IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";

function millisToMinutesAndSeconds(millis) {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const Music = ({ track, onSelectedTrack, selectedList }) => {
	const { album, name, artists, duration_ms, isSelected } = track;

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
				<h3>{millisToMinutesAndSeconds(duration_ms)}</h3>
				<IconButton onClick={() => onSelectedTrack(track)} size="large">
					{isSelected || selectedList ? (
						<Tooltip title="Remove Selected Tracks" followCursor>
							<DoDisturbIcon />
						</Tooltip>
					) : (
						<Tooltip title="Add to Selected Tracks" followCursor>
							<AddIcon />
						</Tooltip>
					)}
				</IconButton>
			</div>
		</div>
	);
};

export default Music;
