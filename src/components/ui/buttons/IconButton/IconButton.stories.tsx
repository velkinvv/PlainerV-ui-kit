import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { Icon } from '../../Icon/Icon';
import React from 'react';
import { IconSize, Size } from '../../../../types/sizes';
import { ButtonVariant } from '../../../../types/ui';
import { DOC_ICON_BUTTON } from '@/components/ui/storyDocs/uiKitDocs';
import { buttonStoriesStyles } from '@/handlers/buttonStories.styles';

const meta: Meta<typeof IconButton> = {
  title: 'UI Kit/Inputs/IconButton',
  component: IconButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `${DOC_ICON_BUTTON}

По умолчанию радиусы из темы; при **rounded=true** кнопка становится круглой.`,
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
      description: 'Скругленные углы (по умолчанию false — радиус из темы; true — круглая)',
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
    <div style={buttonStoriesStyles.columnGap16}>
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
        <h4>Skeleton IconButton с имитацией «сырого» shimmer (для отладки):</h4>
        <button type="button" style={buttonStoriesStyles.skeletonDebugNativeIconButton}>
          <div style={buttonStoriesStyles.skeletonDebugIconBlurWrapper}>
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
    <div style={buttonStoriesStyles.columnGap24}>
      <div>
        <h4>Все варианты:</h4>
        <div style={buttonStoriesStyles.rowWrapGap12AlignCenter}>
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
        <div style={buttonStoriesStyles.rowWrapGap12AlignCenter}>
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
        <div style={buttonStoriesStyles.rowWrapGap12AlignCenter}>
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
        <div style={buttonStoriesStyles.rowWrapGap12AlignCenter}>
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
