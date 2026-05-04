import type { ThemeType } from '@/types/theme';
import type { DataGridTableHeaderVariant } from '@/types/ui';

/**
 * Итоговый цвет фона шапки таблицы и панели `headerToolbar` в `DataGrid`.
 * @param theme — тема styled-components (`theme.tables`)
 * @param variant — `default` — серый фон из темы шапки; `card` — фон «карточки» (как тело таблицы)
 * @param customBackground — произвольный цвет; непустая строка перекрывает `variant`
 */
export function resolveDataGridTableHeaderBackground(
  theme: ThemeType,
  variant: DataGridTableHeaderVariant | undefined,
  customBackground: string | undefined,
): string {
  const trimmedCustom = customBackground?.trim();
  if (trimmedCustom) {
    return trimmedCustom;
  }
  if (variant === 'card') {
    return theme.tables.shell.background;
  }
  return theme.tables.header.background;
}
