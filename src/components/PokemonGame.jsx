import { useState, useContext, useEffect, useRef } from "react";
import { DifficultyContext } from "../context/difficulty";
import { WindowSizeContext } from "../context/window-size.jsx";
import { POKEMON_LIST_MOCK, Pokemon } from "../pokemonApiMock.js";
import { capitalize } from "../utils/functions.js";
import GameHeader from "./GameHeader.jsx";
import Answers from "./Answers.jsx";
import Sidebar from "./Sidebar.jsx";
import MainWindow from "./mainWindow.jsx";
import Scoreboard from "./Scoreboard.jsx";

const MOCK = false;
const numberOfPokemon = 10;

export default function PokemonGame() {
	//setup
	const { windowSize, device } = useContext(WindowSizeContext);
	const { currentDifficulty } = useContext(DifficultyContext);

	const [pokemonList, setPokemonList] = useState([new Pokemon()]);
	const [guessedPokemonList, setGuessedPokemonList] = useState([]);
	const [gameState, setGameState] = useState({
		hasAnswered: false,
		round: 0,
		hints: 0,
		score: 0,
	});

	let isOver = false;
	if (gameState.round === numberOfPokemon) {
		isOver = true;
	}
	console.log(isOver, gameState.round);
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
			console.log(tempList);
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
			score: 0,
			isOver: false,
		});
	}

	//fetch pokemon-species
	async function fetchPokemonList(useMock = MOCK) {
		if (useMock) {
			return [...POKEMON_LIST_MOCK]; // Restituisce i dati di test
		}

		const randomNumbers = Array.from(
			{ length: numberOfPokemon },
			() => Math.floor(Math.random() * 1000) + 1
		);

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
			return [];
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
			const data = await response.json();
			data.name = capitalize(data.name);
			return data;
		} catch (error) {
			console.error("Errore nel fetch dei Pokémon:", error);
			return [];
		}
	}

	function handleAnswer(isCorrect, event) {
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
				score: prevState.score + 50,
			};
		});
	}

	function handleWrongAnswer() {
		setGuessedPokemonList((oldList) => {
			return [...oldList, false];
		});
	}

	//render
	if (pokemon && currentDifficulty === "Easy") {
		return (
			<>
				{!isOver && (
					<GameHeader
						gameState={gameState}
						pokemonList={pokemonList}
						guessedPokemonList={guessedPokemonList}
					/>
				)}
				<main className="flex mt-4 gap-8">
					{(device === "medium" || device === "large") && (
						<Sidebar {...leftSidebarProps} side="left" />
					)}
					<div className="relative flex flex-col min-h-128 w-[99vw] max-w-[85vw] md:min-w-100 sm:max-w-120 md:w-100 ">
						{!isOver ? (
							<>
								<MainWindow
									gameState={gameState}
									pokemon={pokemon}
								/>
								<Answers
									MOCK={MOCK}
									game="pokemon"
									gameState={gameState}
									onAnswer={handleAnswer}
									onNext={handleNextQuestion}
									pokemon={pokemon.name}
								/>
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
								totalScore={gameState.score}
								pokemonList={pokemonList}
								guessedPokemonList={guessedPokemonList}
								startNewGame={handleNewGame}
							/>
						)}
					</div>
					{(device === "medium" || device === "large") && (
						<Sidebar {...rightSidebarProps} side="right" />
					)}
				</main>
			</>
		);
	} else {
	}
}
