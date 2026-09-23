#!/usr/bin/env node
/**
 * Инвентаризация сторис Storybook (фаза 0 плана storybook-to-docs-migration).
 *
 * Обходит `src/**\/*.stories.tsx` и собирает по каждому файлу метрики, нужные для
 * оценки объёма миграции на собственный DSL `*.docs.tsx`.
 *
 * Запуск: node ./scripts/docs-inventory.mjs [--src <dir>] [--out <file>] [--quiet]
 * Результат: `web/docs-inventory.json` (пути и флаги) + сводка в stdout.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(scriptDir, '..');

/** Каталоги, которые не сканируются: артефакты сборки и вложенные копии. */
const SKIPPED_DIRECTORIES = new Set([
  'node_modules',
  'dist',
  'coverage',
  'storybook-static',
  'table_pkg',
  '.git',
]);

/**
 * Разбирает аргументы командной строки.
 * @returns {{src: string, out: string, quiet: boolean}}
 */
const parseArguments = () => {
  const argv = process.argv.slice(2);
  const readOption = (name, fallback) => {
    const index = argv.indexOf(name);
    return index !== -1 && argv[index + 1] ? argv[index + 1] : fallback;
  };

  return {
    src: path.resolve(webRoot, readOption('--src', 'src')),
    out: path.resolve(webRoot, readOption('--out', 'docs-inventory.json')),
    quiet: argv.includes('--quiet'),
  };
};

/**
 * Рекурсивно собирает файлы по предикату.
 * @param directory - Каталог обхода.
 * @param predicate - Проверка имени файла.
 * @returns Абсолютные пути файлов.
 */
const collectFiles = (directory, predicate) => {
  const result = [];

  const walk = (current) => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (SKIPPED_DIRECTORIES.has(entry.name)) {
          continue;
        }
        walk(path.join(current, entry.name));
        continue;
      }

      if (entry.isFile() && predicate(entry.name)) {
        result.push(path.join(current, entry.name));
      }
    }
  };

  walk(directory);
  return result;
};

/**
 * Имена именованных экспортов-историй: `export const Name: StoryObj = ...`.
 * Служебные экспорты (`meta`, `default`, `*Meta`) отбрасываются.
 * @param source - Содержимое story-файла.
 * @returns Массив имён экспортов.
 */
const extractStoryExports = (source) => {
  const names = [];
  const pattern = /^export\s+const\s+([A-Za-z_$][\w$]*)/gm;
  let match = pattern.exec(source);

  while (match !== null) {
    const name = match[1];
    const isMetaLike = name === 'meta' || name === 'defaultMeta' || /Meta$/.test(name);
    if (!isMetaLike) {
      names.push(name);
    }
    match = pattern.exec(source);
  }

  return names;
};

/**
 * Число `export const` без учёта служебных — для проверки неполного разбора.
 * @param source - Содержимое story-файла.
 * @returns Количество экспортируемых констант.
 */
const countAllConstExports = (source) => {
  const matches = source.match(/^export\s+const\s+[A-Za-z_$][\w$]*/gm);
  return matches ? matches.length : 0;
};

/**
 * Ищет тег `autodocs` в CSF-объявлении.
 * @param source - Содержимое story-файла.
 * @returns true, если файл помечен автодоками.
 */
const hasAutodocs = (source) => /tags\s*:\s*\[[^\]]*['"`]autodocs['"`]/s.test(source);

/**
 * Анализирует один story-файл.
 * @param filePath - Абсолютный путь к файлу.
 * @returns Запись инвентаризации.
 */
const analyzeStoryFile = (filePath) => {
  const source = readFileSync(filePath, 'utf8');
  const storyExports = extractStoryExports(source);
  const titleMatch = source.match(/title\s*:\s*['"`]([^'"`]+)['"`]/);
  const iconImports = [...source.matchAll(/import\s+\*\s+as\s+([A-Za-z_$][\w$]*)\s+from/g)].map(
    (match) => match[1],
  );

  return {
    file: path.relative(webRoot, filePath).replace(/\\/g, '/'),
    lines: source.split('\n').length,
    bytes: statSync(filePath).size,
    storyCount: storyExports.length,
    storyExports,
    constExportCount: countAllConstExports(source),
    title: titleMatch ? titleMatch[1] : null,
    group: titleMatch ? titleMatch[1].split('/')[1] ?? null : null,
    hasAutodocs: hasAutodocs(source),
    usesDescribeStory: source.includes('describeStory'),
    usesPlay: /(^|\s)play\s*[:(]/m.test(source),
    usesFramerMotion: /from\s+['"]framer-motion['"]/.test(source),
    usesNamespaceImport: iconImports.length > 0,
    namespaceImports: iconImports,
  };
};

/**
 * Группа компонента: первый каталог после `components/ui` или `_root`.
 * @param relativeFile - Путь файла относительно `web`.
 * @returns Имя группы для отчёта.
 */
const resolveComponentFolder = (relativeFile) => {
  const segments = relativeFile.split('/');
  const uiIndex = segments.indexOf('ui');

  if (uiIndex === -1) {
    return segments[0] ?? '_root';
  }

  const folder = segments[uiIndex + 1];
  if (!folder || folder.endsWith('.tsx') || folder.endsWith('.ts')) {
    return '_root';
  }

  return folder;
};

/**
 * Сводит метрики по группам компонентов.
 * @param files - Записи инвентаризации.
 * @returns Отсортированная сводка по группам.
 */
const buildGroupSummary = (files) => {
  const groups = new Map();

  for (const file of files) {
    const folder = resolveComponentFolder(file.file);
    const entry = groups.get(folder) ?? {
      folder,
      files: 0,
      lines: 0,
      stories: 0,
      withAutodocs: 0,
      maxLines: 0,
      titles: new Set(),
    };

    entry.files += 1;
    entry.lines += file.lines;
    entry.stories += file.storyCount;
    entry.withAutodocs += file.hasAutodocs ? 1 : 0;
    entry.maxLines = Math.max(entry.maxLines, file.lines);
    if (file.title) {
      entry.titles.add(file.title);
    }

    groups.set(folder, entry);
  }

  return [...groups.values()]
    .map((entry) => ({
      ...entry,
      titles: [...entry.titles].sort(),
    }))
    .sort((first, second) => second.lines - first.lines);
};

/**
 * Точка входа.
 */
const main = () => {
  const { src, out, quiet } = parseArguments();

  if (!statSync(src, { throwIfNoEntry: false })?.isDirectory()) {
    console.error(`[ERROR] Каталог не найден: ${src}`);
    process.exitCode = 1;
    return;
  }

  const storyFiles = collectFiles(src, (name) => name.endsWith('.stories.tsx')).sort();
  const files = storyFiles.map(analyzeStoryFile);

  const summary = {
    storyFiles: files.length,
    totalLines: files.reduce((total, file) => total + file.lines, 0),
    totalStories: files.reduce((total, file) => total + file.storyCount, 0),
    withAutodocs: files.filter((file) => file.hasAutodocs).length,
    withDescribeStory: files.filter((file) => file.usesDescribeStory).length,
    withPlay: files.filter((file) => file.usesPlay).length,
    withFramerMotion: files.filter((file) => file.usesFramerMotion).length,
    withNamespaceImport: files.filter((file) => file.usesNamespaceImport).length,
    filesOver500Lines: files.filter((file) => file.lines > 500).length,
    filesOver1000Lines: files.filter((file) => file.lines > 1000).length,
    maxLines: files.reduce((max, file) => Math.max(max, file.lines), 0),
    componentFolders: new Set(files.map((file) => resolveComponentFolder(file.file))).size,
  };

  const heaviest = [...files]
    .sort((first, second) => second.lines - first.lines)
    .slice(0, 15)
    .map((file) => ({ file: file.file, lines: file.lines, storyCount: file.storyCount }));

  const report = {
    generatedAt: new Date().toISOString(),
    srcRoot: path.relative(webRoot, src).replace(/\\/g, '/'),
    summary,
    heaviest,
    groups: buildGroupSummary(files),
    files,
  };

  writeFileSync(out, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  if (!quiet) {
    console.log(`[OK] Инвентаризация записана: ${path.relative(webRoot, out)}`);
    console.log(JSON.stringify(summary, null, 2));
  }
};

main();
