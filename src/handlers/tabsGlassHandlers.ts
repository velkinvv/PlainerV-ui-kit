import type { ThemeType } from '../types/theme';
import { ThemeColorScheme } from '../types/theme';
import { isOverlayPanelGlassTheme } from './overlayPanelGlassHandlers';
import { overlayPanelBackdropFilterFromTheme } from './overlayPanelShadowHandlers';

/** Контекст темы для резолва glass-токенов вкладок */
export type TabsThemeContext = Pick<
  ThemeType,
  'mode' | 'colors' | 'surfaceMaterial' | 'dropdowns' | 'boxShadow'
>;

/** Токены поверхностей Tabs (трек и pill-thumb) */
export interface TabsSurfaceTokens {
  /** Фон pill-трека */
  pillTrackBackground: string;
  /** Фон трека с залитыми сегментами (filledSegmentTriggers) */
  filledTrackBackground: string;
  /** Подвижная «капля» активного pill-сегмента */
  pillThumbBackground: string;
  /** Тень pill-thumb в светлой теме */
  pillThumbBoxShadow: string;
  /** Hover-фон залитого неактивного сегмента */
  segmentHoverBackground: string;
  /** Vibrancy для glass-поверхностей */
  backdropFilter?: string;
  /** Рамка pill-трека в glass-теме */
  pillTrackBorder?: string;
}

/** Непрозрачность pill/filled-трека — чуть плотнее, чем у dropdown (0.26 / 0.06) */
const TABS_TRACK_ALPHA_LIGHT = 0.34;

const TABS_TRACK_ALPHA_DARK = 0.1;

/** Непрозрачность pill-thumb — контрастнее трека */
const TABS_THUMB_ALPHA_LIGHT = 0.5;

const TABS_THUMB_ALPHA_DARK = 0.16;

/** Hover залитого сегмента */
const TABS_HOVER_ALPHA_LIGHT = 0.24;

const TABS_HOVER_ALPHA_DARK = 0.14;

/**
 * Glass-фон трека вкладок.
 * @param mode — светлая или тёмная тема
 */
function getTabsGlassTrackBackground(mode: ThemeColorScheme): string {
  if (mode === ThemeColorScheme.DARK) {
    return `rgba(255, 255, 255, ${TABS_TRACK_ALPHA_DARK})`;
  }

  return `rgba(255, 255, 255, ${TABS_TRACK_ALPHA_LIGHT})`;
}

/**
 * Проверяет, активна ли glass-тема для Tabs.
 * @param context — активная тема styled-components
 */
export function isTabsGlassTheme(context: TabsThemeContext): boolean {
  return isOverlayPanelGlassTheme(context);
}

/**
 * Токены поверхностей Tabs с учётом glass-темы.
 * @param context — контекст темы
 */
export function getTabsSurfaceTokens(context: TabsThemeContext): TabsSurfaceTokens {
  const isDark = context.mode === ThemeColorScheme.DARK;

  if (isTabsGlassTheme(context)) {
    const trackBackground = getTabsGlassTrackBackground(context.mode);

    return {
      pillTrackBackground: trackBackground,
      filledTrackBackground: trackBackground,
      pillThumbBackground: isDark
        ? `rgba(255, 255, 255, ${TABS_THUMB_ALPHA_DARK})`
        : `rgba(255, 255, 255, ${TABS_THUMB_ALPHA_LIGHT})`,
      pillThumbBoxShadow: isDark ? 'none' : (context.boxShadow?.sm ?? 'none'),
      segmentHoverBackground: isDark
        ? `rgba(255, 255, 255, ${TABS_HOVER_ALPHA_DARK})`
        : `rgba(255, 255, 255, ${TABS_HOVER_ALPHA_LIGHT})`,
      backdropFilter: overlayPanelBackdropFilterFromTheme(context as ThemeType),
      pillTrackBorder: `1px solid ${context.colors.borderSecondary}`,
    };
  }

  return {
    pillTrackBackground: isDark ? '#1c1c1c' : context.colors.backgroundTertiary,
    filledTrackBackground: context.colors.backgroundSecondary,
    pillThumbBackground: isDark ? '#444444' : context.colors.backgroundSecondary,
    pillThumbBoxShadow: isDark ? 'none' : (context.boxShadow?.sm ?? 'none'),
    segmentHoverBackground: context.colors.backgroundTertiary,
  };
}
