export interface Team {
  id: number;
  name: string;
  pokemons: PokemonDDBB[];
}

export interface TeamDTO {
  id: number;
  name: string;
}

export interface PokemonDDBB {
  number: number;
  name: string;
  moves: string[];
  ability: string;
  teams: Team[];
}
export interface TeamObserver {
  update(teams: Team[]): void;
}
