import { useState, useEffect } from "react";

export default function Answer({
	children,
	pokemon,
	onSelect,
	hasAnswered = false,
	isCorrect = false,
}) {
	const standardClass = "w-full rounded-2xl py-2 border-4 border-neutral-700";
	const [buttonClass, setButtonClass] = useState(standardClass);
	const [isSelected, setIsSelected] = useState(false);

	function handleButtonClass() {
		if (hasAnswered && isSelected && !isCorrect) {
			setButtonClass(standardClass + " bg-red-500 cursor-not-allowed");
		}
		else if (hasAnswered && isCorrect) {
			setButtonClass(standardClass + " bg-green-500 cursor-not-allowed");
		} else if (!hasAnswered){
			setButtonClass(standardClass + " bg-orange-400 hover:opacity-80 active:opacity-60");
		}	else {
			setButtonClass(standardClass + " bg-orange-400 cursor-not-allowed");
		}
	}

	useEffect(() => {
		handleButtonClass()

		return () => {
			setIsSelected(false);
			setButtonClass(standardClass);
		}
	}, [hasAnswered]);

	return (
		<li className="text-xl my-2 sm:my-2.5 rounded-2xl ">
			<button
				className={buttonClass}
				onClick={(event) => {
					setIsSelected(true);
					onSelect(isCorrect, event);
				}}
			>
				{children && pokemon
					? children[0].toUpperCase() +
					  children.slice(1).toLowerCase()
					: ""}
			</button>
		</li>
	);
}
