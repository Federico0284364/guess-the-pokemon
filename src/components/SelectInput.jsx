import { useEffect } from "react";
import { capitalize } from "../utils/functions";

export default function SelectInput({
	pokemon,
	gameState,
	ref,
	optionArray,
	label,
	widthClass,
}) {

	useEffect(() => {
		return () => {
			if (ref.current && optionArray.length > 0) {
				ref.current.value = capitalize(optionArray[0]);
			}
		};
	}, [gameState.round]);

	let score = 0;
	let customClass = "bg-orange-400 ";
	let textCustomClass = "";
	let isCorrect = false;
	if (gameState.hasAnswered) {
		switch (label) {
			case "Generation":
				score = gameState.score[gameState.round].generationScore;
				score === 20 ? (isCorrect = true) : (isCorrect = false);
				break;
			case "Best stat":
				score = gameState.score[gameState.round].statScore;
				score === 50 ? (isCorrect = true) : (isCorrect = false);
				break;
			case "Type 1":
				pokemon.types.forEach((type) => {
					if (
						type.type.name.toLowerCase() ===
						ref.current.value.toLowerCase()
					) {
						score = 25;
					}
				});
				score === 25 ? (isCorrect = true) : (isCorrect = false);
				break;
			case "Type 2":
				if (
					pokemon.types.length === 1 &&
					gameState.score[gameState.round].typeScore === 50
				) {
					score = 25;
				} else {
					pokemon.types.forEach((type) => {
						if (
							type.type.name.toLowerCase() ===
							ref.current.value.toLowerCase()
						) {
							score = 25;
						}
					});
				}
				score === 25 ? (isCorrect = true) : (isCorrect = false);
				break;
		}
	}

	if (gameState.hasAnswered) {
		isCorrect
			? (customClass = "bg-green-500 ")
			: (customClass = "bg-red-500 ");
		isCorrect
			? (textCustomClass = "text-green-200 ")
			: (textCustomClass = "text-red-400 ");
	}

	return (
		<div className={"flex flex-col items-center min-w-0 " + widthClass}>
			<label className={textCustomClass + " text-sm"}>
				{gameState.hasAnswered ? "+" + score : label}
			</label>
			
			<select
				disabled={gameState.hasAnswered}
				ref={ref}
				className={
					customClass +
					" text-lg text-center rounded-2xl w-full h-14 py-2 border-4 border-neutral-700"
				}
			>
				{optionArray.map((element) => {
					return (
						<option
							className="text-md"
							key={element + label}
							value={capitalize(element)}
						>
							{capitalize(element)}
						</option>
					);
				})}
			</select>
		</div>
	);
}
