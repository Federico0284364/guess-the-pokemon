import {
	removeDashes,
	extractRoman,
	checkMispelling,
} from "./functions";

const calculateScore = {
	name(answer, name) {
		const isMispelled = checkMispelling(removeDashes(answer.toLowerCase()), removeDashes(name.toLowerCase()));
		if (isMispelled) {
			return 50;
		}

		if (
			removeDashes(answer.toLowerCase()) ===
			removeDashes(name.toLowerCase())
		) {
			return 100;
		} else return 0;
	},

	generation(answer, generation) {
		if (answer.toUpperCase() === extractRoman(generation).toUpperCase()) {
			return 20;
		} else return 0;
	},

	type(answerTypes, types) {
		let tempTypeScore = 0;

		types.forEach((type) => {
			if (
				types.length === 1 &&
				answerTypes[0].toLowerCase() === type.type.name &&
				answerTypes[1].toLowerCase() === "no type"
			) {
				tempTypeScore += 50;
			} else if (answerTypes.includes(type.type.name.toLowerCase())) {
				tempTypeScore += 25;
			}
		});

		return tempTypeScore;
	},

	stat(answerStat, stats) {
		let highestStat = { names: [], number: 0 };
		stats.forEach((stat) => {
			if (
				stat.base_stat === highestStat.number &&
				stat.stat.name != "total-base-stats"
			) {
				highestStat.names = [
					...highestStat.names,
					removeDashes(stat.stat.name.toLowerCase()),
				];
			} else if (
				stat.base_stat > highestStat.number &&
				stat.stat.name != "total-base-stats"
			) {
				highestStat.names = [
					removeDashes(stat.stat.name.toLowerCase()),
				];
				highestStat.number = stat.base_stat;
			}
		});
		if (highestStat.names.includes(answerStat.toLowerCase())) {
			return 50;
		} else return 0;
	},
};

export { calculateScore };
