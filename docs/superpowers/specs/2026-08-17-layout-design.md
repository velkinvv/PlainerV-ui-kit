# Design: Layout

Дата: 2026-08-17  
Компонент UI-kit `@velkinvv/plainerv`  
Ветка: `v_0.3.0`

## Цель

Каркас страницы: шапка, боковая колонка, контент, подвал. Flex, вложенные `Layout`, collapse / брейкпоинт / overlay у сайдбара, два режима скролла.

Не путать с **Sidemenu** (навигация: пункты, compact/expanded, edgeAttached) и **Grid** (CSS Grid). `Layout.Sidebar` — геометрический слот; внутрь кладут Sidemenu или любой узел.

В docs и коде не упоминать сторонние UI-библиотеки.

## Размещение

`web/src/components/ui/Layout/`

- `Layout.tsx`, `LayoutHeader.tsx`, `LayoutSidebar.tsx`, `LayoutContent.tsx`, `LayoutFooter.tsx`
- `LayoutContext.tsx`, `Layout.style.ts`, `handlers.ts`, `handlers.test.ts`
- `Layout.test.tsx`, `Layout.stories.tsx`, `Layout.stories.style.ts`, `index.ts`

Типы в `types/ui.ts`. Экспорт из barrel `components/ui`. Сторис: `UI Kit/Layout/Layout`. `DOC_LAYOUT`, CHANGELOG `[0.3.0]`.

Токены: `theme.colors`, `theme.sizes.header.height`, `theme.sizes.footer.height`, `theme.zIndex.header`, `theme.media`, `theme.durations.ms300`, `theme.boxShadow.md` (fallback `theme.colors.shadow`), `theme.borderRadius`. Ширины сайдбара — константы хелперов, без нового блока темы.

## Архитектура

Compound + контекст.

- Корень — `position: relative`, flex. Если есть Sidebar (регистрация в контексте или проп `hasSidebar`) — `flex-direction: row`, иначе `column`.
- Вложенный Layout — схема «шапка + тело (сайдбар | контент) + подвал».
- Overlay: развёрнутый сайдбар `position: absolute` внутри **этого** корня; в потоке остаётся gutter = текущая collapsed-ширина (в т.ч. 0).
- Корень сам не создаёт scroll при `scrollMode="page"`. При `content` — `overflow: hidden` на корне, скролл у Content.

## API

```ts
type LayoutScrollMode = 'page' | 'content';
type LayoutSidebarPlacement = 'start' | 'end';
type LayoutSidebarBreakpoint = 'sm' | 'md' | 'lg' | 'xl';
type LayoutSidebarCollapseReason = 'trigger' | 'breakpoint';
```

### Layout

Корень: `<div className="ui-layout">`.

| Проп | Default | Смысл |
|------|---------|--------|
| `hasSidebar?` | авто | Принудительно ряд (SSR / Sidebar не прямой child) |
| `scrollMode?` | `'page'` | `page` — скролл окна/родителя; `content` — скролл у Content |
| `minHeight?` | `'100%'` | CSS min-height корня |

При `scrollMode="content"`: `height: 100%` на корне (плюс `minHeight`). Сторис оборачивают демо в бокс с явной высотой.

### Layout.Header

`<header>`. Высота `theme.sizes.header.height`. Фон `colors.backgroundSecondary`, текст `colors.text`, нижняя граница `colors.border`. Padding-inline — константа хелпера **24px**.

| Проп | Default | Смысл |
|------|---------|--------|
| `sticky?` | `false` | `position: sticky; top: 0; z-index: theme.zIndex.header` |

При `scrollMode="content"` шапка и так вне скролла; `sticky` безвреден.

### Layout.Footer

`<footer>`. Высота `theme.sizes.footer.height`. Те же цвета, верхняя граница. Без sticky.

### Layout.Content

Всегда `<main className="ui-layout-content">`. В документации: один Content на страницу.

`flex: 1`, `min-width: 0`, `min-height: 0`, фон `colors.background`.  
При `scrollMode="content"` у предка: `overflow: auto`, `data-scroll="content"`.

### Layout.Sidebar

`<aside className="ui-layout-sidebar">`.

| Проп | Default | Смысл |
|------|---------|--------|
| `width?` | `200` | Развёрнутая ширина: number (px) или CSS-строка |
| `collapsedWidth?` | `80` | Ширина collapsed; `0` — спец-триггер у логического края |
| `collapsed?` / `defaultCollapsed?` | uncontrolled `false` | Состояние |
| `onCollapsedChange?` | — | `(collapsed, reason) => void` |
| `collapsible?` | `false` | Показать триггер |
| `trigger?` | IconButton кита | Кастом; `null` — скрыть |
| `placement?` | `'start'` | `start` \| `end` (RTL: логические стороны) |
| `overlay?` | `false` | Развёрнутый вне потока, поверх Content |
| `sticky?` | `false` | CSS sticky + `align-self: stretch` |
| `breakpoint?` | — | Свернуть, если ширина окна **строго меньше** порога |
| `onBreakpointChange?` | — | `(isBelow: boolean) => void` |

Константы: `LAYOUT_SIDEBAR_DEFAULT_WIDTH_PX = 200`, `LAYOUT_SIDEBAR_DEFAULT_COLLAPSED_WIDTH_PX = 80`.

Пороги брейкпоинта (max-width, px), согласованы с `theme.media` (min-width +1 логика через «ниже порога»):

| Ключ | Порог (window.innerWidth < N) |
|------|-------------------------------|
| `sm` | 576 |
| `md` | 768 |
| `lg` | 992 |
| `xl` | 1200 |

**Controlled:** корень не меняет `collapsed` сам; брейкпоинт зовёт `onBreakpointChange(isBelow)` и `onCollapsedChange(isBelow, 'breakpoint')`.  
**Uncontrolled:** каждое пересечение порога выставляет collapsed = `isBelow`.

Отдельного `reverseArrow` нет: направление шеврона от `placement` и `collapsed`.

## Поведение

| ID | Требование |
|----|------------|
| L1 | Корень `data-has-sidebar`, `data-scroll-mode`. Sidebar: `data-collapsed`, `data-placement`, `data-overlay`. |
| L2 | Наличие Sidebar в контексте → `flex-direction: row`. Иначе column. `hasSidebar={true}` перекрывает авто. |
| L3 | `placement="end"`: aside `order: 1`, соседний Content в том же корне `order: 0` (логически справа/в конце, RTL-корректно). |
| L4 | Overlay + expanded: aside `position: absolute; inset-block: 0; inset-inline-start: 0` (для end — `inset-inline-end`), `z-index: theme.zIndex.header`, тень `theme.boxShadow.md`. В потоке — spacer шириной collapsedWidth. Атрибут корня `data-sidebar-overlay`. Backdrop нет. |
| L5 | Overlay + collapsed: aside в потоке, ширина collapsedWidth (в т.ч. 0). |
| L6 | `collapsedWidth={0}` + collapsed: aside `aria-hidden`, не в табе; виден zero-width trigger (кнопка у края, размер 40×40 из константы, фон secondary, z-index header). |
| L7 | Ширина анимируется `theme.durations.ms300`, при `prefers-reduced-motion` — 0. |
| L8 | `sticky` Header: sticky top 0. `sticky` Sidebar: sticky top 0, stretch по высоте родителя. |
| L9 | Триггер по умолчанию внизу aside: **IconButton** `GHOST`, иконка `IconPlainerChevronDown` (поворот). `aria-expanded`, `aria-controls={asideId}`. Подписи: «Свернуть панель» / «Развернуть панель». |
| L10 | `trigger={null}` скрывает и дефолтный нижний триггер, и zero-width кнопку. `collapsible={false}` без кастомного trigger — триггера нет. Zero-width кнопка только при `collapsedWidth={0}` и collapsed и `trigger !== null`. |
| L11 | Header/Footer/Sidebar не скругляют весь каркас. |

## A11y

| ID | Требование |
|----|------------|
| H1 | Landmarks: header → banner, aside → complementary, main → main, footer → contentinfo. |
| H2 | Один `<main>` на страницу в docs; компонент всегда рендерит `<main>`. |
| H3 | Триггер связан с aside через `aria-controls`. |
| H4 | collapsedWidth 0: скрытая панель не фокусируется. |

## Вне scope

- Grid, Drawer, встроенный Sidemenu / NavigationMenu.
- Отдельная тёмная палитра только у сайдбара.
- Полиморфный `as`.
- `getScrollContainer`.
- Ключ брейкпоинта `xs` / `xxl`.
- Новый `theme.layout` / `theme.sizes.sidebar`.

## Тесты

- Header-Content-Footer: roles banner / main / contentinfo.
- Sidebar в детях → `data-has-sidebar`, complementary.
- collapsible: клик → `aria-expanded` и `onCollapsedChange(..., 'trigger')`.
- collapsedWidth 0: в collapsed нет фокуса внутри aside, есть крайний trigger.
- overlay: `data-sidebar-overlay`, spacer не равен expanded width.
- scrollMode content: Content `data-scroll="content"`.
- breakpoint helper: 991 < 992 (`lg`) → below true.
- placement end → `data-placement="end"`.

## Storybook / docs

Basic; HeaderContentFooter; HeaderSidebar; SidebarEnd; Collapsible; CustomTrigger; Overlay; Responsive; StickyHeader; StickySidebar; ScrollModeContent.

В сайдбаре — Sidemenu **или** текст. `DOC_LAYOUT`: отличие от Sidemenu и Grid.

## CHANGELOG `[0.3.0]`

Added: **Layout**, **Layout.Header**, **Layout.Sidebar**, **Layout.Content**, **Layout.Footer**.
