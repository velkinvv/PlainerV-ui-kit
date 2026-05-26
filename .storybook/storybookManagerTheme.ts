import { create, themes } from 'storybook/theming';
import { lightColors } from '../src/themes/colors/light';
import { darkColors } from '../src/themes/colors/dark';
import type { Colors } from '../src/types/theme';
import { fontFamily } from '../src/themes/fonts';

/**
 * Поля темы shell Storybook из палитры UI-kit (без утечки дефолтных #222425 / #1B1C1D).
 */
function mapPaletteToStorybookChromeTheme(
  palette: Colors,
  navigationAccent: string,
  isLight: boolean,
) {
  return {
    colorPrimary: navigationAccent,
    colorSecondary: navigationAccent,
    appBg: palette.background,
    appContentBg: palette.background,
    appPreviewBg: palette.backgroundSecondary,
    appBorderColor: palette.border,
    appBorderRadius: 8,
    fontBase: fontFamily.primary,
    fontCode: fontFamily.monospace,
    textColor: palette.text,
    textInverseColor: isLight ? palette.background : palette.text,
    textMutedColor: palette.textSecondary,
    barBg: palette.background,
    barTextColor: palette.text,
    barHoverColor: palette.textSecondary,
    barSelectedColor: navigationAccent,
    buttonBg: palette.backgroundTertiary,
    buttonBorder: palette.border,
    booleanBg: palette.backgroundTertiary,
    booleanSelectedBg: navigationAccent,
    inputBg: palette.input,
    inputBorder: palette.border,
    inputTextColor: palette.text,
    inputBorderRadius: 8,
  };
}

/**
 * Тема оформления **shell** Storybook (сайдбар, хедер, вкладки), собранная из палитры UI-kit.
 *
 * @param mode — `'light'` или `'dark'` (как значение глобала `theme` у `@storybook/addon-themes`)
 */
export function createPlainerVStorybookChromeTheme(mode: 'light' | 'dark') {
  const palette = mode === 'light' ? lightColors : darkColors;
  const navigationAccentFromPalette = palette.primary;
  const baseTheme = mode === 'light' ? themes.light : themes.dark;

  return create({
    base: mode,
    ...baseTheme,
    brandTitle: 'PlainerV UI Kit',
    ...mapPaletteToStorybookChromeTheme(palette, navigationAccentFromPalette, mode === 'light'),
  });
}
