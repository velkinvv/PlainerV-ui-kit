import type { RadioButtonTheme } from '../../types/theme';
import { Size } from '../../types/sizes';
import { success } from '../../variables/colors/success';
import { neutral } from '../../variables/colors/neutral';
import { danger } from '../../variables/colors/danger';
import { warning } from '../../variables/colors/warning';

/**
 * Темная тема для радиокнопок
 * Определяет все стили радиокнопок для темной темы
 */
export const darkRadioButtonTheme: RadioButtonTheme = {
  // Размеры радиокнопок (аналогично светлой теме)
  sizes: {
    [Size.SM]: {
      circleSize: '16px',
      dotSize: '6px',
    },
    [Size.MD]: {
      circleSize: '20px',
      dotSize: '8px',
    },
    [Size.LG]: {
      circleSize: '24px',
      dotSize: '10px',
    },
  },

  // Цвета радиокнопок для темной темы
  colors: {
    // Цвета для filled варианта
    filled: {
      checked: success[500], // #93E850 - полностью залитый зеленый круг
      unchecked: '#1A1A1A', // Темный фон
      borderChecked: success[500], // #93E850
      borderUnchecked: neutral[600], // #757575 - более светлая граница для темной темы
    },
    // Цвета для outline варианта
    outline: {
      checked: '#1A1A1A', // Темный фон даже при checked
      unchecked: '#1A1A1A', // Темный фон
      borderChecked: success[500], // #93E850
      borderUnchecked: neutral[600], // #757575
      dot: success[500], // #93E850 - цвет точки внутри круга
    },
    // Цвета для состояний
    disabled: {
      background: '#2A2A2A', // backgroundTertiary для темной темы
      border: neutral[500], // #9E9E9E - borderTertiary для темной темы
    },
    // Цвета для focus состояния
    focus: {
      outline: success.bg, // #E9FADC - Success/bg (аналогично светлой теме)
    },
    // Цвета для hover состояния
    hover: {
      borderChecked: success[500], // #93E850
      borderUnchecked: neutral[500], // #9E9E9E - более светлая граница для темной темы
    },
    // Цвета для ошибок
    error: {
      border: danger[400], // #FF5858 - более светлый для темной темы
      text: danger[300], // #FF8282
    },
    // Цвета для статусов
    status: {
      success: {
        border: success[500], // #93E850
      },
      error: {
        border: danger[400], // #FF5858
      },
      warning: {
        border: warning[400], // #FFE55F
      },
    },
    // Цвета для индикатора обязательности
    required: {
      indicator: danger[400], // #FF5858
    },
  },

  // Типографика (аналогично светлой теме, но с другими цветами)
  typography: {
    label: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '1.4285714285714286em',
      fontFamily: "'Montserrat', sans-serif",
      color: '#FFFFFF', // Белый текст для темной темы
      colorDisabled: neutral[500], // #9E9E9E - неактивный текст
    },
    extraText: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '1.4em',
      fontFamily: "'Montserrat', sans-serif",
      color: neutral[400], // #C2C2C2 - вторичный текст для темной темы
      colorDisabled: neutral[500], // #9E9E9E
    },
    helperText: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '1.4em',
      fontFamily: "'Montserrat', sans-serif",
      color: neutral[400], // #C2C2C2 - вспомогательный текст для темной темы
    },
    errorText: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '1.4em',
      fontFamily: "'Montserrat', sans-serif",
      color: danger[300], // #FF8282 - текст ошибки для темной темы
    },
  },

  // Отступы и промежутки (аналогично светлой теме)
  spacing: {
    container: '8px',
    textContainer: '4px',
    groupLabel: '8px',
    groupHorizontal: '16px',
    groupVertical: '12px',
    icon: {
      left: '8px', // Отступ иконки слева
      right: '8px', // Отступ иконки справа
    },
    errorText: '4px', // Отступ сверху для текста ошибки
    helperText: '4px', // Отступ сверху для вспомогательного текста
  },

  // Анимации (аналогично светлой теме)
  animations: {
    transition: 'all 0.3s ease',
    dotScale: 'transform 0.3s ease',
  },

  // Дополнительные настройки (аналогично светлой теме)
  settings: {
    borderWidth: '2px',
    borderRadius: '50%',
    focusOutlineWidth: '2px',
    focusOutlineOffset: '2px',
    disabledOpacity: 0.5,
  },
};
