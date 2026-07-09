import { darkColors } from '../src/themes/colors/dark';
import { lightColors } from '../src/themes/colors/light';
import { createGlassColors } from '../src/themes/colors/glass';
import { createKidsColors } from '../src/themes/colors/kids';
import { glassSurfacePalettes } from '../src/variables/glass';
import { getKidsThemePalette, type KidsAudienceVariant, type KidsPaletteVariant } from '../src/variables/kids';
import { ThemeColorScheme, ThemeMode, ThemeVariant } from '../src/types/theme';
import { resolveStorybookThemeGlobalFromAxes } from '../src/handlers/storybookThemeHandlers';

export type PlainervStorybookDocsThemeMode =
  | 'light'
  | 'dark'
  | 'glassLight'
  | 'glassDark'
  | 'kidsBoysLight'
  | 'kidsBoysDark'
  | 'kidsGirlsLight'
  | 'kidsGirlsDark'
  /** @deprecated Используйте `kidsBoysLight` */
  | 'kidsLight'
  /** @deprecated Используйте `kidsBoysDark` */
  | 'kidsDark';

const kidsDocsModes: PlainervStorybookDocsThemeMode[] = [
  'kidsBoysLight',
  'kidsBoysDark',
  'kidsGirlsLight',
  'kidsGirlsDark',
  'kidsLight',
  'kidsDark',
];

/**
 * Нормализует id темы к режиму Docs.
 *
 * @param rawTheme - id темы или legacy global Storybook
 */
export function resolvePlainervStorybookDocsThemeMode(
  rawTheme: unknown,
): PlainervStorybookDocsThemeMode {
  if (rawTheme === ThemeMode.dark || rawTheme === 'dark') {
    return 'dark';
  }

  if (rawTheme === ThemeMode.glassDark || rawTheme === 'glassDark') {
    return 'glassDark';
  }

  if (rawTheme === ThemeMode.glassLight || rawTheme === 'glassLight' || rawTheme === 'glass') {
    return 'glassLight';
  }

  if (rawTheme === ThemeMode.kidsBoysLight || rawTheme === 'kidsBoysLight' || rawTheme === 'kidsLight') {
    return 'kidsBoysLight';
  }

  if (rawTheme === ThemeMode.kidsBoysDark || rawTheme === 'kidsBoysDark' || rawTheme === 'kidsDark') {
    return 'kidsBoysDark';
  }

  if (rawTheme === ThemeMode.kidsGirlsLight || rawTheme === 'kidsGirlsLight') {
    return 'kidsGirlsLight';
  }

  if (rawTheme === ThemeMode.kidsGirlsDark || rawTheme === 'kidsGirlsDark') {
    return 'kidsGirlsDark';
  }

  if (rawTheme === ThemeMode.light || rawTheme === 'light') {
    return 'light';
  }

  return 'light';
}

/**
 * Режим Docs по осям themeVariant × colorScheme.
 *
 * @param themeVariant - standard, glass, kidsBoys или kidsGirls
 * @param colorScheme - светлая или тёмная палитра
 */
export function resolvePlainervStorybookDocsThemeModeFromAxes(
  themeVariant: ThemeVariant,
  colorScheme: ThemeColorScheme,
): PlainervStorybookDocsThemeMode {
  return resolvePlainervStorybookDocsThemeMode(
    resolveStorybookThemeGlobalFromAxes(themeVariant, colorScheme),
  );
}

/**
 * CSS-переменные kids-темы для Docs/Canvas.
 *
 * @param audience - мальчики или девочки
 * @param paletteVariant - светлая или тёмная основа
 */
function getKidsDocsCssVariables(
  audience: KidsAudienceVariant,
  paletteVariant: KidsPaletteVariant,
): Record<string, string> {
  const palette = createKidsColors(audience, paletteVariant);

  return {
    '--plainerv-sb-docs-bg': 'transparent',
    '--plainerv-sb-docs-page-mesh': getKidsThemePalette(audience, paletteVariant).pageBackground.trim(),
    '--plainerv-sb-docs-surface': palette.backgroundSecondary,
    '--plainerv-sb-docs-surface-muted': palette.backgroundTertiary,
    '--plainerv-sb-docs-border': palette.border,
    '--plainerv-sb-docs-border-faint': palette.borderSecondary,
    '--plainerv-sb-docs-text': palette.text,
    '--plainerv-sb-docs-text-muted': palette.textSecondary,
    '--plainerv-sb-docs-link': palette.primary,
    '--plainerv-sb-docs-link-hover': palette.primaryHover,
  };
}

/**
 * CSS-переменные Docs/Canvas в iframe превью.
 *
 * @param mode - режим оформления Docs
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

  if (mode === 'kidsBoysLight' || mode === 'kidsLight') {
    return getKidsDocsCssVariables('boys', 'light');
  }

  if (mode === 'kidsBoysDark' || mode === 'kidsDark') {
    return getKidsDocsCssVariables('boys', 'dark');
  }

  if (mode === 'kidsGirlsLight') {
    return getKidsDocsCssVariables('girls', 'light');
  }

  if (mode === 'kidsGirlsDark') {
    return getKidsDocsCssVariables('girls', 'dark');
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
 * Проверяет, что режим Docs — kids-тема с mesh-фоном.
 *
 * @param mode - режим оформления Docs
 */
export function isPlainervKidsDocsThemeMode(mode: PlainervStorybookDocsThemeMode): boolean {
  return kidsDocsModes.includes(mode);
}

/**
 * Выставляет переменные на `document.documentElement`.
 *
 * @param mode - режим оформления Docs
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
