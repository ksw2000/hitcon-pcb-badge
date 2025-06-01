import { CommonModule, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  imports: [DecimalPipe, CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {
  team0Score = 2000;
  team1Score = 8000;
  items: leaderboard[] = [];
  constructor() {
    for (let i = 0; i < 20; i++) {
      this.items.push({
        name: "name name name name",
        score: (1000 - i) * 10,
        teamID: Math.floor(Math.random() * 2),
      });
    }
  }

  team0Percent(): number {
    return (this.team0Score / (this.team0Score + this.team1Score)) * 100;
  }

  team1Percent(): number {
    return (1 - this.team0Score / (this.team0Score + this.team1Score)) * 100;
  }
}

interface leaderboard {
  name: string
  score: number
  teamID: number
}

// TODO: use service to get and keep data