import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DOCS_APP_ROOT = path.resolve(SCRIPT_DIR, '..');
const CONTENT_ROOT = path.resolve(DOCS_APP_ROOT, 'content/docs');
const OUTPUT_JSON = path.resolve(DOCS_APP_ROOT, 'src/generated/content-manifest.json');
const OUTPUT_TS = path.resolve(DOCS_APP_ROOT, 'src/generated/content-manifest.ts');
const normalizeJsonText = (text) => text.replace(/^\uFEFF/, '');

const readJson = (filePath) => {
  const source = normalizeJsonText(fs.readFileSync(filePath, 'utf8'));

  try {
    return JSON.parse(source);
  } catch (error) {
    throw new Error(`[content-manifest] Failed to parse JSON: ${filePath}: ${error.message}`);
  }
};

const parseOrder = (value) => {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) ? parsed : null;
};

const parsePlatform = (value) => {
  if (!value) {
    return null;
  }

  const platform = String(value).toLowerCase();
  return platform === 'web' ? 'web' : null;
};

const extractFrontmatterBlock = (source) => {
  if (!source.startsWith('---\n') && !source.startsWith('---\r\n')) {
    return null;
  }

  const lines = source.split(/\r?\n/);
  if (lines[0]?.trim() !== '---') {
    return null;
  }

  for (let index = 1; index < lines.length; index += 1) {
    if (lines[index].trim() === '---') {
      return lines.slice(1, index).join('\n');
    }
  }

  return null;
};

const readFrontmatter = (filePath) => {
  const source = fs.readFileSync(filePath, 'utf8');
  const frontmatterBlock = extractFrontmatterBlock(source);

  if (!frontmatterBlock) {
    return {
      title: '',
      description: '',
      order: null,
      platform: null,
    };
  }

  let frontmatter = {};
  try {
    const parsed = YAML.parse(frontmatterBlock);
    frontmatter = parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    throw new Error(`[content-manifest] Failed to parse frontmatter in ${filePath}: ${error.message}`);
  }

  return {
    title: typeof frontmatter.title === 'string' ? frontmatter.title.trim() : '',
    description: typeof frontmatter.description === 'string' ? frontmatter.description.trim() : '',
    order: parseOrder(frontmatter.order),
    platform: parsePlatform(frontmatter.platform),
  };
};

const buildGuidesForVersion = (localeId, versionDir, orderMap) => {
  const files = fs
    .readdirSync(versionDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))
    .filter((entry) => entry.name !== 'index.mdx')
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, 'ru'));

  return files
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/i, '');
      const filePath = path.join(versionDir, fileName);
      const frontmatter = readFrontmatter(filePath);
      const platform = frontmatter.platform ?? 'web';

      if (platform !== 'web') {
        return null;
      }

      const order = frontmatter.order ?? orderMap.get(slug) ?? Number.MAX_SAFE_INTEGER;

      return {
        locale: localeId,
        platform,
        version: path.basename(versionDir),
        slug,
        title: frontmatter.title || slug,
        description: frontmatter.description || '',
        order,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, 'ru'));
};

const buildManifest = () => {
  const locales = fs
    .readdirSync(CONTENT_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((localeId) => localeId !== 'mobile');

  const guides = [];

  for (const localeId of locales) {
    const webRoot = path.join(CONTENT_ROOT, localeId, 'web');
    if (!fs.existsSync(webRoot)) continue;

    const versionDirs = fs
      .readdirSync(webRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    for (const versionId of versionDirs) {
      const versionDir = path.join(webRoot, versionId);
      const metaPath = path.join(versionDir, 'meta.json');

      const orderMap = new Map();
      if (fs.existsSync(metaPath)) {
        const meta = readJson(metaPath);
        const pages = Array.isArray(meta.pages) ? meta.pages : [];
        pages.forEach((slug, index) => {
          if (slug !== 'index') {
            orderMap.set(slug, index);
          }
        });
      }

      guides.push(...buildGuidesForVersion(localeId, versionDir, orderMap));
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    guides,
  };
};

const writeManifest = (manifest) => {
  fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  fs.writeFileSync(OUTPUT_TS, `export const contentManifest = ${JSON.stringify(manifest, null, 2)} as const;\n`, 'utf8');
};

const manifest = buildManifest();
writeManifest(manifest);
console.log(`[content-manifest] Generated ${manifest.guides.length} guides`);
