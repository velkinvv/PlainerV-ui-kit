import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DOCS_APP_ROOT = path.resolve(SCRIPT_DIR, '..');
const PROJECT_ROOT = path.resolve(DOCS_APP_ROOT, '..');
const MANIFEST_SCRIPT = path.resolve(SCRIPT_DIR, 'build-docs-manifest.mjs');
const CONTENT_MANIFEST_SCRIPT = path.resolve(SCRIPT_DIR, 'build-content-manifest.mjs');

const trackedArtifacts = [
  'docs-app/src/generated/docs-manifest.json',
  'docs-app/src/generated/docs-manifest.ts',
  'docs-app/src/generated/content-manifest.json',
  'docs-app/src/generated/content-manifest.ts',
  'docs-app/public/llms.txt',
  'docs-app/public/llms-full.txt',
];

execFileSync(process.execPath, [MANIFEST_SCRIPT], {
  cwd: DOCS_APP_ROOT,
  stdio: 'inherit',
});

execFileSync(process.execPath, [CONTENT_MANIFEST_SCRIPT], {
  cwd: DOCS_APP_ROOT,
  stdio: 'inherit',
});

try {
  execFileSync('git', ['diff', '--exit-code', '--', ...trackedArtifacts], {
    cwd: PROJECT_ROOT,
    stdio: 'ignore',
  });
  console.log('[docs-manifest] artifacts are fresh');
} catch {
  console.error(
    '[docs-manifest] artifacts are stale: перегенерированные файлы отличаются от закоммиченных. Run: npm run content:manifest и закоммитьте изменения',
  );
  process.exit(1);
}
