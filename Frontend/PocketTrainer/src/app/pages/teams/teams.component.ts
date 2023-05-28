import { Component } from '@angular/core';
import { Team } from 'src/app/interfaces/Teams';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent {

  teams: Team[] = []
  filteredTeams: Team[] = []

  constructor(private teamApi: TeamService) {}

  ngOnInit() {
    this.teamApi.getTeams().subscribe((result) => {
      this.teams = result;
    });
}
}
