import type { Decorator } from '@storybook/react';
import { ThemeProvider, type ThemeProviderProps } from '../src/themes/ThemeProvider';
import { ThemeColorScheme, ThemeMode } from '../src/types/theme';

/**
 * Тот же ключ, что у `@storybook/addon-themes` и `.storybook/manager.ts` —
 * иначе shell Storybook и превью расходятся.
 */
const STORYBOOK_THEME_STORAGE_KEY = 'storybook-theme';

/**
 * Параметры Storybook для настройки {@link ThemeProvider} на уровне сторис.
 * Не создавайте второй `ThemeProvider` в декораторе — используйте `parameters.plainervTheme`.
 */
export type PlainervThemeStoryParameters = Pick<
  ThemeProviderProps,
  'themeOverrides' | 'customThemes' | 'themes' | 'applyGlobalStyles' | 'defaultThemeMode' | 'initialThemeMode'
>;

/**
 * Стартовое значение глобала `theme` (тулбар аддона тем) — как у {@link ThemeProvider} / `localStorage`.
 */
function getInitialStorybookThemeGlobal(): 'light' | 'dark' {
  if (typeof window === 'undefined') {
    return 'light';
  }
  return window.localStorage.getItem('storybook-theme') === 'dark' ? 'dark' : 'light';
}

/**
 * Подключает UI-kit {@link ThemeProvider} к глобалу `theme` из `@storybook/addon-themes`.
 * Опционально: `context.parameters.plainervTheme` — переопределения без вложенного провайдера.
 */
export const withStorybookUiKitTheme: Decorator = (Story, context) => {
  const rawTheme = context.globals?.theme;
  const resolvedTheme: 'light' | 'dark' =
    rawTheme === 'dark' || rawTheme === 'light' ? rawTheme : getInitialStorybookThemeGlobal();
  const initialThemeMode =
    resolvedTheme === 'dark' ? ThemeMode.dark : ThemeMode.light;
  const initialMode =
    resolvedTheme === 'dark' ? ThemeColorScheme.DARK : ThemeColorScheme.LIGHT;
  const plainervTheme = context.parameters?.plainervTheme as PlainervThemeStoryParameters | undefined;

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORYBOOK_THEME_STORAGE_KEY, resolvedTheme);
  }

  return (
    <ThemeProvider
      key={`storybook-ui-kit-theme-${resolvedTheme}-${plainervTheme?.themeOverrides ? 'brand' : 'default'}`}
      initialThemeMode={plainervTheme?.initialThemeMode ?? initialThemeMode}
      initialMode={initialMode}
      storageKey={STORYBOOK_THEME_STORAGE_KEY}
      themeOverrides={plainervTheme?.themeOverrides}
      customThemes={plainervTheme?.customThemes}
      themes={plainervTheme?.themes}
      defaultThemeMode={plainervTheme?.defaultThemeMode ?? initialThemeMode}
      applyGlobalStyles={plainervTheme?.applyGlobalStyles ?? true}
    >
      <Story />
    </ThemeProvider>
  );
};
