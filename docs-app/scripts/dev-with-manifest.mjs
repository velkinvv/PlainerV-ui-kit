import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import chokidar from 'chokidar';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DOCS_APP_ROOT = path.resolve(SCRIPT_DIR, '..');
const UI_DOCS_GLOB = path.resolve(DOCS_APP_ROOT, '../src/components/ui/**/*.docs.tsx');
const CONTENT_GLOB = path.resolve(DOCS_APP_ROOT, 'content/docs/**/*.mdx');
const MANIFEST_SCRIPT = path.resolve(SCRIPT_DIR, 'build-docs-manifest.mjs');
const CONTENT_MANIFEST_SCRIPT = path.resolve(SCRIPT_DIR, 'build-content-manifest.mjs');
const VITE_BIN = path.resolve(DOCS_APP_ROOT, 'node_modules/vite/bin/vite.js');

let isGenerating = false;
let rerunRequested = false;

const runScript = (scriptPath, env) =>
  new Promise((resolve) => {
    const processHandle = spawn(process.execPath, [scriptPath], {
      cwd: DOCS_APP_ROOT,
      stdio: 'inherit',
      env,
    });

    processHandle.on('exit', (code) => resolve(code ?? 0));
  });

const runManifestBuild = async () => {
  if (isGenerating) {
    rerunRequested = true;
    return;
  }

  isGenerating = true;

  const env = {
    ...process.env,
    DOCS_MANIFEST_DEV: '1',
    DOCS_MANIFEST_PROPS_SOURCE: 'src',
  };

  const componentCode = await runScript(MANIFEST_SCRIPT, env);
  const contentCode = await runScript(CONTENT_MANIFEST_SCRIPT, env);

  isGenerating = false;

  if (componentCode !== 0 || contentCode !== 0) {
    console.error(`[docs-dev] manifest build failed with codes component=${componentCode}, content=${contentCode}`);
  }

  if (rerunRequested) {
    rerunRequested = false;
    runManifestBuild();
  }
};

runManifestBuild();

const watcher = chokidar.watch([UI_DOCS_GLOB, CONTENT_GLOB], {
  ignoreInitial: true,
});

watcher.on('add', runManifestBuild);
watcher.on('change', runManifestBuild);
watcher.on('unlink', runManifestBuild);

const viteProcess = spawn(process.execPath, [VITE_BIN, '--port', '6500'], {
  cwd: DOCS_APP_ROOT,
  stdio: 'inherit',
});

const shutdown = () => {
  watcher.close().catch(() => undefined);

  if (!viteProcess.killed) {
    viteProcess.kill('SIGTERM');
  }

  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

viteProcess.on('exit', (code) => {
  watcher.close().catch(() => undefined);
  process.exit(code ?? 0);
});
