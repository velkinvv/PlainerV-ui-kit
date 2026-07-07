import type { ThemeType } from '../types/theme';
import { ThemeColorScheme } from '../types/theme';
import { isGlassColorScheme } from './glassSurfaceHandlers';

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
 * Glass-палитра карусели — лёгкая прозрачность как у pagination / accordion.
 * @param context — контекст темы
 */
export function getCarouselGlassSurfaceTokens(context: CarouselThemeContext): CarouselSurfaceTokens {
  const isDark = context.mode === ThemeColorScheme.DARK;
  const backdropFilter = context.surfaceMaterial?.backdropFilter;

  return {
    controlBackground: isDark ? 'rgba(255, 255, 255, 0.10)' : 'rgba(255, 255, 255, 0.38)',
    controlHoverBackground: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.52)',
    controlBorder: `1px solid ${context.colors.borderSecondary}`,
    controlTextColor: context.colors.text,
    dotsTrackBackground: isDark ? 'rgba(0, 0, 0, 0.32)' : 'rgba(0, 0, 0, 0.24)',
    captionBackground: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.26)',
    captionBorder: `1px solid ${context.colors.borderSecondary}`,
    thumbnailStripBackground: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.22)',
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

  return {
    controlBackground: context.colors.backgroundSecondary,
    controlHoverBackground: context.colors.backgroundTertiary,
    controlBorder: `1px solid ${context.colors.borderSecondary}`,
    controlTextColor: context.colors.text,
    dotsTrackBackground: 'rgba(0, 0, 0, 0.28)',
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
