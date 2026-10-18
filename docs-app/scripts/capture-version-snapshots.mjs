#!/usr/bin/env node
/**
 * Снятие превью примеров актуальной версии — артефакты для архивных версий.
 *
 * Пока версия живая, её примеры рендерятся живым китом. Перед сменой
 * актуальной версии скрипт снимает PNG каждого примера и складывает рядом JSON
 * со сниппетом: когда версия станет архивной, страница покажет эти файлы
 * вместо живого рендера.
 *
 * Артефакты: `public/version-snapshots/<version>/<component>/<example>.png`
 * (+ `<example>.json`, `index.json`).
 *
 * Требует запущенного сервера документации (по умолчанию `npm run preview`,
 * `http://localhost:6500/docs`).
 */
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const DOCS_APP_ROOT = path.resolve(SCRIPT_DIRECTORY, '..');
const CONFIG_FILE = path.join(DOCS_APP_ROOT, 'docs-versioning.config.json');
const MANIFEST_FILE = path.join(DOCS_APP_ROOT, 'src/generated/docs-manifest.json');
const OUTPUT_ROOT = path.join(DOCS_APP_ROOT, 'public/version-snapshots');

const readJson = async (filePath) => JSON.parse(await fs.readFile(filePath, 'utf8'));

const parseCliArguments = (argv) => {
  const result = {
    baseUrl: 'http://localhost:6500/docs',
    versionId: '',
    localeId: '',
    componentSlugs: [],
    force: false,
    timeout: 30000,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    const value = argv[index + 1];

    if (argument === '--url' && value) {
      result.baseUrl = value.replace(/\/+$/, '');
      index += 1;
    } else if (argument === '--version' && value) {
      result.versionId = value;
      index += 1;
    } else if (argument === '--locale' && value) {
      result.localeId = value;
      index += 1;
    } else if (argument === '--component' && value) {
      result.componentSlugs = value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
      index += 1;
    } else if (argument === '--force') {
      result.force = true;
    } else if (argument === '--timeout' && value) {
      const parsedTimeout = Number.parseInt(value, 10);
      if (Number.isFinite(parsedTimeout) && parsedTimeout > 0) {
        result.timeout = parsedTimeout;
      }
      index += 1;
    }
  }

  return result;
};

const assertServerIsReachable = async (baseUrl, timeout) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${baseUrl}/`, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
  } catch (error) {
    throw new Error(
      `Сервер документации недоступен по ${baseUrl} (${error.message}). ` +
        'Соберите документацию и запустите `npm run preview` в web/docs-app.',
    );
  } finally {
    clearTimeout(timer);
  }
};

const captureExample = async (page, selector, outputPath, timeout) => {
  // Живой предпросмотр подгружается лениво (IntersectionObserver + lazy-чанк),
  // поэтому ждём появления контейнера, а не проверяем DOM один раз.
  let element = null;
  try {
    element = await page.waitForSelector(selector, { timeout, visible: true });
  } catch {
    return false;
  }
  if (!element) return false;

  await element.evaluate((node) => node.scrollIntoView({ block: 'center' }));

  // Плейсхолдер «загружается» уже в DOM, но сам пример приходит ленивым
  // чанком: без этого ожидания на снимке остаётся пустая рамка.
  try {
    await page.waitForFunction(
      (canvasSelector) => {
        const canvas = document.querySelector(canvasSelector);
        if (!canvas || canvas.childElementCount === 0) return false;
        const text = (canvas.textContent ?? '').toLowerCase();
        return !text.includes('загружается') && !text.includes('загрузится');
      },
      { timeout, polling: 100 },
      selector,
    );
  } catch {
    return false;
  }

  await new Promise((resolve) => setTimeout(resolve, 250));

  const box = await element.boundingBox();
  if (!box || box.width === 0 || box.height === 0) return false;

  // Оверлеи (Drawer, Modal) рендерятся в портал вне контейнера примера: сам
  // контейнер остаётся пустым, и снимок элемента получался нулевого размера.
  const hasVisibleContent = await element.evaluate((node) => {
    if ((node.textContent ?? '').trim().length > 0) return true;
    return Boolean(node.querySelector('svg, img, canvas, input, textarea, select, button'));
  });

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  if (hasVisibleContent) {
    await element.screenshot({ path: outputPath });
  } else {
    await page.screenshot({ path: outputPath });
  }
  return true;
};

const launchBrowser = async () => {
  // В CI у контейнера нет user namespaces для sandbox Chromium.
  const args = process.env.CI ? ['--no-sandbox', '--disable-setuid-sandbox'] : [];

  try {
    return await puppeteer.launch({ headless: 'new', args });
  } catch (error) {
    // Скачанный Chromium не установлен — используем системный Chrome.
    console.warn(
      `[snapshots] Chromium puppeteer недоступен (${error.message.split('\n')[0]}), пробую системный Chrome`,
    );
    return await puppeteer.launch({ headless: 'new', channel: 'chrome', args });
  }
};

const main = async () => {
  const options = parseCliArguments(process.argv.slice(2));
  const configuration = await readJson(CONFIG_FILE);
  const docsManifest = await readJson(MANIFEST_FILE);

  const platform = configuration.platforms.find((item) => item.id === 'web');
  if (!platform) {
    throw new Error('В docs-versioning.config.json нет платформы web');
  }

  const targetVersionId = options.versionId || platform.defaultVersionId;
  const targetVersion = platform.versions.find((version) => version.id === targetVersionId);
  if (!targetVersion) {
    throw new Error(`Версия ${targetVersionId} не объявлена в docs-versioning.config.json`);
  }
  if (targetVersion.live !== true) {
    throw new Error(
      `Версия ${targetVersionId} архивная: живой рендер на её страницах отключён, снимать нечего. ` +
        'Снапшоты снимаются с живой версии до смены live-флага.',
    );
  }

  const localeId = options.localeId || configuration.locales[0]?.id;
  if (!localeId) {
    throw new Error('В docs-versioning.config.json нет локалей');
  }

  const components = docsManifest.components.filter(
    (component) =>
      options.componentSlugs.length === 0 || options.componentSlugs.includes(component.slug),
  );

  if (components.length === 0) {
    throw new Error(
      `Не найдено компонентов по фильтру --component: ${options.componentSlugs.join(', ') || 'пусто'}`,
    );
  }

  await assertServerIsReachable(options.baseUrl, options.timeout);

  const versionOutputDirectory = path.join(OUTPUT_ROOT, targetVersionId);
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });

  let captured = 0;
  let skipped = 0;
  const failures = [];
  const indexEntries = [];

  try {
    for (const component of components) {
      const componentDirectory = path.join(versionOutputDirectory, component.slug);
      // Завершающий слеш обязателен: без него статик-сервер отдаёт пустой
      // SPA-шаблон вместо пререндеренной страницы, и примеров в DOM нет.
      const pageUrl = `${options.baseUrl}/${localeId}/${platform.id}/${targetVersionId}/components/${component.slug}/`;

      try {
        await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: options.timeout });
      } catch (error) {
        failures.push(`${component.slug}: ${error.message}`);
        continue;
      }

      for (const example of component.examples ?? []) {
        const pngPath = path.join(componentDirectory, `${example.id}.png`);
        const jsonPath = path.join(componentDirectory, `${example.id}.json`);

        if (!options.force && fsSync.existsSync(pngPath) && fsSync.existsSync(jsonPath)) {
          skipped += 1;
          indexEntries.push({ component: component.slug, exampleId: example.id, title: example.title });
          continue;
        }

        const selector = `[data-example-id="${example.id}"] [data-preview-canvas]`;
        const isCaptured = await captureExample(page, selector, pngPath, options.timeout).catch(
          () => false,
        );

        if (!isCaptured) {
          failures.push(`${component.slug}/${example.id}: элемент предпросмотра не найден`);
          continue;
        }

        await fs.mkdir(componentDirectory, { recursive: true });
        await fs.writeFile(
          jsonPath,
          `${JSON.stringify(
            {
              version: targetVersionId,
              component: component.slug,
              exampleId: example.id,
              title: example.title,
              description: example.description ?? '',
              code: example.code ?? '',
              locale: localeId,
              capturedAt: new Date().toISOString(),
            },
            null,
            2,
          )}\n`,
          'utf8',
        );

        indexEntries.push({ component: component.slug, exampleId: example.id, title: example.title });
        captured += 1;
        console.log(`[snapshots] ${component.slug}/${example.id}: снято`);
      }
    }
  } finally {
    await browser.close();
  }

  await fs.mkdir(versionOutputDirectory, { recursive: true });

  // Прогон с `--component` снимает только часть примеров, поэтому индекс
  // объединяется с предыдущим: иначе выборочное обновление теряло записи
  // остальных компонентов.
  const indexFilePath = path.join(versionOutputDirectory, 'index.json');
  let previousEntries = [];
  try {
    const previousIndex = await readJson(indexFilePath);
    previousEntries = Array.isArray(previousIndex.entries) ? previousIndex.entries : [];
  } catch {
    previousEntries = [];
  }

  const mergedEntries = [...previousEntries];
  for (const entry of indexEntries) {
    const key = `${entry.component}/${entry.exampleId}`;
    const existingIndex = mergedEntries.findIndex(
      (item) => `${item.component}/${item.exampleId}` === key,
    );
    if (existingIndex >= 0) {
      mergedEntries[existingIndex] = entry;
    } else {
      mergedEntries.push(entry);
    }
  }

  await fs.writeFile(
    indexFilePath,
    `${JSON.stringify(
      {
        version: targetVersionId,
        locale: localeId,
        capturedAt: new Date().toISOString(),
        entries: mergedEntries,
      },
      null,
      2,
    )}\n`,
    'utf8',
  );

  console.log(
    `[snapshots] ${targetVersionId}: снято ${captured}, уже было ${skipped}, ` +
      `ошибок ${failures.length}, каталог ${path.relative(DOCS_APP_ROOT, versionOutputDirectory)}`,
  );

  if (failures.length > 0) {
    for (const failure of failures) {
      console.warn(`[snapshots] ${failure}`);
    }
    process.exitCode = 1;
  }
};

main().catch((error) => {
  console.error(`[snapshots] ошибка: ${error.stack ?? error.message}`);
  process.exitCode = 1;
});
