import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DrawService {
  private attemptNumberSubject = new BehaviorSubject<number>(9);
  public attemptNumber$ = this.attemptNumberSubject.asObservable();

  public drawNextPiece(attemptsRemaining: number) {
    const attemptMax = 9;
    this.attemptNumberSubject.next((attemptMax - attemptsRemaining));
  }
}