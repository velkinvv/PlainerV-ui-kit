# Alert `actionPlacement` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Дать Alert проп `actionPlacement` (`end` | `bottom`), чтобы слот `action` мог стоять справа или под текстом, при этом `onClose` всегда справа и не вытесняется `action`.

**Architecture:** Чистые хелперы решают default и в какой слот класть `action`. Корень остаётся рядом: иконка | колонка текста (+ нижний action) | правый кластер (`end`-action и/или крестик). Стили — в `Alert.style.ts`.

**Tech Stack:** React 19, TypeScript, styled-components 6, Jest + Testing Library, Storybook 9.

## Global Constraints

- Комментарии в коде — на русском.
- Имена переменных без однобуквенных сокращений.
- Props/функции — с JSDoc описанием параметров.
- Optional chaining при вложенности.
- Стили — в `Alert.style.ts`, не inline в компоненте.
- Новые хелперы — в `Alert/handlers.ts` (не дублировать существующие).
- Коммиты — только после утверждения текста пользователем; в шагах — предлагаемые сообщения.
- Spec: `docs/superpowers/specs/2026-08-17-alert-action-placement-design.md`

---

## File map

| File | Role |
|------|------|
| `src/types/ui.ts` | Тип `AlertActionPlacement`, проп `actionPlacement?` в `AlertProps` |
| `src/components/ui/Alert/handlers.ts` | `resolveAlertActionPlacement`, флаги слотов action |
| `src/components/ui/Alert/handlers.test.ts` | Unit на хелперы |
| `src/components/ui/Alert/Alert.style.ts` | `AlertMainColumn`, `AlertActionBottomSlot`, `AlertTrailingSlot` |
| `src/components/ui/Alert/Alert.tsx` | Раскладка end/bottom; `action` + `onClose` вместе |
| `src/components/ui/Alert/Alert.test.tsx` | RTL: placement, оба слота, отсутствие action |
| `src/components/ui/Alert/Alert.stories.tsx` | Сторис end / bottom |
| `src/components/ui/storyDocs/uiKitDocs.ts` | `DOC_ALERT` |
| `CHANGELOG.md` | Added / Changed в `[0.3.0]` |

---

### Task 1: Типы + хелперы `actionPlacement` (TDD)

**Files:**
- Modify: `src/types/ui.ts` (`AlertProps` ~1428–1458)
- Modify: `src/components/ui/Alert/handlers.ts`
- Modify: `src/components/ui/Alert/handlers.test.ts`

**Interfaces:**
- Produces:
  - `export type AlertActionPlacement = 'end' | 'bottom'`
  - `AlertProps.actionPlacement?: AlertActionPlacement`
  - `resolveAlertActionPlacement(actionPlacement?: AlertActionPlacement): AlertActionPlacement` — `'bottom'` только при явном `'bottom'`, иначе `'end'`
  - `shouldRenderAlertBottomAction(action: React.ReactNode \| undefined, actionPlacement: AlertActionPlacement): boolean`
  - `shouldRenderAlertEndAction(action: React.ReactNode \| undefined, actionPlacement: AlertActionPlacement): boolean`

- [ ] **Step 1: Добавить failing unit-тесты хелперов**

В конец `src/components/ui/Alert/handlers.test.ts` (импорты расширить):

```ts
import {
  getAlertDefaultIconName,
  resolveAlertActionPlacement,
  resolveAlertCloseHitAreaPx,
  resolveAlertIconNode,
  resolveAlertPaletteKey,
  resolveAlertSurfaceTokens,
  shouldRenderAlertBottomAction,
  shouldRenderAlertEndAction,
  shouldUseAlertDefaultIconName,
} from './handlers';

describe('resolveAlertActionPlacement', () => {
  it('default и неизвестное → end', () => {
    expect(resolveAlertActionPlacement()).toBe('end');
    expect(resolveAlertActionPlacement(undefined)).toBe('end');
    expect(resolveAlertActionPlacement('end')).toBe('end');
  });

  it('bottom только при явном значении', () => {
    expect(resolveAlertActionPlacement('bottom')).toBe('bottom');
  });
});

describe('shouldRenderAlertEndAction / shouldRenderAlertBottomAction', () => {
  const actionNode = 'Отменить';

  it('без action слоты пустые', () => {
    expect(shouldRenderAlertEndAction(undefined, 'end')).toBe(false);
    expect(shouldRenderAlertBottomAction(undefined, 'bottom')).toBe(false);
  });

  it('end кладёт action в правый слот', () => {
    expect(shouldRenderAlertEndAction(actionNode, 'end')).toBe(true);
    expect(shouldRenderAlertBottomAction(actionNode, 'end')).toBe(false);
  });

  it('bottom кладёт action под текст', () => {
    expect(shouldRenderAlertEndAction(actionNode, 'bottom')).toBe(false);
    expect(shouldRenderAlertBottomAction(actionNode, 'bottom')).toBe(true);
  });
});
```

- [ ] **Step 2: Запустить тесты — должны упасть**

Run: `cd /media/velkinvv/808689BA8689B168/project/plainerV/web && npx jest src/components/ui/Alert/handlers.test.ts --no-coverage`

Expected: FAIL — `resolveAlertActionPlacement` / `shouldRenderAlert*` is not exported / not a function.

- [ ] **Step 3: Типы в `src/types/ui.ts`**

Перед `export interface AlertProps` добавить:

```ts
/** Расположение слота `action` у Alert. */
export type AlertActionPlacement = 'end' | 'bottom';
```

В JSDoc `AlertProps` заменить строку `@property action` и добавить placement:

```ts
 * @property action - Слот действия (кнопки и т.п.)
 * @property actionPlacement - `end` (справа, default) | `bottom` (под текстом, вправо)
 * @property onClose - Крестик справа; можно вместе с `action`
```

В интерфейс:

```ts
  action?: React.ReactNode;
  actionPlacement?: AlertActionPlacement;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
```

- [ ] **Step 4: Хелперы в `handlers.ts`**

Импорт `AlertActionPlacement` из `../../../types/ui`. В конец файла:

```ts
/**
 * Резолв расположения action: default `end`.
 * @param actionPlacement - Проп Alert
 */
export const resolveAlertActionPlacement = (
  actionPlacement?: AlertActionPlacement,
): AlertActionPlacement => (actionPlacement === 'bottom' ? 'bottom' : 'end');

/**
 * Нужен ли правый слот для `action`.
 * @param action - Слот действия
 * @param actionPlacement - Уже резолвнутый placement
 */
export const shouldRenderAlertEndAction = (
  action: React.ReactNode | undefined,
  actionPlacement: AlertActionPlacement,
): boolean => action != null && actionPlacement === 'end';

/**
 * Нужен ли нижний слот для `action`.
 * @param action - Слот действия
 * @param actionPlacement - Уже резолвнутый placement
 */
export const shouldRenderAlertBottomAction = (
  action: React.ReactNode | undefined,
  actionPlacement: AlertActionPlacement,
): boolean => action != null && actionPlacement === 'bottom';
```

`React.ReactNode` — импортировать тип (`import type { ReactNode } from 'react'` уже есть): использовать `ReactNode` в сигнатурах, как в остальных хелперах файла.

- [ ] **Step 5: Запустить тесты — должны пройти**

Run: `cd /media/velkinvv/808689BA8689B168/project/plainerV/web && npx jest src/components/ui/Alert/handlers.test.ts --no-coverage`

Expected: PASS

- [ ] **Step 6: Предложить коммит (не выполнять без утверждения)**

```
feat: добавил типы и хелперы actionPlacement для Alert
```

---

### Task 2: Стили + раскладка Alert + RTL-тесты (TDD)

**Files:**
- Modify: `src/components/ui/Alert/Alert.style.ts`
- Modify: `src/components/ui/Alert/Alert.tsx`
- Modify: `src/components/ui/Alert/Alert.test.tsx`

**Interfaces:**
- Consumes: `resolveAlertActionPlacement`, `shouldRenderAlertEndAction`, `shouldRenderAlertBottomAction`, `AlertActionPlacement`
- Produces: `data-action-placement` на корне; `action` + `onClose` одновременно; нижний слот только под колонкой текста

- [ ] **Step 1: Добавить failing RTL-тесты**

В `Alert.test.tsx` **заменить** кейс `'action вместо дефолтного close'` на `'action и onClose рендерятся вместе'`:

```ts
  it('action и onClose рендерятся вместе', () => {
    wrap(
      <Alert
        severity="success"
        onClose={() => undefined}
        action={
          <Button variant={ButtonVariant.GHOST} size={Size.SM}>
            Отменить
          </Button>
        }
      >
        Сохранено
      </Alert>,
    );
    expect(screen.getByText('Отменить')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Закрыть' })).toBeInTheDocument();
  });

  it('default data-action-placement=end', () => {
    wrap(<Alert severity="info">Текст</Alert>);
    expect(screen.getByRole('alert')).toHaveAttribute('data-action-placement', 'end');
  });

  it('actionPlacement=bottom ставит атрибут и не прячет close', () => {
    wrap(
      <Alert
        severity="warning"
        actionPlacement="bottom"
        onClose={() => undefined}
        action={
          <Button variant={ButtonVariant.GHOST} size={Size.SM}>
            Подтвердить
          </Button>
        }
      >
        Длинный текст
      </Alert>,
    );
    const alertRoot = screen.getByRole('alert');
    expect(alertRoot).toHaveAttribute('data-action-placement', 'bottom');
    expect(screen.getByText('Подтвердить')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Закрыть' })).toBeInTheDocument();
  });

  it('bottom без action не рисует нижний слот, close остаётся', () => {
    wrap(
      <Alert severity="info" actionPlacement="bottom" onClose={() => undefined}>
        Только close
      </Alert>,
    );
    expect(screen.getByRole('button', { name: 'Закрыть' })).toBeInTheDocument();
    expect(screen.getByRole('alert').querySelector('[data-alert-action="bottom"]')).toBeNull();
  });
```

- [ ] **Step 2: Запустить RTL — должны упасть**

Run: `cd /media/velkinvv/808689BA8689B168/project/plainerV/web && npx jest src/components/ui/Alert/Alert.test.tsx --no-coverage`

Expected: FAIL — close отсутствует при `action`; нет `data-action-placement`.

- [ ] **Step 3: Стили в `Alert.style.ts`**

`AlertActionSlot` больше не использовать как единственный правый слот. Добавить / заменить:

```ts
/** Колонка заголовка, текста и нижнего action. */
export const AlertMainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1 1 auto;
  min-width: 0;
`;

type AlertTrailingSlotStyleProps = {
  $alignSelf: 'center' | 'flex-start';
};

/**
 * Правый кластер: end-action и/или крестик.
 * @property $alignSelf - `center` при end; `flex-start` при bottom (крестик сверху)
 */
export const AlertTrailingSlot = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<AlertTrailingSlotStyleProps>`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 4px;
  margin-inline-start: auto;
  align-self: ${({ $alignSelf }) => $alignSelf};
`;

/**
 * Нижний слот action: под колонкой текста, вправо.
 */
export const AlertActionBottomSlot = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  width: 100%;
`;
```

`AlertActionSlot` удалить, если больше нигде не нужен (после правки `Alert.tsx`). `AlertBody` оставить как есть.

- [ ] **Step 4: Раскладка в `Alert.tsx`**

Импорты: хелперы placement; стили `AlertMainColumn`, `AlertTrailingSlot`, `AlertActionBottomSlot` вместо `AlertActionSlot`.

В пропсах компонента добавить `actionPlacement` в деструктуризацию и JSDoc `@param props.actionPlacement`.

Внутри `AlertBase` после `resolvedAction` **не** смешивать action и close в один node. Вместо этого:

```ts
  const resolvedActionPlacement = resolveAlertActionPlacement(actionPlacement);
  const showEndAction = shouldRenderAlertEndAction(action, resolvedActionPlacement);
  const showBottomAction = shouldRenderAlertBottomAction(action, resolvedActionPlacement);

  const closeButton =
    onClose != null ? (
      <AlertCloseButton
        type="button"
        aria-label={closeAriaLabel}
        onClick={onClose}
        $iconColor={surface.text}
        $sizePx={resolveAlertCloseHitAreaPx(size)}
      >
        <Icon name="PhosphorX" size={resolveCloseIconSize(size)} color="currentColor" />
      </AlertCloseButton>
    ) : null;

  const showTrailingSlot = showEndAction || closeButton != null;
```

JSX:

```tsx
    <AlertRoot
      className={clsx('ui-alert', className)}
      role={role}
      data-severity={severity}
      data-variant={variant}
      data-action-placement={resolvedActionPlacement}
      $fullWidth={fullWidth}
      $background={surface.background}
      $border={surface.border}
      $text={surface.text}
      $padding={geometry.padding}
      $gap={geometry.gap}
    >
      {showIcon ? (
        <AlertIconSlot $accent={iconAccent} $iconSizePx={iconSizePx} aria-hidden>
          {useDefaultIcon ? (
            <Icon
              name={getAlertDefaultIconName(severity)}
              size={resolveCloseIconSize(size)}
              color="currentColor"
            />
          ) : (
            customIcon
          )}
        </AlertIconSlot>
      ) : null}

      <AlertTitleProvider value={{ titleColor, fontSize: geometry.titleFontSize }}>
        <AlertMainColumn>
          <AlertBody $fontSize={geometry.fontSize}>
            {title != null && title !== false ? (
              <AlertTitleRoot $titleColor={titleColor} $fontSize={geometry.titleFontSize}>
                {title}
              </AlertTitleRoot>
            ) : null}
            {children != null && children !== false ? children : null}
          </AlertBody>
          {showBottomAction ? (
            <AlertActionBottomSlot data-alert-action="bottom">{action}</AlertActionBottomSlot>
          ) : null}
        </AlertMainColumn>
      </AlertTitleProvider>

      {showTrailingSlot ? (
        <AlertTrailingSlot $alignSelf={showBottomAction ? 'flex-start' : 'center'}>
          {showEndAction ? <span data-alert-action="end">{action}</span> : null}
          {closeButton}
        </AlertTrailingSlot>
      ) : null}
    </AlertRoot>
```

Обертку `<span data-alert-action="end">` можно заменить на styled-фрагмент без лишнего DOM: достаточно `data-alert-action="end"` на `AlertTrailingSlot`, если там есть action. Для тестов bottom достаточно `[data-alert-action="bottom"]`. Для end отдельный атрибут не обязателен (покрытие — `data-action-placement="end"` + текст кнопки). Если span не нужен тестам — не добавлять, класть `{showEndAction ? action : null}` напрямую.

Итоговый trailing:

```tsx
      {showTrailingSlot ? (
        <AlertTrailingSlot $alignSelf={showBottomAction ? 'flex-start' : 'center'}>
          {showEndAction ? action : null}
          {closeButton}
        </AlertTrailingSlot>
      ) : null}
```

- [ ] **Step 5: Запустить RTL — должны пройти**

Run: `cd /media/velkinvv/808689BA8689B168/project/plainerV/web && npx jest src/components/ui/Alert --no-coverage`

Expected: PASS (handlers + Alert.test)

- [ ] **Step 6: Предложить коммит (не выполнять без утверждения)**

```
feat: вынес action Alert вниз через actionPlacement и оставил close справа
```

---

### Task 3: Storybook, DOC_ALERT, CHANGELOG

**Files:**
- Modify: `src/components/ui/Alert/Alert.stories.tsx`
- Modify: `src/components/ui/storyDocs/uiKitDocs.ts` (`DOC_ALERT` ~1597)
- Modify: `CHANGELOG.md` (`## [0.3.0]`)

**Interfaces:**
- Consumes: публичный проп `actionPlacement`

- [ ] **Step 1: Сторис**

В `argTypes` добавить:

```ts
    actionPlacement: {
      control: 'radio',
      options: ['end', 'bottom'],
    },
```

Существующую `WithCloseAndAction` оставить как end (кнопка без явного пропа). Добавить:

```tsx
export const ActionEndWithClose: Story = {
  name: 'actionPlacement end + close',
  render: () => (
    <Alert
      severity="success"
      fullWidth
      onClose={() => undefined}
      action={
        <Button variant={ButtonVariant.GHOST} size={Size.SM}>
          Отменить
        </Button>
      }
    >
      Кнопка справа и крестик в одном ряду.
    </Alert>
  ),
};

export const ActionBottomWithClose: Story = {
  name: 'actionPlacement bottom + close',
  render: () => (
    <Alert
      severity="warning"
      fullWidth
      actionPlacement="bottom"
      onClose={() => undefined}
      title="Подтвердите действие"
      action={
        <>
          <Button variant={ButtonVariant.GHOST} size={Size.SM}>
            Отмена
          </Button>
          <Button variant={ButtonVariant.PRIMARY} size={Size.SM}>
            Подтвердить
          </Button>
        </>
      }
    >
      Кнопки под текстом вправо, крестик справа сверху.
    </Alert>
  ),
};

export const ActionBottomWithoutClose: Story = {
  name: 'actionPlacement bottom без close',
  render: () => (
    <Alert
      severity="info"
      fullWidth
      actionPlacement="bottom"
      action={
        <Button variant={ButtonVariant.GHOST} size={Size.SM}>
          Подробнее
        </Button>
      }
    >
      Только нижний action, без крестика.
    </Alert>
  ),
};
```

Проверить, что `ButtonVariant.PRIMARY` существует; если нет — взять тот же вариант, что в других сторис кнопок (`ButtonVariant.FILLED` / `CONTAINED` / актуальное имя из `types/ui.ts`).

- [ ] **Step 2: DOC_ALERT**

В таблице пропсов заменить строку `action` / `onClose` и добавить placement. Backticks экранировать как `\`` (иначе Rollup TS1005 в template literal):

```
| \`action\` | Слот кнопок; вместе с \`onClose\` |
| \`actionPlacement\` | \`end\` (справа, default) \\| \`bottom\` (под текстом, вправо) |
| \`onClose\` | Крестик всегда справа сверху |
```

- [ ] **Step 3: CHANGELOG `[0.3.0]`**

В секцию Added:

```md
- **Alert:** проп **`actionPlacement`** (`end` | `bottom`); `bottom` — кнопки под колонкой текста, выравнивание вправо.
```

В секцию Changed (создать, если нет):

```md
### Changed

- **Alert:** `action` больше не скрывает крестик `onClose`; оба слота можно показать вместе.
```

- [ ] **Step 4: Прогнать тесты Alert ещё раз**

Run: `cd /media/velkinvv/808689BA8689B168/project/plainerV/web && npx jest src/components/ui/Alert --no-coverage`

Expected: PASS

- [ ] **Step 5: Предложить коммит (не выполнять без утверждения)**

```
docs: описал actionPlacement Alert в Storybook, DOC и CHANGELOG
```

---

## Self-review (spec coverage)

| Spec | Task |
|------|------|
| `actionPlacement?: 'end' \| 'bottom'`, default `end` | Task 1 + 2 (`data-action-placement`) |
| `onClose` всегда справа, проп на него не влияет | Task 2 |
| `action` + `onClose` вместе (breaking) | Task 2 (замена старого теста) |
| Bottom: под колонкой текста, `flex-end` | Task 2 (`AlertActionBottomSlot`) |
| Close `flex-start` при bottom, cluster `center` при end | Task 2 `$alignSelf` |
| Порядок при end: action, затем крестик | Task 2 JSX |
| RTL: `margin-inline-start`, не `margin-left` | Task 2 `AlertTrailingSlot` |
| `data-action-placement` | Task 2 |
| Тесты / stories / DOC / CHANGELOG | Task 2–3 |
| Вне scope (auto, отдельный `actions`) | не делаем |
