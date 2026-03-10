import clsx from 'clsx';
import style from './Timer.module.scss';
import { Time } from '@/features/Timer/Time';
import { TimeAccuracy, timeFormatter } from '@/features/Timer/TimeFormatter';

interface ITimer {
  value: Time;
  accuracy?: TimeAccuracy;
  extraClassName?: string;
}

export const Timer = (props: ITimer) => {
  const { value, accuracy, extraClassName } = props;

  return (
    <span className={clsx(style['content'], extraClassName)}>{timeFormatter(value, accuracy)}</span>
  );
};
