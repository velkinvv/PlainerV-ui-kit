import { Size } from '../../types/sizes';
import type { AvatarTheme } from '../../types/theme';
import { neutral } from '../../variables/colors/neutral';
import { success } from '../../variables/colors/success';
import { danger } from '../../variables/colors/danger';
import { warning } from '../../variables/colors/warning';

/**
 * Темная тема для аватара
 * Определяет все настройки стилизации аватара в темной теме
 */
export const darkAvatarTheme: AvatarTheme = {
  // Размеры аватара (аналогично светлой теме)
  sizes: {
    [Size.XS]: {
      width: '24px',
      height: '24px',
      fontSize: '10px',
      lineHeight: '12px',
    },
    [Size.SM]: {
      width: '32px',
      height: '32px',
      fontSize: '12px',
      lineHeight: '16px',
    },
    [Size.MD]: {
      width: '40px',
      height: '40px',
      fontSize: '12px',
      lineHeight: '16px',
    },
    [Size.LG]: {
      width: '48px',
      height: '48px',
      fontSize: '14px',
      lineHeight: '20px',
    },
    [Size.XL]: {
      width: '64px',
      height: '64px',
      fontSize: '16px',
      lineHeight: '24px',
    },
  },

  // Размеры иконок (аналогично светлой теме)
  iconSizes: {
    [Size.XS]: {
      width: '12px',
      height: '12px',
    },
    [Size.SM]: {
      width: '16px',
      height: '16px',
    },
    [Size.MD]: {
      width: '20px',
      height: '20px',
    },
    [Size.LG]: {
      width: '24px',
      height: '24px',
    },
    [Size.XL]: {
      width: '28px',
      height: '28px',
    },
  },

  // Размеры индикаторов статуса (аналогично светлой теме)
  statusSizes: {
    [Size.XS]: {
      width: '8px',
      height: '8px',
      top: '1px',
      right: '1px',
    },
    [Size.SM]: {
      width: '10px',
      height: '10px',
      top: '2px',
      right: '2px',
    },
    [Size.MD]: {
      width: '10px',
      height: '10px',
      top: '2px',
      right: '2px',
    },
    [Size.LG]: {
      width: '12px',
      height: '12px',
      top: '2px',
      right: '2px',
    },
    [Size.XL]: {
      width: '14px',
      height: '14px',
      top: '3px',
      right: '3px',
    },
  },

  // Размеры кнопок (аналогично светлой теме)
  buttonSizes: {
    [Size.XS]: {
      width: '12px',
      height: '12px',
    },
    [Size.SM]: {
      width: '16px',
      height: '16px',
    },
    [Size.MD]: {
      width: '16px',
      height: '16px',
    },
    [Size.LG]: {
      width: '24px',
      height: '24px',
    },
    [Size.XL]: {
      width: '28px',
      height: '28px',
    },
  },

  // Варианты аватара для темной темы
  variants: {
    default: {
      background: neutral[800], // #424242
      color: neutral[100], // #f5f5f5
    },
    hover: {
      background: neutral[700], // #616161
      color: neutral[100], // #f5f5f5
    },
    active: {
      background: neutral[600], // #757575
      color: neutral[100], // #f5f5f5
    },
    disabled: {
      background: neutral[700], // #616161
      color: neutral[400], // #9e9e9e
    },
  },

  // Статусы аватара (аналогично светлой теме)
  statuses: {
    online: {
      background: success[500], // #93e850
      // boxShadow будет применяться в styled-components из theme.boxShadow.avatarOnline
    },
    offline: {
      background: neutral[400], // #9ca3af
      // boxShadow будет применяться в styled-components из theme.boxShadow.avatarOffline
    },
    danger: {
      background: danger[500], // #ef4444
      // boxShadow будет применяться в styled-components из theme.boxShadow.avatarDanger
    },
    warning: {
      background: warning[500], // #f59e0b
      // boxShadow будет применяться в styled-components из theme.boxShadow.avatarWarning
    },
  },

  // Состояния аватара для темной темы
  states: {
    overlay: {
      background: 'rgba(66, 66, 66, 0.6)',
    },
    close: {
      background: neutral[600], // #616161
      color: neutral[10], // #ffffff
    },
  },

  // Анимации и эффекты (аналогично светлой теме)
  animations: {
    transition: 'all 0.2s ease',
    hoverScale: 1.05,
    tapScale: 0.95,
  },

  // Дополнительные настройки (аналогично светлой теме)
  settings: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 500,
    borderRadius: '50%',
    overflow: 'hidden',
    cursor: {
      default: 'default',
      clickable: 'pointer',
    },
    userSelect: 'none',
    zIndex: {
      base: 1,
      overlay: 2,
      status: 10,
    },
  },
};
