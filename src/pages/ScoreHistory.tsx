import { useContext, useState, useEffect } from "react";
import ScoreHistorySection from "../components/ScoreHistorySection";
import { motion, AnimatePresence } from "framer-motion";
import { WindowSizeContext } from "../context/window-size";
import BackButton from "../components/UI/BackButton";
import { useNavigate } from "react-router-dom";
import type { Difficulty } from "../context/difficulty";

export type SavedScoreEntry = {
	date: string,
	score: number,
	difficulty: Difficulty
	pokemon: {
		name: string,
		sprite: string,
		score: number
	}[]
}

export default function ScoreRecord() {
	const { device } = useContext(WindowSizeContext);
	const [easyIsVisible, setEasyIsVisible] = useState(true);
	const [hardIsVisible, setHardIsVisible] = useState(true);
	const navigate = useNavigate();

	const scoreHistory: SavedScoreEntry[] = JSON.parse(localStorage.getItem("score-history") || '');

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

	function handleGoToMenu() {
			navigate("/");
		}

	function handleHideSection(difficulty: Difficulty) {
		if (difficulty === "easy") {
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

	const filteredHistory = {
		"easy": scoreHistory.filter((entry) => entry.difficulty === "easy"),

		"hard": scoreHistory.filter((entry) => entry.difficulty === "hard"),
	};

	function renderSection(difficulty: Difficulty) {
		return (
			<ScoreHistorySection
				scoreHistory={filteredHistory[difficulty]}
				difficulty={difficulty}
				key={difficulty}
				onToggle={() => handleToggleSection()}
				device={device}
				onGoToMenu={handleGoToMenu}
				isVisible={
					difficulty === "easy" ? easyIsVisible : hardIsVisible
				}
			/>
		);
	}

	return (
		<motion.div className="flex gap-2 sm:gap-[6vw] h-[100vh] w-[100%] justify-center relative overflow-hidden">
			<AnimatePresence>
				{renderSection("easy")}
				{renderSection("hard")}
			</AnimatePresence>
		</motion.div>
	);
}
