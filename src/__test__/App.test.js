import { render, screen } from "@testing-library/react";
import Music from "../components/music";
import CreatePlaylist from "../pages/create-playlist";
import { testItems } from "./jsonData/tracks";
import { Provider } from "react-redux";
import store from "../core/redux/store";
import SearchBar from "../components/searchbar";
import userEvent from "@testing-library/user-event";
import { emptyTracks } from "./jsonData/emptyTracks";
import { server } from "../core/msw/server";
import SearchAPITest from "../components/searchAPITest";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders components in Create Playlist", () => {
	render(
		<Provider store={store}>
			<CreatePlaylist />
		</Provider>
	);
	const user = screen.getByText(/Hello,/i);
	const playlist = screen.getByText(/Create Playlist/i);
	const search = screen.getByText(/Search Tracks/i);
	expect(user).toBeInTheDocument();
	expect(playlist).toBeInTheDocument();
	expect(search).toBeInTheDocument();
});

test("tracks functionality", () => {
	render(<Music track={testItems} />);
	const image = screen.getByAltText(/album/i);
	const title = screen.getByText(/TEST DRIVE/i);
	const artist = screen.getByText(/Joji/i);
	const album = screen.getByText(/BALLADS 1/i);
	const duration = screen.getByText(/2:59/i);
	expect(image).toBeInTheDocument();
	expect(title).toBeInTheDocument();
	expect(artist).toBeInTheDocument();
	expect(album).toBeInTheDocument();
	expect(duration).toBeInTheDocument();
});

test("searchBar component", () => {
	const searchTrack = jest.fn();

	render(<SearchBar searchTrack={searchTrack} />);
	const input = screen.getByPlaceholderText("Search...");
	userEvent.type(input, "abc{enter}");

	expect(searchTrack).toHaveBeenCalled();
});

test("MSW Search API", async () => {
	render(<SearchAPITest />);
	userEvent.click(screen.getByText("search"));
	const checkSearch = await screen.findByText("TEST DRIVE");
	expect(checkSearch).toBeInTheDocument;
});
