import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTeamComponent } from 'src/app/components/delete-team/delete-team.component';
import { Team, TeamObserver } from 'src/app/interfaces/Teams';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements TeamObserver{

  teams: Team[] = []
  filteredTeams: Team[] = []

  constructor(private teamApi: TeamService, public dialog: MatDialog) {}
  update(teams: Team[]): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.teamApi.getTeams().subscribe((result) => {
      this.teams = result;
    });
  }

  openDialog(event: MouseEvent, team: Team): void {
    event.preventDefault();
    const dialogRef = this.dialog.open(DeleteTeamComponent, {
      data: team.name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.teamApi.deleteTeam(Number(team.id)).subscribe({
          next: (result) => {
            console.log(result)
        }
        })
      }
    });
  }
}
