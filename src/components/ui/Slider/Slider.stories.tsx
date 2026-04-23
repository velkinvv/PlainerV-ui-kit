import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Slider } from './Slider';
import { RangeSlider } from './RangeSlider';
import { Form } from '../Form';

const formatRub = (n: number) => `${new Intl.NumberFormat('ru-RU').format(n)} ₽`;

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/nXAzUL74f5DbMpolFYlKl7/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82--Copy-',
    },
    docs: {
      description: {
        component: 'Одиночный слайдер (`Slider`) и диапазон (`RangeSlider`) по макету Figma.',
      },
    },
  },
  tags: ['autodocs'],
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
          onChange={p => setPair([p[0], p[1]])}
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
      <Form formId="story-slider-range" onSubmit={e => e.preventDefault()}>
        <div style={{ maxWidth: 520 }}>
          <RangeSlider
            fullWidth
            min={0}
            max={2_000_000}
            step={10_000}
            value={pair}
            onChange={p => setPair([p[0], p[1]])}
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
