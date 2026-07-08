import type { Decorator } from '@storybook/react';
import { ThemeProvider, type ThemeProviderProps } from '../src/themes/ThemeProvider';
import {
  resolveStorybookGlobalsAxes,
  resolveStorybookThemeGlobalFromAxes,
  resolveStorybookThemeMode,
  writeStorybookThemeAxes,
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
 * Подключает UI-kit {@link ThemeProvider} к globals `themeVariant` и `colorScheme`.
 * Опционально: `context.parameters.plainervTheme` — переопределения без вложенного провайдера.
 */
export const withStorybookUiKitTheme: Decorator = (Story, context) => {
  const axes = resolveStorybookGlobalsAxes(context.globals);
  const resolvedTheme = resolveStorybookThemeGlobalFromAxes(axes.themeVariant, axes.colorScheme);
  const initialThemeMode = resolveStorybookThemeMode(resolvedTheme);
  const plainervTheme = context.parameters?.plainervTheme as PlainervThemeStoryParameters | undefined;

  writeStorybookThemeAxes(axes);

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
