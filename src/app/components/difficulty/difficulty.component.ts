import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Difficulty } from 'src/app/enumerations/difficulty.enum';

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.scss']
})
export class DifficultyComponent implements OnInit {
  difficultyEnum = Difficulty;

  constructor(
    private router: Router) { }

  ngOnInit(): void {
  }

  launchGame(difficulty: Difficulty) {
    this.router.navigate(['/game'], { queryParams: { difficulty} });
  }
}
