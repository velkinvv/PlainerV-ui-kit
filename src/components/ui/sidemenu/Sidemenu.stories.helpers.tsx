import React, { useCallback, useMemo, useState } from 'react';
import type { SidemenuItem, SidemenuProps } from '@/types/ui';
import { Sidemenu } from './Sidemenu';

/** Строка статуса над меню в сторис */
const sidemenuStoryStatusParagraphStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: 12,
  fontSize: 13,
  fontFamily: 'system-ui, sans-serif',
};

const sidemenuStoryStatusMutedStyle: React.CSSProperties = {
  opacity: 0.75,
};

/**
 * Рекурсивно выставляет `active: true` только у узла с переданным id (остальные — false).
 * @param sourceItems — дерево пунктов без учёта активного (флаги из шаблона будут перезаписаны)
 * @param activeId — выбранный id листа или узла
 */
export function applySidemenuActiveId(
  sourceItems: SidemenuItem[],
  activeId: string,
): SidemenuItem[] {
  return sourceItems.map((entry) => ({
    ...entry,
    active: entry.id === activeId,
    items: entry.items != null ? applySidemenuActiveId(entry.items, activeId) : undefined,
  }));
}

export type SidemenuStoryWithActiveStateProps = Omit<SidemenuProps, 'items'> & {
  /** Шаблон дерева; корректные `active` задаёт обёртка по `initialActiveId` и кликам */
  itemsTemplate: SidemenuItem[];
  /** Начальный выбранный id */
  initialActiveId: string;
};

/**
 * Обёртка сторис: синхронизирует `active` у {@link SidemenuItem} с кликами (как в приложении при контроле с родителя).
 * @param itemsTemplate — неизменяемый по ссылке массив желательно задавать константой модуля
 * @param initialActiveId — стартовый активный пункт
 * @param sidemenuProps — остальные пропсы {@link Sidemenu} кроме `items`; `onItemClick` вызывается после обновления активного
 */
export const SidemenuStoryWithActiveState: React.FC<SidemenuStoryWithActiveStateProps> = ({
  itemsTemplate,
  initialActiveId,
  onItemClick: externalOnItemClick,
  ...sidemenuRest
}) => {
  const [activeId, setActiveId] = useState(initialActiveId);

  const items = useMemo(
    () => applySidemenuActiveId(itemsTemplate, activeId),
    [itemsTemplate, activeId],
  );

  const handleItemClick = useCallback(
    (item: SidemenuItem) => {
      setActiveId(item.id);
      externalOnItemClick?.(item);
    },
    [externalOnItemClick],
  );

  return (
    <div>
      <p role="status" aria-live="polite" style={sidemenuStoryStatusParagraphStyle}>
        <span style={sidemenuStoryStatusMutedStyle}>Активный пункт: </span>
        <strong>{activeId}</strong>
      </p>
      <Sidemenu {...sidemenuRest} items={items} onItemClick={handleItemClick} />
    </div>
  );
};

type StoryArgsWithSidemenu = Partial<SidemenuProps> & {
  items?: SidemenuItem[];
};

/**
 * Убирает из args CSF поле **items** — пункты задаёт шаблон с активным состоянием из обёртки.
 * @param storyArgs — объект `args` из `render` в сторис
 */
export function pickSidemenuPropsFromStoryArgs(
  storyArgs: StoryArgsWithSidemenu,
): Omit<SidemenuProps, 'items'> {
  const { items: _unusedItems, ...sidemenuProps } = storyArgs;
  return sidemenuProps as Omit<SidemenuProps, 'items'>;
}
