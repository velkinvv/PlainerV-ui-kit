import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DOCS_APP_ROOT = path.resolve(SCRIPT_DIR, '..');
const PROJECT_ROOT = path.resolve(DOCS_APP_ROOT, '..');

const DOCS_APP_CONTENT_ROOT = path.resolve(DOCS_APP_ROOT, 'content/docs');
const FORBIDDEN_TOKEN = 'documentation/content/docs';

const SCAN_TARGETS = [
  path.resolve(PROJECT_ROOT, '.github/workflows/ci.yml'),
  path.resolve(PROJECT_ROOT, '.github/workflows/sync-github-docs.yml'),
  path.resolve(PROJECT_ROOT, 'package.json'),
  path.resolve(DOCS_APP_ROOT, 'package.json'),
  path.resolve(DOCS_APP_ROOT, 'scripts/build-content-manifest.mjs'),
  path.resolve(DOCS_APP_ROOT, 'scripts/build-docs-manifest.mjs'),
  path.resolve(DOCS_APP_ROOT, 'scripts/dev-with-manifest.mjs'),
  path.resolve(DOCS_APP_ROOT, 'scripts/sync-docs-from-github.mjs'),
  path.resolve(DOCS_APP_ROOT, 'scripts/check-manifest-fresh.mjs'),
];

const normalizePath = (value) => value.split(path.sep).join('/');

const ensureDocsAppContentRoot = () => {
  if (!fs.existsSync(DOCS_APP_CONTENT_ROOT)) {
    throw new Error(`[docs-source] Missing source root: ${normalizePath(DOCS_APP_CONTENT_ROOT)}`);
  }
};

const scanForForbiddenLegacySourceUsage = () => {
  const violations = [];

  for (const filePath of SCAN_TARGETS) {
    if (!fs.existsSync(filePath)) {
      continue;
    }

    const fileText = fs.readFileSync(filePath, 'utf8');
    if (!fileText.includes(FORBIDDEN_TOKEN)) {
      continue;
    }

    violations.push(normalizePath(path.relative(PROJECT_ROOT, filePath)));
  }

  if (violations.length > 0) {
    throw new Error(
      [
        '[docs-source] Legacy content source usage detected. Use only web/docs-app/content/docs as source of truth.',
        ...violations.map((item) => ` - ${item}`),
      ].join('\n'),
    );
  }
};

const main = () => {
  ensureDocsAppContentRoot();
  scanForForbiddenLegacySourceUsage();
  console.log('[docs-source] source-of-truth check passed (web/docs-app/content/docs)');
};

main();
