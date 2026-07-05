import { darkColors } from '../src/themes/colors/dark';
import { lightColors } from '../src/themes/colors/light';
import { createGlassColors } from '../src/themes/colors/glass';
import { glassSurfacePalettes } from '../src/variables/glass';

export type PlainervStorybookDocsThemeMode = 'light' | 'dark' | 'glassLight' | 'glassDark';

/**
 * Нормализует глобал Storybook к режиму Docs.
 * @param rawTheme — `context.globals.theme`
 */
export function resolvePlainervStorybookDocsThemeMode(
  rawTheme: unknown,
): PlainervStorybookDocsThemeMode {
  if (rawTheme === 'dark' || rawTheme === 'glassDark') {
    return rawTheme === 'glassDark' ? 'glassDark' : 'dark';
  }
  if (rawTheme === 'glassLight' || rawTheme === 'glass') {
    return 'glassLight';
  }
  if (rawTheme === 'light') {
    return 'light';
  }
  return 'light';
}

/**
 * CSS-переменные Docs/Canvas в iframe превью.
 * @param mode — режим оформления Docs
 */
export function getPlainervStorybookDocsCssVariables(
  mode: PlainervStorybookDocsThemeMode,
): Record<string, string> {
  if (mode === 'glassLight') {
    const palette = createGlassColors('light');
    return {
      '--plainerv-sb-docs-bg': 'transparent',
      '--plainerv-sb-docs-page-mesh': glassSurfacePalettes.light.pageBackground.trim(),
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

  if (mode === 'glassDark') {
    const palette = createGlassColors('dark');
    return {
      '--plainerv-sb-docs-bg': 'transparent',
      '--plainerv-sb-docs-page-mesh': glassSurfacePalettes.dark.pageBackground.trim(),
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

  const palette = mode === 'dark' ? darkColors : lightColors;

  return {
    '--plainerv-sb-docs-bg': palette.background,
    '--plainerv-sb-docs-page-mesh': palette.background,
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
 * Выставляет переменные на `document.documentElement`.
 * @param mode — режим оформления Docs
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
