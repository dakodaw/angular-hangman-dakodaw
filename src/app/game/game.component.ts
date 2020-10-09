import { Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ScoreTrackerService } from '../wins-tracker.service';
import { WordProviderService } from '../word-provider.service';

export interface GameComponentVM {
  winCount: number,
  lossCount: number,
  letterGuessed: string,
  secretPhraseEncoded: string[],
  correctLetters: string[],
  incorrectLetters: string[],
  remainingAttempts: number,
  importantMessage: string
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
    this.scoreTrackerService.wins$,
    this.scoreTrackerService.losses$,
    this.letterGuessedSubject,
    this.wordProviderService.currentEncodedPhrase$,
    this.wordProviderService.correctLetters$,
    this.wordProviderService.incorrectLetters$,
    this.importantMessageSubject,
  ]).pipe(
      map(([
        winCount: number,
        lossCount: number, 
        letterGuessed: string, 
        secretPhraseEncoded: string[], 
        correctLetters: string[], 
        incorrectLetters: string[], 
        importantMessage: string,]) => ({
          winCount,
          lossCount,
          letterGuessed,
          secretPhraseEncoded,
          correctLetters,
          incorrectLetters,
          remainingAttempts: 2,
          importantMessage
        })
      ),
  );

  constructor(
    private readonly scoreTrackerService: ScoreTrackerService,
    private readonly wordProviderService: WordProviderService
  ) {}

  ngOnInit() {
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