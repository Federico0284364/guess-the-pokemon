import {useContext} from 'react';
import { DifficultyContext } from '../context/difficulty';

export default function DifficultyButton({difficulty}) {
	const { currentDifficulty, setEasy, setHard} = useContext(DifficultyContext);
	const isChecked = difficulty === currentDifficulty;

	return (
		<label className="text-lg">
			<input type="radio" name="difficulty" value={difficulty} checked={isChecked} onChange={difficulty === 'Easy' ? setEasy : setHard}/> {difficulty}
		</label>
	);
}
