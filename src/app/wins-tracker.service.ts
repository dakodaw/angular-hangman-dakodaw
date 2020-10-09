import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class WinsTrackerService {
  private winSubject = new BehaviorSubject<number>(0);
  public wins$ = this.winSubject.asObservable();
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