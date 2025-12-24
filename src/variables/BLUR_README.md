# Переменные размытия (Blur Variables)

Этот файл содержит переменные для создания эффектов размытия в приложении. Размытие используется для создания глубины, фокуса и современных UI эффектов.

## Структура

### Основные переменные размытия

```typescript
export const blur: BlurType = {
  none: '0px', // Без размытия
  sm: '4px', // Маленькое размытие
  md: '8px', // Среднее размытие
  lg: '12px', // Большое размытие
  xl: '16px', // Очень большое размытие
  '2xl': '24px', // Экстра большое размытие
  '3xl': '40px', // Максимальное размытие
};
```

### Дополнительные переменные

```typescript
export const additionalBlur = {
  buttonHover: '2px', // Размытие для кнопок при наведении
  cardHover: '6px', // Размытие для карточек при наведении
  inputFocus: '1px', // Размытие для полей ввода при фокусе
  notification: '10px', // Размытие для уведомлений
  tooltip: '8px', // Размытие для тултипов
  dropdown: '12px', // Размытие для дропдаунов
  navigation: '6px', // Размытие для навигационных элементов
  sidebar: '8px', // Размытие для сайдбаров
  header: '4px', // Размытие для хедеров
};
```

## Использование

### В styled-components

```typescript
import styled from 'styled-components';
import { useTheme } from 'styled-components';

const BlurredCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(${({ theme }) => theme.blur.md});
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
`;
```

### В CSS

```css
.glass-effect {
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.1);
}

.blurred-element {
  filter: blur(4px);
}
```

### С утилитами

```typescript
import { blurUtils } from '@/variables/blur';

// Создание CSS значения для backdrop-filter
const backdropBlur = blurUtils.backdrop(blur.md); // "blur(8px)"

// Создание полного CSS свойства
const backdropBlurCSS = blurUtils.backdropBlur(blur.lg); // "backdrop-filter: blur(12px);"

// Создание эффекта стекла
const glassEffect = blurUtils.backdropWithSaturate(blur.md, 1.8); // "blur(8px) saturate(1.8)"
```

## Применение

### Модальные окна

```typescript
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(${({ theme }) => theme.blur.md});
  display: flex;
  align-items: center;
  justify-content: center;
`;
```

### Карточки с эффектом стекла

```typescript
const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(${({ theme }) => theme.blur.lg}) saturate(1.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
`;
```

### Навигационные элементы

```typescript
const NavigationBar = styled.nav`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(${({ theme }) => theme.blur.sm});
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
```

## Рекомендации

### Выбор уровня размытия

- **none (0px)** - для четких элементов без эффектов
- **sm (4px)** - для тонких эффектов, навигации, легких оверлеев
- **md (8px)** - для стандартных эффектов, модальных окон, карточек
- **lg (12px)** - для выраженных эффектов, важных модальных окон
- **xl (16px)** - для сильных эффектов, полноэкранных модальных окон
- **2xl (24px)** - для максимальных эффектов, критических диалогов
- **3xl (40px)** - для экстремальных эффектов, экранных блокировок

### Совместимость

- `backdrop-filter` поддерживается в современных браузерах
- Для старых браузеров используйте fallback с полупрозрачным фоном
- Всегда тестируйте производительность на мобильных устройствах

### Производительность

- Избегайте чрезмерного использования размытия
- Используйте `will-change: backdrop-filter` для анимированных элементов
- Рассмотрите использование `transform: translateZ(0)` для аппаратного ускорения

## Примеры компонентов

Смотрите `BlurExamples.tsx` для полных примеров использования всех уровней размытия и различных UI паттернов.
