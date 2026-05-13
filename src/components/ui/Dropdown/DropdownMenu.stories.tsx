import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Size } from '../../../types/sizes';
import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DOC_DROPDOWN_MENU } from '@/components/ui/storyDocs/uiKitDocs';
import { lightTheme } from '@/themes/themes';
import {
  createDropdownMenuStoryThemeStyles,
  dropdownMenuStoriesStyles,
} from './DropdownMenu.stories.styles';

const dropdownMenuStoryThemeStyles = createDropdownMenuStoryThemeStyles(lightTheme);
const dropdownMenuCustomMetaStyle = {
  ...dropdownMenuStoriesStyles.customContentMeta,
  ...dropdownMenuStoryThemeStyles.customContentMeta,
};

const meta: Meta<typeof DropdownMenu> = {
  title: 'UI Kit/Navigation/Dropdown/DropdownMenu',
  component: DropdownMenu,
  subcomponents: { DropdownMenuItem },
  decorators: [
    (Story) => (
      <div style={dropdownMenuStoriesStyles.storyDecoratorRoot}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: DOC_DROPDOWN_MENU,
      },
    },
  },
  argTypes: {
    children: {
      description: 'Слот для элементов меню. Обычно набор `DropdownMenuItem`.',
      control: false,
    },
    onItemSelect: {
      description:
        'Служебный проп, который прокидывается компонентом `Dropdown`. Передавать вручную не требуется.',
      control: false,
      table: {
        category: 'internal',
        type: {
          summary: '(value?: string | number, event?: React.MouseEvent<HTMLElement>) => void',
        },
      },
    },
    value: {
      description: 'Выбранное значение или массив в режиме множественного выбора',
      control: false,
      table: {
        type: {
          summary: 'строка, число, массив строк или чисел (согласовано с value у пунктов)',
        },
      },
    },
    onActivateItem: {
      description: 'Наведение или фокус на пункте (подсветка в родителе)',
      control: false,
      table: {
        type: { summary: '(value?: string | number) => void' },
      },
    },
    multiSelection: {
      table: { type: { summary: 'boolean' } },
    },
    showCheckbox: {
      table: { type: { summary: 'boolean (при multiSelection)' } },
    },
    disableSelectedOptionHighlight: {
      table: { type: { summary: 'boolean' } },
    },
    virtualScroll: {
      control: false,
      table: {
        type: { summary: 'конфиг виртуального скролла (см. DropdownVirtualScrollConfig)' },
      },
    },
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
      table: {
        type: { summary: 'Size: XS, SM, MD, LG, XL' },
      },
    },
    menuDensity: {
      control: { type: 'select' },
      options: ['default', 'compact'],
      table: {
        type: { summary: 'default или compact' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicMenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuItem
        label="Редактировать"
        description="Изменить выбранный элемент"
        shortcut="⌘E"
      />
      <DropdownMenuItem label="Дублировать" description="Создать копию" shortcut="⌘D" />
      <DropdownMenuItem label="Поделиться" description="Открыть настройки доступа" />
    </DropdownMenu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuItem label="Профиль" icon={<span>👤</span>} description="Настройки аккаунта" />
      <DropdownMenuItem
        label="Уведомления"
        icon={<span>🔔</span>}
        description="Центр уведомлений"
      />
      <DropdownMenuItem label="Выход" icon={<span>🚪</span>} tone="danger" />
    </DropdownMenu>
  ),
};

export const DisabledAndDanger: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuItem label="Скачать отчёт" />
      <DropdownMenuItem
        label="Поделиться ссылкой"
        disabled
        description="Недоступно для приватных досок"
      />
      <DropdownMenuItem label="Удалить проект" tone="danger" />
    </DropdownMenu>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuItem>
        <div style={dropdownMenuStoriesStyles.customContentColumn}>
          <span style={dropdownMenuStoriesStyles.customContentTitle}>System update</span>
          <span style={dropdownMenuCustomMetaStyle}>System will be updated tonight</span>
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <div style={dropdownMenuStoriesStyles.customContentRow}>
          <span>Toggle dark mode</span>
          <input type="checkbox" aria-label="Dark mode" />
        </div>
      </DropdownMenuItem>
    </DropdownMenu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Если нужно полностью переопределить верстку элемента, можно передать произвольное `children`. Все стили и поведение по умолчанию сохраняются.',
      },
    },
  },
};
