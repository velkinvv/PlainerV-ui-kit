import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { Icon } from '../../Icon/Icon';
import React from 'react';
import { IconSize, Size } from '../../../../types/sizes';
import { ButtonVariant } from '../../../../types/ui';

const meta: Meta<typeof IconButton> = {
  title: 'UI Kit/Inputs/IconButton',
  component: IconButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Круглая кнопка с иконками, дублирующая весь функционал Button. Поддерживает все варианты, размеры и состояния.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [...Object.values(ButtonVariant)],
      description:
        'Вариант стилизации (как у `Button`); значения: `primary`, `secondary`, `outline`, `ghost`, `danger`, `success`, `warning`, `line`, `skeleton`',
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
    icon: {
      control: false,
      description: 'Иконка кнопки (обязательная)',
      table: { type: { summary: 'ReactNode' } },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Состояние загрузки',
      table: { type: { summary: 'boolean' } },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Отключенное состояние',
      table: { type: { summary: 'boolean' } },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Растянуть на всю ширину',
      table: { type: { summary: 'boolean' } },
    },
    rounded: {
      control: { type: 'boolean' },
      description: 'Скругленные углы (по умолчанию true - круглая)',
      table: { type: { summary: 'boolean' } },
    },
    showTooltip: {
      control: { type: 'boolean' },
      description: 'Показывать тултип',
      table: { type: { summary: 'boolean' } },
    },
    tooltipText: {
      control: { type: 'text' },
      description: 'Текст тултипа',
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Основные варианты
export const Primary: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    icon: <Icon name="IconExHome" size={IconSize.MD} />,
  },
};

export const Secondary: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
    icon: <Icon name="IconExSettings" size={IconSize.MD} />,
  },
};

export const Outline: Story = {
  args: {
    variant: ButtonVariant.OUTLINE,
    icon: <Icon name="IconPlainerArrowRight" size={IconSize.MD} />,
  },
};

export const Ghost: Story = {
  args: {
    variant: ButtonVariant.GHOST,
    icon: <Icon name="IconExHeart" size={IconSize.MD} />,
  },
};

export const Danger: Story = {
  args: {
    variant: ButtonVariant.DANGER,
    icon: <Icon name="IconExTrash" size={IconSize.MD} />,
  },
};

export const Success: Story = {
  args: {
    variant: ButtonVariant.SUCCESS,
    icon: <Icon name="IconExCheck" size={IconSize.MD} />,
  },
};

export const Warning: Story = {
  args: {
    variant: ButtonVariant.WARNING,
    icon: <Icon name="IconExInfoSquare" size={IconSize.MD} />,
  },
};

export const Skeleton: Story = {
  args: {
    variant: ButtonVariant.SKELETON,
    icon: <Icon name="IconExSettings" size={IconSize.MD} />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Skeleton кнопка с анимированным эффектом загрузки.',
      },
    },
  },
};

export const SkeletonDebug: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4>Обычная IconButton для сравнения:</h4>
        <IconButton
          variant={ButtonVariant.PRIMARY}
          icon={<Icon name="IconExSettings" size={IconSize.MD} />}
        />
      </div>

      <div>
        <h4>Skeleton IconButton:</h4>
        <IconButton
          variant={ButtonVariant.SKELETON}
          icon={<Icon name="IconExSettings" size={IconSize.MD} />}
        />
      </div>

      <div>
        <h4>Skeleton IconButton с inline стилями (для отладки):</h4>
        <button
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
            backgroundSize: '200% 100%',
            backgroundPosition: '-200% 0',
            color: '#9ca3af80',
            border: '2px solid #d1d5db',
            animation: 'skeleton-loading 1.5s infinite ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ filter: 'blur(1px)', opacity: 0.7 }}>
            <Icon name="IconExSettings" size={IconSize.MD} />
          </div>
        </button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Отладочная версия skeleton IconButton для проверки работы анимации.',
      },
    },
  },
};

// Размеры
export const Small: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    size: Size.SM,
    icon: <Icon name="IconExHome" size={IconSize.SM} />,
  },
};

export const Medium: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    size: Size.MD,
    icon: <Icon name="IconExHome" size={IconSize.MD} />,
  },
};

export const Large: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    size: Size.LG,
    icon: <Icon name="IconExHome" size={IconSize.LG} />,
  },
};

// Состояния
export const Loading: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    icon: <Icon name="IconExHome" size={IconSize.MD} />,
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    icon: <Icon name="IconExHome" size={IconSize.MD} />,
    disabled: true,
  },
};

// С тултипом
export const WithTooltip: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    icon: <Icon name="IconExInfoSquare" size={IconSize.MD} />,
    showTooltip: true,
    tooltipText: 'Информация о кнопке',
  },
};

// Квадратная форма
export const Square: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    icon: <Icon name="IconExSettings" size={IconSize.MD} />,
    rounded: false,
  },
};

// Комплексные примеры
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4>Все варианты:</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <IconButton
            variant={ButtonVariant.PRIMARY}
            icon={<Icon name="IconExHome" size={IconSize.MD} />}
          />
          <IconButton
            variant={ButtonVariant.SECONDARY}
            icon={<Icon name="IconExSettings" size={IconSize.MD} />}
          />
          <IconButton
            variant={ButtonVariant.OUTLINE}
            icon={<Icon name="IconPlainerArrowRight" size={IconSize.MD} />}
          />
          <IconButton
            variant={ButtonVariant.GHOST}
            icon={<Icon name="IconExHeart" size={IconSize.MD} />}
          />
          <IconButton
            variant={ButtonVariant.DANGER}
            icon={<Icon name="IconExTrash" size={IconSize.MD} />}
          />
          <IconButton
            variant={ButtonVariant.SUCCESS}
            icon={<Icon name="IconExCheck" size={IconSize.MD} />}
          />
          <IconButton
            variant={ButtonVariant.WARNING}
            icon={<Icon name="IconExInfoSquare" size={IconSize.MD} />}
          />
          <IconButton
            variant={ButtonVariant.SKELETON}
            icon={<Icon name="IconExSettings" size={IconSize.MD} />}
          />
        </div>
      </div>

      <div>
        <h4>Размеры:</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <IconButton
            variant={ButtonVariant.PRIMARY}
            size={Size.SM}
            icon={<Icon name="IconExHome" size={IconSize.SM} />}
          />
          <IconButton
            variant={ButtonVariant.PRIMARY}
            size={Size.MD}
            icon={<Icon name="IconExHome" size={IconSize.MD} />}
          />
          <IconButton
            variant={ButtonVariant.PRIMARY}
            size={Size.LG}
            icon={<Icon name="IconExHome" size={IconSize.LG} />}
          />
        </div>
      </div>

      <div>
        <h4>Состояния:</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <IconButton
            variant={ButtonVariant.PRIMARY}
            icon={<Icon name="IconExHome" size={IconSize.MD} />}
            loading
          />
          <IconButton
            variant={ButtonVariant.PRIMARY}
            icon={<Icon name="IconExHome" size={IconSize.MD} />}
            disabled
          />
          <IconButton
            variant={ButtonVariant.PRIMARY}
            icon={<Icon name="IconExInfoSquare" size={IconSize.MD} />}
            showTooltip={true}
            tooltipText="Информация о кнопке"
          />
        </div>
      </div>

      <div>
        <h4>Формы:</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <IconButton
            variant={ButtonVariant.PRIMARY}
            icon={<Icon name="IconExSettings" size={IconSize.MD} />}
            rounded={true}
          />
          <IconButton
            variant={ButtonVariant.PRIMARY}
            icon={<Icon name="IconExSettings" size={IconSize.MD} />}
            rounded={false}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Демонстрация всех возможностей IconButton: варианты, размеры, состояния и формы.',
      },
    },
  },
};

