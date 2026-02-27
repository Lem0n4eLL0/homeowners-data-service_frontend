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

  stop() {
    console.log('Impossible operation');
  }

  reset() {
    console.log('Already reset');
  }
}

export class TimerProcessState implements ITimerState {
  private _timer: Timer;

  constructor(timer: Timer) {
    this._timer = timer;
  }

  start() {
    console.log('Already process');
  }

  stop() {
    this._timer.stopTimer();
  }

  reset() {
    this._timer.resetTimer();
  }
}

export class TimerStopedState implements ITimerState {
  private _timer: Timer;

  constructor(timer: Timer) {
    this._timer = timer;
  }

  start() {
    this._timer.initTimer();
  }

  stop() {
    console.log('Already stop');
  }

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

  stop() {
    console.log('Impossible to stop');
  }

  reset() {
    this._timer.resetTimer();
  }
}
