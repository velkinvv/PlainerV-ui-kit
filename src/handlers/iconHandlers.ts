import { IconSize } from '../types/sizes';

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
