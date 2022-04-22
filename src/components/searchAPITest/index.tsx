import axios from "axios";
import { useState } from "react";

const SearchAPITest = () => {
	const [data, setData] = useState("");
	const handleSearch = async () => {
		const response = await axios.get(
			"https://api.spotify.com/v1/search?q=TEST&type=track"
		);
		setData(response.data.name);
		return response.data;
	};

	return (
		<div>
			<button onClick={() => handleSearch()}>search</button>
			{data}
		</div>
	);
};

export default SearchAPITest;
