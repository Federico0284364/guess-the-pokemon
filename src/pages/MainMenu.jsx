import GameOption from "../components/GameOption.jsx";
import { games } from "../games.js";
import DifficultyButton from "../components/Difficultybutton.jsx";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MainMenu() {
	const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');

	function handleChangeDifficulty(value){
		if (value === 'Easy'){
			setSelectedDifficulty('Easy')
		} else {
			setSelectedDifficulty('Hard')
		}
	}

	function handleOpenHistory() {
		navigate('/score-history')
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
					{games.map((game) => {
						return <GameOption key={game.name} game={game} selectedDifficulty={selectedDifficulty}/>;
					})}

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
					<DifficultyButton onSelect={handleChangeDifficulty} selectedDifficulty={selectedDifficulty} buttonDifficulty={"Easy"} />
					<DifficultyButton onSelect={handleChangeDifficulty} selectedDifficulty={selectedDifficulty} buttonDifficulty={"Hard"} />
				</div>
			</div>
		</>
	);
}
