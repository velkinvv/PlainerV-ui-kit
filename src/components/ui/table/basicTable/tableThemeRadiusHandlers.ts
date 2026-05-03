import { BorderRadiusHandler } from '@/handlers/uiHandlers';
import type { ThemeType } from '@/types/theme';

/**
 * Скругление мелких интерактивных контролов в таблице (сортировка, фильтр в шапке, expand).
 * Использует глобальный ключ темы `theme.borderRadius` и шкалу `themeRadiusBySize` (см. `BorderRadiusHandler`).
 */
export function tableInteractiveBorderRadiusFromTheme(theme: ThemeType): string {
  return BorderRadiusHandler(theme.borderRadius);
}
