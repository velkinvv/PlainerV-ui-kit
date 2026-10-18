import { builtinThemeCatalog, ThemeMode, ThemeProvider } from '@velkinvv/plainerv';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { DEFAULT_THEME_AXES, DocsAppContent, type ThemeAxisState } from './App';

export type SsrRenderResult = {
  /** Разметка приложения для конкретного маршрута. */
  html: string;
  /** Готовые `<style>`-теги styled-components этого рендера. */
  styles: string;
};

/**
 * Рендерит маршрут документации в строку для статической генерации.
 * Стили кита и документации собираются через `ServerStyleSheet`, поэтому
 * в HTML попадает тот же CSS, что применит клиент после гидратации.
 */
export const renderRoute = (
  url: string,
  themeAxes: ThemeAxisState = DEFAULT_THEME_AXES,
): SsrRenderResult => {
  const sheet = new ServerStyleSheet();

  try {
    const html = renderToString(
      sheet.collectStyles(
        <StyleSheetManager sheet={sheet.instance}>
          <ThemeProvider
            themes={builtinThemeCatalog}
            initialThemeMode={themeAxes.colorMode === 'dark' ? ThemeMode.dark : ThemeMode.light}
          >
            <StaticRouter location={url}>
              <DocsAppContent themeAxes={themeAxes} onThemeAxesChange={() => undefined} />
            </StaticRouter>
          </ThemeProvider>
        </StyleSheetManager>,
      ),
    );

    return { html, styles: sheet.getStyleTags() };
  } finally {
    sheet.seal();
  }
};
