import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { build } from 'vite';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(scriptDir, '..');
const distDir = path.join(appRoot, 'dist');
const ssrOutDir = path.join(appRoot, '.docs-ssr');
const siteUrl = (process.env.DOCS_SITE_URL ?? '').replace(/\/+$/, '');
// Публичный префикс сайта: в сборке задан base '/docs/', поэтому внешние адреса
// (canonical, hreflang, sitemap, og:image, JSON-LD) строятся с ним, а файлы
// на диске — без него (dist/<локаль>/<платформа>/<версия>/index.html).
const publicBase = (process.env.DOCS_BASE_PATH ?? '/docs').replace(/\/+$/, '');

const readJson = async (filePath) =>
  JSON.parse((await readFile(filePath, 'utf8')).replace(/^\uFEFF/, ''));

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  );

// Внутри `<script>` нельзя оставлять сырые `<`, `>` и `&`: экранируем их
// юникод-последовательностями, оставаясь валидным JSON.
const serializeJsonLd = (value) =>
  JSON.stringify(value).replace(/[<>&]/g, (char) => `\\u003${char.charCodeAt(0).toString(16)}`);

const breadcrumbLabels = {
  ru: 'Компоненты',
  en: 'Components',
};

/** Собирает `TechArticle` и `BreadcrumbList` для страницы компонента. */
const buildComponentJsonLd = ({ name, locale, routePath, basePath, description }) => {
  const absolute = (route) => `${siteUrl}${publicBase}${route}/`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: `${name} — PlainerV Docs`,
      description,
      inLanguage: locale,
      url: absolute(routePath),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'PlainerV Docs', item: absolute('') },
        {
          '@type': 'ListItem',
          position: 2,
          name: breadcrumbLabels[locale] ?? breadcrumbLabels.ru,
          item: absolute(basePath),
        },
        { '@type': 'ListItem', position: 3, name },
      ],
    },
  ];
};

const writeOgImage = async (route, fontData) => {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: 64,
          background: 'linear-gradient(135deg, #111827 0%, #263b68 100%)',
          color: '#ffffff',
          fontFamily: 'IBM Plex Sans',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { fontSize: 22, color: '#b9c7e3', letterSpacing: 3 },
              children: 'PLAINERV  /  DOCUMENTATION',
            },
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { fontSize: 56, lineHeight: 1.12, fontWeight: 400 },
                    children: route.title.length > 72 ? `${route.title.slice(0, 69)}…` : route.title,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      marginTop: 24,
                      fontSize: 25,
                      lineHeight: 1.4,
                      color: '#d3dced',
                    },
                    children:
                      route.description.length > 150
                        ? `${route.description.slice(0, 147)}…`
                        : route.description,
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: { fontSize: 20, color: '#a9b8d4' },
              children: 'UI KIT  ·  REACT',
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'IBM Plex Sans', data: fontData, weight: 400, style: 'normal' }],
    },
  );
  const imagePath = `og/${route.path.replace(/^\/+/, '')}.png`;
  const outputPath = path.join(distDir, imagePath);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, new Resvg(svg).render().asPng());

  return `${publicBase}/${imagePath}`;
};

const buildHeadTags = ({
  title,
  description,
  canonicalPath,
  alternates,
  robots = 'index, follow',
  jsonLd,
  ogImagePath,
}) => {
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
  ];

  // Без DOCS_SITE_URL абсолютный canonical построить нельзя, но канонический
  // адрес обязателен и локально: используем путь от корня сайта, а в CI
  // (где DOCS_SITE_URL задан) получаем полноценный абсолютный URL.
  const canonicalUrl = `${siteUrl ?? ''}${
    canonicalPath === '/' ? '/' : `${canonicalPath}/`
  }`;
  tags.push(`<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`);
  if (siteUrl) {
    tags.push(`<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`);
  }

  tags.push(`<meta name="robots" content="${escapeHtml(robots)}" />`);
  tags.push(`<meta property="og:type" content="article" />`);
  tags.push(`<meta property="og:title" content="${escapeHtml(title)}" />`);
  tags.push(`<meta property="og:description" content="${escapeHtml(description)}" />`);
  if (ogImagePath) {
    const absoluteOgImagePath = siteUrl ? `${siteUrl}${ogImagePath}` : ogImagePath;
    tags.push(`<meta property="og:image" content="${escapeHtml(absoluteOgImagePath)}" />`);
    tags.push('<meta property="og:image:width" content="1200" />');
    tags.push('<meta property="og:image:height" content="630" />');
  }
  tags.push(`<meta name="twitter:card" content="${ogImagePath ? 'summary_large_image' : 'summary'}" />`);
  tags.push(`<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  tags.push(`<meta name="twitter:description" content="${escapeHtml(description)}" />`);

  for (const alternate of alternates) {
    tags.push(
      `<link rel="alternate" hreflang="${escapeHtml(alternate.locale)}" href="${escapeHtml(
        siteUrl ? `${siteUrl}${alternate.path}/` : alternate.path,
      )}" />`,
    );
  }

  const defaultAlternate = alternates.find((alternate) => alternate.isDefault) ?? alternates[0];
  if (defaultAlternate) {
    tags.push(
      `<link rel="alternate" hreflang="x-default" href="${escapeHtml(
        siteUrl ? `${siteUrl}${defaultAlternate.path}/` : defaultAlternate.path,
      )}" />`,
    );
  }

  for (const entry of jsonLd ?? []) {
    tags.push(`<script type="application/ld+json">${serializeJsonLd(entry)}</script>`);
  }

  return tags.join('\n    ');
};

const injectIntoTemplate = (
  template,
  { html = '', styles = '', headTags, rootAttributes = '', lang, prerendered = true },
) => {
  let result = template;

  // Язык документа нужен и для a11y, и для Pagefind: он разносит страницы
  // по языковым индексам.
  if (lang) {
    result = result.replace(/<html lang="[^"]*">/, `<html lang="${escapeHtml(lang)}">`);
  }

  result = result.replace(/<title>[\s\S]*?<\/title>/, '');
  result = result.replace(
    '</head>',
    `  ${headTags}\n    ${prerendered ? styles : ''}\n  </head>`,
  );

  if (prerendered) {
    result = result.replace(
      /<div id="root"><\/div>/,
      `<div id="root" data-prerendered="true"${rootAttributes}>${html}</div>`,
    );
  }

  return result;
};

const toFileName = (routePath) => path.join(distDir, routePath.replace(/^\//, ''), 'index.html');

const buildSitemap = (routePaths) => {
  const entries = routePaths
    .map((routePath) => `  <url><loc>${escapeHtml(`${siteUrl}${routePath}/`)}</loc></url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
};

const buildRobots = () => {
  const lines = ['User-agent: *', 'Allow: /', ''];

  if (siteUrl) {
    lines.push(`Sitemap: ${siteUrl}${publicBase}/sitemap.xml`, '');
  }

  return lines.join('\n');
};

const resolveSsrEntry = async () => {
  const entries = await readdir(ssrOutDir);
  const entry = entries.find((name) => /^entry-server\.m?js$/.test(name));
  if (!entry) {
    throw new Error(`SSR-бандл не найден в ${ssrOutDir}. Содержимое: ${entries.join(', ')}`);
  }
  return path.join(ssrOutDir, entry);
};

const main = async () => {
  const versioning = await readJson(path.join(appRoot, 'docs-versioning.config.json'));
  const manifest = await readJson(path.join(appRoot, 'src/generated/docs-manifest.json'));
  const contentManifest = await readJson(path.join(appRoot, 'src/generated/content-manifest.json'));

  if (!siteUrl) {
    console.warn(
      '[WARN] DOCS_SITE_URL не задан: canonical и hreflang останутся относительными, og:url не проставляется.',
    );
  }

  const template = await readFile(path.join(distDir, 'index.html'), 'utf8');
  const ogFont = await readFile(path.join(appRoot, 'fonts', 'IBMPlexSans-Regular.ttf'));

  // Шаблон перезаписывается редиректом в конце, поэтому проверку делаем до
  // подстановки: повторный запуск без `vite build` иначе собрал бы мусор.
  if (!/<div id="root"><\/div>/.test(template)) {
    throw new Error(
      'dist/index.html без пустого контейнера #root: нужен свежий `vite build` перед prerender (шаблон уже перезаписан прошлым запуском).',
    );
  }

  await build({
    root: appRoot,
    logLevel: 'warn',
    // В SSR-контуре всё собирает Vite: иначе Node подтягивает вторые копии
    // `react`/`styled-components` из соседних node_modules и ломает хуки и `styled`.
    ssr: {
      noExternal: true,
    },
    // Кит лежит в соседнем `web/node_modules`, поэтому одну и ту же копию
    // React нужно принудительно выбирать для всего графа.
    resolve: {
      dedupe: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'styled-components',
      'react-router-dom',
      'react-live',
      '@mdx-js/react',
    ],
    },
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: '.docs-ssr',
      emptyOutDir: true,
      copyPublicDir: false,
      minify: false,
    },
  });

  const ssrEntryPath = await resolveSsrEntry();
  const { renderRoute } = await import(pathToFileURL(ssrEntryPath).href);

  const locales = versioning.locales.map((locale) => ({
    id: locale.id,
    isDefault: Boolean(locale.default),
  }));
  const defaultLocale = locales.find((locale) => locale.isDefault)?.id ?? locales[0]?.id ?? 'ru';
  const platform = versioning.platforms[0];
  const defaultVersion = platform?.defaultVersionId ?? platform?.versions?.[0]?.id ?? 'latest';

  // Все версии платформы из конфига: актуальная индексируется, архивные
  // получают `noindex` и canonical на актуальную, чтобы не конкурировать в выдаче.
  const declaredVersions = (platform?.versions ?? []).map((version) => ({
    id: version.id,
    isCurrent: version.id === defaultVersion,
  }));
  const versions =
    declaredVersions.length > 0 ? declaredVersions : [{ id: defaultVersion, isCurrent: true }];

  const buildAlternates = (versionId, routeSuffix) =>
    locales.map((locale) => ({
      locale: locale.id,
      isDefault: locale.isDefault,
      path: `${publicBase}/${locale.id}/${platform.id}/${versionId}${routeSuffix}`,
    }));

  // Разметка Pagefind: фильтры по локали и версии плюс полное исключение
  // архивных версий из индекса поиска.
  const buildSearchAttributes = (version, locale) =>
    version.isCurrent
      ? ` data-pagefind-filter="locale:${locale.id}" data-pagefind-filter="version:${version.id}"`
      : ' data-pagefind-ignore="all"';

  const routes = [];

  for (const version of versions) {
    for (const locale of locales) {
      const basePath = `/${locale.id}/${platform.id}/${version.id}`;
      const currentBasePath = `/${locale.id}/${platform.id}/${defaultVersion}`;

      routes.push({
        path: basePath,
        title: `PlainerV Docs — ${locale.id}`,
        description: 'Документация UI-кита PlainerV: компоненты, примеры, свойства и руководства.',
        alternates: buildAlternates(version.id, ''),
        robots: version.isCurrent ? 'index, follow' : 'noindex, follow',
        canonicalPath: version.isCurrent ? undefined : currentBasePath,
        inSitemap: version.isCurrent,
        rootAttributes: buildSearchAttributes(version, locale),
        localeId: locale.id,
      });

      for (const component of manifest.components) {
        const componentPath = `${basePath}/components/${component.slug}`;
        const description =
          component.description ?? `Компонент ${component.name} из UI-кита PlainerV: примеры и свойства.`;

        routes.push({
          path: componentPath,
          title: `${component.name} — PlainerV Docs`,
          description,
          alternates: buildAlternates(version.id, `/components/${component.slug}`),
          robots: version.isCurrent ? 'index, follow' : 'noindex, follow',
          canonicalPath: version.isCurrent
            ? undefined
            : `${currentBasePath}/components/${component.slug}`,
          inSitemap: version.isCurrent,
          rootAttributes: buildSearchAttributes(version, locale),
          localeId: locale.id,
          jsonLd: buildComponentJsonLd({
            name: component.name,
            locale: locale.id,
            routePath: componentPath,
            basePath,
            description,
          }),
        });
      }

      for (const guide of contentManifest.guides) {
        if (
          guide.locale !== locale.id ||
          guide.platform !== platform.id ||
          guide.version !== version.id
        ) {
          continue;
        }

        routes.push({
          path: `${basePath}/guides/${guide.slug}`,
          title: `${guide.title} — PlainerV Docs`,
          description:
            guide.description || `Руководство «${guide.title}» в документации UI-кита PlainerV.`,
          alternates: buildAlternates(version.id, `/guides/${guide.slug}`),
          robots: version.isCurrent ? 'index, follow' : 'noindex, follow',
          canonicalPath: version.isCurrent
            ? undefined
            : `${currentBasePath}/guides/${guide.slug}`,
          inSitemap: version.isCurrent,
          rootAttributes: buildSearchAttributes(version, locale),
          localeId: locale.id,
        });
      }
    }
  }

  const sitemapPaths = routes
    .filter((route) => route.inSitemap)
    .map((route) => `${publicBase}${route.path}`);

  const routesWithSsrErrors = [];

  for (const route of routes) {
    const { html, styles, errors } = await renderRoute(route.path);

    if (errors.length > 0) {
      routesWithSsrErrors.push({ path: route.path, messages: errors });
    }

    // OG-картинка нужна каждой пререндеренной странице: `check-docs-prefix`
    // требует `og:image` на всех маршрутах, включая архивные версии.
    const ogImagePath = await writeOgImage(route, ogFont);
    const headTags = buildHeadTags({
      title: route.title,
      description: route.description,
      canonicalPath: `${publicBase}${route.canonicalPath ?? route.path}`,
      alternates: route.alternates,
      robots: route.robots,
      jsonLd: route.jsonLd,
      ogImagePath,
    });

    const page = injectIntoTemplate(template, {
      html,
      styles,
      headTags,
      rootAttributes: route.rootAttributes ?? '',
      lang: route.localeId,
    });

    if (
      !page.includes('data-prerendered="true"') ||
      !page.includes('<style') ||
      !page.includes(`<title>${escapeHtml(route.title)}</title>`)
    ) {
      throw new Error(`Prerender собрал неполный HTML для маршрута ${route.path}`);
    }

    const fileName = toFileName(route.path);

    await mkdir(path.dirname(fileName), { recursive: true });
    await writeFile(fileName, page, 'utf8');
  }

  // /latest — алиас актуальной версии. Nginx не знает, какая версия текущая,
  // а пререндер знает, поэтому на каждый индексируемый адрес кладётся страница
  // с тем же путём, но с `latest` вместо номера версии: она сразу уводит на
  // канонический URL, canonical указывает туда же, а noindex не даёт ссылке
  // попасть в индекс отдельной страницей.
  let latestAliasCount = 0;

  for (const route of routes) {
    if (!route.inSitemap || !route.path.includes(`/${defaultVersion}`)) continue;

    const target = `${publicBase}${route.path}/`;
    const aliasFile = toFileName(route.path.replace(`/${defaultVersion}`, '/latest'));

    await mkdir(path.dirname(aliasFile), { recursive: true });
    await writeFile(
      aliasFile,
      `<!doctype html>
<html lang="${escapeHtml(route.localeId)}">
  <head>
    <meta charset="UTF-8" />
    <meta name="robots" content="noindex, follow" />
    <meta http-equiv="refresh" content="0; url=${escapeHtml(target)}" />
    <link rel="canonical" href="${escapeHtml(siteUrl ? `${siteUrl}${target}` : target)}" />
    <title>${escapeHtml(route.title)}</title>
  </head>
  <body>
    <p>Актуальная версия: <a href="${escapeHtml(target)}">${escapeHtml(target)}</a></p>
  </body>
</html>
`,
      'utf8',
    );

    latestAliasCount += 1;
  }

  const redirectTarget = `${publicBase}/${defaultLocale}/${platform.id}/${defaultVersion}/`;
  await writeFile(
    path.join(distDir, 'index.html'),
    `<!doctype html>
<html lang="${escapeHtml(defaultLocale)}">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=${escapeHtml(redirectTarget)}" />
    <link rel="canonical" href="${escapeHtml(siteUrl ? `${siteUrl}${redirectTarget}` : redirectTarget)}" />
    <title>PlainerV Docs</title>
  </head>
  <body>
    <p>Переход к документации: <a href="${escapeHtml(redirectTarget)}">${escapeHtml(redirectTarget)}</a></p>
  </body>
</html>
`,
    'utf8',
  );

  const notFoundPage = injectIntoTemplate(template, {
    headTags: buildHeadTags({
      title: 'Страница не найдена — PlainerV Docs',
      description: 'Запрошенная страница документации PlainerV не найдена.',
      canonicalPath: `${publicBase}/404`,
      alternates: [],
      robots: 'noindex, follow',
    }),
    prerendered: false,
  });

  await writeFile(path.join(distDir, '404.html'), notFoundPage, 'utf8');

  let sitemapWritten = false;

  if (siteUrl) {
    await writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap(sitemapPaths), 'utf8');
    sitemapWritten = true;
  } else {
    console.warn('[WARN] sitemap.xml не сгенерирован: не задан DOCS_SITE_URL.');
  }

  await writeFile(path.join(distDir, 'robots.txt'), buildRobots(), 'utf8');

  await rm(ssrOutDir, { recursive: true, force: true });

  const seoArtifacts = ['robots.txt', sitemapWritten ? 'sitemap.xml' : null, '404.html']
    .filter(Boolean)
    .join(', ');

  const archivedCount = routes.filter((route) => !route.inSitemap).length;

  if (routesWithSsrErrors.length > 0) {
    console.warn(
      `[WARN] Страниц с ошибками SSR: ${routesWithSsrErrors.length}. Первые: ${routesWithSsrErrors
        .slice(0, 3)
        .map((item) => `${item.path} (${item.messages[0] ?? 'без текста'})`)
        .join('; ')}`,
    );
  }

  console.log(
    `[OK] Prerender завершён: ${routes.length} страниц (${routes.length - archivedCount} индексируемых${
      archivedCount > 0 ? `, ${archivedCount} архивных с noindex` : ''
    }), алиасы /latest (${latestAliasCount}), редирект с корня, SEO-артефакты (${seoArtifacts}).`,
  );
};

main().catch((error) => {
  console.error('[ERROR] Prerender упал:', error);
  process.exitCode = 1;
});
