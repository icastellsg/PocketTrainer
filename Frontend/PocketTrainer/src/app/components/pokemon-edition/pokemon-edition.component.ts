import { Component, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
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

  error: string = "ERROR : Team name can't be over 15 characters.";
  isSavingPokemon: boolean = false;

  @Input() pokemon!:PokemonDDBB
  pokemonApiInfo!: Pokemon
  moves:MoveInfo[] = []
  pokemonMoves:string[] = []
  pokemonName: string = "";
  requestFailed: boolean = false;
  pokemonAbility: string = "";

  constructor(private pokeApiService: PokeApiService, private pokemonService: PokemonService, private _snackBar: MatSnackBar) {}

  ngOnChanges(){
    this.updatePokemon();
  }

  selectRow(moveInfo: MoveInfo) {
    const moveIndex = this.pokemonMoves.indexOf(moveInfo.name);
    if (moveIndex === -1){
      if (this.pokemonMoves.length < 4){
        this.pokemonMoves.push(moveInfo.name);
      }else{
        const config = new MatSnackBarConfig();
        config.duration = 8000;
        this._snackBar.open("The maximum of moves a pokemon can learn is 4", '✖', config);
      }
    } else{
      this.pokemonMoves.splice(moveIndex, 1);
    }
  }

  updateAbility(ability: string){
    this.pokemonAbility = ability;
  }

  canSave(): boolean {
    return this.pokemonName.trim().length > 0 && this.pokemonAbility!= null && this.pokemonMoves.length > 0;
  }

  onSave() {
    if (!this.canSave()) return;

    this.isSavingPokemon = true;

    {
      this.pokemon.name = this.pokemonName;
      this.pokemon.ability = this.pokemonAbility;
      this.pokemon.moves = this.pokemonMoves;

        this.pokemonService.updatePokemon(this.pokemon.number, this.pokemon).subscribe({
            next: () => {
              const config = new MatSnackBarConfig();
              config.duration = 8000;
              this._snackBar.open("Pokemon details saved succesfuly", '✖', config);
            },
            error: () => {},
            complete: () => {
                this.isSavingPokemon = false;
            },
        });
    }
  }

  onCancel() {
    this.pokemonName = this.pokemon.name;
    this.pokemonAbility = this.pokemon.ability;
    this.pokemonMoves = Object.assign([], this.pokemon.moves);
  }

  updatePokemon(){
    if (this.pokemon) {
      this.moves = [];
      this.pokemon.moves ? this.pokemonMoves = Object.assign([], this.pokemon.moves) : this.pokemonMoves = [];
      this.pokemon.ability ? this.pokemonAbility = this.pokemon.ability : this.pokemonAbility = "";
      this.pokemonName = this.pokemon.name;

      this.pokeApiService.getById(this.pokemon.number.toString()).subscribe((result) =>{
        result.moves.forEach(move => {
          this.pokeApiService.getMovesDetails(move.move.url).subscribe((moveResult) => {
            if(moveResult){
              const moveInfo = moveResult;
              this.moves.push(moveInfo)
              if(this.pokemon.moves.includes(moveInfo.name)){
                this.pokemonMoves.push(moveInfo.name)
              }
            }
          })
        })
        this.pokemonApiInfo = result
      })
    }
  }
}
