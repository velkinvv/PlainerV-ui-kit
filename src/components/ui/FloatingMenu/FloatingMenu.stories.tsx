import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FloatingMenu } from './FloatingMenu';
import {
  FloatingMenuDropdownTrigger,
  FloatingMenuDragSource,
  FloatingMenuGroupVariant,
  FloatingMenuOrientation,
  FloatingMenuPlacement,
  NavigationMenuActiveAppearance,
} from '@/types/ui';
import { Icon } from '../Icon/Icon';
import { NavigationMenu } from '../NavigationMenu/NavigationMenu';
import { NavigationMenuItem } from '../NavigationMenu/NavigationMenuItem';
import { DOC_FLOATING_MENU } from '@/components/ui/storyDocs/uiKitDocs';
import { floatingMenuStoriesStyles } from './FloatingMenu.stories.styles';
import { FloatingMenuDynamicSizeDemo } from './FloatingMenuDynamicSizeDemo';

const meta: Meta<typeof FloatingMenu> = {
  title: 'UI Kit/Navigation/FloatingMenu',
  component: FloatingMenu,
  decorators: [
    (Story) => (
      <div style={floatingMenuStoriesStyles.decoratorContainer}>
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
    dynamicSize: {
      control: 'boolean',
      description:
        'Динамический размер панели: sync AnimatePresence при добавлении/удалении пунктов в обеих ориентациях.',
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
    orientation: {
      control: { type: 'select' },
      options: Object.values(FloatingMenuOrientation),
      description: 'Горизонтальная или вертикальная раскладка панели.',
      table: {
        type: { summary: 'FloatingMenuOrientation' },
        defaultValue: { summary: 'FloatingMenuOrientation.HORIZONTAL' },
      },
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
    const [selectedPlacement, setSelectedPlacement] = useState(FloatingMenuPlacement.LEFT_CENTER);
    return (
      <div style={floatingMenuStoriesStyles.placementsContainer}>
        <p style={floatingMenuStoriesStyles.placementsLabelRow}>
          <label>
            Размещение:{' '}
            <select
              value={selectedPlacement}
              onChange={(changeEvent) =>
                setSelectedPlacement(changeEvent.target.value as FloatingMenuPlacement)
              }
            >
              {Object.values(FloatingMenuPlacement).map((placementValue) => (
                <option key={placementValue} value={placementValue}>
                  {placementValue}
                </option>
              ))}
            </select>
          </label>
        </p>
        <FloatingMenu aria-label="Демо позиции" placement={selectedPlacement} draggable={false}>
          <FloatingMenu.Group>
            <FloatingMenu.GroupItem icon={<span>◆</span>} active aria-label="A" />
            <FloatingMenu.GroupItem icon={<span>◇</span>} aria-label="B" />
          </FloatingMenu.Group>
        </FloatingMenu>
      </div>
    );
  },
};

/** Вертикальная статическая колонка */
export const VerticalStatic: Story = {
  name: 'Vertical — статическая колонка',
  render: () => (
    <FloatingMenu
      aria-label="Вертикальная панель инструментов"
      orientation={FloatingMenuOrientation.VERTICAL}
      placement={FloatingMenuPlacement.LEFT_CENTER}
    >
      <FloatingMenu.Group>
        <FloatingMenu.GroupItem
          icon={<Icon name="PhosphorArrowFatLineLeft" size="sm" color="currentColor" />}
          active
          aria-label="Выбор"
          tooltip="Выбор"
        />
        <FloatingMenu.GroupItem
          icon={<span aria-hidden>T</span>}
          aria-label="Текст"
          tooltip="Текст"
        />
        <FloatingMenu.GroupItem
          icon={<span aria-hidden>✎</span>}
          aria-label="Рисование"
          tooltip="Рисование"
        />
      </FloatingMenu.Group>
      <FloatingMenu.Divider />
      <FloatingMenu.Group variant={FloatingMenuGroupVariant.INSET}>
        <FloatingMenu.GroupItem icon={<span>∟</span>} active aria-label="Линейка" />
        <FloatingMenu.GroupItem icon={<span>&lt;/&gt;</span>} aria-label="Код" />
      </FloatingMenu.Group>
    </FloatingMenu>
  ),
};

/** dynamicSize — добавление в конец, анимация horizontal / vertical */
export const DynamicSize: Story = {
  name: 'Dynamic size — анимация horizontal / vertical',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          '**dynamicSize** включает sync AnimatePresence для пунктов в обеих ориентациях. Переключите ориентацию — анимация width (horizontal) или height (vertical).',
      },
    },
  },
  render: () => (
    <FloatingMenuDynamicSizeDemo insertAfterSelection={false} initialOrientation={FloatingMenuOrientation.HORIZONTAL} />
  ),
};

/** dynamicSize — вставка после выбранного и удаление выбранного */
export const DynamicSizeRemoveSelected: Story = {
  name: 'Dynamic size — любая позиция',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Выберите инструмент кликом. Новый добавляется после/ниже выбранного. «Удалить выбранный» убирает активную кнопку с той же анимацией.',
      },
    },
  },
  render: () => <FloatingMenuDynamicSizeDemo insertAfterSelection initialOrientation={FloatingMenuOrientation.VERTICAL} />,
};
