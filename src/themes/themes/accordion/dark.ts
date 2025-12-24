import { Size } from '../../types/sizes';
import type { AccordionTheme } from '../../types/theme';
import { neutral } from '../../variables/colors/neutral';

/**
 * Темная тема для аккордеона
 * Определяет все настройки стилизации аккордеона в темной теме
 */
export const darkAccordionTheme: AccordionTheme = {
  // Размеры аккордеона (аналогично светлой теме)
  sizes: {
    [Size.XS]: {
      padding: '4px 8px',
      fontSize: '12px',
      lineHeight: '1.33',
      gap: '2px',
    },
    [Size.SM]: {
      padding: '6px 12px',
      fontSize: '14px',
      lineHeight: '1.43',
      gap: '3px',
    },
    [Size.MD]: {
      padding: '8px 16px',
      fontSize: '16px',
      lineHeight: '1.5',
      gap: '4px',
    },
    [Size.LG]: {
      padding: '12px 20px',
      fontSize: '18px',
      lineHeight: '1.44',
      gap: '6px',
    },
    [Size.XL]: {
      padding: '16px 24px',
      fontSize: '20px',
      lineHeight: '1.4',
      gap: '8px',
    },
  },

  // Размеры контента (аналогично светлой теме)
  contentSizes: {
    [Size.XS]: {
      padding: '2px 8px 8px',
      fontSize: '10px',
      lineHeight: '1.4',
    },
    [Size.SM]: {
      padding: '3px 12px 12px',
      fontSize: '12px',
      lineHeight: '1.42',
    },
    [Size.MD]: {
      padding: '4px 16px 16px',
      fontSize: '14px',
      lineHeight: '1.43',
    },
    [Size.LG]: {
      padding: '6px 20px 20px',
      fontSize: '16px',
      lineHeight: '1.44',
    },
    [Size.XL]: {
      padding: '8px 24px 24px',
      fontSize: '18px',
      lineHeight: '1.44',
    },
  },

  // Размеры подзаголовка (аналогично светлой теме)
  subtitleSizes: {
    [Size.XS]: {
      fontSize: '10px',
      lineHeight: '1.2',
    },
    [Size.SM]: {
      fontSize: '11px',
      lineHeight: '1.27',
    },
    [Size.MD]: {
      fontSize: '12px',
      lineHeight: '1.33',
    },
    [Size.LG]: {
      fontSize: '13px',
      lineHeight: '1.38',
    },
    [Size.XL]: {
      fontSize: '14px',
      lineHeight: '1.43',
    },
  },

  // Размеры иконки (аналогично светлой теме)
  iconSizes: {
    [Size.XS]: {
      width: '12px',
      height: '12px',
    },
    [Size.SM]: {
      width: '14px',
      height: '14px',
    },
    [Size.MD]: {
      width: '16px',
      height: '16px',
    },
    [Size.LG]: {
      width: '18px',
      height: '18px',
    },
    [Size.XL]: {
      width: '20px',
      height: '20px',
    },
  },

  // Варианты аккордеона для темной темы
  variants: {
    default: {
      background: neutral[800], // #424242
      color: neutral[100], // #f5f5f5
    },
    hover: {
      background: neutral[700], // #616161
      color: neutral[100], // #f5f5f5
    },
    disabled: {
      background: neutral[700], // #616161
      color: neutral[400], // #9e9e9e
    },
  },

  // Позиции элементов (аналогично светлой теме, но с темными границами)
  positions: {
    start: {
      borderRadius: '8px 8px 0px 0px',
      borderBottom: '1px solid #616161',
    },
    center: {
      borderRadius: '0',
      borderTop: '1px solid #616161',
      borderBottom: '1px solid #616161',
    },
    last: {
      borderRadius: '0px 0px 8px 8px',
      borderTop: '1px solid #616161',
    },
  },

  // Анимации и эффекты (аналогично светлой теме)
  animations: {
    transition: 'all 0.2s ease',
    chevronTransition: 'transform 0.2s ease',
    contentTransition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },

  // Дополнительные настройки (аналогично светлой теме)
  settings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: {
      title: 500,
      subtitle: 400,
      content: 400,
    },
    textAlign: 'left',
    userSelect: 'none',
    cursor: {
      default: 'default',
      clickable: 'pointer',
    },
    overflow: 'hidden',
    zIndex: 1,
  },
};
