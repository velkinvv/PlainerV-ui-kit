/**
 * Тексты для Storybook «Docs»: примитивы таблицы и DataGrid.
 * Дублируют назначение пропсов из `types/ui.ts`, но с акцентом на использование в коде.
 */

/** Описание раздела UI Kit / Table (примитивы + композиция). */
export const TABLE_KIT_DOC = `
### Назначение

Набор примитивов для семантической таблицы: обёртка-карточка, секции \`thead\` / \`tbody\` / \`tfoot\`, строки, ячейки, сортировка в шапке и пагинация под таблицей.

### TableContainer

Обёртка карточки: скругление из темы (\`theme.cards.sizes[MD].borderRadius\`, как у **Card**; запасной вариант — \`BorderRadiusHandler(theme.borderRadius)\`), фон, обводка и опциональная тень. Горизонтальный скролл **не** встроен в корень — иначе у встроенной пагинации обрезаются тени у кнопок.

| Проп | Тип | Зачем |
|------|-----|--------|
| \`elevated\` | \`boolean\` | \`true\` (по умолчанию) — тень как у карточки и небольшой вертикальный \`margin\`, чтобы тень не обрезалась у overflow-родителей (например Canvas Docs); \`false\` — без тени и без доп. отступа. |
| \`component\` | элемент | Корневой тег (по умолчанию \`div\`). |
| \`className\`, \`style\` | — | Внешний вид контейнера. |

### TableContainerScroll

Обёртка из двух слоёв: внешний — скругления как у карточки и \`overflow: visible\` (чтобы \`position: sticky\` у шапки не ломался), внутренний — трек: \`overflow-x: auto\`, по вертикали по умолчанию \`overflow-y: clip\` (чтобы трек не становился вертикальным scroll-контейнером и не «крал» липкость у внешнего скролла). Для липкой шапки с ограниченной высотой передайте \`scrollAreaMaxHeight\` — вертикальный скролл будет внутри трека. \`<TablePagination />\` держите **снаружи** \`TableContainerScroll\` (но внутри \`TableContainer\`), чтобы не клипались тени кнопок страниц.

**Как использовать:** \`TableContainer\` → \`TableContainerScroll\` → \`Table\`; при встроенной пагинации — сестра \`TablePagination\` с \`embeddedInTableCard\` и проп \`embeddedPaginationBelow\` у \`TableContainerScroll\` (скругление только сверху у сетки). Без футера проп не передавайте — скругление углов со всех сторон, как у цельной карточки.

**Внешний вид:** у контейнера тонкая обводка (\`border\` темы), чтобы таблица не сливалась с белым фоном страницы. Шапка (\`thead\`) визуально отделена от тела: свой фон и нижняя граница (не путать с первой строкой «зебры»).

### Table

Корневая \`<table>\`; задаёт контекст размера ячеек и зебры для дочерних строк.

| Проп | Тип | Зачем |
|------|-----|--------|
| \`stickyHeader\` | \`boolean\` | Липкая шапка: \`thead th\` с \`position: sticky\`. Вертикальная прокрутка с фиксированной высотой: проп \`scrollAreaMaxHeight\` у \`TableContainerScroll\` (один scroll-контейнер вместе с таблицей) или внешний предок со скроллом **без** «двойного» трека \`overflow-x: auto\` + \`overflow-y: auto\` на той же ветке. |
| \`size\` | \`'sm' | 'md'\` | Плотность отступов ячеек (\`md\` по умолчанию). |
| \`striped\` | \`boolean\` | По умолчанию **\`false\`**: фон строк \`tbody\` как у карточки, без чередования. **\`true\`** — зебра (см. сторис **PlainBody** без пропа и **Basic** с \`striped\`). |
| \`columnDividers\` | \`boolean\` | Тонкая вертикальная линия между колонками (\`border-inline-end\` у всех ячеек строки, кроме последней). По умолчанию \`true\`; \`false\` — без разделителей. |
| \`aria-label\` | строка | Доступность: краткое название таблицы для скринридеров. |
| \`style\` | — | На \`<table>\` можно задать CSS-переменную \`--plainer-table-header-background\` для фона шапки (\`thead\`, липкие \`th\`). В \`DataGrid\` это задаётся через \`tableHeaderVariant\` / \`tableHeaderBackground\`. |

Остальные атрибуты HTML-таблицы (\`role\`, \`id\`, …) пробрасываются на \`<table>\`.

### TableHead, TableBody, TableFooter

Секции \`<thead>\`, \`<tbody>\`, \`<tfoot>\`. В \`tfoot\` обычно кладут «Загрузить ещё» или итоги.

### TableRow

| Проп | Тип | Зачем |
|------|-----|--------|
| \`selected\` | \`boolean\` | Подсветка выбранной строки. |
| \`hover\` | \`boolean\` | Подсветка при наведении; для строк \`tbody\` по умолчанию \`true\`. |
| \`disabled\` | \`boolean\` | Визуально «неактивная» строка (пониженная непрозрачность). |
| \`dragging\` | \`boolean\` | Строка — источник HTML5 drag-and-drop (стили перетаскивания). |

### TableCell

| Проп | Тип | Зачем |
|------|-----|--------|
| \`variant\` | \`'head' | 'body' | 'footer'\` | Влияет на тег по умолчанию: шапка → \`th\`, иначе \`td\`. |
| \`component\` | React-компонент | Явный тег ячейки (\`th\` / \`td\`). |
| \`align\` | \`'left' | 'right' | 'center' | …\` | Горизонтальное выравнивание. |
| \`padding\` | \`'normal' | 'checkbox' | 'none'\` | Узкая колонка чекбокса, без отступов или обычная ячейка. |
| \`activeColumn\` | \`boolean\` | Только в шапке: усиленная нижняя граница у активной сортируемой колонки (макет). |
| \`headerMaxLines\` | \`number\` | Только шапка (\`th\`): не больше заданного числа строк текста; лишнее обрезается с «…» (\`-webkit-line-clamp\`). Без пропа — одна строка без переноса (\`white-space: nowrap\`), как раньше. Значения \`< 1\` игнорируются; сверху действует потолок (см. \`TABLE_HEADER_MAX_LINES_CAP\` в \`tableHeaderClampHandlers\`). |
| \`colSpan\`, \`rowSpan\`, \`scope\` | — | Стандартные атрибуты таблицы. |

У ячеек в \`thead\` и \`tfoot\` по умолчанию задана **одинаковая** \`min-height\` строки (зависит от \`size\` таблицы: \`sm\` / \`md\`), чтобы высота шапки совпадала с высотой строки подвала при обычном однострочном тексте (полужирный заголовок и иконки сортировки не «выбивают» ряд выше подвала).

Для **несортируемого** длинного заголовка вручную можно обернуть текст в \`TableCellHeadLineClamp\` из \`Table.style\` (экспорт из \`basicTable\`) с пропом \`$maxLines\` — в \`DataGrid\` это делается автоматически при \`headerMaxLines\`.

### TableCellFormatted

Обёртка над \`TableCell\`: пропсы \`value\`, опционально \`row\`, \`field\`, \`rowIndex\` и объект \`format\` (\`TableCellFormat\`) — те же пресеты, что у **DataGrid** (\`columns[].format\`). Если переданы \`children\`, они отображаются вместо форматирования. Сторис **Table › TableCellFormatted**.

### TableSortLabel

Кнопка-обёртка для заголовка с иконкой сортировки; контролируемая сортировка на стороне родителя.

| Проп | Зачем |
|------|--------|
| \`active\` | Колонка сейчас участвует в сортировке. |
| \`direction\` | \`'asc' | 'desc'\` при активной колонке; \`false\` — нейтральное состояние иконки. |
| \`hideSortIcon\` | Только текст заголовка без стрелки. |
| \`disabled\` | Отключить клик по заголовку. |
| \`onClick\` | Переключение модели сортировки в родителе. |
| \`maxLines\` | Максимум строк у **текста** заголовка рядом с иконкой; иконка выравнивается по верху первой строки. |
| \`sortPriority\` | При сортировке по нескольким полям: порядковый номер (1…n) рядом с парой шевронов. |

Иконка сортировки — **два линейных шеврона** (вверх / вниз): активное направление темнее, противоположное приглушено, без сортировки по колонке оба в нейтральном тоне.

Ячейку шапки помечайте \`activeColumn\`, если колонка активна — в макете усиливается нижняя граница колонки. Для многострочного заголовка задайте ту же \`headerMaxLines\` у \`TableCell\`, что и \`maxLines\` у \`TableSortLabel\`, чтобы снять \`nowrap\` у \`th\`.

### TablePagination

Пагинация под таблицей; номер страницы **с нуля** в колбэках.

| Проп | Тип | Зачем |
|------|-----|--------|
| \`count\` | \`number\` | Всего записей. |
| \`page\` | \`number\` | Текущая страница **с нуля**. |
| \`rowsPerPage\` | \`number\` | Размер страницы. |
| \`onPageChange\` | \`(event, pageZeroBased) => void\` | Смена страницы. |
| \`onRowsPerPageChange\` | событие как у \`select\` | Смена размера страницы; \`event.target.value\` — строка с числом. |
| \`rowsPerPageOptions\` | \`number[]\` | Допустимые размеры страницы; пусто — блок выбора не показывается. |
| \`showRowsPerPageSelect\` | \`boolean\` | Принудительно скрыть селект (\`false\`), даже если опции заданы. |
| \`rowsPerPageSelectVariant\` | \`'default' | 'compact'\` | Компактная подпись и селект. |
| \`labelRowsPerPage\` | \`ReactNode\` | Текст перед селектором размера страницы. |
| \`paginationVariant\` | \`'default' | 'compact'\` | Плашка страниц: полная или только стрелки и текущая страница. |
| \`siblingCount\` | \`number\` | Соседние номера вокруг текущей (у полной плашки). |
| \`paginationToolbarAlign\` | \`'left' | 'center' | 'right'\` | Выравнивание строки футера. |
| \`paginationToolbarReverse\` | \`boolean\` | Обратный порядок блоков в строке (\`row-reverse\`). |
| \`showPageJump\` | \`boolean\` | Поле «перейти к странице»; при одной странице скрывается. |
| \`labelPageJump\` | \`ReactNode\` | Подпись перед полем номера страницы. |
| \`disabled\` | \`boolean\` | Отключить контролы. |
| \`size\` | \`Size\` | Размер внутренней \`Pagination\` и полей. |
| \`embeddedInTableCard\` | \`boolean\` | Встроить в ту же карточку, что и таблица: без верхнего внешнего отступа, с верхней границей и внутренними отступами (как в \`DataGrid\`). |

**Замечание:** в типах также есть \`showRecordsTotal\` и \`formatRecordsTotal\`; отображение итога «записей из N» в разметке **пока не подключено** — ориентируйтесь на фактическое поведение компонента.

### Сторис

- **Basic** — с \`striped\`, \`TableFooter\`, пагинация снаружи контейнера (классическая композиция).
- **PlainBody** — без зебры (проп \`striped\` не задан; совпадает с умолчанием API \`Table\`).
- **DataGridLike** — полный макет: чекбоксы, сортировка, теги, аватар, меню строки, «Загрузить больше», пагинация.
- **SortableHead** — \`TableSortLabel\`, \`activeColumn\`, выделенная и disabled-строка.
- **ColumnFilterInHeader** — фильтр в шапке (\`Dropdown\`, \`ColumnFilterPanel\`, \`Input\`); дублирует **Table › Column filters** для корня **Table** / **DataGrid**. Встроенная иконка без кастомного \`headerName\`: **DataGrid › Встроенная иконка фильтра** (\`filterable\` + \`onColumnFilterClick\`); позиция иконки — **DataGrid › Иконка фильтра: позиция в заголовке** (\`filterIconPosition\`).
- **HeadMaxLinesClamp** — \`headerMaxLines\` у \`TableCell\`, \`maxLines\` у \`TableSortLabel\`, \`TableCellHeadLineClamp\` для несортируемого заголовка.
- **PaginationEmbeddedInCard** — пагинация внутри \`TableContainer\` с \`embeddedInTableCard\`.
- **StickyHeader** — липкая шапка при скролле.
- **StripedSizes** — сравнение \`striped\` и размеров \`sm\` / \`md\`.
`.trim();

/** Описание компонента DataGrid для Storybook Docs. */
export const DATAGRID_DOC = `
### Назначение

Готовая таблица на базе примитивов \`Table*\`: колонки, строки, выбор, сортировка, пагинация, загрузка, раскрытие строк, **дополнительная строка над заголовками колонок** (\`headerToolbar\` — иконки настроек, экспорта, истории, документации и т.д.), перетаскивание колонок/строк (опционально), изменение ширины колонок за ручку на заголовке (опционально), **колбэки жизненного цикла** ресайза (\`onColumnResizeStart\` / \`Change\` / \`End\`), DnD (\`onColumnDragStart\`, \`onColumnOrderChange\`, \`onColumnDragCancel\`, \`onRowDragStart\`, \`onRowDragCancel\`) и **встроенная иконка фильтра** (\`columns[].filterable\`, \`columns[].filterIconPosition\`, \`onColumnFilterClick\`). Данные и бизнес-логика остаются у родителя: грид отдаёт колбэки и отображает переданные \`rows\`.

Подвал \`TablePagination\` по умолчанию рендерится **внутри** той же карточки, что и сетка (\`embeddedInTableCard\`), общая обводка и фон с \`TableContainer\`.

### Обязательные пропсы

| Проп | Зачем |
|------|--------|
| \`tableId\` | Уникальный \`id\` у \`<table>\`; для группы радиокнопок при одиночном выборе (\`name\`). |
| \`columns\` | Описание колонок (\`field\`, \`headerName\`, \`filterable\`, \`filterIconPosition\`, \`headerMaxLines\`, \`render\`, \`format\`, \`sortable\`, \`width\`, \`align\`, \`disableReorder\`, \`disableResize\`, …). |
| \`rows\` | Массив строк; каждая строка должна иметь поле \`id: string\` (см. \`DataGridBaseRow\`), если не переопределяете \`getRowId\`. |
| \`totalRows\` | Число записей для пагинации и отображения (при серверной пагинации — всего на сервере; при клиентской — обычно \`rows.length\` после фильтрации). |

### Колонки (\`DataGridColumn\`)

| Поле | Зачем |
|------|--------|
| \`field\` | Ключ поля в строке; допускается путь через точку (\`user.name\`). |
| \`headerName\` | Заголовок колонки. |
| \`width\`, \`minWidth\` | Ширина колонки. |
| \`align\` | \`left\` / \`center\` / \`right\`. |
| \`sortable\` | Показывать сортируемый заголовок; фактическая сортировка — в родителе по \`sortModel\` / \`onSortChange\`. |
| \`valueGetter\` | Кастомное значение для сортировки/отображения по умолчанию. |
| \`format\` | Декларативное форматирование ячейки (\`TableCellFormat\`): маски, ссылки, числа, даты и др.; ниже по приоритету, чем \`render\` колонки и \`renderCell\` грида. |
| \`render\` | Ячейка; имеет приоритет над глобальным \`renderCell\` грида. |
| \`disableReorder\` | Не таскать колонку при \`enableColumnDrag\`. |
| \`disableResize\` | Не показывать ручку ширины при \`enableColumnResize\` + \`onColumnResize\`. |
| \`headerMaxLines\` | Свой лимит строк заголовка; иначе берётся \`headerMaxLines\` у грида. |
| \`filterable\` | Показать встроенную кнопку-иконку фильтра в заголовке; клик — в \`onColumnFilterClick\` у грида (откройте \`Dropdown\` / панель в родителе). |
| \`filterApplied\` | При \`true\` у колонки с \`filterable\` иконка с заливкой \`theme.colors.info\` (фильтр уже применён). |
| \`filterIcon\` | Свой \`ReactNode\` внутри кнопки фильтра вместо стандартной \`Icon\`; приоритет над \`filterIconProps\` / \`filterIconPropsApplied\`. |
| \`filterIconProps\` | Частичные пропсы \`Icon\` (\`name\`, \`size\`, \`color\`, \`className\`) — мерж поверх \`IconExFilter\` + \`IconSize.XS\` + \`currentColor\`. |
| \`filterIconPropsApplied\` | Доп. мерж поверх \`filterIconProps\`, только если \`filterApplied\` (например другой \`color\` на фоне \`info\`). |
| \`filterIconPosition\` | \`leading\` — иконка у левого края ячейки перед заголовком; \`inlineTitle\` — сразу после заголовка без растягивания текста на всю ширину; \`trailing\` — заголовок на всю ширину, иконка у правого края (**по умолчанию**). |

### Форматирование ячеек (\`columns[].format\`)

Поле **\`format\`** задаёт декларативное отображение без собственного \`render\`. Хелпер **\`formatTableCellValue\`** и константы масок экспортируются из пакета (см. \`tableCellFormat\` в handlers). Для примитивной таблицы доступен компонент **\`TableCellFormatted\`** (сторис **Table › TableCellFormatted**).

Приоритет: \`columns[].render\` → \`DataGridProps.renderCell\` → \`columns[].format\` → строковое значение поля.

| Тип \`format.type\` | Назначение |
|---------------------|------------|
| \`text\` | Регистр строки (\`uppercase\`, \`lowercase\`, \`capitalize\`). |
| \`number\` | Число через \`Intl\`; локаль по умолчанию \`ru-RU\`. |
| \`currency\` | Валюта (\`currency\` по умолчанию \`RUB\`). |
| \`percent\` | Проценты; \`fromFraction\` — доля \`0.25\` → «25 %». |
| \`date\` / \`datetime\` / \`time\` | dayjs-шаблон (\`pattern\`). |
| \`mask\` | Своя маска: \`#\` — цифра, \`A\` — буква, \`*\` — любой символ. |
| \`phone\` | Пресеты \`RU\` / \`INT\` или своя \`mask\`. |
| \`bankAccount\` / \`bankCard\` / \`inn\` / \`snils\` | Типовые маски РФ. |
| \`email\` | Ссылка \`mailto:\` (\`subject\`, \`body\`). |
| \`link\` | Компонент \`Link\`: \`href\` строкой с \`{поле}\` или функцией от контекста. |
| \`boolean\` | Подписи для да/нет и неопределённого значения. |
| \`enum\` | Сопоставление значения с \`ReactNode\`. |
| \`custom\` | Полный контроль: \`renderCell(params)\`. |

Сторис **DataGrid › Column formats › Встроенные форматы колонок**.

### Фильтры колонок (композиция и встроенная иконка)

**Вариант А — полностью свой заголовок:** в \`headerName\` передайте **ReactNode** (иконка + выпадающее меню). Для блока с полями и кнопками **Применить** / **Очистить** используйте **\`ColumnFilterPanel\`** — внутри \`Dropdown\` обязательно \`presentation="embeddedInDropdown"\`, иначе двойная «карточка» и обрезание по ширине. Внутрь (\`children\`) кладёте **DateInput**, **Select** и др. Колбэки кнопок: \`onApply\` / \`onClear\` (логика фильтра); опционально \`onApplyButtonClick\` / \`onClearButtonClick\` — клик с событием DOM **перед** \`onApply\` / \`onClear\` (аналитика, всплытие). Готовые сторис: **ColumnFilterInHeader** в корне **DataGrid** и в **Table**, раздел **Table › Column filters**.

**Вариант Б — встроенная иконка:** у колонки \`filterable: true\` и у грида колбэк \`onColumnFilterClick({ field, nativeEvent })\` — откройте меню фильтра в родителе (портал, \`Dropdown\`, боковая панель и т.д.; без дублирования иконки в \`headerName\`). При активном фильтре передайте \`filterApplied: true\` — иконка с заливкой \`info\`. Кастомизация: \`filterIcon\`, \`filterIconProps\`, \`filterIconPropsApplied\`, **\`filterIconPosition\`** (\`leading\` | \`inlineTitle\` | \`trailing\`). Сторис **BuiltinColumnFilterIcon** — клик по иконке открывает \`ColumnFilterPanel\` под таблицей; **Иконка фильтра: позиция в заголовке** — три режима в соседних колонках; **FilterIconCustomization** / **FilterIconCustomNode** — кастомная иконка и цвета.

| Проп грида | Зачем |
|------------|--------|
| \`onColumnFilterClick\` | Клик по встроенной кнопке-фильтру (только для колонок с \`filterable: true\`). |

### Выбор строк

| Проп | Зачем |
|------|--------|
| \`displayRowSelectionColumn\` | Показать колонку чекбоксов/радио. |
| \`multiselect\` | \`true\` — чекбоксы; \`false\` — радиокнопки (одна строка). |
| \`selectedIds\` | Контролируемый набор id (\`Set\` или массив). |
| \`disabledIds\` | Строки без выбора. |
| \`onRowSelectionChange\` | \`(nextIds, reason)\`; \`reason\`: \`'row'\` | \`'header'\` | \`'clear'\`. |

### Пагинация

| Проп | Зачем |
|------|--------|
| \`paginationModel\` | \`{ page, pageSize }\`; страница **с нуля**. |
| \`onPaginationChange\` | Обновление модели; без пары \`paginationModel\` + \`onPaginationChange\` футер пагинации не показывается. |
| \`paginationMode\` | \`'client'\` — грид сам режет \`rows\` по странице; \`'server'\` — в \`rows\` уже приходит текущая страница, \`totalRows\` — полный счётчик с сервера. |
| \`rowsPerPageOptions\` | Опции селекта «строк на странице». |
| \`hideFooter\` | Скрыть подвал пагинации (например таблица без постраничности). |
| \`paginationVariant\`, \`paginationToolbarAlign\`, \`paginationToolbarReverse\`, \`showRowsPerPageSelect\`, \`rowsPerPageSelectVariant\`, \`showPageJump\`, \`labelPageJump\` | Прокидываются в \`TablePagination\` (см. документацию Table). |

### Сортировка

| Проп | Зачем |
|------|--------|
| \`sortModel\` | Одно поле \`{ field, direction }\`, массив критериев по приоритету или \`null\`. |
| \`onSortChange\` | Смена модели; сортировку массива \`rows\` выполняет родитель. |
| \`multiColumnSort\` | \`true\` — клик по колонке добавляет/меняет/убирает критерий; удобно держать \`sortModel\` как массив (хелперы \`normalizeDataGridSortModel\`, \`resolveNextDataGridSortModel\`). |

### Внешний вид таблицы

| Проп | Зачем |
|------|--------|
| \`stickyHeader\` | Липкая шапка. |
| \`scrollAreaMaxHeight\` | Макс. высота зоны с вертикальным скроллом (прокидывается в \`TableContainerScroll\`); удобно вместе со \`stickyHeader\`, см. примитив \`Table\`. |
| \`tableHeaderVariant\` | \`default\` — серый фон шапки из темы; \`card\` — фон карточки (обычно белый). Панель \`headerToolbar\` того же цвета. |
| \`tableHeaderBackground\` | Кастомный цвет фона шапки и \`headerToolbar\` (приоритет над \`tableHeaderVariant\`). |
| \`striped\` | Зебра в \`tbody\`. |
| \`columnDividers\` | Вертикальные разделители между колонками у вложенной \`Table\` (по умолчанию \`true\`). |
| \`headerMaxLines\` | Максимум строк текста в заголовках **данных** колонок (\`line-clamp\`); сортируемые колонки получают \`maxLines\` у \`TableSortLabel\`, несортируемые — обёртку \`TableCellHeadLineClamp\`. У колонки можно задать своё \`headerMaxLines\`. |
| \`size\` | \`Size\` дизайн-системы: плотность строк и контролов. |
| \`elevated\` | Тень у \`TableContainer\` (\`true\` по умолчанию). |
| \`rowBackgroundColorByStatus\` | \`(row) => цвет\` — фон строки по данным (статусы). |
| \`tableAriaLabel\` | \`aria-label\` таблицы. |
| \`style\` | Инлайн-стиль корня грида. |
| \`headerToolbar\` | Слот над строкой с названиями колонок: первая строка \`thead\`, одна ячейка на всю ширину (\`colSpan\`), удобно для **IconButton** (настройки, экспорт, **история**, **документация** и т.д.). |
| \`headerToolbarAlign\` | Горизонтальное выравнивание содержимого \`headerToolbar\`: \`start\` | \`end\` (**по умолчанию**) | \`center\` | \`space-between\`. |
| \`headerToolbarAriaLabel\` | Подпись для доступности (\`aria-label\` у контейнера с \`role="toolbar"\`); если не задана — нейтральная строка по умолчанию в компоненте. |

### События строк

| Проп | Зачем |
|------|--------|
| \`onRowClick\` | Клик по строке. |
| \`onRowDoubleClick\` | Двойной клик. |
| \`getRowId\` | Если идентификатор не в \`row.id\`, верните стабильный id строки. |

### Раскрывающиеся строки

| Проп | Зачем |
|------|--------|
| \`expandedRowIds\` | Контролируемый список раскрытых id. |
| \`onExpandedRowChange\` | Клик по раскрытию строки: \`(params) => void\`, где \`params\` — \`{ rowId, expanded, expandedIds }\` (\`expanded\` — стало ли развёрнуто; \`expandedIds\` — полный список id открытых строк после действия). Для контролируемого \`expandedRowIds\` обновляйте состояние из колбэка. Ранее использовалось имя \`onRowCollapseChange\` — оно снято, API только \`onExpandedRowChange\`. |
| \`getRowExpandable\` | Разрешить раскрытие для строки. |
| \`renderExpandedRow\` | Контент под строкой; второй аргумент — \`dataStatus\`, \`isLoading\`. |
| \`onExpandedRowOpen\` | Вызов при открытии (ленивая подгрузка). |
| \`getExpandedRowDataStatus\` | Статус данных подстроки: \`idle\` | \`loading\` | \`ready\` | \`error\`. |
| \`getExpandedRowLoading\` | Упрощённый флаг загрузки подстроки (если статус не задан). |

### Drag-and-drop

| Проп | Зачем |
|------|--------|
| \`enableColumnDrag\` | Перетаскивание заголовков колонок. |
| \`onColumnDragStart\` | Старт DnD: \`{ fromIndex, field }\`. |
| \`onColumnDragEnd\` | Успешный drop: \`(fromIndex, toIndex)\` в текущем порядке \`columns\` (до перестройки массива родителем). |
| \`onColumnOrderChange\` | То же перемещение, что и \`onColumnDragEnd\`, объектом \`{ fromIndex, toIndex, field }\`. |
| \`onColumnDragCancel\` | Drop на ту же колонку или отпускание вне цели без смены порядка. |
| \`enableRowDrag\` | Перетаскивание строк за ручку. |
| \`onRowDragStart\` | Старт DnD строки: \`{ fromIndex, rowId }\` (индекс на **текущей странице**). |
| \`onRowDragEnd\` | Новый порядок id на странице: \`(orderedIds) => void\`. |
| \`onRowDragCancel\` | Drop на ту же строку или отпускание вне цели без перестановки. |

### Ширина колонок (ресайз)

| Проп | Зачем |
|------|--------|
| \`enableColumnResize\` | Показать ручку на правом краю заголовка данных колонки. |
| \`onColumnResizeStart\` | Начало жеста: \`{ field, width }\` (исходная ширина, px). |
| \`onColumnResizeChange\` | Движение ручки: предпросмотр \`{ field, width }\` (px). |
| \`onColumnResize\` | \`({ field, width })\` — после отпускания ручки (**pointerup**); \`width\` в **пикселях**. Обновите \`columns[].width\`. Без колбэка ручки не показываются. |
| \`onColumnResizeEnd\` | Конец жеста: \`{ field, width, committed }\`; \`committed === true\` при отпускании без \`pointercancel\` (в этот момент при заданном \`onColumnResize\` он уже вызван). |
| \`columnResizeMaxWidthPx\` | Верхний предел ширины при перетаскивании (по умолчанию 2000). |

Ручка не конфликтует с \`enableColumnDrag\`: при начале ресайза нативный \`dragstart\` колонки блокируется. Нижняя граница — из \`minWidth\` колонки или значение по умолчанию (~64px).

При включённом ресайзе у таблицы задаётся \`table-layout: fixed\`, чтобы при изменении ширины одной колонки **не сжимались** остальные (при \`auto\` движок перераспределяет место). Для стабильной сетки задавайте \`width\` (или \`minWidth\`) колонкам явно.

### Рендер ячеек и строк

| Проп | Зачем |
|------|--------|
| \`renderCell\` | Общий рендер ячейки, если у колонки нет своего \`render\`. |
| \`renderRowWrapper\` | Обёртка над \`<tr>\`; должна вернуть один корневой \`tr\` или фрагмент с одним \`tr\`. |

### Загрузка

| Проп | Зачем |
|------|--------|
| \`isLoading\` | Глобальный оверлей поверх таблицы (не путать со спиннером только в раскрытой области). |

### Сторис (полный список)

| Сторис | Что показывает |
|--------|----------------|
| **ClientPagination** | \`paginationMode="client"\`, сортировка, мультивыбор, липкая шапка (зебра по умолчанию у грида). |
| **Без зебры и липкая шапка** (\`ClientPaginationPlainBody\`) | \`striped={false}\` + \`stickyHeader\` + \`scrollAreaMaxHeight\`; все демо-строки на странице — прокрутка внутри трека и «липкая» шапка. |
| **Без зебры (без липкой шапки)** (\`PlainBodyNoStickyHeader\`) | Только \`striped={false}\`; \`stickyHeader\` не включается; пагинация по 3 строки. |
| **Липкая шапка (зебра, прокрутка)** (\`StickyHeaderWithScroll\`) | Зебра по умолчанию + \`stickyHeader\` + \`scrollAreaMaxHeight\`; полный список строк на странице. |
| **MultiColumnSort** | \`multiColumnSort\` + массив в \`sortModel\`; приоритеты 1, 2 у шевронов. |
| **CompactPaginationHideRowsSelect** | \`paginationVariant="compact"\`, \`showRowsPerPageSelect={false}\`. |
| **PaginationToolbarCentered** | \`paginationToolbarAlign="center"\`. |
| **PaginationToolbarReversed** | \`paginationToolbarReverse\` — обратный порядок блоков в строке футера. |
| **CompactRowsPerPageSelect** | Полная плашка страниц + \`rowsPerPageSelectVariant="compact"\`. |
| **SingleSelect** | \`multiselect={false}\`, колонка радиокнопок. |
| **ExpandAndLoading** | Раскрывающаяся строка, \`isLoading\` — глобальный оверлей. |
| **ExpandLazyRowData** | \`onExpandedRowOpen\`, \`getExpandedRowDataStatus\`, спиннер только в подстроке. |
| **ColumnReorder** | \`enableColumnDrag\`, \`onColumnDragEnd\`, плюс \`onColumnDragStart\`, \`onColumnOrderChange\`, \`onColumnDragCancel\` (см. сторис — лог в Actions). |
| **ColumnResize** | \`enableColumnResize\`, \`onColumnResize\`, \`onColumnResizeStart\`, \`onColumnResizeChange\`, \`onColumnResizeEnd\`, контролируемые \`columns[].width\`. |
| **HeaderMaxLines** | \`headerMaxLines\` у грида и длинные \`headerName\` (в т.ч. несортируемая колонка). |
| **HeaderToolbar** | \`headerToolbar\`: панель иконок над заголовками колонок; фон совпадает с шапкой (\`tableHeaderVariant\` / \`tableHeaderBackground\`). |
| **Панель иконок: шапка как у карточки** (\`HeaderToolbarCardSurface\`) | \`tableHeaderVariant="card"\` — белый (shell) фон шапки и панели. |
| **ColumnFilterInHeader** | \`headerName\` с фильтром (\`ColumnFilterPanel\`); дублирует **Table › Column filters › DataGridWithTextFilterInHeader**. |
| **BuiltinColumnFilterIcon** | \`filterable\` у колонки + \`onColumnFilterClick\`; панель фильтра под таблицей. |
| **Иконка фильтра: позиция в заголовке** | \`columns[].filterIconPosition\`: \`leading\`, \`inlineTitle\`, \`trailing\` (по умолчанию). |
| **FilterIconCustomization** | \`filterIconProps\` / \`filterIconPropsApplied\` — другая иконка и цвет при активном фильтре. |
| **FilterIconCustomNode** | \`filterIcon\` — полностью свой \`ReactNode\` внутри кнопки фильтра. |
| **RowReorder** | \`enableRowDrag\`, \`onRowDragEnd\`, \`onRowDragStart\`, \`onRowDragCancel\`. |
| **ServerPaginationMode** | \`paginationMode="server"\`, срез \`rows\` и \`totalRows\` как с API. |
| **RowClickHandlers** | \`onRowClick\`, \`onRowDoubleClick\`. |
| **RowBackgroundByStatus** | \`rowBackgroundColorByStatus\`. |
| **RenderRowWrapper** | \`renderRowWrapper\` — атрибуты на \`tr\`. |
| **CustomRowIdentifier** | \`getRowId\` и согласованные \`selectedIds\`. |
| **GlobalRenderCell** | Глобальный \`renderCell\` без \`render\` у колонки. |
| **HideFooterFlatCard** | Без подвала пагинации; плоская карточка (\`elevated={false}\`), \`tableAriaLabel\`. |
`.trim();
