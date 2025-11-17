import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect } from "vitest";

import { DifficultyContext } from "../../context/difficulty";
import DifficultyButton from "./Difficultybutton";

let mockSetEasy: () => void;
let mockSetHard: () => void;

describe("DifficultyButton component", () => {
  beforeEach(() => {
    mockSetEasy = vi.fn();
    mockSetHard = vi.fn();
  });

  const easyProps = {
    selectedDifficulty: "easy",
    buttonDifficulty: "easy",
    onSelect: mockSetEasy,
  };

  const hardProps = {
    selectedDifficulty: "easy",
    buttonDifficulty: "hard",
    onSelect: mockSetHard,
  };

  test("renders a radio button", () => {
    render(<DifficultyButton {...easyProps} />);
    const easyInputElement = screen.getByRole("radio", { name: /easy/i });
    expect(easyInputElement).toBeInTheDocument();

    render(<DifficultyButton {...hardProps} />);
    const hardInputElement = screen.getByRole("radio", { name: /hard/i });
    expect(hardInputElement).toBeInTheDocument();
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
        <DifficultyButton {...easyProps} selectedDifficulty="easy" />
      </DifficultyContext.Provider>,
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
        <DifficultyButton {...hardProps} selectedDifficulty="hard" />
      </DifficultyContext.Provider>,
    );

    const text = screen.getAllByText(/Pokémon/i);
    expect(text[0]).toBeInTheDocument();
  });

  test("calls setEasy after click if difficulty is Hard", () => {
    const mockSetEasy = vi.fn();

    render(
      <DifficultyButton
        selectedDifficulty="hard"
        buttonDifficulty="easy"
        onSelect={mockSetEasy}
      />,
    );

    const inputElement = screen.getByRole("radio");

    fireEvent.click(inputElement);
    expect(mockSetEasy).toHaveBeenCalled();
  });

  test("calls setHard after click if difficulty is Easy", () => {
    const mockSetHard = vi.fn();

    render(
      <DifficultyButton
        selectedDifficulty="easy"
        buttonDifficulty="hard"
        onSelect={mockSetHard}
      />,
    );

    const inputElement = screen.getByRole("radio");

    fireEvent.click(inputElement);

    expect(mockSetHard).toHaveBeenCalled();
  });
});
