import { useEffect } from "react";
import {
	capitalize,
	removeDashes,
	calculateTotalScore,
} from "../utils/functions.js";

import { motion } from "framer-motion";

export default function Scoreboard({
	score,
	pokemonList,
	startNewGame,
	goToMenu,
	difficulty,
}) {
	const totalScore = calculateTotalScore(score);

	let bestScore = 0;
	bestScore = JSON.parse(localStorage.getItem("best-score"));

	const buttonClass =
		"bg-neutral-600 rounded-sm px-2 py-1 hover:opacity-90 active:opacity-70";

	if (totalScore > bestScore) {
		bestScore = totalScore;
	}

	useEffect(() => {
		localStorage.setItem("best-score", JSON.stringify(bestScore));
	}, []);

	function calculatePokemonScore(index) {
		let pokemonScore = 0;
		(Object.values(score[index])).forEach((entry) => {
			pokemonScore += entry;
		});
		return pokemonScore;
	}

	return (
		<>
			<motion.div transition={{duration: 1}} initial={{y: -1000}} animate={{y: 0}} className="w-[90vw] max-w-100 min-h-155 h-[90dvh] z-50 flex flex-col items-center rounded-2xl bg-orange-400 border-7 border-neutral-700">
				<h1 className="text-5xl uppercase mt-4">Your score:</h1>
				<motion.h1 transition={{type: "spring", bounce: 0.7, duration: 1.5}} initial={{opacity: 0.5, y: -1000}} animate={{opacity: 1, y: 0}} className="text-8xl uppercase">{totalScore}</motion.h1>
				<p className="mb-4">
					Your personal best: <span>{bestScore}</span>
				</p>
				<div className="flex gap-4 mb-4">
					<button className={buttonClass} onClick={startNewGame}>
						New Game
					</button>
					<button className={buttonClass} onClick={goToMenu}>
						Main Menu
					</button>
				</div>
				<table>
					{difficulty === "Hard" && (
						<thead>
							<tr className="max-h-1 text-xs">
								<th className="w-9"></th>
								<th className="w-24"></th>
								<th>Name</th>
								<th>Gen</th>
								<th>Type</th>
								<th>Stats</th>
							</tr>
						</thead>
					)}
					<tbody>
						{pokemonList.map((pokemon, index) => {
							const rightSymbol = "\u2713";
							const wrongSymbol = "\u274C";
							const totalPokemonScore =
								calculatePokemonScore(index);

							return (
								<>
									<tr className="max-h-1">
										<td className="w-9">
											<img
												className="w-[92%] h-[90%] object-cover hover:scale-200 transition-[2s]"
												src={
													pokemon.sprites
														.front_default
												}
											/>
										</td>
										<td className="w-26 text-start">
											<p className="ml-2">
												{removeDashes(
													capitalize(pokemon.name)
												)}
											</p>
										</td>
										{difficulty === "Easy" && (
											<td className="w-10 text-center">
												<p className="w-10">
													{totalPokemonScore
														? rightSymbol
														: wrongSymbol}
												</p>
											</td>
										)}
										{difficulty === "Hard"
											? Object.values(score[index]).map(
													(entry) => {
														return (
															<td
																className={`w-8 text-xs text-center ${
																	entry != 0
																		? "text-white "
																		: "text-red-900"
																}`}
																key={entry}
															>
																{entry}
															</td>
														);
													}
											  )
											: ""}
										<td
											className={
												" w-10 text-center text-white rounded-sm bg-opacity-10" +
												(totalPokemonScore
													? " bg-green-500"
													: " bg-red-700")
											}
										>
											{totalPokemonScore}
										</td>
									</tr>
								</>
							);
						})}
					</tbody>
				</table>
			</motion.div>
		</>
	);
}
