import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { isPokemonCaptured } from 'src/app/interfaces/PokemonCaptured';
import { Resultado } from 'src/app/interfaces/pokeapi';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private pokemonService: PokemonService, private pokeapiService: PokeApiService){
    this.pokemonService.notifyPokemonCaptured().subscribe(() => {
      this.updatePokemons();
    });
  }
  @ViewChild('tarjetas') tarjetasElement!:ElementRef;

  listaPokemon:Resultado[] = [];

  cargando:boolean = false;
  pokemonSeleccionado?:Pokemon;
  detalle:boolean=false;
  generation:string | undefined;

  ngOnInit(): void {
    this.cargarLista();
    //this.pokemonService.getById("1");
  }

  cargarLista(){
    this.cargando = true;
    this.pokeapiService.getAllPokemons().subscribe((result) =>{
      this.listaPokemon = result;
      this.cargando = false;
    })
  }

  async tarjetaClickeada(id:string){
    if(this.pokemonSeleccionado && id === this.pokemonSeleccionado?.id.toString()){
      return this.cambiarEstadoDetalle()
    }
    this.pokeapiService.getById(id).subscribe((result) =>{
      this.pokemonSeleccionado = result;
    })
  }

  pokemonCaptured(pokemon:isPokemonCaptured){
    this.listaPokemon[pokemon.number-1].captured = pokemon.captured
  }


  cambiarEstadoDetalle(){
    if(this.pokemonSeleccionado) this.detalle = !this.detalle;
  }

  updatePokemons(){
    if(!this.generation){
      this.cargarLista()
    } else
    {
      this.cargando = true;
      this.pokemonService.getPokemonByGeneration(this.generation).subscribe((result) =>{
        this.listaPokemon = result;
        this.cargando = false;
      })
    }
  }

  onChipListChange(value: string) {
    this.listaPokemon = []
    this.generation = value;
    this.updatePokemons();
  }
}
