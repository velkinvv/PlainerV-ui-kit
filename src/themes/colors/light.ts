// Цветовая палитра для светлой темы (обновлена в соответствии с макетом Figma)

import type { BoxShadowType, BlurType, Colors } from '../../types/theme';
import { colors } from '../../variables/colors';
import { lightShadows } from '../../variables/shadows';
import { blurClasses } from '../../variables/blur';

// Тени (импортированы из variables/shadows.ts)
export const lightBoxShadow: BoxShadowType = lightShadows;

// Размытие (импортировано из variables/blur.ts)
export const lightBlur: BlurType = blurClasses;

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

  // Основные цвета
  primary: colors.blue[600], // Основной цвет
  primaryHover: colors.blue[700], // Основной цвет при наведении
  primaryActive: colors.blue[800], // Основной цвет при нажатии
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
  info: colors.blue[500], // Информация

  // Специальные цвета
  overlay: 'rgba(0, 0, 0, 0.5)', // Наложение
  shadow: 'rgba(0, 0, 0, 0.1)', // Тень
  transparent: 'transparent', // Прозрачный
};

// Экспорт для обратной совместимости
export const lightTheme = lightColors;
