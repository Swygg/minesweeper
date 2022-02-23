import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component/app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DifficultyComponent } from './components/difficulty/difficulty.component';
import { GameComponent } from './components/game/game.component';
import { TestComponent } from './components/test/test.component';
import { ScoresComponent } from './components/scores/scores.component';
import { ScoresListComponent } from './components/scores-list/scores-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DifficultyComponent,
    GameComponent,
    TestComponent,
    ScoresComponent,
    ScoresListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
