import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScoreTrackerService } from './score-tracker.service';

  const phrases = [
    "TELETYPE WRITER",
    "TERMINAL",
    "WORD PROCESSOR",
    "DUMB TERMINAL",
    "SMART TERMINAL",
    "MAC TERMINAL",
    "WINDOWS CONSOLE",
    "BOOTSTRAPPING",
    "APACHE",
    "BYTE",
    "BSOD",
    "BIOS",
    "EIGHT TRACK",
    "VHS",
    "CASSETTE TAPE",
    "WALKMAN",
    "TELEGRAPH",
    "PHONOGRAPH",
    "ALL IN ONE"
  ];
@Injectable()
export class WordProviderService {
  private correctLetters: string[] = [];
  private incorrectLetters: string[] = [];

  private correctLettersSubject = new BehaviorSubject<string[]>([]);
  private incorrectLettersSubject = new BehaviorSubject<string[]>([]);
  private currentPhraseSubject = new BehaviorSubject<string>(null);
  private currentPhraseEncodedSubject = new BehaviorSubject<string[]>([]);

  public currentCompleteWord$ = this.currentPhraseSubject.asObservable();

  public currentPhraseInfo$ = combineLatest([
    this.correctLettersSubject, 
    this.incorrectLettersSubject, 
    this.currentPhraseEncodedSubject
  ])
  .pipe(
    map(([correctLetters, incorrectLetters, currentEncodedPhrase]) => ({
      correctLetters,
      incorrectLetters,
      currentEncodedPhrase
    }))
  )
  
  constructor(
    private readonly scoreTrackerService: ScoreTrackerService
  ) { 
    this.getNextPhrase();
  }

  public setNextWord() {
    this.getNextPhrase();
    this.correctLettersSubject.next([]);
    this.incorrectLettersSubject.next([]);
    this.correctLetters = [];
    this.incorrectLetters = [];
    this.encodeSecretPhrase(this.currentPhraseSubject.getValue());
  }

  private getNextPhrase() {
    const nextIndex = Math.floor(Math.random() * phrases.length);
    this.currentPhraseSubject.next(phrases[nextIndex]);
    this.currentPhraseEncodedSubject.next(this.encodeSecretPhrase(phrases[nextIndex]));
  }

  private encodeSecretPhrase(word: string): string[] {
    let underscores: string[] = [];
    for(let i = 0; i< word.length; ++i) {
      if(word[i] !== ' '){
        underscores.push('_');
      } else {
        underscores.push(' ');
      }
    }
    return underscores;
  }

  public checkLetters(letter: string) {
    letter = letter.toUpperCase();

    const isIncluded = this.currentPhraseSubject.getValue().includes(letter);
    const alreadyGuessed = this.correctLetters.includes(letter) || this.incorrectLetters.includes(letter);
    if(alreadyGuessed) {
      return;
    }
    if(isIncluded) {
      this.correctLetters.push(letter);
      this.correctLettersSubject.next(this.correctLetters);
      this.replaceCorrectLetters(letter);
    } else {
      this.incorrectLetters.push(letter);
      this.incorrectLettersSubject.next(this.incorrectLetters);
      this.scoreTrackerService.updateRemainingAttempts();
    }
    this.scoreTrackerService.checkForWin(this.currentPhraseSubject.getValue(), this.currentPhraseEncodedSubject.getValue());
  }

  private replaceCorrectLetters(letter: string) {
    const secretPhrase = this.currentPhraseSubject.getValue();
    for(let i = 0; i< secretPhrase.length; ++i) {
      if(secretPhrase[i] !== ' ' && secretPhrase[i] === letter){
        const nextUpdate = this.currentPhraseEncodedSubject.getValue();
        nextUpdate[i] = letter;
        this.currentPhraseEncodedSubject.next(nextUpdate);
      } 
    }
  }
}