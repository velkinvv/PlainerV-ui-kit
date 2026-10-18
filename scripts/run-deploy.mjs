#!/usr/bin/env node
/**
 * Кроссплатформенный запуск scripts/deploy-docs.sh.
 *
 * Сам деплой написан на bash (ssh, rsync, heredoc), но npm-скрипт должен
 * запускаться и в Windows: там bash есть только у Git for Windows и не всегда
 * лежит в PATH, поэтому ищем его по известным местам.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const deployScript = path.join(scriptDir, 'deploy-docs.sh');
const mode = process.argv[2] ?? 'deploy';

if (!fs.existsSync(deployScript)) {
  console.error(`[ERROR] Не найден ${deployScript}`);
  process.exit(1);
}

const candidates = [
  process.env.DOCS_BASH,
  'bash',
  'C:\\Program Files\\Git\\bin\\bash.exe',
  'C:\\Program Files (x86)\\Git\\bin\\bash.exe',
  '/bin/bash',
  '/usr/bin/bash',
].filter(Boolean);

const isRunnable = (candidate) =>
  path.isAbsolute(candidate)
    ? fs.existsSync(candidate)
    : spawnSync(candidate, ['--version'], { stdio: 'ignore' }).status === 0;

const bash = candidates.find(isRunnable);

if (!bash) {
  console.error(
    '[ERROR] bash не найден. Установите Git for Windows или укажите путь в DOCS_BASH.',
  );
  process.exit(1);
}

const result = spawnSync(bash, [deployScript, mode], { stdio: 'inherit' });

if (result.error) {
  console.error(`[ERROR] Не удалось запустить bash: ${result.error.message}`);
  process.exit(1);
}

process.exit(result.status ?? 1);
