import { useContext, useEffect, useMemo } from "react";
import {
	getColorByType,
	getInlineColorByType,
	capitalize,
} from "../utils/functions.js";
import { WindowSizeContext } from "../context/window-size.jsx";

import { motion, useAnimate, AnimatePresence } from "framer-motion";

export default function MainWindow({ pokemon, gameState, isFetching }) {
	const { windowSize, device } = useContext(WindowSizeContext);
	const [jumpScope, jump] = useAnimate();

	let type1Color;
	let type2Color;
	if (pokemon.types[0]) {
		type1Color = useMemo(() => {
			return getInlineColorByType(pokemon.types[0].type.name);
		}, [pokemon.id]);
		type2Color = useMemo(() => {
			if (pokemon.types.length === 1) {
				return;
			}

			return getInlineColorByType(pokemon.types[1].type.name);
		}, [pokemon.id]);
	}

	const backgroundColor = !gameState.hasAnswered
		? "#fb923c"
		: `linear-gradient(45deg, ${type1Color}, ${type2Color || type1Color})`;

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

	if (pokemon.sprites.front_default) {
		return (
			<motion.div
				layout
				key={"window"}
				style={{
					background: backgroundColor,
				}}
				className={
					" shadow-lg shadow-black/30 w-full flex flex-col items-center rounded-2xl bg-orange-400 border-7 border-neutral-700 h-55 relative"
				}
			>
				<motion.div
					ref={jumpScope}
					initial={{ scale: 0.1 }}
					animate={{ scale: 1, transition: { duration: 0.5 } }}
					exit={{ scale: 1, transition: { duration: 1 } }}
					className="flex justify-center items-center h-full"
				>
					<AnimatePresence mode="wait">
						{pokemon.sprites.back_default && device != "small" && (
							<motion.img
								initial={{ scale: 0.1 }}
								animate={{
									scale: 1,
									transition: { duration: 0.3 },
								}}
								exit={{
									scale: 0,
									transition: { duration: 0.3 },
								}}
								onClick={(event) => handleSpriteJump(event)}
								key={pokemon.sprites.back_default}
								className="w-[90%] h-[90%] mt-[-7px] cursor-pointer"
								src={pokemon.sprites.back_default}
							/>
						)}
						
						{pokemon.sprites.front_default && (
							<motion.img
								initial={{ scale: 0.1 }}
								animate={{
									scale: 1,
									transition: { duration: 0.3 },
								}}
								exit={{
									scale: 0,
									transition: { duration: 0.3 },
								}}
								onClick={(event) => handleSpriteJump(event)}
								key={pokemon.sprites.front_default}
								className="w-[90%] h-[90%]  mt-[-7px] cursor-pointer"
								src={pokemon.sprites.front_default}
							/>
						)}
					</AnimatePresence>
				</motion.div>

				<div className="w-[101%] mb-[-4px] bg-neutral-700 flex justify-around sm:justify-center items-center gap-1 h-10 relative">
					{gameState.hasAnswered && (
						<>
							{windowSize.width >= 640 && (
								<motion.p
									transition={{ duration: 0.2 }}
									animate={{ x: [-30, 0], opacity: [0.5, 1] }}
									className="bg-neutral-800 rounded-full px-3 mt-1 text-lg absolute left-4"
								>
									{pokemon.id}
								</motion.p>
							)}
							<motion.p
								key={pokemon.name + "name"}
								transition={{ duration: 0.05 }}
								animate={{ scale: [0, 1] }}
								className="text-lg"
							>
								{pokemon.name}
							</motion.p>
						</>
					)}
					<motion.div
						variants={{
							moving: { transition: { staggerChildren: 0.5 } },
							hidden: { opacity: 1 },
						}}
						animate="moving"
						initial="hidden"
						className="flex sm:absolute right-2 "
					>
						{gameState.hasAnswered && pokemon.types
							? pokemon.types.map((type) => {
									let typeClass = getColorByType(
										type.type.name
									);

									return (
										<motion.p
											variants={{
												moving: {
													x: [30, 0],
													opacity: [0.5, 1],
												},
												hidden: {
													x: 30,
													opacity: 0.5,
												},
											}}
											animate="moving"
											initial="hidden"
											transition={{ duration: 0.2 }}
											key={type.type.name}
											className={
												"inline-block text-center text-xs rounded-sm px-2 py-0.5 mt-0.5" +
												typeClass
											}
										>
											{capitalize(type.type.name)}
										</motion.p>
									);
							  })
							: ""}
					</motion.div>
				</div>
			</motion.div>
		);
	}
}
