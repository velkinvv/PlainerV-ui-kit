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
 * @property clearIcon - Показывать ли иконку очистки
 * @property onClearIconClick - Обработчик клика по иконке очистки
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
  extends LinkAnchorCommon,
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
 * @property disableCopying - Отключает возможность вставки/копирования
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
export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: ReactNode;
  error?: string;
  success?: boolean;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  textAlign?: TextAlign;
  readOnly?: boolean;
  skeleton?: boolean;
  disableCopying?: boolean;
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
 * @property size - Размер отступов/высоты как у `Input`
 * @property status - Явный статус обводки (`error` | `success` | `warning`)
 * @property buttonLabel - Текст на `<label htmlFor>` триггера открытия диалога (по умолчанию «Выбрать файл»)
 * @property placeholder - Текст в области имени файла, пока ничего не выбрано
 * @property fileName - Контролируемая подпись выбранных файлов (приоритет над авто-текстом из `input.files`)
 * @property showClearButton - Показывать кнопку сброса выбора (очищает значение у `input`)
 * @property onClear - Колбэк после сброса выбора (вместе с очисткой `input`)
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

export interface FileInputProps
  extends Omit<
    BaseInputProps,
    | 'type'
    | 'handleInput'
    | 'clearIcon'
    | 'onClearIconClick'
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
  showClearButton?: boolean;
  onClear?: () => void;
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

/** Цветовая схема тега (макет Figma) */
export type TagColorVariant = 'neutral' | 'danger' | 'info' | 'success' | 'warning';

/** Вид заливки: мягкий фон или контрастная обводка */
export type TagAppearance = 'filled' | 'outline';

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
 */
export interface TagProps extends BaseComponentProps, Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  children?: React.ReactNode;
  colorVariant?: TagColorVariant;
  appearance?: TagAppearance;
  size?: Size;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  disabled?: boolean;
}

/**
 * Чип «Pill» с круглым индикатором слева (макет Figma: default / hover / active / selected / disabled).
 * @property children - Подпись (например «Pill»)
 * @property selected - Выбранное состояние (синий акцент, заполненный индикатор)
 * @property size - Размер: SM / MD / LG
 * @property disabled - Неактивное состояние
 * @property className - Дополнительный CSS-класс
 * Остальные пропсы передаются на нативную кнопку (`type="button"` по умолчанию).
 */
export interface PillProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'size'>,
    BaseComponentProps {
  children: React.ReactNode;
  selected?: boolean;
  size?: Size;
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
 * @property size - Размер бегунка (SM / MD / LG)
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
}

/**
 * Сторона появления панели `Sheet` (совпадает с `DrawerPlacement`).
 */
export type SheetPlacement = DrawerPlacement;

/**
 * Пропсы панели `Sheet` (лист с края экрана, чаще снизу): те же поля, что у `Drawer` (`isOpen`, `onClose`, `placement`, `width`, `height`, оверлей, фокус).
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
 * @property onSelect - Индивидуальный обработчик выбора
 * @property children - Кастомное содержимое, если нужно полностью переопределить верстку
 */
export interface DropdownMenuItemProps extends BaseComponentProps {
  label?: ReactNode;
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
 * Внешний вид табов (макет Figma: сегментированный «pill» или классическая линия)
 */
export enum TabsVariant {
  /** Нижняя/боковая линия-индикатор, фон панели */
  LINE = 'line',
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

export interface TabsProps extends BaseComponentProps {
  defaultActiveTab?: string;
  onChange?: (activeTab: string) => void;
  /** Направление отображения табов */
  direction?: TabsDirection;
  /** Позиция табов в вертикальном режиме (слева или справа от контента) */
  tabsPosition?: TabsVerticalPosition;
  /**
   * Вариант оформления. Если не задан: горизонтально — pill (макет сегментов), вертикально — line.
   */
  variant?: TabsVariant;
}

/**
 * Подсветка активного пункта бокового меню (макет Figma Menu / MenuItem)
 */
export enum MenuActiveAppearance {
  /** Синяя полоса слева + акцентный цвет подписи и иконок */
  BAR = 'bar',
  /** Полоса + мягкий голубой фон */
  HIGHLIGHTED = 'highlighted',
  /** Сплошная заливка primary, белый текст */
  SOLID = 'solid',
}

/**
 * Пропсы контейнера вертикального меню навигации
 * @property collapsed — компактный режим: только иконки, бейдж на иконке
 * @property activeId — id выбранного пункта (контролируемый режим)
 * @property defaultActiveId — начальный выбранный пункт
 * @property onActiveChange — смена выбранного id
 * @property activeAppearance — стиль подсветки активного пункта
 * @property aria-label — доступное имя для элемента навигации
 */
export interface MenuProps extends BaseComponentProps {
  collapsed?: boolean;
  activeId?: string | null;
  defaultActiveId?: string | null;
  onActiveChange?: (id: string) => void;
  activeAppearance?: MenuActiveAppearance;
  'aria-label'?: string;
}

/**
 * Пропсы пункта меню
 * @property id — уникальный ключ внутри меню (связь с activeId)
 * @property label — основной текст (в collapsed скрывается визуально)
 * @property icon — префикс-иконка слева
 * @property badge — красный бейдж (в expanded — справа от текста, в collapsed — на иконке)
 * @property suffix — суффикс (например шеврон подменю)
 * @property disabled — отключённое состояние
 * @property href — если задан, рендерится ссылка вместо кнопки
 * @property title — подсказка; в collapsed по умолчанию не задаётся из label (передайте строку)
 * @property onClick — дополнительный обработчик клика
 */
export interface MenuItemProps {
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
 * @property active — выбранный инструмент (синяя подложка в default-группе)
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
export interface FloatingMenuDividerProps extends BaseComponentProps {}

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
 * Визуальный режим степпера навигации (светлый / тёмный «пилюльный» контейнер по макету Figma).
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
 * @property onDayMouseEnter / onDayMouseLeave — наведение на день (предпросмотр конца диапазона в `DateInput`).
 * @property showDateRollers — три колонки «день — месяц — год» над сеткой (макет Figma «роллеры»).
 * @property monthYearLayout — один выпадающий список или два триггера месяц / год.
 * @property onRollersDateChange — если задан, роллеры вызывают его вместо `onSelectDate`/`onChange` (например, без закрытия попапа в `DateInput`).
 */
export type CalendarSelectionMode = 'single' | 'range';

export interface CalendarProps
  extends BaseComponentProps,
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      'children' | 'onChange' | 'defaultValue' | 'value'
    > {
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
 */
export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

/**
 * Пропсы селекта (нативный `select` в оболочке как у `Input`)
 * @property options - Список опций
 * @property label - Подпись поля
 * @property placeholder - Пустое состояние в триггере и первая опция (`value=""`) в native single; при `multiple` в `mode="select"` при ненулевом выборе триггер показывает «Выбрано: N»
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
 * @property size - Размер из `Size` (конфликт с HTML `size` у `select` снят через `Omit`)
 * @property textAlign - Выравнивание текста
 * @property isLoading - Спиннер справа
 * @property tooltip - Подсказка
 * @property tooltipType - `tooltip` или `hint`
 * @property tooltipPosition - Позиция подсказки
 * @property additionalLabel - Доп. подпись
 * @property extraText - Текст под полем
 * @property mode - `native` — нативный `select`; `select` — панель как у `Dropdown` с поиском и мультивыбором
 * @property multiple - Множественный выбор (нативно и в `mode="select"`)
 * @property searchable - В `mode="select"`: поле поиска в панели (по умолчанию `true`, передайте `false` чтобы отключить)
 * @property searchPlaceholder - Плейсхолдер поиска в панели
 * @property searchValue - Контролируемая строка поиска (прокидывается в `Dropdown`)
 * @property defaultSearchValue - Неконтролируемое значение поиска по умолчанию
 * @property onSearch - Изменение строки поиска в панели
 * @property searchFilter - Кастомная фильтрация пунктов (как у `Dropdown`)
 * @property dropdownVariant - Вариант оформления панели (`Dropdown`)
 * @property menuMaxHeight - Макс. высота панели
 * @property dropdownInline - `inline` у `Dropdown` (портал выключен)
 * @property showMultiSelectionCountBadge - В `mode="select"` при `multiple`: круглый бейдж с числом выбранных слева от шеврона (по умолчанию включён)
 * @property onValueChange - Удобный колбэк при смене значения в `mode="select"` (строка или массив строк)
 * @property value - Для `multiple` — массив строк; иначе строка
 * @property defaultValue - Аналогично `value` для неконтролируемого режима
 */
export interface SelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    'size' | 'children' | 'value' | 'defaultValue'
  > {
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
  /** `select` — выпадающая панель в стиле `Dropdown`; `native` — системный `select` */
  mode?: 'native' | 'select';
  /** В `mode="select"`: показывать поле поиска в панели (по умолчанию `true`) */
  searchable?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  defaultSearchValue?: string;
  onSearch?: (query: string) => void;
  searchFilter?: (query: string, item: DropdownMenuItemProps) => boolean;
  dropdownVariant?: 'default' | 'elevated' | 'outlined';
  menuMaxHeight?: string | number;
  /** Прокидывается в `Dropdown.inline` */
  dropdownInline?: boolean;
  /**
   * В `mode="select"` при `multiple`: показывать бейдж с числом выбранных слева от шеврона (как в макете).
   * По умолчанию `true`; передайте `false`, чтобы скрыть.
   */
  showMultiSelectionCountBadge?: boolean;
  /** Колбэк при изменении выбранного значения (удобен в `mode="select"`) */
  onValueChange?: (value: string | string[]) => void;
}

/**
 * Визуальный тип toast-уведомления
 * `neutral` — нейтральная серая палитра (в основном для внешнего вида «пилюля» по макету Figma)
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'neutral';

/**
 * Внешний вид карточки toast: классическая с полосой слева или «пилюля» с иконкой, свечением и кнопкой действия
 */
export enum ToastAppearance {
  /** Полоса слева, фон по типу уведомления */
  CARD = 'card',
  /** Светлая «капсула»: иконка с glow, текст, опциональная кнопка действия, круглая кнопка закрытия */
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
  hideToast: (id: string) => void;
  clearToasts: () => void;
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
  size?: Size;
  disabled?: boolean;
  ariaLabel?: string;
}

/**
 * Пропсы чекбокса
 * @property checked - Отмечен ли чекбокс
 * @property onChange - Обработчик изменения
 * @property label - Метка (`ReactNode`)
 * @property disabled - Отключить чекбокс
 * @property size - Размер чекбокса
 * @property error - Сообщение об ошибке
 */
export interface CheckboxProps extends BaseComponentProps {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: ReactNode;
  disabled?: boolean;
  size?: Size;
  error?: string;
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
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLLabelElement>) => void; // Обработчик клика по кнопке или лейблу
  label?: ReactNode;
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
  label?: ReactNode; // Лейбл для всей группы
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
  /** Роллеры день/месяц/год над сеткой в попапе (макет Figma) */
  showDateRollers?: boolean;
  /** Два триггера «месяц» и «год» в шапке календаря вместо одного списка */
  calendarMonthYearLayout?: CalendarMonthYearLayout;
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
export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'role'> {
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
 * Варианты боковой панели
 */
export enum SidebarVariant {
  EXPANDED = 'expanded', // Развернутая панель
  COLLAPSED = 'collapsed', // Свернутая панель
}

/**
 * Элемент боковой панели
 * @property id - Уникальный идентификатор
 * @property label - Подпись элемента (`ReactNode`)
 * @property icon - Иконка элемента
 * @property active - Активен ли элемент
 * @property notificationCount - Количество уведомлений
 * @property onClick - Обработчик клика
 */
export interface SidebarItem {
  id: string;
  label: ReactNode;
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
