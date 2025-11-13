import { RefObject, useEffect } from "react";
import { capitalize } from "../../utils/functions";
import { Pokemon } from "../../models/pokemon";
import { ScoreEntry } from "../../store/gameSlice";


type Props = {
	pokemon: Pokemon,
	hasAnswered: boolean,
	round: number,
	score: ScoreEntry[],
	ref: RefObject<HTMLSelectElement>,
	optionArray: string[],
	label: string,
	widthClass: string
}

export default function SelectInput({
	pokemon,
	hasAnswered,
	round,
	score,
	ref,
	optionArray,
	label,
	widthClass,
}: Props) {
	useEffect(() => {
		return () => {
			if (ref.current && optionArray.length > 0) {
				ref.current.value = capitalize(optionArray[0]);
			}
		};
	}, [round]);

	let totalScore = 0;
	let customClass = "bg-orange-400 ";
	let textCustomClass = "";
	let isCorrect = false;
	if (hasAnswered) {
		switch (label) {
			case "Generation":
				totalScore = score[round].generationScore || 0;
				totalScore === 20 ? (isCorrect = true) : (isCorrect = false);
				break;
			case "Best stat":
				totalScore = score[round].statScore || 0;
				totalScore === 50 ? (isCorrect = true) : (isCorrect = false);
				break;
			case "Type 1":
				pokemon.types.forEach((type) => {
					if (
						type.type.name.toLowerCase() ===
						ref.current.value.toLowerCase()
					) {
						totalScore = 25;
					}
				});
				totalScore === 25 ? (isCorrect = true) : (isCorrect = false);
				break;
			case "Type 2":
				if (
					pokemon.types.length === 1 &&
					score[round].typeScore === 50
				) {
					totalScore = 25;
				} else {
					pokemon.types.forEach((type) => {
						if (
							type.type.name.toLowerCase() ===
							ref.current.value.toLowerCase()
						) {
							totalScore = 25;
						}
					});
				}
				totalScore === 25 ? (isCorrect = true) : (isCorrect = false);
				break;
		}
	}

	if (hasAnswered) {
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
				{hasAnswered ? "+" + totalScore : label}
			</label>

			<select
				disabled={hasAnswered}
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
