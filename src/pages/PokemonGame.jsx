import { useContext, useEffect, useCallback } from "react";
import { DifficultyContext } from "../context/difficulty.jsx";
import { WindowSizeContext } from "../context/window-size.jsx";
import { Pokemon } from "../utils/pokemonApiMock.js";
import {
	fetchPokemonList,
	fetchPokemonSpecies,
} from "../utils/fetchFunctions.js";
import GameHeader from "../components/game/GameHeader.jsx";
import Answers from "../components/game/Answers.jsx";
import Sidebar from "../components/game/Sidebar.jsx";
import MainWindow from "../components/game/mainWindow.jsx";
import InputArea from "../components/game/InputArea.jsx";
import { replace, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingScreen from "../components/game/LoadingScreen.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
	newGame,
	easyAnswer,
	correctAnswer,
	wrongAnswer,
	hardAnswer,
	nextQuestion,
	setPokemonList,
	setGuessedPokemonList,
	setIsFetching,
} from "../store/gameSlice";
import { NUMBER_OF_POKEMON } from "../store/gameSlice";
import { getCurrentPokemon, getIsOver } from "../store/gameSlice";

const MOCK = false;

export default function PokemonGame() {
	const { device } = useContext(WindowSizeContext);
	const { difficulty } = useContext(DifficultyContext);
	const {
		hasAnswered,
		round,
		pokemonList,
		guessedPokemonList,
		isFetching,
	} = useSelector((state) => state.game);

	const pokemon = useSelector(getCurrentPokemon);
	const isOver = useSelector(getIsOver);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	console.log(round)

	useEffect(() => {
		if (!isOver) {
			return;
		}

		if (isOver) {
			navigate("/game/score", {replace: true});
		}
	}, [isOver]);

	//fetch pokemon
	useEffect(() => {
		let tempList = [];
		if (round < NUMBER_OF_POKEMON) fetchData();

		async function fetchData() {
			dispatch(setIsFetching({ pokemonList: true }));

			if (pokemonList.length <= 1) {
				tempList = await fetchPokemonList(MOCK, NUMBER_OF_POKEMON);
			} else {
				tempList = [...pokemonList];
			}
			const pokemonSpecies = await fetchPokemonSpecies(
				MOCK,
				tempList[round].id
			);

			tempList[round] = {
				...tempList[round],
				...pokemonSpecies,
			};

			dispatch(setPokemonList([...tempList]));

			dispatch(setIsFetching({ pokemonList: false }));
		}
	}, [round]);

	const leftSidebarProps = {
		pokemon: pokemon,
		hasAnswered: hasAnswered,
	};

	const rightSidebarProps = {
		pokemon: pokemon,
		hasAnswered: hasAnswered,
	};



	const handleEasyAnswer = useCallback(
		(isCorrect, answer) => {
			if (!hasAnswered) {
				if (isCorrect) {
					handleCorrectAnswer();
				} else {
					handleWrongAnswer();
				}

				dispatch(easyAnswer({ answer, pokemon }));
			}
		},
		[round]
	);

	function handleHardAnswer(answer) {
		dispatch(hardAnswer({ answer, pokemon }));
	}

	const handleNextQuestion = useCallback(() => {
		dispatch(nextQuestion());
	}, [round]);

	function handleCorrectAnswer() {
		setGuessedPokemonList((oldList) => {
			return [...oldList, true];
		});

		dispatch(correctAnswer());
	}

	function handleWrongAnswer() {
		setGuessedPokemonList((oldList) => {
			return [...oldList, false];
		});

		dispatch(wrongAnswer());
	}

	if (isFetching.pokemonList) {
		return <LoadingScreen />;
	}

	//render
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
						<Sidebar
							isOver={isOver}
							{...leftSidebarProps}
							side="left"
						/>
					)}
					<div className="h-full relative items-center flex flex-col min-h-128 w-[99vw] max-w-[90vw] md:min-w-100 sm:max-w-120 md:w-100 ">
						
							<>
								<MainWindow
									pokemon={pokemon}
									isFetching={isFetching}
								/>
								{difficulty === "Easy" ? (
									<Answers
										MOCK={MOCK}
										onAnswer={handleEasyAnswer}
										onNext={handleNextQuestion}
									/>
								) : (
									<InputArea
										onAnswer={handleHardAnswer}
										onNext={handleNextQuestion}
										pokemon={pokemon}
									/>
								)}
								{device === "small" && hasAnswered && (
									<>
										<Sidebar
											isOver={isOver}
											{...rightSidebarProps}
											side="right"
										/>
										<Sidebar
											isOver={isOver}
											{...rightSidebarProps}
											side="left"
										/>
									</>
								)}
							</>
						
					</div>
					{(device === "medium" || device === "large") && (
						<Sidebar
							{...rightSidebarProps}
							side="right"
							isOver={isOver}
						/>
					)}
				</motion.section>
			</motion.div>
		);
	}
	return null;
}
