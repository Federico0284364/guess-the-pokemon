import { useSelector } from "react-redux";

import { StoreState } from "../../store/gameSlice";
import { capitalize, extractRoman, removeDashes } from "../../utils/functions";

export default function RightSidebarContent() {
  const { pokemonList, round } = useSelector((state: StoreState) => state.game);
  const pokemon = structuredClone(pokemonList[round]);

  console.log(pokemon);

  function getDescriptionByLanguage(language: string) {
    let chosenEntry: (typeof pokemon.flavor_text_entries)[0] | undefined;
    pokemon.flavor_text_entries.forEach((entry) => {
      if (entry.language.name === language) {
        chosenEntry = entry;
      }
    });

    return chosenEntry;
  }

  function getGeneraByLanguage(language: string) {
    let chosenEntry: (typeof pokemon.genera)[0] | undefined;
    pokemon.genera.forEach((entry) => {
      if (entry.language.name === language) {
        chosenEntry = entry;
      }
    });

    return chosenEntry?.genus;
  }

  const dotSymbol = "- ";

  return (
    <div className="mx-2 mt-4 max-w-[99%] text-wrap wrap flex flex-col gap-2 h-[94%] overflow-x-hidden text-neutral-200">
      <h1 className="font-semibold uppercase mb-2 text-3xl text-white self-center mt-[-6px]">
        Info
      </h1>

      <div>
        <label className="font-semibold uppercase text-white">
          {"Category:"}
        </label>
        <p className="text-md">{getGeneraByLanguage("en")}</p>
      </div>

      <div className="flex flex-wrap gap-1">
        <label className="font-semibold uppercase text-white">
          {"Generation:"}
        </label>
        <p className="uppercase text-md">
          {extractRoman(pokemon.generation.name)}
        </p>
      </div>

      <div>
        <label className="font-semibold uppercase text-white">Abilities:</label>
        <ul>
          {pokemon.abilities.map((ability) => {
            return (
              <>
                <li key={ability?.ability?.name + "sidebar"}>
                  {dotSymbol +
                    removeDashes(capitalize(ability?.ability?.name || ""))}
                </li>
              </>
            );
          })}
        </ul>
      </div>

      <div className="h-full text-ellipsis">
        <label className="font-semibold uppercase text-white">
          Description:
        </label>
        <p className="flex-auto overflow-ellipsis">
          {getDescriptionByLanguage("en")?.flavor_text}
        </p>
      </div>
    </div>
  );
}
