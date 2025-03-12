import { useState, useContext, useEffect, useRef } from "react";
import { DifficultyContext } from "../context/difficulty";
import { pokemonApiMockList, Pokemon } from "../pokemonApiMock.js";
import Answers from "./Answers.jsx";

export default function PokemonGame() {
	//setup
	const [pokemonList, setPokemonList] = useState([new Pokemon()]);
	const [game, setGame] = useState({
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

		pokemonList.length >= 10 ? setIsLoading(false) : '';

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

	//next question
	function handleNextPokemon() {
		setGame((prevState) => {
			return {
				...prevState,
				round: prevState.round + 1,
			};
		});
	}

	//render
	if (pokemon){
		return (
			<div className="flex mt-8 gap-8">
				<div className="relative flex flex-col h-60 w-100 cursor-pointer ">
					<div className="flex flex-col rounded-2xl bg-orange-400 min-h-60">
						<img
							className="h-35 m-auto"
							src={pokemon.sprites.front_default}
						/>
						<p className="text-center text-2xl py-3 ">{pokemon.name}</p>
					</div>
	
					<ul className="w-full text-center">
						<Answers game="pokemon" onSelect={handleNextPokemon} />
					</ul>
				</div>
	
				<div className="flex flex-col">
					<button>Hint {game.hints + 1}</button>
				</div>
			</div>
		);
	}
	
}
