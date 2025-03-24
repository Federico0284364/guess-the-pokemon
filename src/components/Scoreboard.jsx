import { useEffect } from "react";
import { capitalize, removeDashes, calculateTotalScore } from "../utils/functions.js";

export default function Scoreboard({
	score,
	pokemonList,
	guessedPokemonList,
	startNewGame,
	goToMenu
}) {
	

	const totalScore = calculateTotalScore(score);

	let bestScore = 0;
	bestScore = JSON.parse(localStorage.getItem("best-score"));

	const buttonClass = "bg-neutral-600 rounded-sm px-2 py-1 hover:opacity-90 active:opacity-70";

	if (totalScore > bestScore) {
		bestScore = totalScore;
	}

	useEffect(() => {
		localStorage.setItem("best-score", JSON.stringify(bestScore));
	}, []);

	return (
		<>
			<div className="w-[90vw] max-w-100 min-h-150 h-[90dvh] z-50 flex flex-col items-center rounded-2xl bg-orange-400 border-7 border-neutral-700">
				<h1 className="text-5xl uppercase mt-4">Your score:</h1>
				<h1 className="text-8xl uppercase">{totalScore}</h1>
				<p className="mb-4">
					Your personal best: <span>{bestScore}</span>
				</p>
				<div className="flex gap-4 mb-4">
					<button className={buttonClass} onClick={startNewGame}>New Game</button>
					<button className={buttonClass} onClick={goToMenu}>Main Menu</button>
				</div>
				<table>
					<tbody>
						
					
					{pokemonList.map((pokemon, index) => {
						const isCorrect = guessedPokemonList[index];
						const symbol = isCorrect ? "\u2713" : "\u274C";
            const points = isCorrect ? '+50' : '0';
						return (
							<tr className="max-h-1">
								<td className="w-9">
									<img
										className="w-[92%] h-[90%] object-cover hover:scale-200 transition-[2s]"
										src={pokemon.sprites.front_default}
									/>
								</td>
								<tb className="w-22 text-start">
									<p className="ml-2">
										{removeDashes(capitalize(pokemon.name))}
									</p>
								</tb>
								<td className="w-10 text-center"><p className="w-10">{symbol}</p></td>
                <td className={" w-10 text-center rounded-sm bg-opacity-10" + (isCorrect ? ' bg-green-400' : ' bg-red-700')}>{points}</td>
							</tr>
						);
					})}
					</tbody>
				</table>
			</div>
		</>
	);
}
