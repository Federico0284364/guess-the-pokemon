export class Pokemon {
	constructor(name = "", id = 0, types = [], sprite, stats, color = 'white', generation = 'I') {
		this.name = name;
		this.id = id;
		this.types = types.map((type) => ({
			type: { name: type },
		}));
		this.sprites = { front_default: sprite, back_default: null };
		this.stats = [
			{
				base_stat: 72,
				effort: 0,
				stat: {
					name: "hp",
					url: "https://pokeapi.co/api/v2/stat/1/",
				},
			},
			{
				base_stat: 85,
				effort: 2,
				stat: {
					name: "attack",
					url: "https://pokeapi.co/api/v2/stat/2/",
				},
			},
		];

		this.color = { name: color },
		this.generation = {name: generation},
		this.flavor_text_entries = [],
		this.generation = {name: generation}
	}
}
const POKEMON_ANSWERS_MOCK = ["raichu", "charmeleon", "tyranitar"];

const POKEMON_LIST_MOCK = [
	{
		abilities: [
			{
				ability: {
					name: "hustle",
					url: "https://pokeapi.co/api/v2/ability/55/",
				},
				is_hidden: false,
				slot: 1,
			},
		],
		base_experience: 147,
		cries: {
			latest: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/634.ogg",
			legacy: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/634.ogg",
		},
		forms: [
			{
				name: "zweilous",
				url: "https://pokeapi.co/api/v2/pokemon-form/634/",
			},
		],
		game_indices: [
			{
				game_index: 634,
				version: {
					name: "black",
					url: "https://pokeapi.co/api/v2/version/17/",
				},
			},
			{
				game_index: 634,
				version: {
					name: "white",
					url: "https://pokeapi.co/api/v2/version/18/",
				},
			},
			{
				game_index: 634,
				version: {
					name: "black-2",
					url: "https://pokeapi.co/api/v2/version/21/",
				},
			},
			{
				game_index: 634,
				version: {
					name: "white-2",
					url: "https://pokeapi.co/api/v2/version/22/",
				},
			},
		],
		height: 14,
		held_items: [],
		id: 634,
		is_default: true,
		location_area_encounters:
			"https://pokeapi.co/api/v2/pokemon/634/encounters",
		
		name: "zweilous",
		order: 757,
		past_abilities: [],
		past_types: [],
		species: {
			name: "zweilous",
			url: "https://pokeapi.co/api/v2/pokemon-species/634/",
		},
		sprites: {
			back_default:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/634.png",
			back_female: null,
			back_shiny:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/634.png",
			back_shiny_female: null,
			front_default:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/634.png",
			front_female: null,
			front_shiny:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/634.png",
			front_shiny_female: null,
			other: {
				dream_world: {
					front_default:
						"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/634.svg",
					front_female: null,
				},
				home: {
					front_default:
						"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/634.png",
					front_female: null,
					front_shiny:
						"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/634.png",
					front_shiny_female: null,
				},
				"official-artwork": {
					front_default:
						"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/634.png",
					front_shiny:
						"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/634.png",
				},
				showdown: {
					back_default:
						"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/634.gif",
					back_female: null,
					back_shiny:
						"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/shiny/634.gif",
					back_shiny_female: null,
					front_default:
						"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/634.gif",
					front_female: null,
					front_shiny:
						"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/634.gif",
					front_shiny_female: null,
				},
			},
			versions: {
				"generation-i": {
					"red-blue": {
						back_default: null,
						back_gray: null,
						back_transparent: null,
						front_default: null,
						front_gray: null,
						front_transparent: null,
					},
					yellow: {
						back_default: null,
						back_gray: null,
						back_transparent: null,
						front_default: null,
						front_gray: null,
						front_transparent: null,
					},
				},
				"generation-ii": {
					crystal: {
						back_default: null,
						back_shiny: null,
						back_shiny_transparent: null,
						back_transparent: null,
						front_default: null,
						front_shiny: null,
						front_shiny_transparent: null,
						front_transparent: null,
					},
					gold: {
						back_default: null,
						back_shiny: null,
						front_default: null,
						front_shiny: null,
						front_transparent: null,
					},
					silver: {
						back_default: null,
						back_shiny: null,
						front_default: null,
						front_shiny: null,
						front_transparent: null,
					},
				},
				"generation-iii": {
					emerald: {
						front_default: null,
						front_shiny: null,
					},
					"firered-leafgreen": {
						back_default: null,
						back_shiny: null,
						front_default: null,
						front_shiny: null,
					},
					"ruby-sapphire": {
						back_default: null,
						back_shiny: null,
						front_default: null,
						front_shiny: null,
					},
				},
				"generation-iv": {
					"diamond-pearl": {
						back_default: null,
						back_female: null,
						back_shiny: null,
						back_shiny_female: null,
						front_default: null,
						front_female: null,
						front_shiny: null,
						front_shiny_female: null,
					},
					"heartgold-soulsilver": {
						back_default: null,
						back_female: null,
						back_shiny: null,
						back_shiny_female: null,
						front_default: null,
						front_female: null,
						front_shiny: null,
						front_shiny_female: null,
					},
					platinum: {
						back_default: null,
						back_female: null,
						back_shiny: null,
						back_shiny_female: null,
						front_default: null,
						front_female: null,
						front_shiny: null,
						front_shiny_female: null,
					},
				},
				"generation-v": {
					"black-white": {
						animated: {
							back_default:
								"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/634.gif",
							back_female: null,
							back_shiny:
								"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/shiny/634.gif",
							back_shiny_female: null,
							front_default:
								"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/634.gif",
							front_female: null,
							front_shiny:
								"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/634.gif",
							front_shiny_female: null,
						},
						back_default:
							"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/634.png",
						back_female: null,
						back_shiny:
							"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/shiny/634.png",
						back_shiny_female: null,
						front_default:
							"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/634.png",
						front_female: null,
						front_shiny:
							"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/shiny/634.png",
						front_shiny_female: null,
					},
				},
				"generation-vi": {
					"omegaruby-alphasapphire": {
						front_default:
							"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omegaruby-alphasapphire/634.png",
						front_female: null,
						front_shiny:
							"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omegaruby-alphasapphire/shiny/634.png",
						front_shiny_female: null,
					},
					"x-y": {
						front_default:
							"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/634.png",
						front_female: null,
						front_shiny:
							"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/shiny/634.png",
						front_shiny_female: null,
					},
				},
				"generation-vii": {
					icons: {
						front_default:
							"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/634.png",
						front_female: null,
					},
					"ultra-sun-ultra-moon": {
						front_default:
							"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/634.png",
						front_female: null,
						front_shiny:
							"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/shiny/634.png",
						front_shiny_female: null,
					},
				},
				"generation-viii": {
					icons: {
						front_default:
							"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/634.png",
						front_female: null,
					},
				},
			},
		},
		stats: [
			{
				base_stat: 72,
				effort: 0,
				stat: {
					name: "hp",
					url: "https://pokeapi.co/api/v2/stat/1/",
				},
			},
			{
				base_stat: 25,
				effort: 2,
				stat: {
					name: "attack",
					url: "https://pokeapi.co/api/v2/stat/2/",
				},
			},
			{
				base_stat: 10,
				effort: 0,
				stat: {
					name: "defense",
					url: "https://pokeapi.co/api/v2/stat/3/",
				},
			},
			{
				base_stat: 65,
				effort: 0,
				stat: {
					name: "special-attack",
					url: "https://pokeapi.co/api/v2/stat/4/",
				},
			},
			{
				base_stat: 70,
				effort: 0,
				stat: {
					name: "special-defense",
					url: "https://pokeapi.co/api/v2/stat/5/",
				},
			},
			{
				base_stat: 58,
				effort: 0,
				stat: {
					name: "speed",
					url: "https://pokeapi.co/api/v2/stat/6/",
				},
			},
		],
		types: [
			{
				slot: 1,
				type: {
					name: "dark",
					url: "https://pokeapi.co/api/v2/type/17/",
				},
			},
			{
				slot: 2,
				type: {
					name: "dragon",
					url: "https://pokeapi.co/api/v2/type/16/",
				},
			},
		],
		weight: 500,
	},
	new Pokemon("Charizard", 1, ["fire", "flying"], "/charizard.png"),
	new Pokemon("Eevee", 8, ["normal"], "/eevee.jpg"),

	new Pokemon("Pikachu", 15, ["electric"], "/pikachu.png"),
];



export { POKEMON_LIST_MOCK, POKEMON_ANSWERS_MOCK };
