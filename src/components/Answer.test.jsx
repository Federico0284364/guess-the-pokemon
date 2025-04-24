import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";

import Answer from "./Answer";
import { POKEMON_LIST_MOCK } from "../utils/pokemonApiMock";
import { beforeEach, expect } from "vitest";

const mockOnSelect = vi.fn();

describe("Answer component", () => {
	const props = {
		children: "Pikachu",
		pokemon: POKEMON_LIST_MOCK[0],
		onSelect: mockOnSelect,
		hasAnswered: false,
		isCorrect: false,
	};

	beforeEach(() => {
		mockOnSelect.mockClear();
	});

	test("renders a pokemon name inside the button", () => {
		render(<Answer {...props} />);

		const button = screen.getByRole("button");
		const buttonText = button.textContent;
		console.log(button);
		expect(button).toBeInTheDocument();
		expect(buttonText).toEqual("Pikachu");
	});

	test("it's orange when it's not clicked", () => {
		render(<Answer {...props} />);

		const button = screen.getByRole("button");
		expect(button).toHaveClass(/bg-orange/);
	});

	describe("onClick", () => {
		test("onSelect gets called", () => {
			render(<Answer {...props} />);

			const button = screen.getByRole("button");
			fireEvent.click(button);

			expect(mockOnSelect).toHaveBeenCalled();
		});

		test("becomes green if it's correct", () => {
			render(<Answer {...props} isSelected={true} isCorrect={true} hasAnswered={true} />);

			const button = screen.getByRole("button");
			fireEvent.click(button);

			expect(button).toHaveClass(/bg-green/);
		});

		test("becomes red if it's not correct", () => {
			render(<Answer {...props} isSelected={true} isCorrect={false} hasAnswered={true} />);

			let button = screen.getByRole("button");
			
			expect(button).toHaveClass(/bg-red/);
		});

		test("becomes grey if it's neither correct or selected", () => {
			render(<Answer {...props} isSelected={false} isCorrect={false} hasAnswered={true} />);

			let button = screen.getByRole("button");
			
			expect(button).toHaveClass(/bg-neutral/);
		})

		test("nothing happens if user has answered", () => {
			render(<Answer {...props} hasAnswered={true}/>);

			const button = screen.getByRole("button");			
			fireEvent.click(button);
			
			expect(mockOnSelect).not.toHaveBeenCalled();
		})
	});
});
