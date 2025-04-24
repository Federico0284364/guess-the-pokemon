import { useState, useContext, useEffect, useReducer } from "react";
import { DifficultyContext } from "../context/difficulty";
import { WindowSizeContext } from "../context/window-size.jsx";
import { Pokemon } from "../utils/pokemonApiMock.js";
import { calculateScore } from "../utils/gameFunctions.js";
import { capitalize } from "../utils/functions.js";
import {
	fetchPokemonList,
	fetchPokemonSpecies,
} from "../utils/fetchFunctions.js";
import GameHeader from "./GameHeader.jsx";
import Answers from "./Answers.jsx";
import Sidebar from "./Sidebar.jsx";
import MainWindow from "./mainWindow.jsx";
import Scoreboard from "./Scoreboard.jsx";
import InputArea from "./InputArea.jsx";

import { motion } from "framer-motion";

const MOCK = false;
const numberOfPokemon = 10;
export const initialGameState = {
	hasAnswered: false,
	selectedAnswer: "",
	round: 0,
	score: [],
};

function gameReducer(state, action){
	switch (action.type){
		case 'NEW_GAME':
			return {...initialGameState}
		case 'EASY_ANSWER':
			return {
				...prevState,
				selectedAnswer: capitalize(answer),
				hasAnswered: true,
			};
	}
}

export default function PokemonGame({ goToMenu }) {

	

	const { windowSize, device } = useContext(WindowSizeContext);
	const { difficulty } = useContext(DifficultyContext);

	const [isFetching, setIsFetching] = useState({
		pokemonList: false,
		answers: false,
	});
	const [pokemonList, setPokemonList] = useState([new Pokemon()]);
	const [guessedPokemonList, setGuessedPokemonList] = useState([]);
	const [gameState, setGameState] = useState({
		...initialGameState,
	});

	let isOver = false;
	if (gameState.round === numberOfPokemon) {
		isOver = true;
	}

	const pokemon = pokemonList[gameState.round] || new Pokemon();

	const leftSidebarProps = {
		pokemon: pokemon,
		hasAnswered: gameState.hasAnswered,
	};

	const rightSidebarProps = {
		pokemon: pokemon,
		hasAnswered: gameState.hasAnswered,
	};

	function handleStartFetchAnswers() {
		setIsFetching((prevState) => {
			return {
				...prevState,
				answers: true,
			};
		});
	}

	function handleStopFetchAnswers() {
		setIsFetching((prevState) => {
			return {
				...prevState,
				answers: false,
			};
		});
	}

	//fetch pokemon
	useEffect(() => {
		let tempList = [];
		if (gameState.round < numberOfPokemon) fetchData();

		async function fetchData() {
			setIsFetching((prevState) => {
				return {
					...prevState,
					pokemon: true,
				};
			});

			if (pokemonList.length <= 1) {
				tempList = await fetchPokemonList(MOCK, numberOfPokemon);
			} else {
				tempList = [...pokemonList];
			}
			const pokemonSpecies = await fetchPokemonSpecies(
				MOCK,
				tempList[gameState.round].id
			);

			tempList[gameState.round] = {
				...tempList[gameState.round],
				...pokemonSpecies,
			};

			setPokemonList([...tempList]);

			setIsFetching((prevState) => {
				return {
					...prevState,
					pokemon: false,
				};
			});
		}
	}, [gameState.round]);

	function handleNewGame() {
		setPokemonList([new Pokemon()]);
		setGuessedPokemonList([]);
		setGameState({
			...initialGameState
		});
	}

	function handleEasyAnswer(isCorrect, answer) {
		if (!gameState.hasAnswered) {
			if (isCorrect) {
				handleCorrectAnswer();
			} else {
				handleWrongAnswer();
			}

			setGameState((prevState) => {
				return {
					...prevState,
					selectedAnswer: capitalize(answer),
					hasAnswered: true,
				};
			});
		}
	}

	function handleHardAnswer(answer) {
		let nameScore = 0;
		let generationScore = 0;
		let typeScore = 0;
		let statScore = 0;

		nameScore = calculateScore.name(answer.name, pokemon.name);
		generationScore = calculateScore.generation(
			answer.generation,
			pokemon.generation.name
		);
		typeScore = calculateScore.type(answer.types, pokemon.types);
		statScore = calculateScore.stat(answer.stat, pokemon.stats);

		const tempScore = {
			nameScore,
			generationScore,
			typeScore,
			statScore,
		};

		setGameState((prevState) => {
			return {
				...prevState,
				score: [...prevState.score, { ...tempScore }],
				hasAnswered: true,
			};
		});
	}

	function handleNextQuestion() {
		setGameState((prevState) => {
			return {
				...prevState,
				hasAnswered: false,
				round: prevState.round + 1,
			};
		});
	}

	function handleCorrectAnswer() {
		setGuessedPokemonList((oldList) => {
			return [...oldList, true];
		});

		setGameState((prevState) => {
			return {
				...prevState,
				score: [...prevState.score, { gameScore: 50 }],
			};
		});
	}

	function handleWrongAnswer() {
		setGuessedPokemonList((oldList) => {
			return [...oldList, false];
		});

		setGameState((prevState) => {
			return {
				...prevState,
				score: [...prevState.score, { gameScore: 0 }],
			};
		});
	}

	if (isFetching.pokemon && gameState.round < 1) {
		return <p className="mt-6 text-6xl">loading...</p>;
	}

	//render
	if (pokemon) {
		return (
			<motion.div>
				{!isOver && (
					<GameHeader
						goToMenu={goToMenu}
						gameState={gameState}
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
							gameState={gameState}
							{...leftSidebarProps}
							side="left"
						/>
					)}
					<div className="h-full relative items-center flex flex-col min-h-128 w-[99vw] max-w-[90vw] md:min-w-100 sm:max-w-120 md:w-100 ">
						{!isOver ? (
							<>
								<MainWindow
									gameState={gameState}
									pokemon={pokemon}
									isFetching={isFetching}
								/>
								{difficulty === "Easy" ? (
									<Answers
										MOCK={MOCK}
										gameState={gameState}
										onAnswer={handleEasyAnswer}
										onNext={handleNextQuestion}
										onStartFetch={handleStartFetchAnswers}
										onStopFetch={handleStopFetchAnswers}
										isFetching={isFetching}
										pokemon={pokemon}
									/>
								) : (
									<InputArea
										gameState={gameState}
										onAnswer={handleHardAnswer}
										onNext={handleNextQuestion}
										pokemon={pokemon}
									/>
								)}
								{device === "small" &&
									gameState.hasAnswered && (
										<>
											<Sidebar
												gameState={gameState}
												isOver={isOver}
												{...rightSidebarProps}
												side="right"
											/>
											<Sidebar
												gameState={gameState}
												isOver={isOver}
												{...rightSidebarProps}
												side="left"
											/>
										</>
									)}
							</>
						) : (
							<Scoreboard
								score={gameState.score}
								pokemonList={pokemonList}
								guessedPokemonList={guessedPokemonList}
								startNewGame={handleNewGame}
								goToMenu={goToMenu}
								difficulty={difficulty}
							/>
						)}
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
}
