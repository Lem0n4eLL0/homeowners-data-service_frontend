import { Meta, StoryObj } from '@storybook/react-vite';
import { PhoneInput } from './PhoneInput';

const meta = {
  title: 'PhoneInput',
  component: PhoneInput,
  tags: ['autodocs'],

  args: {
    name: 'test',
    type: 'phone',
    value: '',
    width: '300px',
  },
} satisfies Meta<typeof PhoneInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PhoneInputEmpty: Story = {};

export const PhoneInputOneNumber: Story = {
  args: {
    value: '1',
  },
};

export const PhoneInputTwoNumbers: Story = {
  args: {
    value: '12',
  },
};

export const PhoneInputThreeNumbers: Story = {
  args: {
    value: '123',
  },
};

export const PhoneInputForeNumbers: Story = {
  args: {
    value: '1234',
  },
};

export const PhoneInputFiveNumbers: Story = {
  args: {
    value: '12345',
  },
};

export const PhoneInputSixNumbers: Story = {
  args: {
    value: '123456',
  },
};

export const PhoneInputSevenNumbers: Story = {
  args: {
    value: '1234567',
  },
};

export const PhoneInputEightNumbers: Story = {
  args: {
    value: '12345678',
  },
};

export const PhoneInputNineNumbers: Story = {
  args: {
    value: '123456789',
  },
};

export const PhoneInputFull: Story = {
  args: {
    value: '1234567890',
  },
};

export const PhoneInputMore: Story = {
  args: {
    value: '12345678901234',
  },
};

export const PhoneInputOtherSymbols: Story = {
  args: {
    value: ' 123@45678%90fg123 4 ',
  },
};
