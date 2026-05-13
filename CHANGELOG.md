# Changelog

Все значимые изменения в этом проекте будут документироваться в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/),
и этот проект придерживается [Semantic Versioning](https://semver.org/lang/ru/).

## [Unreleased]

### Added

- Поле **`columns[].format`** у **DataGrid** и тип **`TableCellFormat`**: декларативное отображение ячеек (ссылки через **`Link`**, маски телефона/счёта/карты/ИНН/СНИЛС, число, валюта, проценты, дата/время, почта `mailto:`, перечисление, булево значение, кастомный **`renderCell`**). Хелпер **`formatTableCellValue`**, константы масок (**`TABLE_CELL_MASK_*`**) и связанные утилиты — в модуле **`tableCellFormat`** (handlers); кэш **`Intl.NumberFormat`** через **`intlFormatCache`**. Компонент **`TableCellFormatted`** для примитивной **`Table`**. Сторис: **DataGrid › Column formats**, **Table › TableCellFormatted**; в корневом **DataGrid.stories** дополнены **`argTypes`** для **`columns`** и **`renderCell`**. Скрипты **`npm run react-doctor`** / **`react-doctor:strict`**; раздел в документации Storybook по **`format`**.
- Начальная версия библиотеки UI компонентов
- Компоненты: Button, ButtonGroup, Input, Modal, Dropdown, Card, Badge, Spinner, Skeleton, Divider, Checkbox, RadioButton, Switch, Progress, Avatar, Tooltip, Toast, Snackbar, Pagination, Tabs, Accordion, Menu, FloatingMenu
- Поддержка темной и светлой темы
- TypeScript типизация для всех компонентов
- Хуки: useModal, useToast, useSnackbar, useDebounce, useLocalStorage, useClickOutside, useKeyPress, useMediaQuery, useScrollPosition, useWindowSize
- Обработчики: dateHandlers, timeHandlers, buttonThemeHandlers
- Настроена сборка через Rollup (ESM и CJS форматы)
- Настроен PostCSS для обработки стилей
- Настроено копирование шрифтов в dist
- Добавлены базовые тесты для компонентов и хуков
- Настроен coverage threshold (60%)
- Поддержка tree-shaking через sideEffects: false

### Changed
- Версия изменена с 1.0.0 на 0.1.0 (pre-release)

### Fixed
- Удалены дубликаты файлов (handlers/handlers, hooks/hooks, icons/icons)
- Обновлены пути к шрифтам для работы в npm пакете

### Security

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
