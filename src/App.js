import "./App.css";
import Reinardtify from "./pages/reinardtify";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
	return (
		<div className="App">
			<header>
				<h1>Reinardtify</h1>
			</header>
			<Provider store={store}>
				<Reinardtify />
			</Provider>
		</div>
	);
}

export default App;
