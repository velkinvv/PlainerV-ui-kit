import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Pill } from './Pill';
import { Size } from '../../../types/sizes';

const meta: Meta<typeof Pill> = {
  title: 'UI Kit/Data Display/Pill',
  component: Pill,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Чип с круглым индикатором слева: default, hover, active, selected, disabled. Размеры SM / MD / LG.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Подпись',
      table: { type: { summary: 'ReactNode' } },
    },
    selected: {
      description: 'Выбранное состояние',
      table: { type: { summary: 'boolean' } },
    },
    disabled: {
      description: 'Отключено',
      table: { type: { summary: 'boolean' } },
    },
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD, Size.LG],
      description: 'Размер; значения: `SM`, `MD`, `LG`',
      table: {
        type: { summary: 'Size: SM, MD или LG' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Pill',
    size: Size.MD,
  },
};

export const Selected: Story = {
  args: {
    children: 'Pill',
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Pill',
    disabled: true,
  },
};

/** Сетка состояний: строки — размеры, колонки — default / hover / active / selected / disabled */
export const StatesMatrix: Story = {
  render: () => {
    const cols = ['Default', 'Hover', 'Active', 'Selected', 'Disabled'] as const;
    const sizes = [Size.SM, Size.MD, Size.LG] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `120px repeat(${cols.length}, minmax(100px, 1fr))`,
            gap: 12,
            alignItems: 'center',
          }}
        >
          <span />
          {cols.map((c) => (
            <span key={c} style={{ fontSize: 12, color: '#888' }}>
              {c}
            </span>
          ))}
          {sizes.map((sz) => (
            <React.Fragment key={sz}>
              <span style={{ fontSize: 12, color: '#888' }}>{sz}</span>
              <Pill size={sz}>Pill</Pill>
              <Pill size={sz}>Pill</Pill>
              <Pill size={sz}>Pill</Pill>
              <Pill size={sz} selected>
                Pill
              </Pill>
              <Pill size={sz} disabled>
                Pill
              </Pill>
            </React.Fragment>
          ))}
        </div>
        <p style={{ fontSize: 12, color: '#666', maxWidth: 560 }}>
          Колонки Hover / Active в Storybook совпадают с Default — интерактивные состояния
          проверяйте наведением и удержанием мыши на первых трёх кнопках в строке.
        </p>
      </div>
    );
  },
};

export const RadioGroup: Story = {
  render: () => {
    const [v, setV] = useState('b');
    return (
      <div
        role="radiogroup"
        aria-label="Пример группы"
        style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}
      >
        {(['a', 'b', 'c'] as const).map((id) => (
          <Pill key={id} role="radio" selected={v === id} onClick={() => setV(id)}>
            Вариант {id}
          </Pill>
        ))}
      </div>
    );
  },
};

