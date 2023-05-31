import { Injectable } from '@angular/core';
import { Resultado } from '../interfaces/pokeapi';
import { Observable } from 'rxjs';
import { RemoteApiService } from './remote-api.service';
import { PokemonCaptured } from '../interfaces/PokemonCaptured';
import { PokemonDDBB } from '../interfaces/Teams';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private remoteApi: RemoteApiService) { }

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

  updatePokemon(id: number, pokemon: PokemonDDBB): Observable<PokemonDDBB> {
    return this.remoteApi.put(`http://localhost:8081/api/pokemons` + `/${id}`, pokemon);
}

  getPokemons(): Observable<PokemonDDBB[]> {
    return this.remoteApi.get<PokemonDDBB[]>(`http://localhost:8081/api/pokemons/allPokemons`);
  }
}
