import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/UI/Button.js";
import DifficultyButton from "../components/menu/Difficultybutton.js";
import GameOption from "../components/menu/GameOption.js";

export default function MainMenu() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  function handleChangeDifficulty(value: string) {
    if (value === "easy") {
      setSelectedDifficulty("easy");
    } else {
      setSelectedDifficulty("hard");
    }
  }

  function handleOpenHistory() {
    navigate("/score-history");
  }

  const navigate = useNavigate();
  return (
    <>
      <header className="mt-8 flex justify-center">
        <h1 className="drop-shadow-lg drop-shadow-black w-60 sm:w-150 text-6xl bold text-center mb-8">
          Guess the Pokémon
        </h1>
      </header>
      <div className="flex flex-col sm:flex-row">
        <div className="flex gap-4 flex-col w-80 pb-8 mt-2 m-auto items-center ">
          <GameOption key={"pokemon"} selectedDifficulty={selectedDifficulty} />

          <Button
            onClick={handleOpenHistory}
            variant="secondary"
            className="hover:scale-106 transition gap-4 mt-2 m-auto shadow-lg shadow-black/30"
          >
            See game history
          </Button>
        </div>

        <div className="flex flex-col text-3xl pb-6 mt-4 sm:mt-1 ml-16 sm:ml-0">
          Difficulty:
          <DifficultyButton
            onSelect={handleChangeDifficulty}
            selectedDifficulty={selectedDifficulty}
            buttonDifficulty={"easy"}
          />
          <DifficultyButton
            onSelect={handleChangeDifficulty}
            selectedDifficulty={selectedDifficulty}
            buttonDifficulty={"hard"}
          />
        </div>
      </div>
    </>
  );
}
