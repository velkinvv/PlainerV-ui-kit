# Design: Stepper `variant="linear"` в узком контейнере

Дата: 2026-08-16  
Компонент UI-kit `@velkinvv/plainerv`  
Приоритет: высокий (overflow в auth-карточках ≤480px)

## Цель

`Stepper` с `variant="linear"` укладывается в ширину родителя от **280px** без горизонтального overflow страницы/карточки, при сохранении читаемости и a11y. На широких панелях (≥ ~720px) визуал desktop без регрессии.

## Контекст / корневая причина

Наблюдение: 4 шага с длинными RU `title` в контейнере ~320–480px выходят за padding карточки.

В текущей реализации:

- `StepperLinearStepTitle` — `white-space: nowrap`
- `StepperLinearStepCell` — `flex-shrink: 0` (ряд не сжимается)
- соединители с intrinsic min суммарно раздувают ряд
- нет режима «узкий контейнер» → потребители обходят через `variant="compact"`

Временный обход в klassar (`RegisterStepperForm`: compact + укороченные title) **не** является решением в kit.

## Размещение

`web/src/components/ui/Stepper/`

- `Stepper.tsx`, `Stepper.style.ts`, `handlers.ts`, `handlers.test.ts`
- `Stepper.stories.tsx`, `Stepper.stories.styles.ts`, `index.ts`
- тесты overflow / a11y — рядом (`Stepper.test.tsx` или расширение существующих)

Типы: `StepperLinearProps` / `StepperLinearStep` в `types/ui.ts`.  
Документация: Storybook docs, CHANGELOG, при необходимости страница Stepper в `documentation/…/v_0.2.9`.

## API

Новый опциональный проп только у **linear**:

```ts
titleLayout?: 'nowrap' | 'wrap' | 'hidden' | 'auto'; // default: 'auto'
```

| Значение | Поведение |
|----------|-----------|
| `nowrap` | Текущий desktop-вид: без переноса title (явный opt-in к старому поведению). |
| `wrap` | `white-space: normal`, `overflow-wrap: anywhere` (или `break-word`), `line-clamp: 2`. |
| `hidden` | Визуально: кружок + короткий `stepLabel` (если нет — «Шаг N»). Полный `title` — в accessible name и `title`-атрибуте / tooltip на hover+focus. |
| `auto` | **Default.** По ширине **контейнера Stepper**: если `< 520px` → эффективный режим `hidden` (кружок + `stepLabel` или «Шаг N»); если ≥ 520px → `nowrap`. |

Порог **520px** — константа в handlers (`STEPPER_LINEAR_NARROW_CONTAINER_MAX_PX = 520`), документируется в Storybook.

### Авто-режим

- Предпочтительно **CSS container queries** на корневом `nav` (`container-type: inline-size`).
- Если для логики (tooltip / смена DOM для `hidden`) нужен JS — **ResizeObserver** на корне с тем же порогом; без смены `variant` снаружи.
- `variant="compact"` остаётся отдельным UX-выбором, не автоподменой.

### Не ломаем

- `StepperCompactProps` без изменений.
- На ширине ≥ ~720px при `titleLayout="auto"` или `"nowrap"` — макет как сейчас (кружки, соединители, однострочные title).

## Layout / CSS (обязательно)

| ID | Требование |
|----|------------|
| L1 | Корень `nav` при `fullWidth`: `width: 100%`, `max-width: 100%`, `min-width: 0`, `box-sizing: border-box`. |
| L2 | Ячейки шага: `min-width: 0`, сжимаемый flex (`flex: 1 1 0` или эквивалент); убрать `flex-shrink: 0`. |
| L3 | Title: не форсировать `nowrap` как единственный режим; режимы через `titleLayout` (см. API). |
| L4 | Соединители сжимаются с рядом; `min-width` соединителя минимальный (текущие ~12px допустимы, без жёсткого min на ячейке). |
| L5 | Кнопка «назад» не выталкивает ряд: ряд шагов `flex: 1; min-width: 0`. |

## A11y

| ID | Требование |
|----|------------|
| H1 | Активный/любой шаг озвучивается: имя шага доступно скринридеру даже при `hidden` / auto-narrow (visually hidden текст или `aria-label` на интерактивной/семантической ячейке). |
| H2 | Кнопка «назад»: без регрессий фокуса и `aria-*`. |

Текст `title` типа `ReactNode`: если `title` — строка, в режиме `hidden`/auto-narrow кладём её в visually hidden span и/или `title`-атрибут ячейки. Если `title` — сложный ReactNode без строки, для a11y полагаемся на видимый `stepLabel` / «Шаг N»; рекомендация потребителям — строковый `title` в формах. Новый prop `aria-label` у шага **не** вводим в этом релизе.

## Тесты / Storybook

| ID | Требование |
|----|------------|
| T1 | Story: linear, 4 шага, длинные RU title, контейнер **360px** и **480px** — нет horizontal overflow (`scrollWidth <= clientWidth` у корня Stepper или обёртки). |
| T2 | Story: 3 и 5 шагов в **320px**. |
| T3 | Wide **960px** / default — без визуальной регрессии относительно текущего макета. |
| T4 | Unit/RTL: при `titleLayout="hidden"` в a11y-tree остаётся accessible name шага. |

План работ: сначала failing story/тест overflow (T1), затем CSS L1–L5 + API, затем wide regression, затем docs/CHANGELOG.

## Критерии приёмки

1. Storybook «Linear / narrow 360px / 4 steps / long RU titles» — нет horizontal overflow контейнера.
2. Storybook «Linear / wide 960px» — без визуальной регрессии.
3. CHANGELOG / Storybook docs: описан `titleLayout`, порог auto 520px, миграция (default `auto` может менять узкий макет относительно прежнего nowrap-only).
4. klassar может вернуть `variant="linear"` на `/register` без обхода через `compact` **только из‑за overflow**.

## Semver

**Minor** в линейке 0.2.x: новый проп `titleLayout` + изменение default на узкой ширине (`auto` → hidden ниже 520px). В CHANGELOG: Added `titleLayout`, Changed — default behavior linear titles in narrow containers. Opt-out без смены макета: `titleLayout="nowrap"`.

## Вне scope

- Замена или редизайн `variant="compact"`.
- Бизнес-логика шагов регистрации klassar.
- Обязательный редизайн цветов/типографики linear вне правок для сжатия.
- Chromatic CI, если в репо ещё не подключён — достаточно локальных stories + unit; visual regression — по возможностям команды.

## Референс воспроизведения

- klassar web-app `/register`, `AuthCard` ~480px.
- Типичные title: «Роль», «Контакты», «Реквизиты организации», «Согласия».
- Viewport ~375 CSS px.
