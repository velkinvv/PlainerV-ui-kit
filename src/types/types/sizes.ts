/**
 * Стандартные размеры для UI компонентов
 * Используется для кнопок, полей ввода, бейджей, аватаров и других элементов
 */
export enum Size {
  XS = 'XS', // Extra Small - очень маленький размер
  SM = 'SM', // Small - маленький размер
  MD = 'MD', // Medium - средний размер (по умолчанию)
  LG = 'LG', // Large - большой размер
  XL = 'XL', // Extra Large - очень большой размер
}

/**
 * Размеры модальных окон
 * Определяет ширину и высоту модального окна
 */
export enum ModalSize {
  XS = 'XS', // Extra Small - маленькое модальное окно
  SM = 'SM', // Small - небольшое модальное окно
  MD = 'MD', // Medium - среднее модальное окно
  LG = 'LG', // Large - большое модальное окно
  FULL = 'FULL', // Full - полноэкранное модальное окно
}

/**
 * Размеры иконок
 * Специальные размеры для иконок с точными значениями в пикселях
 */
export enum IconSize {
  XS = 'XS', // Extra Small - 16px (для мелких элементов)
  SM = 'SM', // Small - 20px (для кнопок и ссылок)
  MD = 'MD', // Medium - 24px (для заголовков и навигации)
  LG = 'LG', // Large - 32px (для больших элементов)
  XL = 'XL', // Extra Large - 40px (для очень больших элементов)
}

/**
 * Размеры иконок в пикселях (стандартные)
 * Соответствует размерам IconSize
 */
export const IconSizes: Record<IconSize, number> = {
  [IconSize.XS]: 16, // 16px - для мелких элементов интерфейса
  [IconSize.SM]: 20, // 20px - для кнопок и ссылок
  [IconSize.MD]: 24, // 24px - для заголовков и навигации
  [IconSize.LG]: 32, // 32px - для больших элементов
  [IconSize.XL]: 40, // 40px - для очень больших элементов
};

/**
 * Размеры иконок для iOS
 * Адаптированы под гайдлайны Apple Human Interface Guidelines
 */
export const IconSizesIos: Record<IconSize, number> = {
  [IconSize.XS]: 18, // 18px - минимальный размер для iOS
  [IconSize.SM]: 20, // 20px - стандартный размер для iOS
  [IconSize.MD]: 24, // 24px - размер для навигации iOS
  [IconSize.LG]: 28, // 28px - большой размер для iOS
  [IconSize.XL]: 32, // 32px - максимальный размер для iOS
};

/**
 * Размеры иконок для Android
 * Адаптированы под Material Design Guidelines
 */
export const IconSizesAndroid: Record<IconSize, number> = {
  [IconSize.XS]: 22, // 22px - минимальный размер для Android
  [IconSize.SM]: 24, // 24px - стандартный размер для Android
  [IconSize.MD]: 28, // 28px - размер для навигации Android
  [IconSize.LG]: 30, // 30px - большой размер для Android
  [IconSize.XL]: 36, // 36px - максимальный размер для Android
};
