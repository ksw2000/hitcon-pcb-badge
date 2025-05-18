import { CommonModule, DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  imports: [DecimalPipe, CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent implements AfterViewInit {
  @ViewChild('team0Block') team0Block!: ElementRef;
  @ViewChild('team1Block') team1Block!: ElementRef;
  team0Score: number = 2000
  team1Score: number = 8000
  items: leaderboard[] = []
  constructor(){
    for(let i = 0; i < 20; i++){
      this.items.push({
        name: "name name name name",
        score: (1000-i)*10,
        teamID: Math.floor(Math.random() * 2),
      })
    }
  }
  
  ngAfterViewInit(): void {
    this.updateBlock();
  }

  computeTeam0Percent(): number {
    return this.team0Score / (this.team0Score + this.team1Score)
  }

  updateBlock() {
    let p1 = Math.round(this.computeTeam0Percent() * 100);
    let p2 = 100 - p1;
    this.team0Block.nativeElement.style.width = `${p1}%`;
    this.team1Block.nativeElement.style.width = `${p2}%`;
  }
}

interface leaderboard {
  name: string
  score: number
  teamID: number
}

// TODO: use service to get and keep data