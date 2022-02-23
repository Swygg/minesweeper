import { Component, OnInit } from '@angular/core';
import { Difficulty } from 'src/app/enumerations/difficulty.enum';
import { Score } from 'src/app/models/score.model';
import { ScoreService } from 'src/app/services/score/score.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {

  easyScores!: Array<Score>;
  mediumScores!: Array<Score>;
  hardScores!: Array<Score>;

  constructor(private scoreService: ScoreService) {

  }

  ngOnInit(): void {
    this.getScores();
  }

  getScores(): void {
    this.easyScores = this.scoreService.getSpecific(Difficulty.Easy);
    this.mediumScores = this.scoreService.getSpecific(Difficulty.Medium);
    this.hardScores = this.scoreService.getSpecific(Difficulty.Hard);
  }

  reset(): void {
    this.scoreService.reset();
    this.getScores();
  }
}