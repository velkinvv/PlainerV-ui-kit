import type { ThemeType } from '../types/theme';
import { ThemeColorScheme } from '../types/theme';
import { isGlassColorScheme } from './glassSurfaceHandlers';
import { mixColorWithTransparent } from './glassColorHandlers';

/** Контекст темы для резолва glass-токенов карусели */
export type CarouselThemeContext = Pick<ThemeType, 'mode' | 'colors' | 'surfaceMaterial'>;

/** Токены поверхностей карусели (контролы, подпись, миниатюры) */
export interface CarouselSurfaceTokens {
  /** Фон кнопок стрелок и autoplay */
  controlBackground: string;
  /** Hover фон контролов */
  controlHoverBackground: string;
  /** Рамка контролов */
  controlBorder: string;
  /** Цвет иконок контролов */
  controlTextColor: string;
  /** Фон «капсулы» точек */
  dotsTrackBackground: string;
  /** Фон подписи слайда */
  captionBackground: string;
  /** Рамка подписи */
  captionBorder: string;
  /** Фон полосы миниатюр */
  thumbnailStripBackground: string;
  /** Рамка неактивной миниатюры */
  thumbnailInactiveBorder: string;
  /** Рамка активной миниатюры */
  thumbnailActiveBorder: string;
  /** Обводка оболочки карусели в glass-теме */
  shellBorder?: string;
  /** backdrop-filter из surfaceMaterial */
  backdropFilter?: string;
}

/**
 * Проверяет, активна ли glass-тема для карусели.
 * @param context — режим темы и surfaceMaterial
 */
export function isCarouselGlassTheme(context: CarouselThemeContext): boolean {
  return isGlassColorScheme(context);
}

/**
 * Glass-палитра карусели — лёгкая прозрачность из `onAccent` / `overlay`.
 * @param context — контекст темы
 */
export function getCarouselGlassSurfaceTokens(context: CarouselThemeContext): CarouselSurfaceTokens {
  const isDark = context.mode === ThemeColorScheme.DARK;
  const backdropFilter = context.surfaceMaterial?.backdropFilter;
  const onAccent = context.colors.onAccent ?? context.colors.backgroundSecondary;
  const overlay = context.colors.overlay;

  return {
    controlBackground: mixColorWithTransparent(onAccent, isDark ? 10 : 38),
    controlHoverBackground: mixColorWithTransparent(onAccent, isDark ? 16 : 52),
    controlBorder: `1px solid ${context.colors.borderSecondary}`,
    controlTextColor: context.colors.text,
    dotsTrackBackground: mixColorWithTransparent(overlay, isDark ? 64 : 48),
    captionBackground: mixColorWithTransparent(onAccent, isDark ? 6 : 26),
    captionBorder: `1px solid ${context.colors.borderSecondary}`,
    thumbnailStripBackground: mixColorWithTransparent(onAccent, isDark ? 6 : 22),
    thumbnailInactiveBorder: context.colors.borderSecondary,
    thumbnailActiveBorder: context.colors.primary,
    shellBorder: `1px solid ${context.colors.borderTertiary}`,
    backdropFilter,
  };
}

/**
 * Палитра карусели по теме (glass или обычная).
 * @param context — контекст темы
 */
export function getCarouselSurfaceTokens(context: CarouselThemeContext): CarouselSurfaceTokens {
  if (isCarouselGlassTheme(context)) {
    return getCarouselGlassSurfaceTokens(context);
  }

  const overlay = context.colors.overlay;

  return {
    controlBackground: context.colors.backgroundSecondary,
    controlHoverBackground: context.colors.backgroundTertiary,
    controlBorder: `1px solid ${context.colors.borderSecondary}`,
    controlTextColor: context.colors.text,
    dotsTrackBackground: mixColorWithTransparent(overlay, 56),
    captionBackground: context.colors.backgroundSecondary,
    captionBorder: `1px solid ${context.colors.borderSecondary}`,
    thumbnailStripBackground: context.colors.backgroundSecondary,
    thumbnailInactiveBorder: context.colors.borderSecondary,
    thumbnailActiveBorder: context.colors.primary,
  };
}

/**
 * CSS backdrop-filter для glass-поверхностей карусели.
 * @param tokens — токены поверхности
 */
export function getCarouselBackdropFilterCss(tokens: CarouselSurfaceTokens): string | undefined {
  return tokens.backdropFilter;
}
