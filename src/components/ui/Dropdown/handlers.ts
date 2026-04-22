import type { DropdownTheme } from '../../../types/theme';
import type { Size } from '../../../types/sizes';
import { getDropdownItemStyles } from '../../../handlers/dropdownThemeHandlers';
import type React from 'react';
import type { DropdownPositioningMode, DropdownVirtualScrollConfig } from '../../../types/ui';

/**
 * Вычисляет высоту элемента dropdown из темы
 * @param theme - тема dropdown
 * @param size - размер dropdown
 * @returns высота элемента в пикселях
 */
export const calculateItemHeightFromTheme = (theme: DropdownTheme, size: Size): number => {
  const styles = getDropdownItemStyles(theme, size);
  // padding может быть в формате "6px 16px" (вертикальный горизонтальный) или "6px"
  const paddingMatch = styles.padding.match(/(\d+)px(?:\s+(\d+)px)?/);
  const paddingVertical = paddingMatch ? parseFloat(paddingMatch[1]) : 6;
  // Если padding в формате "6px 16px", то вертикальный padding = 6px, иначе используем то же значение
  const paddingTop = paddingVertical;
  const paddingBottom = paddingVertical;
  const lineHeightMatch = styles.lineHeight.match(/(\d+\.?\d*)/);
  const lineHeight = lineHeightMatch ? parseFloat(lineHeightMatch[1]) : 1.6;
  const fontSizeMatch = styles.fontSize.match(/(\d+)px/);
  const fontSize = fontSizeMatch ? parseFloat(fontSizeMatch[1]) : 14;

  // Высота элемента = padding-top + padding-bottom + (fontSize * lineHeight)
  // gap НЕ включаем в высоту элемента, так как при абсолютном позиционировании
  // gap не применяется автоматически, и мы должны учитывать его в позиционировании
  const calculatedHeight = paddingTop + paddingBottom + fontSize * lineHeight;
  return Math.ceil(calculatedHeight);
};

/**
 * Получает gap между элементами из темы
 * @param theme - тема dropdown
 * @param size - размер dropdown
 * @returns gap в пикселях
 */
export const getGapFromTheme = (theme: DropdownTheme, size: Size): number => {
  const styles = getDropdownItemStyles(theme, size);
  const gapMatch = styles.gap?.match(/(\d+)px/);
  return gapMatch ? parseFloat(gapMatch[1]) : 4;
};

/**
 * Вычисляет фиксированную высоту контейнера на основе maxHeight
 * @param itemHeight - высота одного элемента
 * @param gap - gap между элементами
 * @returns фиксированная высота контейнера для 8 элементов
 */
export const calculateFixedContainerHeight = (itemHeight: number, gap: number): number => {
  const itemHeightWithGap = itemHeight + gap;
  return itemHeightWithGap * 8;
};

/**
 * Вычисляет видимый диапазон элементов для виртуального скролла
 * @param scrollTop - текущая позиция скролла
 * @param containerHeight - высота контейнера
 * @param itemHeight - высота одного элемента
 * @param gap - gap между элементами
 * @param totalItems - общее количество элементов
 * @returns объект с начальным и конечным индексами видимых элементов
 */
export const calculateVisibleRange = (
  scrollTop: number,
  containerHeight: number | null,
  itemHeight: number,
  gap: number,
  totalItems: number,
): { start: number; end: number } => {
  const itemHeightWithGap = itemHeight + gap;
  const effectiveHeight = containerHeight || itemHeightWithGap * 8;

  // Учитываем gap при расчете индекса начала
  const startIndex = Math.floor(scrollTop / itemHeightWithGap);
  const visibleCount = Math.ceil(effectiveHeight / itemHeightWithGap);
  // Добавляем буфер сверху и снизу для плавного скролла (по 2 элемента с каждой стороны)
  const buffer = 2;
  const endIndex = Math.min(startIndex + visibleCount + buffer, totalItems);

  return {
    start: Math.max(0, startIndex - buffer), // Буфер сверху
    end: endIndex,
  };
};

/**
 * Вычисляет общую высоту контента для виртуального скролла
 * @param totalItems - общее количество элементов
 * @param itemHeight - высота одного элемента
 * @param gap - gap между элементами
 * @returns общая высота контента в пикселях
 */
export const calculateTotalHeight = (
  totalItems: number,
  itemHeight: number,
  gap: number,
): number => {
  if (totalItems === 0) return 0;
  const itemHeightWithGap = itemHeight + gap;
  // Учитываем gap между элементами: (n элементов) * (высота + gap) - gap (последний элемент не имеет gap снизу)
  return totalItems * itemHeightWithGap - gap;
};

/**
 * Определяет, выбран ли элемент в режиме multiSelection
 * @param multiSelection - включен ли режим множественного выбора
 * @param propSelected - явно заданное состояние выбранности из пропсов
 * @param selectedValue - значение выбранного элемента из контекста (может быть массивом)
 * @param value - значение текущего элемента
 * @returns true, если элемент выбран
 */
export const isSelectedInMultiSelection = (
  multiSelection: boolean | undefined,
  propSelected: boolean | undefined,
  selectedValue: unknown,
  value: unknown,
): boolean => {
  if (!multiSelection) return false;
  if (propSelected !== undefined) return propSelected;
  if (Array.isArray(selectedValue)) {
    return selectedValue.includes(value);
  }
  return false;
};

/**
 * Определяет финальное состояние элемента меню
 * @param disableSelectedOptionHighlight - отключена ли подсветка выбранной опции
 * @param state - явно заданное состояние из пропсов
 * @param multiSelection - включен ли режим множественного выбора
 * @param selectedValue - значение выбранного элемента из контекста
 * @param value - значение текущего элемента
 * @returns финальное состояние элемента или undefined
 */
export const calculateMenuItemState = (
  disableSelectedOptionHighlight: boolean | undefined,
  state: 'hover' | 'active' | 'disabled' | 'selected' | 'focus' | undefined,
  multiSelection: boolean | undefined,
  selectedValue: unknown,
  value: unknown,
): 'hover' | 'active' | 'disabled' | 'selected' | 'focus' | undefined => {
  if (disableSelectedOptionHighlight) {
    return undefined;
  }

  // Если state задан явно, используем его
  if (state) {
    return state;
  }

  // В режиме multiSelection проверяем, выбран ли элемент через массив
  if (multiSelection) {
    if (Array.isArray(selectedValue) && selectedValue.includes(value)) {
      return 'selected';
    }
    return undefined;
  }

  // В обычном режиме проверяем равенство значения
  if (selectedValue !== undefined && value === selectedValue) {
    return 'selected';
  }

  return undefined;
};

/**
 * Вычисляет позицию элемента в виртуальном скролле
 * @param index - индекс элемента
 * @param itemHeight - высота одного элемента
 * @param gap - gap между элементами
 * @returns позиция top в пикселях
 */
export const calculateItemPosition = (index: number, itemHeight: number, gap: number): number => {
  return index * (itemHeight + gap);
};

/**
 * Создает стили для контейнера виртуального скролла
 * @param fixedContainerHeight - фиксированная высота контейнера
 * @param itemHeight - высота одного элемента
 * @param gap - gap между элементами
 * @returns объект со стилями для контейнера
 */
export const getVirtualScrollContainerStyles = (
  fixedContainerHeight: number | null,
  itemHeight: number | null,
  gap: number,
): React.CSSProperties | undefined => {
  if (!fixedContainerHeight && !itemHeight) return undefined;

  if (fixedContainerHeight) {
    return {
      overflowY: 'auto',
      overflowX: 'hidden',
      height: `${fixedContainerHeight}px`,
      position: 'relative',
    };
  }

  if (itemHeight) {
    return {
      overflowY: 'auto',
      overflowX: 'hidden',
      maxHeight: `${(itemHeight + gap) * 8}px`,
      position: 'relative',
    };
  }

  return undefined;
};

/**
 * Создает стили для внутреннего контейнера виртуального скролла
 * @param totalHeight - общая высота контента
 * @returns объект со стилями для внутреннего контейнера
 */
export const getVirtualScrollInnerContainerStyles = (totalHeight: number): React.CSSProperties => {
  return {
    height: `${totalHeight}px`,
    minHeight: `${totalHeight}px`,
    maxHeight: `${totalHeight}px`,
    position: 'relative',
    boxSizing: 'border-box',
    contain: 'layout size',
  };
};

/**
 * Вычисляет позицию dropdown относительно элемента
 * @param element - элемент, относительно которого позиционируется dropdown
 * @param offset - отступ от элемента (по умолчанию 4px)
 * @returns объект с координатами x и y
 */
const clamp = (value: number, min: number, max: number): number => {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
};

export interface CalculateDropdownPositionOptions {
  triggerElement: HTMLElement | null;
  menuElement?: HTMLElement | null;
  boundaryElement?: HTMLElement | null;
  offset?: number;
  mode?: DropdownPositioningMode;
}

export const calculateDropdownPosition = ({
  triggerElement,
  menuElement,
  boundaryElement,
  offset = 4,
  mode = 'default',
}: CalculateDropdownPositionOptions): { x: number; y: number } => {
  if (!triggerElement) return { x: 0, y: 0 };

  const triggerRect = triggerElement.getBoundingClientRect();
  const menuRect = menuElement?.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let x = triggerRect.left;
  let y = triggerRect.bottom + offset;

  if (!menuRect || mode === 'default') {
    return { x, y };
  }

  const menuHeight = menuRect.height;
  const menuWidth = menuRect.width;
  const spaceBelow = viewportHeight - triggerRect.bottom;
  const spaceAbove = triggerRect.top;

  const shouldFlipVertically =
    menuHeight > 0 &&
    spaceBelow < menuHeight + offset &&
    (mode === 'autoFit' || spaceAbove >= menuHeight + offset || spaceAbove > spaceBelow);

  if (shouldFlipVertically) {
    y = clamp(triggerRect.top - menuHeight - offset, offset, viewportHeight - menuHeight - offset);
  } else if (triggerRect.bottom + menuHeight + offset > viewportHeight) {
    y = clamp(viewportHeight - menuHeight - offset, offset, triggerRect.bottom + offset);
  }

  if (mode === 'autoFit' && menuWidth > 0) {
    const maxX = viewportWidth - menuWidth - offset;
    if (triggerRect.left + menuWidth > viewportWidth) {
      x = clamp(maxX, offset, triggerRect.right - menuWidth);
    }
    if (x < offset) {
      x = offset;
    }
  }

  if (boundaryElement) {
    const boundaryRect = boundaryElement.getBoundingClientRect();
    x -= boundaryRect.left;
    y -= boundaryRect.top;
    x = clamp(x, 0, (boundaryElement.clientWidth || viewportWidth) - (menuRect?.width ?? 0));
    y = clamp(y, 0, (boundaryElement.clientHeight || viewportHeight) - (menuRect?.height ?? 0));
  }

  return { x, y };
};

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const getFocusableElements = (container: HTMLElement | null): HTMLElement[] => {
  if (!container) return [];
  const elements = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)).filter(
    element => {
      const isHidden = element.offsetParent === null && element !== document.activeElement;
      const isAriaDisabled = element.getAttribute('aria-disabled') === 'true';
      return !isHidden && !isAriaDisabled;
    },
  );
  return elements;
};

export const getFocusableElementIndex = (
  elements: HTMLElement[],
  target: Element | null,
): number => {
  if (!target) return 0;
  const index = elements.findIndex(element => element === target);
  return index === -1 ? 0 : index;
};

/**
 * Нормализует значение для dropdown
 * В режиме multiSelection всегда возвращает массив
 * @param value - значение из пропсов
 * @param multiSelection - включен ли режим множественного выбора
 * @returns нормализованное значение (массив в multiSelection, иначе исходное значение)
 */
export const normalizeDropdownValue = <T>(
  value: T | T[] | undefined,
  multiSelection: boolean,
): T | T[] | undefined => {
  if (multiSelection) {
    // Если multiSelection включен, но value не массив, возвращаем пустой массив
    if (!Array.isArray(value)) {
      return [] as T[];
    }
    return value;
  }
  return value;
};

/**
 * Создает ключ для элемента меню
 * @param item - элемент меню (`value` и/или `label` для ключа; `label` нестрокового типа не используется как ключ)
 * @param index - индекс элемента
 * @returns ключ для React
 */
export const getMenuItemKey = (
  item: { value?: unknown; label?: React.ReactNode },
  index: number,
): React.Key => {
  if (item.value !== undefined && item.value !== null) {
    return item.value as React.Key;
  }
  if (typeof item.label === 'string' || typeof item.label === 'number') {
    return item.label;
  }
  return index;
};

/**
 * Проверяет, был ли клик внутри dropdown (триггер или меню)
 * @param event - событие клика
 * @param triggerRef - ref триггера
 * @param menuRef - ref меню
 * @returns true, если клик был внутри dropdown
 */
export const isClickInsideDropdown = (
  event: MouseEvent,
  triggerRef: React.RefObject<HTMLElement>,
  menuRef: React.RefObject<HTMLElement>,
): boolean => {
  const target = event.target as Node;
  const isClickInsideTrigger = triggerRef.current && triggerRef.current.contains(target);
  const isClickInsideMenu = menuRef.current && menuRef.current.contains(target);
  return Boolean(isClickInsideTrigger || isClickInsideMenu);
};

/**
 * Обрабатывает клик вне dropdown компонента
 * Проверяет, был ли клик вне компонента, и вызывает обработчик onClickOutside если он передан
 * @param event - событие клика
 * @param triggerRef - ref триггера
 * @param menuRef - ref меню
 * @param onClickOutside - обработчик клика вне компонента
 * @returns true, если клик был вне компонента
 */
export const handleClickOutsideEvent = (
  event: MouseEvent,
  triggerRef: React.RefObject<HTMLElement>,
  menuRef: React.RefObject<HTMLElement>,
  onClickOutside?: (event: Event) => void,
): boolean => {
  const isOutside = !isClickInsideDropdown(event, triggerRef, menuRef);

  if (isOutside && onClickOutside) {
    onClickOutside(event);
  }

  return isOutside;
};

/**
 * Находит все прокручиваемые родительские элементы
 * @param element - начальный элемент
 * @returns массив прокручиваемых элементов (Window, Document, HTMLElement)
 */
export const findScrollableParents = (
  element: HTMLElement | null,
): (Window | Document | HTMLElement)[] => {
  const scrollableElements: (Window | Document | HTMLElement)[] = [window, document];
  let parent: HTMLElement | null = element?.parentElement || null;

  while (parent) {
    const overflow = window.getComputedStyle(parent).overflow;
    if (overflow === 'auto' || overflow === 'scroll' || overflow === 'overlay') {
      scrollableElements.push(parent);
    }
    parent = parent.parentElement;
  }

  return scrollableElements;
};

/**
 * Удаляет обработчики скролла со всех прокручиваемых элементов
 * @param scrollableElements - массив прокручиваемых элементов
 * @param handleScroll - обработчик скролла
 */
export const removeScrollListeners = (
  scrollableElements: (Window | Document | HTMLElement)[],
  handleScroll: () => void,
): void => {
  scrollableElements.forEach(element => {
    if (element === window) {
      window.removeEventListener('scroll', handleScroll, true);
    } else if (element === document) {
      document.removeEventListener('scroll', handleScroll, true);
    } else {
      (element as HTMLElement).removeEventListener('scroll', handleScroll, true);
    }
  });
};

/**
 * Вычисляет высоту элемента для виртуального скролла
 * @param virtualScroll - конфигурация виртуального скролла
 * @param theme - тема dropdown
 * @param size - размер dropdown
 * @returns высота элемента в пикселях или null, если виртуальный скролл не включен
 */
export const calculateVirtualScrollItemHeight = (
  virtualScroll: DropdownVirtualScrollConfig | undefined,
  theme: DropdownTheme,
  size: Size,
): number | null => {
  if (!virtualScroll) return null;

  if (virtualScroll.itemHeight === 'auto') {
    return calculateItemHeightFromTheme(theme, size);
  }

  return virtualScroll.itemHeight;
};

/**
 * Создает стили для позиционирования видимого элемента в виртуальном скролле
 * @param topPosition - позиция top в пикселях
 * @returns объект со стилями для элемента
 */
export const getVirtualScrollItemStyles = (topPosition: number): React.CSSProperties => {
  return {
    position: 'absolute',
    top: topPosition,
    width: '100%',
    left: 0,
    right: 0,
  };
};
