import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Resultado } from 'src/app/interfaces/pokeapi';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { CapturarPokemonComponent } from '../capturar-pokemon/capturar-pokemon.component';
import { PokemonCaptured, isPokemonCaptured } from 'src/app/interfaces/PokemonCaptured';
import { LiberarPokemonComponent } from '../liberar-pokemon/liberar-pokemon.component';

@Component({
  selector: 'app-tarjeta-pokemon',
  templateUrl: './tarjeta-pokemon.component.html',
  styleUrls: ['./tarjeta-pokemon.component.scss']
})
export class TarjetaPokemonComponent implements OnChanges {

  constructor(private pokemonService: PokemonService, public dialog: MatDialog){}

  ngOnChanges(): void {
    this.extraerInfromacion()
  }

  @Input() data?:Resultado;
  @Input() seleccionado:boolean = false;
  @Input() fullData?:Pokemon;
  @Output() clickeado = new EventEmitter<string>();
  @Output() capturado = new EventEmitter<isPokemonCaptured>();
  id:string = "0";


  extraerInfromacion(){
    if(this.data && this.data.url !== ""){
      this.id = this.obtenerIds(this.data.url);
      return
    }
    if(this.fullData){
      this.id = this.fullData.species.url.substring(42,this.fullData.species.url.length-1);
      const name = this.fullData.species.name
      const captured = this.pokemonService.getPokemonCaptured(this.id).subscribe((result) =>{
        this.data = {
          name: name,
          url: "",
          captured: result
        }
      })
    }
  }

  obtenerIds(url: string){
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  openDialog(event: MouseEvent): void {
    event.preventDefault();
    this.data?.captured ? this.releasePokemon() : this.capturePokemon()
  }

  capturePokemon(){
    const dialogRef = this.dialog.open(CapturarPokemonComponent, {
      data: this.data?.name,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        const pokemonCaptured:PokemonCaptured = {
          number: Number(this.id),
          name: result
        }
        this.pokemonService.addPokemon(pokemonCaptured).subscribe({
          next: () => {
            const eventPokemonCaptured: isPokemonCaptured = {
              number: Number(this.id),
              captured: true
            }
            this.capturado.emit(eventPokemonCaptured)
        }
        })
      }
    });
  }

  releasePokemon(){
    const dialogRef = this.dialog.open(LiberarPokemonComponent, {
      data: this.data?.name,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.pokemonService.deletePokemon(Number(this.id)).subscribe({
          next: () => {
            const eventPokemonCaptured: isPokemonCaptured = {
              number: Number(this.id),
              captured: false
            }
            this.capturado.emit(eventPokemonCaptured)
        }
        })
      }
    });
  }
}
