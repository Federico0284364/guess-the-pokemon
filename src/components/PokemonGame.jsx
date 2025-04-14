import { useState, useContext, useEffect, memo } from "react";
import { DifficultyContext } from "../context/difficulty";
import { WindowSizeContext } from "../context/window-size.jsx";
import {  Pokemon } from "../utils/pokemonApiMock.js";
import { calculateScore } from "../utils/gameFunctions.js";
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

const MOCK = false;
const numberOfPokemon = 2;

export default function PokemonGame({ goToMenu }) {
	//setup
	const { windowSize, device } = useContext(WindowSizeContext);
	const { difficulty } = useContext(DifficultyContext);

	const [isFetching, setIsFetching] = useState({pokemon: false, answers: false});
	const [pokemonList, setPokemonList] = useState([new Pokemon()]);
	const [guessedPokemonList, setGuessedPokemonList] = useState([]);
	const [gameState, setGameState] = useState({
		hasAnswered: false,
		round: 0,
		hints: 0,
		score: [],
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
				answers: true
			}
		});
	}

	function handleStopFetchAnswers() {
		setIsFetching((prevState) => {
			return {
				...prevState,
				answers: false
			}
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
					pokemon: true
				}
			})

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
					pokemon: false
				}
			})
		}
	}, [gameState.round]);

	function handleNewGame() {
		setPokemonList([new Pokemon()]);
		setGuessedPokemonList([]);
		setGameState({
			hasAnswered: false,
			round: 0,
			hints: 0,
			score: [],
			isOver: false,
		});
	}

	function handleEasyAnswer(isCorrect, event) {
		if (!gameState.hasAnswered) {
			if (isCorrect) {
				handleCorrectAnswer(event);
			} else {
				handleWrongAnswer();
			}

			setGameState((prevState) => {
				return {
					...prevState,
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

	if(isFetching.pokemon){
		return (
			<p className="h-full text-6xl">loading...</p>
		)
	}

	//render
	if (pokemon && isFetching.pokemon != true) {
		return (
			<>
				{!isOver && (
					<GameHeader
						goToMenu={goToMenu}
						gameState={gameState}
						pokemonList={pokemonList}
						guessedPokemonList={guessedPokemonList}
					/>
				)}
				<section className="flex gap-8">
					{(device === "medium" || device === "large") && (
						<Sidebar
							isOver={isOver}
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
				</section>
			</>
		);
	}
}
