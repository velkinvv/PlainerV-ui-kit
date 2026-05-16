import fs from 'node:fs';
import path from 'node:path';

const uiComponentsDirectoryPath = path.join(process.cwd(), 'src', 'components', 'ui');
const expectedFolderName = 'table';
const temporaryFolderName = '__ui_table_casing_fix_temp__';

/**
 * На Windows NTFS папка может отображаться как `Table`, хотя в git — `table`.
 * TypeScript (forceConsistentCasingInFileNames) тогда подключает файлы дважды → TS1261.
 */
function ensureUiTableFolderCasing() {
  if (!fs.existsSync(uiComponentsDirectoryPath)) {
    return;
  }

  const directoryEntries = fs.readdirSync(uiComponentsDirectoryPath, { withFileTypes: true });
  const tableDirectoryEntry = directoryEntries.find(
    (entry) => entry.isDirectory() && entry.name.toLowerCase() === expectedFolderName,
  );

  if (!tableDirectoryEntry || tableDirectoryEntry.name === expectedFolderName) {
    return;
  }

  const sourceDirectoryPath = path.join(uiComponentsDirectoryPath, tableDirectoryEntry.name);
  const temporaryDirectoryPath = path.join(uiComponentsDirectoryPath, temporaryFolderName);
  const targetDirectoryPath = path.join(uiComponentsDirectoryPath, expectedFolderName);

  fs.renameSync(sourceDirectoryPath, temporaryDirectoryPath);
  fs.renameSync(temporaryDirectoryPath, targetDirectoryPath);

  console.log(
    `✅ Регистр папки таблиц исправлен: ${tableDirectoryEntry.name} → ${expectedFolderName}`,
  );
}

ensureUiTableFolderCasing();
