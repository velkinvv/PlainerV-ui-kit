import type { BoxShadowType, Colors } from '../../types/theme';
import {
  getKidsThemePalette,
  type KidsAudienceVariant,
  type KidsPaletteVariant,
} from '../../variables/kids';

/**
 * Создаёт палитру цветов kids-темы.
 * @param audience — мальчики или девочки
 * @param paletteVariant — светлая или тёмная основа
 */
export function createKidsColors(
  audience: KidsAudienceVariant,
  paletteVariant: KidsPaletteVariant,
): Colors {
  const palette = getKidsThemePalette(audience, paletteVariant);
  const { accents, surfaces } = palette;
  const isDarkBase = paletteVariant === 'dark';

  return {
    background: surfaces.background,
    backgroundSecondary: surfaces.backgroundSecondary,
    backgroundTertiary: surfaces.backgroundTertiary,
    backgroundQuaternary: isDarkBase ? surfaces.backgroundTertiary : surfaces.borderTertiary,
    backgroundQuinary: isDarkBase ? surfaces.background : '#FFF5F6',

    card: surfaces.card,
    input: surfaces.input,
    avatarBackground: surfaces.backgroundTertiary,
    progressBackground: surfaces.backgroundTertiary,
    progressTrack: surfaces.borderTertiary,
    progressFill: accents.success,
    progressValue: surfaces.text,
    progressStatusAwait: surfaces.textTertiary,
    progressStatusLoading: accents.info,
    progressStatusSuccess: accents.success,
    progressStatusError: accents.danger,
    imageBackground: surfaces.backgroundTertiary,

    text: surfaces.text,
    textSecondary: surfaces.textSecondary,
    textTertiary: surfaces.textTertiary,
    textDisabled: isDarkBase ? surfaces.textTertiary : '#94A3B8',

    primary: accents.primary,
    primaryHover: accents.primaryHover,
    primaryActive: accents.primaryActive,
    secondary: accents.secondary,
    secondaryHover: accents.secondaryHover,

    border: surfaces.border,
    borderSecondary: surfaces.borderSecondary,
    borderTertiary: surfaces.borderTertiary,
    borderHover: accents.primaryHover,

    success: accents.success,
    successHover: accents.successHover,
    warning: accents.warning,
    danger: accents.danger,
    dangerHover: accents.dangerHover,
    info: accents.info,
    infoHover: accents.infoHover,

    tagPrimaryAccent: accents.primary,
    tagAccentPurple: audience === 'girls' ? accents.secondary : '#A855F7',
    tagAccentTeal: '#14B8A6',
    tagAccentCyan: accents.info,
    tagAccentPink: audience === 'girls' ? accents.primary : '#EC4899',

    overlay: palette.overlay,
    shadow: palette.shadowGlow,
    transparent: 'transparent',
  };
}

/**
 * Мягкие цветные тени для kids-темы.
 * @param audience — мальчики или девочки
 * @param paletteVariant — светлая или тёмная основа
 */
export function createKidsBoxShadow(
  audience: KidsAudienceVariant,
  paletteVariant: KidsPaletteVariant,
): BoxShadowType {
  const palette = getKidsThemePalette(audience, paletteVariant);
  const { shadowGlow, shadowSoft } = palette;
  const focusColor =
    audience === 'boys'
      ? paletteVariant === 'dark'
        ? 'rgba(34, 211, 238, 0.45)'
        : 'rgba(37, 99, 235, 0.35)'
      : paletteVariant === 'dark'
        ? 'rgba(244, 114, 182, 0.45)'
        : 'rgba(236, 72, 153, 0.35)';

  return {
    sm: `0 2px 8px ${shadowSoft}`,
    md: `0 4px 14px ${shadowSoft}`,
    lg: `0 8px 24px ${shadowSoft}`,
    xl: `0 12px 32px ${shadowGlow}`,
    primary: `0 4px 16px ${shadowGlow}`,
    success: `0 4px 14px rgba(34, 197, 94, 0.35)`,
    warning: `0 4px 14px rgba(234, 179, 8, 0.35)`,
    danger: `0 4px 14px rgba(239, 68, 68, 0.35)`,
    inputFocus: `0 0 0 3px ${focusColor}`,
    notification: `0 6px 20px ${shadowGlow}`,
    tooltip: `0 4px 12px ${shadowSoft}`,
    dropdown: `0 8px 24px ${shadowSoft}`,
    modal: `0 16px 40px ${shadowGlow}`,
    cardHover: `0 10px 28px ${shadowGlow}`,
    avatarOnline: `0 0 0 2px rgba(34, 197, 94, 0.6)`,
    avatarOffline: `0 0 0 2px rgba(148, 163, 184, 0.5)`,
    avatarDanger: `0 0 0 2px rgba(239, 68, 68, 0.6)`,
    avatarWarning: `0 0 0 2px rgba(234, 179, 8, 0.6)`,
  };
}
