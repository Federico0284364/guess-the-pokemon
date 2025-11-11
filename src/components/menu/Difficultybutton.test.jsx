import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import { beforeEach, expect } from "vitest";
import DifficultyButton from "./Difficultybutton";
import { DifficultyContext } from "../../context/difficulty";

let mockSetEasy;
let mockSetHard;

describe("DifficultyButton component", () => {
	beforeEach(() => {
		mockSetEasy = vi.fn();
		mockSetHard = vi.fn();
	}
)

	test("renders an easy radio button", () => {
		render(<DifficultyButton chosenDifficulty={"easy"} />);

		const inputElement = screen.getByRole("radio", { name: /easy/i });

		expect(inputElement).toBeInTheDocument();
	});

	test("renders an hard radio button", () => {
		render(<DifficultyButton chosenDifficulty={"hard"} />);

		const inputElement = screen.getByRole("radio", { name: /hard/i });

		expect(inputElement).toBeInTheDocument();
	});

	test("renders more info if the input is checked and difficulty is easy", () => {
		render(
			<DifficultyContext.Provider
				value={{
					difficulty: "easy",
					setEasy: mockSetEasy,
					setHard: mockSetHard,
				}}
			>
				<DifficultyButton chosenDifficulty="easy" />
			</DifficultyContext.Provider>
		);
		const text = screen.getByText(/Pokémon/i);

		expect(text).toBeInTheDocument();		
	});

	test("renders more info if the input is checked and difficulty is hard", () => {
		const mockSetEasy = vi.fn();
		const mockSetHard = vi.fn();

		render(
			<DifficultyContext.Provider
				value={{
					difficulty: "hard",
					setEasy: mockSetEasy,
					setHard: mockSetHard,
				}}
			>
				<DifficultyButton chosenDifficulty="hard" />
			</DifficultyContext.Provider>
		);

		const text = screen.getAllByText(/Pokémon/i);
		expect(text[0]).toBeInTheDocument();
	});

	test("doesn't call setEasy after click if the difficulty is already Easy", () => {
		const mockSetEasy = vi.fn();
		const mockSetHard = vi.fn();

		render(<DifficultyContext.Provider
				value={{
					difficulty: "easy",
					setEasy: mockSetEasy,
					setHard: mockSetHard,
				}}
			>
				<DifficultyButton chosenDifficulty="easy" />
			</DifficultyContext.Provider>)

		const inputElement = screen.getByRole("radio");

		fireEvent.click(inputElement);
		expect(mockSetEasy).not.toHaveBeenCalled();
	})

	test('calls setEasy after click if difficulty is Hard', () => {
		const mockSetEasy = vi.fn();
		const mockSetHard = vi.fn();

		render(<DifficultyContext.Provider
				value={{
					difficulty: "hard",
					setEasy: mockSetEasy,
					setHard: mockSetHard,
				}}
			>
				<DifficultyButton chosenDifficulty="easy" />
			</DifficultyContext.Provider>)

		const inputElement = screen.getByRole("radio");

		fireEvent.click(inputElement);
		expect(mockSetEasy).toHaveBeenCalled();
	})
});
