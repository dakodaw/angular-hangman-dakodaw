import { Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CurrentPhraseInfo } from '../current-phrase-info';
import { ScoreTrackerService } from '../score-tracker.service';
import { Scores } from '../scores';
import { WordProviderService } from '../word-provider.service';

export interface GameComponentVM {
  scores: Scores,
  letterGuessed: string,
  currentPhraseInfo: CurrentPhraseInfo,
  importantMessage: string,
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  private letterGuessedSubject = new BehaviorSubject<string>(null);
  private importantMessageSubject = new BehaviorSubject<string>(null);  

  public vm$: Observable<GameComponentVM> = combineLatest([
    this.scoreTrackerService.scoreInfo$,
    this.letterGuessedSubject,
    this.wordProviderService.currentPhraseInfo$,
    this.importantMessageSubject,
  ]).pipe(
      map(([scores, letterGuessed, currentPhraseInfo, importantMessage]) => ({
          scores,
          letterGuessed,
          currentPhraseInfo,
          importantMessage
        })
      ),
  );

  constructor(
    private readonly scoreTrackerService: ScoreTrackerService,
    private readonly wordProviderService: WordProviderService
  ) {}

  ngOnInit() {
    this.wordProviderService.setNextWord();
    this.letterGuessedSubject.pipe(tap((letter) => {
      if(letter) {
        this.checkLetters(letter);
      }
    })).subscribe()
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.letterGuessedSubject.next(event.key);
  }

  private checkLetters(letter: string) {
    if(!/^[a-zA-Z]*$/g.test(letter)){
      this.importantMessageSubject.next('please enter a letter');
      return;
    }
    this.importantMessageSubject.next(null);
    this.wordProviderService.checkLetters(letter);
  }
}