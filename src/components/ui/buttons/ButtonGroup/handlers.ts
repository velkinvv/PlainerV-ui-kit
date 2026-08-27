import type { ButtonGroupAttachedShape } from '@/types/ui';
import { Size } from '../../../../types/sizes';
import { resolveControlBorderRadius } from '../../../../handlers/controlChromeHandlers';

/**
 * Внешний радиус скругления для первого/последнего сегмента в режиме `attached`.
 * Для `segment` — тот же токен, что у Input (`theme.borderRadius`).
 * @param size — размер группы (для совместимости API; на `segment` не влияет)
 * @param shape — сегмент или капсула
 * @param themeBorderRadius — `theme.borderRadius`
 */
export const getButtonGroupAttachedOuterRadius = (
  attachedSize: Size = Size.MD,
  shape: ButtonGroupAttachedShape = 'segment',
  themeBorderRadius: Size = Size.MD,
): string => {
  if (shape === 'pill') {
    return '9999px';
  }
  void attachedSize;
  return resolveControlBorderRadius(themeBorderRadius);
};
