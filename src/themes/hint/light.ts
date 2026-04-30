import { Size } from '../../types/sizes';
import type { HintTheme } from '../../types/theme';
import { colors } from '../../variables/colors';
import { lightShadows } from '../../variables/shadows';

/**
 * Светлая тема для Hint компонента
 * Определяет все настройки стилизации подсказок в светлой теме
 */
export const lightHintTheme: HintTheme = {
  // Размеры hint
  sizes: {
    [Size.XS]: {
      fontSize: '10px',
      lineHeight: '1.2em',
      padding: '4px 8px',
      borderRadius: '8px',
      gap: '6px',
    },
    [Size.SM]: {
      fontSize: '12px',
      lineHeight: '1.3333333333333333em',
      padding: '6px 10px',
      borderRadius: '12px',
      gap: '8px',
    },
    [Size.MD]: {
      fontSize: '14px',
      lineHeight: '1.4285714285714286em',
      padding: '6px 10px',
      borderRadius: '16px',
      gap: '10px',
    },
    [Size.LG]: {
      fontSize: '16px',
      lineHeight: '1.5em',
      padding: '8px 12px',
      borderRadius: '20px',
      gap: '12px',
    },
    [Size.XL]: {
      fontSize: '18px',
      lineHeight: '1.5555555555555556em',
      padding: '10px 14px',
      borderRadius: '24px',
      gap: '14px',
    },
  },

  // Варианты hint
  variants: {
    default: {
      background: colors.grey[100], // Фон для обычных подсказок
      color: colors.grey[800], // Текст для обычных подсказок
      border: `1px solid ${colors.grey[200]}`, // Граница для обычных подсказок
      boxShadow: lightShadows.tooltip, // Тень для обычных подсказок из основной темы
    },
    info: {
      background: colors.blue[50], // Фон для информационных подсказок
      color: colors.blue[700], // Текст для информационных подсказок
      border: `1px solid ${colors.blue[200]}`, // Граница для информационных подсказок
      boxShadow: lightShadows.primary, // Тень для информационных подсказок из основной темы
    },
    success: {
      background: colors.green[50], // Фон для успешных подсказок
      color: colors.green[700], // Текст для успешных подсказок
      border: `1px solid ${colors.green[200]}`, // Граница для успешных подсказок
      boxShadow: lightShadows.success, // Тень для успешных подсказок из основной темы
    },
    warning: {
      background: colors.orange[50], // Фон для предупреждающих подсказок
      color: colors.orange[700], // Текст для предупреждающих подсказок
      border: `1px solid ${colors.orange[200]}`, // Граница для предупреждающих подсказок
      boxShadow: lightShadows.warning, // Тень для предупреждающих подсказок из основной темы
    },
    error: {
      background: colors.red[50], // Фон для ошибочных подсказок
      color: colors.red[700], // Текст для ошибочных подсказок
      border: `1px solid ${colors.red[200]}`, // Граница для ошибочных подсказок
      boxShadow: lightShadows.danger, // Тень для ошибочных подсказок из основной темы
    },
  },

  // Состояния hint
  states: {
    visible: {
      opacity: 1,
      visibility: 'visible',
      transform: 'translateX(-50%) scale(1)',
    },
    hidden: {
      opacity: 0,
      visibility: 'hidden',
      transform: 'translateX(-50%) scale(0.95)',
    },
  },

  // Анимации и эффекты
  animations: {
    transition: 'all 0.2s ease-in-out',
    duration: 200,
    easing: 'ease-in-out',
  },

  // Дополнительные настройки
  settings: {
    maxWidth: 300,
    /** Согласовано с `ZIndexHandler('hint')`: над панелью `Dropdown` (~9999) */
    zIndex: 11600,
    pointerEvents: 'auto',
    userSelect: 'none',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
