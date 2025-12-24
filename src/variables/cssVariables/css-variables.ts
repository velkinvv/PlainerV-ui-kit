// CSS переменные для светлой темы (в соответствии с макетом Figma)
export const lightThemeCSSVariables = {
  // Основные цвета
  '--color-primary': '#68d5f8',
  '--color-primary-hover': '#84e1ff',
  '--color-primary-active': '#68d5f8',

  // Фоновые цвета
  '--color-background': '#EDF1F2',
  '--color-background-secondary': '#ffffff',
  '--color-background-tertiary': '#f9f9f9',
  '--color-background-quaternary': '#f2f2f2',
  '--color-background-quinary': '#f8fafc',

  // Текстовые цвета
  '--color-text': '#262626',
  '--color-text-secondary': 'rgba(38, 38, 38, 0.8)',
  '--color-text-tertiary': 'rgba(38, 38, 38, 0.6)',
  '--color-text-quaternary': '#94a3b8',
  '--color-text-disabled': 'rgba(38, 38, 38, 0.4)',

  // Граничные цвета
  '--color-border': '#f2f2f2',
  '--color-border-secondary': '#e2e2e2',
  '--color-border-tertiary': '#cbd5e1',
  '--color-border-hover': 'rgba(38, 38, 38, 0.1)',
  '--color-border-focus': 'rgba(38, 38, 38, 0.2)',

  // Состояния
  '--color-success': '#94d263',
  '--color-success-hover': '#7bbf4a',
  '--color-danger': '#ff3c3c',
  '--color-danger-hover': '#e63939',
  '--color-warning': '#f59e0b',
  '--color-info': '#3b82f6',

  // Специальные цвета
  '--color-overlay': 'rgba(0, 0, 0, 0.5)',
  '--color-shadow': 'rgba(0, 0, 0, 0.1)',
  '--color-shadow-secondary': 'rgba(0, 0, 0, 0.05)',
  '--color-shadow-tertiary': 'rgba(0, 0, 0, 0.15)',

  // Уведомления
  '--color-notification': '#ff3c3c',

  // Прозрачные цвета
  '--color-transparent': 'transparent',
  '--color-semi-transparent': 'rgba(38, 38, 38, 0.8)',
  '--color-semi-transparent-hover': 'rgba(38, 38, 38, 0.9)',
  '--color-semi-transparent-active': 'rgba(104, 213, 248, 0.8)',

  // Градиенты
  '--gradient-primary': 'linear-gradient(90deg, #ffffff 0%, #fcfcfc 52.6%, #ffffff 100%)',

  // Тени
  '--shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
  '--shadow-md': '0 4px 6px rgba(0, 0, 0, 0.1)',
  '--shadow-lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
  '--shadow-xl': '0 20px 25px rgba(0, 0, 0, 0.15)',
  '--shadow-primary': '0px 0px 7px 0px rgba(96, 217, 255, 0.39)',
  '--shadow-success': '0px 4px 11px 0px rgba(148, 210, 99, 0.2)',

  // Эффекты
  '--backdrop-filter': 'blur(4px)',
  '--backdrop-filter-secondary': 'blur(10px)',

  // Дополнительные цвета
  '--color-image-background': '#c4c4c4',
  '--color-avatar-background': '#f9f9f9',
  '--color-progress-background': '#f2f2f2',
  '--color-progress-fill': '#94d263',
};

// CSS переменные для тёмной темы (в соответствии с макетом Figma)
export const darkThemeCSSVariables = {
  // Основные цвета
  '--color-primary': '#68d5f8',
  '--color-primary-hover': '#84e1ff',
  '--color-primary-active': '#68d5f8',

  // Фоновые цвета
  '--color-background': '#06090E',
  '--color-background-secondary': '#101C26',
  '--color-background-tertiary': '#162431',
  '--color-background-quaternary': '#1C3140',
  '--color-background-quinary': '#2D3748',

  // Текстовые цвета
  '--color-text': '#FFFFFF',
  '--color-text-secondary': 'rgba(255, 255, 255, 0.8)',
  '--color-text-tertiary': 'rgba(255, 255, 255, 0.6)',
  '--color-text-quaternary': '#a0aec0',
  '--color-text-disabled': 'rgba(255, 255, 255, 0.4)',

  // Граничные цвета
  '--color-border': '#1C3140',
  '--color-border-secondary': '#2D3748',
  '--color-border-tertiary': '#4a5568',
  '--color-border-hover': 'rgba(255, 255, 255, 0.1)',
  '--color-border-focus': 'rgba(255, 255, 255, 0.2)',

  // Состояния
  '--color-success': '#94d263',
  '--color-success-hover': '#7bbf4a',
  '--color-danger': '#ff3c3c',
  '--color-danger-hover': '#e63939',
  '--color-warning': '#f59e0b',
  '--color-info': '#3b82f6',

  // Специальные цвета
  '--color-overlay': 'rgba(0, 0, 0, 0.7)',
  '--color-shadow': 'rgba(0, 0, 0, 0.3)',
  '--color-shadow-secondary': 'rgba(0, 0, 0, 0.2)',
  '--color-shadow-tertiary': 'rgba(0, 0, 0, 0.4)',

  // Уведомления
  '--color-notification': '#ff3c3c',

  // Прозрачные цвета
  '--color-transparent': 'transparent',
  '--color-semi-transparent': 'rgba(255, 255, 255, 0.8)',
  '--color-semi-transparent-hover': 'rgba(255, 255, 255, 0.9)',
  '--color-semi-transparent-active': 'rgba(104, 213, 248, 0.8)',

  // Градиенты
  '--gradient-primary': 'linear-gradient(90deg, #060D15 0%, #0E1A28 52.6%, #060D15 100%)',

  // Тени
  '--shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.3)',
  '--shadow-md': '0 4px 6px rgba(0, 0, 0, 0.4)',
  '--shadow-lg': '0 10px 15px rgba(0, 0, 0, 0.4)',
  '--shadow-xl': '0 20px 25px rgba(0, 0, 0, 0.5)',
  '--shadow-primary': '0px 0px 7px 0px rgba(96, 217, 255, 0.39)',
  '--shadow-success': '0px 4px 11px 0px rgba(148, 210, 99, 0.2)',

  // Эффекты
  '--backdrop-filter': 'blur(4px)',
  '--backdrop-filter-secondary': 'blur(10px)',

  // Дополнительные цвета
  '--color-image-background': '#c4c4c4',
  '--color-avatar-background': '#162431',
  '--color-progress-background': '#1C3140',
  '--color-progress-fill': '#94d263',
  '--color-online-indicator': '#94d263',
};

// Функция для применения CSS переменных к элементу
export const applyLightThemeCSSVariables = (element: HTMLElement) => {
  Object.entries(lightThemeCSSVariables).forEach(([property, value]) => {
    element.style.setProperty(property, value);
  });
};

// Функция для применения CSS переменных тёмной темы к элементу
export const applyDarkThemeCSSVariables = (element: HTMLElement) => {
  Object.entries(darkThemeCSSVariables).forEach(([property, value]) => {
    element.style.setProperty(property, value);
  });
};

// Функция для применения CSS переменных к документу
export const applyLightThemeToDocument = () => {
  const root = document.documentElement;
  applyLightThemeCSSVariables(root);
};

// Функция для применения тёмной темы к документу
export const applyDarkThemeToDocument = () => {
  const root = document.documentElement;
  applyDarkThemeCSSVariables(root);
};

// Функция для получения CSS переменной
export const getCSSVariable = (variableName: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName);
};
