import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { Pill } from './Pill';
import { Size } from '../../../types/sizes';
import type { PillStatus } from '../../../types/ui';
import { DOC_PILL } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta<typeof Pill> = {
  title: 'UI Kit/Data Display/Pill',
  component: Pill,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_PILL,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Подпись рядом с индикатором (в режиме `skeleton` не видна)',
      table: { type: { summary: 'ReactNode' } },
    },
    selected: {
      description: 'Выбранное состояние (акцент по `status`)',
      table: { type: { summary: 'boolean' } },
    },
    disabled: {
      description: 'Отключено',
      table: { type: { summary: 'boolean' } },
    },
    status: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'danger', 'info'],
      description:
        'Семантический акцент для выбранного состояния и верхней дуги спиннера при `loading`',
      table: { type: { summary: 'PillStatus' } },
    },
    loading: {
      description: 'Загрузка: `aria-busy`, спиннер, без клика',
      table: { type: { summary: 'boolean' } },
    },
    skeleton: {
      description: 'Шиммер вместо кнопки',
      table: { type: { summary: 'boolean' } },
    },
    skeletonWidth: {
      description: 'Ширина скелетона в px',
      table: { type: { summary: 'number' } },
    },
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD, Size.LG],
      description: 'Размер; значения: `SM`, `MD`, `LG`',
      table: {
        type: { summary: 'Size: SM, MD или LG' },
      },
    },
    onChange: {
      action: 'onChange',
      description:
        '`(nextSelected, event) => void` — новое значение выбора: без `role="radio"` это `!selected`, для радио всегда `true`',
      table: {
        type: { summary: '(nextSelected: boolean, event: MouseEvent) => void' },
      },
    },
    onClick: {
      action: 'onClick',
      description: 'Нативный клик; вызывается после `onChange`',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Pill',
    size: Size.MD,
    status: 'default',
    onChange: fn(),
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

/** Семантические статусы в выбранном состоянии (акцент границы, текста, точки). */
export const StatusVariants: Story = {
  name: 'Статусы (selected)',
  render: () => {
    const statuses: PillStatus[] = ['default', 'success', 'warning', 'danger', 'info'];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        {statuses.map((pillStatus) => (
          <Pill key={pillStatus} selected status={pillStatus}>
            {pillStatus}
          </Pill>
        ))}
      </div>
    );
  },
};

/** Невыбранный ряд — внешний вид одинаковый; акцент статуса проявляется после выбора. */
export const StatusUnselected: Story = {
  name: 'Статусы (не выбраны)',
  render: () => {
    const statuses: PillStatus[] = ['default', 'success', 'warning', 'danger', 'info'];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        {statuses.map((pillStatus) => (
          <Pill key={pillStatus} selected={false} status={pillStatus}>
            {pillStatus}
          </Pill>
        ))}
      </div>
    );
  },
};

/** Загрузка: спиннер в индикаторе, клик недоступен, `aria-busy`. */
export const Loading: Story = {
  args: {
    children: 'Сохранение…',
    loading: true,
    selected: true,
    status: 'info',
  },
};

/** Скелетон вместо чипа (например до прихода подписи с сервера). */
export const Skeleton: Story = {
  args: {
    children: '—',
    skeleton: true,
    size: Size.MD,
  },
};

/** Скелетон кастомной ширины */
export const SkeletonWidths: Story = {
  name: 'Скелетон — ширины',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Pill skeleton skeletonWidth={72} size={Size.SM}>
        —
      </Pill>
      <Pill skeleton size={Size.MD}>
        —
      </Pill>
      <Pill skeleton skeletonWidth={140} size={Size.LG}>
        —
      </Pill>
    </div>
  ),
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
          {cols.map((columnLabel) => (
            <span key={columnLabel} style={{ fontSize: 12, color: '#888' }}>
              {columnLabel}
            </span>
          ))}
          {sizes.map((sizeValue) => (
            <React.Fragment key={sizeValue}>
              <span style={{ fontSize: 12, color: '#888' }}>{sizeValue}</span>
              <Pill size={sizeValue}>Pill</Pill>
              <Pill size={sizeValue}>Pill</Pill>
              <Pill size={sizeValue}>Pill</Pill>
              <Pill size={sizeValue} selected>
                Pill
              </Pill>
              <Pill size={sizeValue} disabled>
                Pill
              </Pill>
            </React.Fragment>
          ))}
        </div>
        <p style={{ fontSize: 12, color: '#666', maxWidth: 560 }}>
          Колонки Hover / Active в Storybook совпадают с Default — интерактивные состояния проверяйте
          наведением и удержанием мыши на первых трёх кнопках в строке.
        </p>
      </div>
    );
  },
};

/** Группа радиокнопок (`role="radiogroup"`): `onChange(true)` фиксирует выбранный пункт. */
export const RadioGroup: Story = {
  render: () => {
    const [value, setValue] = useState('b');
    return (
      <div
        role="radiogroup"
        aria-label="Пример группы"
        style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}
      >
        {(['a', 'b', 'c'] as const).map((id) => (
          <Pill
            key={id}
            role="radio"
            selected={value === id}
            onChange={(nextSelected) => {
              if (nextSelected) {
                setValue(id);
              }
            }}
          >
            Вариант {id}
          </Pill>
        ))}
      </div>
    );
  },
};

/** Одиночный переключатель: `onChange` получает `!selected`. */
export const ControlledToggle: Story = {
  name: 'Контролируемое переключение (onChange)',
  render: function ControlledToggleRender() {
    const [isSelected, setIsSelected] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <Pill selected={isSelected} onChange={(nextSelected) => setIsSelected(nextSelected)}>
          {isSelected ? 'Включено' : 'Выключено'}
        </Pill>
        <span style={{ fontSize: 12, color: '#64748b' }}>selected = {String(isSelected)}</span>
      </div>
    );
  },
};
