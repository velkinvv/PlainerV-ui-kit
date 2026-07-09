/**
 * Преобразует hex-цвет (#RRGGBB) в rgba с заданной прозрачностью.
 * @param hexColor — цвет в формате #RRGGBB
 * @param alpha — прозрачность от 0 до 1
 */
export function withHexAlpha(hexColor: string, alpha: number): string {
  const normalizedHex = hexColor.replace('#', '');
  const red = parseInt(normalizedHex.slice(0, 2), 16);
  const green = parseInt(normalizedHex.slice(2, 4), 16);
  const blue = parseInt(normalizedHex.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

/** Непрозрачность заливки glass-tooltip и glass-hint */
export const GLASS_OVERLAY_FILLED_ALPHA = 0.86;

/** Непрозрачность рамки glass-tooltip и glass-hint */
export const GLASS_OVERLAY_BORDER_ALPHA = 0.94;

/**
 * Добавляет прозрачность к цвету в формате hex или hsl/hsla.
 * @param color — исходный цвет
 * @param alpha — прозрачность от 0 до 1; если не задана, цвет возвращается без изменений
 */
export function applyColorAlpha(color: string, alpha?: number): string {
  if (alpha === undefined) {
    return color;
  }

  const trimmedColor = color.trim();

  if (trimmedColor.startsWith('#')) {
    return withHexAlpha(trimmedColor, alpha);
  }

  const hslMatch = trimmedColor.match(/^hsl\(\s*([\d.]+)\s*,\s*([\d.]+%)\s*,\s*([\d.]+%)\s*\)$/i);
  if (hslMatch) {
    const [, hue, saturation, lightness] = hslMatch;
    return `hsla(${hue}, ${saturation}, ${lightness}, ${alpha})`;
  }

  const hslaMatch = trimmedColor.match(
    /^hsla\(\s*([\d.]+)\s*,\s*([\d.]+%)\s*,\s*([\d.]+%)\s*,\s*[\d.]+\s*\)$/i,
  );
  if (hslaMatch) {
    const [, hue, saturation, lightness] = hslaMatch;
    return `hsla(${hue}, ${saturation}, ${lightness}, ${alpha})`;
  }

  return color;
}
