import { Injectable } from '@angular/core';
import { Difficulty } from 'src/app/enumerations/difficulty.enum';
import { Score } from 'src/app/models/score.model';
import { TimeSpan } from 'src/app/models/timeSpan.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  c3: Score[] = [];

  private scores: Array<Score>;
  private readonly name: string = "scores";


  constructor() {
    this.scores = new Array<Score>();

    this.load();
  }

  add(score: Score) {
    console.log(score);
    this.scores.push(score);


    let easyScores: Array<Score> = this.scores.filter(x => x.difficulty == Difficulty.Easy);
    let mediumScores: Array<Score> = this.scores.filter(x => x.difficulty == Difficulty.Medium);
    let hardScores: Array<Score> = this.scores.filter(x => x.difficulty == Difficulty.Hard);

    let array: Array<Score>;
    switch (score.difficulty) {
      case Difficulty.Easy:
        array = easyScores;
        break;
      case Difficulty.Medium:
        array = mediumScores;
        break;
      case Difficulty.Hard:
        array = hardScores;
        break;
      default:
        //array
        console.log('DEFAULT');
        break;
    }

    for (let index = 0; index < array!.length; index++) {
      const element = array![index];
    }

    array = array!.sort((a, b) => {
      const time1 = a.timeSpan.getTotalSeconds();
      const time2 = b.timeSpan.getTotalSeconds();
      return time1 - time2;
    });

    console.log('1');

    if (array.length > 5)
      array.pop();

    this.scores = new Array<Score>();
    console.log('this.scores.length : ' + this.scores.length);
    this.scores = this.scores.concat(easyScores);
    console.log('this.scores.length : ' + this.scores.length);
    this.scores = this.scores.concat(mediumScores);
    console.log('this.scores.length : ' + this.scores.length);
    this.scores = this.scores.concat(hardScores);
    console.log(this.scores.length);
    this.save();
  }

  getAll(): Array<Score> {
    return this.scores;
  }

  getSpecific(difficulty: Difficulty): Array<Score> {
    return this.scores.filter(x => x.difficulty == difficulty);
  }

  reset(): void {
    this.scores = new Array<Score>();
    localStorage.removeItem(this.name);
  }

  private save(): void {
    let json: string = JSON.stringify(this.scores);
    localStorage.setItem(this.name, JSON.stringify(json));
  }

  private load(): void {

    //Fake
    let array: Array<Score> = new Array<Score>();
    /*
    array.push(new Score(Difficulty.Easy, new TimeSpan(new Date(2022, 1, 10, 10, 40, 0), new Date(2022, 1, 10, 10, 40, 10))));
    array.push(new Score(Difficulty.Easy, new TimeSpan(new Date(2022, 1, 10, 10, 40, 0), new Date(2022, 1, 10, 10, 40, 20))));
    array.push(new Score(Difficulty.Easy, new TimeSpan(new Date(2022, 1, 10, 10, 40, 0), new Date(2022, 1, 10, 10, 40, 30))));
    array.push(new Score(Difficulty.Easy, new TimeSpan(new Date(2022, 1, 10, 10, 40, 0), new Date(2022, 1, 10, 10, 40, 41))));
    array.push(new Score(Difficulty.Easy, new TimeSpan(new Date(2022, 1, 10, 10, 40, 0), new Date(2022, 1, 10, 10, 42, 23))));

    array.push(new Score(Difficulty.Medium, new TimeSpan(new Date(2022, 1, 10, 10, 40, 0), new Date(2022, 1, 10, 10, 43, 12))));
    array.push(new Score(Difficulty.Medium, new TimeSpan(new Date(2022, 1, 10, 10, 40, 0), new Date(2022, 1, 10, 10, 44, 47))));
    array.push(new Score(Difficulty.Medium, new TimeSpan(new Date(2022, 1, 10, 10, 40, 0), new Date(2022, 1, 10, 10, 45, 33))));
    array.push(new Score(Difficulty.Medium, new TimeSpan(new Date(2022, 1, 10, 10, 40, 0), new Date(2022, 1, 10, 10, 47, 5))));
    array.push(new Score(Difficulty.Medium, new TimeSpan(new Date(2022, 1, 10, 10, 40, 0), new Date(2022, 1, 10, 10, 49, 9))));

    array.push(new Score(Difficulty.Hard, new TimeSpan(new Date(2022, 1, 10, 10, 40, 0), new Date(2022, 1, 10, 10, 47, 12))));
    array.push(new Score(Difficulty.Hard, new TimeSpan(new Date(2022, 1, 10, 10, 40, 0), new Date(2022, 1, 10, 10, 48, 47))));
    array.push(new Score(Difficulty.Hard, new TimeSpan(new Date(2022, 1, 10, 10, 40, 0), new Date(2022, 1, 10, 10, 50, 33))));
    array.push(new Score(Difficulty.Hard, new TimeSpan(new Date(2022, 1, 10, 10, 40, 0), new Date(2022, 1, 10, 10, 59, 5))));
    array.push(new Score(Difficulty.Hard, new TimeSpan(new Date(2022, 1, 10, 10, 40, 0), new Date(2022, 1, 10, 11, 5, 58))));
    
    this.scores = array;
    */

    return;
    let json = localStorage.getItem(this.name) || '[]';
    if (json) {

      console.log('um?');
      let c1: Score[] = new Array<Score>();
      console.log(typeof (c1));
      c1 = c1.concat(Array.of(JSON.parse(json)));
      const c2 = JSON.parse(json);
      this.c3 = Array.of(JSON.parse(json));

      console.log('c1 : ' + typeof (c1) + " " + c1);
      console.log('length :' + c1.length);
      let score = new Score(Difficulty.Easy, new TimeSpan(new Date(), new Date()));
      c1.push(score);
      c1.push(score);
      c1.push(score);
      c1.push(score);
      /*
            console.log('c2 : ' + typeof (c2) + " " + c2);
      
            console.log('c3 : ' + typeof (this.c3) + " " + this.c3);
      */


      for (let index = 0; index < c1.length; index++) {
        const element = c1[index];
        console.log('=> ' + element.timeSpan.toString());
        //console.log(element.timeSpan.toString());
      }
    }
  }
}
