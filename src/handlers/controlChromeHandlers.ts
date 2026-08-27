import { Size } from '../types/sizes';
import { BorderRadiusHandler, InputSizeHandler } from './uiHandlers';

/**
 * Высота контрола в одном ряду с Input / Select: та же шкала, что у полей ввода.
 * @param size - Размер из дизайн-системы
 */
export function resolveControlMinHeight(size: Size = Size.MD): string {
  return InputSizeHandler(size);
}

/**
 * Радиус рамки контрола: глобальный токен `theme.borderRadius`, как у Input / Select.
 * Не зависит от `size` кнопки — иначе SM-кнопка (6px) визуально «острее» SM-инпута (8px).
 * @param themeBorderRadius - `theme.borderRadius`
 */
export function resolveControlBorderRadius(themeBorderRadius: Size = Size.MD): string {
  return BorderRadiusHandler(themeBorderRadius);
}
