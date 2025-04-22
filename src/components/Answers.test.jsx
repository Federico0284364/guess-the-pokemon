import React from "react";
import '@testing-library/jest-dom';
import { screen, within, render, fireEvent } from "@testing-library/react";
import { POKEMON_LIST_MOCK } from "../utils/pokemonApiMock";
import Answers from "./Answers";
import { beforeEach, expect } from "vitest";
import { initialGameState } from "./PokemonGame";
import { capitalize } from "../utils/functions";

describe("Answers component", () => {
	const props = {
		gameState: initialGameState,
		pokemon: POKEMON_LIST_MOCK[0],
		onAnswer: vi.fn(),
		onNext: vi.fn(),
		onStartFetch: vi.fn(),
		onStopFetch: vi.fn() ,
		isFetching: false,
		MOCK: true,
	};

  props.gameState.hasAnswered = false;
  
  async function selectListItems(){
    const listItemElements = await screen.findAllByRole("listitem");   
    return listItemElements;
  }

  async function selectButtons(){
    const buttonElements = await screen.findAllByRole("button");
    return buttonElements;
  }

	test("renders 4 different Answer elements", async () => {
		render(<Answers {...props}/>);

		const listItems = await selectListItems();

    expect(listItems.length).not.toEqual(3);
    expect(listItems.length).toEqual(4);
    expect(listItems.length).not.toEqual(5);

    const buttons = listItems.map((item) => {
      within(item).getByRole('button');
    })
    expect(buttons.length).toEqual(4);
	});

  test("renders exactly one correct answer", async () => {
    render(<Answers {...props}/>);

    const buttons = await selectButtons();
    const correctAnswer = capitalize(props.pokemon.name);		
    const correctButton = buttons.filter(button => button.textContent.includes(correctAnswer));

    expect(correctButton.length).toEqual(1);
  })

  test('calls onAnswer when an Answer is clicked', async () => {
    render(<Answers {...props}/>);
    const randomInteger = Math.floor(Math.random() * 4);

    const buttons = await selectButtons();
    fireEvent.click(buttons[randomInteger]);

    expect(props.onAnswer).toHaveBeenCalled();
  })

  test("doesn't do anything when an Answer is clicked and hasAnswered = true", async () => {
    const answeredGameState = {...props.gameState, hasAnswered: true}
    render(<Answers {...props} gameState={answeredGameState}/>);
    const randomInteger = Math.floor(Math.random() * 4);

    const buttons = await selectButtons();
    fireEvent.click(buttons[randomInteger]);

    expect(props.onAnswer).not.toHaveBeenCalled();
  })

  test('renders NextButton when answered', async () => {
    const answeredGameState = {...props.gameState, hasAnswered: true}
    render(<Answers {...props} gameState={answeredGameState}/>);

    const nextButton = await screen.findByRole('button', {name: /next/i})

    expect(nextButton).toBeInTheDocument();
  })

  test('calls onNext when NextButton is pressed', async () => {
    const currentGameState = {...props.gameState, hasAnswered: true}
    render(<Answers {...props} gameState={currentGameState}/>);

    const nextButton = await screen.findByRole('button', {name: /next/i})
    fireEvent.click(nextButton);

    expect(props.onNext).toHaveBeenCalled();
  })
});
