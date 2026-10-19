import { builtinThemeCatalog, ThemeMode, ThemeProvider } from '@velkinvv/plainerv';
import { Writable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { DEFAULT_THEME_AXES, DocsAppContent, type ThemeAxisState } from './App';

export type SsrRenderResult = {
  /** Разметка приложения для конкретного маршрута. */
  html: string;
  /** Готовые `<style>`-теги styled-components этого рендера. */
  styles: string;
  /** Ошибки Suspense-границ: страница отрендерилась, но её часть осталась fallback. */
  errors: string[];
};

/**
 * Рендерит маршрут документации в строку для статической генерации.
 *
 * Потоковый рендер с `onAllReady` нужен из-за руководств: MDX грузится через
 * `React.lazy`, и `renderToString` отдавал вместо текста Suspense-fallback.
 * `onAllReady` срабатывает, когда разрешились все границы Suspense.
 *
 * Ошибка внутри границы не прерывает генерацию: страница собирается с
 * fallback-ом, а сообщение возвращается в `errors`, чтобы пререндер отчитался.
 */
export const renderRoute = async (
  url: string,
  themeAxes: ThemeAxisState = DEFAULT_THEME_AXES,
): Promise<SsrRenderResult> => {
  const sheet = new ServerStyleSheet();
  const errors: string[] = [];

  try {
    const html = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = [];
      const writable = new Writable({
        write(chunk: Buffer, _encoding, callback) {
          chunks.push(Buffer.from(chunk));
          callback();
        },
      });

      writable.on('finish', () => resolve(Buffer.concat(chunks).toString('utf8')));
      writable.on('error', reject);

      let stream: ReturnType<typeof renderToPipeableStream> | null = null;

      stream = renderToPipeableStream(
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
        {
          onAllReady() {
            stream?.pipe(writable);
          },
          onError(error) {
            errors.push(error instanceof Error ? error.message : String(error));
          },
        },
      );
    });

    return { html, styles: sheet.getStyleTags(), errors };
  } finally {
    sheet.seal();
  }
};
