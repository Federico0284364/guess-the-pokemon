import MainMenu from "./pages/MainMenu";
import PokemonGame from "./pages/PokemonGame";
import Scoreboard from "./pages/Scoreboard.js";
import "./App.css";

import WindowSizeContextProvider from "./context/window-size";
import DifficultyContextProvider from "./context/difficulty";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getIsOver } from "./store/gameSlice";
import ScoreHistory from "./pages/ScoreHistory";
import Error from "./components/UI/Error";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter(
	[
		{
			path: "/",
			errorElement: <Error message={'Oops! Something went wrong.'}/>,
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
