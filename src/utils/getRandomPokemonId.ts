import { NUMBER_OF_EXISTING_POKEMON } from "../data/constants";

export function getRandomPokemonId(){
  return Math.floor(Math.random() * NUMBER_OF_EXISTING_POKEMON) + 1
}

export function getListOfRandomPokemonIds(numberOfIds: number, bannedIds: number[] = []){
    const uniqueIds = new Set();
  
    while (uniqueIds.size < numberOfIds) {
      let randomId = getRandomPokemonId();
      if (!bannedIds.includes(randomId)) {
        uniqueIds.add(randomId);
      }
    }
  
    return [...uniqueIds];
}