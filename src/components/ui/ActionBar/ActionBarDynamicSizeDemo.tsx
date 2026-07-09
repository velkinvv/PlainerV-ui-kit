import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActionBar } from './ActionBar';
import { ActionBarOrientation, ActionBarSize } from '../../../types/ui';
import { NAVIGATION_MENU_ITEM_HIGHLIGHT_PULSE_MS } from '@/handlers/navigationMenuItemHighlightHandlers';
import {
  actionBarDemoActionsFull,
  resolveActionBarDemoItemLabel,
  useActionBarDemoConfig,
} from './ActionBar.stories.helpers';
import {
  ActionBarDynamicSizeDemoButton,
  ActionBarDynamicSizeDemoControls,
  ActionBarDynamicSizeDemoHint,
  ActionBarDynamicSizeDemoOrientationToggle,
  ActionBarDynamicSizeDemoRoot,
  ActionBarDynamicSizeDemoStage,
  ActionBarDynamicSizeDemoStatus,
} from './ActionBarDynamicSizeDemo.style';

/** Пропсы интерактивного демо dynamicSize */
export type ActionBarDynamicSizeDemoProps = {
  /**
   * Вставлять новое действие сразу после выбранного.
   * `false` — всегда в конец списка.
   */
  insertAfterSelection?: boolean;
  /** Начальная ориентация панели */
  initialOrientation?: ActionBarOrientation;
};

const dynamicSizeInitialItemIds = [
  'search',
  'edit',
  'archive',
  'favorite',
  'schedule',
  'share',
];

/**
 * Интерактивное демо ActionBar с **dynamicSize**:
 * горизонтальная или вертикальная панель с анимированным размером и появлением/удалением действий.
 *
 * @param insertAfterSelection — вставка после выбранного (иначе в конец)
 * @param initialOrientation — начальная ориентация (horizontal / vertical)
 */
export const ActionBarDynamicSizeDemo: React.FC<ActionBarDynamicSizeDemoProps> = ({
  insertAfterSelection = false,
  initialOrientation = ActionBarOrientation.HORIZONTAL,
}) => {
  const [visibleItemIds, setVisibleItemIds] = useState<string[]>(dynamicSizeInitialItemIds);
  const [activeItemId, setActiveItemId] = useState('edit');
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);
  const [orientation, setOrientation] = useState<ActionBarOrientation>(initialOrientation);
  const activeItemIdRef = useRef(activeItemId);

  activeItemIdRef.current = activeItemId;

  const actionRows = useMemo(
    () => actionBarDemoActionsFull.filter((row) => visibleItemIds.includes(row.itemId)),
    [visibleItemIds],
  );

  const demoConfig = useActionBarDemoConfig(actionRows, ActionBarSize.XL, {
    activeItemId,
    highlightedItemId,
    onSelectItem: setActiveItemId,
  });

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
    const nextItem = actionBarDemoActionsFull.find((row) => !visibleItemIds.includes(row.itemId));
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

  const handleOrientationChange = useCallback((nextOrientation: ActionBarOrientation) => {
    setOrientation(nextOrientation);
  }, []);

  const canAddItem = visibleItemIds.length < actionBarDemoActionsFull.length;
  const canRemoveItem = visibleItemIds.length > 1;
  const isVertical = orientation === ActionBarOrientation.VERTICAL;
  const addButtonLabel = insertAfterSelection ? 'Добавить после выбранного' : 'Добавить в конец';

  return (
    <ActionBarDynamicSizeDemoRoot>
      <ActionBarDynamicSizeDemoHint>
        {insertAfterSelection
          ? 'Выберите действие кликом. «Добавить после выбранного» вставляет новую кнопку справа/ниже (начало / середина / конец). «Удалить выбранное» убирает именно его. Новое действие подсвечивается пульсом.'
          : 'В режиме **dynamicSize** ActionBar подстраивает размер под число действий и анимирует появление/удаление пунктов. Новые действия добавляются в конец и подсвечиваются пульсом. Переключите ориентацию — анимация работает и горизонтально, и вертикально.'}
      </ActionBarDynamicSizeDemoHint>

      <ActionBarDynamicSizeDemoOrientationToggle>
        <ActionBarDynamicSizeDemoButton
          type="button"
          $active={isVertical}
          onClick={() => handleOrientationChange(ActionBarOrientation.VERTICAL)}
        >
          Вертикально
        </ActionBarDynamicSizeDemoButton>
        <ActionBarDynamicSizeDemoButton
          type="button"
          $active={!isVertical}
          onClick={() => handleOrientationChange(ActionBarOrientation.HORIZONTAL)}
        >
          Горизонтально
        </ActionBarDynamicSizeDemoButton>
      </ActionBarDynamicSizeDemoOrientationToggle>

      <ActionBarDynamicSizeDemoControls>
        <ActionBarDynamicSizeDemoButton type="button" onClick={handleAddItem} disabled={!canAddItem}>
          {addButtonLabel}
        </ActionBarDynamicSizeDemoButton>
        <ActionBarDynamicSizeDemoButton
          type="button"
          onClick={handleRemoveActiveItem}
          disabled={!canRemoveItem}
        >
          Удалить выбранное
        </ActionBarDynamicSizeDemoButton>
      </ActionBarDynamicSizeDemoControls>

      <ActionBarDynamicSizeDemoStatus>
        Действий: {visibleItemIds.length} / {actionBarDemoActionsFull.length}. Выбрано:{' '}
        {resolveActionBarDemoItemLabel(activeItemId)}
      </ActionBarDynamicSizeDemoStatus>

      <ActionBarDynamicSizeDemoStage $orientation={orientation}>
        <ActionBar
          orientation={orientation}
          dynamicSize
          dynamicSizeInsetPx={16}
          size={ActionBarSize.XL}
          aria-label={
            isVertical ? 'Вертикальная панель действий' : 'Горизонтальная панель действий'
          }
          items={demoConfig.items}
          renderActionBarItem={demoConfig.renderActionBarItem}
          renderDropMenuItem={demoConfig.renderDropMenuItem}
          itemIsDisabled={demoConfig.itemIsDisabled}
        />
      </ActionBarDynamicSizeDemoStage>
    </ActionBarDynamicSizeDemoRoot>
  );
};

/** @deprecated Используйте {@link ActionBarDynamicSizeDemo} */
export const ActionBarDynamicHeightDemo = ActionBarDynamicSizeDemo;
