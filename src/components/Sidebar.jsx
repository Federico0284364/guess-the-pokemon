import { Pokemon } from "../utils/pokemonApiMock";
import LeftSidebarContent from "./LeftSidebarContent";
import RightSidebarContent from "./RightSidebarContent";
import sidebarImg from "../assets/sidebar-wallpapers/vertical.jpg";
import { selectRandomImage } from "../utils/selectImage";
import { getColorByType, getInlineColorByType } from "../utils/functions";

import { motion, AnimatePresence } from "motion/react";

export default function Sidebar({
	isOver = false,
	side = null,
	hasAnswered = false,
	pokemon = new Pokemon(),
}) {
	let isOverClass = "sm:h-117 ";
	if (isOver) {
		isOverClass = "sm:h-155 ";
	}

	let initialX;
	if (side === "right") {
		initialX = 200;
	} else {
		initialX = -200;
	}

	return (
		<motion.aside
			initial={{ x: initialX }}
			animate={{ x: 0 }}
			className={
				isOverClass +
				" shadow-lg shadow-black/30 w-full z-150 relative mb-6 pb-2 md:pb-0 md:mb-0 md:mt-0 flex flex-col overflow-hidden rounded-2xl bg-neutral-500 border-8 border-neutral-700 md:w-38 lg:w-68"
			}
		>
			<AnimatePresence>
				{!hasAnswered ? (
					<motion.img
						key={sidebarImg}
						initial={{ opacity: 0, scale: 0 }}
						animate={{
							opacity: 1,
							scale: 1,
							transition: {
								delay: 0.3,
								duration: 0.6,
								type: "spring",
								bounce: 0.25,
							},
						}}
						exit={{
							x: side === "left" ? -300 : 300,
							transition: { duration: 0.6 },
						}}
						className="absolute object-cover w-full h-full rounded-lg"
						src={!isOver ? sidebarImg : selectRandomImage()}
					/>
				) : side === "left" ? (
					<motion.div
						exit={{ x: [0, -300], transition: { duration: 0.3 } }}
					>
						<LeftSidebarContent />
					</motion.div>
				) : side === "right" ? (
					<motion.div
						exit={{ x: [0, 300], transition: { duration: 0.3 } }}
						className="overflow-y-auto h-full"
					>
						<RightSidebarContent />
					</motion.div>
				) : (
					""
				)}
			</AnimatePresence>
		</motion.aside>
	);
}
