import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DOC_DROPDOWN_MENU_ITEM } from '@/components/ui/storyDocs/uiKitDocs';
import { lightTheme } from '@/themes/themes';
import {
  createDropdownMenuItemStoryThemeStyles,
  dropdownMenuItemStoriesStyles,
} from './DropdownMenuItem.stories.styles';

const dropdownMenuItemStoryThemeStyles = createDropdownMenuItemStoryThemeStyles(lightTheme);
const dropdownMenuItemMetaStyle = {
  ...dropdownMenuItemStoriesStyles.customContentMeta,
  ...dropdownMenuItemStoryThemeStyles.customContentMeta,
};

const meta: Meta<typeof DropdownMenuItem> = {
  title: 'UI Kit/Navigation/Dropdown/DropdownMenuItem',
  component: DropdownMenuItem,
  decorators: [
    Story => <DropdownMenu style={dropdownMenuItemStoriesStyles.menuDecoratorRoot}>{Story()}</DropdownMenu>,
  ],
  parameters: {
    docs: {
      description: {
        component: DOC_DROPDOWN_MENU_ITEM,
      },
    },
  },
  argTypes: {
    label: { description: 'Основной текст пункта меню', control: { type: 'text' } },
    description: { description: 'Дополнительное описание под заголовком', control: { type: 'text' } },
    value: {
      description: 'Полезное значение, которое вернётся в `onSelect`',
      control: { type: 'text' },
      table: {
        type: { summary: 'строка либо число (идентификатор пункта)' },
      },
    },
    icon: { description: 'Левая иконка/аватар', control: false },
    rightSlot: { description: 'Правый слот (тег, статус, кастомный контент)', control: false },
    shortcut: { description: 'Строка с сочетанием клавиш. Если указана, рендерится справа', control: { type: 'text' } },
    disabled: { description: 'Отключает пункт меню', control: { type: 'boolean' } },
    loading: {
      description: 'Показывает индикатор загрузки и блокирует действие.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: false } },
    },
    tone: {
      description: 'Тон оформления; допустимые значения: `default` (обычный), `danger` (акцент на опасное действие)',
      options: ['default', 'danger'],
      control: { type: 'inline-radio' },
      table: { defaultValue: { summary: 'default' } },
    },
    state: {
      description: 'Принудительное состояние: задайте `selected` или оставьте без значения',
      options: ['selected'],
      control: { type: 'inline-radio' },
    },
    showTooltip: {
      description: 'Отображает тултип при наведении на пункт меню.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: false } },
    },
    tooltipText: {
      description:
        'Кастомный текст тултипа. Если не указан, подставляется текст из `label`, иначе из `description`',
      control: { type: 'text' },
    },
    tooltipType: {
      description: '`tooltip` (по умолчанию) — компактная подсказка; `hint` — карточка `Hint`',
      options: ['tooltip', 'hint'],
      control: { type: 'inline-radio' },
      table: { defaultValue: { summary: 'tooltip' } },
    },
    onSelect: { description: 'Колбэк при выборе текущего пункта', control: false },
    children: {
      description:
        'Кастомный контент строки; если передан, пропы `label` и `description` можно опустить',
      control: false,
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Редактировать',
    description: 'Изменить выбранный элемент',
  },
};

export const WithIconAndShortcut: Story = {
  args: {
    label: 'Дублировать',
    description: 'Создаёт копию текущего элемента',
    icon: <span>📄</span>,
    shortcut: '⌘D',
  },
};

export const DangerItem: Story = {
  args: {
    label: 'Удалить проект',
    description: 'Действие нельзя отменить',
    tone: 'danger',
  },
};

export const DisabledItem: Story = {
  args: {
    label: 'Поделиться ссылкой',
    description: 'Доступно только для публичных досок',
    disabled: true,
  },
};

export const LoadingItem: Story = {
  args: {
    label: 'Подгружаем данные',
    description: 'Это займёт несколько секунд',
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Флаг `loading` отображает спиннер слева, блокирует клик и подсвечивает состояние ожидания.',
      },
    },
  },
};

export const SelectedItem: Story = {
  render: () => (
    <DropdownMenu value="option-2">
      <DropdownMenuItem label="Первый пункт" value="option-1" />
      <DropdownMenuItem label="Выбранный пункт" value="option-2" description="Этот пункт выбран" />
      <DropdownMenuItem label="Третий пункт" value="option-3" />
    </DropdownMenu>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Проп `value` в `DropdownMenu` позволяет управлять состоянием выбранного элемента через сравнение с `value` каждого элемента. Полезно для контролируемых компонентов.',
      },
    },
  },
};

export const MixedStates: Story = {
  render: () => (
    <DropdownMenu value="selected-option">
      <DropdownMenuItem label="Готовый пункт" icon={<span>✓</span>} />
      <DropdownMenuItem label="Выбранный пункт" value="selected-option" icon={<span>✓</span>} />
      <DropdownMenuItem label="Загружается..." loading icon={<span>⏳</span>} />
      <DropdownMenuItem label="Отключён" disabled description="Недоступно" />
      <DropdownMenuItem label="Опасное действие" tone="danger" icon={<span>🗑️</span>} />
    </DropdownMenu>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрирует различные состояния пунктов меню в одном списке: обычный, выбранный (через `value`), загрузка, отключённый и опасный.',
      },
    },
  },
};

export const CustomContent: Story = {
  render: () => (
    <DropdownMenuItem>
      <div style={dropdownMenuItemStoriesStyles.customContentRow}>
        <div style={dropdownMenuItemStoriesStyles.customContentColumn}>
          <span style={dropdownMenuItemStoriesStyles.customContentTitle}>System update</span>
          <span
            style={dropdownMenuItemMetaStyle}
          >
            Плановое обновление в 02:00
          </span>
        </div>
        <span style={dropdownMenuItemMetaStyle}>
          Через 1 час
        </span>
      </div>
    </DropdownMenuItem>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрирует полностью кастомный контент внутри элемента меню. Структура и стили наследуются от базового элемента.',
      },
    },
  },
};

export const WithTooltip: Story = {
  args: {
    label: 'Экспортировать',
    description: 'Выгрузить отчёт в CSV',
    showTooltip: true,
    tooltipText: 'Доступно для администраторов',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Используйте `showTooltip` и `tooltipText`, чтобы добавить подсказку к пункту меню. Тултип отключается, если элемент `disabled`, `loading` или `skeleton`.',
      },
    },
  },
};

export const WithHint: Story = {
  args: {
    label: 'Pro',
    description: 'Расширенный тариф',
    value: 'pro',
    tooltip: 'Безлимит запросов, приоритетная поддержка и отчёты по использованию.',
    tooltipType: 'hint',
    tooltipPosition: 'top',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Задайте `tooltip` (или `showTooltip` + текст) и `tooltipType: "hint"`, чтобы на пункте меню показывался `Hint` вместо тултипа. Для отключённых / loading / skeleton строк подсказка не показывается.',
      },
    },
  },
};

