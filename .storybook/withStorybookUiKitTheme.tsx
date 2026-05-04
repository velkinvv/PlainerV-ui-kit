import type { Decorator } from '@storybook/react';
import { ThemeProvider } from '../src/themes/ThemeProvider';
import { ThemeMode } from '../src/types/theme';

/**
 * Стартовое значение глобала `theme` (тулбар аддона тем) — как у {@link ThemeProvider} / `localStorage`.
 * Дублирует логику из `preview.tsx`, чтобы декоратор оставался самодостаточным.
 */
function getInitialStorybookThemeGlobal(): 'light' | 'dark' {
  if (typeof window === 'undefined') {
    return 'light';
  }
  return window.localStorage.getItem('storybook-theme') === 'dark' ? 'dark' : 'light';
}

/**
 * Подключает UI-kit {@link ThemeProvider} к глобалу `theme` из `@storybook/addon-themes`.
 * Использует **второй аргумент декоратора** `context.globals` — он обновляется при переключении
 * тулбара; отдельные хуки превью (`useGlobals`) и наблюдение за `data-theme` не нужны.
 *
 * `key` по выбранной теме заставляет провайдер корректно пересобрать контекст при смене светлой/тёмной.
 */
export const withStorybookUiKitTheme: Decorator = (Story, context) => {
  const rawTheme = context.globals?.theme;
  const resolvedTheme: 'light' | 'dark' =
    rawTheme === 'dark' || rawTheme === 'light' ? rawTheme : getInitialStorybookThemeGlobal();
  const initialMode = resolvedTheme === 'dark' ? ThemeMode.DARK : ThemeMode.LIGHT;

  return (
    <ThemeProvider initialMode={initialMode} key={`storybook-ui-kit-theme-${resolvedTheme}`}>
      <Story />
    </ThemeProvider>
  );
};
