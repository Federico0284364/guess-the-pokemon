import MainMenu from "./pages/MainMenu.jsx";
import PokemonGame from "./pages/PokemonGame.jsx";
import Scoreboard from "./pages/Scoreboard.jsx";
import "./App.css";
import store from "./store/gameSlice.js";

import WindowSizeContextProvider from "./context/window-size.jsx";
import DifficultyContextProvider from "./context/difficulty.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import { getIsOver } from "./store/gameSlice.js";
import ScoreHistory from "./pages/ScoreHistory.jsx";
import Error from "./components/Error.jsx";

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <MainMenu />,
			errorElement: <Error />
		},
		{
			path: "/game",
			element: <PokemonGame />,
			errorElement: <Error />
		},
		{
			path: "/game/score",
			element: <Scoreboard />,
			errorElement: <Error />
		},
		{
			path: '/score-history',
			element: <ScoreHistory />,
			errorElement: <Error />
		}
	],
	{
		basename: "/guess-the-pokemon/",
	}
);

function App() {
	const { score } = useSelector((state) => state.game);
	const isOver = useSelector(getIsOver);

	useEffect(() => {
		if (!isOver) {
			return;
		}

		localStorage.setItem("score-record", JSON.stringify(score));
	}, [isOver]);

	return (
		<WindowSizeContextProvider>
			<DifficultyContextProvider>
				<RouterProvider router={router} />
			</DifficultyContextProvider>
		</WindowSizeContextProvider>
	);
}

export default App;
