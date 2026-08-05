import type { ThemeType } from '../types/theme';
import { ThemeColorScheme } from '../types/theme';
import { isOverlayPanelGlassTheme } from './overlayPanelGlassHandlers';
import { overlayPanelBackdropFilterFromTheme } from './overlayPanelShadowHandlers';
import { mixColorWithTransparent } from './glassColorHandlers';

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

/** Непрозрачность pill/filled-трека — чуть плотнее, чем у dropdown, % */
const TABS_TRACK_ALPHA_LIGHT = 34;

const TABS_TRACK_ALPHA_DARK = 10;

/** Непрозрачность pill-thumb — контрастнее трека, % */
const TABS_THUMB_ALPHA_LIGHT = 50;

const TABS_THUMB_ALPHA_DARK = 16;

/** Hover залитого сегмента, % */
const TABS_HOVER_ALPHA_LIGHT = 24;

const TABS_HOVER_ALPHA_DARK = 14;

/**
 * Glass-фон трека вкладок из `onAccent`.
 * @param mode — светлая или тёмная тема
 * @param onAccent — цвет из темы
 */
function getTabsGlassTrackBackground(mode: ThemeColorScheme, onAccent: string): string {
  const alphaPercent =
    mode === ThemeColorScheme.DARK ? TABS_TRACK_ALPHA_DARK : TABS_TRACK_ALPHA_LIGHT;
  return mixColorWithTransparent(onAccent, alphaPercent);
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
  const onAccent = context.colors?.onAccent ?? '#ffffff';

  if (isTabsGlassTheme(context)) {
    const trackBackground = getTabsGlassTrackBackground(context.mode, onAccent);

    return {
      pillTrackBackground: trackBackground,
      filledTrackBackground: trackBackground,
      pillThumbBackground: mixColorWithTransparent(
        onAccent,
        isDark ? TABS_THUMB_ALPHA_DARK : TABS_THUMB_ALPHA_LIGHT,
      ),
      pillThumbBoxShadow: isDark ? 'none' : (context.boxShadow?.sm ?? 'none'),
      segmentHoverBackground: mixColorWithTransparent(
        onAccent,
        isDark ? TABS_HOVER_ALPHA_DARK : TABS_HOVER_ALPHA_LIGHT,
      ),
      backdropFilter: overlayPanelBackdropFilterFromTheme(context as ThemeType),
      pillTrackBorder: `1px solid ${context.colors.borderSecondary}`,
    };
  }

  return {
    pillTrackBackground: context.colors.backgroundTertiary,
    filledTrackBackground: context.colors.backgroundSecondary,
    pillThumbBackground: isDark
      ? context.colors.backgroundQuaternary
      : context.colors.backgroundSecondary,
    pillThumbBoxShadow: isDark ? 'none' : (context.boxShadow?.sm ?? 'none'),
    segmentHoverBackground: context.colors.backgroundTertiary,
  };
}
