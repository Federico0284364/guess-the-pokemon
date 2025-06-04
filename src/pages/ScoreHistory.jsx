import { useContext, useState, useEffect } from "react";
import ScoreHistorySection from "../components/ScoreHistorySection";
import { motion, AnimatePresence } from "framer-motion";
import { WindowSizeContext } from "../context/window-size";

export default function ScoreRecord() {
	const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
	const { device } = useContext(WindowSizeContext);
	const [easyIsVisible, setEasyIsVisible] = useState(true);
	const [hardIsVisible, setHardIsVisible] = useState(true);

	const scoreHistory = JSON.parse(localStorage.getItem("score-history"));
	if (!scoreHistory) {
		return <p>No score yet</p>;
	}

	useEffect(() => {
		if (device === "small") {
			setEasyIsVisible(true);
			setHardIsVisible(false);
		} else {
			setEasyIsVisible(true);
			setHardIsVisible(true);
		}
	}, [device]);

	function handleHideSection(difficulty) {
		if (difficulty === "Easy") {
			setEasyIsVisible(!easyIsVisible);
		} else {
			setHardIsVisible(!hardIsVisible);
		}
	}

	function handleToggleSection() {
		if (easyIsVisible) {
			setEasyIsVisible(false);
			setHardIsVisible(true);
		} else {
			setEasyIsVisible(true);
			setHardIsVisible(false);
		}
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
				onToggle={() => handleToggleSection()}
				onHide={() => handleHideSection(difficulty)}
				device={device}
				isVisible={
					difficulty === "Easy" ? easyIsVisible : hardIsVisible
				}
			/>
		);
	}

	return (
		<motion.div layout className="flex gap-2 sm:gap-[6vw] h-[100vh] w-[100%] justify-center relative overflow-hidden">
			<AnimatePresence layout>
				{renderSection("Easy")}
				{renderSection("Hard")}
			</AnimatePresence>
		</motion.div>
	);
}
