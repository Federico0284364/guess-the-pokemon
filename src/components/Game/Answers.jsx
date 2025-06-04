import { shuffle } from "../../utils/functions.js";
import { useEffect, useContext, memo } from "react";
import { removeDashes, capitalize } from "../../utils/functions.js";
import { fetchAnswers } from "../../utils/fetchFunctions.js";
import Answer from "./Answer.jsx";
import NextButton from "./NextButton.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
	setIsFetching,
	setAnswersList,
	getCurrentPokemon,
} from "../../store/gameSlice.js";

function Answers({ onAnswer, onNext, MOCK }) {
	const { hasAnswered, round, selectedAnswer, answersList, isFetching } =
		useSelector((state) => state.game);

	const pokemon = useSelector(getCurrentPokemon);

	const dispatch = useDispatch();

	console.log("answers montato");

	useEffect(() => {
		let answers = [];

		async function fetchData() {
			if (answersList.length != 0){
				return
			}

			dispatch(setIsFetching({ answers: true }));
			const tempList = await fetchAnswers(MOCK, pokemon);

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

			dispatch(setAnswersList([...answers]));
			dispatch(setIsFetching({ answers: false }));
		}
		fetchData();
	}, [round]);

	return (
		<>
			{!isFetching.answers && answersList.length === 4 && (
				<ul className="w-full text-center">
					{answersList.map((answer, index) => {
						return (
							<Answer
								key={index + "answer"}
								onSelect={onAnswer}
								pokemon={pokemon}
								isCorrect={answer.isCorrect}
								isSelected={
									selectedAnswer === capitalize(answer.text)
								}
								hasAnswered={hasAnswered}
							>
								{capitalize(removeDashes(answer.text))}
							</Answer>
						);
					})}
					{hasAnswered && <NextButton onClick={onNext} />}
				</ul>
			)}
		</>
	);
}

export default memo(Answers);
