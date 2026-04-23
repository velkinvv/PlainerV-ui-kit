import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';
import { MenuItem } from './MenuItem';
import { ThemeProvider } from '@/themes/ThemeProvider';
import { MenuActiveAppearance } from '@/types/ui';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/nXAzUL74f5DbMpolFYlKl7/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82--Copy-?node-id=4911-2463',
    },
    docs: {
      description: {
        component:
          'Вертикальное меню навигации: пункты с иконкой, бейджем и суффиксом; expanded / collapsed по макету Figma.',
      },
    },
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <div style={{ maxWidth: 280 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Expanded: Story = {
  args: {
    'aria-label': 'Основная навигация',
    defaultActiveId: 'home',
    activeAppearance: MenuActiveAppearance.BAR,
    children: (
      <>
        <MenuItem id="home" label="Главная" icon={<Icon name="IconExHome" size="md" />} />
        <MenuItem
          id="inbox"
          label="Входящие"
          icon={<Icon name="IconExUser" size="md" />}
          badge={3}
        />
        <MenuItem
          id="folders"
          label="Папки"
          icon={<Icon name="IconExSettings" size="md" />}
          suffix={<span aria-hidden>▼</span>}
        />
        <MenuItem id="disabled" label="Отключено" disabled icon={<Icon name="IconExHome" size="md" />} />
      </>
    ),
  },
};

export const HighlightedActive: Story = {
  args: {
    'aria-label': 'Навигация',
    defaultActiveId: 'inbox',
    activeAppearance: MenuActiveAppearance.HIGHLIGHTED,
    children: (
      <>
        <MenuItem id="home" label="Главная" icon={<Icon name="IconExHome" size="md" />} />
        <MenuItem id="inbox" label="Входящие" icon={<Icon name="IconExUser" size="md" />} badge={12} />
        <MenuItem id="faq" label="FAQ" icon={<Icon name="IconExSettings" size="md" />} />
      </>
    ),
  },
};

export const SolidActive: Story = {
  args: {
    'aria-label': 'Навигация',
    defaultActiveId: 'home',
    activeAppearance: MenuActiveAppearance.SOLID,
    children: (
      <>
        <MenuItem id="home" label="Главная" icon={<Icon name="IconExHome" size="md" />} />
        <MenuItem id="profile" label="Профиль" icon={<Icon name="IconExUser" size="md" />} />
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
        <MenuItem id="home" label="Главная" icon={<Icon name="IconExHome" size="md" />} />
        <MenuItem id="inbox" label="Входящие" icon={<Icon name="IconExUser" size="md" />} badge={3} />
        <MenuItem id="settings" label="Настройки" icon={<Icon name="IconExSettings" size="md" />} />
      </>
    ),
  },
};

export const WithMenuItemAlias: Story = {
  name: 'Menu.Item',
  args: {
    defaultActiveId: 'a',
    children: (
      <>
        <Menu.Item id="a" label="Пункт A" icon={<Icon name="IconExHome" size="md" />} />
        <Menu.Item id="b" label="Пункт B" icon={<Icon name="IconExUser" size="md" />} />
      </>
    ),
  },
};
