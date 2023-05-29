import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonDDBB, Team } from 'src/app/interfaces/Teams';
import { PokemonService } from 'src/app/services/pokemon.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-builder',
  templateUrl: './team-builder.component.html',
  styleUrls: ['./team-builder.component.scss']
})
export class TeamBuilderComponent {

  typeName: string = 'Edition of';
  unsavedChanges: boolean = true;
  isSavingTeam = false;

  requestFailed: boolean = false;
  error: string = "ERROR : Team name can't be over 15 characters.";

  teamLimit = 6;

  teamPokemons: PokemonDDBB[] = [];
  pokemons: PokemonDDBB[] = [];
  team!: Team;
  teamName: string = "";
  teamId!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teamApi: TeamService,
    private pokemonApi: PokemonService
) {}

  ngOnInit(){
    this.teamId = parseInt(
      String(this.route.snapshot.paramMap.get('teamId'))
  );
  if (this.teamId) {
    this.teamApi.getTeam(this.teamId).subscribe((result) => {
        this.team = result;
        this.teamPokemons = structuredClone(result.pokemons);
        this.teamName = result.name;
        console.log(this.team)
    });
  } else {
    this.typeName = 'Creation of';
    this.teamName = 'new team'
  }

  this.pokemonApi.getPokemons().subscribe((result) => {
    this.pokemons = result;
    console.log(this.pokemons)
  });
  }

  onAdd(pokemon: PokemonDDBB) {
    if (!this.alreadyOnTeam(pokemon) && this.teamPokemons.length < this.teamLimit){
      this.teamPokemons.push(pokemon);
    }
  }

  onDelete(pokemon: PokemonDDBB) {
    this.teamPokemons.splice(this.teamPokemons.indexOf(pokemon), 1);
}

  alreadyOnTeam(pokemon: PokemonDDBB) {
    return this.teamPokemons.some(p => p.number === pokemon.number)
  }

  canSave(): boolean {
    return this.teamName.trim().length > 0 && this.teamPokemons.length == this.teamLimit;
  }

  onSave() {
    if (!this.canSave()) return;

    this.unsavedChanges = false;
    this.isSavingTeam = true;

    if (this.teamId) {
        this.team.name = this.teamName;
        this.team.pokemons = this.teamPokemons;

        console.log(this.team)
        this.teamApi.updateTeam(this.teamId, this.team).subscribe({
            next: (response) => {
              console.log(response)
                this.router.navigate([`/teams`]);
            },
            error: () => {},
            complete: () => {
                this.isSavingTeam = false;
            },
        });
    } else {
        this.team = {
            id: -1,
            name: this.teamName,
            pokemons: this.teamPokemons
        };
        console.log(this.team)
        this.teamApi.addTeam(this.team).subscribe({
            next: () => {
              this.router.navigate([`/teams`]);
            },
            error: () => {},
            complete: () => {
                this.isSavingTeam = false;
            },
        });
    }
  }

  onCancel() {
    this.unsavedChanges = false;
    this.router.navigate([`/teams`]);
  }
}
