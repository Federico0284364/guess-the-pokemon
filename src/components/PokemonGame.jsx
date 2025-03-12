import { useState, useContext, useEffect, useRef } from "react";
import { DifficultyContext } from "../context/difficulty";
import { pokemonApiMockList, Pokemon } from "../pokemonApiMock.js";
import Answers from "./Answers.jsx";

export default function PokemonGame() {
	//setup
	const { difficulty } = useContext(DifficultyContext);
	const [pokemonList, setPokemonList] = useState([new Pokemon()]);
	const [game, setGame] = useState({
		hasAnswered: false,
		round: 0,
		hints: 0,
	});
	const pokemon = pokemonList[game.round];

	useEffect(() => {
		async function fetchData() {
			const tempList = await fetchInitialList();
			setPokemonList([...tempList]);
		}
		fetchData();

		return () => setPokemonList([]);
	}, []);

	async function fetchInitialList() {
		let tempList = [];

		tempList = [...pokemonApiMockList];

		for (let i = 1; i <= 3; i++) {
			const randomNum = Number((Math.random() * 1000 + 1).toFixed(0));
			/*const fetchedPokemon = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${randomNum}`
			)
				.then((response) => {
					return response.json();
				})
				.then((pokemonJson) => {
					console.log(pokemonJson.name);
					return pokemonJson;
				})
				.then((pokemonJson) => pokemonJson)
				.catch(new Error("errore"));

				tempList.push(fetchedPokemon);*/
		}
		return [...tempList];
	}

	function handleAnswer() {
		if (game.hasAnswered === false) {
			setGame((prevState) => {
				return {
					...prevState,
					hasAnswered: true,
				};
			});
		} else {
			setGame((prevState) => {
				return {
					...prevState,
					hasAnswered: false,
					round: prevState.round + 1,
				};
			});
		}
	}

	//render
	if (pokemon) {
		return (
			<div className="flex mt-8 gap-8">
				<div className="relative flex flex-col h-60 w-100 cursor-pointer ">
					<div className="flex flex-col rounded-2xl bg-orange-400 min-h-60 relative">
						<img
							className="h-35 m-auto"
							src={pokemon.sprites.front_default}
						/>
						<p className="text-center text-2xl py-3 absolute bottom-1 right-0 left-0">
							{game.hasAnswered && pokemon.name}
						</p>
					</div>

					<ul className="w-full text-center">
						<Answers
							game="pokemon"
							gameState={game}
							onAnswer={handleAnswer}
							pokemon={pokemon.name}
						/>
					</ul>
				</div>

				<div className="flex flex-col">
					<button>Hint {game.hints + 1}</button>
				</div>
			</div>
		);
	}
}
