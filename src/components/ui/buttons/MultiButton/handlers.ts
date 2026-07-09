import { ButtonVariant, type MultiButtonAppearance } from '../../../../types/ui';
import { Size } from '../../../../types/sizes';
import { themeRadiusBySize } from '../../../../themes/radiusScale';

/**
 * Маппит appearance MultiButton на ButtonVariant.
 * @param appearance - Внешний вид split-кнопки
 * @param skeleton - Режим скелетона
 */
export const mapMultiButtonAppearanceToVariant = (
  appearance: MultiButtonAppearance = 'primary',
  skeleton = false,
): ButtonVariant => {
  if (skeleton) {
    return ButtonVariant.SKELETON;
  }
  switch (appearance) {
    case 'secondary':
      return ButtonVariant.SECONDARY;
    case 'outline':
      return ButtonVariant.OUTLINE;
    case 'primary':
    default:
      return ButtonVariant.PRIMARY;
  }
};

/**
 * Внешний радиус пары кнопок MultiButton — тот же, что у `Button` из темы (`themeRadiusBySize`).
 * @param size - Размер
 */
export const getMultiButtonOuterRadius = (size: Size = Size.MD): string =>
  themeRadiusBySize[size] ?? themeRadiusBySize[Size.MD];

/**
 * Горизонтальный padding сегмента-шеврона (симметрия с вертикальным padding темы Button).
 * @param size - Размер MultiButton
 */
export const getMultiButtonChevronHorizontalPadding = (size: Size = Size.MD): string => {
  switch (size) {
    case Size.XS:
      return '6px';
    case Size.SM:
      return '8px';
    case Size.LG:
      return '12px';
    case Size.XL:
      return '16px';
    case Size.MD:
    default:
      return '10px';
  }
};

/**
 * Собирает padding шеврона: вертикаль из темы Button, горизонталь — компактный.
 * @param themeButtonPadding - Строка padding из темы (`10px 18px`)
 * @param size - Размер MultiButton
 */
export const getMultiButtonChevronPadding = (
  themeButtonPadding: string,
  size: Size = Size.MD,
): string => {
  const verticalPadding = themeButtonPadding.trim().split(/\s+/)[0] ?? '10px';
  const horizontalPadding = getMultiButtonChevronHorizontalPadding(size);
  return `${verticalPadding} ${horizontalPadding}`;
};

/**
 * Нужно ли блокировать основную кнопку.
 * @param disabled - Блокировка всего компонента
 * @param disabledMainButton - Блокировка только main
 * @param skeleton - Скелетон
 */
export const isMultiButtonMainDisabled = (
  disabled: boolean,
  disabledMainButton: boolean,
  skeleton: boolean,
): boolean => disabled || disabledMainButton || skeleton;

/**
 * Нужно ли блокировать кнопку меню.
 * @param disabled - Блокировка всего компонента
 * @param skeleton - Скелетон
 */
export const isMultiButtonMenuDisabled = (disabled: boolean, skeleton: boolean): boolean =>
  disabled || skeleton;
