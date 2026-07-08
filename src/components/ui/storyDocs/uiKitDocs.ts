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
| \`orientation\` | horizontal | vertical. |
| \`attached\`, \`attachedShape\`, \`size\` | Склейка границ; segment | pill; размер для радиусов. |
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

Текстовый режим: \`textVariant\` — default | line | muted.
`.trim();

/** @see InputProps, BaseInputProps */
export const DOC_INPUT = `
### Назначение
Однострочное поле: маски, состояния ошибки/успеха, очистка, подсказки (**tooltip** / **hint**), счётчик **maxLength**, скелетон и загрузка.

### Важные пропсы
| Проп | Зачем |
|------|--------|
| \`variant\` | default | clear (не selector/date — они у Select/DateInput). |
| \`size\` | Размер контрола (**Size**). |
| \`label\`, \`error\`, \`success\`, \`helperText\`, \`required\` | Форма и валидация. |
| \`leftIcon\`, \`rightIcon\` | Иконки. |
| \`prefix\`, \`suffix\` | Составное поле (InputEx): addon слева/справа в одной рамке; для \`Select\` / \`searchSelect\` в слоте включается \`embeddedInCompositeField\`. |
| \`displayClearIcon\`, \`onClearIconClick\`, \`clearIconProps\` | Кнопка очистки. |
| \`status\` | error | success | warning — цвет обводки. |
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

Слоты **\`leftIcon\`**, **\`rightIcon\`**, **\`prefix\`**, **\`suffix\`** — те же, что у **Input** (составное поле InputEx через **InputFieldShell**; средний сегмент выровнен по верху для многострочного ввода).

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
При \`range: false\` — строка даты в формате поля (\`format\`, по умолчанию \`DD.MM.YYYY\`). При \`range: true\` — \`{ start: string; end: string }\`.

Строки в \`value\` / \`onChange\` — в формате **YYYY-MM-DD** (ISO-дата без времени).

### Черновик пикера (до применения в поле)

Позволяет реагировать на выбор в календаре **до** записи в \`onChange\` — например, автоматически задать конец диапазона от начала.

| Проп | Описание |
|------|----------|
| **\`onPickerChange\`** | Колбэк при каждом изменении черновика в попапе. Аргументы: \`(draft, context)\`. |
| **\`modifyPickerValue\`** | Модификатор черновика. Верните новое значение или \`undefined\`, чтобы оставить как есть. |
| **\`deferPickerCommit\`** | Не обновлять текст поля и не вызывать \`onChange\` до «Применить» / «OK». По умолчанию \`true\`, если задан \`onPickerChange\` или \`modifyPickerValue\`. |

**\`context\`** (\`DatePickerDraftContext\`): \`{ phase, range, format }\`, где **\`phase\`** — \`'pick' | 'apply' | 'clear'\`.

**Поведение:**
- В **диапазоне** выбор всегда коммитится кнопкой «Применить»; черновик обновляется при каждом клике по дню / роллерам.
- В **одиночном** режиме без колбэков — выбор сразу применяется и попап закрывается.
- С \`onPickerChange\` / \`modifyPickerValue\` в одиночном режиме появляется кнопка **OK**; поле не меняется, пока попап открыт и \`deferPickerCommit !== false\`.
- \`modifyPickerValue\` вызывается **до** \`onPickerChange\`; в \`onPickerChange\` приходит уже модифицированный черновик.

**Пример — конец = начало + 7 дней:**

\`\`\`tsx
<DateInput
  range
  value={appliedRange}
  onChange={setAppliedRange}
  onPickerChange={(draft) => setPickerDraft(draft as DateTimeRange)}
  modifyPickerValue={(draft) => {
    if (typeof draft !== 'object' || !draft.start) return undefined;
    const start = new Date(draft.start);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    return { start: draft.start, end: toISODateString(end) };
  }}
/>
\`\`\`

Поддерживаются **\`prefix\`** и **\`suffix\`** (как у **Input**, общая рамка **InputFieldShell**).

Полный список пропсов — **DateInput** / **DatePickerProps** в \`types/ui.ts\`.
`.trim();

/** @see TimeInputProps */
export const DOC_TIME_INPUT = `
### Назначение
Ввод времени с маской и валидацией.

### Значение
При \`range: false\` — строка (\`14:30\` или с секундами). При \`range: true\` — \`{ start: string; end: string }\`.

### Черновик пикера (до применения в поле)

| Проп | Описание |
|------|----------|
| **\`onPickerChange\`** | Колбэк при каждом изменении черновика в попапе. |
| **\`modifyPickerValue\`** | Модификатор черновика (верните новое значение или \`undefined\`). |
| **\`deferPickerCommit\`** | Не обновлять поле и не вызывать \`onChange\` до «Применить» / «OK». По умолчанию \`true\`, если заданы колбэки выше. |

**\`context\`** (\`TimePickerDraftContext\`): \`{ phase, range, format }\`, **\`phase\`** — \`'pick' | 'apply' | 'clear'\`.

**Поведение:** как у **DateInput** — в диапазоне коммит через «Применить»; с колбэками в одиночном режиме — кнопка **OK**; \`modifyPickerValue\` вызывается до \`onPickerChange\`.

**\`prefix\`**, **\`suffix\`** — как у **Input** (\`InputFieldShell\`).

См. **TimeInputProps** в \`types/ui.ts\`.
`.trim();

/** @see DateTimeInputProps */
export const DOC_DATE_TIME_INPUT = `
### Назначение
Выбор даты и времени в одном поле: календарь + колонки часов/минут в одном попапе. Построен на базе **DateInput** и **TimeInput**.

### Значение
При \`range: false\` — строка в формате поля (по умолчанию \`DD.MM.YYYY HH:mm\`). При \`range: true\` — \`{ start: string; end: string }\`.

### Черновик пикера (до применения в поле)

| Проп | Описание |
|------|----------|
| **\`onPickerChange\`** | Колбэк при каждом изменении даты/времени в попапе. |
| **\`modifyPickerValue\`** | Модификатор черновика (верните новое значение или \`undefined\`). |
| **\`deferPickerCommit\`** | Не обновлять поле до «Применить» / «OK». По умолчанию \`true\`, если заданы колбэки выше. |

**\`context\`** (\`DateTimePickerDraftContext\`): \`{ phase, range, format }\`.

**Поведение:** выбор в попапе коммитится кнопкой «Применить» / «OK»; с колбэками текст поля не меняется, пока попап открыт и \`deferPickerCommit !== false\`.

### Отличия от DateInput / TimeInput
- **DateInput** — только дата; **TimeInput** — только время.
- **DateTimeInput** — дата и время вместе; для диапазона — календарь диапазона + два блока выбора времени.

**\`prefix\`**, **\`suffix\`**, очистка, подсказки — как у других полей через **InputFieldShell**.

Полный список пропсов — **DateTimeInputProps** в \`types/ui.ts\`. Для диапазона можно использовать **DateTimeInputRange** (алиас с \`range: true\`).
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
Модальное окно (портал): **isOpen**, **onClose**, заголовок/описание/слоты, кнопки (**buttons**), размер, оверлей (**overlayVariant**, blur и т.д.), фокус-ловушка, анимации. **modalVariant** (\`danger\` / \`success\` / \`info\`) — цветная иконка статуса слева с подсветкой; заголовок нейтральный.

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

/** @see TabsProps, TabItemProps */
export const DOC_TABS = `
### Назначение
Единый компонент **Tabs**: вкладки с панелями (**TabItem** с **children**) и сегменты **без** панелей (**Tabs.Item** / **TabItem** без **children**). Список вкладок можно задать дочерними узлами или пропом **items** (непустой массив имеет приоритет). Дочерние сегменты автоматически попадают во внутренний трек (**TabItemGroupList**); отдельная обёртка списка не нужна. Атрибуты трека — проп **segmentTrackProps** на корне **Tabs**.

- **Варианты**: **TabsVariant.PILL** (скруглённый трек и «капля»); **TabsVariant.MINIMAL**, **TabsVariant.LINE**, **TabsVariant.UNDERLINE** — один тип текстового ряда со скользящей полоской **primary**, различие только в серой базовой линии **borderSecondary**: у **minimal** её нет, у **line** она на всю ширину/высоту трека, у **underline** — только под рядом триггеров (**fit-content**). Если **variant** не задан — **resolveTabsVariant** (горизонтально **pill**, вертикально **minimal**).
- **filledSegmentTriggers** (на корне **Tabs** / **TabItem.Group**): для **minimal** / **line** / **underline** включает «залитые» сегменты (**primary** на активном), фон трека **backgroundSecondary** и полоску индикатора **2px** (без пропа — **1px** и без заливки у текстовых вариантов).
- **Направление**: **TabsDirection**, вертикально — **TabsVerticalPosition**.

В режиме **pill** скругление сегментов — **BorderRadiusHandler(theme.borderRadius)**; оболочка трека — \`calc(radius + inset)\`; **overflow: hidden**; под активным сегментом анимированная «капля» (**PillSegmentThumb**). В текстовых вариантах активная отметка — скользящая полоска (**LineUnderlineTrackIndicator**) по нижнему (горизонталь) или правому (вертикаль) краю ряда триггеров.

### Миграция с прежнего API
| Раньше | Сейчас |
|--------|--------|
| **TabsVariant.UNDERLINE**, только текст и **primary**, без серой линии | **TabsVariant.MINIMAL** |
| Серая линия на весь трек (старое **underline** + базовая линия **FULL**) | **TabsVariant.LINE**, без **filledSegmentTriggers** |
| Серая линия под вкладками (**ITEMS**) | **TabsVariant.UNDERLINE** |
| Старый **TabsVariant.LINE** с заливкой сегментов и фоном трека | **TabsVariant.LINE** + **filledSegmentTriggers** |

Удалены пропы **underlineBaseline**, **underlineBaselineWidth** и перечисление **TabsUnderlineBaselineWidth**.

### Когда использовать
| Сценарий | Как собрать |
|----------|-------------|
| Крупные блоки страницы с контентом под каждым заголовком | **Tabs** + **TabItem** с **children** |
| Фильтр / режим без панели под пунктом | **Tabs** + **Tabs.Item** (или **TabItem** без **children**) |
| Группа склеенных кнопок (**attached**) | **ButtonGroup** |

### Пример: только сегменты
\`\`\`tsx
<Tabs defaultValue="details" onChange={setMode} ariaLabel="Раздел">
  <Tabs.Item value="overview" label="Обзор" />
  <Tabs.Item value="details" label="Детали" />
  <Tabs.Item value="attachments" label="Вложения" />
</Tabs>
\`\`\`

Из массива без ручного **map**: проп **items** (**TabsItemDefinition[]**) — при непустом массиве вкладки строятся внутри компонента (эквивалент **Tabs.Item** с теми же полями). Для только подписей без панелей достаточно **TabsSegmentOption** (подмножество полей).

\`\`\`tsx
const segmentItems: TabsItemDefinition[] = [
  { value: 'overview', label: 'Обзор' },
  { value: 'details', label: 'Детали' },
  { value: 'attachments', label: 'Вложения' },
];
<Tabs defaultValue="details" items={segmentItems} ariaLabel="Раздел" />
\`\`\`

Классический вариант с **map**: \`items.map((row) => <Tabs.Item key={row.value} {...row} />)\` — тип строки для коротких сегментов **TabsSegmentOption**.

### Пример: вкладки с панелями
\`\`\`tsx
<Tabs defaultActiveTab="a">
  <TabItem value="a" label="Раздел A"><PanelA /></TabItem>
  <TabItem value="b" label="Раздел B"><PanelB /></TabItem>
</Tabs>
\`\`\`

### Пропсы корня **Tabs**
| Проп | Описание |
|------|----------|
| \`children\` | **TabItem** / **Tabs.Item**, если **items** пуст или не задан. |
| \`items\` | Непустой **TabsItemDefinition[]** — вкладки из данных (приоритет над **children** для списка). |
| \`value\` | Контролируемый активный \`value\`. |
| \`defaultValue\` | Неконтролируемое начальное \`value\`. |
| \`defaultActiveTab\` | Алиас **defaultValue** (историческое имя). |
| \`onChange(activeTab)\` | Смена активного сегмента. |
| \`direction\` | **horizontal** | **vertical**. |
| \`tabsPosition\` | При вертикали — табы слева/справа от контента. |
| \`variant\` | **pill** | **minimal** | **line** | **underline**. |
| \`filledSegmentTriggers\` | У **minimal** / **line** / **underline**: заливка сегментов и фон трека (**filled**). |
| \`ariaLabel\` | **aria-label** группы (**role="group"** на корне). |
| \`segmentTrackProps\` | **className**, **style**, **data-*** для трека; к **className** добавляется **ui-tabs-list**. |

### **Tabs.Item** / **TabItem** (сегмент)
| Проп | Описание |
|------|----------|
| \`value\` | Идентификатор; в \`onChange\`. |
| \`label\` | Подпись (**ReactNode**). |
| \`children\` | Опционально: панель контента под вкладкой. |
| \`disabled\`, \`loading\`, \`skeleton\` | Неактивна; загрузка (**aria-busy**, спиннер); плейсхолдер без клика (**skeleton** имеет приоритет над отображением loading при одновременной передаче). |
| \`iconStart\`, \`iconEnd\` | Иконки на триггере. |
| \`badge\` | Счётчик/метка через компонент **Badge** (**DEFAULT**, **SM**). |

### Низкоуровневый трек
Для особых случаев можно вложить **TabItemGroupList** в **TabItem.Group** и задать свои стили; в типичном API **Tabs** трек создаётся сам.

### Доступность
- При \`ariaLabel\`: корень с \`role="group"\`.
- Сегменты: кнопки с \`aria-pressed\`; при **loading** — \`aria-busy\`.

### Контекст
**TabItemGroupContext** / **useTabItemGroupContext** — для расширений внутри группы.

### Storybook
**UI Kit/Navigation/Tabs**: вкладки с панелями — **MinimalHorizontal**, **LineHorizontal** (**filledSegmentTriggers**), **TextVariantLineGrayFull**, **TextVariantUnderlineGrayItems**, **WithItemsProp**, **WithItemsPropMinimalAndLoading**, **WithLoadingSkeletonDisabled**.

**UI Kit/Navigation/Tabs/Segments**: только переключатели — **SegmentHorizontalMinimal**, **SegmentHorizontalLine** (filled), **SegmentHorizontalUnderline**, **SegmentVerticalMinimal**, **SegmentVerticalLine** (filled), **SegmentVerticalUnderline**, **SegmentMatrixDirectionAndVariant** и др.
`.trim();

export const DOC_TAB_ITEM = `
### Назначение
Элемент вкладки или сегмента: триггер и опциональная панель (**value**, заголовок). Состояния: **disabled**, **loading** (спиннер, блокировка выбора, **aria-busy**), **skeleton** (плейсхолдер без интерактива). Ориентация текста (**TabItemTextOrientation**, **TabItemTextPosition**).

Внутри **Tabs** или **TabItem.Group**: панель через **children** у **TabItem**; только переключатель — **Tabs.Item** без **children**. Альтернатива — проп **items** на **Tabs** / **TabItem.Group** (**TabsItemDefinition[]**, непустой массив заменяет дочерний список вкладок). Трек списка создаётся внутри корня; для атрибутов трека — **segmentTrackProps**; для заливки сегментов в текстовых вариантах — **filledSegmentTriggers** на корне группы.

Вариант оформления (**TabsVariant**: **pill**, **minimal**, **line**, **underline**) и **filledSegmentTriggers** задаются на **Tabs** / **TabItem.Group** и попадают в контекст. У одиночного **TabItem** вне группы можно передать **variant** и **filledSegmentTriggers** для редких случаев (обычно используйте **Tabs**).
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

/** @see ActionBarProps и связанные */
export const DOC_ACTION_BAR = `
### Назначение
Горизонтальная **панель действий** с иконками: логические группы разделяются **ActionBar.Divider**, при нехватке ширины лишние кнопки автоматически уходят в **overflow-меню**.

Отличается от **FloatingMenu** (плавающая панель у края экрана / draggable) — **ActionBar** встраивается в layout (шапка таблицы, тулбар карточки, строка над контентом) и занимает **100% ширины** родителя.

Составной API: **ActionBar**, **ActionBar.Item**, **ActionBar.ItemWithTooltip**, **ActionBar.Divider**, **ActionBar.DropMenuItem**.

### Размеры (\`size\` / \`barSize\`)
| size | Высота кнопки |
|------|----------------|
| XL | 56px |
| LG | 48px |
| MD | 40px |
| SM | 32px |

Размер overflow-меню: **MD** для XL/LG, **SM** для MD/SM.

### ActionBar (корень)
| Проп | Зачем |
|------|--------|
| \`items\` | Порядок действий: \`{ itemId, withDivider? }[]\`. |
| \`renderActionBarItem\` | Рендер видимой кнопки по \`itemId\` (обычно **ActionBar.ItemWithTooltip**). |
| \`renderDropMenuItem\` | Рендер строки overflow-меню; опционально \`options.closeMenu\` — закрыть меню после действия. |
| \`itemIsDisabled\` | \`(itemId) => boolean\` — disabled для пунктов overflow-меню. |
| \`size\` | Размер кнопок панели (**ActionBarSize**, по умолчанию XL). |
| \`overflowMenuAriaLabel\` | Подпись кнопки «ещё» и меню (по умолчанию «Дополнительные действия»). |
| \`aria-label\` | **Обязательна** — подпись для \`role="toolbar"\`. |
| \`className\` | CSS-класс на корне. |

### ActionBar.Item / ActionBar.ItemWithTooltip
| Проп | Зачем |
|------|--------|
| \`barSize\` | Согласовать габариты с \`ActionBar.size\`. |
| \`icon\` | Иконка действия (**обязательна**). |
| \`aria-label\` | Доступное имя кнопки. |
| \`tooltipText\` | Текст подсказки (**ItemWithTooltip**, обязателен). |
| \`showTooltip\` | Показывать Tooltip (**ItemWithTooltip**, по умолчанию \`true\`). |
| \`variant\` | Вариант **IconButton** (по умолчанию **ghost**). |
| \`disabled\` / \`loading\` | Состояния кнопки. |
| \`onClick\` | Обработчик клика. |

### ActionBar.Divider
| Проп | Зачем |
|------|--------|
| \`barSize\` | Высота вертикальной линии (как у панели). |

Разделитель также добавляется автоматически, если у элемента \`items\` задан \`withDivider: true\`.

### ActionBar.DropMenuItem
| Проп | Зачем |
|------|--------|
| \`barSize\` | Размер иконки в строке меню. |
| \`children\` | Иконка + текст действия. |

### Overflow-поведение
- Ширина контейнера отслеживается через **ResizeObserver**.
- Если суммарная ширина кнопок больше доступной — резервируется место под кнопку overflow, лишние \`itemId\` переносятся в меню **в том же порядке**.
- Последняя видимая кнопка на панели остаётся последней и внутри меню.

### Пример
\`\`\`tsx
const items = [
  { itemId: 'search', withDivider: false },
  { itemId: 'edit', withDivider: false },
  { itemId: 'archive', withDivider: true },
  { itemId: 'delete', withDivider: false },
];

<ActionBar
  size={ActionBarSize.XL}
  aria-label="Действия над документом"
  items={items}
  renderActionBarItem={(itemId) => (
    <ActionBar.ItemWithTooltip
      barSize={ActionBarSize.XL}
      tooltipText={labels[itemId]}
      aria-label={labels[itemId]}
      icon={<Icon name={icons[itemId]} size={IconSize.SM} />}
      onClick={() => handleAction(itemId)}
    />
  )}
  renderDropMenuItem={(itemId, options) => (
    <ActionBar.DropMenuItem barSize={ActionBarSize.XL}>
      <Icon name={icons[itemId]} size={IconSize.SM} />
      {labels[itemId]}
    </ActionBar.DropMenuItem>
  )}
  itemIsDisabled={(itemId) => disabledIds.has(itemId)}
/>
\`\`\`
`.trim();

/** @see CarouselProps и связанные */
export const DOC_CAROUSEL = `
### Назначение
**Карусель** для показа слайдов с изображениями и подписями. Составной API: **Carousel**, **Carousel.Slide**, **Carousel.Image**, **Carousel.Caption**, **Carousel.Overlay**, **Carousel.OverlayPanel**, **Carousel.ParallaxLayer**.

Поддерживает три типа анимации (**slide**, **fade**, **scale**), стрелки, точки-индикаторы, **полосу миниатюр**, свайп, автопрокрутку с паузой, **glass-тему** и учёт **prefers-reduced-motion**.

### Carousel (корень)
| Проп | Зачем |
|------|--------|
| \`activeIndex\` | Активный слайд (контролируемый режим, с 0). |
| \`defaultActiveIndex\` | Начальный слайд без \`activeIndex\` (по умолчанию 0). |
| \`onActiveIndexChange\` | \`(activeIndex) => void\` — колбэк смены слайда (только индекс). |
| \`activeSlideId\` | Активный слайд по \`slideId\` (controlled, приоритет над \`activeIndex\`). |
| \`defaultSlideId\` | Начальный \`slideId\` без controlled-режима. |
| \`onActiveSlideIdChange\` | \`(activeSlideId) => void\` — колбэк смены \`slideId\`. |
| \`onSlideChange\` | \`(event: CarouselSlideChangeEvent) => void\` — current / previous / next с \`slideId\`, индексом, медиа. |
| \`onSlideClick\` | \`(event: CarouselSlideClickEvent) => void\` — клик по области слайда (не срабатывает после свайпа). |
| \`onThumbnailClick\` | \`(event: CarouselSlideClickEvent) => void\` — клик по миниатюре (превью); слайд также переключается. |
| \`onTitleClick\` | \`(event: CarouselSlideClickEvent) => void\` — клик по заголовку \`Carousel.Caption\`. |
| \`random\` | Случайный порядок отображения слайдов при монтировании (по умолчанию \`false\`). |
| \`randomSeed\` | Seed для детерминированного shuffle при \`random={true}\`. |
| \`loop\` | После последнего слайда — первый (и наоборот). |
| \`animation\` | **CarouselAnimation**: \`slide\`, \`fade\`, \`scale\`, \`coverflow\`, \`flip\`, \`stack\`, \`parallax\`. |
| \`parallax\` | Parallax-слои: фон медленнее, оверлеи быстрее (можно вместе с \`animation="slide"\`). |
| \`parallaxBackgroundRatio\` | Коэффициент фона по умолчанию (\`0.35\` — медленнее слайда). |
| \`parallaxForegroundRatio\` | Кoэффициент переднего плана (\`1.12\` — быстрее слайда). |
| \`animationDuration\` | Длительность перехода в мс (при reduced motion — 0). |
| \`navigation\` | **CarouselNavigation**: \`arrows\`, \`dots\`, \`both\`, \`thumbnails\`, \`none\`. |
| \`dotsPosition\` | **inner** — точки поверх слайда; **outer** — под областью. |
| \`thumbnails\` | Полоса миниатюр под основной областью (можно вместе со стрелками / точками). |
| \`thumbnailHeight\` | Высота миниатюры в px (по умолчанию 72). |
| \`showCaption\` | Показывать подписи \`Carousel.Caption\` (по умолчанию \`true\`). |
| \`fullscreen\` | Кнопка полноэкранного просмотра активного слайда (по умолчанию \`false\`). |
| \`fullscreenOpenAriaLabel\` | Подпись кнопки открытия (по умолчанию «Открыть слайд на весь экран»). |
| \`fullscreenCloseAriaLabel\` | Подпись кнопки закрытия (по умолчанию «Закрыть полноэкранный режим»). |
| \`onFullscreenChange\` | \`(isFullscreenOpen) => void\` — колбэк смены режима. |
| \`autoplay\` | Автоматическая смена слайдов. |
| \`autoplayInterval\` | Интервал в мс (по умолчанию 5000). |
| \`pauseOnHover\` | Пауза автопрокрутки при наведении. |
| \`pauseOnFocus\` | Пауза при фокусе внутри карусели. |
| \`swipeEnabled\` | Свайп / pointer drag для переключения (follow-позиция, snap, флик по скорости). |
| \`visibleSlidesRange\` | Радиус lazy-render вокруг активного слайда (по умолчанию \`1\`; \`undefined\` — все слайды). |
| \`preloadAdjacentSlides\` | Предзагрузка изображений соседних слайдов (по умолчанию \`true\`). |
| \`keyboardEnabled\` | Навигация ArrowLeft/Right, Home/End на корне (по умолчанию \`true\`). |
| \`previousSlideAriaLabel\` / \`nextSlideAriaLabel\` | Локализация aria-label стрелок. |
| \`dotsListAriaLabel\` / \`slideDotAriaLabel\` | Локализация точек-индикаторов. |
| \`autoplayPauseAriaLabel\` / \`autoplayPlayAriaLabel\` | Локализация кнопки автопрокрутки. |
| \`fullscreenOverlayAriaLabel\` / \`fullscreenCounterAriaLabel\` | Локализация полноэкранного режима. |
| \`orientation\` | **CarouselOrientation**: \`horizontal\` (по умолчанию) или \`vertical\`. |
| \`showProgressBar\` | Сегментированная полоска прогресса слайдов (по умолчанию \`false\`). |
| \`progressBarPosition\` | **CarouselProgressBarPosition**: \`inner\` — поверх слайдов; \`outer\` — под областью. |
| \`progressBarAriaLabel\` | aria-label полоски прогресса. |
| \`showAutoplayProgress\` | Линейный прогресс до следующего слайда при \`autoplay\` (по умолчанию \`false\`). |
| \`showAutoplayCountdown\` | Обратный отсчёт «N с» рядом с прогрессом autoplay (по умолчанию \`true\`). |
| \`autoplayProgressAriaLabel\` | aria-label линейного прогресса autoplay. |
| \`aspectRatio\` | CSS aspect-ratio (по умолчанию \`16 / 9\`; для vertical — \`9 / 16\`, если не задано иное). |
| \`height\` | Фиксированная высота вместо aspect-ratio. |
| \`size\` | Размер стрелок, точек и скругления (**Size**). |
| \`items\` | **CarouselItemDefinition[]** — слайды из данных; при непустом массиве **children** для списка слайдов не используется. |
| \`aria-label\` | **Обязательна** — подпись \`section\` / carousel region. |
| \`className\` | CSS-класс на корне. |

### CarouselItemDefinition (проп \`items\`)
| Поле | Зачем |
|------|--------|
| \`slideId\` | Id для \`onSlideChange\`, \`activeSlideId\`, колбэков клика. |
| \`slideLabel\` | Часть \`aria-label\` слайда. |
| \`thumbnailSrc\` | URL миниатюры для полосы навигации. |
| \`imageSrc\` / \`imageAlt\` | Автоматический **Carousel.Image** (если нет \`children\`). |
| \`objectFit\`, \`loading\`, \`imageThumbnailSrc\`, \`parallax\` | Пропсы автоматического изображения. |
| \`caption\` | Текст **Carousel.Caption** под изображением. |
| \`children\` | Произвольный контент слайда (приоритет над \`imageSrc\` / \`caption\`). |
| \`className\` | CSS-класс **Carousel.Slide**. |

### Carousel.Slide
| Проп | Зачем |
|------|--------|
| \`slideId\` | Пользовательский id слайда для \`onSlideChange\` / \`onSlideClick\`. |
| \`slideLabel\` | Пользовательская часть \`aria-label\` («Слайд N из M» добавляется автоматически). |
| \`thumbnailSrc\` | URL миниатюры (перекрывает \`thumbnailSrc\` / \`src\` из **Carousel.Image**). |
| \`children\` | **Carousel.Image**, **Carousel.Caption**, **Carousel.Overlay**, **Carousel.OverlayPanel** или произвольный контент. |

### Carousel.Overlay
| Проп | Зачем |
|------|--------|
| \`placement\` | **CarouselSlideOverlayPlacement**: \`top\`, \`bottom\` — горизонтальная полоса; \`left\`, \`right\` — вертикальная. |
| \`align\` | **CarouselSlideOverlayAlign**: \`start\`, \`center\`, \`end\` — выравнивание внутри зоны. |
| \`children\` | React-узел или \`(slide: CarouselSlideInfo) => ReactNode\` — получает id, индекс, caption и др. |

- Несколько оверлеев с одинаковыми \`placement\` + \`align\` группируются в одной зоне.
- Оверлеи не блокируют клик по слайду (кроме интерактивных элементов внутри).
- z-index выше контентной панели — кнопки в углах остаются поверх текста.
- \`parallax\` — \`true\`, \`false\` или коэффициент \`0…2\` для отдельного слоя.

### Carousel.OverlayPanel
Контентная панель поверх изображения: заголовок, описание, кнопки и любые React-элементы.

| Проп | Зачем |
|------|--------|
| \`placement\` | **CarouselSlideOverlayPanelPlacement**: \`top\`, \`center\`, \`bottom\` (по умолчанию), \`stretch\` — на весь слайд. |
| \`align\` | **CarouselSlideOverlayAlign**: \`start\`, \`center\`, \`end\`. |
| \`gradient\` | **CarouselSlideOverlayPanelGradient**: \`none\`, \`top\`, \`bottom\` (дефолт для bottom/center), \`full\`. |
| \`parallax\` | Parallax переднего плана: \`true\`, \`false\` или коэффициент. |
| \`children\` | React-узел или render prop \`(slide: CarouselSlideInfo) => ReactNode\`. |

- **Carousel.OverlayPanel.Title** — заголовок панели.
- **Carousel.OverlayPanel.Text** — текст абзаца с ограничением ширины для читаемости.
- Панель рендерится под зонами **Carousel.Overlay** — удобно совмещать текст снизу и кнопку в углу.

### Carousel.ParallaxLayer
Универсальная parallax-обёртка для произвольного содержимого слайда.

| Проп | Зачем |
|------|--------|
| \`layer\` | Пресет: \`background\`, \`content\`, \`overlayPanel\`, \`overlay\`. |
| \`parallax\` | \`true\`, \`false\` или коэффициент \`0…2\`. |

### Carousel.Image
| Проп | Зачем |
|------|--------|
| \`src\` | URL изображения (**обязателен**). |
| \`alt\` | Текстовая альтернатива (**обязательна** для a11y). |
| \`objectFit\` | \`cover\` (по умолчанию), \`contain\`, \`fill\`, \`none\`. |
| \`loading\` | \`lazy\` / \`eager\`. |
| \`thumbnailSrc\` | Отдельный URL для полосы миниатюр (если отличается от \`src\`). |
| \`parallax\` | Parallax фона: \`true\`, \`false\` или коэффициент. |

### Carousel.Caption
Подпись под изображением внутри слайда (\`children\` — текст).

### Миниатюры
- Включите \`thumbnails={true}\` или \`navigation={CarouselNavigation.THUMBNAILS}\`.
- Источник: \`slide.thumbnailSrc\` → \`image.thumbnailSrc\` → \`image.src\`.
- Активная миниатюра подсвечивается рамкой **primary** и прокручивается в центр полосы.
- Можно сочетать с \`navigation="both"\` — стрелки, точки и миниатюры одновременно.

### Glass-тема (glassLight / glassDark)
В glass-палитре стрелки, точки, подпись и полоса миниатюр получают лёгкую полупрозрачность и **backdrop-filter** (как pagination / accordion): фон контролов \`rgba(255,255,255,0.38)\` на светлой теме, \`0.10\` на тёмной; оболочка — **borderTertiary**. Переключите тему Storybook на **glassLight** / **glassDark**.

### Доступность
- Корень: \`section\`, \`aria-roledescription="carousel"\`, обязательный \`aria-label\`, \`tabIndex={0}\`, клавиатура ArrowLeft/Right (horizontal) или ArrowUp/Down (vertical), Home/End.
- Слайды: семантика \`figure\` + \`figcaption\` для подписи; обёртка \`role="group"\`, \`aria-roledescription="slide"\`, \`aria-hidden\` на неактивных.
- Стрелки и точки с настраиваемыми \`aria-label\` (пропсы локализации).
- Миниатюры: \`nav\` с подписью, кнопки с \`aria-current\` на активном слайде.
- Полноэкранный режим: портал в \`window.top.document.body\` (в Storybook Docs — на весь экран браузера), \`StyleSheetManager\` для styled-components, оверлей из \`theme.modals.overlay\`, плавное появление/закрытие, \`role="dialog"\`, focus trap, начальный фокус на кнопке закрытия, Escape, стрелки клавиатуры, блокировка прокрутки страницы; поддержка произвольного контента слайда без изображения.
- При автопрокрутке: \`aria-live="polite"\`; кнопка паузы/воспроизведения с иконками; опциональная полоска прогресса с анимацией текущего сегмента.
- **prefers-reduced-motion**: анимации отключаются или сокращаются.

### Свайп и drag (Swiper-like)
- Для анимации **slide** лента следует за пальцем/мышью в реальном времени.
- При отпускании: snap к ближайшему слайду при смещении **≥ 20%** viewport или быстром флике.
- Без **loop** на краях — резиновое сопротивление (rubber band).
- Во время drag: \`touch-action: none\`, курсор \`grab\` / \`grabbing\`.
- Fade / scale: улучшенное определение жеста по скорости и порогу без follow-анимации ленты.

### Вертикальная карусель
- \`orientation={CarouselOrientation.VERTICAL}\` — лента с \`translateY\`, свайп по вертикали, стрелки вверх/вниз.
- По умолчанию aspect-ratio \`9 / 16\`, если не задан \`height\` и не переопределён \`aspectRatio\`.
- Fade / scale работают так же, как в горизонтальном режиме.

### Полоска прогресса
- \`showProgressBar={true}\` — сегменты по числу слайдов; пройденные заполнены, текущий анимируется при autoplay.
- \`progressBarPosition="inner"\` — поверх верхней части слайдов; \`outer\` — под основной областью.

### Прогресс autoplay
- \`showAutoplayProgress={true}\` — линейная полоска заполнения до следующего слайда за \`autoplayInterval\`.
- \`showAutoplayCountdown\` — подпись «N с» до автопереключения; пауза при \`pauseOnHover\` / \`pauseOnFocus\` замораживает таймер.
- Расположение синхронизировано с \`progressBarPosition\` (\`inner\` — поверх слайдов снизу, \`outer\` — под областью).

### Coverflow, Flip и Stack
- \`coverflow\` — 3D-перспектива, поворот и глубина боковых слайдов (как в Swiper Coverflow).
- \`flip\` — 3D-переворот карточек при смене активного слайда.
- \`stack\` — перелистывание «стопкой»: активный слайд уезжает в сторону и уходит **под** следующий (как hero-слайдер на [bruno-pizza.ru](https://krasnodar.bruno-pizza.ru/)). Следующие слайды лежат сзади с лёгким уменьшением scale.

### Parallax
- \`animation="parallax"\` или \`parallax={true}\` — слои слайда движутся с разной скоростью при drag, стрелках и autoplay.
- **Carousel.Image** — фон (\`parallaxBackgroundRatio\`, по умолчанию \`0.35\`) медленнее ленты; лёгкий scale компенсирует края.
- **Carousel.OverlayPanel** / **Carousel.Overlay** — передний план быстрее (\`parallaxForegroundRatio\`, по умолчанию \`1.12\`).
- **Carousel.ParallaxLayer** — обёртка для произвольного контента с пресетом \`layer\`.
- На каждом слое: \`parallax={0.5}\` или \`parallax={false}\` для точной настройки.
- При \`prefers-reduced-motion\` parallax отключается.
- Для vertical автоматически используется ось \`rotateX\`.

### CarouselSlideInfo
| Поле | Зачем |
|------|--------|
| \`slideIndex\` | Индекс с 0. |
| \`slideId\` | Id из \`Carousel.Slide\`. |
| \`slideLabel\` | Пользовательская подпись слайда. |
| \`imageSrc\` / \`imageAlt\` | Данные из **Carousel.Image**. |
| \`caption\` | Текст **Carousel.Caption**. |
| \`thumbnailSrc\` | URL миниатюры. |

### Случайный порядок
- \`random={true}\` перемешивает слайды алгоритмом Fisher–Yates при монтировании и при изменении набора (\`slideId\` / \`key\`).
- \`randomSeed\` задаёт детерминированный порядок для тестов и SSR.
- Порядок стабилен до смены пропа \`random\`, \`randomSeed\` или состава слайдов; навигация и \`activeIndex\` / \`activeSlideId\` работают в перемешанной последовательности.
- Миниатюры, точки и колбэки \`onSlideChange\` / \`onSlideClick\` используют тот же порядок.

### События слайдов
- **onSlideChange** — при смене активного слайда и при монтировании: \`activeIndex\`, \`current\`, \`previous\`, \`next\` (\`CarouselSlideInfo | null\` на границах без \`loop\`).
- **onSlideClick** — клик по области слайда: \`slide\` + \`nativeEvent\`. Клики по стрелкам, точкам, заголовку и другим контролам игнорируются.
- **onThumbnailClick** — клик по миниатюре (превью): те же данные; параллельно выполняется переключение на выбранный слайд.
- **onTitleClick** — клик по тексту **Carousel.Caption** (заголовок слайда); не дублирует \`onSlideClick\`.

### Пример
\`\`\`tsx
const promoItems: CarouselItemDefinition[] = [
  {
    slideId: 'combo',
    slideLabel: 'Комбо недели',
    imageSrc: '/banners/combo.jpg',
    imageAlt: 'Комбо недели',
    caption: '2 пиццы + напиток',
  },
  {
    slideId: 'custom',
    slideLabel: 'Кастомный слайд',
    children: (
      <>
        <Carousel.Image src="/banners/sale.jpg" alt="Акция" />
        <Carousel.OverlayPanel>
          <Carousel.OverlayPanel.Title>−20%</Carousel.OverlayPanel.Title>
        </Carousel.OverlayPanel>
      </>
    ),
  },
];

<Carousel items={promoItems} loop navigation={CarouselNavigation.BOTH} aria-label="Акции" />

// или декларативно:
<Carousel
  loop
  onSlideChange={({ activeIndex, current, previous, next }) => {
    console.log(activeIndex, current.slideId, previous?.slideId, next?.slideId);
  }}
  onSlideClick={({ slide }) => {
    console.log('slide', slide.slideId, slide.slideIndex);
  }}
  onThumbnailClick={({ slide }) => {
    console.log('thumbnail', slide.slideId, slide.slideIndex);
  }}
  onTitleClick={({ slide }) => {
    console.log('title', slide.slideId, slide.caption);
  }}
  aria-label="Галерея проекта"
>
  <Carousel.Slide slideId="facade" slideLabel="Фасад здания">
    <Carousel.Image src="/photos/facade.jpg" alt="Фасад здания днём" />
    <Carousel.OverlayPanel placement={CarouselSlideOverlayPanelPlacement.BOTTOM}>
      <Carousel.OverlayPanel.Title>Фасад</Carousel.OverlayPanel.Title>
      <Carousel.OverlayPanel.Text>Главный вход здания</Carousel.OverlayPanel.Text>
    </Carousel.OverlayPanel>
    <Carousel.Overlay placement={CarouselSlideOverlayPlacement.TOP} align={CarouselSlideOverlayAlign.END}>
      {(slide) => <button type="button">Открыть {slide.slideId}</button>}
    </Carousel.Overlay>
    <Carousel.Caption>Фасад</Carousel.Caption>
  </Carousel.Slide>
  <Carousel.Slide slideId="lobby" slideLabel="Интерьер холла">
    <Carousel.Image src="/photos/lobby.jpg" alt="Холл с высокими потолками" />
    <Carousel.Caption>Холл</Carousel.Caption>
  </Carousel.Slide>
</Carousel>
\`\`\`
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
Секции с раскрывающимся содержимым: заголовок, опциональный подзаголовок, анимация открытия. Составной API — **Accordion** + **Accordion.Item** + **Accordion.Trigger** + **Accordion.Content**.

Стили (цвета, шрифты, радиусы, разделители) берутся из **theme.accordions**.

### Корневой Accordion
| Проп | Зачем |
|------|--------|
| \`defaultOpen\` | Открыть секцию по умолчанию (id \`default\`, если у Item не задан \`value\`). |
| \`allowMultiple\` | Разрешить одновременно несколько открытых секций. |
| \`autoClose\` | При открытии новой секции закрывать остальные (приоритет выше \`allowMultiple\`). |
| \`onChange\` | \`(isOpen: boolean) => void\` — колбэк переключения активной секции. |
| \`firstItemBorderRadius\` | Скругление **верхних** углов у **первого** \`Accordion.Item\` (по умолчанию \`true\`). При \`false\` — ровный верх (удобно при встраивании в карточку или панель). |
| \`lastItemBorderRadius\` | Скругление **нижних** углов у **последнего** \`Accordion.Item\` (по умолчанию \`true\`). При \`false\` — ровный низ. |

Пропсы скругления независимы: можно убрать только верх, только низ или оба.

### Accordion.Item
| Проп | Зачем |
|------|--------|
| \`value\` | Уникальный id секции (для состояния открытия). |
| \`position\` | \`start\` \| \`center\` \| \`last\` — радиусы и разделители между элементами группы. |

### Accordion.Trigger
| Проп | Зачем |
|------|--------|
| \`title\` | Основной заголовок. |
| \`subtitle\` | Подзаголовок под title. |
| \`align\` | \`left\` \| \`center\` \| \`right\` — выравнивание заголовка. |

### Accordion.Content
| Проп | Зачем |
|------|--------|
| \`align\` | Выравнивание текста содержимого. |

### Glass-тема (glassLight / glassDark)
В glass-палитре аккордеон получает лёгкую полупрозрачность и **backdrop-filter** (как pagination): фон \`rgba(255,255,255,0.26)\` на светлой теме, \`0.06\` на тёмной; разделители — **theme.colors.borderSecondary**. Переключите глобальную тему Storybook на **glassLight** или **glassDark**, либо оберните в **ThemeProvider** с \`glassLightTheme\` / \`glassDarkTheme\`.

### Пример
\`\`\`tsx
<Accordion autoClose firstItemBorderRadius={false} lastItemBorderRadius={false}>
  <Accordion.Item value="general" position="start">
    <Accordion.Trigger title="Общие" subtitle="Кратко" />
    <Accordion.Content>Текст секции.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="details" position="last">
    <Accordion.Trigger title="Подробности" />
    <Accordion.Content>Ещё текст.</Accordion.Content>
  </Accordion.Item>
</Accordion>
\`\`\`
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

**appearance** light | dark; скругления завязаны на **theme.borderRadius**. Для прогресса внутри формы см. **Progress** (\`variant="stepper"\`).
`.trim();

/** @see CalendarProps */
export const DOC_CALENDAR = `
### Назначение
Календарь: сетка 7×6, **weekStartsOn**, выбор дня, стрелки месяца, выпадающие месяц/год на базе **Dropdown**.

**showDateRollers** — роллеры день/месяц/год; **monthYearLayout="split"** — отдельные триггеры месяца и года.

Режимы выбора — **CalendarProps** (\`selectionMode\`: \`single\` / \`range\`).

### Черновик пикера (standalone)

| Проп | Описание |
|------|----------|
| **\`onPickerChange\`** | Колбэк черновика до \`onChange\` / \`onRangeChange\`. |
| **\`modifyPickerValue\`** | Модификатор черновика. |
| **\`deferPickerCommit\`** | Коммит только по «OK» / «Применить» в футере (появляется автоматически). |
| **\`onRangeChange\`** | Коммит диапазона (\`selectionMode="range"\`). |

**Не активируется при \`onSelectDate\`** — в **DateInput** / **DateTimeInput** черновик обрабатывается на уровне поля.

### Где черновик уже есть (дублировать не нужно)

- **DateInput**, **TimeInput**, **DateTimeInput** — полный API + попап поля.
- **DateRollerPicker**, **TimePickerColumns** — низкоуровневые блоки внутри Calendar / Input.
`.trim();

/** @see SpinnerProps */
export const DOC_SPINNER = `
### Назначение
Индикатор загрузки: вариант анимации (**SpinnerVariant**), размер, **aria-label** для доступности.
`.trim();

/** @see SkeletonProps */
export const DOC_SKELETON = `
### Назначение
Плейсхолдер загрузки: **SkeletonVariant** (text, avatar, button, custom), форма (**shape** rect | circle), **count** и **gap** для списка, направление группы (**SkeletonGroupDirection**), скорость анимации, **aria-label**.

**borderRadius** и размеры задаются числом (px) или CSS-строкой.
`.trim();

/** @see DividerProps */
export const DOC_DIVIDER = `
### Назначение
Разделитель: **orientation** horizontal | vertical, отступы, цвет из темы.
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
Группа опций: массив значений (**RadioButtonGroupOption**), **orientation** horizontal | vertical, **value** / **onChange**, **disabled**, **readOnly**, **size**, ошибка (**error**), те же визуальные варианты, что у одиночной **RadioButton**.
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
**error** | **success** | **warning** — цвет активной полосы и обводка трека. Приоритет: **error** → **success** → **status** (\`resolveSliderAccentKind\`). **disabled** — прежнее затемнение.

### Скелетон
**\`skeleton\`** — шиммер вместо трека; **aria-busy** на контейнере; у range поля «От/До» скрыты.

Акцент по умолчанию: **theme.colors.info** / **infoHover**.

Для числового поля с той же шкалой в оболочке **Input** см. **SliderInput** (\`DOC_SLIDER_INPUT\`).
`.trim();

/** @see SliderInputProps, SliderInputSingleProps, SliderInputRangeProps */
export const DOC_SLIDER_INPUT = `
## SliderInput

Числовое поле в оболочке **Input** со встроенным слайдером у нижней кромки рамки (один **Slider** или пара **RangeSlider**). Поведение и визуал согласованы с [Admiral SliderInputField](https://admiralds.github.io/react-ui/?path=/docs/admiral-2-1-form-field-sliderinputfield--docs).

### Режим \`range\`
| \`range\` | Значение | \`onChange\` | UI |
|---------|----------|--------------|-----|
| \`false\` (по умолчанию) | \`number\` | \`(value: number) => void\` | одно поле числа + один бегунок |
| \`true\` | \`readonly [number, number]\` | \`(pair) => void\` | поля «От» / «До», два бегунка, разделитель «—» по центру |

Переключение режима — только проп **\`range\`** (как у **DateInput** с диапазоном дат). Тип пропсов — дискриминированный union в \`types/ui.ts\`.

### Шкала и слайдер
| Проп | Зачем |
|------|--------|
| \`min\`, \`max\`, \`step\` | Границы и шаг (по умолчанию 0 / 100 / 1). |
| \`showScaleLabels\` | Подписи min и max **под рамкой** поля (\`formatMinLabel\`, \`formatMaxLabel\`). |
| \`showValueLabel\` | Подпись под бегунком, если **\`showNumberField={false}\`**. |
| \`sliderSize\` | Размер трека и бегунка; по умолчанию совпадает с **\`size\`** поля. |
| \`trackRailHeightPx\`, \`trackActiveHeightPx\` | Явная толщина серой и активной линии. |
| \`formatValue\` | Формат числа в подписях и полях (как у **Slider**). |

### Числовые поля
| Проп | Зачем |
|------|--------|
| \`showNumberField\` | Показать поле(я) ввода (по умолчанию \`true\`). |
| \`numberPlaceholder\` | Плейсхолдер одиночного поля. |
| \`numberFromPlaceholder\`, \`numberToPlaceholder\` | Плейсхолдеры в range (по умолчанию «От …» / «До …»). |
| \`rangeFromLabel\`, \`rangeToLabel\` | Подписи «От:» / «До:» перед полями в range. |
| \`numberFieldWidth\` | Ширина колонки числа (одиночный) или минимальная ширина каждого поля в range. |
| \`maxLength\` | Ограничение длины строки в поле числа + счётчик (как у **Input**). |

### Формы
- Одиночный режим: скрытый **\`name\`** с текущим значением.
- Range: **\`nameFrom\`**, **\`nameTo\`** для отправки пары в форме.

### Состояния (наследуются от Input)
**\`label\`**, **\`helperText\`**, **\`extraText\`**, **\`additionalLabel\`**, **\`error\`**, **\`success\`**, **\`status\`** (\`error\` | \`success\` | \`warning\`), **\`disabled\`**, **\`readOnly\`**, **\`required\`**, **\`skeleton\`**, **\`isLoading\`**, **\`displayClearIcon\`**, иконки, тултип/hint, **\`variant\`** (\`default\` | \`clear\`).

Очистка (**\`displayClearIcon\`**) сбрасывает значение к **\`min\`** (одиночный) или к \`[min, min]\` (range).

### Связанные компоненты
- **Slider** / **RangeSlider** — слайдер без оболочки Input.
- **DateInput** (\`range\`) — тот же паттерн «одно значение / пара», другой тип данных.

### Документация
- Сайт: \`documentation/content/docs/ru/web/v_0.2.4/components-slider-input.mdx\`
- Storybook: **UI Kit → Inputs → SliderInput** (истории по режимам и состояниям)
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
Адаптивный **CSS Grid**: **GridMode** (fullscreen | container), колонки и строки по breakpoints (**GridBreakpoint**), зазоры, вложенность областей.
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
Переключатель **светлой / тёмной палитры** (\`setColorScheme\`). Сохраняет текущий **ThemeVariant** (standard, glass).

Пара **ThemeVariantSelector** + **ThemeToggle** — основной способ переключения встроенных тем. Для каталога из 3+ кастомных id используйте **ThemeSelector** или \`setThemeMode\`.

См. [Theming](/docs/web/v_0.2.4/theming).
`.trim();

/** ThemeVariantSelector — ThemeVariantSelectorProps */
export const DOC_THEME_VARIANT_SELECTOR = `
### Назначение
Переключатель **варианта оформления** (\`setThemeVariant\`): стандартная / стеклянная. Сохраняет текущую палитру (light / dark).

Комбинируйте с **ThemeToggle** для полного управления темой. Скрывается, если в каталоге доступен только один вариант.

См. сторис **UI Kit/Theming/ThemeVariantSelector** и [Theming](/docs/web/v_0.2.4/theming).
`.trim();

/** ThemeSelector — ThemeSelectorProps */
export const DOC_THEME_SELECTOR = `
### Назначение
Выпадающий список тем из каталога **ThemeProvider** (\`defineThemeCatalog\`).

Работает с любым числом тем. Переключение: \`setThemeMode(appThemes.themeMode.ocean)\` — type-safe id.

См. сторис **UI Kit/Theming/ThemeSelector** и [Theming](/docs/web/v_0.2.4/theming).
`.trim();

/** @see SidemenuProps */
export const DOC_SIDEMENU = `
### Назначение
**Sidemenu** — боковая панель навигации на базе **NavigationMenu**: пункты, шапка (лого / **logoSlot**), нижний слот **footer**, компактный и развёрнутый режимы, интеграция в layout приложения.

Скругление плавающей «карточки» берётся из **theme.cards.sizes** (как у **Card** MD), тень — **BoxShadowHandler**.

---

### Режимы раскладки

| Режим | Проп | Поведение |
|------|------|-----------|
| Плавающая карточка | по умолчанию | \`position: fixed\` у края экрана; **verticalAlignment** двигает **всю** колонну |
| У края экрана | **edgeAttached** | Колонна **100vh**, без скругления и тени; граница с одной стороны; **verticalAlignment** выравнивает **блок пунктов** между шапкой и **footer** |
| За краем (hover) | **offScreenHoverReveal** | Полоса у края; панель выезжает / уезжает за экран; **horizontalPlacement** / **verticalAlignment** как у fixed-режима |

---

### Позиционирование

| Проп | Значения | По умолчанию |
|------|----------|--------------|
| **horizontalPlacement** | \`left\` / \`right\` | \`left\` |
| **verticalAlignment** | \`top\` / \`center\` / \`bottom\` | \`top\` |

**6 комбинаций** (left/right × top/center/bottom):

- **Без edgeAttached** — позиция всей панели у соответствующего края и вертикали viewport.
- **С edgeAttached** — колонна на всю высоту; **verticalAlignment** задаёт **justify-content** для среднего блока навигации (шапка и **footer** фиксированы у верха/низа колонны).
- **С offScreenHoverReveal** — полоса и выезд панели у выбранного края; направление скрытия зеркалится для \`right\`.

Сторис-матрицы: **«Матрица: плавающая панель (все варианты)»**, **«Матрица: у края экрана (все варианты)»**, **«Матрица: off-screen (все варианты)»**.

---

### Раскрытие панели (ширина и подписи)

| Проп | Описание |
|------|----------|
| **variant** | \`expanded\` / \`collapsed\` — статический вид, если **expandInteraction** = \`none\` |
| **expandInteraction** | \`click\` / \`hover\` — по области; \`toggleButton\` — только кнопка в шапке |
| **expanded** / **defaultExpanded** | Контролируемый / начальный режим |
| **expandCompactWidth** / **expandExpandedWidth** | Ширина свёрнутой / развёрнутой панели (px), по умолчанию 100 / 310 |
| **expandToggleRender** | Кастомная кнопка: \`isExpanded\`, \`toggleExpanded\` |
| **showExpandToggleButton** | Встроенная кнопка дополнительно к click/hover |
| **onExpand** / **onCollapse** / **onExpandedChange** | Колбэки смены состояния |
| **onExpandToggleClick** | До смены; \`preventDefault()\` отменяет переключение |

---

### Off-screen (скрытие за краем)

| Проп | Описание |
|------|----------|
| **offScreenHoverReveal** | Включить режим |
| **offScreenEdgeWidth** | Ширина hover-полосы у края (px) |
| **offScreenRevealed** / **defaultOffScreenRevealed** | Контролируемая / начальная видимость |
| **onOffScreenRevealedChange** | Запрос смены видимости |
| **onOffScreenShow** / **onOffScreenHide** | После появления / скрытия |
| **offScreenZIndex** | z-index слоя (по умолчанию 1030) |
| **offScreenHideDelayMs** | Задержка скрытия после mouseleave (мс, по умолчанию 1500) |

---

### Слоты и пункты

| Проп | Описание |
|------|----------|
| **items** | \`SidemenuItem[]\` — те же вложенность, tooltip, hint, popover, что у **NavigationMenu.Item** |
| **logo** | \`{ icon?, title? }\` в шапке |
| **logoSlot** | Произвольный ReactNode вместо **logo** (приоритет) |
| **footer** | Нижний слот; перед ним разделитель; **data-prevent-navigation-expand-toggle** |
| **slotStyles** | \`header\` / \`body\` / \`footer\` — height, flex, overflow и т.д. |
| **onItemClick** | Колбэк клика по пункту (до \`item.onClick\`) |

---

### Layout приложения с edgeAttached

\`\`\`tsx
<div style={{ display: 'flex', minHeight: '100vh' }}>
  <Sidemenu edgeAttached items={items} horizontalPlacement="left" />
  <main>...</main>
</div>
\`\`\`

Для **horizontalPlacement="right"** разместите **Sidemenu** после **main** в flex-ряду.

---

### Карта сторис

| Группа | Сторис |
|--------|--------|
| Базовые | Expanded, Collapsed, WithNotifications, WithoutLogo |
| Позиционирование | Плавающая панель: позиционирование; У края экрана; У края: выравнивание пунктов; **3 матрицы «все варианты»** |
| Раскрытие | Expand on hover/click, Toggle button, Custom toggle |
| Off-screen | OffScreenHoverReveal (+ collapsed, + expand) |
| Меню | Вложенность, tooltip/hint/popover, статусы, skeleton |
| Слоты | logoSlot, footer, header+footer, slotStyles |
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
