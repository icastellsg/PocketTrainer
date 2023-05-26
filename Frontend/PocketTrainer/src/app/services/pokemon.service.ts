import { Injectable } from '@angular/core';
import { Resultado } from '../interfaces/pokeapi';
import { Pokemon } from '../interfaces/pokemon';
import { Mock } from 'src/assets/mocks/mockPokemonList';
import { pokemonMock } from 'src/assets/mocks/mockPokemonDetails';
import { Observable } from 'rxjs';
import { RemoteApiService } from './remote-api.service';
import { PokemonCaptured } from '../interfaces/PokemonCaptured';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private remoteApi: RemoteApiService) { }

  async getByPage(page:number, size: number = 40):Promise<Resultado[]>{
    //if(page > 3) return [];
    //const offset = size*(page-1);
    /*
    const res = await fetch(`http://localhost:8081/api/pokeapi/pokemons`)
    return await res.json();*/
    return Mock.results;
  }

  async getById(id:string):Promise<Pokemon>{
    /*const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return await res.json();*/
    return pokemonMock;
  }

  getPokemonCaptured(id:string):Observable<boolean>{
    //const res = await fetch(`localhost:8081/api/pokemons/search/existsByNumber?number=1`);
    //return await res.json();
    return this.remoteApi.get<boolean>(`http://localhost:8081/api/pokemons/exist/${id}`);
  }

  getPokemonByGeneration(id:string):Observable<Resultado[]>{
    //const res = await fetch(`localhost:8081/api/pokemons/search/existsByNumber?number=1`);
    //return await res.json();
    return this.remoteApi.get<Resultado[]>(`http://localhost:8081/api/pokeapi/generations/${id}`);
  }

  addPokemon(pokemon: PokemonCaptured): Observable<PokemonCaptured> {
    return this.remoteApi.post<any>(`http://localhost:8081/api/pokemons`, pokemon);
  }

  deletePokemon(id: number): Observable<PokemonCaptured> {
    return this.remoteApi.delete<any>(`http://localhost:8081/api/pokemons` + `/${id}`);
}

  async getDescripcion(id:string | number):Promise<string>{
    /*const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    const resJson = await res.json();
    const texto = resJson.flavor_text_entries.find((texto:any) =>  texto.language.name === "es")
    return texto.flavor_text;*/
    return "Este es un texto de ejemplo para no utilizar la API";
  }


}
