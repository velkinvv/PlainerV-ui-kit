import type { Size, ModalSize } from './sizes';
import type { FontFamily, FontWeight, FontSize, LineHeight, Typography } from './fonts';

/**
 * Типы теней для компонентов
 * Определяет все доступные тени для элементов интерфейса
 */
export type BoxShadowType = {
  // Базовые уровни теней
  sm: string; // Маленькая тень
  md: string; // Средняя тень
  lg: string; // Большая тень
  xl: string; // Очень большая тень

  // Акцентные тени
  primary: string; // Primary акцент
  success: string; // Success акцент
  warning: string; // Warning акцент
  danger: string; // Danger акцент

  // Специальные тени
  inputFocus: string; // Фокус на полях ввода
  notification: string; // Уведомления
  tooltip: string; // Тултипы
  dropdown: string; // Дропдауны
  modal: string; // Модальные окна
  cardHover: string; // Карточки при наведении

  // Тени для статусов аватаров
  avatarOnline: string; // Онлайн статус
  avatarOffline: string; // Офлайн статус
  avatarDanger: string; // Опасный статус
  avatarWarning: string; // Предупреждающий статус
};

/**
 * Типы размытия для компонентов
 * Определяет готовые CSS классы для размытия
 */
export type BlurType = {
  none: string; // Без размытия
  sm: string; // Маленькое размытие
  md: string; // Среднее размытие
  lg: string; // Большое размытие
  xl: string; // Очень большое размытие
  '2xl': string; // Экстра большое размытие
  '3xl': string; // Максимальное размытие

  // Классы с дополнительными эффектами
  glass: string; // Эффект стекла
  glassLight: string; // Легкий эффект стекла
  glassStrong: string; // Сильный эффект стекла

  // Классы для фильтрации самого элемента
  filterSm: string; // Фильтр маленького размытия
  filterMd: string; // Фильтр среднего размытия
  filterLg: string; // Фильтр большого размытия
};

/**
 * Упрощенная цветовая схема темы
 * Содержит только основные цвета без избыточных значений
 */
export type ColorTheme = {
  // Основные цвета
  primary: string; // Основной акцентный цвет
  secondary: string; // Вторичный цвет

  // Фоновые цвета
  background: string; // Основной фон страницы
  backgroundSecondary: string; // Фон для карточек и панелей

  // Текстовые цвета
  text: string; // Основной текст
  textSecondary: string; // Вторичный текст

  // Граничные цвета
  border: string; // Основные границы
  borderSecondary: string; // Вторичные границы

  // Состояния
  success: string; // Цвет успеха
  danger: string; // Цвет ошибки
  warning: string; // Цвет предупреждения
  info: string; // Информационный цвет

  // Специальные цвета
  overlay: string; // Цвет оверлея
  shadow: string; // Основная тень
  transparent: string; // Прозрачный цвет
};

/**
 * Тип для цветовой палитры
 * Определяет оттенки цвета от 50 до 900 + акцентные цвета
 */
export type ColorType = {
  50: string; // Самый светлый оттенок
  100: string; // Очень светлый оттенок
  200: string; // Светлый оттенок
  300: string; // Средне-светлый оттенок
  400: string; // Средний оттенок
  500: string; // Основной оттенок
  600: string; // Средне-темный оттенок
  700: string; // Темный оттенок
  800: string; // Очень темный оттенок
  900: string; // Самый темный оттенок
  A100: string; // Акцентный светлый
  A200: string; // Акцентный средний
  A400: string; // Акцентный темный
  A700: string; // Акцентный очень темный
};

/**
 * Типизация для цветовой палитры, представленной на изображении.
 *
 * Цвета разбиты на группы: Neutral, Primary, Success, Warning, Danger.
 * Для каждой группы определены ключи, соответствующие оттенкам из макета.
 */

/**
 * Тип для нейтральной палитры (Neutral)
 *
 * 900 - самый тёмный, 10 - самый светлый
 */
export type NeutralPalette = {
  900: string; // #141A1A
  800: string; // #2A2A2A
  700: string; // #4A4A4A
  600: string; // #656565
  500: string; // #929C9C
  400: string; // #B6B6B6
  300: string; // #E0E0E0
  200: string; // #EDEDED
  100: string; // #F6F6F6
  10: string; // #FFFFFF
};

/**
 * Тип для основной палитры (Primary)
 *
 * bg - фон, 50-900 - градации основного цвета, A100-A700 - акцентные оттенки
 */
export type PrimaryPalette = {
  bg: string; // #F6FBFF - фон
  50: string; // #E3F2FD - самый светлый оттенок
  100: string; // #BBDEFB
  200: string; // #90CAF9
  300: string; // #64B5F6
  400: string; // #42A5F5
  500: string; // #2196F3
  600: string; // #1E88E5
  700: string; // #1976D2
  800: string; // #1565C0
  900: string; // #0D47A1
  A100: string; // #82B1FF - акцентный светлый
  A200: string; // #448AFF - акцентный средний
  A400: string; // #2979FF - акцентный тёмный
  A700: string; // #2962FF - акцентный очень тёмный
};

/**
 * Тип для палитры успеха (Success)
 *
 * bg - фон, 200-600 - градации зелёного цвета успеха
 *
 * bg:   #E9FADC
 * 200:  #D4F6B9
 * 300:  #BEF196
 * 400:  #A9ED73
 * 500:  #93E850
 * 600:  #7FCD43
 */
export type SuccessPalette = {
  bg: string; // #E9FADC - фон
  200: string; // #D4F6B9
  300: string; // #BEF196
  400: string; // #A9ED73
  500: string; // #93E850
  600: string; // #7FCD43
};

/**
 * Тип для палитры предупреждения (Warning)
 *
 * bg - фон, 100-600 - градации жёлтого цвета предупреждения
 *
 * bg:   #FAF7E6
 * 100:  #FFF9D7
 * 200:  #FFF2AF
 * 300:  #FFEC87
 * 400:  #FFE55F
 * 500:  #FFD32C
 * 600:  #FFDF37
 */
export type WarningPalette = {
  bg: string; // #FAF7E6 - фон
  100: string; // #FFF9D7
  200: string; // #FFF2AF
  300: string; // #FFEC87
  400: string; // #FFE55F
  500: string; // #FFD32C
  600: string; // #FFDF37
};

/**
 * Тип для палитры опасности (Danger)
 *
 * bg - фон, 100-600 - градации красного цвета опасности
 *
 * bg:   #FFF2F2
 * 100:  #FFD5D5
 * 200:  #FFBABA
 * 300:  #FF8282
 * 400:  #FF5858
 * 500:  #FF2E2E
 * 600:  #DB2525
 */
export type DangerPalette = {
  bg: string; // #FFF2F2 - фон
  100: string; // #FFD5D5
  200: string; // #FFBABA
  300: string; // #FF8282
  400: string; // #FF5858
  500: string; // #FF2E2E
  600: string; // #DB2525
};

/**
 * Общий тип для всей палитры приложения
 */
export type AppPalette = {
  neutral: NeutralPalette;
  primary: PrimaryPalette;
  success: SuccessPalette;
  warning: WarningPalette;
  danger: DangerPalette;
};

/**
 * Тип для светлой и темной версии цвета
 */
export type ColorToneType = {
  light: string; // Светлая версия цвета
  dark: string; // Темная версия цвета
};

/**
 * Тип для фоновых цветов темы
 * Содержит только цвета фонов для светлой и тёмной темы
 */
export type Colors = {
  // Основные фоновые цвета
  background: string; // Основной фон страницы
  backgroundSecondary: string; // Фон для карточек и панелей
  backgroundTertiary: string; // Фон для элементов интерфейса
  backgroundQuaternary: string; // Фон для неактивных элементов
  backgroundQuinary: string; // Дополнительный фоновый цвет

  // Специальные фоновые цвета
  card: string; // Фон карточек
  input: string; // Фон полей ввода
  avatarBackground: string; // Фон для аватаров
  progressBackground: string; // Фон для прогресс-баров
  progressTrack: string; // Цвет трека прогресс-бара
  progressFill: string; // Цвет заполнения прогресса
  progressFillHover?: string; // Цвет заполнения при ховере/активном состоянии
  progressValue: string; // Цвет значения прогресса (текст)
  progressStatusAwait: string; // Цвет прогресса в статусе ожидания
  progressStatusLoading: string; // Цвет прогресса в статусе загрузки
  progressStatusSuccess: string; // Цвет прогресса в статусе успеха
  progressStatusError: string; // Цвет прогресса в статусе ошибки
  imageBackground: string; // Фон для изображений

  // Текстовые цвета
  text: string; // Основной текст
  textSecondary: string; // Вторичный текст
  textTertiary: string; // Третичный текст

  // Основные цвета
  primary: string; // Основной цвет
  primaryHover: string; // Основной цвет при наведении
  primaryActive: string; // Основной цвет при нажатии
  secondary: string; // Вторичный цвет
  secondaryHover: string; // Вторичный цвет при наведении

  // Граничные цвета
  border: string; // Основная граница
  borderSecondary: string; // Вторичная граница
  borderTertiary: string; // Третичная граница

  // Состояния
  success: string; // Успех
  warning: string; // Предупреждение
  danger: string; // Опасность
  info: string; // Информация

  // Специальные цвета
  overlay: string; // Наложение
  shadow: string; // Тень
  transparent: string; // Прозрачный
};

/**
 * Тип для всех цветов приложения
 * Объединяет основные цвета с их светлыми и темными версиями
 */
export type ColorsType = {
  neutral: NeutralPalette; // Нейтральная палитра
  primary: PrimaryPalette; // Основная палитра
  success: SuccessPalette; // Палитра успеха
  warning: WarningPalette; // Палитра предупреждения
  danger: DangerPalette; // Палитра опасности

  // primary: ColorToneType; // Основной цвет
  // secondary: ColorToneType; // Вторичный цвет
  // success: ColorToneType; // Цвет успеха
  // danger: ColorToneType; // Цвет ошибки
  // warning: ColorToneType; // Цвет предупреждения
  info: ColorToneType; // Информационный цвет

  background: ColorToneType; // Фоновый цвет
  elementColor: ColorToneType; // Цвет элементов
  textColor: ColorToneType; // Цвет текста

  // Дополнительные цвета для компонентов
  text: string; // Основной текст
  border: string; // Основные границы
  card: string; // Фон карточек
  input: string; // Фон полей ввода
  muted: string; // Приглушенный цвет

  svgFilter?: string; // Фильтр для SVG иконок
};

/**
 * Тип для медиа-запросов
 * Определяет точки останова для адаптивного дизайна
 */
export type MediaType = {
  extraLarge: string; // Очень большие экраны (1200px+)
  large: string; // Большие экраны (992px+)
  medium: string; // Средние экраны (768px+)
  small: string; // Маленькие экраны (576px+)
};

/**
 * Тип для размеров основных элементов
 * Определяет высоту/ширину ключевых компонентов
 */
export type SizesType = {
  header: { height: number }; // Высота заголовка
  container: { width: number }; // Ширина контейнера
  footer: { height: number }; // Высота подвала
  modal: { width: number }; // Ширина модального окна
};

/**
 * Тип для длительностей анимаций
 * Определяет время переходов и анимаций
 */
export type DurationsType = {
  ms300: number; // 300 миллисекунд для плавных переходов
};

/**
 * Тип для z-index значений
 * Определяет порядок наложения элементов
 */
export type ZIndexType = {
  header: number; // Z-index для заголовка
  modal: number; // Z-index для модальных окон
};

/**
 * Тема для кнопок
 * Определяет все настройки стилизации кнопок
 */
export type ButtonTheme = {
  // Размеры кнопок
  sizes: {
    [Size.XS]: {
      minHeight: string;
      padding: string;
      fontSize: string;
      borderRadius: string;
      gap: string;
      minWidth?: string;
    };
    [Size.SM]: {
      minHeight: string;
      padding: string;
      fontSize: string;
      borderRadius: string;
      gap: string;
      minWidth?: string;
    };
    [Size.MD]: {
      minHeight: string;
      padding: string;
      fontSize: string;
      borderRadius: string;
      gap: string;
      minWidth?: string;
    };
    [Size.LG]: {
      minHeight: string;
      padding: string;
      fontSize: string;
      borderRadius: string;
      gap: string;
      minWidth?: string;
    };
    [Size.XL]: {
      minHeight: string;
      padding: string;
      fontSize: string;
      borderRadius: string;
      gap: string;
      minWidth?: string;
    };
  };

  // Варианты кнопок
  variants: {
    primary: {
      background: string;
      color: string;
      border: string;
      hover: {
        background: string;
        border: string;
        color?: string;
      };
      active: {
        background: string;
        border: string;
        color?: string;
      };
      focus: {
        border: string;
        outline?: string;
      };
      disabled: {
        background: string;
        border: string;
        color: string;
      };
    };
    secondary: {
      background: string;
      color: string;
      border: string;
      hover: {
        background: string;
        border: string;
        color?: string;
      };
      active: {
        background: string;
        border: string;
        color?: string;
      };
      focus: {
        border: string;
        outline?: string;
      };
      disabled: {
        background: string;
        border: string;
        color: string;
      };
    };
    outline: {
      background: string;
      color: string;
      border: string;
      hover: {
        background: string;
        border: string;
        color: string;
      };
      active: {
        background: string;
        border: string;
        color: string;
      };
      focus: {
        border: string;
        outline?: string;
      };
      disabled: {
        background: string;
        border: string;
        color: string;
      };
    };
    line: {
      background: string;
      color: string;
      border: string;
      textDecoration: string;
      hover: {
        background: string;
        border: string;
        color: string;
        textDecoration: string;
      };
      active: {
        background: string;
        border: string;
        color: string;
      };
      focus: {
        border: string;
        outline?: string;
      };
      disabled: {
        background: string;
        border: string;
        color: string;
        textDecoration: string;
      };
    };
    ghost: {
      background: string;
      color: string;
      border: string;
      hover: {
        background: string;
        border: string;
        color: string;
      };
      active: {
        background: string;
        border: string;
        color: string;
      };
      focus: {
        border: string;
        outline?: string;
      };
      disabled: {
        background: string;
        border: string;
        color: string;
      };
    };
    danger: {
      background: string;
      color: string;
      border: string;
      hover: {
        background: string;
        border: string;
        color?: string;
      };
      active: {
        background: string;
        border: string;
        color?: string;
      };
      focus: {
        border: string;
        outline?: string;
      };
      disabled: {
        background: string;
        border: string;
        color: string;
      };
    };
    success: {
      background: string;
      color: string;
      border: string;
      hover: {
        background: string;
        border: string;
        color?: string;
      };
      active: {
        background: string;
        border: string;
        color?: string;
      };
      focus: {
        border: string;
        outline?: string;
      };
      disabled: {
        background: string;
        border: string;
        color: string;
      };
    };
    warning: {
      background: string;
      color: string;
      border: string;
      hover: {
        background: string;
        border: string;
        color?: string;
      };
      active: {
        background: string;
        border: string;
        color?: string;
      };
      focus: {
        border: string;
        outline?: string;
      };
      disabled: {
        background: string;
        border: string;
        color: string;
      };
    };
    skeleton: {
      background: string;
      backgroundSize: string;
      backgroundPosition: string;
      color: string;
      border: string;
      animation: string;
      hover: {
        background: string;
        backgroundSize: string;
        backgroundPosition: string;
        color: string;
        border: string;
        animation: string;
      };
      active: {
        background: string;
        backgroundSize: string;
        backgroundPosition: string;
        color: string;
        border: string;
        animation: string;
      };
      focus: {
        border: string;
        outline?: string;
      };
      disabled: {
        background: string;
        backgroundSize: string;
        backgroundPosition: string;
        color: string;
        border: string;
        animation: string;
      };
    };
  };

  // Анимации и эффекты
  animations: {
    transition: string;
    hoverScale: number;
    tapScale: number;
    loadingSpinner: {
      size: string;
      color: string;
      animation: string;
    };
    skeleton: {
      animation: string;
    };
  };

  // Дополнительные настройки
  settings: {
    fontFamily: string;
    fontWeight: {
      default: number;
      large: number; // Для LG размера
    };
    lineHeight: string;
    textAlign: string;
    userSelect: string;
    whiteSpace: string;
    cursor: {
      default: string;
      disabled: string;
      loading: string;
    };
  };
};

/**
 * Тема для бейджей
 * Определяет все настройки стилизации бейджей
 */
export type BadgeTheme = {
  // Размеры бейджей
  sizes: {
    [Size.XS]: {
      minHeight: string;
      minWidth: string;
      padding: string;
      fontSize: string;
      borderRadius: string;
      gap: string;
    };
    [Size.SM]: {
      minHeight: string;
      minWidth: string;
      padding: string;
      fontSize: string;
      borderRadius: string;
      gap: string;
    };
    [Size.MD]: {
      minHeight: string;
      minWidth: string;
      padding: string;
      fontSize: string;
      borderRadius: string;
      gap: string;
    };
    [Size.LG]: {
      minHeight: string;
      minWidth: string;
      padding: string;
      fontSize: string;
      borderRadius: string;
      gap: string;
    };
    [Size.XL]: {
      minHeight: string;
      minWidth: string;
      padding: string;
      fontSize: string;
      borderRadius: string;
      gap: string;
    };
  };

  // Dot размеры (специальные для точечных бейджей)
  dotSizes: {
    [Size.XS]: {
      width: string;
      height: string;
      borderRadius: string;
      padding: string;
      fontSize: string;
    };
    [Size.SM]: {
      width: string;
      height: string;
      borderRadius: string;
      padding: string;
      fontSize: string;
    };
    [Size.MD]: {
      width: string;
      height: string;
      borderRadius: string;
      padding: string;
      fontSize: string;
    };
    [Size.LG]: {
      width: string;
      height: string;
      borderRadius: string;
      padding: string;
      fontSize: string;
    };
    [Size.XL]: {
      width: string;
      height: string;
      borderRadius: string;
      padding: string;
      fontSize: string;
    };
  };

  // Варианты бейджей
  variants: {
    default: {
      background: string;
      color: string;
      border?: string;
      boxShadow?: string;
    };
    defaultMain: {
      background: string;
      color: string;
      border?: string;
      boxShadow?: string;
    };
    defaultMainInversion: {
      background: string;
      color: string;
      border?: string;
      boxShadow?: string;
    };
    defaultSuccess: {
      background: string;
      color: string;
      border?: string;
      boxShadow?: string;
    };
    disable: {
      background: string;
      color: string;
      border?: string;
      boxShadow?: string;
    };
    outline: {
      background: string;
      color: string;
      border: string;
      boxShadow?: string;
    };
    outlineInversion: {
      background: string;
      color: string;
      border: string;
      boxShadow?: string;
    };
    // Обратная совместимость
    primary: {
      background: string;
      color: string;
      border?: string;
      boxShadow?: string;
    };
    secondary: {
      background: string;
      color: string;
      border?: string;
      boxShadow?: string;
    };
    success: {
      background: string;
      color: string;
      border?: string;
      boxShadow?: string;
    };
    danger: {
      background: string;
      color: string;
      border?: string;
      boxShadow?: string;
    };
    warning: {
      background: string;
      color: string;
      border?: string;
      boxShadow?: string;
    };
    info: {
      background: string;
      color: string;
      border?: string;
      boxShadow?: string;
    };
  };

  // Анимации и эффекты
  animations: {
    transition: string;
    hoverScale: number;
    tapScale: number;
  };

  // Дополнительные настройки
  settings: {
    fontFamily: string;
    fontWeight: number;
    lineHeight: string;
    textAlign: string;
    userSelect: string;
    whiteSpace: string;
    cursor: {
      default: string;
      clickable: string;
    };
  };
};

export type AccordionTheme = {
  // Размеры аккордеона
  sizes: {
    [Size.XS]: {
      padding: string;
      fontSize: string;
      lineHeight: string;
      gap: string;
    };
    [Size.SM]: {
      padding: string;
      fontSize: string;
      lineHeight: string;
      gap: string;
    };
    [Size.MD]: {
      padding: string;
      fontSize: string;
      lineHeight: string;
      gap: string;
    };
    [Size.LG]: {
      padding: string;
      fontSize: string;
      lineHeight: string;
      gap: string;
    };
    [Size.XL]: {
      padding: string;
      fontSize: string;
      lineHeight: string;
      gap: string;
    };
  };

  // Размеры контента
  contentSizes: {
    [Size.XS]: {
      padding: string;
      fontSize: string;
      lineHeight: string;
    };
    [Size.SM]: {
      padding: string;
      fontSize: string;
      lineHeight: string;
    };
    [Size.MD]: {
      padding: string;
      fontSize: string;
      lineHeight: string;
    };
    [Size.LG]: {
      padding: string;
      fontSize: string;
      lineHeight: string;
    };
    [Size.XL]: {
      padding: string;
      fontSize: string;
      lineHeight: string;
    };
  };

  // Размеры подзаголовка
  subtitleSizes: {
    [Size.XS]: {
      fontSize: string;
      lineHeight: string;
    };
    [Size.SM]: {
      fontSize: string;
      lineHeight: string;
    };
    [Size.MD]: {
      fontSize: string;
      lineHeight: string;
    };
    [Size.LG]: {
      fontSize: string;
      lineHeight: string;
    };
    [Size.XL]: {
      fontSize: string;
      lineHeight: string;
    };
  };

  // Размеры иконки
  iconSizes: {
    [Size.XS]: {
      width: string;
      height: string;
    };
    [Size.SM]: {
      width: string;
      height: string;
    };
    [Size.MD]: {
      width: string;
      height: string;
    };
    [Size.LG]: {
      width: string;
      height: string;
    };
    [Size.XL]: {
      width: string;
      height: string;
    };
  };

  // Варианты аккордеона
  variants: {
    default: {
      background: string;
      color: string;
      border?: string;
      boxShadow?: string;
    };
    hover: {
      background: string;
      color: string;
      border?: string;
      boxShadow?: string;
    };
    disabled: {
      background: string;
      color: string;
      border?: string;
      boxShadow?: string;
    };
  };

  // Позиции элементов
  positions: {
    start: {
      borderRadius: string;
      borderTop?: string;
      borderBottom?: string;
      borderLeft?: string;
      borderRight?: string;
    };
    center: {
      borderRadius: string;
      borderTop?: string;
      borderBottom?: string;
      borderLeft?: string;
      borderRight?: string;
    };
    last: {
      borderRadius: string;
      borderTop?: string;
      borderBottom?: string;
      borderLeft?: string;
      borderRight?: string;
    };
  };

  // Анимации и эффекты
  animations: {
    transition: string;
    chevronTransition: string;
    contentTransition: {
      duration: number;
      ease: string;
    };
  };

  // Дополнительные настройки
  settings: {
    fontFamily: string;
    fontWeight: {
      title: number;
      subtitle: number;
      content: number;
    };
    textAlign: string;
    userSelect: string;
    cursor: {
      default: string;
      clickable: string;
    };
    overflow: string;
    zIndex: number;
  };
};

export type AvatarTheme = {
  // Размеры аватара
  sizes: {
    [Size.XS]: {
      width: string;
      height: string;
      fontSize: string;
      lineHeight: string;
    };
    [Size.SM]: {
      width: string;
      height: string;
      fontSize: string;
      lineHeight: string;
    };
    [Size.MD]: {
      width: string;
      height: string;
      fontSize: string;
      lineHeight: string;
    };
    [Size.LG]: {
      width: string;
      height: string;
      fontSize: string;
      lineHeight: string;
    };
    [Size.XL]: {
      width: string;
      height: string;
      fontSize: string;
      lineHeight: string;
    };
  };

  // Размеры иконок
  iconSizes: {
    [Size.XS]: {
      width: string;
      height: string;
    };
    [Size.SM]: {
      width: string;
      height: string;
    };
    [Size.MD]: {
      width: string;
      height: string;
    };
    [Size.LG]: {
      width: string;
      height: string;
    };
    [Size.XL]: {
      width: string;
      height: string;
    };
  };

  // Размеры индикаторов статуса
  statusSizes: {
    [Size.XS]: {
      width: string;
      height: string;
      top: string;
      right: string;
    };
    [Size.SM]: {
      width: string;
      height: string;
      top: string;
      right: string;
    };
    [Size.MD]: {
      width: string;
      height: string;
      top: string;
      right: string;
    };
    [Size.LG]: {
      width: string;
      height: string;
      top: string;
      right: string;
    };
    [Size.XL]: {
      width: string;
      height: string;
      top: string;
      right: string;
    };
  };

  // Размеры кнопок
  buttonSizes: {
    [Size.XS]: {
      width: string;
      height: string;
    };
    [Size.SM]: {
      width: string;
      height: string;
    };
    [Size.MD]: {
      width: string;
      height: string;
    };
    [Size.LG]: {
      width: string;
      height: string;
    };
    [Size.XL]: {
      width: string;
      height: string;
    };
  };

  // Варианты аватара
  variants: {
    default: {
      background: string;
      color: string;
      border?: string;
      boxShadow?: string;
    };
    hover: {
      background: string;
      color: string;
      border?: string;
      boxShadow?: string;
    };
    active: {
      background: string;
      color: string;
      border?: string;
      boxShadow?: string;
    };
    disabled: {
      background: string;
      color: string;
      border?: string;
      boxShadow?: string;
    };
  };

  // Статусы аватара
  statuses: {
    online: {
      background: string;
      boxShadow?: string; // Применяется в styled-components из theme.boxShadow.avatarOnline
    };
    offline: {
      background: string;
      boxShadow?: string; // Применяется в styled-components из theme.boxShadow.avatarOffline
    };
    danger: {
      background: string;
      boxShadow?: string; // Применяется в styled-components из theme.boxShadow.avatarDanger
    };
    warning: {
      background: string;
      boxShadow?: string; // Применяется в styled-components из theme.boxShadow.avatarWarning
    };
  };

  // Состояния аватара
  states: {
    overlay: {
      background: string;
    };
    close: {
      background: string;
      color: string;
    };
  };

  // Анимации и эффекты
  animations: {
    transition: string;
    hoverScale: number;
    tapScale: number;
  };

  // Дополнительные настройки
  settings: {
    fontFamily: string;
    fontWeight: number;
    borderRadius: string;
    overflow: string;
    cursor: {
      default: string;
      clickable: string;
    };
    userSelect: string;
    zIndex: {
      base: number;
      overlay: number;
      status: number;
    };
  };
};

export type AvatarGroupTheme = {
  // Размеры группы аватаров
  sizes: {
    [Size.XS]: {
      spacing: string;
      borderWidth: string;
      fontSize: string;
      lineHeight: string;
    };
    [Size.SM]: {
      spacing: string;
      borderWidth: string;
      fontSize: string;
      lineHeight: string;
    };
    [Size.MD]: {
      spacing: string;
      borderWidth: string;
      fontSize: string;
      lineHeight: string;
    };
    [Size.LG]: {
      spacing: string;
      borderWidth: string;
      fontSize: string;
      lineHeight: string;
    };
    [Size.XL]: {
      spacing: string;
      borderWidth: string;
      fontSize: string;
      lineHeight: string;
    };
  };

  // Варианты группы
  variants: {
    stack: {
      marginLeft: string;
      zIndex: {
        base: number;
        max: number;
      };
    };
    row: {
      gap: string;
    };
    grid: {
      columns: number;
      rows: number;
      gap: string;
    };
  };

  // Счетчик дополнительных аватаров
  counter: {
    background: string;
    color: string;
    border: string;
    borderRadius: string;
    fontFamily: string;
    fontWeight: number;
    cursor: string;
    transition: string;
    hover: {
      background: string;
      transform: string;
    };
  };

  // Ободок вокруг аватаров
  avatarBorder: {
    color: string;
  };

  // Анимации и эффекты
  animations: {
    transition: string;
    hoverScale: number;
  };

  // Дополнительные настройки
  settings: {
    lineHeight: string;
    flexShrink: number;
  };
};

/**
 * Тема для dropdown
 * Определяет все настройки стилизации dropdown
 */
export type DropdownTheme = {
  // Размеры dropdown
  sizes: {
    [Size.XS]: {
      minWidth: string;
      maxWidth: string;
      padding: string;
      fontSize: string;
      borderRadius: string;
      gap: string;
    };
    [Size.SM]: {
      minWidth: string;
      maxWidth: string;
      padding: string;
      fontSize: string;
      borderRadius: string;
      gap: string;
    };
    [Size.MD]: {
      minWidth: string;
      maxWidth: string;
      padding: string;
      fontSize: string;
      borderRadius: string;
      gap: string;
    };
    [Size.LG]: {
      minWidth: string;
      maxWidth: string;
      padding: string;
      fontSize: string;
      borderRadius: string;
      gap: string;
    };
    [Size.XL]: {
      minWidth: string;
      maxWidth: string;
      padding: string;
      fontSize: string;
      borderRadius: string;
      gap: string;
    };
  };

  // Варианты dropdown
  variants: {
    default: {
      background: string;
      color: string;
      border: string;
      // boxShadow применяется в styled-components из theme.boxShadow.dropdown
    };
    elevated: {
      background: string;
      color: string;
      border: string;
      // boxShadow применяется в styled-components из theme.boxShadow.dropdown
    };
    outlined: {
      background: string;
      color: string;
      border: string;
      // boxShadow применяется в styled-components из theme.boxShadow.dropdown
    };
  };

  // Состояния dropdown
  states: {
    hover: {
      background: string;
      color: string;
      fontWeight?: number;
    };
    focus: {
      background: string;
      color: string;
      border: string;
      fontWeight?: number;
    };
    active: {
      background: string;
      color: string;
      fontWeight?: number;
    };
    disabled: {
      background: string;
      color: string;
      opacity: number;
      cursor: string;
      fontWeight?: number;
    };
    selected: {
      background: string;
      color: string;
      fontWeight?: number;
    };
  };

  // Анимации и эффекты
  animations: {
    transition: string;
    openAnimation: {
      duration: string;
      easing: string;
      transform: string;
    };
    closeAnimation: {
      duration: string;
      easing: string;
      transform: string;
    };
  };

  // Дополнительные настройки
  settings: {
    zIndex: number;
    backdropFilter: string;
    fontFamily: string;
    fontWeight: number;
    lineHeight: string;
    textAlign: string;
    userSelect: string;
    whiteSpace: string;
    cursor: {
      default: string;
      disabled: string;
    };
  };
};

export type CardTheme = {
  // Размеры карточки
  sizes: {
    [Size.XS]: {
      minHeight: string;
      padding: string;
      borderRadius: string;
    };
    [Size.SM]: {
      minHeight: string;
      padding: string;
      borderRadius: string;
    };
    [Size.MD]: {
      minHeight: string;
      padding: string;
      borderRadius: string;
    };
    [Size.LG]: {
      minHeight: string;
      padding: string;
      borderRadius: string;
    };
    [Size.XL]: {
      minHeight: string;
      padding: string;
      borderRadius: string;
    };
  };

  // Варианты карточки
  variants: {
    elevated: {
      background: string;
      color: string;
      border?: string;
      boxShadow: string;
    };
    outlined: {
      background: string;
      color: string;
      border: string;
      boxShadow?: string;
    };
    filled: {
      background: string;
      color: string;
      border?: string;
      boxShadow?: string;
    };
  };

  // Состояния карточки
  states: {
    hover: {
      transform: string;
      boxShadow: {
        elevated: string;
        outlined: string;
        filled: string;
      };
    };
    active: {
      transform: string;
    };
    disabled: {
      opacity: number;
      cursor: string;
    };
  };

  // Компоненты карточки
  components: {
    header: {
      marginBottom: string;
      paddingBottom: string;
      borderBottom?: string;
    };
    title: {
      fontFamily: string;
      fontSize: string;
      fontWeight: number;
      lineHeight: string;
      color: string;
      margin: string;
    };
    subtitle: {
      fontFamily: string;
      fontSize: string;
      fontWeight: number;
      lineHeight: string;
      color: string;
      margin: string;
    };
    content: {
      fontFamily: string;
      fontSize: string;
      fontWeight: number;
      lineHeight: string;
      color: string;
    };
    footer: {
      marginTop: string;
      paddingTop: string;
      borderTop?: string;
    };
    actions: {
      gap: string;
    };
  };

  // Анимации и эффекты
  animations: {
    transition: string;
    hoverTransform: string;
    activeTransform: string;
  };

  // Дополнительные настройки
  settings: {
    overflow: string;
    cursor: {
      default: string;
      clickable: string;
    };
    userSelect: string;
    fullWidth: string;
  };
};

/**
 * Тип темы для Hint компонента
 * Определяет все настройки стилизации подсказок
 */
export type HintTheme = {
  // Размеры hint
  sizes: {
    [Size.XS]: {
      fontSize: string;
      lineHeight: string;
      padding: string;
      borderRadius: string;
      gap: string;
    };
    [Size.SM]: {
      fontSize: string;
      lineHeight: string;
      padding: string;
      borderRadius: string;
      gap: string;
    };
    [Size.MD]: {
      fontSize: string;
      lineHeight: string;
      padding: string;
      borderRadius: string;
      gap: string;
    };
    [Size.LG]: {
      fontSize: string;
      lineHeight: string;
      padding: string;
      borderRadius: string;
      gap: string;
    };
    [Size.XL]: {
      fontSize: string;
      lineHeight: string;
      padding: string;
      borderRadius: string;
      gap: string;
    };
  };

  // Варианты hint
  variants: {
    default: {
      background: string;
      color: string;
      border: string;
      boxShadow: string;
    };
    info: {
      background: string;
      color: string;
      border: string;
      boxShadow: string;
    };
    success: {
      background: string;
      color: string;
      border: string;
      boxShadow: string;
    };
    warning: {
      background: string;
      color: string;
      border: string;
      boxShadow: string;
    };
    error: {
      background: string;
      color: string;
      border: string;
      boxShadow: string;
    };
  };

  // Состояния hint
  states: {
    visible: {
      opacity: number;
      visibility: string;
      transform: string;
    };
    hidden: {
      opacity: number;
      visibility: string;
      transform: string;
    };
  };

  // Анимации и эффекты
  animations: {
    transition: string;
    duration: number;
    easing: string;
  };

  // Дополнительные настройки
  settings: {
    maxWidth: number;
    zIndex: number;
    pointerEvents: string;
    userSelect: string;
    whiteSpace: string;
    wordWrap: string;
    display: string;
    alignItems: string;
    justifyContent: string;
  };
};

/**
 * Тип темы для Modal компонента
 * Определяет все настройки стилизации модальных окон
 */
export type ModalTheme = {
  // Размеры модального окна
  sizes: {
    [ModalSize.XS]: {
      width: string;
      maxWidth: string;
      padding: string;
      borderRadius: string;
    };
    [ModalSize.SM]: {
      width: string;
      maxWidth: string;
      padding: string;
      borderRadius: string;
    };
    [ModalSize.MD]: {
      width: string;
      maxWidth: string;
      padding: string;
      borderRadius: string;
    };
    [ModalSize.LG]: {
      width: string;
      maxWidth: string;
      padding: string;
      borderRadius: string;
    };
    [ModalSize.FULL]: {
      width: string;
      height: string;
      padding: string;
      borderRadius: string;
    };
  };

  // Компоненты модального окна
  components: {
    header: {
      padding: string;
      borderBottom: string;
      marginBottom: string;
    };
    title: {
      fontSize: string;
      fontWeight: number;
      lineHeight: string;
      color: string;
    };
    content: {
      padding: string;
    };
    footer: {
      padding: string;
      borderTop: string;
      marginTop: string;
    };
    closeButton: {
      width: string;
      height: string;
      borderRadius: string;
      color: string;
      hoverBackground: string;
      hoverColor: string;
    };
  };

  // Оверлей
  overlay: {
    background: string;
    backdropFilter: string;
    padding: string;
  };

  // Анимации и эффекты
  animations: {
    transition: string;
    openAnimation: {
      duration: string;
      easing: string;
      transform: string;
    };
    closeAnimation: {
      duration: string;
      easing: string;
      transform: string;
    };
  };

  // Дополнительные настройки
  settings: {
    zIndex: number;
    maxHeight: string;
    fontFamily: string;
  };
};

/**
 * Тип темы для Progress компонента
 * Определяет все настройки стилизации прогресс-баров
 */
export type ProgressTheme = {
  // Размеры для линейного прогресса
  linearSizes: {
    [Size.XS]: {
      height: string;
      borderRadius: string;
    };
    [Size.SM]: {
      height: string;
      borderRadius: string;
    };
    [Size.MD]: {
      height: string;
      borderRadius: string;
    };
    [Size.LG]: {
      height: string;
      borderRadius: string;
    };
    [Size.XL]: {
      height: string;
      borderRadius: string;
    };
  };

  // Размеры для кругового прогресса
  circularSizes: {
    [Size.XS]: {
      size: number;
      thickness: number;
    };
    [Size.SM]: {
      size: number;
      thickness: number;
    };
    [Size.MD]: {
      size: number;
      thickness: number;
    };
    [Size.LG]: {
      size: number;
      thickness: number;
    };
    [Size.XL]: {
      size: number;
      thickness: number;
    };
  };

  // Цвета прогресса
  colors: {
    track: string; // Цвет трека прогресса
    fill: string; // Цвет заполнения прогресса (по умолчанию)
    value: string; // Цвет значения прогресса (текст)
    statusAwait: string; // Цвет прогресса в статусе ожидания
    statusLoading: string; // Цвет прогресса в статусе загрузки
    statusSuccess: string; // Цвет прогресса в статусе успеха
    statusError: string; // Цвет прогресса в статусе ошибки
  };

  // Типографика
  typography: {
    label: {
      fontSize: string;
      fontWeight: number;
      lineHeight: string;
    };
    value: {
      linear: {
        fontSize: string;
        fontWeight: number;
        fontFamily: string;
      };
      circular: {
        fontSize: string;
        fontWeight: number;
      };
    };
    description: {
      fontSize: string;
      lineHeight: string;
    };
    stepper: {
      currentStep: {
        fontSize: string;
        fontWeight: number;
      };
      stepCounter: {
        fontSize: string;
        fontWeight: number;
      };
      nextStepInfo: {
        fontSize: string;
        fontWeight: number;
      };
    };
  };

  // Отступы и промежутки
  spacing: {
    root: {
      linear: string;
      circular: string;
    };
    container: string;
    row: string;
    circularWrapper: string;
    circularInfoCard: string;
    stepper: {
      container: string;
      header: string;
    };
  };

  // Анимации
  animations: {
    transition: string;
    defaultDuration: number;
    indeterminate: {
      duration: string;
      easing: string;
    };
    loading: {
      duration: string;
      easing: string;
    };
    checkmark: {
      duration: string;
      easing: string;
    };
  };

  // Дополнительные настройки
  settings: {
    trackShadow: {
      light: string;
      dark: string;
    };
    fillShadow: string;
    minWidth: string;
    checkmarkSize: number; // Множитель размера для галочки (0.3 от размера круга)
    gradient: {
      // Настройки для градиента
      direction: string; // Направление градиента (например, '90deg' для горизонтального)
      // Функция для создания более светлого оттенка цвета (для градиента)
      // Принимает цвет и возвращает более светлый вариант
      lightenAmount: number; // Количество для осветления (0-1)
    };
  };
};

/**
 * Тип темы для RadioButton компонента
 * Определяет все настройки стилизации радиокнопок
 */
export type RadioButtonTheme = {
  // Размеры радиокнопок
  sizes: {
    [Size.SM]: {
      circleSize: string; // Размер круга
      dotSize: string; // Размер точки внутри круга
    };
    [Size.MD]: {
      circleSize: string;
      dotSize: string;
    };
    [Size.LG]: {
      circleSize: string;
      dotSize: string;
    };
  };

  // Цвета радиокнопок
  colors: {
    // Цвета для filled варианта
    filled: {
      checked: string; // Цвет заливки при checked
      unchecked: string; // Цвет заливки при unchecked
      borderChecked: string; // Цвет обводки при checked
      borderUnchecked: string; // Цвет обводки при unchecked
    };
    // Цвета для outline варианта
    outline: {
      checked: string; // Цвет заливки при checked
      unchecked: string; // Цвет заливки при unchecked
      borderChecked: string; // Цвет обводки при checked
      borderUnchecked: string; // Цвет обводки при unchecked
      dot: string; // Цвет точки внутри круга
    };
    // Цвета для состояний
    disabled: {
      background: string; // Фон при disabled
      border: string; // Обводка при disabled
    };
    // Цвета для focus состояния
    focus: {
      outline: string; // Цвет outline при focus
    };
    // Цвета для hover состояния
    hover: {
      borderChecked: string; // Цвет обводки при hover и checked
      borderUnchecked: string; // Цвет обводки при hover и unchecked
    };
    // Цвета для ошибок
    error: {
      border: string; // Цвет обводки при ошибке
      text: string; // Цвет текста ошибки
    };
    // Цвета для статусов
    status: {
      success: {
        border: string; // Цвет обводки при статусе success
      };
      error: {
        border: string; // Цвет обводки при статусе error
      };
      warning: {
        border: string; // Цвет обводки при статусе warning
      };
    };
    // Цвета для индикатора обязательности
    required: {
      indicator: string; // Цвет индикатора обязательности
    };
  };

  // Типографика
  typography: {
    label: {
      fontSize: string;
      fontWeight: number;
      lineHeight: string;
      fontFamily: string;
      color: string; // Цвет лейбла (обычное состояние)
      colorDisabled: string; // Цвет лейбла (disabled состояние)
    };
    extraText: {
      fontSize: string;
      fontWeight: number;
      lineHeight: string;
      fontFamily: string;
      color: string; // Цвет дополнительного текста (обычное состояние)
      colorDisabled: string; // Цвет дополнительного текста (disabled состояние)
    };
    helperText: {
      fontSize: string;
      fontWeight: number;
      lineHeight: string;
      fontFamily: string;
      color: string; // Цвет вспомогательного текста
    };
    errorText: {
      fontSize: string;
      fontWeight: number;
      lineHeight: string;
      fontFamily: string;
      color: string; // Цвет текста ошибки
    };
  };

  // Отступы и промежутки
  spacing: {
    container: string; // Gap между кнопкой и текстом
    textContainer: string; // Gap между лейблом и дополнительным текстом
    groupLabel: string; // Отступ снизу для лейбла группы
    groupHorizontal: string; // Gap между радиокнопками в горизонтальной группе
    groupVertical: string; // Gap между радиокнопками в вертикальной группе
    icon: {
      left: string; // Отступ иконки слева
      right: string; // Отступ иконки справа
    };
    errorText: string; // Отступ сверху для текста ошибки
    helperText: string; // Отступ сверху для вспомогательного текста
  };

  // Анимации
  animations: {
    transition: string; // Переход для всех анимаций
    dotScale: string; // Анимация масштабирования точки
  };

  // Дополнительные настройки
  settings: {
    borderWidth: string; // Толщина обводки
    borderRadius: string; // Радиус скругления круга
    focusOutlineWidth: string; // Толщина outline при focus
    focusOutlineOffset: string; // Отступ outline при focus
    disabledOpacity: number; // Прозрачность при disabled
  };
};

/**
 * Полный тип темы
 * Объединяет все аспекты темы в единую структуру
 */
export type ThemeType = {
  borderRadius: Size; // Радиус скругления углов
  colors: Colors; // Фоновые цвета темы
  media: MediaType; // Медиа-запросы
  sizes: SizesType; // Размеры элементов
  durations: DurationsType; // Длительности анимаций
  zIndex: ZIndexType; // Z-index значения
  globalSize: Size; // Глобальный размер
  mode: ThemeMode; // Режим темы (светлая/темная)
  defaultInputSize: Size; // Размер полей ввода по умолчанию
  defaultButtonSize: Size; // Размер кнопок по умолчанию
  boxShadow: BoxShadowType; // Тени
  blur: BlurType; // Размытие
  buttons: ButtonTheme; // Тема для кнопок
  badges: BadgeTheme; // Тема для бейджей
  accordions: AccordionTheme; // Тема для аккордеонов
  avatars: AvatarTheme; // Тема для аватаров
  avatarGroups: AvatarGroupTheme; // Тема для групп аватаров
  cards: CardTheme; // Тема для карточек
  dropdowns: DropdownTheme; // Тема для dropdown
  hints: HintTheme; // Тема для подсказок
  modals: ModalTheme; // Тема для модальных окон
  progress: ProgressTheme; // Тема для прогресс-баров
  radioButton: RadioButtonTheme; // Тема для радиокнопок

  // Шрифты
  fonts: FontFamily; // Семейства шрифтов
  fontWeights: FontWeight; // Веса шрифтов
  fontSizes: FontSize; // Размеры шрифтов
  lineHeights: LineHeight; // Высота строк
  typography: Typography; // Готовые типографические стили
};

/**
 * Режимы темы
 * Определяет доступные варианты темы
 */
export enum ThemeMode {
  LIGHT = 'light', // Светлая тема
  DARK = 'dark', // Темная тема
}
