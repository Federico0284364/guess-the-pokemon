
import { useContext } from "react";
import { WindowSizeContext } from "../context/window-size.jsx";
import { capitalize } from '../utils/functions.js';

export default function GameHeader({ gameState, pokemonList, guessedPokemonList}) {
	const { windowSize, device } = useContext(WindowSizeContext);

	return (
		<header className="flex justify-between sm:justify-center md:justify-normal items-center gap-8 sm:gap-0 ">
			<h1 className="mt-3 text-3xl sm:text-4xl sm:w-45 text-nowrap text-white font-semibold text-center uppercase">
				score: {gameState.score}
			</h1>
			{device === 'small' && <h1 className="bg-white mt-3 text-2xl sm:text-4xl text-nowrap rounded-md py-1 px-2 text-neutral-800 font-semibold text-center uppercase">{(gameState.round + 1) + '/10'}</h1>}
			{device != 'small' && <ul className="flex justify-self-end ml-6">
				{pokemonList
					.slice(0, gameState.round)
					.map((guessedPokemon, index) => {
						let isCorrect = guessedPokemonList[index];
						return (
							<div className="flex flex-col items-center relative w-13 lg:w-20">
								<img
									className="w-13 lg:w-17 hover:scale-125 transition-[2s]"
									src={guessedPokemon.sprites.front_default}
								/>
								<p className="absolute text-[11px] lg:text-xs bottom-[-7px] text-center left-0 right-0">
									{capitalize(guessedPokemon.name)}
								</p>

								{!isCorrect && (
									<p className="pointer-events-none text-red-500 font-bold text-4xl lg:text-5xl absolute top-[10%] lg:top-[15%] lg:left-[30%] opacity-50">
										X
									</p>
								)}
							</div>
						);
					})}
			</ul>}
		</header>
	);
}
