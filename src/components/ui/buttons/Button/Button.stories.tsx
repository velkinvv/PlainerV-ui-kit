import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Icon } from '../../Icon/Icon';
import { Size, IconSize } from '../../../../types/sizes';
import { ButtonVariant } from '../../../../types/ui';
import { DOC_BUTTON } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta<typeof Button> = {
  title: 'UI Kit/Inputs/Button',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_BUTTON,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [...Object.values(ButtonVariant)],
      description:
        'Вариант стилизации; значения: `primary`, `secondary`, `outline`, `ghost`, `danger`, `success`, `warning`, `line`, `skeleton`',
      table: {
        type: { summary: 'ButtonVariant (см. список в control)' },
      },
    },
    size: {
      control: { type: 'select' },
      options: [...Object.values(Size)],
      description: 'Размер кнопки; значения: `XS`, `SM`, `MD`, `LG`, `XL`',
      table: {
        type: { summary: 'Size: XS, SM, MD, LG, XL' },
      },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Состояние загрузки',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Отключенное состояние',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Полная ширина',
    },
    rounded: {
      control: { type: 'boolean' },
      description: 'Скругленные углы',
    },
    iconStart: {
      control: false,
      description: 'Иконка в начале кнопки',
    },
    iconEnd: {
      control: false,
      description: 'Иконка в конце кнопки',
    },
    showTooltip: {
      control: { type: 'boolean' },
      description: 'Показывать тултип',
    },
    tooltipText: {
      control: { type: 'text' },
      description: 'Текст тултипа',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Все истории в алфавитном порядке
export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button size={Size.XS}>Extra Small</Button>
        <Button size={Size.SM}>Small</Button>
        <Button size={Size.MD}>Medium</Button>
        <Button size={Size.LG}>Large</Button>
        <Button size={Size.XL}>Extra Large</Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button variant={ButtonVariant.PRIMARY}>Primary</Button>
        <Button variant={ButtonVariant.SECONDARY}>Secondary</Button>
        <Button variant={ButtonVariant.OUTLINE}>Outline</Button>
        <Button variant={ButtonVariant.GHOST}>Ghost</Button>
        <Button variant={ButtonVariant.DANGER}>Danger</Button>
        <Button variant={ButtonVariant.SUCCESS}>Success</Button>
        <Button variant={ButtonVariant.WARNING}>Warning</Button>
        <Button variant={ButtonVariant.LINE}>Line</Button>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button size={Size.XS}>Extra Small</Button>
        <Button size={Size.SM}>Small</Button>
        <Button size={Size.MD}>Medium</Button>
        <Button size={Size.LG}>Large</Button>
        <Button size={Size.XL}>Extra Large</Button>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button iconStart={<Icon name="IconExHeart" size={IconSize.MD} />}>With Icon</Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: ButtonVariant.DANGER,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const ExtraLarge: Story = {
  args: {
    children: 'Extra Large Button',
    size: Size.XL,
  },
};

export const ExtraSmall: Story = {
  args: {
    children: 'Extra Small Button',
    size: Size.XS,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: ButtonVariant.GHOST,
  },
};

export const IconOnly: Story = {
  args: {
    iconStart: <Icon name="IconExSettings" size={IconSize.MD} />,
    rounded: true,
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: Size.LG,
  },
};

export const Line: Story = {
  args: {
    children: 'Line Button',
    variant: ButtonVariant.LINE,
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    loading: true,
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: Size.MD,
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: ButtonVariant.OUTLINE,
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: ButtonVariant.PRIMARY,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: ButtonVariant.SECONDARY,
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: Size.SM,
  },
};

export const Success: Story = {
  args: {
    children: 'Success Button',
    variant: ButtonVariant.SUCCESS,
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning Button',
    variant: ButtonVariant.WARNING,
  },
};

export const Skeleton: Story = {
  args: {
    children: 'Skeleton Button',
    variant: ButtonVariant.SKELETON,
  },
  parameters: {
    docs: {
      description: {
        story: 'Skeleton кнопка с анимированным эффектом загрузки.',
      },
    },
  },
};

/**
 * Отладочная skeleton кнопка
 */
export const SkeletonDebug: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4>Обычная кнопка для сравнения:</h4>
        <Button variant={ButtonVariant.PRIMARY}>Primary Button</Button>
      </div>

      <div>
        <h4>Skeleton кнопка:</h4>
        <Button variant={ButtonVariant.SKELETON}>Skeleton Button</Button>
      </div>

      <div>
        <h4>Skeleton кнопка с inline стилями (для отладки):</h4>
        <button
          style={{
            background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
            backgroundSize: '200% 100%',
            backgroundPosition: '-200% 0',
            color: '#9ca3af80', // Полупрозрачный серый цвет
            border: '2px solid #d1d5db',
            padding: '10px 18px',
            borderRadius: '35px',
            fontSize: '14px',
            animation: 'skeleton-loading 1.5s infinite ease-in-out',
          }}
        >
          Inline Skeleton
        </button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Отладочная версия skeleton кнопки для проверки работы анимации.',
      },
    },
  },
};

export const WithStartIcon: Story = {
  args: {
    children: 'Button with Start Icon',
    iconStart: <Icon name="IconExHome" size={IconSize.MD} />,
  },
};

export const WithEndIcon: Story = {
  args: {
    children: 'Button with End Icon',
    iconEnd: <Icon name="IconPlainerArrowRight" size={IconSize.MD} />,
  },
};

export const WithBothIcons: Story = {
  args: {
    children: 'Button with Both Icons',
    iconStart: <Icon name="IconExHome" size={IconSize.MD} />,
    iconEnd: <Icon name="IconPlainerArrowRight" size={IconSize.MD} />,
  },
};

/**
 * Кнопка с тултипом
 */
export const WithTooltip: Story = {
  args: {
    children: 'Кнопка с тултипом',
    showTooltip: true,
    tooltipText: 'Это подсказка для кнопки',
  },
};

/**
 * Кнопка с иконкой и тултипом
 */
export const WithIconAndTooltip: Story = {
  args: {
    children: 'Сохранить',
    iconStart: <Icon name="IconExCheck" size={IconSize.MD} />,
    showTooltip: true,
    tooltipText: 'Сохранить изменения',
  },
};

/**
 * Отключенная кнопка с тултипом
 */
export const DisabledWithTooltip: Story = {
  args: {
    children: 'Отключенная кнопка',
    disabled: true,
    showTooltip: true,
    tooltipText: 'Кнопка отключена',
  },
};

/**
 * Демонстрация различных тултипов
 */
export const TooltipVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button
        variant={ButtonVariant.PRIMARY}
        showTooltip={true}
        tooltipText="Основная кнопка с подсказкой"
      >
        Primary
      </Button>

      <Button
        variant={ButtonVariant.SECONDARY}
        showTooltip={true}
        tooltipText="Вторичная кнопка с подсказкой"
      >
        Secondary
      </Button>

      <Button
        variant={ButtonVariant.OUTLINE}
        showTooltip={true}
        tooltipText="Кнопка с обводкой и подсказкой"
      >
        Outline
      </Button>

      <Button
        variant={ButtonVariant.GHOST}
        showTooltip={true}
        tooltipText="Прозрачная кнопка с подсказкой"
      >
        Ghost
      </Button>

      <Button
        variant={ButtonVariant.DANGER}
        showTooltip={true}
        tooltipText="Опасная кнопка с подсказкой"
      >
        Danger
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация различных вариантов кнопок с тултипами',
      },
    },
  },
};

/**
 * Демонстрация skeleton кнопок
 */
export const SkeletonVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant={ButtonVariant.SKELETON} size={Size.SM}>
        Small Skeleton
      </Button>

      <Button variant={ButtonVariant.SKELETON} size={Size.MD}>
        Medium Skeleton
      </Button>

      <Button variant={ButtonVariant.SKELETON} size={Size.LG}>
        Large Skeleton
      </Button>

      <Button variant={ButtonVariant.SKELETON} fullWidth={true}>
        Full Width Skeleton
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация skeleton кнопок различных размеров. Skeleton кнопки используются для отображения состояния загрузки контента.',
      },
    },
  },
};

/**
 * Skeleton кнопка с иконкой
 */
export const SkeletonWithIcon: Story = {
  args: {
    children: 'Loading...',
    variant: ButtonVariant.SKELETON,
    iconStart: <Icon name="IconExSettings" size={IconSize.MD} />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Skeleton кнопка с иконкой для отображения состояния загрузки.',
      },
    },
  },
};

/**
 * Демонстрация всех вариантов иконок
 */
export const IconVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4>Только иконка в начале:</h4>
        <Button iconStart={<Icon name="IconExHome" size={IconSize.MD} />}>Home</Button>
      </div>

      <div>
        <h4>Только иконка в конце:</h4>
        <Button iconEnd={<Icon name="IconPlainerArrowRight" size={IconSize.MD} />}>Next</Button>
      </div>

      <div>
        <h4>Обе иконки:</h4>
        <Button
          iconStart={<Icon name="IconExHome" size={IconSize.MD} />}
          iconEnd={<Icon name="IconPlainerArrowRight" size={IconSize.MD} />}
        >
          Navigate
        </Button>
      </div>

      <div>
        <h4>Только иконки без текста:</h4>
        <Button
          iconStart={<Icon name="IconExSettings" size={IconSize.MD} />}
          iconEnd={<Icon name="IconExInfoSquare" size={IconSize.MD} />}
        />
      </div>

      <div>
        <h4>С тултипом:</h4>
        <Button
          iconStart={<Icon name="IconExCheck" size={IconSize.MD} />}
          iconEnd={<Icon name="IconPlainerArrowRight" size={IconSize.MD} />}
          showTooltip={true}
          tooltipText="Подтвердить и продолжить"
        >
          Confirm & Continue
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация всех возможностей работы с иконками в кнопках.',
      },
    },
  },
};

