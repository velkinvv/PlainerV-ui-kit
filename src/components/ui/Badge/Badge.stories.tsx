import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { BadgeVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Компонент бейджа для отображения статусов и меток согласно дизайн-системе',
      },
    },
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
    variant: {
      control: { type: 'select' },
      options: [...Object.values(BadgeVariant)],
      description: 'Вариант стилизации бейджа',
    },
    size: {
      control: { type: 'select' },
      options: [...Object.values(Size)],
      description: 'Размер бейджа',
    },
    isDot: {
      control: { type: 'boolean' },
      description: 'Специальный dot размер (8x8px без текста)',
    },
    rounded: {
      control: { type: 'boolean' },
      description: 'Скругленные углы (по умолчанию true)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Основные варианты согласно макету
export const Default: Story = {
  args: {
    children: '3',
    variant: BadgeVariant.DEFAULT,
  },
};

export const DefaultMain: Story = {
  args: {
    children: '3',
    variant: BadgeVariant.DEFAULT_MAIN,
  },
};

export const DefaultMainInversion: Story = {
  args: {
    children: '3',
    variant: BadgeVariant.DEFAULT_MAIN_INVERSION,
  },
};

export const DefaultSuccess: Story = {
  args: {
    children: '3',
    variant: BadgeVariant.DEFAULT_SUCCESS,
  },
};

export const Disable: Story = {
  args: {
    children: '3',
    variant: BadgeVariant.DISABLE,
  },
};

export const Outline: Story = {
  args: {
    children: '3',
    variant: BadgeVariant.OUTLINE,
  },
};

export const OutlineInversion: Story = {
  args: {
    children: '3',
    variant: BadgeVariant.OUTLINE_INVERSION,
  },
};

export const Warning: Story = {
  args: {
    children: '3',
    variant: BadgeVariant.WARNING,
  },
};

export const Info: Story = {
  args: {
    children: '3',
    variant: BadgeVariant.INFO,
  },
};

// Размеры согласно макету
export const Dot: Story = {
  args: {
    variant: BadgeVariant.DEFAULT,
    isDot: true,
  },
};

export const Small: Story = {
  args: {
    children: '3',
    variant: BadgeVariant.DEFAULT,
    size: Size.XS, // sm в макете
  },
};

export const Medium: Story = {
  args: {
    children: '3',
    variant: BadgeVariant.DEFAULT,
    size: Size.SM, // md в макете
  },
};

export const Large: Story = {
  args: {
    children: '3',
    variant: BadgeVariant.DEFAULT,
    size: Size.MD, // lg в макете
  },
};

export const ExtraLarge: Story = {
  args: {
    children: '3',
    variant: BadgeVariant.DEFAULT,
    size: Size.LG, // xl в макете
  },
};

export const Rounded: Story = {
  args: {
    children: 'Rounded',
    rounded: true,
  },
};

export const Clickable: Story = {
  args: {
    children: 'Clickable',
    onClick: () => alert('Badge clicked!'),
  },
};

// Демонстрация всех вариантов согласно макету
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant={BadgeVariant.DEFAULT}>3</Badge>
      <Badge variant={BadgeVariant.DEFAULT_MAIN}>3</Badge>
      <Badge variant={BadgeVariant.DEFAULT_MAIN_INVERSION}>3</Badge>
      <Badge variant={BadgeVariant.DEFAULT_SUCCESS}>3</Badge>
      <Badge variant={BadgeVariant.DISABLE}>3</Badge>
      <Badge variant={BadgeVariant.OUTLINE}>3</Badge>
      <Badge variant={BadgeVariant.OUTLINE_INVERSION}>3</Badge>
      <Badge variant={BadgeVariant.WARNING}>3</Badge>
      <Badge variant={BadgeVariant.INFO}>3</Badge>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Badge variant={BadgeVariant.DEFAULT} isDot={true} />
      <Badge variant={BadgeVariant.DEFAULT} size={Size.XS}>
        3
      </Badge>
      <Badge variant={BadgeVariant.DEFAULT} size={Size.SM}>
        3
      </Badge>
      <Badge variant={BadgeVariant.DEFAULT} size={Size.MD}>
        3
      </Badge>
      <Badge variant={BadgeVariant.DEFAULT} size={Size.LG}>
        3
      </Badge>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Демонстрация dot размеров для всех вариантов
export const AllDotVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Badge variant={BadgeVariant.DEFAULT} isDot={true} />
      <Badge variant={BadgeVariant.DEFAULT_MAIN} isDot={true} />
      <Badge variant={BadgeVariant.DEFAULT_MAIN_INVERSION} isDot={true} />
      <Badge variant={BadgeVariant.DEFAULT_SUCCESS} isDot={true} />
      <Badge variant={BadgeVariant.DISABLE} isDot={true} />
      <Badge variant={BadgeVariant.OUTLINE} isDot={true} />
      <Badge variant={BadgeVariant.OUTLINE_INVERSION} isDot={true} />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Демонстрация с числами
export const WithNumbers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge variant={BadgeVariant.DEFAULT}>5</Badge>
      <Badge variant={BadgeVariant.DEFAULT_SUCCESS}>12</Badge>
      <Badge variant={BadgeVariant.DEFAULT_MAIN}>99</Badge>
      <Badge variant={BadgeVariant.DISABLE}>3</Badge>
      <Badge variant={BadgeVariant.OUTLINE}>42</Badge>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Демонстрация ограничения на 9+
export const NumberLimiting: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant={BadgeVariant.DEFAULT}>9</Badge>
      <Badge variant={BadgeVariant.DEFAULT}>10</Badge>
      <Badge variant={BadgeVariant.DEFAULT}>99</Badge>
      <Badge variant={BadgeVariant.DEFAULT}>999</Badge>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
