import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements AfterViewInit {

  private canvasElement: CanvasRenderingContext2D;

  @ViewChild('canvas') public canvas: ElementRef;
  constructor() { }

  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.canvasElement = canvasEl.getContext('2d');
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