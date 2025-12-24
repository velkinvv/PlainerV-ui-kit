import type { BoxShadowType } from '../types/theme';

/**
 * Переменные теней для светлой темы
 * Все значения теней определены как переменные для переиспользования
 */
const lightShadowValues = {
  // Базовые уровни теней
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

  // Акцентные тени
  primary: '0 0 0 3px rgba(33, 150, 243, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  success: '0 0 0 3px rgba(76, 175, 80, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  warning: '0 0 0 3px rgba(255, 193, 7, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  danger: '0 0 0 3px rgba(244, 67, 54, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',

  // Специальные тени
  inputFocus: '0 0 0 3px rgba(33, 150, 243, 0.1)',
  notification: '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
  tooltip: '0 2px 8px 0 rgba(0, 0, 0, 0.15)',
  dropdown: '0px 8px 16px 0px rgba(0, 0, 0, 0.08)', // Shadow/8px из макета Figma
  modal: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  cardHover: '0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',

  // Тени для статусов аватаров
  avatarOnline: '0px 2px 10px 0px rgba(147, 232, 80, 0.24)',
  avatarOffline: '0px 2px 10px 0px rgba(156, 163, 175, 0.24)',
  avatarDanger: '0px 2px 10px 0px rgba(239, 68, 68, 0.24)',
  avatarWarning: '0px 2px 10px 0px rgba(245, 158, 11, 0.24)',
  card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  default: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  active: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  buttonDefault: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  buttonActive: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
};

/**
 * Основные тени для светлой темы
 * Используются в темах - передают все тени из additionalShadows
 */
export const lightShadows: BoxShadowType = {
  // Базовые уровни теней
  sm: lightShadowValues.sm,
  md: lightShadowValues.md,
  lg: lightShadowValues.lg,
  xl: lightShadowValues.xl,

  // Акцентные тени
  primary: lightShadowValues.primary,
  success: lightShadowValues.success,
  warning: lightShadowValues.warning,
  danger: lightShadowValues.danger,

  // Специальные тени
  inputFocus: lightShadowValues.inputFocus,
  notification: lightShadowValues.notification,
  tooltip: lightShadowValues.tooltip,
  dropdown: lightShadowValues.dropdown,
  modal: lightShadowValues.modal,
  cardHover: lightShadowValues.cardHover,

  // Тени для статусов аватаров
  avatarOnline: lightShadowValues.avatarOnline,
  avatarOffline: lightShadowValues.avatarOffline,
  avatarDanger: lightShadowValues.avatarDanger,
  avatarWarning: lightShadowValues.avatarWarning,
};

/**
 * Переменные теней для темной темы
 * Адаптированы для темного фона с более интенсивными тенями
 */
const darkShadowValues = {
  // Базовые уровни теней (более интенсивные для темной темы)
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',

  // Акцентные тени (с цветным свечением для темной темы)
  primary: '0 0 0 3px rgba(96, 217, 255, 0.2), 0 4px 6px -1px rgba(0, 0, 0, 0.4)',
  success: '0 0 0 3px rgba(148, 210, 99, 0.2), 0 4px 6px -1px rgba(0, 0, 0, 0.4)',
  warning: '0 0 0 3px rgba(255, 193, 7, 0.2), 0 4px 6px -1px rgba(0, 0, 0, 0.4)',
  danger: '0 0 0 3px rgba(244, 67, 54, 0.2), 0 4px 6px -1px rgba(0, 0, 0, 0.4)',

  // Специальные тени (адаптированы для темной темы)
  inputFocus: '0 0 0 3px rgba(96, 217, 255, 0.2)',
  notification: '0 4px 12px 0 rgba(0, 0, 0, 0.5)',
  tooltip: '0 2px 8px 0 rgba(0, 0, 0, 0.4)',
  dropdown: '0px 8px 16px 0px rgba(0, 0, 0, 0.3)', // Усиленная тень для темной темы
  modal: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
  cardHover: '0 8px 25px -5px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',

  // Тени для статусов аватаров (аналогично светлой теме)
  avatarOnline: '0px 2px 10px 0px rgba(147, 232, 80, 0.24)',
  avatarOffline: '0px 2px 10px 0px rgba(156, 163, 175, 0.24)',
  avatarDanger: '0px 2px 10px 0px rgba(239, 68, 68, 0.24)',
  avatarWarning: '0px 2px 10px 0px rgba(245, 158, 11, 0.24)',
  card: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  default: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  active: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
  buttonDefault: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
  buttonActive: '0 2px 4px 0 rgba(0, 0, 0, 0.4)',
};

/**
 * Основные тени для темной темы
 * Адаптированы для темного фона с более интенсивными тенями
 */
export const darkShadows: BoxShadowType = {
  // Базовые уровни теней
  sm: darkShadowValues.sm,
  md: darkShadowValues.md,
  lg: darkShadowValues.lg,
  xl: darkShadowValues.xl,

  // Акцентные тени
  primary: darkShadowValues.primary,
  success: darkShadowValues.success,
  warning: darkShadowValues.warning,
  danger: darkShadowValues.danger,

  // Специальные тени
  inputFocus: darkShadowValues.inputFocus,
  notification: darkShadowValues.notification,
  tooltip: darkShadowValues.tooltip,
  dropdown: darkShadowValues.dropdown,
  modal: darkShadowValues.modal,
  cardHover: darkShadowValues.cardHover,

  // Тени для статусов аватаров
  avatarOnline: darkShadowValues.avatarOnline,
  avatarOffline: darkShadowValues.avatarOffline,
  avatarDanger: darkShadowValues.avatarDanger,
  avatarWarning: darkShadowValues.avatarWarning,
};

/**
 * Дополнительные тени для светлой темы
 * Используются напрямую в компонентах (дублируют lightShadows для удобства)
 */
export const additionalShadows = {
  // Различные уровни теней (из переменных светлой темы)
  sm: lightShadowValues.sm, // Маленькая тень
  md: lightShadowValues.md, // Средняя тень
  lg: lightShadowValues.lg, // Большая тень
  xl: lightShadowValues.xl, // Очень большая тень

  // Тени для акцентных элементов (из переменных светлой темы)
  primary: lightShadowValues.primary, // Primary акцент
  success: lightShadowValues.success, // Success акцент
  warning: lightShadowValues.warning, // Warning акцент
  danger: lightShadowValues.danger, // Danger акцент

  // Специальные тени для компонентов (из переменных светлой темы)
  inputFocus: lightShadowValues.inputFocus, // Фокус на полях ввода
  notification: lightShadowValues.notification, // Уведомления
  tooltip: lightShadowValues.tooltip, // Тултипы
  dropdown: lightShadowValues.dropdown, // Дропдауны
  modal: lightShadowValues.modal, // Модальные окна
  cardHover: lightShadowValues.cardHover, // Карточки при наведении
};

/**
 * Дополнительные тени для темной темы
 * Используются напрямую в компонентах (дублируют darkShadows для удобства)
 */
export const additionalDarkShadows = {
  // Различные уровни теней (из переменных темной темы)
  sm: darkShadowValues.sm, // Маленькая тень
  md: darkShadowValues.md, // Средняя тень
  lg: darkShadowValues.lg, // Большая тень
  xl: darkShadowValues.xl, // Очень большая тень

  // Тени для акцентных элементов (из переменных темной темы)
  primary: darkShadowValues.primary, // Primary акцент
  success: darkShadowValues.success, // Success акцент
  warning: darkShadowValues.warning, // Warning акцент
  danger: darkShadowValues.danger, // Danger акцент

  // Специальные тени для компонентов (из переменных темной темы)
  inputFocus: darkShadowValues.inputFocus, // Фокус на полях ввода
  notification: darkShadowValues.notification, // Уведомления
  tooltip: darkShadowValues.tooltip, // Тултипы
  dropdown: darkShadowValues.dropdown, // Дропдауны
  modal: darkShadowValues.modal, // Модальные окна
  cardHover: darkShadowValues.cardHover, // Карточки при наведении
};
