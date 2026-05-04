import { addons } from 'storybook/manager-api';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';
import { createPlainerVStorybookChromeTheme } from './storybookManagerTheme';

const STORAGE_KEY = 'storybook-theme';

/**
 * Стартовая тема shell по тому же ключу, что и превью / {@link ThemeProvider}.
 */
function readStoredPreviewTheme(): 'light' | 'dark' {
  try {
    if (globalThis.localStorage?.getItem(STORAGE_KEY) === 'dark') {
      return 'dark';
    }
  } catch {
    /* приватный режим / недоступный storage */
  }
  return 'light';
}

addons.setConfig({
  theme: createPlainerVStorybookChromeTheme(readStoredPreviewTheme()),
});

addons.register('plainerv-sync-chrome-theme', () => {
  const channel = addons.getChannel();
  channel.on(
    GLOBALS_UPDATED,
    (payload: { globals?: { theme?: string } } | undefined) => {
      const themeName = payload?.globals?.theme;
      if (themeName === 'dark') {
        addons.setConfig({ theme: createPlainerVStorybookChromeTheme('dark') });
        return;
      }
      if (themeName === 'light') {
        addons.setConfig({ theme: createPlainerVStorybookChromeTheme('light') });
      }
    },
  );
});
