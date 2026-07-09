# Changelog

Все значимые изменения в этом проекте будут документироваться в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/),
и этот проект придерживается [Semantic Versioning](https://semver.org/lang/ru/).

## [Unreleased]

### Added

- **Chip** / **Chips:** капсула и группа с выбором (`selectionMode` none/single/multiple); Select / MultiInput используют атом **Chip**.
- **DropMenu:** фасад над **Dropdown** (триггер `renderContentProp` / `trigger` / кнопка, алиасы `isVisible` / `onSelectItem`).
- **List:** типографический список ordered/unordered, маркеры (numbers, letters, bullet, virgule, icon), вложенность.
- **MultiButton:** split-кнопка (main + шеврон через **DropMenu**).
- **Pulse:** статусная точка с волной (`status`, `customColors`, reduced-motion).
- **SegmentedControl:** сегменты outline/filled, single/multiple, `options` или `SegmentedControl.Item`.

### Added (документация)

- Страницы **Chip + List**, **DropMenu + MultiButton**, **SegmentedControl + Pulse**; обновлены каталог, Storybook docs и сторис.

---

## [0.2.6] - 2026-07-08

### Added

- **ActionBar:** `dynamicSize`, `orientation` (horizontal/vertical), sync-анимации add/remove, `highlightPulse`; без фона и бордера для встраивания.
- **FloatingMenu:** `dynamicSize`, `orientation`, sync-анимации пунктов, `highlightPulse`.
- **Sidemenu:** `dynamicHeight` с sync-анимациями, `highlightPulse`.
- **Badge:** motion-анимация контента.
- **ValueMotion:** компонент пульсирующего значения.
- **Inputs:** анимированный счётчик символов (`CharacterCounterMotion`).

### Added (документация)

- Документация **v0.2.6**; обновлены README, CHANGELOG, ссылки в Storybook docs.

---

## [0.2.5] - 2026-07-08

### Added

- **Темизация:** оси **ThemeVariant** × **ThemeColorScheme** (`setThemeVariant`, `setColorScheme`); компонент **ThemeVariantSelector**.
- **Детские темы:** `kidsBoys` и `kidsGirls` (светлая/тёмная палитра 8–11 лет); legacy `kids` мигрирует в `kidsBoys`.
- **Storybook:** toolbar с двумя переключателями (Тема + Цвет), поддержка kidsBoys/kidsGirls в Docs и canvas.

### Added (документация)

- Документация **v0.2.5**; обновлены README, CHANGELOG, ссылки в Storybook docs.

---

## [0.2.4] - 2026-07-07

### Added

- **Carousel:** компонент карусели с autoplay, parallax, overlay/overlayPanel, fullscreen, thumbnails, drag/swipe и эффектами слайдов.
- **DateTimeInput:** поле даты и времени с picker-колонками; расширены **DateInput**, **TimeInput**, **Calendar**.
- **ActionBar:** панель действий с overflow-меню.
- **Glass-темизация:** Accordion, Avatar, Badge, Hint, Modal, Pagination, Pill, Snackbar, Stepper, Tabs, Tag, Toast, Tooltip и overlay-панели.
- **Table / DataGrid:** цвета строк, доработки сторис и документации.
- **Floating overlays:** `FloatingOverlayLayerContext`, `useFloatingOverlayPosition`, общие хендлеры позиционирования.

### Fixed

- **Carousel / сборка:** исправил путь импорта типов, типизацию `children` overlay/caption, циклическую зависимость overlay-хендлеров.

### Added (документация)

- Документация **v0.2.4**; обновлены README, CHANGELOG, ссылки в Storybook docs.

---

## [0.2.3] - 2026-07-05

### Added

- **Glass-темы:** `glassLight` и `glassDark` с vibrancy-эффектом на базе blur-токенов (`glass`, `glassDark`, `surfaceMaterial`).
- **Blur-токены:** расширены классы `glassDarkLight`, `glassDarkStrong`; хелперы `parseBackdropFilterFromBlurClass`, `glassBackdropFilters`.
- **Storybook:** mesh-gradient фон canvas, поддержка `glassLight` / `glassDark` в toolbar и Docs.

### Changed

- **Компоненты:** Card, Modal, Dropdown, Input, FloatingMenu, Table — `backdrop-filter` для glass-поверхностей.
- **GlobalStyles:** mesh-gradient на `html` для glass-тем.

### Fixed

- **Windows / dev:** `cross-env` в скрипте `npm start`; optional dependency `@rollup/rollup-win32-x64-msvc`.

### Added (документация)

- Документация **v0.2.3**; обновлены README, CHANGELOG, ссылки в Storybook docs.

---

### Added

- **Storybook:** обновлён **Theme Showcase**, интеграция с UI-kit и демонстрация тёмной темы.
- **Тесты:** конфигурация **Jest** для **npm workspaces** (корневой `package.json` + `web`).

### Changed

- **Темизация:** доработана тёмная тема и визуальные токены в сторис **Theming**.

### Fixed

- **ESLint** и падения unit-тестов после обновления окружения.

### Added (документация)

- Документация **v0.2.2** на сайте; обновлены README, CHANGELOG, индекс версий.

---

## [0.2.1] - 2026-05-26

### Added

- **Темизация:** `defineThemeCatalog`, type-safe `ThemeMode` / `themeMode`, `ThemeColorScheme`; **ThemeSelector**, `mergeTheme`, `useMergeTheme`; Storybook **Theming**; обновлены README и docs.
- **DataGrid — сторис:** «Много колонок + панель иконок», «Много колонок + внутренние отступы»; хелперы `getDataGridStoryWideColumns`, `DataGridStoryHeaderToolbar`.
- **Input:** оболочка **`InputFieldShell`**, стили **`InputComposite`**, хелперы композитных полей; расширенные истории и **`inputStoriesDocs`**.
- **Storybook:** хелперы **`storybookStoryDocs`**, **`storybookUsageExtract`** для описаний и примеров из исходников сторис.

### Changed

- **Input** и производные (**DateInput**, **TimeInput**, **TextArea**, **MultiInput**, **Select**, **SliderInput**): единая раскладка через **`InputFieldShell`** и **`inputFieldLayoutHandlers`**.
- **DataGrid / Table (split-layout):** горизонтальная синхронизация шапки колонок с телом через **`scrollLeft`** вместо `transform`; панель **`headerToolbar`** вынесена из прокручиваемой шапки (`data-plainer-table-header-toolbar-row`, `partitionTableHeadForSplitScroll`).

### Fixed

- **DataGrid / Table:** устранены рывки заголовков при горизонтальном скролле; панель **`headerToolbar`** больше не растягивается и не скрывается за пределами видимой области.

### Added (документация)

- **DOC_TABLE** / **DOC_DATAGRID**: split-layout, поведение **`headerToolbar`** при горизонтальном скролле; JSDoc у **`DataGridProps`**.
- Документация **v0.2.1** на сайте; обновлены README, CHANGELOG, **theming.mdx**, справочник.

---

## [0.2.0] - 2026-05-19

### Added

- Компонент **Tabs**: объединены сценарии вкладок с панелями и сегментированного переключателя (бывший **Switcher**); тип **TabsSegmentOption**, истории **Tabs/Segments**, обновлены **DOC_TABS** и README.
- Поле **`columns[].format`** у **DataGrid** и тип **`TableCellFormat`**: декларативное отображение ячеек (ссылки через **`Link`**, маски, число, валюта, дата/время, **`renderCell`**). Хелпер **`formatTableCellValue`**, **`TableCellFormatted`**, **`formatTableCellExportCellValue`**. Скрипты **`npm run react-doctor`** / **`react-doctor:strict`**.
- **DataGrid — выгрузка в Excel (`.xls`)**: проп **`excelExport`** (`dataFetcher`, модалка диапазона страниц, прогресс, отмена). Файл SpreadsheetML без внешних библиотек. Ширины колонок из **`columns[].width`**. Текст для Excel из **`format`** / **`render`** / **`exportValueGetter`**. Цвета ячеек: **`exportStyle`** у `enum`, **`exportCellStyle`**, пресеты для **Tag** / **Pill**. Пустое состояние, встроенные кнопки **refetch** / сброс фильтров в **`headerToolbar`**.
- **Modal:** иконки статуса (**`danger`** / **`success`** / **`info`**) в шапке.
- **SliderInput — режим `range`:** диапазон «от / до» по аналогии с **DateInput** (`range={true}`): `value` / `defaultValue` / `onChange` как `readonly [number, number]`; поля **`rangeFromLabel`**, **`rangeToLabel`**, плейсхолдеры **`numberFromPlaceholder`** / **`numberToPlaceholder`**; скрытые **`nameFrom`**, **`nameTo`**. Экспорт **`SliderInputSingleProps`**, **`SliderInputRangeProps`**. Реализация **SliderInputSingle** / **SliderInputRange**, хелперы в `SliderInput/handlers.ts`.
- **Storybook:** полный набор историй **SliderInput**; **DOC_SLIDER_INPUT** в `storyDocs/uiKitDocs.ts`.

### Changed

- **Tabs** (**breaking**): варианты **pill**, **minimal**, **line**, **underline**; проп **filledSegmentTriggers**; убран **Tabs.List**.
- **DataGrid** / **Table**: при **`scrollAreaMaxHeight`** и липкой шапке — **split-layout** (шапка и `headerToolbar` вне вертикального скролла строк; горизонтальный скролл у `tbody`, синхронизация `scrollLeft` и ширин колонок). По умолчанию **`stickyHeader={true}`** и **`horizontalScroll={true}`** у **DataGrid**; у **TableContainerScroll** — **`horizontalScroll={true}`**.
- Скругления блока таблицы из **`theme.tables.borderRadius`** (CSS-переменная **`--plainer-table-border-radius`** на **`TableContainer`**).
- **Глобальные стили скроллбаров** в **`GlobalStyles`** (единый вид полос прокрутки в приложении).

### Fixed

- **SliderInput / Slider (embedded):** заливка встроенного трека у нижней кромки **Input** — без зазора слева у одиночного значения на `min`; корректный сегмент между бегунками в режиме **range**.

### Added (документация)

- Документация **v0.2.0** на сайте; обновлены README и CHANGELOG.
- Страница **SliderInput** (`components-slider-input.mdx`); справочник, **group-inputs**, JSDoc в `types/ui.ts`.

---

## [0.1.9] - 2026-05-18

### Fixed

- **`createStyledShouldForwardProp`:** совместимость со **styled-components 6** (второй аргумент — `target`, не `defaultValidatorFn`); устранены падения в **Pill**, **Tag**, **Breadcrumb** и др.
- **Сборка на Windows / npm workspaces:** `cross-env` и `.bin` не в PATH — Rollup запускается через **`rollup-with-node-env.mjs`**.
- **`prepare`:** husky через **`install-husky.mjs`** (вызов `node_modules/husky/bin.js`).
- **`publish:npm`:** проверка dev-зависимостей при **`NODE_ENV=production`** (`ensure-dev-dependencies.mjs`).

### Added

- Документация **v0.1.9** на сайте; обновлены README и CHANGELOG.

---

## [0.1.8] - 2026-05-17

### Fixed

- **`@velkinvv/plainerv/vite`:** в `dist/vite/index.js` реэкспорт с суффиксом `./plainervVite.js` для Node ESM (Windows, `vite.config.ts` — иначе `ERR_MODULE_NOT_FOUND`).
- **`plainervVite()`:** `resolve.dedupe` и `optimizeDeps.include` для **framer-motion** (дубликаты в monorepo).
- **Стили:** в `exports` добавлен алиас `./dist/styles.css` — нет `ERR_PACKAGE_PATH_NOT_EXPORTED` при старом импорте.
- **Next.js App Router:** директива `use client` в начале `dist/index.esm.js`.

### Added

- README: разделы **Webpack / CRA** и **Next.js (App Router)**; уточнён импорт стилей.
- **`verify-package.mjs`:** проверка ESM-импортов в `dist/vite`, `use client`, полей `exports`.

### Changed

- Peer **vite:** `^5 || ^6 || ^7`.
- Явные `.js` в исходниках `src/vite` для корректного ESM в Node.

---

## [0.1.7] - 2026-05-17

### Fixed

- **npm:** README попадает в tarball — убрано `*.md` из `.npmignore`, в `package.json` добавлено `"readme": "README.md"`.

### Added

- Подпуть **`@velkinvv/plainerv/vite`**: плагин **`plainervVite()`**.
- Тип **`NullableRefObject`** (React 19).

### Changed

- **Breaking (установка):** `styled-components` и `framer-motion` в **peerDependencies**; в **dependencies** — `clsx`, `dayjs`.
- Документация Vite (prebundle, `o2 is not a function`).

### Fixed

- Предупреждения TypeScript при сборке Rollup (`@types/react` 19).

---

## [0.1.6] - 2026-05-16

### Fixed

- Устранены все предупреждения ESLint (`lint:fix-all`, 0 warnings).
- Исправлены типы `DragEvent` в **DataGrid** (handle, ячейки, строки).
- Типизация **Hint** (`HintPosition`, очистка таймеров), **Progress** (`DefaultTheme`).

### Added

- Хелпер **`noopHandler`** для пустых колбэков в stories и тестах.

### Changed

- Версия пакета: **0.1.6**.


---

## [0.1.5] - 2026-05-16

### Fixed

- Устранены все предупреждения TypeScript при сборке Rollup (`TS2769`, `TS7006`).
- Добавлен хелпер `createStyledShouldForwardProp`, удалён конфликтующий `@types/styled-components`.
- Исправлен casing папки `table`, типы `TabItem` для React 19, типизация обработчиков событий в компонентах.

### Changed

- Версия пакета: **0.1.5**.

---

## [0.1.4] - 2026-05-13

### Changed

- Версия пакета: подготовка релиза 0.1.4.

---

## [0.1.3] - 2026-05-04

### Changed

- Таблица (`Table`): липкая шапка и вертикальный скролл через `scrollAreaMaxHeight` у `TableContainerScroll`, CSS-переменная фона шапки `--plainer-table-header-background`.
- DataGrid: `scrollAreaMaxHeight`, `tableHeaderVariant` / `tableHeaderBackground`, единый фон панели `headerToolbar` со шапкой колонок.

### Added

- Хелпер `resolveDataGridTableHeaderBackground`, экспорт `PLAINER_TABLE_HEADER_BACKGROUND_CSS_VAR` из примитива таблицы.

---

## [0.1.0] - 2025-01-XX

### Added
- Начальная версия библиотеки
- Базовая структура проекта
- Компоненты UI
- Система темизации
- TypeScript поддержка

---

**Примечание:** Даты будут автоматически обновляться при использовании semantic-release.
