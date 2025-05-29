import ScoreHistoryTable from "./ScoreHistoryTable";
import Button from "./Button";
import { motion } from "framer-motion";
import changeSvg from "../assets/cycle-svgrepo-com.svg";
import PokemonSprite from "./PokemonSprite";

export default function ScoreHistorySection({
	scoreHistory,
	difficulty,
	onClick,
	device,
}) {
	const bestEntry = scoreHistory.reduce((best, entry) => {
		if (!best || entry.score > best.score) {
			return entry;
		}
		return best;
	}, null);

	if (!bestEntry){
		return null
	}

	return (
		<motion.div
			transition={{ duration: 0.5, ease: "circInOut", type: "spring" }}
			initial={{ x: -1000 }}
			animate={{ x: 0 }}
			exit={{ x: 1000 }}
			className=" flex flex-col items-center gap-0.5 text-center absolute md:static flex-1"
		>
			<div className="flex justify-center items-center gap-4 mb-4">
				<h1 className="font-bold bg-white p-2 rounded-xl text-neutral-800 text-5xl shadow-md shadow-black/50 border-4 border-orange-900">
					{difficulty}
				</h1>
				{device === "small" && (
					<Button
						onClick={onClick}
						variant={"secondary"}
						className="text-xs aspect-square h-8"
					>
						<img className="h-4 aspect-square" src={changeSvg} />
					</Button>
				)}
			</div>

			<div className="font-semibold shadow-md shadow-black/50 text-2xl bg-orange-400 w-[110%] max-w-[90vw] rounded-2xl p-2 border-4 border-neutral-800">
				<h2>
					Best: {bestEntry.score}
				</h2>
				<ul className="flex">
					{bestEntry.pokemon.map((entry) => {
						return (
							<li className="w-[10%]">
								<PokemonSprite pokemonSprite={entry.sprite} pokemonName={entry.name} imgClassName={"w-full hover:scale-120 transition"}/>
							</li>
						);
					})}
				</ul>
			</div>

			<ScoreHistoryTable
				scoreHistory={scoreHistory}
				difficulty={difficulty}
			/>
		</motion.div>
	);
}
