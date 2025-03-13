import { useState, useContext, useEffect, useRef } from "react";
import { DifficultyContext } from "../context/difficulty";
import { POKEMON_LIST_MOCK, Pokemon } from "../pokemonApiMock.js";
import { getColorByType } from "../utils/functions.js";
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
		let tempList;
		async function fetchData() {
			tempList = await fetchInitialList();
			setPokemonList([...tempList]);
		}
		fetchData();

		return () => setPokemonList([]);
	}, []);

	async function fetchInitialList(useMock = true) {
		if (useMock) {
			console.log("Using mock Pokémon list");
			return [...POKEMON_LIST_MOCK]; // Restituisce i dati di test
		}

		const randomNumbers = Array.from(
			{ length: 3 },
			() => Math.floor(Math.random() * 1000) + 1
		);

		try {
			const responses = await Promise.all(
				randomNumbers.map((num) =>
					fetch(`https://pokeapi.co/api/v2/pokemon/${num}`).then(
						(response) => response.json()
					)
				)
			);

			console.log("Fetched Pokémon List:", responses);
			return responses;
		} catch (error) {
			console.error("Errore nel fetch dei Pokémon:", error);
			return [];
		}
	}

	function handleAnswer() {
		if (game.hasAnswered === false && !game.hasAnswered) {
			setGame((prevState) => {
				return {
					...prevState,
					hasAnswered: true,
				};
			});
		}
	}

	function handleNextQuestion() {
		setGame((prevState) => {
			return {
				...prevState,
				hasAnswered: false,
				round: prevState.round + 1,
			};
		});
	}

	//render
	if (pokemon) {
		return (
			<div className="flex mt-8 gap-8">
				<div className="flex flex-col">
					<p></p>
				</div>

				<div className="relative flex flex-col h-60 w-100 ">
					<div className="flex flex-col items-center rounded-3xl bg-orange-400 min-h-60 relative">
						<div className="primary-color absolute right-1 top-1 rounded-full w-10 h-10">
							<p className="text-white  text-xl text-center mt-1">
								{game.hasAnswered ? pokemon.id : '?'}
							</p>
						</div>

						<img
							className="w-50 block mt-2 fill-black"
							src={pokemon.sprites.front_default}
						/>
						<div className="flex gap-1">
							<p>
								
							</p>
							{game.hasAnswered &&
								pokemon.types ?
								pokemon.types.map((type) => {
									let typeClass = getColorByType(
										type.type.name
									);

									return (
										<p
											className={
												"inline-block text-center text-md rounded-sm px-2 py-0.5" +
												typeClass
											}
										>
											{type.type.name}
										</p>
									);
								}) : 'Type: ?'}
						</div>
					</div>

					<div className="w-full text-center">
						<Answers
							game="pokemon"
							gameState={game}
							onAnswer={handleAnswer}
							onNext={handleNextQuestion}
							pokemon={pokemon.name}
						/>
					</div>
				</div>

				<div className="flex flex-col"></div>
			</div>
		);
	}
}
