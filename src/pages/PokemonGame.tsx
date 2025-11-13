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

  function renderAnswers() {
    if (difficulty === "easy") {
      return (
        <Answers
          key={"answers" + round}
          onAnswer={handleEasyAnswer}
          onNext={handleNextQuestion}
        />
      );
    } else {
      return (
        <InputArea
          key={"input-area" + round}
          onAnswer={handleHardAnswer}
          onNext={handleNextQuestion}
        />
      );
    }
  }

  function renderSidebar(side: "right" | "left" | null) {
    const sidebarProps = {
      side: side,
      isOver,
      hasAnswered,
    };
    return <Sidebar {...sidebarProps} />;
  }

  if (isError || !isOnline) {
    return <Error message={error?.message} />;
  }

  if (isPending || pokemonList.length < 10) {
    return <LoadingScreen />;
  }

  if (isOver) {
    return null;
  }

  return (
    <div>
      <GameHeader
        pokemonList={pokemonList}
        guessedPokemonList={guessedPokemonList}
      />

      <motion.section
        transition={{ duration: 0.2, type: "tween" }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: [1, 0] }}
        key={"game" + gameId}
        className="flex gap-8"
      >
        {renderSidebar(device !== "small" ? "left" : null)}
        <div className="h-full relative items-center flex flex-col min-h-128 w-[99vw] max-w-[90vw] md:min-w-100 sm:max-w-120 md:w-100 ">
          <>
            <MainWindow key={"window" + round} />
            {renderAnswers()}
            {renderSidebar(device === "small" && hasAnswered ? "right" : null)}
            {renderSidebar(device === "small" && hasAnswered ? "left" : null)}
          </>
        </div>
        {renderSidebar(device !== "small" ? "right" : null)}
      </motion.section>
    </div>
  );
}
