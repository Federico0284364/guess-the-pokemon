import { memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { pokemonNames } from "../../data/allPokemonNames";
import { NUMBER_OF_EASY_WRONG_ANSWERS } from "../../data/constants";
import { EasyAnswerOption } from "../../models/answer";
import {
  StoreState,
  getCurrentPokemon,
  setAnswersList,
} from "../../store/gameSlice.js";
import { shuffle } from "../../utils/functions";
import { capitalize, removeDashes } from "../../utils/functions";
import { getListOfRandomPokemonIds } from "../../utils/getRandomPokemonId";
import Answer from "./Answer";
import NextButton from "./NextButton";

type Props = {
  onAnswer: (answer: EasyAnswerOption) => void;
  onNext: () => void;
};

function Answers({ onAnswer, onNext }: Props) {
  const { hasAnswered, round, selectedAnswer, answersList } =
    useSelector((state: StoreState) => state.game);
  const pokemon = useSelector(getCurrentPokemon);
  const dispatch = useDispatch();

  useMemo(() => {
    const randomIdsList = getListOfRandomPokemonIds(
      NUMBER_OF_EASY_WRONG_ANSWERS,
    );

    const wrongAnswers = randomIdsList.map((pokemonId) => {
      return {
        text: pokemonNames.results[pokemonId].name,
        isCorrect: false,
      };
    });
    const rightAnswer = {
      text: pokemon.name,
      isCorrect: true,
    };
    const answers = shuffle([...wrongAnswers, rightAnswer]);

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
              isSelected={selectedAnswer === capitalize(answer.text)}
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
