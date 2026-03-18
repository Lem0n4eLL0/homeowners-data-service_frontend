import { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';

type TestTable = {
  id: string;
  name: { firstName: string; lastName: string };
  age: number;
};
const meta = {
  title: 'Table',
  component: Table<TestTable>,
  tags: ['autodocs'],

  args: {
    columns: [
      {
        key: 'id',
        title: 'Номер',
        render: value => value,
      },
      {
        key: 'name',
        title: 'Имя',
        render: value => `${value.firstName}-${value.lastName}`,
      },
      {
        key: 'age',
        title: 'Возраст',
        render: value => `${value} лет`,
      },
    ],
    data: [
      {
        id: '1',
        name: { firstName: 'Влад', lastName: 'Черванев' },
        age: 21,
      },
      {
        id: '2',
        name: { firstName: ' Екатерина', lastName: 'Парвенова' },
        age: 20,
      },
      {
        id: '3',
        name: { firstName: ' Михаил', lastName: 'Серпухов' },
        age: 22,
      },
    ],
    onRowClick: () => {},
  },
} satisfies Meta<typeof Table<TestTable>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseTable: Story = {};

export const EmptyTable: Story = {
  args: {
    data: [],
    emptyDataPlaceholder: <div style={{ fontSize: 40 }}>Пустая строка</div>,
  },
};

export const SelectedRowTable: Story = {
  args: {
    selectedItem: {
      id: '1',
      name: { firstName: 'Влад', lastName: 'Черванев' },
      age: 21,
    },
  },
};
