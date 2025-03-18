import { getColorByType, capitalize } from "../utils/functions.js";

export default function MainWindow({ pokemon, gameState }) {

	return (
		<div className="flex flex-col items-center rounded-2xl bg-orange-400 border-7 border-neutral-700 min-h-60 relative">
			<div className="bg-neutral-700 absolute right-1 top-1 rounded-full w-10 h-10">
				<p className="text-white  text-xl text-center mt-1">
					{gameState.hasAnswered ? pokemon.id : "?"}
				</p>
			</div>

			<a
				className="flex justify-center items-center h-full"
				target={gameState.hasAnswered ? '_blank' : ''}
				href={
					gameState.hasAnswered
						? `https://wiki.pokemoncentral.it/${capitalize(
								pokemon.name
						  )}`
						: "javascript:void(0)"
				}
			>{console.log(pokemon)}
				{pokemon.sprites.back_default && (
					<img
						onClick={(event) => handleSpriteClick(event)}
						className="w-45 h-45 mt-[-7px]"
						src={pokemon.sprites.back_default}
					/>
				)}
				<img
					className="w-45 h-45 mt-[-7px]"
					src={pokemon.sprites.front_default}
				/>
			</a>

			<div className="w-full bg-neutral-700 flex justify-center items-center gap-1 h-10">
				{gameState.hasAnswered && pokemon.types
					? pokemon.types.map((type) => {
							let typeClass = getColorByType(type.type.name);

							return (
								<p
									className={
										"inline-block text-center text-md rounded-sm px-2 py-0.5 mt-1.5" +
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
	);
}
