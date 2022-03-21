import "./App.css";
import data from "./data";

function App() {
	return (
		<div className="App">
			<header>
				<h1>Reinardtify</h1>
			</header>
			<div className="music-list">
				<div className="container">
					<div className="music">
						<img src={data.album.images[0].url} alt="album" />
						<h2>{data.name}</h2>
						<h3>{data.artists[0].name}</h3>
						<h4>{data.album.name}</h4>
						<button className="select">Select</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
