import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavigationMenu } from './NavigationMenu';
import { NavigationMenuItem } from './NavigationMenuItem';
import { ThemeProvider } from '@/themes/ThemeProvider';
import { NavigationMenuActiveAppearance } from '@/types/ui';
import { Icon } from '../Icon/Icon';
import { DOC_NAVIGATION_MENU } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta<typeof NavigationMenu> = {
  title: 'UI Kit/Navigation/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_NAVIGATION_MENU,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ maxWidth: 280 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    collapsed: {
      description: 'Компактный режим: только иконки',
      table: { type: { summary: 'boolean' } },
    },
    activeId: {
      description: 'Выбранный пункт (контролируемый режим)',
      table: { type: { summary: 'string или null' } },
    },
    defaultActiveId: {
      description: 'Начальный выбранный id в неконтролируемом режиме',
      table: { type: { summary: 'string или null' } },
    },
    onActiveChange: {
      description: 'Смена активного пункта',
      table: {
        type: { summary: '(id: string) => void' },
      },
    },
    activeAppearance: {
      control: { type: 'select' },
      options: Object.values(NavigationMenuActiveAppearance),
      description: 'Как подсвечивается активный пункт',
      table: {
        type: { summary: 'bar, highlighted или solid (NavigationMenuActiveAppearance)' },
      },
    },
    'aria-label': {
      description: 'Подпись навигации для скринридеров',
      table: { type: { summary: 'string' } },
    },
    children: {
      control: false,
      description: 'Пункты NavigationMenuItem',
      table: { type: { summary: 'ReactNode' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

export const Expanded: Story = {
  args: {
    'aria-label': 'Основная навигация',
    defaultActiveId: 'home',
    activeAppearance: NavigationMenuActiveAppearance.BAR,
    children: (
      <>
        <NavigationMenuItem id="home" label="Главная" icon={<Icon name="IconExHome" size="md" />} />
        <NavigationMenuItem
          id="inbox"
          label="Входящие"
          icon={<Icon name="IconExUser" size="md" />}
          badge={3}
        />
        <NavigationMenuItem
          id="folders"
          label="Папки"
          icon={<Icon name="IconExSettings" size="md" />}
          suffix={<span aria-hidden>▼</span>}
        />
        <NavigationMenuItem
          id="disabled"
          label="Отключено"
          disabled
          icon={<Icon name="IconExHome" size="md" />}
        />
      </>
    ),
  },
};

export const HighlightedActive: Story = {
  args: {
    'aria-label': 'Навигация',
    defaultActiveId: 'inbox',
    activeAppearance: NavigationMenuActiveAppearance.HIGHLIGHTED,
    children: (
      <>
        <NavigationMenuItem id="home" label="Главная" icon={<Icon name="IconExHome" size="md" />} />
        <NavigationMenuItem
          id="inbox"
          label="Входящие"
          icon={<Icon name="IconExUser" size="md" />}
          badge={12}
        />
        <NavigationMenuItem id="faq" label="FAQ" icon={<Icon name="IconExSettings" size="md" />} />
      </>
    ),
  },
};

export const SolidActive: Story = {
  args: {
    'aria-label': 'Навигация',
    defaultActiveId: 'home',
    activeAppearance: NavigationMenuActiveAppearance.SOLID,
    children: (
      <>
        <NavigationMenuItem id="home" label="Главная" icon={<Icon name="IconExHome" size="md" />} />
        <NavigationMenuItem
          id="profile"
          label="Профиль"
          icon={<Icon name="IconExUser" size="md" />}
        />
      </>
    ),
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    'aria-label': 'Навигация',
    defaultActiveId: 'inbox',
    children: (
      <>
        <NavigationMenuItem id="home" label="Главная" icon={<Icon name="IconExHome" size="md" />} />
        <NavigationMenuItem
          id="inbox"
          label="Входящие"
          icon={<Icon name="IconExUser" size="md" />}
          badge={3}
        />
        <NavigationMenuItem
          id="settings"
          label="Настройки"
          icon={<Icon name="IconExSettings" size="md" />}
        />
      </>
    ),
  },
};

export const WithNavigationMenuItemAlias: Story = {
  name: 'NavigationMenu.Item',
  args: {
    defaultActiveId: 'a',
    children: (
      <>
        <NavigationMenu.Item id="a" label="Пункт A" icon={<Icon name="IconExHome" size="md" />} />
        <NavigationMenu.Item id="b" label="Пункт B" icon={<Icon name="IconExUser" size="md" />} />
      </>
    ),
  },
};

