import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { Sidemenu } from './Sidemenu';
import { SidemenuVariant, type SidemenuItem } from '../../../types/ui';
import { IconSize } from '../../../types/sizes';
import { NAVIGATION_MENU_ITEM_HIGHLIGHT_PULSE_MS } from '@/handlers/navigationMenuItemHighlightHandlers';
import { applySidemenuActiveId } from './Sidemenu.stories.helpers';
import {
  SidemenuDynamicHeightDemoButton,
  SidemenuDynamicHeightDemoControls,
  SidemenuDynamicHeightDemoHint,
  SidemenuDynamicHeightDemoRoot,
  SidemenuDynamicHeightDemoStage,
  SidemenuDynamicHeightDemoStatus,
} from './SidemenuDynamicHeightDemo.style';

/** Пропсы интерактивного демо dynamicHeight */
export type SidemenuDynamicHeightDemoProps = {
  /**
   * Вставлять новый пункт сразу после выбранного.
   * `false` — всегда в конец списка.
   */
  insertAfterSelection?: boolean;
};

/** Пул пунктов для добавления в демо */
const dynamicHeightItemPool: SidemenuItem[] = [
  {
    id: 'home',
    label: 'Главная',
    icon: <Icon name="IconExUser" size={IconSize.MD} />,
  },
  {
    id: 'calendar',
    label: 'Календарь',
    icon: <Icon name="IconExCalendar" size={IconSize.MD} />,
  },
  {
    id: 'messages',
    label: 'Сообщения',
    icon: <Icon name="IconExMessageSquare" size={IconSize.MD} />,
    notificationCount: 2,
  },
  {
    id: 'projects',
    label: 'Проекты',
    icon: <Icon name="IconExCase" size={IconSize.MD} />,
  },
  {
    id: 'users',
    label: 'Пользователи',
    icon: <Icon name="IconExUsers" size={IconSize.MD} />,
  },
  {
    id: 'grid',
    label: 'Приложения',
    icon: <Icon name="IconExBox1" size={IconSize.MD} />,
  },
  {
    id: 'rocket',
    label: 'Запуск',
    icon: <Icon name="IconExRocket" size={IconSize.MD} />,
  },
  {
    id: 'profile',
    label: 'Профиль',
    icon: <Icon name="IconExUser" size={IconSize.MD} />,
  },
  {
    id: 'reports',
    label: 'Отчёты',
    icon: <Icon name="IconExDocument" size={IconSize.MD} />,
  },
  {
    id: 'settings',
    label: 'Настройки',
    icon: <Icon name="IconExSettings" size={IconSize.MD} />,
  },
];

const dynamicHeightInitialItemIds = ['home', 'calendar', 'messages', 'projects', 'users'];

/** Подпись пункта для статуса демо */
function resolveSidemenuDemoItemLabel(itemId: string): string {
  const itemEntry = dynamicHeightItemPool.find((entry) => entry.id === itemId);
  if (itemEntry == null) {
    return itemId;
  }

  return typeof itemEntry.label === 'string' ? itemEntry.label : itemEntry.id;
}

/**
 * Интерактивное демо {@link Sidemenu} с **dynamicHeight**:
 * анимированная высота панели и появление/удаление пунктов.
 *
 * @param insertAfterSelection — вставка после выбранного (иначе в конец)
 */
export const SidemenuDynamicHeightDemo: React.FC<SidemenuDynamicHeightDemoProps> = ({
  insertAfterSelection = false,
}) => {
  const [visibleItemIds, setVisibleItemIds] = useState<string[]>(dynamicHeightInitialItemIds);
  const [activeItemId, setActiveItemId] = useState('calendar');
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);
  const activeItemIdRef = useRef(activeItemId);

  activeItemIdRef.current = activeItemId;

  const visibleItems = useMemo(
    () =>
      applySidemenuActiveId(
        dynamicHeightItemPool
          .filter((entry) => visibleItemIds.includes(entry.id))
          .map((entry) => ({
            ...entry,
            highlightPulse: entry.id === highlightedItemId,
          })),
        activeItemId,
      ),
    [activeItemId, highlightedItemId, visibleItemIds],
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
    const nextItem = dynamicHeightItemPool.find((entry) => !visibleItemIds.includes(entry.id));
    if (nextItem == null) {
      return;
    }

    setVisibleItemIds((currentIds) => {
      if (!insertAfterSelection) {
        return [...currentIds, nextItem.id];
      }

      const selectedIndex = currentIds.indexOf(activeItemIdRef.current);
      const insertIndex = selectedIndex >= 0 ? selectedIndex + 1 : currentIds.length;
      const nextIds = [...currentIds];
      nextIds.splice(insertIndex, 0, nextItem.id);
      return nextIds;
    });

    setHighlightedItemId(nextItem.id);
    setActiveItemId(nextItem.id);
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

  const canAddItem = visibleItemIds.length < dynamicHeightItemPool.length;
  const canRemoveItem = visibleItemIds.length > 1;

  const addButtonLabel = insertAfterSelection ? 'Добавить после выбранного' : 'Добавить в конец';

  return (
    <SidemenuDynamicHeightDemoRoot>
      <SidemenuDynamicHeightDemoHint>
        {insertAfterSelection
          ? 'Выберите пункт кликом. «Добавить после выбранного» вставляет новый пункт под ним (начало / середина / конец). «Удалить выбранный» убирает именно его.'
          : 'Панель подстраивает высоту под число пунктов. Новые пункты добавляются в конец списка и подсвечиваются пульсом.'}
      </SidemenuDynamicHeightDemoHint>

      <SidemenuDynamicHeightDemoControls>
        <SidemenuDynamicHeightDemoButton type="button" onClick={handleAddItem} disabled={!canAddItem}>
          {addButtonLabel}
        </SidemenuDynamicHeightDemoButton>
        <SidemenuDynamicHeightDemoButton
          type="button"
          onClick={handleRemoveActiveItem}
          disabled={!canRemoveItem}
        >
          Удалить выбранный пункт
        </SidemenuDynamicHeightDemoButton>
      </SidemenuDynamicHeightDemoControls>

      <SidemenuDynamicHeightDemoStatus>
        Пунктов: {visibleItemIds.length} / {dynamicHeightItemPool.length}. Выбран:{' '}
        {resolveSidemenuDemoItemLabel(activeItemId)}
      </SidemenuDynamicHeightDemoStatus>

      <SidemenuDynamicHeightDemoStage>
        <Sidemenu
          dynamicHeight
          dynamicHeightInsetPx={16}
          variant={SidemenuVariant.COLLAPSED}
          activeItemId={activeItemId}
          items={visibleItems}
          logo={{
            icon: <Icon name="IconExDocument" size={IconSize.MD} />,
          }}
          onItemClick={(item) => setActiveItemId(item.id)}
        />
      </SidemenuDynamicHeightDemoStage>
    </SidemenuDynamicHeightDemoRoot>
  );
};
