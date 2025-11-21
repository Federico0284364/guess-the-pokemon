import { useEffect } from "react";
import { useSelector } from "react-redux";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import DifficultyContextProvider from "./context/difficulty";
import WindowSizeContextProvider from "./context/window-size";
import MainMenu from "./pages/MainMenu";
import PokemonGame from "./pages/PokemonGame";
import ScoreHistory from "./pages/ScoreHistory";
import Scoreboard from "./pages/Scoreboard.js";
import { StoreState, getIsOver } from "./store/gameSlice";

import Error from "./components/UI/Error";

const queryClient = new QueryClient();

function App() {
  const { score } = useSelector((state: StoreState) => state.game);
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
          <Router>
            <Routes>
              <Route path="/" element={<MainMenu />} />
              <Route path="/game" element={<PokemonGame />} />
              <Route path="/game/score" element={<Scoreboard />} />
              <Route path="/score-history" element={<ScoreHistory />} />
              <Route path="*" element={<Error message="Oops! Something went wrong." />} />
            </Routes>
          </Router>
        </DifficultyContextProvider>
      </QueryClientProvider>
    </WindowSizeContextProvider>
  );
}

export default App;
