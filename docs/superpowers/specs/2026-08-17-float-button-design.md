# Design: FloatButton

Дата: 2026-08-17  
Компонент UI-kit `@velkinvv/plainerv`  
Ветка: `v_0.3.0`

## Цель

Плавающая кнопка глобального действия: поверх viewport (или внутри контейнера), круглая/квадратная, с опциональной подписью, группой-веером, режимом «наверх» и кольцом прогресса скролла.

Не путать с **FloatingMenu** (панель инструментов у края / draggable) и **ActionBar** (тулбар в потоке layout).

## Размещение

`web/src/components/ui/FloatButton/`

- `FloatButton.tsx`, `FloatButtonGroup.tsx`, `FloatButtonBackTop.tsx`
- `FloatButton.style.ts`, `handlers.ts`, `handlers.test.ts`
- `FloatButton.test.tsx`, `FloatButton.stories.tsx`, `index.ts`

Типы в `types/ui.ts`. Экспорт из barrel `components/ui`. `DOC_FLOAT_BUTTON`, CHANGELOG `[0.3.0]`.

Цвета, радиус, тень, типографика, motion — только из темы / существующих резолверов кнопок (`ButtonVariant`, `ControlColor`, `theme.shadow`, `theme.borderRadius`, `theme.zIndex`).

## Позиционирование

| Режим | Когда | Как |
|-------|--------|-----|
| Viewport (default) | `getContainer` не задан | `createPortal` в `document.body`, `position: fixed` |
| Контейнер | `getContainer()` вернул элемент | портал/рендер в этот узел, `position: absolute`; контейнер должен быть `position: relative` (или эквивалент) |

- Угол default: **`bottom-end`** (логический конец, RTL-корректно).
- Остальные: `bottom-start` | `top-end` | `top-start`.
- Отступ от края: константа хелпера (24px), переопределяется пропом `insetPx`.
- `zIndex` default **1100** (ниже `theme.zIndex.modal` = 2000, рядом с FloatingMenu 1200). Проп `zIndex` перекрывает.

## API

```ts
type FloatButtonShape = 'circle' | 'square';
type FloatButtonPlacement = 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start';
type FloatButtonExpandPlacement = 'top' | 'bottom' | 'start' | 'end';
type FloatButtonGroupTrigger = 'click' | 'hover';
```

### FloatButton

| Проп | Смысл |
|------|--------|
| `icon` | Иконка (обязательна без `label` и без `backTop`) |
| `label?` | Подпись рядом с иконкой (расширенная кнопка) |
| `shape?` | `circle` (default) \| `square` |
| `variant?` | `ButtonVariant`, default `PRIMARY` |
| `color?` | `ControlColor` \| CSS |
| `size?` | `Size`, default `LG` |
| `tooltip?` | Текст/узел для `Tooltip` |
| `badge?` | `ReactNode` \| `number` \| `true` (dot) — через наш **Badge** |
| `href?` | Если задан — рендер как ссылка |
| `disabled?` | |
| `onClick?` | |
| `backTop?` | Режим «наверх» на этой же кнопке |
| `placement?` | Угол, default `bottom-end` |
| `getContainer?` | Якорь контейнера |
| `insetPx?` | Отступ от края |
| `zIndex?` | |
| `aria-label` | Обязателен, если нет видимого `label` |

Одиночный `FloatButton` без Group сам занимает угол (viewport/контейнер). Внутри Group позиционирование берёт Group; пункт веера — не fixed.

### FloatButton.Group

| Проп | Смысл |
|------|--------|
| `children?` | Пункты `FloatButton`: **последний** — триггер в углу, предыдущие — веер |
| `items?` | Действия веера (`FloatButtonItem[]`) |
| `triggerItem?` | Описание главной кнопки при `items` (иначе первый `items[0]` не используем как триггер — триггер только `triggerItem` или children) |
| `trigger?` | `click` (default) \| `hover` |
| `open?` / `defaultOpen?` / `onOpenChange?` | Контроль веера |
| `expandPlacement?` | Направление веера, default `top` |
| `shape?` | Наследуется детьми, если не задано у пункта |
| `placement?` / `getContainer?` / `insetPx?` / `zIndex?` | Как у корня |

Если переданы и `children`, и `items` — **children** имеют приоритет.

```ts
type FloatButtonItem = {
  id: string;
  icon: React.ReactNode;
  label?: React.ReactNode;
  ariaLabel?: string;
  tooltip?: React.ReactNode;
  badge?: React.ReactNode | number | true;
  href?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};
```

`triggerItem` — тот же набор полей без обязательного `id` (id можно генерировать `trigger`).

### FloatButton.BackTop

| Проп | Default | Смысл |
|------|---------|--------|
| `visibilityHeight` | `400` | Показать после этой прокрутки (px) |
| `duration` | `450` | Длительность smooth scroll (мс); при `prefers-reduced-motion` — мгновенно |
| `showProgress` | `false` | Кольцо прогресса вокруг кнопки |
| `getScrollContainer` | `() => window` | Кто скроллится |
| плюс визуальные пропы FloatButton | | icon default `IconPlainerArrowUp` |

Проп `backTop` на обычном `FloatButton` включает ту же логику (видимость + скролл наверх). `FloatButton.BackTop` — явная составная форма с теми же хелперами.

## Layout / поведение

| ID | Требование |
|----|------------|
| L1 | Корень одиночной кнопки / группы: не растягивает документ (`pointer-events` только на кнопках). |
| L2 | `circle`: `border-radius: 50%`. `square`: `theme.borderRadius`. Тень: `theme.shadow`. |
| L3 | С `label`: горизонтальный ряд иконка + текст, padding из геометрии size. |
| L4 | Веер: колонка/ряд по `expandPlacement`, gap из темы/геометрии; закрытые пункты не в таб-порядке (`visibility` / unmount). |
| L5 | Badge — обёртка нашего Badge (число / children / `isDot` при `true`). |
| L6 | Progress: SVG-кольцо, stroke из акцента `color`/`variant`, track из `theme.colors.border` (или secondary). |
| L7 | Hover/focus: существующие motion-пресеты кнопки (`useUiMotionPresets`), без отдельного «чужого» easing. |

## A11y

| ID | Требование |
|----|------------|
| H1 | Icon-only: `aria-label` обязателен (dev warning, если нет). |
| H2 | Group: триггер `aria-expanded`, `aria-haspopup="true"`; контейнер веера `role="menu"`, пункты `role="menuitem"`. |
| H3 | BackTop: имя «Наверх» по умолчанию, если нет `aria-label` / `label`. |
| H4 | Escape закрывает веер в режиме `click`. |
| H5 | `disabled` — не в таб-порядке / `aria-disabled`. |

## Вне scope

- Перетаскивание (это FloatingMenu).
- Несколько независимых групп с авто-стеком столкновений.
- Отдельный токен-блок `theme.floatButton` в этом релизе — хватает button + shadow + zIndex.

## Тесты

- placement `bottom-end` → fixed + portal (jsdom: атрибуты/стили корня).
- `getContainer` → absolute относительно контейнера.
- Group: click открывает/закрывает; `items` + `triggerItem` рендерит пункты.
- `backTop` / BackTop: кнопка скрыта при scrollY < порога; клик вызывает scroll (mock).
- `showProgress`: наличие SVG при прокрутке.
- icon-only без aria-label — warning (опционально jest spy на console).

## Storybook / docs

- Одиночная circle/square, с label, badge, tooltip, href.
- Group click + hover, `items[]` и children.
- BackTop + `showProgress`.
- `getContainer` в карточке с `position: relative` и внутренним скроллом.
- `DOC_FLOAT_BUTTON`: отличить от FloatingMenu / ActionBar. Без ссылок на сторонние библиотеки.

## CHANGELOG `[0.3.0]`

Added: **FloatButton**, **FloatButton.Group**, **FloatButton.BackTop**.
