import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FotoPokemonComponent } from './components/foto-pokemon/foto-pokemon.component';
import { TarjetaPokemonComponent } from './components/tarjeta-pokemon/tarjeta-pokemon.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { HttpClientModule } from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';
import { GeneracionComponent } from './components/generacion/generacion.component';
import { CapturarPokemonComponent } from './components/capturar-pokemon/capturar-pokemon.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LiberarPokemonComponent } from './components/liberar-pokemon/liberar-pokemon.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TeamsComponent } from './pages/teams/teams.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FotoPokemonComponent,
    TarjetaPokemonComponent,
    DetalleComponent,
    GeneracionComponent,
    CapturarPokemonComponent,
    LiberarPokemonComponent,
    TeamsComponent,
    EquiposComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
