import { POKEMON_ANSWERS_MOCK } from "../pokemonApiMock";
import { shuffle } from "../utils/shuffle";
import { useRef, useState, useEffect } from "react";
import Answer from "./Answer";

export default function Answers({ game, gameState, pokemon, onAnswer }) {
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

	async function fetchAnswers() {
		let tempList = [];

		tempList = [...POKEMON_ANSWERS_MOCK];

		for (let i = 1; i <= 3; i++) {
			const randomNum = Number((Math.random() * 1000 + 1).toFixed(0));
			/*const fetchedAnswer = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${randomNum}`
			)
				.then((response) => {
					return response.json();
				})
				.then((pokemonJson) => {
					console.log("fetched", pokemonJson.name);
					return pokemonJson;
				})
				.then((pokemonJson) => pokemonJson)
				.catch(new Error("errore"));

			tempList.push(fetchedAnswer.name);*/
		}
		return [...tempList];
	}

	if (!gameState.hasAnswered) {
		
		console.log("list shuffled", answersList);
	}

	return (
		<>
			{answersList.map((answer, index) => {
				console.log(answer.isCorrect);
				return (
					<Answer
						key={index}
						onSelect={onAnswer}
						pokemon={pokemon}
						isCorrect={answer.isCorrect}
						hasAnswered={gameState.hasAnswered}
					>
						{answer.text}
					</Answer>
				);
			})}
		</>
	);
}
