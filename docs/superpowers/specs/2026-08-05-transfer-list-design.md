# Design: TransferList

Дата: 2026-08-05  
Компонент UI-kit `@velkinvv/plainerv`

## Цель

Готовый high-level контрол «две панели + перенос пунктов» для выбора подмножества из списка. Стиль, темы и паттерны файлов — как у остальных компонентов кита (Checkbox, List, Button, Input).

## Не цели (v1)

- Виртуальный скролл для тысяч пунктов (можно позже)
- Асинхронная подгрузка / remote search
- Вложенные группы внутри панели

## Размещение

`web/src/components/ui/TransferList/`

- `TransferList.tsx` — корень
- `TransferList.style.ts` — стили
- `TransferListPanel.tsx` — панель (заголовок, поиск, список, select-all)
- `TransferListActions.tsx` — колонка кнопок переноса
- `TransferListItemRow.tsx` — строка пункта (checkbox + label + DnD handle)
- `handlers.ts` — чистая логика переноса, фильтра, DnD-снимков
- `handlers.test.ts`, `TransferList.test.tsx`
- `TransferList.stories.tsx`
- `index.ts`

Типы — в `web/src/types/ui.ts`. Экспорт — `web/src/components/ui/index.ts`. Документация — `uiKitDocs` + CHANGELOG.

## Варианты

| `variant` | Поведение |
|-----------|-----------|
| `basic` (default) | Кнопки: перенести выбранные (`>` / `<`); опционально `showMoveAll` → `≫` / `≪` |
| `enhanced` | В шапке панели: checkbox «выбрать все / снять» + счётчик `selected/total`; кнопки только для выбранных (без move-all) |

## Модель данных (гибрид)

```ts
type TransferListItem = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  /** Доп. текст под label (опционально) */
  description?: React.ReactNode;
};

type TransferListChangePayload = {
  leftValue: string[];
  rightValue: string[];
  /** Причина: кнопка / select-all transfer / dnd */
  reason: 'move' | 'move-all' | 'dnd' | 'reorder';
};
```

### Режимы value

1. **Простой (рекомендуемый):** `value` / `defaultValue` — массив `value` пунктов **справа**. Слева = `items` минус справа (с сохранением относительного порядка из `items`, если не было reorder).
2. **Полный контроль:** если заданы `leftValue` и/или `rightValue` (controlled) — панели управляются явно. При controlled-паре обязателен `onChange`.

Правила:

- Каждый `value` из items уникален.
- Пункт не может быть одновременно слева и справа.
- `disabled` на корне блокирует все действия; `item.disabled` — нельзя выбрать/перетащить этот пункт.
- Порядок внутри панели сохраняется при переносе (append в конец целевой панели по умолчанию; при DnD — по позиции drop).

## Основные пропсы

| Проп | Описание |
|------|----------|
| `items` | Каталог пунктов |
| `value` / `defaultValue` | Правая панель (простой режим) |
| `leftValue` / `defaultLeftValue` | Явный контроль левой |
| `rightValue` / `defaultRightValue` | Явный контроль правой |
| `onChange` | `(payload) => void` |
| `variant` | `'basic' \| 'enhanced'` |
| `showMoveAll` | Только `basic`; default `true` |
| `searchable` | Поля поиска в шапках; default `true` в v1 (по согласованию scope) |
| `draggable` | DnD между панелями + reorder внутри; default `true` |
| `leftTitle` / `rightTitle` | Заголовки панелей |
| `leftSearchPlaceholder` / `rightSearchPlaceholder` | Плейсхолдеры поиска |
| `disabled` | Блок всего контрола |
| `size` | Размер чекбоксов/кнопок/инпутов (`Size`) |
| `color` | Акцент checkbox / focus (`ControlColor \| string`, default `primary`) |
| `fullWidth` | Растянуть на ширину родителя |
| `height` | Высота области списка (px / css) |
| `renderItem` | Кастомная отрисовка строки `(item, { checked, side }) => ReactNode` |
| `emptyLeftText` / `emptyRightText` | Пустые состояния |
| `ariaLabel` | Имя всего контрола |

Кнопки переноса:

- disabled, если нет выбранных (или для move-all — если панель пуста / все disabled).
- `aria-label` на русском по умолчанию, переопределяемые пропсами `move*AriaLabel`.

## Поиск

- Локальный фильтр по строковому представлению `label` (если `label` — string/number) и опционально `description`.
- Фильтр **не** меняет модель `left`/`right`, только видимость.
- Select-all в `enhanced` действует по **видимым** (отфильтрованным) пунктам панели, с учётом `disabled`.
- Состояние поисковых строк — uncontrolled внутри (или controlled через `leftSearch` / `rightSearch` + `onLeftSearchChange` / `onRightSearchChange` для тестов).

## Drag and Drop

- HTML5 Drag and Drop API (без новой зависимости), логика в `handlers`.
- Можно перетаскивать один пункт или набор **выбранных** пунктов с одной панели (если тащим выбранный — едут все checked с той же панели).
- Drop на панель / между строками → перенос или reorder.
- Keyboard/кнопки остаются полноценным способом переноса (DnD не единственный канал).
- Визуал: ghost/opacity при drag, drop-indicator линия между строками; цвета из темы.
- При `draggable={false}` — без drag handles и listeners.

## Вёрстка и тема

- Семантическая разметка: `section` / `ul`/`li` или `role="listbox"` + checkbox pattern.
- Горизонтальный ряд панелей; `@media` — вертикальный стек (левая → действия → правая).
- Стили в отдельном файле; токены `theme.colors`, `theme.typography`, радиусы/тени как у List/Card.
- Переиспользовать: `Checkbox`, `Button` / `IconButton`, `Input` (поиск), `Icon`.

## A11y

- Заголовки панелей связаны с списками (`aria-labelledby`).
- Счётчик в enhanced — `aria-live="polite"` при изменении выбора.
- Кнопки переноса с понятными `aria-label`.
- Фокус не теряется неожиданно после переноса (фокус на первую перенесённую или на кнопку).

## Тесты

- Перенос выбранных / всех (basic)
- Enhanced select-all и счётчик
- Простой `value` и полный `leftValue`/`rightValue`
- Поиск скрывает, но не удаляет из модели
- DnD: unit-тесты handlers (move/reorder), smoke UI при возможности
- `disabled` / `item.disabled`

## Storybook

- Basic, Enhanced, Controlled right-value, Full left/right control, Search, DnD, Disabled, Custom renderItem, Colors/size

## Out of scope упоминаний

В коде, docs и Storybook **не** ссылаться на сторонние UI-киты как на источник идеи.
