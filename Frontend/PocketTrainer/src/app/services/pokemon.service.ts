import { Injectable } from '@angular/core';
import { Resultado } from '../interfaces/pokeapi';
import { Observable, Subject, map } from 'rxjs';
import { RemoteApiService } from './remote-api.service';
import { PokemonCaptured } from '../interfaces/PokemonCaptured';
import { PokemonDDBB } from '../interfaces/Teams';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonDDBBSubject = new Subject<PokemonDDBB>();
  private pokemonCapturedSubject = new Subject<PokemonCaptured>();

  constructor(private remoteApi: RemoteApiService) { }

  getPokemonCaptured(id:string):Observable<boolean>{
    //const res = await fetch(`localhost:8081/api/pokemons/search/existsByNumber?number=1`);
    //return await res.json();
    return this.remoteApi.get<boolean>(`http://34.16.151.98:8081/api/pokemons/exist/${id}`);
  }

  getPokemonByGeneration(id:string):Observable<Resultado[]>{
    //const res = await fetch(`localhost:8081/api/pokemons/search/existsByNumber?number=1`);
    //return await res.json();
    return this.remoteApi.get<Resultado[]>(`http://34.16.151.98:8081/api/pokeapi/generations/${id}`);
  }

  addPokemon(pokemon: PokemonCaptured): Observable<PokemonCaptured> {
    return this.remoteApi.post<any>(`http://34.16.151.98:8081/api/pokemons`, pokemon).pipe(
      map((response) => {
        this.pokemonCapturedSubject.next(response); // emmit update of the observer
        return response;
      })
    );
  }

  deletePokemon(id: number): Observable<PokemonCaptured> {
    return this.remoteApi.delete<any>(`http://34.16.151.98:8081/api/pokemons` + `/${id}`).pipe(
      map((response) => {
        this.pokemonCapturedSubject.next(response); // emmit update of the observer
        return response;
      })
    );
  }

  updatePokemon(id: number, pokemon: PokemonDDBB): Observable<PokemonDDBB> {
    return this.remoteApi.put<any>(`http://34.16.151.98:8081/api/pokemons` + `/${id}`, pokemon).pipe(
      map((response) => {
        this.pokemonDDBBSubject.next(response); // emmit update of the observer
        return response;
      })
    );
}

  getPokemons(): Observable<PokemonDDBB[]> {
    return this.remoteApi.get<PokemonDDBB[]>(`http://34.16.151.98:8081/api/pokemons/allPokemons`);
  }

  notifyPokemonDDBB(): Observable<PokemonDDBB> {
    return this.pokemonDDBBSubject.asObservable();
  }

  notifyPokemonCaptured(): Observable<PokemonCaptured> {
    return this.pokemonCapturedSubject.asObservable();
  }
}
