import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WinsTrackerService } from './wins-tracker.service';

  const phrases: string[] = [
    "HELLO THERE",
    "GREEN MACHINE",
    "FROSTY THE SNOWMAN",
    "SMOKEY THE BEAR",
    "PERRY THE PLATYPUS"
  ];
@Injectable()
export class WordProviderService {
  private correctLetters: string[] = [];
  private correctLettersSubject = new BehaviorSubject<string[]>([]);
  public correctLetters$ = this.correctLettersSubject.asObservable();

  private incorrectLetters: string[] = [];
  private incorrectLettersSubject = new BehaviorSubject<string[]>([]);
  public incorrectLetters$ = this.incorrectLettersSubject.asObservable();

  private currentPhraseSubject = new BehaviorSubject<string>(null);
  public currentPhrase$: Observable<string> = this.currentPhraseSubject.asObservable();

  private currentPhraseEncodedSubject = new BehaviorSubject<string[]>([]);
  public currentEncodedPhrase$ = this.currentPhraseEncodedSubject.asObservable();
  
  constructor(
    private readonly winsTrackerService: WinsTrackerService
  ) { 
    this.getNextPhrase();
  }

  public setNextWord() {
    this.getNextPhrase();
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
      this.correctLettersSubject.next(this.correctLetters)
      this.replaceCorrectLetters(letter);
    } else {
      this.incorrectLetters.push(letter)
      this.incorrectLettersSubject.next(this.incorrectLetters);
    }
    this.winsTrackerService.checkForWin(this.currentPhraseSubject.getValue(), this.currentPhraseEncodedSubject.getValue());
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