import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ActionBar } from './ActionBar';
import { ActionBarOrientation, ActionBarSize } from '../../../types/ui';
import { DOC_ACTION_BAR } from '@/components/ui/storyDocs/uiKitDocs';
import { actionBarStoriesStyles } from './ActionBar.stories.styles';
import {
  actionBarDemoActionsFull,
  actionBarDemoActionsShort,
  useActionBarDemoConfig,
  useActionBarLastActionState,
} from './ActionBar.stories.helpers';
import { ActionBarDynamicSizeDemo } from './ActionBarDynamicSizeDemo';

const meta: Meta<typeof ActionBar> = {
  title: 'UI Kit/Buttons/ActionBar',
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
    orientation: {
      control: { type: 'select' },
      options: Object.values(ActionBarOrientation),
      description: 'Горизонтальная или вертикальная раскладка панели.',
      table: {
        type: { summary: 'ActionBarOrientation' },
        defaultValue: { summary: 'ActionBarOrientation.HORIZONTAL' },
      },
    },
    dynamicSize: {
      control: 'boolean',
      description:
        'Динамический размер панели: layout spring + AnimatePresence при добавлении/удалении действий.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    dynamicSizeInsetPx: {
      control: { type: 'number', min: 0, max: 64, step: 4 },
      description: 'Отступ для max-width (horizontal) или max-height (vertical), px.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '16' },
      },
    },
    dynamicHeight: {
      control: 'boolean',
      description: 'Legacy: vertical + dynamicSize.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    dynamicHeightInsetPx: {
      control: { type: 'number', min: 0, max: 64, step: 4 },
      description: 'Legacy: алиас для dynamicSizeInsetPx.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '16' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionBar>;

type ActionBarStoryDemoProps = {
  size?: ActionBarSize;
  orientation?: ActionBarOrientation;
  dynamicSize?: boolean;
  'aria-label'?: string;
  overflowMenuAriaLabel?: string;
  actionRows?: typeof actionBarDemoActionsFull;
  showLastAction?: boolean;
  shellStyle?: React.CSSProperties;
};

const ActionBarStoryDemo = ({
  size = ActionBarSize.XL,
  orientation = ActionBarOrientation.HORIZONTAL,
  dynamicSize = false,
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
          orientation={orientation}
          dynamicSize={dynamicSize}
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

/** Вертикальная статическая панель (без overflow-меню) */
export const VerticalStatic: Story = {
  name: 'Vertical — статическая колонка',
  render: () => (
    <div style={actionBarStoriesStyles.page}>
      <p style={actionBarStoriesStyles.hint}>
        `orientation={ActionBarOrientation.VERTICAL}` без **dynamicSize** — колонка фиксированной
        ширины, все действия видимы.
      </p>
      <ActionBarStoryDemo
        size={ActionBarSize.XL}
        aria-label="Вертикальная панель действий"
        shellStyle={{ width: 'auto' }}
        orientation={ActionBarOrientation.VERTICAL}
      />
    </div>
  ),
};

/** dynamicSize — добавление в конец, горизонтальная панель */
export const DynamicSizeHorizontal: Story = {
  name: 'Dynamic size — горизонтально',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          '**dynamicSize** в горизонтальной ориентации: панель расширяется по ширине, новые действия добавляются в конец с sync-анимацией.',
      },
    },
  },
  render: () => (
    <ActionBarDynamicSizeDemo
      insertAfterSelection={false}
      initialOrientation={ActionBarOrientation.HORIZONTAL}
    />
  ),
};

/** dynamicSize — добавление в конец, вертикальная панель */
export const DynamicSizeVertical: Story = {
  name: 'Dynamic size — вертикально',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          '**dynamicSize** в вертикальной ориентации: панель расширяется по высоте, новые действия добавляются в конец с sync-анимацией.',
      },
    },
  },
  render: () => (
    <ActionBarDynamicSizeDemo
      insertAfterSelection={false}
      initialOrientation={ActionBarOrientation.VERTICAL}
    />
  ),
};

/** dynamicSize — вставка после выбранного, горизонтальная панель */
export const DynamicSizeRemoveSelectedHorizontal: Story = {
  name: 'Dynamic size — горизонтально, любая позиция',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Горизонтальная панель: выберите действие кликом. Новое добавляется справа от выбранного. «Удалить выбранное» убирает активную кнопку с той же анимацией.',
      },
    },
  },
  render: () => (
    <ActionBarDynamicSizeDemo
      insertAfterSelection
      initialOrientation={ActionBarOrientation.HORIZONTAL}
    />
  ),
};

/** dynamicSize — вставка после выбранного, вертикальная панель */
export const DynamicSizeRemoveSelectedVertical: Story = {
  name: 'Dynamic size — вертикально, любая позиция',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Вертикальная панель: выберите действие кликом. Новое добавляется ниже выбранного. «Удалить выбранное» убирает активную кнопку с той же анимацией.',
      },
    },
  },
  render: () => (
    <ActionBarDynamicSizeDemo
      insertAfterSelection
      initialOrientation={ActionBarOrientation.VERTICAL}
    />
  ),
};

/** @deprecated Используйте {@link DynamicSizeHorizontal} */
export const DynamicSize: Story = DynamicSizeHorizontal;

/** @deprecated Используйте {@link DynamicSizeRemoveSelectedHorizontal} или {@link DynamicSizeRemoveSelectedVertical} */
export const DynamicSizeRemoveSelected: Story = DynamicSizeRemoveSelectedVertical;

/** @deprecated Используйте {@link DynamicSizeHorizontal} */
export const DynamicHeight: Story = DynamicSizeHorizontal;
