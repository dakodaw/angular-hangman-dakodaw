import { Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WinsTrackerService } from '../wins-tracker.service';

export interface GameComponentVM {
  letterGuessed: string,
  secretPhraseEncoded: string[],
  correctLetters: string[],
  incorrectLetters: string[]
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  private letterGuessedSubject = new BehaviorSubject<string>(null);
  private secretPhraseEncodedSubject = new BehaviorSubject<string[]>([]);
  private correctLettersSubject = new BehaviorSubject<string[]>([]);
  private incorrectLettersSubject = new BehaviorSubject<string[]>([]);

  private secretPhrase = 'hello there';
  private incorrectLetters: string[] = [];
  private correctLetters: string[] = [];

  public vm$: Observable<GameComponentVM> = combineLatest([
    this.letterGuessedSubject,
    this.secretPhraseEncodedSubject,
    this.correctLettersSubject,
    this.incorrectLettersSubject
  ]).pipe(
      map(([letterGuessed, secretPhraseEncoded, correctLetters, incorrectLetters]) => ({
        letterGuessed,
        secretPhraseEncoded,
        correctLetters,
        incorrectLetters
      })),
  );

  constructor(
    private readonly winsTrackerService: WinsTrackerService
  ) { }

  ngOnInit() {
    this.secretPhraseEncodedSubject.next(this.encodeSecretPhrase(this.secretPhrase))
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.letterGuessedSubject.next(event.key)
    this.checkLetters(this.letterGuessedSubject.getValue());
  }

  private checkLetters(letter: string) {
    if(!/^[a-zA-Z]*$/g.test(letter)){
      alert('please enter a letter');
      return;
    }
    letter = letter.toLowerCase();

    const isIncluded = this.secretPhrase.includes(letter);
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
    this.winsTrackerService.checkForWin(this.secretPhrase, this.secretPhraseEncodedSubject.getValue());
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
  
  private replaceCorrectLetters(letter: string) {
    for(let i = 0; i< this.secretPhrase.length; ++i) {
      if(this.secretPhrase[i] !== ' ' && this.secretPhrase[i] === letter){
        const nextUpdate = this.secretPhraseEncodedSubject.getValue();
        nextUpdate[i] = letter;
        this.secretPhraseEncodedSubject.next(nextUpdate);
      } 
    }
  }

}