import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WordProviderService } from '../word-provider.service';

@Component({
  selector: 'app-lose',
  templateUrl: './lose.component.html',
  styleUrls: ['./lose.component.css']
})
export class LoseComponent {

  public currentWord$ = this.wordProviderService.currentCompleteWord$;

  constructor(
    private readonly router: Router,
    private readonly wordProviderService: WordProviderService
  ) {}

  @HostListener('document:keypress', ['$event'])
  public async handleKeyboardEvent() {
    await this.router.navigateByUrl('/game');
  }

}