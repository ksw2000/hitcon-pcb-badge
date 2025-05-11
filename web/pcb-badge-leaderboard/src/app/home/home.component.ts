import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  floor: number = 0;
  floorImg: string[] = ['./2f3f.svg', '4f.svg'];
  changeFloor(floor: number) {
    this.floor = floor;
  }
}
