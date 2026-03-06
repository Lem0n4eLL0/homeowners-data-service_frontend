import { Meta, StoryObj } from '@storybook/react-vite';
import { ValueBlock } from './ValueBlock';

const meta = {
  title: 'ValueBlock',
  component: ValueBlock,
  tags: ['autodocs'],

  args: {
    state: 'EMPTY',
  },
} satisfies Meta<typeof ValueBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ValueBlockEmpty: Story = {};

export const ValueBlockNext: Story = {
  args: {
    state: 'NEXT',
  },
};

export const ValueBlockFull: Story = {
  args: {
    state: 'FULL',
    children: '3',
  },
};
