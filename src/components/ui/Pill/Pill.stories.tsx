import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Pill } from './Pill';
import { Size } from '../../../types/sizes';

const meta: Meta<typeof Pill> = {
  title: 'Components/Pill',
  component: Pill,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/nXAzUL74f5DbMpolFYlKl7/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82--Copy-?node-id=4833-5',
    },
    docs: {
      description: {
        component:
          'Чип с круглым индикатором слева: default, hover, active, selected, disabled. Размеры SM / MD / LG.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'Подпись' },
    selected: { description: 'Выбранное состояние' },
    disabled: { description: 'Отключено' },
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD, Size.LG],
      description: 'Размер',
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

/** Сетка состояний как в макете: строки — размеры, колонки — default / hover / active / selected / disabled */
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
          {cols.map(c => (
            <span key={c} style={{ fontSize: 12, color: '#888' }}>
              {c}
            </span>
          ))}
          {sizes.map(sz => (
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
          Колонки Hover / Active в Storybook совпадают с Default — интерактивные состояния проверяйте наведением
          и удержанием мыши на первых трёх кнопках в строке.
        </p>
      </div>
    );
  },
};

export const RadioGroup: Story = {
  render: () => {
    const [v, setV] = useState('b');
    return (
      <div role="radiogroup" aria-label="Пример группы" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['a', 'b', 'c'] as const).map(id => (
          <Pill key={id} role="radio" selected={v === id} onClick={() => setV(id)}>
            Вариант {id}
          </Pill>
        ))}
      </div>
    );
  },
};
