import ScoreHistoryTable from "./ScoreHistoryTable";
import Button from "./UI/Button";
import { motion } from "framer-motion";
import changeSvg from "../assets/cycle-svgrepo-com.svg";
import hideSvg from "../assets/hide-svgrepo-com.svg";
import PokemonSprite from "./PokemonSprite";

export default function ScoreHistorySection({
	scoreHistory,
	difficulty,
	onToggle,
	onHide,
	device,
	isVisible,
}) {
	const bestEntry = scoreHistory.reduce((best, entry) => {
		if (!best || entry.score > best.score) {
			return entry;
		}
		return best;
	}, null);

	if (!isVisible && device != 'small') {
		return (
			<div className="flex justify-center items-baseline relative gap-4 mb-4">
				<Button
					onClick={device === "small" ? onToggle : onHide}
					variant={"secondary"}
					className="text-xs aspect-square absolute top-22 h-8"
				>
					<img
						className="h-6 aspect-square"
						src={device === "small" ? changeSvg : hideSvg}
					/>
				</Button>
				<h1 className="font-bold bg-white p-2 rounded-xl text-neutral-800 text-5xl shadow-md shadow-black/50 border-4 border-orange-900">
					{difficulty}
				</h1>

				
			</div>
		);
	}

	if (isVisible) {
		return (
			<motion.div
				transition={{
					duration: 0.5,
					ease: "circInOut",
					type: "spring",
				}}
				initial={{ x: -1000 }}
				animate={{ x: 0 }}
				exit={{ x: 1000 }}
				className=" flex flex-col items-center gap-0.5 text-center absolute md:static flex-1"
			>
				<div className="flex justify-center items-center relative gap-4 mb-4">
					<h1 className="font-bold bg-white p-2 rounded-xl text-neutral-800 text-5xl shadow-md shadow-black/50 border-4 border-orange-900">
						{difficulty}
					</h1>	
				</div>

				{bestEntry ? (
					<>
						<div className="font-semibold shadow-md shadow-black/50 text-2xl bg-orange-400 w-[100%] max-w-[90vw] rounded-2xl p-2 border-4 border-neutral-800">
							<h2 className=" text-shadow text-min-2 text-[clamp(1.2rem, 4vw, 3rem)]">
								{new Date(bestEntry.date).toLocaleDateString()} - Best: {bestEntry.score}
							</h2>
							<ul className="grid w-full grid-cols-5 md:grid-cols-10">
								{bestEntry.pokemon.map((entry) => {
									return (
										<li key={entry.name} className="w-full flex flex-col items-center">
											<PokemonSprite
												pokemonSprite={entry.sprite}
												pokemonName={entry.name}
												imgClassName={
													"w-full hover:scale-120 transition"
												}
												
											/>
											<p className={
											" text-shadow relative bottom-1 px-2 text-center text-white rounded-sm bg-opacity-10 text-sm"
										}>{entry.score}</p>
										</li>
									);
								})}
							</ul>
						</div>

						<ScoreHistoryTable
							scoreHistory={scoreHistory}
							difficulty={difficulty}
							bestEntry={bestEntry}
						/>
					</>
				) : (
					<p className="absolute ">No score yet</p>
				)}
			</motion.div>
		);
	}
	return null;
}

