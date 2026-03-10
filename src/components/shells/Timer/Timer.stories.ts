import { Meta, StoryObj } from '@storybook/react-vite';
import { Timer } from './Timer';
import { Time } from '@/features/Timer/Time';

const meta = {
  title: 'Timer',
  component: Timer,
  tags: ['autodocs'],
  args: {
    value: new Time(5),
  },
} satisfies Meta<typeof Timer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TimerDefault: Story = {};

export const TimerSecondsDefault: Story = {
  args: {
    value: new Time(20),
    accuracy: 'seconds',
  },
};

export const TimerMinutsDefault: Story = {
  args: {
    value: new Time(75),
    accuracy: 'minuts',
  },
};

export const TimerHoursDefault: Story = {
  args: {
    value: new Time(3675),
    accuracy: 'hours',
  },
};

export const TimerDaysDefault: Story = {
  args: {
    value: new Time(226775),
    accuracy: 'days',
  },
};
