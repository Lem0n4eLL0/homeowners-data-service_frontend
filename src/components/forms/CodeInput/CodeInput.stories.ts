import { Meta, StoryObj } from '@storybook/react-vite';
import { CodeInput } from './CodeInput';

const meta = {
  title: 'CodeInput',
  component: CodeInput,
  tags: ['autodocs'],

  args: {
    value: '',
    onChange: fn,
  },
} satisfies Meta<typeof CodeInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyCodeInput: Story = {};

export const CodeInputOneNumber: Story = {
  args: {
    value: '1',
  },
};

export const CodeInputTwoNumbers: Story = {
  args: {
    value: '12',
  },
};

export const CodeInputThreeNumbers: Story = {
  args: {
    value: '123',
  },
};

export const CodeInputFourNumbers: Story = {
  args: {
    value: '1234',
  },
};

export const CodeInputFiveNumbers: Story = {
  args: {
    value: '12345',
  },
};

export const CodeInputSixNumbers: Story = {
  args: {
    value: '123456',
  },
};

export const CodeInputMore: Story = {
  args: {
    value: '123456789',
  },
};

export const CodeInputOther: Story = {
  args: {
    value: ' 1da23 4f^ 5*6 ',
  },
};
function fn(): import('react').ChangeEventHandler<HTMLInputElement> | undefined {
  throw new Error('Function not implemented.');
}
