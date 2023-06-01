import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnChanges {
  @Input() pokemon?: Pokemon;
  @Input() abierto:boolean = false;
  @Output() clicked = new EventEmitter();
  descripcion: string = '';

  constructor(private pokeApiService: PokeApiService) {}

  ngOnChanges(): void {
    if (this.pokemon) {
      this.pokeApiService.getDescripcion(this.pokemon?.id).subscribe((res) => {
        this.descripcion = res
      });
    }
  }
}
