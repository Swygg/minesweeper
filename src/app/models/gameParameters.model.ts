export class GameParameters {
    constructor(
        private Width: number,
        private Height: number,
        private NbMines: number) {
    }

    getWidth(): number {
        return this.Width;
    }
    getHeight(): number {
        return this.Height;
    }
    getNbMines(): number {
        return this.NbMines;
    }
}