import SignIn from "../../components/signIn";
import "./home.css";

function Home() {
	return (
		<>
			<SignIn />
			<h1 className="home-login">
				Please login to Search tracks and Create playlist
			</h1>
			<div className="home-grid">
				<div className="home-row home-left">
					<h2>Hello Welcome to Reinardtify !</h2>
				</div>
				<div className="home-row home-right">
					<h2>What is Reinardtify ?</h2>
				</div>
				<div className="home-row home-left">
					<h2>
						Reinardtify is a Web App to create your desired playlist in spotify
						!
					</h2>
				</div>
				<div className="home-row home-right">
					<h2>Wow cool, How do I use it ?</h2>
				</div>
				<div className="home-row home-left">
					<h2>
						Easy, just click the login to spotify button then you can search and
						select the tracks you want to insert to your playlist
					</h2>
				</div>
				<div className="home-row home-left">
					<h2>
						After you finish picking your songs, just type the title and the
						description of your playlist and click add playlist
					</h2>
				</div>
			</div>
		</>
	);
}
export default Home;
