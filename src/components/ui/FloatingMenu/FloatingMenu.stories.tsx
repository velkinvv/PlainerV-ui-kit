import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FloatingMenu } from './FloatingMenu';
import {
  FloatingMenuDropdownTrigger,
  FloatingMenuDragSource,
  FloatingMenuGroupVariant,
  FloatingMenuPlacement,
  NavigationMenuActiveAppearance,
} from '@/types/ui';
import { Icon } from '../Icon/Icon';
import { NavigationMenu } from '../NavigationMenu/NavigationMenu';
import { NavigationMenuItem } from '../NavigationMenu/NavigationMenuItem';
import { DOC_FLOATING_MENU } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta<typeof FloatingMenu> = {
  title: 'UI Kit/Navigation/FloatingMenu',
  component: FloatingMenu,
  decorators: [
    Story => (
      <div style={{ minHeight: 400, position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: DOC_FLOATING_MENU,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    'aria-label': {
      description: 'Доступное имя панели инструментов',
      table: { type: { summary: 'string' } },
    },
    placement: {
      control: { type: 'select' },
      options: Object.values(FloatingMenuPlacement),
      description: 'Закрепление панели у края вьюпорта',
      table: {
        type: {
          summary:
            'FloatingMenuPlacement: left-top, left-center, …, bottom-center и др. (см. enum)',
        },
      },
    },
    draggable: {
      control: 'boolean',
      description: 'Разрешить перетаскивание панели',
      table: { type: { summary: 'boolean' } },
    },
    dragSource: {
      control: { type: 'select' },
      options: Object.values(FloatingMenuDragSource),
      description: 'За что тянуть: вся панель или отдельная ручка',
      table: {
        type: { summary: 'bar (вся панель) или handle (только зона DragHandle)' },
      },
    },
    defaultOffset: {
      control: 'object',
      description: 'Начальное смещение в px от закреплённой позиции',
      table: {
        type: { summary: '{ x: number; y: number }' },
      },
    },
    zIndex: {
      control: 'number',
      table: { type: { summary: 'number' } },
    },
    children: {
      control: false,
      description: 'Группы FloatingMenu.Group, Divider, содержимое',
      table: { type: { summary: 'ReactNode' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FloatingMenu>;

const shapesMenu = (
  <NavigationMenu
    aria-label="Фигуры"
    activeAppearance={NavigationMenuActiveAppearance.HIGHLIGHTED}
    defaultActiveId="r"
  >
    <NavigationMenuItem id="r" label="Прямоугольник" />
    <NavigationMenuItem id="e" label="Эллипс" />
    <NavigationMenuItem id="l" label="Линия" />
  </NavigationMenu>
);

export const BottomCenterFixed: Story = {
  args: {
    'aria-label': 'Инструменты редактора',
    placement: FloatingMenuPlacement.BOTTOM_CENTER,
    draggable: false,
    children: (
      <>
        <FloatingMenu.Group>
          <FloatingMenu.GroupItem
            icon={<Icon name="PhosphorArrowFatLineLeft" size="sm" color="currentColor" />}
            active
            aria-label="Выбор"
            tooltip="Выбор (V)"
          />
          <FloatingMenu.GroupItem
            icon={<span aria-hidden>#</span>}
            hasDropdown
            dropdownTrigger={FloatingMenuDropdownTrigger.CLICK}
            dropdownContent={shapesMenu}
            aria-label="Фигуры"
            tooltip="Фигуры"
          />
          <FloatingMenu.GroupItem
            icon={<span aria-hidden>T</span>}
            aria-label="Текст"
            tooltip="Текст"
          />
        </FloatingMenu.Group>
        <FloatingMenu.Divider />
        <FloatingMenu.Group variant={FloatingMenuGroupVariant.INSET}>
          <FloatingMenu.GroupItem
            icon={<span aria-hidden>✎</span>}
            aria-label="Рисование"
            tooltip="Карандаш"
          />
          <FloatingMenu.GroupItem
            icon={<span aria-hidden>∟</span>}
            active
            aria-label="Линейка"
            tooltip="Линейка"
          />
          <FloatingMenu.GroupItem
            icon={<span aria-hidden>&lt;/&gt;</span>}
            aria-label="Код"
            tooltip="Код"
          />
        </FloatingMenu.Group>
      </>
    ),
  },
};

export const DraggableBar: Story = {
  render: () => (
    <FloatingMenu aria-label="Перетаскиваемая панель" draggable>
      <FloatingMenu.Group>
        <FloatingMenu.GroupItem
          icon={<Icon name="PhosphorArrowFatLineLeft" size="sm" />}
          aria-label="A"
        />
        <FloatingMenu.GroupItem
          icon={<Icon name="PhosphorArrowFatLineRight" size="sm" />}
          aria-label="B"
        />
      </FloatingMenu.Group>
    </FloatingMenu>
  ),
};

export const DraggableByHandle: Story = {
  render: () => (
    <FloatingMenu aria-label="Панель с ручкой" draggable dragSource={FloatingMenuDragSource.HANDLE}>
      <FloatingMenu.DragHandle />
      <FloatingMenu.Group>
        <FloatingMenu.GroupItem icon={<span>1</span>} aria-label="Один" />
        <FloatingMenu.GroupItem icon={<span>2</span>} aria-label="Два" />
      </FloatingMenu.Group>
    </FloatingMenu>
  ),
};

export const DropdownHover: Story = {
  args: {
    'aria-label': 'Меню по hover',
    placement: FloatingMenuPlacement.TOP_CENTER,
    children: (
      <FloatingMenu.Group>
        <FloatingMenu.GroupItem
          icon={<span>▣</span>}
          hasDropdown
          dropdownTrigger={FloatingMenuDropdownTrigger.HOVER}
          dropdownContent={shapesMenu}
          aria-label="Фигуры"
        />
      </FloatingMenu.Group>
    ),
  },
};

export const Placements: Story = {
  render: () => {
    const [p, setP] = useState(FloatingMenuPlacement.LEFT_CENTER);
    return (
      <div style={{ padding: 24 }}>
        <p style={{ marginBottom: 16 }}>
          <label>
            Размещение:{' '}
            <select value={p} onChange={(e) => setP(e.target.value as FloatingMenuPlacement)}>
              {Object.values(FloatingMenuPlacement).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </label>
        </p>
        <FloatingMenu aria-label="Демо позиции" placement={p} draggable={false}>
          <FloatingMenu.Group>
            <FloatingMenu.GroupItem icon={<span>◆</span>} active aria-label="A" />
            <FloatingMenu.GroupItem icon={<span>◇</span>} aria-label="B" />
          </FloatingMenu.Group>
        </FloatingMenu>
      </div>
    );
  },
};

