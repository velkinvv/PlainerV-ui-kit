import type { Decorator } from '@storybook/react';
import { ThemeProvider, type ThemeProviderProps } from '../src/themes/ThemeProvider';
import {
  resolveStorybookThemeGlobal,
  resolveStorybookThemeMode,
  writeStorybookThemeGlobal,
} from '../src/handlers/storybookThemeHandlers';

/**
 * Параметры Storybook для настройки {@link ThemeProvider} на уровне сторис.
 * Не создавайте второй `ThemeProvider` в декораторе — используйте `parameters.plainervTheme`.
 */
export type PlainervThemeStoryParameters = Pick<
  ThemeProviderProps,
  'themeOverrides' | 'customThemes' | 'themes' | 'applyGlobalStyles' | 'defaultThemeMode' | 'initialThemeMode'
>;

/**
 * Подключает UI-kit {@link ThemeProvider} к глобалу `theme` из `@storybook/addon-themes`.
 * Опционально: `context.parameters.plainervTheme` — переопределения без вложенного провайдера.
 */
export const withStorybookUiKitTheme: Decorator = (Story, context) => {
  const resolvedTheme = resolveStorybookThemeGlobal(context.globals?.theme);
  const initialThemeMode = resolveStorybookThemeMode(resolvedTheme);
  const plainervTheme = context.parameters?.plainervTheme as PlainervThemeStoryParameters | undefined;

  writeStorybookThemeGlobal(resolvedTheme);

  return (
    <ThemeProvider
      key={`storybook-ui-kit-theme-${resolvedTheme}-${plainervTheme?.themeOverrides ? 'brand' : 'default'}`}
      initialThemeMode={plainervTheme?.initialThemeMode ?? initialThemeMode}
      storageKey="storybook-theme"
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
