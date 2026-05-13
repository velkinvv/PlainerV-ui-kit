import { useCallback, useEffect, useRef, useState } from 'react';
import { NavigationMenuExpandInteraction } from '@/types/ui';

export interface UseNavigationMenuExpandParams {
  /** Режим раскрытия; при NONE хук не управляет раскрытием */
  expandInteraction: NavigationMenuExpandInteraction;
  /** Статический компактный режим (если expandInteraction === NONE) */
  collapsed?: boolean;
  /** Контролируемое состояние «развёрнуто» */
  expanded?: boolean;
  /** Начальное значение в неконтролируемом режиме */
  defaultExpanded?: boolean;
  /** Вызывается при переходе в развёрнутое состояние */
  onExpand?: () => void;
  /** Вызывается при переходе в компактное состояние */
  onCollapse?: () => void;
  /** Для контролируемого режима: запросить смену expanded у родителя */
  onExpandedChange?: (expanded: boolean) => void;
}

export interface UseNavigationMenuExpandResult {
  /** Панель визуально развёрнута (подписи/полная ширина); при NONE совпадает с collapsedProp */
  isExpanded: boolean;
  /** Эквивалент `collapsed` для NavigationMenu: true = только иконки */
  effectiveCollapsed: boolean;
  /** Включена ли анимация/обёртка раскрытия */
  isExpandInteractionEnabled: boolean;
  /** Пропсы корневой обёртки: hover / клик для раскрытия */
  expandRootProps: {
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: (event: React.MouseEvent) => void;
    'aria-expanded'?: boolean;
  };
  /** Установить развёрнуто (неконтролируемый режим и уведомление родителя в контролируемом) */
  setExpanded: (next: boolean) => void;
}

/**
 * Состояние и обработчики раскрытия компактного меню навигации (клик / наведение).
 */
export function useNavigationMenuExpand({
  expandInteraction,
  collapsed: collapsedProp = false,
  expanded: expandedControlled,
  defaultExpanded = false,
  onExpand,
  onCollapse,
  onExpandedChange,
}: UseNavigationMenuExpandParams): UseNavigationMenuExpandResult {
  const isControlled = expandedControlled !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const expanded = isControlled ? expandedControlled : internalExpanded;

  const prevExpandedRef = useRef<boolean | null>(null);

  const isExpandInteractionEnabled = expandInteraction !== NavigationMenuExpandInteraction.NONE;

  const effectiveCollapsed = isExpandInteractionEnabled ? !expanded : !!collapsedProp;

  useEffect(() => {
    if (!isExpandInteractionEnabled) {
      prevExpandedRef.current = null;
      return;
    }
    if (prevExpandedRef.current === null) {
      prevExpandedRef.current = expanded;
      return;
    }
    if (prevExpandedRef.current === expanded) {
      return;
    }
    if (expanded) {
      onExpand?.();
    } else {
      onCollapse?.();
    }
    prevExpandedRef.current = expanded;
  }, [expanded, isExpandInteractionEnabled, onExpand, onCollapse]);

  const applyExpanded = useCallback(
    (next: boolean) => {
      if (!isExpandInteractionEnabled) {
        return;
      }
      if (isControlled) {
        onExpandedChange?.(next);
      } else {
        setInternalExpanded(next);
      }
    },
    [isControlled, isExpandInteractionEnabled, onExpandedChange],
  );

  const handleRootClick = useCallback(
    (event: React.MouseEvent) => {
      if (expandInteraction !== NavigationMenuExpandInteraction.CLICK) {
        return;
      }
      const target = event.target as HTMLElement;
      if (
        target.closest('button, a') ||
        target.closest('[data-prevent-navigation-expand-toggle]')
      ) {
        return;
      }
      applyExpanded(!expanded);
    },
    [applyExpanded, expandInteraction, expanded],
  );

  const handleMouseEnter = useCallback(() => {
    if (expandInteraction !== NavigationMenuExpandInteraction.HOVER) {
      return;
    }
    applyExpanded(true);
  }, [applyExpanded, expandInteraction]);

  const handleMouseLeave = useCallback(() => {
    if (expandInteraction !== NavigationMenuExpandInteraction.HOVER) {
      return;
    }
    applyExpanded(false);
  }, [applyExpanded, expandInteraction]);

  const expandRootProps: UseNavigationMenuExpandResult['expandRootProps'] =
    isExpandInteractionEnabled
      ? expandInteraction === NavigationMenuExpandInteraction.TOGGLE_BUTTON
        ? {
            /** Раскрытие только кнопкой в шапке Sidemenu */
            'aria-expanded': expanded,
          }
        : {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            onClick: handleRootClick,
            'aria-expanded': expanded,
          }
      : {};

  const setExpanded = useCallback(
    (next: boolean) => {
      applyExpanded(next);
    },
    [applyExpanded],
  );

  const isExpandedVisual = isExpandInteractionEnabled ? expanded : !collapsedProp;

  return {
    isExpanded: isExpandedVisual,
    effectiveCollapsed,
    isExpandInteractionEnabled,
    expandRootProps,
    setExpanded,
  };
}
