import { Timer } from './Timer';

export interface ITimerState {
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export type TimerState = 'Ready' | 'Process' | 'Stoped' | 'End';

export class TimerReadyState implements ITimerState {
  private _timer: Timer;

  constructor(timer: Timer) {
    this._timer = timer;
  }

  start() {
    this._timer.initTimer();
  }

  stop() {}

  reset() {}
}

export class TimerProcessState implements ITimerState {
  private _timer: Timer;

  constructor(timer: Timer) {
    this._timer = timer;
  }

  start() {}

  stop() {}

  reset() {}
}

export class TimerStopedState implements ITimerState {
  private _timer: Timer;

  constructor(timer: Timer) {
    this._timer = timer;
  }

  start() {
    this._timer.initTimer();
  }

  stop() {}

  reset() {
    this._timer.resetTimer();
  }
}

export class TimerEndState implements ITimerState {
  private _timer: Timer;

  constructor(timer: Timer) {
    this._timer = timer;
  }

  start() {
    this._timer.resetTimer();
    this._timer.initTimer();
  }

  stop() {}

  reset() {
    this._timer.resetTimer();
  }
}
