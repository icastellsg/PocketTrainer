import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-liberar-pokemon',
  templateUrl: './liberar-pokemon.component.html',
  styleUrls: ['./liberar-pokemon.component.scss']
})
export class LiberarPokemonComponent {

  constructor(
    public dialogRef: MatDialogRef<LiberarPokemonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}

  onButtonClick(): void {
    this.dialogRef.close("Yes");
  }
}
