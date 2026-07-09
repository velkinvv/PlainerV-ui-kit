import { Size } from '../../../types/sizes';
import type { ChipsSelectionMode } from '../../../types/ui';

/** Геометрия чипа по размеру */
export type ChipGeometry = {
  /** Внутренние отступы (без учёта кнопки close) */
  padding: string;
  /** Отступ справа, когда есть кнопка удаления */
  paddingWithClose: string;
  /** Зазор между слотами */
  gap: string;
  /** Размер шрифта */
  fontSize: string;
  /** Минимальная высота */
  minHeight: string;
  /** Размер кнопки удаления, px */
  closeButtonSize: number;
};

/**
 * Возвращает геометрию `Chip` по размеру.
 * @param size - Размер из дизайн-системы (`SM` / `MD`; остальные трактуются как ближайшие)
 */
export const getChipGeometry = (size: Size = Size.SM): ChipGeometry => {
  switch (size) {
    case Size.MD:
    case Size.LG:
    case Size.XL:
      return {
        padding: '4px 12px',
        paddingWithClose: '4px 4px 4px 12px',
        gap: '6px',
        fontSize: '13px',
        minHeight: '28px',
        closeButtonSize: 20,
      };
    case Size.XS:
    case Size.SM:
    default:
      return {
        padding: '2px 8px',
        paddingWithClose: '2px 4px 2px 8px',
        gap: '4px',
        fontSize: '12px',
        minHeight: '24px',
        closeButtonSize: 18,
      };
  }
};

/**
 * Число или строка с единицами → значение для CSS max-width.
 * @param value - px или строка (`120`, `50%`)
 */
export const chipLengthToCss = (value: number | string | undefined): string | undefined => {
  if (value === undefined) {
    return undefined;
  }
  return typeof value === 'number' ? `${value}px` : value;
};

/**
 * Нужно ли показывать badge на чипе.
 * @param badge - Числовое значение badge
 */
export const shouldShowChipBadge = (badge: number | undefined): boolean =>
  typeof badge === 'number' && badge > 0;

/**
 * Нормализует значение группы к массиву строк.
 * @param value - Строка, массив или undefined
 */
export const normalizeChipsValueToArray = (value: string | string[] | undefined): string[] => {
  if (value === undefined) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

/**
 * Проверяет, выбран ли `chipValue` в текущем значении группы.
 * @param selectionMode - Режим выбора группы
 * @param selectedValue - Текущее значение группы
 * @param chipValue - Значение конкретного чипа
 */
export const isChipValueSelected = (
  selectionMode: ChipsSelectionMode,
  selectedValue: string | string[] | undefined,
  chipValue: string | undefined,
): boolean => {
  if (selectionMode === 'none' || chipValue === undefined) {
    return false;
  }
  const selectedValues = normalizeChipsValueToArray(selectedValue);
  return selectedValues.includes(chipValue);
};

/**
 * Вычисляет следующее значение группы после активации чипа.
 * @param selectionMode - Режим выбора
 * @param currentValue - Текущее значение
 * @param chipValue - Значение активированного чипа
 */
export const getNextChipsSelectionValue = (
  selectionMode: ChipsSelectionMode,
  currentValue: string | string[] | undefined,
  chipValue: string,
): string | string[] | undefined => {
  if (selectionMode === 'none') {
    return undefined;
  }

  if (selectionMode === 'single') {
    return chipValue;
  }

  const currentValues = normalizeChipsValueToArray(currentValue);
  if (currentValues.includes(chipValue)) {
    return currentValues.filter((entry) => entry !== chipValue);
  }
  return [...currentValues, chipValue];
};

/**
 * Индекс следующего фокусируемого чипа по стрелке.
 * @param currentIndex - Текущий индекс
 * @param chipsCount - Число чипов
 * @param direction - Направление: `-1` влево, `1` вправо
 */
export const getNextChipFocusIndex = (
  currentIndex: number,
  chipsCount: number,
  direction: -1 | 1,
): number => {
  if (chipsCount <= 0) {
    return -1;
  }
  if (currentIndex < 0) {
    return direction === 1 ? 0 : chipsCount - 1;
  }
  const nextIndex = currentIndex + direction;
  if (nextIndex < 0) {
    return chipsCount - 1;
  }
  if (nextIndex >= chipsCount) {
    return 0;
  }
  return nextIndex;
};

/**
 * Роль корневого контейнера группы по режиму выбора.
 * @param selectionMode - Режим выбора
 */
export const getChipsGroupRole = (
  selectionMode: ChipsSelectionMode,
): 'group' | 'radiogroup' => (selectionMode === 'single' ? 'radiogroup' : 'group');
