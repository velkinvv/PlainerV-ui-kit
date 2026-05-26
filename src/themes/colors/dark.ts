// Цветовая палитра для тёмной темы (поднятые «угольные» поверхности вместо near-black)

import type { BoxShadowType, BlurType, Colors } from '../../types/theme';
import { colors } from '../../variables/colors';
import { darkShadows } from '../../variables/shadows';
import { blurClasses } from '../../variables/blur';

// Тени (импортированы из variables/shadows.ts)
export const darkBoxShadow: BoxShadowType = darkShadows;

// Размытие (импортировано из variables/blur.ts)
export const darkBlur: BlurType = blurClasses;

/** Акцент UI из палитры `colors.primary` — общий базис для **info** и **theme.colors.primary**. */
const accentUiBase = colors.primary[400];
const accentUiHover = colors.primary[300];
const accentUiActive = colors.primary[200];

/** Фон страницы — тёмно-серый, не почти чёрный. */
const surfacePage = colors.grey[900];

/** Карточки, панели, вторичные поверхности и поля ввода (как на макете ~#424242). */
const surfaceElevated = colors.neutral[800];

/** Третичные блоки, неактивные зоны. */
const surfaceMuted = colors.grey[700];

// Цвета для тёмной темы
export const darkColors: Colors = {
  // Основные фоновые цвета
  background: surfacePage,
  backgroundSecondary: surfaceElevated,
  backgroundTertiary: surfaceMuted,
  backgroundQuaternary: colors.grey[600],
  backgroundQuinary: colors.grey[800],

  // Специальные фоновые цвета
  card: surfaceElevated,
  /** По умолчанию совпадает с `backgroundSecondary`; в кастомной теме можно задать отдельно. */
  input: surfaceElevated,
  avatarBackground: colors.grey[800],
  progressBackground: colors.grey[700],
  /** Трек Progress / Slider: светлее, чтобы читался на `backgroundSecondary` (#424242). */
  progressTrack: colors.grey[500],
  progressFill: colors.success[500],
  progressValue: 'rgba(255, 255, 255, 0.8)',
  progressStatusAwait: colors.grey[500],
  progressStatusLoading: colors.success[400],
  progressStatusSuccess: colors.success[500],
  progressStatusError: colors.red[400],
  imageBackground: colors.grey[900],

  // Текстовые цвета
  text: colors.neutral[10],
  textSecondary: colors.grey[300],
  textTertiary: colors.grey[500],
  textDisabled: colors.grey[600],

  // Основные цвета (совпадают с info — палитра primary)
  primary: accentUiBase,
  primaryHover: accentUiHover,
  primaryActive: accentUiActive,
  secondary: colors.grey[400],
  secondaryHover: colors.grey[300],

  // Граничные цвета — нейтральные, читаемые на угольных поверхностях
  border: colors.grey[600],
  borderSecondary: colors.grey[700],
  borderTertiary: colors.grey[600],
  borderHover: colors.grey[500],

  // Состояния
  success: colors.green[400],
  successHover: colors.green[300],
  warning: colors.orange[400],
  danger: colors.red[400],
  dangerHover: colors.red[300],
  info: accentUiBase,
  infoHover: accentUiHover,
  /** Тег Tag `primary`: чуть глубже `info` в тёмной теме */
  tagPrimaryAccent: colors.primary[600],
  tagAccentPurple: colors.purple[400],
  tagAccentTeal: colors.teal[400],
  tagAccentCyan: colors.cyan[400],
  tagAccentPink: colors.pink[400],

  // Специальные цвета
  overlay: 'rgba(0, 0, 0, 0.55)',
  shadow: 'rgba(0, 0, 0, 0.25)',
  transparent: 'transparent',
};

// Экспорт для обратной совместимости
export const darkTheme = darkColors;
