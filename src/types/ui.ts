import type React from 'react';
import type { Size, IconSize, ModalSize } from './sizes';
import type { Target, Transition } from 'framer-motion';
import type { IconName, icons } from '../icons';
import type { ReactNode } from 'react';

/**
 * Базовые типы для UI компонентов
 */

/**
 * Типы выравнивания текста
 */
export type TextAlign = 'left' | 'center' | 'right';

/**
 * Позиции для Hint компонента
 */
export enum HintPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
}

/**
 * Варианты для Hint компонента
 */
export enum HintVariant {
  DEFAULT = 'default',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

/**
 * Триггеры видимости для Hint компонента
 */
export enum HintVisibilityTrigger {
  HOVER = 'hover',
  CLICK = 'click',
}

/**
 * Режимы позиционирования для Hint компонента
 */
export type HintPositioningMode = 'default' | 'autoFlip' | 'autoFit';

/**
 * Пресеты анимаций для Hint компонента
 */
export enum HintAnimationPreset {
  FADE = 'fade',
  SLIDE = 'slide',
  SCALE = 'scale',
  NONE = 'none',
}

/**
 * Пропсы для Hint компонента
 */
export interface HintProps extends BaseComponentProps {
  /** Содержимое подсказки */
  content: ReactNode;
  /** Позиция подсказки */
  placement?: HintPosition;
  /** Размер подсказки */
  size?: Size;
  /** Максимальная ширина подсказки */
  maxWidth?: number;
  /** Задержка перед показом подсказки (в мс) */
  delay?: number;
  /** Вариант подсказки */
  variant?: HintVariant;
  /** Триггер видимости подсказки */
  visibilityTrigger?: HintVisibilityTrigger;
  /** Колбек на изменение видимости хинта */
  onVisibilityChange?: (visible: boolean) => void;
  /** Колбек на клик по hint */
  onHintClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** ClassName для внешнего контейнера (AnchorWrapper) */
  anchorClassName?: string;
  /** Id для внешнего контейнера (AnchorWrapper) */
  anchorId?: string;
  /** Позволяет добавлять миксин созданный с помощью styled css для внешнего контейнера (AnchorWrapper) */
  anchorCssMixin?: HintCssMixin;
  /** Режим позиционирования подсказки */
  positioningMode?: HintPositioningMode;
  /** Контролируемая видимость подсказки (контролируемый режим) */
  isOpen?: boolean;
  /** Начальное состояние видимости подсказки (неконтролируемый режим) */
  defaultOpen?: boolean;
  /** Колбек изменения состояния видимости подсказки */
  onOpenChange?: (open: boolean) => void;
  /** Показывать ли стрелку, указывающую на элемент */
  showArrow?: boolean;
  /** Закрывать ли hint при прокрутке страницы */
  closeOnScroll?: boolean;
  /** Функция для рендеринга динамического контента */
  renderContent?: () => ReactNode;
  /** CSS класс для контента hint */
  contentClassName?: string;
  /** Разрешить рендеринг HTML контента (с предупреждением о безопасности) */
  allowHTML?: boolean;
  /** Иконка в hint */
  icon?: ReactNode;
  /** Кнопки действий внутри hint */
  actions?: Array<{ label: string; onClick: () => void; variant?: ButtonVariant }>;
  /** Кастомный футер hint */
  footer?: ReactNode;
  /** Пресет анимации появления/исчезновения */
  animationPreset?: HintAnimationPreset;
  /** Длительность анимации в миллисекундах */
  animationDuration?: number;
  /** Управление z-index для правильного наложения hint */
  zIndex?: number;
  /** Группировка hint для управления (при открытии hint из группы, закрываются другие hint из той же группы) */
  hintGroup?: string;
  /** Состояние загрузки контента */
  loading?: boolean;
  /** Кастомный индикатор загрузки */
  renderLoading?: () => ReactNode;
  /** Номер шага в туре (для onboarding) */
  tourStep?: number;
  /** Общее количество шагов в туре */
  tourTotalSteps?: number;
  /** Колбек для перехода к следующему шагу тура */
  onTourNext?: () => void;
  /** Колбек для перехода к предыдущему шагу тура */
  onTourPrev?: () => void;
  /** Показывать ли кнопки навигации тура */
  showTourControls?: boolean;
  /** Ограничивающий контейнер для позиционирования (селектор или элемент) */
  boundaryElement?: HTMLElement | string;
  /** Отступ от границ boundary элемента */
  boundaryOffset?: number;
  /** Включить виртуализацию для большого контента */
  virtualize?: boolean;
  /** Режим для мобильных устройств */
  mobile?: boolean;
}

/**
 * Базовые пропсы для всех компонентов
 * @property className - CSS класс для стилизации
 * @property children - Дочерние элементы компонента
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Базовые пропсы для кнопок
 * Расширяет стандартные HTML атрибуты кнопки
 * @property loading - Показывает состояние загрузки (спиннер)
 * @property disabled - Отключает кнопку
 * @property fullWidth - Растягивает кнопку на всю ширину контейнера
 * @property rounded - Делает кнопку с закругленными углами
 */
export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  rounded?: boolean;
}

/**
 * Базовые пропсы для полей ввода
 * Расширяет стандартные HTML атрибуты input
 * @property label - Текстовая метка поля
 * @property error - Сообщение об ошибке
 * @property success - Показывает успешное состояние
 * @property helperText - Вспомогательный текст
 * @property required - Обязательное поле
 * @property fullWidth - Растягивает поле на всю ширину
 * @property clearIcon - Показывать ли иконку очистки
 * @property onClearIconClick - Обработчик клика по иконке очистки
 * @property textAlign - Выравнивание текста в поле
 * @property readOnly - Поле только для чтения (текст остается обычным цветом, но фон становится серым)
 */
export interface BaseInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  clearIcon?: boolean;
  onClearIconClick?: () => void;
  textAlign?: TextAlign;
  readOnly?: boolean; // Поле только для чтения (текст остается обычным цветом, но фон становится серым)
  isLoading?: boolean; // Статус загрузки данных
  skeleton?: boolean; // Состояние skeleton
  handleInput?: (
    value: string,
    cursorPosition: number,
  ) => { value: string; cursorPosition: number }; // Функция для обработки ввода и позиции курсора
  disableCopying?: boolean; // Отключает возможность выделения и копирования значения поля
  extraText?: string; // Дополнительный текст, отображаемый ниже компонента
  tooltip?: React.ReactNode; // Подсказка, отображаемая при наведении на инпут
  tooltipType?: 'tooltip' | 'hint'; // Тип подсказки: tooltip или hint (по умолчанию tooltip)
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'; // Позиция подсказки (по умолчанию top)
  displayCharacterCounter?: boolean; // Позволяет отключать появление счетчика символов при задании maxLength
  ignoreMaskCharacters?: boolean; // Исключает символы маски из подсчета символов для maxLength
  characterCounterVisibilityThreshold?: number; // Коэффициент влияющий на появление счетчика (0-1): 0 - всегда видим, 1 - всегда невидим, 0.8 - видим при >80% заполнения
  additionalLabel?: string; // Дополнительное имя поля формы
}

/**
 * Варианты кнопок
 * Определяет визуальный стиль и поведение кнопки
 */
export enum ButtonVariant {
  PRIMARY = 'primary', // Основная кнопка (акцентный цвет)
  SECONDARY = 'secondary', // Вторичная кнопка
  OUTLINE = 'outline', // Кнопка с обводкой
  GHOST = 'ghost', // Прозрачная кнопка
  DANGER = 'danger', // Кнопка для опасных действий
  SUCCESS = 'success', // Кнопка для успешных действий
  WARNING = 'warning', // Кнопка для предупреждений
  LINE = 'line', // Кнопка в виде ссылки
  SKELETON = 'skeleton', // Скелетон кнопка для загрузки
}

/**
 * Варианты иконочных кнопок
 * Специальные стили для кнопок с иконками
 */
export enum IconButtonVariant {
  SEND = 'send', // Кнопка отправки
  ARROW = 'arrow', // Кнопка со стрелкой
  ARROW_LINER = 'arrow-liner', // Кнопка с линейной стрелкой
}

/**
 * Варианты бейджей
 * Определяет цветовую схему бейджа согласно дизайн-системе
 */
export enum BadgeVariant {
  DEFAULT = 'default', // Красный бейдж (Danger/500)
  DEFAULT_MAIN = 'default_main', // Синий бейдж (Primary/500 main)
  DEFAULT_MAIN_INVERSION = 'default_main_inversion', // Белый фон с синим текстом
  DEFAULT_SUCCESS = 'default_success', // Зеленый бейдж (Success/500)
  DISABLE = 'disable', // Серый бейдж (Gray/200)
  OUTLINE = 'outline', // Прозрачный с обводкой
  OUTLINE_INVERSION = 'outline_inversion', // Прозрачный с темной обводкой
  // Обратная совместимость
  PRIMARY = 'primary', // Основной бейдж (аналог DEFAULT_MAIN)
  SECONDARY = 'secondary', // Вторичный бейдж (аналог DEFAULT)
  SUCCESS = 'success', // Бейдж успеха (аналог DEFAULT_SUCCESS)
  DANGER = 'danger', // Бейдж ошибки (аналог DEFAULT)
  WARNING = 'warning', // Бейдж предупреждения
  INFO = 'info', // Информационный бейдж
}

/**
 * Размер поля ввода
 */
export type InputSize = Size;

/**
 * Варианты полей ввода
 * Определяет тип и поведение поля
 */
export enum InputVariant {
  DEFAULT = 'default', // Стандартное поле
  SELECTOR = 'selector', // Поле-селектор
  DATE = 'date', // Поле для даты
  CLEAR = 'clear', // Поле с кнопкой очистки
}

/**
 * Позиции элементов
 */

/**
 * Позиция иконки относительно текста
 */
export type IconPosition = 'left' | 'right';

/**
 * Позиция всплывающей подсказки
 */
export enum TooltipPosition {
  TOP = 'top', // Сверху
  BOTTOM = 'bottom', // Снизу
  LEFT = 'left', // Слева
  RIGHT = 'right', // Справа
}

/**
 * Ориентация разделителя
 */
export enum DividerOrientation {
  HORIZONTAL = 'horizontal', // Горизонтальный
  VERTICAL = 'vertical', // Вертикальный
}

/**
 * Специфичные типы компонентов
 */

/**
 * Пропсы кнопки
 * @property variant - Визуальный стиль кнопки
 * @property size - Размер кнопки
 * @property iconStart - Иконка в начале кнопки
 * @property iconEnd - Иконка в конце кнопки
 * @property showTooltip - Показывать ли тултип
 * @property tooltipText - Текст тултипа
 */
export interface ButtonProps extends BaseButtonProps {
  variant?: ButtonVariant;
  size?: Size;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  showTooltip?: boolean;
  tooltipText?: string;
}

/**
 * Пропсы иконочной кнопки
 * @property variant - Специальный стиль иконочной кнопки
 * @property size - Размер кнопки
 * @property icon - Иконка
 * @property notificationCount - Количество уведомлений (красный бейдж)
 */
/**
 * Пропсы иконочной кнопки
 * @property variant - Визуальный стиль кнопки (дублирует ButtonVariant)
 * @property size - Размер кнопки
 * @property icon - Иконка кнопки (обязательная)
 * @property disabled - Отключить кнопку
 * @property loading - Показать состояние загрузки
 * @property fullWidth - Растянуть на всю ширину
 * @property rounded - Скругленные углы
 * @property showTooltip - Показывать ли тултип
 * @property tooltipText - Текст тултипа
 */
export interface IconButtonProps extends BaseButtonProps {
  variant?: ButtonVariant; // Используем те же варианты, что и у Button
  size?: Size;
  icon: React.ReactNode; // Обязательная иконка
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  rounded?: boolean;
  showTooltip?: boolean;
  tooltipText?: string;
}

/**
 * Пропсы поля ввода
 * @property variant - Тип поля ввода
 * @property size - Размер поля
 * @property leftIcon - Иконка слева
 * @property rightIcon - Иконка справа
 * @property onClear - Обработчик очистки поля
 * @property showClearButton - Показывать кнопку очистки
 */
export interface InputProps extends BaseInputProps {
  variant?: InputVariant;
  size?: Size;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClear?: () => void;
  showClearButton?: boolean;
  status?: 'error' | 'success' | 'warning'; // Статус компонента для изменения цвета бордера
}

/**
 * Пропсы бейджа
 * @property variant - Цветовая схема бейджа
 * @property size - Размер бейджа
 * @property isDot - Специальный dot размер (8x8px без текста)
 * @property rounded - Закругленные углы (по умолчанию true для Badge)
 * @property onClick - Обработчик клика
 */
export interface BadgeProps extends BaseComponentProps {
  variant?: BadgeVariant;
  size?: Size;
  isDot?: boolean; // Специальный dot размер
  rounded?: boolean;
  onClick?: () => void;
}

/**
 * Состояния аватара
 * Определяет визуальное состояние и функциональность аватара
 */
export enum AvatarState {
  OFFLINE = 'offline', // Офлайн состояние (обычный аватар)
  AVATAR = 'avatar', // Состояние с текстом (например, +4)
  CLOSE = 'close', // Состояние с кнопкой закрытия
  PIN = 'pin', // Состояние с иконкой закрепления
  SUB = 'sub', // Состояние с иконкой подписки
  CONTACT = 'contact', // Состояние с иконкой контакта
  LIKE = 'like', // Состояние с иконкой лайка
  UNPIN = 'unpin', // Состояние с иконкой открепления
}

/**
 * Статусы аватара
 * Определяет индикатор статуса пользователя
 */
export enum AvatarStatus {
  ONLINE = 'online', // Онлайн статус (зеленая точка)
  OFFLINE = 'offline', // Офлайн статус (серая точка)
  DANGER = 'danger', // Опасный статус (красная точка)
  WARNING = 'warning', // Предупреждающий статус (желтая точка)
}

/**
 * Пропсы аватара
 * @property src - URL изображения
 * @property alt - Альтернативный текст
 * @property size - Размер аватара
 * @property fallback - Запасной контент (инициалы или иконка)
 * @property onClick - Обработчик клика
 * @property state - Состояние аватара (offline, avatar, close, pin, sub, contact, like, unpin)
 * @property text - Текст для отображения в состоянии avatar (например, "+4")
 * @property icon - Иконка для отображения в состояниях с иконками
 * @property status - Статус пользователя для определения цвета Badge
 * @property messageCount - Количество сообщений для отображения в Badge
 * @property onIconClick - Обработчик клика по иконке
 */
export interface AvatarProps extends BaseComponentProps {
  id?: string; // Уникальный идентификатор аватара
  src?: string;
  alt?: string;
  size?: Size;
  fallback?: React.ReactNode;
  onClick?: (id?: string) => void; // Обработчик клика с передачей id аватара
  state?: AvatarState;
  text?: string;
  icon?: React.ReactNode;
  status?: AvatarStatus; // Статус пользователя для определения цвета Badge
  messageCount?: number; // Количество сообщений для отображения в Badge
  onIconClick?: () => void;
  userName?: string; // Имя пользователя, будет использовано внутри тултипа и для генерации инициалов (в случае если не задано или не найдено изображение)
  showTooltip?: boolean; // Отображение тултипа
  tooltipText?: string; // Кастомный текст для тултипа
  cursor?: 'default' | 'pointer'; // Тип курсора
}

/**
 * Варианты отображения группы аватаров
 * Определяет способ группировки аватаров
 */
export enum AvatarGroupVariant {
  STACK = 'stack', // Аватары накладываются друг на друга с отрицательным отступом
  ROW = 'row', // Аватары выстраиваются в ряд
  GRID = 'grid', // Аватары располагаются в сетке 3x2
}

/**
 * Пропсы группы аватаров
 * @property avatars - Массив пропсов для аватаров
 * @property variant - Вариант отображения (stack или row)
 * @property maxVisible - Максимальное количество видимых аватаров
 * @property size - Размер аватаров
 * @property spacing - Отступ между аватарами (для row варианта)
 * @property showTooltip - Показывать ли тултипы для аватаров
 * @property onCounterClick - Обработчик клика по счетчику дополнительных аватаров
 * @property onAvatarSelect - Колбек на выбор аватара (по клику или нажатию клавиши)
 * @property className - Дополнительные CSS классы
 */
export interface AvatarGroupProps extends BaseComponentProps {
  avatars: AvatarProps[];
  variant?: AvatarGroupVariant;
  maxVisible?: number;
  size?: Size;
  spacing?: number; // Отступ между аватарами в пикселях (для row варианта)
  showTooltip?: boolean;
  onCounterClick?: (remainingAvatars: AvatarProps[]) => void; // Обработчик клика по счетчику дополнительных аватаров
  onAvatarSelect?: (id: string) => void; // Колбек на выбор аватара (по клику или нажатию клавиши)
}

/**
 * Варианты карточек
 * Определяет визуальный стиль карточки
 */
export enum CardVariant {
  ELEVATED = 'elevated', // Карточка с тенью
  OUTLINED = 'outlined', // Карточка с обводкой
  FILLED = 'filled', // Карточка с заливкой
}

/**
 * Пропсы карточки
 * @property variant - Визуальный стиль карточки
 * @property size - Размер карточки
 * @property padding - Внутренние отступы
 * @property hoverable - Эффект при наведении
 * @property clickable - Интерактивная карточка
 * @property fullWidth - Растягивает на всю ширину
 * @property onClick - Обработчик клика
 */
export interface CardProps extends BaseComponentProps {
  variant?: CardVariant;
  size?: Size;
  padding?: Size;
  hoverable?: boolean;
  clickable?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

/**
 * Пропсы модального окна
 * @property isOpen - Открыто ли модальное окно
 * @property onClose - Обработчик закрытия
 * @property title - Заголовок модального окна
 * @property size - Размер модального окна
 * @property closeOnOverlayClick - Закрывать при клике на фон
 * @property closeOnEscape - Закрывать по Escape
 * @property showCloseButton - Показывать кнопку закрытия
 */
/**
 * Пропсы кнопки для модального окна
 * Расширяет ButtonProps с обязательным onClick
 */
export interface ModalButtonProps extends Omit<ButtonProps, 'onClick'> {
  label: string;
  onClick: () => void;
  placement?: 'primary' | 'secondary';
  asyncOnClick?: () => Promise<void>;
  loadingLabel?: string;
}

/**
 * Пропсы модального окна
 * @property isOpen - Открыто ли модальное окно
 * @property onClose - Функция закрытия модального окна
 * @property title - Заголовок модального окна
 * @property description - Описание/текст модального окна
 * @property content - Кастомный контент (ReactNode)
 * @property buttons - Массив кнопок для модального окна
 * @property size - Размер модального окна
 * @property closeOnOverlayClick - Закрывать при клике на фон
 * @property closeOnEscape - Закрывать по Escape
 * @property showCloseButton - Показывать кнопку закрытия
 */
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  content?: React.ReactNode;
  buttons?: ModalButtonProps[];
  /**
   * Контейнер, в котором происходит размещение модального окна (по умолчанию document.body)
   */
  container?: Element | null;
  /**
   * Переключение мобильной версии модального окна
   */
  mobile?: boolean;
  /**
   * Класс для подложки модального окна
   */
  overlayClassName?: string;
  /**
   * Вариант подложки модального окна
   */
  overlayVariant?: 'default' | 'blur' | 'dark' | 'frosted';
  /**
   * Inline-стили для подложки
   */
  overlayStyle?: React.CSSProperties;
  /**
   * Элемент, который должен получить фокус при открытии модального окна
   */
  initialFocusRef?: React.RefObject<HTMLElement>;
  /**
   * Предустановленный пресет анимации
   */
  animationPreset?: 'default' | 'fade' | 'slideUp';
  animationConfig?: {
    overlay?: {
      initial?: Target;
      animate?: Target;
      exit?: Target;
    };
    modal?: {
      initial?: Target;
      animate?: Target;
      exit?: Target;
      transition?: Transition;
    };
  };
  /**
   * Иконка слева от заголовка
   */
  headerIcon?: React.ReactNode;
  /**
   * Иконка в области контента
   */
  contentIcon?: React.ReactNode;
  /**
   * Иконка в контейнере кнопок
   */
  buttonsIcon?: React.ReactNode;
  headerSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
  buttonsSlot?: React.ReactNode;
  portalTargetId?: string;
  portalZIndex?: number;
  modalVariant?: 'default' | 'danger' | 'success' | 'info';
  initialFocusSelector?: string;
  size?: ModalSize;
  closeOnOverlayClick?: boolean; // Управляет логикой: пытаться ли закрывать при клике по оверлею
  closeOnEscape?: boolean;
  closeOnEscapeKeyDown?: boolean;
  closeOnOutsideClick?: boolean; // Глобальный флаг: разрешено ли закрывать модалку на клик вне контента
  overlayStyledCss?: string;
  showCloseButton?: boolean;
  children?: React.ReactNode;
}

/**
 * Пропсы всплывающей подсказки
 * @property content - Содержимое подсказки
 * @property position - Позиция подсказки
 * @property size - Размер подсказки
 * @property delay - Задержка перед показом
 * @property disabled - Отключить подсказку
 */
export interface TooltipProps extends BaseComponentProps {
  content: React.ReactNode;
  position?: TooltipPosition;
  size?: Size;
  delay?: number;
  disabled?: boolean;
}

/**
 * Значение элемента меню dropdown
 * Используется для передачи полезных данных в onSelect
 */
export type DropdownMenuItemValue = string | number | undefined;

/**
 * Пропсы по умолчанию для кнопки-триггера
 * Позволяют переиспользовать дизайн системную кнопку
 */
export type DropdownButtonProps = Partial<ButtonProps>;

export type DropdownAlignSelf =
  | 'auto'
  | 'center'
  | 'stretch'
  | 'flex-end'
  | 'flex-start'
  | 'baseline';

export type DropdownPositioningMode = 'default' | 'autoFlip' | 'autoFit';

export type DropdownCssMixin = string | number | false | DropdownCssMixin[] | undefined;

export type HintCssMixin = string | number | false | HintCssMixin[] | undefined;
/**
 * Пропсы выпадающего меню
 * @property trigger - Кастомный элемент-триггер. Если не задан, используется внутренняя кнопка
 * @property buttonProps - Пропсы, которые будут переданы кнопке по умолчанию
 * @property items - Массив пунктов меню (`DropdownMenuItemProps`) и/или групп (`DropdownMenuGroup`), который автоматически мапится в `DropdownMenu`
 * @property loading - Состояние загрузки. Показывает спиннер вместо содержимого
 * @property skeleton - Состояние скелетона. Применяется только к кнопке-триггеру, не влияет на меню
 * @property defaultOpen - Открывать меню по умолчанию при монтировании компонента
 * @property value - Значение выбранного элемента. В режиме single selection - одно значение, в режиме multiSelection - массив значений. Сравнивается с `value` каждого элемента меню для определения выбранного состояния
 * @property isMenuOpen - Управляет открытием меню извне (контролируемый компонент). Если задан, имеет приоритет над внутренним состоянием
 * @property onMenuOpenChange - Колбэк, вызываемый при изменении состояния открытия/закрытия меню. Получает boolean значение (true - открыто, false - закрыто)
 * @property disabled - Отключение компонента. Блокирует открытие меню и взаимодействие с компонентом
 * @property targetElement - Элемент, относительно которого позиционируется выпадающее меню. Если не задан, используется trigger элемент
 * @property size - Размер dropdown (`Size.SM` | `Size.MD` | `Size.LG`)
 * @property variant - Вариант dropdown (`default` | `elevated` | `outlined`)
 * @property multiSelection - Режим множественного выбора. Если `true`, позволяет выбрать несколько элементов, показывает чекбоксы в элементах меню, меню не закрывается при выборе
 * @property disableSelectedOptionHighlight - Отключает подсветку выбранной опции. Полезно для режима множественного выбора, когда у каждой опции есть чекбокс
 * @property virtualScroll - Включение виртуального скролла для меню. Максимальная высота меню рассчитывается исходя из высоты 1 пункта. Если `itemHeight` = "auto", то в расчет идет высота согласно dimension из темы
 * @property disableAutoFocus - Отключает автоматическую установку фокуса на стандартный триггер при монтировании компонента
 * @property onSelect - Колбэк, вызываемый при выборе пункта меню
 * @property onActivateItem - Обработчик активации (hover) элемента меню. Получает значение элемента (`value`)
 * @property renderTopPanel - Функция для рендеринга панели сверху над выпадающим списком. Получает пропсы dropdown
 * @property renderBottomPanel - Функция для рендеринга панели снизу под выпадающим списком. Получает пропсы dropdown
 * @property onClickOutside - Обработчик клика вне компонента и его детей. Вызывается при клике вне триггера и меню
 * @property alignSelf - Управляет выравниванием контейнера dropdown в пределах flex-родителя (CSS `align-self`)
 * @property menuWidth - Ширина меню. Может быть строкой (например, "200px", "50%") или числом (в пикселях)
 * @property menuMaxHeight - Максимальная высота меню. Может быть строкой (например, "320px") или числом (в пикселях). При превышении включается вертикальный скролл
 * @property dropContainerStyle - Дополнительные стили для контейнера выпадающего меню (`DropdownContent`). Полезно для точечной кастомизации размеров, теней, отступов и т.д.
 * @property dropContainerCssMixin - Позволяет добавить mixin, созданный через `styled-components/css`, для глубокой кастомизации контейнера меню
 * @property searchable - Включает встроенный поиск по пунктам меню (работает только для `items`)
 * @property searchPlaceholder - Placeholder для поля поиска
 * @property searchValue - Контролируемое значение поля поиска
 * @property defaultSearchValue - Неконтролируемое значение поиска по умолчанию
 * @property onSearch - Колбэк, вызываемый при изменении текста поиска
 * @property searchFilter - Кастомная функция фильтрации элементов меню
 * @property enableKeyboardNavigation - Включает стрелочную навигацию, Home/End и focus trap внутри меню
 * @property loadItems - Функция ленивой загрузки пунктов меню (если `items` не переданы)
 * @property onLoadItemsError - Колбэк, вызываемый при ошибке загрузки пунктов меню
 * @property renderEmptyState - Кастомный рендер пустого состояния
 * @property emptyMessage - Сообщение по умолчанию для пустого состояния
 * @property renderErrorState - Кастомный рендер ошибки (получает ошибку и функцию повтора)
 * @property inline - Режим без портала: меню рендерится внутри контейнера и позиционируется через `position: absolute`
 * @property children - Содержимое dropdown (обычно `DropdownMenu`)
 */
export interface DropdownTopPanelProps {
  size?: Size;
  variant?: 'default' | 'elevated' | 'outlined';
  disabled?: boolean;
}

export interface DropdownVirtualScrollConfig {
  itemHeight: number | 'auto';
}

export interface DropdownProps extends BaseComponentProps {
  trigger?: React.ReactNode;
  buttonProps?: DropdownButtonProps;
  items?: (DropdownMenuItemProps | DropdownMenuGroup)[];
  loading?: boolean;
  skeleton?: boolean;
  defaultOpen?: boolean;
  value?: DropdownMenuItemValue | DropdownMenuItemValue[];
  isMenuOpen?: boolean;
  onMenuOpenChange?: (isOpen: boolean) => void;
  disabled?: boolean;
  targetElement?: HTMLElement | null;
  size?: Size;
  variant?: 'default' | 'elevated' | 'outlined';
  multiSelection?: boolean;
  disableSelectedOptionHighlight?: boolean;
  virtualScroll?: DropdownVirtualScrollConfig;
  disableAutoFocus?: boolean;
  onSelect?: (value?: DropdownMenuItemValue, event?: React.MouseEvent<HTMLElement>) => void;
  onActivateItem?: (value?: DropdownMenuItemValue) => void;
  renderTopPanel?: (props: DropdownTopPanelProps) => React.ReactNode;
  renderBottomPanel?: (props: DropdownTopPanelProps) => React.ReactNode;
  onClickOutside?: (event: Event) => void;
  menuWidth?: string | number;
  menuMaxHeight?: string | number;
  alignSelf?: DropdownAlignSelf;
  dropContainerStyle?: React.CSSProperties;
  dropContainerCssMixin?: DropdownCssMixin;
  positioningMode?: DropdownPositioningMode;
  portalContainer?: HTMLElement | null;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  defaultSearchValue?: string;
  onSearch?: (value: string) => void;
  searchFilter?: (query: string, item: DropdownMenuItemProps) => boolean;
  enableKeyboardNavigation?: boolean;
  loadItems?: () => Promise<DropdownMenuItemProps[]>;
  onLoadItemsError?: (error: unknown) => void;
  renderEmptyState?: () => React.ReactNode;
  emptyMessage?: string;
  renderErrorState?: (error?: unknown, retry?: () => void) => React.ReactNode;
  inline?: boolean;
  children?: React.ReactElement<DropdownMenuProps> | React.ReactNode;
}

/**
 * Пропсы контейнера меню
 * @property children - Набор элементов меню (обычно `DropdownMenuItem`)
 * @property onItemSelect - Внутренний колбэк, который прокидывает `Dropdown` для закрытия меню
 * @property value - Значение выбранного элемента для сравнения с `value` элементов меню. В режиме multiSelection - массив значений
 * @property onActivateItem - Обработчик активации (hover) элемента меню. Получает значение элемента (`value`)
 * @property multiSelection - Режим множественного выбора
 * @property disableSelectedOptionHighlight - Отключает подсветку выбранной опции
 * @property virtualScroll - Конфигурация виртуального скролла
 * @property size - Размер dropdown для вычисления высоты элемента при itemHeight="auto"
 */
export interface DropdownMenuProps extends BaseComponentProps {
  children: React.ReactNode;
  onItemSelect?: (value?: DropdownMenuItemValue, event?: React.MouseEvent<HTMLElement>) => void;
  value?: DropdownMenuItemValue | DropdownMenuItemValue[];
  onActivateItem?: (value?: DropdownMenuItemValue) => void;
  multiSelection?: boolean;
  disableSelectedOptionHighlight?: boolean;
  virtualScroll?: DropdownVirtualScrollConfig;
  size?: Size;
}

/**
 * Пропсы элемента меню
 * @property label - Основной текст пункта меню
 * @property description - Дополнительное описание в две строки
 * @property value - Значение, которое вернётся в `onSelect`
 * @property icon - Левый слот с иконкой/аватаром
 * @property rightSlot - Правый слот (шорткат, тэг, иконка)
 * @property shortcut - Быстрый способ задать текст для правого слота
 * @property disabled - Отключает пункт меню. В режиме multiSelection также отключает чекбокс
 * @property loading - Состояние загрузки для отдельного пункта (показывает спиннер)
 * @property skeleton - Состояние скелетона для отдельного пункта (показывает скелетон-плейсхолдер)
 * @property tone - Тон оформления (`default` | `danger`)
 * @property state - Принудительное состояние (`selected`)
 * @property selected - Выбранное состояние элемента (используется в режиме multiSelection)
 * @property onSelect - Индивидуальный обработчик выбора
 * @property children - Кастомное содержимое, если нужно полностью переопределить верстку
 */
export interface DropdownMenuItemProps extends BaseComponentProps {
  label?: string;
  description?: string;
  value?: DropdownMenuItemValue;
  icon?: React.ReactNode;
  rightSlot?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  loading?: boolean;
  skeleton?: boolean;
  tone?: 'default' | 'danger';
  state?: 'selected';
  selected?: boolean;
  onSelect?: (value?: DropdownMenuItemValue, event?: React.MouseEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
  showTooltip?: boolean;
  tooltipText?: string;
}

export interface DropdownMenuGroup {
  title?: string;
  description?: string;
  items: DropdownMenuItemProps[];
  pinned?: 'top' | 'bottom';
}

/**
 * Пропсы вкладок
 * @property defaultActiveTab - Активная вкладка по умолчанию
 * @property onChange - Обработчик смены вкладки
 */
/**
 * Направление отображения табов
 */
export enum TabsDirection {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

/**
 * Позиция табов в вертикальном режиме
 */
export enum TabsVerticalPosition {
  START = 'start', // Табы слева от контента (по умолчанию)
  END = 'end', // Табы справа от контента
}

/**
 * Ориентация текста в TabItem
 */
export enum TabItemTextOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

/**
 * Позиция текста в вертикальном режиме текста
 */
export enum TabItemTextPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export interface TabsProps extends BaseComponentProps {
  defaultActiveTab?: string;
  onChange?: (activeTab: string) => void;
  /** Направление отображения табов */
  direction?: TabsDirection;
  /** Позиция табов в вертикальном режиме (слева или справа от контента) */
  tabsPosition?: TabsVerticalPosition;
}

/**
 * Пропсы аккордеона
 * @property defaultOpen - Открыт ли по умолчанию
 * @property allowMultiple - Позволяет открывать несколько элементов одновременно
 * @property autoClose - Автоматически закрывать другие элементы при открытии нового
 * @property onChange - Обработчик изменения состояния
 */
export interface AccordionProps extends BaseComponentProps {
  defaultOpen?: boolean;
  allowMultiple?: boolean; // Позволяет открывать несколько элементов одновременно
  autoClose?: boolean; // Автоматически закрывать другие элементы при открытии нового
  onChange?: (isOpen: boolean) => void;
}

/**
 * Пропсы прогресс-бара
 * @property value - Текущее значение (0-100)
 * @property max - Максимальное значение
 * @property size - Размер прогресс-бара
 */
export type ProgressVariant =
  | 'linear'
  | 'circle'
  | 'circle-info'
  | 'stepper'
  | 'stepper-circle'
  | 'buffer'
  | 'segmented';

export interface ProgressInfoBlock {
  title?: React.ReactNode;
  description?: React.ReactNode;
  value?: React.ReactNode;
}

/**
 * Шаг для степпера
 */
export interface ProgressStep {
  /**
   * Уникальный идентификатор шага
   */
  id: string | number;
  /**
   * Заголовок шага
   */
  label: string;
  /**
   * Описание шага (опционально)
   */
  description?: string;
  /**
   * Кастомная иконка для шага
   */
  icon?: React.ReactNode;
}

/**
 * Пропсы прогресс-бара
 *
 * @note Для варианта 'stepper' или 'stepper-circle' поля `steps` и `activeStep` обязательны
 * @note Для варианта 'buffer' поле `bufferValue` обязательно
 * @note Для варианта 'segmented' поле `segments` обязательно
 */
export interface ProgressProps extends BaseComponentProps {
  /**
   * Текущее значение прогресса (0-100). Для варианта stepper рассчитывается автоматически на основе activeStep
   */
  value?: number;
  /**
   * Максимальное значение прогресса (по умолчанию 100)
   */
  max?: number;
  /**
   * Размер компонента (XS, SM, MD, LG, XL). Влияет на высоту линейного варианта и диаметр кругового
   */
  size?: Size;
  /**
   * Вариант отображения: linear - линейный, circle - круговой, circle-info - круговой с информацией, stepper - степпер линейный, stepper-circle - степпер круговой
   */
  variant?: ProgressVariant;
  /**
   * Толщина заливки/штриха (для кругового варианта)
   */
  thickness?: number;
  /**
   * Диаметр кругового прогресса
   */
  circleSize?: number;
  /**
   * Пользовательский цвет фона трека
   */
  trackColor?: string;
  /**
   * Пользовательский цвет прогресса
   */
  progressColor?: string;
  /**
   * Показать подпись со значением процента
   */
  showValueLabel?: boolean;
  /**
   * Кастомная подпись/лейбл
   */
  label?: React.ReactNode;
  /**
   * Блок дополнительной информации (используется в circle-info)
   */
  info?: ProgressInfoBlock;
  /**
   * Кастомное форматирование отображаемого значения
   */
  formatValue?: (value: number, max: number) => React.ReactNode;
  /**
   * Показывать галочку при завершении загрузки (100%) в круговом варианте
   */
  showCheckmarkOnComplete?: boolean;
  /**
   * Состояние прогресса: await - ожидание, loading - загрузка, success - успешно завершено, error - ошибка
   */
  status?: 'await' | 'loading' | 'success' | 'error';
  /**
   * Применять цвета статуса к тексту (тайтл и проценты). Если false, текст использует стандартные цвета из темы
   */
  applyStatusColorsToText?: boolean;
  /**
   * Колбек, вызываемый при изменении статуса
   * @param status - новый статус
   */
  onStatusChange?: (status: 'await' | 'loading' | 'success' | 'error') => void;
  /**
   * Массив шагов для варианта stepper
   * @required Для вариантов 'stepper' и 'stepper-circle' это поле обязательно
   */
  steps?: ProgressStep[];
  /**
   * Индекс активного шага (начинается с 0)
   * @required Для вариантов 'stepper' и 'stepper-circle' это поле обязательно
   */
  activeStep?: number;
  /**
   * Показывать информацию о следующем шаге
   */
  showNextStepInfo?: boolean;
  /**
   * Колбек, вызываемый при достижении 100% прогресса
   */
  onComplete?: () => void;
  /**
   * Включить неопределенный режим прогресса (бесконечная анимация без конкретного значения)
   */
  indeterminate?: boolean;
  /**
   * Включить анимации для изменения значения и цвета
   */
  animated?: boolean;
  /**
   * Длительность анимации в миллисекундах
   */
  animationDuration?: number;
  /**
   * Кастомная иконка для статуса (вместо стандартной галочки при завершении)
   */
  customStatusIcon?: React.ReactNode;
  /**
   * Показывать иконку статуса
   */
  showStatusIcon?: boolean;
  /**
   * Кастомные тексты статусов
   */
  statusLabels?: {
    await?: string;
    loading?: string;
    success?: string;
    error?: string;
  };
  /**
   * Оставшееся время до завершения (в секундах)
   */
  estimatedTime?: number;
  /**
   * Скорость прогресса (например, "2.5 MB/s")
   */
  speed?: string;
  /**
   * Класс для стилизации трека
   */
  trackClassName?: string;
  /**
   * Класс для стилизации заливки
   */
  fillClassName?: string;
  /**
   * Inline стили для корневого элемента
   */
  style?: React.CSSProperties;
  /**
   * Колбек, вызываемый при клике на шаг в степпере
   * @param stepIndex - индекс шага
   * @param step - объект шага
   */
  onStepClick?: (stepIndex: number, step: ProgressStep) => void;
  /**
   * Показывать градиент для прогресс-бара
   */
  showGradient?: boolean;
  /**
   * Показывать процент отдельно от значения (для более гибкого управления)
   */
  showPercentage?: boolean;
  /**
   * Значение буфера для варианта buffer (0-100)
   * @required Для варианта 'buffer' это поле обязательно
   */
  bufferValue?: number;
  /**
   * Колбек для повтора при ошибке
   */
  onRetry?: () => void;
  /**
   * Колбек для паузы/возобновления
   */
  onPause?: () => void;
  /**
   * Состояние паузы
   */
  paused?: boolean;
  /**
   * Сегменты для варианта segmented. Массив объектов с value (0-100) и color
   * @required Для варианта 'segmented' это поле обязательно
   */
  segments?: Array<{ value: number; color: string; label?: string }>;
  /**
   * Показывать все шаги одновременно в степпере (не только текущий и следующий)
   */
  showAllSteps?: boolean;
  /**
   * Ориентация степпера: 'horizontal' (по умолчанию) или 'vertical'
   */
  stepperOrientation?: 'horizontal' | 'vertical';
}

/**
 * Варианты визуального стиля спиннера
 */
export enum SpinnerVariant {
  CIRCLE = 'circle', // Классический круглый спиннер (по умолчанию)
  DOTS = 'dots', // Точки
  BARS = 'bars', // Полосы
  PULSE = 'pulse', // Пульсирующий круг
}

/**
 * Пропсы спиннера (индикатора загрузки)
 * @property size - Размер спиннера (XS, SM, MD, LG, XL)
 * @property color - Цвет спиннера (CSS-цвет или цвет из темы)
 * @property variant - Визуальный вариант спиннера (`circle` | `dots` | `bars` | `pulse`)
 * @property speed - Скорость анимации в секундах (по умолчанию 1)
 * @property thickness - Толщина границы для circle варианта (в пикселях, по умолчанию 2)
 * @property label - Текст, отображаемый рядом со спиннером
 * @property labelPosition - Позиция текста относительно спиннера (`top` | `bottom` | `left` | `right`, по умолчанию `bottom`)
 * @property centered - Центрировать спиннер в контейнере (по умолчанию false)
 * @property ariaLabel - Текст для screen readers (по умолчанию "Загрузка")
 */
export interface SpinnerProps extends BaseComponentProps {
  size?: Size;
  color?: string;
  variant?: SpinnerVariant | 'circle' | 'dots' | 'bars' | 'pulse';
  speed?: number;
  thickness?: number;
  label?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  centered?: boolean;
  ariaLabel?: string;
}

/**
 * Варианты скелетона для предустановленных стилей
 */
export enum SkeletonVariant {
  TEXT = 'text',
  AVATAR = 'avatar',
  BUTTON = 'button',
  CUSTOM = 'custom',
}

/**
 * Направление группы скелетонов
 */
export enum SkeletonGroupDirection {
  ROW = 'row',
  COLUMN = 'column',
}

/**
 * Пропсы скелетона (индикатора загрузки контента)
 * @property width - Ширина скелетона (число в пикселях или CSS-значение)
 * @property height - Высота скелетона (число в пикселях или CSS-значение)
 * @property shape - Форма скелетона (`rect` | `circle`)
 * @property animated - Включить анимацию shimmer
 * @property animationSpeed - Скорость анимации в секундах (по умолчанию 1.5)
 * @property count - Количество повторений скелетона (минимум 1)
 * @property inline - Отображать как inline-block
 * @property gap - Отступ между элементами при count > 1 (в пикселях)
 * @property direction - Направление группы элементов (`row` | `column`, по умолчанию `column`)
 * @property variant - Предустановленный вариант скелетона (`text` | `avatar` | `button` | `custom`)
 * @property borderRadius - Кастомное значение border-radius (переопределяет значение из shape)
 * @property ariaLabel - Текст для screen readers (по умолчанию "Загрузка контента")
 */
export interface SkeletonProps extends BaseComponentProps {
  width?: number | string;
  height?: number | string;
  shape?: 'rect' | 'circle';
  animated?: boolean;
  animationSpeed?: number;
  count?: number;
  inline?: boolean;
  gap?: number;
  direction?: SkeletonGroupDirection | 'row' | 'column';
  variant?: SkeletonVariant | 'text' | 'avatar' | 'button' | 'custom';
  borderRadius?: number | string;
  ariaLabel?: string;
  style?: React.CSSProperties;
}

/**
 * Пропсы разделителя
 * @property orientation - Ориентация разделителя
 * @property size - Размер разделителя
 */
export interface DividerProps extends BaseComponentProps {
  orientation?: DividerOrientation;
  size?: Size;
}

/**
 * Пропсы селекта (выпадающего списка)
 * @property options - Опции для выбора
 * @property value - Выбранное значение
 * @property onChange - Обработчик изменения
 * @property placeholder - Плейсхолдер
 * @property disabled - Отключить селект
 * @property error - Сообщение об ошибке
 * @property size - Размер селекта
 */
export interface SelectProps extends BaseComponentProps {
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  size?: Size;
}

/**
 * Пропсы чекбокса
 * @property checked - Отмечен ли чекбокс
 * @property onChange - Обработчик изменения
 * @property label - Текстовая метка
 * @property disabled - Отключить чекбокс
 * @property size - Размер чекбокса
 * @property error - Сообщение об ошибке
 */
export interface CheckboxProps extends BaseComponentProps {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  size?: Size;
  error?: string;
}

/**
 * Пропсы радиокнопки
 * @property checked - Выбрана ли радиокнопка
 * @property onChange - Обработчик изменения
 * @property label - Текстовая метка
 * @property disabled - Отключить радиокнопку
 * @property error - Сообщение об ошибке
 * @property name - Имя группы радиокнопок
 * @property value - Значение радиокнопки
 */
export interface RadioProps extends BaseComponentProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  name: string;
  value: string;
}

/**
 * Пропсы радио кнопки (новый компонент)
 * @property checked - Выбрана ли радио кнопка
 * @property onChange - Обработчик изменения
 * @property label - Текстовая метка
 * @property disabled - Отключить радио кнопку
 * @property size - Размер радио кнопки
 * @property name - Имя группы радио кнопок
 * @property value - Значение радио кнопки
 * @property error - Сообщение об ошибке
 */
/**
 * Варианты радиокнопки
 * Определяет визуальный стиль радиокнопки
 */
export enum RadioButtonVariant {
  FILLED = 'filled', // Полностью залитая кнопка (по умолчанию)
  OUTLINE = 'outline', // Кнопка с обводкой, без заливки
}

/**
 * Позиции лейбла для радиокнопки
 * Определяет расположение лейбла относительно кнопки
 */
export enum RadioButtonLabelPosition {
  RIGHT = 'right', // Справа от кнопки (по умолчанию)
  LEFT = 'left', // Слева от кнопки
  TOP = 'top', // Сверху от кнопки
  BOTTOM = 'bottom', // Снизу от кнопки
  NONE = 'none', // Без лейбла
}

export interface RadioButtonProps extends BaseComponentProps {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLLabelElement>) => void; // Обработчик клика по кнопке или лейблу
  label?: string;
  disabled?: boolean;
  size?: Size;
  name?: string;
  value?: string;
  error?: string; // Сообщение об ошибке
  helperText?: string; // Вспомогательный текст, отображаемый под радиокнопкой
  tooltip?: React.ReactNode; // Подсказка, отображаемая при наведении
  tooltipPosition?: TooltipPosition; // Позиция подсказки
  required?: boolean; // Показывает индикатор обязательности поля
  variant?: RadioButtonVariant; // Вариант отображения: filled (залитая) или outline (с обводкой)
  extraText?: string; // Дополнительный текст (подсказка), который выводится нижней строкой
  readOnly?: boolean; // Только для чтения, в этом варианте кнопка будет неактивна, но лейбл будет оставаться без изменений
  labelPosition?: RadioButtonLabelPosition; // Позиция лейбла относительно кнопки: right (по умолчанию), left, top, bottom, none
  leftIcon?: React.ReactNode; // Иконка слева от радиокнопки
  rightIcon?: React.ReactNode; // Иконка справа от радиокнопки
  fullWidth?: boolean; // Растягивает радиокнопку на всю доступную ширину
  status?: 'success' | 'error' | 'warning'; // Визуальный статус радиокнопки
}

/**
 * Ориентация группы радиокнопок
 */
export enum RadioButtonGroupOrientation {
  HORIZONTAL = 'horizontal', // Горизонтальное расположение (по умолчанию)
  VERTICAL = 'vertical', // Вертикальное расположение
}

/**
 * Опция для RadioButtonGroup
 * Содержит все пропсы для отдельной радиокнопки
 */
export interface RadioButtonGroupOption
  extends Omit<RadioButtonProps, 'checked' | 'onChange' | 'name' | 'disabled' | 'readOnly'> {
  value: string; // Значение опции (обязательно)
  label: string; // Лейбл опции (обязательно)
  disabled?: boolean; // Отключить конкретную опцию (переопределяет disabled группы)
  readOnly?: boolean; // Только для чтения конкретной опции (переопределяет readOnly группы)
}

/**
 * Пропсы для группы радиокнопок
 * @property options - Массив опций для радиокнопок
 * @property value - Активное значение (value выбранной опции)
 * @property onChange - Обработчик изменения значения
 * @property onClick - Обработчик клика по опции
 * @property label - Лейбл для всей группы
 * @property disabled - Отключить всю группу
 * @property readOnly - Только для чтения (вся группа)
 * @property orientation - Ориентация группы: horizontal или vertical
 * @property name - Имя группы (автоматически генерируется, если не указано)
 * @property error - Сообщение об ошибке для группы или отдельных опций
 * @property helperText - Вспомогательный текст для группы
 * @property required - Показывает, что группа обязательна для заполнения
 * @property tooltip - Подсказка для группы радиокнопок
 * @property fullWidth - Растягивает группу на всю доступную ширину
 */
export interface RadioButtonGroupProps extends BaseComponentProps {
  options: RadioButtonGroupOption[]; // Массив опций для радиокнопок
  value?: string; // Активное значение
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Обработчик изменения
  onClick?: (value: string, option: RadioButtonGroupOption) => void; // Обработчик клика
  label?: string; // Лейбл для всей группы
  disabled?: boolean; // Отключить всю группу
  readOnly?: boolean; // Только для чтения (вся группа)
  orientation?: RadioButtonGroupOrientation; // Ориентация группы
  name?: string; // Имя группы (автоматически генерируется, если не указано)
  size?: Size; // Размер радиокнопок в группе
  variant?: RadioButtonVariant; // Вариант радиокнопок в группе
  labelPosition?: RadioButtonLabelPosition; // Позиция лейбла для радиокнопок в группе
  error?: string | string[]; // Сообщение об ошибке для группы (строка) или отдельных опций (массив)
  helperText?: string; // Вспомогательный текст для группы
  required?: boolean; // Показывает, что группа обязательна для заполнения
  tooltip?: React.ReactNode; // Подсказка для группы радиокнопок
  tooltipPosition?: TooltipPosition; // Позиция подсказки
  fullWidth?: boolean; // Растягивает группу на всю доступную ширину
}

/**
 * Пропсы для диапазона дат/времени
 */
export interface DateTimeRange {
  start: string;
  end: string;
}

/**
 * Пропсы компонента ввода даты и времени
 * @property value - Значение даты/времени
 * @property onChange - Обработчик изменения
 * @property label - Текстовая метка
 * @property placeholder - Плейсхолдер
 * @property disabled - Отключить поле ввода
 * @property size - Размер поля ввода
 * @property error - Сообщение об ошибке
 * @property type - Тип ввода (date, time, datetime)
 * @property range - Режим диапазона
 * @property startValue - Начальное значение диапазона
 * @property endValue - Конечное значение диапазона
 * @property onRangeChange - Обработчик изменения диапазона
 * @property showIcon - Показывать ли иконку
 */
export interface DateTimeInputProps extends BaseComponentProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: Size;
  error?: string;
  type?: 'date' | 'time' | 'datetime';
  showIcon?: boolean;
}

export interface DateTimeInputRangeProps extends BaseComponentProps {
  value?: DateTimeRange;
  onChange?: (range: DateTimeRange) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: Size;
  error?: string;
  type?: 'date' | 'time' | 'datetime';
  showIcon?: boolean;
}

export interface DatePickerProps extends Omit<BaseInputProps, 'value' | 'onChange' | 'size'> {
  value?: string | DateTimeRange;
  onChange?: (value: string | DateTimeRange) => void;
  size?: Size;
  range?: boolean; // Определяет режим работы: false = single, true = range
  minDate?: Date;
  maxDate?: Date;
  showIcon?: boolean;
  icon?: React.ReactNode; // Кастомная иконка для отображения вместо стандартной
  renderTopPanel?: () => React.ReactNode; // Кастомная панель вверху над календарем
  renderBottomPanel?: () => React.ReactNode; // Кастомная панель внизу под календарем
  status?: 'error' | 'success' | 'warning'; // Статус компонента для изменения цвета бордера
  disabledDates?: Date[]; // Массив дизейбленных дат
  disabledDays?: number[]; // Массив дизейбленных дней недели (0 = воскресенье, 1 = понедельник, ..., 6 = суббота)
  disabledMonths?: number[]; // Массив дизейбленных месяцев (0 = январь, 1 = февраль, ..., 11 = декабрь)
  disabledYears?: number[]; // Массив дизейбленных годов
  segmented?: boolean; // Определяет режим ввода: false = обычный input, true = сегментированный ввод
  format?: string; // Формат отображения даты (например, 'DD.MM.YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD')
}

/**
 * Диапазон времени
 */
export interface TimeRange {
  start: string; // HH:mm:ss
  end: string; // HH:mm:ss
}

/**
 * Пропсы компонента выбора времени
 * @property value - Значение времени (строка в формате HH:mm:ss или объект TimeRange для диапазона)
 * @property onChange - Обработчик изменения значения
 * @property label - Текстовая метка поля
 * @property placeholder - Плейсхолдер
 * @property disabled - Отключить поле
 * @property size - Размер поля
 * @property error - Сообщение об ошибке
 * @property range - Режим работы: false = одиночное время, true = диапазон времени
 * @property minTime - Минимальное время
 * @property maxTime - Максимальное время
 * @property showIcon - Показывать ли иконку
 * @property showSeconds - Показывать ли секунды
 * @property minuteStep - Шаг для минут (по умолчанию 1)
 * @property secondStep - Шаг для секунд (по умолчанию 1)
 * @property disabledTimes - Массив дизейбленных времен (строки в формате HH:mm или HH:mm:ss)
 * @property disabledHours - Массив дизейбленных часов (числа от 0 до 23)
 * @property disabledMinutes - Массив дизейбленных минут (числа от 0 до 59)
 * @property disabledSeconds - Массив дизейбленных секунд (числа от 0 до 59)
 * @property clearIcon - Показывать ли иконку очистки
 * @property onClearIconClick - Обработчик клика по иконке очистки
 */
export interface TimeInputProps extends Omit<BaseInputProps, 'value' | 'onChange' | 'size'> {
  value?: string | TimeRange;
  onChange?: (value: string | TimeRange) => void;
  size?: Size;
  range?: boolean; // Определяет режим работы: false = single, true = range
  minTime?: Date;
  maxTime?: Date;
  showIcon?: boolean;
  icon?: React.ReactNode; // Кастомная иконка для отображения вместо стандартной
  renderTopPanel?: () => React.ReactNode; // Кастомная панель вверху над пикером времени
  renderBottomPanel?: () => React.ReactNode; // Кастомная панель внизу под пикером времени
  status?: 'error' | 'success' | 'warning'; // Статус компонента для изменения цвета бордера
  showSeconds?: boolean;
  minuteStep?: number;
  secondStep?: number;
  disabledTimes?: string[]; // Массив дизейбленных времен (например, ['15:30', '16:45'])
  disabledHours?: number[]; // Массив дизейбленных часов (например, [0, 1, 2])
  disabledMinutes?: number[]; // Массив дизейбленных минут (например, [0, 15, 30, 45])
  disabledSeconds?: number[]; // Массив дизейбленных секунд (например, [0, 30])
  segmented?: boolean; // Определяет режим ввода: false = обычный input, true = сегментированный ввод
  format?: string; // Формат отображения времени (например, 'HH:mm', 'HH:mm:ss', 'h:mm A')
}

/**
 * Пропсы переключателя (switch)
 * @property checked - Включен ли переключатель
 * @property onChange - Обработчик изменения
 * @property label - Текстовая метка
 * @property disabled - Отключить переключатель
 */
export interface SwitchProps extends BaseComponentProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

/**
 * Пропсы текстовой области
 * @property value - Значение текстовой области
 * @property onChange - Обработчик изменения
 * @property placeholder - Плейсхолдер
 * @property label - Текстовая метка
 * @property error - Сообщение об ошибке
 * @property disabled - Отключить текстовую область
 * @property rows - Количество строк
 * @property size - Размер текстовой области
 * @property fullWidth - Растягивает на всю ширину
 */
export interface TextareaProps extends BaseComponentProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  rows?: number;
  size?: Size;
  fullWidth?: boolean;
}

/**
 * Варианты боковой панели
 */
export enum SidebarVariant {
  EXPANDED = 'expanded', // Развернутая панель
  COLLAPSED = 'collapsed', // Свернутая панель
}

/**
 * Элемент боковой панели
 * @property id - Уникальный идентификатор
 * @property label - Текст элемента
 * @property icon - Иконка элемента
 * @property active - Активен ли элемент
 * @property notificationCount - Количество уведомлений
 * @property onClick - Обработчик клика
 */
export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  notificationCount?: number;
  onClick?: () => void;
}

/**
 * Пропсы боковой панели
 * @property items - Список элементов панели
 * @property logo - Логотип панели
 * @property variant - Состояние панели (развернута/свернута)
 * @property onItemClick - Обработчик клика по элементу
 */
export interface SidebarProps extends BaseComponentProps {
  items: SidebarItem[];
  logo?: {
    icon?: React.ReactNode;
    title?: string;
  };
  variant?: SidebarVariant;
  onItemClick?: (item: SidebarItem) => void;
}

/**
 * Пропсы переключателя темы
 * Простой компонент для переключения между светлой и темной темами
 */
export type ThemeToggleProps = BaseComponentProps;

/**
 * Пропсы иконки
 * @property name - Название иконки
 * @property size - Размер иконки
 * @property color - Цвет иконки
 * @property variant - Набор иконок (plainer или iconex)
 */
export interface IconProps extends BaseComponentProps {
  name: IconName;
  size?: IconSize;
  color?: string;
  // variant?: IconVariant;
}

/**
 * Режимы работы сетки
 */
export enum GridMode {
  FULLSCREEN = 'fullscreen', // Полноэкранный режим
  CONTAINER = 'container', // Контейнерный режим
}

/**
 * Точки останова для адаптивной сетки
 * Определяет поведение на разных размерах экрана
 */
export interface GridBreakpoint {
  xs?: number | string; // Extra small (мобильные)
  sm?: number | string; // Small (планшеты)
  md?: number | string; // Medium (маленькие десктопы)
  lg?: number | string; // Large (средние десктопы)
  xl?: number | string; // Extra large (большие экраны)
}

/**
 * Пропсы сетки (Grid)
 * Компонент для создания адаптивных макетов
 * @property mode - Режим работы сетки
 * @property container - Контейнер для элементов сетки
 * @property columns - Количество колонок
 * @property rows - Количество строк
 * @property gap - Отступы между элементами
 * @property rowGap - Отступы между строками
 * @property columnGap - Отступы между колонками
 * @property justifyContent - Выравнивание по горизонтали
 * @property alignItems - Выравнивание по вертикали
 * @property width - Ширина сетки
 * @property height - Высота сетки
 * @property minHeight - Минимальная высота
 * @property maxHeight - Максимальная высота
 * @property autoFit - Автоматическое размещение элементов
 * @property autoFill - Автоматическое заполнение
 * @property minColumnWidth - Минимальная ширина колонки
 * @property maxColumnWidth - Максимальная ширина колонки
 */
export interface GridProps extends BaseComponentProps {
  // Основные настройки
  mode?: GridMode;
  container?: boolean;

  // Колонки и строки
  columns?: number | string | GridBreakpoint;
  rows?: number | string | GridBreakpoint;

  // Отступы
  gap?: number | string | GridBreakpoint;
  rowGap?: number | string | GridBreakpoint;
  columnGap?: number | string | GridBreakpoint;

  // Выравнивание
  justifyContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  alignItems?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';

  // Размеры
  width?: string | number;
  height?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;

  // Дополнительные настройки
  autoFit?: boolean;
  autoFill?: boolean;
  minColumnWidth?: string | number;
  maxColumnWidth?: string | number;

  // Стили
  style?: React.CSSProperties;
}

/**
 * Пропсы элемента сетки (GridItem)
 * Отдельный элемент в сетке Grid
 * @property column - Позиция в колонке
 * @property row - Позиция в строке
 * @property columnSpan - Растяжение по колонкам
 * @property rowSpan - Растяжение по строкам
 * @property justifySelf - Выравнивание элемента по горизонтали
 * @property alignSelf - Выравнивание элемента по вертикали
 * @property width - Ширина элемента
 * @property height - Высота элемента
 * @property minWidth - Минимальная ширина
 * @property maxWidth - Максимальная ширина
 * @property minHeight - Минимальная высота
 * @property maxHeight - Максимальная высота
 */
export interface GridItemProps extends BaseComponentProps {
  // Расположение в сетке
  column?: number | string;
  row?: number | string;

  // Растяжение по колонкам/строкам
  columnSpan?: number | string;
  rowSpan?: number | string;

  // Выравнивание внутри ячейки
  justifySelf?: 'start' | 'end' | 'center' | 'stretch';
  alignSelf?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';

  // Размеры
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;

  // Дополнительные стили
  style?: React.CSSProperties;
}

// export type IconVariant = 'plainer' | 'iconex';
export type IconVariant = keyof typeof icons;
