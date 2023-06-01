import { Injectable } from '@angular/core';
import { RemoteApiService } from './remote-api.service';
import { Resultado } from '../interfaces/pokeapi';
import { Pokemon } from '../interfaces/pokemon';
import { MoveApiInfo } from '../interfaces/MoveApi';
import { moveInfoMock } from 'src/assets/mocks/mockPokemonMove';
import { Observable, catchError, defaultIfEmpty, map, of } from 'rxjs';
import { PokemonSpecies } from '../interfaces/pokemon-species';
import { HttpClient } from '@angular/common/http';
import { MoveInfo } from '../interfaces/moves';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private pokemonUrl = 'http://34.16.151.98:8081/api/pokeapi';
  private pokeApi = 'https://pokeapi.co/api/v2'
  constructor(private remoteApi: RemoteApiService, private http: HttpClient) { }

  getAllPokemons():Observable<Resultado[]>{
    return this.remoteApi.get<Resultado[]>(`${this.pokemonUrl}/pokemons`);
  }

  getById(id:string):Observable<Pokemon>{
    return this.remoteApi.get<Pokemon>(`${this.pokeApi}/pokemon/${id}`);
  }

  getDescripcion(id:string | number):Observable<string>{
    return this.http.get<PokemonSpecies>(`${this.pokeApi}/pokemon-species/${id}`).pipe(
      map((response) => {
        const englishEntries = response.flavor_text_entries.filter(entry => entry.language.name === 'en');
        return englishEntries[englishEntries.length-1].flavor_text;
      }),
      catchError(() => {
        return of("This is a variation of an existing pokemon. I encourage you to look for it's base form if you want to learn more about it");
      })
    );
  }

  getMovesDetails(link:string | number):Observable<MoveInfo>{
    /*const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    const resJson = await res.json();
    const texto = resJson.flavor_text_entries.find((texto:any) =>  texto.language.name === "es")
    return texto.flavor_text;*/

    return this.remoteApi.get<MoveApiInfo>(`${link}`).pipe(
      map((response) => {
        //Tratamiento, si se requiere, de effect_chance
        const moveInfo: MoveInfo ={
          name: response.name,
          accuracy: response.accuracy != null ? response.accuracy : "-",
          type: response.type.name,
          damage_class: response.damage_class.name,
          description: response.effect_chance ? response.effect_entries[0].short_effect.replace("$effect_chance",response.effect_chance) : response.effect_entries[0].short_effect,
          power: response.power != null ? response.power : "-",
          pp: response.pp,
        }
        return moveInfo;
      })
    )
  }
}
