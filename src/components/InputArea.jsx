import { useRef } from "react";
import SelectInput from "./SelectInput";
import Input from "./Input";
import NextButton from "./NextButton";

export default function InputArea({ gameState, onAnswer, onNext }) {
	const GENERATIONS = [
		"I",
		"II",
		"III",
		"IV",
		"V",
		"VI",
		"VII",
		"VIII",
		"IX",
	];
	const STATS = [
		"HP",
		"Attack",
		"Defense",
		"Special attack",
		"Special defense",
		"Speed",
	];
	const TYPES1 = [
		"normal",
		"fire",
		"water",
		"grass",
		"electric",
		"ice",
		"fighting",
		"poison",
		"ground",
		"flying",
		"psychic",
		"bug",
		"rock",
		"ghost",
		"dragon",
		"dark",
		"steel",
		"fairy",
	];
	const TYPES2 = ["no type", ...TYPES1];

	const nameInput = useRef();
	const generationInput = useRef();
	const type1Input = useRef();
	const type2Input = useRef();
	const statInput = useRef();

	function handleConfirm() {
		const answer = {
			name: nameInput.current.value,
			generation: generationInput.current.value,
			types: [
				type1Input.current.value.toLowerCase(),
				type2Input.current.value.toLowerCase(),
			],
			stat: statInput.current.value,
		};
		onAnswer(answer);
	}

	return (
		<section className="flex flex-wrap gap-x-2">
			<Input ref={nameInput} label="Name" widthClass={"w-[70%]"} />
			<SelectInput
				ref={generationInput}
				optionArray={GENERATIONS}
				label="Generation"
				widthClass={"flex-1"}
			/>
			<SelectInput
				ref={type1Input}
				optionArray={TYPES1}
				label="Type 1"
				widthClass={"w-[30%]"}
			/>
			<SelectInput
				ref={type2Input}
				optionArray={TYPES2}
				label="Type 2"
				widthClass={"w-[30%]"}
			/>
			<SelectInput
				ref={statInput}
				optionArray={STATS}
				label="Best stat"
				widthClass={"flex-1"}
			/>

			<button
				onClick={() => {
					handleConfirm();
				}}
				className="hover:opacity-85 active:opacity-75 w-full bg-orange-400 rounded-2xl py-2 border-4 border-neutral-700"
			>
				Confirm
			</button>

			{gameState.hasAnswered && <NextButton onClick={onNext} />}
		</section>
	);
}
