import { Time } from './Time';
import {
  ITimerState,
  TimerEndState,
  TimerProcessState,
  TimerReadyState,
  TimerState,
  TimerStopedState,
} from './TimerState';

export type TimerDuration = 'down' | 'up';
export type TimerCallback = {
  changeCurrentValue: (value: Time) => void;
  changeState: (state: TimerState) => void;
};

export interface ITimer {
  start: () => void;
  stop: () => void;
  reset: () => void;
}

interface IStateTimer {
  initTimer: () => void;
  resetTimer: () => void;
  stopTimer: () => void;
}

export class Timer implements ITimer, IStateTimer {
  private _callback: TimerCallback;
  private _state: ITimerState;
  public readyState: ITimerState;
  public processState: ITimerState;
  public stopedState: ITimerState;
  public endState: ITimerState;

  private _intervalID: number | null = null;

  private _value: Time;
  private _currentValue: Time;
  private _duration: TimerDuration = 'down';
  private _endValue: Time = Time.ZERRO_VALUE;
  private _changeIntervalms: number = 1000;

  constructor(
    callback: TimerCallback,
    value: Time,
    endValue?: Time,
    duration?: TimerDuration,
    changeIntervalms?: number
  ) {
    this._value = new Time(value.seconds);
    this._currentValue = new Time(this._value.seconds);
    if (endValue) this._endValue = endValue;
    if (duration) this._duration = duration;
    if (changeIntervalms) this._changeIntervalms = changeIntervalms;

    this._callback = callback;

    this.readyState = new TimerReadyState(this);
    this.processState = new TimerProcessState(this);
    this.stopedState = new TimerStopedState(this);
    this.endState = new TimerEndState(this);
    this._state = this.readyState;
  }

  start() {
    this._state.start();
  }

  stop() {
    this._state.stop();
  }

  reset() {
    this._state.reset();
  }

  initTimer() {
    this.intervalID = window.setInterval(() => {
      switch (this.duration) {
        case 'down':
          this.currentValue.decrement();
          break;
        case 'up':
          this.currentValue.increment();
          break;
      }
      if (this.currentValue.toEqual(this.endValue)) {
        clearInterval(this.intervalID!);
        this.state = this.endState;
        this.callback.changeState('End');
      }

      this.callback.changeCurrentValue(this.currentValue);
    }, this.changeIntervalms);
    this.state = this.processState;
    this.callback.changeState('Process');
  }

  resetTimer() {
    if (this.intervalID) clearInterval(this.intervalID);

    this.currentValue = new Time(this._value.seconds);
    this.callback.changeCurrentValue(this.currentValue);

    this.state = this.readyState;
    this.callback.changeState('Ready');
  }

  stopTimer() {
    if (this.intervalID) clearInterval(this.intervalID);

    this.state = this.stopedState;
    this.callback.changeState('Stoped');
  }

  set value(value: Time) {
    this._value = value;
  }

  set endValue(value: Time) {
    this._endValue = value;
  }

  set intervalID(value: number | null) {
    this._intervalID = value;
  }

  set state(value: ITimerState) {
    this._state = value;
  }

  set currentValue(value: Time) {
    this._currentValue = value;
  }

  get value() {
    return this._value;
  }

  get currentValue() {
    return this._currentValue;
  }

  get duration() {
    return this._duration;
  }

  get endValue() {
    return this._endValue;
  }

  get intervalID() {
    return this._intervalID;
  }

  get changeIntervalms() {
    return this._changeIntervalms;
  }

  get state() {
    return this._state;
  }

  get callback() {
    return this._callback;
  }
}
