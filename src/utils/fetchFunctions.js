import { NUMBER_OF_EASY_WRONG_ANSWERS, NUMBER_OF_POKEMON_LIST } from "../data/constants";
import { capitalize } from "./functions";
import { getListOfRandomPokemonIds } from "./getRandomPokemonId";
import { POKEMON_LIST_MOCK, POKEMON_ANSWERS_MOCK } from "./pokemonApiMock";

export async function fetchPokemonList(useMock, numberOfPokemon = NUMBER_OF_POKEMON_LIST) {
	if (useMock) {
		return [...POKEMON_LIST_MOCK];
	}

	const pokemonIdsList = getListOfRandomPokemonIds(numberOfPokemon);

	try {
		const pokemonList = await Promise.all(
			pokemonIdsList.map(async (num) => {
				const response = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${num}`
				);

				if (!response.ok) {
					throwErrorFromResponse(response, "Invalid response");
				}

				const pokemon = await response.json();
				return pokemon;
			})
		);

		return pokemonList;
	} catch (error) {
		console.error("Error while fetching pokemon list:", error);
		return [...POKEMON_LIST_MOCK];
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
			throwErrorFromResponse(response, "Invalid response");
		}

		const pokemon = await response.json();
		pokemon.name = capitalize(pokemon.name);
		return pokemon;
	} catch (error) {
		console.error(
			`Error while fetching pokemon species (pokemon n.${pokemonId}):`,
			error
		);
		return [];
	}
}

export async function fetchAnswers(useMock, pokemon) {
	if (useMock) {
		return [...POKEMON_ANSWERS_MOCK];
	}

	const pokemonIdsList = getListOfRandomPokemonIds(3, [pokemon.id])

	try {
		const pokemonNamesList = await Promise.all(
			pokemonIdsList.map(async (num) => {
				const response = await fetch(
					`https://pokeapi.co/api/v2/pokemon-species/${num}`
				);

				if (!response.ok) {
					throwErrorFromResponse(response, "Invalid response");
				}

				const data = await response.json();
				return data.name;
			})
		);

		return pokemonNamesList;
	} catch (error) {
		console.error("Error while fetching possible answers:", error);
		return [];
	}
}

async function throwErrorFromResponse(response, message) {
	const error = new Error(message);
	error.code = response.code;
	error.info = await response.json();
	throw error;
}
