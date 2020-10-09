import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { GameComponent } from './game/game.component';
import { WordProviderService } from './word-provider.service';
import { WinsTrackerService } from './wins-tracker.service';

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
  declarations: [ AppComponent, HelloComponent, WelcomeComponent, GameComponent ],
  bootstrap:    [ AppComponent ],
  providers: [WordProviderService, WinsTrackerService]
})
export class AppModule { }
