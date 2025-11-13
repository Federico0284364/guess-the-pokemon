import { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { DifficultyContext } from "../context/difficulty";
import { WindowSizeContext } from "../context/window-size";
import { NUMBER_OF_POKEMON_LIST } from "../data/constants.js";
import { useOnlineStatus } from "../hooks/useOnlineStatus.js";
import { EasyAnswerOption, HardAnswerOption } from "../models/answer.js";
import {
  StoreState,
  correctAnswer,
  easyAnswer,
  hardAnswer,
  nextQuestion,
  setGuessedPokemonList,
  setPokemonList,
  wrongAnswer,
} from "../store/gameSlice.js";
import { getCurrentPokemon, getIsOver } from "../store/gameSlice.js";
import {
  fetchPokemonList,
  fetchPokemonSpeciesList,
} from "../utils/fetchFunctions.js";
import { getListOfRandomPokemonIds } from "../utils/getRandomPokemonId.js";

import Error from "../components/UI/Error.js";
import Answers from "../components/game/Answers.js";
import GameHeader from "../components/game/GameHeader.js";
import InputArea from "../components/game/InputArea.js";
import LoadingScreen from "../components/game/LoadingScreen.js";
import MainWindow from "../components/game/MainWindow.js";
import Sidebar from "../components/game/Sidebar.js";

export default function PokemonGame() {
  //declarations
  const { device } = useContext(WindowSizeContext);
  const { difficulty } = useContext(DifficultyContext);
  const { hasAnswered, round, pokemonList, guessedPokemonList, gameId } =
    useSelector((state: StoreState) => state.game);

  const pokemon = useSelector(getCurrentPokemon);
  const isOver = useSelector(getIsOver);
  const isOnline = useOnlineStatus();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //fetch
  const {
    data: fetchedList,
    isPending,
    isError,
    error,
  } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["pokemonList", gameId],
    queryFn: async () => {
      const randomIdsList = getListOfRandomPokemonIds(NUMBER_OF_POKEMON_LIST);

      const [fetchedList, fetchedSpeciesList] = await Promise.all([
        fetchPokemonList(randomIdsList),
        fetchPokemonSpeciesList(randomIdsList),
      ]);

      return fetchedList.map((pokemon, index) => ({
        ...pokemon,
        ...fetchedSpeciesList[index],
      }));
    },
  });

  //updating redux store
  useEffect(() => {
    if (fetchedList) {
      dispatch(setPokemonList(fetchedList));
    }
  }, [fetchedList, dispatch]);

  //routing
  useEffect(() => {
    if (!isOver) {
      return;
    } else {
      navigate("/game/score", { replace: true });
    }
  }, [isOver, navigate]);

  const leftSidebarProps = {
    pokemon: pokemon,
    hasAnswered: hasAnswered,
  };

  const rightSidebarProps = {
    pokemon: pokemon,
    hasAnswered: hasAnswered,
  };

  //functions
  const handleEasyAnswer = useCallback(
    (answer: EasyAnswerOption) => {
      if (!hasAnswered) {
        if (answer.isCorrect) {
          handleCorrectAnswer();
        } else {
          handleWrongAnswer();
        }

        dispatch(easyAnswer({ answer, pokemon }));
      }
    },
    [round],
  );

  function handleHardAnswer(answer: HardAnswerOption) {
    dispatch(hardAnswer({ answer, pokemon }));
  }

  const handleNextQuestion = useCallback(() => {
    dispatch(nextQuestion());
  }, [round]);

  function handleCorrectAnswer() {
    dispatch(setGuessedPokemonList([...guessedPokemonList, true]));

    dispatch(correctAnswer());
  }

  function handleWrongAnswer() {
    dispatch(setGuessedPokemonList([...guessedPokemonList, true]));

    dispatch(wrongAnswer());
  }

  //rendering
  if (isError || !isOnline) {
    return <Error message={error?.message} />;
  }

  if (isPending || pokemonList.length < 10) {
    return <LoadingScreen />;
  }

  if (pokemon?.genera) {
    return (
      <motion.div>
        {!isOver && (
          <GameHeader
            pokemonList={pokemonList}
            guessedPokemonList={guessedPokemonList}
          />
        )}

        <motion.section
          transition={{ duration: 0.2, type: "tween" }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: [1, 0] }}
          key={"game"}
          className="flex gap-8"
        >
          {(device === "medium" || device === "large") && (
            <Sidebar isOver={isOver} {...leftSidebarProps} side="left" />
          )}
          <div className="h-full relative items-center flex flex-col min-h-128 w-[99vw] max-w-[90vw] md:min-w-100 sm:max-w-120 md:w-100 ">
            <>
              <MainWindow key={"window" + round} />
              {difficulty === "easy" ? (
                <Answers
                  onAnswer={handleEasyAnswer}
                  onNext={handleNextQuestion}
                />
              ) : (
                <InputArea
                  key={"input-area" + round}
                  onAnswer={handleHardAnswer}
                  onNext={handleNextQuestion}
                />
              )}
              {device === "small" && hasAnswered && (
                <>
                  <Sidebar
                    isOver={isOver}
                    {...rightSidebarProps}
                    side="right"
                  />
                  <Sidebar isOver={isOver} {...rightSidebarProps} side="left" />
                </>
              )}
            </>
          </div>
          {(device === "medium" || device === "large") && (
            <Sidebar {...rightSidebarProps} side="right" isOver={isOver} />
          )}
        </motion.section>
      </motion.div>
    );
  }
  return null;
}
