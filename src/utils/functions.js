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
	switch (type) {
			case "normal": return " bg-gray-400";
			case "fire": return " bg-red-500";
			case "water": return " bg-blue-500";
			case "electric": return " bg-yellow-400";
			case "grass": return " bg-green-500";
			case "ice": return " bg-cyan-300";
			case "fighting": return " bg-orange-700";
			case "poison": return " bg-purple-500";
			case "ground": return " bg-yellow-700";
			case "flying": return " bg-indigo-400";
			case "psychic": return " bg-pink-500";
			case "bug": return " bg-lime-500";
			case "rock": return " bg-yellow-800";
			case "ghost": return " bg-indigo-700";
			case "dragon": return " bg-indigo-800";
			case "dark": return " bg-gray-800";
			case "steel": return " bg-gray-500";
			case "fairy": return " bg-pink-300";
			default: return " bg-gray-200"; // Colore di default se il tipo non è riconosciuto
	}
}

