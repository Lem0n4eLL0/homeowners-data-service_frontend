import { Meta, StoryObj } from '@storybook/react-vite';
import { AuthStepOne } from './AuthStepOne';

const meta = {
  title: 'AuthStepOne',
  component: AuthStepOne,
  tags: ['autodocs'],
} satisfies Meta<typeof AuthStepOne>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PageAuthStepOne: Story = {};
