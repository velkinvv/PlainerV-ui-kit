import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const packageRootDirectoryPath = process.cwd();
const distDirectoryPath = path.join(packageRootDirectoryPath, 'dist');
const viteDistDirectoryPath = path.join(distDirectoryPath, 'vite');

const requiredArtifactRelativePaths = [
  'index.cjs.js',
  'index.esm.js',
  'index.d.ts',
  'styles.css',
  'styles/fonts.css',
  'styles/fonts/montserrat/Montserrat-Regular.ttf',
  'vite/index.js',
  'vite/index.d.ts',
  'vite/plainervVite.js',
];

const relativeImportPattern = /from\s+['"](\.{1,2}\/[^'"]+)['"]/g;

async function fileExists(targetFilePath) {
  try {
    await access(targetFilePath);
    return true;
  } catch {
    return false;
  }
}

async function collectJavaScriptFilePaths(currentDirectoryPath) {
  const directoryEntries = await readdir(currentDirectoryPath, { withFileTypes: true });
  const nestedJavaScriptFilePaths = await Promise.all(
    directoryEntries.map(async (directoryEntry) => {
      const targetPath = path.join(currentDirectoryPath, directoryEntry.name);

      if (directoryEntry.isDirectory()) {
        return collectJavaScriptFilePaths(targetPath);
      }

      return directoryEntry.name.endsWith('.js') ? [targetPath] : [];
    }),
  );

  return nestedJavaScriptFilePaths.flat();
}

async function verifyRequiredArtifacts() {
  const missingArtifactRelativePaths = [];

  for (const artifactRelativePath of requiredArtifactRelativePaths) {
    const artifactAbsolutePath = path.join(distDirectoryPath, artifactRelativePath);
    const hasArtifactFile = await fileExists(artifactAbsolutePath);

    if (!hasArtifactFile) {
      missingArtifactRelativePaths.push(artifactRelativePath);
    }
  }

  if (missingArtifactRelativePaths.length === 0) {
    return;
  }

  throw new Error(
    `Отсутствуют обязательные артефакты сборки: ${missingArtifactRelativePaths.join(', ')}`,
  );
}

/**
 * В dist/vite относительные импорты должны содержать .js — иначе Node ESM (vite.config) падает на Windows.
 */
async function verifyViteDistNodeEsmImports() {
  const viteJavaScriptFilePaths = await collectJavaScriptFilePaths(viteDistDirectoryPath);
  const invalidImportMessages = [];

  for (const javaScriptFilePath of viteJavaScriptFilePaths) {
    const fileContent = await readFile(javaScriptFilePath, 'utf8');
    const relativeImportPaths = [...fileContent.matchAll(relativeImportPattern)].map(
      (regexpMatchResult) => regexpMatchResult[1],
    );

    for (const relativeImportPath of relativeImportPaths) {
      if (!relativeImportPath.endsWith('.js')) {
        invalidImportMessages.push(
          `${path.relative(distDirectoryPath, javaScriptFilePath)} -> ${relativeImportPath} (нет суффикса .js)`,
        );
        continue;
      }

      const resolvedImportPath = path.resolve(path.dirname(javaScriptFilePath), relativeImportPath);
      const hasResolvedFile = await fileExists(resolvedImportPath);

      if (!hasResolvedFile) {
        invalidImportMessages.push(
          `${path.relative(distDirectoryPath, javaScriptFilePath)} -> ${relativeImportPath} (файл не найден)`,
        );
      }
    }
  }

  if (invalidImportMessages.length === 0) {
    return;
  }

  throw new Error(
    `Некорректные ESM-импорты в dist/vite: ${invalidImportMessages.join('; ')}`,
  );
}

async function verifyNoMissingRelativeImports() {
  const javaScriptFilePaths = await collectJavaScriptFilePaths(distDirectoryPath);
  const brokenImportMessages = [];

  for (const javaScriptFilePath of javaScriptFilePaths) {
    if (javaScriptFilePath.startsWith(viteDistDirectoryPath)) {
      continue;
    }

    const fileContent = await readFile(javaScriptFilePath, 'utf8');
    const relativeImportPaths = [...fileContent.matchAll(relativeImportPattern)].map(
      (regexpMatchResult) => regexpMatchResult[1],
    );

    for (const relativeImportPath of relativeImportPaths) {
      const baseImportPath = path.resolve(path.dirname(javaScriptFilePath), relativeImportPath);
      const candidateFilePaths = [
        baseImportPath,
        `${baseImportPath}.js`,
        `${baseImportPath}.mjs`,
        `${baseImportPath}.cjs`,
        path.join(baseImportPath, 'index.js'),
      ];

      const existingPathResults = await Promise.all(
        candidateFilePaths.map((candidateFilePath) => fileExists(candidateFilePath)),
      );

      if (!existingPathResults.some(Boolean)) {
        brokenImportMessages.push(
          `${path.relative(distDirectoryPath, javaScriptFilePath)} -> ${relativeImportPath}`,
        );
      }
    }
  }

  if (brokenImportMessages.length === 0) {
    return;
  }

  throw new Error(
    `Найдены битые относительные импорты в dist: ${brokenImportMessages.join('; ')}`,
  );
}

/** ESM entry с диреективой use client для Next.js App Router. */
async function verifyEsmClientDirective() {
  const esmEntryPath = path.join(distDirectoryPath, 'index.esm.js');
  const esmEntryContent = await readFile(esmEntryPath, 'utf8');
  const trimmedContent = esmEntryContent.trimStart();

  if (
    !trimmedContent.startsWith("'use client';") &&
    !trimmedContent.startsWith('"use client";')
  ) {
    throw new Error(
      'dist/index.esm.js должен начинаться с директивы use client (Next.js App Router)',
    );
  }
}

async function verifyPublishReadme() {
  const readmePath = path.join(packageRootDirectoryPath, 'README.md');
  const hasReadmeFile = await fileExists(readmePath);

  if (!hasReadmeFile) {
    throw new Error('Отсутствует README.md в корне пакета — npm покажет «This package does not have a README»');
  }

  const readmeContent = await readFile(readmePath, 'utf8');

  if (readmeContent.trim().length < 80) {
    throw new Error('README.md слишком короткий для публикации на npm');
  }
}

/** Экспорт стилей: основной подпуть и алиас для обратной совместимости. */
async function verifyPackageExports() {
  const packageJsonPath = path.join(packageRootDirectoryPath, 'package.json');
  const packageJsonContent = await readFile(packageJsonPath, 'utf8');
  const packageManifest = JSON.parse(packageJsonContent);
  const packageExports = packageManifest.exports ?? {};

  if (packageExports['./styles'] !== './dist/styles.css') {
    throw new Error('exports["./styles"] должен указывать на ./dist/styles.css');
  }

  if (packageExports['./dist/styles.css'] !== './dist/styles.css') {
    throw new Error('exports["./dist/styles.css"] должен быть алиасом стилей');
  }

  const viteExportEntry = packageExports['./vite'];

  if (!viteExportEntry?.import) {
    throw new Error('exports["./vite"].import обязателен для ESM-плагина');
  }
}

async function runPackageVerification() {
  await verifyPublishReadme();
  await verifyPackageExports();
  await verifyRequiredArtifacts();
  await verifyViteDistNodeEsmImports();
  await verifyNoMissingRelativeImports();
  await verifyEsmClientDirective();
  console.log('✅ Проверка package-артефактов пройдена');
}

runPackageVerification().catch((error) => {
  console.error('❌ Проверка package-артефактов завершилась с ошибкой');
  console.error(error);
  process.exitCode = 1;
});
