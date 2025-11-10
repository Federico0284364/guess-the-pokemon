import {
	NUMBER_OF_EASY_WRONG_ANSWERS,
	NUMBER_OF_POKEMON_LIST,
} from "../data/constants";
import { capitalize } from "./functions";
import { getListOfRandomPokemonIds } from "./getRandomPokemonId";
import { POKEMON_ANSWERS_MOCK } from "./pokemonApiMock";
import { Pokemon } from "../models/pokemon";

export async function fetchPokemonList(
	pokemonIdsList: number[]
): Promise<Pokemon[]> {
	try {
		const pokemonList = await Promise.all(
			pokemonIdsList.map(async (pokemonId) => {
				const response = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${pokemonId}`
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
		throw error;
	}
}

export async function fetchPokemonSpeciesList(
	pokemonIdsList: number[]
): Promise<Pokemon[]> {
	try {
		const pokemonSpeciesList = await Promise.all(
			pokemonIdsList.map(async (pokemonId) => {
				const response = await fetch(
					`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
				);

				if (!response.ok) {
					throwErrorFromResponse(response, "Invalid response");
				}

				const pokemon = await response.json();
				return pokemon;
			})
		);

		return pokemonSpeciesList;
	} catch (error) {
		console.error("Error while fetching pokemon list:", error);
		throw error;
	}
}

export async function fetchPokemonSpecies(pokemonId: number) {
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
		throw error;
	}
}

export async function fetchAnswers(pokemonId: number) {
	const pokemonIdsList = getListOfRandomPokemonIds(
		NUMBER_OF_EASY_WRONG_ANSWERS,
		[pokemonId]
	);

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
		throw error;
	}
}

async function throwErrorFromResponse(response: Response, message: string) {
	type CustomError = Error & { code?: number; info?: any };

	const error: CustomError = new Error(message);
	error.code = response.status;
	error.info = await response.json();
	throw error;
}
