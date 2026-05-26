import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * prepare-хук: запускает husky через node (на Windows npm не всегда видит .bin в PATH).
 */
const packageRootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const huskyEntryPath = path.join(packageRootDirectory, 'node_modules', 'husky', 'bin.js');

if (!existsSync(huskyEntryPath)) {
  console.warn('[install-husky] husky не найден, пропускаем.');
  process.exit(0);
}

const childProcessResult = spawnSync(process.execPath, [huskyEntryPath], {
  cwd: packageRootDirectory,
  stdio: 'inherit',
});

process.exit(childProcessResult.status === null ? 0 : childProcessResult.status);
