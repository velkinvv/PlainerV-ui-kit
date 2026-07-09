import type { Decorator } from '@storybook/react';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'storybook/theming';
import { createPlainerVStorybookChromeTheme } from './storybookManagerTheme';
import {
  applyPlainervStorybookDocsCssVariables,
  resolvePlainervStorybookDocsThemeModeFromAxes,
  type PlainervStorybookDocsThemeMode,
} from './plainervStorybookDocsTokens';
import { resolveStorybookGlobalsAxes } from '../src/handlers/storybookThemeHandlers';

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
    resolvedTheme === 'dark' ||
    resolvedTheme === 'glassDark' ||
    resolvedTheme === 'kidsBoysDark' ||
    resolvedTheme === 'kidsGirlsDark' ||
    resolvedTheme === 'kidsDark'
      ? darkDocsChromeTheme
      : lightDocsChromeTheme;

  return <ThemeProvider theme={docsChromeTheme}>{children}</ThemeProvider>;
};

/**
 * Синхронизирует `storybook/theming` и CSS-переменные Docs с globals themeVariant × colorScheme.
 */
export const withStorybookDocsChromeTheme: Decorator = (Story, context) => {
  const axes = resolveStorybookGlobalsAxes(context.globals);
  const resolvedTheme = resolvePlainervStorybookDocsThemeModeFromAxes(
    axes.themeVariant,
    axes.colorScheme,
  );

  applyPlainervStorybookDocsCssVariables(resolvedTheme);

  return (
    <DocsChromeThemeWrapper resolvedTheme={resolvedTheme}>
      <Story />
    </DocsChromeThemeWrapper>
  );
};
