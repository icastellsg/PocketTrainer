import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RemoteApiService } from './remote-api.service';
import { Team } from '../interfaces/Teams';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private remoteApi: RemoteApiService) { }

  private teamsUrl = `http://localhost:8081/api/teams`;

  getTeams(): Observable<any> {
    return this.remoteApi.get<any>(`http://localhost:8081/api/teams/allTeams`).pipe(
        map((response) => {
            return response;
        })
    );
}
}
