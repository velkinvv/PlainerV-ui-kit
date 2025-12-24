import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { SkeletonVariant, SkeletonGroupDirection } from '../../../types/ui';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  decorators: [
    Story => (
      <ThemeProvider>
        <div style={{ padding: 24 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    width: { control: 'text', description: 'Ширина скелетона (число или CSS-значение)' },
    height: { control: 'text', description: 'Высота скелетона' },
    shape: {
      control: { type: 'inline-radio' },
      options: ['rect', 'circle'],
      description: 'Форма скелетона',
    },
    animated: { control: 'boolean', description: 'Включить анимацию' },
    animationSpeed: {
      control: { type: 'number', min: 0.1, max: 5, step: 0.1 },
      description: 'Скорость анимации в секундах',
    },
    count: { control: 'number', description: 'Количество повторений' },
    inline: { control: 'boolean', description: 'Отображать как inline-block' },
    gap: { control: 'number', description: 'Отступ между элементами при count > 1' },
    direction: {
      control: { type: 'select' },
      options: ['row', 'column'],
      description: 'Направление группы элементов',
    },
    variant: {
      control: { type: 'select' },
      options: ['text', 'avatar', 'button', 'custom'],
      description: 'Предустановленный вариант скелетона',
    },
    borderRadius: {
      control: 'text',
      description: 'Кастомное значение border-radius',
    },
    ariaLabel: {
      control: 'text',
      description: 'Текст для screen readers',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320 }}>
      <div>
        <h3 style={{ marginBottom: 8 }}>Text variant</h3>
        <Skeleton variant={SkeletonVariant.TEXT} count={3} />
      </div>
      <div>
        <h3 style={{ marginBottom: 8 }}>Avatar variant</h3>
        <Skeleton variant={SkeletonVariant.AVATAR} />
      </div>
      <div>
        <h3 style={{ marginBottom: 8 }}>Button variant</h3>
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
    <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <div>
        <h3 style={{ marginBottom: 8 }}>Медленная анимация (3s)</h3>
        <Skeleton width="100%" height={16} animationSpeed={3} />
      </div>
      <div>
        <h3 style={{ marginBottom: 8 }}>Стандартная анимация (1.5s)</h3>
        <Skeleton width="100%" height={16} animationSpeed={1.5} />
      </div>
      <div>
        <h3 style={{ marginBottom: 8 }}>Быстрая анимация (0.5s)</h3>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <div>
        <h3 style={{ marginBottom: 8 }}>Стандартный (12px)</h3>
        <Skeleton width="100%" height={40} />
      </div>
      <div>
        <h3 style={{ marginBottom: 8 }}>Кастомный (4px)</h3>
        <Skeleton width="100%" height={40} borderRadius={4} />
      </div>
      <div>
        <h3 style={{ marginBottom: 8 }}>Кастомный (24px)</h3>
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
        story:
          'Скелетон с кастомным aria-label для улучшения доступности для screen readers.',
      },
    },
  },
};

export const ComplexLayout: Story = {
  render: () => (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Skeleton variant={SkeletonVariant.AVATAR} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Skeleton variant={SkeletonVariant.TEXT} width="60%" />
          <Skeleton variant={SkeletonVariant.TEXT} width="80%" />
        </div>
      </div>
      <div>
        <Skeleton variant={SkeletonVariant.TEXT} count={3} gap={8} />
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
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
