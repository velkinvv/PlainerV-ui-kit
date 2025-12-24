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

Компонент `Form` использует `FormProvider` для предоставления контекста формы. Все поля `Input` внутри формы автоматически получают атрибут `form`, что устраняет предупреждения браузера.

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
  <button type="submit">Зарегистрироваться</button>
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
