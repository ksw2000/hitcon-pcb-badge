import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { env } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private http = inject(HttpClient);
  getLeaderBoard(): Observable<leaderboard[]> {
    return this.http.get<leaderboard[]>(env.api.getScores).pipe(map((scores) => {
      return scores.sort((a, b) => {
        return b.total_score - a.total_score;
      });
    }));
  }
}

export interface leaderboard {
  name: string;
  player_id: number;
  scores: {
    tetris: number;
    shake_badge: number;
    dino: number;
    snake: number;
    tama: number;
    connect_sponsor: number;
    rectf: number;
  };
  total_score: number;
  connected_sponsors: number[];
}