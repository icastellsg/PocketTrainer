import { Component, Input } from '@angular/core';
import { MoveApiInfo } from 'src/app/interfaces/MoveApi';
import { PokemonDDBB } from 'src/app/interfaces/Teams';
import { MoveInfo } from 'src/app/interfaces/moves';
import { Pokemon, Mfe, Move } from 'src/app/interfaces/pokemon';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-edition',
  templateUrl: './pokemon-edition.component.html',
  styleUrls: ['./pokemon-edition.component.scss']
})
export class PokemonEditionComponent {

  unsavedChanges: boolean = true;
  error: string = "ERROR : Team name can't be over 15 characters.";
  isSavingPokemon: boolean = false;

  @Input() pokemon!:PokemonDDBB
  pokemonApiInfo!: Pokemon
  moves:MoveInfo[] = []
  pokemonMoves:string[] = []
  pokemonName: string = "";
  requestFailed: boolean = false;
  pokemonAbility: string = "";

  constructor(private pokeApiService: PokeApiService, private pokemonService: PokemonService) {}

  async ngOnChanges(){
  if (this.pokemon) {
    this.pokemon.moves ? this.pokemonMoves = this.pokemon.moves : this.pokemonMoves = [];
    this.pokemon.ability ? this.pokemonAbility = this.pokemon.ability : this.pokemonAbility = "";
    this.pokemonName = this.pokemon.name;
    this.pokemonApiInfo = await this.pokeApiService.getById(this.pokemon.number.toString())
    this.pokemonApiInfo.moves.forEach(async move => {
      const moveInfo:MoveApiInfo = await this.pokeApiService.getMovesDetails(move.move.url);
      const moveInfoAux: MoveInfo ={
        name: moveInfo.name,
        accuracy: moveInfo.accuracy != null ? moveInfo.accuracy : "-",
        type: moveInfo.type.name,
        damage_class: moveInfo.damage_class.name,
        description: moveInfo.effect_entries[0].short_effect,
        power: moveInfo.power != null ? moveInfo.power : "-",
        pp: moveInfo.pp
      }
      this.moves.push(moveInfoAux)
      if(this.pokemon.moves.includes(moveInfoAux.name)){
        this.pokemonMoves.push(moveInfoAux.name)
      }
    })
  }
  console.log(this.pokemonApiInfo)
  }

  selectRow(moveInfo: MoveInfo) {
    const moveIndex = this.pokemonMoves.indexOf(moveInfo.name);
    if (moveIndex === -1){
      if (this.pokemonMoves.length < 4) this.pokemonMoves.push(moveInfo.name)
    } else{
      this.pokemonMoves.splice(moveIndex, 1);
    }
    console.log(this.pokemonMoves)
  }

  updateAbility(ability: string){
    this.pokemonAbility = ability;
  }

  canSave(): boolean {
    return this.pokemonName.trim().length > 0 && this.pokemonAbility!= null && this.pokemonMoves.length > 0;
  }

  onSave() {
    if (!this.canSave()) return;

    this.unsavedChanges = false;
    this.isSavingPokemon = true;

    {
      this.pokemon.name = this.pokemonName;
      this.pokemon.ability = this.pokemonAbility;
      this.pokemon.moves = this.pokemonMoves;

        this.pokemonService.updatePokemon(this.pokemon.number, this.pokemon).subscribe({
            next: () => {},
            error: () => {},
            complete: () => {
                this.isSavingPokemon = false;
            },
        });
    }
  }

  onCancel() {
    this.unsavedChanges = false;
    this.pokemonName = this.pokemon.name;
    this.pokemonAbility = this.pokemon.ability;
    this.pokemonMoves = this.pokemon.moves;
  }
}
