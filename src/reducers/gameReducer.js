import { capitalize } from "../utils/functions";
import { calculateScore } from "../utils/gameFunctions.js";

export const initialGameState = {
	hasAnswered: false,
	selectedAnswer: "",
	round: 0,
	score: [],
};

export function gameReducer(state, action) {
	const { answer, pokemon } = action.payload || {};

	switch (action.type) {
		case "NEW_GAME":
			return { ...initialGameState };
		case "EASY_ANSWER":
			return {
				...state,
				selectedAnswer: capitalize(answer.name),
				hasAnswered: true,
			};
		case "CORRECT_ANSWER":
			return {
				...state,
				score: [...state.score, { gameScore: 50 }],
			};
		case "WRONG_ANSWER":
			return {
				...state,
				score: [...state.score, { gameScore: 0 }],
			};
		case "HARD_ANSWER":
			return {
				...state,
				score: [...state.score, { ...calculateHardGameScore(answer, pokemon) }],
				hasAnswered: true,
			};
		case "NEXT_QUESTION":
			return {
				...state,
				hasAnswered: false,
				round: state.round + 1,
			};
		default:
			return state;
	}
}

function calculateHardGameScore(answer, pokemon) {
	let nameScore = 0;
	let generationScore = 0;
	let typeScore = 0;
	let statScore = 0;

	nameScore = calculateScore.name(answer.name, pokemon.name);
	generationScore = calculateScore.generation(
		answer.generation,
		pokemon.generation.name
	);
	typeScore = calculateScore.type(answer.types, pokemon.types);
	statScore = calculateScore.stat(answer.stat, pokemon.stats);

	const tempScore = {
		nameScore,
		generationScore,
		typeScore,
		statScore,
	};

	return tempScore;
}
