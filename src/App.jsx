import MainMenu from "./pages/MainMenu.jsx";
import PokemonGame from "./pages/PokemonGame.jsx";
import Scoreboard from "./pages/Scoreboard.jsx";
import "./App.css";
import store from "./store/gameSlice.js";

import WindowSizeContextProvider from "./context/window-size.jsx";
import DifficultyContextProvider from "./context/difficulty.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getIsOver } from "./store/gameSlice.js";
import ScoreHistory from "./pages/ScoreHistory.jsx";
import Error from "./components/UI/Error.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter(
	[
		{
			path: "/",
			errorElement: <Error />,
			children: [
				{
					index: true,
					element: <MainMenu />,
				},
				{
					path: "game",
					element: <PokemonGame />,
				},
				{
					path: "game/score",
					element: <Scoreboard />,
				},
				{
					path: "score-history",
					element: <ScoreHistory />,
				},
			],
		},
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
			<QueryClientProvider client={queryClient}>
				<DifficultyContextProvider>
					<RouterProvider router={router} />
				</DifficultyContextProvider>
			</QueryClientProvider>
		</WindowSizeContextProvider>
	);
}

export default App;
