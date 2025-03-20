import { POKEMON_ANSWERS_MOCK } from "../pokemonApiMock";
import { shuffle } from "../utils/functions";
import { useRef, useState, useEffect } from "react";
import { removeDashes } from "../utils/functions";
import Answer from "./Answer";

export default function Answers({ gameState, pokemon, onAnswer, onNext, MOCK }) {
	const [answersList, setAnswersList] = useState([]);
	let answers = [];

	useEffect(() => {
		async function fetchData() {
			const tempList = await fetchAnswers();

			answers = [
				...tempList.map((answer) => {
					return {
						text: answer,
						isCorrect: false,
					};
				}),
				{
					text: pokemon,
					isCorrect: true,
				},
			];

			answers = shuffle(answers);

			setAnswersList([...answers]);
		}
		fetchData();

		return () => setAnswersList([]);
	}, [pokemon]);

	async function fetchAnswers(useMock = MOCK) {
		if (useMock) {
			return [...POKEMON_ANSWERS_MOCK]; // Restituisce i dati di test
		}

		const randomNumbers = Array.from(
			{ length: 3 },
			() => Math.floor(Math.random() * 1000) + 1
		);

		try {
			const responses = await Promise.all(
				randomNumbers.map((num) =>
					fetch(`https://pokeapi.co/api/v2/pokemon-species/${num}`)
						.then((response) => response.json())
						.then((pokemon) => pokemon.name)
				)
			);

			return responses;
		} catch (error) {
			console.error("Errore nel fetch delle risposte:", error);
			return [];
		}
	}

	return (
		<>
			<ul className="w-full text-center">
				{answersList.map((answer, index) => {
					return (
						<Answer
							key={index}
							onSelect={onAnswer}
							pokemon={pokemon}
							isCorrect={answer.isCorrect}
							hasAnswered={gameState.hasAnswered}
						>
							{removeDashes(answer.text)}
						</Answer>
					);
				})}
			</ul>
			{gameState.hasAnswered && (
				<button
					onClick={onNext}
					className="cursor-pointer text-lg mt-2 mb-5 md:mb-0 bg-stone-600 py-2 px-8 rounded-sm"
				>
					Next
				</button>
			)}
		</>
	);
}
