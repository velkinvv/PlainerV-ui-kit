import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { SkeletonVariant, SkeletonGroupDirection } from '../../../types/ui';
import { DOC_SKELETON } from '@/components/ui/storyDocs/uiKitDocs';
import { skeletonStoriesStyles } from './Skeleton.stories.styles';

const meta: Meta<typeof Skeleton> = {
  title: 'UI Kit/Data Display/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_SKELETON,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={skeletonStoriesStyles.decoratorPadding24}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    width: {
      control: 'text',
      description: 'Ширина скелетона (число или CSS-значение)',
      table: {
        type: { summary: 'число (px) либо CSS-строка (например 100%, 12rem)' },
      },
    },
    height: {
      control: 'text',
      description: 'Высота скелетона',
      table: {
        type: { summary: 'число (px) либо CSS-строка' },
      },
    },
    shape: {
      control: { type: 'inline-radio' },
      options: ['rect', 'circle'],
      description: 'Форма скелетона',
      table: {
        type: { summary: 'rect или circle' },
      },
    },
    animated: {
      control: 'boolean',
      description: 'Включить анимацию',
      table: { type: { summary: 'boolean' } },
    },
    animationSpeed: {
      control: { type: 'number', min: 0.1, max: 5, step: 0.1 },
      description: 'Скорость анимации в секундах',
      table: { type: { summary: 'number (секунды)' } },
    },
    count: {
      control: 'number',
      description: 'Количество повторений',
      table: { type: { summary: 'number (целое ≥ 1)' } },
    },
    inline: {
      control: 'boolean',
      description: 'Отображать как inline-block',
      table: { type: { summary: 'boolean' } },
    },
    gap: {
      control: 'number',
      description: 'Отступ между элементами при count > 1',
      table: { type: { summary: 'number (px)' } },
    },
    direction: {
      control: { type: 'select' },
      options: Object.values(SkeletonGroupDirection),
      description: 'Направление группы элементов',
      table: {
        type: { summary: 'row или column (SkeletonGroupDirection)' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(SkeletonVariant),
      description: 'Предустановленный вариант скелетона',
      table: {
        type: { summary: 'text, avatar, button или custom (SkeletonVariant)' },
      },
    },
    borderRadius: {
      control: 'text',
      description: 'Кастомное значение border-radius',
      table: { type: { summary: 'CSS-строка (например 8px)' } },
    },
    ariaLabel: {
      control: 'text',
      description: 'Текст для screen readers',
      table: { type: { summary: 'string' } },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    width: '200px',
    height: 16,
  },
};

export const Circle: Story = {
  args: {
    width: 48,
    height: 48,
    shape: 'circle',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={skeletonStoriesStyles.panelColumn24Width320}>
      <div>
        <h3 style={skeletonStoriesStyles.headingMarginBottom8}>Text variant</h3>
        <Skeleton variant={SkeletonVariant.TEXT} count={3} />
      </div>
      <div>
        <h3 style={skeletonStoriesStyles.headingMarginBottom8}>Avatar variant</h3>
        <Skeleton variant={SkeletonVariant.AVATAR} />
      </div>
      <div>
        <h3 style={skeletonStoriesStyles.headingMarginBottom8}>Button variant</h3>
        <Skeleton variant={SkeletonVariant.BUTTON} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Предустановленные варианты скелетона для разных типов контента.',
      },
    },
  },
};

export const AnimatedList: Story = {
  render: () => (
    <div style={skeletonStoriesStyles.panelColumn16Width320}>
      {Array.from({ length: 3 }).map((_unusedItem, itemIndex) => (
        <div key={itemIndex} style={skeletonStoriesStyles.rowAlignCenterGap12}>
          <Skeleton width={40} height={40} shape="circle" />
          <Skeleton count={2} height={12} width="80%" />
        </div>
      ))}
    </div>
  ),
};

export const Static: Story = {
  args: {
    width: '100%',
    height: 12,
    animated: false,
    count: 3,
  },
};

export const CustomAnimationSpeed: Story = {
  render: () => (
    <div style={skeletonStoriesStyles.panelColumn16Width320}>
      <div>
        <h3 style={skeletonStoriesStyles.headingMarginBottom8}>Медленная анимация (3s)</h3>
        <Skeleton width="100%" height={16} animationSpeed={3} />
      </div>
      <div>
        <h3 style={skeletonStoriesStyles.headingMarginBottom8}>Стандартная анимация (1.5s)</h3>
        <Skeleton width="100%" height={16} animationSpeed={1.5} />
      </div>
      <div>
        <h3 style={skeletonStoriesStyles.headingMarginBottom8}>Быстрая анимация (0.5s)</h3>
        <Skeleton width="100%" height={16} animationSpeed={0.5} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Примеры разных скоростей анимации скелетона.',
      },
    },
  },
};

export const RowDirection: Story = {
  args: {
    width: 80,
    height: 80,
    shape: 'circle',
    count: 4,
    direction: SkeletonGroupDirection.ROW,
    gap: 12,
  },
  parameters: {
    docs: {
      description: {
        story: 'Группа скелетонов в горизонтальном направлении (row).',
      },
    },
  },
};

export const ColumnDirection: Story = {
  args: {
    width: '100%',
    height: 16,
    count: 4,
    direction: SkeletonGroupDirection.COLUMN,
    gap: 12,
  },
  parameters: {
    docs: {
      description: {
        story: 'Группа скелетонов в вертикальном направлении (column, по умолчанию).',
      },
    },
  },
};

export const CustomBorderRadius: Story = {
  render: () => (
    <div style={skeletonStoriesStyles.panelColumn16Width320}>
      <div>
        <h3 style={skeletonStoriesStyles.headingMarginBottom8}>Стандартный (12px)</h3>
        <Skeleton width="100%" height={40} />
      </div>
      <div>
        <h3 style={skeletonStoriesStyles.headingMarginBottom8}>Кастомный (4px)</h3>
        <Skeleton width="100%" height={40} borderRadius={4} />
      </div>
      <div>
        <h3 style={skeletonStoriesStyles.headingMarginBottom8}>Кастомный (24px)</h3>
        <Skeleton width="100%" height={40} borderRadius={24} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Примеры кастомных значений border-radius для скелетона.',
      },
    },
  },
};

export const Accessibility: Story = {
  args: {
    width: '100%',
    height: 16,
    count: 3,
    ariaLabel: 'Загрузка списка пользователей',
  },
  parameters: {
    docs: {
      description: {
        story: 'Скелетон с кастомным aria-label для улучшения доступности для screen readers.',
      },
    },
  },
};

export const ComplexLayout: Story = {
  render: () => (
    <div style={skeletonStoriesStyles.complexRoot}>
      <div style={skeletonStoriesStyles.rowAlignCenterGap16}>
        <Skeleton variant={SkeletonVariant.AVATAR} />
        <div style={skeletonStoriesStyles.flexibleColumnGap8}>
          <Skeleton variant={SkeletonVariant.TEXT} width="60%" />
          <Skeleton variant={SkeletonVariant.TEXT} width="80%" />
        </div>
      </div>
      <div>
        <Skeleton variant={SkeletonVariant.TEXT} count={3} gap={8} />
      </div>
      <div style={skeletonStoriesStyles.rowEndGap12}>
        <Skeleton variant={SkeletonVariant.BUTTON} width={100} />
        <Skeleton variant={SkeletonVariant.BUTTON} width={100} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Пример сложного layout с использованием разных вариантов скелетона.',
      },
    },
  },
};
