import type { ReactNode } from 'react';
import { Size } from '../types/sizes';

/**
 * Форматирует содержимое бейджа (число > 9 → «9+», dot без текста).
 *
 * @param content — исходное содержимое
 * @param isDot — режим точки без текста
 */
export function formatBadgeDisplayContent(content: ReactNode, isDot: boolean): ReactNode {
  if (isDot) {
    return null;
  }

  if (typeof content === 'number' && content > 9) {
    return '9+';
  }

  if (typeof content === 'string') {
    const parsedNumber = parseInt(content, 10);
    if (!Number.isNaN(parsedNumber) && parsedNumber > 9) {
      return '9+';
    }
  }

  return content;
}

/**
 * Ключ для анимации при смене значения, размера или режима dot.
 *
 * @param content — исходное содержимое
 * @param isDot — режим точки
 * @param size — размер бейджа
 */
export function getBadgeMotionContentKey(
  content: ReactNode,
  isDot: boolean,
  size: Size = Size.MD,
): string {
  if (isDot) {
    return `dot:${size}`;
  }

  const formattedContent = formatBadgeDisplayContent(content, false);
  return `value:${String(formattedContent ?? '')}:${size}`;
}
