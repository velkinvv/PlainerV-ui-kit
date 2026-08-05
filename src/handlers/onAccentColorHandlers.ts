import type { DefaultTheme } from 'styled-components';
import { ThemeColorScheme } from '../types/theme';

/**
 * Цвет текста / иконки на залитом акцентном фоне (filled Alert, SOLID Nav, active Tabs).
 * Предпочитает `theme.colors.onAccent`; иначе — elevated surface (light) или `text` (dark).
 * @param theme - Тема styled-components
 */
export const resolveOnAccentTextColor = (theme: DefaultTheme): string => {
  if (theme.colors?.onAccent) {
    return theme.colors.onAccent;
  }
  if (theme.mode === ThemeColorScheme.DARK) {
    return theme.colors?.text ?? theme.colors?.backgroundSecondary ?? '#ffffff';
  }
  return theme.colors?.backgroundSecondary ?? theme.colors?.input ?? '#ffffff';
};
