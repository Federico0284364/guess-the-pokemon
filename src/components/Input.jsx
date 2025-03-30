import { useEffect } from "react";
import { calculateScore } from "../utils/gameFunctions";

export default function Input({ gameState, ref, label, widthClass }) {
	let isCorrect = false;
	let isAlmostCorrect = false;
	let customClass = "bg-orange-400 ";
	let textCustomClass = "";
	
	useEffect(() => {	
			ref.current.value = '';
	}, [gameState.round])

	if (gameState.hasAnswered) {
		if (gameState.score[gameState.round].nameScore === 100) {
			isCorrect = true;
		} else if (gameState.score[gameState.round].nameScore === 50) {
			isAlmostCorrect = true;
		}
	}
	if (gameState.hasAnswered) {
		isCorrect
			? (customClass = " bg-green-500 ")
			: isAlmostCorrect
			? (customClass = " bg-yellow-500 ")
			: (customClass = " bg-red-500 ");
		isCorrect
			? (textCustomClass = " text-green-200 ")
			: isAlmostCorrect
			? (textCustomClass = " text-yellow-500 ")
			: (textCustomClass = " text-red-400 ");
	}

	return (
		<div className={"flex flex-col items-center min-w-0 " + widthClass}>
			<label className={textCustomClass + "text-sm"}>
				{gameState.hasAnswered
					? "+" + gameState.score[gameState.round].nameScore
					: label}
			</label>
			<input
				disabled={gameState.hasAnswered}
				ref={ref}
				className={
					customClass +
					" text-lg h-14 rounded-2xl w-full py-2 border-4 text-center border-neutral-700"
				}
			/>
		</div>
	);
}
