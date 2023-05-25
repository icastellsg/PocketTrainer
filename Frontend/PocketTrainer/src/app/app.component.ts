import { Component, EventEmitter, Output } from '@angular/core';
import { MatChip, MatChipListboxChange } from '@angular/material/chips';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PocketTrainer';
}
