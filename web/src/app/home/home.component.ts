import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../state.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('mapWrapper') mapWrapper?: ElementRef;
  @ViewChild('mapScaler') mapScaler?: ElementRef;

  readonly scalerMax = 299;
  readonly scalerMin = 79;
  floor = 0;
  scaler = 99;
  readonly floorImg: string[] = ['./2f3f.svg', './4f.svg'];

  // TODO: the data of points should be fetched from server periodically
  points0: point[] = [
    {
      x: 78.3,
      y: 29,
      score: [100, 60]
    }
  ]

  points1: point[] = [
    {
      x: 78.3,
      y: 29,
      score: [100, 60]
    }
  ]

  points = [this.points0, this.points1];

  constructor(public state: StateService) { }

  ngAfterViewInit(): void {
    this.zoom(0);
    console.log("ngAfterViewInit()", this.state.scrollLeft, this.state.scrollTop);
    this.moveWrapper(this.state.scrollLeft, this.state.scrollTop);
  }

  ngOnInit() {
    this.floor = this.state.floor;
    this.scaler = this.state.scaler;
  }

  changeFloor(floor: number) {
    this.floor = floor;
    this.state.floor = this.floor;
  }

  zoom(delta: number) {
    if (!this.mapScaler) {
      return;
    }

    this.scaler = Math.min(this.scaler + delta, this.scalerMax);
    this.state.scaler = this.scaler;

    const el = this.mapScaler.nativeElement;
    el.style.height = `${this.scaler}%`;
  }

  moveWrapper(left: number | null, top: number | null) {
    if (!this.mapWrapper) {
      return;
    }
    const el = this.mapWrapper.nativeElement;
    if (left != null && top != null) {
      el.scrollLeft = Math.max(0, left);
      el.scrollTop = Math.max(0, top);
    } else {
      el.scrollLeft = Math.max(0, (el.scrollWidth - el.offsetWidth) / 2);
      el.scrollTop = Math.max(0, (el.scrollHeight - el.offsetHeight) / 2);
    }
  }

  onMapWrapperScroll(event: Event) {
    const target = event.target as HTMLElement;
    if (this.mapWrapper && this.mapWrapper.nativeElement === target) {
      this.state.scrollLeft = target.scrollLeft;
      this.state.scrollTop = target.scrollTop;
    }
  }

  positionToUIString(pos: number): string {
    return `calc(${pos}% - 3px)`;
  }

  // convert score to width on UI
  scoreToUIWidth(score: number): number {
    return score
  }
}

interface point {
  score: number[] // for each team score
  x: number // x-axis of position
  y: number // y-axis of position
}