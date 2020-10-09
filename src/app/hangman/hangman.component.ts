import { AfterViewInit, Component, ElementRef, Input, OnDestroy,  ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DrawService } from '../../draw.service';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements AfterViewInit, OnDestroy {

  private canvasElement: CanvasRenderingContext2D;
  private subscription: Subscription;

  @ViewChild('canvas') public canvas: ElementRef;
  @Input() public complete: boolean = false;

  constructor(
    private readonly drawService: DrawService
  ) {}
  

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.canvasElement = canvasEl.getContext('2d');
    if(this.complete) {
      this.drawAll;
    }
    this.subscription = this.drawService.attemptNumber$.pipe(
      tap((attemptNumber) => {
        switch(attemptNumber) {
          case 1:
            this.drawGallows();
            return;
          case 2:
            this.drawHead();
            return;
          case 3:
            this.drawBody();
            return;
          case 4:
            this.drawRightArm();
            return;
          case 5:
            this.drawLeftArm();
            return;
          case 6:
            this.drawRightLeg();
            return;
          case 7:
            this.drawLeftLeg();
            return;
          case 8:
            this.drawRightFoot();
            return;
          case 9:
            this.drawLeftFoot();
            return;
        }
      })
    ).subscribe();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private drawAll() {
    this.drawGallows(); 
    this.drawHead();
    this.drawBody();
    this.drawRightArm();
    this.drawLeftArm();
    this.drawRightLeg();
    this.drawLeftLeg();
    this.drawRightFoot();
    this.drawLeftFoot();
  }

  private drawGallows() {
    this.canvasElement.strokeStyle = '#FFFFFF';
    this.canvasElement.lineWidth = 5; 
    this.canvasElement.beginPath();
    this.canvasElement.moveTo(145, 225);
    this.canvasElement.lineTo(5, 225);
    this.canvasElement.moveTo(25, 225);
    this.canvasElement.lineTo(25, 15);
    this.canvasElement.lineTo(80, 15);
    this.canvasElement.lineTo(80, 25);
    this.canvasElement.stroke();
  }

  private drawHead() {
    this.canvasElement.lineWidth = 5;
    this.canvasElement.beginPath();
    this.canvasElement.arc(80, 50, 25, 0, Math.PI*2, true);
    this.canvasElement.closePath();
    this.canvasElement.stroke();
  }

  private drawBody() {
    this.canvasElement.beginPath();
    this.canvasElement.moveTo(80, 75);
    this.canvasElement.lineTo(80, 140);
    this.canvasElement.stroke();
  }

  private drawRightArm() {
    this.canvasElement.beginPath();
    this.canvasElement.moveTo(80, 85);
    this.canvasElement.lineTo(40, 100);
    this.canvasElement.stroke();
  }

  private drawLeftArm() {
    this.canvasElement.beginPath();
    this.canvasElement.moveTo(80, 85);
    this.canvasElement.lineTo(120, 100);
    this.canvasElement.stroke();
  }

  private drawRightLeg() {
    this.canvasElement.beginPath();
    this.canvasElement.moveTo(80, 140);
    this.canvasElement.lineTo(60, 190);
    this.canvasElement.stroke();
  }

  private drawLeftLeg() {
    this.canvasElement.beginPath();
    this.canvasElement.moveTo(80, 140);
    this.canvasElement.lineTo(105, 190);
    this.canvasElement.stroke();
  }

  private drawRightFoot() {
    this.canvasElement.beginPath();
    this.canvasElement.moveTo(62, 190);
    this.canvasElement.lineTo(50, 185);
    this.canvasElement.stroke();
  }
  private drawLeftFoot() {
    this.canvasElement.beginPath();
    this.canvasElement.moveTo(102, 190);
    this.canvasElement.lineTo(115, 185);
    this.canvasElement.stroke();
  }
}