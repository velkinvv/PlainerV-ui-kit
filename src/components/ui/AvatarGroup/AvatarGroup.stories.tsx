import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AvatarGroup } from './AvatarGroup';
import { AvatarGroupVariant, AvatarStatus } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { DOC_AVATAR_GROUP } from '@/components/ui/storyDocs/uiKitDocs';
import { avatarGroupStoriesStyles } from './AvatarGroup.stories.styles';

const meta: Meta<typeof AvatarGroup> = {
  title: 'UI Kit/Data Display/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_AVATAR_GROUP,
      },
    },
  },
  argTypes: {
    avatars: {
      description: 'Список аватаров (пропсы Avatar без обёртки)',
      control: false,
      table: {
        type: { summary: 'AvatarProps[]' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: [AvatarGroupVariant.STACK, AvatarGroupVariant.ROW, AvatarGroupVariant.GRID],
      description: 'Вариант отображения группы аватаров',
      table: {
        type: { summary: 'stack (наложение), row (в ряд) или grid (сетка)' },
      },
    },
    maxVisible: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Максимальное количество видимых аватаров',
      table: { type: { summary: 'number (1–10)' } },
    },
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD, Size.LG],
      description: 'Размер аватаров',
      table: {
        type: { summary: 'Size (в сторис обычно SM, MD или LG)' },
      },
    },
    spacing: {
      control: { type: 'number', min: 0, max: 20 },
      description: 'Отступ между аватарами (для row варианта)',
      table: { type: { summary: 'number (px)' } },
    },
    showTooltip: {
      control: { type: 'boolean' },
      description: 'Показывать ли тултипы для аватаров',
      table: { type: { summary: 'boolean' } },
    },
    onCounterClick: {
      action: 'onCounterClick',
      description: 'Обработчик клика по счетчику дополнительных аватаров',
      table: {
        type: {
          summary: '(remainingAvatars: AvatarProps[]) => void',
        },
      },
    },
    onAvatarSelect: {
      action: 'onAvatarSelect',
      description: 'Колбек на выбор аватара (по клику или нажатию клавиши)',
      table: {
        type: { summary: '(avatarId: string) => void' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

// Базовые данные для аватаров
const sampleAvatars = [
  {
    id: 'user-1',
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    alt: 'John Doe',
    userName: 'John Doe',
    status: AvatarStatus.ONLINE,
  },
  {
    id: 'user-2',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    alt: 'Jane Smith',
    userName: 'Jane Smith',
    status: AvatarStatus.ONLINE,
  },
  {
    id: 'user-3',
    src: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    alt: 'Alice Johnson',
    userName: 'Alice Johnson',
    status: AvatarStatus.OFFLINE,
  },
  {
    id: 'user-4',
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    alt: 'Bob Wilson',
    userName: 'Bob Wilson',
    status: AvatarStatus.ONLINE,
  },
  {
    id: 'user-5',
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    alt: 'Carol Brown',
    userName: 'Carol Brown',
    status: AvatarStatus.WARNING,
  },
  {
    id: 'user-6',
    src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    alt: 'David Lee',
    userName: 'David Lee',
    status: AvatarStatus.DANGER,
  },
  {
    id: 'user-7',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    alt: 'Emma Davis',
    userName: 'Emma Davis',
    status: AvatarStatus.ONLINE,
  },
  {
    id: 'user-8',
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
    alt: 'Frank Miller',
    userName: 'Frank Miller',
    status: AvatarStatus.OFFLINE,
  },
];

// Вариант с наложением (по умолчанию)
export const Stack: Story = {
  args: {
    avatars: sampleAvatars,
    variant: AvatarGroupVariant.STACK,
    maxVisible: 3,
    size: Size.MD,
    showTooltip: true,
  },
};

// Вариант в ряд
export const Row: Story = {
  args: {
    avatars: sampleAvatars,
    variant: AvatarGroupVariant.ROW,
    maxVisible: 4,
    size: Size.MD,
    spacing: 8,
    showTooltip: true,
  },
};

// Маленький размер
export const SmallSize: Story = {
  args: {
    avatars: sampleAvatars,
    variant: AvatarGroupVariant.STACK,
    maxVisible: 4,
    size: Size.SM,
    showTooltip: true,
  },
};

// Большой размер
export const LargeSize: Story = {
  args: {
    avatars: sampleAvatars,
    variant: AvatarGroupVariant.STACK,
    maxVisible: 3,
    size: Size.LG,
    showTooltip: true,
  },
};

// Много аватаров с ограничением
export const ManyAvatars: Story = {
  args: {
    avatars: sampleAvatars,
    variant: AvatarGroupVariant.STACK,
    maxVisible: 2,
    size: Size.MD,
    showTooltip: true,
  },
};

// Row вариант с большим отступом
export const RowWithSpacing: Story = {
  args: {
    avatars: sampleAvatars,
    variant: AvatarGroupVariant.ROW,
    maxVisible: 5,
    size: Size.MD,
    spacing: 16,
    showTooltip: true,
  },
};

// Аватары с сообщениями (базовый пример)
export const WithMessagesBasic: Story = {
  args: {
    avatars: [
      {
        ...sampleAvatars[0],
        messageCount: 3,
      },
      {
        ...sampleAvatars[1],
        messageCount: 12,
      },
      {
        ...sampleAvatars[2],
        messageCount: 99,
      },
      sampleAvatars[3],
      sampleAvatars[4],
    ],
    variant: AvatarGroupVariant.STACK,
    maxVisible: 3,
    size: Size.MD,
    showTooltip: true,
  },
};

// Аватары без изображений (только инициалы)
export const WithoutImages: Story = {
  args: {
    avatars: [
      {
        userName: 'Александр Иванов',
        status: AvatarStatus.ONLINE,
      },
      {
        userName: 'Мария Петрова',
        status: AvatarStatus.ONLINE,
      },
      {
        userName: 'Дмитрий Сидоров',
        status: AvatarStatus.OFFLINE,
      },
      {
        userName: 'Елена Козлова',
        status: AvatarStatus.WARNING,
      },
      {
        userName: 'Сергей Морозов',
        status: AvatarStatus.DANGER,
      },
    ],
    variant: AvatarGroupVariant.ROW,
    maxVisible: 4,
    size: Size.MD,
    spacing: 12,
    showTooltip: true,
  },
};

// Интерактивные аватары
export const Interactive: Story = {
  args: {
    avatars: sampleAvatars.map((avatar) => ({
      ...avatar,
      onClick: fn(),
    })),
    variant: AvatarGroupVariant.STACK,
    maxVisible: 3,
    size: Size.MD,
    showTooltip: true,
  },
};

// Без тултипов
export const WithoutTooltips: Story = {
  args: {
    avatars: sampleAvatars,
    variant: AvatarGroupVariant.ROW,
    maxVisible: 4,
    size: Size.MD,
    spacing: 8,
    showTooltip: false,
  },
};

// Grid вариант - маленький размер
export const GridSmall: Story = {
  args: {
    avatars: sampleAvatars,
    variant: AvatarGroupVariant.GRID,
    size: Size.SM,
    showTooltip: true,
  },
};

// Grid вариант - средний размер
export const GridMedium: Story = {
  args: {
    avatars: sampleAvatars,
    variant: AvatarGroupVariant.GRID,
    size: Size.MD,
    showTooltip: true,
  },
};

// Grid вариант - большой размер
export const GridLarge: Story = {
  args: {
    avatars: sampleAvatars,
    variant: AvatarGroupVariant.GRID,
    size: Size.LG,
    showTooltip: true,
  },
};

// ===== COMPREHENSIVE ДЕМОНСТРАЦИЯ ВСЕХ ВАРИАНТОВ =====

// Все варианты - маленький размер
export const AllVariantsSmall: Story = {
  render: () => (
    <div style={avatarGroupStoriesStyles.columnGap24}>
      <div>
        <h3>Stack (наложение) - SM</h3>
        <AvatarGroup
          avatars={sampleAvatars}
          variant={AvatarGroupVariant.STACK}
          size={Size.SM}
          maxVisible={4}
          showTooltip={true}
        />
      </div>
      <div>
        <h3>Row (в ряд) - SM</h3>
        <AvatarGroup
          avatars={sampleAvatars}
          variant={AvatarGroupVariant.ROW}
          size={Size.SM}
          maxVisible={5}
          spacing={8}
          showTooltip={true}
        />
      </div>
      <div>
        <h3>Grid (сетка) - SM</h3>
        <AvatarGroup
          avatars={sampleAvatars}
          variant={AvatarGroupVariant.GRID}
          size={Size.SM}
          showTooltip={true}
        />
      </div>
    </div>
  ),
};

// Все варианты - средний размер
export const AllVariantsMedium: Story = {
  render: () => (
    <div style={avatarGroupStoriesStyles.columnGap24}>
      <div>
        <h3>Stack (наложение) - MD</h3>
        <AvatarGroup
          avatars={sampleAvatars}
          variant={AvatarGroupVariant.STACK}
          size={Size.MD}
          maxVisible={4}
          showTooltip={true}
        />
      </div>
      <div>
        <h3>Row (в ряд) - MD</h3>
        <AvatarGroup
          avatars={sampleAvatars}
          variant={AvatarGroupVariant.ROW}
          size={Size.MD}
          maxVisible={5}
          spacing={12}
          showTooltip={true}
        />
      </div>
      <div>
        <h3>Grid (сетка) - MD</h3>
        <AvatarGroup
          avatars={sampleAvatars}
          variant={AvatarGroupVariant.GRID}
          size={Size.MD}
          showTooltip={true}
        />
      </div>
    </div>
  ),
};

// Все варианты - большой размер
export const AllVariantsLarge: Story = {
  render: () => (
    <div style={avatarGroupStoriesStyles.columnGap24}>
      <div>
        <h3>Stack (наложение) - LG</h3>
        <AvatarGroup
          avatars={sampleAvatars}
          variant={AvatarGroupVariant.STACK}
          size={Size.LG}
          maxVisible={3}
          showTooltip={true}
        />
      </div>
      <div>
        <h3>Row (в ряд) - LG</h3>
        <AvatarGroup
          avatars={sampleAvatars}
          variant={AvatarGroupVariant.ROW}
          size={Size.LG}
          maxVisible={4}
          spacing={16}
          showTooltip={true}
        />
      </div>
      <div>
        <h3>Grid (сетка) - LG</h3>
        <AvatarGroup
          avatars={sampleAvatars}
          variant={AvatarGroupVariant.GRID}
          size={Size.LG}
          showTooltip={true}
        />
      </div>
    </div>
  ),
};

// Сравнение всех размеров для каждого варианта
export const SizeComparison: Story = {
  render: () => (
    <div style={avatarGroupStoriesStyles.columnGap32}>
      <div>
        <h2>Stack (наложение)</h2>
        <div style={avatarGroupStoriesStyles.rowCenterGap24}>
          <div>
            <h4>SM</h4>
            <AvatarGroup
              avatars={sampleAvatars}
              variant={AvatarGroupVariant.STACK}
              size={Size.SM}
              maxVisible={4}
              showTooltip={true}
            />
          </div>
          <div>
            <h4>MD</h4>
            <AvatarGroup
              avatars={sampleAvatars}
              variant={AvatarGroupVariant.STACK}
              size={Size.MD}
              maxVisible={4}
              showTooltip={true}
            />
          </div>
          <div>
            <h4>LG</h4>
            <AvatarGroup
              avatars={sampleAvatars}
              variant={AvatarGroupVariant.STACK}
              size={Size.LG}
              maxVisible={4}
              showTooltip={true}
            />
          </div>
        </div>
      </div>

      <div>
        <h2>Row (в ряд)</h2>
        <div style={avatarGroupStoriesStyles.rowCenterGap24}>
          <div>
            <h4>SM</h4>
            <AvatarGroup
              avatars={sampleAvatars}
              variant={AvatarGroupVariant.ROW}
              size={Size.SM}
              maxVisible={5}
              spacing={8}
              showTooltip={true}
            />
          </div>
          <div>
            <h4>MD</h4>
            <AvatarGroup
              avatars={sampleAvatars}
              variant={AvatarGroupVariant.ROW}
              size={Size.MD}
              maxVisible={5}
              spacing={12}
              showTooltip={true}
            />
          </div>
          <div>
            <h4>LG</h4>
            <AvatarGroup
              avatars={sampleAvatars}
              variant={AvatarGroupVariant.ROW}
              size={Size.LG}
              maxVisible={4}
              spacing={16}
              showTooltip={true}
            />
          </div>
        </div>
      </div>

      <div>
        <h2>Grid (сетка)</h2>
        <div style={avatarGroupStoriesStyles.rowCenterGap24}>
          <div>
            <h4>SM</h4>
            <AvatarGroup
              avatars={sampleAvatars}
              variant={AvatarGroupVariant.GRID}
              size={Size.SM}
              showTooltip={true}
            />
          </div>
          <div>
            <h4>MD</h4>
            <AvatarGroup
              avatars={sampleAvatars}
              variant={AvatarGroupVariant.GRID}
              size={Size.MD}
              showTooltip={true}
            />
          </div>
          <div>
            <h4>LG</h4>
            <AvatarGroup
              avatars={sampleAvatars}
              variant={AvatarGroupVariant.GRID}
              size={Size.LG}
              showTooltip={true}
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Демонстрация с разными статусами
export const StatusVariations: Story = {
  render: () => (
    <div style={avatarGroupStoriesStyles.columnGap24}>
      <div>
        <h3>Разные статусы - Stack</h3>
        <AvatarGroup
          avatars={[
            { userName: 'Online User', status: AvatarStatus.ONLINE },
            { userName: 'Offline User', status: AvatarStatus.OFFLINE },
            { userName: 'Warning User', status: AvatarStatus.WARNING },
            { userName: 'Danger User', status: AvatarStatus.DANGER },
            { userName: 'Another Online', status: AvatarStatus.ONLINE },
          ]}
          variant={AvatarGroupVariant.STACK}
          size={Size.MD}
          maxVisible={4}
          showTooltip={true}
        />
      </div>
      <div>
        <h3>Разные статусы - Row</h3>
        <AvatarGroup
          avatars={[
            { userName: 'Online User', status: AvatarStatus.ONLINE },
            { userName: 'Offline User', status: AvatarStatus.OFFLINE },
            { userName: 'Warning User', status: AvatarStatus.WARNING },
            { userName: 'Danger User', status: AvatarStatus.DANGER },
            { userName: 'Another Online', status: AvatarStatus.ONLINE },
          ]}
          variant={AvatarGroupVariant.ROW}
          size={Size.MD}
          maxVisible={5}
          spacing={12}
          showTooltip={true}
        />
      </div>
    </div>
  ),
};

// Демонстрация с сообщениями
export const WithMessages: Story = {
  render: () => (
    <div style={avatarGroupStoriesStyles.columnGap24}>
      <div>
        <h3>С сообщениями - Stack</h3>
        <AvatarGroup
          avatars={[
            { userName: 'John Doe', status: AvatarStatus.ONLINE, messageCount: 3 },
            { userName: 'Jane Smith', status: AvatarStatus.ONLINE, messageCount: 12 },
            { userName: 'Bob Wilson', status: AvatarStatus.OFFLINE, messageCount: 99 },
            { userName: 'Alice Johnson', status: AvatarStatus.WARNING, messageCount: 1 },
            { userName: 'Carol Brown', status: AvatarStatus.DANGER },
          ]}
          variant={AvatarGroupVariant.STACK}
          size={Size.MD}
          maxVisible={4}
          showTooltip={true}
        />
      </div>
      <div>
        <h3>С сообщениями - Row</h3>
        <AvatarGroup
          avatars={[
            { userName: 'John Doe', status: AvatarStatus.ONLINE, messageCount: 3 },
            { userName: 'Jane Smith', status: AvatarStatus.ONLINE, messageCount: 12 },
            { userName: 'Bob Wilson', status: AvatarStatus.OFFLINE, messageCount: 99 },
            { userName: 'Alice Johnson', status: AvatarStatus.WARNING, messageCount: 1 },
            { userName: 'Carol Brown', status: AvatarStatus.DANGER },
          ]}
          variant={AvatarGroupVariant.ROW}
          size={Size.MD}
          maxVisible={5}
          spacing={12}
          showTooltip={true}
        />
      </div>
    </div>
  ),
};

