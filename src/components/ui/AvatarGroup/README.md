# AvatarGroup

Компонент для группировки аватаров с двумя вариантами отображения.

## Особенности

- **Два варианта отображения**: `stack` (наложение) и `row` (в ряд)
- **Ограничение количества**: настраиваемое максимальное количество видимых аватаров
- **Счетчик дополнительных**: показывает количество скрытых аватаров
- **Внешняя обводка**: белая обводка для отделения элементов
- **Поддержка тултипов**: отображение информации о пользователях
- **Интерактивность**: поддержка кликов по аватарам

## Использование

```tsx
import { AvatarGroup, AvatarGroupVariant } from '@/components/ui';
import { Size, AvatarStatus } from '@/types';

const avatars = [
  {
    src: 'https://example.com/avatar1.jpg',
    userName: 'John Doe',
    status: AvatarStatus.ONLINE,
  },
  {
    src: 'https://example.com/avatar2.jpg',
    userName: 'Jane Smith',
    status: AvatarStatus.OFFLINE,
  },
  {
    userName: 'Bob Wilson', // Без изображения - покажет инициалы
    status: AvatarStatus.ONLINE,
  },
];

// Вариант с наложением (по умолчанию)
<AvatarGroup
  avatars={avatars}
  variant={AvatarGroupVariant.STACK}
  maxVisible={3}
  size={Size.MD}
  showTooltip={true}
/>

// Вариант в ряд
<AvatarGroup
  avatars={avatars}
  variant={AvatarGroupVariant.ROW}
  maxVisible={4}
  spacing={12}
  size={Size.LG}
/>
```

## Пропсы

| Проп          | Тип                  | По умолчанию | Описание                                  |
| ------------- | -------------------- | ------------ | ----------------------------------------- |
| `avatars`     | `Array<AvatarData>`  | -            | Массив данных для аватаров                |
| `variant`     | `AvatarGroupVariant` | `STACK`      | Вариант отображения                       |
| `maxVisible`  | `number`             | `3`          | Максимальное количество видимых аватаров  |
| `size`        | `Size`               | `MD`         | Размер аватаров                           |
| `spacing`     | `number`             | `8`          | Отступ между аватарами (для row варианта) |
| `showTooltip` | `boolean`            | `true`       | Показывать ли тултипы                     |

## Варианты отображения

### STACK (наложение)

Аватары накладываются друг на друга с отрицательным отступом. Каждый последующий аватар имеет меньший z-index.

### ROW (в ряд)

Аватары выстраиваются в горизонтальный ряд с настраиваемым отступом.

## Структура данных аватара

```tsx
interface AvatarData {
  src?: string; // URL изображения
  alt?: string; // Альтернативный текст
  userName?: string; // Имя пользователя (для инициалов)
  fallback?: ReactNode; // Кастомный фолбэк
  onClick?: () => void; // Обработчик клика
  status?: AvatarStatus; // Статус пользователя
  messageCount?: number; // Количество сообщений
  showTooltip?: boolean; // Показывать тултип
  tooltipText?: string; // Кастомный текст тултипа
}
```
