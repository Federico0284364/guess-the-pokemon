import { useState } from "react";
import { useHover } from "../hooks/useHover";

export default function PokemonSprite({ pokemonName, pokemonSprite, imgClassName, ...props }) {
	const [ref, isHovering] = useHover();

	return (
		<div className="relative flex flex-col items-center">
			<img ref={ref} src={pokemonSprite} className={imgClassName} {...props}/>
      {isHovering && <p className="absolute z-1000 font-normal text-xs bg-neutral-800/95 rounded-lg p-2 top-10">{pokemonName}</p>}
		</div>
	);
}
