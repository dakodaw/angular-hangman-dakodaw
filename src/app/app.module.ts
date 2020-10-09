import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { GameComponent } from './game/game.component';
import { WordProviderService } from './word-provider.service';
import { ScoreTrackerService } from './score-tracker.service';
import { HangmanComponent } from './hangman/hangman.component';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'game', component: GameComponent },
    ])
  ],
  declarations: [ AppComponent, WelcomeComponent, GameComponent, HangmanComponent ],
  bootstrap:    [ AppComponent ],
  providers: [WordProviderService, ScoreTrackerService]
})
export class AppModule { }
