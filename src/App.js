import "./App.css";
import Reinardtify from "./pages/reinardtify";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<header>
				<h1>Reinardtify</h1>
			</header>
			<Provider store={store}>
				<Router>
					<Reinardtify />
				</Router>
			</Provider>
		</div>
	);
}

export default App;
