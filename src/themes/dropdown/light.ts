import { Size } from '../../types/sizes';
import type { DropdownTheme } from '../../types/theme';
import { neutral } from '../../variables/colors/neutral';
import { primary } from '../../variables/colors/primary';
import { fontFamily } from '../fonts';

/**
 * Светлая тема для dropdown
 * Определяет все настройки стилизации dropdown в светлой теме
 */
export const lightDropdownTheme: DropdownTheme = {
  // Размеры dropdown
  sizes: {
    [Size.XS]: {
      minWidth: '120px',
      maxWidth: '200px',
      padding: '6px 16px', // Как в макете
      fontSize: '12px',
      borderRadius: '8px', // Как в макете
      gap: '8px', // Как в макете
    },
    [Size.SM]: {
      minWidth: '150px',
      maxWidth: '250px',
      padding: '6px 16px',
      fontSize: '14px',
      borderRadius: '8px',
      gap: '8px',
    },
    [Size.MD]: {
      minWidth: '180px',
      maxWidth: '300px',
      padding: '6px 16px',
      fontSize: '14px',
      borderRadius: '8px',
      gap: '8px',
    },
    [Size.LG]: {
      minWidth: '220px',
      maxWidth: '350px',
      padding: '6px 16px',
      fontSize: '16px',
      borderRadius: '8px',
      gap: '8px',
    },
    [Size.XL]: {
      minWidth: '280px',
      maxWidth: '400px',
      padding: '6px 16px',
      fontSize: '18px',
      borderRadius: '8px',
      gap: '8px',
    },
  },

  // Варианты dropdown
  variants: {
    default: {
      background: neutral[10], // Белый фон
      color: neutral[900], // Темно-серый текст
      border: `1px solid ${neutral[200]}`, // Серая граница
      // boxShadow будет применяться в styled-components из theme.boxShadow.dropdown
    },
    elevated: {
      background: neutral[10],
      color: neutral[900],
      border: `1px solid ${neutral[200]}`,
      // boxShadow будет применяться в styled-components из theme.boxShadow.dropdown
    },
    outlined: {
      background: neutral[10],
      color: neutral[900],
      border: `2px solid ${neutral[200]}`,
      // boxShadow будет применяться в styled-components из theme.boxShadow.dropdown
    },
  },

  // Состояния dropdown согласно макету Figma
  states: {
    hover: {
      background: neutral[100], // Gray_02 / 2O (#F5F5F5)
      color: neutral[800], // Gray_02 / 9O (#424242)
      fontWeight: 400, // Regular
    },
    focus: {
      background: neutral[100], // Gray_02 / 2O (#F5F5F5)
      color: neutral[800], // Gray_02 / 9O (#424242)
      border: `2px solid ${primary[200]}`, // Primary/200 border (#90CAF9)
      fontWeight: 400, // Regular
    },
    active: {
      background: neutral[100], // Gray_02 / 2O (#F5F5F5) - pressed состояние
      color: primary[600], // Primary/600 (#1E88E5)
      fontWeight: 500, // Medium
    },
    disabled: {
      background: 'transparent', // Прозрачный фон
      color: neutral[500], // Gray_02 / 6O (#9E9E9E)
      fontWeight: 500, // Medium
      opacity: 1,
      cursor: 'not-allowed',
    },
    selected: {
      background: neutral[100], // Gray_02 / 2O (#F5F5F5)
      color: primary[600], // Primary/600 (#1E88E5)
      fontWeight: 500, // Medium
    },
  },

  // Анимации и эффекты
  animations: {
    transition: 'all 0.2s ease-in-out',
    openAnimation: {
      duration: '0.2s',
      easing: 'ease-out',
      transform: 'translateY(0) scale(1)',
    },
    closeAnimation: {
      duration: '0.15s',
      easing: 'ease-in',
      transform: 'translateY(-8px) scale(0.95)',
    },
  },

  // Дополнительные настройки
  settings: {
    zIndex: 9999,
    backdropFilter: 'blur(4px)',
    fontFamily: fontFamily.primary, // Используем переменную шрифта
    fontWeight: 400, // Regular как в макете
    lineHeight: '1.4285714285714286em', // Как в макете
    textAlign: 'left',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    cursor: {
      default: 'pointer',
      disabled: 'not-allowed',
    },
  },
};
