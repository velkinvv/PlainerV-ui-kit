import { Size } from '../../../types/sizes';
import type {
  ListMarkerStyle,
  ListOrderedMarkerStyle,
  ListUnorderedMarkerStyle,
  ListVariant,
} from '../../../types/ui';

/** Геометрия и типографика списка по размеру */
export type ListGeometry = {
  /** Размер шрифта текста пункта */
  fontSize: string;
  /** Межстрочный интервал */
  lineHeight: string;
  /** Высота слота маркера, px */
  markerSlotSize: number;
  /** Размер иконки-маркера */
  iconSize: Size;
};

/**
 * Возвращает геометрию списка.
 * @param size - Размер из дизайн-системы (`SM` / `MD`; остальные → ближайшие)
 */
export const getListGeometry = (size: Size = Size.MD): ListGeometry => {
  switch (size) {
    case Size.XS:
    case Size.SM:
      return {
        fontSize: '14px',
        lineHeight: '20px',
        markerSlotSize: 20,
        iconSize: Size.SM,
      };
    case Size.MD:
    case Size.LG:
    case Size.XL:
    default:
      return {
        fontSize: '16px',
        lineHeight: '24px',
        markerSlotSize: 24,
        iconSize: Size.MD,
      };
  }
};

/**
 * CSS gap из числа (px) или строки.
 * @param gap - Значение пропа `gap`
 */
export const listGapToCss = (gap: number | string | undefined): string => {
  if (gap === undefined) {
    return '8px';
  }
  return typeof gap === 'number' ? `${gap}px` : gap;
};

/**
 * Дефолтный стиль маркера для варианта списка.
 * @param variant - ordered / unordered
 */
export const getDefaultListMarkerStyle = (variant: ListVariant): ListMarkerStyle =>
  variant === 'ordered' ? 'numbers' : 'bullet';

/**
 * Нормализует `markerStyle` под выбранный `variant` (несовместимые → дефолт).
 * @param variant - Вариант списка
 * @param markerStyle - Запрошенный стиль
 */
export const resolveListMarkerStyle = (
  variant: ListVariant,
  markerStyle: ListMarkerStyle | undefined,
): ListMarkerStyle => {
  if (markerStyle == null) {
    return getDefaultListMarkerStyle(variant);
  }

  if (variant === 'ordered') {
    const orderedStyles: ListOrderedMarkerStyle[] = [
      'numbers',
      'lower-letters',
      'upper-letters',
    ];
    return orderedStyles.includes(markerStyle as ListOrderedMarkerStyle)
      ? markerStyle
      : 'numbers';
  }

  const unorderedStyles: ListUnorderedMarkerStyle[] = ['bullet', 'virgule', 'icon'];
  return unorderedStyles.includes(markerStyle as ListUnorderedMarkerStyle)
    ? markerStyle
    : 'bullet';
};

/**
 * Корневой HTML-тег списка.
 * @param variant - Вариант списка
 */
export const getListRootTag = (variant: ListVariant): 'ol' | 'ul' =>
  variant === 'ordered' ? 'ol' : 'ul';

/**
 * Нужен ли CSS-маркер через `::before` (для `icon` — нет).
 * @param markerStyle - Стиль маркера
 */
export const shouldRenderCssListMarker = (markerStyle: ListMarkerStyle): boolean =>
  markerStyle !== 'icon';
