import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DOCS_APP_ROOT = path.resolve(SCRIPT_DIR, '..');
const PROJECT_ROOT = path.resolve(DOCS_APP_ROOT, '..');

const NEW_DOCS_ROOT = path.resolve(DOCS_APP_ROOT, 'content/docs');
const LEGACY_DOCS_ROOT = path.resolve(PROJECT_ROOT, '../documentation/content/docs');
const VERSIONING_CONFIG_PATH = path.resolve(DOCS_APP_ROOT, 'docs-versioning.config.json');

const IGNORED_SEGMENTS = new Set(['mobile']);
const ALLOWED_EXTENSIONS = new Set(['.mdx', '.json']);

const normalizePath = (value) => value.split(path.sep).join('/');

const shouldIgnorePath = (relativePath) => {
  const segments = normalizePath(relativePath).split('/').filter(Boolean);
  return segments.some((segment) => IGNORED_SEGMENTS.has(segment));
};

const walk = (root, current = '.') => {
  const full = path.resolve(root, current);
  const entries = fs.readdirSync(full, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const relativePath = path.join(current, entry.name);

    if (shouldIgnorePath(relativePath)) {
      return [];
    }

    if (entry.isDirectory()) {
      return walk(root, relativePath);
    }

    if (!entry.isFile()) {
      return [];
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return [];
    }

    return [normalizePath(relativePath)];
  });
};

const ensureDir = (dirPath, label) => {
  if (!fs.existsSync(dirPath)) {
    throw new Error(`[content-parity] ${label} not found: ${dirPath}`);
  }
};

const diffSets = (left, right) => left.filter((item) => !right.includes(item));

/**
 * Актуальная (live) версия синхронизируется из git-репозитория пакета, а не
 * переносится из legacy-документации. Её каталог по определению отсутствует
 * в legacy, поэтому паритет для неё не проверяется.
 */
const readGeneratedVersionPrefixes = () => {
  const configuration = JSON.parse(fs.readFileSync(VERSIONING_CONFIG_PATH, 'utf8'));

  return configuration.platforms.flatMap((platform) => {
    const liveVersionIds = platform.versions
      .filter((version) => version.live === true)
      .map((version) => version.id);

    return configuration.locales.flatMap((locale) =>
      liveVersionIds.map((versionId) => `${locale.id}/${platform.id}/${versionId}/`),
    );
  });
};

const isGeneratedPath = (relativePath, generatedPrefixes) =>
  generatedPrefixes.some((prefix) => relativePath.startsWith(prefix));

const main = () => {
  ensureDir(NEW_DOCS_ROOT, 'docs-app content root');
  ensureDir(LEGACY_DOCS_ROOT, 'legacy documentation root');

  const generatedPrefixes = readGeneratedVersionPrefixes();

  const newFiles = walk(NEW_DOCS_ROOT).sort();
  const legacyFiles = walk(LEGACY_DOCS_ROOT).sort();

  const missingInNew = diffSets(legacyFiles, newFiles);
  const extraInNew = diffSets(newFiles, legacyFiles);
  const generated = extraInNew.filter((item) => isGeneratedPath(item, generatedPrefixes));
  const unexpectedInNew = extraInNew.filter((item) => !isGeneratedPath(item, generatedPrefixes));

  console.log(`[content-parity] legacy files: ${legacyFiles.length}`);
  console.log(`[content-parity] docs-app files: ${newFiles.length}`);
  if (generated.length > 0) {
    console.log(
      `[content-parity] сгенерировано для live-версии (вне legacy): ${generated.length} файлов`,
    );
  }

  if (missingInNew.length === 0 && unexpectedInNew.length === 0) {
    console.log('[content-parity] parity check passed');
    return;
  }

  if (missingInNew.length > 0) {
    console.error('[content-parity] missing in docs-app:');
    missingInNew.forEach((item) => console.error(`  - ${item}`));
  }

  if (unexpectedInNew.length > 0) {
    console.error('[content-parity] extra in docs-app:');
    unexpectedInNew.forEach((item) => console.error(`  - ${item}`));
  }

  process.exit(1);
};

main();
