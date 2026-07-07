import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ActionBar } from './ActionBar';
import { ActionBarSize } from '../../../types/ui';
import { DOC_ACTION_BAR } from '@/components/ui/storyDocs/uiKitDocs';
import { actionBarStoriesStyles } from './ActionBar.stories.styles';
import {
  actionBarDemoActionsFull,
  actionBarDemoActionsShort,
  useActionBarDemoConfig,
  useActionBarLastActionState,
} from './ActionBar.stories.helpers';

const meta: Meta<typeof ActionBar> = {
  title: 'UI Kit/Layout/ActionBar',
  component: ActionBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_ACTION_BAR,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: Object.values(ActionBarSize),
      description: 'Размер кнопок панели: XL (56px), LG (48px), MD (40px), SM (32px)',
      table: {
        type: { summary: 'ActionBarSize' },
        defaultValue: { summary: 'ActionBarSize.XL' },
      },
    },
    items: {
      control: false,
      description: 'Порядок действий: `{ itemId, withDivider? }[]`',
      table: {
        type: { summary: 'ActionBarItemDefinition[]' },
      },
    },
    renderActionBarItem: {
      control: false,
      description: 'Рендер видимой кнопки по `itemId` (обычно ActionBar.ItemWithTooltip)',
      table: {
        type: { summary: '(itemId: string) => ReactNode' },
      },
    },
    renderDropMenuItem: {
      control: false,
      description:
        'Рендер строки overflow-меню; второй аргумент — `{ closeMenu }` для закрытия после действия',
      table: {
        type: {
          summary: '(itemId: string, options?: ActionBarDropMenuRenderOptions) => ReactNode',
        },
      },
    },
    itemIsDisabled: {
      control: false,
      description: 'Проверка disabled для пунктов overflow-меню',
      table: {
        type: { summary: '(itemId: string) => boolean' },
      },
    },
    overflowMenuAriaLabel: {
      control: 'text',
      description: 'Подпись кнопки «ещё» и выпадающего меню',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Дополнительные действия' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'Обязательная подпись для `role="toolbar"`',
      table: { type: { summary: 'string' } },
    },
    className: {
      control: 'text',
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionBar>;

type ActionBarStoryDemoProps = {
  size?: ActionBarSize;
  'aria-label'?: string;
  overflowMenuAriaLabel?: string;
  actionRows?: typeof actionBarDemoActionsFull;
  showLastAction?: boolean;
  shellStyle?: React.CSSProperties;
};

const ActionBarStoryDemo = ({
  size = ActionBarSize.XL,
  'aria-label': ariaLabel = 'Панель действий',
  overflowMenuAriaLabel,
  actionRows = actionBarDemoActionsFull,
  showLastAction = false,
  shellStyle,
}: ActionBarStoryDemoProps) => {
  const { lastActionLabel, handleActionClick } = useActionBarLastActionState();
  const demoConfig = useActionBarDemoConfig(
    actionRows,
    size,
    showLastAction ? handleActionClick : undefined,
  );

  return (
    <div style={actionBarStoriesStyles.section}>
      {showLastAction ? (
        <p style={actionBarStoriesStyles.statusPanel}>
          {lastActionLabel
            ? `Последнее действие: «${lastActionLabel}»`
            : 'Нажмите на иконку или пункт overflow-меню.'}
        </p>
      ) : null}
      <div style={shellStyle}>
        <ActionBar
          {...demoConfig}
          size={size}
          aria-label={ariaLabel}
          overflowMenuAriaLabel={overflowMenuAriaLabel}
        />
      </div>
    </div>
  );
};

/** Playground: размер и подписи через Controls */
export const Playground: Story = {
  render: (storyArgs) => (
    <ActionBarStoryDemo
      size={storyArgs.size}
      aria-label={storyArgs['aria-label']}
      overflowMenuAriaLabel={storyArgs.overflowMenuAriaLabel}
    />
  ),
  args: {
    size: ActionBarSize.XL,
    'aria-label': 'Панель действий',
    overflowMenuAriaLabel: 'Дополнительные действия',
  },
};

/** Базовая панель — все действия видимы при широком контейнере */
export const Default: Story = {
  render: () => (
    <ActionBarStoryDemo size={ActionBarSize.XL} aria-label="Панель действий документа" />
  ),
};

/** Короткий набор: overflow-меню не появляется */
export const FewActions: Story = {
  render: () => (
    <ActionBarStoryDemo
      actionRows={actionBarDemoActionsShort}
      size={ActionBarSize.LG}
      aria-label="Основные действия"
    />
  ),
};

/** Группы действий с разделителями (`withDivider`) */
export const WithGroups: Story = {
  render: () => (
    <div style={actionBarStoriesStyles.page}>
      <p style={actionBarStoriesStyles.hint}>
        Флаг `withDivider: true` добавляет вертикальный разделитель после кнопки — так отделяются
        логические группы (редактирование, обмен, удаление).
      </p>
      <ActionBarStoryDemo size={ActionBarSize.XL} aria-label="Панель с группами действий" />
    </div>
  ),
};

/** Узкий контейнер: overflow-меню сразу видно */
export const NarrowContainer: Story = {
  render: () => (
    <div style={actionBarStoriesStyles.page}>
      <p style={actionBarStoriesStyles.hint}>
        При ширине ~220px часть кнопок автоматически переносится в меню «ещё».
      </p>
      <div style={actionBarStoriesStyles.narrowShell}>
        <ActionBarStoryDemo size={ActionBarSize.XL} aria-label="Узкая панель действий" />
      </div>
    </div>
  ),
};

/** Resizable: потяните правый край рамки */
export const ResponsiveOverflow: Story = {
  render: () => (
    <div style={actionBarStoriesStyles.page}>
      <p style={actionBarStoriesStyles.hint}>
        Потяните за правый край пунктирной рамки — кнопки, не помещающиеся по ширине, уходят в
        overflow-меню в том же порядке, что и на панели.
      </p>
      <div style={actionBarStoriesStyles.resizableShell}>
        <ActionBarStoryDemo size={ActionBarSize.XL} aria-label="Адаптивная панель действий" />
      </div>
    </div>
  ),
};

/** Клики по видимым кнопкам и overflow-пунктам */
export const Interactive: Story = {
  render: () => (
    <ActionBarStoryDemo
      size={ActionBarSize.XL}
      aria-label="Интерактивная панель действий"
      showLastAction
      shellStyle={actionBarStoriesStyles.resizableShell}
    />
  ),
};

/** Компактный размер SM (32px) */
export const CompactSize: Story = {
  render: () => (
    <ActionBarStoryDemo size={ActionBarSize.SM} aria-label="Компактная панель действий" />
  ),
};

/** Все размеры панели в одном экране */
export const AllSizes: Story = {
  render: () => (
    <div style={actionBarStoriesStyles.page}>
      {Object.values(ActionBarSize).map((barSize) => (
        <div key={barSize} style={actionBarStoriesStyles.sizeRow}>
          <p style={actionBarStoriesStyles.sizeLabel}>{barSize}</p>
          <ActionBarStoryDemo
            actionRows={actionBarDemoActionsShort}
            size={barSize}
            aria-label={`Панель действий ${barSize}`}
          />
        </div>
      ))}
    </div>
  ),
};

/** Disabled-пункт в overflow (уведомления) */
export const WithDisabledOverflowItem: Story = {
  render: () => (
    <div style={actionBarStoriesStyles.page}>
      <p style={actionBarStoriesStyles.hint}>
        Элемент «Уведомления» отключён через `itemIsDisabled`; в overflow-меню он недоступен для
        клика.
      </p>
      <div style={actionBarStoriesStyles.narrowShell}>
        <ActionBarStoryDemo size={ActionBarSize.MD} aria-label="Панель с disabled в overflow" />
      </div>
    </div>
  ),
};
