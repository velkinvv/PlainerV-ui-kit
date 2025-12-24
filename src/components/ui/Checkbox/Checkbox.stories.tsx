import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Size } from '../../../types/sizes';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Отмечен ли чекбокс',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключить чекбокс',
    },
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD, Size.LG],
      description: 'Размер чекбокса (SM=16px, MD=20px, LG=24px)',
    },
    label: {
      control: 'text',
      description: 'Текстовая метка',
    },
    onChange: {
      action: 'changed',
      description: 'Обработчик изменения',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Базовый чекбокс
export const Default: Story = {
  args: {
    label: 'Принять условия',
  },
};

// Отмеченный чекбокс
export const Checked: Story = {
  args: {
    checked: true,
    label: 'Принять условия',
  },
};

// Отключенный чекбокс
export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Принять условия',
  },
};

// Отключенный отмеченный чекбокс
export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Принять условия',
  },
};

// Чекбокс без метки
export const WithoutLabel: Story = {
  args: {
    checked: false,
  },
};

// Разные размеры
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox size={Size.SM} label="Маленький чекбокс (16px)" />
      <Checkbox size={Size.MD} label="Средний чекбокс (20px)" checked />
      <Checkbox size={Size.LG} label="Большой чекбокс (24px)" />
    </div>
  ),
};

// Интерактивный пример
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState<boolean>(false);

    return (
      <Checkbox
        checked={checked}
        onChange={_e => setChecked(prev => !prev)}
        label="Интерактивный чекбокс"
      />
    );
  },
};

// Группа чекбоксов
export const CheckboxGroup: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const items = [
      { id: '1', label: 'Опция 1' },
      { id: '2', label: 'Опция 2' },
      { id: '3', label: 'Опция 3' },
      { id: '4', label: 'Опция 4' },
    ];

    const handleChange = (id: string, checked: boolean) => {
      if (checked) {
        setSelectedItems([...selectedItems, id]);
      } else {
        setSelectedItems(selectedItems.filter(item => item !== id));
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3>Выберите опции:</h3>
        {items.map(item => (
          <Checkbox
            key={item.id}
            checked={selectedItems.includes(item.id)}
            onChange={e => handleChange(item.id, e.target.checked)}
            label={item.label}
          />
        ))}
        <p>
          Выбрано: {selectedItems.length} из {items.length}
        </p>
      </div>
    );
  },
};
