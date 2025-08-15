import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { env } from '../config';
import score_from_json from './scores.json';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private http = inject(HttpClient);
  getLeaderBoard(): Observable<leaderboard[]> {
    return of(score_from_json);
    // return this.http.get<leaderboard[]>(env.api.getScores).pipe(timeout(env.api.timeout), map((scores) => {
    //   scores = scores.sort((a, b) => {
    //     return b.total_score - a.total_score;
    //   });
    //   console.log(scores);
    //   return scores;
    // }), catchError((error) => {
    //   console.error('fetching error', error);
    //   return of([]);
    // }));
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