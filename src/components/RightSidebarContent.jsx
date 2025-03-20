import {
	capitalize,
	getColorByStat,
	removeDashes,
	extractRoman,
} from "../utils/functions";

import { Pokemon } from "../pokemonApiMock";

export default function RightSidebarContent({ pokemon = new Pokemon()}) {
	function getDescriptionByLanguage(language) {
		let chosenEntry;
		pokemon.flavor_text_entries.forEach((entry) => {
			if (entry.language.name === language) {
				chosenEntry = entry;
			}
		});

		return chosenEntry;
	}

	const dotSymbol = '- ';
	console.log(pokemon);

	return (
		<div className="mx-2 mt-4 flex flex-col gap-2 h-full overflow-auto text-neutral-100">
			<h1 className="font-semibold uppercase mb-2 text-3xl text-white self-center mt-[-6px]">
				Info
			</h1>

			<div className="flex gap-1">
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
								<li key={ability}>
									{dotSymbol + capitalize(ability.ability.name)}
								</li>
							</>
						);
					})}
				</ul>
			</div>

			<div className="h-full text-ellipsis">
				<label className="font-semibold uppercase text-white">Description:</label>
				<p className="flex-auto overflow-ellipsis">{getDescriptionByLanguage("en").flavor_text}</p>
			</div>
		</div>
	);
}
