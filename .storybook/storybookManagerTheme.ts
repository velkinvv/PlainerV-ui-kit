import { create } from 'storybook/theming';
import { lightColors } from '../src/themes/colors/light';
import { darkColors } from '../src/themes/colors/dark';
import { fontFamily } from '../src/themes/fonts';

/**
 * Тема оформления **shell** Storybook (сайдбар, хедер, вкладки), собранная из палитры UI-kit,
 * чтобы визуально совпадать со светлой/тёмной темой компонентов.
 *
 * @param mode — `'light'` или `'dark'` (как значение глобала `theme` у `@storybook/addon-themes`)
 */
export function createPlainerVStorybookChromeTheme(mode: 'light' | 'dark') {
  const palette = mode === 'light' ? lightColors : darkColors;
  const isLight = mode === 'light';

  /**
   * Акцент навигации = `primary` из палитры UI-kit.
   *
   * В `create()` у Storybook фон **выбранной** строки дерева навигации берётся из поля **`colorSecondary`**
   * (после `convert` в менеджере это `theme.color.secondary`), а **не** из `colorPrimary`.
   * Поэтому сюда дублируем `palette.primary` в `colorSecondary` — иначе «верный» primary из палитры
   * визуально не попадёт в меню, хотя в палитре он задан правильно.
   */
  const navigationAccentFromPalette = palette.primary;

  return create({
    base: isLight ? 'light' : 'dark',
    brandTitle: 'PlainerV UI Kit',

    colorPrimary: navigationAccentFromPalette,
    colorSecondary: navigationAccentFromPalette,

    appBg: palette.background,
    appContentBg: palette.backgroundSecondary,
    appPreviewBg: palette.background,
    appBorderColor: palette.border,
    appBorderRadius: 8,

    fontBase: fontFamily.primary,
    fontCode: fontFamily.monospace,

    textColor: palette.text,
    textInverseColor: isLight ? palette.background : palette.text,
    textMutedColor: palette.textSecondary,

    barBg: palette.backgroundSecondary,
    barTextColor: palette.text,
    barHoverColor: palette.textSecondary,
    barSelectedColor: navigationAccentFromPalette,

    buttonBg: palette.backgroundTertiary,
    buttonBorder: palette.border,

    booleanBg: palette.backgroundTertiary,
    booleanSelectedBg: navigationAccentFromPalette,

    inputBg: palette.input,
    inputBorder: palette.border,
    inputTextColor: palette.text,
    inputBorderRadius: 8,
  });
}
