import { useContext, useEffect } from "react";
import { getColorByType, capitalize } from "../utils/functions.js";
import { WindowSizeContext } from "../context/window-size.jsx";

import { motion, useAnimate } from "framer-motion";

export default function MainWindow({ pokemon, gameState, isFetching }) {
	const { windowSize, device } = useContext(WindowSizeContext);
	const [jumpScope, jump] = useAnimate();

	function handleSpriteJump(event = null) {
		if (event) {
			jump(event.target, {
				y: [0, -50, 0, -20, 0, -10, 0],
				transition: { duration: 0.6, ease: "easeInOut" },
			});
		} else {
			jump("img", {
				y: [0, -15, 0, -10, 0, -5, 0],
				transition: { duration: 0.6, ease: "easeInOut" },
			});
		}
	}

	function handleRenderSprite() {
		jump("img", { scale: [0, 1], duration: 1 });
	}

	useEffect(() => {
		if (!gameState.hasAnswered) {
			return;
		}
		handleSpriteJump();
	}, [gameState.hasAnswered]);

	if (pokemon && pokemon.id != 0) {
		return (
			<div className="w-full flex flex-col items-center rounded-2xl bg-orange-400 border-7 border-neutral-700 h-55 relative">
				<motion.div
					ref={jumpScope}
					className="flex justify-center items-center h-full"
				>
					{pokemon.sprites.back_default && device != "small" && (
						<motion.img
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							onClick={(event) => handleSpriteJump(event)}
							key={pokemon.id}
							className="w-[90%] h-[90%] mt-[-7px]"
							src={pokemon.sprites.back_default}
						/>
					)}

					{pokemon.sprites.front_default && (
						<motion.img
							initial={{ scale: 0 }}
							animate={{ scale: 1, transition: {duration: 0.18} }}
							onClick={(event) => handleSpriteJump(event)}
							key={pokemon.id + "2"}
							className="w-[90%] h-[90%]  mt-[-7px]"
							src={pokemon.sprites.front_default}
						/>
					)}
				</motion.div>

				<div className="w-[101%] mb-[-4px] bg-neutral-700 flex justify-around sm:justify-center items-center gap-1 h-10 relative">
					{gameState.hasAnswered && (
						<p className="text-lg">
							{pokemon.id + " - " + pokemon.name}
						</p>
					)}
					<div className="flex sm:absolute right-2 ">
						{gameState.hasAnswered && pokemon.types
							? pokemon.types.map((type) => {
									let typeClass = getColorByType(
										type.type.name
									);

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
}
