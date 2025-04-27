import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  imports: [DecimalPipe],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {
  items: leaderboard[] = []
  constructor(){
    for(let i = 0; i < 1000; i++){
      this.items.push({
        name: "name name name name",
        score: (1000-i)*10,
      })
    }
  }
}

interface leaderboard {
  name: string
  score: number
}
