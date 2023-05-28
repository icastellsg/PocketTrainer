import { Component, Input } from '@angular/core';
import { Team } from 'src/app/interfaces/Teams';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss']
})
export class EquiposComponent {

  @Input() team!: Team;

}
