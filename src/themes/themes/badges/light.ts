import type { BadgeTheme } from '../../types/theme';
import { Size } from '../../types/sizes';
import { fontFamily } from '../fonts';
import { primary } from '../../variables/colors/primary';
import { success } from '../../variables/colors/success';
import { warning } from '../../variables/colors/warning';
import { danger } from '../../variables/colors/danger';
import { neutral } from '../../variables/colors/neutral';

/**
 * Светлая тема для бейджей
 * Определяет все стили бейджей для светлой темы
 */
export const lightBadgeTheme: BadgeTheme = {
  // Размеры бейджей
  sizes: {
    [Size.XS]: {
      minHeight: '16px',
      minWidth: '16px',
      padding: '2px 6px',
      fontSize: '10px',
      borderRadius: '8px',
      gap: '4px',
    },
    [Size.SM]: {
      minHeight: '20px',
      minWidth: '20px',
      padding: '4px 8px',
      fontSize: '12px',
      borderRadius: '10px',
      gap: '4px',
    },
    [Size.MD]: {
      minHeight: '24px',
      minWidth: '24px',
      padding: '6px 12px',
      fontSize: '14px',
      borderRadius: '12px',
      gap: '6px',
    },
    [Size.LG]: {
      minHeight: '28px',
      minWidth: '28px',
      padding: '8px 16px',
      fontSize: '16px',
      borderRadius: '14px',
      gap: '8px',
    },
    [Size.XL]: {
      minHeight: '32px',
      minWidth: '32px',
      padding: '10px 20px',
      fontSize: '18px',
      borderRadius: '16px',
      gap: '8px',
    },
  },

  // Dot размеры (специальные для точечных бейджей)
  dotSizes: {
    [Size.XS]: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      padding: '0',
      fontSize: '0px',
    },
    [Size.SM]: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      padding: '0',
      fontSize: '0px',
    },
    [Size.MD]: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      padding: '0',
      fontSize: '0px',
    },
    [Size.LG]: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      padding: '0',
      fontSize: '0px',
    },
    [Size.XL]: {
      width: '14px',
      height: '14px',
      borderRadius: '50%',
      padding: '0',
      fontSize: '0px',
    },
  },

  // Варианты бейджей
  variants: {
    default: {
      background: danger[500], // #ff2e2e
      color: neutral[10], // #ffffff
    },
    defaultMain: {
      background: primary[500], // #2196f3
      color: neutral[10], // #ffffff
    },
    defaultMainInversion: {
      background: neutral[10], // #ffffff
      color: primary[500], // #2196f3
    },
    defaultSuccess: {
      background: success[500], // #93e850
      color: neutral[10], // #ffffff
      // boxShadow будет применяться в styled-components из theme.boxShadow.avatarOnline
    },
    disable: {
      background: neutral[200], // #d8d8d8
      color: neutral[800], // #424242
    },
    outline: {
      background: 'transparent',
      color: neutral[10], // #ffffff
      border: `1px solid ${neutral[10]}`, // #ffffff
    },
    outlineInversion: {
      background: 'transparent',
      color: neutral[800], // #424242
      border: `1px solid ${neutral[800]}`, // #424242
    },
    // Обратная совместимость
    primary: {
      background: primary[500], // #2196f3
      color: neutral[10], // #ffffff
    },
    secondary: {
      background: danger[500], // #ff2e2e
      color: neutral[10], // #ffffff
    },
    success: {
      background: success[500], // #93e850
      color: neutral[10], // #ffffff
    },
    danger: {
      background: danger[500], // #ff2e2e
      color: neutral[10], // #ffffff
    },
    warning: {
      background: warning[500], // #ff9800
      color: neutral[10], // #ffffff
    },
    info: {
      background: primary[500], // #2196f3
      color: neutral[10], // #ffffff
    },
  },

  // Анимации и эффекты
  animations: {
    transition: 'all 0.2s ease-in-out',
    hoverScale: 1.05,
    tapScale: 0.95,
  },

  // Дополнительные настройки
  settings: {
    fontFamily: fontFamily.primary,
    fontWeight: 500,
    lineHeight: '1',
    textAlign: 'center',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    cursor: {
      default: 'default',
      clickable: 'pointer',
    },
  },
};
