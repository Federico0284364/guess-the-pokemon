import { useState, useContext, useEffect, useRef } from "react";
import { DifficultyContext } from "../context/difficulty";
import { POKEMON_LIST_MOCK, Pokemon } from "../pokemonApiMock.js";
import Answers from "./Answers.jsx";
import Sidebar from "./Sidebar.jsx";
import MainWindow from "./MainWindow.jsx";

const MOCK = false;
const numberOfPokemon = 3;

export default function PokemonGame() {
	//setup
	const { difficulty } = useContext(DifficultyContext);
	const [pokemonList, setPokemonList] = useState([new Pokemon()]);
	const [guessedPokemonList, setGuessedPokemonList] = useState([]);
	const [gameState, setGameState] = useState({
		hasAnswered: false,
		round: 0,
		hints: 0,
		score: 0,
	});

	const pokemon = pokemonList[gameState.round];

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
		async function fetchData() {
			if (pokemonList.length <= 1) {
				tempList = await fetchPokemonList();
			} else {
				tempList = [...pokemonList];
			}
			const pokemonSpecies = await fetchPokemonSpecies(
				tempList[gameState.round].name
			);
			console.log("le info sul pokemon sono", pokemonSpecies);
			tempList[gameState.round] = {
				...tempList[gameState.round],
				...pokemonSpecies,
			};
			console.log(tempList);
			setPokemonList([...tempList]);
		}

		fetchData();
	}, [gameState.round]);

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

	async function fetchPokemonSpecies(pokemonName, useMock = MOCK) {
		if (useMock) {
			return;
		}

		try {
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
			);
			const data = await response.json();
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
	if (pokemon) {
		return (
			<>
				<h1 className="mt-4 text-4xl text-white font-semibold text-center uppercase">
					score: {gameState.score}
				</h1>
				<ul>
					{pokemonList.map((guessedPokemon, index) => {
						let isCorrect = guessedPokemonList[index];
						return (
							<img src={pokemon.sprites.front_default}/>
						)
					})}
				</ul>
				<main className="flex mt-8 gap-8">
					<Sidebar {...leftSidebarProps} side="left" />
					<div className="relative flex flex-col h-60 w-100 ">
						<MainWindow gameState={gameState} pokemon={pokemon} />
						<Answers
							MOCK={MOCK}
							game="pokemon"
							gameState={gameState}
							onAnswer={handleAnswer}
							onNext={handleNextQuestion}
							pokemon={pokemon.name}
						/>
					</div>
					<Sidebar {...rightSidebarProps} side="right" />
				</main>
			</>
		);
	}
}
