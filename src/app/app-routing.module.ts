import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DifficultyComponent } from './components/difficulty/difficulty.component';
import { GameComponent } from './components/game/game.component';
import { ScoresComponent } from './components/scores/scores.component';
import { TestComponent } from './components/test/test.component';
import { Score } from './models/score.model';

const routes: Routes = [
  { path: '', component: DifficultyComponent },
  { path: 'home', component: DifficultyComponent },
  { path: 'difficulty', component: DifficultyComponent },
  { path: 'game', component: GameComponent },
  { path: 'scores', component: ScoresComponent },
  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
