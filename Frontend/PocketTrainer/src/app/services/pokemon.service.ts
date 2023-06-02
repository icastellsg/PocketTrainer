import { Injectable } from '@angular/core';
import { Resultado } from '../interfaces/pokeapi';
import { Observable, Subject, map } from 'rxjs';
import { RemoteApiService } from './remote-api.service';
import { PokemonCaptured } from '../interfaces/PokemonCaptured';
import { PokemonDDBB } from '../interfaces/Teams';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonDDBBSubject = new Subject<PokemonDDBB>();
  private pokemonCapturedSubject = new Subject<PokemonCaptured>();

  private pokemonUrl = `${environment.apiBaseUrl}`;

  constructor(private remoteApi: RemoteApiService) { }

  getPokemonCaptured(id:string):Observable<boolean>{
    //const res = await fetch(`localhost:8081/api/pokemons/search/existsByNumber?number=1`);
    //return await res.json();
    return this.remoteApi.get<boolean>(`${this.pokemonUrl}/pokemons/exist/${id}`);
  }

  getPokemonByGeneration(id:string):Observable<Resultado[]>{
    //const res = await fetch(`localhost:8081/api/pokemons/search/existsByNumber?number=1`);
    //return await res.json();
    return this.remoteApi.get<Resultado[]>(`${this.pokemonUrl}/pokeapi/generations/${id}`);
  }

  addPokemon(pokemon: PokemonCaptured): Observable<PokemonCaptured> {
    return this.remoteApi.post<any>(`${this.pokemonUrl}/pokemons`, pokemon).pipe(
      map((response) => {
        this.pokemonCapturedSubject.next(response); // emmit update of the observer
        return response;
      })
    );
  }

  deletePokemon(id: number): Observable<PokemonCaptured> {
    return this.remoteApi.delete<any>(`${this.pokemonUrl}/pokemons` + `/${id}`).pipe(
      map((response) => {
        this.pokemonCapturedSubject.next(response); // emmit update of the observer
        return response;
      })
    );
  }

  updatePokemon(id: number, pokemon: PokemonDDBB): Observable<PokemonDDBB> {
    return this.remoteApi.put<any>(`${this.pokemonUrl}/pokemons` + `/${id}`, pokemon).pipe(
      map((response) => {
        this.pokemonDDBBSubject.next(response); // emmit update of the observer
        return response;
      })
    );
}

  getPokemons(): Observable<PokemonDDBB[]> {
    return this.remoteApi.get<PokemonDDBB[]>(`${this.pokemonUrl}/pokemons/allPokemons`);
  }

  notifyPokemonDDBB(): Observable<PokemonDDBB> {
    return this.pokemonDDBBSubject.asObservable();
  }

  notifyPokemonCaptured(): Observable<PokemonCaptured> {
    return this.pokemonCapturedSubject.asObservable();
  }
}
