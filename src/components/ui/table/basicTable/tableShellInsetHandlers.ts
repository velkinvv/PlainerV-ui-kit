import { Size } from '@/types/sizes';
import type { ThemeType } from '@/types/theme';

/**
 * Нормализует отступ в CSS-строку.
 * @param value — число (px) или строка (`16px`, `1rem`)
 */
export function normalizeTableShellInsetPaddingValue(value: string | number): string {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
}

/**
 * Внутренний отступ между рамкой карточки таблицы и сеткой при `shellInset`.
 * @param theme — активная тема
 * @param override — явное значение из пропса `shellInsetPadding`
 */
export function resolveTableShellInsetPadding(
  theme: ThemeType,
  override?: string | number,
): string {
  if (override != null && override !== '') {
    return normalizeTableShellInsetPaddingValue(override);
  }
  const fromTheme = theme.tables?.shell?.insetPadding;
  if (fromTheme != null && fromTheme !== '') {
    return fromTheme;
  }
  return theme.cards?.sizes?.[Size.MD]?.padding ?? '20px';
}

/**
 * Фон оболочки при `shellInset` (белый / фон карточки таблицы, без серой «канавы»).
 * @param theme — активная тема
 */
export function resolveTableShellInsetFrameBackground(theme: ThemeType): string {
  return (
    theme.tables?.shell?.insetFrameBackground ??
    theme.tables?.shell?.background ??
    theme.colors.backgroundSecondary
  );
}

/**
 * Фон внутренней поверхности с сеткой при `shellInset`.
 * @param theme — активная тема
 */
export function resolveTableShellInsetSurfaceBackground(theme: ThemeType): string {
  return theme.tables?.shell?.insetSurfaceBackground ?? theme.tables.shell.background;
}

/**
 * Обводка внутренней поверхности при `shellInset`.
 * @param theme — активная тема
 */
export function resolveTableShellInsetSurfaceBorder(theme: ThemeType): string {
  return theme.tables?.shell?.insetSurfaceBorder ?? theme.tables.shell.border;
}

/**
 * Скругление внутренней поверхности с сеткой.
 * @param theme — активная тема
 */
export function resolveTableShellInsetSurfaceBorderRadius(theme: ThemeType): string {
  return (
    theme.tables?.shell?.insetSurfaceBorderRadius ??
    theme.cards?.sizes?.[Size.SM]?.borderRadius ??
    '12px'
  );
}
