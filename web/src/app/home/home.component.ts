import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('mapWrapper') mapWrapper?: ElementRef;
  @ViewChild('mapScaler') mapScaler?: ElementRef;

  scaler = 99;
  readonly scalerMax = 299;
  readonly scalerMin = 79;

  ngAfterViewInit(): void {
    this.centerWrapper();
  }

  floor: number = 0;
  floorImg: string[] = ['./2f3f.svg', '4f.svg'];
  changeFloor(floor: number) {
    this.floor = floor;
  }

  zoom(zoomIn: boolean) {
    if (!this.mapScaler) {
      return;
    }

    if (zoomIn) {
      this.scaler = Math.min(this.scaler + 10, this.scalerMax);
    } else {
      this.scaler = Math.max(this.scaler - 10, this.scalerMin);
    }

    const el = this.mapScaler.nativeElement;
    el.style.height = `${this.scaler}%`;
  }

  centerWrapper() {
    if (!this.mapWrapper) {
      return;
    }
    const el = this.mapWrapper.nativeElement;
    el.scrollLeft = Math.max(0, (el.scrollWidth - el.offsetWidth) / 2);
    el.scrollTop = Math.max(0, (el.scrollHeight - el.offsetHeight) / 2);
  }
}
