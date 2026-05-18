import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NumberInput } from './NumberInput';
import { Form } from '../../Form';
import { Size } from '../../../../types/sizes';
import { InputVariant } from '../../../../types/ui';

const meta: Meta<typeof NumberInput> = {
  title: 'UI Kit/Inputs/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Числовое поле с тем же видом и пропсами, что `Input`. Допускаются только цифры; опционально дробная часть и минус.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => (
      <Form formId={`story-number-${context.id}`}>
        <Story />
      </Form>
    ),
  ],
  argTypes: {
    allowDecimal: { description: 'Разрешить десятичную точку (запятая → `.`)' },
    allowNegative: { description: 'Разрешить ведущий `-`' },
    clampOnBlur: { description: 'Ограничить по `min`/`max` при потере фокуса' },
    size: { control: { type: 'select' }, options: Object.values(Size) },
    variant: {
      control: { type: 'select' },
      options: [InputVariant.DEFAULT, InputVariant.CLEAR],
    },
  },
};

export default meta;

type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: {
    label: 'Количество',
    placeholder: '0',
    allowDecimal: false,
    helperText: 'Только целые числа',
  },
};

export const Decimal: Story = {
  args: {
    label: 'Сумма, ₽',
    allowDecimal: true,
    defaultValue: '0.00',
    helperText: 'Дробная часть через точку',
  },
};

export const WithMinMax: Story = {
  args: {
    label: 'Процент',
    min: 0,
    max: 100,
    defaultValue: '50',
    helperText: 'При blur значение ограничится диапазоном',
  },
};

export const NegativeAllowed: Story = {
  args: {
    label: 'Изменение',
    allowNegative: true,
    allowDecimal: true,
    placeholder: '-1.5',
  },
};
