# Changelog

Все значимые изменения в этом проекте будут документироваться в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/),
и этот проект придерживается [Semantic Versioning](https://semver.org/lang/ru/).

## [Unreleased]

### Added
- Начальная версия библиотеки UI компонентов
- Компоненты: Button, Input, Modal, Dropdown, Card, Badge, Spinner, Skeleton, Divider, Checkbox, RadioButton, Switch, Progress, Avatar, Tooltip, Toast, Tabs, Accordion
- Поддержка темной и светлой темы
- TypeScript типизация для всех компонентов
- Хуки: useModal, useToast, useDebounce, useLocalStorage, useClickOutside, useKeyPress, useMediaQuery, useScrollPosition, useWindowSize
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

## [0.1.0] - 2025-01-XX

### Added
- Начальная версия библиотеки
- Базовая структура проекта
- Компоненты UI
- Система темизации
- TypeScript поддержка

---

**Примечание:** Даты будут автоматически обновляться при использовании semantic-release.
