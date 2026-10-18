import fs from 'node:fs';
import path from 'node:path';
import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import rehypeShiki from '@shikijs/rehype';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type Plugin, type PluginOption } from 'vite';

// Подпуть сайта задаётся один раз: DOCS_BASE_PATH читают и сборка, и prerender
// (scripts/prerender.mjs), иначе canonical и sitemap разойдутся с адресами ассетов.
const basePath = `${(process.env.DOCS_BASE_PATH ?? '/docs').replace(/\/+$/, '')}/`;

/**
 * web/src/styles/fonts.css ссылается на ./fonts/montserrat, а сами файлы лежат
 * в web/src/variables/fonts/montserrat. Пакет мирится с этим копированием
 * в dist (rollup.config.mjs), но при импорте из исходников url не резолвится:
 * Vite оставлял его как есть, и браузер получал 404 на каждый вес шрифта.
 */
const fixFontsPath = (): Plugin => ({
  name: 'docs-app-fix-fonts-path',
  enforce: 'pre',
  load(id) {
    if (!id.replace(/\\/g, '/').endsWith('/src/styles/fonts.css')) {
      return null;
    }

    const source = fs.readFileSync(id, 'utf8');

    return source.replace(
      /url\((['"]?)\.\/fonts\/montserrat\//g,
      'url($1../variables/fonts/montserrat/',
    );
  },
});

export default defineConfig(({ command, mode }) => {
  // Кит подключаем из исходников и в dev, и в сборке: собранный barrel dist
  // втягивает весь пакет в стартовый чанк, а исходники дают tree-shaking.
  const useSourceAlias = command === 'serve' || command === 'build';

  return {
    base: basePath,
    plugins: [
      fixFontsPath(),
      mdx({
        // Без этого MDX не читает компоненты из MDXProvider, и legacy-теги
        // архивных руководств (`<ButtonInteractiveExamples />`) роняли страницу.
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          rehypeAutolinkHeadings,
          [rehypeShiki, { theme: 'github-dark' }],
        ],
      }),
      react(),
      ...(mode === 'analyze'
        ? [
            visualizer({
              filename: path.resolve(__dirname, 'dist/docs-bundle-stats.html'),
              title: 'Docs app bundle analysis',
              gzipSize: true,
              brotliSize: true,
              open: false,
            }),
          ]
        : []),
      // Плагины (@mdx-js/rollup, @vitejs/plugin-react) поднимаются в web/node_modules
      // и типизированы типами rollup/vite оттуда, а конфиг — типами docs-app.
      // Структурно это одни и те же объекты, расходятся только объявления типов.
    ] as unknown as PluginOption[],
    resolve: {
      // Кит подключается из `../src`, поэтому его импорты `react` резолвились
      // из web/node_modules, а код docs-app — из docs-app/node_modules. Две
      // копии React ломали гидратацию («Cannot read properties of null
      // (reading 'useMemo')») и страница оставалась пустой.
      dedupe: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'styled-components',
        'react-router-dom',
        'react-live',
      ],
      alias: useSourceAlias
        ? [
            {
              find: /^@velkinvv\/plainerv$/,
              replacement: path.resolve(__dirname, '../src/index.ts'),
            },
            {
              find: /^@\//,
              replacement: `${path.resolve(__dirname, '../src')}/`,
            },
          ]
        : [],
    },
    server: {
      port: 6500,
      strictPort: true,
    },
    preview: {
      port: 6500,
      strictPort: true,
    },
  };
});
