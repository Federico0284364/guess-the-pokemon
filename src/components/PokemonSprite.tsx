import { ImgHTMLAttributes, RefObject } from "react";
import { useHover } from "../hooks/useHover";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
	pokemonName: string,
	pokemonSprite: string,
	imgClassName: string,
}

export default function PokemonSprite({ pokemonName, pokemonSprite, imgClassName, ...props }: Props) {
	const [ref, isHovering] = useHover<HTMLImageElement>();

	return (
		<div className="relative flex flex-col items-center">
			<img ref={ref} src={pokemonSprite} className={imgClassName} alt={pokemonName + ' image'} {...props}/>
      {isHovering && <p className="pointer-events-none absolute text-xs sm:text-sm z-1000 font-normal bg-neutral-800/95 rounded-lg px-2 py-1 bottom-[-26px]">{pokemonName}</p>}
		</div>
	);
}
