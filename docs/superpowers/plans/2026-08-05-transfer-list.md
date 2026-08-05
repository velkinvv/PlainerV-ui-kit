# TransferList Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Добавить компонент `TransferList` — две панели с переносом пунктов (basic/enhanced), гибридным value API, поиском и HTML5 DnD в стиле UI-kit.

**Architecture:** Корень `TransferList` держит модель панелей и checked-selection; панели/кнопки/строки — отдельные файлы; чистая логика в `handlers.ts`. Переиспользуем `Checkbox`, `Button`/`IconButton`, `Input`, `Icon`. Без новых DnD-зависимостей.

**Tech Stack:** React, TypeScript, styled-components, Jest + Testing Library, Storybook, существующие UI-kit примитивы.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-05-transfer-list-design.md`
- Не упоминать сторонние UI-киты в коде, Storybook и docs
- Стили отдельно от JSX; JSDoc пропсов/параметров на русском; optional chaining; осмысленные имена
- Выносить переиспользуемую логику в `handlers.ts` / корневые `handlers` при необходимости
- **Коммиты не создавать**, пока пользователь явно не попросит
- `npm test` / `npm run type-check` из `web/`

## File Structure

| File | Responsibility |
|------|----------------|
| `web/src/types/ui.ts` | `TransferListItem`, `TransferListChangePayload`, `TransferListProps`, `TransferListVariant` |
| `web/src/components/ui/TransferList/handlers.ts` | split/move/reorder/filter/select-all pure functions |
| `web/src/components/ui/TransferList/handlers.test.ts` | unit-тесты handlers |
| `web/src/components/ui/TransferList/TransferList.style.ts` | layout, panel, list, drop indicator |
| `web/src/components/ui/TransferList/TransferListItemRow.tsx` | checkbox row + drag |
| `web/src/components/ui/TransferList/TransferListPanel.tsx` | title, search, select-all, list |
| `web/src/components/ui/TransferList/TransferListActions.tsx` | move buttons |
| `web/src/components/ui/TransferList/TransferList.tsx` | state, wiring |
| `web/src/components/ui/TransferList/TransferList.test.tsx` | integration tests |
| `web/src/components/ui/TransferList/TransferList.stories.tsx` | Storybook |
| `web/src/components/ui/TransferList/index.ts` | public export |
| `web/src/components/ui/index.ts` | barrel |
| `web/src/components/ui/storyDocs/uiKitDocs.ts` | `DOC_TRANSFER_LIST` |
| `web/CHANGELOG.md` | запись Added |

---

### Task 1: Types + pure handlers + unit tests

**Files:**
- Modify: `web/src/types/ui.ts` (рядом с другими UI-типами, например после List/Chip)
- Create: `web/src/components/ui/TransferList/handlers.ts`
- Create: `web/src/components/ui/TransferList/handlers.test.ts`

**Interfaces:**
- Produces:
  - `TransferListVariant = 'basic' | 'enhanced'`
  - `TransferListItem`, `TransferListChangePayload`, `TransferListSide = 'left' | 'right'`
  - `TransferListProps` (полный набор из spec)
  - `buildTransferListItemMap(items)`
  - `resolveTransferListPanels(...)`
  - `moveTransferListValues(...)`
  - `moveAllTransferListValues(...)`
  - `reorderTransferListValues(...)`
  - `filterTransferListItems(...)`
  - `resolveTransferListSelectAllState(...)`
  - `toggleTransferListSelectAllChecked(...)`
  - `getTransferListDragValues(...)`

- [ ] **Step 1: Добавить типы в `ui.ts`**

```ts
export type TransferListVariant = 'basic' | 'enhanced';
export type TransferListSide = 'left' | 'right';
export type TransferListChangeReason = 'move' | 'move-all' | 'dnd' | 'reorder';

export type TransferListItem = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  description?: React.ReactNode;
};

export type TransferListChangePayload = {
  leftValue: string[];
  rightValue: string[];
  reason: TransferListChangeReason;
};

export interface TransferListProps extends BaseComponentProps {
  items: TransferListItem[];
  value?: string[];
  defaultValue?: string[];
  leftValue?: string[];
  defaultLeftValue?: string[];
  rightValue?: string[];
  defaultRightValue?: string[];
  onChange?: (payload: TransferListChangePayload) => void;
  variant?: TransferListVariant;
  showMoveAll?: boolean;
  searchable?: boolean;
  draggable?: boolean;
  leftTitle?: React.ReactNode;
  rightTitle?: React.ReactNode;
  leftSearchPlaceholder?: string;
  rightSearchPlaceholder?: string;
  leftSearch?: string;
  rightSearch?: string;
  onLeftSearchChange?: (query: string) => void;
  onRightSearchChange?: (query: string) => void;
  disabled?: boolean;
  size?: Size;
  color?: ControlColor | string;
  fullWidth?: boolean;
  height?: number | string;
  renderItem?: (
    item: TransferListItem,
    context: { checked: boolean; side: TransferListSide },
  ) => React.ReactNode;
  emptyLeftText?: React.ReactNode;
  emptyRightText?: React.ReactNode;
  ariaLabel?: string;
  moveSelectedRightAriaLabel?: string;
  moveSelectedLeftAriaLabel?: string;
  moveAllRightAriaLabel?: string;
  moveAllLeftAriaLabel?: string;
}
```

- [ ] **Step 2: Написать failing unit-тесты handlers**

Файл `handlers.test.ts` — минимум:

```ts
describe('resolveTransferListPanels', () => {
  it('простой режим: value = справа, слева = остаток в порядке items', () => {
    const items = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
      { value: 'c', label: 'C' },
    ];
    expect(resolveTransferListPanels({ items, rightValue: ['b'] })).toEqual({
      leftValue: ['a', 'c'],
      rightValue: ['b'],
    });
  });
});

describe('moveTransferListValues', () => {
  it('переносит выбранные слева направо в конец', () => {
    expect(
      moveTransferListValues({
        leftValue: ['a', 'b', 'c'],
        rightValue: ['d'],
        movingValues: ['a', 'c'],
        direction: 'to-right',
      }),
    ).toEqual({ leftValue: ['b'], rightValue: ['d', 'a', 'c'] });
  });
});

describe('filterTransferListItems', () => {
  it('фильтрует по label/description без изменения модели', () => {
    const items = [
      { value: '1', label: 'Alpha', description: 'one' },
      { value: '2', label: 'Beta' },
    ];
    expect(filterTransferListItems(items, 'alp').map((i) => i.value)).toEqual(['1']);
  });
});

describe('reorderTransferListValues / getTransferListDragValues', () => {
  it('reorder внутри панели', () => {
    expect(reorderTransferListValues(['a', 'b', 'c'], ['b'], 0)).toEqual(['b', 'a', 'c']);
  });
  it('drag выбранного пункта тянет все checked с панели', () => {
    expect(
      getTransferListDragValues({
        itemValue: 'b',
        checkedValues: ['a', 'b'],
        panelValues: ['a', 'b', 'c'],
      }),
    ).toEqual(['a', 'b']);
  });
});
```

- [ ] **Step 3: Запустить тесты — ожидать FAIL**

Run: `npm test -- --testPathPattern=TransferList/handlers --watchAll=false`  
Expected: FAIL (модуль/функции отсутствуют)

- [ ] **Step 4: Реализовать `handlers.ts`**

Ключевые сигнатуры (JSDoc на русском у каждой функции):

```ts
export const resolveTransferListPanels = (options: {
  items: TransferListItem[];
  /** Controlled/internal right when simple mode */
  rightValue?: string[];
  leftValue?: string[];
}): { leftValue: string[]; rightValue: string[] };

export const moveTransferListValues = (options: {
  leftValue: string[];
  rightValue: string[];
  movingValues: string[];
  direction: 'to-right' | 'to-left';
  /** индекс вставки в целевой панели; omit = append */
  insertIndex?: number;
}): { leftValue: string[]; rightValue: string[] };

export const moveAllTransferListValues = (options: {
  leftValue: string[];
  rightValue: string[];
  itemsByValue: Map<string, TransferListItem>;
  direction: 'to-right' | 'to-left';
}): { leftValue: string[]; rightValue: string[] };
// переносит только не-disabled

export const filterTransferListItems = (
  items: TransferListItem[],
  query: string,
): TransferListItem[];

export const resolveTransferListSelectAllState = (options: {
  visibleItems: TransferListItem[];
  checkedValues: Set<string>;
}): { checked: boolean; indeterminate: boolean };

export const toggleTransferListSelectAllChecked = (options: {
  visibleItems: TransferListItem[];
  checkedValues: string[];
  selectAll: boolean;
}): string[];

export const reorderTransferListValues = (
  panelValues: string[],
  movingValues: string[],
  insertIndex: number,
): string[];

export const getTransferListDragValues = (options: {
  itemValue: string;
  checkedValues: string[];
  panelValues: string[];
}): string[];
```

- [ ] **Step 5: Запустить тесты — ожидать PASS**

Run: `npm test -- --testPathPattern=TransferList/handlers --watchAll=false`  
Expected: PASS

---

### Task 2: Styles + ItemRow + Panel + Actions (presentational)

**Files:**
- Create: `TransferList.style.ts`
- Create: `TransferListItemRow.tsx`
- Create: `TransferListPanel.tsx`
- Create: `TransferListActions.tsx`

**Interfaces:**
- Consumes: types + handlers filter/select-all helpers
- Produces: presentational components принимающие callbacks (без собственной модели left/right)

- [ ] **Step 1: `TransferList.style.ts`**

Семантические обёртки:

- `TransferListRoot` — flex row, `fullWidth`, gap; `@media (max-width: 720px)` column
- `TransferListPanelRoot` — border `theme.colors.borderSecondary`, radius, background `theme.colors.card` / `input`
- `TransferListPanelHeader`, `TransferListSearchWrap`, `TransferListList` (scroll, `$height`)
- `TransferListItemButton` / row styles, `$dragging`, `$dropIndicator`
- `TransferListActionsColumn` — vertical stack кнопок
- `TransferListEmpty` — muted text
- `TransferListCounter` — caption

Без inline-стилей в компонентах.

- [ ] **Step 2: `TransferListItemRow`**

Пропсы (JSDoc):

```ts
type TransferListItemRowProps = {
  item: TransferListItem;
  side: TransferListSide;
  checked: boolean;
  disabled: boolean;
  size: Size;
  color?: ControlColor | string;
  draggable: boolean;
  showDropIndicatorBefore?: boolean;
  renderItem?: TransferListProps['renderItem'];
  onCheckedChange: (checked: boolean) => void;
  onDragStart: (event: React.DragEvent, itemValue: string) => void;
  onDragOver: (event: React.DragEvent, itemValue: string) => void;
  onDrop: (event: React.DragEvent, itemValue: string) => void;
  onDragEnd: () => void;
};
```

Разметка: `li` → `Checkbox` + label/description (+ `renderItem` если задан). `draggable` на row при `draggable && !disabled`.

- [ ] **Step 3: `TransferListPanel`**

Пропсы: `side`, `title`, `items` (уже отфильтрованные visible), `allPanelValues`, `checkedValues`, `variant`, `searchable`, `searchQuery`, `onSearchChange`, `selectAll` handlers, `emptyText`, list of rows props, `listId`, `titleId`.

Enhanced: Checkbox indeterminate + `aria-live` счётчик `N/M`.

Search: `Input` size SM, placeholder.

- [ ] **Step 4: `TransferListActions`**

Кнопки через `IconButton` или `Button` + `Icon` (`PhosphorCaretRight` / `Left`, для move-all — double carets или `PhosphorCaretDoubleRight` если есть в наборе; иначе два Caret / текст `≫`).

Пропсы: `variant`, `showMoveAll`, disabled flags, aria labels, onMove* callbacks, `size`.

---

### Task 3: Root `TransferList` + wiring state

**Files:**
- Create: `TransferList.tsx`
- Create: `index.ts`

**Interfaces:**
- Consumes: Panel, Actions, ItemRow, handlers, types
- Produces: `TransferList` export

- [ ] **Step 1: Реализовать controlled/uncontrolled панели**

Логика режима:

```ts
const isExplicitPanels =
  leftValueProp !== undefined || rightValueProp !== undefined;

// simple: right from value/defaultValue; left = items order minus right
// explicit: leftValue/rightValue (или defaults)
```

Checked selection — **локальный** state `checkedLeft` / `checkedRight` (не в value API). После move — сбросить checked у перенесённых.

- [ ] **Step 2: Wiring move / move-all / search / DnD**

- `onChange({ leftValue, rightValue, reason })`
- DnD: `dataTransfer.setData('application/x-transfer-list', JSON.stringify({ side, values }))`
- drop на row → `insertIndex`; drop на пустой list → append
- same-side drop → `reorder` reason; cross-side → `dnd`

- [ ] **Step 3: `index.ts`**

```ts
export { TransferList } from './TransferList';
```

---

### Task 4: Integration tests

**Files:**
- Create: `TransferList.test.tsx`

- [ ] **Step 1: Тесты**

```ts
it('basic: переносит выбранный пункт направо', async () => { ... });
it('basic: move all', async () => { ... });
it('enhanced: select all отмечает видимые', async () => { ... });
it('простой value контролирует правую панель', () => { ... });
it('поиск скрывает пункт, но value не меняется', async () => { ... });
it('disabled блокирует кнопки', () => { ... });
it('item.disabled нельзя отметить', () => { ... });
```

Render через существующий `renderWithTheme` (как в Checkbox/Pagination тестах).

- [ ] **Step 2: Запуск**

Run: `npm test -- --testPathPattern=TransferList --watchAll=false`  
Expected: PASS

---

### Task 5: Stories, docs, barrel, CHANGELOG, type-check

**Files:**
- Create: `TransferList.stories.tsx`
- Modify: `web/src/components/ui/index.ts` — export рядом с List/Checkbox
- Modify: `uiKitDocs.ts` — `DOC_TRANSFER_LIST`
- Modify: `CHANGELOG.md` — Added
- Stories meta: category **Inputs** или **Data Display** (предпочтительно **Inputs**, рядом с Select)

- [ ] **Step 1: Stories** — Basic, Enhanced, ControlledValue, ExplicitPanels, Searchable, Draggable, Disabled, CustomRender, SizesColors

- [ ] **Step 2: Barrel + DOC + CHANGELOG**

- [ ] **Step 3: Проверки**

Run: `npm run type-check`  
Run: `npm test -- --testPathPattern=TransferList --watchAll=false`  
Expected: оба PASS

---

## Spec coverage checklist

| Spec section | Task |
|--------------|------|
| basic / enhanced | 2–3 |
| hybrid value | 1, 3, 4 |
| searchable | 1–4 |
| draggable / reorder | 1, 3, 4 |
| theme / a11y | 2–3 |
| tests / stories / docs | 4–5 |
| no third-party kit mentions | Global + 5 |

## Placeholder scan

Нет TBD/TODO в шагах; сигнатуры и команды указаны явно.
