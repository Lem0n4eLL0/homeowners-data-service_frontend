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
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BlueButton: Story = {
  args: {
    option: 'BlueButton',
    width: 260,
  },
};

export const DisableBlueButton: Story = {
  args: {
    option: 'BlueButton',
    disabled: true,
    width: 260,
  },
};

export const DeleteButton: Story = {
  args: {
    option: 'DeleteButton',
    name: 'error',
    children: 'Удалить',
    width: 140,
  },
};

export const LinkButton: Story = {
  args: {
    option: 'LinkButton',
    name: 'link',
    children: 'Поменять номер',
  },
};

export const LoadingBlueButton: Story = {
  args: {
    option: 'BlueButton',
    name: 'link',
    children: 'Поменять номер',
    width: 260,
    loading: {
      isLoading: true,
      loadingMessage: 'Загрузка...',
    },
  },
};

export const LoadingDeleteButton: Story = {
  args: {
    option: 'DeleteButton',
    name: 'link',
    children: 'Поменять номер',
    width: 140,
    loading: {
      isLoading: true,
      loadingMessage: 'Удалить',
    },
  },
};
