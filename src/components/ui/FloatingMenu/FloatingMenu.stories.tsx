import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FloatingMenu } from './FloatingMenu';
import { ThemeProvider } from '@/themes/ThemeProvider';
import {
  FloatingMenuDropdownTrigger,
  FloatingMenuDragSource,
  FloatingMenuGroupVariant,
  FloatingMenuPlacement,
  MenuActiveAppearance,
} from '@/types/ui';
import { Icon } from '../Icon/Icon';
import { Menu } from '../Menu/Menu';
import { MenuItem } from '../Menu/MenuItem';

const meta: Meta<typeof FloatingMenu> = {
  title: 'Components/Navigation/FloatingMenu',
  component: FloatingMenu,
  decorators: [
    Story => (
      <ThemeProvider>
        <div style={{ minHeight: 400, position: 'relative' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Плавающая панель инструментов: группы `FloatingMenu.Group`, разделитель `Divider`, пункты `GroupItem` с подсказкой и вложенным `Menu`. Закрепление по краю (`placement`) или перетаскивание (`draggable`).',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FloatingMenu>;

const shapesMenu = (
  <Menu aria-label="Фигуры" activeAppearance={MenuActiveAppearance.HIGHLIGHTED} defaultActiveId="r">
    <MenuItem id="r" label="Прямоугольник" />
    <MenuItem id="e" label="Эллипс" />
    <MenuItem id="l" label="Линия" />
  </Menu>
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
        <FloatingMenu.GroupItem icon={<Icon name="PhosphorArrowFatLineLeft" size="sm" />} aria-label="A" />
        <FloatingMenu.GroupItem icon={<Icon name="PhosphorArrowFatLineRight" size="sm" />} aria-label="B" />
      </FloatingMenu.Group>
    </FloatingMenu>
  ),
};

export const DraggableByHandle: Story = {
  render: () => (
    <FloatingMenu
      aria-label="Панель с ручкой"
      draggable
      dragSource={FloatingMenuDragSource.HANDLE}
    >
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
            <select value={p} onChange={e => setP(e.target.value as FloatingMenuPlacement)}>
              {Object.values(FloatingMenuPlacement).map(v => (
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
