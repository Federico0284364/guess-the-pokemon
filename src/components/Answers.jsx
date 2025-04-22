
import { shuffle } from "../utils/functions";
import { useState, useEffect } from "react";
import { removeDashes } from "../utils/functions";
import {fetchAnswers} from '../utils/fetchFunctions';
import Answer from "./Answer";
import NextButton from "./NextButton";

export default function Answers({
	gameState,
	pokemon,
	onAnswer,
	onNext,
	onStartFetch,
	onStopFetch,
	isFetching,
	MOCK,
}) {
	const [answersList, setAnswersList] = useState([]);
	
	useEffect(() => {
		if (pokemon.id === 0){
			return;
		}
		let answers = [];
		
		async function fetchData() {
			onStartFetch();
			const tempList = await fetchAnswers(MOCK, pokemon);

			console.log('fetching answers');

			answers = [
				...tempList.map((answer) => {
					return {
						text: answer,
						isCorrect: false,
					};
				}),
				{
					text: pokemon.name,
					isCorrect: true,
				},
			];

			answers = shuffle(answers);

			setAnswersList([...answers]);
			onStopFetch();
		}
		fetchData();

		return () => setAnswersList([]);
	}, [pokemon.id]);

	return (
		<>
			{!isFetching.answers && <ul className="w-full text-center">
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
			</ul>}
			{gameState.hasAnswered && <NextButton onClick={onNext} />}
		</>
	);
}
