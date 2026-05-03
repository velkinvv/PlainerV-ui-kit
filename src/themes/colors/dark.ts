// Цветовая палитра для тёмной темы (обновлена в соответствии с макетом Figma)

import type { BoxShadowType, BlurType, Colors } from '../../types/theme';
import { colors } from '../../variables/colors';
import { darkShadows } from '../../variables/shadows';
import { blurClasses } from '../../variables/blur';

// Тени (импортированы из variables/shadows.ts)
export const darkBoxShadow: BoxShadowType = darkShadows;

// Размытие (импортировано из variables/blur.ts)
export const darkBlur: BlurType = blurClasses;

// Цвета для тёмной темы
export const darkColors: Colors = {
  // Основные фоновые цвета
  background: colors.dark[700], // Основной фон страницы (из макета)
  backgroundSecondary: colors.blue['A700'], // Фон для карточек (из макета)
  backgroundTertiary: colors.blue[700], // Фон для элементов интерфейса (из макета)
  backgroundQuaternary: colors.blue[600], // Фон для неактивных элементов
  backgroundQuinary: colors.blue[800], // Дополнительный фоновый цвет

  // Специальные фоновые цвета
  card: colors.blue['A700'], // Фон карточек
  input: colors.blue[700], // Фон полей ввода
  avatarBackground: colors.dark[800], // Фон для аватаров
  progressBackground: colors.dark[800], // Фон для прогресс-баров
  progressTrack: colors.grey[600], // Цвет трека прогресса
  progressFill: colors.success[500], // Заполнение прогресс-баров
  progressValue: 'rgba(255, 255, 255, 0.8)', // Цвет значения прогресса (текст)
  progressStatusAwait: colors.grey[500], // Цвет прогресса в статусе ожидания
  progressStatusLoading: colors.success[400], // Цвет прогресса в статусе загрузки
  progressStatusSuccess: colors.success[500], // Цвет прогресса в статусе успеха
  progressStatusError: colors.red[400], // Цвет прогресса в статусе ошибки
  imageBackground: colors.dark[900], // Фон для изображений

  // Текстовые цвета
  text: colors.neutral[10], // Основной текст (белый)
  textSecondary: colors.grey[300], // Вторичный текст
  textTertiary: colors.grey[500], // Третичный текст
  textDisabled: colors.grey[600], // Текст отключённых элементов

  // Основные цвета
  primary: colors.blue[400], // Основной цвет
  primaryHover: colors.blue[300], // Основной цвет при наведении
  primaryActive: colors.blue[200], // Основной цвет при нажатии
  secondary: colors.grey[400], // Вторичный цвет
  secondaryHover: colors.grey[300], // Вторичный цвет при наведении

  // Граничные цвета
  border: colors.blue[600], // Основная граница
  borderSecondary: colors.blue[500], // Вторичная граница
  borderTertiary: colors.blue[400], // Третичная граница
  borderHover: colors.blue[400], // Граница при наведении

  // Состояния
  success: colors.green[400], // Успех
  successHover: colors.green[300], // Успех при наведении
  warning: colors.orange[400], // Предупреждение
  danger: colors.red[400], // Опасность
  dangerHover: colors.red[300], // Опасность при наведении
  info: colors.primary[400],
  infoHover: colors.primary[300],
  /** Тег Tag `primary`: чуть глубже `info` в тёмной теме */
  tagPrimaryAccent: colors.primary[600],
  tagAccentPurple: colors.purple[400],
  tagAccentTeal: colors.teal[400],
  tagAccentCyan: colors.cyan[400],
  tagAccentPink: colors.pink[400],

  // Специальные цвета
  overlay: 'rgba(0, 0, 0, 0.7)', // Наложение
  shadow: 'rgba(0, 0, 0, 0.3)', // Тень
  transparent: 'transparent', // Прозрачный
};

// Экспорт для обратной совместимости
export const darkTheme = darkColors;
