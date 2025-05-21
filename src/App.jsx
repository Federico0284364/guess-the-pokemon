import { useState, useContext } from "react";
import MainMenu from "./components/MainMenu";
import PokemonGame from "./pages/PokemonGame.jsx";
import DifficultyContextProvider from "./context/difficulty.jsx";
import "./App.css";
import { WindowSizeContext } from "./context/window-size.jsx";
import WindowSizeContextProvider from "./context/window-size.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/guess-the-pokemon",
		element: <MainMenu />,
	},
	{
		path: "/guess-the-pokemon/game",
		element: <PokemonGame />,
	},
]);

function App() {
	return (
		<WindowSizeContextProvider>
			<DifficultyContextProvider>
				<RouterProvider router={router} />
			</DifficultyContextProvider>
		</WindowSizeContextProvider>
	);
}

export default App;
