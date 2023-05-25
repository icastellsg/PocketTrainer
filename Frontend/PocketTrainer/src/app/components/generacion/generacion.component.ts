import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChip, MatChipListboxChange } from '@angular/material/chips';

@Component({
  selector: 'app-generacion',
  templateUrl: './generacion.component.html',
  styleUrls: ['./generacion.component.scss']
})
export class GeneracionComponent {
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  @Input() enabled: boolean = false;

  onChipListChange(event: MatChipListboxChange ) {
    this.change.emit(event.value)
  }
}
