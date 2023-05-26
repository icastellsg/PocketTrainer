import { Injectable } from '@angular/core';
import { RemoteApiService } from './remote-api.service';
import { Observable } from 'rxjs';
import { Nickname } from '../interfaces/Nickname';

@Injectable({
  providedIn: 'root'
})
export class ScrapperService {

  private scrapperUrl = `http://localhost:8081/api/nickname/generate`;

  constructor(private remoteApi: RemoteApiService) { }

  public getOpponentData(): Observable<Nickname> {
    return this.remoteApi.get<Nickname>(`${this.scrapperUrl}`);
}
}
