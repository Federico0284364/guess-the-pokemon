import {createContext, useState} from 'react';
import { newGame } from '../store/gameSlice';

const initialState =
	JSON.parse(sessionStorage.getItem("difficulty")) || 'Easy';

export const DifficultyContext = createContext({
    difficulty: initialState,
})

export default function DifficultyContextProvider({children}) {
    const [difficulty, setDifficulty] = useState(initialState);

    function saveToStorage(value){
        sessionStorage.setItem('difficulty', JSON.stringify(value))
    }

    function handleSetEasy(){
        setDifficulty('Easy');
        saveToStorage('Easy');
        
    }

    function handleSetHard(){
        setDifficulty('Hard');
        saveToStorage('Hard')
    }

    const context = {
        difficulty: difficulty,
        setEasy: handleSetEasy,
        setHard: handleSetHard
    }

    return (
        <DifficultyContext.Provider value={context}>
            {children}
        </DifficultyContext.Provider>
    )
}