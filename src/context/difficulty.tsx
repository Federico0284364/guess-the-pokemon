import {createContext, ReactNode, useState} from 'react';

export type Difficulty = 'easy' | 'hard'

const initialState =
	(sessionStorage.getItem("difficulty") || '') || 'easy';

export const DifficultyContext = createContext({
    difficulty: initialState,
})

type Props = {
    children: ReactNode
}

export default function DifficultyContextProvider({children}: Props) {
    const [difficulty, setDifficulty] = useState(initialState);

    function saveToStorage(value: Difficulty){
        sessionStorage.setItem('difficulty', JSON.stringify(value))
    }

    function handleSetEasy(){
        setDifficulty('easy');
        saveToStorage('easy');
        
    }

    function handleSetHard(){
        setDifficulty('hard');
        saveToStorage('hard')
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