/**
 * Переменные размытия для создания эффектов глубины
 * Используются для backdrop-filter и filter CSS свойств
 *
 * Применение:
 * - backdrop-filter: blur(theme.blur.md) - размытие фона за элементом
 * - filter: blur(theme.blur.sm) - размытие самого элемента
 * - Модальные окна, оверлеи, карточки с эффектом стекла
 */

/**
 * Основные значения размытия (только размеры в пикселях)
 * Создают различные уровни размытия для UI элементов
 */
export const blur = {
  // Без размытия - для элементов, которые должны быть четкими
  none: '0px',

  // Маленькое размытие - для тонких эффектов
  // Используется для: легких оверлеев, тонких границ
  sm: '4px',

  // Среднее размытие - для стандартных эффектов
  // Используется для: модальных окон, выпадающих меню, карточек
  md: '8px',

  // Большое размытие - для выраженных эффектов
  // Используется для: важных модальных окон, оверлеев
  lg: '12px',

  // Очень большое размытие - для сильных эффектов
  // Используется для: полноэкранных модальных окон, важных уведомлений
  xl: '16px',

  // Экстра большое размытие - для максимальных эффектов
  // Используется для: критических модальных окон, системных уведомлений
  '2xl': '24px',

  // Максимальное размытие - для экстремальных эффектов
  // Используется для: экранных блокировок, критических диалогов
  '3xl': '40px',
};

/**
 * Дополнительные значения размытия для специальных случаев
 */
export const additionalBlur = {
  // Размытие для кнопок при наведении
  buttonHover: '2px',

  // Размытие для карточек при наведении
  cardHover: '6px',

  // Размытие для полей ввода при фокусе
  inputFocus: '1px',

  // Размытие для уведомлений
  notification: '10px',

  // Размытие для тултипов
  tooltip: '8px',

  // Размытие для дропдаунов
  dropdown: '12px',

  // Размытие для навигационных элементов
  navigation: '6px',

  // Размытие для сайдбаров
  sidebar: '8px',

  // Размытие для хедеров
  header: '4px',
};

/**
 * CSS-функции для удобного использования размытия
 */
export const blurUtils = {
  // Создает CSS значение для backdrop-filter
  backdrop: (blurValue: string) => `blur(${blurValue})`,

  // Создает CSS значение для filter
  filter: (blurValue: string) => `blur(${blurValue})`,

  // Создает полное CSS значение для backdrop-filter с размытием
  backdropBlur: (blurValue: string) => `backdrop-filter: blur(${blurValue});`,

  // Создает полное CSS значение для filter с размытием
  filterBlur: (blurValue: string) => `filter: blur(${blurValue});`,

  // Создает CSS значение с дополнительными эффектами
  backdropWithSaturate: (blurValue: string, saturate: number = 1.8) =>
    `blur(${blurValue}) saturate(${saturate})`,

  // Создает CSS значение с яркостью
  backdropWithBrightness: (blurValue: string, brightness: number = 1.1) =>
    `blur(${blurValue}) brightness(${brightness})`,
};

/**
 * Готовые CSS классы для размытия (для использования в styled-components)
 * Это основной экспорт, который используется в темах
 */
export const blurClasses = {
  // Основные классы размытия
  none: `backdrop-filter: blur(${blur.none});`,
  sm: `backdrop-filter: blur(${blur.sm});`,
  md: `backdrop-filter: blur(${blur.md});`,
  lg: `backdrop-filter: blur(${blur.lg});`,
  xl: `backdrop-filter: blur(${blur.xl});`,
  '2xl': `backdrop-filter: blur(${blur['2xl']});`,
  '3xl': `backdrop-filter: blur(${blur['3xl']});`,

  // Классы с дополнительными эффектами
  glass: `backdrop-filter: blur(${blur.md}) saturate(1.8) brightness(1.1);`,
  glassLight: `backdrop-filter: blur(${blur.sm}) saturate(1.5) brightness(1.05);`,
  glassStrong: `backdrop-filter: blur(${blur.lg}) saturate(2) brightness(1.2);`,

  // Классы для фильтрации самого элемента
  filterSm: `filter: blur(${blur.sm});`,
  filterMd: `filter: blur(${blur.md});`,
  filterLg: `filter: blur(${blur.lg});`,
};

/**
 * Экспорт для обратной совместимости
 * @deprecated Используйте blurClasses вместо blur
 */
export { blur as blurValues };
