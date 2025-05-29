import { useEffect } from "react";
import { calculateScore } from "../utils/gameFunctions";

export default function Input({ hasAnswered, round, score, ref, label, widthClass }) {
	let isCorrect = false;
	let isAlmostCorrect = false;
	let customClass = "bg-orange-400 ";
	let textCustomClass = "";
	
	useEffect(() => {	
			ref.current.value = '';
	}, [round])

	if (hasAnswered) {
		if (score[round].nameScore === 100) {
			isCorrect = true;
		} else if (score[round].nameScore === 50) {
			isAlmostCorrect = true;
		}
	}
	if (hasAnswered) {
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
				{hasAnswered
					? "+" + score[round].nameScore
					: label}
			</label>
			<input
				disabled={hasAnswered}
				ref={ref}
				className={
					customClass +
					" text-lg h-14 rounded-2xl w-full py-2 border-4 text-center border-neutral-700"
				}
			/>
		</div>
	);
}
