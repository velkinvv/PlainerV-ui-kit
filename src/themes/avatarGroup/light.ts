import { Size } from '../../types/sizes';
import type { AvatarGroupTheme } from '../../types/theme';
import { neutral } from '../../variables/colors/neutral';

/**
 * Светлая тема для группы аватаров
 * Определяет все настройки стилизации группы аватаров в светлой теме
 */
export const lightAvatarGroupTheme: AvatarGroupTheme = {
  // Размеры группы аватаров
  sizes: {
    [Size.XS]: {
      spacing: '6px',
      borderWidth: '2px',
      fontSize: '8px',
      lineHeight: '10px',
    },
    [Size.SM]: {
      spacing: '8px',
      borderWidth: '2px',
      fontSize: '10px',
      lineHeight: '12px',
    },
    [Size.MD]: {
      spacing: '10px',
      borderWidth: '3px',
      fontSize: '12px',
      lineHeight: '16px',
    },
    [Size.LG]: {
      spacing: '12px',
      borderWidth: '3px',
      fontSize: '14px',
      lineHeight: '20px',
    },
    [Size.XL]: {
      spacing: '16px',
      borderWidth: '4px',
      fontSize: '16px',
      lineHeight: '24px',
    },
  },

  // Варианты группы
  variants: {
    stack: {
      marginLeft: '-10px',
      zIndex: {
        base: 1,
        max: 10,
      },
    },
    row: {
      gap: '8px',
    },
    grid: {
      columns: 3,
      rows: 2,
      gap: '10px',
    },
  },

  // Счетчик дополнительных аватаров
  counter: {
    background: neutral[100], // #f5f5f5
    color: neutral[800], // #424242
    border: `3px solid ${neutral[10]}`, // #ffffff
    borderRadius: '50%',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    hover: {
      background: neutral[200], // #e0e0e0
      transform: 'scale(1.05)',
    },
  },

  // Ободок вокруг аватаров (берется из темы карточки)
  avatarBorder: {
    color: neutral[10], // #ffffff - цвет фона карточки
  },

  // Анимации и эффекты
  animations: {
    transition: 'all 0.2s ease-in-out',
    hoverScale: 1.05,
  },

  // Дополнительные настройки
  settings: {
    lineHeight: '0',
    flexShrink: 0,
  },
};
