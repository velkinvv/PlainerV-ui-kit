// Цветовая палитра для светлой темы (обновлена в соответствии с макетом Figma)

import type { BoxShadowType, BlurType, Colors } from '../../types/theme';
import { colors } from '../../variables/colors';
import { lightShadows } from '../../variables/shadows';
import { blurClasses } from '../../variables/blur';

// Тени (импортированы из variables/shadows.ts)
export const lightBoxShadow: BoxShadowType = lightShadows;

// Размытие (импортировано из variables/blur.ts)
export const lightBlur: BlurType = blurClasses;

/** Акцент UI из палитры `colors.primary` — общий базис для **info** и **theme.colors.primary**. */
const accentUiBase = colors.primary[500];
const accentUiHover = colors.primary[600];
const accentUiActive = colors.primary[700];

// Цвета для светлой темы
export const lightColors: Colors = {
  // Основные фоновые цвета
  background: colors.grey[50], // Основной фон страницы
  backgroundSecondary: colors.neutral[10], // Белый фон для карточек
  backgroundTertiary: colors.grey[100], // Фон для элементов интерфейса
  backgroundQuaternary: colors.grey[200], // Фон для неактивных элементов
  backgroundQuinary: colors.grey[50], // Дополнительный фоновый цвет

  // Специальные фоновые цвета
  card: colors.neutral[10], // Фон карточек
  input: colors.neutral[10], // Фон полей ввода
  avatarBackground: colors.grey[100], // Фон для аватаров
  progressBackground: colors.grey[200], // Фон для прогресс-баров
  progressTrack: colors.grey[200], // Цвет трека прогресса
  progressFill: colors.success[500], // Заполнение прогресс-баров
  progressValue: colors.grey[600], // Цвет значения прогресса (текст)
  progressStatusAwait: colors.grey[400], // Цвет прогресса в статусе ожидания
  progressStatusLoading: colors.success[400], // Цвет прогресса в статусе загрузки
  progressStatusSuccess: colors.success[500], // Цвет прогресса в статусе успеха
  progressStatusError: colors.red[600], // Цвет прогресса в статусе ошибки
  imageBackground: colors.neutral[100], // Фон для изображений

  // Текстовые цвета
  text: colors.grey[900], // Основной текст
  textSecondary: colors.grey[600], // Вторичный текст
  textTertiary: colors.grey[400], // Третичный текст
  textDisabled: colors.grey[400], // Текст отключённых элементов

  // Основные цвета (совпадают с info — яркий синий из палитры primary, не colors.blue)
  primary: accentUiBase,
  primaryHover: accentUiHover,
  primaryActive: accentUiActive,
  secondary: colors.grey[600], // Вторичный цвет
  secondaryHover: colors.grey[700], // Вторичный цвет при наведении

  // Граничные цвета
  border: colors.grey[200], // Основная граница
  borderSecondary: colors.grey[300], // Вторичная граница
  borderTertiary: colors.grey[400], // Третичная граница
  borderHover: colors.grey[400], // Граница при наведении

  // Состояния
  success: colors.green[600], // Успех
  successHover: colors.green[700], // Успех при наведении
  warning: colors.orange[500], // Предупреждение
  danger: colors.red[600], // Опасность
  dangerHover: colors.red[700], // Опасность при наведении
  /* Яркий синий UI (календарь, инфо); синхронно с primary выше */
  info: accentUiBase,
  infoHover: accentUiHover,
  /** Тег Tag `primary`: насыщенный синий (отличается от `info`) */
  tagPrimaryAccent: colors.primary[600],
  tagAccentPurple: colors.purple[600],
  tagAccentTeal: colors.teal[600],
  tagAccentCyan: colors.cyan[600],
  tagAccentPink: colors.pink[600],

  // Специальные цвета
  overlay: 'rgba(0, 0, 0, 0.5)', // Наложение
  shadow: 'rgba(0, 0, 0, 0.1)', // Тень
  transparent: 'transparent', // Прозрачный
};

// Экспорт для обратной совместимости
export const lightTheme = lightColors;
