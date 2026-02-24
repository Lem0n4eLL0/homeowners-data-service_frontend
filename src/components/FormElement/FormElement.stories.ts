import { FormElement } from './FormElement';
import { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'FormElement',
  component: FormElement,
  tags: ['autodocs'],

  args: {
    name: 'test',
    width: 300,
    placeholder: 'Ввод...',
  },
} satisfies Meta<typeof FormElement>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseInputElement: Story = {
  args: {
    type: 'text',
  },
};

export const PasswordInputElement: Story = {
  args: {
    type: 'password',
    placeholder: 'Введите пароль',
  },
};

export const EmailInputElement: Story = {
  args: {
    type: 'email',
    placeholder: 'Введите email',
  },
};

export const PhoneInputElement: Story = {
  args: {
    type: 'phone',
    placeholder: 'Введите телефон',
  },
};

export const LabeledInputElement: Story = {
  args: {
    label: 'Имя',
    type: 'text',
    placeholder: 'Введите имя',
  },
};

export const RequiredLabeledInputElement: Story = {
  args: {
    label: 'Имя',
    type: 'text',
    placeholder: 'Введите имя',
    isRequired: true,
  },
};

export const DisabledLabeledInputElement: Story = {
  args: {
    label: 'Имя',
    type: 'text',
    isDisabled: true,
    value: 'Владислав',
  },
};

export const LabeledErrorInputElement: Story = {
  args: {
    label: 'Имя',
    type: 'text',
    placeholder: 'Введите имя',
    error: 'Ошибка валидации имени',
  },
};

export const LabeledLongErrorInputElement: Story = {
  args: {
    label: 'Имя',
    type: 'text',
    placeholder: 'Введите имя',
    value: 'Вла',
    error:
      'Ошибка валидации имени, Ошибка валидации имени, Ошибка валидации имени, Ошибка валидации имени, Ошибка валидации имени',
  },
};
