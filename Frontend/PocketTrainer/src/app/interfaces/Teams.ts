export interface Team {
  id: number;
  name: string;
  pokemons: PokemonDDBB[];
}

export interface PokemonDDBB {
  number: number;
  name: string;
  moves: string[];
  ability: string;
  teams: Team[];
}
