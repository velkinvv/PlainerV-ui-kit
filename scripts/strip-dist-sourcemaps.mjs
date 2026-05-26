import { readdir, unlink } from 'node:fs/promises';
import path from 'node:path';

const distDirectoryPath = path.join(process.cwd(), 'dist');

/**
 * Рекурсивно собирает пути к файлам с заданным суффиксом.
 * @param currentDirectoryPath — каталог для обхода
 * @param fileSuffix — суффикс имени файла (например `.map`)
 */
async function collectFilesWithSuffix(currentDirectoryPath, fileSuffix) {
  const directoryEntries = await readdir(currentDirectoryPath, { withFileTypes: true });
  const nestedPaths = await Promise.all(
    directoryEntries.map(async (directoryEntry) => {
      const targetPath = path.join(currentDirectoryPath, directoryEntry.name);

      if (directoryEntry.isDirectory()) {
        return collectFilesWithSuffix(targetPath, fileSuffix);
      }

      return directoryEntry.name.endsWith(fileSuffix) ? [targetPath] : [];
    }),
  );

  return nestedPaths.flat();
}

/**
 * Удаляет sourcemap из dist перед публикацией (страховка, если плагины всё же их создали).
 */
async function stripDistSourceMaps() {
  const sourceMapFilePaths = await collectFilesWithSuffix(distDirectoryPath, '.map');

  await Promise.all(sourceMapFilePaths.map((sourceMapFilePath) => unlink(sourceMapFilePath)));

  if (sourceMapFilePaths.length > 0) {
    console.log(
      `strip-dist-sourcemaps: удалено ${sourceMapFilePaths.length} файлов (.map) из dist`,
    );
  }
}

stripDistSourceMaps().catch((error) => {
  console.error('strip-dist-sourcemaps: ошибка', error);
  process.exitCode = 1;
});
