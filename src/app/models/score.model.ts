import { Difficulty } from "../enumerations/difficulty.enum";
import { TimeSpan } from "./timeSpan.model";

export class Score{
    difficulty : Difficulty;
    timeSpan : TimeSpan;

    constructor(difficulty : Difficulty, timeSpan : TimeSpan){
        this.difficulty = difficulty;
        this.timeSpan = timeSpan;
    }
}