import React, { useId, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';
import { MenuItem } from './MenuItem';
import { Icon } from '../Icon/Icon';
import { DOC_MENU } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta<typeof Menu> = {
  title: 'UI Kit/Navigation/Menu',
  component: Menu,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_MENU,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    'aria-label': {
      description: 'Доступное имя списка меню',
      table: { type: { summary: 'string' } },
    },
    maxHeight: {
      control: 'text',
      description: 'Максимальная высота списка (px или css, например `40vh`)',
    },
    dense: {
      control: 'boolean',
      description: 'Компактные пункты',
    },
    autoFocusFirstItem: {
      control: 'boolean',
      description: 'Автофокус на первый пункт при монтировании',
    },
    children: {
      control: false,
      description: 'Элементы `MenuItem`',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Basic: Story = {
  args: {
    'aria-label': 'Демо меню',
    autoFocusFirstItem: true,
    children: (
      <>
        <MenuItem onClick={() => undefined}>Вырезать</MenuItem>
        <MenuItem onClick={() => undefined}>Копировать</MenuItem>
        <MenuItem onClick={() => undefined}>Вставить</MenuItem>
      </>
    ),
  },
};

export const WithIcons: Story = {
  args: {
    'aria-label': 'Действия с иконками',
    children: (
      <>
        <MenuItem onClick={() => undefined}>
          <Icon name="IconExUser" size="sm" color="currentColor" />
          Профиль
        </MenuItem>
        <MenuItem onClick={() => undefined}>
          <Icon name="IconExSettings" size="sm" color="currentColor" />
          Настройки
        </MenuItem>
        <MenuItem destructive onClick={() => undefined}>
          Выйти
        </MenuItem>
      </>
    ),
  },
};

export const DenseScrollable: Story = {
  args: {
    'aria-label': 'Длинный список',
    dense: true,
    maxHeight: 200,
    autoFocusFirstItem: false,
    children: Array.from({ length: 20 }, (_, index) => (
      <MenuItem key={index} onClick={() => undefined}>
        Пункт {index + 1}
      </MenuItem>
    )),
  },
};

/**
 * Тот же id в Storybook, что и раньше (`components-menu--with-menu-item-alias`): алиас `Menu.Item` вместо `MenuItem`.
 */
export const WithMenuItemAlias: Story = {
  name: 'Menu.Item',
  args: {
    'aria-label': 'Демо алиаса Menu.Item',
    autoFocusFirstItem: false,
    children: (
      <>
        <Menu.Item onClick={() => undefined}>Пункт A</Menu.Item>
        <Menu.Item onClick={() => undefined}>Пункт B</Menu.Item>
      </>
    ),
  },
};

/**
 * Имитация открытия по клику: меню рядом с кнопкой (без портала — для сторис).
 */
export const AnchoredDemo: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const buttonId = useId();
    const menuId = `${buttonId}-menu`;
    const wrapRef = useRef<HTMLDivElement>(null);

    return (
      <div ref={wrapRef} style={{ position: 'relative', display: 'inline-block' }}>
        <button type="button" id={buttonId} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          Открыть меню
        </button>
        {open ? (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '100%',
              marginTop: 4,
              zIndex: 2,
            }}
          >
            <Menu id={menuId} aria-label="Пример якорного меню" autoFocusFirstItem>
              <MenuItem
                onClick={() => {
                  setOpen(false);
                }}
              >
                Действие один
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setOpen(false);
                }}
              >
                Действие два
              </MenuItem>
              <MenuItem
                destructive
                onClick={() => {
                  setOpen(false);
                }}
              >
                Удалить
              </MenuItem>
            </Menu>
          </div>
        ) : null}
      </div>
    );
  },
};

