import {useContext} from 'react';
import { DifficultyContext } from '../context/difficulty';

export default function DifficultyButton({chosenDifficulty}) {
	const { difficulty, setEasy, setHard} = useContext(DifficultyContext);
	const isChecked = difficulty === chosenDifficulty;

	return (
		<label className="text-lg">
			<input type="radio" name="difficulty" value={chosenDifficulty} checked={isChecked} onChange={chosenDifficulty === 'Easy' ? setEasy : setHard}/> {chosenDifficulty}
		</label>
	);
}
