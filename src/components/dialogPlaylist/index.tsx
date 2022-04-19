import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
	open: boolean;
	handleClose(): void;
	playlist: {
		title: string;
		description: string;
	};
}

const DialogPlaylist = ({ open, handleClose, playlist }: Props) => {
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Playlist Has been Added"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Playlist titled "{playlist.title}" with description "
						{playlist.description}" has successfully been added to your spotify
						playlist.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} autoFocus>
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default DialogPlaylist;
