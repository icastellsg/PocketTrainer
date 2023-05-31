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

  constructor(private pokemonService: PokemonService, private pokeapiService: PokeApiService){}
  @ViewChild('tarjetas') tarjetasElement!:ElementRef;

  listaPokemon:Resultado[] = [];

  pagina:number = 1;
  cargando:boolean = false;
  pokemonSeleccionado?:Pokemon;
  detalle:boolean=false;

  ngOnInit(): void {
    this.cargarLista();
    //this.pokemonService.getById("1");
  }

  async cargarLista(){
    this.cargando = true;

    this.listaPokemon = [...this.listaPokemon,  ...await this.pokeapiService.getByPage(this.pagina)];
    this.cargando = false;
    this.pagina++;
  }

  onScroll(e:any){
    if(this.cargando) return;
    if(
      Math.round(
        this.tarjetasElement.nativeElement.clientHeight + this.tarjetasElement.nativeElement.scrollTop
        )
        === e.srcElement.scrollHeight){
        this.cargarLista();
      }

  }

  async tarjetaClickeada(id:string){
    if(this.pokemonSeleccionado && id === this.pokemonSeleccionado?.id.toString()){
      return this.cambiarEstadoDetalle()
    }
    this.pokemonSeleccionado = await this.pokeapiService.getById(id);
  }

  pokemonCapturado(pokemon:isPokemonCaptured){
    this.listaPokemon[pokemon.number-1].captured = pokemon.captured
    console.log(this.listaPokemon[pokemon.number-1])
  }


  cambiarEstadoDetalle(){
    if(this.pokemonSeleccionado) this.detalle = !this.detalle;
  }

  onChipListChange(value: string) {
    this.listaPokemon = []
    if(!value){
      this.cargarLista()
    } else
    {
      this.cargando = true;
      this.pokemonService.getPokemonByGeneration(value).subscribe((result) =>{
        this.listaPokemon = result
        this.cargando = false;
      })
    }
  }
}
