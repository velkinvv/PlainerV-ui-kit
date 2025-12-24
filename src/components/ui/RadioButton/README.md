# RadioButton

Компонент радио кнопки для выбора одной опции из группы.

## Использование

```tsx
import { RadioButton } from '@shared/ui';

function MyComponent() {
  const [selectedValue, setSelectedValue] = useState('option1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <RadioButton
        checked={selectedValue === 'option1'}
        onChange={handleChange}
        label="Опция 1"
        name="options"
        value="option1"
      />
      <RadioButton
        checked={selectedValue === 'option2'}
        onChange={handleChange}
        label="Опция 2"
        name="options"
        value="option2"
      />
    </div>
  );
}
```

## Пропсы

| Проп              | Тип                                                    | По умолчанию | Описание                                                                    |
| ----------------- | ------------------------------------------------------ | ------------ | --------------------------------------------------------------------------- |
| `checked`         | `boolean`                                              | `false`      | Выбрана ли радио кнопка                                                     |
| `onChange`        | `(event: React.ChangeEvent<HTMLInputElement>) => void` | -            | Обработчик изменения                                                        |
| `onClick`         | `(event: React.MouseEvent<HTMLLabelElement>) => void`  | -            | Обработчик клика по кнопке или лейблу                                       |
| `label`           | `string`                                               | -            | Текстовая метка                                                             |
| `disabled`        | `boolean`                                              | `false`      | Отключить радио кнопку                                                      |
| `readOnly`        | `boolean`                                              | `false`      | Только для чтения (кнопка неактивна, но лейбл остается обычного цвета)      |
| `size`            | `'sm' \| 'md' \| 'lg'`                                 | `'md'`       | Размер радио кнопки                                                         |
| `name`            | `string`                                               | -            | Имя группы радио кнопок                                                     |
| `value`           | `string`                                               | -            | Значение радио кнопки                                                       |
| `variant`         | `'filled' \| 'outline'`                                | `'filled'`   | Вариант отображения: filled (залитая) или outline (с обводкой)            |
| `labelPosition`   | `'right' \| 'left' \| 'top' \| 'bottom' \| 'none'`    | `'right'`    | Позиция лейбла относительно кнопки                                         |
| `extraText`       | `string`                                               | -            | Дополнительный текст (подсказка), который выводится нижней строкой        |
| `error`           | `string`                                               | -            | Сообщение об ошибке                                                         |
| `helperText`      | `string`                                               | -            | Вспомогательный текст, отображаемый под радиокнопкой                       |
| `tooltip`         | `React.ReactNode`                                      | -            | Подсказка, отображаемая при наведении                                      |
| `tooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'`              | `'top'`      | Позиция подсказки                                                           |
| `required`        | `boolean`                                              | `false`      | Показывает индикатор обязательности поля                                   |
| `leftIcon`        | `React.ReactNode`                                      | -            | Иконка слева от радиокнопки                                                |
| `rightIcon`       | `React.ReactNode`                                      | -            | Иконка справа от радиокнопки                                                |
| `fullWidth`       | `boolean`                                              | `false`      | Растягивает радиокнопку на всю доступную ширину                             |
| `status`          | `'success' \| 'error' \| 'warning'`                    | -            | Визуальный статус радиокнопки                                               |
| `className`       | `string`                                               | -            | Дополнительный CSS класс                                                   |

## Размеры

- `sm` - 16px
- `md` - 20px (по умолчанию)
- `lg` - 24px

## Состояния

### Обычное состояние

```tsx
<RadioButton label="Обычная опция" name="options" value="option1" />
```

### Выбранное состояние

```tsx
<RadioButton checked={true} label="Выбранная опция" name="options" value="option1" />
```

### Отключенное состояние

```tsx
<RadioButton disabled={true} label="Отключенная опция" name="options" value="option1" />
```

### Отключенное выбранное состояние

```tsx
<RadioButton
  checked={true}
  disabled={true}
  label="Отключенная выбранная опция"
  name="options"
  value="option1"
/>
```

## Группа радио кнопок

Для создания группы радио кнопок используйте одинаковое значение `name`:

```tsx
function RadioGroup() {
  const [selectedValue, setSelectedValue] = useState('light');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <h3>Выберите тему:</h3>
      <RadioButton
        checked={selectedValue === 'light'}
        onChange={handleChange}
        label="Светлая тема"
        name="theme"
        value="light"
      />
      <RadioButton
        checked={selectedValue === 'dark'}
        onChange={handleChange}
        label="Темная тема"
        name="theme"
        value="dark"
      />
      <RadioButton
        checked={selectedValue === 'auto'}
        onChange={handleChange}
        label="Автоматически"
        name="theme"
        value="auto"
      />
    </div>
  );
}
```

## Доступность

Компонент полностью доступен и поддерживает:

- ✅ Семантическую разметку с `<input type="radio">`
- ✅ Связь label-input через `htmlFor` и `id`
- ✅ Keyboard navigation (Enter, Space)
- ✅ Screen reader поддержка
- ✅ Focus management
- ✅ ARIA атрибуты (`aria-invalid`, `aria-required`, `aria-disabled`, `aria-describedby`)
- ✅ Связь с ошибками и подсказками через `aria-describedby`
- ✅ `role="radiogroup"` для группы радиокнопок

## Стилизация

Компонент использует styled-components и поддерживает:

- ✅ Темизацию через ThemeProvider
- ✅ Кастомные CSS классы через `className`
- ✅ Responsive дизайн
- ✅ Hover и focus состояния
- ✅ Плавные анимации

## Примеры использования

### Форма с валидацией

```tsx
function DeliveryForm() {
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!deliveryMethod) {
      setError('Пожалуйста, выберите способ доставки');
      return;
    }
    // Отправка формы
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Способ доставки:</h3>
      <RadioButton
        checked={deliveryMethod === 'courier'}
        onChange={e => {
          setDeliveryMethod(e.target.value);
          setError('');
        }}
        label="Курьерская доставка"
        name="delivery"
        value="courier"
      />
      <RadioButton
        checked={deliveryMethod === 'pickup'}
        onChange={e => {
          setDeliveryMethod(e.target.value);
          setError('');
        }}
        label="Самовывоз"
        name="delivery"
        value="pickup"
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Продолжить</button>
    </form>
  );
}
```

### Разные размеры

```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <RadioButton checked={true} label="Маленький размер" name="sizes" value="small" size="sm" />
  <RadioButton checked={true} label="Средний размер" name="sizes" value="medium" size="md" />
  <RadioButton checked={true} label="Большой размер" name="sizes" value="large" size="lg" />
</div>
```
