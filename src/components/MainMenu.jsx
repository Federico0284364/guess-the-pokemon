import GameOption from "./GameOption";
import { games } from "../games.js";
import DifficultyButton from "./Difficultybutton.jsx";

export default function MainMenu({startGame}) {
	
	return (
		<div className="flex mt-8">
			<div>
				<h1 className="text-4xl bold text-center mb-8">
					Guess the ____
				</h1>
				<div className="flex gap-4">
					{games.map((game) => {
						return <GameOption key={game.name} game={game} onClick={() => startGame(game.name)}/>;
					})}
				</div>
			</div>
			<div className="flex flex-col text-xl mt-34 ml-10">
				Difficulty:
				<DifficultyButton chosenDifficulty={"Easy"} />
				<DifficultyButton chosenDifficulty={"Hard"} />
			</div>
		</div>
	);
}
