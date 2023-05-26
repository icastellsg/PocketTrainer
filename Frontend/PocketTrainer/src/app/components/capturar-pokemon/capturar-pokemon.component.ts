import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScrapperService } from 'src/app/services/scrapper.service';


@Component({
  selector: 'app-capturar-pokemon',
  templateUrl: './capturar-pokemon.component.html',
  styleUrls: ['./capturar-pokemon.component.scss']
})
export class CapturarPokemonComponent implements OnInit{

  nickname: String = "";
  isLoading:boolean = false;

  constructor(
    private scrapperService: ScrapperService,
    public dialogRef: MatDialogRef<CapturarPokemonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}

  ngOnInit(): void {
    this.scrapperService.getOpponentData().subscribe((result) =>{
      this.nickname = result.name;
    })
    setTimeout(() => {
      this.isLoading = true
    }, 4000);
  }

  onNoClick(): void {
    this.dialogRef.close("");
  }

}
