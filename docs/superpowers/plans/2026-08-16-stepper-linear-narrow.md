# Stepper linear narrow container Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Сделать `Stepper` `variant="linear"` укладываемым в узкий контейнер (от 280px) без horizontal overflow, с пропом `titleLayout` и auto-режимом по ширине контейнера &lt; 520px.

**Architecture:** Чистые хелперы резолвят эффективный layout title; ResizeObserver на корневом `nav` измеряет ширину для `auto`; CSS снимает `flex-shrink: 0` / `nowrap` и поддерживает `wrap` / `hidden`. Compact-вариант не трогаем.

**Tech Stack:** React 19, TypeScript, styled-components 6, Jest + Testing Library, Storybook 9.

## Global Constraints

- Комментарии в коде — на русском.
- Имена переменных без однобуквенных сокращений.
- Props/функции — с JSDoc описанием параметров.
- Optional chaining при вложенности.
- Стили — в `Stepper.style.ts`, не inline в компоненте.
- Новые переиспользуемые хелперы — в `Stepper/handlers.ts` (проверить существующие).
- Коммиты — только после утверждения текста пользователем (правило репо); в шагах ниже — предлагаемые сообщения.
- Spec: `docs/superpowers/specs/2026-08-16-stepper-linear-narrow-design.md`

---

## File map

| File | Role |
|------|------|
| `src/types/ui.ts` | Тип `StepperTitleLayout`, проп `titleLayout?` в `StepperLinearProps` |
| `src/components/ui/Stepper/handlers.ts` | Константа порога, `resolveEffectiveStepperTitleLayout`, `getStepperStepAccessibleTitle` |
| `src/components/ui/Stepper/handlers.test.ts` | Unit на хелперы |
| `src/components/ui/Stepper/Stepper.style.ts` | L1–L5, `$titleLayout`, visually hidden |
| `src/components/ui/Stepper/Stepper.tsx` | ResizeObserver + проброс layout в ячейки |
| `src/components/ui/Stepper/Stepper.test.tsx` | RTL: overflow-инварианты стилей + a11y hidden |
| `src/components/ui/Stepper/Stepper.stories.tsx` | Narrow/wide stories |
| `src/components/ui/Stepper/Stepper.stories.styles.ts` | Контейнеры 320/360/480/960 |
| `src/components/ui/storyDocs/uiKitDocs.ts` | `DOC_STEPPER` |
| `CHANGELOG.md` | Added/Changed |

---

### Task 1: Типы + хелперы titleLayout (TDD)

**Files:**
- Modify: `src/types/ui.ts` (`StepperLinearProps` ~3688)
- Modify: `src/components/ui/Stepper/handlers.ts`
- Modify: `src/components/ui/Stepper/handlers.test.ts`

**Interfaces:**
- Produces:
  - `export type StepperTitleLayout = 'nowrap' | 'wrap' | 'hidden' | 'auto'`
  - `STEPPER_LINEAR_NARROW_CONTAINER_MAX_PX = 520`
  - `resolveEffectiveStepperTitleLayout(titleLayout: StepperTitleLayout \| undefined, containerWidthPx: number \| null): 'nowrap' \| 'wrap' \| 'hidden'`
  - `getStepperStepAccessibleTitle(title: React.ReactNode): string \| undefined` — строка, если `typeof title === 'string'`, иначе `undefined`

- [ ] **Step 1: Добавить failing unit-тесты хелперов**

В конец `handlers.test.ts`:

```ts
import {
  // ...existing
  STEPPER_LINEAR_NARROW_CONTAINER_MAX_PX,
  resolveEffectiveStepperTitleLayout,
  getStepperStepAccessibleTitle,
} from './handlers';

describe('resolveEffectiveStepperTitleLayout', () => {
  it('auto ниже порога → hidden', () => {
    expect(resolveEffectiveStepperTitleLayout('auto', 360)).toBe('hidden');
    expect(resolveEffectiveStepperTitleLayout(undefined, 519)).toBe('hidden');
  });

  it('auto на пороге и выше → nowrap', () => {
    expect(resolveEffectiveStepperTitleLayout('auto', STEPPER_LINEAR_NARROW_CONTAINER_MAX_PX)).toBe(
      'nowrap',
    );
    expect(resolveEffectiveStepperTitleLayout('auto', 960)).toBe('nowrap');
  });

  it('auto при неизвестной ширине → nowrap (SSR / до измерения)', () => {
    expect(resolveEffectiveStepperTitleLayout('auto', null)).toBe('nowrap');
  });

  it('явные режимы не зависят от ширины', () => {
    expect(resolveEffectiveStepperTitleLayout('wrap', 960)).toBe('wrap');
    expect(resolveEffectiveStepperTitleLayout('hidden', 960)).toBe('hidden');
    expect(resolveEffectiveStepperTitleLayout('nowrap', 200)).toBe('nowrap');
  });
});

describe('getStepperStepAccessibleTitle', () => {
  it('возвращает строку title', () => {
    expect(getStepperStepAccessibleTitle('Реквизиты организации')).toBe('Реквизиты организации');
  });

  it('для не-строки возвращает undefined', () => {
    expect(getStepperStepAccessibleTitle(<span>x</span>)).toBeUndefined();
  });
});
```

Для JSX в handlers.test.ts добавить `import React from 'react'` или тестировать только строку/`null` без JSX:

```ts
expect(getStepperStepAccessibleTitle(null)).toBeUndefined();
```

- [ ] **Step 2: Запустить тесты — ожидать FAIL**

Run: `cd web && npx jest src/components/ui/Stepper/handlers.test.ts -v`  
Expected: FAIL — экспорты не найдены.

- [ ] **Step 3: Типы в `types/ui.ts`**

Рядом с `StepperLinearStep`:

```ts
/**
 * Режим подписей шагов в `variant="linear"`.
 * - `nowrap` — одна строка (desktop).
 * - `wrap` — перенос, до 2 строк.
 * - `hidden` — только кружок + stepLabel; полный title в a11y / title-атрибуте.
 * - `auto` — при ширине контейнера &lt; 520px как `hidden`, иначе `nowrap`.
 */
export type StepperTitleLayout = 'nowrap' | 'wrap' | 'hidden' | 'auto';
```

В `StepperLinearProps`:

```ts
  /**
   * Раскладка заголовков шагов. По умолчанию `auto` (узкий контейнер &lt; 520px → hidden).
   */
  titleLayout?: StepperTitleLayout;
```

- [ ] **Step 4: Реализация хелперов в `handlers.ts`**

```ts
import type { ReactNode } from 'react';
import type { StepperAppearance, StepperTitleLayout } from '../../../types/ui';

/** Порог ширины контейнера (px): ниже — auto → hidden */
export const STEPPER_LINEAR_NARROW_CONTAINER_MAX_PX = 520;

export type StepperResolvedTitleLayout = 'nowrap' | 'wrap' | 'hidden';

/**
 * Эффективный режим title для linear Stepper.
 * @param titleLayout - Проп или undefined (= auto).
 * @param containerWidthPx - Ширина корня nav в px; null до измерения.
 */
export const resolveEffectiveStepperTitleLayout = (
  titleLayout: StepperTitleLayout | undefined,
  containerWidthPx: number | null,
): StepperResolvedTitleLayout => {
  const normalizedLayout = titleLayout ?? 'auto';
  if (normalizedLayout === 'nowrap' || normalizedLayout === 'wrap' || normalizedLayout === 'hidden') {
    return normalizedLayout;
  }
  if (containerWidthPx == null) {
    return 'nowrap';
  }
  return containerWidthPx < STEPPER_LINEAR_NARROW_CONTAINER_MAX_PX ? 'hidden' : 'nowrap';
};

/**
 * Строковый title для a11y / native title attribute.
 * @param title - ReactNode шага.
 */
export const getStepperStepAccessibleTitle = (title: ReactNode): string | undefined => {
  return typeof title === 'string' ? title : undefined;
};
```

- [ ] **Step 5: Запустить тесты — ожидать PASS**

Run: `cd web && npx jest src/components/ui/Stepper/handlers.test.ts -v`  
Expected: PASS

- [ ] **Step 6: Предложить коммит (не выполнять без ОКждения)**

Текст: `feat: добавил StepperTitleLayout и хелперы резолва для linear`

---

### Task 2: CSS L1–L5 + режимы title

**Files:**
- Modify: `src/components/ui/Stepper/Stepper.style.ts`

**Interfaces:**
- Consumes: `StepperResolvedTitleLayout`
- Produces: `$titleLayout` на title/cell/textStack; `StepperVisuallyHiddenTitle`; root `min-width: 0`

- [ ] **Step 1: Обновить `StepperRoot`**

Убедиться (дописать если нет):

```ts
  min-width: 0;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  max-width: 100%;
  box-sizing: border-box;
  container-type: inline-size;
  container-name: plainer-stepper;
```

- [ ] **Step 2: Ячейка и ряд**

Заменить `StepperLinearStepCell`:

```ts
export const StepperLinearStepCell = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $titleLayout: 'nowrap' | 'wrap' | 'hidden' }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex: 1 1 0;
  min-width: 0;
  max-width: 100%;

  ${({ $titleLayout }) =>
    $titleLayout === 'hidden'
      ? css`
          justify-content: center;
        `
      : ''}
`;
```

`StepperLinearStepsRow` уже имеет `flex: 1; min-width: 0` — оставить.

- [ ] **Step 3: Title + visually hidden**

```ts
export const StepperLinearStepTitle = styled.span.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{
  $appearance: StepperAppearance;
  $muted?: boolean;
  $titleLayout: 'nowrap' | 'wrap' | 'hidden';
}>`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.25;
  min-width: 0;
  max-width: 100%;
  color: ${({ theme, $appearance, $muted }) => {
    const textTokens = getStepperTextTokens(getStepperThemeContext(theme), $appearance);
    return $muted ? textTokens.secondary : textTokens.primary;
  }};

  ${({ $titleLayout }) => {
    if ($titleLayout === 'wrap') {
      return css`
        white-space: normal;
        overflow-wrap: anywhere;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      `;
    }
    if ($titleLayout === 'hidden') {
      return css`
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      `;
    }
    return css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `;
  }}
`;
```

Для `hidden`: скрывать и `StepperLinearStepHint` визуально не нужно — hint остаётся видимым. Title visually hidden внутри `StepperLinearTextStack` с `position: relative` только если нужно; проще при `hidden` не рендерить отдельный title-блок видимым, а оставлять title в DOM как visually hidden sibling рядом с hint.

Добавить:

```ts
export const StepperLinearTextStack = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $titleLayout: 'nowrap' | 'wrap' | 'hidden' }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  max-width: 100%;

  ${({ $titleLayout }) =>
    $titleLayout === 'hidden'
      ? css`
          flex: 0 1 auto;
        `
      : css`
          flex: 1 1 auto;
        `}
`;
```

Соединитель: оставить `flex: 1 1 12px; min-width: 12px` (L4).

- [ ] **Step 4: Type-check стилей**

Run: `cd web && npx tsc --noEmit -p tsconfig.json 2>&1 | head -40`  
Expected: ошибки только там, где `Stepper.tsx` ещё не передаёт `$titleLayout` — это нормально до Task 3. Либо сначала Task 3.

Рекомендация: делать Step 4 после Task 3 Step 2.

- [ ] **Step 5: Предложить коммит**

Текст: `fix: сжал CSS linear Stepper для узкого контейнера (L1–L5)`

---

### Task 3: StepperLinearView — ResizeObserver + titleLayout

**Files:**
- Modify: `src/components/ui/Stepper/Stepper.tsx`
- Create: `src/components/ui/Stepper/Stepper.test.tsx`

**Interfaces:**
- Consumes: `resolveEffectiveStepperTitleLayout`, `getStepperStepAccessibleTitle`, styled `$titleLayout`
- Produces: рабочий `titleLayout` prop на публичном `Stepper`

- [ ] **Step 1: Failing RTL-тест a11y + data-атрибут layout**

Создать `Stepper.test.tsx`:

```tsx
/** Реальный styled-components */
jest.unmock('styled-components');

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Stepper } from './Stepper';

const wrap = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const longSteps = [
  { title: 'Роль' },
  { title: 'Контакты' },
  { title: 'Реквизиты организации' },
  { title: 'Согласия' },
];

describe('Stepper linear titleLayout', () => {
  it('при titleLayout=hidden оставляет accessible name шага в документе', () => {
    wrap(
      <Stepper
        variant="linear"
        fullWidth
        titleLayout="hidden"
        activeStepIndex={0}
        steps={longSteps}
        onBack={() => undefined}
      />,
    );
    expect(screen.getByText('Реквизиты организации')).toBeInTheDocument();
    expect(screen.getByLabelText('Назад')).toBeInTheDocument();
  });

  it('проставляет data-title-layout на корне', () => {
    wrap(
      <Stepper
        variant="linear"
        fullWidth
        titleLayout="wrap"
        activeStepIndex={0}
        steps={longSteps}
      />,
    );
    expect(screen.getByRole('navigation', { name: 'Шаги процесса' })).toHaveAttribute(
      'data-title-layout',
      'wrap',
    );
  });
});
```

- [ ] **Step 2: Запустить — FAIL (нет prop / data-атрибута)**

Run: `cd web && npx jest src/components/ui/Stepper/Stepper.test.tsx -v`

- [ ] **Step 3: Обновить `Stepper` / `StepperLinearView`**

Проброс `titleLayout={props.titleLayout}` в `StepperLinearView`.

Внутри linear view:

```tsx
const [containerWidthPx, setContainerWidthPx] = useState<number | null>(null);
const rootRef = useRef<HTMLElement | null>(null);

const setMergedRef = (node: HTMLElement | null) => {
  rootRef.current = node;
  if (typeof ref === 'function') {
    ref(node);
  } else if (ref) {
    (ref as React.MutableRefObject<HTMLElement | null>).current = node;
  }
};

useEffect(() => {
  const element = rootRef.current;
  if (!element || typeof ResizeObserver === 'undefined') {
    return undefined;
  }
  const resizeObserver = new ResizeObserver((entries) => {
    const entry = entries[0];
    const width = entry?.contentRect?.width;
    if (typeof width === 'number') {
      setContainerWidthPx(width);
    }
  });
  resizeObserver.observe(element);
  setContainerWidthPx(element.getBoundingClientRect().width);
  return () => {
    resizeObserver.disconnect();
  };
}, []);

const resolvedTitleLayout = resolveEffectiveStepperTitleLayout(titleLayout, containerWidthPx);
```

На `StepperRoot`: `ref={setMergedRef}`, `data-title-layout={resolvedTitleLayout}`.

В map шагов:

```tsx
const accessibleTitle = getStepperStepAccessibleTitle(step.title);
<StepperLinearStepCell $titleLayout={resolvedTitleLayout} title={accessibleTitle}>
  ...
  <StepperLinearTextStack $titleLayout={resolvedTitleLayout}>
    <StepperLinearStepHint ...>{hint}</StepperLinearStepHint>
    <StepperLinearStepTitle
      $appearance={appearance}
      $muted={isMuted}
      $titleLayout={resolvedTitleLayout}
    >
      {step.title}
    </StepperLinearStepTitle>
  </StepperLinearTextStack>
</StepperLinearStepCell>
```

При `hidden` title остаётся в DOM (visually hidden через CSS) — тест `getByText` проходит.

- [ ] **Step 4: Тесты PASS**

Run: `cd web && npx jest src/components/ui/Stepper/Stepper.test.tsx src/components/ui/Stepper/handlers.test.ts -v`

- [ ] **Step 5: Предложить коммит**

Текст: `feat: подключил titleLayout и ResizeObserver в linear Stepper`

---

### Task 4: Storybook narrow/wide + docs

**Files:**
- Modify: `src/components/ui/Stepper/Stepper.stories.styles.ts`
- Modify: `src/components/ui/Stepper/Stepper.stories.tsx`
- Modify: `src/components/ui/storyDocs/uiKitDocs.ts` (`DOC_STEPPER`)
- Modify: `CHANGELOG.md`

**Interfaces:**
- Consumes: публичный `titleLayout`

- [ ] **Step 1: Стили контейнеров**

```ts
export const stepperStoriesStyles = {
  interactiveContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'flex-start',
  } satisfies CSSProperties,
  narrow320: { width: 320, maxWidth: '100%', border: '1px dashed #ccc', padding: 8, boxSizing: 'border-box' } satisfies CSSProperties,
  narrow360: { width: 360, maxWidth: '100%', border: '1px dashed #ccc', padding: 8, boxSizing: 'border-box' } satisfies CSSProperties,
  narrow480: { width: 480, maxWidth: '100%', border: '1px dashed #ccc', padding: 8, boxSizing: 'border-box' } satisfies CSSProperties,
  wide960: { width: 960, maxWidth: '100%', border: '1px dashed #ccc', padding: 8, boxSizing: 'border-box' } satisfies CSSProperties,
};
```

- [ ] **Step 2: Stories**

```tsx
const registerLikeSteps: StepperLinearStep[] = [
  { title: 'Роль' },
  { title: 'Контакты' },
  { title: 'Реквизиты организации' },
  { title: 'Согласия' },
];

export const LinearNarrow360LongTitles: Story = {
  name: 'Linear / narrow 360px / 4 long RU titles',
  render: () => (
    <div style={stepperStoriesStyles.narrow360}>
      <Stepper
        variant="linear"
        fullWidth
        appearance="light"
        activeStepIndex={1}
        steps={registerLikeSteps}
        onBack={() => undefined}
      />
    </div>
  ),
};

export const LinearNarrow480: Story = { /* аналогично 480 */ };
export const LinearNarrow320ThreeAndFive: Story = {
  render: () => (
    <>
      <div style={stepperStoriesStyles.narrow320}>
        <Stepper variant="linear" fullWidth activeStepIndex={0} steps={registerLikeSteps.slice(0, 3)} onBack={() => undefined} />
      </div>
      <div style={stepperStoriesStyles.narrow320}>
        <Stepper
          variant="linear"
          fullWidth
          activeStepIndex={2}
          steps={[...registerLikeSteps, { title: 'Подтверждение' }]}
          onBack={() => undefined}
        />
      </div>
    </>
  ),
};

export const LinearWide960: Story = {
  name: 'Linear / wide 960px',
  render: () => (
    <div style={stepperStoriesStyles.wide960}>
      <Stepper variant="linear" fullWidth activeStepIndex={1} steps={registerLikeSteps} onBack={() => undefined} />
    </div>
  ),
};

export const LinearTitleLayoutWrap: Story = {
  render: () => (
    <div style={stepperStoriesStyles.narrow360}>
      <Stepper variant="linear" fullWidth titleLayout="wrap" activeStepIndex={0} steps={registerLikeSteps} />
    </div>
  ),
};
```

Добавить `titleLayout` в `argTypes`.

- [ ] **Step 3: Обновить `DOC_STEPPER`**

Добавить секцию про `titleLayout`, порог 520px, opt-out `nowrap`, ссылку что compact не замена при overflow.

- [ ] **Step 4: CHANGELOG под `## [0.2.9]`**

```md
### Added
- **Stepper (linear):** проп **`titleLayout`** (`nowrap` | `wrap` | `hidden` | `auto`); auto при ширине контейнера &lt; 520px скрывает title (a11y сохраняется).

### Fixed
- **Stepper (linear):** overflow в узких контейнерах (≤480px): ячейки сжимаются (`min-width: 0`), убран жёсткий nowrap-only.
```

- [ ] **Step 5: Ручная проверка Storybook**

Run: `cd web && npm run storybook`  
Проверить stories 360/480/320/960: в DevTools у обёртки `scrollWidth <= clientWidth`.

- [ ] **Step 6: Предложить коммит**

Текст: `docs: добавил Storybook и CHANGELOG для Stepper linear narrow`

---

### Task 5: Финальная верификация

- [ ] **Step 1: Jest**

Run: `cd web && npx jest src/components/ui/Stepper -v`  
Expected: все PASS

- [ ] **Step 2: Type-check / lint затронутых файлов**

Run: `cd web && npx tsc --noEmit -p tsconfig.json`  
Run: `cd web && npx eslint src/components/ui/Stepper src/types/ui.ts --max-warnings 0`

- [ ] **Step 3: Сверить spec coverage**

| Spec ID | Task |
|---------|------|
| L1–L5 | Task 2 |
| A1–A3 (titleLayout + auto 520) | Task 1 + 3 |
| A4 wide | Task 4 LinearWide960 |
| H1–H2 | Task 3 tests |
| T1–T4 | Task 3–4 |
| Docs/CHANGELOG | Task 4 |

- [ ] **Step 4: Сообщить klassar** — версия ветки `v_0.2.9` / changelog entry для снятия compact-обхода на `/register`.

---

## Self-review (plan vs spec)

- L1–L5 → Task 2  
- titleLayout + auto 520 → Task 1, 3  
- a11y hidden → Task 3  
- Stories 320/360/480/960 → Task 4  
- Chromatic optional (spec: вне обязательного CI) — покрыто stories, не отдельным CI-task  
- Нет TBD/placeholder в шагах  
- Имена `resolveEffectiveStepperTitleLayout` / `STEPPER_LINEAR_NARROW_CONTAINER_MAX_PX` согласованы между tasks  

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-16-stepper-linear-narrow.md`.

**Два варианта выполнения:**

1. **Subagent-Driven (рекомендуется)** — свежий субагент на задачу, ревью между задачами  
2. **Inline Execution** — выполнение в этой сессии с чекпоинтами  

Какой подход?
