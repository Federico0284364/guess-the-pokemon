import { useContext, useState } from "react";
import ScoreHistorySection from "../components/ScoreHistorySection";
import { motion, AnimatePresence } from "framer-motion";
import { WindowSizeContext } from "../context/window-size";

export default function ScoreRecord() {
	const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
	const { device } = useContext(WindowSizeContext);

	const scoreHistory = JSON.parse(localStorage.getItem("score-history"));
	if (!scoreHistory) {
		return <p>No score yet</p>;
	}

	function handleToggleDifficulty() {
		selectedDifficulty === "Easy"
			? setSelectedDifficulty("Hard")
			: setSelectedDifficulty("Easy");
	}

	const difficulties = ["Easy", "Hard"];
	const filteredHistory = {
		Easy: scoreHistory.filter((entry) => entry.difficulty === "Easy"),

		Hard: scoreHistory.filter((entry) => entry.difficulty === "Hard"),
	};

	function renderSection(difficulty) {
		return (
			<ScoreHistorySection
				scoreHistory={filteredHistory[difficulty]}
				difficulty={difficulty}
				key={difficulty}
				onClick={handleToggleDifficulty}
				device={device}
			/>
		);
	}

	return (
		<div className="flex gap-2 sm:gap-[6vw] h-[100vh] w-[100vw] justify-center relative overflow-hidden">
			{device === "small" ? (
				<AnimatePresence>
					{renderSection(selectedDifficulty)}
				</AnimatePresence>
			) : (
				<>
					{renderSection("Easy")} {renderSection("Hard")}
				</>
			)}
		</div>
	);
}
