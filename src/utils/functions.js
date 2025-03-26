export function shuffle(list) {
	const tempList = [...list];
	let shuffledList = [];

	for (let i = list.length - 1; i >= 0; i--) {
		const randomNum = Math.floor(Math.random() * (i + 1));
		const element = tempList[randomNum];
		tempList.splice(randomNum, 1);

		shuffledList.push(element);
	}
	return shuffledList;
}

export function getColorByType(type) {
	switch (type.toLowerCase()) {
		case "normal":
			return " bg-gray-400";
		case "fire":
			return " bg-red-500";
		case "water":
			return " bg-blue-500";
		case "electric":
			return " bg-yellow-400";
		case "grass":
			return " bg-green-500";
		case "ice":
			return " bg-cyan-300";
		case "fighting":
			return " bg-orange-700";
		case "poison":
			return " bg-purple-500";
		case "ground":
			return " bg-yellow-700";
		case "flying":
			return " bg-indigo-400";
		case "psychic":
			return " bg-pink-500";
		case "bug":
			return " bg-lime-500";
		case "rock":
			return " bg-yellow-800";
		case "ghost":
			return " bg-indigo-700";
		case "dragon":
			return " bg-indigo-800";
		case "dark":
			return " bg-gray-800";
		case "steel":
			return " bg-gray-500";
		case "fairy":
			return " bg-pink-300";
		default:
			return " bg-gray-200"; // Colore di default se il tipo non è riconosciuto
	}
}

export function getColorByStat(stat) {
	switch (stat.toLowerCase()) {
		case "hp":
			return " bg-green-400"; // HP (PS) - Verde su Central Wiki, Rosso qui per miglior contrasto
		case "attack":
			return " bg-yellow-400"; // Attack - Rosso
		case "defense":
			return " bg-orange-500"; // Defense - Giallo
		case "special-attack":
			return " bg-blue-300"; // Special Attack - Blu
		case "special-defense":
			return " bg-blue-500"; // Special Defense - Ciano
		case "speed":
			return " bg-pink-400"; // Speed - Viola
		default:
			return " bg-gray-800"; // Default - Grigio scuro
	}
}

export function capitalize(string) {
	return string.length > 1
		? string[0].toUpperCase() + string.slice(1)
		: string.toUpperCase();
}

export function removeDashes(string) {
	return string.replaceAll("-", " ");
}

export function extractRoman(string) {
	let newString = "";
	let isDash = false;
	for (const char of string) {
		if (isDash) {
			newString += char;
		}

		if (char === "-") {
			isDash = true;
		}
	}

	return newString;
}

export function calculateTotalScore(score) {
	console.log(score);
	let totalScore = 0;
	score.forEach((round) => {
		Object.values(round).forEach((entry) => {
			totalScore += entry;
		})
	})

	return totalScore;
}

export function checkMispelling(string, correctString) {
	if (
		string === correctString ||
		Math.abs(string.length - correctString.length) > 1
	) {
		return false;
	}

	let diffCount = 0;
	if (string.length === correctString.length) {
		for (let i = 0; i < string.length; i++) {
			if (string[i] != correctString[i]) {
				diffCount++;
			}
		}
		return diffCount === 1;
	}

	let i = 0;
	let j = 0;
	diffCount = 0;

	while (i < string.length && j < correctString.length) {
		if (string[i] !== correctString[j]) {
			diffCount++;
			if (string.length > correctString.length) {
				i++; 
			} else if (string.length < correctString.length) {
				j++; 
			}
		} else {
			i++;
			j++;
		}

		if (diffCount > 1) {
			return false;
		}
	}

	return true;
}
