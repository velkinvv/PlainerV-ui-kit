import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useMemo,
  useLayoutEffect,
  useCallback,
} from 'react';
import { clsx } from 'clsx';
import type { DropdownMenuProps } from '../../../types/ui';
import { DropdownMenuWrapper } from './Dropdown.style';
import { Size } from '../../../types/sizes';
import { useTheme } from 'styled-components';
import {
  calculateVirtualScrollItemHeight,
  getGapFromTheme,
  calculateFixedContainerHeight,
  calculateVisibleRange,
  calculateTotalHeight,
  calculateItemPosition,
  getVirtualScrollContainerStyles,
  getVirtualScrollInnerContainerStyles,
  getVirtualScrollItemStyles,
} from './handlers';

type DropdownMenuContextValue = Pick<
  DropdownMenuProps,
  | 'onItemSelect'
  | 'value'
  | 'onActivateItem'
  | 'multiSelection'
  | 'showCheckbox'
  | 'disableSelectedOptionHighlight'
  | 'lookupTreeMenuItemByValue'
> & {
  /** Согласовано с `Dropdown.menuDensity` */
  menuDensity?: 'default' | 'compact';
  /** Размер пунктов темы */
  size?: Size;
  /** Показывать шеврон раскрытия у веток с `nestedItems` */
  treeExpandable?: boolean;
  /** Раскрыта ли ветка с данным ключом */
  isTreeBranchExpanded?: (branchKey: string) => boolean;
  /** Переключить раскрытие ветки (клик по шеврону) */
  toggleTreeBranch?: (branchKey: string, event: React.MouseEvent) => void;
};

const DropdownMenuContext = createContext<DropdownMenuContextValue>({});

/**
 * Хук для доступа к контексту DropdownMenu
 * Используется в DropdownMenuItem для получения пропсов из родительского DropdownMenu
 */
export const useDropdownMenuContext = () => useContext(DropdownMenuContext);

/**
 * Контейнер для пунктов меню dropdown
 * Прокидывает контекст, чтобы Dropdown мог закрывать меню после выбора
 */
export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  onItemSelect,
  value,
  onActivateItem,
  multiSelection,
  showCheckbox,
  disableSelectedOptionHighlight,
  virtualScroll,
  size = Size.MD,
  menuDensity = 'default',
  className,
  treeExpandable = true,
  defaultExpandedTreeKeys,
  treeExpandedKeys: treeExpandedKeysProp,
  onTreeExpandedKeysChange,
  lookupTreeMenuItemByValue,
}) => {
  const theme = useTheme();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const isTreeControlled = treeExpandedKeysProp !== undefined;
  const [innerExpandedTreeKeys, setInnerExpandedTreeKeys] = useState<Set<string>>(() => {
    return new Set(defaultExpandedTreeKeys ?? []);
  });

  const expandedTreeSet = useMemo(() => {
    if (isTreeControlled) {
      return new Set(treeExpandedKeysProp ?? []);
    }
    return innerExpandedTreeKeys;
  }, [isTreeControlled, treeExpandedKeysProp, innerExpandedTreeKeys]);

  const isTreeBranchExpanded = useCallback(
    (branchKey: string) => {
      if (!treeExpandable) {
        return true;
      }
      return expandedTreeSet.has(branchKey);
    },
    [expandedTreeSet, treeExpandable],
  );

  const toggleTreeBranch = useCallback(
    (branchKey: string, event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (!treeExpandable) {
        return;
      }
      if (isTreeControlled) {
        const next = new Set(treeExpandedKeysProp ?? []);
        if (next.has(branchKey)) {
          next.delete(branchKey);
        } else {
          next.add(branchKey);
        }
        onTreeExpandedKeysChange?.([...next]);
        return;
      }
      setInnerExpandedTreeKeys((previous) => {
        const next = new Set(previous);
        if (next.has(branchKey)) {
          next.delete(branchKey);
        } else {
          next.add(branchKey);
        }
        return next;
      });
    },
    [isTreeControlled, treeExpandedKeysProp, onTreeExpandedKeysChange, treeExpandable],
  );

  const contextValue = useMemo<DropdownMenuContextValue>(
    () => ({
      onItemSelect,
      value,
      onActivateItem,
      multiSelection,
      showCheckbox,
      disableSelectedOptionHighlight,
      menuDensity,
      size,
      treeExpandable,
      isTreeBranchExpanded,
      toggleTreeBranch,
      lookupTreeMenuItemByValue,
    }),
    [
      onItemSelect,
      value,
      onActivateItem,
      multiSelection,
      showCheckbox,
      disableSelectedOptionHighlight,
      menuDensity,
      size,
      treeExpandable,
      isTreeBranchExpanded,
      toggleTreeBranch,
      lookupTreeMenuItemByValue,
    ],
  );

  // Вычисляем высоту элемента
  const itemHeight = useMemo(() => {
    return calculateVirtualScrollItemHeight(virtualScroll, theme.dropdowns, size);
  }, [virtualScroll, size, theme]);

  // Получаем массив дочерних элементов
  const childrenArray = useMemo(() => {
    return React.Children.toArray(children);
  }, [children]);

  const totalItems = childrenArray.length;

  // Получаем gap из темы для правильного позиционирования элементов
  const gap = useMemo(() => {
    if (!virtualScroll || !itemHeight) return 0;
    return getGapFromTheme(theme.dropdowns, size);
  }, [virtualScroll, itemHeight, size, theme]);

  // Вычисляем фиксированную высоту контейнера на основе maxHeight
  // Это гарантирует, что высота контейнера не будет меняться при скролле
  const fixedContainerHeight = useMemo(() => {
    if (!virtualScroll || !itemHeight) return null;
    return calculateFixedContainerHeight(itemHeight, gap);
  }, [virtualScroll, itemHeight, gap]);

  // Вычисляем видимые элементы
  const visibleRange = useMemo(() => {
    if (!virtualScroll || !itemHeight) {
      return { start: 0, end: totalItems };
    }

    return calculateVisibleRange(scrollTop, fixedContainerHeight, itemHeight, gap, totalItems);
  }, [virtualScroll, itemHeight, fixedContainerHeight, scrollTop, totalItems, gap]);

  // Обработчик скролла
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // Рендерим видимые элементы
  const visibleChildren = useMemo(() => {
    if (!virtualScroll || !itemHeight) {
      return children;
    }

    return childrenArray.slice(visibleRange.start, visibleRange.end).map((child, index) => {
      const actualIndex = visibleRange.start + index;
      const topPosition = calculateItemPosition(actualIndex, itemHeight, gap);
      return (
        <div key={actualIndex} style={getVirtualScrollItemStyles(topPosition)}>
          {child}
        </div>
      );
    });
  }, [virtualScroll, childrenArray, visibleRange, itemHeight, gap, children]);

  // Общая высота контента - должна быть стабильной и не зависеть от видимого диапазона
  const totalHeight = useMemo(() => {
    if (!virtualScroll || !itemHeight) return undefined;
    return calculateTotalHeight(totalItems, itemHeight, gap);
  }, [virtualScroll, itemHeight, totalItems, gap]);

  // Сохраняем ref для внутреннего контейнера для принудительной установки высоты
  const innerContainerRef = useRef<HTMLDivElement>(null);

  // Принудительно устанавливаем высоту через useLayoutEffect для гарантии стабильности
  useLayoutEffect(() => {
    if (!virtualScroll || !innerContainerRef.current || totalHeight === undefined) return;

    const element = innerContainerRef.current;
    // Принудительно устанавливаем высоту через DOM API для гарантии стабильности
    element.style.setProperty('height', `${totalHeight}px`, 'important');
    element.style.setProperty('min-height', `${totalHeight}px`, 'important');
    element.style.setProperty('max-height', `${totalHeight}px`, 'important');
  }, [virtualScroll, totalHeight]);

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      <DropdownMenuWrapper
        ref={scrollContainerRef}
        className={clsx('ui-dropdown-menu', className)}
        $density={menuDensity}
        role="menu"
        onScroll={virtualScroll ? handleScroll : undefined}
        style={getVirtualScrollContainerStyles(fixedContainerHeight, itemHeight, gap)}
      >
        {virtualScroll && itemHeight && totalHeight !== undefined ? (
          <div ref={innerContainerRef} style={getVirtualScrollInnerContainerStyles(totalHeight)}>
            {visibleChildren}
          </div>
        ) : (
          children
        )}
      </DropdownMenuWrapper>
    </DropdownMenuContext.Provider>
  );
};

DropdownMenu.displayName = 'DropdownMenu';
