import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  
  constructor(
    private readonly router: Router
  ) {}

  @HostListener('document:keypress', ['$event'])
  public async handleKeyboardEvent() {
    await this.router.navigateByUrl('/game');
  }

}