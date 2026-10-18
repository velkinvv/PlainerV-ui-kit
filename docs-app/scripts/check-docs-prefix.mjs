import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(scriptDir, '..');
const distDir = path.join(appRoot, 'dist');
const basePrefix = '/docs/';

const failures = [];

const collectFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
};

const check = (condition, message) => {
  if (!condition) {
    failures.push(message);
  }
};

// Грубая оценка текста, который видит читатель с отключённым JavaScript:
// берём разметку от контейнера приложения, выкидываем теги и сущности.
const countRenderedText = (html) => {
  const markerIndex = html.indexOf('data-prerendered="true"');
  const body = markerIndex === -1 ? html : html.slice(markerIndex);

  return body
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim().length;
};

const main = async () => {
  const files = await collectFiles(distDir);
  const relative = (file) => path.relative(distDir, file).split(path.sep).join('/');
  const htmlFiles = files.filter((file) => file.endsWith('.html'));

  const versioning = JSON.parse(
    (await readFile(path.join(appRoot, 'docs-versioning.config.json'), 'utf8')).replace(
      /^\uFEFF/,
      '',
    ),
  );
  const platform = versioning.platforms[0];
  const currentVersion = platform?.defaultVersionId ?? platform?.versions?.[0]?.id ?? 'latest';
  const currentVersionSegment = `/${platform?.id}/${currentVersion}/`;

  check(htmlFiles.length > 0, 'В dist нет HTML-файлов: сборка не выполнена?');

  const rootHtml = await readFile(path.join(distDir, 'index.html'), 'utf8');
  check(
    rootHtml.includes(`url=${basePrefix}`),
    `dist/index.html не редиректит на префикс ${basePrefix}`,
  );

  const assetPattern = /(?:<script[^>]+src="([^"]+)"|<link[^>]+rel="stylesheet"[^>]+href="([^"]+)")/g;
  // Алиасы /latest — намеренно НЕ пререндеренные страницы: они только уводят
  // на канонический адрес актуальной версии. Поэтому из общего списка страниц
  // они исключаются и проверяются отдельным набором условий ниже.
  const latestAliases = htmlFiles
    .map(relative)
    .filter((name) => name.split('/').includes('latest'));
  const prerenderedPages = htmlFiles
    .map(relative)
    .filter((name) => name !== 'index.html' && name !== '404.html')
    .filter((name) => !latestAliases.includes(name));
  const names = new Set(files.map(relative));
  const verifiedOgImages = new Set();

  check(prerenderedPages.length > 0, 'Не найдено ни одной пререндеренной страницы.');

  for (const pageName of prerenderedPages) {
    const html = await readFile(path.join(distDir, pageName), 'utf8');

    check(
      html.includes('data-prerendered="true"'),
      `${pageName}: нет маркера data-prerendered — страница не пререндерена`,
    );

    const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)" \/>/);
    check(Boolean(ogImageMatch), `${pageName}: нет meta property="og:image"`);

    if (ogImageMatch) {
      const ogImagePath = new URL(ogImageMatch[1], 'https://docs.invalid').pathname;
      check(
        ogImagePath.startsWith(`${basePrefix}og/`),
        `${pageName}: OG-картинка должна находиться внутри ${basePrefix}og/`,
      );

      if (ogImagePath.startsWith(`${basePrefix}og/`)) {
        const relativeOgImagePath = ogImagePath.slice(basePrefix.length);
        check(
          names.has(relativeOgImagePath),
          `${pageName}: файл OG-картинки ${relativeOgImagePath} не найден в dist`,
        );
        check(
          !verifiedOgImages.has(relativeOgImagePath),
          `${pageName}: OG-картинка ${relativeOgImagePath} используется повторно`,
        );
        verifiedOgImages.add(relativeOgImagePath);
      }
    }

    if (!html.includes(`${basePrefix}assets/`) && !html.includes(`${basePrefix}fonts/`)) {
      check(false, `${pageName}: нет ссылок на ассеты внутри ${basePrefix}`);
    }

    for (const match of html.matchAll(assetPattern)) {
      const assetPath = match[1] ?? match[2] ?? '';
      check(
        assetPath.startsWith(basePrefix) || /^https?:\/\//.test(assetPath),
        `${pageName}: ресурс вне префикса ${basePrefix} — ${assetPath}`,
      );
    }

    // Страница должна читаться без JavaScript: разметка приходит готовой.
    const renderedLength = countRenderedText(html);
    check(
      renderedLength > 300,
      `${pageName}: без JavaScript остаётся ${renderedLength} символов текста (мало, похоже на пустой шелл)`,
    );

    if (pageName.includes('/components/')) {
      check(
        html.includes('application/ld+json') &&
          html.includes('TechArticle') &&
          html.includes('BreadcrumbList'),
        `${pageName}: нет JSON-LD TechArticle/BreadcrumbList`,
      );

      const isCurrentVersion = pageName.includes(currentVersionSegment);
      const expectedRobots = isCurrentVersion ? 'index, follow' : 'noindex, follow';

      check(
        html.includes(`<meta name="robots" content="${expectedRobots}" />`),
        `${pageName}: robots должен быть «${expectedRobots}» для этой версии`,
      );

      if (!isCurrentVersion) {
        check(
          html.includes('rel="canonical"') && html.includes(currentVersionSegment.slice(0, -1)),
          `${pageName}: архивная версия должна ссылаться canonical на актуальную`,
        );
      }
    }

    const [localeSegment] = pageName.split('/');

    check(
      html.includes(`<html lang="${localeSegment}">`),
      `${pageName}: язык документа должен быть «${localeSegment}»`,
    );

    check(
      pageName.includes(currentVersionSegment)
        ? html.includes(`data-pagefind-filter="locale:${localeSegment}"`)
        : html.includes('data-pagefind-ignore="all"'),
      `${pageName}: неверная разметка для поиска: актуальной версии нужны фильтры, архивной — исключение`,
    );
  }

  check(latestAliases.length > 0, 'Не найдено ни одного алиаса /latest.');

  for (const aliasName of latestAliases) {
    const html = await readFile(path.join(distDir, aliasName), 'utf8');
    const target = `${basePrefix}${aliasName
      .replace('/latest/', `/${currentVersion}/`)
      .replace(/\/index\.html$/, '/')}`;

    check(html.includes(`url=${target}`), `${aliasName}: алиас /latest не уводит на ${target}`);
    check(
      html.includes(`href="${target}"`) && /rel="canonical"/.test(html),
      `${aliasName}: у алиаса /latest нет canonical на ${target}`,
    );
    check(
      /<meta name="robots" content="noindex/.test(html),
      `${aliasName}: алиас /latest должен быть noindex`,
    );
  }

  const notFoundHtml = await readFile(path.join(distDir, '404.html'), 'utf8');
  check(
    /<meta name="robots" content="noindex/.test(notFoundHtml),
    'dist/404.html: нет meta robots noindex',
  );

  check(names.has('robots.txt'), 'dist/robots.txt не найден');

  if (names.has('sitemap.xml')) {
    const sitemap = await readFile(path.join(distDir, 'sitemap.xml'), 'utf8');
    check(sitemap.includes('<loc>'), 'dist/sitemap.xml пуст');
  }

  check(names.has('pagefind/pagefind.js'), 'dist/pagefind/pagefind.js не найден: поиск не собран');

  if (names.has('pagefind/pagefind-entry.json')) {
    const entry = JSON.parse(
      await readFile(path.join(distDir, 'pagefind/pagefind-entry.json'), 'utf8'),
    );
    const indexedLanguages = Object.keys(entry.languages ?? {}).sort();
    const expectedLanguages = versioning.locales.map((locale) => locale.id).sort();

    check(
      indexedLanguages.join(',') === expectedLanguages.join(','),
      `Индекс Pagefind: языки [${indexedLanguages.join(', ')}] вместо [${expectedLanguages.join(', ')}]`,
    );

    const indexedPages = Object.values(entry.languages ?? {}).reduce(
      (total, info) => total + (info.page_count ?? 0),
      0,
    );

    check(
      indexedPages > 0 && indexedPages <= prerenderedPages.length,
      `Индекс Pagefind: ${indexedPages} страниц при ${prerenderedPages.length} пререндеренных — похоже, архивные версии не исключены`,
    );
  }

  if (failures.length > 0) {
    console.error('[ERROR] Проверка префикса /docs/ не пройдена:');
    for (const failure of failures) {
      console.error(`  - ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    `[OK] Префикс ${basePrefix} подтверждён: ${prerenderedPages.length} страниц, алиасы /latest (${latestAliases.length}), текст читается без JavaScript, JSON-LD на страницах компонентов, индекс поиска по локалям, редирект с корня, ассеты и SEO-артефакты на месте.`,
  );
};

main().catch((error) => {
  console.error('[ERROR] Проверка префикса упала:', error);
  process.exitCode = 1;
});
