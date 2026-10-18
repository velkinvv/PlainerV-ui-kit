import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DOCS_APP_ROOT = path.resolve(SCRIPT_DIR, '..');
const PROJECT_ROOT = path.resolve(DOCS_APP_ROOT, '..');
const CONTENT_ROOT = path.resolve(DOCS_APP_ROOT, 'content/docs');

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const errors = [];
const warnings = [];

const rootPackage = readJson(path.resolve(PROJECT_ROOT, 'package.json'));
const docsVersioning = readJson(path.resolve(DOCS_APP_ROOT, 'docs-versioning.config.json'));

const webPlatform = docsVersioning.platforms.find((platform) => platform.id === 'web');
if (!webPlatform) {
  console.error('[docs-version] platform "web" is missing in docs-versioning.config.json');
  process.exit(1);
}

const versions = webPlatform.versions ?? [];
const versionIds = versions.map((version) => version.id);
const expectedVersionId = `v_${rootPackage.version}`;

const duplicates = versionIds.filter((versionId, index) => versionIds.indexOf(versionId) !== index);
if (duplicates.length > 0) {
  errors.push(`дубликаты версий в конфиге: ${duplicates.join(', ')}`);
}

// Актуальная версия одна: её определяет `live`, а не порядок в массиве.
const liveVersions = versions.filter((version) => version.live === true);
if (liveVersions.length !== 1) {
  errors.push(`в конфиге должна быть ровно одна версия с "live": true, найдено ${liveVersions.length}`);
}

const versionsWithoutLiveFlag = versions.filter((version) => typeof version.live !== 'boolean');
if (versionsWithoutLiveFlag.length > 0) {
  errors.push(
    `у версий не задан boolean-флаг "live": ${versionsWithoutLiveFlag.map((version) => version.id).join(', ')}`,
  );
}

if (webPlatform.defaultVersionId !== expectedVersionId) {
  errors.push(
    `defaultVersionId не совпадает с версией пакета: ожидалось "${expectedVersionId}", получено "${webPlatform.defaultVersionId}"`,
  );
}

if (liveVersions.length === 1 && liveVersions[0].id !== expectedVersionId) {
  errors.push(
    `live-версия "${liveVersions[0].id}" не совпадает с версией пакета "${expectedVersionId}"`,
  );
}

if (!versionIds.includes(expectedVersionId)) {
  errors.push(`versions[] не содержит версию пакета "${expectedVersionId}"`);
}

// Соответствие конфига и фактического содержимого контента.
const contentVersionsByLocale = new Map();

for (const locale of docsVersioning.locales) {
  const platformDir = path.join(CONTENT_ROOT, locale.id, webPlatform.id);
  const presentVersions = fs.existsSync(platformDir)
    ? fs
        .readdirSync(platformDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .filter((name) => fs.readdirSync(path.join(platformDir, name)).some((file) => file.endsWith('.mdx')))
    : [];

  contentVersionsByLocale.set(locale.id, presentVersions);

  const undeclared = presentVersions.filter((versionId) => !versionIds.includes(versionId));
  if (undeclared.length > 0) {
    errors.push(
      `версии есть в контенте ${locale.id}, но не объявлены в конфиге: ${undeclared.join(', ')}`,
    );
  }

  const emptyVersionDirs = fs.existsSync(platformDir)
    ? fs
        .readdirSync(platformDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .filter((name) => !presentVersions.includes(name))
    : [];

  if (emptyVersionDirs.length > 0) {
    warnings.push(
      `каталоги ${locale.id} без mdx (не попадут в навигацию): ${emptyVersionDirs.join(', ')}`,
    );
  }
}

const versionsWithoutAnyContent = versionIds.filter(
  (versionId) =>
    !Array.from(contentVersionsByLocale.values()).some((present) => present.includes(versionId)),
);
if (versionsWithoutAnyContent.length > 0) {
  errors.push(`у версий нет контента ни в одной локали: ${versionsWithoutAnyContent.join(', ')}`);
}

for (const [localeId, presentVersions] of contentVersionsByLocale) {
  const missing = versionIds.filter((versionId) => !presentVersions.includes(versionId));
  if (missing.length > 0) {
    warnings.push(
      `в локали ${localeId} нет контента для версий: ${missing.join(', ')} (страницы версии будут без руководств)`,
    );
  }
}

for (const warning of warnings) {
  console.warn(`[WARN] [docs-version] ${warning}`);
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`[docs-version] ${error}`);
  }
  process.exit(1);
}

const contentSummary = Array.from(contentVersionsByLocale.entries())
  .map(([localeId, presentVersions]) => `${localeId}: ${presentVersions.length}`)
  .join(', ');

console.log(
  `[docs-version] конфиг соответствует контенту: версий ${versions.length}, live ${expectedVersionId} (пакет ${rootPackage.version}), контент — ${contentSummary}`,
);
