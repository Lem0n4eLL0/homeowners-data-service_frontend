import { Time } from './Time';

export type TimeAccuracy = 'seconds' | 'minuts' | 'hours' | 'days';

export const pad = (num: number): string => String(num).padStart(2, '0');
export const timeFormatter = (time: Time, accuracy: TimeAccuracy = 'seconds'): string => {
  const totalSeconds = time.seconds;
  const seconds = totalSeconds % 60;
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));

  switch (accuracy) {
    case 'seconds':
      return `${pad(totalSeconds)}`;
    case 'minuts':
      return `${pad(minutes + hours * 60 + days * 60 * 24)}:${pad(seconds)}`;
    case 'hours':
      return `${pad(hours + days * 24)}:${pad(minutes)}:${pad(seconds)}`;
    case 'days':
      return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    default:
      return `${pad(totalSeconds)}`;
  }
};
