export class Time {
  private _seconds: number;

  public static ZERRO_VALUE: Time = new Time(0);

  constructor(seconds: number) {
    this._seconds = seconds;
  }

  get seconds() {
    return this._seconds;
  }

  public increment(seconds: number = 1) {
    this._seconds += seconds;
  }

  public decrement(seconds: number = 1) {
    this._seconds -= seconds;
  }

  public toEqual(time: Time): boolean {
    return this._seconds === time.seconds;
  }
}
