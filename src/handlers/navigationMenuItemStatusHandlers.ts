import type { ThemeType } from '@/types/theme';
import { NavigationMenuItemStatus } from '@/types/ui';

/**
 * Акцентный цвет статуса пункта меню (из темы)
 * @param theme — тема приложения
 * @param status — вид статуса
 */
export function getNavigationMenuItemStatusColor(
  theme: ThemeType,
  status: NavigationMenuItemStatus,
): string {
  const colors = theme?.colors;
  switch (status) {
    case NavigationMenuItemStatus.SUCCESS:
      return colors?.success ?? '#22c55e';
    case NavigationMenuItemStatus.WARNING:
      return colors?.warning ?? '#eab308';
    case NavigationMenuItemStatus.DANGER:
      return colors?.danger ?? '#ef4444';
    case NavigationMenuItemStatus.INFO:
      return colors?.info ?? colors?.primary ?? '#3b82f6';
    default:
      return colors?.text ?? '#000000';
  }
}

/**
 * Фон строки с лёгким оттенком статуса (color-mix)
 * @param theme — тема
 * @param status — статус
 * @param defaultBackground — базовый фон кнопки пункта
 * @param mixPercent — доля акцента в смеси (0–100)
 */
export function getNavigationMenuItemStatusBackgroundTint(
  theme: ThemeType,
  status: NavigationMenuItemStatus,
  defaultBackground: string,
  mixPercent: number = 11,
): string {
  const accent = getNavigationMenuItemStatusColor(theme, status);
  return `color-mix(in srgb, ${accent} ${mixPercent}%, ${defaultBackground})`;
}
