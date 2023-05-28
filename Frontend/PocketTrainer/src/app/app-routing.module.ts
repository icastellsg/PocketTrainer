import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TeamsComponent } from './pages/teamsList/teams.component';
import { TeamBuilderComponent } from './pages/team-builder/team-builder.component';

const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path:"teams",
    component: TeamsComponent
  },
  {
    path: 'teams/create',
    component: TeamBuilderComponent,
  },
  {
    path: 'teams/:teamId/edit',
    component: TeamBuilderComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
