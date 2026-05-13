import type { ProgressTheme } from '../../types/theme';
import { Size } from '../../types/sizes';
import { colors } from '../../variables/colors';

/**
 * Светлая тема для прогресс-баров
 * Определяет все стили прогресс-баров для светлой темы
 */
export const lightProgressTheme: ProgressTheme = {
  // Размеры для линейного прогресса
  linearSizes: {
    [Size.XS]: {
      height: '2px',
      borderRadius: '2px',
    },
    [Size.SM]: {
      height: '3px',
      borderRadius: '2px',
    },
    [Size.MD]: {
      height: '4px',
      borderRadius: '2px',
    },
    [Size.LG]: {
      height: '6px',
      borderRadius: '2px',
    },
    [Size.XL]: {
      height: '8px',
      borderRadius: '2px',
    },
  },

  // Размеры для кругового прогресса
  circularSizes: {
    [Size.XS]: {
      size: 40,
      thickness: 3,
    },
    [Size.SM]: {
      size: 70,
      thickness: 4,
    },
    [Size.MD]: {
      size: 100,
      thickness: 6,
    },
    [Size.LG]: {
      size: 120,
      thickness: 8,
    },
    [Size.XL]: {
      size: 140,
      thickness: 10,
    },
  },

  // Цвета прогресса
  colors: {
    track: colors.grey[200], // Цвет трека прогресса
    fill: colors.success[500], // Заполнение прогресс-баров (по умолчанию)
    value: colors.grey[600], // Цвет значения прогресса (текст)
    statusAwait: colors.grey[400], // Цвет прогресса в статусе ожидания
    statusLoading: colors.success[400], // Цвет прогресса в статусе загрузки
    statusSuccess: colors.success[500], // Цвет прогресса в статусе успеха
    statusError: colors.red[600], // Цвет прогресса в статусе ошибки
  },

  // Типографика
  typography: {
    label: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '1.2em',
    },
    value: {
      linear: {
        fontSize: '14px',
        fontWeight: 500,
        fontFamily: 'Montserrat, sans-serif',
      },
      circular: {
        fontSize: '12px',
        fontWeight: 400,
      },
    },
    description: {
      fontSize: '12px',
      lineHeight: '1.2',
    },
    stepper: {
      currentStep: {
        fontSize: '11px',
        fontWeight: 500,
      },
      stepCounter: {
        fontSize: '11px',
        fontWeight: 400,
      },
      nextStepInfo: {
        fontSize: '11px',
        fontWeight: 400,
      },
    },
  },

  // Отступы и промежутки
  spacing: {
    root: {
      linear: '8px',
      circular: '16px',
    },
    container: '8px',
    row: '15px',
    circularWrapper: '16px',
    circularInfoCard: '8px',
    stepper: {
      container: '8px',
      header: '8px',
    },
  },

  // Анимации
  animations: {
    transition: 'all 0.3s ease',
    defaultDuration: 300,
    indeterminate: {
      duration: '1.5s',
      easing: 'ease-in-out infinite',
    },
    loading: {
      duration: '1.5s',
      easing: 'ease-in-out infinite',
    },
    checkmark: {
      duration: '0.4s',
      easing: 'ease-out',
    },
  },

  // Дополнительные настройки
  settings: {
    trackShadow: {
      light: 'inset 0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
      dark: 'inset 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
    },
    fillShadow: '0px 4px 11px 0px rgba(148, 210, 99, 0.2)',
    minWidth: '180px',
    checkmarkSize: 0.3, // Множитель размера для галочки (0.3 от размера круга)
    gradient: {
      direction: '90deg', // Горизонтальный градиент слева направо
      lightenAmount: 0.4, // Осветление на 40% для более заметного градиента
    },
  },
};
