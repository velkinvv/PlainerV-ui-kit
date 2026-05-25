/**
 * Тексты для Storybook «Docs»: примитивы таблицы и DataGrid.
 * Дублируют назначение пропсов из `types/ui.ts`, но с акцентом на использование в коде.
 */

/** Описание раздела UI Kit / Table (примитивы + композиция). */
export const TABLE_KIT_DOC = `
### Назначение

Набор примитивов для семантической таблицы: обёртка-карточка, секции \`thead\` / \`tbody\` / \`tfoot\`, строки, ячейки, сортировка в шапке и пагинация под таблицей.

### TableContainer

Обёртка карточки: скругление из \`theme.tables.borderRadius\` (CSS-переменная \`--plainer-table-border-radius\` на \`TableContainer\`), затем Card MD и \`BorderRadiusHandler(theme.borderRadius)\`; фон, обводка и опциональная тень. Горизонтальный скролл **не** встроен в корень — иначе у встроенной пагинации обрезаются тени у кнопок.

| Проп | Тип | Зачем |
|------|-----|--------|
| \`elevated\` | \`boolean\` | \`true\` (по умолчанию) — тень как у карточки и небольшой вертикальный \`margin\`, чтобы тень не обрезалась у overflow-родителей (например Canvas Docs); \`false\` — без тени и без доп. отступа. |
| \`shellVariant\` | \`'card' | 'embedded'\` | \`card\` — бордер и фон карточки; \`embedded\` — без внешней рамки (вложение в **Card** / панель). |
| \`shellInset\` | \`boolean\` | Внутренние отступы: сетка на белом поле внутри карточки, внешняя обводка только у \`TableContainer\`. |
| \`shellInsetPadding\` | \`string | number\` | Отступ канавы (число — px); иначе \`theme.tables.shell.insetPadding\`. |
| \`surfaceBackgrounds\` | объект / \`'transparent'\` | Прозрачные фоны по частям (\`shell\`, \`header\`, \`bodyRow\`, \`pagination\`, …) или shorthand для всех. |
| \`component\` | элемент | Корневой тег (по умолчанию \`div\`). |
| \`className\`, \`style\` | — | Внешний вид контейнера. На корне задаётся CSS-переменная \`--plainer-table-border-radius\`. |

### TableContainerScroll

Обёртка из двух слоёв: внешний clip — скругления блока сетки; внутренний трек — область таблицы. \`<TablePagination />\` держите **снаружи** scroll-обёртки (но внутри \`TableContainer\`).

| Проп | Тип | Зачем |
|------|-----|--------|
| \`scrollAreaMaxHeight\` | \`string | number\` | Макс. высота **зоны строк**. С \`stickyHeader\` на \`Table\` / \`DataGrid\` — split-layout (см. ниже). Число — px. |
| \`horizontalScroll\` | \`boolean\` | По умолчанию \`true\`. \`false\` — без горизонтальной полосы, таблица на всю ширину. |
| \`embeddedPaginationBelow\` | \`boolean\` | \`true\`, если ниже идёт \`TablePagination\` с \`embeddedInTableCard\` — скругление clip только сверху. |
| \`className\` | строка | Класс на clip-слое. |

**Как использовать:** \`TableContainer\` → \`TableContainerScroll\` → \`Table\` или \`DataGrid\`; при встроенной пагинации — \`TablePagination\` с \`embeddedInTableCard\` и \`embeddedPaginationBelow\` у scroll-обёртки.

#### Split-layout (\`scrollAreaMaxHeight\` + липкая шапка)

При \`scrollAreaMaxHeight\` и \`stickyHeader\` (у **DataGrid** липкая шапка включена по умолчанию) таблица рендерится в **две части**:

1. **Панель \`headerToolbar\`** (если передан слот) — отдельный блок над шапкой колонок: ширина **видимой** области карточки, без горизонтального скролла (строка помечается \`data-plainer-table-header-toolbar-row\` в **DataGrid**).
2. **Заголовки колонок** (\`thead\`) — вне вертикального скролла, с \`padding-right\` под ширину вертикального скроллбара тела (\`--plainer-table-body-scrollbar-gutter\`).
3. **Строки** (\`tbody\`) — в отдельном треке с \`overflow-y: auto\` и \`overflow-x: scroll\`.

Горизонтальный скролл **только у блока строк**; заголовки колонок синхронизируются с телом по \`scrollLeft\` (без отдельной полосы у шапки). Ширины колонок в шапке и теле выравниваются (\`colgroup\`, заявленные \`width\` колонок). Если сумма колонок уже области просмотра, таблица **растягивается на 100%** — без пустой полосы справа в узком контейнере.

Скругления верхних углов шапки и clip — из \`theme.tables.borderRadius\` (переменная \`--plainer-table-border-radius\` на \`TableContainer\`).

**Глобальные скроллбары** (тонкая полоса, подсветка при наведении) подключаются в \`GlobalStyles\` пакета — не дублируйте стили скролла у Tabs и таблицы.

**Внешний вид:** у контейнера тонкая обводка (\`border\` темы). Шапка (\`thead\`) отделена от тела: свой фон и нижняя граница (не путать с «зеброй»).

### Table

Корневая \`<table>\`; задаёт контекст размера ячеек и зебры для дочерних строк.

| Проп | Тип | Зачем |
|------|-----|--------|
| \`stickyHeader\` | \`boolean\` | Липкая шапка. **Без** \`scrollAreaMaxHeight\` — \`position: sticky\` у \`th\` внутри общего scroll-предка. **С** \`scrollAreaMaxHeight\` на \`TableContainerScroll\` — split-layout (шапка снаружи скролла строк); на \`Table\` не задавайте \`sticky\` вручную — достаточно пары с scroll-обёрткой. |
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
- **StickyHeader** — липкая шапка при скролле (\`scrollAreaMaxHeight\` на scroll-обёртке).
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
| \`exportValueGetter\` | Значение для Excel: строка или \`{ text, style? }\` (приоритетнее \`format\` / \`render\`). |
| \`exportCellStyle\` | \`(row) => { textColor?, backgroundColor?, bold? }\` — стили ячейки в выгрузке; мержится со стилем из \`format.enum.exportStyle\` и Tag/Pill. |
| \`format\` | Декларативное форматирование ячейки (\`TableCellFormat\`): маски, ссылки, числа, даты и др.; ниже по приоритету, чем \`render\` колонки и \`renderCell\` грида. В Excel используется та же логика подписей (\`enum\`, даты и т.д.). |
| \`render\` | Ячейка; имеет приоритет над глобальным \`renderCell\` грида. Текст для Excel извлекается из \`children\` / \`label\` узла; для Tag/Pill — пресеты цветов по \`colorVariant\` / \`data-status\`. |
| \`disableReorder\` | Не таскать колонку при \`enableColumnDrag\`. |
| \`disableResize\` | Не показывать ручку ширины при \`enableColumnResize\` + \`onColumnResize\`. |
| \`headerMaxLines\` | Свой лимит строк заголовка; иначе берётся \`headerMaxLines\` у грида. |
| \`filterable\` | Показать встроенную кнопку-иконку фильтра в заголовке; клик — в \`onColumnFilterClick\` у грида (откройте \`Dropdown\` / панель в родителе). |
| \`filterApplied\` | При \`true\` у колонки с \`filterable\` — залитая воронка цветом \`theme.colors.info\` (без фона-кружка). |
| \`filterIcon\` | Свой \`ReactNode\` внутри кнопки фильтра вместо стандартной \`Icon\`; приоритет над \`filterIconProps\` / \`filterIconPropsApplied\`. |
| \`filterIconProps\` | Частичные пропсы \`Icon\` (\`name\`, \`size\`, \`color\`, \`className\`) — мерж поверх \`IconExFilter\` + \`IconSize.XS\` + \`currentColor\`. |
| \`filterIconPropsApplied\` | Доп. мерж поверх \`filterIconProps\`, только если \`filterApplied\` (по умолчанию — \`IconExFilterFilled\`). |
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
| \`enum\` | Сопоставление значения с \`ReactNode\`; в массиве \`options\` можно задать \`exportStyle\` (цвета ячейки в Excel). |
| \`custom\` | Полный контроль: \`renderCell(params)\`. |

Сторис **DataGrid › Column formats › Встроенные форматы колонок**.

### Выгрузка в Excel (\`.xls\`)

Встроенная кнопка в \`headerToolbar\` (без внешних библиотек: файл — **SpreadsheetML**). Включается пропом **\`excelExport\`** у грида; кнопка видна, если передан **\`dataFetcher\`** и \`disabled !== true\`.

| Поле \`excelExport\` | Зачем |
|----------------------|--------|
| \`dataFetcher(skip, take, signal?)\` | Постраничная загрузка строк для выгрузки (\`skip\` — смещение, \`take\` — размер порции). |
| \`fileName\` | Имя файла (по умолчанию \`Выгрузка_<timestamp>.xls\`). |
| \`sheetName\` | Имя листа (по умолчанию \`Sheet1\`). |
| \`pageSize\` | Строк на «страницу» при выгрузке; иначе \`paginationModel.pageSize\` или \`10\`. |
| \`columns\` | Явный список колонок файла; иначе из \`columns\` грида. |
| \`ignoreFields\` | Поля (\`field\`), не попадающие в автосборку колонок. |
| \`mapRowData\` | Плоский объект строки для Excel (обходит автоформатирование колонок грида). |
| \`texts\` | Подписи модалки и кнопки. |
| \`onSuccess\` / \`onError\` | Колбэки после скачивания / при ошибке. |
| \`disabled\` | Скрыть кнопку выгрузки. |

**Модалка:** диапазон страниц (с 1), валидация границ, прогресс загрузки, отмена через \`AbortSignal\`.

**Ширина колонок:** из \`columns[].width\` → \`widthPx\` в файле (\`<Column ss:Width="…"/>\`).

**Текст ячеек** (приоритет): \`exportValueGetter\` → \`format\` (\`formatTableCellExportCellValue\`) → текст из \`render\` → сырое поле.

**Цвета ячеек** (\`DataGridExcelExportCellStyle\`: \`textColor\`, \`backgroundColor\`, \`bold\`; цвета \`#RRGGBB\` или \`rgb()\`):

1. \`exportValueGetter: () => ({ text: 'Активен', style: { textColor: '#1B5E20', backgroundColor: '#E8F5E9' } })\`
2. \`exportCellStyle: (row) => ({ … })\`
3. \`format: { type: 'enum', options: [{ value, label, exportStyle }] }\`
4. Автоматически из **Tag** (\`colorVariant\`) и **Pill** (\`status\` / \`data-status\`) в \`render\`

Экспорт из пакета: \`DataGridExcelExportButton\`, \`buildDataGridExcelExportSpreadsheet\`, \`downloadDataGridExcelSpreadsheetFile\`, \`resolveDataGridExportCellValue\`, \`formatTableCellExportCellValue\`, \`formatTableCellValueForExport\`, типы \`DataGridExcelExportConfig\`, \`DataGridExcelExportCellStyle\`, …

Сторис **DataGrid › ExcelExport**.

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
| \`stickyHeader\` | Липкая шапка (по умолчанию **true**; \`false\` — шапка прокручивается вместе с телом). С \`scrollAreaMaxHeight\` шапка **вне** вертикального скролла строк (split-layout). |
| \`scrollAreaMaxHeight\` | Макс. высота зоны **строк** (число — px, или \`'320px'\`, \`'50vh'\`). Прокидывается в \`TableContainerScroll\`. Вместе со \`stickyHeader\` — split-layout: шапка и \`headerToolbar\` фиксированы, скролл у \`tbody\`. |
| \`horizontalScroll\` | Горизонтальный скролл (по умолчанию **true**). \`false\` — \`table-layout: auto\`, колонки по ширине карточки. При \`true\` и ресайзе колонок — \`table-layout: fixed\`. В split-layout горизонтальная полоса только у тела; шапка следует за \`scrollLeft\`. |
| \`tableHeaderVariant\` | \`default\` — серый фон шапки из темы; \`card\` — фон карточки (обычно белый). Панель \`headerToolbar\` того же цвета. |
| \`tableHeaderBackground\` | Кастомный цвет фона шапки и \`headerToolbar\` (приоритет над \`tableHeaderVariant\`). |
| \`striped\` | Зебра в \`tbody\`. |
| \`columnDividers\` | Вертикальные разделители между колонками у вложенной \`Table\` (по умолчанию \`true\`). |
| \`headerMaxLines\` | Максимум строк текста в заголовках **данных** колонок (\`line-clamp\`); сортируемые колонки получают \`maxLines\` у \`TableSortLabel\`, несортируемые — обёртку \`TableCellHeadLineClamp\`. У колонки можно задать своё \`headerMaxLines\`. |
| \`size\` | \`Size\` дизайн-системы: плотность строк и контролов. |
| \`elevated\` | Тень у \`TableContainer\` (\`true\` по умолчанию). |
| \`shellVariant\` | \`card\` (по умолчанию) — бордер и фон карточки таблицы; \`embedded\` — без бордера и фона оболочки (вложение в **Card**: отступы и рамка у родителя, у грида \`elevated={false}\`). |
| \`surfaceBackgrounds\` | Прозрачные фоны по частям (\`shell\`, \`header\`, \`bodyRow\`, \`pagination\`, …) или shorthand \`'transparent'\` — таблица принимает фон родителя. |
| \`shellInset\` | Внутренние отступы на белом фоне карточки (внешняя обводка карточки сохраняется); сетка без своей рамки, не вплотную к краю. |
| \`shellInsetPadding\` | Отступ канавы (число — px); по умолчанию \`theme.tables.shell.insetPadding\` или padding **Card** MD. |
| \`rowBackgroundColorByStatus\` | \`(row) => цвет\` — фон строки по данным (статусы). |
| \`tableAriaLabel\` | \`aria-label\` таблицы. |
| \`style\` | Инлайн-стиль корня грида. |
| \`headerToolbar\` | Слот над строкой с названиями колонок: первая строка \`thead\`, одна ячейка на всю ширину (\`colSpan\`), удобно для **IconButton** (настройки, экспорт, **история**, **документация** и т.д.). В split-layout панель **не** прокручивается по горизонтали вместе с колонками — фиксирована по ширине карточки. |
| \`headerToolbarAlign\` | Горизонтальное выравнивание содержимого \`headerToolbar\`: \`start\` | \`end\` (**по умолчанию**) | \`center\` | \`space-between\`. |
| \`headerToolbarAriaLabel\` | Подпись для доступности (\`aria-label\` у контейнера с \`role="toolbar"\`); если не задана — нейтральная строка по умолчанию в компоненте. |
| \`refetch\` | Кнопка обновления данных в \`headerToolbar\` (показывается, если передана функция). |
| \`isRefetching\` | \`loading\` у кнопки \`refetch\`. |
| \`onResetFilters\` | Кнопка сброса всех фильтров в \`headerToolbar\` (показывается, если передан колбэк). Перед сбросом — модалка подтверждения. |
| \`hasActiveFilters\` | Подсветка кнопки сброса фильтров (как \`filterApplied\` у колонки); кнопка неактивна, если \`false\`. |
| \`resetFiltersConfirmTexts\` | Переопределение текстов модалки сброса (\`title\`, \`description\`, \`confirmLabel\`, \`cancelLabel\`). |
| \`excelExport\` | Выгрузка в Excel: кнопка в \`headerToolbar\`, модалка диапазона страниц, \`dataFetcher\` (см. раздел **Выгрузка в Excel**). |
| \`rows\` | Не передан или \`[]\` — в \`tbody\` пустое состояние с иконкой лупы; **\`thead\`** с заголовками остаётся. |
| \`emptyStateTitle\` / \`emptyStateDescription\` | Тексты пустого состояния (по умолчанию «Ничего не найдено» / «По заданным критериям…»). |
| \`renderEmptyState\` | Полностью свой блок вместо встроенного пустого состояния. |

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

### Статусы данных (загрузка, ошибка, сообщения)

| Проп | Зачем |
|------|--------|
| \`dataStatus\` | \`'loading' \| 'ready' \| 'error'\` — единый статус таблицы. |
| \`isLoading\` | Устаревший флаг: то же, что \`dataStatus="loading"\`. |
| \`loadingDisplay\` | \`'overlay'\` (спиннер поверх) или \`'skeleton'\` (строки-заглушки в \`tbody\`). При скелетоне и непустых \`rows\` автоматически оверлей. |
| \`skeletonRowCount\` | Число строк-скелетонов; иначе \`paginationModel.pageSize\` или 8. |
| \`error\`, \`errorStateTitle\`, \`errorStateDescription\` | Блок ошибки в \`tbody\` при \`dataStatus="error"\` (шапка остаётся). |
| \`onRetry\`, \`errorStateRetryLabel\` | Кнопка повтора; если \`onRetry\` не задан, используется \`refetch\`. |
| \`renderErrorState\` | Кастомный блок ошибки: \`(error, retry?) => ReactNode\`. |
| \`renderLoadingOverlay\` | Кастомный оверлей при \`loadingDisplay="overlay"\`. |
| \`statusMessage\`, \`statusMessageVariant\` | Информационная полоса над строками при \`dataStatus="ready"\` (\`info\` \| \`warning\` \| \`success\`). |
| \`renderStatusMessage\` | Полностью свой блок сообщения вместо встроенной полосы. |

### Сторис (полный список)

| Сторис | Что показывает |
|--------|----------------|
| **ClientPagination** | \`paginationMode="client"\`, сортировка, мультивыбор, липкая шапка (зебра по умолчанию у грида). |
| **Без зебры и липкая шапка** (\`ClientPaginationPlainBody\`) | \`striped={false}\` + \`stickyHeader\` + \`scrollAreaMaxHeight\`; все демо-строки на странице — прокрутка внутри трека и «липкая» шапка. |
| **Без зебры (без липкой шапки)** (\`PlainBodyNoStickyHeader\`) | \`striped={false}\` + \`stickyHeader={false}\`; пагинация по 3 строки. |
| **Липкая шапка (зебра, прокрутка)** (\`StickyHeaderWithScroll\`) | Split-layout: \`scrollAreaMaxHeight={320}\`, зебра, мультивыбор; все демо-строки на странице — вертикальный скролл только у тела, шапка синхронна по горизонтали. |
| **MultiColumnSort** | \`multiColumnSort\` + массив в \`sortModel\`; приоритеты 1, 2 у шевронов. |
| **CompactPaginationHideRowsSelect** | \`paginationVariant="compact"\`, \`showRowsPerPageSelect={false}\`. |
| **PaginationToolbarCentered** | \`paginationToolbarAlign="center"\`. |
| **PaginationToolbarReversed** | \`paginationToolbarReverse\` — обратный порядок блоков в строке футера. |
| **CompactRowsPerPageSelect** | Полная плашка страниц + \`rowsPerPageSelectVariant="compact"\`. |
| **SingleSelect** | \`multiselect={false}\`, колонка радиокнопок. |
| **ExpandAndLoading** | Раскрывающаяся строка, \`isLoading\` — глобальный оверлей. |
| **DataStatuses** | \`dataStatus\`, скелетон, ошибка с повтором, \`statusMessage\`. |
| **ShellInset** | \`shellInset\` — отступ сетки от рамки карточки, внутренний белый блок. |
| **Без зебры и внутренние отступы** (\`ShellInsetPlainBody\`) | \`striped={false}\` + \`shellInset\`. |
| **Встроенная оболочка** (\`EmbeddedShell\`) | **Card** + \`shellVariant="embedded"\`, \`elevated={false}\`. |
| **Прозрачные фоны** (\`TransparentSurfaces\`) | \`surfaceBackgrounds="transparent"\` + \`shellVariant="embedded"\`. |
| **Много колонок (горизонтальный скролл)** (\`ManyColumnsHorizontalScroll\`) | \`horizontalScroll\` по умолчанию + \`scrollAreaMaxHeight\`; шапка не уезжает при прокрутке по X. |
| **Много колонок + панель иконок** (\`ManyColumnsHorizontalScrollHeaderToolbar\`) | Широкая сетка + \`headerToolbar\`: панель на ширину карточки, горизонтальный скролл только у заголовков колонок. |
| **Много колонок + внутренние отступы** (\`ManyColumnsHorizontalScrollShellInset\`) | Широкая сетка + \`shellInset\` — отступ сетки от рамки карточки. |
| **Колонки по ширине (без гориз. скролла)** (\`FitColumnsNoHorizontalScroll\`) | \`horizontalScroll={false}\` — сетка на всю ширину карточки. |
| **ExpandLazyRowData** | \`onExpandedRowOpen\`, \`getExpandedRowDataStatus\`, спиннер только в подстроке. |
| **ColumnReorder** | \`enableColumnDrag\`, \`onColumnDragEnd\`, плюс \`onColumnDragStart\`, \`onColumnOrderChange\`, \`onColumnDragCancel\` (см. сторис — лог в Actions). |
| **ColumnResize** | \`enableColumnResize\`, \`onColumnResize\`, \`onColumnResizeStart\`, \`onColumnResizeChange\`, \`onColumnResizeEnd\`, контролируемые \`columns[].width\`. |
| **HeaderMaxLines** | \`headerMaxLines\` у грида и длинные \`headerName\` (в т.ч. несортируемая колонка). |
| **HeaderToolbar** | \`headerToolbar\`: панель иконок над заголовками колонок; фон совпадает с шапкой (\`tableHeaderVariant\` / \`tableHeaderBackground\`). В split-layout панель не уезжает при горизонтальной прокрутке. |
| **Панель: обновление и сброс фильтров** (\`HeaderToolbarBuiltinActions\`) | \`refetch\`, \`onResetFilters\`, \`hasActiveFilters\` — встроенные кнопки без ручной сборки \`headerToolbar\`. |
| **Пустое состояние** (\`EmptyState\`) | \`rows={[]}\` или без \`rows\`: шапка на месте, в теле — иконка лупы и текст. |
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
| **ExcelExport** | \`excelExport\`: кнопка выгрузки, модалка диапазона страниц, SpreadsheetML \`.xls\`, ширины колонок и цвета статусов. |
`.trim();
