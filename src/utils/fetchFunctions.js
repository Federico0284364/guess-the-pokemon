import { capitalize } from "./functions";
import { POKEMON_LIST_MOCK, POKEMON_ANSWERS_MOCK } from "./pokemonApiMock";

export async function fetchPokemonList(useMock, numberOfPokemon) {
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

export async function fetchPokemonSpecies(useMock, pokemonId) {
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

export async function fetchAnswers(useMock, pokemon) {
	if (useMock) {
		return [...POKEMON_ANSWERS_MOCK];
	}

	const uniqueNumbers = new Set();

	while (uniqueNumbers.size < 3) {
		let randomId = Math.floor(Math.random() * 1025) + 1;
		if (randomId !== pokemon.id) {
			uniqueNumbers.add(randomId);
		}
	}

	const randomNumbers = [...uniqueNumbers];

	try {
		const responses = await Promise.all(
			randomNumbers.map((num) =>
				fetch(`https://pokeapi.co/api/v2/pokemon-species/${num}`)
					.then((response) => response.json())
					.then((data) => data.name)
			)
		);

		return responses;
	} catch (error) {
		console.error("Errore nel fetch delle risposte:", error);
		return [];
	}
}
