# Design: Alert

Дата: 2026-08-05  
Компонент UI-kit `@velkinvv/plainerv`

## Цель

Inline-уведомление в потоке страницы/формы: severity, варианты оформления, заголовок, иконка, action, закрытие. Не путать с Toast/Snackbar (overlay + провайдер) и Hint (подсказка у триггера).

## Размещение

`web/src/components/ui/Alert/`

- `Alert.tsx`, `AlertTitle.tsx`, `Alert.style.ts`, `handlers.ts`, `handlers.test.ts`, `Alert.test.tsx`, `Alert.stories.tsx`, `index.ts`

Типы в `types/ui.ts`. Экспорт в barrel. `DOC_ALERT` + CHANGELOG.

## API

- `severity`: success | info | warning | error (default success)
- `variant`: standard | filled | outlined (default standard)
- `color?: ControlColor | string` — override палитры
- `title?`, `children`, `icon?: ReactNode | false`, `iconMapping?`
- `action?`, `onClose?`, `closeAriaLabel?`
- `role?: 'alert' | 'status'` (default alert)
- `size?`, `fullWidth?`

Compound: `Alert.Title`.

## Вне scope

Таймер автоскрытия, portal, ToastProvider. Не упоминать сторонние UI-киты в docs/коде.
