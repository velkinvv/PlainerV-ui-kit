import { IconSize, Size } from '../types/sizes';

export const sizeMap: Record<IconSize, number> = {
  [IconSize.XS]: 16,
  [IconSize.SM]: 20,
  [IconSize.MD]: 24,
  [IconSize.LG]: 32,
  [IconSize.XL]: 40,
};

export const iconSizeHandler = (size?: number, iconSize: IconSize = IconSize.MD): number => {
  if (size) {
    return size;
  }

  return sizeMap[iconSize];
};

/**
 * Размер иконки «очистить» для полей ввода (пиксели по `sizeMap`: XS→20, SM→24, MD→32, LG/XL→40),
 * чтобы не раздувать высоту строки из‑за слишком крупной иконки при малых размерах поля.
 *
 * @param fieldSize — размер поля (`Size` из пропсов Input / DateInput / TimeInput / FileInput и т.д.; по умолчанию `Size.SM`)
 * @returns значение `IconSize` для компонента `Icon`
 */
/**
 * Размер шеврона / индикатора «открыть меню» по высоте строки (`Select`, дефолтный `Dropdown`).
 * @param fieldSize — `Size` поля или `Dropdown.size` (по умолчанию считаем `MD`)
 */
export const getChevronIconSizeForField = (fieldSize: Size | undefined): IconSize => {
  if (fieldSize === Size.SM || fieldSize === Size.XS) {
    return IconSize.XS;
  }
  if (fieldSize === Size.LG || fieldSize === Size.XL) {
    return IconSize.MD;
  }
  return IconSize.SM;
};

export const getClearIconSizeForInputField = (fieldSize: Size = Size.SM): IconSize => {
  switch (fieldSize) {
    case Size.XS:
      return IconSize.SM;
    case Size.SM:
      return IconSize.MD;
    case Size.MD:
      return IconSize.LG;
    case Size.LG:
    case Size.XL:
      return IconSize.XL;
    default:
      return IconSize.MD;
  }
};

/**
 * Размер глифа для `leftIcon` / `rightIcon` по размеру поля (совпадает с `sizeMap`).
 * @param fieldSize — `Size` поля (`Input`, `MultiInput`, `SliderInput` и т.д.)
 */
export const getInputSideIconSizeForField = (fieldSize: Size | undefined): IconSize => {
  switch (fieldSize) {
    case Size.XS:
      return IconSize.XS;
    case Size.SM:
      return IconSize.SM;
    case Size.MD:
      return IconSize.MD;
    case Size.LG:
      return IconSize.LG;
    case Size.XL:
      return IconSize.XL;
    default:
      return IconSize.SM;
  }
};

/**
 * Сторона слота иконки в px: фиксирует габарит, чтобы `IconButton` не раздувал высоту поля.
 * @param fieldSize — `Size` поля
 */
export const getInputSideIconSlotSizePx = (fieldSize: Size = Size.SM): number => {
  return sizeMap[getInputSideIconSizeForField(fieldSize)];
};
