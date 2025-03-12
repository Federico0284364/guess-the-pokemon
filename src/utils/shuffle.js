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
