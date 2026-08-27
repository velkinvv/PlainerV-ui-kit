import { Size } from '../../../types/sizes';
import type { SegmentedControlSelectionMode } from '../../../types/ui';
import { InputFontSizeHandler } from '../../../handlers/uiHandlers';
import { resolveControlMinHeight } from '../../../handlers/controlChromeHandlers';
import { getButtonGroupAttachedOuterRadius } from '../buttons/ButtonGroup/handlers';

/** Геометрия сегмента */
export type SegmentedControlGeometry = {
  /** Минимальная высота сегмента */
  minHeight: string;
  /** Горизонтальные отступы текста */
  paddingInline: string;
  /** Размер шрифта */
  fontSize: string;
  /** Внешний радиус группы */
  outerRadius: string;
  /** Ширина квадратного сегмента */
  squareSize: string;
};

/**
 * Геометрия сегментов: высота как у Input того же size, радиус из `theme.borderRadius`.
 * @param size - Размер из дизайн-системы
 * @param themeBorderRadius - `theme.borderRadius`
 */
export const getSegmentedControlGeometry = (
  size: Size = Size.MD,
  themeBorderRadius: Size = Size.MD,
): SegmentedControlGeometry => {
  const outerRadius = getButtonGroupAttachedOuterRadius(size, 'segment', themeBorderRadius);
  const minHeight = resolveControlMinHeight(size);
  switch (size) {
    case Size.XS:
    case Size.SM:
      return {
        minHeight,
        paddingInline: '10px',
        fontSize: InputFontSizeHandler(size),
        outerRadius,
        squareSize: minHeight,
      };
    case Size.LG:
    case Size.XL:
      return {
        minHeight,
        paddingInline: '18px',
        fontSize: InputFontSizeHandler(size),
        outerRadius,
        squareSize: minHeight,
      };
    case Size.MD:
    default:
      return {
        minHeight,
        paddingInline: '14px',
        fontSize: InputFontSizeHandler(size),
        outerRadius,
        squareSize: minHeight,
      };
  }
};

/**
 * Нормализует значение к массиву строк.
 * @param value - Строка, массив или undefined
 */
export const normalizeSegmentedValueToArray = (
  value: string | string[] | undefined,
): string[] => {
  if (value === undefined) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

/**
 * Проверяет, выбран ли сегмент.
 * @param selectionMode - Режим выбора
 * @param selectedValue - Текущее значение группы
 * @param segmentValue - Значение сегмента
 */
export const isSegmentedValueSelected = (
  selectionMode: SegmentedControlSelectionMode,
  selectedValue: string | string[] | undefined,
  segmentValue: string,
): boolean => {
  const selectedValues = normalizeSegmentedValueToArray(selectedValue);
  if (selectionMode === 'single') {
    return selectedValues[0] === segmentValue;
  }
  return selectedValues.includes(segmentValue);
};

/**
 * Следующее значение группы после переключения сегмента.
 * @param selectionMode - Режим выбора
 * @param currentValue - Текущее значение
 * @param segmentValue - Значение сегмента
 * @param nextChecked - Новое состояние checked у input
 */
export const getNextSegmentedControlValue = (
  selectionMode: SegmentedControlSelectionMode,
  currentValue: string | string[] | undefined,
  segmentValue: string,
  nextChecked: boolean,
): string | string[] => {
  if (selectionMode === 'single') {
    return segmentValue;
  }

  const currentValues = normalizeSegmentedValueToArray(currentValue);
  if (nextChecked) {
    return currentValues.includes(segmentValue)
      ? currentValues
      : [...currentValues, segmentValue];
  }
  return currentValues.filter((entry) => entry !== segmentValue);
};

/**
 * Тип native input по режиму выбора.
 * @param selectionMode - Режим выбора
 */
export const getSegmentedInputType = (
  selectionMode: SegmentedControlSelectionMode,
): 'radio' | 'checkbox' => (selectionMode === 'multiple' ? 'checkbox' : 'radio');
