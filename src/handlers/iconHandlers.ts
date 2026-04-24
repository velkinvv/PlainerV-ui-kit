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
