import { spawnSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(scriptDir, '..');
const distDir = path.join(appRoot, 'dist');
const outputDir = path.join(distDir, 'pagefind');

const main = async () => {
  // CLI читает `pagefind.yml` из своей рабочей директории: там заданы
  // индексируемый контент (`main`) и выходная подпапка.
  const result = spawnSync('pagefind', ['--site', 'dist'], {
    cwd: appRoot,
    shell: process.platform === 'win32',
    encoding: 'utf8',
  });

  if (result.status !== 0) {
    throw new Error(
      `pagefind завершился с кодом ${result.status}: ${result.stderr || result.stdout || 'без вывода'}`,
    );
  }

  const outputFiles = await readdir(outputDir).catch(() => []);

  if (!outputFiles.includes('pagefind.js')) {
    throw new Error(`Индекс не собран: в ${outputDir} нет pagefind.js`);
  }

  // `pagefind-entry.json` описывает языки и число проиндексированных страниц —
  // по нему видно, что архивные версии в индекс не попали.
  const entry = JSON.parse(await readFile(path.join(outputDir, 'pagefind-entry.json'), 'utf8'));
  const languages = Object.entries(entry.languages ?? {});

  if (languages.length === 0) {
    throw new Error('Индекс Pagefind пуст: не найдено ни одного языка.');
  }

  const summary = languages
    .map(([language, info]) => `${language}: ${info.page_count ?? '?'} стр.`)
    .join(', ');

  console.log(`[OK] Индекс Pagefind собран: ${summary}.`);
};

main().catch((error) => {
  console.error('[ERROR] Сборка индекса поиска упала:', error.message);
  process.exitCode = 1;
});
