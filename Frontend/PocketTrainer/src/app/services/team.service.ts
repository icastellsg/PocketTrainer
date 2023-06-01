import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { RemoteApiService } from './remote-api.service';
import { Team } from '../interfaces/Teams';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private remoteApi: RemoteApiService) { }

  private teamsUrl = `http://localhost:8081/api/teams`;
  private teamSubject = new Subject<Team>();

  getTeams(): Observable<any> {
    return this.remoteApi.get<any>(`${this.teamsUrl}/allTeams`).pipe(
        map((response) => {
            return response;
        })
    );
  }

  getTeam(id: number): Observable<Team> {
    return this.remoteApi.get<any>(`${this.teamsUrl}/${id}`);
  }

  updateTeam(id: number, team: Team): Observable<any> {
    return this.remoteApi.put(this.teamsUrl + `/${id}`, team);
  }

  addTeam(team: Team): Observable<Team> {
    return this.remoteApi.post<any>(this.teamsUrl, team);
  }

  deleteTeam(id: number): Observable<Team> {
    return this.remoteApi.delete<any>(this.teamsUrl + `/${id}`).pipe(
      map((response) => {
        this.teamSubject.next(response); // emmit update of the observer
        return response;
      })
    );
  }

  // Observer pattern. Mehtod to subscribe to the delete event of a team
  notify(): Observable<Team> {
    return this.teamSubject.asObservable();
  }
}
