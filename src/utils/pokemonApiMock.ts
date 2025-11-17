
import { Pokemon } from "../models/pokemon";

const POKEMON_ANSWERS_MOCK = ["raichu", "charmeleon", "tyranitar"];

const POKEMON_MOCK: Pokemon = {
  abilities: [
    { ability: { name: "overgrow", url: "/ability/overgrow" }, is_hidden: false, slot: 1 },
    { ability: { name: "chlorophyll", url: "/ability/chlorophyll" }, is_hidden: true, slot: 3 }
  ],
  base_experience: 64,
  cries: { latest: "/cries/latest/1", legacy: "/cries/legacy/1" },
  forms: [{ name: "bulbasaur", url: "/pokemon-form/1" }],
  game_indices: [{ game_index: 1, version: { name: "red", url: "/version/red" } }],
  height: 7,
  held_items: [],
  id: 1,
  is_default: true,
  location_area_encounters: "/encounters/1",
  moves: [
    { move: { name: "tackle", url: "/move/tackle" }, version_group_details: [] }
  ],
  order: 1,
  past_abilities: [],
  past_types: [],
  species: { name: "bulbasaur", url: "/pokemon-species/1" },
  sprites: {
    back_default: "/sprites/back/1.png",
    back_female: null,
    back_shiny: "/sprites/back/shiny/1.png",
    back_shiny_female: null,
    front_default: "/sprites/front/1.png",
    front_female: null,
    front_shiny: "/sprites/front/shiny/1.png",
		front_shiny_female: null,
  },
  stats: [
    { base_stat: 45, effort: 0, stat: { name: "hp", url: "/stat/hp" } },
    { base_stat: 49, effort: 0, stat: { name: "attack", url: "/stat/attack" } },
    { base_stat: 49, effort: 0, stat: { name: "defense", url: "/stat/defense" } },
  ],
  types: [
    { slot: 1, type: { name: "grass", url: "/type/grass" } },
    { slot: 2, type: { name: "poison", url: "/type/poison" } },
  ],
  weight: 69,

  // --- PokemonSpecies ---
  base_happiness: 70,
  capture_rate: 45,
  color: { name: "green", url: "/color/green" },
  egg_groups: [{ name: "monster", url: "/egg-group/monster" }],
  evolution_chain: { url: "/evolution-chain/1" },
  evolves_from_species: { name: "None", url: "" },
  flavor_text_entries: [
    {
      flavor_text: "A strange seed was planted on its back at birth.",
      language: { name: "en", url: "/lang/en" },
      version: { name: "red", url: "/version/red" }
    }
  ],
  form_descriptions: [],
  forms_switchable: true,
  gender_rate: 1,
  genera: [{ genus: "Seed Pokémon", language: { name: "en", url: "/lang/en" } }],
  generation: { name: "generation-i", url: "/generation/i" },
  growth_rate: { name: "medium-slow", url: "/growth-rate/medium-slow" },
  habitat: null,
  has_gender_differences: false,
  hatch_counter: 20,
  is_baby: false,
  is_legendary: false,
  is_mythical: false,
  name: "bulbasaur",
  names: [{ language: { name: "en", url: "/lang/en" }, name: "Bulbasaur" }],
  pal_park_encounters: [],
  pokedex_numbers: [{ entry_number: 1, pokedex: { name: "national", url: "/pokedex/national" } }],
  shape: { name: "quadruped", url: "/shape/quadruped" },
  varieties: [{ is_default: true, pokemon: { name: "bulbasaur", url: "/pokemon/1" } }],
};



export { POKEMON_MOCK, POKEMON_ANSWERS_MOCK };
