import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-foto-pokemon',
  templateUrl: './foto-pokemon.component.html',
  styleUrls: ['./foto-pokemon.component.scss']
})
export class FotoPokemonComponent {

  @Input() pokemon?:Pokemon;
  imagenActual: string = "";
  sprite: boolean = true;

  ngOnChanges() {
    if (this.pokemon) {
      this.imagenActual = this.pokemon.sprites.front_default;
    }
  }

  cambiarImagen() {
    if (this.pokemon) {
      if (this.imagenActual === this.pokemon.sprites.front_default) {
        this.imagenActual = this.pokemon.sprites.other.dream_world.front_default ? this.pokemon.sprites.other.dream_world.front_default : this.pokemon.sprites.other['official-artwork'].front_default;
        this.sprite = false
      } else {
        this.imagenActual = this.pokemon.sprites.front_default;
        this.sprite = false
      }
    }
  }

}
