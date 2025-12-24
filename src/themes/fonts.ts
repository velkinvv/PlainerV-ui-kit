import type { FontFamily, FontWeight, FontSize, LineHeight, Typography } from '../types/fonts';

/**
 * Семейства шрифтов
 * Определяет основные шрифты, используемые в приложении
 */
export const fontFamily: FontFamily = {
  primary:
    'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  secondary:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  monospace:
    '"SF Mono", Monaco, Inconsolata, "Roboto Mono", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace',
};

/**
 * Веса шрифтов
 * Определяет доступные веса для шрифтов Montserrat
 */
export const fontWeights: FontWeight = {
  thin: 100, // Montserrat-Thin
  extraLight: 200, // Montserrat-ExtraLight
  light: 300, // Montserrat-Light
  regular: 400, // Montserrat-Regular
  medium: 500, // Montserrat-Medium
  semiBold: 600, // Montserrat-SemiBold
  bold: 700, // Montserrat-Bold
  extraBold: 800, // Montserrat-ExtraBold
  black: 900, // Montserrat-Black
};

/**
 * Размеры шрифтов
 * Определяет размеры шрифтов для различных элементов в соответствии с макетом
 */
export const fontSizes: FontSize = {
  xs: '12px', // Очень маленький текст (даты, подписи)
  sm: '14px', // Маленький текст (основной контент)
  base: '16px', // Базовый размер (основной текст)
  lg: '18px', // Большой текст
  xl: '20px', // Очень большой текст (заголовки)
  '2xl': '24px', // Заголовок 2 уровня
  '3xl': '30px', // Заголовок 1 уровня
  '4xl': '36px', // Большой заголовок
  '5xl': '48px', // Очень большой заголовок
};

/**
 * Высота строки
 * Определяет межстрочные интервалы в соответствии с макетом
 */
export const lineHeights: LineHeight = {
  tight: '1.2', // Плотный интервал для заголовков
  normal: '1.4', // Обычный интервал для основного текста
  relaxed: '1.6', // Расслабленный интервал для длинного текста
  loose: '1.8', // Свободный интервал для описаний
};

/**
 * Типографические стили
 * Определяет готовые стили для различных элементов в соответствии с макетом Figma
 */
export const typography: Typography = {
  // Заголовки
  h1: {
    fontFamily: fontFamily.primary,
    fontSize: fontSizes['3xl'], // 30px
    fontWeight: fontWeights.bold, // 700
    lineHeight: lineHeights.tight, // 1.2
  },
  h2: {
    fontFamily: fontFamily.primary,
    fontSize: fontSizes['2xl'], // 24px
    fontWeight: fontWeights.semiBold, // 600
    lineHeight: lineHeights.tight, // 1.2
  },
  h3: {
    fontFamily: fontFamily.primary,
    fontSize: fontSizes.xl, // 20px
    fontWeight: fontWeights.semiBold, // 600
    lineHeight: lineHeights.tight, // 1.2
  },
  h4: {
    fontFamily: fontFamily.primary,
    fontSize: fontSizes.lg, // 18px
    fontWeight: fontWeights.medium, // 500
    lineHeight: lineHeights.normal, // 1.4
  },
  h5: {
    fontFamily: fontFamily.primary,
    fontSize: fontSizes.base, // 16px
    fontWeight: fontWeights.medium, // 500
    lineHeight: lineHeights.normal, // 1.4
  },
  h6: {
    fontFamily: fontFamily.primary,
    fontSize: fontSizes.sm, // 14px
    fontWeight: fontWeights.medium, // 500
    lineHeight: lineHeights.normal, // 1.4
  },

  // Текст
  body: {
    fontFamily: fontFamily.primary,
    fontSize: fontSizes.sm, // 14px
    fontWeight: fontWeights.regular, // 400
    lineHeight: lineHeights.relaxed, // 1.6
  },
  bodySmall: {
    fontFamily: fontFamily.primary,
    fontSize: fontSizes.xs, // 12px
    fontWeight: fontWeights.regular, // 400
    lineHeight: lineHeights.normal, // 1.4
  },
  bodyLarge: {
    fontFamily: fontFamily.primary,
    fontSize: fontSizes.base, // 16px
    fontWeight: fontWeights.regular, // 400
    lineHeight: lineHeights.relaxed, // 1.6
  },

  // Специальные элементы
  caption: {
    fontFamily: fontFamily.primary,
    fontSize: fontSizes.xs, // 12px
    fontWeight: fontWeights.regular, // 400
    lineHeight: lineHeights.normal, // 1.4
  },
  button: {
    fontFamily: fontFamily.primary,
    fontSize: fontSizes.sm, // 14px
    fontWeight: fontWeights.medium, // 500
    lineHeight: lineHeights.normal, // 1.4
  },
  input: {
    fontFamily: fontFamily.primary,
    fontSize: fontSizes.sm, // 14px
    fontWeight: fontWeights.regular, // 400
    lineHeight: lineHeights.normal, // 1.4
  },
  label: {
    fontFamily: fontFamily.primary,
    fontSize: fontSizes.sm, // 14px
    fontWeight: fontWeights.medium, // 500
    lineHeight: lineHeights.normal, // 1.4
  },
};
