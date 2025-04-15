import { useContext } from "react";
import { DifficultyContext } from "../context/difficulty";

export default function DifficultyButton({ chosenDifficulty }) {
	const { difficulty, setEasy, setHard } = useContext(DifficultyContext);
	const isChecked = difficulty === chosenDifficulty;

	return (
		<label className=" drop-shadow drop-shadow-black/40 text-xl mt-1">
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
				<p className="drop-shadow drop-shadow-black/40 text-sm font-light w-50 ml-4">
					Can you pick the right Pokémon name from the given options?
				</p>
			) : isChecked && chosenDifficulty === "Hard" ? (
				<>
					<p className="drop-shadow-lg drop-shadow-black/40 font-light text-sm w-50 ml-4">
						Can you identify the Pokémon’s name, type, and extra
						details?
					</p>

					<p className="drop-shadow-lg drop-shadow-black/40 dropdown-content mt-5 text-md w-50 ml-4">
						Rules for hard mode:
					</p>
					<ul className="drop-shadow drop-shadow-black/40 flex flex-col gap-2 text-sm w-50 ml-8 mt-2 list-disc">
						<li>Pokemon names have a one character tolerance. If you mispell the name by exactly one character, your guess will still be valid but you'll get half the points</li>
						<li>Dash and spacebar are equivalent "Jangmo-o" = "Jangmo o"</li>
						<li>If the pokemon has only one type, you must pick the Type 1 and leave the Type 2 as "No type"</li>
						<li>You cannot input the same type twice on the same pokémon</li>
					</ul>
				</>
			) : (
				""
			)}
		</label>
	);
}
