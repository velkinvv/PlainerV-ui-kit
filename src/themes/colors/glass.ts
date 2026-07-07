import type { BoxShadowType, Colors } from '../../types/theme';
import { colors } from '../../variables/colors';
import {
  getGlassSurfacePalette,
  type GlassPaletteVariant,
} from '../../variables/glass';

/**
 * Создаёт палитру цветов glass-темы на базе светлой или тёмной основы.
 * @param paletteVariant — `light` или `dark` glass-палитра
 */
export function createGlassColors(paletteVariant: GlassPaletteVariant): Colors {
  const glassPalette = getGlassSurfacePalette(paletteVariant);
  const isDarkBase = paletteVariant === 'dark';

  const accentUiBase = isDarkBase ? colors.primary[400] : colors.primary[500];
  const accentUiHover = isDarkBase ? colors.primary[300] : colors.primary[600];
  const accentUiActive = isDarkBase ? colors.primary[200] : colors.primary[700];

  return {
    background: 'transparent',
    backgroundSecondary: glassPalette.surfaceElevated,
    backgroundTertiary: glassPalette.surfaceMuted,
    backgroundQuaternary: glassPalette.surfaceSubtle,
    backgroundQuinary: glassPalette.surface,

    card: glassPalette.surfaceElevated,
    input: glassPalette.surface,
    avatarBackground: glassPalette.surfaceMuted,
    progressBackground: glassPalette.surfaceMuted,
    progressTrack: glassPalette.surfaceSubtle,
    progressFill: isDarkBase ? colors.success[500] : colors.success[500],
    progressValue: isDarkBase ? 'rgba(255, 255, 255, 0.8)' : colors.grey[700],
    progressStatusAwait: isDarkBase ? colors.grey[500] : colors.grey[400],
    progressStatusLoading: colors.success[400],
    progressStatusSuccess: colors.success[500],
    progressStatusError: isDarkBase ? colors.red[400] : colors.red[600],
    imageBackground: glassPalette.surfaceSubtle,

    text: isDarkBase ? colors.neutral[10] : colors.grey[900],
    textSecondary: isDarkBase ? colors.grey[300] : colors.grey[700],
    textTertiary: isDarkBase ? colors.grey[500] : colors.grey[500],
    textDisabled: isDarkBase ? colors.grey[600] : colors.grey[400],

    primary: accentUiBase,
    primaryHover: accentUiHover,
    primaryActive: accentUiActive,
    secondary: isDarkBase ? colors.grey[400] : colors.grey[600],
    secondaryHover: isDarkBase ? colors.grey[300] : colors.grey[700],

    border: glassPalette.borderHairline,
    borderSecondary: glassPalette.borderSubtle,
    borderTertiary: glassPalette.border,
    borderHover: isDarkBase ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)',

    success: isDarkBase ? colors.green[400] : colors.green[600],
    successHover: isDarkBase ? colors.green[300] : colors.green[700],
    warning: isDarkBase ? colors.orange[400] : colors.orange[500],
    danger: isDarkBase ? colors.red[400] : colors.red[600],
    dangerHover: isDarkBase ? colors.red[300] : colors.red[700],
    info: accentUiBase,
    infoHover: accentUiHover,
    tagPrimaryAccent: colors.primary[600],
    tagAccentPurple: isDarkBase ? colors.purple[400] : colors.purple[600],
    tagAccentTeal: isDarkBase ? colors.teal[400] : colors.teal[600],
    tagAccentCyan: isDarkBase ? colors.cyan[400] : colors.cyan[600],
    tagAccentPink: isDarkBase ? colors.pink[400] : colors.pink[600],

    overlay: glassPalette.overlay,
    shadow: isDarkBase ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.08)',
    transparent: 'transparent',
  };
}

/**
 * Мягкие тени для glass-панелей.
 * @param paletteVariant — `light` или `dark` glass-палитра
 */
export function createGlassBoxShadow(paletteVariant: GlassPaletteVariant): BoxShadowType {
  const isDarkBase = paletteVariant === 'dark';
  const shadowBase = isDarkBase ? 'rgba(0, 0, 0, 0.35)' : 'rgba(0, 0, 0, 0.08)';
  const shadowSoft = isDarkBase ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.04)';

  return {
    sm: `0 1px 2px ${shadowSoft}`,
    md: `0 8px 24px ${shadowBase}`,
    lg: `0 12px 40px ${shadowBase}`,
    xl: `0 20px 48px ${shadowBase}`,
    primary: `0 0 0 3px rgba(33, 150, 243, 0.12), 0 8px 24px ${shadowBase}`,
    success: `0 0 0 3px rgba(76, 175, 80, 0.12), 0 8px 24px ${shadowBase}`,
    warning: `0 0 0 3px rgba(255, 193, 7, 0.12), 0 8px 24px ${shadowBase}`,
    danger: `0 0 0 3px rgba(244, 67, 54, 0.12), 0 8px 24px ${shadowBase}`,
    inputFocus: '0 0 0 3px rgba(33, 150, 243, 0.15)',
    notification: `0 8px 32px ${shadowBase}`,
    tooltip: `0 4px 16px ${shadowBase}`,
    dropdown: `0 8px 32px ${shadowBase}`,
    modal: `0 24px 48px ${isDarkBase ? 'rgba(0, 0, 0, 0.45)' : 'rgba(0, 0, 0, 0.14)'}`,
    cardHover: `0 12px 36px ${shadowBase}`,
    avatarOnline: '0px 2px 10px 0px rgba(147, 232, 80, 0.24)',
    avatarOffline: '0px 2px 10px 0px rgba(156, 163, 175, 0.24)',
    avatarDanger: '0px 2px 10px 0px rgba(239, 68, 68, 0.24)',
    avatarWarning: '0px 2px 10px 0px rgba(245, 158, 11, 0.24)',
  };
}
