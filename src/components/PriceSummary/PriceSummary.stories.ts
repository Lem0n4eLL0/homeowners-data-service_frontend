import { Meta, StoryObj } from '@storybook/react-vite';
import { PriceSummary } from './PriceSummary';

const meta = {
  title: 'PriceSummary',
  component: PriceSummary,
  tags: ['autodocs'],

  args: {
    lable: 'Итог',
  },
} satisfies Meta<typeof PriceSummary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StringPriceSummary: Story = {
  args: {
    price: '1000.00₽',
  },
};

export const NumberPriceSummary: Story = {
  args: {
    price: 100,
  },
};
