import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class WordProviderService {
  private phrases: string[] = [
    "hello there",
  ];
  private currentPhraseSubject = new BehaviorSubject<string>(null);
  public currentPhrase$: Observable<string> = this.currentPhraseSubject.asObservable();
  
  constructor() { 
    this.getNextPhrase();
  }

  private getNextPhrase() {
    const nextIndex = Math.random() * this.phrases.length;
    this.currentPhraseSubject.next(this.phrases[nextIndex]);
  }

}