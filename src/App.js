import "./App.css";
import data from "./data/songData";
import Reinardtify from "./pages/reinardtify";
import Music from "./components/music";

function App() {
	return (
		<div className="App">
			<header>
				<h1>Reinardtify</h1>
			</header>
			<Reinardtify>
				<Music
					image={data.album.images[0].url}
					name={data.name}
					artist={data.artists[0].name}
					album={data.album.name}
				/>
			</Reinardtify>
		</div>
	);
}

export default App;
