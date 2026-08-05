import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TransferList } from './TransferList';
import type { TransferListItem } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { DOC_TRANSFER_LIST } from '@/components/ui/storyDocs/uiKitDocs';

const demoItems: TransferListItem[] = [
  { value: '1', label: 'Пункт 1' },
  { value: '2', label: 'Пункт 2' },
  { value: '3', label: 'Пункт 3', disabled: true },
  { value: '4', label: 'Пункт 4', description: 'Дополнительное описание' },
  { value: '5', label: 'Пункт 5' },
  { value: '6', label: 'Пункт 6' },
  { value: '7', label: 'Пункт 7' },
  { value: '8', label: 'Пункт 8' },
];

const meta: Meta<typeof TransferList> = {
  title: 'UI Kit/Inputs/TransferList',
  component: TransferList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_TRANSFER_LIST,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['basic', 'enhanced'],
      description: 'basic — move-all; enhanced — select-all + счётчик',
    },
    searchable: { control: 'boolean' },
    draggable: { control: 'boolean' },
    showMoveAll: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    color: {
      control: 'text',
      description: 'Акцент checkbox: primary | success | … или CSS-цвет',
    },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof TransferList>;

export const Basic: Story = {
  name: 'Basic',
  args: {
    items: demoItems,
    defaultValue: ['5', '6'],
    leftTitle: 'Доступные',
    rightTitle: 'Выбранные',
    variant: 'basic',
    showMoveAll: true,
    searchable: true,
    draggable: true,
    fullWidth: true,
  },
};

export const Enhanced: Story = {
  name: 'Enhanced',
  args: {
    items: demoItems,
    defaultValue: ['7', '8'],
    variant: 'enhanced',
    searchable: true,
    draggable: true,
    fullWidth: true,
  },
};

export const ControlledValue: Story = {
  name: 'Controlled value (справа)',
  render: function ControlledValueStory() {
    const [rightValue, setRightValue] = useState<string[]>(['2']);
    return (
      <TransferList
        items={demoItems}
        value={rightValue}
        onChange={(payload) => setRightValue(payload.rightValue)}
        fullWidth
        leftTitle="Кандидаты"
        rightTitle="Итог"
      />
    );
  },
};

export const ExplicitPanels: Story = {
  name: 'Explicit left/right',
  render: function ExplicitPanelsStory() {
    const [leftValue, setLeftValue] = useState(['1', '2', '3', '4']);
    const [rightValue, setRightValue] = useState(['5', '6']);
    return (
      <TransferList
        items={demoItems}
        leftValue={leftValue}
        rightValue={rightValue}
        onChange={(payload) => {
          setLeftValue(payload.leftValue);
          setRightValue(payload.rightValue);
        }}
        fullWidth
        variant="enhanced"
      />
    );
  },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    items: demoItems,
    defaultValue: ['1'],
    disabled: true,
    fullWidth: true,
  },
};

export const ColorsAndSize: Story = {
  name: 'Color / size',
  args: {
    items: demoItems,
    defaultValue: ['4'],
    color: 'success',
    size: Size.MD,
    variant: 'enhanced',
    fullWidth: true,
  },
};

export const CustomRender: Story = {
  name: 'Custom renderItem',
  args: {
    items: demoItems,
    defaultValue: [],
    fullWidth: true,
    searchable: false,
    renderItem: (item, { checked }) => (
      <span>
        <strong>{item.label}</strong>
        {checked ? ' ✓' : ''}
        {item.description ? ` — ${String(item.description)}` : ''}
      </span>
    ),
  },
};
