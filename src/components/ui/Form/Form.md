# Form Component

Компонент `Form` предназначен для группировки полей ввода и обеспечения контекста формы. Это помогает избежать предупреждений браузера о полях пароля вне формы.

## Основные возможности

- **Контекст формы**: Автоматически предоставляет контекст формы для всех дочерних компонентов
- **Группировка полей**: Связывает поля ввода с формой через атрибут `form`
- **Уникальные ID**: Автоматически генерирует уникальные ID формы если не предоставлены
- **Обработка отправки**: Поддерживает обработчик отправки формы
- **Доступность**: Включает компонент `HiddenUsernameField` для улучшения доступности форм с паролями

## Использование

### Базовое использование

```tsx
import { Form, Input } from '@/components/ui';

function LoginForm() {
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        console.log('Форма отправлена');
      }}
    >
      <Input label="Имя пользователя" placeholder="Введите имя пользователя" required />
      <Input label="Пароль" type="password" placeholder="Введите пароль" required />
      <button type="submit">Войти</button>
    </Form>
  );
}
```

### С кастомным ID формы

```tsx
<Form formId="custom-form-id" formName="customForm" onSubmit={handleSubmit}>
  {/* Поля формы */}
</Form>
```

### Группа кнопок

Несколько действий в одной строке удобно обернуть в **`ButtonGroup`** (`@/components/ui`): задайте **`ariaLabel`** для доступности; для сегментированного вида — **`attached`**. Сторис: **Components/Buttons/ButtonGroup**.

### FileInput в форме

`FileInput` рендерит скрытый `input type="file"` с атрибутом `form` из контекста `Form`. Передайте `name`, при необходимости `accept`, `multiple`, обработчик `onChange` и опционально `showClearButton` / `onClear` для сброса выбора.

```tsx
import { Form, FileInput, Button } from '@/components/ui';

<Form onSubmit={handleSubmit}>
  <FileInput label="Скан" name="scan" accept="application/pdf" helperText="Только PDF" required />
  <Button type="submit">Отправить</Button>
</Form>
```

### Switch в форме

`Switch` — обычный `input` с `type="checkbox"` и `role="switch"`: передайте `name` и обрабатывайте `onChange` при отправке формы.

```tsx
import { Form, Switch } from '@/components/ui';

<Form onSubmit={handleSubmit}>
  <Switch label="Показывать превью" name="preview" defaultChecked />
  <button type="submit">Сохранить</button>
</Form>
```

### Уведомления после действия в форме

Для обратной связи после `onSubmit` используйте **`useToast`** (карточки в углу экрана) или **`useSnackbar`** (компактная полоса снизу, опционально с кнопкой действия). Хуки работают только внутри соответствующих провайдеров; как правило, **`ThemeProvider` → `ToastProvider` / `SnackbarProvider`** задают один раз на корне приложения.

```tsx
import { Form, Input, Button } from '@/components/ui';
import { useToast } from '@/hooks';

function SaveForm() {
  const { showToast } = useToast();

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        showToast('Данные сохранены', 'success', 'Готово');
      }}
    >
      <Input label="Название" name="title" required />
      <Button type="submit">Сохранить</Button>
    </Form>
  );
}
```

Для Snackbar: `import { useSnackbar } from '@/hooks'`, затем `showSnackbar('Текст', { actionLabel: 'Отменить', onAction: () => {...} })`. Сторис: **Hooks/useToast**, **Hooks/useSnackbar**, **Components/Feedback/Toast**, **Components/Feedback/Snackbar**.

### Пагинация списков

Для таблиц и списков с постраничной выборкой используйте **`Pagination`** из `@/components/ui` (внутри **`ThemeProvider`**). Пример: `totalPages={total}`, контролируемый режим — `page={page}` и `onPageChange={setPage}`; без `page` — неконтролируемый с `defaultPage`. Сторис: **Components/Navigation/Pagination**.

## Пропсы

| Проп        | Тип                                             | По умолчанию | Описание                                             |
| ----------- | ----------------------------------------------- | ------------ | ---------------------------------------------------- |
| `children`  | `ReactNode`                                     | -            | Дочерние компоненты                                  |
| `formId`    | `string`                                        | -            | ID формы (генерируется автоматически если не указан) |
| `formName`  | `string`                                        | -            | Имя формы                                            |
| `formProps` | `React.FormHTMLAttributes<HTMLFormElement>`     | -            | Дополнительные HTML атрибуты для элемента form       |
| `onSubmit`  | `(e: React.FormEvent<HTMLFormElement>) => void` | -            | Обработчик отправки формы                            |
| `className` | `string`                                        | -            | CSS класс                                            |

## Контекст формы

Компонент `Form` использует `FormProvider` для предоставления контекста формы. Поля `Input`, `TextArea` и `Select` внутри формы автоматически получают атрибут `form` (ссылка на `id` элемента `<form>`), что устраняет предупреждения браузера и корректно связывает контролы с отправкой формы.

### Хуки для работы с контекстом

```tsx
import { useFormContext, useFormId, useFormName } from '@/contexts/FormContext';

function MyComponent() {
  const formContext = useFormContext();
  const formId = useFormId();
  const formName = useFormName();

  // Использование контекста
}
```

## Решение проблем

### Предупреждения о полях пароля

Браузеры показывают предупреждения когда поля пароля не находятся в форме:

```
[DOM] Password field is not contained in a form
```

Использование компонента `Form` решает эту проблему:

```tsx
// ❌ Проблема
<Input type="password" placeholder="Пароль" />

// ✅ Решение
<Form>
  <Input type="password" placeholder="Пароль" />
</Form>
```

### Предупреждения об атрибутах autocomplete

Браузеры рекомендуют добавлять атрибуты `autocomplete` для улучшения пользовательского опыта:

```
[DOM] Input elements should have autocomplete attributes (suggested: "new-password")
```

Компонент `Input` автоматически определяет подходящие атрибуты `autocomplete`:

```tsx
// ✅ Автоматическое определение autocomplete
<Input type="password" placeholder="Введите пароль..." /> // autoComplete="new-password"
<Input type="password" placeholder="Повторите пароль..." /> // autoComplete="new-password"
<Input type="password" placeholder="Введите текущий пароль" /> // autoComplete="current-password"
<Input type="email" placeholder="Email" /> // autoComplete="email"
<Input placeholder="Имя пользователя" /> // autoComplete="username"

// ✅ Явное указание autocomplete
<Input type="password" autoComplete="new-password" placeholder="Пароль" />
```

### Предупреждения о доступности форм с паролями

Браузеры рекомендуют добавлять скрытые поля имени пользователя для улучшения доступности:

```
[DOM] Password forms should have (optionally hidden) username fields for accessibility
```

Используйте компонент `HiddenUsernameField`:

```tsx
import { Form, HiddenUsernameField } from '@/components/ui';

// ✅ Правильно - с скрытым полем имени пользователя
<Form>
  <HiddenUsernameField />
  <Input type="password" placeholder="Пароль" />
</Form>;
```

## Примеры

### Форма регистрации

```tsx
<Form formId="registration-form" onSubmit={handleRegistration}>
  <Input label="Имя" placeholder="Введите имя" autoComplete="given-name" required />
  <Input label="Email" type="email" placeholder="Введите email" autoComplete="email" required />
  <Input
    label="Пароль"
    type="password"
    placeholder="Введите пароль"
    autoComplete="new-password"
    required
  />
  <Input
    label="Подтвердите пароль"
    type="password"
    placeholder="Повторите пароль"
    autoComplete="new-password"
    required
  />
  <TextArea
    label="О себе"
    name="bio"
    rows={4}
    placeholder="Кратко опишите себя (необязательно)"
    maxLength={500}
    displayCharacterCounter
  />
  <Select
    label="Страна"
    name="country"
    placeholder="Выберите страну"
    options={[
      { value: 'ru', label: 'Россия' },
      { value: 'kz', label: 'Казахстан' },
    ]}
  />
  <button type="submit">Зарегистрироваться</button>
</Form>
```

Для примера выше импортируйте `TextArea` (и `Select`, если добавляете выпадающий список) вместе с `Input`:

```tsx
import { Form, Input, TextArea, Select } from '@/components/ui';
```

Пример с `Select` (по умолчанию `mode="select"` — выпадающая панель в стиле `Dropdown`; для системного списка укажите `mode="native"`):

```tsx
<Form formId="profile-form" onSubmit={handleSubmit}>
  <Select
    label="Роль"
    name="role"
    required
    placeholder="Выберите роль"
    options={[
      { value: 'admin', label: 'Администратор' },
      { value: 'user', label: 'Пользователь' },
    ]}
  />
</Form>
```

### Форма входа

```tsx
<Form onSubmit={handleSubmit}>
  <HiddenUsernameField />
  <Input label="Email" type="email" autoComplete="email" error={emailError} required />
  <Input
    label="Пароль"
    type="password"
    autoComplete="current-password"
    error={passwordError}
    required
  />
  <button type="submit" disabled={hasErrors}>
    Войти
  </button>
</Form>
```

### Форма смены пароля

```tsx
<Form onSubmit={handlePasswordChange}>
  <HiddenUsernameField />
  <Input
    label="Текущий пароль"
    type="password"
    placeholder="Введите текущий пароль"
    autoComplete="current-password"
    required
  />
  <Input
    label="Новый пароль"
    type="password"
    placeholder="Введите новый пароль"
    autoComplete="new-password"
    required
  />
  <Input
    label="Подтвердите новый пароль"
    type="password"
    placeholder="Повторите новый пароль"
    autoComplete="new-password"
    required
  />
  <button type="submit">Изменить пароль</button>
</Form>
```
