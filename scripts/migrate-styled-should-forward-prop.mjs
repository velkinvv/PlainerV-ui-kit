import fs from 'node:fs';
import { execSync } from 'node:child_process';

const trackedFiles = execSync('git ls-files "src/**/*.style.ts" "src/**/InputStyles.ts"', {
  encoding: 'utf8',
})
  .trim()
  .split(/\r?\n/)
  .filter(Boolean);

const importByDepth = [
  "import { createStyledShouldForwardProp } from '@/handlers/styledComponentHandlers';",
  "import { createStyledShouldForwardProp } from '../../../handlers/styledComponentHandlers';",
  "import { createStyledShouldForwardProp } from '../../../../handlers/styledComponentHandlers';",
];

for (const filePath of trackedFiles) {
  let source = fs.readFileSync(filePath, 'utf8');
  if (source.includes('createStyledShouldForwardProp')) {
    continue;
  }
  if (!/shouldForwardProp:\s*\(/.test(source)) {
    continue;
  }

  const slashCount = (filePath.match(/\//g) ?? []).length;
  const importLine = importByDepth[Math.min(slashCount, importByDepth.length - 1)];

  const firstImportIndex = source.indexOf('import ');
  if (firstImportIndex === -1) {
    continue;
  }
  const lineEndIndex = source.indexOf('\n', firstImportIndex);
  source = `${source.slice(0, lineEndIndex + 1)}${importLine}\n${source.slice(lineEndIndex + 1)}`;

  source = source.replace(
    /shouldForwardProp:\s*\([\s\S]*?\)\s*=>\s*[\s\S]*?,(\s*\n)/g,
    'shouldForwardProp: createStyledShouldForwardProp(),$1',
  );

  fs.writeFileSync(filePath, source);
  console.log(`updated ${filePath}`);
}
