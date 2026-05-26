import { darkColors } from '../src/themes/colors/dark';
import { lightColors } from '../src/themes/colors/light';

export type PlainervStorybookDocsThemeMode = 'light' | 'dark';

/**
 * CSS-переменные Docs/Canvas в iframe превью — значения из `lightColors` / `darkColors`.
 * Единый источник с {@link createPlainerVStorybookChromeTheme} и {@link ThemeProvider}.
 */
export function getPlainervStorybookDocsCssVariables(
  mode: PlainervStorybookDocsThemeMode,
): Record<string, string> {
  const palette = mode === 'dark' ? darkColors : lightColors;

  return {
    '--plainerv-sb-docs-bg': palette.background,
    '--plainerv-sb-docs-surface': palette.backgroundSecondary,
    '--plainerv-sb-docs-surface-muted': palette.backgroundTertiary,
    '--plainerv-sb-docs-border': palette.border,
    '--plainerv-sb-docs-border-faint': palette.borderSecondary,
    '--plainerv-sb-docs-text': palette.text,
    '--plainerv-sb-docs-text-muted': palette.textSecondary,
    '--plainerv-sb-docs-link': palette.info,
    '--plainerv-sb-docs-link-hover': palette.infoHover,
  };
}

/**
 * Выставляет переменные на `document.documentElement` (атрибут `data-theme` уже задан addon-themes).
 */
export function applyPlainervStorybookDocsCssVariables(mode: PlainervStorybookDocsThemeMode): void {
  if (typeof document === 'undefined') {
    return;
  }

  const variables = getPlainervStorybookDocsCssVariables(mode);
  Object.entries(variables).forEach(([propertyName, propertyValue]) => {
    document.documentElement.style.setProperty(propertyName, propertyValue);
  });
}
