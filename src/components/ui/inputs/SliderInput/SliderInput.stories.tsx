import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SliderInput } from './SliderInput';
import { Form } from '../../Form';
import { Size } from '../../../../types/sizes';
import { InputVariant } from '../../../../types/ui';

const meta: Meta<typeof SliderInput> = {
  title: 'UI Kit/Inputs/SliderInput',
  component: SliderInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Слайдер и числовой ввод в одной рамке как у `Input`. См. [Admiral SliderInputField](https://admiralds.github.io/react-ui/?path=/docs/admiral-2-1-form-field-sliderinputfield--docs).',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => (
      <Form formId={`story-slider-input-${context.id}`}>
        <Story />
      </Form>
    ),
  ],
  argTypes: {
    size: { control: { type: 'select' }, options: Object.values(Size) },
    variant: {
      control: { type: 'select' },
      options: [InputVariant.DEFAULT, InputVariant.CLEAR],
    },
    showNumberField: { description: 'Поле числа справа от трека' },
    showValueLabel: { description: 'Подпись значения под бегунком' },
    showScaleLabels: { description: 'Подписи min / max под рамкой поля' },
  },
};

export default meta;

type Story = StoryObj<typeof SliderInput>;

export const Default: Story = {
  args: {
    label: 'Громкость',
    helperText: 'Перетащите бегунок или введите значение',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 42,
    fullWidth: true,
    displayClearIcon: true,
    numberPlaceholder: '0–100',
  },
};

export const DecimalStep: Story = {
  args: {
    label: 'Процент с шагом 0.1',
    min: 0,
    max: 10,
    step: 0.1,
    defaultValue: 3.7,
    fullWidth: true,
    showValueLabel: true,
  },
};

export const Controlled: Story = {
  render: function SliderInputControlledStory() {
    const [level, setLevel] = useState(35);
    return (
      <SliderInput
        label="Уровень"
        value={level}
        onChange={setLevel}
        min={0}
        max={100}
        step={5}
        fullWidth
        helperText={`Текущее: ${level}`}
      />
    );
  },
};

export const WithoutNumberField: Story = {
  args: {
    label: 'Только слайдер',
    showNumberField: false,
    min: 10,
    max: 90,
    defaultValue: 50,
    fullWidth: true,
  },
};
