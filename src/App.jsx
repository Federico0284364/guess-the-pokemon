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

	function handleStartGame(gameName) {
		setMainState(gameName);
	}

	return (
		<WindowSizeContextProvider>
			<DifficultyContextProvider>
				<main className="flex flex-col">
					{mainState === "main-menu" && (
						<MainMenu startGame={handleStartGame} />
					)}
					{mainState === "pokemon" && <PokemonGame />}
				</main>
			</DifficultyContextProvider>
		</WindowSizeContextProvider>
	);
}

export default App;
