import { useContext } from "react";
import { getColorByType, capitalize } from "../utils/functions.js";
import { WindowSizeContext } from "../context/window-size.jsx";

export default function MainWindow({ pokemon, gameState }) {
	const { windowSize, device } = useContext(WindowSizeContext);

	return (
		<div className="flex flex-col items-center rounded-2xl bg-orange-400 border-7 border-neutral-700 h-55 relative">
			<div className="flex justify-center items-center h-full">
				
				{pokemon.sprites.back_default && device != "small" && (
					<img
						onHover={(event) => handleSpriteClick(event)}
						className="w-[90%] h-[90%] mt-[-7px]"
						src={pokemon.sprites.back_default}
					/>
				)}
				<img
					className="w-[90%] h-[90%]  mt-[-7px]"
					src={pokemon.sprites.front_default}
				/>
			</div>

			<div className="w-[101%] mb-[-4px] bg-neutral-700 flex justify-around sm:justify-center items-center gap-1 h-10 relative">
				{gameState.hasAnswered && (
					<p className="text-lg">
						{pokemon.id + " - " + pokemon.name}
					</p>
				)}
				<div className="flex sm:absolute right-2 ">
					{gameState.hasAnswered && pokemon.types
						? pokemon.types.map((type) => {
								let typeClass = getColorByType(type.type.name);

								return (
									<p
										key={type.type.name}
										className={
											"inline-block text-center text-xs rounded-sm px-2 py-0.5 mt-0.5" +
											typeClass
										}
									>
										{capitalize(type.type.name)}
									</p>
								);
						  })
						: ""}
				</div>
			</div>
		</div>
	);
}
