import { Size } from '../../types/sizes';
import type { CardTheme } from '../../types/theme';
import { neutral } from '../../variables/colors/neutral';

/**
 * Темная тема для карточки
 * Определяет все настройки стилизации карточки в темной теме
 */
export const darkCardTheme: CardTheme = {
  // Размеры карточки (аналогично светлой теме)
  sizes: {
    [Size.XS]: {
      minHeight: '80px',
      padding: '12px',
      borderRadius: '8px',
    },
    [Size.SM]: {
      minHeight: '120px',
      padding: '16px',
      borderRadius: '12px',
    },
    [Size.MD]: {
      minHeight: '160px',
      padding: '20px',
      borderRadius: '16px',
    },
    [Size.LG]: {
      minHeight: '200px',
      padding: '24px',
      borderRadius: '20px',
    },
    [Size.XL]: {
      minHeight: '240px',
      padding: '32px',
      borderRadius: '24px',
    },
  },

  // Варианты карточки для темной темы
  variants: {
    elevated: {
      background: neutral[800], // #424242
      color: neutral[100], // #f5f5f5
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)', // Тень для elevated карточки в темной теме
    },
    outlined: {
      background: neutral[800], // #424242
      color: neutral[100], // #f5f5f5
      border: `1px solid ${neutral[600]}`, // #757575
    },
    filled: {
      background: neutral[700], // #616161
      color: neutral[100], // #f5f5f5
    },
  },

  // Состояния карточки для темной темы
  states: {
    hover: {
      transform: 'translateY(-2px)',
      boxShadow: {
        elevated: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        outlined: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        filled: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      },
    },
    active: {
      transform: 'translateY(0)',
    },
    disabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },

  // Компоненты карточки для темной темы
  components: {
    header: {
      marginBottom: '16px',
      paddingBottom: '16px',
    },
    title: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '24px',
      color: neutral[100], // #f5f5f5
      margin: '0',
    },
    subtitle: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
      color: neutral[300], // #bdbdbd
      margin: '4px 0 0 0',
    },
    content: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
      color: neutral[100], // #f5f5f5
    },
    footer: {
      marginTop: '16px',
      paddingTop: '16px',
    },
    actions: {
      gap: '8px',
    },
  },

  // Анимации и эффекты (аналогично светлой теме)
  animations: {
    transition: 'all 0.2s ease-in-out',
    hoverTransform: 'translateY(-2px)',
    activeTransform: 'translateY(0)',
  },

  // Дополнительные настройки (аналогично светлой теме)
  settings: {
    overflow: 'hidden',
    cursor: {
      default: 'default',
      clickable: 'pointer',
    },
    userSelect: 'none',
    fullWidth: '100%',
  },
};
