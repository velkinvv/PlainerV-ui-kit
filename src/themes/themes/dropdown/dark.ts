import { Size } from '../../types/sizes';
import type { DropdownTheme } from '../../types/theme';
import { neutral } from '../../variables/colors/neutral';
import { primary } from '../../variables/colors/primary';
import { fontFamily } from '../fonts';

/**
 * Темная тема для dropdown
 * Определяет все настройки стилизации dropdown в темной теме
 */
export const darkDropdownTheme: DropdownTheme = {
  // Размеры dropdown (те же, что и в светлой теме)
  sizes: {
    [Size.XS]: {
      minWidth: '120px',
      maxWidth: '200px',
      padding: '6px 16px',
      fontSize: '12px',
      borderRadius: '8px',
      gap: '8px',
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

  // Варианты dropdown для темной темы
  variants: {
    default: {
      background: neutral[800], // Темный фон
      color: neutral[100], // Светлый текст
      border: `1px solid ${neutral[700]}`, // Темная граница
      // boxShadow будет применяться в styled-components из theme.boxShadow.dropdown
    },
    elevated: {
      background: neutral[800],
      color: neutral[100],
      border: `1px solid ${neutral[700]}`,
      // boxShadow будет применяться в styled-components из theme.boxShadow.dropdown
    },
    outlined: {
      background: neutral[800],
      color: neutral[100],
      border: `2px solid ${neutral[700]}`,
      // boxShadow будет применяться в styled-components из theme.boxShadow.dropdown
    },
  },

  // Состояния dropdown для темной темы (аналогично светлой теме)
  states: {
    hover: {
      background: neutral[700], // Темно-серый фон при наведении
      color: neutral[10], // Белый текст
      fontWeight: 400, // Regular
    },
    focus: {
      background: neutral[700], // Темно-серый фон
      color: neutral[10], // Белый текст
      border: `2px solid ${primary[200]}`, // Primary/200 border (#90CAF9)
      fontWeight: 400, // Regular
    },
    active: {
      background: neutral[700], // Темно-серый фон - pressed состояние
      color: primary[600], // Primary/600 (#1E88E5)
      fontWeight: 500, // Medium
    },
    disabled: {
      background: 'transparent', // Прозрачный фон
      color: neutral[500], // Серый текст
      fontWeight: 500, // Medium
      opacity: 1,
      cursor: 'not-allowed',
    },
    selected: {
      background: neutral[700], // Темно-серый фон
      color: primary[600], // Primary/600 (#1E88E5)
      fontWeight: 500, // Medium
    },
  },

  // Анимации и эффекты (те же, что и в светлой теме)
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

  // Дополнительные настройки (те же, что и в светлой теме)
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
