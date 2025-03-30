import { useState, useContext, useEffect, useRef } from "react";
import { DifficultyContext } from "../context/difficulty";
import { WindowSizeContext } from "../context/window-size.jsx";
import { POKEMON_LIST_MOCK, Pokemon } from "../utils/pokemonApiMock.js";
import { capitalize, extractRoman, removeDashes } from "../utils/functions.js";
import { calculateScore } from "../utils/gameFunctions.js";
import GameHeader from "./GameHeader.jsx";
import Answers from "./Answers.jsx";
import Sidebar from "./Sidebar.jsx";
import MainWindow from "./mainWindow.jsx";
import Scoreboard from "./Scoreboard.jsx";
import InputArea from "./InputArea.jsx";

const MOCK = false;
const numberOfPokemon = 10;

export default function PokemonGame({ goToMenu }) {
	//setup
	const { windowSize, device } = useContext(WindowSizeContext);
	const { difficulty } = useContext(DifficultyContext);

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

	//fetch pokemon
	useEffect(() => {
		let tempList = [];
		if (gameState.round < numberOfPokemon) fetchData();

		async function fetchData() {
			if (pokemonList.length <= 1) {
				tempList = await fetchPokemonList();
			} else {
				tempList = [...pokemonList];
			}
			const pokemonSpecies = await fetchPokemonSpecies(
				tempList[gameState.round].id
			);

			tempList[gameState.round] = {
				...tempList[gameState.round],
				...pokemonSpecies,
			};
			setPokemonList([...tempList]);
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

	//fetch pokemon-species
	async function fetchPokemonList(useMock = MOCK) {
		if (useMock) {
			return [...POKEMON_LIST_MOCK]; // Restituisce i dati di test
		}

		const uniqueNumbers = new Set();

		while (uniqueNumbers.size < numberOfPokemon) {
			uniqueNumbers.add(Math.floor(Math.random() * 1025) + 1);
		}

		const randomNumbers = [...uniqueNumbers];

		try {
			const responses = await Promise.all(
				randomNumbers.map(async (num) => {
					const response = await fetch(
						`https://pokeapi.co/api/v2/pokemon/${num}`
					);
					const data = await response.json();

					return data;
				})
			);

			return responses;
		} catch (error) {
			console.error("Errore nel fetch dei Pokémon:", error);
			return [POKEMON_LIST_MOCK[0]];
		}
	}
	async function fetchPokemonSpecies(pokemonId, useMock = MOCK) {
		if (useMock) {
			return;
		}

		try {
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			data.name = capitalize(data.name);
			return data;
		} catch (error) {
			console.error("Errore nel fetch dei Pokémon:", error);
			return [];
		}
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

	//render
	if (pokemon) {
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
				<section className="flex mt-4 gap-8">
					{(device === "medium" || device === "large") && (
						<Sidebar
							isOver={isOver}
							{...leftSidebarProps}
							side="left"
						/>
					)}
					<div className="h-full relative flex flex-col min-h-128 w-[99vw] max-w-[90vw] md:min-w-100 sm:max-w-120 md:w-100 ">
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
										pokemon={pokemon.name}
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
