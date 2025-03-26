import { useContext } from "react";
import { DifficultyContext } from "../context/difficulty";

export default function DifficultyButton({ chosenDifficulty }) {
	const { difficulty, setEasy, setHard } = useContext(DifficultyContext);
	const isChecked = difficulty === chosenDifficulty;

	return (
		<label className="text-xl mt-1">
			<input
				className="cursor-pointer w-4 aspect-square"
				type="radio"
				name="difficulty"
				value={chosenDifficulty}
				checked={isChecked}
				onChange={chosenDifficulty === "Easy" ? setEasy : setHard}
			/>{" "}
			{chosenDifficulty}
			{isChecked && chosenDifficulty === "Easy" ? (
				<p className="text-sm font-light w-50 ml-4">
					Can you pick the right Pokémon name from the given options?
				</p>
			) : isChecked && chosenDifficulty === "Hard" ? (
				<p className="text-sm w-50 ml-4">
					Can you identify the Pokémon’s name, type, and extra details?
				</p>
			) : (
				""
			)}
		</label>
	);
}
