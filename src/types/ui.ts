import type React from 'react';
import type { Size, IconSize, ModalSize } from './sizes';
import type { Target, Transition } from 'framer-motion';
import type { IconName, icons } from '../icons';
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

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
  actions?: HintAction[];
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
 * @property error - Сообщение об ошибке
 * @property success - Показывает успешное состояние
 * @property helperText - Вспомогательный текст
 * @property required - Обязательное поле
 * @property fullWidth - Растягивает поле на всю ширину
 * @property displayClearIcon - Показывать кнопку с крестиком очистки значения
 * @property onClearIconClick - Колбэк по клику на очистку (после сброса значения в компоненте)
 * @property clearIconProps - Частичные пропсы `Icon` для кнопки очистки (`displayClearIcon`); мерж поверх имени, `size` и при необходимости `color` по умолчанию в компоненте
 * @property textAlign - Выравнивание текста в поле
 * @property readOnly - Поле только для чтения (текст остается обычным цветом, но фон становится серым)
 * @property label - Метка поля (`ReactNode`)
 */
export interface BaseInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  error?: string;
  success?: boolean;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  displayClearIcon?: boolean;
  onClearIconClick?: () => void;
  /**
   * Частичные пропсы `Icon` для иконки очистки при `displayClearIcon`.
   * Мерж поверх значений по умолчанию в конкретном поле (имя иконки, `size`, опционально `color`).
   */
  clearIconProps?: ClearIconProps;
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
 * Кнопка-действие внутри содержимого Hint
 * @property label — подпись кнопки (`ReactNode`)
 * @property onClick — обработчик клика
 * @property variant — визуальный вариант кнопки
 */
export interface HintAction {
  label: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
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
  SELECTOR = 'selector', // Поле-селектор (обёртка `InputWrapper` для Select / FileInput)
  DATE = 'date', // Поле для даты (обёртка для DateInput)
  CLEAR = 'clear', // Поле с кнопкой очистки
}

/**
 * Допустимые варианты для компонента `Input` (текстовое поле).
 * Стили селектора и даты задаются в `Select` и `DateInput`, не через `Input`.
 */
export type TextInputVariant = InputVariant.DEFAULT | InputVariant.CLEAR;

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
 * @property href - Если задан, компонент рендерится как ссылка `<a>` с теми же стилями (ссылка-кнопка)
 * @property target - Цель навигации (только при `href`)
 * @property rel - Отношение к целевому документу (только при `href`; при `target="_blank"` рекомендуется `noopener noreferrer`)
 * @property download - Подсказка браузеру для скачивания (только при `href`)
 */
export interface ButtonProps extends BaseButtonProps {
  variant?: ButtonVariant;
  size?: Size;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  showTooltip?: boolean;
  tooltipText?: string;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  download?: string | boolean;
}

/**
 * Режим компонента `Link`: обычный текст или оформление как кнопка.
 */
export enum LinkMode {
  TEXT = 'text',
  BUTTON = 'button',
}

/**
 * Общие атрибуты навигации для `Link`.
 * @property href - URL назначения
 * @property children - Содержимое ссылки
 * @property className - Дополнительный CSS-класс
 * @property target - Цель (`_blank` и т.д.)
 * @property rel - Явный `rel` (для `_blank` при необходимости дополняется в компоненте)
 * @property download - Атрибут `download` у `<a>`
 */
export interface LinkAnchorCommon {
  href: string;
  children?: ReactNode;
  className?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  download?: string | boolean;
}

/**
 * Текстовая ссылка (`<a>`).
 * @property mode - `text` или не указывать (по умолчанию текстовая ссылка)
 * @property textVariant - `default` — акцентный цвет; `line` — с подчёркиванием; `muted` — вторичный цвет
 */
export interface LinkTextProps
  extends
    LinkAnchorCommon,
    Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      'href' | 'children' | 'className' | 'target' | 'rel' | 'download'
    > {
  mode?: LinkMode.TEXT | 'text';
  textVariant?: 'default' | 'line' | 'muted';
}

/**
 * Ссылка с видом кнопки: те же пропсы, что у `Button`, плюс обязательный `href`.
 * @property mode - Должен быть `button`
 */
export type LinkButtonProps = LinkAnchorCommon & {
  mode: LinkMode.BUTTON | 'button';
} & Omit<ButtonProps, 'href' | 'type' | 'children' | 'className' | 'target' | 'rel' | 'download'>;

/**
 * Унион пропсов `Link` по полю `mode`.
 */
export type LinkProps = LinkTextProps | LinkButtonProps;

/**
 * Ориентация группы кнопок
 */
export type ButtonGroupOrientation = 'horizontal' | 'vertical';

/**
 * Скругление внешних углов склеенной группы (макет Figma: сегмент / капсула).
 */
export type ButtonGroupAttachedShape = 'segment' | 'pill';

/**
 * Пропсы группы кнопок (`Button` / `IconButton`)
 * @property children - Дочерние кнопки (рекомендуется одинаковые `variant` и `size` внутри группы)
 * @property orientation - Ряд или колонка (по умолчанию `horizontal`)
 * @property attached - Склеить соседние границы; скругления только у краёв группы; `gap: 0`, общий контур
 * @property size - Размер для расчёта внешнего радиуса в `attached` (совпадайте с `size` у дочерних `Button`)
 * @property attachedShape - `segment` — радиус от `size`; `pill` — внешние углы как у капсулы
 * @property fullWidth - Растянуть группу на ширину родителя (`display: flex`, `width: 100%`)
 * @property selectable - Включает режим переключения активной кнопки по индексу
 * @property activeIndex - Индекс активной кнопки (контролируемый режим)
 * @property defaultActiveIndex - Стартовый индекс активной кнопки (неконтролируемый режим)
 * @property onActiveIndexChange - Колбэк смены активного индекса
 * @property activeButtonVariant - Вариант активной кнопки в режиме `selectable`
 * @property inactiveButtonVariant - Вариант неактивных кнопок в режиме `selectable`
 * @property role - Роль контейнера (по умолчанию `group`)
 * @property ariaLabel - Подпись для `aria-label` (желательно для доступности)
 * @property className - CSS-класс на контейнере
 */
export interface ButtonGroupProps extends Omit<BaseComponentProps, 'children'> {
  children: ReactNode;
  orientation?: ButtonGroupOrientation;
  attached?: boolean;
  /** Размер сегментов (для радиуса краёв при `attached`) */
  size?: Size;
  attachedShape?: ButtonGroupAttachedShape;
  fullWidth?: boolean;
  selectable?: boolean;
  activeIndex?: number;
  defaultActiveIndex?: number;
  onActiveIndexChange?: (activeButtonIndex: number) => void;
  activeButtonVariant?: ButtonVariant;
  inactiveButtonVariant?: ButtonVariant;
  role?: string;
  ariaLabel?: string;
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
 * @property variant - Вариант оформления: `default` или `clear` (селектор и дата — только в `Select` / `DateInput`)
 * @property size - Размер поля (в компоненте по умолчанию `Size.SM`, см. также `theme.defaultInputSize`)
 * @property leftIcon - Иконка слева
 * @property rightIcon - Иконка справа
 * Кнопка очистки: `displayClearIcon` + `onClearIconClick` из `BaseInputProps`.
 */
export interface InputProps extends BaseInputProps {
  variant?: TextInputVariant;
  size?: Size;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  status?: 'error' | 'success' | 'warning'; // Статус компонента для изменения цвета бордера
}

/**
 * Пропсы текстовой области
 * @property label - Метка поля (`ReactNode`)
 * @property error - Сообщение об ошибке
 * @property success - Показывает успешное состояние
 * @property helperText - Вспомогательный текст
 * @property required - Обязательное поле
 * @property fullWidth - Растягивает поле на всю ширину
 * @property textAlign - Выравнивание текста
 * @property readOnly - Поле только для чтения
 * @property skeleton - Состояние skeleton
 * @property isLoading - Показать индикатор загрузки в правой части поля
 * @property disableCopying - Отключает возможность вставки/копирования
 * @property displayClearIcon - Показывать кнопку очистки значения
 * @property onClearIconClick - Колбэк очистки значения
 * @property clearIconProps - Частичные пропсы иконки очистки
 * @property extraText - Дополнительный текст под полем
 * @property tooltip - Текст/контент подсказки
 * @property tooltipType - Тип подсказки (`tooltip` или `hint`)
 * @property tooltipPosition - Позиция подсказки
 * @property displayCharacterCounter - Показывать ли счетчик символов
 * @property characterCounterVisibilityThreshold - Порог в символах: счётчик виден при длине текста ≥ порога (при `maxLength` > 0)
 * @property additionalLabel - Дополнительный лейбл
 * @property status - Статус компонента для изменения цвета бордера
 * @property resize - Режим изменения размеров textarea (CSS `resize`)
 * @property rows - Высота в строках (`HTMLTextAreaElement.rows`, по умолчанию в компоненте 4)
 */
export interface TextAreaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size'
> {
  label?: ReactNode;
  error?: string;
  success?: boolean;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  textAlign?: TextAlign;
  readOnly?: boolean;
  skeleton?: boolean;
  isLoading?: boolean;
  disableCopying?: boolean;
  displayClearIcon?: boolean;
  onClearIconClick?: () => void;
  clearIconProps?: ClearIconProps;
  extraText?: string;
  tooltip?: React.ReactNode;
  tooltipType?: 'tooltip' | 'hint';
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  displayCharacterCounter?: boolean;
  characterCounterVisibilityThreshold?: number;
  additionalLabel?: string;
  status?: 'error' | 'success' | 'warning';
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

/**
 * Пропсы поля выбора файла (скрытый `input type="file"` + триггер и подпись выбранных файлов).
 * @property label - Подпись над полем (`ReactNode`); участвует в `aria-labelledby` у скрытого `input`
 * @property error - Текст ошибки; влияет на статус обводки
 * @property success - Успешное состояние (булево); показывает текст «Успешно» под полем
 * @property helperText - Вспомогательный текст (скрывается при `error` / `success`)
 * @property required - Обязательное поле (звёздочка у `label`)
 * @property fullWidth - Растянуть блок на ширину контейнера
 * @property skeleton - Скелетон вместо поля
 * @property disabled - Отключение поля и триггера
 * @property variant - Вариант обводки (`InputVariant`, по умолчанию `default`)
 * @property size - Размер отступов/высоты как у `Input` (в компоненте по умолчанию `Size.SM`)
 * @property status - Явный статус обводки (`error` | `success` | `warning`)
 * @property buttonLabel - Текст на `<label htmlFor>` триггера открытия диалога (по умолчанию «Выбрать файл»)
 * @property placeholder - Текст в области имени файла, пока ничего не выбрано
 * @property fileName - Контролируемая подпись выбранных файлов (приоритет над авто-текстом из `input.files`)
 * @property displayClearIcon - Показывать кнопку сброса выбора (крестик; очищает значение у `input`)
 * @property onClearIconClick - Колбэк после сброса выбора (вместе с очисткой `input`)
 * @property onChange - Событие `change` у нативного `input[type=file]`
 * @property multiple - Множественный выбор файлов
 * @property accept - HTML-атрибут `accept`
 * @property name - Имя поля при отправке формы
 * @property id - Явный `id` скрытого `input` (иначе генерируется через `useId`)
 * @property tooltip - Подсказка (`tooltip` оборачивает поле, `hint` — отдельный блок)
 * @property tooltipType - Тип подсказки: `tooltip` или `hint`
 * @property tooltipPosition - Позиция подсказки
 * @property additionalLabel - Дополнительная подпись под основным `label`
 * @property extraText - Дополнительный текст под полем
 * @property isLoading - Показ спиннера справа в строке выбора
 * @property fileLayout - Макет Figma: `field` — слева плейсхолдер по умолчанию `input_file`, справа иконка загрузки; `dropzone` — пунктир и центр; `file` — карточка файла; `trigger` — прежний вид с отдельной кнопкой «Выбрать файл»
 * @property dropzoneText - Текст в режиме `dropzone` (по умолчанию «Перенесите для загрузки»)
 * @property fileCardLabel - Подпись над именем в карточке (`file`), напр. «Название файла»
 * @property fileCardBadge - Короткая метка под иконкой (например расширение `doc`)
 * @property uploadProgress - Прогресс 0–100: кольцевой индикатор справа в карточке
 * @property fileSizeLabel - Подпись размера справа (например «1 МБ») после загрузки
 */
export type FileInputLayout = 'field' | 'dropzone' | 'file' | 'trigger';

export interface FileInputProps extends Omit<
  BaseInputProps,
  | 'type'
  | 'handleInput'
  | 'displayCharacterCounter'
  | 'ignoreMaskCharacters'
  | 'characterCounterVisibilityThreshold'
  | 'disableCopying'
  | 'textAlign'
  | 'readOnly'
  | 'value'
  | 'defaultValue'
> {
  variant?: InputVariant;
  size?: Size;
  status?: 'error' | 'success' | 'warning';
  buttonLabel?: string;
  fileName?: string;
  fileLayout?: FileInputLayout;
  /** Текст по центру зоны `dropzone` */
  dropzoneText?: string;
  /** Подпись над именем файла в режиме `file` */
  fileCardLabel?: string;
  /** Метка под иконкой документа в режиме `file` */
  fileCardBadge?: string;
  /** Прогресс загрузки 0–100 для кольцевого индикатора */
  uploadProgress?: number;
  /** Размер файла для отображения справа (режим `file`) */
  fileSizeLabel?: string;
  /** Drag-and-drop (режим `dropzone`) */
  onDragEnter?: React.DragEventHandler<HTMLDivElement>;
  onDragLeave?: React.DragEventHandler<HTMLDivElement>;
  onDragOver?: React.DragEventHandler<HTMLDivElement>;
  onDrop?: React.DragEventHandler<HTMLDivElement>;
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
 * Цветовая схема тега (семантика из темы + расширенные акценты).
 * `custom` — только вместе с {@link TagCustomColors} (поверхность и/или маркер).
 */
export type TagColorVariant =
  | 'neutral'
  | 'secondary'
  | 'primary'
  | 'danger'
  | 'info'
  | 'success'
  | 'warning'
  | 'purple'
  | 'teal'
  | 'cyan'
  | 'pink'
  | 'custom';

/**
 * Кастомные цвета тега: полная поверхность (`background`) и/или только маркер (`marker`).
 * Значения — любые допустимые в CSS цвета (в т.ч. из своей темы приложения).
 */
export type TagCustomColors = {
  /** Заливка пилюли (если задано — включается режим полностью кастомной поверхности) */
  background?: string;
  border?: string;
  backgroundHover?: string;
  /** Цвет текста */
  color?: string;
  /** Цвет кружка в режиме `statusDisplay="marker"` (перекрывает цвет из `colorVariant`) */
  marker?: string;
};

/** Вид заливки: мягкий фон или контрастная обводка */
export type TagAppearance = 'filled' | 'outline';

/**
 * Как показать семантику цвета — заливка всей «пилюли» или цветная метка слева:
 * - **surface** — вся «пилюля» окрашена (`filled` / `outline`)
 * - **marker** — нейтральный фон тега и цветной кружок-статус слева от текста
 */
export type TagStatusDisplay = 'surface' | 'marker';

/**
 * Тег (pill с текстом/иконками): нейтральный, ошибка, инфо, успех, предупреждение × filled / outline.
 * @property children - Текст (например «Tag»)
 * @property colorVariant - Палитра (`neutral` по умолчанию)
 * @property appearance - `filled` или `outline`
 * @property size - Высота и отступы (по умолчанию SM)
 * @property leftIcon - Иконка слева от текста
 * @property rightIcon - Иконка справа от текста
 * @property onClick - Кликабельный тег (`role="button"`, клавиатура)
 * @property disabled - Неактивное состояние
 * @property skeleton - Плейсхолдер загрузки (шиммер, `aria-busy`; текст и иконки не рендерятся)
 * @property skeletonWidth - Ширина скелетона в px (если не задана — по размеру `size`)
 * @property statusDisplay - Семантика через заливку всего тега или через цветную метку-кружок (`marker`)
 * @property width / maxWidth - Явная ширина / ограничение (для обрезки текста с тултипом)
 * @property as - Корневой элемент: `span` | `button` | `div` (для клика удобнее `button`)
 * @property customColors — полная кастомизация поверхности и/или маркера (см. {@link TagCustomColors}); при `colorVariant="custom"` ожидается хотя бы `background` или только `marker` для точечной метки
 * @property hideBorder - Скрыть видимую обводку (surface)
 * @property tooltipWhenTruncated - Показывать `Tooltip`, если текст не помещается (нужен `maxWidth` или `width`)
 * @property tooltipContent - Текст тултипа при обрезании (иначе — строковые `children`)
 */
export interface TagProps
  extends BaseComponentProps, Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  children?: React.ReactNode;
  colorVariant?: TagColorVariant;
  appearance?: TagAppearance;
  /** Статус через заливку всего тега или через цветной маркер слева */
  statusDisplay?: TagStatusDisplay;
  size?: Size;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  skeleton?: boolean;
  /** Ширина полоски скелетона в пикселях */
  skeletonWidth?: number;
  /** Фиксированная ширина тега */
  width?: number | string;
  /** Максимальная ширина (часто вместе с `tooltipWhenTruncated`) */
  maxWidth?: number | string;
  /** Корневой тег для доступности (`button` + `type="button"` при клике) */
  as?: 'span' | 'button' | 'div';
  /** Кастомные цвета поверхности и/или маркера */
  customColors?: TagCustomColors;
  /** Убрать видимую рамку (surface) */
  hideBorder?: boolean;
  /** Тултип при переполнении текста */
  tooltipWhenTruncated?: boolean;
  /** Содержимое тултипа при обрезке (если не строковые children) */
  tooltipContent?: React.ReactNode;
}

/**
 * Встроенный триггер `Dropdown` без кастомного `trigger`: стандартная кнопка или тег-пилюля (`Tag`).
 */
export type DropdownDefaultTriggerKind = 'button' | 'tag';

/**
 * Пропсы тега при `defaultTriggerKind="tag"` (подпись триггера — `buttonProps.children`).
 */
export type DropdownTagTriggerProps = Omit<
  TagProps,
  'children' | 'onClick' | 'as' | 'disabled' | 'skeleton'
>;

/**
 * Семантический акцент Pill: граница, текст и индикатор в выбранном состоянии (вместо `primary`).
 */
export type PillStatus = 'default' | 'success' | 'warning' | 'danger' | 'info';

/**
 * Чип «Pill» с круглым индикатором слева (макет Figma: default / hover / active / selected / disabled).
 * @property children - Подпись (например «Pill»)
 * @property selected - Выбранное состояние (акцент темы / статуса, заполненный индикатор)
 * @property size - Размер: SM / MD / LG
 * @property disabled - Неактивное состояние
 * @property status - Семантический статус (цвет выбранного состояния и шеврона загрузки)
 * @property loading - Загрузка: блокировка клика, `aria-busy`, индикатор-спиннер вместо точки
 * @property skeleton - Плейсхолдер загрузки вместо кнопки (`span`, не интерактивен)
 * @property skeletonWidth - Ширина полоски скелетона в px (иначе по размеру)
 * @property className - Дополнительный CSS-класс
 * Остальные пропсы передаются на нативную кнопку (`type="button"` по умолчанию) или на корень скелетона.
 */
export interface PillProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'size' | 'onChange'>,
    BaseComponentProps {
  children: React.ReactNode;
  selected?: boolean;
  size?: Size;
  /**
   * Смена выбранного состояния по клику: передаётся **новое** значение `selected` для подъёма в родитель.
   * Без `role="radio"`: `nextSelected = !selected` (переключатель). С `role="radio"`: всегда `true` (выбран этот пункт группы).
   * Вызывается перед `onClick`. Не вызывается при `disabled`, `loading`, `skeleton`.
   */
  onChange?: (nextSelected: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Семантический акцент для выбранного состояния и спиннера при `loading` */
  status?: PillStatus;
  /** Неактивен для указателя, `aria-busy`, спиннер в индикаторе */
  loading?: boolean;
  /** Режим скелетона: полоска-шиммер вместо кнопки */
  skeleton?: boolean;
  /** Ширина скелетона в px (по умолчанию от `size`) */
  skeletonWidth?: number;
}

/** Значение диапазона для `RangeSlider`: [нижняя граница, верхняя граница] */
export type SliderRangeValue = readonly [number, number];

/**
 * Общие пропсы шкалы для `Slider` и `RangeSlider`.
 * @property min - Минимум шкалы
 * @property max - Максимум шкалы
 * @property step - Шаг изменения
 * @property disabled - Отключение взаимодействия
 * @property fullWidth - Растянуть на ширину контейнера
 * @property formatValue - Подпись под бегунком (и под каждым в range)
 * @property formatMinLabel - Текст над левым концом трека
 * @property formatMaxLabel - Текст над правым концом трека
 * @property showValueLabel - Показывать число под бегунком(ами)
 * @property size - Масштаб слайдера: бегунок (12–28 px) и толщина трека (`getSliderTrackMetrics` / `resolveSliderTrackMetrics`)
 * @property trackRailHeightPx - Толщина серой линии трека (px); при отсутствии — из `size`
 * @property trackActiveHeightPx - Толщина синего сегмента (px); при отсутствии — из `size`
 * @property label - Основной лейбл над треком (как у `Input`)
 * @property additionalLabel - Дополнительная подпись под `label`
 * @property error - Сообщение об ошибке под слайдером
 * @property success - Успешное состояние (текст «Успешно»)
 * @property helperText - Подсказка (скрывается при `error` / `success`)
 * @property extraText - Дополнительный текст внизу (как `extraText` у инпута)
 * @property required - Обязательное поле (звёздочка у `label`)
 * @property skeleton - Плейсхолдер загрузки вместо трека (`aria-busy` на контейнере с лейблом)
 * @property status - Акцент трека/бегунка и тонкая обводка: `error` | `success` | `warning` (с `error` / `success` как у `Input`)
 * Цвет по умолчанию: `theme.colors.info` / `infoHover` (яркий синий UI, как тултип и пагинация).
 */
export interface SliderBaseProps extends BaseComponentProps {
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  fullWidth?: boolean;
  formatValue?: (value: number) => string;
  formatMinLabel?: (min: number) => string;
  formatMaxLabel?: (max: number) => string;
  showValueLabel?: boolean;
  size?: Size;
  /** Толщина серой «рельсы» (px); иначе по `size` */
  trackRailHeightPx?: number;
  /** Толщина синей активной полоски (px); иначе по `size` */
  trackActiveHeightPx?: number;
  /** Основной лейбл над треком */
  label?: ReactNode;
  /** Дополнительная подпись под основным лейблом */
  additionalLabel?: string;
  /** Текст ошибки под слайдером */
  error?: string;
  /** Успешное состояние */
  success?: boolean;
  /** Вспомогательный текст */
  helperText?: string;
  /** Дополнительный текст под блоком */
  extraText?: string;
  /** Обязательное поле */
  required?: boolean;
  /** Скелетон вместо бегунков и интерактива */
  skeleton?: boolean;
  /** Акцент рамки и заливки трека / бегунков */
  status?: 'error' | 'success' | 'warning';
}

/**
 * Одиночный слайдер (один бегунок, активный трек слева до значения).
 * @property value - Контролируемое значение
 * @property defaultValue - Начальное значение в неконтролируемом режиме
 * @property onChange - Сообщает новое число после перетаскивания / клика по треку / клавиатуры
 * @property name - Имя для скрытого `input` (опционально, для форм)
 */
export interface SliderProps extends SliderBaseProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  name?: string;
}

/**
 * Слайдер диапазона (два бегунка, активный трек между ними).
 * @property value - Контролируемая пара `[от, до]`
 * @property defaultValue - Начальная пара в неконтролируемом режиме
 * @property onChange - Новая пара после изменения
 * @property showManualInputs - Поля ввода «От» / «До» под шкалой (как в макете)
 * @property fromInputPlaceholder / toInputPlaceholder - Плейсхолдеры полей
 * @property currencySuffix - Символ справа в полях (например «₽»)
 * @property nameFrom / nameTo - Атрибуты `name` у полей ввода
 */
export interface RangeSliderProps extends SliderBaseProps {
  value?: SliderRangeValue;
  defaultValue?: SliderRangeValue;
  onChange?: (value: SliderRangeValue) => void;
  showManualInputs?: boolean;
  fromInputPlaceholder?: string;
  toInputPlaceholder?: string;
  currencySuffix?: string;
  nameFrom?: string;
  nameTo?: string;
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
  label: ReactNode;
  onClick: () => void;
  placement?: 'primary' | 'secondary';
  asyncOnClick?: () => Promise<void>;
  loadingLabel?: ReactNode;
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
  /**
   * Размонтировать модальное окно после закрытия
   * @default true
   */
  unmountOnClose?: boolean;
  /**
   * Лениво монтировать модальное окно только после первого открытия
   * @default true
   */
  lazy?: boolean;
  children?: React.ReactNode;
}

/**
 * Сторона экрана, с которой выезжает панель `Drawer`.
 */
export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

/**
 * Пропсы выдвижной панели (`Drawer`).
 * @property isOpen - Открыт ли drawer
 * @property onClose - Закрытие (оверлей, Escape, кнопка)
 * @property placement - Сторона появления панели (по умолчанию `right`)
 * @property title - Заголовок в шапке
 * @property children - Контент панели
 * @property showCloseButton - Показывать кнопку закрытия (по умолчанию `true`)
 * @property width - Ширина панели при `left` / `right` (число — px, строка — CSS)
 * @property height - Высота панели при `top` / `bottom`
 * @property container - Корень портала (по умолчанию `document.body`)
 * @property portalTargetId - id элемента для портала
 * @property portalZIndex - z-index оверлея (поверх `overlayStyle`)
 * @property overlayClassName - Класс оверлея
 * @property overlayVariant - Визуал подложки как у `Modal`
 * @property overlayStyle - Inline-стили оверлея
 * @property closeOnOverlayClick - Закрытие по клику на подложку
 * @property closeOnEscape - Блок обработки Escape (см. `useModalEscape`)
 * @property closeOnEscapeKeyDown - Закрытие по Escape
 * @property closeOnOutsideClick - Учитывается вместе с `closeOnOverlayClick` при клике по оверлею
 * @property initialFocusRef - Куда ставить фокус при открытии
 * @property initialFocusSelector - Селектор элемента для начального фокуса
 * @property headerSlot - Кастомная шапка вместо `title` + крестик
 * @property unmountOnClose - Размонтировать панель после закрытия (по умолчанию `true`)
 * @property lazy - Лениво монтировать панель только после первого открытия (по умолчанию `true`)
 * @property className - Класс на панели (`aside`)
 */
export interface DrawerProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: DrawerPlacement;
  title?: string;
  showCloseButton?: boolean;
  width?: string | number;
  height?: string | number;
  container?: Element | null;
  portalTargetId?: string;
  portalZIndex?: number;
  overlayClassName?: string;
  overlayVariant?: 'default' | 'blur' | 'dark' | 'frosted';
  overlayStyle?: React.CSSProperties;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  closeOnEscapeKeyDown?: boolean;
  closeOnOutsideClick?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
  initialFocusSelector?: string;
  headerSlot?: React.ReactNode;
  /**
   * Размонтировать панель после закрытия
   * @default true
   */
  unmountOnClose?: boolean;
  /**
   * Лениво монтировать панель только после первого открытия
   * @default true
   */
  lazy?: boolean;
}

/**
 * Сторона появления панели `Sheet` (совпадает с `DrawerPlacement`).
 */
export type SheetPlacement = DrawerPlacement;

/**
 * Пропсы панели `Sheet` (лист с края экрана, чаще снизу): те же поля, что у `Drawer` (`isOpen`, `onClose`, `placement`, `width`, `height`, оверлей, фокус, `unmountOnClose`, `lazy`).
 * В компоненте по умолчанию `placement="bottom"` и иная дефолтная высота для вертикальных сторон.
 */
export type SheetProps = DrawerProps;

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

/** Вариант панели `Popover` (те же токены фона и обводки, что у `Dropdown`) */
export type PopoverVariant = 'default' | 'elevated' | 'outlined';

/**
 * Плавающая панель произвольного содержимого у триггера.
 * Радиусы, отступы, тень, типографика и z-index берутся из `theme.dropdowns` (как у выпадающего меню).
 */
export interface PopoverProps extends BaseComponentProps {
  /** Область открытия: клик по обёртке переключает панель (дочерние элементы получают событие как обычно) */
  trigger: ReactNode;
  /** Содержимое панели (рендер в портале при открытии) */
  children: ReactNode;
  /** Контролируемое открытие */
  open?: boolean;
  /** Начальное состояние в неконтролируемом режиме */
  defaultOpen?: boolean;
  /** Изменение открытия */
  onOpenChange?: (open: boolean) => void;
  /** Размер: `theme.dropdowns.sizes[size]` — padding, `borderRadius`, шрифт, min/max ширина */
  size?: Size;
  /** Вариант: `theme.dropdowns.variants` */
  variant?: PopoverVariant;
  /** Подгонка к краям вьюпорта и вертикальный flip (как у `Dropdown`) */
  positioningMode?: DropdownPositioningMode;
  /** Корень `createPortal` (по умолчанию `document.body`) */
  portalContainer?: HTMLElement | null;
  /** Отступ панели от триггера, px */
  offset?: number;
  /** Закрытие по клавише Escape (по умолчанию `true`) */
  closeOnEscape?: boolean;
  /** Не открывать панель */
  disabled?: boolean;
  /** `className` корневой обёртки (триггер) */
  className?: string;
  /** `className` плавающей панели */
  contentClassName?: string;
  /** Клик вне триггера и панели (вызывается при закрытии снаружи) */
  onClickOutside?: (event: Event) => void;
  /** Для `inline`: позиционирование относительно этого элемента */
  boundaryElement?: HTMLElement | null;
  /** `position: absolute` внутри `boundaryElement` вместо `fixed` в портале */
  inline?: boolean;
  /** Ширина панели (перекрывает min/max из темы) */
  contentWidth?: string | number;
  /** Максимальная высота содержимого с вертикальным скроллом */
  contentMaxHeight?: string | number;
  /** Подпись панели для доступности (`aria-label` у контейнера панели) */
  contentAriaLabel?: string;
  /** Идентификатор корневой обёртки (триггер) */
  id?: string;
  /** Атрибут `data-testid` корневой обёртки */
  dataTestId?: string;
  /**
   * Якорь панели: **below** — под триггером (по умолчанию); **rightStart** — справа, выравнивание по верху (подменю у компактного **NavigationMenu**).
   */
  preferredPlacement?: 'below' | 'rightStart';
  /**
   * Если **false**, клик по обёртке триггера не переключает панель (открытие только через **open** / hover с `triggerWrapperProps`).
   */
  triggerWrapClickToggle?: boolean;
  /** Атрибуты корневого `div` вокруг **trigger** (например `onMouseEnter` / `onMouseLeave` для flyout) */
  triggerWrapperProps?: React.HTMLAttributes<HTMLDivElement>;
}

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
 * @property multiSelection - Режим множественного выбора: несколько значений, меню не закрывается при выборе; чекбоксы у пунктов по умолчанию (`showCheckbox` не `false`)
 * @property showCheckbox - При `multiSelection`: показывать чекбокс в пункте (по умолчанию `true`; `false` — без чекбоксов)
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
 * @property onSearch - `(query, searchFormat?) => void` — изменение строки поиска; второй аргумент — текущий `searchFormat` из пропсов (если задан)
 * @property searchFilter - Кастомная функция фильтрации элементов меню
 * @property searchFormat - Встроенный поиск без `searchFilter`: `wholly` — вся строка; `word` — по словам запроса
 * @property enableKeyboardNavigation - Включает стрелочную навигацию, Home/End и focus trap внутри меню
 * @property loadItems - Функция ленивой загрузки пунктов меню (если `items` не переданы)
 * @property onMenuOpened - Доп. колбэк при открытии (до `onMenuOpenChange(true)`)
 * @property onMenuClosed - Доп. колбэк при закрытии
 * @property onMenuScroll - Скролл списка (метрики элемента-источника события)
 * @property onMenuLoadMore - Догрузка при приближении к низу; скролл компенсируется по дельте высоты
 * @property menuLoadMoreThresholdPx - Порог в px до низа для `onMenuLoadMore`
 * @property menuHasMore - Нет данных — не вызывать догрузку
 * @property menuIsLoadingMore - Внешний флаг загрузки порции
 * @property onLoadItemsError - Колбэк, вызываемый при ошибке загрузки пунктов меню
 * @property renderEmptyState - Кастомный рендер пустого состояния
 * @property emptyMessage - Сообщение по умолчанию для пустого состояния
 * @property renderErrorState - Кастомный рендер ошибки (получает ошибку и функцию повтора)
 * @property inline - Режим без портала: меню рендерится внутри контейнера и позиционируется через `position: absolute`
 * @property menuDensity - `compact`: уменьшенные отступы у списка и пунктов (календарь и др. плотные макеты)
 * @property children - Содержимое dropdown (обычно `DropdownMenu`)
 */
export interface DropdownVirtualScrollConfig {
  itemHeight: number | 'auto';
}

/** Метрики прокрутки контейнера меню (элемент, на котором сработал `scroll`) */
export interface DropdownMenuScrollInfo {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}

/**
 * Контекст догрузки пунктов при приближении к низу списка (бесконечный скролл).
 * @property direction - Сейчас только догрузка «в конец» списка
 * @property anchorFlatIndex - Индекс якорной строки в плоском списке (обычно последняя загруженная)
 * @property anchorValue - `value` якорной опции (курсор для следующей порции на бэкенде)
 * @property anchorId - Необязательный `id` строки (`DropdownMenuItemProps.id`)
 */
export interface DropdownMenuLoadMoreContext {
  direction: 'end';
  anchorFlatIndex: number;
  anchorValue: string;
  anchorId?: string;
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}

/**
 * Режим встроенной фильтрации по строке поиска (если не задан кастомный `searchFilter`):
 * `wholly` — вся строка запроса как одна подстрока в `label` / `description`;
 * `word` — каждое слово запроса (разделение по пробелам) должно встречаться в объединённом тексте пункта.
 */
export type SearchFormat = 'word' | 'wholly';

/**
 * Частичные пропсы индикатора открытия меню (`Icon` в `Select` / дефолтный триггер `Dropdown` без `trigger`).
 * Без `name` подставляется `IconPlainerChevronDown`; остальное мержится поверх размера от `size` и цвета по умолчанию.
 */
export type OpenMenuIconProps = Partial<{
  name: IconName;
  size: IconSize;
  color: string;
  className: string;
}>;

/**
 * Частичные пропсы иконок сброса (`IconExClose` по умолчанию): кнопка очистки поля, «очистить всё» у мультиселекта, крест в чипе.
 * Та же форма, что у `OpenMenuIconProps` — мерж поверх вычисленного `size` и `color`.
 */
export type ClearIconProps = OpenMenuIconProps;

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
  /** Вызывается сразу после открытия меню (вместе с `onMenuOpenChange(true)`) */
  onMenuOpened?: () => void;
  /** Вызывается сразу после закрытия меню */
  onMenuClosed?: () => void;
  /** Прокрутка любого вложенного прокручиваемого блока меню (capture на контейнере панели) */
  onMenuScroll?: (info: DropdownMenuScrollInfo) => void;
  /**
   * Догрузка при приближении к низу списка; родитель дописывает `items`, скролл стабилизируется по дельте высоты.
   * Задайте `menuHasMore={false}`, когда данных больше нет.
   */
  onMenuLoadMore?: (context: DropdownMenuLoadMoreContext) => void | Promise<void>;
  /** Порог в px от низа прокрутки для вызова `onMenuLoadMore` (по умолчанию 80) */
  menuLoadMoreThresholdPx?: number;
  /** Есть ли ещё порции данных (пока `false`, порог не вызывает догрузку) */
  menuHasMore?: boolean;
  /** Внешний флаг загрузки: пока `true`, повторные вызовы `onMenuLoadMore` не выполняются */
  menuIsLoadingMore?: boolean;
  disabled?: boolean;
  targetElement?: HTMLElement | null;
  size?: Size;
  variant?: 'default' | 'elevated' | 'outlined';
  multiSelection?: boolean;
  /**
   * При `multiSelection`: показывать чекбокс в пункте (по умолчанию `true`).
   * `false` — мультивыбор по клику на строку без чекбоксов.
   */
  showCheckbox?: boolean;
  disableSelectedOptionHighlight?: boolean;
  virtualScroll?: DropdownVirtualScrollConfig;
  disableAutoFocus?: boolean;
  onSelect?: (value?: DropdownMenuItemValue, event?: React.MouseEvent<HTMLElement>) => void;
  onActivateItem?: (value?: DropdownMenuItemValue) => void;
  renderTopPanel?: (props: DropdownTopPanelProps) => React.ReactNode;
  renderBottomPanel?: (props: DropdownTopPanelProps) => React.ReactNode;
  onClickOutside?: (event: Event) => void;
  /** Фокус внутри корня выпадашки (триггер или портал с меню; `currentTarget` — элемент с обработчиком) */
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  /** Потеря фокуса внутри корня / панели меню */
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  menuWidth?: string | number;
  menuMaxHeight?: string | number;
  alignSelf?: DropdownAlignSelf;
  dropContainerStyle?: React.CSSProperties;
  dropContainerCssMixin?: DropdownCssMixin;
  positioningMode?: DropdownPositioningMode;
  portalContainer?: HTMLElement | null;
  /**
   * Если `false`, клик по обёртке триггера не открывает/закрывает меню (только снаружи через `isMenuOpen` / свой UI).
   * Для комбобокса с полем ввода в триггере (`Select` `searchSelect`), чтобы не конфликтовать с кликом по `input`.
   */
  triggerWrapClickToggle?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  defaultSearchValue?: string;
  /** Строка поиска и активный `searchFormat` (второй аргумент, если задан проп `searchFormat`) */
  onSearch?: (query: string, searchFormat?: SearchFormat) => void;
  /** Нативное событие `change` у поля поиска в шапке панели (после обновления строки поиска внутри `Dropdown`) */
  onSearchInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  searchFilter?: (query: string, item: DropdownMenuItemProps) => boolean;
  /** Встроенный поиск: `wholly` — подстрока целиком; `word` — по отдельным словам запроса */
  searchFormat?: SearchFormat;
  enableKeyboardNavigation?: boolean;
  loadItems?: () => Promise<DropdownMenuItemProps[]>;
  onLoadItemsError?: (error: unknown) => void;
  renderEmptyState?: () => React.ReactNode;
  emptyMessage?: string;
  renderErrorState?: (error?: unknown, retry?: () => void) => React.ReactNode;
  inline?: boolean;
  /** Плотность меню: `compact` — меньше padding у контейнера и строк (например, месяц/год в календаре) */
  menuDensity?: 'default' | 'compact';
  /**
   * Растянуть корень (`DropdownContainer`) и обёртку триггера на ширину родителя.
   * Нужно для полей вроде `Select` с `fullWidth`: иначе `inline-block` даёт ширину по контенту.
   */
  fullWidth?: boolean;
  /**
   * Пропсы иконки раскрытия меню у дефолтной кнопки (`trigger` не задан): мерж с `IconPlainerChevronDown` и `getChevronIconSizeForField(size)`.
   * При кастомном `trigger` не применяется.
   */
  openMenuIconProps?: OpenMenuIconProps;
  /**
   * Встроенный триггер без кастомного `trigger`: кнопка (`button`) или тег (`tag`).
   * Текст — `buttonProps.children`; при `tag` оформление — поле {@link tagTriggerProps}.
   */
  defaultTriggerKind?: DropdownDefaultTriggerKind;
  /** Пропсы тега при `defaultTriggerKind="tag"` */
  tagTriggerProps?: DropdownTagTriggerProps;
  /**
   * При `defaultTriggerKind="tag"`: подставить на триггер `label` выбранного пункта из `items` (одиночный выбор).
   */
  labelFromSelection?: boolean;
  /**
   * При `defaultTriggerKind="tag"`: показывать шеврон из {@link openMenuIconProps}, если в {@link tagTriggerProps} не задан `rightIcon`.
   */
  tagTriggerShowChevron?: boolean;
  children?: React.ReactElement<DropdownMenuProps> | React.ReactNode;
  /**
   * Дерево пунктов (`nestedItems`): каскадный мультивыбор и раскрытие веток (как у групп-чекбоксов в меню).
   * Если не задано, поведение как раньше; при наличии `nestedItems` в `items` достаточно передать `treeDefaultExpanded` / `treeExpandedKeys`.
   */
  treeExpandable?: boolean;
  /** Начальное раскрытие веток с дочерними элементами: все развёрнуты (по умолчанию), все свёрнуты или явный список ключей веток */
  treeDefaultExpanded?: 'expanded' | 'collapsed' | string[];
  /** Контролируемый набор ключей раскрытых веток */
  treeExpandedKeys?: string[];
  /** Смена набора раскрытых веток (контролируемый режим) */
  onTreeExpandedKeysChange?: (keys: string[]) => void;
  /**
   * Полный узел дерева по `value` (например, селект: полные `nestedItems` при отфильтрованном меню).
   * Нужен для чекбокса родителя и каскада; без него используются только `nestedItems` из пропсов пункта.
   */
  lookupTreeMenuItemByValue?: (itemValue: string) => DropdownMenuItemProps | null;
}

/** Пропсы верхней/нижней панели выпадающего меню (`renderTopPanel` / `renderBottomPanel`) */
export interface DropdownTopPanelProps {
  size?: Size;
  variant?: 'default' | 'elevated' | 'outlined';
  disabled?: boolean;
}

/**
 * Пропсы контейнера меню
 * @property children - Набор элементов меню (обычно `DropdownMenuItem`)
 * @property onItemSelect - Внутренний колбэк, который прокидывает `Dropdown` для закрытия меню
 * @property value - Значение выбранного элемента для сравнения с `value` элементов меню. В режиме multiSelection - массив значений
 * @property onActivateItem - Обработчик активации (hover) элемента меню. Получает значение элемента (`value`)
 * @property multiSelection - Режим множественного выбора
 * @property showCheckbox - При `multiSelection`: показывать чекбокс (по умолчанию `true`; `false` — скрыть)
 * @property disableSelectedOptionHighlight - Отключает подсветку выбранной опции
 * @property virtualScroll - Конфигурация виртуального скролла
 * @property size - Размер dropdown для вычисления высоты элемента при itemHeight="auto"
 * @property menuDensity - `compact` — плотные пункты списка (согласовано с `Dropdown.menuDensity`)
 * @property treeExpandable - Показывать шеврон и разрешать сворачивать ветки с `nestedItems` (по умолчанию `true`, если в данных есть дерево)
 * @property defaultExpandedTreeKeys - Ключи развёрнутых веток при первом показе (неконтролируемый режим; считает родитель)
 * @property treeExpandedKeys - Контролируемые ключи раскрытых веток
 * @property onTreeExpandedKeysChange - Колбэк при смене раскрытия (контролируемый режим)
 * @property lookupTreeMenuItemByValue - Поиск полного узла по `value` для каскада чекбокса при урезанном дереве в панели
 */
export interface DropdownMenuProps extends BaseComponentProps {
  children: React.ReactNode;
  onItemSelect?: (value?: DropdownMenuItemValue, event?: React.MouseEvent<HTMLElement>) => void;
  value?: DropdownMenuItemValue | DropdownMenuItemValue[];
  onActivateItem?: (value?: DropdownMenuItemValue) => void;
  multiSelection?: boolean;
  /** При `multiSelection`: показывать чекбокс в пункте (по умолчанию `true`) */
  showCheckbox?: boolean;
  disableSelectedOptionHighlight?: boolean;
  virtualScroll?: DropdownVirtualScrollConfig;
  size?: Size;
  menuDensity?: 'default' | 'compact';
  /** Разрешить сворачивание веток с `nestedItems` */
  treeExpandable?: boolean;
  /** Ключи веток, развёрнутые по умолчанию (неконтролируемое дерево) */
  defaultExpandedTreeKeys?: string[];
  treeExpandedKeys?: string[];
  onTreeExpandedKeysChange?: (keys: string[]) => void;
  /** Полный узел по `value` (см. `DropdownProps.lookupTreeMenuItemByValue`) */
  lookupTreeMenuItemByValue?: (itemValue: string) => DropdownMenuItemProps | null;
}

/**
 * Пропсы элемента меню
 * @property label - Основное содержимое пункта меню (`ReactNode`)
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
 * @property tooltip - Контент тултипа для конкретного пункта меню (если задан, включается автоматически)
 * @property tooltipType - Тип подсказки у пункта: `tooltip` (по умолчанию) или `hint`
 * @property tooltipPosition - Позиция тултипа пункта (`top` | `bottom` | `left` | `right`)
 * @property onSelect - Индивидуальный обработчик выбора
 * @property children - Кастомное содержимое, если нужно полностью переопределить верстку
 * @property nestedItems - Дочерние пункты дерева (мультивыбор: каскад у родителя, частичный выбор, `indeterminate` у чекбокса)
 * @property treeAncestorKey - Префикс ключа ветки для дочерних узлов (задаёт рендерер дерева)
 */
export interface DropdownMenuItemProps extends BaseComponentProps {
  label?: ReactNode;
  description?: string;
  /** Необязательный стабильный id строки (курсор API, отличный от `value`) */
  id?: string;
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
  tooltip?: React.ReactNode;
  /** `tooltip` — компактный тултип; `hint` — карточка подсказки (`Hint`) */
  tooltipType?: 'tooltip' | 'hint';
  tooltipPosition?: TooltipPosition;
  onSelect?: (value?: DropdownMenuItemValue, event?: React.MouseEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
  showTooltip?: boolean;
  tooltipText?: string;
  /** Дочерние пункты того же формата (рекурсивное дерево для мультивыбора и раскрытия) */
  nestedItems?: DropdownMenuItemProps[];
  /** Префикс пути для построения ключа ветки (`''` или `g0` для группы) */
  treeAncestorKey?: string;
  /** Индекс среди соседей (для стабильного ключа ветки) */
  treeIndex?: number;
  /** Дополнительный клик по строке (после встроенной логики выбора); не должен подменять основной обработчик строки. */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
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
 * Внешний вид табов (pill, классическая линия с фоном или текстовые вкладки с индикатором)
 */
export enum TabsVariant {
  /** Нижняя/боковая полоса-индикатор, заливка активного пункта, фон трека */
  LINE = 'line',
  /**
   * Без обёртки трека и без вида кнопки: только подписи и тонкая линия снизу (горизонталь)
   * или справа (вертикаль) в цвете **primary** темы у активного пункта (в теме совпадает с **info**).
   */
  UNDERLINE = 'underline',
  /** Сегментированный контрол в скруглённом треке */
  PILL = 'pill',
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

/**
 * Описание одной вкладки для пропа **items** у **Tabs** / **TabItem.Group**: те же поля, что у **TabItem** внутри группы.
 * Поля **direction**, **variant**, **defaultActive**, **active**, **onChange** задаются на корне группы, не в элементе.
 *
 * @property value — Уникальный идентификатор вкладки
 * @property label — Подпись триггера (**ReactNode**)
 * @property children — Панель контента под вкладкой (опционально; для чистых сегментов можно не передавать)
 * @property iconStart — Иконка в начале триггера
 * @property iconEnd — Иконка в конце триггера
 * @property badge — Содержимое счётчика; рендер через **Badge** (**BadgeVariant.DEFAULT**, **Size.SM**)
 * @property textOrientation — Ориентация текста на триггере
 * @property textPosition — Позиция текста при вертикальной ориентации
 * @property disabled — Отключить переключение
 * @property loading — Индикатор загрузки на триггере
 * @property skeleton — Плейсхолдер без интерактива
 * @property triggerClassName — Класс кнопки-триггера
 * @property contentClassName — Класс панели контента
 * @property triggerProps — Доп. атрибуты кнопки-триггера
 * @property contentProps — Доп. атрибуты панели контента
 */
export interface TabsItemDefinition {
  value: string;
  label?: React.ReactNode;
  children?: React.ReactNode;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  badge?: React.ReactNode;
  textOrientation?: TabItemTextOrientation;
  textPosition?: TabItemTextPosition;
  disabled?: boolean;
  loading?: boolean;
  skeleton?: boolean;
  triggerClassName?: string;
  contentClassName?: string;
  triggerProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'children'>;
  contentProps?: Omit<HTMLAttributes<HTMLDivElement>, 'value' | 'children'>;
}

export interface TabsProps extends BaseComponentProps {
  /** Неконтролируемый начальный id активной вкладки */
  defaultActiveTab?: string;
  /** Алиас для **defaultActiveTab** */
  defaultValue?: string;
  /** Контролируемый id активной вкладки */
  value?: string;
  onChange?: (activeTab: string) => void;
  /** Направление отображения табов */
  direction?: TabsDirection;
  /** Позиция табов в вертикальном режиме (слева или справа от контента) */
  tabsPosition?: TabsVerticalPosition;
  /**
   * Вариант оформления. Если не задан: горизонтально — pill (макет сегментов), вертикально — line.
   */
  variant?: TabsVariant;
  /** Доступное имя группы (**role="group"**); для сегментов без панелей рекомендуется задать явно */
  ariaLabel?: string;
  /**
   * Атрибуты трека сегментов (внутренний **TabItemGroupList**): **className**, **style**, **data-*** и т.д.
   * К **className** добавляется **ui-tabs-list**.
   */
  segmentTrackProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;
  /**
   * Вкладки из данных: при непустом массиве рендерятся как **Tabs.Item** с теми же полями; **children** у корня для списка вкладок не используется.
   */
  items?: TabsItemDefinition[];
}

/**
 * Укороченная строка для сегментов без панели (подмножество **TabsItemDefinition**).
 */
export type TabsSegmentOption = Pick<
  TabsItemDefinition,
  | 'value'
  | 'label'
  | 'disabled'
  | 'loading'
  | 'skeleton'
  | 'iconStart'
  | 'iconEnd'
  | 'badge'
>;

/**
 * Способ раскрытия компактного меню навигации до полного (подписи + ширина)
 */
export enum NavigationMenuExpandInteraction {
  /** Только проп `collapsed` / ширина снаружи, без авто-раскрытия */
  NONE = 'none',
  /** Переключение по клику по области меню (не по кнопкам/ссылкам пунктов) */
  CLICK = 'click',
  /** Раскрытие при наведении на меню, сворачивание при уходе курсора */
  HOVER = 'hover',
  /** Только кнопка в шапке (`Sidemenu`: встроенная или {@link SidemenuProps.expandToggleRender}); клик по оболочке не переключает */
  TOGGLE_BUTTON = 'toggleButton',
}

/**
 * Подсветка активного пункта бокового меню навигации (макет Figma; компонент `NavigationMenu`)
 */
export enum NavigationMenuActiveAppearance {
  /** Синяя полоса слева + акцентный цвет подписи и иконок */
  BAR = 'bar',
  /** Полоса + мягкий голубой фон */
  HIGHLIGHTED = 'highlighted',
  /** Сплошная заливка primary, белый текст */
  SOLID = 'solid',
}

/**
 * Визуальный статус пункта навигации (оттенок строки, без смены логики active)
 */
export enum NavigationMenuItemStatus {
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
  INFO = 'info',
}

/**
 * Пропсы контейнера вертикального меню навигации (`NavigationMenu`)
 * @property collapsed — компактный режим: только иконки, бейдж на иконке (игнорируется при expandInteraction ≠ none — см. ниже)
 * @property activeId — id выбранного пункта (контролируемый режим)
 * @property defaultActiveId — начальный выбранный пункт
 * @property onActiveChange — смена выбранного id
 * @property activeAppearance — стиль подсветки активного пункта
 * @property aria-label — доступное имя для элемента навигации
 * @property expandInteraction — none | click | hover: раскрытие компактного меню (подписи + ширина)
 * @property expanded — контролируемое «раскрыто до полного» (при expandInteraction ≠ none)
 * @property defaultExpanded — начальное раскрытие в неконтролируемом режиме
 * @property onExpand — после перехода в развёрнутое состояние
 * @property onCollapse — после перехода обратно в компактное
 * @property onExpandedChange — для контролируемого режима: запрос смены expanded
 * @property expandCompactWidth — ширина в компактном виде (число px или css, по умолчанию 72)
 * @property expandFullWidth — ширина в развёрнутом виде (по умолчанию 100%)
 */
export interface NavigationMenuProps extends BaseComponentProps {
  collapsed?: boolean;
  activeId?: string | null;
  defaultActiveId?: string | null;
  onActiveChange?: (id: string) => void;
  activeAppearance?: NavigationMenuActiveAppearance;
  'aria-label'?: string;
  expandInteraction?: NavigationMenuExpandInteraction;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
  onExpandedChange?: (expanded: boolean) => void;
  expandCompactWidth?: number | string;
  expandFullWidth?: number | string;
  /**
   * При **collapsed** вложенные пункты (**items**) показать во всплывающей панели при наведении на ветку (справа от колонки).
   * Если **false** — вложенность в узкой колонке не отображается (прежнее поведение).
   * @default true
   */
  collapsedNestedFlyout?: boolean;
}

/**
 * Пропсы пункта меню навигации (`NavigationMenuItem`)
 * @property id — уникальный ключ внутри навигации (связь с activeId)
 * @property label — основной текст (в collapsed скрывается визуально)
 * @property icon — префикс-иконка слева
 * @property badge — содержимое счётчика; рендерится через компонент **Badge** (в expanded — справа, в collapsed — у иконки)
 * @property suffix — суффикс (например шеврон подменю)
 * @property disabled — отключённое состояние
 * @property href — если задан, рендерится ссылка вместо кнопки
 * @property title — подсказка; в collapsed по умолчанию не задаётся из label (передайте строку)
 * @property onClick — дополнительный обработчик клика
 * @property status — цветовой акцент строки (успех / предупреждение / ошибка / информация)
 * @property loading — индикатор загрузки; клик не меняет active
 * @property skeleton — плейсхолдер-скелетон вместо содержимого; строка не интерактивна
 * @property isVisible — показ строки с анимацией; при false строка сворачивается и скрывается
 * @property items — вложенные пункты (рекурсивно); при наличии строка становится веткой (раскрытие по клику)
 * @property defaultNestedExpanded — см. поле в интерфейсе (ветка в колонке или flyout в compact)
 * @property hint — всплывающий {@link Hint} вокруг кнопки/ссылки; если переданы и hint и tooltip, используется hint
 * @property tooltip — {@link Tooltip} вокруг кнопки/ссылки; игнорируется при наличии hint
 * @property popover — {@link Popover} снаружи: `children` — панель, `trigger` задаётся кнопкой/ссылкой; на **листе** по умолчанию клик не меняет **activeId** (см. **popoverActivateNavigation**)
 * @property popoverActivateNavigation — если **true**, при наличии **popover** клик по листу также выбирает пункт (**activeId**); по умолчанию при заданном **popover** — только открытие панели
 */
export interface NavigationMenuItemProps {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
  href?: string;
  className?: string;
  title?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  status?: NavigationMenuItemStatus;
  loading?: boolean;
  skeleton?: boolean;
  isVisible?: boolean;
  /** Вложенные уровни; id по всему дереву должны быть уникальны */
  items?: NavigationMenuItemProps[];
  /**
   * Начально раскрыта ли ветка (развёрнутая панель — подсписок в колонке; compact + **collapsedNestedFlyout** — открыт ли flyout при монтировании).
   */
  defaultNestedExpanded?: boolean;
  /** Конфиг Hint без children — триггер задаётся строкой пункта */
  hint?: Omit<HintProps, 'children'>;
  /** Конфиг Tooltip без children */
  tooltip?: Omit<TooltipProps, 'children'>;
  /** Конфиг Popover без trigger: `children` — содержимое панели */
  popover?: Omit<PopoverProps, 'trigger'>;
  /**
   * Только для **листа** с **popover**: при `true` клик по строке ещё и выставляет **activeId**; при `false` или без явного значения при наличии **popover** выбор пункта не выполняется (удобно, когда панель заменяет переход).
   */
  popoverActivateNavigation?: boolean;
}

/**
 * Поверхность списка действий: содержимое выпадающей панели по паттерну WAI-ARIA Menu.
 * Позиционирование относительно якоря (портал, Popper) задаётся снаружи; компонент отвечает за список и клавиатурную навигацию по пунктам.
 * @property aria-label — подпись для `role="menu"`
 * @property id — id корневого списка
 * @property maxHeight — ограничение высоты с прокруткой
 * @property dense — уменьшенные вертикальные отступы у пунктов
 * @property autoFocusFirstItem — при монтировании перевести фокус на первый доступный пункт (удобно после открытия панели)
 */
export interface MenuProps extends BaseComponentProps {
  'aria-label'?: string;
  id?: string;
  maxHeight?: string | number;
  dense?: boolean;
  autoFocusFirstItem?: boolean;
}

/**
 * Пункт выпадающего меню (`MenuItem`): интерактивная строка с `role="menuitem"`.
 * @property children — содержимое строки (текст, иконка и т.д.)
 * @property disabled — отключённое состояние и исключение из стрелок на клавиатуре
 * @property selected — визуальное выделение текущего выбора
 * @property destructive — стиль для опасного действия
 * @property onClick — клик по пункту
 * @property className — класс на кнопке
 */
export interface MenuItemProps {
  children: React.ReactNode;
  disabled?: boolean;
  selected?: boolean;
  destructive?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

/**
 * Закрепление плавающей панели у края экрана (ось-выравнивание).
 */
export enum FloatingMenuPlacement {
  LEFT_TOP = 'left-top',
  LEFT_CENTER = 'left-center',
  LEFT_BOTTOM = 'left-bottom',
  RIGHT_TOP = 'right-top',
  RIGHT_CENTER = 'right-center',
  RIGHT_BOTTOM = 'right-bottom',
  TOP_LEFT = 'top-left',
  TOP_CENTER = 'top-center',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_CENTER = 'bottom-center',
  BOTTOM_RIGHT = 'bottom-right',
}

/**
 * Внешний вид группы кнопок внутри панели (макет Figma: вторая группа — светлый «инсет»).
 */
export enum FloatingMenuGroupVariant {
  /** Обычные кнопки на белом фоне панели */
  DEFAULT = 'default',
  /** Вложенный серый блок со скруглением */
  INSET = 'inset',
}

/**
 * Как открывается всплывающее меню у пункта.
 */
export enum FloatingMenuDropdownTrigger {
  CLICK = 'click',
  HOVER = 'hover',
}

/**
 * С чего начинается перетаскивание панели.
 */
export enum FloatingMenuDragSource {
  /** За всю панель (кроме интерактивных дочерних кнопок) */
  BAR = 'bar',
  /** Только за область `FloatingMenu.DragHandle` */
  HANDLE = 'handle',
}

/**
 * Пропсы корневой плавающей панели (toolbar).
 * @property placement — фиксация у края экрана; не используется при `draggable=true` (позиция задаётся смещением)
 * @property draggable — свободное перемещение по экрану
 * @property dragSource — перетаскивание за всю панель или только за `DragHandle`
 * @property defaultOffset — начальные координаты `left/top` в px при `draggable` (если не заданы — центр по нижнему краю)
 * @property zIndex — слой отображения
 * @property aria-label — подпись для `role="toolbar"`
 */
export interface FloatingMenuProps extends BaseComponentProps {
  placement?: FloatingMenuPlacement;
  draggable?: boolean;
  dragSource?: FloatingMenuDragSource;
  defaultOffset?: { x: number; y: number };
  zIndex?: number;
  'aria-label': string;
}

/**
 * Пропсы группы действий (между группами — `FloatingMenu.Divider`).
 * @property variant — default или inset (серый фон)
 */
export interface FloatingMenuGroupProps extends BaseComponentProps {
  variant?: FloatingMenuGroupVariant;
}

/**
 * Пропсы кнопки пункта панели.
 * @property icon — содержимое кнопки (иконка)
 * @property active — выбранный инструмент (яркая подложка `theme.colors.info` в default-группе; в inset — цвет иконки info)
 * @property disabled — отключить взаимодействие
 * @property hasDropdown — показать шеврон (рядом с иконкой)
 * @property dropdownTrigger — открытие меню по клику или по наведению
 * @property dropdownContent — вложенное меню (обычно `<Menu>…</Menu>`)
 * @property tooltip — текст или узел для `Tooltip`
 * @property tooltipPosition — положение подсказки
 * @property onClick — клик по кнопке
 */
export interface FloatingMenuGroupItemProps extends BaseComponentProps {
  icon: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  hasDropdown?: boolean;
  dropdownTrigger?: FloatingMenuDropdownTrigger;
  dropdownContent?: React.ReactNode;
  tooltip?: React.ReactNode;
  tooltipPosition?: TooltipPosition;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  'aria-label': string;
}

/**
 * Пропсы маркера зоны перетаскивания (при `dragSource={HANDLE}`).
 */
export interface FloatingMenuDragHandleProps extends BaseComponentProps {
  children?: React.ReactNode;
}

/**
 * Пропсы вертикального разделителя между группами.
 */
/** Разделитель групп: только базовые пропсы (`className`, `style` и т.д.) */
export type FloatingMenuDividerProps = BaseComponentProps;

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
   * Заголовок шага (`ReactNode`)
   */
  label: ReactNode;
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
 * Визуальный режим степпера навигации (светлая / тёмная панель; скругление из `theme.borderRadius`).
 */
export type StepperAppearance = 'light' | 'dark';

/**
 * Вариант степпера: компактное кольцо с «N/M» и подписями или горизонтальная цепочка шагов с линиями.
 */
export type StepperVariant = 'compact' | 'linear';

/**
 * Шаг для варианта `Stepper` с `variant="linear"`.
 * @property stepLabel - Подпись над заголовком (по умолчанию «Шаг N»).
 * @property title - Основной текст пункта.
 */
export interface StepperLinearStep {
  stepLabel?: ReactNode;
  title: ReactNode;
}

/**
 * Общие пропсы степпера навигации (макеты Figma: узлы 4806-10699, 4809-2458).
 * @property appearance - Принудительно светлый/тёмный вид панели; без значения берётся из `ThemeProvider.mode`.
 * @property fullWidth - Растянуть корневой `nav` на ширину контейнера.
 * @property backButtonLabel - `aria-label` кнопки «назад».
 * @property onBack - Обработчик клика по стрелке назад (кнопка скрыта, если не передан).
 */
export interface StepperBaseProps extends BaseComponentProps {
  appearance?: StepperAppearance;
  fullWidth?: boolean;
  backButtonLabel?: string;
  onBack?: () => void;
}

/**
 * Компактный степпер: назад, кольцо прогресса с «current/total», заголовок и подзаголовок.
 * @property variant - Обязательно `compact`.
 * @property currentStep - Текущий шаг, счёт с 1 (внутри кольца «1/3»).
 * @property totalSteps - Всего шагов.
 * @property title - Основная строка справа.
 * @property subtitle - Вторая строка (например «Следующий шаг»).
 */
export interface StepperCompactProps extends StepperBaseProps {
  variant: 'compact';
  currentStep: number;
  totalSteps: number;
  title: ReactNode;
  subtitle?: ReactNode;
}

/**
 * Линейный степпер: назад, шаги с кружками и соединителями.
 * @property variant - Обязательно `linear`.
 * @property steps - Список шагов.
 * @property activeStepIndex - Индекс активного шага, с 0.
 */
export interface StepperLinearProps extends StepperBaseProps {
  variant: 'linear';
  steps: StepperLinearStep[];
  activeStepIndex: number;
}

/**
 * Пропсы компонента `Stepper` (объединение вариантов `compact` и `linear`).
 */
export type StepperProps = StepperCompactProps | StepperLinearProps;

/**
 * Формат подписи в шапке календаря (рядом со стрелками).
 * - `monthYear` — только месяц и год видимого месяца
 * - `full` — день, месяц, год выбранной даты (или видимого месяца, если даты нет)
 * - `dayMonth` — день и месяц выбранной даты
 */
export type CalendarHeaderMode = 'monthYear' | 'full' | 'dayMonth';

/**
 * Разметка выбора месяца и года в шапке календаря.
 * - `combined` — один триггер и выпадающий список месяц+год.
 * - `split` — два отдельных триггера (макет Figma «триггеры»).
 */
export type CalendarMonthYearLayout = 'combined' | 'split';

/**
 * Пропсы календаря (сетка месяца по макету Figma).
 * @property value - Контролируемая выбранная дата (`undefined` — неконтролируемый режим).
 * @property defaultValue - Начальное значение в неконтролируемом режиме.
 * @property visibleMonth - Контролируемый отображаемый месяц (первое число месяца логически).
 * @property defaultVisibleMonth - Стартовый месяц сетки без `visibleMonth`.
 * @property onChange - Выбор дня.
 * @property onVisibleMonthChange - Смена месяца (стрелки или выпадающий список).
 * @property locale - Локаль для `Intl` и подписей дней недели.
 * @property minDate / maxDate - Границы выбора и навигации.
 * @property isDateDisabled - Дополнительное отключение дат.
 * @property showTitle — заголовок «Календарь» над панелью.
 * @property weekStartsOn — 0: с воскресенья, 1: с понедельника (по умолчанию 1).
 * @property headerMode — формат строки месяца/даты в триггере.
 * @property showMonthPicker — выпадающий выбор месяца/года (`Dropdown`).
 * @property monthPickerRange — сколько месяцев назад и вперёд включить в список (симметрично).
 * @property size — размер ячеек и отступов.
 * @property disabled — блокировка взаимодействия.
 * @property selectionMode — `single` (по умолчанию) или `range` (подсветка диапазона).
 * @property rangeStart / rangeEnd / rangeHoverDate — состояние диапазона; конец предпросмотра при наведении.
 * @property onSelectDate — клик по дню: если задан, вызывается вместо встроенной логики `onChange` (удобно для `DateInput`).
 * @property weekdays — ровно 7 подписей столбцов (иначе из `Intl` по `locale` и `weekStartsOn`).
 * @property footer — блок под сеткой (кнопки «Очистить» / «Применить» и т.п.).
 * @property embedded — компактный вид без лишней тени (внутри попапа `DateInput`).
 * @property fullWidth — растянуть календарь на всю ширину контейнера.
 * @property onDayMouseEnter / onDayMouseLeave — наведение на день (предпросмотр конца диапазона в `DateInput`).
 * @property showDateRollers — три колонки «день — месяц — год» над сеткой (макет Figma «роллеры»).
 * @property monthYearLayout — один выпадающий список или два триггера месяц / год.
 * @property onRollersDateChange — если задан, роллеры вызывают его вместо `onSelectDate`/`onChange` (например, без закрытия попапа в `DateInput`).
 */
export type CalendarSelectionMode = 'single' | 'range';

export interface CalendarProps
  extends
    BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange' | 'defaultValue' | 'value'> {
  value?: Date | null;
  defaultValue?: Date | null;
  visibleMonth?: Date;
  defaultVisibleMonth?: Date;
  onChange?: (date: Date) => void;
  onVisibleMonthChange?: (monthStart: Date) => void;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
  showTitle?: boolean;
  weekStartsOn?: 0 | 1;
  headerMode?: CalendarHeaderMode;
  showMonthPicker?: boolean;
  monthPickerRange?: number;
  size?: Size;
  disabled?: boolean;
  selectionMode?: CalendarSelectionMode;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  rangeHoverDate?: Date | null;
  onSelectDate?: (date: Date) => void;
  weekdays?: string[];
  footer?: React.ReactNode;
  embedded?: boolean;
  fullWidth?: boolean;
  onDayMouseEnter?: (date: Date) => void;
  onDayMouseLeave?: () => void;
  showDateRollers?: boolean;
  monthYearLayout?: CalendarMonthYearLayout;
  onRollersDateChange?: (date: Date) => void;
}

/**
 * Пропсы роллеров даты (день / месяц / год).
 * @property value — текущая дата (время игнорируется).
 * @property onChange — выбор новой даты после прокрутки или клика.
 * @property locale — подписи месяцев через `Intl`.
 * @property minDate / maxDate — границы календарного дня.
 * @property isDateDisabled — дополнительная блокировка конкретных дат.
 * @property size — размер отступов между колонками.
 * @property disabled — отключить взаимодействие.
 */
export interface DateRollerPickerProps extends BaseComponentProps {
  value: Date;
  onChange: (date: Date) => void;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
  size?: Size;
  disabled?: boolean;
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
  segments?: Array<{ value: number; color: string; label?: ReactNode }>;
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
 * @property label - Подпись рядом со спиннером (`ReactNode`)
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
  label?: ReactNode;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  centered?: boolean;
  ariaLabel?: string;
  /** Инлайн-стили корневого элемента спиннера */
  style?: React.CSSProperties;
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
 * Элемент списка нативного `Select`
 * @property value - Значение `value` у тега `option`
 * @property label - Отображаемая подпись
 * @property disabled - Отключённая опция
 * @property tooltip - Контент тултипа пункта в панельных режимах (`select` / `searchSelect`)
 * @property tooltipType - Тип подсказки у пункта в списке: `tooltip` (по умолчанию) или `hint`
 * @property tooltipPosition - Позиция тултипа пункта (`top` | `bottom` | `left` | `right`)
 */
export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  tooltip?: React.ReactNode;
  tooltipType?: 'tooltip' | 'hint';
  tooltipPosition?: TooltipPosition;
  /** Необязательный id для догрузки / API (передаётся в `onMenuLoadMore` как `anchorId`) */
  id?: string;
  /** Вложенные опции (дерево: каскадный мультивыбор и раскрытие в панели) */
  options?: SelectOption[];
}

/**
 * Пропсы селекта (нативный `select` в оболочке как у `Input`)
 * @property options - Список опций
 * @property label - Подпись поля
 * @property placeholder - Пустое состояние в триггере и первая опция (`value=""`) в native single; при `multiple` в панели (`select` / `searchSelect` в закрытом меню) — плейсхолдер при пустом выборе, при выборе — чипы с подписями в триггере
 * @property value - Контролируемое значение
 * @property defaultValue - Начальное значение в неконтролируемом режиме
 * @property onChange - Событие изменения (`ChangeEvent<HTMLSelectElement>`)
 * @property error - Текст ошибки и статус обводки
 * @property success - Успешное состояние
 * @property status - Явный статус обводки
 * @property helperText - Подсказка под полем
 * @property required - Обязательное поле
 * @property fullWidth - На всю ширину контейнера
 * @property readOnly - Блокировка выбора (через `disabled` у `select`, визуально как read-only)
 * @property disabled - Отключено
 * @property skeleton - Скелетон
 * @property size - Размер из `Size` (в компоненте по умолчанию `Size.SM`; конфликт с HTML `size` у `select` снят через `Omit`)
 * @property textAlign - Выравнивание текста
 * @property isLoading - Спиннер справа
 * @property tooltip - Подсказка
 * @property tooltipType - `tooltip` или `hint`
 * @property tooltipPosition - Позиция подсказки
 * @property additionalLabel - Доп. подпись
 * @property extraText - Текст под полем
 * @property onFocus - Фокус внутри оболочки `Dropdown` (триггер / портал меню), `FocusEvent` с `currentTarget` как у `HTMLDivElement`
 * @property onBlur - Потеря фокуса внутри оболочки / панели меню
 * @property mode - `native` — нативный `select`; `select` — панель как у `Dropdown` (поиск в шапке панели по умолчанию); `searchSelect` — фильтр в поле-триггере, без поиска в панели; при `multiple` в закрытом состоянии — чипы в триггере, при открытом — поле фильтра и чекбоксы в списке
 * @property multiple - Множественный выбор (нативно и в панельных режимах)
 * @property showCheckbox - При `multiple` в панели: чекбоксы в списке (по умолчанию `true`; `false` — скрыть)
 * @property moveSelectedOnTop - Поднимать выбранные опции в начало списка в панели. По умолчанию при `multiple` — включено (как раньше); при single по умолчанию выключено, передайте `true`, чтобы включить
 * @property displayClearIcon - Показывать кнопку очистки значения (иконка справа в триггере, до шеврона); при `multiple` с чипами не дублирует кнопку «очистить всё» у чипов
 * @property onClearIconClick - Колбэк по клику на крестик очистки (после сброса значения)
 * @property searchable - В `mode="select"`: поле поиска в панели (по умолчанию `true`, передайте `false` чтобы отключить). В `mode="searchSelect"` игнорируется (поиск только в триггере); строка запроса — `searchValue` / `onSearch` при контроле
 * @property searchPlaceholder - Плейсхолдер поиска в панели (`select`) или у поля в триггере (`searchSelect`)
 * @property searchValue - Контролируемая строка поиска (панель или триггер в зависимости от `mode`)
 * @property defaultSearchValue - Неконтролируемое значение поиска по умолчанию (панель)
 * @property onSearch - `(query, searchFormat?) => void` — изменение строки поиска (панель или триггер); второй аргумент — текущий `searchFormat`
 * @property onInputChange - Нативный `change` у внутреннего поля ввода поиска: в `searchSelect` — `input` в триггере; в `select` при `searchable` — поле в шапке панели (вызывается после внутреннего обновления строки вместе с `onSearch`, если задан)
 * @property searchFormat - Встроенная фильтрация без `searchFilter`: `wholly` — вся строка; `word` — по словам запроса (пробелы)
 * @property clearInputValueAfterSelect - Только `mode="searchSelect"`: после выбора пункта очищать строку в поле фильтра (`searchValue` / `onSearch` при контроле). По умолчанию `false`
 * @property searchFilter - Кастомная фильтрация пунктов (как у `Dropdown`)
 * @property dropdownVariant - Вариант оформления панели (`Dropdown`)
 * @property menuMaxHeight - Макс. высота панели
 * @property virtualScroll - Виртуальный скролл списка опций в панели (как у `Dropdown`): `{ itemHeight: number | 'auto' }`; при `'auto'` высота строки берётся из темы (`size` селекта); макс. высота области списка завязана на высоту одного пункта (см. `DropdownMenu`)
 * @property dropdownInline - `inline` у `Dropdown` (по умолчанию `false`: портал в body, меню под полем; `true` — меню внутри контейнера)
 * @property renderTopPanel - Кастомный блок над списком опций в панели (перед полем поиска в `select`, если `searchable`; см. `DropdownTopPanelProps`)
 * @property renderBottomPanel - Кастомный блок под списком опций; при `multiple` и `showMultiSelectAll` кнопка «Выбрать все» рендерится ниже этой панели
 * @property showMultiSelectionCountBadge - В панельных режимах при `multiple`: бейдж с числом выбранных слева от шеврона (по умолчанию включён)
 * @property showMultiSelectAll - При `multiple` в панели: кнопка «Выбрать все» в подвале (только неотключённые опции; по умолчанию `true`)
 * @property isMenuOpen - Контролируемое открытие панели: если задано (`true` / `false`), видимость меню берётся только из этого пропа (нужен `onMenuOpenChange`)
 * @property onMenuOpenChange - Запрос на открытие/закрытие панели (`true` — открыть); в контролируемом режиме обновите `isMenuOpen` снаружи
 * @property onOpenMenu - Панель открыта (`mode="select"` | `searchSelect`), вызывается при фактическом переходе в открытое состояние
 * @property onCloseMenu - Панель закрыта, вызывается при переходе в закрытое
 * @property onScrollMenu - Прокрутка контейнера выпадающего списка (метрики элемента, на котором скролл)
 * @property onMenuLoadMore - Догрузка при приближении к низу списка; в колбэке — индекс и `value`/`id` якорной строки
 * @property menuLoadMoreThresholdPx - Порог в px до низа для `onMenuLoadMore`
 * @property menuHasMore - Есть ли ещё данные для догрузки
 * @property menuIsLoadingMore - Блокировка повторного вызова догрузки снаружи
 * @property openMenuIconProps - Пропсы иконки шеврона: панельные режимы — в `Dropdown`; `native` — мерж к `Icon` у поля
 * @property clearIconProps - Как у `BaseInputProps`: крест в чипе, «очистить всё», кнопка сброса в триггере (`select` / `searchSelect`)
 * @property onValueChange - Удобный колбэк при смене значения в `mode="select"` (строка или массив строк)
 * @property onSelectedChange - Событие при изменении выбранной опции или набора опций (`select` / `searchSelect` / `native`): актуальное `value` — строка или массив строк
 * @property value - Для `multiple` — массив строк; иначе строка
 * @property defaultValue - Аналогично `value` для неконтролируемого режима
 */
export interface SelectProps
  extends
    Omit<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      'size' | 'children' | 'value' | 'defaultValue' | 'onFocus' | 'onBlur'
    >,
    Pick<BaseInputProps, 'clearIconProps'> {
  options: SelectOption[];
  label?: ReactNode;
  placeholder?: string;
  value?: string | string[];
  defaultValue?: string | string[];
  error?: string;
  success?: boolean;
  status?: 'error' | 'success' | 'warning';
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  readOnly?: boolean;
  skeleton?: boolean;
  size?: Size;
  textAlign?: 'left' | 'center' | 'right';
  isLoading?: boolean;
  tooltip?: React.ReactNode;
  tooltipType?: 'tooltip' | 'hint';
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  additionalLabel?: string;
  extraText?: string;
  /**
   * Фокус на оболочке комбобокса (`Dropdown`) или нативного поля (`InputWrapper` вокруг `select`): событие с `currentTarget` как у `HTMLDivElement`.
   */
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  /** Потеря фокуса на оболочке (аналогично `onFocus`) */
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  /** `select` — панель `Dropdown`; `searchSelect` — поиск в триггере (single или `multiple`); `native` — системный `select` */
  mode?: 'native' | 'select' | 'searchSelect';
  /** В `mode="select"`: поле поиска в панели (по умолчанию `true`). В `searchSelect` не используется */
  searchable?: boolean;
  /** В `mode="select"`: плейсхолдер поиска в панели. В `searchSelect`: плейсхолдер у поля ввода в триггере */
  searchPlaceholder?: string;
  /** Контролируемая строка поиска: в `searchSelect` — текст в поле при открытом меню; в `select` — строка в панели `Dropdown` */
  searchValue?: string;
  defaultSearchValue?: string;
  /** Ввод в строку поиска (`searchSelect` — в триггере; `select` — в панели при `searchable`); второй аргумент — текущий `searchFormat` */
  onSearch?: (query: string, searchFormat?: SearchFormat) => void;
  /** Событие `change` внутреннего `HTMLInputElement` поиска (триггер `searchSelect` или поле в панели `select`) */
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  searchFilter?: (query: string, item: DropdownMenuItemProps) => boolean;
  /** Встроенный поиск в панели и в `searchSelect`: `wholly` — подстрока целиком; `word` — по отдельным словам */
  searchFormat?: SearchFormat;
  /**
   * Только `mode="searchSelect"`: после выбора опции из списка сбрасывать текст в поле-триггере (через `setEffectiveSearchQuery('')` / `onSearch('', …)`).
   * При контролируемом `searchValue` родитель должен обновить строку до `''`.
   */
  clearInputValueAfterSelect?: boolean;
  dropdownVariant?: 'default' | 'elevated' | 'outlined';
  menuMaxHeight?: string | number;
  /**
   * Виртуальный скролл списка в панели (`Dropdown`): фиксированная высота строки или `'auto'` по размерам пункта из темы для текущего `size`.
   */
  virtualScroll?: DropdownVirtualScrollConfig;
  /** Прокидывается в `Dropdown.inline` */
  dropdownInline?: boolean;
  /** Панель над списком опций в выпадающем меню (как у `Dropdown.renderTopPanel`) */
  renderTopPanel?: (props: DropdownTopPanelProps) => React.ReactNode;
  /** Панель под списком опций в выпадающем меню (как у `Dropdown.renderBottomPanel`; подвал «Выбрать все» при `multiple` добавляется ниже) */
  renderBottomPanel?: (props: DropdownTopPanelProps) => React.ReactNode;
  /**
   * При `multiple` в панельных режимах (`select`, `searchSelect`): бейдж с числом выбранных слева от шеврона.
   * По умолчанию `true`; передайте `false`, чтобы скрыть.
   */
  showMultiSelectionCountBadge?: boolean;
  /**
   * При `multiple` в панели: кнопка «Выбрать все» внизу (только опции без `disabled`).
   * По умолчанию включена; передайте `false`, чтобы скрыть.
   */
  showMultiSelectAll?: boolean;
  /**
   * При `multiple` в панели: чекбоксы у пунктов выпадающего списка (как у `Dropdown.showCheckbox`).
   * По умолчанию `true`; передайте `false`, чтобы оставить мультивыбор по клику без чекбоксов.
   */
  showCheckbox?: boolean;
  /**
   * Вложенные `options` у опций: дерево в панели, каскадный мультивыбор и раскрытие веток (пропсы как у `Dropdown`).
   */
  treeExpandable?: boolean;
  treeDefaultExpanded?: 'expanded' | 'collapsed' | string[];
  treeExpandedKeys?: string[];
  onTreeExpandedKeysChange?: (keys: string[]) => void;
  /**
   * Панельные режимы: выбранные опции показывать вверху списка (`reorder` по `value`).
   * По умолчанию при `multiple` — `true` (прежнее поведение); при одиночном выборе по умолчанию порядок как в `options`, пока явно не передать `true`.
   */
  moveSelectedOnTop?: boolean;
  /**
   * Показывать кнопку сброса значения (крестик в триггере, как `displayClearIcon` у полей из `BaseInputProps`).
   * Не показывается при `multiple`, если уже видна кнопка очистки всех чипов.
   */
  displayClearIcon?: boolean;
  /** Колбэк по клику на крестик очистки (после сброса `value` и строки поиска в `searchSelect`) */
  onClearIconClick?: () => void;
  /**
   * Контролируемое состояние открытия выпадающей панели (как `Dropdown.isMenuOpen`).
   * Если не передано — используется внутреннее состояние.
   */
  isMenuOpen?: boolean;
  /**
   * Колбэк смены открытости панели (как `Dropdown.onMenuOpenChange`).
   * При контролируемом режиме (`isMenuOpen` задан) обязателен для реакции на клики и закрытие снаружи.
   */
  onMenuOpenChange?: (isOpen: boolean) => void;
  /** Панель выбора открыта (`mode="select"` | `searchSelect`) */
  onOpenMenu?: () => void;
  /** Панель выбора закрыта */
  onCloseMenu?: () => void;
  /** Прокрутка списка опций в панели */
  onScrollMenu?: (info: DropdownMenuScrollInfo) => void;
  /**
   * Ленивая догрузка опций при приближении к низу списка: якорь — последняя строка текущего плоского списка
   * (`anchorFlatIndex`, `anchorValue`, опционально `anchorId` из `SelectOption.id`).
   * После обновления `options` скролл компенсируется по дельте высоты (меню не закрывается).
   */
  onMenuLoadMore?: (context: DropdownMenuLoadMoreContext) => void | Promise<void>;
  /** Порог в px до нижней границы прокрутки для вызова `onMenuLoadMore` (по умолчанию 80) */
  menuLoadMoreThresholdPx?: number;
  /** Передайте `false`, когда догружать больше нечего */
  menuHasMore?: boolean;
  /** Пока `true`, внутренний порог не вызывает повторный `onMenuLoadMore` */
  menuIsLoadingMore?: boolean;
  /** Пропсы иконки открытия меню: `select` / `searchSelect` — в `Dropdown.openMenuIconProps`; `native` — мерж к `Icon` у поля */
  openMenuIconProps?: OpenMenuIconProps;
  /** Колбэк при изменении выбранного значения (удобен в `mode="select"`) */
  onValueChange?: (value: string | string[]) => void;
  /**
   * Вызывается при смене выбора: одиночное значение или массив при `multiple`.
   * Срабатывает во всех режимах (`select`, `searchSelect`, `native`) после фиксации нового значения.
   */
  onSelectedChange?: (value: string | string[]) => void;
}

/**
 * Визуальный тип toast-уведомления
 * `neutral` — нейтральная серая палитра (в основном для внешнего вида «пилюля» по макету Figma)
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'neutral';

/**
 * Внешний вид toast: по умолчанию «пилюля» (макет Figma); опционально классика с полосой слева.
 */
export enum ToastAppearance {
  /** Полоса слева, фон по типу уведомления */
  CARD = 'card',
  /** Пастельный фон, цветная обводка, иконка с glow, крестик в строке справа */
  PILL = 'pill',
}

/**
 * Дополнительные параметры вызова `showToast` (пятый аргумент)
 * @property appearance - Переопределить внешний вид для этой записи
 * @property actionLabel - Текст кнопки действия (для `pill` — справа от сообщения)
 * @property onAction - Обработчик действия; после вызова toast закрывается
 */
export interface ShowToastOptions {
  appearance?: ToastAppearance;
  actionLabel?: string;
  onAction?: () => void;
  /** Явный id тоста (для предотвращения дублей и последующего update) */
  toastId?: string;
  /** Не создавать дубликат, если toast с тем же `toastId` уже активен */
  preventDuplicate?: boolean;
  /** Стратегия дедупликации: по id, по содержимому или оба варианта */
  dedupeStrategy?: 'id' | 'content' | 'both';
  /** Останавливать автозакрытие при наведении курсора */
  pauseOnHover?: boolean;
  /** Останавливать автозакрытие, пока вкладка не в фокусе */
  pauseOnFocusLoss?: boolean;
  /** Закрывать toast по клику на карточку */
  closeOnClick?: boolean;
  /** Показывать нижнюю полоску времени до автозакрытия */
  showProgressBar?: boolean;
}

/**
 * Одна запись в стеке уведомлений (данные для компонента `Toast`)
 * @property id - Уникальный идентификатор
 * @property type - Визуальный тип (акцентная полоса и палитра)
 * @property message - Основной текст
 * @property title - Заголовок (опционально)
 * @property duration - Автоскрытие в мс (`0` — не скрывать по таймеру)
 * @property appearance - Внешний вид; если не задан — берётся `defaultAppearance` у `ToastProvider`
 * @property actionLabel - Подпись кнопки действия (внешний вид `pill`)
 * @property onAction - Колбэк кнопки действия
 */
export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  duration?: number;
  appearance?: ToastAppearance;
  actionLabel?: string;
  onAction?: () => void;
  pauseOnHover?: boolean;
  pauseOnFocusLoss?: boolean;
  closeOnClick?: boolean;
  showProgressBar?: boolean;
}

/**
 * Значение контекста провайдера toast — то же, что возвращает хук `useToast`
 */
export interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (
    message: string,
    type?: ToastType,
    title?: string,
    duration?: number,
    options?: ShowToastOptions,
  ) => void;
  updateToast: (id: string, patch: Partial<Omit<ToastItem, 'id'>>) => void;
  isActiveToast: (id: string) => boolean;
  hideToast: (id: string) => void;
  clearToasts: () => void;
  pauseToasts: (id?: string) => void;
  playToasts: (id?: string) => void;
}

/**
 * Возвращаемый тип хука `useToast` (алиас к {@link ToastContextValue})
 */
export type UseToastReturn = ToastContextValue;

/**
 * Позиция стека toast на экране
 */
export type ToastPlacement = 'top-right' | 'top-center' | 'bottom-right';

/**
 * Пропсы провайдера toast
 * @property children - Дерево приложения
 * @property placement - Расположение колонки уведомлений
 */
export interface ToastProviderProps {
  children?: ReactNode;
  placement?: ToastPlacement;
  /** Внешний вид новых toast, если в записи не указан `appearance` */
  defaultAppearance?: ToastAppearance;
  /** Ограничение количества видимых тостов (`0` — без лимита) */
  limit?: number;
  /** Добавлять новые тосты в начало списка */
  newestOnTop?: boolean;
  /** Включить плотное наложение стека */
  stacked?: boolean;
  /** Значение по умолчанию для паузы автозакрытия по hover */
  pauseOnHover?: boolean;
  /** Значение по умолчанию для паузы автозакрытия при потере фокуса вкладки */
  pauseOnFocusLoss?: boolean;
  /** Значение по умолчанию для закрытия toast по клику на карточку */
  closeOnClick?: boolean;
  /** Значение по умолчанию для показа прогресс-бара времени */
  showProgressBar?: boolean;
}

/**
 * Опции вызова `showSnackbar`
 * @property duration - Автоскрытие в мс (по умолчанию 4000; `0` — не закрывать по таймеру)
 * @property actionLabel - Текст кнопки действия справа от сообщения
 * @property onAction - Обработчик клика по действию (после вызова snackbar закрывается)
 */
export interface ShowSnackbarOptions {
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * Одна запись компактной полосы snackbar (данные для компонента `Snackbar`)
 * @property id - Уникальный идентификатор
 * @property message - Текст уведомления
 * @property duration - Длительность показа в мс (копия из опций при создании)
 * @property actionLabel - Подпись действия (опционально)
 * @property onAction - Колбэк действия (опционально)
 */
export interface SnackbarItem {
  id: string;
  message: string;
  duration: number;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * Значение контекста `SnackbarProvider` — возвращает хук `useSnackbar`
 */
export interface SnackbarContextValue {
  snackbars: SnackbarItem[];
  showSnackbar: (message: string, options?: ShowSnackbarOptions) => void;
  hideSnackbar: (id: string) => void;
  clearSnackbars: () => void;
}

/**
 * Возвращаемый тип хука `useSnackbar`
 */
export type UseSnackbarReturn = SnackbarContextValue;

/**
 * Позиция стека snackbar у нижнего края экрана
 */
export type SnackbarPlacement = 'bottom-center' | 'bottom-left' | 'bottom-right';

/**
 * Пропсы провайдера snackbar
 * @property children - Дерево приложения
 * @property placement - Выравнивание полосы (`bottom-center` по умолчанию)
 */
export interface SnackbarProviderProps {
  children?: ReactNode;
  placement?: SnackbarPlacement;
}

/**
 * Один пункт цепочки «хлебных крошек».
 * @property id - Стабильный ключ для списка (иначе используется индекс)
 * @property label - Текст или разметка пункта
 * @property href - URL ссылки (если задан — рендерится `<a>`)
 * @property target - Цель ссылки (`_blank` и т.д.)
 * @property rel - Явный `rel` (для `_blank` можно дополнить через логику компонента)
 * @property onClick - Клик по пункту (рендер `<button type="button">` со стилем ссылки, если нет `href`)
 * @property current - Явно текущая страница (`aria-current="page"`); иначе: последний пункт без `href` и без `onClick`
 * @property className - CSS-класс на элементе `li` пункта
 * @property disabled - Отключить ссылку/кнопку
 * @property icon - Иконка слева от подписи (макет Figma: «дом + Главная»)
 * @property crumbStyle - `plain` — только текст/иконка; `pill` — капсула с фоном; если не задано — у текущей страницы автоматически `pill`
 * @property ellipsis - Свернутый сегмент «…» в капсуле; обычно с `onClick`
 * @property ellipsisAriaLabel - Подпись для `aria-label` у сегмента `ellipsis` (доступность)
 */
export interface BreadcrumbItem {
  id?: string | number;
  label: ReactNode;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  current?: boolean;
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  crumbStyle?: 'plain' | 'pill';
  ellipsis?: boolean;
  ellipsisAriaLabel?: string;
}

/**
 * Пропсы компонента «хлебные крошки».
 * @property items - Цепочка пунктов (минимум один)
 * @property separator - Разделитель между пунктами (по умолчанию стрелка из иконки)
 * @property ariaLabel - Подпись для `nav` (`aria-label`, по умолчанию «Навигационная цепочка»)
 * @property size - Размер текста (`Size.SM` | `Size.MD` и т.д.)
 * @property className - Класс на корневом `nav`
 */
export interface BreadcrumbProps extends BaseComponentProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  ariaLabel?: string;
  size?: Size;
}

/**
 * Пропсы пагинации по страницам
 * @property totalPages - Всего страниц (если меньше 2, компонент не рендерится)
 * @property page - Текущая страница (1..totalPages), контролируемый режим
 * @property defaultPage - Начальная страница в неконтролируемом режиме (по умолчанию 1)
 * @property onPageChange - Вызывается при выборе страницы или «назад»/«вперёд»
 * @property siblingCount - Сколько номеров слева и справа от текущей (без учёта 1 и последней)
 * @property showPrevNext - Показывать кнопки предыдущая / следующая страница
 * @property variant - `default` — номера и «…»; `compact` — только стрелки и текущая страница между ними
 * @property size - Размер кнопок номеров
 * @property disabled - Отключить всю навигацию
 * @property ariaLabel - Подпись для `nav` (доступность)
 * @property className - CSS-класс на корневом `nav`
 */
export interface PaginationProps extends BaseComponentProps {
  totalPages: number;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  showPrevNext?: boolean;
  /** Режим отображения списка страниц */
  variant?: 'default' | 'compact';
  size?: Size;
  disabled?: boolean;
  ariaLabel?: string;
}

/**
 * Пропсы чекбокса
 * @property checked - Отмечен ли чекбокс
 * @property onChange - Обработчик изменения
 * @property label - Подпись рядом с квадратом чекбокса
 * @property fieldLabel - Подпись над чекбоксом — те же стили и семантика, что `label` у Input/TextArea
 * @property additionalLabel - Строка под `fieldLabel`, как `additionalLabel` у Input
 * @property formRequired - Индикатор * у `fieldLabel` и атрибут `required` у `input`
 * @property fullWidth - Растянуть контейнер поля на всю доступную ширину
 * @property disabled - Отключить чекбокс
 * @property size - Размер чекбокса
 * @property error - Сообщение об ошибке
 * @property indeterminate - Промежуточное состояние (частичный выбор); для DOM `input.indeterminate`
 */
export interface CheckboxProps extends BaseComponentProps {
  /** Идентификатор DOM для `input` (иначе задаётся автоматически) */
  id?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: ReactNode;
  /** Подпись над элементом управления — аналог `label` из Input/TextArea */
  fieldLabel?: ReactNode;
  /** Строка под `fieldLabel` — как `additionalLabel` у Input */
  additionalLabel?: ReactNode;
  /** Звезда обязательности у `fieldLabel` и атрибут `required` на `input` */
  formRequired?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  size?: Size;
  error?: string;
  /** Успешное состояние — строка «Успешно» под полем, как у Input */
  success?: boolean;
  /** Подсказка под элементом управления — как `helperText` у Input */
  helperText?: string;
  /** Дополнительный текст ниже блока ошибок/подсказок — как `extraText` у Input */
  extraText?: string;
  indeterminate?: boolean;
}

/**
 * Группа чекбоксов с общей подписью (как `label`/`additionalLabel` у полей ввода).
 * @property label - заголовок группы над списком
 * @property additionalLabel — вторая строка под заголовком
 * @property required — индикатор * у заголовка
 * @property fullWidth — растянуть на ширину контейнера
 * @property helperText — текст под группой
 * @property error — ошибка группы
 * @property children — элементы управления (`Checkbox`)
 */
export interface CheckboxGroupProps extends BaseComponentProps {
  label?: ReactNode;
  additionalLabel?: ReactNode;
  required?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  error?: string;
  success?: boolean;
  extraText?: string;
  children: ReactNode;
}

/**
 * Пропсы радиокнопки
 * @property checked - Выбрана ли радиокнопка
 * @property onChange - Обработчик изменения
 * @property label - Метка (`ReactNode`)
 * @property disabled - Отключить радиокнопку
 * @property error - Сообщение об ошибке
 * @property name - Имя группы радиокнопок
 * @property value - Значение радиокнопки
 */
export interface RadioProps extends BaseComponentProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  error?: string;
  name: string;
  value: string;
}

/**
 * Пропсы радио кнопки (новый компонент)
 * @property checked - Выбрана ли радио кнопка
 * @property onChange - Обработчик изменения
 * @property label - Метка (`ReactNode`)
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
  /** Идентификатор DOM для `input` (иначе задаётся автоматически) */
  id?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLLabelElement>) => void; // Обработчик клика по кнопке или лейблу
  /** Подпись рядом с кружком опции */
  label?: ReactNode;
  /** Подпись над радиокнопкой — аналог верхнего `label` у Input/TextArea */
  fieldLabel?: ReactNode;
  /** Строка под `fieldLabel`, как `additionalLabel` у Input */
  additionalLabel?: ReactNode;
  /** Звезда у `fieldLabel` и усиление доступности через `required` на `input` */
  formRequired?: boolean;
  disabled?: boolean;
  size?: Size;
  name?: string;
  value?: string;
  error?: string; // Сообщение об ошибке
  helperText?: string; // Вспомогательный текст под радиокнопкой — как helperText у Input
  /** Успешное состояние поля («Успешно» под контролом), порядок как у Input */
  success?: boolean;
  /**
   * Текст под полем целиком — аналог `extraText` у Input (ниже ошибки/хелпа).
   * Не путать с `extraText` у строки опции рядом с лейблом.
   */
  extraFooterText?: string;
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
export interface RadioButtonGroupOption extends Omit<
  RadioButtonProps,
  'checked' | 'onChange' | 'name' | 'disabled' | 'readOnly'
> {
  value: string; // Значение опции (обязательно)
  label: ReactNode; // Лейбл опции (обязательно)
  disabled?: boolean; // Отключить конкретную опцию (переопределяет disabled группы)
  readOnly?: boolean; // Только для чтения конкретной опции (переопределяет readOnly группы)
}

/**
 * Пропсы для группы радиокнопок
 * @property options - Массив опций для радиокнопок
 * @property value - Активное значение (value выбранной опции)
 * @property onChange - Обработчик изменения значения
 * @property onClick - Обработчик клика по опции
 * @property label - Лейбл для всей группы (как `label` у Input)
 * @property additionalLabel - Строка под заголовком группы
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
  label?: ReactNode; // Лейбл для всей группы
  /** Строка под заголовком группы (`additionalLabel` как у Input) */
  additionalLabel?: ReactNode;
  disabled?: boolean; // Отключить всю группу
  readOnly?: boolean; // Только для чтения (вся группа)
  orientation?: RadioButtonGroupOrientation; // Ориентация группы
  name?: string; // Имя группы (автоматически генерируется, если не указано)
  size?: Size; // Размер радиокнопок в группе
  variant?: RadioButtonVariant; // Вариант радиокнопок в группе
  labelPosition?: RadioButtonLabelPosition; // Позиция лейбла для радиокнопок в группе
  error?: string | string[]; // Сообщение об ошибке для группы (строка) или отдельных опций (массив)
  helperText?: string; // Вспомогательный текст для группы
  success?: boolean; // Успешное состояние группы («Успешно»), как у Input
  /** Текст под всем блоком сообщений группы — как `extraText` у Input */
  extraText?: string;
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
 * @property label - Метка (`ReactNode`)
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
  label?: ReactNode;
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
  label?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  size?: Size;
  error?: string;
  type?: 'date' | 'time' | 'datetime';
  showIcon?: boolean;
}

/**
 * Пропсы поля даты (`DateInput`).
 * Крестик очистки: `displayClearIcon`, `onClearIconClick`, `clearIconProps` из `BaseInputProps`.
 */
export interface DatePickerProps extends Omit<BaseInputProps, 'value' | 'onChange' | 'size'> {
  value?: string | DateTimeRange;
  onChange?: (value: string | DateTimeRange) => void;
  /** Размер поля (в `DateInput` по умолчанию `Size.SM`) */
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
  /** Роллеры день/месяц/год над сеткой в попапе (макет Figma) */
  showDateRollers?: boolean;
  /** Два триггера «месяц» и «год» в шапке календаря вместо одного списка */
  calendarMonthYearLayout?: CalendarMonthYearLayout;
  /** Растянуть выпадающий календарь на ширину поля ввода */
  calendarFullWidth?: boolean;
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
 * @property label - Метка поля (`ReactNode`, наследуется из `BaseInputProps`)
 * @property placeholder - Плейсхолдер
 * @property disabled - Отключить поле
 * @property size - Размер поля (в компоненте по умолчанию `Size.SM`)
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
 * @remarks Крестик очистки: `displayClearIcon`, `onClearIconClick` и `clearIconProps` из `BaseInputProps`.
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
 * Пропсы переключателя (Switch)
 * @property checked - Контролируемое состояние «вкл»
 * @property defaultChecked - Начальное состояние в неконтролируемом режиме
 * @property onChange - Событие от нативного `input` (`ChangeEvent`, `target.checked`)
 * @property label - Подпись рядом с треком
 * @property labelPosition - Сторона подписи относительно трека
 * @property disabled - Отключение
 * @property size - Размер трека и бегунка (`Size`)
 * @property error - Текст ошибки под компонентом
 * @property fullWidth - Растянуть строку на ширину контейнера (подпись + трек)
 * @property name - Имя поля для форм
 * @property id - Явный id (иначе генерируется внутри компонента)
 */
export interface SwitchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'role'
> {
  checked?: boolean;
  defaultChecked?: boolean;
  label?: ReactNode;
  labelPosition?: 'left' | 'right';
  disabled?: boolean;
  size?: Size;
  error?: string;
  fullWidth?: boolean;
}

/**
 * Пропсы текстовой области
 * @property value - Значение текстовой области
 * @property onChange - Обработчик изменения
 * @property placeholder - Плейсхолдер
 * @property label - Метка (`ReactNode`)
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
  label?: ReactNode;
  error?: string;
  disabled?: boolean;
  rows?: number;
  size?: Size;
  fullWidth?: boolean;
}

/**
 * Варианты бокового меню (раскладка)
 */
export enum SidemenuVariant {
  EXPANDED = 'expanded', // Развёрнутая панель
  COLLAPSED = 'collapsed', // Свернутая панель
}

/**
 * Элемент бокового меню
 * @property id - Уникальный идентификатор
 * @property label - Подпись элемента (`ReactNode`)
 * @property icon - Иконка элемента
 * @property active - Активен ли элемент
 * @property notificationCount - Количество уведомлений
 * @property onClick - Обработчик клика
 * @property status — статус пункта (см. {@link NavigationMenuItemStatus})
 * @property loading — загрузка пункта
 * @property skeleton — скелетон вместо содержимого
 * @property isVisible — видимость строки с анимацией
 * @property items — вложенные пункты меню (несколько уровней); id уникальны во всём дереве
 * @property hint — см. {@link NavigationMenuItemProps.hint}
 * @property tooltip — см. {@link NavigationMenuItemProps.tooltip}
 * @property popover — см. {@link NavigationMenuItemProps.popover}
 * @property popoverActivateNavigation — см. {@link NavigationMenuItemProps.popoverActivateNavigation}
 */
export interface SidemenuItem {
  id: string;
  label: ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
  notificationCount?: number;
  onClick?: () => void;
  status?: NavigationMenuItemStatus;
  loading?: boolean;
  skeleton?: boolean;
  isVisible?: boolean;
  items?: SidemenuItem[];
  hint?: Omit<HintProps, 'children'>;
  tooltip?: Omit<TooltipProps, 'children'>;
  popover?: Omit<PopoverProps, 'trigger'>;
  popoverActivateNavigation?: boolean;
}

/**
 * Пропсы бокового меню
 * @property items - Список пунктов меню
 * @property logo - Блок логотипа в шапке (иконка и заголовок), если не задан **logoSlot**
 * @property logoSlot — произвольный контент вместо разметки из **logo** (имеет приоритет над **logo.icon** / **logo.title**)
 * @property variant - Состояние (развёрнуто/свернуто); при expandInteraction ≠ none задаёт только начальный вид и работает в паре с раскрытием
 * @property onItemClick - Обработчик клика по пункту
 * @property expandInteraction — см. {@link NavigationMenuProps.expandInteraction}
 * @property expanded — контролируемое раскрытие панели (ширина + подписи)
 * @property defaultExpanded — начальное раскрытие при интерактивном режиме
 * @property onExpand — после разворота панели
 * @property onCollapse — после сворачивания панели
 * @property onExpandedChange — контролируемый режим: запрос смены expanded
 * @property expandCompactWidth — ширина компактной панели (px), по умолчанию 100
 * @property expandExpandedWidth — ширина развёрнутой панели (px), по умолчанию 310
 * @property offScreenHoverReveal — панель скрыта за левым краём; узкая зона у края экрана по hover показывает меню (анимация)
 * @property offScreenEdgeWidth — ширина hover-зоны у левого края (px)
 * @property offScreenRevealed — контролируемая видимость панели с экрана
 * @property defaultOffScreenRevealed — начальное состояние видимости
 * @property onOffScreenRevealedChange — смена видимости (контролируемый режим)
 * @property onOffScreenShow — после появления панели
 * @property onOffScreenHide — после скрытия панели
 * @property offScreenZIndex — слой над контентом (по умолчанию 1030)
 * @property offScreenHideDelayMs — задержка перед скрытием после ухода курсора (мс, по умолчанию 1500)
 * @property expandToggleRender — кнопка в шапке: **isExpanded**, **toggleExpanded**
 * @property onExpandToggleClick — до смены состояния; у встроенной кнопки можно отменить через **preventDefault**
 * @property showExpandToggleButton — показать встроенную кнопку дополнительно при **CLICK** / **HOVER**
 * @property footer — нижний слот панели: произвольный контент (второе меню, действия и т.д.)
 * @property slotStyles — **header** / **body** / **footer**: высота, flex, overflow (см. {@link SidemenuSlotStyles})
 */
/** Стили зон {@link Sidemenu}: шапка (лого + разделитель), средний блок навигации, нижний слот */
export type SidemenuSlotStyles = {
  /** Зона шапки: строка логотипа и разделитель под ней */
  header?: React.CSSProperties;
  /** Средняя колонка с основным {@link NavigationMenu} */
  body?: React.CSSProperties;
  /** Обёртка содержимого **footer** (под разделителем перед футером) */
  footer?: React.CSSProperties;
};

export interface SidemenuProps extends BaseComponentProps {
  items: SidemenuItem[];
  logo?: {
    icon?: React.ReactNode;
    title?: string;
  };
  /**
   * Левая часть шапки вместо связки **logo.icon** + **logo.title**: любой ReactNode (свой логотип, доп. контролы).
   * Если задан, **logo.icon** и **logo.title** в шапке не выводятся.
   */
  logoSlot?: React.ReactNode;
  /**
   * Нижняя область боковой панели под основным списком: можно передать другое меню, кнопки и т.п.
   * Обёртка задаёт отступы и **не** участвует в переключении раскрытия по клику по оболочке (`data-prevent-navigation-expand-toggle`).
   */
  footer?: React.ReactNode;
  /**
   * Подстройка вёрстки зон панели: **height**, **minHeight**, **maxHeight**, **overflow**, **flex** и т.д.
   * Мержится поверх встроенных стилей (у среднего блока по умолчанию **flex: 1** и **minHeight: 0**).
   */
  slotStyles?: SidemenuSlotStyles;
  /**
   * Панель как колонка у левого края экрана: без скруглений и тени «карточки», только вертикальная линия справа;
   * высота на весь вьюпорт (**min-height: 100vh**), без отступа от кромки. Для корневого лейаута: обёртка `display: flex; min-height: 100vh`.
   * Полностью совместима с **expandInteraction**, **offScreenHoverReveal** и связанными колбэками показа/скрытия.
   */
  edgeAttached?: boolean;
  variant?: SidemenuVariant;
  onItemClick?: (item: SidemenuItem) => void;
  expandInteraction?: NavigationMenuExpandInteraction;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
  onExpandedChange?: (expanded: boolean) => void;
  expandCompactWidth?: number;
  expandExpandedWidth?: number;
  offScreenHoverReveal?: boolean;
  offScreenEdgeWidth?: number;
  offScreenRevealed?: boolean;
  defaultOffScreenRevealed?: boolean;
  onOffScreenRevealedChange?: (revealed: boolean) => void;
  onOffScreenShow?: () => void;
  onOffScreenHide?: () => void;
  offScreenZIndex?: number;
  /** Задержка перед скрытием панели после mouseleave (мс) */
  offScreenHideDelayMs?: number;
  /** Рендер кнопки «развернуть / свернуть» панель (подписи + ширина); см. {@link SidemenuExpandToggleRenderContext} */
  expandToggleRender?: (context: SidemenuExpandToggleRenderContext) => React.ReactNode;
  /**
   * Перед сменой состояния панели: клик по **встроенной** кнопке (`event` задан) или вызов **toggleExpanded** из **expandToggleRender** (`event === null`).
   * Для встроенной кнопки: `event.preventDefault()` отменяет переключение.
   */
  onExpandToggleClick?: (event: React.MouseEvent<Element> | null, nextExpanded: boolean) => void;
  /**
   * Встроенная кнопка в шапке дополнительно к режиму **CLICK** / **HOVER** (дублирует переключение).
   * Режим **TOGGLE_BUTTON** уже показывает такую кнопку по умолчанию.
   */
  showExpandToggleButton?: boolean;
}

/** Контекст для {@link SidemenuProps.expandToggleRender} */
export type SidemenuExpandToggleRenderContext = {
  /** Панель в развёрнутом виде (подписи и полная ширина) */
  isExpanded: boolean;
  /** Переключить панель (учитывает {@link SidemenuProps.onExpandToggleClick} только без события отмены) */
  toggleExpanded: () => void;
};

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

// --- Таблица ---

/** Плотность строк таблицы */
export type TableSize = 'sm' | 'md';

/**
 * Обёртка с горизонтальным скроллом и визуалом «карточки» (скругление, фон, тень).
 * @property component - Корневой элемент (по умолчанию `div`)
 * @property elevated - Показать тень как у карточки в макете
 * @property className - Доп. класс
 * @property children - Обычно `Table`
 * @property style - Инлайн-стили корня
 */
export interface TableContainerProps extends BaseComponentProps {
  component?: React.ElementType;
  elevated?: boolean;
  style?: React.CSSProperties;
}

/**
 * Нативная `<table>` + контекст размера и зебры для дочерних строк.
 * @property stickyHeader - Липкий заголовок (`thead th` с `position: sticky`)
 * @property size - Вертикальные отступы ячеек (`sm` | `md`)
 * @property striped - Чередование фона строк в `tbody`; по умолчанию `false` — фон строк как у карточки
 * @property columnDividers - Тонкая вертикальная линия между колонками (`border-inline-end` у ячеек, кроме последней в строке); по умолчанию `true`
 * @property className - Доп. класс
 * @property children - `TableHead`, `TableBody`, …
 * @property style - Инлайн-стили таблицы
 */
export interface TableProps
  extends
    BaseComponentProps,
    Omit<React.TableHTMLAttributes<HTMLTableElement>, 'children' | 'className' | 'style'> {
  stickyHeader?: boolean;
  size?: TableSize;
  striped?: boolean;
  /** Вертикальные разделители между колонками; по умолчанию включены */
  columnDividers?: boolean;
  style?: React.CSSProperties;
}

/**
 * Секция заголовка (`thead`).
 * @property className - Доп. класс
 * @property children - Строки `TableRow` с ячейками `TableCell` (`variant="head"` или `component="th"`)
 */
export interface TableHeadProps
  extends
    BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLTableSectionElement>, 'children' | 'className' | 'style'> {
  style?: React.CSSProperties;
}

/**
 * Секция тела (`tbody`).
 */
export interface TableBodyProps
  extends
    BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLTableSectionElement>, 'children' | 'className' | 'style'> {
  style?: React.CSSProperties;
}

/**
 * Секция подвала (`tfoot`), например «Загрузить ещё».
 */
export interface TableFooterProps
  extends
    BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLTableSectionElement>, 'children' | 'className' | 'style'> {
  style?: React.CSSProperties;
}

/**
 * Строка таблицы (`tr`).
 * @property selected - Подсветка выбранной строки (как в макете)
 * @property hover - Подсветка при наведении (по умолчанию true для body-строк)
 * @property disabled - Пониженная непрозрачность (disabled-состояние макета)
 * @property dragging - Строка удерживается при перетаскивании (источник HTML5 DnD): приглушение и подсказка рамкой
 */
export interface TableRowProps
  extends BaseComponentProps, React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  hover?: boolean;
  disabled?: boolean;
  dragging?: boolean;
  style?: React.CSSProperties;
}

/** Вариант ячейки по смыслу секции */
export type TableCellVariant = 'head' | 'body' | 'footer';

/**
 * Ячейка (`th` | `td`).
 * @property align - Горизонтальное выравнивание содержимого
 * @property component - Явный тег/компонент (`th`, `td`, …)
 * @property variant - Влияет на тег по умолчанию: `head` → `th`, иначе `td`
 * @property padding - Узкая колонка чекбокса (`checkbox`), без отступов (`none`), обычная (`normal`)
 * @property activeColumn - Для шапки: усиленная нижняя граница активной сортируемой колонки (макет Figma)
 * @property headerMaxLines - Только шапка: максимум строк текста с многоточием (`line-clamp`); без пропа — одна строка (`nowrap`)
 * @property colSpan / rowSpan / scope — стандартные атрибуты таблицы
 */
export interface TableCellProps
  extends BaseComponentProps, Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'align'> {
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  component?: React.ElementType;
  variant?: TableCellVariant;
  padding?: 'normal' | 'checkbox' | 'none';
  /** Подсветка активной колонки в `TableHead` */
  activeColumn?: boolean;
  /** Для `th`: не больше заданного числа строк заголовка (обрезка с «…») */
  headerMaxLines?: number;
  colSpan?: number;
  rowSpan?: number;
  scope?: string;
  style?: React.CSSProperties;
}

/** Выравнивание строки под таблицей: выбор числа строк + плашка страниц */
export type TablePaginationToolbarAlign = 'left' | 'center' | 'right';

/**
 * Пагинация под таблицей (обёртка над `Pagination`, нумерация страниц с нуля).
 * @property count - Всего записей
 * @property page - Номер страницы с нуля
 * @property rowsPerPage - Записей на странице
 * @property onPageChange - `(event, nextPageZeroBased)` при смене страницы
 * @property siblingCount - Соседи вокруг текущей страницы у числовой плашки (только при `paginationVariant="default"`)
 * @property paginationToolbarAlign - Выравнивание строки футера (селект строк, поле «страница», плашка страниц); по умолчанию `right`
 * @property paginationToolbarReverse - Обратный порядок элементов в строке (`Pagination` и поле страницы меняются местами с блоком «строк на странице»)
 * @property paginationVariant - `compact` — только стрелки и номер текущей страницы между ними
 * @property rowsPerPageOptions - Список допустимых размеров страницы для селектора в футере (если пусто/не задано — блок не показывается)
 * @property showRowsPerPageSelect - Показывать ли выбор числа строк; по умолчанию `true`, если задан непустой `rowsPerPageOptions`. При `false` блок скрыт даже при наличии опций
 * @property rowsPerPageSelectVariant - `compact` — короткая подпись по умолчанию («На стр.:») и более компактный селект
 * @property onRowsPerPageChange - Событие смены `rowsPerPage` (совместим с `change` нативного `select`: `event.target.value` — строка)
 * @property labelRowsPerPage - Подпись перед селектором размера страницы; если не задано — зависит от `rowsPerPageSelectVariant`
 * @property showRecordsTotal - Показывать «записей из {count}» после селектора; по умолчанию `true`, если задан `rowsPerPageOptions`
 * @property formatRecordsTotal - Кастомный текст итога; иначе «записей из N» с форматированием `ru-RU`
 * @property showPageJump - Поле «перейти к странице» слева от компонента `Pagination` (по умолчанию `true`; скрыто при одной странице)
 * @property labelPageJump - Подпись перед полем номера страницы (по умолчанию «Страница:»)
 * @property disabled - Отключить пагинацию и селект
 * @property size - Размер внутреннего компонента `Pagination` (`Size` из дизайн-системы)
 */
export interface TablePaginationProps extends BaseComponentProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange?: (event: unknown, page: number) => void;
  siblingCount?: number;
  rowsPerPageOptions?: number[];
  /** Показать селект размера страницы; по умолчанию совпадает с наличием непустого `rowsPerPageOptions` */
  showRowsPerPageSelect?: boolean;
  /** Внешний вид блока «строк на странице» */
  rowsPerPageSelectVariant?: 'default' | 'compact';
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  labelRowsPerPage?: React.ReactNode;
  /** Показывать текст итога записей после селектора размера страницы */
  showRecordsTotal?: boolean;
  /** Кастомный текст итога; по умолчанию «записей из {count}» */
  formatRecordsTotal?: (totalCount: number) => React.ReactNode;
  /** Поле ввода номера страницы рядом с `Pagination` */
  showPageJump?: boolean;
  /** Подпись перед полем перехода к странице */
  labelPageJump?: React.ReactNode;
  /** Режим плашки страниц: `compact` — только «назад», номер текущей, «вперёд» */
  paginationVariant?: 'default' | 'compact';
  /** Горизонтальное выравнивание группы «строк на странице» + пагинация */
  paginationToolbarAlign?: TablePaginationToolbarAlign;
  /** Обратный порядок блоков в строке футера (`flex-direction: row-reverse`) */
  paginationToolbarReverse?: boolean;
  disabled?: boolean;
  size?: Size;
  style?: React.CSSProperties;
  /**
   * Рендер под гридом ячеек внутри той же «карточки», что и таблица: без внешнего отступа сверху,
   * с разделителем и отступами как у подвала таблицы (например в `DataGrid`).
   */
  embeddedInTableCard?: boolean;
}

/** Направление сортировки колонки */
export type TableSortDirection = 'asc' | 'desc';

/**
 * Кликабельная подпись колонки с иконкой сортировки (нейтральная / asc / desc по макету Figma).
 * @property active - Колонка сортируется сейчас
 * @property direction - Направление при `active`; `false` — без активного направления
 * @property hideSortIcon - Скрыть иконку (только текст)
 * @property disabled - Отключить кнопку
 * @property onClick - Переключение сортировки снаружи
 * @property maxLines - Максимум строк у текста заголовка рядом с иконкой сортировки (`line-clamp`)
 */
export interface TableSortLabelProps
  extends
    BaseComponentProps,
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'children' | 'className' | 'style' | 'type'
    > {
  active?: boolean;
  direction?: TableSortDirection | false;
  hideSortIcon?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  maxLines?: number;
  /** При сортировке по нескольким полям: порядковый номер (1…n) рядом с шевронами */
  sortPriority?: number;
}

// --- DataGrid (композиция над Table*) ---

/** Идентификатор строки в DataGrid */
export type DataGridRowId = string;

/** Минимальная строка: обязательный `id` */
export interface DataGridBaseRow {
  id: DataGridRowId;
  [key: string]: unknown;
}

/** Направление сортировки в модели грида */
export type DataGridSortDirection = 'asc' | 'desc';

/** Один критерий сортировки (поле + направление) */
export interface DataGridSortCriterion {
  /** Имя поля из `columns[].field` */
  field: string;
  direction: DataGridSortDirection;
}

/**
 * Модель сортировки грида: одно поле, несколько полей по убыванию приоритета или отсутствие сортировки.
 * При `multiColumnSort` у `DataGrid` удобно передавать массив; при одиночной — объект или массив из одного элемента.
 */
export type DataGridSortModel = DataGridSortCriterion | readonly DataGridSortCriterion[] | null;

/**
 * Вариант фона шапки `DataGrid`: `default` — токен шапки таблицы (обычно серый); `card` — фон карточки (обычно белый).
 */
export type DataGridTableHeaderVariant = 'default' | 'card';

/** Модель пагинации (номер страницы с нуля) */
export interface DataGridPaginationModel {
  page: number;
  pageSize: number;
}

/** Режим пагинации: `client` — срез `rows` внутри грида; `server` — `rows` уже отфильтрованы сервером */
export type DataGridPaginationMode = 'client' | 'server';

/** Параметры глобального `renderCell` и `render` колонки */
export interface DataGridRenderCellParams<Row extends DataGridBaseRow = DataGridBaseRow> {
  row: Row;
  field: string;
  value: unknown;
  rowIndex: number;
}

/**
 * Контекст встроенных и кастомных форматтеров ячеек (`TableCellFormatted`, `DataGrid` при `columns[].format`).
 * @property value — сырое значение поля (в гриде после `valueGetter`, если он задан).
 * @property row — строка данных; в ручной разметке таблицы можно не передавать.
 * @property field — ключ колонки (`field` из описания колонки).
 * @property rowIndex — индекс строки в текущем фрагменте данных (страница клиента и т.п.).
 */
export interface TableCellFormatContext<Row = unknown> {
  value: unknown;
  row?: Row;
  field: string;
  rowIndex: number;
}

/** Локаль по умолчанию для пресетов `number` / `currency` / `percent` (можно переопределить в каждом формате). */
export type TableCellFormatDefaultLocale = 'ru-RU';

/**
 * Декларативное форматирование содержимого ячейки: пресеты или кастомный рендер.
 * Приоритет в `DataGrid`: `columns[].render` → `renderCell` → `columns[].format` → строка по умолчанию.
 */
export type TableCellFormat<Row = unknown> =
  | {
      type: 'text';
      /** Преобразование регистра отображаемой строки */
      transform?: 'uppercase' | 'lowercase' | 'capitalize';
    }
  | {
      type: 'number';
      /** Число знаков после запятой */
      decimals?: number;
      /** Локаль `Intl`; по умолчанию `ru-RU` */
      locale?: string;
      /** Текст при некорректном числе или пустом значении */
      fallback?: string;
    }
  | {
      type: 'currency';
      /** Код валюты ISO 4217; по умолчанию `RUB` */
      currency?: string;
      locale?: string;
      decimals?: number;
      fallback?: string;
    }
  | {
      type: 'percent';
      locale?: string;
      decimals?: number;
      /**
       * `true` (по умолчанию) — значение трактуется как доля (`0.25` → «25 %»).
       * `false` — значение уже в процентах (`25` → «25 %»).
       */
      fromFraction?: boolean;
      fallback?: string;
    }
  | {
      type: 'date';
      /** Шаблон dayjs; по умолчанию `DD.MM.YYYY` */
      pattern?: string;
      fallback?: string;
    }
  | {
      type: 'datetime';
      /** Шаблон dayjs; по умолчанию `DD.MM.YYYY HH:mm` */
      pattern?: string;
      fallback?: string;
    }
  | {
      type: 'time';
      /** Шаблон dayjs; по умолчанию `HH:mm` */
      pattern?: string;
      fallback?: string;
    }
  | {
      type: 'mask';
      /** Маска: `#` — цифра, `A` — буква (латиница/кириллица), `*` — любой символ по порядку из значения */
      pattern: string;
    }
  | {
      type: 'phone';
      country?: 'RU' | 'INT';
      /** Своя маска; иначе берётся пресет по `country` */
      mask?: string;
      fallback?: string;
    }
  | {
      type: 'bankAccount';
      fallback?: string;
    }
  | {
      type: 'bankCard';
      fallback?: string;
    }
  | {
      type: 'inn';
      fallback?: string;
    }
  | {
      type: 'snils';
      fallback?: string;
    }
  | {
      type: 'email';
      /** Тема письма (`mailto`) */
      subject?: string | ((row: Row | undefined) => string | undefined);
      /** Тело письма */
      body?: string | ((row: Row | undefined) => string | undefined);
      target?: React.HTMLAttributeAnchorTarget;
      openInNewTab?: boolean;
      textVariant?: 'default' | 'line' | 'muted';
      /** Текст ссылки; по умолчанию — значение ячейки */
      label?: ReactNode | ((params: TableCellFormatContext<Row>) => ReactNode);
      fallback?: string;
    }
  | {
      type: 'link';
      /**
       * URL или шаблон с плейсхолдерами `{поле}` / `{user.id}` по объекту строки.
       * Функция — полный контроль (в т.ч. условный href).
       */
      href: string | ((params: TableCellFormatContext<Row>) => string | undefined | null | false);
      target?: React.HTMLAttributeAnchorTarget;
      rel?: string;
      download?: string | boolean;
      textVariant?: 'default' | 'line' | 'muted';
      openInNewTab?: boolean;
      label?: ReactNode | ((params: TableCellFormatContext<Row>) => ReactNode);
      fallback?: string;
    }
  | {
      type: 'boolean';
      trueLabel?: ReactNode;
      falseLabel?: ReactNode;
      /** Неопределённое значение (`null` / `undefined` / пустая строка) */
      indeterminateLabel?: ReactNode;
    }
  | {
      type: 'enum';
      options:
        | Readonly<Record<string, ReactNode>>
        | ReadonlyArray<{
            readonly value: string | number | boolean;
            readonly label: ReactNode;
          }>;
      fallback?: ReactNode;
    }
  | {
      type: 'custom';
      /** Полный контроль над содержимым ячейки */
      renderCell: (params: TableCellFormatContext<Row>) => ReactNode;
    };

/** Пропсы ячейки с декларативным форматированием (надстройка над `TableCell`). */
export interface TableCellFormattedProps<Row = unknown>
  extends Omit<TableCellProps, 'children'> {
  /** Значение для форматирования */
  value: unknown;
  /** Строка данных — нужна для шаблонов ссылок и кастомных форматтеров */
  row?: Row;
  /** Имя поля (попадает в контекст форматирования) */
  field?: string;
  rowIndex?: number;
  format?: TableCellFormat<Row>;
  /** Если задано — выводится как есть, без `format` */
  children?: ReactNode;
}

/** Параметры колбэка `onColumnResize`: какая колонка и новая ширина в пикселях (родитель обновляет `columns[].width`) */
export interface DataGridColumnResizeParams {
  /** Идентификатор колонки (как у `field` в `DataGridColumn`) */
  field: string;
  /** Новая ширина колонки в пикселях после отпускания ручки */
  width: number;
}

/** Ширина колонки в процессе жеста ресайза (`onColumnResizeStart`, `onColumnResizeChange`) */
export interface DataGridColumnResizeProgressParams {
  field: string;
  /** Ширина в px: исходная при старте или текущая при перетаскивании */
  width: number;
}

/** Завершение жеста ресайза (отпускание с фиксацией или отмена) */
export interface DataGridColumnResizeEndParams extends DataGridColumnResizeProgressParams {
  /**
   * `true` — отпускание ручки (`pointerup`); при этом, если задан `onColumnResize`, он будет вызван с этой шириной.
   * `false` — `pointercancel` / прерывание без фиксации (`onColumnResize` не вызывается).
   */
  committed: boolean;
}

/** Старт перетаскивания заголовка колонки (`enableColumnDrag`) */
export interface DataGridColumnDragStartParams {
  /** Индекс колонки в текущем массиве `columns` */
  fromIndex: number;
  /** Поле колонки (`columns[].field`) */
  field: string;
}

/** Успешная перестановка колонок (удобнее, чем только индексы у `onColumnDragEnd`) */
export interface DataGridColumnOrderChangeParams {
  fromIndex: number;
  toIndex: number;
  /** Поле переносимой колонки */
  field: string;
}

/** Клик по встроенной кнопке фильтра в заголовке (`filterable` у колонки + `onColumnFilterClick` у грида) */
export interface DataGridColumnFilterClickParams {
  field: string;
  nativeEvent: React.MouseEvent<HTMLButtonElement>;
}

/** Частичные пропсы `Icon` для встроенной иконки фильтра в заголовке колонки `DataGrid` */
export type DataGridColumnFilterIconProps = Partial<
  Pick<IconProps, 'name' | 'size' | 'color' | 'className'>
>;

/**
 * Горизонтальное расположение встроенной кнопки-фильтра в заголовке колонки (`filterable`).
 * - `inlineTitle` — сразу после блока заголовка, без растягивания заголовка на всю ширину ячейки (компактная группа у края выравнивания).
 * - `leading` — у левого края ячейки, перед текстом заголовка.
 * - `trailing` — после заголовка; блок заголовка занимает свободное место, иконка у правого края ячейки (поведение по умолчанию).
 */
export type DataGridColumnFilterIconPosition = 'inlineTitle' | 'leading' | 'trailing';

/** Старт перетаскивания строки за ручку (`enableRowDrag`) */
export interface DataGridRowDragStartParams {
  fromIndex: number;
  rowId: DataGridRowId;
}

/** Описание колонки грида (поле, заголовок, рендер ячейки) */
export interface DataGridColumn<Row extends DataGridBaseRow = DataGridBaseRow> {
  /** Ключ поля в строке (строка допускает вложенные пути через точку, напр. `user.name`) */
  field: keyof Row | string;
  /** Заголовок колонки */
  headerName?: ReactNode;
  width?: number | string;
  minWidth?: number | string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  /** Кастомное значение ячейки */
  valueGetter?: (row: Row) => unknown;
  /**
   * Декларативное форматирование отображения (ссылки, маски, числа, даты и т.д.);
   * применяется, если не заданы `render` у колонки и глобальный `renderCell` у грида.
   */
  format?: TableCellFormat<Row>;
  /** Рендер ячейки; приоритетнее глобального `renderCell` у `DataGrid` */
  render?: (params: DataGridRenderCellParams<Row>) => ReactNode;
  /** Не участвует в перестановке колонок drag-and-drop */
  disableReorder?: boolean;
  /** Не показывать ручку изменения ширины при `enableColumnResize` и `onColumnResize` */
  disableResize?: boolean;
  /** Максимум строк заголовка; перекрывает `headerMaxLines` у `DataGrid`, если задано */
  headerMaxLines?: number;
  /** Показать кнопку-иконку фильтра в заголовке; клик уходит в `onColumnFilterClick` у `DataGrid` */
  filterable?: boolean;
  /** У фильтруемой колонки: подсветка иконки (заливка `theme.colors.info`), если условие уже применено */
  filterApplied?: boolean;
  /** Свой узел внутри кнопки фильтра вместо стандартной `Icon`; приоритет над `filterIconProps` и `filterIconPropsApplied` */
  filterIcon?: ReactNode;
  /** Кастомизация встроенной иконки: `name`, `size`, `color`, `className` (мерж поверх `IconExFilter` + `IconSize.XS` + `currentColor`) */
  filterIconProps?: DataGridColumnFilterIconProps;
  /** Доп. мерж поверх `filterIconProps`, когда `filterApplied === true` (например другой `color` на фоне `info`) */
  filterIconPropsApplied?: DataGridColumnFilterIconProps;
  /** Расположение встроенной иконки фильтра; по умолчанию `trailing` */
  filterIconPosition?: DataGridColumnFilterIconPosition;
}

/** Аргумент `renderRowWrapper`: обёртка над одной строкой `tr` */
export interface DataGridRenderRowWrapperParams<Row extends DataGridBaseRow = DataGridBaseRow> {
  row: Row;
  /** Готовый элемент строки таблицы */
  children: React.ReactElement;
}

/**
 * Статус данных внутри раскрывающейся подстроки (ленивая загрузка и ошибки).
 * - `idle` — данные ещё не запрашивались или сброшены
 * - `loading` — идёт загрузка только для этой подстроки
 * - `ready` — данные готовы к отображению
 * - `error` — ошибка загрузки (сообщение обычно в `renderExpandedRow`)
 */
export type DataGridExpandedRowDataStatus = 'idle' | 'loading' | 'ready' | 'error';

/** Второй аргумент `renderExpandedRow`: статус и флаг загрузки для кастомного UI */
export interface DataGridExpandedRowRenderContext {
  /** Агрегированный статус данных подстроки */
  dataStatus: DataGridExpandedRowDataStatus;
  /** Эквивалент `dataStatus === 'loading'` — удобно при частичной подстановке пропсов */
  isLoading: boolean;
}

/**
 * Аргумент колбэка `onExpandedRowChange` у `DataGrid`.
 * Вызывается при каждом развороте или сворачивании строки по кнопке раскрытия (после расчёта нового набора id).
 */
export interface DataGridExpandedRowChangeParams {
  /** Идентификатор строки, для которой изменилось состояние раскрытия */
  rowId: DataGridRowId;
  /** `true`, если строка стала развёрнутой; `false`, если свёрнута */
  expanded: boolean;
  /**
   * Полный список id всех развёрнутых строк **после** этого действия (включая или исключая `rowId` в зависимости от `expanded`).
   * Удобно для контролируемого режима: передать тот же массив/Set в `expandedRowIds` без ручного диффа.
   */
  expandedIds: readonly DataGridRowId[];
}

/**
 * Готовая таблица-грид: колонки, строки, выбор, пагинация, сортировка, загрузка, DnD (опционально).
 * @property tableId — `id` у `<table>` и `name` у группы радиокнопок при `multiselect={false}`
 * @property columns — Описание колонок
 * @property rows — Данные (при `paginationMode="client"` можно передать полный набор)
 * @property totalRows — Всего записей (для футера и client-среза)
 * @property getRowId — По умолчанию `row => row.id`
 * @property displayRowSelectionColumn — Показать колонку выбора (чекбокс или радио)
 * @property multiselect — Множественный выбор; при `false` и включённой колонке выбора — радиокнопки
 * @property selectedIds — Выбранные id
 * @property disabledIds — Неактивные строки по id
 * @property onRowSelectionChange — Изменение выбора; для single массив из 0–1 элемента
 * @property paginationModel + onPaginationChange — Контролируемая пагинация; без них футер пагинации скрыт
 * @property paginationVariant — Вид плашки страниц у `TablePagination`: `compact` — только стрелки и номер текущей страницы между ними
 * @property paginationToolbarAlign — Выравнивание строки «строк на странице» + пагинация (`TablePagination`); по умолчанию `right`
 * @property paginationToolbarReverse — Реверсивный порядок элементов строки футера
 * @property showRowsPerPageSelect — Показывать ли выбор размера страницы (прокидывается в `TablePagination`)
 * @property showPageJump — Поле ввода номера страницы слева от плашки страниц (`TablePagination`)
 * @property labelPageJump — Подпись к полю перехода к странице
 * @property rowsPerPageSelectVariant — `compact` для сокращённого блока «строк на странице»
 * @property paginationMode — Как интерпретировать `rows` при пагинации
 * @property sortModel + onSortChange — Контролируемая сортировка (одно поле, массив критериев или `null`; данные сортирует родитель)
 * @property multiColumnSort — Режим нескольких полей: клик добавляет asc → desc → снять; порядок в массиве — приоритет
 * @property scrollAreaMaxHeight — Макс. высота зоны прокрутки сетки (пробрасывается в `TableContainerScroll`); для корректной липкой шапки вместо внешней обёртки с `overflow: auto`
 * @property tableHeaderVariant — Тон фона шапки и панели `headerToolbar`: `default` (серый из темы) или `card` (фон карточки)
 * @property tableHeaderBackground — Произвольный цвет фона шапки (приоритет над `tableHeaderVariant`)
 * @property rowBackgroundColorByStatus — Фон строки по данным строки
 * @property expandedRowIds — контролируемый набор id развёрнутых строк (`Set` или массив); без пропа раскрытие хранится внутри грида
 * @property onExpandedRowChange — уведомление о клике по раскрытию: аргумент `{ rowId, expanded, expandedIds }` (не использовать удалённое имя `onRowCollapseChange`)
 * @property getRowExpandable + renderExpandedRow — какие строки можно раскрыть и что рендерить под строкой
 * @property getExpandedRowDataStatus + getExpandedRowLoading + onExpandedRowOpen — ленивая загрузка и статусы области раскрытия (отдельно от `isLoading` таблицы)
 * @property renderRowWrapper — Обёртка над `TableRow` (должна сохранять один корневой `tr` или `Fragment` с одним `tr`)
 * @property renderCell — Глобальный рендер ячейки, если у колонки нет `render`
 * @property onColumnDragStart / onColumnDragCancel / onColumnOrderChange — жизненный цикл DnD колонок (успешный drop по-прежнему в `onColumnDragEnd`)
 * @property onColumnDragEnd — Завершение перетаскивания заголовка колонки (индексы в текущем порядке `columns`)
 * @property enableColumnResize + onColumnResize — изменение ширины колонки за правый край заголовка (контролируемо через `columns[].width`)
 * @property onColumnResizeStart / onColumnResizeChange / onColumnResizeEnd — жизненный цикл жеста ресайза
 * @property headerMaxLines — ограничение числа строк в заголовках колонок (`line-clamp`); у колонки можно задать своё `headerMaxLines`
 * @property onRowDragStart / onRowDragCancel — старт и отмена DnD строк (итог в `onRowDragEnd`)
 * @property onRowDragEnd — Новый порядок id после перетаскивания строк (только при `enableRowDrag`)
 * @property onColumnFilterClick — клик по встроенной иконке фильтра (`filterable` у колонки); положение иконки — `columns[].filterIconPosition`
 * @property headerToolbar — дополнительная строка в `thead` над заголовками колонок (слот для иконок-действий)
 * @property headerToolbarAlign — выравнивание содержимого строки `headerToolbar` (flex `justify-content`)
 * @property headerToolbarAriaLabel — подпись для `role="toolbar"` у строки-дополнения шапки
 * @property columnDividers — вертикальные разделители между колонками у вложенной `Table` (по умолчанию `true`)
 * @property striped — зебра строк в `tbody`; в компоненте `DataGrid` по умолчанию `true`, у примитива `Table` — `false`
 * @property size — `Size` дизайн-системы → плотность `Table` и размеры контролов
 */
export interface DataGridProps<
  Row extends DataGridBaseRow = DataGridBaseRow,
> extends BaseComponentProps {
  tableId: string;
  columns: readonly DataGridColumn<Row>[];
  rows: readonly Row[];
  totalRows: number;
  getRowId?: (row: Row) => DataGridRowId;
  displayRowSelectionColumn?: boolean;
  multiselect?: boolean;
  selectedIds?: ReadonlySet<DataGridRowId> | readonly DataGridRowId[];
  disabledIds?: ReadonlySet<DataGridRowId> | readonly DataGridRowId[];
  onRowSelectionChange?: (nextIds: DataGridRowId[], reason: 'row' | 'header' | 'clear') => void;
  onRowClick?: (row: Row, event: React.MouseEvent<HTMLTableRowElement>) => void;
  onRowDoubleClick?: (row: Row, event: React.MouseEvent<HTMLTableRowElement>) => void;
  paginationModel?: DataGridPaginationModel;
  onPaginationChange?: (model: DataGridPaginationModel) => void;
  /** Режим отображения номеров страниц в подвале (`TablePagination`) */
  paginationVariant?: 'default' | 'compact';
  /** Выравнивание футера пагинации (селект размера страницы + номера страниц) */
  paginationToolbarAlign?: TablePaginationToolbarAlign;
  /** Обратный порядок элементов в строке футера пагинации */
  paginationToolbarReverse?: boolean;
  /** Показать селект «строк на странице» в подвале (см. `TablePagination`) */
  showRowsPerPageSelect?: boolean;
  /** Поле «перейти к странице» слева от плашки страниц */
  showPageJump?: boolean;
  /** Подпись перед полем номера страницы */
  labelPageJump?: React.ReactNode;
  /** Сокращённый вид селектора размера страницы */
  rowsPerPageSelectVariant?: 'default' | 'compact';
  paginationMode?: DataGridPaginationMode;
  rowsPerPageOptions?: number[];
  sortModel?: DataGridSortModel;
  onSortChange?: (model: DataGridSortModel) => void;
  /** Сортировка по нескольким колонкам: модель — массив `DataGridSortCriterion` по приоритету (см. `sortModel`) */
  multiColumnSort?: boolean;
  stickyHeader?: boolean;
  /**
   * Максимальная высота области с вертикальным скроллом вокруг таблицы (число — пиксели).
   * Пробрасывается в `TableContainerScroll` как `scrollAreaMaxHeight`: один scroll-контейнер с горизонтальным
   * скроллом широкой сетки, без конфликта с `position: sticky` у шапки (см. примитив `Table`).
   */
  scrollAreaMaxHeight?: string | number;
  /**
   * Тон фона шапки (`thead`) и панели `headerToolbar`: `default` — `theme.tables.header.background`;
   * `card` — `theme.tables.shell.background` (визуально как белая карточка).
   */
  tableHeaderVariant?: DataGridTableHeaderVariant;
  /**
   * Произвольный цвет фона шапки и панели иконок (`headerToolbar`), например `#f5f5f5` или `color-mix(...)`.
   * Непустая строка перекрывает `tableHeaderVariant`.
   */
  tableHeaderBackground?: string;
  /** Зебра в `tbody`; по умолчанию в `DataGrid` включена (`true`). Для фона строк как у карточки — `false`. */
  striped?: boolean;
  /** Тонкие вертикальные разделители между колонками; по умолчанию `true` (прокидывается в `Table`) */
  columnDividers?: boolean;
  /** Масштаб строк, шрифтов и контролов выбора */
  size?: Size;
  /** Максимум строк текста в заголовке каждой колонки данных (сортировка — через `TableSortLabel.maxLines`) */
  headerMaxLines?: number;
  isLoading?: boolean;
  /** Цвет фона строки; например по статусу из `row` */
  rowBackgroundColorByStatus?: (row: Row) => string | undefined;
  expandedRowIds?: ReadonlySet<DataGridRowId> | readonly DataGridRowId[];
  getRowExpandable?: (row: Row) => boolean;
  /**
   * Статус данных под раскрывающейся строкой. Если не задан, подстрока считается в состоянии `ready`,
   * либо загрузкой управляет только `getExpandedRowLoading`.
   */
  getExpandedRowDataStatus?: (row: Row) => DataGridExpandedRowDataStatus;
  /**
   * Загрузка только области раскрытия (не перекрывает всю таблицу, в отличие от `isLoading`).
   * Игнорируется, если передан `getExpandedRowDataStatus`.
   */
  getExpandedRowLoading?: (row: Row) => boolean;
  /** Вызывается при развороте строки (удобно запустить ленивую подгрузку по `row.id`) */
  onExpandedRowOpen?: (row: Row) => void;
  /**
   * Клик по кнопке раскрытия строки: уведомление родителя о новом состоянии.
   * В `params` передаются `rowId`, флаг `expanded` для этой строки и полный массив `expandedIds` после операции.
   * При контролируемом `expandedRowIds` обновляйте состояние родителя из этого колбэка; при неконтролируемом (`expandedRowIds` не передан)
   * внутренний набор раскрытых строк обновит сам `DataGrid` после вызова колбэка.
   * Старое имя `onRowCollapseChange` удалено — используйте только этот колбэк.
   */
  onExpandedRowChange?: (params: DataGridExpandedRowChangeParams) => void;
  renderExpandedRow?: (row: Row, context: DataGridExpandedRowRenderContext) => ReactNode;
  renderRowWrapper?: (params: DataGridRenderRowWrapperParams<Row>) => React.ReactElement;
  renderCell?: (params: DataGridRenderCellParams<Row>) => ReactNode;
  enableColumnDrag?: boolean;
  /** Старт перетаскивания заголовка (индекс и поле колонки) */
  onColumnDragStart?: (params: DataGridColumnDragStartParams) => void;
  /** Успешный drop: индексы в текущем порядке `columns` до перестройки массива родителем */
  onColumnDragEnd?: (fromIndex: number, toIndex: number) => void;
  /** То же перемещение, что и `onColumnDragEnd`, плюс `field` переносимой колонки */
  onColumnOrderChange?: (params: DataGridColumnOrderChangeParams) => void;
  /** Drag колонки завершён без смены позиции (drop на ту же колонку или отпускание вне цели) */
  onColumnDragCancel?: () => void;
  /**
   * Ручка на правом краю заголовка колонки; ширину храните в `columns[].width`, обновляя по `onColumnResize`.
   * Включает у `<table>` раскладку `table-layout: fixed`, чтобы при перетаскивании не пересчитывались ширины остальных колонок; для предсказуемости задавайте `width` данным колонкам.
   */
  enableColumnResize?: boolean;
  /** Начало жеста: исходная ширина в px */
  onColumnResizeStart?: (params: DataGridColumnResizeProgressParams) => void;
  /** Перетаскивание ручки: предпросмотр ширины в px */
  onColumnResizeChange?: (params: DataGridColumnResizeProgressParams) => void;
  /** Вызывается после отпускания ручки; передайте обновлённые `columns` с новым `width` (число px) */
  onColumnResize?: (params: DataGridColumnResizeParams) => void;
  /** Конец жеста: `committed` — отпускание без отмены (`pointerup`); `onColumnResize` вызывается только при `committed && onColumnResize` */
  onColumnResizeEnd?: (params: DataGridColumnResizeEndParams) => void;
  /** Верхняя граница ширины при ресайзе (по умолчанию 2000px) */
  columnResizeMaxWidthPx?: number;
  enableRowDrag?: boolean;
  /** Старт перетаскивания строки за ручку (индекс на текущей странице и id строки) */
  onRowDragStart?: (params: DataGridRowDragStartParams) => void;
  onRowDragEnd?: (orderedIds: DataGridRowId[]) => void;
  /** Drop на ту же строку или отпускание вне цели без смены порядка */
  onRowDragCancel?: () => void;
  /** Клик по кнопке фильтра у колонки с `filterable: true` */
  onColumnFilterClick?: (params: DataGridColumnFilterClickParams) => void;
  /**
   * Слот «подшапки»: строка в `thead` **выше** строки с названиями колонок; одна ячейка на всю ширину (`colSpan`).
   * Передавайте ряд `IconButton`, группы действий и т.п. (настройки, экспорт, история изменений, документация).
   */
  headerToolbar?: ReactNode;
  /**
   * Выравнивание содержимого `headerToolbar` по горизонтали (`justify-content` у flex-контейнера).
   * @defaultValue 'end'
   */
  headerToolbarAlign?: 'start' | 'end' | 'center' | 'space-between';
  /**
   * Краткая подпись для доступности (`aria-label` у контейнера с `role="toolbar"`).
   * Если не задана, используется нейтральная подпись по умолчанию в компоненте.
   */
  headerToolbarAriaLabel?: string;
  hideFooter?: boolean;
  elevated?: boolean;
  tableAriaLabel?: string;
  style?: React.CSSProperties;
}

/** Как рисуется корень панели: отдельная карточка или «плоский» слой внутри уже оформленного `Dropdown` */
export type ColumnFilterPanelPresentation = 'elevatedCard' | 'embeddedInDropdown';

/**
 * Панель фильтра колонки таблицы: слот под любые контролы + футер «Применить» / «Очистить».
 * Внутрь передавайте поля ввода и логику буфера фильтра самостоятельно (как в Admiral Data Table).
 */
export interface ColumnFilterPanelProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Содержимое области фильтра: DateInput, Select, чекбоксы и т.д. */
  children: ReactNode;
  /** Подтверждение условий фильтра (закрыть оверлей, записать значение в модель фильтра). */
  onApply: () => void;
  /** Сброс фильтра по колонке. */
  onClear: () => void;
  /**
   * Клик по кнопке «Применить»: событие с кнопки (аналитика, `stopPropagation`, `data-*` из `event.currentTarget`).
   * Вызывается перед `onApply`.
   */
  onApplyButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Клик по кнопке «Очистить»; вызывается перед `onClear`.
   */
  onClearButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Текст или элемент кнопки применения */
  applyLabel?: ReactNode;
  /** Текст или элемент кнопки сброса */
  clearLabel?: ReactNode;
  /** Плотность корня панели (токены карточки); кнопки футера рендерятся на ступень меньше. */
  size?: Size;
  /** Отключить обе кнопки футера */
  disabled?: boolean;
  /** Отключить только «Применить» */
  applyDisabled?: boolean;
  /** Отключить только «Очистить» */
  clearDisabled?: boolean;
  /** Две кнопки делят ширину футера поровну (\`flex: 1\`); при \`false\` — ширина по содержимому */
  fullWidthButtons?: boolean;
  /**
   * `elevatedCard` (по умолчанию) — фон, тень и отступы как у карточки (отдельный блок, сторис по умолчанию).
   * `embeddedInDropdown` — без второй «карточки» внутри `Dropdown`: только тело + футер, чтобы не дублировать обводку/тень контейнера меню и не обрезаться по ширине.
   */
  presentation?: ColumnFilterPanelPresentation;
}

// export type IconVariant = 'plainer' | 'iconex';
export type IconVariant = keyof typeof icons;
