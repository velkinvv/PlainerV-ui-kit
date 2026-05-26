import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Проверяет, что devDependencies установлены (при NODE_ENV=production npm их не ставит).
 */
const packageRootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageRequire = createRequire(path.join(packageRootDirectory, 'package.json'));

try {
  packageRequire.resolve('rollup');
} catch {
  console.error(
    '[ensure-dev-dependencies] rollup не найден. Dev-зависимости не установлены.\n' +
      '  Сбросьте NODE_ENV (например: $env:NODE_ENV=$null в PowerShell) и выполните:\n' +
      '  npm ci --include=dev',
  );
  process.exit(1);
}
