# Design: Alert `actionPlacement`

Дата: 2026-08-17  
Компонент UI-kit `@velkinvv/plainerv`  
Ветка: `v_0.3.0`  
Дополняет: [2026-08-05-alert-design.md](./2026-08-05-alert-design.md)

## Цель

Слот `action` можно показать не только справа от текста, но и снизу под текстом. Крестик `onClose` всегда справа и не зависит от этого пропа.

## Контекст

Сейчас корень Alert — ряд `icon | body | action`. `AlertActionSlot` справа (`margin-left: auto`, `align-self: center`). Если передан `action`, крестик `onClose` не рендерится.

Потребителям нужны кнопки под текстом (длинный copy + «Подтвердить» / «Отмена»), при этом крестик остаётся в правом верхнем углу.

## Размещение

`web/src/components/ui/Alert/`

- `Alert.tsx`, `Alert.style.ts`, `Alert.test.tsx`, `Alert.stories.tsx`
- типы: `AlertProps` в `types/ui.ts`
- документация: `DOC_ALERT`, CHANGELOG `[0.3.0]`

Хелпер раскладки — в `Alert/handlers.ts`, если нужна чистая функция выбора слотов (тестируется в `handlers.test.ts`). Иначе логика в `Alert.tsx` + RTL-тесты.

## API

```ts
actionPlacement?: 'end' | 'bottom'; // default: 'end'
```

| Значение | Поведение |
|----------|-----------|
| `end` | `action` справа, в одном ряду с крестиком (если есть `onClose`). Текущий вид слота. |
| `bottom` | `action` под колонкой текста, выравнивание **вправо** (`flex-end`). Не под иконкой и не под крестиком. |

- Default `'end'` — без `actionPlacement` визуал как в 0.2.9, кроме breaking change ниже.
- Проп влияет **только** на `action`. `onClose` всегда справа сверху.
- `action` и `onClose` можно передавать вместе в обоих режимах.

### Breaking change

Раньше `action` вытеснял крестик. Теперь оба рендерятся. Потребители, которые передавали оба пропа и рассчитывали на скрытый close, увидят крестик.

## Layout

Корень остаётся горизонтальным flex (`align-items: flex-start`).

```
end:     [icon] [title / text] [action] [x]
bottom:  [icon] [title / text]          [x]
                [      btn btn]
```

| ID | Требование |
|----|------------|
| L1 | Колонка текста (`AlertBody`) — `flex: 1; min-width: 0`. При `bottom` внутри колонки: body, затем слот action с `justify-content: flex-end`, `flex-wrap: wrap`, тот же `gap`, что у текущего `AlertActionSlot`. |
| L2 | Крестик — отдельный слот справа от колонки текста, `align-self: flex-start` (верх ряда, не центр всей высоты вместе с нижними кнопками). |
| L3 | При `end`: `action` и крестик в правом кластере (`inline-flex`, gap 4px). Порядок: сначала `action`, затем крестик. Кластер `align-self: center` как сейчас у `AlertActionSlot`, если нет нижних кнопок. |
| L4 | Иконка не сдвигается: при `bottom` кнопки начинаются от левого края колонки текста, выравниваются к правому краю этой колонки. |
| L5 | RTL: `end` = логический конец ряда (не хардкод `right`). Низ: `flex-end` в колонке текста. |
| L6 | `data-action-placement` на корне для тестов и сторис. |

## Вне scope

- Автоперенос `end` → `bottom` по ширине
- Отдельный слот `actions` помимо `action`
- Изменение внешнего вида кнопок внутри `action` (потребитель передаёт свои `Button`)
- Таймер автоскрытия / portal

## Тесты

Обновить кейс «action вместо дефолтного close»: при обоих пропах видны и кнопка action, и «Закрыть».

Добавить:

- `actionPlacement="bottom"` — action под текстом (`data-action-placement="bottom"`), крестик справа если `onClose`
- default / `"end"` — action справа
- без `action` при `bottom` — слот action не рендерится; `onClose` по-прежнему справа

## Storybook / docs

- Сторис: `end` (кнопка + close), `bottom` (две кнопки под текстом + close), `bottom` без close
- `DOC_ALERT`: строка про `actionPlacement`; `action` / `onClose` больше не «или»
- CHANGELOG `[0.3.0]`: Added проп; Changed — `action` больше не скрывает close
