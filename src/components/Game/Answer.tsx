import { ReactNode } from "react";
import { EasyAnswerOption } from "../../models/answer";
import { twMerge } from "tailwind-merge";

type Props = {
	children: string,
	onSelect: (answer: EasyAnswerOption) => void;
	hasAnswered: boolean;
	isCorrect: boolean;
	isSelected: boolean;
}

export default function Answer({
	children,
	onSelect,
	hasAnswered,
	isCorrect,
  isSelected
}: Props) {
	const buttonClass = twMerge(
  "w-full rounded-2xl py-2 border-4 border-neutral-700 bg-orange-400", //standard
	!hasAnswered && "hover:bg-orange-400/90 active:bg-orange-400/75", // has not answered
  hasAnswered && isSelected && !isCorrect && "bg-red-500 cursor-not-allowed", //wrong
  hasAnswered && isCorrect && "bg-green-500 cursor-not-allowed", //correct
  hasAnswered && !(isSelected && !isCorrect) && !isCorrect && "bg-neutral-500 cursor-not-allowed" //unselected
);

	// Gestione del click
	const handleClick = () => {
		if (!hasAnswered) {
			onSelect({ text: children, isCorrect: isCorrect });
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
