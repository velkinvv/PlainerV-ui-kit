import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import { Size } from '../../../types/sizes';
import { SpinnerVariant } from '../../../types/ui';
import { DOC_SPINNER } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta<typeof Spinner> = {
  title: 'UI Kit/Feedback/Spinner',
  component: Spinner,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_SPINNER,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    color: '#68d5f8',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: [Size.XS, Size.SM, Size.MD, Size.LG, Size.XL],
      description: 'Размер спиннера',
      table: {
        type: { summary: 'Size: XS, SM, MD, LG, XL' },
      },
    },
    color: {
      control: { type: 'color' },
      description: 'Цвет спиннера',
      type: { name: 'string', required: false },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#68d5f8' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(SpinnerVariant),
      description: 'Визуальный вариант спиннера',
      table: {
        type: { summary: 'circle, dots, bars или pulse (SpinnerVariant)' },
      },
    },
    speed: {
      control: { type: 'number', min: 0.1, max: 5, step: 0.1 },
      description: 'Скорость анимации в секундах',
      table: { type: { summary: 'number (секунды)' } },
    },
    thickness: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Толщина границы для circle варианта',
      table: { type: { summary: 'number (px)' } },
    },
    label: {
      control: { type: 'text' },
      description: 'Текст рядом со спиннером',
      table: { type: { summary: 'string' } },
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Позиция текста относительно спиннера',
      table: {
        type: { summary: 'top, bottom, left или right' },
      },
    },
    centered: {
      control: { type: 'boolean' },
      description: 'Центрировать спиннер в контейнере',
      table: { type: { summary: 'boolean' } },
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Текст для screen readers',
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner size={Size.XS} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Extra Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size={Size.SM} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size={Size.MD} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Medium</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size={Size.LG} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Large</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size={Size.XL} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Extra Large</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant={SpinnerVariant.CIRCLE} size={Size.MD} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Circle</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant={SpinnerVariant.DOTS} size={Size.MD} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Dots</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant={SpinnerVariant.BARS} size={Size.MD} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Bars</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant={SpinnerVariant.PULSE} size={Size.MD} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Pulse</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Все доступные визуальные варианты спиннера.',
      },
    },
  },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner color="#68d5f8" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Blue</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner color="#ef4444" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Red</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner color="#10b981" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Green</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner color="#8b5cf6" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Purple</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner color="#f59e0b" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Orange</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const CustomSpeed: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320 }}>
      <div>
        <h3 style={{ marginBottom: 8 }}>Медленная анимация (2s)</h3>
        <Spinner speed={2} />
      </div>
      <div>
        <h3 style={{ marginBottom: 8 }}>Стандартная анимация (1s)</h3>
        <Spinner speed={1} />
      </div>
      <div>
        <h3 style={{ marginBottom: 8 }}>Быстрая анимация (0.5s)</h3>
        <Spinner speed={0.5} />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Примеры разных скоростей анимации спиннера.',
      },
    },
  },
};

export const CustomThickness: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner thickness={1} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Thin (1px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner thickness={2} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Default (2px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner thickness={4} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Thick (4px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner thickness={6} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Very Thick (6px)</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Примеры разной толщины границы для circle варианта.',
      },
    },
  },
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320 }}>
      <div>
        <h3 style={{ marginBottom: 8 }}>Label снизу (по умолчанию)</h3>
        <Spinner label="Загрузка..." labelPosition="bottom" />
      </div>
      <div>
        <h3 style={{ marginBottom: 8 }}>Label сверху</h3>
        <Spinner label="Загрузка..." labelPosition="top" />
      </div>
      <div>
        <h3 style={{ marginBottom: 8 }}>Label слева</h3>
        <Spinner label="Загрузка..." labelPosition="left" />
      </div>
      <div>
        <h3 style={{ marginBottom: 8 }}>Label справа</h3>
        <Spinner label="Загрузка..." labelPosition="right" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Спиннер с текстовым лейблом в разных позициях.',
      },
    },
  },
};

export const Centered: Story = {
  render: () => (
    <div
      style={{
        width: '200px',
        height: '100px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        position: 'relative',
      }}
    >
      <Spinner size={Size.SM} centered />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Центрированный спиннер внутри контейнера.',
      },
    },
  },
};

export const CenteredWithLabel: Story = {
  render: () => (
    <div
      style={{
        width: '200px',
        height: '120px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        position: 'relative',
      }}
    >
      <Spinner size={Size.MD} label="Загрузка данных..." centered />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Центрированный спиннер с лейблом внутри контейнера.',
      },
    },
  },
};

export const Accessibility: Story = {
  args: {
    size: Size.MD,
    ariaLabel: 'Загрузка списка пользователей',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Спиннер с кастомным aria-label для улучшения доступности для screen readers.',
      },
    },
  },
};

export const VariantsComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h3 style={{ marginBottom: 16 }}>Все варианты в разных размерах</h3>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          {[Size.SM, Size.MD, Size.LG].map((size) => (
            <div key={size} style={{ textAlign: 'center' }}>
              <Spinner variant={SpinnerVariant.CIRCLE} size={size} />
              <p style={{ marginTop: '8px', fontSize: '12px' }}>{size}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: 16 }}>Dots вариант</h3>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          {[Size.SM, Size.MD, Size.LG].map((size) => (
            <div key={size} style={{ textAlign: 'center' }}>
              <Spinner variant={SpinnerVariant.DOTS} size={size} />
              <p style={{ marginTop: '8px', fontSize: '12px' }}>{size}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: 16 }}>Bars вариант</h3>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          {[Size.SM, Size.MD, Size.LG].map((size) => (
            <div key={size} style={{ textAlign: 'center' }}>
              <Spinner variant={SpinnerVariant.BARS} size={size} />
              <p style={{ marginTop: '8px', fontSize: '12px' }}>{size}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: 16 }}>Pulse вариант</h3>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          {[Size.SM, Size.MD, Size.LG].map((size) => (
            <div key={size} style={{ textAlign: 'center' }}>
              <Spinner variant={SpinnerVariant.PULSE} size={size} />
              <p style={{ marginTop: '8px', fontSize: '12px' }}>{size}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Сравнение всех вариантов спиннера в разных размерах.',
      },
    },
  },
};

