import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const esmEntryPath = path.join(process.cwd(), 'dist', 'index.esm.js');
const useClientDirective = "'use client';\n";

const esmEntryContent = await readFile(esmEntryPath, 'utf8');
const trimmedContent = esmEntryContent.trimStart();

if (
  trimmedContent.startsWith("'use client';") ||
  trimmedContent.startsWith('"use client";')
) {
  process.exit(0);
}

await writeFile(esmEntryPath, `${useClientDirective}${esmEntryContent}`, 'utf8');
