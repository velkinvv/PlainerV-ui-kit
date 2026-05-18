# Changelog

Все значимые изменения в этом проекте будут документироваться в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/),
и этот проект придерживается [Semantic Versioning](https://semver.org/lang/ru/).

## [Unreleased]

### Added

- Компонент **Tabs**: объединены сценарии вкладок с панелями и сегментированного переключателя (бывший **Switcher**); тип **TabsSegmentOption**, истории **Tabs/Segments**, обновлены **DOC_TABS** и README.
- Поле **`columns[].format`** у **DataGrid** и тип **`TableCellFormat`**: декларативное отображение ячеек (ссылки через **`Link`**, маски, число, валюта, дата/время, **`renderCell`**). Хелпер **`formatTableCellValue`**, **`TableCellFormatted`**. Скрипты **`npm run react-doctor`** / **`react-doctor:strict`**.

### Changed

- **Tabs** (**breaking**): варианты **pill**, **minimal**, **line**, **underline**; проп **filledSegmentTriggers**; убран **Tabs.List**.

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
