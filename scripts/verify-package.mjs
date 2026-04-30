import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const packageRootDirectoryPath = process.cwd();
const distDirectoryPath = path.join(packageRootDirectoryPath, 'dist');

const requiredArtifactRelativePaths = [
  'index.cjs.js',
  'index.esm.js',
  'index.d.ts',
  'styles.css',
  'styles/fonts.css',
  'styles/fonts/montserrat/Montserrat-Regular.ttf',
];

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

async function verifyNoMissingRelativeImports() {
  const javaScriptFilePaths = await collectJavaScriptFilePaths(distDirectoryPath);
  const brokenImportMessages = [];
  const relativeImportPattern = /from\s+['"](\.{1,2}\/[^'"]+)['"]/g;

  for (const javaScriptFilePath of javaScriptFilePaths) {
    const fileContent = await readFile(javaScriptFilePath, 'utf8');
    const resolvedRelativeImports = [...fileContent.matchAll(relativeImportPattern)].map(
      (regexpMatchResult) => regexpMatchResult[1],
    );

    for (const relativeImportPath of resolvedRelativeImports) {
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

async function runPackageVerification() {
  await verifyRequiredArtifacts();
  await verifyNoMissingRelativeImports();
  console.log('✅ Проверка package-артефактов пройдена');
}

runPackageVerification().catch((error) => {
  console.error('❌ Проверка package-артефактов завершилась с ошибкой');
  console.error(error);
  process.exitCode = 1;
});
