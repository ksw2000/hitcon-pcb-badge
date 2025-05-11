import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  imports: [DecimalPipe],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent implements AfterViewInit {
  @ViewChild('team1Block') team1Block!: ElementRef;
  @ViewChild('team2Block') team2Block!: ElementRef;
  team1Score: number = 2000
  team2Score: number = 8000
  items: leaderboard[] = []
  constructor(){
    for(let i = 0; i < 1000; i++){
      this.items.push({
        name: "name name name name",
        score: (1000-i)*10,
      })
    }
  }
  
  ngAfterViewInit(): void {
    this.updateBlock();
  }

  computeTeam1Percent(): number {
    return this.team1Score / (this.team1Score + this.team2Score)
  }

  updateBlock() {
    let p1 = Math.round(this.computeTeam1Percent() * 100);
    let p2 = 100 - p1;
    this.team1Block.nativeElement.style.width = `${p1}%`;
    this.team2Block.nativeElement.style.width = `${p2}%`;
  }
}

interface leaderboard {
  name: string
  score: number
}
