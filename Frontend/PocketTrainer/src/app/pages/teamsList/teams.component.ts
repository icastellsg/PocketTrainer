import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { DeleteTeamComponent } from 'src/app/components/delete-team/delete-team.component';
import { Team } from 'src/app/interfaces/Teams';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit{

  teams: Team[] = []

  constructor(private teamApi: TeamService, public dialog: MatDialog, private _snackBar: MatSnackBar) {
    // Suscríbete al Observable del TeamService
    this.teamApi.notify().subscribe(() => {
      this.updateTeams();
    });
  }
  updateTeams() {
    this.teamApi.getTeams().subscribe((result) => {
      this.teams = result;
    });
  }

  ngOnInit() {
    this.updateTeams();
  }

  openDialog(event: MouseEvent, team: Team): void {
    event.preventDefault();
    const dialogRef = this.dialog.open(DeleteTeamComponent, {
      data: team.name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.teamApi.deleteTeam(Number(team.id)).subscribe({
          next: () => {
            const config = new MatSnackBarConfig();
            config.duration = 8000;
            this._snackBar.open('Team deleted succesfully', '✖', config);
          }
        })
      }
    });
  }
}
