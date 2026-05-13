import type React from 'react';
import type { HintPositioningMode } from '../../../types/ui';
import { HintPosition, HintVisibilityTrigger } from '../../../types/ui';

/**
 * Ограничивает значение между min и max
 */
const clamp = (value: number, min: number, max: number): number => {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
};

/**
 * Опции для расчета позиции hint
 */
export interface CalculateHintPositionOptions {
  triggerElement: HTMLElement | null;
  hintElement?: HTMLElement | null;
  placement: HintPosition;
  offset?: number;
  mode?: HintPositioningMode;
  boundaryElement?: HTMLElement | string | null;
  boundaryOffset?: number;
}

/**
 * Вычисляет позицию hint относительно элемента с учетом режима позиционирования
 * @param options - опции для расчета позиции
 * @returns объект с координатами x и y
 */
export const calculateHintPosition = ({
  triggerElement,
  hintElement,
  placement,
  offset = 8,
  mode = 'default',
  boundaryElement,
  boundaryOffset = 8,
}: CalculateHintPositionOptions): { x: number; y: number; placement: HintPosition } => {
  if (!triggerElement) return { x: 0, y: 0, placement };

  // Получаем boundary элемент, если указан
  let boundary: HTMLElement | null = null;
  if (boundaryElement) {
    if (typeof boundaryElement === 'string') {
      boundary = triggerElement.ownerDocument?.querySelector(boundaryElement) ?? null;
    } else {
      boundary = boundaryElement;
    }
  }

  const triggerRect = triggerElement.getBoundingClientRect();
  const hintRect = hintElement?.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Базовое вычисление позиции (как в текущей реализации)
  let x = 0;
  let y = 0;
  let finalPlacement = placement;

  // Функция для вычисления базовой позиции по placement
  const getBasePosition = (pos: HintPosition) => {
    switch (pos) {
      case HintPosition.TOP:
        return {
          x: triggerRect.left + triggerRect.width / 2,
          y: triggerRect.top - offset,
        };
      case HintPosition.BOTTOM:
        return {
          x: triggerRect.left + triggerRect.width / 2,
          y: triggerRect.bottom + offset,
        };
      case HintPosition.LEFT:
        return {
          x: triggerRect.left - offset,
          y: triggerRect.top + triggerRect.height / 2,
        };
      case HintPosition.RIGHT:
        return {
          x: triggerRect.right + offset,
          y: triggerRect.top + triggerRect.height / 2,
        };
      case HintPosition.TOP_LEFT:
        return {
          x: triggerRect.left,
          y: triggerRect.top - offset,
        };
      case HintPosition.TOP_RIGHT:
        return {
          x: triggerRect.right,
          y: triggerRect.top - offset,
        };
      case HintPosition.BOTTOM_LEFT:
        return {
          x: triggerRect.left,
          y: triggerRect.bottom + offset,
        };
      case HintPosition.BOTTOM_RIGHT:
        return {
          x: triggerRect.right,
          y: triggerRect.bottom + offset,
        };
      default:
        return {
          x: triggerRect.left + triggerRect.width / 2,
          y: triggerRect.top - offset,
        };
    }
  };

  /**
   * Пока хинт не измерен — сдвигаем только центр TOP/BOTTOM, чтобы не уходить за край
   * (консервативная половина ширины; после измерения точнее).
   */
  if (!hintRect || hintRect.width === 0 || hintRect.height === 0) {
    const basePos = getBasePosition(placement);
    let preX = basePos.x;
    const preY = basePos.y;
    if (placement === HintPosition.TOP || placement === HintPosition.BOTTOM) {
      const guessHalfWidth = Math.min(160, Math.max(48, viewportWidth * 0.25));
      preX = clamp(preX, guessHalfWidth + offset, viewportWidth - guessHalfWidth - offset);
    }
    return { x: preX, y: preY, placement };
  }

  const hintWidth = hintRect.width;
  const hintHeight = hintRect.height;

  // Режим default: подгонка под viewport (у TOP/BOTTOM якорь — центр по X и translateX(-50%) в стилях)
  if (mode === 'default') {
    const basePos = getBasePosition(placement);
    let fitX = basePos.x;
    let fitY = basePos.y;
    if (placement === HintPosition.TOP || placement === HintPosition.BOTTOM) {
      fitX = clamp(fitX, hintWidth / 2 + offset, viewportWidth - hintWidth / 2 - offset);
    }
    if (placement === HintPosition.TOP_LEFT || placement === HintPosition.BOTTOM_LEFT) {
      fitX = clamp(fitX, offset, viewportWidth - hintWidth - offset);
    }
    if (placement === HintPosition.TOP_RIGHT || placement === HintPosition.BOTTOM_RIGHT) {
      fitX = clamp(fitX, hintWidth + offset, viewportWidth - offset);
    }
    if (placement === HintPosition.LEFT || placement === HintPosition.RIGHT) {
      fitY = clamp(fitY, hintHeight / 2 + offset, viewportHeight - hintHeight / 2 - offset);
    }
    return { x: fitX, y: fitY, placement };
  }

  // Вычисляем доступное пространство
  const spaceAbove = triggerRect.top;
  const spaceBelow = viewportHeight - triggerRect.bottom;
  const spaceLeft = triggerRect.left;
  const spaceRight = viewportWidth - triggerRect.right;

  // Базовое позиционирование
  const basePos = getBasePosition(placement);
  x = basePos.x;
  y = basePos.y;

  // Режим autoFlip: автоматически переворачивать при недостатке места
  if (mode === 'autoFlip') {
    // Проверяем вертикальное переворачивание (TOP ↔ BOTTOM)
    if (
      placement === HintPosition.TOP ||
      placement === HintPosition.TOP_LEFT ||
      placement === HintPosition.TOP_RIGHT
    ) {
      if (spaceAbove < hintHeight + offset && spaceBelow >= hintHeight + offset) {
        // Переворачиваем вниз
        if (placement === HintPosition.TOP) {
          finalPlacement = HintPosition.BOTTOM;
          x = triggerRect.left + triggerRect.width / 2;
          y = triggerRect.bottom + offset;
        } else if (placement === HintPosition.TOP_LEFT) {
          finalPlacement = HintPosition.BOTTOM_LEFT;
          x = triggerRect.left;
          y = triggerRect.bottom + offset;
        } else if (placement === HintPosition.TOP_RIGHT) {
          finalPlacement = HintPosition.BOTTOM_RIGHT;
          x = triggerRect.right;
          y = triggerRect.bottom + offset;
        }
      }
    } else if (
      placement === HintPosition.BOTTOM ||
      placement === HintPosition.BOTTOM_LEFT ||
      placement === HintPosition.BOTTOM_RIGHT
    ) {
      if (spaceBelow < hintHeight + offset && spaceAbove >= hintHeight + offset) {
        // Переворачиваем вверх
        if (placement === HintPosition.BOTTOM) {
          finalPlacement = HintPosition.TOP;
          x = triggerRect.left + triggerRect.width / 2;
          y = triggerRect.top - offset;
        } else if (placement === HintPosition.BOTTOM_LEFT) {
          finalPlacement = HintPosition.TOP_LEFT;
          x = triggerRect.left;
          y = triggerRect.top - offset;
        } else if (placement === HintPosition.BOTTOM_RIGHT) {
          finalPlacement = HintPosition.TOP_RIGHT;
          x = triggerRect.right;
          y = triggerRect.top - offset;
        }
      }
    }

    // Проверяем горизонтальное переворачивание (LEFT ↔ RIGHT)
    if (placement === HintPosition.LEFT) {
      if (spaceLeft < hintWidth + offset && spaceRight >= hintWidth + offset) {
        finalPlacement = HintPosition.RIGHT;
        x = triggerRect.right + offset;
        y = triggerRect.top + triggerRect.height / 2;
      }
    } else if (placement === HintPosition.RIGHT) {
      if (spaceRight < hintWidth + offset && spaceLeft >= hintWidth + offset) {
        finalPlacement = HintPosition.LEFT;
        x = triggerRect.left - offset;
        y = triggerRect.top + triggerRect.height / 2;
      }
    }
  }

  // Режим autoFit: автоматически подстраивать позицию, чтобы не выходить за границы
  if (mode === 'autoFit') {
    // Для TOP/BOTTOM позиций корректируем по горизонтали
    if (finalPlacement === HintPosition.TOP || finalPlacement === HintPosition.BOTTOM) {
      // Проверяем, не выходит ли hint за правую границу
      if (x + hintWidth / 2 > viewportWidth) {
        x = clamp(
          viewportWidth - hintWidth / 2 - offset,
          hintWidth / 2 + offset,
          viewportWidth - hintWidth / 2,
        );
      }
      // Проверяем, не выходит ли hint за левую границу
      if (x - hintWidth / 2 < 0) {
        x = clamp(hintWidth / 2 + offset, hintWidth / 2 + offset, viewportWidth - hintWidth / 2);
      }
    }

    // Для LEFT/RIGHT позиций корректируем по вертикали
    if (finalPlacement === HintPosition.LEFT || finalPlacement === HintPosition.RIGHT) {
      // Проверяем, не выходит ли hint за нижнюю границу
      if (y + hintHeight / 2 > viewportHeight) {
        y = clamp(
          viewportHeight - hintHeight / 2 - offset,
          hintHeight / 2 + offset,
          viewportHeight - hintHeight / 2,
        );
      }
      // Проверяем, не выходит ли hint за верхнюю границу
      if (y - hintHeight / 2 < 0) {
        y = clamp(
          hintHeight / 2 + offset,
          hintHeight / 2 + offset,
          viewportHeight - hintHeight / 2,
        );
      }
    }

    // Для угловых позиций корректируем обе координаты
    if (
      finalPlacement === HintPosition.TOP_LEFT ||
      finalPlacement === HintPosition.TOP_RIGHT ||
      finalPlacement === HintPosition.BOTTOM_LEFT ||
      finalPlacement === HintPosition.BOTTOM_RIGHT
    ) {
      // Корректируем по горизонтали
      if (x + hintWidth > viewportWidth) {
        x = clamp(viewportWidth - hintWidth - offset, offset, viewportWidth - hintWidth);
      }
      if (x < 0) {
        x = clamp(offset, offset, viewportWidth - hintWidth);
      }

      // Корректируем по вертикали
      if (y + hintHeight > viewportHeight) {
        y = clamp(viewportHeight - hintHeight - offset, offset, viewportHeight - hintHeight);
      }
      if (y < 0) {
        y = clamp(offset, offset, viewportHeight - hintHeight);
      }
    }

    // Дополнительно: если hint все еще выходит за границы, пытаемся перевернуть
    if (
      finalPlacement === HintPosition.TOP &&
      y - hintHeight < 0 &&
      spaceBelow >= hintHeight + offset
    ) {
      finalPlacement = HintPosition.BOTTOM;
      x = triggerRect.left + triggerRect.width / 2;
      y = triggerRect.bottom + offset;
    } else if (
      finalPlacement === HintPosition.BOTTOM &&
      y + hintHeight > viewportHeight &&
      spaceAbove >= hintHeight + offset
    ) {
      finalPlacement = HintPosition.TOP;
      x = triggerRect.left + triggerRect.width / 2;
      y = triggerRect.top - offset;
    } else if (
      finalPlacement === HintPosition.LEFT &&
      x - hintWidth < 0 &&
      spaceRight >= hintWidth + offset
    ) {
      finalPlacement = HintPosition.RIGHT;
      x = triggerRect.right + offset;
      y = triggerRect.top + triggerRect.height / 2;
    } else if (
      finalPlacement === HintPosition.RIGHT &&
      x + hintWidth > viewportWidth &&
      spaceLeft >= hintWidth + offset
    ) {
      finalPlacement = HintPosition.LEFT;
      x = triggerRect.left - offset;
      y = triggerRect.top + triggerRect.height / 2;
    }
  }

  // Обработка boundary элемента
  if (boundary && hintRect) {
    const boundaryRect = boundary.getBoundingClientRect();
    const boundaryStyle = window.getComputedStyle(boundary);
    const boundaryPaddingTop = parseFloat(boundaryStyle.paddingTop) || 0;
    const boundaryPaddingRight = parseFloat(boundaryStyle.paddingRight) || 0;
    const boundaryPaddingBottom = parseFloat(boundaryStyle.paddingBottom) || 0;
    const boundaryPaddingLeft = parseFloat(boundaryStyle.paddingLeft) || 0;

    // Корректируем позицию относительно boundary
    const minX = boundaryRect.left + boundaryPaddingLeft + boundaryOffset;
    const maxX = boundaryRect.right - boundaryPaddingRight - boundaryOffset - hintRect.width;
    const minY = boundaryRect.top + boundaryPaddingTop + boundaryOffset;
    const maxY = boundaryRect.bottom - boundaryPaddingBottom - boundaryOffset - hintRect.height;

    x = clamp(x, minX, maxX);
    y = clamp(y, minY, maxY);
  }

  return { x, y, placement: finalPlacement };
};

/**
 * Опции для создания обработчиков событий hint
 */
export interface CreateHintEventHandlersOptions {
  visibilityTrigger: HintVisibilityTrigger;
  useControlledMode: boolean;
  isOpenValue?: boolean;
  hintStateIsVisible: boolean;
  showHint: () => void;
  hideHint: () => void;
  hideTimeoutRef: React.MutableRefObject<NodeJS.Timeout | undefined>;
}

/**
 * Создает обработчики событий для trigger элемента
 */
export const createHintEventHandlers = ({
  visibilityTrigger,
  useControlledMode,
  isOpenValue,
  hintStateIsVisible,
  showHint,
  hideHint,
  hideTimeoutRef,
}: CreateHintEventHandlersOptions) => {
  const isVisible =
    useControlledMode && isOpenValue !== undefined ? isOpenValue : hintStateIsVisible;

  return {
    handleMouseEnter: () => {
      if (visibilityTrigger === HintVisibilityTrigger.HOVER) {
        // Отменяем скрытие при наведении на триггер
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
        showHint();
      }
    },
    handleMouseLeave: () => {
      if (visibilityTrigger === HintVisibilityTrigger.HOVER) {
        hideHint();
      }
    },
    handleFocus: () => {
      if (visibilityTrigger === HintVisibilityTrigger.HOVER) {
        showHint();
      }
    },
    handleBlur: () => {
      if (visibilityTrigger === HintVisibilityTrigger.HOVER) {
        hideHint();
      }
    },
    handleClick: (event: React.MouseEvent) => {
      if (visibilityTrigger === HintVisibilityTrigger.CLICK) {
        event.stopPropagation();
        if (isVisible) {
          hideHint();
        } else {
          showHint();
        }
      }
    },
    handleKeyDown: (event: React.KeyboardEvent) => {
      if (visibilityTrigger === HintVisibilityTrigger.CLICK) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          event.stopPropagation();
          if (isVisible) {
            hideHint();
          } else {
            showHint();
          }
        } else if (event.key === 'Escape' && isVisible) {
          event.preventDefault();
          event.stopPropagation();
          hideHint();
        }
      }
    },
    handleCloseClick: (event: React.MouseEvent) => {
      event.stopPropagation();
      hideHint();
    },
    handleHintMouseEnter: () => {
      if (visibilityTrigger === HintVisibilityTrigger.HOVER) {
        // Отменяем скрытие хинта при наведении на него
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
      }
    },
    handleHintMouseLeave: () => {
      if (visibilityTrigger === HintVisibilityTrigger.HOVER) {
        hideHint();
      }
    },
  };
};

/**
 * Опции для создания обработчика клика вне hint
 */
export interface CreateClickOutsideHandlerOptions {
  triggerRef: React.RefObject<HTMLDivElement>;
  hintContentRef: React.RefObject<HTMLDivElement>;
  hideHint: () => void;
}

/**
 * Создает обработчик клика вне hint и target элемента
 */
export const createClickOutsideHandler = ({
  triggerRef,
  hintContentRef,
  hideHint,
}: CreateClickOutsideHandlerOptions) => {
  return (event: MouseEvent | TouchEvent) => {
    const target = event.target as Node;
    const isClickInsideTrigger = triggerRef.current?.contains(target);
    const isClickInsideHint = hintContentRef.current?.contains(target);

    if (!isClickInsideTrigger && !isClickInsideHint) {
      hideHint();
    }
  };
};

/**
 * Опции для создания обработчика прокрутки
 */
export interface CreateScrollHandlerOptions {
  closeOnScroll: boolean;
  updatePosition: () => void;
  hideHint: () => void;
  scrollableParents: HTMLElement[];
}

/**
 * Создает обработчик прокрутки для hint
 */
export const createScrollHandler = ({
  closeOnScroll,
  updatePosition,
  hideHint,
  scrollableParents: _scrollableParents,
}: CreateScrollHandlerOptions) => {
  return () => {
    if (closeOnScroll) {
      hideHint();
    } else {
      updatePosition();
    }
  };
};

/**
 * Находит все прокручиваемые родительские элементы
 */
export const findScrollableParents = (element: HTMLElement | null): HTMLElement[] => {
  const scrollableParents: HTMLElement[] = [];
  let current: HTMLElement | null = element;

  while (current && current !== document.body) {
    const overflow = window.getComputedStyle(current).overflow;
    if (overflow === 'auto' || overflow === 'scroll' || overflow === 'overlay') {
      scrollableParents.push(current);
    }
    current = current.parentElement;
  }

  // Добавляем window как прокручиваемый элемент
  scrollableParents.push(document.body);

  return scrollableParents;
};

/**
 * Интерфейс состояния hint
 */
export interface HintState {
  isVisible: boolean;
  position: { x: number; y: number };
  placement: HintPosition;
}

/**
 * Опции для создания функции showHint
 */
export interface CreateShowHintOptions {
  useControlledMode: boolean;
  handleOpenChange: (newIsOpen: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
  calculatePosition: () => { x: number; y: number; placement: HintPosition };
  setHintState: React.Dispatch<React.SetStateAction<HintState>>;
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | undefined>;
  isVisibleRef: React.MutableRefObject<boolean>;
  visibilityTrigger: HintVisibilityTrigger;
  delay: number;
  onVisibilityChange?: (visible: boolean) => void;
  hintGroup?: string;
}

/**
 * Создает функцию для показа hint
 */
export const createShowHint = ({
  useControlledMode,
  handleOpenChange,
  triggerRef,
  calculatePosition,
  setHintState,
  timeoutRef,
  isVisibleRef,
  visibilityTrigger,
  delay,
  onVisibilityChange,
  hintGroup,
}: CreateShowHintOptions) => {
  return () => {
    // В контролируемом/неконтролируемом режиме вызываем handleOpenChange
    if (useControlledMode) {
      handleOpenChange(true);
      return;
    }

    // Обычный режим (через hover/click)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Проверяем, что trigger элемент существует
    if (!triggerRef.current) {
      return;
    }

    // Закрываем другие hints в той же группе
    if (hintGroup) {
      closeOtherHintsInGroup(hintGroup);
    }

    // Вычисляем позицию сразу, чтобы избежать визуального "прыжка"
    const positionResult = calculatePosition();

    // Устанавливаем позицию сразу, но делаем элемент невидимым
    setHintState((prev) => {
      // Если hint уже видим, не меняем состояние
      if (prev.isVisible) {
        return prev;
      }
      return {
        isVisible: false,
        position: { x: positionResult.x, y: positionResult.y },
        placement: positionResult.placement,
      };
    });

    // Для click режима показываем сразу, для hover - после задержки
    const showDelay = visibilityTrigger === HintVisibilityTrigger.CLICK ? 0 : delay;

    // Показываем элемент после задержки
    timeoutRef.current = setTimeout(() => {
      // Проверяем, что hint еще не видим (на случай отмены)
      const shouldShow = !isVisibleRef.current;
      if (shouldShow) {
        setHintState((prev) => {
          if (prev.isVisible) {
            return prev;
          }
          return {
            ...prev,
            isVisible: true,
          };
        });
        // Обновляем ref и вызываем колбек асинхронно, после обновления состояния
        isVisibleRef.current = true;
        setTimeout(() => {
          onVisibilityChange?.(true);
        }, 0);
      }
    }, showDelay);
  };
};

/**
 * Опции для создания функции hideHint
 */
export interface CreateHideHintOptions {
  useControlledMode: boolean;
  handleOpenChange: (newIsOpen: boolean) => void;
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | undefined>;
  hideTimeoutRef: React.MutableRefObject<NodeJS.Timeout | undefined>;
  setHintState: React.Dispatch<React.SetStateAction<HintState>>;
  isVisibleRef: React.MutableRefObject<boolean>;
  onVisibilityChange?: (visible: boolean) => void;
}

/**
 * Создает функцию для скрытия hint
 */
export const createHideHint = ({
  useControlledMode,
  handleOpenChange,
  timeoutRef,
  hideTimeoutRef,
  setHintState,
  isVisibleRef,
  onVisibilityChange,
}: CreateHideHintOptions) => {
  return () => {
    // В контролируемом/неконтролируемом режиме вызываем handleOpenChange
    if (useControlledMode) {
      handleOpenChange(false);
      return;
    }

    // Обычный режим (через hover/click)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    // Добавляем небольшую задержку для скрытия, чтобы избежать мерцания
    hideTimeoutRef.current = setTimeout(() => {
      const wasVisible = isVisibleRef.current;
      setHintState((prev) => {
        return { ...prev, isVisible: false };
      });
      // Вызываем колбек только если hint был видим, асинхронно после обновления состояния
      if (wasVisible) {
        isVisibleRef.current = false;
        setTimeout(() => {
          onVisibilityChange?.(false);
        }, 0);
      }
    }, 100);
  };
};

/**
 * Закрывает другие hints в той же группе
 */
export const closeOtherHintsInGroup = (hintGroup: string) => {
  const otherHints = document.querySelectorAll(`[data-hint-group="${hintGroup}"]`);
  otherHints.forEach((hint) => {
    // Устанавливаем aria-hidden для скрытия других hints
    hint.setAttribute('aria-hidden', 'true');
    // Можно также добавить событие для закрытия, если нужно
    const event = new CustomEvent('hint:close', { bubbles: true });
    hint.dispatchEvent(event);
  });
};

/**
 * Опции для создания функции обновления позиции
 */
export interface CreateUpdatePositionOptions {
  triggerRef: React.RefObject<HTMLDivElement>;
  calculatePosition: () => { x: number; y: number; placement: HintPosition };
  setHintState: React.Dispatch<React.SetStateAction<HintState>>;
}

/**
 * Создает функцию для обновления позиции hint
 */
export const createUpdatePosition = ({
  triggerRef,
  calculatePosition,
  setHintState,
}: CreateUpdatePositionOptions) => {
  return () => {
    // Проверяем, что trigger элемент существует
    if (!triggerRef.current) return;
    const positionResult = calculatePosition();
    setHintState((prev) => ({
      ...prev,
      position: { x: positionResult.x, y: positionResult.y },
      placement: positionResult.placement,
    }));
  };
};

/**
 * Опции для синхронизации состояния в контролируемом режиме
 */
export interface SyncControlledStateOptions {
  isOpenValue: boolean;
  useControlledMode: boolean;
  triggerRef: React.RefObject<HTMLDivElement>;
  calculatePosition: () => { x: number; y: number; placement: HintPosition };
  setHintState: React.Dispatch<React.SetStateAction<HintState>>;
  isVisibleRef: React.MutableRefObject<boolean>;
  onVisibilityChange?: (visible: boolean) => void;
}

/**
 * Синхронизирует состояние hint в контролируемом режиме
 */
export const syncControlledState = ({
  isOpenValue,
  useControlledMode,
  triggerRef,
  calculatePosition,
  setHintState,
  isVisibleRef,
  onVisibilityChange,
}: SyncControlledStateOptions) => {
  if (!useControlledMode || isOpenValue === undefined) return;

  // Проверяем, что trigger элемент существует
  if (!triggerRef.current) return;

  // Вычисляем позицию при изменении isOpen
  const positionResult = calculatePosition();

  // Используем setTimeout для асинхронного обновления состояния
  setTimeout(() => {
    setHintState((prev) => ({
      ...prev,
      isVisible: isOpenValue,
      position: { x: positionResult.x, y: positionResult.y },
      placement: positionResult.placement,
    }));

    // Обновляем isVisibleRef для корректной работы onVisibilityChange
    if (isOpenValue && !isVisibleRef.current) {
      isVisibleRef.current = true;
      onVisibilityChange?.(true);
    } else if (!isOpenValue && isVisibleRef.current) {
      isVisibleRef.current = false;
      onVisibilityChange?.(false);
    }
  }, 0);
};
