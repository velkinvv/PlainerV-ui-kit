import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Slider } from './Slider';
import { RangeSlider } from './RangeSlider';
import { Form } from '../Form';
import { Size } from '../../../types/sizes';

const formatRub = (n: number) => `${new Intl.NumberFormat('ru-RU').format(n)} ₽`;

const meta: Meta<typeof Slider> = {
  title: 'UI Kit/Inputs/Slider',
  component: Slider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Одиночный слайдер (`Slider`) и диапазон (`RangeSlider`). Акцент трека и бегунка — `theme.colors.info` (+ `infoHover` при наведении на бегунок).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'Контролируемое значение бегунка',
      table: { type: { summary: 'number' } },
    },
    defaultValue: {
      description: 'Начальное значение в неконтролируемом режиме',
      table: { type: { summary: 'number' } },
    },
    onChange: {
      description: 'Новое значение после перетаскивания, клика по треку или клавиатуры',
      table: {
        type: { summary: '(value: number) => void' },
      },
    },
    min: {
      table: { type: { summary: 'number' } },
    },
    max: {
      table: { type: { summary: 'number' } },
    },
    step: {
      table: { type: { summary: 'number' } },
    },
    disabled: {
      table: { type: { summary: 'boolean' } },
    },
    fullWidth: {
      table: { type: { summary: 'boolean' } },
    },
    formatValue: {
      control: false,
      table: {
        type: { summary: '(value: number) => string' },
      },
    },
    formatMinLabel: {
      control: false,
      table: {
        type: { summary: '(min: number) => string' },
      },
    },
    formatMaxLabel: {
      control: false,
      table: {
        type: { summary: '(max: number) => string' },
      },
    },
    showValueLabel: {
      table: { type: { summary: 'boolean' } },
    },
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
      table: {
        type: { summary: 'Size: XS, SM, MD, LG, XL' },
      },
    },
    name: {
      table: { type: { summary: 'string (name у скрытого input, для форм)' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => {
    const [v, setV] = useState(1_000_000);
    return (
      <div style={{ maxWidth: 480 }}>
        <Slider
          fullWidth
          min={0}
          max={2_000_000}
          step={50_000}
          value={v}
          onChange={setV}
          formatValue={formatRub}
          formatMinLabel={() => '0'}
          formatMaxLabel={() => '2 млн ₽'}
        />
      </div>
    );
  },
};

export const Range: Story = {
  render: () => {
    const [pair, setPair] = useState<[number, number]>([0, 1_000_000]);
    return (
      <div style={{ maxWidth: 520 }}>
        <RangeSlider
          fullWidth
          min={0}
          max={2_000_000}
          step={50_000}
          value={pair}
          onChange={(p) => setPair([p[0], p[1]])}
          formatValue={formatRub}
          formatMinLabel={() => '0'}
          formatMaxLabel={() => '2 млн ₽'}
        />
      </div>
    );
  },
};

export const RangeWithInputs: Story = {
  render: () => {
    const [pair, setPair] = useState<[number, number]>([0, 2_000_000]);
    return (
      <Form formId="story-slider-range" onSubmit={(e) => e.preventDefault()}>
        <div style={{ maxWidth: 520 }}>
          <RangeSlider
            fullWidth
            min={0}
            max={2_000_000}
            step={10_000}
            value={pair}
            onChange={(p) => setPair([p[0], p[1]])}
            formatValue={formatRub}
            formatMinLabel={() => '0'}
            formatMaxLabel={() => '2 млн ₽'}
            showManualInputs
            nameFrom="priceFrom"
            nameTo="priceTo"
          />
        </div>
      </Form>
    );
  },
};

