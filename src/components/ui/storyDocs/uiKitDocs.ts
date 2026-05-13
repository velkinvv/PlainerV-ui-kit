/**
 * Единые тексты для вкладки Storybook Docs по компонентам UI Kit.
 * Сверено с `types/ui.ts`; таблицы и сценарии использования — для разработчиков.
 */

/** @see ButtonProps, BaseButtonProps */
export const DOC_BUTTON = `
### Назначение
Кнопка действия: варианты из **ButtonVariant**, размер **Size**, опциональные иконки, режим ссылки через **href**.

### Основные пропсы
| Проп | Зачем |
|------|--------|
| \`variant\` | Визуальный стиль: primary, secondary, outline, ghost, danger, success, warning, line, skeleton. |
| \`size\` | XS … XL. |
| \`loading\` | Спиннер вместо контента; блокирует повторные клики. |
| \`disabled\`, \`fullWidth\`, \`rounded\` | Стандартные флаги. |
| \`iconStart\` / \`iconEnd\` | Слоты под иконки. |
| \`showTooltip\`, \`tooltipText\` | Встроенный тултип по необходимости. |
| \`href\`, \`target\`, \`rel\`, \`download\` | Рендер как **ссылка-кнопка** (\`<a>\` с теми же стилями). |

Остальное — нативные атрибуты **HTMLButtonElement** (\`type\`, \`onClick\`, \`aria-*\`).
`.trim();

/** @see IconButtonProps */
export const DOC_ICON_BUTTON = `
### Назначение
Компактная кнопка только с **иконкой** (обязательный слот \`icon\`). Варианты те же, что у **Button** (\`ButtonVariant\`).

### Пропсы
| Проп | Зачем |
|------|--------|
| \`icon\` | Обязательный **ReactNode** (обычно \`<Icon />\`). |
| \`variant\`, \`size\` | Стиль и размер. |
| \`loading\`, \`disabled\`, \`fullWidth\`, \`rounded\` | Как у базовой кнопки. |
| \`showTooltip\`, \`tooltipText\` | Подпись для доступности и наведения. |
`.trim();

/** @see ButtonGroupProps */
export const DOC_BUTTON_GROUP = `
### Назначение
Группа **Button** / **IconButton**: общий контур, опционально **склеенные** сегменты (**attached**), режим **переключателя** (**selectable** + активный индекс).

### Пропсы
| Проп | Зачем |
|------|--------|
| \`orientation\` | horizontal \| vertical. |
| \`attached\`, \`attachedShape\`, \`size\` | Склейка границ; segment \| pill; размер для радиусов. |
| \`fullWidth\` | Растянуть группу. |
| \`selectable\`, \`activeIndex\`, \`defaultActiveIndex\`, \`onActiveIndexChange\` | Контролируемое выделение вкладки-кнопки. |
| \`activeButtonVariant\`, \`inactiveButtonVariant\` | Стили активной и остальных. |
| \`ariaLabel\`, \`role\` | Доступность. |

### Вёрстка attached
В режиме **attached** — \`gap: 0\`, скругления только на внешних краях сегментов; **\`attachedShape="pill"\`** — капсула. **\`size\`** группы согласуйте с **size** дочерних кнопок. У **IconButton** в склеенной группе задавайте \`rounded={false}\`.
`.trim();

/** @see LinkProps */
export const DOC_LINK = `
### Назначение
Унифицированная ссылка: **текстовая** (\`mode=text\`, варианты \`textVariant\`) или **как кнопка** (\`mode=button\` + те же пропсы, что у Button, и обязательный **href**).

### Общее
| Проп | Зачем |
|------|--------|
| \`href\` | URL (обязателен). |
| \`target\`, \`rel\`, \`download\` | Навигация и скачивание; для \`target="_blank"\` безопасный \`rel\` подмешивается в компоненте. |

Текстовый режим: \`textVariant\` — default \| line \| muted.
`.trim();

/** @see InputProps, BaseInputProps */
export const DOC_INPUT = `
### Назначение
Однострочное поле: маски, состояния ошибки/успеха, очистка, подсказки (**tooltip** / **hint**), счётчик **maxLength**, скелетон и загрузка.

### Важные пропсы
| Проп | Зачем |
|------|--------|
| \`variant\` | default \| clear (не selector/date — они у Select/DateInput). |
| \`size\` | Размер контрола (**Size**). |
| \`label\`, \`error\`, \`success\`, \`helperText\`, \`required\` | Форма и валидация. |
| \`leftIcon\`, \`rightIcon\` | Иконки. |
| \`displayClearIcon\`, \`onClearIconClick\`, \`clearIconProps\` | Кнопка очистки. |
| \`status\` | error \| success \| warning — цвет обводки. |
| \`readOnly\`, \`fullWidth\`, \`textAlign\` | Поведение и вёрстка. |
| \`isLoading\`, \`skeleton\` | Индикаторы. |
| \`tooltip\`, \`tooltipType\`, \`tooltipPosition\` | Подсказка к полю. |
| \`displayCharacterCounter\`, \`maxLength\`, пороги счётчика | Лимит символов. |

Наследуются поля из **BaseInputProps** (\`handleInput\`, \`disableCopying\`, \`extraText\`, …).
`.trim();

/** @see TextAreaProps */
export const DOC_TEXTAREA = `
### Назначение
Многострочный ввод с теми же паттернами, что **Input**: лейбл, ошибки, очистка, подсказка (**Tooltip** или **Hint**), счётчик при **maxLength**, блокировка копирования/вставки, **resize**, **rows**.

Рекомендуется оборачивать в **Form** для связки с контекстом формы (как в сторис).
`.trim();

/** @see SelectProps */
export const DOC_SELECT = `
### Назначение
Выбор значения из списка: одиночный или множественный режим, поиск, кастомный рендер опций, интеграция с **Input**-обёрткой (\`variant selector\`).

Смотрите **SelectProps** в \`types/ui.ts\`: \`options\`, \`value\`, \`onValueChange\`, \`mode\`, \`searchable\`, размеры и состояния ошибки.

### Режимы \`mode\`
- **select** — панель **Dropdown** (поиск в шапке панели по умолчанию, мультивыбор).
- **searchSelect** — фильтр в поле, список по фокусу; при **multiple** в закрытом виде — чипы.
- **native** — нативный \`<select>\`.
`.trim();

/** @see FileInputProps */
export const DOC_FILE_INPUT = `
### Назначение
Загрузка файлов: скрытый \`input[type=file]\`, интеграция с **Form**.

### \`fileLayout\`
- **field** — текст поля + иконка загрузки.
- **dropzone** — пунктирная зона, центр.
- **file** — карточка файла (прогресс, размер, удаление).
- **trigger** — кнопка «Выбрать файл».

Ограничения типов/размера и ошибки — через пропсы **FileInputProps**.
`.trim();

/** DateInput — типы из ui.ts DatePickerProps / DateTimeInputProps */
export const DOC_DATE_INPUT = `
### Назначение
Выбор даты: поле + календарь, опционально **диапазон** (\`range: true\`).

### Значение
При \`range: false\` — строка даты в формате поля. При \`range: true\` — \`{ start: string; end: string }\`.

Полный список пропсов — **DateInput** / **DatePickerProps** в \`types/ui.ts\`.
`.trim();

/** @see TimeInputProps */
export const DOC_TIME_INPUT = `
### Назначение
Ввод времени с маской и валидацией.

### Значение
При \`range: false\` — строка (\`14:30\` или с секундами). При \`range: true\` — \`{ start: string; end: string }\`.

См. **TimeInputProps** в \`types/ui.ts\`.
`.trim();

/** @see BadgeProps */
export const DOC_BADGE = `
### Назначение
Компактная метка-счётчик или статус: палитра **BadgeVariant**, размер, опционально иконка и обрезка текста.
`.trim();

/** @see TagProps */
export const DOC_TAG = `
### Назначение
Тег: палитры семантики (\`neutral\`, \`primary\`, \`danger\`, …) и акценты (**secondary**, **purple**, **teal**, **cyan**, **pink**), виды **filled** / **outline**.

### Детали макета
- **\`statusDisplay="marker"\`** — цветной кружок статуса и нейтральная «пилюля»; **\`statusDisplay="surface"\`** (по умолчанию) — цвет всей поверхности.
- **\`customColors\`** — свой фон/обводка/hover; вариант **\`colorVariant="custom"\`** без своего фона использует нейтральную палитру для текста, пока не заданы цвета.

**Размеры** \`Size\`, иконки, клик, \`disabled\`, скелетон (\`skeleton\`), тултип при обрезке текста.
`.trim();

/** @see PillProps */
export const DOC_PILL = `
### Назначение
Чип с круглым индикатором слева: состояния **default / hover / active / selected / disabled**, **\`onChange(nextSelected)\`** для контролируемого выбора (без \`role="radio"\` — переключение \`!selected\`; для радиогруппы — отдельная логика на родителе).

### Пропсы и режимы
- Семантические **статусы** (\`status\`: default, success, warning, danger, info), **loading**, **skeleton**.
- Размеры **SM / MD / LG**, геометрия **PillGeometry** по макету.
`.trim();

/** @see AvatarProps */
export const DOC_AVATAR = `
### Назначение
Аватар: изображение или инициалы из **userName**, размер **Size**, статус-бейдж, доступность (\`alt\`, \`aria-label\`).
`.trim();

/** @see AvatarGroupProps */
export const DOC_AVATAR_GROUP = `
### Назначение
Группировка аватаров: варианты **stack** (наложение), **row** (ряд), **grid** (сетка), счётчик «+N», клики (**onAvatarSelect**, **onCounterClick**).
`.trim();

/** @see CardProps */
export const DOC_CARD = `
### Назначение
Контейнер контента: **CardVariant** (elevated | outlined | filled), **size**/padding, hover и клик (**hoverable**, **clickable**, **onClick**), полная ширина.
`.trim();

/** @see ModalProps */
export const DOC_MODAL = `
### Назначение
Модальное окно (портал): **isOpen**, **onClose**, заголовок/описание/слоты, кнопки (**buttons**), размер, оверлей (**overlayVariant**, blur и т.д.), фокус-ловушка, анимации, вариант (**modalVariant** danger/success/info).

Подробные флаги закрытия: **closeOnOverlayClick**, **closeOnEscape**, **closeOnOutsideClick**, **unmountOnClose**, **lazy**.

Жизненный цикл по умолчанию: **unmountOnClose** и **lazy** включены — модалка не держит DOM в закрытом состоянии без необходимости.
`.trim();

/** @see DrawerProps */
export const DOC_DRAWER = `
### Назначение
Выдвижная панель: портал в \`body\`, оверлей (**overlayVariant** как у **Modal**), фокус-ловушка, Escape, клик по подложке, **placement** (left/right/top/bottom), ширина/высота.

### Lifecycle
**isOpen**, **unmountOnClose**, **lazy** — как у модального паттерна в проекте.
`.trim();

/** SheetProps = DrawerProps; дефолты и safe-area в компоненте */
export const DOC_SHEET = `
### Назначение
Панель-лист (**Sheet**): тот же контракт, что **Drawer** (\`SheetProps = DrawerProps\`). По умолчанию **placement="bottom"**, учёт **safe-area-inset-bottom**, те же оверлей, фокус и lifecycle (**isOpen**, **unmountOnClose**, **lazy**).

Поля совпадают с **Drawer** (ширина/высота, оверлей, закрытие, фокус).
`.trim();

/** @see TooltipProps */
export const DOC_TOOLTIP = `
### Назначение
Всплывающая подсказка над триггером (**children**): **content**, **position**, **delay**, **disabled**, **size**.
`.trim();

/** @see HintProps */
export const DOC_HINT = `
### Назначение
Подсказка рядом с контентом: варианты (**HintVariant**), позиции (**HintPosition**), режим позиционирования, триггеры показа (**HintVisibilityTrigger**). Цвета из темы; по смыслу ближе к контекстной подсказке формы, чем лёгкий **Tooltip**.

Дополнительно: действия (**HintAction**), закрытие, размеры.
`.trim();

/** @see DropdownProps */
export const DOC_DROPDOWN = `
### Назначение
Выпадающий блок с триггером и панелью: позиционирование (floating-ui), закрытие по клику снаружи/Escape, контролируемое открытие, слоты контента.
`.trim();

/** @see PopoverProps */
export const DOC_POPOVER = `
### Назначение
Лёгкая всплывающая панель произвольного содержимого у триггера: **радиусы, отступы, обводка, фон и тень** из \`theme.dropdowns\` (как у **Dropdown**), позиционирование через ту же геометрию (\`calculateDropdownPosition\`), закрытие по клику снаружи и **Escape**.

От **Dropdown** отличается отсутствием меню, пунктов и поиска: только слот **trigger** + **children** в панели. Подходит для подсказок, карточек с действиями, фильтров без списка опций.

**Режим \`inline\`**: панель \`position: absolute\` внутри корня (нужен \`position: relative\` у корня), координаты относительно \`boundaryElement\` или корня.
`.trim();

export const DOC_DROPDOWN_TAG_TRIGGER = `
### Назначение
Тот же **Dropdown**, но триггер по умолчанию — **Tag**: \`defaultTriggerKind="tag"\`, текст в **buttonProps.children**, стиль тега в **tagTriggerProps**.

Подходит для фильтров и мультивыбора (например в шапке таблицы).
`.trim();

/** @see DropdownMenuProps */
export const DOC_DROPDOWN_MENU = `
### Назначение
Обёртка содержимого **Dropdown**: слот для **DropdownMenuItem**, закрытие после выбора через контекст (**onItemSelect** задаёт **Dropdown**).

Клавиатура и ARIA — в связке с корневым **Dropdown**.
`.trim();

/** @see DropdownMenuItemProps */
export const DOC_DROPDOWN_MENU_ITEM = `
### Назначение
Атомарный пункт: **label**, **description**, **value**, **icon**, правый слот (**shortcut** и др.), **disabled**, **loading**, **tone** (\`danger\` для разрушительных действий).
`.trim();

/** @see TabsProps */
export const DOC_TABS = `
### Назначение
Вкладки: **TabsVariant**, направление (**TabsDirection**), вертикальное положение контента (**TabsVerticalPosition**), активная вкладка (контролируемая или дефолтная), панели через **TabItem**.

Доступность: связка триггер ↔ панель (**aria-selected**, **aria-controls**).
`.trim();

export const DOC_TAB_ITEM = `
### Назначение
Элемент вкладки: объединяет триггер и панель (**value**, заголовок, **disabled**). Ориентация текста (**TabItemTextOrientation**, **TabItemTextPosition**).

Используется внутри **Tabs**; для групп см. **TabItemGroupList** в модуле вкладок.
`.trim();

/** @see NavigationMenuProps */
export const DOC_NAVIGATION_MENU = `
### Назначение
Боковое меню навигации (не выпадающий список действий): пункты с иконкой, бейджем, суффиксом; режимы **expanded** / **collapsed** (компактно только иконки).

Вложенность: у **NavigationMenu.Item** (и у элемента **Sidemenu** — поле \`items\` у \`SidemenuItem\`) проп **items** — рекурсивное дерево; id **уникальны по всему дереву**; в развёрнутой панели ветка раскрывается кликом.

В компактном режиме (**\`collapsed\`**) по умолчанию (**\`collapsedNestedFlyout\`**, по умолчанию **true**) подменю показывается в **панели справа** при наведении на ветку, а не с отступом в колонке. На листе по-прежнему **activeId**. Открытие подменю по умолчанию скрыто; **\`defaultNestedExpanded\`** у ветки задаёт начальное «открыто» (панель видна и у активного потомка подсвечивается авто-раскрытие). Чтобы отключить flyout и вернуть прежнее (вложенность в компактной колонке скрыта), задайте **\`collapsedNestedFlyout={false}\`** на **NavigationMenu**.

Опционально **expandInteraction** (\`none\` | \`click\` | \`hover\`): анимированная ширина и раскрытие подписей; колбэки **onExpand** / **onCollapse**, контроль через **expanded** и **onExpandedChange**.

У пункта **NavigationMenu.Item**: статус (**NavigationMenuItemStatus**), **loading** (спиннер), **skeleton** (плейсхолдер), **isVisible** (появление / скрытие строки с анимацией), **tooltip** и **hint** (те же компоненты, что в UI-ките; при обоих заданных — показывается **hint**), **popover** (панель у строки; на листе без **popoverActivateNavigation** клик не меняет **activeId**).

В Storybook см. историю **«Пункты: tooltip, hint, popover»** (обзор) и отдельные **«Пункты: только Tooltip и Hint (детально)»**, **«Пункты: только Popover (детально)»**.

Не путать с компонентом **Menu** (\`role="menu"\` — список действий в выпадающей панели).
`.trim();

/** @see MenuProps */
export const DOC_MENU = `
### Назначение
Панель списка действий с \`role="menu"\`: пункты **MenuItem**, **aria-label**, ограничение высоты (**maxHeight**). Позиционирование относительно кнопки-триггера задаётся снаружи (например **Dropdown**).

Отличается от **NavigationMenu** (постоянная навигация в сайдбаре).
`.trim();

/** @see FloatingMenuProps и связанные */
export const DOC_FLOATING_MENU = `
### Назначение
Плавающая панель инструментов: группы **FloatingMenuGroup**, пункты **FloatingMenuGroupItem**, **FloatingMenuDivider**, **FloatingMenuDragHandle**, позиция **FloatingMenuPlacement**.

Вложенный **NavigationMenu**, подсказки у пунктов. Режим закрепления по краю экрана или **draggable**.
`.trim();

/** @see PaginationProps — отдельно от TablePagination */
export const DOC_PAGINATION = `
### Назначение
Нумерация страниц (1-based в UI плашки): текущая страница, всего страниц, **siblingCount**, стрелки, **variant** compact/full, доступность.

Не путать с **TablePagination** (размер страницы и «строк на странице» под таблицей).

### Внешний вид (тема)
В светлой теме плашка со скруглением и контрастным активным номером (**theme.colors.info**); в тёмной — тёмная плашка и светлый текст (см. сторис для точных токенов).
`.trim();

/** @see AccordionProps */
export const DOC_ACCORDION = `
### Назначение
Аккордеон: несколько элементов с уникальными id, заголовок и подзаголовок, позиционирование элемента (start/center/last), **allowMultiple**, **autoClose**.

Стили из темы (цвета, шрифты, радиусы).
`.trim();

/** @see ProgressProps */
export const DOC_PROGRESS = `
### Назначение
Индикатор прогресса: **linear** / **circular**, значение и подпись, шаги (**variant** stepper и др.), колбэки статуса и завершения.

Хуки **useProgress**, **useStepper** — см. реэкспорт модуля **Progress**.
`.trim();

/** StepperProps union */
export const DOC_STEPPER = `
### Назначение
Пошаговый процесс: **variant** — **compact** (кольцо «текущий/всего», заголовок и подзаголовок) или **linear** (цепочка шагов с соединителями).

**appearance** light \| dark; скругления завязаны на **theme.borderRadius**. Для прогресса внутри формы см. **Progress** (\`variant="stepper"\`).
`.trim();

/** @see CalendarProps */
export const DOC_CALENDAR = `
### Назначение
Календарь: сетка 7×6, **weekStartsOn**, выбор дня, стрелки месяца, выпадающие месяц/год на базе **Dropdown**.

**showDateRollers** — роллеры день/месяц/год; **monthYearLayout="split"** — отдельные триггеры месяца и года.

Режимы выбора и типы значений — см. **CalendarProps** (\`selectionMode\`, single/range).
`.trim();

/** @see SpinnerProps */
export const DOC_SPINNER = `
### Назначение
Индикатор загрузки: вариант анимации (**SpinnerVariant**), размер, **aria-label** для доступности.
`.trim();

/** @see SkeletonProps */
export const DOC_SKELETON = `
### Назначение
Плейсхолдер загрузки: **SkeletonVariant** (text, avatar, button, custom), форма (**shape** rect \| circle), **count** и **gap** для списка, направление группы (**SkeletonGroupDirection**), скорость анимации, **aria-label**.

**borderRadius** и размеры задаются числом (px) или CSS-строкой.
`.trim();

/** @see DividerProps */
export const DOC_DIVIDER = `
### Назначение
Разделитель: **orientation** horizontal \| vertical, отступы, цвет из темы.
`.trim();

/** @see CheckboxProps */
export const DOC_CHECKBOX = `
### Назначение
Чекбокс: **checked** / **indeterminate**, **Size**, ошибка, связь с лейблом, нативные атрибуты **input**.

Для группы связанных опций см. **CheckboxGroup** в том же модуле.
`.trim();

/** @see RadioButtonProps */
export const DOC_RADIO_BUTTON = `
### Назначение
Одна опция: **RadioButtonVariant**, подпись и позиция (**RadioButtonLabelPosition**), тултип, дополнительный лейбл поля, иконки.

В группе используйте общий **name**; для набора опций удобнее **RadioButtonGroup**.
`.trim();

/** @see RadioButtonGroupProps */
export const DOC_RADIO_BUTTON_GROUP = `
### Назначение
Группа опций: массив значений (**RadioButtonGroupOption**), **orientation** horizontal \| vertical, **value** / **onChange**, **disabled**, **readOnly**, **size**, ошибка (**error**), те же визуальные варианты, что у одиночной **RadioButton**.
`.trim();

/** @see SwitchProps */
export const DOC_SWITCH = `
### Назначение
Переключатель Plainer: трек и бегунок, подпись слева/справа, \`role="switch"\`, состояние ошибки, **Size**.

Значение — через **checked** / **defaultChecked** и нативное событие **change** (\`event.target.checked\`).
`.trim();

/** @see SliderProps, RangeSliderProps */
export const DOC_SLIDER = `
## Slider и RangeSlider

Выбор одного значения или диапазона на шкале; визуально согласовано с полями ввода (лейблы, подсказки, ошибки, скелетон).

### Размеры и трек
- **\`size\`** (XS … XL) — диаметр бегунка и толщина линий (\`getSliderThumbSizePx\`, \`getSliderTrackMetrics\`).
- Явно: **\`trackRailHeightPx\`**, **\`trackActiveHeightPx\`** (\`resolveSliderTrackMetrics\`).

### Поля как у Input
**\`label\`**, **\`additionalLabel\`**, **\`helperText\`**, **\`extraText\`**, **\`error\`**, **\`success\`**, **\`required\`** — как у **Input** / **TextArea**. Подсказка скрывается при error/success; **\`status\`** усиливает цвет helperText.

### Состояния (**\`status\`**)
**error** \| **success** \| **warning** — цвет активной полосы и обводка трека. Приоритет: **error** → **success** → **status** (\`resolveSliderAccentKind\`). **disabled** — прежнее затемнение.

### Скелетон
**\`skeleton\`** — шиммер вместо трека; **aria-busy** на контейнере; у range поля «От/До» скрыты.

Акцент по умолчанию: **theme.colors.info** / **infoHover**.
`.trim();

/** @see BreadcrumbProps */
export const DOC_BREADCRUMB = `
### Назначение
Хлебные крошки: массив **BreadcrumbItem** (label, href, onClick, icon, current, ellipsis и др.).

### Вёрстка и a11y
Шеврон между пунктами, опциональная иконка слева, капсула у текущей страницы, сегмент «…» (**ellipsis**), **aria-current**, безопасный **rel** для внешних ссылок.

Разделитель можно переопределить через **separator**.
`.trim();

/** @see GridProps */
export const DOC_GRID = `
### Назначение
Адаптивный **CSS Grid**: **GridMode** (fullscreen \| container), колонки и строки по breakpoints (**GridBreakpoint**), зазоры, вложенность областей.
`.trim();

/** @see GridItemProps */
export const DOC_GRID_ITEM = `
### Назначение
Ячейка: позиция (**column**, **row**), span (**columnSpan**, **rowSpan**), **justifySelf**, **alignSelf**, размеры.
`.trim();

export const DOC_TYPOGRAPHY = `
### Назначение
Типографика по дизайн-системе: **variant** (h1–h6, body, caption, …), цвет текста, выравнивание, семантический тег через полиморфный рендер.

Используйте для заголовков и текста вместо голых тегов — так сохраняются отступы и размеры из темы.
`.trim();

/** @see IconProps */
export const DOC_ICON = `
### Назначение
Иконка из набора (**name** ключ из словаря иконок), размер **IconSize**, цвет (**color**, в т.ч. currentColor для наследования).
`.trim();

export const DOC_ICON_CATEGORIES = `
### Назначение
Обзор иконок по категориям для дизайнеров и выбора имени для **Icon**.
`.trim();

/** ThemeToggle — ThemeToggleProps */
export const DOC_THEME_TOGGLE = `
### Назначение
Переключатель светлой/тёмной темы (интеграция с **ThemeProvider**).
`.trim();

/** @see SidemenuProps */
export const DOC_SIDEMENU = `
### Назначение
Боковое меню навигации: состав пунктов, свёрнутое состояние, ширина, интеграция с лейаутом приложения.

Проп **expandInteraction**: \`click\` / \`hover\` — раскрытие по области; \`toggleButton\` — только кнопка в шапке (**expandToggleRender** или встроенная); **onExpand**, **onCollapse**, **onExpandedChange**; ширины **expandCompactWidth** / **expandExpandedWidth**. Колбэк **onExpandToggleClick** при клике по встроенной кнопке или при вызове **toggleExpanded** из кастомного render.

**offScreenHoverReveal**: панель у кромки; при наведении на полосу **offScreenEdgeWidth** панель **выезжает**; при уходе курсора **уезжает влево за край экрана** (не схлопывание ширины до нуля). Задержка скрытия после mouseleave — **offScreenHideDelayMs** (по умолчанию 1500 мс). **offScreenZIndex**. Видимость: **offScreenRevealed** / **defaultOffScreenRevealed**, **onOffScreenRevealedChange**, **onOffScreenShow**, **onOffScreenHide**.

У **SidemenuItem** те же вложенность и оверлеи, что у **NavigationMenu.Item** (**items**, **tooltip**, **hint**, **popover** и т.д.) — см. сторис **«Меню: вложенность»**, **«Меню: tooltip, hint, popover»**, **«Меню: статусы пунктов»**, **«Меню: skeleton и loading»**.

Проп **logoSlot**: произвольный контент слева в шапке вместо связки логотипа (**logo.icon** + **logo.title**). Область шапки с лого помечена **data-prevent-navigation-expand-toggle**, чтобы клик по ней не переключал раскрытие панели в режиме клика по оболочке.

Проп **footer**: произвольный контент внизу панели (второе меню, кнопки, профиль). Перед футером рисуется тот же горизонтальный **разделитель**, что под шапкой, чтобы отделить средний блок от нижнего слота. Область футера (**SidemenuFooterRegion**) помечена **data-prevent-navigation-expand-toggle**.

Проп **slotStyles**: инлайн-стили зон **header** (шапка + линия под ней), **body** (колонка основного меню), **footer** (обёртка содержимого нижнего слота) — **minHeight**, **height**, **maxHeight**, **overflow**, **flex** и т.д.

Проп **edgeAttached**: панель без скруглений и тени у левого края экрана (**min-height: 100vh**), граница только справа. Поддерживает те же интеракции, что обычный вариант (**expandInteraction**, **offScreenHoverReveal**) — сторис **«У левого края экрана (edgeAttached)»** и **«У края + скрытие/показ и раскрытие»**.

Примеры верхнего и нижнего слотов с разной вёрсткой — сторис **«Слоты: шапка (бренд) и футер (меню)»**, **«Слоты: шапка и футер (кнопки)»**; пример высот — **«Слоты: настройка высот (slotStyles)»**.

В большинстве сторис активный пункт переключается по клику (обёртка со строкой **«Активный пункт»**); вложенные списки по-прежнему раскрываются кликом по ветке внутри **NavigationMenu**.
`.trim();

export const DOC_TOAST = `
### Назначение
Тост-уведомление: тип (success/error/warning/info/neutral), заголовок и текст, время показа, действие с колбэком.

По умолчанию — вид «пилюля» по макету Figma: пастельный фон и рамка цветом типа, иконка с glow, тёмный заголовок, вторичный текст, крестик в строке. Вариант с вертикальной полосой слева — **ToastAppearance.CARD**.

В приложении: **ThemeProvider** + **ToastProvider** + **useToast** (подробнее — сторис **Hooks/useToast**).

### Пропсы элемента
| Проп | Зачем |
|------|--------|
| \`toast\` | Объект **ToastItem** (id, type, message, title?, duration?, appearance?, action?). |
| \`onClose\` | Закрытие по id (таймер или крестик). |
`.trim();

export const DOC_THEME_SHOWCASE = `
### Назначение
Обзор токенов темы и типичных контролов в **ThemeProvider**: используйте как визуальный регресс и проверку светлой/тёмной темы.
`.trim();

export const DOC_ICON_SHOWCASE = `
### Назначение
Витрина доступных иконок и имён для компонента **Icon** (поиск по каталогу).
`.trim();

export const DOC_SNACKBAR = `
### Назначение
Компактная полоса уведомления: тёмный фон, текст, опциональное действие. Размещение у края экрана (внизу/сверху — по настройке провайдера).

В приложении: **ThemeProvider** + **SnackbarProvider** + **useSnackbar** (подробнее — сторис **Hooks/useSnackbar**).

### Пропсы
| Проп | Зачем |
|------|--------|
| \`snackbar\` | **SnackbarItem** (id, message, duration, actionLabel?, onAction?). |
| \`onClose\` | Закрытие по id (крестик, действие или таймер). |
`.trim();

/** @see ColumnFilterPanelProps — обёртка фильтра колонки таблицы */
export const DOC_COLUMN_FILTER_PANEL = `
### Назначение
Контейнер для фильтра по колонке (**Admiral-style**): слот \`children\` под любые поля (**DateInput**, **Select**, маска и т.д.), снизу кнопки **Применить** и **Очистить**. Стили из темы: фон и скругление как у elevated-карточки, тень как у **dropdown**, разделитель футера — \`colors.border\`.

Фильтрацию данных и закрытие поповера выполняют в колбэках \`onApply\` / \`onClear\` на стороне экрана.

Готовая композиция с **Table** / **DataGrid** и **Dropdown** — сторис **UI Kit / Data Display / Table / Column filters** (\`TableWithTextFilterInHeader\`, \`DataGridWithTextFilterInHeader\`) и дубликаты **ColumnFilterInHeader** в корне **Table** и **DataGrid** (тот же \`render\`). Внутри \`Dropdown\` задавайте \`presentation="embeddedInDropdown"\`, чтобы не дублировать фон/тень контейнера меню.

### Пропсы
| Проп | Зачем |
|------|--------|
| \`children\` | Поля фильтра (произвольный React). |
| \`onApply\` | Подтвердить условие (записать в модель, запрос на сервер, закрыть оверлей). |
| \`onClear\` | Сбросить фильтр по колонке. |
| \`onApplyButtonClick\` | Опционально: клик по кнопке «Применить» с \`MouseEvent\` (аналитика, всплытие); вызывается **перед** \`onApply\`. |
| \`onClearButtonClick\` | Опционально: клик по «Очистить» с событием; **перед** \`onClear\`. |
| \`applyLabel\`, \`clearLabel\` | Подписи кнопок. |
| \`size\` | Плотность корня панели (**Size**); кнопки «Применить» / «Очистить» на ступень меньше. |
| \`disabled\`, \`applyDisabled\`, \`clearDisabled\` | Блокировки. |
| \`fullWidthButtons\` | Две кнопки делят ширину поровну. |
| \`presentation\` | \`elevatedCard\` (по умолчанию) — отдельная карточка; \`embeddedInDropdown\` — только содержимое внутри уже оформленного \`Dropdown\`. |
| HTML-атрибуты | Передаются на корневой \`<section>\` (\`className\`, \`aria-*\`, …). |
`.trim();
