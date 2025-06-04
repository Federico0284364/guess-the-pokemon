import { useContext } from "react";
import { WindowSizeContext } from "../../context/window-size.jsx";
import { capitalize, calculateTotalScore } from "../../utils/functions.js";
import pokeballImg from "../../assets/pokeball.png";
import { useNavigate } from "react-router-dom";
import  {useSelector, useDispatch} from 'react-redux';
import { newGame } from "../../store/gameSlice.js";
import Button from "../UI/Button.jsx";

export default function GameHeader({
	pokemonList,
	guessedPokemonList,
}) {
	const { device } = useContext(WindowSizeContext);
	
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { score, round } = useSelector(state => state.game);
	const totalScore = calculateTotalScore(score);

	function handleGoToMenu(){
		dispatch(newGame());
		navigate('/');
	}

	return (
		<header className="flex justify-between md:justify-normal items-center gap-6 sm:gap-0 mb-4">
			<Button onClick={handleGoToMenu} className="active:opacity-70 hover:bg-neutral-300 hover:text-neutral-700 font-extrabold text-xl text-center pb-1 mt-4 w-10 aspect-square items-center rounded-xl bg-neutral-700 border-4 border-neutral-300" variant="none">{'x'}</Button>
			<h1 className="mt-3 ml-3 text-3xl sm:text-3xl sm:w-45 text-nowrap text-white font-semibold text-center uppercase">
				score: {totalScore}
			</h1>
			{device === "small" && (
				<h1 className="bg-white mt-3 text-2xl sm:text-4xl text-nowrap rounded-md py-1 px-2 text-neutral-800 font-semibold text-center uppercase">
					{round + 1 + "/10"}
				</h1>
			)}
			{device != "small" && (
				<ul className="flex justify-self-end items-center gap-0 lg:gap-2 ml-3">
					{pokemonList
						.slice(0, round)
						.map((guessedPokemon, index) => {
							let isCorrect = guessedPokemonList[index];
							return (
								<div key={[pokemonList[index].id + 'header']} className="flex flex-col items-center relative w-13 lg:w-17">
									<img
										className="w-13 lg:w-15 hover:scale-125 transition-[2s]"
										src={
											guessedPokemon.sprites.front_default
										}
									/>
									<p className="absolute text-[10px] lg:text-xs bottom-[-7px] text-center left-0 right-0">
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
						{pokemonList.slice(round).map(() => {
							return (
								<div className="flex flex-col items-center relative w-13 lg:w-17">
									<img
									className="mt-2 aspect-square w-7 h-7 lg:w-8 lg:h-8 hover:scale-125 transition-[2s]"
									src={pokeballImg}
								/>
								</div>
								
							);
						})}
				</ul>
			)}
		</header>
	);
}
