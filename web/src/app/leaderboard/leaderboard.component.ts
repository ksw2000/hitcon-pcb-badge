import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { leaderboard, ScoreService } from '../score.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  imports: [DecimalPipe, CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css',
})
export class LeaderboardComponent {
  teamScore: number[] = [0, 0];
  items$!: Observable<leaderboard[]>;
  private scoreService = inject(ScoreService);
  constructor() {
    effect(() => {
      this.items$ = this.scoreService.getLeaderBoard();
      this.items$.subscribe((items) => {
        items.forEach((item) => {
          this.teamScore[this.userIDToTeamID(item.uid)]+=item.total_score;
        });
      });
    });
  }

  // TODO: How to convert user id to team id?
  userIDToTeamID(id: number): number {
    return id % 2;
  }

  team0Percent(): number {
    return (this.teamScore[0] / (this.teamScore[0] + this.teamScore[1])) * 100;
  }

  team1Percent(): number {
    return (1 - this.teamScore[0] / (this.teamScore[0] + this.teamScore[1])) * 100;
  }
}