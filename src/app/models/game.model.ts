import { Difficulty } from "../enumerations/difficulty.enum";
import { StateGame } from "../enumerations/stateGame.enum";
import { tileType } from "../enumerations/tileType.enum";
import { GameParameters } from "./gameParameters.model";
import { Tile } from "./tile.model";
import { TimeSpan } from "./timeSpan.model";

export class Game {
    public board!: Array<Array<Tile>>;
    public stateGame: StateGame;
    public tileType = tileType;

    public width!: number;
    public heihgt!: number;
    public nbMines!: number;
    public nbFlags!: number;

    public dateStart!: Date | null;
    public timespan!: TimeSpan | null;

    private tilesAlreadyChecked!: Array<{ x: number, y: number }>;
    private gameAlreadyLost: string = "You already lost the game.";
    private gameAlreadyWon: string = "You already won the game.";
    private difficulty! : Difficulty;

    constructor() {
        this.stateGame = StateGame.Playing;
    }

    generate(difficulty: Difficulty): void {
        //Choose difficulty
        let gameParameters: GameParameters;

        switch (difficulty) {
            case Difficulty.Easy:
                gameParameters = new GameParameters(10, 10, 10);
                break;
            case Difficulty.Medium:
                gameParameters = new GameParameters(12, 15, 20);
                break;
            case Difficulty.Hard:
                gameParameters = new GameParameters(15, 20, 40);
                break;
            default:
                gameParameters = new GameParameters(10, 10, 10);
                break;
        }

        this.width = gameParameters.getWidth();
        this.heihgt = gameParameters.getHeight();
        this.nbMines = gameParameters.getNbMines();
        this.nbFlags = 0;
        this.tilesAlreadyChecked = new Array<{ x: number, y: number }>();
        this.stateGame = StateGame.Playing;
        this.dateStart = null;
        this.timespan = null;
        this.difficulty = difficulty;

        this.generateWithParameters(gameParameters);
    }

    dig(x: number, y: number, firstCall: boolean = true): void {

        this.checkIfGameIsStillRunning();

        if (x < 0 ||
            x >= this.width ||
            y < 0 ||
            y >= this.heihgt ||
            this.tilesAlreadyChecked.find(z => z.x == x && z.y == y) != undefined) {
            return;
        }

        this.checkTimeIfFirstTime();

        switch (this.board[x][y].tileType) {
            case tileType.VoidHidden:
                this.board[x][y].tileType = tileType.VoidDiscovered;

                if (this.board[x][y].nbMinesAround == 0) {
                    //Y = -1
                    this.dig(x - 1, y - 1, false);
                    this.dig(x, y - 1, false);
                    this.dig(x + 1, y - 1, false);

                    //Y =0
                    this.dig(x - 1, y, false);
                    this.dig(x + 1, y, false);

                    //Y = +1
                    this.dig(x - 1, y + 1, false);
                    this.dig(x, y + 1, false);
                    this.dig(x + 1, y + 1, false);
                }

                break;
            case tileType.MineHidden:
                this.board[x][y].tileType = tileType.MineDiscovered;
                this.stateGame = StateGame.Lose;
                this.end();
                break;
            default:
                break;
        }

        if (firstCall)
            this.checkIfGameIsWin()
    }

    flag(x: number, y: number): void {

        this.checkIfGameIsStillRunning();

        switch (this.board[x][y].tileType) {
            case tileType.MineFlag:
                this.board[x][y].tileType = tileType.MineHidden;
                this.nbFlags--;
                break;
            case tileType.MineHidden:
                this.board[x][y].tileType = tileType.MineFlag;
                this.nbFlags++;
                break;
            case tileType.VoidFlag:
                this.board[x][y].tileType = tileType.VoidHidden;
                this.nbFlags--;
                break;
            case tileType.VoidHidden:
                this.board[x][y].tileType = tileType.VoidFlag;
                this.nbFlags++;
                break;
            default:
                break;
        }
    }

    checkIfGameIsStillRunning(): void {
        if (this.stateGame == StateGame.Lose)
            throw new Error(this.gameAlreadyLost);
        if (this.stateGame == StateGame.Win)
            throw new Error(this.gameAlreadyWon);
    }

    cheat(): void {
        this.stateGame = StateGame.Win;
        this.end();
    }


    private generateWithParameters(gameParameters: GameParameters): void {
        this.board = this.getBoard(gameParameters.getWidth(), gameParameters.getHeight(), gameParameters.getNbMines());
    }

    private getBoard(width: number, height: number, nbMines: number): Array<Array<Tile>> {
        //Generate new empty board
        let board: Array<Array<Tile>> = new Array<Array<Tile>>();
        for (let index = 0; index < width; index++) {
            board.push(this.getRow(height));
        }

        //We add the mines
        while (nbMines > 0) {
            let x = this.generateRandom(0, width - 1);
            let y = this.generateRandom(0, height - 1);
            if (board[x][y].tileType === tileType.VoidHidden) {
                board[x][y].tileType = tileType.MineHidden;
                nbMines--;
            }
        }

        //Count number mines around
        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board[x].length; y++) {
                let nbMines = 0;

                //Y = -1
                if (x - 1 >= 0 && y - 1 >= 0 && board[x - 1][y - 1].tileType == tileType.MineHidden)
                    nbMines++;
                if (y - 1 >= 0 && board[x][y - 1].tileType == tileType.MineHidden)
                    nbMines++;
                if (x + 1 < width && y - 1 >= 0 && board[x + 1][y - 1].tileType == tileType.MineHidden)
                    nbMines++;

                //Y =0
                if (x - 1 >= 0 && board[x - 1][y].tileType == tileType.MineHidden)
                    nbMines++;
                if (x + 1 < width && board[x + 1][y].tileType == tileType.MineHidden)
                    nbMines++;

                //Y = +1
                if (x - 1 >= 0 && y + 1 < height && board[x - 1][y + 1].tileType == tileType.MineHidden)
                    nbMines++;
                if (y + 1 < height && board[x][y + 1].tileType == tileType.MineHidden)
                    nbMines++;
                if (x + 1 < width && y + 1 < height && board[x + 1][y + 1].tileType == tileType.MineHidden)
                    nbMines++;

                board[x][y].nbMinesAround = nbMines;
            }
        }

        return board;
    }

    private getRow(length: number): Array<Tile> {
        let row: Array<Tile> = new Array<Tile>();
        for (let index = 0; index < length; index++) {
            row.push(new Tile(tileType.VoidHidden));
        }
        return row;
    }

    private generateRandom(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    private checkIfGameIsWin(): void {

        let nbHiddenMines = 0;
        let nbFlagedMines = 0;
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.heihgt; y++) {
                switch (this.board[x][y].tileType) {
                    case tileType.VoidHidden:
                    case tileType.VoidFlag:
                        //Pplayer made a mistake
                        return;
                    case tileType.MineFlag:
                        nbFlagedMines++;
                        break;
                    case tileType.MineHidden:
                        nbHiddenMines++;
                        break;
                    default:
                        break;
                }
            }
        }

        if (nbHiddenMines + nbFlagedMines == this.nbMines) {
            this.stateGame = StateGame.Win;
            this.end();
        }
    }

    private checkTimeIfFirstTime(): void {
        if (this.dateStart == null)
            this.dateStart = new Date();
    }

    private end() {
        this.timespan = new TimeSpan(this.dateStart!, new Date());
    }

    getDifficulty() : Difficulty{
        return this.difficulty;
    }
}