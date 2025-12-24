/**
 * Типы шрифтов для темы
 * Определяет семейства шрифтов, размеры и веса для различных элементов интерфейса
 */

/**
 * Семейство шрифтов
 * Определяет основные шрифты, используемые в приложении
 */
export type FontFamily = {
  primary: string; // Основной шрифт (Montserrat)
  secondary?: string; // Дополнительный шрифт (если нужен)
  monospace?: string; // Моноширинный шрифт для кода
};

/**
 * Веса шрифтов
 * Определяет доступные веса для шрифтов
 */
export type FontWeight = {
  thin: number; // 100 - Очень тонкий
  extraLight: number; // 200 - Экстра светлый
  light: number; // 300 - Светлый
  regular: number; // 400 - Обычный
  medium: number; // 500 - Средний
  semiBold: number; // 600 - Полужирный
  bold: number; // 700 - Жирный
  extraBold: number; // 800 - Экстра жирный
  black: number; // 900 - Черный
};

/**
 * Размеры шрифтов
 * Определяет размеры шрифтов для различных элементов
 */
export type FontSize = {
  xs: string; // 12px - Очень маленький текст
  sm: string; // 14px - Маленький текст
  base: string; // 16px - Базовый размер
  lg: string; // 18px - Большой текст
  xl: string; // 20px - Очень большой текст
  '2xl': string; // 24px - Заголовок 2 уровня
  '3xl': string; // 30px - Заголовок 1 уровня
  '4xl': string; // 36px - Большой заголовок
  '5xl': string; // 48px - Очень большой заголовок
};

/**
 * Высота строки
 * Определяет межстрочные интервалы
 */
export type LineHeight = {
  tight: string; // 1.2 - Плотный интервал
  normal: string; // 1.4 - Обычный интервал
  relaxed: string; // 1.6 - Расслабленный интервал
  loose: string; // 1.8 - Свободный интервал
};

/**
 * Типографические стили
 * Определяет готовые стили для различных элементов
 */
export type Typography = {
  // Заголовки
  h1: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
  };
  h2: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
  };
  h3: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
  };
  h4: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
  };
  h5: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
  };
  h6: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
  };

  // Текст
  body: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
  };
  bodySmall: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
  };
  bodyLarge: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
  };

  // Специальные элементы
  caption: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
  };
  button: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
  };
  input: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
  };
  label: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
  };
};
