import { HTMLAttributes, useRef } from "react";
import { useSelector } from "react-redux";

import { HardAnswerOption } from "../../models/answer.js";
import { StoreState, getCurrentPokemon } from "../../store/gameSlice.js";
import Input from "./Input.js";
import NextButton from "./NextButton.js";
import SelectInput from "./SelectInput.js";

const GENERATIONS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
const STATS = [
  "HP",
  "Attack",
  "Defense",
  "Special attack",
  "Special defense",
  "Speed",
];
const TYPES1 = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];
const TYPES2 = ["no type", ...TYPES1];

type Props = HTMLAttributes<HTMLElement> & {
  onAnswer: (answer: HardAnswerOption) => void;
  onNext: () => void;
};

export default function InputArea({ onAnswer, onNext }: Props) {
  const { hasAnswered, score, round } = useSelector(
    (state: StoreState) => state.game,
  );
  const pokemon = useSelector(getCurrentPokemon);

  const nameInput = useRef<HTMLInputElement>(null);
  const generationInput = useRef<HTMLSelectElement>(null);
  const type1Input = useRef<HTMLSelectElement>(null);
  const type2Input = useRef<HTMLSelectElement>(null);
  const statInput = useRef<HTMLSelectElement>(null);

  function handleConfirm() {
    if (
      type1Input.current?.value.toLowerCase() ===
      type2Input.current?.value.toLowerCase()
    ) {
      alert("Invalid input, choose two different types");
      return;
    }
    const answer = {
      name: nameInput.current?.value ?? "",
      generation: generationInput.current?.value ?? "",
      types: [
        type1Input.current?.value?.toLowerCase() ?? "",
        type2Input.current?.value?.toLowerCase() ?? "",
      ],
      stat: statInput.current?.value ?? "",
    };
    onAnswer(answer);
  }

  return (
    <section className="flex flex-wrap gap-x-1 gap-y-2">
      <Input
        hasAnswered={hasAnswered}
        score={score}
        round={round}
        ref={nameInput}
        key={round}
        label="Name"
        widthClass={"w-[70%]"}
      />
      <SelectInput
        pokemon={pokemon}
        hasAnswered={hasAnswered}
        score={score}
        round={round}
        ref={generationInput}
        optionArray={GENERATIONS}
        label="Generation"
        widthClass={"flex-1"}
      />
      <SelectInput
        pokemon={pokemon}
        hasAnswered={hasAnswered}
        score={score}
        round={round}
        ref={type1Input}
        optionArray={TYPES1}
        label="Type 1"
        widthClass={"w-[30%]"}
      />
      <SelectInput
        pokemon={pokemon}
        hasAnswered={hasAnswered}
        score={score}
        round={round}
        ref={type2Input}
        optionArray={TYPES2}
        label="Type 2"
        widthClass={"w-[30%]"}
      />
      <SelectInput
        pokemon={pokemon}
        hasAnswered={hasAnswered}
        score={score}
        round={round}
        ref={statInput}
        optionArray={STATS}
        label="Best stat"
        widthClass={"flex-1"}
      />

      {!hasAnswered && (
        <button
          onClick={() => {
            handleConfirm();
          }}
          className="hover:opacity-85 h-14 mt-4 active:opacity-75 w-full text-lg bg-green-700 rounded-sm border-4 border-neutral-700"
        >
          Confirm
        </button>
      )}

      {hasAnswered && <NextButton onClick={onNext} />}
    </section>
  );
}
