import { pokemonAnswers } from "../pokemonApiMock";

export default function Answers({ game, onSelect }) {
	let answers;
	if (game === "pokemon") {
		answers = [...pokemonAnswers];
	}

	return (
		<>
			{answers.map((answer) => {
				return (
					<li className="text-xl my-2.5 py-2 bg-orange-400 rounded-2xl hover:opacity-85 active:opacity-65" key={answer}>
						<button className="w-full" onClick={onSelect}>{answer}</button>
					</li>
				);
			})}
		</>
	);
}
