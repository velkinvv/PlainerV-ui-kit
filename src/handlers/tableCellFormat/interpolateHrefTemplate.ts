import { getValueByObjectPath } from './getValueByObjectPath';

/**
 * Подставляет в шаблон плейсхолдеры `{поле}` и `{вложенный.ключ}` из объекта строки.
 * @param template — строка с `{…}`; пробелы внутри скобок игнорируются
 * @param row — объект данных (опционально для ручной таблицы)
 */
export function interpolateHrefTemplate(template: string, row: unknown): string {
  if (!template.includes('{')) {
    return template;
  }
  return template.replace(/\{\s*([^}]+?)\s*\}/g, (_match, rawPath: string) => {
    const pathKey = String(rawPath).trim();
    const extracted = getValueByObjectPath(row, pathKey);
    if (extracted == null || extracted === '') {
      return '';
    }
    return String(extracted);
  });
}
