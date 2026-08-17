# FloatButton Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Добавить семейство `FloatButton` / `FloatButton.Group` / `FloatButton.BackTop`: плавающая кнопка в углу viewport или в контейнере, веер действий, режим «наверх» и кольцо прогресса скролла.

**Architecture:** Чистые хелперы считают placement, якорь, видимость BackTop и прогресс. Корень порталится в `document.body` (viewport) или в `getContainer()`. Визуал из `theme.buttons`, `theme.shadow`, `theme.borderRadius`, `ControlColor`. Group держит состояние `open` и раскладывает пункты по `expandPlacement`. BackTop подписывается на scroll.

**Tech Stack:** React 19, TypeScript, styled-components 6, framer-motion, Jest + Testing Library, Storybook 9.

## Global Constraints

- Комментарии в коде — на русском.
- Имена без однобуквенных сокращений.
- JSDoc у пропсов и функций.
- Optional chaining при вложенности.
- Стили только в `FloatButton.style.ts`.
- Хелперы — в `FloatButton/handlers.ts` (не дублировать `buttonThemeHandlers` / `controlAccentColorHandlers`).
- В docs/коде не упоминать сторонние UI-библиотеки.
- Не смешивать с FloatingMenu / ActionBar.
- Коммиты — только после утверждения текста; ниже — предлагаемые сообщения.
- Spec: `docs/superpowers/specs/2026-08-17-float-button-design.md`

---

## File map

| File | Role |
|------|------|
| `src/types/ui.ts` | Типы/пропсы FloatButton |
| `src/components/ui/FloatButton/handlers.ts` | Placement, якорь, BackTop, badge, partition children |
| `src/components/ui/FloatButton/handlers.test.ts` | Unit |
| `src/components/ui/FloatButton/FloatButton.style.ts` | Слоты, кнопка, веер, кольцо |
| `src/components/ui/FloatButton/FloatButtonContext.tsx` | Контекст группы (inGroup, size, shape) |
| `src/components/ui/FloatButton/FloatButton.tsx` | Кнопка + compound export |
| `src/components/ui/FloatButton/FloatButtonGroup.tsx` | Веер |
| `src/components/ui/FloatButton/FloatButtonBackTop.tsx` | Обёртка BackTop |
| `src/components/ui/FloatButton/FloatButton.test.tsx` | RTL |
| `src/components/ui/FloatButton/FloatButton.stories.tsx` | Сторис |
| `src/components/ui/FloatButton/index.ts` | Реэкспорт |
| `src/components/ui/index.ts` | Barrel |
| `src/components/ui/storyDocs/uiKitDocs.ts` | `DOC_FLOAT_BUTTON` |
| `CHANGELOG.md` | `[0.3.0]` |

---

### Task 1: Типы + хелперы (TDD)

**Files:**
- Modify: `src/types/ui.ts` (после `AlertTitleProps` ~1464)
- Create: `src/components/ui/FloatButton/handlers.ts`
- Create: `src/components/ui/FloatButton/handlers.test.ts`

**Interfaces:**
- Produces:
  - `FloatButtonShape`, `FloatButtonPlacement`, `FloatButtonExpandPlacement`, `FloatButtonGroupTrigger`
  - `FloatButtonItem`, `FloatButtonProps`, `FloatButtonGroupProps`, `FloatButtonBackTopProps`
  - `FLOAT_BUTTON_DEFAULT_INSET_PX = 24`
  - `FLOAT_BUTTON_DEFAULT_Z_INDEX = 1100`
  - `FLOAT_BUTTON_DEFAULT_VISIBILITY_HEIGHT_PX = 400`
  - `FLOAT_BUTTON_DEFAULT_SCROLL_DURATION_MS = 450`
  - `resolveFloatButtonPlacement(placement?: FloatButtonPlacement): FloatButtonPlacement`
  - `resolveFloatButtonInsetPx(insetPx?: number): number`
  - `getFloatButtonEdgeOffsets(placement: FloatButtonPlacement, insetPx: number): { insetBlockStart?: number; insetBlockEnd?: number; insetInlineStart?: number; insetInlineEnd?: number }`
  - `shouldShowFloatButtonBackTop(scrollTopPx: number, visibilityHeightPx: number): boolean`
  - `getFloatButtonScrollProgressRatio(scrollTopPx: number, scrollHeightPx: number, clientHeightPx: number): number` — 0..1
  - `resolveFloatButtonScrollDurationMs(durationMs: number \| undefined, prefersReducedMotion: boolean): number`
  - `resolveFloatButtonBadge(badge?: React.ReactNode \| number \| true): { visible: boolean; isDot: boolean; content: React.ReactNode }`
  - `partitionFloatButtonGroupChildren(children: React.ReactNode): { trigger: React.ReactNode; actions: React.ReactNode[] }` — последний элемент — триггер

- [ ] **Step 1: Failing unit-тесты**

Создать `handlers.test.ts`:

```ts
import React from 'react';
import {
  FLOAT_BUTTON_DEFAULT_INSET_PX,
  FLOAT_BUTTON_DEFAULT_SCROLL_DURATION_MS,
  FLOAT_BUTTON_DEFAULT_VISIBILITY_HEIGHT_PX,
  getFloatButtonEdgeOffsets,
  getFloatButtonScrollProgressRatio,
  partitionFloatButtonGroupChildren,
  resolveFloatButtonBadge,
  resolveFloatButtonInsetPx,
  resolveFloatButtonPlacement,
  resolveFloatButtonScrollDurationMs,
  shouldShowFloatButtonBackTop,
} from './handlers';

describe('resolveFloatButtonPlacement', () => {
  it('default bottom-end', () => {
    expect(resolveFloatButtonPlacement()).toBe('bottom-end');
    expect(resolveFloatButtonPlacement('top-start')).toBe('top-start');
  });
});

describe('getFloatButtonEdgeOffsets', () => {
  it('bottom-end → block-end + inline-end', () => {
    expect(getFloatButtonEdgeOffsets('bottom-end', 24)).toEqual({
      insetBlockEnd: 24,
      insetInlineEnd: 24,
    });
  });

  it('top-start → block-start + inline-start', () => {
    expect(getFloatButtonEdgeOffsets('top-start', 16)).toEqual({
      insetBlockStart: 16,
      insetInlineStart: 16,
    });
  });
});

describe('BackTop helpers', () => {
  it('скрыт ниже порога, показан на пороге', () => {
    expect(shouldShowFloatButtonBackTop(399, 400)).toBe(false);
    expect(shouldShowFloatButtonBackTop(400, FLOAT_BUTTON_DEFAULT_VISIBILITY_HEIGHT_PX)).toBe(true);
  });

  it('progress 0 на верху, 1 внизу', () => {
    expect(getFloatButtonScrollProgressRatio(0, 1000, 200)).toBe(0);
    expect(getFloatButtonScrollProgressRatio(800, 1000, 200)).toBe(1);
    expect(getFloatButtonScrollProgressRatio(400, 1000, 200)).toBe(0.5);
  });

  it('reduced motion → duration 0', () => {
    expect(resolveFloatButtonScrollDurationMs(undefined, true)).toBe(0);
    expect(resolveFloatButtonScrollDurationMs(undefined, false)).toBe(
      FLOAT_BUTTON_DEFAULT_SCROLL_DURATION_MS,
    );
  });
});

describe('resolveFloatButtonBadge', () => {
  it('true → dot; число → content; пусто → hidden', () => {
    expect(resolveFloatButtonBadge(true)).toEqual({ visible: true, isDot: true, content: null });
    expect(resolveFloatButtonBadge(3)).toEqual({ visible: true, isDot: false, content: 3 });
    expect(resolveFloatButtonBadge(undefined)).toEqual({
      visible: false,
      isDot: false,
      content: null,
    });
  });
});

describe('partitionFloatButtonGroupChildren', () => {
  it('последний — триггер', () => {
    const partitioned = partitionFloatButtonGroupChildren([
      React.createElement('span', { key: 'a' }, 'A'),
      React.createElement('span', { key: 'b' }, 'B'),
      React.createElement('span', { key: 'c' }, 'C'),
    ]);
    expect(partitioned.actions).toHaveLength(2);
    expect(partitioned.trigger).toBeTruthy();
  });
});

describe('resolveFloatButtonInsetPx', () => {
  it('default 24', () => {
    expect(resolveFloatButtonInsetPx()).toBe(FLOAT_BUTTON_DEFAULT_INSET_PX);
    expect(resolveFloatButtonInsetPx(8)).toBe(8);
  });
});
```

- [ ] **Step 2: Запустить — FAIL**

Run: `cd /media/velkinvv/808689BA8689B168/project/plainerV/web && npx jest src/components/ui/FloatButton/handlers.test.ts --no-coverage`

Expected: FAIL — cannot find module / not exported.

- [ ] **Step 3: Типы в `src/types/ui.ts`**

После `AlertTitleProps`:

```ts
export type FloatButtonShape = 'circle' | 'square';
export type FloatButtonPlacement = 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start';
export type FloatButtonExpandPlacement = 'top' | 'bottom' | 'start' | 'end';
export type FloatButtonGroupTrigger = 'click' | 'hover';

export type FloatButtonItem = {
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

export type FloatButtonTriggerItem = Omit<FloatButtonItem, 'id'> & { id?: string };

/**
 * Пропсы плавающей кнопки.
 * @property icon - Иконка
 * @property label - Подпись рядом с иконкой
 * @property shape - circle (default) | square
 * @property variant - Вариант кнопки из темы
 * @property color - Override палитры
 * @property size - Размер
 * @property tooltip - Подсказка
 * @property badge - Badge: узел, число или `true` (точка)
 * @property href - Рендер ссылкой
 * @property backTop - Режим прокрутки наверх
 * @property placement - Угол viewport/контейнера
 * @property getContainer - Якорь контейнера
 * @property insetPx - Отступ от края
 * @property zIndex - Слой
 * @property inGroup - Служебный: пункт внутри Group (не позиционировать fixed)
 */
export interface FloatButtonProps extends BaseComponentProps {
  icon?: React.ReactNode;
  label?: React.ReactNode;
  shape?: FloatButtonShape;
  variant?: ButtonVariant;
  color?: ControlColor | string;
  size?: Size;
  tooltip?: React.ReactNode;
  badge?: React.ReactNode | number | true;
  href?: string;
  target?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  backTop?: boolean;
  placement?: FloatButtonPlacement;
  getContainer?: () => HTMLElement | null;
  insetPx?: number;
  zIndex?: number;
  inGroup?: boolean;
  'aria-label'?: string;
}

export interface FloatButtonGroupProps extends BaseComponentProps {
  children?: React.ReactNode;
  items?: FloatButtonItem[];
  triggerItem?: FloatButtonTriggerItem;
  trigger?: FloatButtonGroupTrigger;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  expandPlacement?: FloatButtonExpandPlacement;
  shape?: FloatButtonShape;
  variant?: ButtonVariant;
  color?: ControlColor | string;
  size?: Size;
  placement?: FloatButtonPlacement;
  getContainer?: () => HTMLElement | null;
  insetPx?: number;
  zIndex?: number;
  'aria-label'?: string;
}

export interface FloatButtonBackTopProps extends Omit<FloatButtonProps, 'backTop'> {
  visibilityHeight?: number;
  duration?: number;
  showProgress?: boolean;
  getScrollContainer?: () => HTMLElement | Window;
}
```

- [ ] **Step 4: Реализовать `handlers.ts`**

Логика:

- `resolveFloatButtonPlacement`: только четыре литерала, иначе `bottom-end`.
- `getFloatButtonEdgeOffsets`: map placement → logical insets.
- `getFloatButtonScrollProgressRatio`: `maxScroll = scrollHeight - clientHeight`; если `maxScroll <= 0` → `0`; иначе `clamp(scrollTop / maxScroll, 0, 1)`.
- `partitionFloatButtonGroupChildren`: `React.Children.toArray(children).filter(Boolean)`; если длина 0 — `{ trigger: null, actions: [] }`; иначе trigger = last, actions = rest.
- `resolveFloatButtonBadge`: `true` → dot; `0` / `null` / `undefined` / `false` → hidden; иначе visible + content.

- [ ] **Step 5: Тесты PASS**

Run: тот же jest. Expected: PASS

- [ ] **Step 6: Предложить коммит**

```
feat: добавил типы и хелперы FloatButton
```

---

### Task 2: Стили + одиночный FloatButton + позиционирование (TDD)

**Files:**
- Create: `FloatButton.style.ts`, `FloatButtonContext.tsx`, `FloatButton.tsx`, `index.ts`
- Create: `FloatButton.test.tsx` (кейсы одиночной кнопки)
- Modify: `src/components/ui/index.ts` — экспорт рядом с Alert

**Interfaces:**
- Consumes: типы и хелперы Task 1
- Produces: `FloatButton` с portal/fixed, shape, variant из `theme.buttons`, color через `resolveControlAccentColors` если задан, Badge, Tooltip, href

- [ ] **Step 1: Failing RTL**

`FloatButton.test.tsx`: ThemeProvider wrap как у Alert.

```ts
it('ставит data-placement bottom-end', () => {
  wrap(<FloatButton icon={<span>i</span>} aria-label="Добавить" />);
  expect(screen.getByRole('button', { name: 'Добавить' })).toBeInTheDocument();
  expect(document.querySelector('[data-float-button-root]')).toHaveAttribute(
    'data-placement',
    'bottom-end',
  );
});

it('getContainer → data-anchor=container', () => {
  const host = document.createElement('div');
  document.body.appendChild(host);
  wrap(
    <FloatButton icon={<span>i</span>} aria-label="В контейнере" getContainer={() => host} />,
  );
  expect(host.querySelector('[data-anchor="container"]')).toBeTruthy();
});
```

- [ ] **Step 2: Jest FAIL** (модуль не найден)

- [ ] **Step 3: Стили**

- `FloatButtonAnchor` — `position: fixed` или `absolute` (`$position`), z-index, logical insets из `$offsets`, `pointer-events: none` на корне; дети `pointer-events: auto`.
- `FloatButtonSurface` — `motion.button` / отдельный `FloatButtonLink` (`motion.a`): размеры как IconButton (XS/SM/MD/LG/XL), circle → `border-radius: 50%` (с label — pill: высота как size, radius 999px или 50% высоты), square → `BorderRadiusHandler(theme.borderRadius)`. `box-shadow: theme.shadow`. Вариант из `theme.buttons.variants[variant]`. Если `color` задан — фон/бордер/текст из `resolveControlAccentColors` + `resolveOnAccentTextColor` (для PRIMARY/filled); GHOST/OUTLINE — акцент на тексте/бордере, фон прозрачный/surface.
- С `label`: `padding-inline`, `gap`, `width: auto`, `min-width` как квадрат size.
- `FloatButtonBadgeSlot` — `position: absolute; inset-block-start: -4px; inset-inline-end: -4px`.
- `FloatButtonProgressSvg` — absolute overlay, `pointer-events: none`.

Контекст:

```ts
export type FloatButtonGroupContextValue = {
  inGroup: boolean;
  isTrigger: boolean;
};

export const FloatButtonGroupContext = createContext<FloatButtonGroupContextValue | null>(null);
```

- [ ] **Step 4: `FloatButton.tsx`**

- Если не `inGroup` (контекст null или `inGroup` prop false): обернуть в portal.
  - viewport: `createPortal(..., document.body)`, `$position='fixed'`.
  - container: portal в элемент `getContainer()`, `$position='absolute'`.
- SSR: портал только после mount (`useState` + `useEffect`).
- Кнопка: `type="button"`; при `href` — `<a>`.
- Tooltip если `tooltip != null`.
- Badge если `resolveFloatButtonBadge().visible`.
- Icon default при `backTop` без icon — отложить до Task 4; в Task 2 `backTop` можно игнорировать (логика скролла в Task 4).
- `className` `ui-float-button`. `data-shape`, `data-float-button-root` на якоре.
- Dev: `console.warn` если нет `label` и нет `aria-label` (и нет `backTop`).

Compound пока: `FloatButton.Group` / `BackTop` назначить после Task 3–4; в Task 2 экспортировать заглушки нельзя — назначить в конце Task 4. В Task 2 экспортировать только кнопку, в `index.ts` реэкспорт `FloatButton`. В Task 3 дополнить.

- [ ] **Step 5: Barrel**

В `components/ui/index.ts` после Alert:

```ts
export { FloatButton } from './FloatButton';
export type {
  FloatButtonProps,
  FloatButtonGroupProps,
  FloatButtonBackTopProps,
  FloatButtonItem,
  FloatButtonShape,
  FloatButtonPlacement,
} from '@/types/ui';
```

- [ ] **Step 6: Jest PASS** по `FloatButton.test.tsx`

- [ ] **Step 7: Предложить коммит**

```
feat: добавил одиночный FloatButton с якорем viewport и контейнера
```

---

### Task 3: FloatButton.Group (TDD)

**Files:**
- Create: `FloatButtonGroup.tsx`
- Modify: `FloatButton.tsx` (читать контекст: не порталить пункт веера)
- Modify: `FloatButton.test.tsx`

**Interfaces:**
- Consumes: `partitionFloatButtonGroupChildren`, `FloatButtonItem`
- Produces: `FloatButton.Group`

- [ ] **Step 1: Failing tests**

```ts
it('Group click открывает веер из items', async () => {
  wrap(
    <FloatButton.Group
      aria-label="Действия"
      triggerItem={{ icon: <span>+</span>, ariaLabel: 'Открыть' }}
      items={[{ id: 'mail', icon: <span>m</span>, ariaLabel: 'Почта' }]}
    />,
  );
  expect(screen.queryByRole('menuitem', { name: 'Почта' })).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'Открыть' }));
  expect(screen.getByRole('menuitem', { name: 'Почта' })).toBeInTheDocument();
});
```

- [ ] **Step 2: FAIL**

- [ ] **Step 3: Реализация Group**

- Якорь как у одиночной кнопки (portal + placement).
- Состояние `open` / `defaultOpen` / `onOpenChange`.
- `trigger=click`: toggle; `hover`: mouseenter/leave (+ focus-within).
- Escape закрывает при click.
- Триггер: `aria-expanded`, `aria-haspopup="true"`.
- Веер: `role="menu"`, `data-expand={expandPlacement}`, flex-direction column для top/bottom, row для start/end; `gap: 12px`.
- Children приоритетнее `items`.
- `items` + `triggerItem`: сматчить в `FloatButton` с `inGroup`.
- Пункты веера: `role="menuitem"`, по клику закрыть группу (если не controlled без onOpenChange — всё равно вызвать onOpenChange(false) в uncontrolled).
- Стили веера в `FloatButton.style.ts`: `FloatButtonFan`.

Назначить `FloatButton.Group = FloatButtonGroup`.

- [ ] **Step 4: PASS**

- [ ] **Step 5: Предложить коммит**

```
feat: добавил FloatButton.Group с веером click/hover и items
```

---

### Task 4: BackTop + progress (TDD)

**Files:**
- Create: `FloatButtonBackTop.tsx`
- Modify: `FloatButton.tsx` (проп `backTop`)
- Modify: `FloatButton.test.tsx`, `handlers` если нужно scrollTo helper

**Interfaces:**
- Produces: `FloatButton.BackTop`; `backTop` на корне

- [ ] **Step 1: Failing tests**

```ts
it('BackTop скрыт до порога', () => {
  wrap(<FloatButton.BackTop visibilityHeight={400} aria-label="Наверх" />);
  expect(screen.queryByRole('button', { name: 'Наверх' })).toBeNull();
});

it('backTop показывает кнопку после scroll', () => {
  // mock window.scrollY / listener: вызвать хелпер shouldShow = true через fake scroll event
});
```

Для jsdom: вынести подписку в хелпер

```ts
export const readScrollMetrics = (
  target: Window | HTMLElement,
): { scrollTopPx: number; scrollHeightPx: number; clientHeightPx: number }
```

`Window`: `scrollY`, `document.documentElement.scrollHeight`, `innerHeight`.  
Элемент: `scrollTop`, `scrollHeight`, `clientHeight`.

```ts
export const scrollFloatButtonTargetToTop = (
  target: Window | HTMLElement,
  durationMs: number,
): void
```

При `durationMs === 0` — `scrollTo({ top: 0, behavior: 'auto' })`, иначе `behavior: 'smooth'` (нативная; duration документируем как hint, в jsdom мокаем `scrollTo`).

Тест: spy `scrollTo` на window.

Default aria-label «Наверх». Default icon `IconPlainerArrowUp`.

- [ ] **Step 2: FAIL**

- [ ] **Step 3: Реализация**

- Хук внутри BackTop/FloatButton: subscribe scroll+resize, state `visible` + `progress`.
- Невидимый: не рендерить якорь (или `visibility` + `aria-hidden`, чтобы не занимать таб). Spec: скрыт — не в DOM кнопки.
- `showProgress`: SVG circle, `stroke-dashoffset` от ratio; цвета из акцента.
- `FloatButton.BackTop` рендерит `<FloatButton backTop showProgress={...} ... />`.
- Назначить `FloatButton.BackTop`.

- [ ] **Step 4: PASS** весь `FloatButton/`

- [ ] **Step 5: Предложить коммит**

```
feat: добавил FloatButton.BackTop и кольцо прогресса скролла
```

---

### Task 5: Storybook, DOC, CHANGELOG

**Files:**
- Create: `FloatButton.stories.tsx`, `FloatButton.stories.style.ts`
- Modify: `uiKitDocs.ts`, `CHANGELOG.md`

- [ ] **Step 1: Сторис**

Title: `UI Kit/Buttons/FloatButton` (рядом с Button) **или** `UI Kit/Navigation/FloatButton` — **Buttons**, т.к. это кнопка действия.

Сторис: Basic, Shapes, WithLabel, BadgeTooltip, GroupClick, GroupItems, BackTopProgress, InContainer (relative box + overflow scroll).

`layout: 'padded'`. Для viewport-кнопок в Storybook задать `placement` и не перекрывать docs nav критично — `insetPx={16}` ок.

- [ ] **Step 2: DOC_FLOAT_BUTTON**

Экранировать backticks `\``. Назначение, отличие от FloatingMenu/ActionBar, таблица пропсов, Group, BackTop.

- [ ] **Step 3: CHANGELOG `[0.3.0]` Added**

```md
- **FloatButton:** плавающая кнопка (`shape` circle/square, `variant`/`color` из темы), **FloatButton.Group** (веер click/hover, `items` + `triggerItem`), **FloatButton.BackTop** (порог скролла, опциональное кольцо прогресса, якорь viewport или `getContainer`).
```

Если секции `[0.3.0]` нет — создать под Unreleased по тому же шаблону, что в Alert-плане.

- [ ] **Step 4: `npx jest src/components/ui/FloatButton --no-coverage` PASS**

- [ ] **Step 5: Предложить коммит**

```
docs: добавил Storybook, DOC и CHANGELOG для FloatButton
```

---

## Self-review (spec coverage)

| Spec | Task |
|------|------|
| Viewport portal + `bottom-end` | 2 |
| `getContainer` absolute | 2 |
| circle/square + label | 2 |
| variant/color из темы | 2 |
| badge / tooltip / href | 2 |
| Group children last=trigger, items+triggerItem | 3 |
| click/hover, open, expandPlacement, a11y menu | 3 |
| BackTop + `backTop` + progress + reduced motion | 1+4 |
| Тесты / stories / DOC / CHANGELOG | 2–5 |
| Не FloatingMenu, без сторонних китов в docs | 5 |
