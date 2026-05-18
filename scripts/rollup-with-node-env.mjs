import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Запускает локальный Rollup с NODE_ENV без cross-env (Windows + npm workspaces часто не видят .bin).
 *
 * @param {string[]} processArguments - argv; process.argv[2] — `production` | `development`
 */
const packageRootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const environmentName = process.argv[2] === 'development' ? 'development' : 'production';

const packageRequire = createRequire(path.join(packageRootDirectory, 'package.json'));

let rollupCliPath;

try {
  rollupCliPath = packageRequire.resolve('rollup/dist/bin/rollup');
} catch {
  console.error(
    '[rollup-with-node-env] Не найден rollup. Выполните `npm install` в корне monorepo или в каталоге web.',
  );
  process.exit(1);
}

const childProcessResult = spawnSync(process.execPath, [rollupCliPath, '-c', 'rollup.config.mjs'], {
  cwd: packageRootDirectory,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: environmentName,
  },
});

if (childProcessResult.status === null) {
  process.exit(1);
}

process.exit(childProcessResult.status);
