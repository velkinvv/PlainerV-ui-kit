# Avatar Component

Компонент аватара с поддержкой изображений, fallback и генерации инициалов.

## Новые возможности

### userName prop

Добавлен новый проп `userName` для автоматической генерации инициалов и цвета фона:

### showTooltip prop

Добавлен новый проп `showTooltip` для отображения тултипа с именем пользователя:

### cursor prop

Добавлен новый проп `cursor` для управления типом курсора:

```tsx
import { Avatar } from './Avatar';
import { Size, AvatarStatus } from '../../../types';

// Базовое использование с userName
<Avatar
  userName="Иван Петров"
  size={Size.MD}
  status={AvatarStatus.ONLINE}
/>

// С изображением (fallback будет использовать userName если изображение не загрузится)
<Avatar
  userName="Мария Сидорова"
  src="https://example.com/avatar.jpg"
  alt="Мария Сидорова"
  size={Size.LG}
  status={AvatarStatus.ONLINE}
/>

// С тултипом
<Avatar
  userName="Александр Иванов"
  showTooltip={true}
  size={Size.MD}
  status={AvatarStatus.ONLINE}
/>

// С кастомным текстом тултипа
<Avatar
  userName="Иван Петров"
  tooltipText="Администратор системы"
  showTooltip={true}
  size={Size.MD}
  status={AvatarStatus.ONLINE}
/>

// С курсором pointer
<Avatar
  userName="Мария Сидорова"
  cursor="pointer"
  size={Size.MD}
  status={AvatarStatus.ONLINE}
/>
```

## Функциональность

### Генерация инициалов

- **Одно слово**: "Мария" → "МА" (первые две буквы)
- **Несколько слов**: "Иван Петров" → "ИП" (первые буквы первых двух слов)
- **Много слов**: "Александр Иванович Петров" → "АИ" (первые буквы первых двух слов)

### Генерация цвета фона

Цвет фона генерируется на основе всех символов в `userName`:

- Создается хеш из всех символов имени
- Преобразуется в HSL цвет с насыщенностью 60-80% и яркостью 45-60%
- Обеспечивает консистентный цвет для одного и того же имени

### Приоритет fallback

1. Кастомный `fallback` (если передан)
2. Инициалы из `userName` (если передан)
3. Первая буква из `alt` (если передан)
4. "U" (по умолчанию)

### Тултип

При включенном `showTooltip` отображается тултип с содержимым:

1. `tooltipText` (если передан)
2. `userName` (если передан)
3. `alt` (если передан)
4. "Пользователь" (по умолчанию)

### Alt атрибут для изображения

Для улучшения доступности, alt атрибут изображения формируется по приоритету:

1. Переданный `alt` (если указан)
2. `userName` (если передан)
3. "Пользователь" (по умолчанию)

### Управление курсором

Курсор аватара определяется по приоритету:

1. Переданный `cursor` (если указан)
2. `pointer` (если передан `onClick`)
3. `default` (по умолчанию)

## Примеры использования

### Разные имена пользователей

```tsx
<div style={{ display: 'flex', gap: '16px' }}>
  <Avatar userName="Александр Иванов" size={Size.MD} />
  <Avatar userName="Мария" size={Size.MD} />
  <Avatar userName="Дмитрий Сергеевич" size={Size.MD} />
  <Avatar userName="Анна-Мария" size={Size.MD} />
</div>
```

### С изображением и fallback

```tsx
<Avatar
  userName="Иван Петров"
  src="https://example.com/avatar.jpg"
  alt="Иван Петров"
  size={Size.LG}
  status={AvatarStatus.ONLINE}
/>
```

### Только с userName (без изображения)

```tsx
<Avatar userName="Елена Козлова" size={Size.MD} status={AvatarStatus.OFFLINE} />
```

### С тултипом

```tsx
// С userName и тултипом
<Avatar
  userName="Иван Петров"
  showTooltip={true}
  size={Size.MD}
  status={AvatarStatus.ONLINE}
/>

// С alt и тултипом
<Avatar
  alt="Мария Сидорова"
  showTooltip={true}
  size={Size.MD}
  status={AvatarStatus.OFFLINE}
/>

// С изображением и тултипом
<Avatar
  userName="Александр Иванов"
  src="https://example.com/avatar.jpg"
  alt="Александр Иванов"
  showTooltip={true}
  size={Size.LG}
  status={AvatarStatus.ONLINE}
/>
```

### Alt атрибут

```tsx
// userName используется как alt (улучшенная доступность)
<Avatar
  userName="Иван Петров"
  src="https://example.com/avatar.jpg"
  size={Size.MD}
/>

// Кастомный alt имеет приоритет над userName
<Avatar
  userName="Иван Петров"
  alt="Профиль администратора"
  src="https://example.com/avatar.jpg"
  size={Size.MD}
/>

// Дефолтный alt когда ничего не передано
<Avatar
  src="https://example.com/avatar.jpg"
  size={Size.MD}
/>
```

### Кастомный текст тултипа

```tsx
// tooltipText имеет приоритет над userName
<Avatar
  userName="Иван Петров"
  tooltipText="Главный разработчик"
  showTooltip={true}
  size={Size.MD}
/>

// tooltipText имеет приоритет над alt
<Avatar
  alt="Мария Сидорова"
  tooltipText="Менеджер проекта"
  showTooltip={true}
  size={Size.MD}
/>

// С изображением и кастомным тултипом
<Avatar
  userName="Александр Иванов"
  tooltipText="Администратор системы"
  src="https://example.com/avatar.jpg"
  alt="Александр Иванов"
  showTooltip={true}
  size={Size.LG}
/>
```

### Управление курсором

```tsx
// Явно указать pointer курсор
<Avatar
  userName="Иван Петров"
  cursor="pointer"
  size={Size.MD}
/>

// Явно указать default курсор
<Avatar
  userName="Мария Сидорова"
  cursor="default"
  size={Size.MD}
/>

// onClick автоматически делает cursor="pointer"
<Avatar
  userName="Александр Иванов"
  onClick={() => console.log('Clicked')}
  size={Size.MD}
/>

// cursor имеет приоритет над onClick
<Avatar
  userName="Елена Козлова"
  cursor="default"
  onClick={() => console.log('Clicked')}
  size={Size.MD}
/>
```

## API

### AvatarProps

```tsx
interface AvatarProps extends BaseComponentProps {
  src?: string; // URL изображения
  alt?: string; // Альтернативный текст
  size?: Size; // Размер аватара
  fallback?: React.ReactNode; // Кастомный fallback
  onClick?: () => void; // Обработчик клика
  state?: AvatarState; // Состояние аватара
  text?: string; // Текст для состояния avatar
  icon?: React.ReactNode; // Кастомная иконка
  status?: AvatarStatus; // Статус пользователя
  onIconClick?: () => void; // Обработчик клика по иконке
  userName?: string; // Имя пользователя для генерации инициалов и цвета
  showTooltip?: boolean; // Отображение тултипа
  tooltipText?: string; // Кастомный текст для тултипа
  cursor?: 'default' | 'pointer'; // Тип курсора
}
```

### Размеры

- `Size.SM` - 32px
- `Size.MD` - 40px
- `Size.LG` - 48px
- `Size.XL` - 64px

### Статусы

- `AvatarStatus.ONLINE` - зеленый
- `AvatarStatus.OFFLINE` - серый
- `AvatarStatus.DANGER` - красный
- `AvatarStatus.WARNING` - желтый
