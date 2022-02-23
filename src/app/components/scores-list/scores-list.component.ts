import { Component, Input, OnInit } from '@angular/core';
import { Difficulty } from 'src/app/enumerations/difficulty.enum';
import { Score } from 'src/app/models/score.model';
import { ScoreService } from 'src/app/services/score/score.service';

@Component({
  selector: 'app-scores-list',
  templateUrl: './scores-list.component.html',
  styleUrls: ['./scores-list.component.scss']
})
export class ScoresListComponent implements OnInit {

  @Input() difficulty!: Difficulty;
  scores!: Array<Score>;

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.scores = this.scoreService.getSpecific(this.difficulty);
  }

}
