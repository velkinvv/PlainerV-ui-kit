import { addons } from 'storybook/manager-api';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';
import { ThemeColorScheme } from '../src/types/theme';
import { createPlainerVStorybookChromeTheme } from './storybookManagerTheme';

const STORAGE_KEY = 'plainerv-color-scheme';

/**
 * Стартовая тема shell по ключу палитры (синхронно с превью).
 */
function readStoredPreviewColorScheme(): 'light' | 'dark' {
  try {
    if (globalThis.localStorage?.getItem(STORAGE_KEY) === ThemeColorScheme.DARK) {
      return 'dark';
    }
  } catch {
    /* приватный режим / недоступный storage */
  }
  return 'light';
}

addons.setConfig({
  theme: createPlainerVStorybookChromeTheme(readStoredPreviewColorScheme()),
});

addons.register('plainerv-sync-chrome-theme', () => {
  const channel = addons.getChannel();
  channel.on(
    GLOBALS_UPDATED,
    (payload: { globals?: { colorScheme?: string; theme?: string } } | undefined) => {
      const colorScheme = payload?.globals?.colorScheme;

      if (colorScheme === ThemeColorScheme.DARK) {
        addons.setConfig({ theme: createPlainerVStorybookChromeTheme('dark') });
        return;
      }

      if (colorScheme === ThemeColorScheme.LIGHT) {
        addons.setConfig({ theme: createPlainerVStorybookChromeTheme('light') });
        return;
      }

      // Legacy: flat global `theme` до перехода на две оси
      const legacyTheme = payload?.globals?.theme;
      if (legacyTheme === 'dark' || legacyTheme === 'glassDark' || legacyTheme === 'kidsDark' || legacyTheme === 'kidsBoysDark' || legacyTheme === 'kidsGirlsDark') {
        addons.setConfig({ theme: createPlainerVStorybookChromeTheme('dark') });
        return;
      }

      if (legacyTheme === 'light' || legacyTheme === 'glassLight' || legacyTheme === 'kidsLight' || legacyTheme === 'kidsBoysLight' || legacyTheme === 'kidsGirlsLight') {
        addons.setConfig({ theme: createPlainerVStorybookChromeTheme('light') });
      }
    },
  );
});
