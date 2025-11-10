// src/store/gameSlice.js
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { capitalize } from "../utils/functions.js";
import { calculateScore } from "../utils/gameFunctions.js";
import { Pokemon } from "../models/pokemon.js";
import { POKEMON_LIST_MOCK } from "../utils/pokemonApiMock.js";
import { HardAnswerOption } from "../models/answer.js";
import { NUMBER_OF_POKEMON_LIST } from "../data/constants.js";

type GameState = {
	hasAnswered: boolean,
	selectedAnswer: string,
	round: number,
	score: object[],

	pokemonList: Pokemon[],
	guessedPokemonList: boolean[], //indica se il pokemon i è stato indovinato oppure no
	answersList: {
		text: string,
		isCorrect: boolean
	}[],

}

const standardState: GameState = {
	hasAnswered: false,
	selectedAnswer: "",
	round: 0,
	score: [],

	pokemonList: [],
	guessedPokemonList: [],
	answersList: [],
};

const savedState = sessionStorage.getItem("game-state");
const initialState: GameState = savedState ? JSON.parse(savedState) : standardState;

function calculateHardGameScore(answer: HardAnswerOption, pokemon: Pokemon) {
	let nameScore = calculateScore.name(answer.name, pokemon.name);
	let generationScore = calculateScore.generation(
		answer.generation,
		pokemon.generation.name
	);
	let typeScore = calculateScore.type(answer.types, pokemon.types);
	let statScore = calculateScore.stat(answer.stat, pokemon.stats);

	return {
		nameScore,
		generationScore,
		typeScore,
		statScore,
	};
}

const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		newGame: (state) => {
			state.hasAnswered = false;
			state.selectedAnswer = "";
			state.round = 0;
			state.score = [];

			state.pokemonList = [];
			state.guessedPokemonList = [];
			state.answersList = [];
		},

		easyAnswer: (state, action) => {
			const { answer } = action.payload;
			state.selectedAnswer = capitalize(answer.name);
			state.hasAnswered = true;
		},

		hardAnswer: (state, action) => {
			const { answer, pokemon } = action.payload;
			const result = calculateHardGameScore(answer, pokemon);
			state.score.push(result);
			state.hasAnswered = true;
		},

		correctAnswer: (state) => {
			state.score.push({ gameScore: 50 });
			state.guessedPokemonList.push(true);
		},

		wrongAnswer: (state) => {
			state.score.push({ gameScore: 0 });
			state.guessedPokemonList.push(false);
		},

		nextQuestion: (state) => {
			state.hasAnswered = false;
			state.round += 1;
			state.answersList = [];
		},

		//state
		setPokemonList: (state, action) => {
			state.pokemonList = action.payload;
		},
		setGuessedPokemonList: (state, action) => {
			state.guessedPokemonList = action.payload;
		},
		setAnswersList: (state, action) => {
			state.answersList = action.payload;
		},
	},
});

export function getCurrentPokemon(state: {game: GameState}) {
	return state.game.pokemonList[state.game.round];
}

export function getIsOver(state: {game: GameState}) {
	return state.game.round === NUMBER_OF_POKEMON_LIST;
}

export const {
	newGame,
	easyAnswer,
	hardAnswer,
	correctAnswer,
	wrongAnswer,
	nextQuestion,

	setPokemonList,
	setGuessedPokemonList,
	setAnswersList,
} = gameSlice.actions;

const store = configureStore({
	reducer: {
		game: gameSlice.reducer,
	},
});

store.subscribe(() => {
	const state = store.getState();
	sessionStorage.setItem("game-state", JSON.stringify(state.game));
});

export default store;
