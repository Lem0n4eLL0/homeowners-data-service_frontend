import { Meta, StoryObj } from '@storybook/react-vite';
import { AppSelect } from './AppSelect';

const meta = {
  title: 'AppSelect',
  component: AppSelect<{ id: string; lang: string }>,
  tags: ['autodocs'],
  args: {
    options: [
      { value: { id: '1', lang: 'en' }, label: 'Английский' },
      { value: { id: '2', lang: 'rus' }, label: 'Русский' },
      { value: { id: '3', lang: 'uk' }, label: 'Украинский' },
      { value: { id: '4', lang: 'in' }, label: 'Английский' },
      { value: { id: '5', lang: 'do' }, label: 'Немецкий' },
    ],
    onChange: () => {},
    placeholder: 'Выберете',
  },
} satisfies Meta<typeof AppSelect<{ id: string; lang: string }>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseSelect: Story = {};

export const DisableSelect: Story = {
  args: {
    disabled: true,
  },
};

export const ErrorSelect: Story = {
  args: {
    isError: true,
  },
};
