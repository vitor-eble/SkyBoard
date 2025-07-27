import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerSearchComponent } from './features/player-search/player-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/player-search', pathMatch: 'full' },
  {path: 'player-search', component: PlayerSearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
