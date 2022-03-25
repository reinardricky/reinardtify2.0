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
				{data.map(feed => (
					<Music {...feed} />
				))}
			</Reinardtify>
		</div>
	);
}

export default App;
