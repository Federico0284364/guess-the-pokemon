import React from "react";
import { capitalize } from "../utils/functions";

export default function Answer({
	children,
	onSelect,
	hasAnswered = false,
	isCorrect = false,
  isSelected
}) {
	const standardClass = "w-full rounded-2xl py-2 border-4 border-neutral-700";

	let buttonClass = standardClass;

	if (hasAnswered && isSelected && !isCorrect) {
		buttonClass += " bg-red-500 cursor-not-allowed";
	} else if (hasAnswered && isCorrect) {
		buttonClass += " bg-green-500 cursor-not-allowed";
	} else if (!hasAnswered) {
		buttonClass +=
			" bg-orange-400 hover:bg-orange-400/90 active:bg-orange-400/75";
	} else {
		buttonClass += " bg-neutral-500 cursor-not-allowed";
	}

	// Gestione del click
	const handleClick = () => {
		if (!hasAnswered) {
			onSelect(isCorrect, { name: children });
		}
	};

	return (
		<li className="shadow-lg shadow-black/20 text-xl my-2 sm:my-2.5 rounded-2xl hover:scale-105 transition">
			<button				
				disabled={hasAnswered}
				className={buttonClass}
				onClick={handleClick}
			>
				{children ? children : ""}
			</button>
		</li>
	);
}
