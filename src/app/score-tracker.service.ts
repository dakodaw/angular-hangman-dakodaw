import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Scores } from './scores';

@Injectable()
export class ScoreTrackerService {
  private winSubject = new BehaviorSubject<number>(0);
  private lossSubject = new BehaviorSubject<number>(0);
  private remainingAttemptsSubject = new BehaviorSubject<number>(7);

  public scoreInfo$: Observable<Scores> = combineLatest([this.winSubject, this.lossSubject, this.remainingAttemptsSubject])
  .pipe(
    map(([winCount, lossCount, remainingAttempts]) => ({
      winCount,
      lossCount,
      remainingAttempts
    }))
  )

  constructor() { }

  public checkForWin(word: string, guess: string[]) {
    if(word === guess.join('')) {
      this.win();
    }
    if(this.remainingAttemptsSubject.getValue() === 0) {
      this.lose();
    }
  }

  public updateRemainingAttempts() {
    this.remainingAttemptsSubject.next(this.remainingAttemptsSubject.getValue() - 1);
  }

  private lose() {
    alert("You lost :(")
    this.lossSubject.next(this.lossSubject.getValue() +1);
  }

  private win() {
    alert("You won!");
    this.winSubject.next(this.winSubject.getValue() + 1);
  }
}