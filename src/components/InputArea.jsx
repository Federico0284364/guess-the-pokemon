import { useRef } from "react";
import SelectInput from "./SelectInput";
import Input from "./Input";
import NextButton from "./NextButton";

export default function InputArea({ gameState, onAnswer, onNext, pokemon }) {
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
		if(type1Input.current.value.toLowerCase() === 
		type2Input.current.value.toLowerCase()){
			alert('Invalid input, choose two different types');
			return;
		}
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
		<section className="flex flex-wrap gap-x-1 gap-y-2">
			<Input
				gameState={gameState}
				ref={nameInput}
				label="Name"
				widthClass={"w-[70%]"}
			/>
			<SelectInput
				pokemon={pokemon}
				gameState={gameState}
				ref={generationInput}
				optionArray={GENERATIONS}
				label="Generation"
				widthClass={"flex-1"}
			/>
			<SelectInput
				pokemon={pokemon}
				gameState={gameState}
				ref={type1Input}
				optionArray={TYPES1}
				label="Type 1"
				widthClass={"w-[30%]"}
			/>
			<SelectInput
				pokemon={pokemon}
				gameState={gameState}
				ref={type2Input}
				optionArray={TYPES2}
				label="Type 2"
				widthClass={"w-[30%]"}
			/>
			<SelectInput
				pokemon={pokemon}
				gameState={gameState}
				ref={statInput}
				optionArray={STATS}
				label="Best stat"
				widthClass={"flex-1"}
			/>

			{!gameState.hasAnswered && <button
				onClick={() => {
					handleConfirm();
				}}
				className="hover:opacity-85 h-14 mt-4 active:opacity-75 w-full text-lg bg-green-700 rounded-sm border-4 border-neutral-700"
			>
				Confirm
			</button>}

			{gameState.hasAnswered && <NextButton onClick={onNext} />}
		</section>
	);
}
