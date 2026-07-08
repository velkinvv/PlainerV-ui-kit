import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { FloatingMenu } from './FloatingMenu';
import { FloatingMenuOrientation, FloatingMenuPlacement } from '../../../types/ui';
import { IconSize } from '../../../types/sizes';
import { NAVIGATION_MENU_ITEM_HIGHLIGHT_PULSE_MS } from '@/handlers/navigationMenuItemHighlightHandlers';
import {
  FloatingMenuDynamicSizeDemoButton,
  FloatingMenuDynamicSizeDemoControls,
  FloatingMenuDynamicSizeDemoHint,
  FloatingMenuDynamicSizeDemoOrientationToggle,
  FloatingMenuDynamicSizeDemoRoot,
  FloatingMenuDynamicSizeDemoStage,
  FloatingMenuDynamicSizeDemoStatus,
} from './FloatingMenuDynamicSizeDemo.style';

/** Пропсы интерактивного демо dynamicSize */
export type FloatingMenuDynamicSizeDemoProps = {
  /**
   * Вставлять новый пункт сразу после выбранного.
   * `false` — всегда в конец списка.
   */
  insertAfterSelection?: boolean;
  /** Начальная ориентация */
  initialOrientation?: FloatingMenuOrientation;
};

/** Конфиг пункта демо */
type FloatingMenuDynamicSizeDemoItem = {
  itemId: string;
  label: string;
  iconName:
    | 'IconPlainerSearch'
    | 'IconPlainerPlus'
    | 'IconPlainerCheck'
    | 'IconPlainerCalendar'
    | 'IconPlainerClock'
    | 'IconPlainerArrowRight'
    | 'IconPlainerUser'
    | 'IconPlainerMoon'
    | 'IconPlainerClose';
};

/** Пул пунктов для добавления в демо */
const dynamicSizeItemPool: FloatingMenuDynamicSizeDemoItem[] = [
  { itemId: 'search', label: 'Поиск', iconName: 'IconPlainerSearch' },
  { itemId: 'edit', label: 'Редактировать', iconName: 'IconPlainerPlus' },
  { itemId: 'archive', label: 'Архив', iconName: 'IconPlainerCalendar' },
  { itemId: 'favorite', label: 'Избранное', iconName: 'IconPlainerCheck' },
  { itemId: 'schedule', label: 'Расписание', iconName: 'IconPlainerClock' },
  { itemId: 'share', label: 'Поделиться', iconName: 'IconPlainerArrowRight' },
  { itemId: 'profile', label: 'Профиль', iconName: 'IconPlainerUser' },
  { itemId: 'theme', label: 'Тема', iconName: 'IconPlainerMoon' },
  { itemId: 'delete', label: 'Удалить', iconName: 'IconPlainerClose' },
];

const dynamicSizeInitialItemIds = ['search', 'edit', 'archive', 'favorite', 'schedule'];

/** Подпись пункта для статуса демо */
function resolveFloatingMenuDemoItemLabel(itemId: string): string {
  const itemEntry = dynamicSizeItemPool.find((entry) => entry.itemId === itemId);
  return itemEntry?.label ?? itemId;
}

/** Placement по умолчанию для ориентации */
function resolveFloatingMenuDemoPlacement(orientation: FloatingMenuOrientation): FloatingMenuPlacement {
  return orientation === FloatingMenuOrientation.VERTICAL
    ? FloatingMenuPlacement.LEFT_CENTER
    : FloatingMenuPlacement.BOTTOM_CENTER;
}

/**
 * Интерактивное демо {@link FloatingMenu} с **dynamicSize**:
 * горизонтальная или вертикальная панель с анимированным размером и появлением/удалением пунктов.
 *
 * @param insertAfterSelection — вставка после выбранного (иначе в конец)
 * @param initialOrientation — начальная ориентация
 */
export const FloatingMenuDynamicSizeDemo: React.FC<FloatingMenuDynamicSizeDemoProps> = ({
  insertAfterSelection = false,
  initialOrientation = FloatingMenuOrientation.VERTICAL,
}) => {
  const [visibleItemIds, setVisibleItemIds] = useState<string[]>(dynamicSizeInitialItemIds);
  const [activeItemId, setActiveItemId] = useState('edit');
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);
  const [orientation, setOrientation] = useState<FloatingMenuOrientation>(initialOrientation);
  const activeItemIdRef = useRef(activeItemId);

  activeItemIdRef.current = activeItemId;

  const visibleItems = useMemo(
    () => dynamicSizeItemPool.filter((entry) => visibleItemIds.includes(entry.itemId)),
    [visibleItemIds],
  );

  useEffect(() => {
    if (highlightedItemId == null) {
      return undefined;
    }

    const highlightReleaseTimer = window.setTimeout(() => {
      setHighlightedItemId(null);
    }, NAVIGATION_MENU_ITEM_HIGHLIGHT_PULSE_MS);

    return () => {
      window.clearTimeout(highlightReleaseTimer);
    };
  }, [highlightedItemId]);

  const handleAddItem = useCallback(() => {
    const nextItem = dynamicSizeItemPool.find((entry) => !visibleItemIds.includes(entry.itemId));
    if (nextItem == null) {
      return;
    }

    setVisibleItemIds((currentIds) => {
      if (!insertAfterSelection) {
        return [...currentIds, nextItem.itemId];
      }

      const selectedIndex = currentIds.indexOf(activeItemIdRef.current);
      const insertIndex = selectedIndex >= 0 ? selectedIndex + 1 : currentIds.length;
      const nextIds = [...currentIds];
      nextIds.splice(insertIndex, 0, nextItem.itemId);
      return nextIds;
    });

    setHighlightedItemId(nextItem.itemId);
    setActiveItemId(nextItem.itemId);
  }, [insertAfterSelection, visibleItemIds]);

  const handleRemoveActiveItem = useCallback(() => {
    const selectedItemId = activeItemIdRef.current;

    setVisibleItemIds((currentIds) => {
      if (currentIds.length <= 1) {
        return currentIds;
      }

      const removeIndex = currentIds.indexOf(selectedItemId);
      if (removeIndex < 0) {
        return currentIds;
      }

      const nextIds = currentIds.filter((_, itemIndex) => itemIndex !== removeIndex);

      if (!nextIds.includes(selectedItemId)) {
        const nextActiveIndex = Math.min(removeIndex, nextIds.length - 1);
        setActiveItemId(nextIds[nextActiveIndex] ?? nextIds[0] ?? selectedItemId);
      }

      return nextIds;
    });
  }, []);

  const handleOrientationChange = useCallback((nextOrientation: FloatingMenuOrientation) => {
    setOrientation(nextOrientation);
  }, []);

  const canAddItem = visibleItemIds.length < dynamicSizeItemPool.length;
  const canRemoveItem = visibleItemIds.length > 1;
  const isVertical = orientation === FloatingMenuOrientation.VERTICAL;
  const addButtonLabel = insertAfterSelection
    ? isVertical
      ? 'Добавить ниже выбранного'
      : 'Добавить после выбранного'
    : isVertical
      ? 'Добавить в конец'
      : 'Добавить в конец';

  return (
    <FloatingMenuDynamicSizeDemoRoot>
      <FloatingMenuDynamicSizeDemoHint>
        {insertAfterSelection
          ? isVertical
            ? 'Выберите инструмент кликом. «Добавить ниже выбранного» вставляет новую кнопку под ним (начало / середина / конец). «Удалить выбранный» убирает именно его.'
            : 'Выберите инструмент кликом. «Добавить после выбранного» вставляет новую кнопку справа (начало / середина / конец). «Удалить выбранный» убирает именно его.'
          : 'Панель подстраивает размер под число инструментов и анимирует появление/удаление пунктов. Переключите ориентацию — анимация работает и горизонтально, и вертикально.'}
      </FloatingMenuDynamicSizeDemoHint>

      <FloatingMenuDynamicSizeDemoOrientationToggle>
        <FloatingMenuDynamicSizeDemoButton
          type="button"
          $active={isVertical}
          onClick={() => handleOrientationChange(FloatingMenuOrientation.VERTICAL)}
        >
          Вертикально
        </FloatingMenuDynamicSizeDemoButton>
        <FloatingMenuDynamicSizeDemoButton
          type="button"
          $active={!isVertical}
          onClick={() => handleOrientationChange(FloatingMenuOrientation.HORIZONTAL)}
        >
          Горизонтально
        </FloatingMenuDynamicSizeDemoButton>
      </FloatingMenuDynamicSizeDemoOrientationToggle>

      <FloatingMenuDynamicSizeDemoControls>
        <FloatingMenuDynamicSizeDemoButton type="button" onClick={handleAddItem} disabled={!canAddItem}>
          {addButtonLabel}
        </FloatingMenuDynamicSizeDemoButton>
        <FloatingMenuDynamicSizeDemoButton
          type="button"
          onClick={handleRemoveActiveItem}
          disabled={!canRemoveItem}
        >
          Удалить выбранный
        </FloatingMenuDynamicSizeDemoButton>
      </FloatingMenuDynamicSizeDemoControls>

      <FloatingMenuDynamicSizeDemoStatus>
        Инструментов: {visibleItemIds.length} / {dynamicSizeItemPool.length}. Выбран:{' '}
        {resolveFloatingMenuDemoItemLabel(activeItemId)}
      </FloatingMenuDynamicSizeDemoStatus>

      <FloatingMenuDynamicSizeDemoStage $orientation={orientation}>
        <FloatingMenu
          dynamicSize
          dynamicSizeInsetPx={16}
          orientation={orientation}
          placement={resolveFloatingMenuDemoPlacement(orientation)}
          aria-label={
            isVertical ? 'Вертикальная плавающая панель' : 'Горизонтальная плавающая панель'
          }
        >
          <FloatingMenu.Group>
            {visibleItems.map((itemEntry) => (
              <FloatingMenu.GroupItem
                key={itemEntry.itemId}
                icon={<Icon name={itemEntry.iconName} size={IconSize.SM} color="currentColor" />}
                active={activeItemId === itemEntry.itemId}
                highlightPulse={highlightedItemId === itemEntry.itemId}
                aria-label={itemEntry.label}
                tooltip={itemEntry.label}
                onClick={() => setActiveItemId(itemEntry.itemId)}
              />
            ))}
          </FloatingMenu.Group>
        </FloatingMenu>
      </FloatingMenuDynamicSizeDemoStage>
    </FloatingMenuDynamicSizeDemoRoot>
  );
};
