import { Input } from '../Input';
import { FormElement } from './FormElement';
import { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'FormElement',
  component: FormElement,
  tags: ['autodocs'],

  args: {
    width: 300,
    children: <Input name="test" type="text" placeholder="Введите имя" />,
  },
} satisfies Meta<typeof FormElement>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseInputElement: Story = {};

export const LabeledInputElement: Story = {
  args: {
    label: 'Имя',
  },
};

export const RequiredLabeledInputElement: Story = {
  args: {
    label: 'Имя',
    isRequired: true,
  },
};

export const LabeledErrorInputElement: Story = {
  args: {
    label: 'Имя',
    error: 'Ошибка валидации имени',
  },
};

export const LabeledLongErrorInputElement: Story = {
  args: {
    label: 'Имя',
    error:
      'Ошибка валидации имени, Ошибка валидации имени, Ошибка валидации имени, Ошибка валидации имени, Ошибка валидации имени',
  },
};
