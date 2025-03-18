import { useState } from "react";
import MainMenu from "./components/MainMenu";
import PokemonGame from "./components/PokemonGame.jsx";
import DifficultyContextProvider from "./context/difficulty.jsx";
import "./App.css";

function selectGame(gameName){
	const selectedGame = games.forEach((game) => {
		if (game.name === gameName){
			return game;
		}

		return selectedGame;
	})
}

function App() {
	const [mainState, setMainState] = useState("main-menu");

	function handleStartGame(gameName){
		setMainState(gameName);
	}

	return (
		<DifficultyContextProvider>
			<main className="flex flex-col">
				{mainState === "main-menu" && <MainMenu startGame={handleStartGame}/>}
				{mainState === "pokemon" && <PokemonGame />}
			</main>
		</DifficultyContextProvider>
	);
}

export default App;
