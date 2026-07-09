import { BorderRadiusHandler } from '@/handlers/uiHandlers';
import { Size } from '@/types/sizes';
import type { CardProps } from '@/types/ui';
import type { ThemeType } from '@/types/theme';

/** Запасной радиус карточки MD, если в теме нет токенов */
const CARD_BORDER_RADIUS_FALLBACK = '16px';

/** Порядок ступеней скругления для смещения на шаг меньше */
const CARD_BORDER_RADIUS_SIZE_STEPS: Size[] = [
  Size.XS,
  Size.SM,
  Size.MD,
  Size.LG,
  Size.XL,
];

/**
 * Ступень размера на один уровень меньше (для более компактного внешнего скругления).
 * @param size — текущая ступень
 */
export function cardBorderRadiusSizeOneStepSmaller(size: Size): Size {
  const stepIndex = CARD_BORDER_RADIUS_SIZE_STEPS.indexOf(size);

  if (stepIndex <= 0) {
    return Size.XS;
  }

  return CARD_BORDER_RADIUS_SIZE_STEPS[stepIndex - 1] ?? Size.XS;
}

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
  const resolvedSize = cardSize ?? theme.borderRadius ?? theme.globalSize ?? Size.MD;
  const fromCardTier = getCardSizeSettings(theme, resolvedSize).borderRadius?.trim();

  if (fromCardTier) {
    return fromCardTier;
  }

  if (theme.borderRadius != null) {
    return BorderRadiusHandler(theme.borderRadius);
  }

  return CARD_BORDER_RADIUS_FALLBACK;
}

/**
 * Скругление внешней оболочки на ступень меньше, чем у Card того же размера.
 * @param theme — активная тема styled-components
 * @param cardSize — ступень размера; по умолчанию `theme.borderRadius` или `MD`
 */
export function compactCardBorderRadiusFromTheme(
  theme: ThemeType,
  cardSize: CardProps['size'] | CardProps['padding'] | Size | undefined,
): string {
  const resolvedSize = resolveCardSizeKey(cardSize ?? theme.borderRadius ?? theme.globalSize ?? Size.MD);
  const compactSize = cardBorderRadiusSizeOneStepSmaller(resolvedSize);

  return cardBorderRadiusFromTheme(theme, compactSize);
}
