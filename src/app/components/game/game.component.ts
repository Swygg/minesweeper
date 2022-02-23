import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Difficulty } from 'src/app/enumerations/difficulty.enum';
import { StateGame } from 'src/app/enumerations/stateGame.enum';
import { tileType } from 'src/app/enumerations/tileType.enum';
import { Game } from 'src/app/models/game.model';
import { Score } from 'src/app/models/score.model';
import { ScoreService } from 'src/app/services/score/score.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: Game;
  tileType = tileType;
  stateGame = StateGame;
  error!: string;

  difficulty!: Difficulty;

  constructor(private route: ActivatedRoute,
    private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.game = new Game();


    this.route.queryParams.subscribe(
      (params) => {
        switch (+params['difficulty']) {
          case Difficulty.Easy:
            this.difficulty = Difficulty.Easy;
            break;
          case Difficulty.Medium:
            this.difficulty = Difficulty.Medium;
            break;
          case Difficulty.Hard:
            this.difficulty = Difficulty.Hard;
            break;
          default:
            break;
        }

        this.game.generate(this.difficulty);
      }
    )
  }

  dig(x: number, y: number): void {
    this.error = '';
    try {
      this.game.dig(x, y);
      if (this.game.stateGame == StateGame.Win) {
        this.addScore();
      }
    }
    catch (error) {
      if (error instanceof Error)
        this.error = error.message;
      else this.error = String(error);
    }
  }

  flag(event: any, x: number, y: number): void {
    this.error = '';
    event.preventDefault();
    try {
      this.game.flag(x, y);
    }
    catch (error) {
      if (error instanceof Error)
        this.error = error.message;
      else this.error = String(error);
    }
  }

  restart(): void {
    this.game.generate(this.difficulty);
  }

  cancelRightClick(event: any): void {
    event.preventDefault();
  }

  addScore() {
    const newScore: Score = new Score(this.difficulty, this.game.timespan!);
    this.scoreService.add(newScore);
  }

  cheat(): void {
    this.game.cheat();
    this.addScore();
  }
}
