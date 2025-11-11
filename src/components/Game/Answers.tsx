import { shuffle } from "../../utils/functions.js";
import { memo, useMemo } from "react";
import { removeDashes, capitalize } from "../../utils/functions.js";
import Answer from "./Answer.tsx";
import NextButton from "./NextButton.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
	setAnswersList,
	getCurrentPokemon,
	StoreState,
} from "../../store/gameSlice.js";
import { EasyAnswerOption } from "../../models/answer.js";
import {
	getListOfRandomPokemonIds,
} from "../../utils/getRandomPokemonId.js";
import { NUMBER_OF_EASY_WRONG_ANSWERS } from "../../data/constants.js";
import { pokemonNames } from "../../data/allPokemonNames.js";

type Props = {
	onAnswer: (answer: EasyAnswerOption) => void;
	onNext: () => void;
};

function Answers({ onAnswer, onNext }: Props) {
	const { hasAnswered, round, selectedAnswer, answersList, gameId } =
		useSelector((state: StoreState) => state.game);
	const pokemon = useSelector(getCurrentPokemon);
	const dispatch = useDispatch();

	useMemo(() => {
		const randomIdsList = getListOfRandomPokemonIds(
			NUMBER_OF_EASY_WRONG_ANSWERS
		);

		const wrongAnswers = randomIdsList.map((pokemonId) => {
			return {
				text: pokemonNames.results[pokemonId].name,
				isCorrect: false,
			};
		});
		const rightAnswer = {
			text: pokemon.name,
			isCorrect: true
		}
		const answers = shuffle([...wrongAnswers, rightAnswer])
		
		dispatch(setAnswersList(answers));
	}, [round, pokemon.id]);

	return (
		<>
			<ul className="w-full text-center">
				{answersList?.map((answer, index) => {
					return (
						<Answer
							key={index + "answer"}
							onSelect={onAnswer}
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
		</>
	);
}

export default memo(Answers);
