import { ITimer, Timer, TimerDuration } from '../features/Timer/Timer';
import { Time } from '../features/Timer/Time';
import { useMemo, useState } from 'react';
import { TimerState } from '../features/Timer/TimerState';

export interface TimerProps {
  time: Time;
  endTime?: Time;
  duration?: TimerDuration;
  changeIntervalms?: number;
}

interface UseTimerReturn {
  state: TimerState;
  time: Time;
  timer: ITimer;
}

function useTimer(props: TimerProps): UseTimerReturn {
  const { time, endTime, duration, changeIntervalms } = props;

  const [currentTime, setCurrentTime] = useState<Time>(time);
  const [currentState, setCurrentState] = useState<TimerState>('Ready');

  const timer = useMemo<ITimer>(
    () =>
      new Timer(
        {
          changeCurrentValue: (value: Time) => {
            setCurrentTime(new Time(value.seconds));
          },
          changeState: (state: TimerState) => {
            setCurrentState(state);
          },
        },
        time,
        endTime,
        duration,
        changeIntervalms
      ),
    [time, endTime, duration, changeIntervalms]
  );
  return {
    state: currentState,
    time: currentTime,
    timer,
  };
}

export default useTimer;
