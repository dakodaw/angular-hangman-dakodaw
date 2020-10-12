import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WordProviderService } from '../word-provider.service';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.css']
})
export class WinComponent {

  public currentWord$ = this.wordProviderService.currentCompleteWord$;

  constructor(
    private readonly router: Router,
    private readonly wordProviderService: WordProviderService
  ) { }

  @HostListener('document:keypress', ['$event'])
  public async handleKeyboardEvent() {
    await this.router.navigateByUrl('/game');
  }

}