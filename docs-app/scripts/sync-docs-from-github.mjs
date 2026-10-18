import { promises as fileSystemPromises } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import documentationVersioningConfiguration from '../docs-versioning.config.json' with { type: 'json' };

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const docsAppRootDirectory = path.resolve(scriptDirectory, '..');
const documentationContentDirectory = path.resolve(docsAppRootDirectory, 'content', 'docs');
const temporaryRootDirectory = path.join(os.tmpdir(), 'plainer-documentation-sync');

function parseCliArguments() {
  const scriptArguments = process.argv.slice(2);
  const parsedArguments = {
    platformId: '',
    versionId: '',
    localeId: '',
    useLocalSource: false,
  };

  for (let argumentIndex = 0; argumentIndex < scriptArguments.length; argumentIndex += 1) {
    const currentArgument = scriptArguments[argumentIndex];
    const nextArgument = scriptArguments[argumentIndex + 1];

    // Локальный режим нужен для актуальной версии: её исходники — это сам
    // репозиторий `web`, а не тег, которого ещё нет на GitHub.
    if (currentArgument === '--local') {
      parsedArguments.useLocalSource = true;
      continue;
    }

    if (currentArgument === '--platform' && nextArgument) {
      parsedArguments.platformId = nextArgument.trim();
      argumentIndex += 1;
      continue;
    }

    if (currentArgument === '--version' && nextArgument) {
      parsedArguments.versionId = nextArgument.trim();
      argumentIndex += 1;
      continue;
    }

    if (currentArgument === '--locale' && nextArgument) {
      parsedArguments.localeId = nextArgument.trim();
      argumentIndex += 1;
    }
  }

  return parsedArguments;
}

/**
 * @param commandName - имя команды (например `git`)
 * @param commandArguments - массив аргументов команды в правильном порядке
 * @param currentWorkingDirectory - директория выполнения команды
 */
function runCommand(commandName, commandArguments, currentWorkingDirectory) {
  const commandResult = spawnSync(commandName, commandArguments, {
    cwd: currentWorkingDirectory,
    stdio: 'pipe',
    encoding: 'utf-8',
  });

  if (commandResult.status !== 0) {
    throw new Error(
      [
        `Команда завершилась с ошибкой: ${commandName} ${commandArguments.join(' ')}`,
        commandResult.stderr,
      ].join('\n'),
    );
  }
}

/**
 * @param rawFilePath - путь к исходному markdown-файлу в репозитории платформы
 * @returns slug страницы для URL и имени mdx-файла
 */
function createSlugFromFilePath(rawFilePath) {
  const normalizedFileName = path.basename(rawFilePath, path.extname(rawFilePath));
  return normalizedFileName
    .trim()
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * @param rawFilePath - путь файла внутри репозитория
 * @returns заголовок страницы документации
 */
function createTitleFromFilePath(rawFilePath) {
  const normalizedFileName = path.basename(rawFilePath, path.extname(rawFilePath));
  return normalizedFileName
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Удаляет потенциально опасные HTML-теги из markdown перед встраиванием в MDX.
 * Это предотвращает React-предупреждение про `<script>` внутри клиентского рендера.
 *
 * @param markdownContent - исходный markdown-контент из репозитория
 * @returns безопасный markdown-контент для генерации MDX
 */
function sanitizeMarkdownForMdx(markdownContent) {
  return markdownContent
    .replace(/<\s*script/gi, '&lt;script')
    .replace(/<\s*\/\s*script\s*>/gi, '&lt;/script&gt;');
}

/**
 * @param markdownContent - содержимое markdown-файла
 * @param platformLabel - отображаемое имя платформы (Web/Mobile)
 * @param versionLabel - отображаемая версия (v0.1.2)
 * @param sourceFilePath - путь к источнику внутри репозитория
 * @param sourceFileUrl - ссылка на файл на GitHub
 * @returns готовый mdx-документ
 */
function buildMdxPage(markdownContent, platformLabel, versionLabel, sourceFilePath, sourceFileUrl) {
  const sanitizedMarkdownContent = sanitizeMarkdownForMdx(markdownContent);

  return `---
title: ${createTitleFromFilePath(sourceFilePath)}
description: ${platformLabel} (${versionLabel}) — синхронизировано из ${sourceFilePath}
---

# ${createTitleFromFilePath(sourceFilePath)}

> Источник: [\`${sourceFilePath}\`](${sourceFileUrl})

> Платформа: **${platformLabel}**
> Версия: **${versionLabel}**

---

${sanitizedMarkdownContent}
`;
}

async function ensureDirectoryExists(directoryPath) {
  await fileSystemPromises.mkdir(directoryPath, { recursive: true });
}

async function removeDirectoryIfExists(directoryPath) {
  await fileSystemPromises.rm(directoryPath, { recursive: true, force: true });
}

/**
 * @param platformConfiguration - конфигурация платформы из `docs-versioning.config.json`
 * @param platformDirectoryPath - директория `content/docs/{platformId}`
 */
async function writePlatformFiles(platformConfiguration, platformDirectoryPath) {
  const platformVersionPages = platformConfiguration.versions.map((versionConfiguration) => versionConfiguration.id);
  const platformMeta = {
    title: platformConfiguration.label,
    pages: ['index', ...platformVersionPages],
  };

  await fileSystemPromises.writeFile(
    path.join(platformDirectoryPath, 'meta.json'),
    `${JSON.stringify(platformMeta, null, 2)}\n`,
    'utf-8',
  );

  const platformIndexDocument = `---
title: Документация ${platformConfiguration.label}
description: Версии и страницы для платформы ${platformConfiguration.label}
---

# ${platformConfiguration.label}

Выберите нужную версию:

${platformConfiguration.versions
  .map(
    (versionConfiguration) =>
      `- [${versionConfiguration.label}](/docs/${platformConfiguration.id}/${versionConfiguration.id})`,
  )
  .join('\n')}
`;

  await fileSystemPromises.writeFile(path.join(platformDirectoryPath, 'index.mdx'), platformIndexDocument, 'utf-8');
}

/**
 * @param platformConfiguration - конфигурация платформы
 * @param versionConfiguration - конфигурация версии
 * @param repositorySnapshotDirectoryPath - локальная копия репозитория указанной ветки
 * @param versionDirectoryPath - директория `content/docs/{platformId}/{versionId}`
 */
async function writeVersionFiles(
  platformConfiguration,
  versionConfiguration,
  repositorySnapshotDirectoryPath,
  versionDirectoryPath,
) {
  await removeDirectoryIfExists(versionDirectoryPath);
  await ensureDirectoryExists(versionDirectoryPath);

  const generatedPages = [];

  for (const sourceFilePath of versionConfiguration.sourceFiles) {
    const absoluteSourcePath = path.join(repositorySnapshotDirectoryPath, sourceFilePath);
    try {
      const sourceMarkdownContent = await fileSystemPromises.readFile(absoluteSourcePath, 'utf-8');
      const generatedSlug = createSlugFromFilePath(sourceFilePath);
      generatedPages.push(generatedSlug);

      const sourceFileUrl = `https://github.com/${platformConfiguration.repository.owner}/${platformConfiguration.repository.name}/blob/${versionConfiguration.gitReference}/${sourceFilePath}`;
      const generatedMdxContent = buildMdxPage(
        sourceMarkdownContent,
        platformConfiguration.label,
        versionConfiguration.label,
        sourceFilePath,
        sourceFileUrl,
      );

      await fileSystemPromises.writeFile(
        path.join(versionDirectoryPath, `${generatedSlug}.mdx`),
        generatedMdxContent,
        'utf-8',
      );
    } catch (readError) {
      console.warn(
        `⚠ Пропускаю файл ${sourceFilePath} для ${platformConfiguration.id}/${versionConfiguration.id}: ${
          readError instanceof Error ? readError.message : String(readError)
        }`,
      );
    }
  }

  const versionMeta = {
    title: versionConfiguration.label,
    defaultOpen: true,
    pages: generatedPages,
  };

  await fileSystemPromises.writeFile(
    path.join(versionDirectoryPath, 'meta.json'),
    `${JSON.stringify(versionMeta, null, 2)}\n`,
    'utf-8',
  );

  const versionIndexDocument = `---
title: ${versionConfiguration.label}
description: ${platformConfiguration.label} — версия ${versionConfiguration.label}
---

# ${platformConfiguration.label} / ${versionConfiguration.label}

Страницы версии:

${generatedPages
  .map(
    (generatedPageSlug) =>
      `- [${generatedPageSlug}](/docs/${platformConfiguration.id}/${versionConfiguration.id}/${generatedPageSlug})`,
  )
  .join('\n')}
`;

  await fileSystemPromises.writeFile(path.join(versionDirectoryPath, 'index.mdx'), versionIndexDocument, 'utf-8');
}

async function cloneBranchSnapshot(platformConfiguration, versionConfiguration) {
  const temporaryRepositoryDirectoryPath = path.join(
    temporaryRootDirectory,
    `${platformConfiguration.id}-${versionConfiguration.id}`,
  );

  await removeDirectoryIfExists(temporaryRepositoryDirectoryPath);
  await ensureDirectoryExists(temporaryRootDirectory);

  const repositoryUrl = `https://github.com/${platformConfiguration.repository.owner}/${platformConfiguration.repository.name}.git`;
  runCommand(
    'git',
    [
      'clone',
      '--depth',
      '1',
      '--branch',
      versionConfiguration.gitReference,
      repositoryUrl,
      temporaryRepositoryDirectoryPath,
    ],
    process.cwd(),
  );

  return temporaryRepositoryDirectoryPath;
}

async function writeRootFiles() {
  const rootMeta = {
    title: 'Документация',
    pages: ['index', ...documentationVersioningConfiguration.platforms.map((platformConfiguration) => platformConfiguration.id)],
  };

  await fileSystemPromises.writeFile(
    path.join(documentationContentDirectory, 'meta.json'),
    `${JSON.stringify(rootMeta, null, 2)}\n`,
    'utf-8',
  );

  const rootIndexDocument = `---
title: Платформы и версии
description: Документация PlainerV синхронизирована из веток GitHub-репозиториев
---

# GitHub-версионирование документации

Документация формируется из указанных веток репозиториев:

${documentationVersioningConfiguration.platforms
  .map(
    (platformConfiguration) =>
      `- [${platformConfiguration.label}](/docs/${platformConfiguration.id}/${platformConfiguration.defaultVersionId})`,
  )
  .join('\n')}
`;

  await fileSystemPromises.writeFile(path.join(documentationContentDirectory, 'index.mdx'), rootIndexDocument, 'utf-8');
}

async function syncGithubDocumentation() {
  const { platformId, versionId, localeId, useLocalSource } = parseCliArguments();
  if (platformId) {
    console.log(`ℹ Фильтр платформы: ${platformId}`);
  }
  if (versionId) {
    console.log(`ℹ Фильтр версии: ${versionId}`);
  }
  if (localeId) {
    console.log(`ℹ Фильтр локали: ${localeId}`);
  }
  if (useLocalSource && !versionId) {
    throw new Error('Режим --local требует явного --version: иначе текущие файлы репозитория перезапишут все версии.');
  }
  if (useLocalSource) {
    console.log('ℹ Источник: текущий репозиторий web (без клонирования тега)');
  }

  await ensureDirectoryExists(documentationContentDirectory);
  await writeRootFiles();

  // Контент живёт по локалям: content/docs/<locale>/<platform>/<version>.
  // Legacy-раскладка без локали (content/docs/<platform>/<version>) не используется.
  for (const localeConfiguration of documentationVersioningConfiguration.locales) {
    if (localeId && localeConfiguration.id !== localeId) {
      continue;
    }

    const localeDirectoryPath = path.join(documentationContentDirectory, localeConfiguration.id);
    await ensureDirectoryExists(localeDirectoryPath);

    for (const platformConfiguration of documentationVersioningConfiguration.platforms) {
      if (platformId && platformConfiguration.id !== platformId) {
        continue;
      }

      const platformDirectoryPath = path.join(localeDirectoryPath, platformConfiguration.id);
      await ensureDirectoryExists(platformDirectoryPath);
      await writePlatformFiles(platformConfiguration, platformDirectoryPath);

      for (const versionConfiguration of platformConfiguration.versions) {
        if (versionId && versionConfiguration.id !== versionId) {
          continue;
        }

        // В локальном режиме исходник — сам каталог `web`: клонировать нечего
        // и удалять после разбора тоже нечего.
        const repositorySnapshotDirectoryPath = useLocalSource
          ? path.resolve(docsAppRootDirectory, '..')
          : await cloneBranchSnapshot(platformConfiguration, versionConfiguration);
        const versionDirectoryPath = path.join(platformDirectoryPath, versionConfiguration.id);
        await writeVersionFiles(
          platformConfiguration,
          versionConfiguration,
          repositorySnapshotDirectoryPath,
          versionDirectoryPath,
        );

        if (!useLocalSource) {
          await removeDirectoryIfExists(repositorySnapshotDirectoryPath);
        }
      }
    }
  }
}

syncGithubDocumentation()
  .then(() => {
    console.log('✅ Синхронизация документации из GitHub завершена');
  })
  .catch((error) => {
    console.error('❌ Ошибка синхронизации документации из GitHub');
    console.error(error);
    process.exitCode = 1;
  });
