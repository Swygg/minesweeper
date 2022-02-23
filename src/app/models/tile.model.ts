import { tileType } from "../enumerations/tileType.enum";

export class Tile {
    tileType!: tileType;
    nbMinesAround!: number;

    constructor(
        tileType: tileType) {
        this.tileType = tileType;
        this.nbMinesAround = 0;
    }
}