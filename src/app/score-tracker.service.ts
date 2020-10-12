import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DrawService } from '../draw.service';
import { Scores } from './scores';

@Injectable()
export class ScoreTrackerService {
  private INITIAL_ATTEMPTS: number = 9;
  private winSubject = new BehaviorSubject<number>(0);
  private lossSubject = new BehaviorSubject<number>(0);
  private remainingAttemptsSubject = new BehaviorSubject<number>(this.INITIAL_ATTEMPTS);

  public scoreInfo$: Observable<Scores> = combineLatest([this.winSubject, this.lossSubject, this.remainingAttemptsSubject])
  .pipe(
    map(([winCount, lossCount, remainingAttempts]) => ({
      winCount,
      lossCount,
      remainingAttempts
    }))
  )

  constructor(
    private readonly drawService: DrawService,
    private readonly router: Router
  ) { }

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
    this.drawService.drawNextPiece(this.remainingAttemptsSubject.getValue());
  }

  private lose() {
    this.remainingAttemptsSubject.next(this.INITIAL_ATTEMPTS);
    this.lossSubject.next(this.lossSubject.getValue() +1);
    this.router.navigateByUrl("/lose");
  }

  private win() {
    this.remainingAttemptsSubject.next(this.INITIAL_ATTEMPTS);
    this.winSubject.next(this.winSubject.getValue() + 1);
    this.router.navigateByUrl("/win");
  }
}