/**
 * Значение из объекта по пути с точками (`user.name`).
 * @param record — объект строки или произвольное значение
 * @param path — ключ или вложенный путь
 */
export function getValueByObjectPath(record: unknown, path: string): unknown {
  const trimmedPath = path?.trim();
  if (trimmedPath === '' || record == null || typeof record !== 'object') {
    return undefined;
  }
  if (!trimmedPath.includes('.')) {
    return (record as Record<string, unknown>)?.[trimmedPath];
  }
  const segments = trimmedPath.split('.');
  let current: unknown = record;
  for (const segment of segments) {
    if (current == null || typeof current !== 'object') {
      return undefined;
    }
    current = (current as Record<string, unknown>)?.[segment];
  }
  return current;
}
