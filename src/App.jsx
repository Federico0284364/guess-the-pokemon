import { useState, useContext } from "react";
import MainMenu from "./components/MainMenu";
import PokemonGame from "./components/PokemonGame.jsx";
import DifficultyContextProvider from "./context/difficulty.jsx";
import "./App.css";
import { WindowSizeContext } from "./context/window-size.jsx";
import WindowSizeContextProvider from "./context/window-size.jsx";

function selectGame(gameName) {
	const { windowSize, device } = useContext(WindowSizeContext);
	const selectedGame = games.forEach((game) => {
		if (game.name === gameName) {
			return game;
		}

		return selectedGame;
	});
}

function App() {
	const [mainState, setMainState] = useState("main-menu");

	function handleStartGame() {
		setMainState('playing');
	}

	function handleGoToMenu(){
		setMainState('main-menu');
	}

	return (
		<WindowSizeContextProvider>
			<DifficultyContextProvider>
				<main>
					{mainState === "main-menu" && (
						<MainMenu startGame={handleStartGame} />
					)}
					{mainState === "playing" && <PokemonGame goToMenu={handleGoToMenu}/>}
				</main>
			</DifficultyContextProvider>
		</WindowSizeContextProvider>
	);
}

export default App;
