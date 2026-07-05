import type { Decorator } from '@storybook/react';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'storybook/theming';
import { createPlainerVStorybookChromeTheme } from './storybookManagerTheme';
import {
  applyPlainervStorybookDocsCssVariables,
  resolvePlainervStorybookDocsThemeMode,
  type PlainervStorybookDocsThemeMode,
} from './plainervStorybookDocsTokens';

/** Тема блоков Docs (таблица пропсов, превью, тулбар зума) — из палитры UI-kit. */
const lightDocsChromeTheme = createPlainerVStorybookChromeTheme('light');
const darkDocsChromeTheme = createPlainerVStorybookChromeTheme('dark');

interface DocsChromeThemeWrapperProps {
  children: React.ReactNode;
  resolvedTheme: PlainervStorybookDocsThemeMode;
}

const DocsChromeThemeWrapper = ({ children, resolvedTheme }: DocsChromeThemeWrapperProps) => {
  useEffect(() => {
    applyPlainervStorybookDocsCssVariables(resolvedTheme);
  }, [resolvedTheme]);

  const docsChromeTheme =
    resolvedTheme === 'dark' || resolvedTheme === 'glassDark'
      ? darkDocsChromeTheme
      : lightDocsChromeTheme;

  return <ThemeProvider theme={docsChromeTheme}>{children}</ThemeProvider>;
};

/**
 * Синхронизирует `storybook/theming` и CSS-переменные Docs с глобалом `theme` (addon-themes).
 */
export const withStorybookDocsChromeTheme: Decorator = (Story, context) => {
  const resolvedTheme = resolvePlainervStorybookDocsThemeMode(context.globals?.theme);

  applyPlainervStorybookDocsCssVariables(resolvedTheme);

  return (
    <DocsChromeThemeWrapper resolvedTheme={resolvedTheme}>
      <Story />
    </DocsChromeThemeWrapper>
  );
};
