import GameOption from "./GameOption";
import { games } from "../games.js";
import DifficultyButton from "./Difficultybutton.jsx";

export default function MainMenu({ startGame }) {
	return (
		<>
			<header className="mt-8 flex justify-center">
				<h1 className="drop-shadow-lg drop-shadow-black w-60 sm:w-150 text-6xl bold text-center mb-8">
					Guess the Pokémon
				</h1>
			</header>
			<div className="flex flex-col sm:flex-row">
				
				<div className="flex gap-4 flex-col w-80 mt-2 m-auto items-center ">
					{games.map((game) => {
						return (
							<GameOption
								key={game.name}
								game={game}
								onClick={() => startGame(game.name)}
							/>
						);
					})}
				</div>
				<div className="flex flex-col text-3xl pb-6 mt-4 sm:mt-1 ml-16 sm:ml-0">
					Difficulty:
					<DifficultyButton chosenDifficulty={"Easy"} />
					<DifficultyButton chosenDifficulty={"Hard"} />
				</div>
			</div>
		</>
	);
}
