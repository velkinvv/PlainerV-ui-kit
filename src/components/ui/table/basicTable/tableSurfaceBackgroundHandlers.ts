import type { ThemeType } from '@/types/theme';
import type {
  TableShellVariant,
  TableSurfaceBackgrounds,
  TableSurfaceBackgroundsInput,
} from '@/types/ui';
import {
  resolveTableShellInsetFrameBackground,
  resolveTableShellInsetSurfaceBackground,
} from './tableShellInsetHandlers';

/** Ключи настраиваемых поверхностей таблицы */
export const TABLE_SURFACE_BACKGROUND_KEYS = [
  'shell',
  'header',
  'headerToolbar',
  'bodyRow',
  'bodyRowZebra',
  'bodyRowHover',
  'bodyRowSelected',
  'bodyRowDragging',
  'footer',
  'pagination',
] as const satisfies readonly (keyof TableSurfaceBackgrounds)[];

export type TableSurfaceBackgroundKey = (typeof TABLE_SURFACE_BACKGROUND_KEYS)[number];

/** Нормализованные флаги: `true` — прозрачный фон (виден фон родителя) */
export type NormalizedTableSurfaceBackgrounds = Record<TableSurfaceBackgroundKey, boolean>;

const transparentSurfacesDefaults = (): NormalizedTableSurfaceBackgrounds =>
  Object.fromEntries(
    TABLE_SURFACE_BACKGROUND_KEYS.map((surfaceKey) => [surfaceKey, true]),
  ) as NormalizedTableSurfaceBackgrounds;

const themedSurfacesDefaults = (): NormalizedTableSurfaceBackgrounds =>
  Object.fromEntries(
    TABLE_SURFACE_BACKGROUND_KEYS.map((surfaceKey) => [surfaceKey, false]),
  ) as NormalizedTableSurfaceBackgrounds;

/**
 * Нормализует `surfaceBackgrounds`: `'transparent'` — все поверхности прозрачные.
 * @param input — объект по ключам или shorthand `'transparent'`
 */
export function normalizeTableSurfaceBackgrounds(
  input?: TableSurfaceBackgroundsInput,
): NormalizedTableSurfaceBackgrounds {
  if (input === 'transparent') {
    return transparentSurfacesDefaults();
  }

  const defaults = themedSurfacesDefaults();

  if (input == null) {
    return defaults;
  }

  return {
    ...defaults,
    ...input,
  };
}

/**
 * Возвращает CSS-фон: `transparent` или значение из темы.
 * @param surfaces — нормализованные флаги
 * @param surfaceKey — какая поверхность
 * @param themeColor — цвет из `theme.tables`
 */
export function resolveTableSurfaceBackgroundColor(
  surfaces: NormalizedTableSurfaceBackgrounds,
  surfaceKey: TableSurfaceBackgroundKey,
  themeColor: string,
): string {
  if (surfaces[surfaceKey]) {
    return 'transparent';
  }

  return themeColor;
}

/**
 * Фон шапки / панели `headerToolbar`: `headerToolbar` переопределяет `header`, иначе наследуется `header`.
 * @param surfaces — нормализованные флаги
 * @param themeColor — цвет шапки из темы
 */
export function resolveTableHeaderSurfaceBackgroundColor(
  surfaces: NormalizedTableSurfaceBackgrounds,
  themeColor: string,
): string {
  if (surfaces.headerToolbar || surfaces.header) {
    return 'transparent';
  }

  return themeColor;
}

/**
 * Фон только панели `headerToolbar` в DataGrid: отдельный флаг `headerToolbar`, иначе как у шапки.
 * @param surfaces — нормализованные флаги
 * @param headerBackground — уже разрешённый фон шапки колонок
 */
/**
 * Фон оболочки / пагинации из темы: в `embedded` по умолчанию прозрачный (виден фон Card/Panel).
 * @param theme — тема styled-components
 * @param shellVariant — режим оболочки таблицы
 * @param shellInset — активен ли `shellInset`
 * @param surfaceKey — `shell` (корень) или `pagination` (встроенный футер)
 */
export function resolveTableShellThemeBackgroundColor(
  theme: ThemeType,
  shellVariant: TableShellVariant,
  shellInset: boolean,
  surfaceKey: 'shell' | 'pagination',
): string {
  if (shellVariant === 'embedded') {
    return 'transparent';
  }

  if (shellInset) {
    return surfaceKey === 'shell'
      ? resolveTableShellInsetFrameBackground(theme)
      : resolveTableShellInsetSurfaceBackground(theme);
  }

  return theme.tables.shell.background;
}

export function resolveTableHeaderToolbarSurfaceBackgroundColor(
  surfaces: NormalizedTableSurfaceBackgrounds,
  headerBackground: string,
): string {
  if (surfaces.headerToolbar) {
    return 'transparent';
  }

  return headerBackground;
}
