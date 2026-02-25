import { Input } from './Input';
import { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],

  args: {
    name: 'test',
    type: 'text',
    elementWidth: 300,
    placeholder: 'Введите фимилию',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextInput: Story = {};

export const DisabledTextInput: Story = {
  args: {
    disabled: true,
  },
};

export const TextInputHeigth: Story = {
  args: {
    elementHeight: 48,
  },
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    placeholder: 'Введите пароль',
  },
};

export const EmailInput: Story = {
  args: {
    type: 'email',
    placeholder: 'Введите email',
  },
};

export const PhoneInput: Story = {
  args: {
    type: 'phone',
    placeholder: 'Введите телефон',
  },
};
