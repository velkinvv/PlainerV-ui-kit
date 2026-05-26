import { BorderRadiusHandler } from '@/handlers/uiHandlers';
import { Size } from '@/types/sizes';
import type { CardProps } from '@/types/ui';
import type { ThemeType } from '@/types/theme';

/** Запасной радиус карточки MD, если в теме нет токенов */
const CARD_BORDER_RADIUS_FALLBACK = '16px';

/**
 * Нормализует размер карточки к ключам темы (`XS | SM | MD | LG | XL`).
 * @param rawSize — значение `size` / `padding` из пропсов Card или размер UI-компонента
 */
export function resolveCardSizeKey(
  rawSize: CardProps['size'] | CardProps['padding'] | Size | undefined,
): Size {
  if (rawSize == null || (typeof rawSize === 'string' && rawSize.length === 0)) {
    return Size.MD;
  }

  if (typeof rawSize === 'string') {
    const normalizedSize = rawSize.toUpperCase() as keyof typeof Size;
    return Size[normalizedSize] ?? Size.MD;
  }

  return rawSize;
}

/**
 * Настройки размера карточки из темы с fallback на `MD`.
 * @param theme — активная тема styled-components
 * @param rawSize — ступень размера Card
 */
export function getCardSizeSettings(
  theme: ThemeType,
  rawSize: CardProps['size'] | CardProps['padding'] | Size | undefined = Size.MD,
): ThemeType['cards']['sizes'][Size] {
  const resolvedSize = resolveCardSizeKey(rawSize);
  return theme.cards?.sizes?.[resolvedSize] ?? theme.cards.sizes[Size.MD];
}

/**
 * Скругление оболочки Card из `theme.cards.sizes`, как у компонента {@link Card}.
 * @param theme — активная тема styled-components
 * @param cardSize — ступень размера; по умолчанию `theme.borderRadius` или `MD`
 */
export function cardBorderRadiusFromTheme(
  theme: ThemeType,
  cardSize: CardProps['size'] | CardProps['padding'] | Size | undefined,
): string {
  const resolvedSize =
    cardSize ?? theme.borderRadius ?? theme.globalSize ?? Size.MD;
  const fromCardTier = getCardSizeSettings(theme, resolvedSize).borderRadius?.trim();

  if (fromCardTier) {
    return fromCardTier;
  }

  if (theme.borderRadius != null) {
    return BorderRadiusHandler(theme.borderRadius);
  }

  return CARD_BORDER_RADIUS_FALLBACK;
}
