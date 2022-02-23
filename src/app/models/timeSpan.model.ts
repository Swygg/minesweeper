export class TimeSpan {
    Year!: number;
    Month!: number;
    Days!: number;
    Hours!: number;
    Minutes!: number;
    Seconds!: number;

    constructor(date1: Date, date2: Date) {
        var diff = date2.getTime() - date1.getTime();

        this.Days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= this.Days * (1000 * 60 * 60 * 24);

        this.Hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= this.Hours * (1000 * 60 * 60);

        this.Minutes = Math.floor(diff / (1000 * 60));
        diff -= this.Minutes * (1000 * 60);

        this.Seconds = Math.floor(diff / (1000));
        diff -= this.Seconds * (1000);
    }

    getTotalSeconds(): number {
        return this.Seconds +
            this.Minutes * 60 +
            this.Hours * 60 * 60;
    }

    toString(): string {
        let hours: string = this.Hours.toString();
        if (hours.length == 1)
            hours = '0' + hours;
        let minutes: string = this.Minutes.toString();
        if (minutes.length == 1)
            minutes = '0' + minutes;
        let seconds: string = this.Seconds.toString();
        if (seconds.length == 1)
            seconds = '0' + seconds;
        return `${hours}:${minutes}:${seconds}`;
    }
}