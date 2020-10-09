import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ScoreTrackerService {
  private winSubject = new BehaviorSubject<number>(0);
  public wins$: Observable<number> = this.winSubject.asObservable();

  private lossSubject = new BehaviorSubject<number>(0);
  public losses$:Observable<number> = this.lossSubject.asObservable();

  constructor() { }


  public checkForWin(word: string, guess: string[]) {
    if(word === guess.join('')) {
      this.win();
    }
  }
  private win() {
    alert("You won!");
    this.winSubject.next(this.winSubject.getValue() + 1);
  }
}