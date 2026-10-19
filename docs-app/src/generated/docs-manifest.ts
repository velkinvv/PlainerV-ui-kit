export const docsManifest = {
  "version": "0.3.4",
  "groups": [
    {
      "id": "buttons",
      "title": "Buttons",
      "items": [
        "button"
      ]
    },
    {
      "id": "data-display",
      "title": "Data Display",
      "items": [
        "badge",
        "datagrid"
      ]
    },
    {
      "id": "feedback",
      "title": "Feedback",
      "items": [
        "alert"
      ]
    },
    {
      "id": "inputs",
      "title": "Inputs",
      "items": [
        "dateinput",
        "input",
        "select"
      ]
    },
    {
      "id": "surfaces",
      "title": "Surfaces",
      "items": [
        "drawer",
        "modal"
      ]
    }
  ],
  "components": [
    {
      "slug": "button",
      "name": "Button",
      "group": "Buttons",
      "status": "stable",
      "since": "0.3.4",
      "description": "Базовая кнопка UI Kit: варианты оформления, размеры, иконки и состояния загрузки/disabled.",
      "examples": [
        {
          "id": "primary",
          "title": "Primary",
          "description": "Базовый сценарий подтверждающего действия.",
          "code": "<Button variant={ButtonVariant.PRIMARY}>Сохранить</Button>",
          "layout": "inline",
          "themes": [
            "theme",
            "colorMode",
            "motion"
          ],
          "showCode": true
        },
        {
          "id": "with-icons",
          "title": "С иконками",
          "description": "Кнопка с иконкой в начале и конце текста.",
          "code": "<Button iconStart={<Icon name=\"IconExHome\" size={IconSize.MD} />} iconEnd={<Icon name=\"IconPlainerArrowRight\" size={IconSize.MD} />}>Открыть</Button>",
          "layout": "inline",
          "themes": [
            "theme",
            "colorMode"
          ],
          "showCode": true
        },
        {
          "id": "loading",
          "title": "Состояние загрузки",
          "description": "Кнопка в loading-состоянии блокирует повторный клик.",
          "code": "<Button loading size={Size.MD}>Сохранить</Button>",
          "layout": "inline",
          "themes": [
            "theme",
            "motion"
          ],
          "showCode": true
        }
      ],
      "variants": [
        {
          "id": "variant-matrix",
          "title": "Варианты кнопки",
          "columns": 3,
          "items": [
            {
              "id": "primary",
              "title": "Primary",
              "code": "<Button variant={ButtonVariant.PRIMARY}>Primary</Button>",
              "description": ""
            },
            {
              "id": "secondary",
              "title": "Secondary",
              "code": "<Button variant={ButtonVariant.SECONDARY}>Secondary</Button>",
              "description": ""
            },
            {
              "id": "outline",
              "title": "Outline",
              "code": "<Button variant={ButtonVariant.OUTLINE}>Outline</Button>",
              "description": ""
            }
          ]
        }
      ],
      "props": {
        "mode": "autogen",
        "include": [],
        "exclude": [],
        "items": [
          {
            "name": "variant",
            "type": "ButtonVariant",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "size",
            "type": "Size",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "iconStart",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "iconEnd",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "showTooltip",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "tooltipText",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "href",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "target",
            "type": "HTMLAttributeAnchorTarget",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "rel",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "download",
            "type": "string | boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "loading",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "disabled",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "fullWidth",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "rounded",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          }
        ]
      }
    },
    {
      "slug": "badge",
      "name": "Badge",
      "group": "Data Display",
      "status": "stable",
      "since": "0.3.4",
      "description": "Компактный индикатор: число, dot-режим, варианты палитры и размеры.",
      "examples": [
        {
          "id": "counter-default",
          "title": "Счётчик",
          "description": "Обычный бейдж с числом.",
          "code": "<Badge variant={BadgeVariant.DEFAULT}>3</Badge>",
          "layout": "inline",
          "themes": [
            "theme",
            "colorMode"
          ],
          "showCode": true
        },
        {
          "id": "dot-mode",
          "title": "Dot-режим",
          "description": "Точка без текстового содержимого.",
          "code": "<Badge variant={BadgeVariant.DEFAULT_MAIN} isDot />",
          "layout": "inline",
          "themes": [
            "theme",
            "colorMode"
          ],
          "showCode": true
        },
        {
          "id": "sizes",
          "title": "Размеры",
          "description": "Размеры от XS до LG для текстового бейджа.",
          "code": "<><Badge size={Size.XS}>XS</Badge><Badge size={Size.SM}>SM</Badge><Badge size={Size.MD}>MD</Badge><Badge size={Size.LG}>LG</Badge></>",
          "layout": "inline",
          "themes": [
            "theme",
            "colorMode"
          ],
          "showCode": true
        }
      ],
      "variants": [
        {
          "id": "variant-matrix",
          "title": "Варианты",
          "columns": 3,
          "items": [
            {
              "id": "default",
              "title": "Default",
              "code": "<Badge variant={BadgeVariant.DEFAULT}>3</Badge>",
              "description": ""
            },
            {
              "id": "outline",
              "title": "Outline",
              "code": "<Badge variant={BadgeVariant.OUTLINE}>3</Badge>",
              "description": ""
            },
            {
              "id": "warning",
              "title": "Warning",
              "code": "<Badge variant={BadgeVariant.WARNING}>3</Badge>",
              "description": ""
            }
          ]
        }
      ],
      "props": {
        "mode": "autogen",
        "include": [],
        "exclude": [],
        "items": [
          {
            "name": "variant",
            "type": "BadgeVariant",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "size",
            "type": "Size",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "isDot",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "rounded",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "onClick",
            "type": "() => void",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "motionEnabled",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Включить анимации появления, пульса и смены размера (по умолчанию true)",
            "deprecated": false
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "children",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          }
        ]
      }
    },
    {
      "slug": "datagrid",
      "name": "DataGrid",
      "group": "Data Display",
      "status": "beta",
      "since": "0.3.4",
      "description": "Таблица с сортировкой, пагинацией, выбором строк и расширяемой конфигурацией колонок.",
      "examples": [
        {
          "id": "basic-grid",
          "title": "Базовая таблица",
          "description": "Минимальный grid с колонками и строками.",
          "code": "<DataGrid tableId=\"employees-grid\" columns={employeeColumns} rows={employeeRows} totalRows={employeeRows.length} size={Size.MD} />",
          "layout": "block",
          "themes": [
            "theme",
            "colorMode"
          ],
          "showCode": true
        },
        {
          "id": "with-row-selection",
          "title": "Выбор строк",
          "description": "Показывает колонку выбора и множественный выбор.",
          "code": "<DataGrid tableId=\"employees-grid-selection\" columns={employeeColumns} rows={employeeRows} totalRows={employeeRows.length} displayRowSelectionColumn multiselect />",
          "layout": "block",
          "themes": [
            "theme",
            "colorMode"
          ],
          "showCode": true
        }
      ],
      "variants": [],
      "props": {
        "mode": "autogen",
        "include": [],
        "exclude": [],
        "items": [
          {
            "name": "tableId",
            "type": "string",
            "required": true,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "columns",
            "type": "readonly DataGridColumn<Row, ColumnColorKey>[]",
            "required": true,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "rows",
            "type": "readonly Row[]",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "totalRows",
            "type": "number",
            "required": true,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "getRowId",
            "type": "(row: Row) => string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "displayRowSelectionColumn",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "multiselect",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "selectedIds",
            "type": "ReadonlySet<string> | readonly string[]",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "disabledIds",
            "type": "ReadonlySet<string> | readonly string[]",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "onRowSelectionChange",
            "type": "(nextIds: string[], reason: \"row\" | \"header\" | \"clear\") => void",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "onRowClick",
            "type": "(row: Row, event: MouseEvent<HTMLTableRowElement, MouseEvent>) => void",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "onRowDoubleClick",
            "type": "(row: Row, event: MouseEvent<HTMLTableRowElement, MouseEvent>) => void",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "paginationModel",
            "type": "DataGridPaginationModel",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "onPaginationChange",
            "type": "(model: DataGridPaginationModel) => void",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "paginationVariant",
            "type": "\"default\" | \"compact\"",
            "required": false,
            "defaultValue": "",
            "description": "Режим отображения номеров страниц в подвале (`TablePagination`)",
            "deprecated": false
          },
          {
            "name": "paginationToolbarAlign",
            "type": "TablePaginationToolbarAlign",
            "required": false,
            "defaultValue": "",
            "description": "Выравнивание футера пагинации (селект размера страницы + номера страниц)",
            "deprecated": false
          },
          {
            "name": "paginationToolbarReverse",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Обратный порядок элементов в строке футера пагинации",
            "deprecated": false
          },
          {
            "name": "showRowsPerPageSelect",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Показать селект «строк на странице» в подвале (см. `TablePagination`)",
            "deprecated": false
          },
          {
            "name": "showPageJump",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Поле «перейти к странице» слева от плашки страниц",
            "deprecated": false
          },
          {
            "name": "labelPageJump",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Подпись перед полем номера страницы",
            "deprecated": false
          },
          {
            "name": "rowsPerPageSelectVariant",
            "type": "\"default\" | \"compact\"",
            "required": false,
            "defaultValue": "",
            "description": "Сокращённый вид селектора размера страницы",
            "deprecated": false
          },
          {
            "name": "paginationMode",
            "type": "DataGridPaginationMode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "rowsPerPageOptions",
            "type": "number[]",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "sortModel",
            "type": "DataGridSortModel",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "onSortChange",
            "type": "(model: DataGridSortModel) => void",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "multiColumnSort",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Сортировка по нескольким колонкам: модель — массив `DataGridSortCriterion` по приоритету (см. `sortModel`)",
            "deprecated": false
          },
          {
            "name": "stickyHeader",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Липкая шапка при вертикальном скролле.\nБез `scrollAreaMaxHeight` — `position: sticky` у заголовков. С `scrollAreaMaxHeight` — split-layout:\n`headerToolbar` и заголовки колонок вне скролла строк; горизонтально прокручиваются только колонки (синхронизация `scrollLeft` с телом).",
            "deprecated": false
          },
          {
            "name": "scrollAreaMaxHeight",
            "type": "string | number",
            "required": false,
            "defaultValue": "",
            "description": "Макс. высота прокручиваемой области **строк** (`tbody`); число трактуется как пиксели.\nПробрасывается в `TableContainerScroll`. Вместе со `stickyHeader` включает split-layout;\nпагинация остаётся под таблицей, вне вертикального скролла.",
            "deprecated": false
          },
          {
            "name": "horizontalScroll",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Горизонтальный скролл при широкой сетке (`table-layout: fixed` при ресайзе колонок).\n`false` — колонки по ширине карточки. В split-layout горизонтальная полоса только у тела.",
            "deprecated": false
          },
          {
            "name": "tableHeaderVariant",
            "type": "DataGridTableHeaderVariant",
            "required": false,
            "defaultValue": "",
            "description": "Тон фона шапки (`thead`) и панели `headerToolbar`: `default` — `theme.tables.header.background`;\n`card` — `theme.tables.shell.background` (визуально как белая карточка).",
            "deprecated": false
          },
          {
            "name": "tableHeaderBackground",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "Произвольный цвет фона шапки и панели иконок (`headerToolbar`), например `#f5f5f5` или `color-mix(...)`.\nНепустая строка перекрывает `tableHeaderVariant`.",
            "deprecated": false
          },
          {
            "name": "striped",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Зебра в `tbody`; по умолчанию в `DataGrid` включена (`true`). Для фона строк как у карточки — `false`.",
            "deprecated": false
          },
          {
            "name": "columnDividers",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Тонкие вертикальные разделители между колонками; по умолчанию `true` (прокидывается в `Table`)",
            "deprecated": false
          },
          {
            "name": "size",
            "type": "Size",
            "required": false,
            "defaultValue": "",
            "description": "Масштаб строк, шрифтов и контролов выбора",
            "deprecated": false
          },
          {
            "name": "headerMaxLines",
            "type": "number",
            "required": false,
            "defaultValue": "",
            "description": "Максимум строк текста в заголовке каждой колонки данных (сортировка — через `TableSortLabel.maxLines`)",
            "deprecated": false
          },
          {
            "name": "dataStatus",
            "type": "DataGridDataStatus",
            "required": false,
            "defaultValue": "",
            "description": "Статус данных таблицы: `loading`, `ready`, `error`.\nУстаревший `isLoading={true}` эквивалентен `dataStatus=\"loading\"`.",
            "deprecated": false
          },
          {
            "name": "loadingDisplay",
            "type": "DataGridLoadingDisplay",
            "required": false,
            "defaultValue": "",
            "description": "Вариант отображения загрузки: `overlay` (спиннер поверх таблицы) или `skeleton` (строки-заглушки в `tbody`).\nПри `skeleton` и непустых `rows` автоматически используется `overlay`.",
            "deprecated": false
          },
          {
            "name": "skeletonRowCount",
            "type": "number",
            "required": false,
            "defaultValue": "",
            "description": "Число строк-скелетонов при `loadingDisplay=\"skeleton\"`; иначе — `paginationModel.pageSize` или 8.",
            "deprecated": false
          },
          {
            "name": "isLoading",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Устаревший флаг: то же, что `dataStatus=\"loading\"`. Предпочтительно `dataStatus`.",
            "deprecated": false
          },
          {
            "name": "error",
            "type": "unknown",
            "required": false,
            "defaultValue": "",
            "description": "Ошибка загрузки (текст для блока ошибки и `renderErrorState`)",
            "deprecated": false
          },
          {
            "name": "errorStateTitle",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Заголовок встроенного блока ошибки",
            "deprecated": false
          },
          {
            "name": "errorStateDescription",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Пояснение блока ошибки; по умолчанию — сообщение из `error`",
            "deprecated": false
          },
          {
            "name": "onRetry",
            "type": "() => void",
            "required": false,
            "defaultValue": "",
            "description": "Повтор запроса: кнопка в блоке ошибки; если не задан, но есть `refetch`, используется он",
            "deprecated": false
          },
          {
            "name": "errorStateRetryLabel",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Подпись кнопки повтора в блоке ошибки",
            "deprecated": false
          },
          {
            "name": "renderErrorState",
            "type": "(error: unknown, retry?: () => void) => ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Кастомный блок ошибки вместо встроенного (`error`, `onRetry` / `refetch`)",
            "deprecated": false
          },
          {
            "name": "renderLoadingOverlay",
            "type": "() => ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Кастомный оверлей при `loadingDisplay=\"overlay\"`",
            "deprecated": false
          },
          {
            "name": "statusMessage",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Информационное сообщение над строками (при `dataStatus=\"ready\"`).\nДля полного контроля — `renderStatusMessage`.",
            "deprecated": false
          },
          {
            "name": "statusMessageVariant",
            "type": "DataGridStatusMessageVariant",
            "required": false,
            "defaultValue": "",
            "description": "Тон полосы `statusMessage`: `info`, `warning`, `success`",
            "deprecated": false
          },
          {
            "name": "renderStatusMessage",
            "type": "() => ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Свой рендер полосы сообщения над данными",
            "deprecated": false
          },
          {
            "name": "rowBackgroundColorByStatus",
            "type": "(row: Row) => string",
            "required": false,
            "defaultValue": "",
            "description": "Цвет фона строки; например по статусу из `row` (возвращает CSS-цвет)",
            "deprecated": false
          },
          {
            "name": "rowColorMap",
            "type": "Readonly<Partial<Record<RowColorKey, TableColorResolver>>>",
            "required": false,
            "defaultValue": "",
            "description": "Карта ключ → цвет фона строки. В `rows` передаётся ключ (`rowColor` по умолчанию),\nзначение резолвится через эту карту и палитру UI-kit.",
            "deprecated": false
          },
          {
            "name": "rowColorField",
            "type": "string | keyof Row",
            "required": false,
            "defaultValue": "",
            "description": "Имя поля строки с ключом цвета (по умолчанию `rowColor`).\nИспользуется после `rowBackgroundColorByStatus`, если тот не вернул цвет.",
            "deprecated": false
          },
          {
            "name": "columnColorMap",
            "type": "Readonly<Partial<Record<ColumnColorKey, TableColorResolver>>>",
            "required": false,
            "defaultValue": "",
            "description": "Карта ключ → цвет фона колонки. В `columns[].columnColor` передаётся ключ,\nзначение резолвится через эту карту и палитру UI-kit.",
            "deprecated": false
          },
          {
            "name": "expandedRowIds",
            "type": "ReadonlySet<string> | readonly string[]",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "getRowExpandable",
            "type": "(row: Row) => boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "getExpandedRowDataStatus",
            "type": "(row: Row) => DataGridExpandedRowDataStatus",
            "required": false,
            "defaultValue": "",
            "description": "Статус данных под раскрывающейся строкой. Если не задан, подстрока считается в состоянии `ready`,\nлибо загрузкой управляет только `getExpandedRowLoading`.",
            "deprecated": false
          },
          {
            "name": "getExpandedRowLoading",
            "type": "(row: Row) => boolean",
            "required": false,
            "defaultValue": "",
            "description": "Загрузка только области раскрытия (не перекрывает всю таблицу, в отличие от `isLoading`).\nИгнорируется, если передан `getExpandedRowDataStatus`.",
            "deprecated": false
          },
          {
            "name": "onExpandedRowOpen",
            "type": "(row: Row) => void",
            "required": false,
            "defaultValue": "",
            "description": "Вызывается при развороте строки (удобно запустить ленивую подгрузку по `row.id`)",
            "deprecated": false
          },
          {
            "name": "onExpandedRowChange",
            "type": "(params: DataGridExpandedRowChangeParams) => void",
            "required": false,
            "defaultValue": "",
            "description": "Клик по кнопке раскрытия строки: уведомление родителя о новом состоянии.\nВ `params` передаются `rowId`, флаг `expanded` для этой строки и полный массив `expandedIds` после операции.\nПри контролируемом `expandedRowIds` обновляйте состояние родителя из этого колбэка; при неконтролируемом (`expandedRowIds` не передан)\nвнутренний набор раскрытых строк обновит сам `DataGrid` после вызова колбэка.\nСтарое имя `onRowCollapseChange` удалено — используйте только этот колбэк.",
            "deprecated": false
          },
          {
            "name": "renderExpandedRow",
            "type": "(row: Row, context: DataGridExpandedRowRenderContext) => ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "renderRowWrapper",
            "type": "(params: DataGridRenderRowWrapperParams<Row>) => ReactElement<unknown, string | JSXElementConstructor<any>>",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "renderCell",
            "type": "(params: DataGridRenderCellParams<Row>) => ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "enableColumnDrag",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "onColumnDragStart",
            "type": "(params: DataGridColumnDragStartParams) => void",
            "required": false,
            "defaultValue": "",
            "description": "Старт перетаскивания заголовка (индекс и поле колонки)",
            "deprecated": false
          },
          {
            "name": "onColumnDragEnd",
            "type": "(fromIndex: number, toIndex: number) => void",
            "required": false,
            "defaultValue": "",
            "description": "Успешный drop: индексы в текущем порядке `columns` до перестройки массива родителем",
            "deprecated": false
          },
          {
            "name": "onColumnOrderChange",
            "type": "(params: DataGridColumnOrderChangeParams) => void",
            "required": false,
            "defaultValue": "",
            "description": "То же перемещение, что и `onColumnDragEnd`, плюс `field` переносимой колонки",
            "deprecated": false
          },
          {
            "name": "onColumnDragCancel",
            "type": "() => void",
            "required": false,
            "defaultValue": "",
            "description": "Drag колонки завершён без смены позиции (drop на ту же колонку или отпускание вне цели)",
            "deprecated": false
          },
          {
            "name": "enableColumnResize",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Ручка на правом краю заголовка колонки; ширину храните в `columns[].width`, обновляя по `onColumnResize`.\nВключает у `<table>` раскладку `table-layout: fixed`, чтобы при перетаскивании не пересчитывались ширины остальных колонок; для предсказуемости задавайте `width` данным колонкам.",
            "deprecated": false
          },
          {
            "name": "onColumnResizeStart",
            "type": "(params: DataGridColumnResizeProgressParams) => void",
            "required": false,
            "defaultValue": "",
            "description": "Начало жеста: исходная ширина в px",
            "deprecated": false
          },
          {
            "name": "onColumnResizeChange",
            "type": "(params: DataGridColumnResizeProgressParams) => void",
            "required": false,
            "defaultValue": "",
            "description": "Перетаскивание ручки: предпросмотр ширины в px",
            "deprecated": false
          },
          {
            "name": "onColumnResize",
            "type": "(params: DataGridColumnResizeParams) => void",
            "required": false,
            "defaultValue": "",
            "description": "Вызывается после отпускания ручки; передайте обновлённые `columns` с новым `width` (число px)",
            "deprecated": false
          },
          {
            "name": "onColumnResizeEnd",
            "type": "(params: DataGridColumnResizeEndParams) => void",
            "required": false,
            "defaultValue": "",
            "description": "Конец жеста: `committed` — отпускание без отмены (`pointerup`); `onColumnResize` вызывается только при `committed && onColumnResize`",
            "deprecated": false
          },
          {
            "name": "columnResizeMaxWidthPx",
            "type": "number",
            "required": false,
            "defaultValue": "",
            "description": "Верхняя граница ширины при ресайзе (по умолчанию 2000px)",
            "deprecated": false
          },
          {
            "name": "enableRowDrag",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "onRowDragStart",
            "type": "(params: DataGridRowDragStartParams) => void",
            "required": false,
            "defaultValue": "",
            "description": "Старт перетаскивания строки за ручку (индекс на текущей странице и id строки)",
            "deprecated": false
          },
          {
            "name": "onRowDragEnd",
            "type": "(orderedIds: string[]) => void",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "onRowDragCancel",
            "type": "() => void",
            "required": false,
            "defaultValue": "",
            "description": "Drop на ту же строку или отпускание вне цели без смены порядка",
            "deprecated": false
          },
          {
            "name": "onColumnFilterClick",
            "type": "(params: DataGridColumnFilterClickParams) => void",
            "required": false,
            "defaultValue": "",
            "description": "Клик по кнопке фильтра у колонки с `filterable: true`",
            "deprecated": false
          },
          {
            "name": "headerToolbar",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Слот «подшапки»: строка в `thead` **выше** строки с названиями колонок; одна ячейка на всю ширину (`colSpan`).\nПередавайте ряд `IconButton`, группы действий и т.п. (настройки, экспорт, история изменений, документация).\nВ split-layout (`scrollAreaMaxHeight`) панель фиксирована по ширине карточки и не участвует в горизонтальном скролле колонок.",
            "deprecated": false
          },
          {
            "name": "headerToolbarAlign",
            "type": "\"center\" | \"start\" | \"end\" | \"space-between\"",
            "required": false,
            "defaultValue": "",
            "description": "Выравнивание содержимого `headerToolbar` по горизонтали (`justify-content` у flex-контейнера).",
            "deprecated": false
          },
          {
            "name": "headerToolbarAriaLabel",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "Краткая подпись для доступности (`aria-label` у контейнера с `role=\"toolbar\"`).\nЕсли не задана, используется нейтральная подпись по умолчанию в компоненте.",
            "deprecated": false
          },
          {
            "name": "refetch",
            "type": "() => void | Promise<void>",
            "required": false,
            "defaultValue": "",
            "description": "Обновление данных: при передаче в `headerToolbar` показывается кнопка с иконкой обновления.",
            "deprecated": false
          },
          {
            "name": "isRefetching",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Состояние загрузки для кнопки `refetch` (`loading` у **IconButton**)",
            "deprecated": false
          },
          {
            "name": "onResetFilters",
            "type": "() => void",
            "required": false,
            "defaultValue": "",
            "description": "Сброс всех фильтров: при передаче в `headerToolbar` показывается кнопка-фильтр.\nПодсветка «фильтры применены» — через `hasActiveFilters`.\nПеред вызовом колбэка показывается модалка подтверждения (**Modal**).",
            "deprecated": false
          },
          {
            "name": "hasActiveFilters",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Есть ли применённые фильтры (заливка кнопки сброса, как `filterApplied` у колонки)",
            "deprecated": false
          },
          {
            "name": "resetFiltersConfirmTexts",
            "type": "{ title?: string; description?: string; confirmLabel?: string; cancelLabel?: string; }",
            "required": false,
            "defaultValue": "",
            "description": "Тексты модалки подтверждения сброса фильтров (`title`, `description`, `confirmLabel`, `cancelLabel`).\nЕсли не заданы — используются значения по умолчанию на русском языке.",
            "deprecated": false
          },
          {
            "name": "excelExport",
            "type": "DataGridExcelExportConfig<Row>",
            "required": false,
            "defaultValue": "",
            "description": "Выгрузка в Excel (`.xls`, SpreadsheetML без внешних библиотек).\nПри передаче `dataFetcher` в `headerToolbar` показывается кнопка; по клику — модалка диапазона страниц.",
            "deprecated": false
          },
          {
            "name": "emptyStateTitle",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Заголовок пустого состояния (`rows` пустой или не передан); по умолчанию «Ничего не найдено»",
            "deprecated": false
          },
          {
            "name": "emptyStateDescription",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Пояснение пустого состояния; по умолчанию «По заданным критериям ничего не найдено»",
            "deprecated": false
          },
          {
            "name": "renderEmptyState",
            "type": "() => ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Полностью свой блок пустого состояния вместо встроенного",
            "deprecated": false
          },
          {
            "name": "hideFooter",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "elevated",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "shellVariant",
            "type": "TableShellVariant",
            "required": false,
            "defaultValue": "",
            "description": "`embedded` — без бордера и фона оболочки (вложение в **Card** с `padding`; у грида `elevated={false}`).",
            "deprecated": false
          },
          {
            "name": "shellInset",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Внутренние отступы оболочки на белом фоне (см. `TableContainer.shellInset`).\nПрокидывается в `TableContainer`.",
            "deprecated": false
          },
          {
            "name": "shellInsetPadding",
            "type": "string | number",
            "required": false,
            "defaultValue": "",
            "description": "Внутренний отступ вокруг блока с сеткой (число — px)",
            "deprecated": false
          },
          {
            "name": "surfaceBackgrounds",
            "type": "TableSurfaceBackgroundsInput",
            "required": false,
            "defaultValue": "",
            "description": "Прозрачные фоны по частям таблицы или `'transparent'` для всех поверхностей.\nУдобно, когда таблица должна принять фон родительского контейнера.",
            "deprecated": false
          },
          {
            "name": "tableAriaLabel",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "style",
            "type": "CSSProperties",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "children",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          }
        ]
      }
    },
    {
      "slug": "alert",
      "name": "Alert",
      "group": "Feedback",
      "status": "stable",
      "since": "0.3.4",
      "description": "Inline-уведомления с severity, action и управлением закрытием.",
      "examples": [
        {
          "id": "basic-success",
          "title": "Базовый success",
          "description": "Минимальная конфигурация уведомления.",
          "code": "<Alert severity=\"success\" title=\"Успешно\">Операция выполнена.</Alert>",
          "layout": "block",
          "themes": [
            "theme",
            "colorMode",
            "contrast"
          ],
          "showCode": true
        },
        {
          "id": "filled-error-close",
          "title": "Filled + close",
          "description": "Вариант filled с кнопкой закрытия.",
          "code": "<Alert severity=\"error\" variant=\"filled\" onClose={() => undefined}>Ошибка сохранения.</Alert>",
          "layout": "block",
          "themes": [
            "theme",
            "colorMode"
          ],
          "showCode": true
        },
        {
          "id": "with-action",
          "title": "Со slot action",
          "description": "Кнопка действия в Alert для быстрых сценариев undo/retry.",
          "code": "<Alert severity=\"info\" action={<Button variant={ButtonVariant.GHOST} size={Size.SM}>Подробнее</Button>}>Найдено обновление.</Alert>",
          "layout": "block",
          "themes": [
            "theme",
            "colorMode"
          ],
          "showCode": true
        }
      ],
      "variants": [
        {
          "id": "severity-matrix",
          "title": "Severity",
          "columns": 2,
          "items": [
            {
              "id": "success",
              "title": "Success",
              "code": "<Alert severity=\"success\">Success</Alert>",
              "description": ""
            },
            {
              "id": "info",
              "title": "Info",
              "code": "<Alert severity=\"info\">Info</Alert>",
              "description": ""
            },
            {
              "id": "warning",
              "title": "Warning",
              "code": "<Alert severity=\"warning\">Warning</Alert>",
              "description": ""
            },
            {
              "id": "error",
              "title": "Error",
              "code": "<Alert severity=\"error\">Error</Alert>",
              "description": ""
            }
          ]
        }
      ],
      "props": {
        "mode": "autogen",
        "include": [],
        "exclude": [],
        "items": [
          {
            "name": "severity",
            "type": "AlertSeverity",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "variant",
            "type": "AlertVariant",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "color",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "title",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "children",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "icon",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "iconMapping",
            "type": "Partial<Record<AlertSeverity, ReactNode>>",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "action",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "actionPlacement",
            "type": "AlertActionPlacement",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "onClose",
            "type": "(event: MouseEvent<HTMLButtonElement, MouseEvent>) => void",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "closeAriaLabel",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "role",
            "type": "AlertRole",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "size",
            "type": "Size",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "fullWidth",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          }
        ]
      }
    },
    {
      "slug": "dateinput",
      "name": "DateInput",
      "group": "Inputs",
      "status": "beta",
      "since": "0.3.4",
      "description": "Поле выбора даты/диапазона с форматами precision и календарным popover.",
      "examples": [
        {
          "id": "single-date",
          "title": "Одиночная дата",
          "description": "Базовый сценарий выбора одной даты.",
          "code": "<DateInput label=\"Дата\" value=\"2026-08-15\" onChange={() => undefined} />",
          "layout": "block",
          "themes": [
            "theme",
            "colorMode"
          ],
          "showCode": true
        },
        {
          "id": "date-range",
          "title": "Диапазон дат",
          "description": "Range-режим с объектом start/end.",
          "code": "<DateInput range value={{ start: \"2026-08-10\", end: \"2026-08-15\" }} onChange={() => undefined} />",
          "layout": "block",
          "themes": [
            "theme",
            "colorMode"
          ],
          "showCode": true
        },
        {
          "id": "month-precision",
          "title": "Точность month",
          "description": "Режим выбора месяца с форматом YYYY-MM.",
          "code": "<DateInput precision=\"month\" value=\"2026-08\" onChange={() => undefined} size={Size.MD} />",
          "layout": "block",
          "themes": [
            "theme",
            "colorMode"
          ],
          "showCode": true
        }
      ],
      "variants": [],
      "props": {
        "mode": "autogen",
        "include": [],
        "exclude": [],
        "items": [
          {
            "name": "value",
            "type": "string | DateTimeRange",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "onChange",
            "type": "(value: string | DateTimeRange) => void",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "size",
            "type": "Size",
            "required": false,
            "defaultValue": "",
            "description": "Размер поля (в `DateInput` по умолчанию `Size.SM`)",
            "deprecated": false
          },
          {
            "name": "precision",
            "type": "DateInputPrecision",
            "required": false,
            "defaultValue": "",
            "description": "Точность выбора. По умолчанию `day` — полный календарь.\n`month` / `year` / `monthYear` / `week` убирают сетку дней и меняют строку `onChange`.",
            "deprecated": false
          },
          {
            "name": "weekOfMonthMode",
            "type": "WeekOfMonthMode",
            "required": false,
            "defaultValue": "",
            "description": "Нумерация недель при `precision=\"week\"`.\nПо умолчанию `calendar` — недели с понедельника; `chunks` — 1–7, 8–14, …",
            "deprecated": false
          },
          {
            "name": "range",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "minDate",
            "type": "Date",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "maxDate",
            "type": "Date",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "showIcon",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "icon",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "renderTopPanel",
            "type": "() => ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "renderBottomPanel",
            "type": "() => ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "status",
            "type": "\"error\" | \"success\" | \"warning\"",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "disabledDates",
            "type": "Date[]",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "disabledDays",
            "type": "number[]",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "disabledMonths",
            "type": "number[]",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "disabledYears",
            "type": "number[]",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "segmented",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "format",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "showDateRollers",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Роллеры день/месяц/год над сеткой в попапе (макет Figma)",
            "deprecated": false
          },
          {
            "name": "calendarMonthYearLayout",
            "type": "CalendarMonthYearLayout",
            "required": false,
            "defaultValue": "",
            "description": "Два триггера «месяц» и «год» в шапке календаря вместо одного списка",
            "deprecated": false
          },
          {
            "name": "calendarFullWidth",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Растянуть выпадающий календарь на ширину поля ввода",
            "deprecated": false
          },
          {
            "name": "prefix",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Слот слева от поля даты в одной рамке (как `Input.prefix`).",
            "deprecated": false
          },
          {
            "name": "suffix",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Слот справа от поля даты в одной рамке (как `Input.suffix`).",
            "deprecated": false
          },
          {
            "name": "onPickerChange",
            "type": "(draft: string | DateTimeRange, context: DatePickerDraftContext) => void",
            "required": false,
            "defaultValue": "",
            "description": "Изменения в календаре до записи в `onChange` поля.\nДля диапазона — при каждом выборе дня; для одиночной даты — если включён отложенный коммит.",
            "deprecated": false
          },
          {
            "name": "modifyPickerValue",
            "type": "(draft: string | DateTimeRange, context: DatePickerDraftContext) => string | DateTimeRange",
            "required": false,
            "defaultValue": "",
            "description": "Модификатор черновика пикера (например, сдвинуть конец диапазона от начала).\nВерните новое значение или `undefined`, чтобы оставить черновик без изменений.",
            "deprecated": false
          },
          {
            "name": "deferPickerCommit",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Не применять выбор календаря к полю до «Применить» / «OK».\nПо умолчанию `true`, если задан `onPickerChange` или `modifyPickerValue`.",
            "deprecated": false
          },
          {
            "name": "labelVariant",
            "type": "InputLabelVariant",
            "required": false,
            "defaultValue": "",
            "description": "Режим `label`. По умолчанию `field` — те же токены и геометрия, что у `Input` / `Select`\n(без `padding-top: 10px` на корне).\n`floating` сохраняет прежний absolute-лейбл; резерв `padding-top: 10px` только при\nпереданном `label` / `additionalLabel`.",
            "deprecated": false
          },
          {
            "name": "readOnly",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "required",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "label",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "error",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "success",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "helperText",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "fullWidth",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "autoWidth",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Ширина по содержимому; игнорируется, если задан `fullWidth`",
            "deprecated": false
          },
          {
            "name": "displayClearIcon",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "onClearIconClick",
            "type": "() => void",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "clearIconProps",
            "type": "Partial<{ name: \"PhosphorRecycle\" | \"PhosphorCaretDoubleLeft\" | \"PhosphorCaretLeft\" | \"PhosphorCaretRight\" | \"PhosphorCaretUp\" | \"PhosphorCaretDown\" | \"PhosphorArrowArcLeft\" | \"PhosphorArrowFatLineRight\" | ... 200 more ... | \"IconPlainerClock\"; size: IconSize; color: string; className: string; }>",
            "required": false,
            "defaultValue": "",
            "description": "Частичные пропсы `Icon` для иконки очистки при `displayClearIcon`.\nМерж поверх значений по умолчанию в конкретном поле (имя иконки, `size`, опционально `color`).",
            "deprecated": false
          },
          {
            "name": "textAlign",
            "type": "TextAlign",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "isLoading",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "skeleton",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "handleInput",
            "type": "(value: string, cursorPosition: number) => { value: string; cursorPosition: number; }",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "disableCopying",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "extraText",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "tooltip",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "tooltipType",
            "type": "\"tooltip\" | \"hint\"",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "tooltipPosition",
            "type": "\"left\" | \"right\" | \"top\" | \"bottom\"",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "displayCharacterCounter",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "ignoreMaskCharacters",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "characterCounterVisibilityThreshold",
            "type": "number",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "additionalLabel",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          }
        ]
      }
    },
    {
      "slug": "input",
      "name": "Input",
      "group": "Inputs",
      "status": "stable",
      "since": "0.3.4",
      "description": "Текстовое поле с лейблом, статусами, иконками и настройками поведения.",
      "examples": [
        {
          "id": "default",
          "title": "Базовое поле",
          "description": "Минимальный сценарий для ввода строки.",
          "code": "<Input label=\"Email\" placeholder=\"name@example.com\" fullWidth />",
          "layout": "block",
          "themes": [
            "theme",
            "colorMode"
          ],
          "showCode": true
        },
        {
          "id": "error-state",
          "title": "Ошибка валидации",
          "description": "Показ статуса ошибки и текста подсказки.",
          "code": "<Input label=\"Email\" value=\"bad-mail\" error=\"Некорректный формат\" fullWidth readOnly />",
          "layout": "block",
          "themes": [
            "theme",
            "colorMode",
            "contrast"
          ],
          "showCode": true
        },
        {
          "id": "with-icons",
          "title": "С иконками",
          "description": "Префикс и суффикс через leftIcon/rightIcon.",
          "code": "<Input label=\"Поиск\" leftIcon={<Icon name=\"IconExSearch\" size={IconSize.MD} />} rightIcon={<Icon name=\"IconPlainerClose\" size={IconSize.MD} />} value=\"PlainerV\" readOnly />",
          "layout": "block",
          "themes": [
            "theme",
            "colorMode"
          ],
          "showCode": true
        }
      ],
      "variants": [
        {
          "id": "size-matrix",
          "title": "Размеры",
          "columns": 3,
          "items": [
            {
              "id": "sm",
              "title": "SM",
              "code": "<Input label=\"SM\" size={Size.SM} />",
              "description": ""
            },
            {
              "id": "md",
              "title": "MD",
              "code": "<Input label=\"MD\" size={Size.MD} />",
              "description": ""
            },
            {
              "id": "lg",
              "title": "LG",
              "code": "<Input label=\"LG\" size={Size.LG} />",
              "description": ""
            }
          ]
        }
      ],
      "props": {
        "mode": "autogen",
        "include": [],
        "exclude": [],
        "items": [
          {
            "name": "variant",
            "type": "TextInputVariant",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "size",
            "type": "Size",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "leftIcon",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "rightIcon",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "prefix",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Слот слева от `<input>` внутри общей рамки (составное поле).",
            "deprecated": false
          },
          {
            "name": "suffix",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Слот справа от `<input>` внутри общей рамки (составное поле).",
            "deprecated": false
          },
          {
            "name": "status",
            "type": "\"error\" | \"success\" | \"warning\"",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "label",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "error",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "success",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "helperText",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "required",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "fullWidth",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "autoWidth",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Ширина по содержимому; игнорируется, если задан `fullWidth`",
            "deprecated": false
          },
          {
            "name": "displayClearIcon",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "onClearIconClick",
            "type": "() => void",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "clearIconProps",
            "type": "Partial<{ name: \"PhosphorRecycle\" | \"PhosphorCaretDoubleLeft\" | \"PhosphorCaretLeft\" | \"PhosphorCaretRight\" | \"PhosphorCaretUp\" | \"PhosphorCaretDown\" | \"PhosphorArrowArcLeft\" | \"PhosphorArrowFatLineRight\" | ... 200 more ... | \"IconPlainerClock\"; size: IconSize; color: string; className: string; }>",
            "required": false,
            "defaultValue": "",
            "description": "Частичные пропсы `Icon` для иконки очистки при `displayClearIcon`.\nМерж поверх значений по умолчанию в конкретном поле (имя иконки, `size`, опционально `color`).",
            "deprecated": false
          },
          {
            "name": "textAlign",
            "type": "TextAlign",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "readOnly",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "isLoading",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "skeleton",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "handleInput",
            "type": "(value: string, cursorPosition: number) => { value: string; cursorPosition: number; }",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "disableCopying",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "extraText",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "tooltip",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "tooltipType",
            "type": "\"tooltip\" | \"hint\"",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "tooltipPosition",
            "type": "\"left\" | \"right\" | \"top\" | \"bottom\"",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "displayCharacterCounter",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "ignoreMaskCharacters",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "characterCounterVisibilityThreshold",
            "type": "number",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "additionalLabel",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          }
        ]
      }
    },
    {
      "slug": "select",
      "name": "Select",
      "group": "Inputs",
      "status": "stable",
      "since": "0.3.4",
      "description": "Поле выбора в режимах select/searchSelect/native с поддержкой single/multiple.",
      "examples": [
        {
          "id": "single-default",
          "title": "Одиночный выбор",
          "description": "Базовый select с опциями и placeholder.",
          "code": "<Select label=\"Язык\" options={languageOptions} placeholder=\"Выберите язык\" />",
          "layout": "block",
          "themes": [
            "theme",
            "colorMode"
          ],
          "showCode": true
        },
        {
          "id": "multiple",
          "title": "Множественный выбор",
          "description": "Multiple-режим с набором выбранных значений.",
          "code": "<Select label=\"Языки\" options={languageOptions} multiple defaultValue={[\"ru\", \"en\"]} />",
          "layout": "block",
          "themes": [
            "theme",
            "colorMode"
          ],
          "showCode": true
        },
        {
          "id": "search-select",
          "title": "SearchSelect",
          "description": "Режим поиска в поле-триггере.",
          "code": "<Select mode=\"searchSelect\" label=\"Город\" options={languageOptions} placeholder=\"Начните ввод\" />",
          "layout": "block",
          "themes": [
            "theme",
            "colorMode"
          ],
          "showCode": true
        }
      ],
      "variants": [
        {
          "id": "size-matrix",
          "title": "Размеры",
          "columns": 2,
          "items": [
            {
              "id": "sm",
              "title": "SM",
              "code": "<Select size={Size.SM} options={languageOptions} placeholder=\"SM\" />",
              "description": ""
            },
            {
              "id": "md",
              "title": "MD",
              "code": "<Select size={Size.MD} options={languageOptions} placeholder=\"MD\" />",
              "description": ""
            }
          ]
        }
      ],
      "props": {
        "mode": "autogen",
        "include": [],
        "exclude": [],
        "items": [
          {
            "name": "options",
            "type": "SelectOption[]",
            "required": true,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "label",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "placeholder",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "value",
            "type": "string | string[]",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "defaultValue",
            "type": "string | string[]",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "error",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "success",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "status",
            "type": "\"error\" | \"success\" | \"warning\"",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "helperText",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "required",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "fullWidth",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "autoWidth",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Ширина по содержимому (`auto`), без фиксированных 335px.\nПри одновременном `fullWidth` побеждает `fullWidth`.",
            "deprecated": false
          },
          {
            "name": "embeddedInCompositeField",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Встроенный слот в составном `Input` (`prefix` / `suffix`): без label, helper и собственной рамки;\nрамка и статусы задаёт родительский Input.",
            "deprecated": false
          },
          {
            "name": "readOnly",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "skeleton",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "size",
            "type": "Size",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "textAlign",
            "type": "\"left\" | \"center\" | \"right\"",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "isLoading",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "tooltip",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "tooltipType",
            "type": "\"tooltip\" | \"hint\"",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "tooltipPosition",
            "type": "\"left\" | \"right\" | \"top\" | \"bottom\"",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "additionalLabel",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "extraText",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "onFocus",
            "type": "FocusEventHandler<HTMLDivElement>",
            "required": false,
            "defaultValue": "",
            "description": "Фокус на оболочке комбобокса (`Dropdown`) или нативного поля (`InputWrapper` вокруг `select`): событие с `currentTarget` как у `HTMLDivElement`.",
            "deprecated": false
          },
          {
            "name": "onBlur",
            "type": "FocusEventHandler<HTMLDivElement>",
            "required": false,
            "defaultValue": "",
            "description": "Потеря фокуса на оболочке (аналогично `onFocus`)",
            "deprecated": false
          },
          {
            "name": "mode",
            "type": "\"native\" | \"select\" | \"searchSelect\"",
            "required": false,
            "defaultValue": "",
            "description": "`select` — панель `Dropdown`; `searchSelect` — поиск в триггере (single или `multiple`); `native` — системный `select`",
            "deprecated": false
          },
          {
            "name": "searchable",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "В `mode=\"select\"`: поле поиска в панели (по умолчанию `true`). В `searchSelect` не используется",
            "deprecated": false
          },
          {
            "name": "searchPlaceholder",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "В `mode=\"select\"`: плейсхолдер поиска в панели. В `searchSelect`: плейсхолдер у поля ввода в триггере",
            "deprecated": false
          },
          {
            "name": "searchValue",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "Контролируемая строка поиска: в `searchSelect` — текст в поле при открытом меню; в `select` — строка в панели `Dropdown`",
            "deprecated": false
          },
          {
            "name": "defaultSearchValue",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "onSearch",
            "type": "(query: string, searchFormat?: SearchFormat) => void",
            "required": false,
            "defaultValue": "",
            "description": "Ввод в строку поиска (`searchSelect` — в триггере; `select` — в панели при `searchable`); второй аргумент — текущий `searchFormat`",
            "deprecated": false
          },
          {
            "name": "onInputChange",
            "type": "ChangeEventHandler<HTMLInputElement, Element>",
            "required": false,
            "defaultValue": "",
            "description": "Событие `change` внутреннего `HTMLInputElement` поиска (триггер `searchSelect` или поле в панели `select`)",
            "deprecated": false
          },
          {
            "name": "searchFilter",
            "type": "(query: string, item: DropdownMenuItemProps) => boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "searchFormat",
            "type": "SearchFormat",
            "required": false,
            "defaultValue": "",
            "description": "Встроенный поиск в панели и в `searchSelect`: `wholly` — подстрока целиком; `word` — по отдельным словам",
            "deprecated": false
          },
          {
            "name": "clearInputValueAfterSelect",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Только `mode=\"searchSelect\"`: после выбора опции из списка сбрасывать текст в поле-триггере (через `setEffectiveSearchQuery('')` / `onSearch('', …)`).\nПри контролируемом `searchValue` родитель должен обновить строку до `''`.",
            "deprecated": false
          },
          {
            "name": "dropdownVariant",
            "type": "\"default\" | \"elevated\" | \"outlined\"",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "menuMaxHeight",
            "type": "string | number",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "virtualScroll",
            "type": "DropdownVirtualScrollConfig",
            "required": false,
            "defaultValue": "",
            "description": "Виртуальный скролл списка в панели (`Dropdown`): фиксированная высота строки или `'auto'` по размерам пункта из темы для текущего `size`.",
            "deprecated": false
          },
          {
            "name": "dropdownInline",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Прокидывается в `Dropdown.inline`",
            "deprecated": false
          },
          {
            "name": "renderTopPanel",
            "type": "(props: DropdownTopPanelProps) => ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Панель над списком опций в выпадающем меню (как у `Dropdown.renderTopPanel`)",
            "deprecated": false
          },
          {
            "name": "renderBottomPanel",
            "type": "(props: DropdownTopPanelProps) => ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Панель под списком опций в выпадающем меню (как у `Dropdown.renderBottomPanel`; подвал «Выбрать все» при `multiple` добавляется ниже)",
            "deprecated": false
          },
          {
            "name": "showMultiSelectionCountBadge",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "При `multiple` в панельных режимах (`select`, `searchSelect`): бейдж с числом выбранных слева от шеврона.\nПо умолчанию `true`; передайте `false`, чтобы скрыть.",
            "deprecated": false
          },
          {
            "name": "showMultiSelectAll",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "При `multiple` в панели: кнопка «Выбрать все» внизу (только опции без `disabled`).\nПо умолчанию включена; передайте `false`, чтобы скрыть.",
            "deprecated": false
          },
          {
            "name": "showCheckbox",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "При `multiple` в панели: чекбоксы у пунктов выпадающего списка (как у `Dropdown.showCheckbox`).\nПо умолчанию `true`; передайте `false`, чтобы оставить мультивыбор по клику без чекбоксов.",
            "deprecated": false
          },
          {
            "name": "treeExpandable",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Вложенные `options` у опций: дерево в панели, каскадный мультивыбор и раскрытие веток (пропсы как у `Dropdown`).",
            "deprecated": false
          },
          {
            "name": "treeDefaultExpanded",
            "type": "string[] | \"expanded\" | \"collapsed\"",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "treeExpandedKeys",
            "type": "string[]",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "onTreeExpandedKeysChange",
            "type": "(keys: string[]) => void",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "moveSelectedOnTop",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Панельные режимы: выбранные опции показывать вверху списка (`reorder` по `value`).\nПо умолчанию при `multiple` — `true` (прежнее поведение); при одиночном выборе по умолчанию порядок как в `options`, пока явно не передать `true`.",
            "deprecated": false
          },
          {
            "name": "displayClearIcon",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Показывать кнопку сброса значения (крестик в триггере, как `displayClearIcon` у полей из `BaseInputProps`).\nНе показывается при `multiple`, если уже видна кнопка очистки всех чипов.",
            "deprecated": false
          },
          {
            "name": "onClearIconClick",
            "type": "() => void",
            "required": false,
            "defaultValue": "",
            "description": "Колбэк по клику на крестик очистки (после сброса `value` и строки поиска в `searchSelect`)",
            "deprecated": false
          },
          {
            "name": "isMenuOpen",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Контролируемое состояние открытия выпадающей панели (как `Dropdown.isMenuOpen`).\nЕсли не передано — используется внутреннее состояние.",
            "deprecated": false
          },
          {
            "name": "onMenuOpenChange",
            "type": "(isOpen: boolean) => void",
            "required": false,
            "defaultValue": "",
            "description": "Колбэк смены открытости панели (как `Dropdown.onMenuOpenChange`).\nПри контролируемом режиме (`isMenuOpen` задан) обязателен для реакции на клики и закрытие снаружи.",
            "deprecated": false
          },
          {
            "name": "onOpenMenu",
            "type": "() => void",
            "required": false,
            "defaultValue": "",
            "description": "Панель выбора открыта (`mode=\"select\"` | `searchSelect`)",
            "deprecated": false
          },
          {
            "name": "onCloseMenu",
            "type": "() => void",
            "required": false,
            "defaultValue": "",
            "description": "Панель выбора закрыта",
            "deprecated": false
          },
          {
            "name": "onScrollMenu",
            "type": "(info: DropdownMenuScrollInfo) => void",
            "required": false,
            "defaultValue": "",
            "description": "Прокрутка списка опций в панели",
            "deprecated": false
          },
          {
            "name": "onMenuLoadMore",
            "type": "(context: DropdownMenuLoadMoreContext) => void | Promise<void>",
            "required": false,
            "defaultValue": "",
            "description": "Ленивая догрузка опций при приближении к низу списка: якорь — последняя строка текущего плоского списка\n(`anchorFlatIndex`, `anchorValue`, опционально `anchorId` из `SelectOption.id`).\nПосле обновления `options` скролл компенсируется по дельте высоты (меню не закрывается).",
            "deprecated": false
          },
          {
            "name": "menuLoadMoreThresholdPx",
            "type": "number",
            "required": false,
            "defaultValue": "",
            "description": "Порог в px до нижней границы прокрутки для вызова `onMenuLoadMore` (по умолчанию 80)",
            "deprecated": false
          },
          {
            "name": "menuHasMore",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Передайте `false`, когда догружать больше нечего",
            "deprecated": false
          },
          {
            "name": "menuIsLoadingMore",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Пока `true`, внутренний порог не вызывает повторный `onMenuLoadMore`",
            "deprecated": false
          },
          {
            "name": "openMenuIconProps",
            "type": "Partial<{ name: \"PhosphorRecycle\" | \"PhosphorCaretDoubleLeft\" | \"PhosphorCaretLeft\" | \"PhosphorCaretRight\" | \"PhosphorCaretUp\" | \"PhosphorCaretDown\" | \"PhosphorArrowArcLeft\" | \"PhosphorArrowFatLineRight\" | ... 200 more ... | \"IconPlainerClock\"; size: IconSize; color: string; className: string; }>",
            "required": false,
            "defaultValue": "",
            "description": "Пропсы иконки открытия меню: `select` / `searchSelect` — в `Dropdown.openMenuIconProps`; `native` — мерж к `Icon` у поля",
            "deprecated": false
          },
          {
            "name": "onValueChange",
            "type": "(value: string | string[]) => void",
            "required": false,
            "defaultValue": "",
            "description": "Колбэк при изменении выбранного значения (удобен в `mode=\"select\"`)",
            "deprecated": false
          },
          {
            "name": "onSelectedChange",
            "type": "(value: string | string[]) => void",
            "required": false,
            "defaultValue": "",
            "description": "Вызывается при смене выбора: одиночное значение или массив при `multiple`.\nСрабатывает во всех режимах (`select`, `searchSelect`, `native`) после фиксации нового значения.",
            "deprecated": false
          },
          {
            "name": "clearIconProps",
            "type": "Partial<{ name: \"PhosphorRecycle\" | \"PhosphorCaretDoubleLeft\" | \"PhosphorCaretLeft\" | \"PhosphorCaretRight\" | \"PhosphorCaretUp\" | \"PhosphorCaretDown\" | \"PhosphorArrowArcLeft\" | \"PhosphorArrowFatLineRight\" | ... 200 more ... | \"IconPlainerClock\"; size: IconSize; color: string; className: string; }>",
            "required": false,
            "defaultValue": "",
            "description": "Частичные пропсы `Icon` для иконки очистки при `displayClearIcon`.\nМерж поверх значений по умолчанию в конкретном поле (имя иконки, `size`, опционально `color`).",
            "deprecated": false
          }
        ]
      }
    },
    {
      "slug": "drawer",
      "name": "Drawer",
      "group": "Surfaces",
      "status": "stable",
      "since": "0.3.4",
      "description": "Выдвижная панель с оверлеем: размещение по сторонам, focus trap и управление закрытием.",
      "examples": [
        {
          "id": "right-opened",
          "title": "Открыт справа",
          "description": "Базовый drawer, закреплённый справа.",
          "code": "<Drawer isOpen onClose={() => undefined} placement=\"right\" title=\"Фильтры\">Контент панели</Drawer>",
          "layout": "block",
          "themes": [
            "theme",
            "colorMode",
            "motion"
          ],
          "showCode": true
        },
        {
          "id": "bottom-opened",
          "title": "Открыт снизу",
          "description": "Drawer внизу с ограничением по высоте.",
          "code": "<Drawer isOpen onClose={() => undefined} placement=\"bottom\" height=\"40vh\" title=\"История\">Контент</Drawer>",
          "layout": "block",
          "themes": [
            "theme",
            "colorMode",
            "motion"
          ],
          "showCode": true
        }
      ],
      "variants": [
        {
          "id": "placement-matrix",
          "title": "Сторона появления",
          "columns": 2,
          "items": [
            {
              "id": "left",
              "title": "Left",
              "code": "<Drawer isOpen onClose={() => undefined} placement=\"left\" title=\"Left\" />",
              "description": ""
            },
            {
              "id": "right",
              "title": "Right",
              "code": "<Drawer isOpen onClose={() => undefined} placement=\"right\" title=\"Right\" />",
              "description": ""
            }
          ]
        }
      ],
      "props": {
        "mode": "autogen",
        "include": [],
        "exclude": [],
        "items": [
          {
            "name": "isOpen",
            "type": "boolean",
            "required": true,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "onClose",
            "type": "() => void",
            "required": true,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "placement",
            "type": "DrawerPlacement",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "title",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "showCloseButton",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "width",
            "type": "string | number",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "height",
            "type": "string | number",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "container",
            "type": "Element",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "portalTargetId",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "portalZIndex",
            "type": "number",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "overlayClassName",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "overlayVariant",
            "type": "\"default\" | \"blur\" | \"dark\" | \"frosted\"",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "overlayStyle",
            "type": "CSSProperties",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "closeOnOverlayClick",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "closeOnEscape",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "closeOnEscapeKeyDown",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "closeOnOutsideClick",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "initialFocusRef",
            "type": "NullableRefObject",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "initialFocusSelector",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "headerSlot",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "unmountOnClose",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Размонтировать панель после закрытия",
            "deprecated": false
          },
          {
            "name": "lazy",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Лениво монтировать панель только после первого открытия",
            "deprecated": false
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "children",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          }
        ]
      }
    },
    {
      "slug": "modal",
      "name": "Modal",
      "group": "Surfaces",
      "status": "stable",
      "since": "0.3.4",
      "description": "Модальное окно с порталом, управлением фокусом, overlay и action-кнопками.",
      "examples": [
        {
          "id": "basic-opened",
          "title": "Открытое окно",
          "description": "Минимальный пример открытого модального окна.",
          "code": "<Modal isOpen onClose={() => undefined} title=\"Подтверждение\" description=\"Вы уверены?\" />",
          "layout": "block",
          "themes": [
            "theme",
            "colorMode",
            "motion"
          ],
          "showCode": true
        },
        {
          "id": "with-buttons",
          "title": "С кнопками действий",
          "description": "Кнопки задаются через массив buttons.",
          "code": "<Modal isOpen onClose={() => undefined} title=\"Удаление\" buttons={[{ label: \"Отмена\", variant: ButtonVariant.OUTLINE, onClick: () => undefined }, { label: \"Удалить\", variant: ButtonVariant.DANGER, onClick: () => undefined }]} />",
          "layout": "block",
          "themes": [
            "theme",
            "colorMode",
            "motion"
          ],
          "showCode": true
        },
        {
          "id": "status-variant",
          "title": "Статус danger",
          "description": "Вариант модалки с визуальным статусом danger.",
          "code": "<Modal isOpen onClose={() => undefined} title=\"Внимание\" modalVariant=\"danger\" />",
          "layout": "block",
          "themes": [
            "theme",
            "colorMode",
            "contrast"
          ],
          "showCode": true
        }
      ],
      "variants": [],
      "props": {
        "mode": "autogen",
        "include": [],
        "exclude": [],
        "items": [
          {
            "name": "isOpen",
            "type": "boolean",
            "required": true,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "onClose",
            "type": "() => void",
            "required": true,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "title",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "description",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "content",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "buttons",
            "type": "ModalButtonProps[]",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "container",
            "type": "Element",
            "required": false,
            "defaultValue": "",
            "description": "Контейнер, в котором происходит размещение модального окна (по умолчанию document.body)",
            "deprecated": false
          },
          {
            "name": "mobile",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Переключение мобильной версии модального окна",
            "deprecated": false
          },
          {
            "name": "overlayClassName",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "Класс для подложки модального окна",
            "deprecated": false
          },
          {
            "name": "overlayVariant",
            "type": "\"default\" | \"blur\" | \"dark\" | \"frosted\"",
            "required": false,
            "defaultValue": "",
            "description": "Вариант подложки модального окна",
            "deprecated": false
          },
          {
            "name": "overlayStyle",
            "type": "CSSProperties",
            "required": false,
            "defaultValue": "",
            "description": "Inline-стили для подложки",
            "deprecated": false
          },
          {
            "name": "initialFocusRef",
            "type": "NullableRefObject",
            "required": false,
            "defaultValue": "",
            "description": "Элемент, который должен получить фокус при открытии модального окна",
            "deprecated": false
          },
          {
            "name": "animationPreset",
            "type": "\"default\" | \"fade\" | \"slideUp\"",
            "required": false,
            "defaultValue": "",
            "description": "Предустановленный пресет анимации",
            "deprecated": false
          },
          {
            "name": "animationConfig",
            "type": "{ overlay?: { initial?: MakeCustomValueType<TargetProperties>; animate?: MakeCustomValueType<TargetProperties>; exit?: MakeCustomValueType<...>; }; modal?: { ...; }; }",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "headerIcon",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Иконка слева от заголовка",
            "deprecated": false
          },
          {
            "name": "contentIcon",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Иконка в области контента",
            "deprecated": false
          },
          {
            "name": "buttonsIcon",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "Иконка в контейнере кнопок",
            "deprecated": false
          },
          {
            "name": "headerSlot",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "footerSlot",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "buttonsSlot",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "portalTargetId",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "portalZIndex",
            "type": "number",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "modalVariant",
            "type": "\"default\" | \"danger\" | \"success\" | \"info\"",
            "required": false,
            "defaultValue": "",
            "description": "Статус модалки: при `danger` / `success` / `info` слева в шапке — цветная иконка с размытой подсветкой.\nЗаголовок и фон шапки остаются нейтральными. Своя иконка — `headerIcon` (приоритет над встроенной).",
            "deprecated": false
          },
          {
            "name": "initialFocusSelector",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "size",
            "type": "ModalSize",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "closeOnOverlayClick",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "closeOnEscape",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "closeOnEscapeKeyDown",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "closeOnOutsideClick",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "overlayStyledCss",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "showCloseButton",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "unmountOnClose",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Размонтировать модальное окно после закрытия",
            "deprecated": false
          },
          {
            "name": "lazy",
            "type": "boolean",
            "required": false,
            "defaultValue": "",
            "description": "Лениво монтировать модальное окно только после первого открытия",
            "deprecated": false
          },
          {
            "name": "children",
            "type": "ReactNode",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "defaultValue": "",
            "description": "",
            "deprecated": false
          }
        ]
      }
    }
  ]
} as const;
