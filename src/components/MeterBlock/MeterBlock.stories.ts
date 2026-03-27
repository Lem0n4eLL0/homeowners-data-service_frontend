import { Meta, StoryObj } from '@storybook/react-vite';
import { MeterBlock } from './MeterBlock';

const meta = {
  title: 'MeterBlock',
  component: MeterBlock,
  tags: ['autodocs'],
} satisfies Meta<typeof MeterBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ColdWaterMeter: Story = {
  args: {
    meter: {
      id: '1',
      serialNumber: '477263',
      type: 'COLD_WATER',
      propertyId: '1',
    },
  },
};

export const HotWaterMeter: Story = {
  args: {
    meter: {
      id: '1',
      serialNumber: '994822',
      type: 'HOT_WATER',
      propertyId: '1',
    },
  },
};

export const ElectricityMeter: Story = {
  args: {
    meter: {
      id: '1',
      serialNumber: '994822',
      type: 'ELECTRICITY',
      propertyId: '1',
    },
  },
};

export const GasMeter: Story = {
  args: {
    meter: {
      id: '1',
      serialNumber: '994822',
      type: 'GAS',
      propertyId: '1',
    },
  },
};

export const HeatingMeter: Story = {
  args: {
    meter: {
      id: '1',
      serialNumber: '122211',
      type: 'HEATING',
      propertyId: '1',
    },
  },
};
