import { Meta, StoryObj } from '@storybook/react-vite';
import { AppLinks } from './AppLinks';

const meta = {
  title: 'AppLinks',
  component: AppLinks,
  tags: ['autodocs'],
} satisfies Meta<typeof AppLinks>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AppLinksBase: Story = {};
