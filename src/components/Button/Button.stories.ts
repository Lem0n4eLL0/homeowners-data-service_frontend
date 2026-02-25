import { Button } from './Button';
import { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],

  args: {
    type: 'button',
    name: 'test',
    children: 'Тестовая кнопка',
    width: 260,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BlueButton: Story = {
  args: {
    option: 'blueButton',
  },
};

export const DeleteButton: Story = {
  args: {
    option: 'errorButton',
    name: 'error',
    children: 'Удалить',
    width: 140,
  },
};
