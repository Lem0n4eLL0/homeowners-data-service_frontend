import { Meta, StoryObj } from '@storybook/react-vite';
import { AuthPage } from './AuthPage';

const meta = {
  title: 'AuthPage',
  component: AuthPage,
  tags: ['autodocs'],
} satisfies Meta<typeof AuthPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PageAuthStepOne: Story = {};
