// src/store/gameSlice.js
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { capitalize } from "../utils/functions";
import { calculateScore } from "../utils/gameFunctions";
import { Pokemon } from "../utils/pokemonApiMock";
import { POKEMON_LIST_MOCK } from "../utils/pokemonApiMock.js";

export const NUMBER_OF_POKEMON = 2;

const standardState = {
	hasAnswered: false,
	selectedAnswer: "",
	round: 0,
	score: [],

	pokemonList: [POKEMON_LIST_MOCK[0]],
	guessedPokemonList: [],
	answersList: [],
	isFetching: {
		pokemonList: false,
		answers: false,
	},
};

const initialState =
	JSON.parse(sessionStorage.getItem("game-state")) || standardState;

function calculateHardGameScore(answer, pokemon) {
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
			state.isFetching = { pokemonList: false, answers: false };
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
		setIsFetching: (state, action) => {
			state.isFetching = { ...state.isFetching, ...action.payload };
		},
	},
});

export function getCurrentPokemon(state) {
	return state.game.pokemonList[state.game.round];
}

export function getIsOver(state) {
	return state.game.round === NUMBER_OF_POKEMON;
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
	setIsFetching,
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
