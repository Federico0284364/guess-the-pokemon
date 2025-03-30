import {createContext, useState} from 'react';

export const DifficultyContext = createContext({
    difficulty: 'Easy',
})

export default function DifficultyContextProvider({children}) {
    const [difficulty, setDifficulty] = useState('Easy');

    function handleSetEasy(){
        setDifficulty('Easy');
    }

    function handleSetHard(){
        setDifficulty('Hard');
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