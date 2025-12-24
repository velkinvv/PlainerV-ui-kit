import type { RadioButtonTheme } from '../../types/theme';
import { Size } from '../../types/sizes';
import { success } from '../../variables/colors/success';
import { neutral } from '../../variables/colors/neutral';
import { danger } from '../../variables/colors/danger';
import { warning } from '../../variables/colors/warning';

/**
 * Светлая тема для радиокнопок
 * Определяет все стили радиокнопок для светлой темы
 */
export const lightRadioButtonTheme: RadioButtonTheme = {
  // Размеры радиокнопок
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

  // Цвета радиокнопок
  colors: {
    // Цвета для filled варианта
    filled: {
      checked: success[500], // #93E850 - полностью залитый зеленый круг
      unchecked: '#FFFFFF', // Белый фон
      borderChecked: success[500], // #93E850
      borderUnchecked: neutral[300], // #E0E0E0 - вторичная граница
    },
    // Цвета для outline варианта
    outline: {
      checked: '#FFFFFF', // Белый фон даже при checked
      unchecked: '#FFFFFF', // Белый фон
      borderChecked: success[500], // #93E850
      borderUnchecked: neutral[300], // #E0E0E0
      dot: success[500], // #93E850 - цвет точки внутри круга
    },
    // Цвета для состояний
    disabled: {
      background: '#F5F5F5', // backgroundTertiary
      border: neutral[400], // #C2C2C2 - borderTertiary
    },
    // Цвета для focus состояния
    focus: {
      outline: success.bg, // #E9FADC - Success/bg
    },
    // Цвета для hover состояния
    hover: {
      borderChecked: success[500], // #93E850
      borderUnchecked: neutral[300], // #E0E0E0
    },
    // Цвета для ошибок
    error: {
      border: danger[500], // #FF2E2E
      text: danger[600], // #DB2525
    },
    // Цвета для статусов
    status: {
      success: {
        border: success[500], // #93E850
      },
      error: {
        border: danger[500], // #FF2E2E
      },
      warning: {
        border: warning[500], // #FFDF37
      },
    },
    // Цвета для индикатора обязательности
    required: {
      indicator: danger[500], // #FF2E2E
    },
  },

  // Типографика
  typography: {
    label: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '1.4285714285714286em',
      fontFamily: "'Montserrat', sans-serif",
      color: neutral[800], // #424242 - Gray_02 / 9O
      colorDisabled: neutral[400], // #C2C2C2 - Gray_02 / 5O
    },
    extraText: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '1.4em',
      fontFamily: "'Montserrat', sans-serif",
      color: neutral[600], // #757575 - вторичный текст
      colorDisabled: neutral[400], // #C2C2C2
    },
    helperText: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '1.4em',
      fontFamily: "'Montserrat', sans-serif",
      color: neutral[600], // #757575 - вспомогательный текст
    },
    errorText: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '1.4em',
      fontFamily: "'Montserrat', sans-serif",
      color: danger[600], // #DB2525 - текст ошибки
    },
  },

  // Отступы и промежутки
  spacing: {
    container: '8px', // Gap между кнопкой и текстом
    textContainer: '4px', // Gap между лейблом и дополнительным текстом
    groupLabel: '8px', // Отступ снизу для лейбла группы
    groupHorizontal: '16px', // Gap между радиокнопками в горизонтальной группе
    groupVertical: '12px', // Gap между радиокнопками в вертикальной группе
    icon: {
      left: '8px', // Отступ иконки слева
      right: '8px', // Отступ иконки справа
    },
    errorText: '4px', // Отступ сверху для текста ошибки
    helperText: '4px', // Отступ сверху для вспомогательного текста
  },

  // Анимации
  animations: {
    transition: 'all 0.3s ease',
    dotScale: 'transform 0.3s ease',
  },

  // Дополнительные настройки
  settings: {
    borderWidth: '2px', // Толщина обводки
    borderRadius: '50%', // Радиус скругления круга
    focusOutlineWidth: '2px', // Толщина outline при focus
    focusOutlineOffset: '2px', // Отступ outline при focus
    disabledOpacity: 0.5, // Прозрачность при disabled
  },
};
