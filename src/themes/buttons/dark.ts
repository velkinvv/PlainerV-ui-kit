import type { ButtonTheme } from '../../types/theme';
import { Size } from '../../types/sizes';
import { themeRadiusBySize } from '../radiusScale';
import { fontFamily } from '../fonts';
import { primary } from '../../variables/colors/primary';
import { success } from '../../variables/colors/success';
import { warning } from '../../variables/colors/warning';
import { danger } from '../../variables/colors/danger';
import { neutral } from '../../variables/colors/neutral';

/**
 * Темная тема для кнопок
 * Определяет все стили кнопок для темной темы
 */
export const darkButtonTheme: ButtonTheme = {
  // Размеры кнопок (те же, что и в светлой теме)
  sizes: {
    [Size.XS]: {
      minHeight: '28px',
      padding: '6px 8px',
      fontSize: '12px',
      borderRadius: themeRadiusBySize[Size.XS],
      gap: '6px',
    },
    [Size.SM]: {
      minHeight: '32px',
      padding: '8px 12px',
      fontSize: '14px',
      borderRadius: themeRadiusBySize[Size.SM],
      gap: '8px',
    },
    [Size.MD]: {
      minHeight: '36px',
      padding: '10px 18px',
      fontSize: '14px',
      borderRadius: themeRadiusBySize[Size.MD],
      gap: '8px',
    },
    [Size.LG]: {
      minHeight: '40px',
      padding: '12px 20px',
      fontSize: '16px',
      borderRadius: themeRadiusBySize[Size.LG],
      gap: '8px',
    },
    [Size.XL]: {
      minHeight: '64px',
      padding: '16px 28px',
      fontSize: '20px',
      borderRadius: themeRadiusBySize[Size.XL],
      gap: '8px',
      minWidth: '130px',
    },
  },

  // Варианты кнопок для темной темы
  variants: {
    primary: {
      background: primary[500],
      color: neutral[10],
      border: `1px solid ${primary[500]}`,
      hover: {
        background: primary[400],
        border: `1px solid ${primary[400]}`,
      },
      active: {
        background: primary[300],
        border: `1px solid ${primary[300]}`,
      },
      focus: {
        border: `2px solid ${primary[500]}`,
      },
      disabled: {
        background: neutral[700],
        border: `1px solid ${neutral[700]}`,
        color: neutral[600],
      },
    },
    secondary: {
      background: neutral[600],
      color: neutral[10],
      border: `1px solid ${neutral[600]}`,
      hover: {
        background: neutral[500],
        border: `1px solid ${neutral[500]}`,
      },
      active: {
        background: neutral[400],
        border: `1px solid ${neutral[400]}`,
      },
      focus: {
        border: `2px solid ${neutral[600]}`,
      },
      disabled: {
        background: neutral[700],
        border: `1px solid ${neutral[700]}`,
        color: neutral[600],
      },
    },
    outline: {
      background: 'transparent',
      color: neutral[300],
      border: `1px solid ${neutral[300]}`,
      hover: {
        background: neutral[400],
        border: `1px solid ${neutral[400]}`,
        color: neutral[900],
      },
      active: {
        background: neutral[500],
        border: `1px solid ${neutral[500]}`,
        color: neutral[900],
      },
      focus: {
        border: `2px solid ${neutral[300]}`,
      },
      disabled: {
        background: 'transparent',
        border: `1px solid ${neutral[700]}`,
        color: neutral[600],
      },
    },
    line: {
      background: 'transparent',
      color: primary[400],
      border: 'none',
      textDecoration: 'none',
      hover: {
        background: 'transparent',
        border: 'none',
        color: primary[400],
        textDecoration: 'none',
      },
      active: {
        background: 'transparent',
        border: 'none',
        color: primary[300],
      },
      focus: {
        border: `2px solid ${primary[400]}`,
      },
      disabled: {
        background: 'transparent',
        border: 'none',
        color: neutral[600],
        textDecoration: 'none',
      },
    },
    ghost: {
      background: 'transparent',
      color: neutral[100],
      border: '1px solid transparent',
      hover: {
        background: neutral[800],
        border: `1px solid ${neutral[700]}`,
        color: neutral[100],
      },
      active: {
        background: neutral[700],
        border: `1px solid ${neutral[600]}`,
        color: neutral[100],
      },
      focus: {
        border: `2px solid ${neutral[500]}`,
      },
      disabled: {
        background: 'transparent',
        border: '1px solid transparent',
        color: neutral[600],
      },
    },
    danger: {
      background: danger[500],
      color: neutral[10],
      border: `1px solid ${danger[500]}`,
      hover: {
        background: danger[400],
        border: `1px solid ${danger[400]}`,
      },
      active: {
        background: danger[400],
        border: `1px solid ${danger[400]}`,
      },
      focus: {
        border: `2px solid ${danger[500]}`,
      },
      disabled: {
        background: neutral[700],
        border: `1px solid ${neutral[700]}`,
        color: neutral[600],
      },
    },
    success: {
      background: success[500],
      color: neutral[10],
      border: `1px solid ${success[500]}`,
      hover: {
        background: success[400],
        border: `1px solid ${success[400]}`,
      },
      active: {
        background: success[400],
        border: `1px solid ${success[400]}`,
      },
      focus: {
        border: `2px solid ${success[500]}`,
      },
      disabled: {
        background: neutral[700],
        border: `1px solid ${neutral[700]}`,
        color: neutral[600],
      },
    },
    warning: {
      background: warning[500],
      color: neutral[10],
      border: `1px solid ${warning[500]}`,
      hover: {
        background: warning[400],
        border: `1px solid ${warning[400]}`,
      },
      active: {
        background: warning[400],
        border: `1px solid ${warning[400]}`,
      },
      focus: {
        border: `2px solid ${warning[500]}`,
      },
      disabled: {
        background: neutral[700],
        border: `1px solid ${neutral[700]}`,
        color: neutral[600],
      },
    },
    skeleton: {
      background: `linear-gradient(90deg, ${neutral[700]} 25%, ${neutral[600]} 50%, ${neutral[700]} 75%)`,
      backgroundSize: '200% 100%',
      backgroundPosition: '-200% 0',
      color: `${neutral[500]}80`, // Полупрозрачный цвет текста для имитации размытия
      border: `2px solid ${neutral[600]}`,
      animation: 'skeleton-loading 1.5s infinite ease-in-out',
      hover: {
        background: `linear-gradient(90deg, ${neutral[700]} 25%, ${neutral[600]} 50%, ${neutral[700]} 75%)`,
        backgroundSize: '200% 100%',
        backgroundPosition: '-200% 0',
        color: `${neutral[500]}80`,
        border: `2px solid ${neutral[600]}`,
        animation: 'skeleton-loading 1.5s infinite ease-in-out',
      },
      active: {
        background: `linear-gradient(90deg, ${neutral[700]} 25%, ${neutral[600]} 50%, ${neutral[700]} 75%)`,
        backgroundSize: '200% 100%',
        backgroundPosition: '-200% 0',
        color: `${neutral[500]}80`,
        border: `2px solid ${neutral[600]}`,
        animation: 'skeleton-loading 1.5s infinite ease-in-out',
      },
      focus: {
        border: `2px solid ${neutral[500]}`,
      },
      disabled: {
        background: `linear-gradient(90deg, ${neutral[700]} 25%, ${neutral[600]} 50%, ${neutral[700]} 75%)`,
        backgroundSize: '200% 100%',
        backgroundPosition: '-200% 0',
        color: `${neutral[500]}80`,
        border: `2px solid ${neutral[600]}`,
        animation: 'skeleton-loading 1.5s infinite ease-in-out',
      },
    },
  },

  // Анимации и эффекты (те же, что и в светлой теме)
  animations: {
    transition: 'all 0.2s ease-in-out',
    hoverScale: 1,
    tapScale: 1,
    loadingSpinner: {
      size: '16px',
      color: neutral[10],
      animation: 'spin 1s linear infinite',
    },
    skeleton: {
      animation: 'skeleton-loading 1.5s infinite',
    },
  },

  // Дополнительные настройки (те же, что и в светлой теме)
  settings: {
    fontFamily: fontFamily.primary,
    fontWeight: {
      default: 500,
      large: 400, // Для LG размера в некоторых вариантах
    },
    lineHeight: '1.5',
    textAlign: 'center',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    cursor: {
      default: 'pointer',
      disabled: 'not-allowed',
      loading: 'not-allowed',
    },
  },
};
