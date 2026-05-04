import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import {
  BadgeStoriesSizesRoot,
  BadgeStoriesSizeFigure,
  BadgeStoriesSizeCaption,
  BadgeStoriesSizeTitle,
  BadgeStoriesSizeProp,
} from './BadgeStories.style';
import { BadgeVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { DOC_BADGE } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta<typeof Badge> = {
  title: 'UI Kit/Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_BADGE,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [...Object.values(BadgeVariant)],
      description: 'Вариант стилизации бейджа',
      table: {
        type: { summary: 'BadgeVariant (см. список в control)' },
      },
    },
    size: {
      control: { type: 'select' },
      options: [...Object.values(Size)],
      description: 'Размер бейджа',
      table: {
        type: { summary: 'Size: XS, SM, MD, LG, XL' },
      },
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

// Основные варианты
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

// Размеры
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
    size: Size.XS,
  },
};

export const Medium: Story = {
  args: {
    children: '3',
    variant: BadgeVariant.DEFAULT,
    size: Size.SM,
  },
};

export const Large: Story = {
  args: {
    children: '3',
    variant: BadgeVariant.DEFAULT,
    size: Size.MD,
  },
};

export const ExtraLarge: Story = {
  args: {
    children: '3',
    variant: BadgeVariant.DEFAULT,
    size: Size.LG,
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

// Демонстрация всех вариантов
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
  name: 'Все размеры',
  render: () => {
    const textSizes = [Size.XS, Size.SM, Size.MD, Size.LG, Size.XL] as const;

    return (
      <BadgeStoriesSizesRoot aria-label="Размеры Badge: точка и перечисление Size">
        <BadgeStoriesSizeFigure>
          <BadgeStoriesSizeCaption>
            <BadgeStoriesSizeTitle>Точка</BadgeStoriesSizeTitle>
            <BadgeStoriesSizeProp>isDot</BadgeStoriesSizeProp>
          </BadgeStoriesSizeCaption>
          <Badge variant={BadgeVariant.DEFAULT} isDot />
        </BadgeStoriesSizeFigure>

        {textSizes.map((badgeSize) => (
          <BadgeStoriesSizeFigure key={badgeSize}>
            <BadgeStoriesSizeCaption>
              <BadgeStoriesSizeTitle>{badgeSize}</BadgeStoriesSizeTitle>
              <BadgeStoriesSizeProp>{`size={Size.${badgeSize}}`}</BadgeStoriesSizeProp>
            </BadgeStoriesSizeCaption>
            <Badge variant={BadgeVariant.DEFAULT} size={badgeSize}>
              3
            </Badge>
          </BadgeStoriesSizeFigure>
        ))}
      </BadgeStoriesSizesRoot>
    );
  },
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

