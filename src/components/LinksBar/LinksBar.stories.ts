import { Meta, StoryObj } from '@storybook/react-vite';
import { LinksBar } from './LinksBar';

const meta = {
  title: 'LinksBar',
  component: LinksBar,
  tags: ['autodocs'],

  args: {
    active: 'history',
    links: [
      {
        name: 'услуги',
        label: 'Выбор услуг',
        onClick: () => {},
      },
      {
        name: 'history',
        label: 'История',
        onClick: () => {},
      },
    ],
  },
} satisfies Meta<typeof LinksBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseLinksBar: Story = {};
