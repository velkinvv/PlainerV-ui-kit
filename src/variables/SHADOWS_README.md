# Система теней (Shadows System)

Обновленная система теней разделена на основные тени (для тем) и дополнительные тени (для специальных случаев).

## Структура

### Основные тени (для тем)

```typescript
export type BoxShadowType = {
  // Базовые уровни теней
  sm: string; // Маленькая тень
  md: string; // Средняя тень
  lg: string; // Большая тень
  xl: string; // Очень большая тень

  // Акцентные тени
  primary: string; // Primary акцент
  success: string; // Success акцент
  warning: string; // Warning акцент
  danger: string; // Danger акцент

  // Специальные тени
  inputFocus: string; // Фокус на полях ввода
  notification: string; // Уведомления
  tooltip: string; // Тултипы
  dropdown: string; // Дропдауны
  modal: string; // Модальные окна
  cardHover: string; // Карточки при наведении
};
```

### Переменные теней

```typescript
// Переменные для светлой темы
const lightShadowValues = {
  // Базовые уровни теней
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

  // Акцентные тени
  primary: '0 0 0 3px rgba(33, 150, 243, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  success: '0 0 0 3px rgba(76, 175, 80, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  warning: '0 0 0 3px rgba(255, 193, 7, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  danger: '0 0 0 3px rgba(244, 67, 54, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',

  // Специальные тени
  inputFocus: '0 0 0 3px rgba(33, 150, 243, 0.1)',
  notification: '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
  tooltip: '0 2px 8px 0 rgba(0, 0, 0, 0.15)',
  dropdown: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  modal: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  cardHover: '0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

// Переменные для темной темы (более интенсивные)
const darkShadowValues = {
  // Базовые уровни теней
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',

  // Акцентные тени (с цветным свечением)
  primary: '0 0 0 3px rgba(96, 217, 255, 0.2), 0 4px 6px -1px rgba(0, 0, 0, 0.4)',
  success: '0 0 0 3px rgba(148, 210, 99, 0.2), 0 4px 6px -1px rgba(0, 0, 0, 0.4)',
  warning: '0 0 0 3px rgba(255, 193, 7, 0.2), 0 4px 6px -1px rgba(0, 0, 0, 0.4)',
  danger: '0 0 0 3px rgba(244, 67, 54, 0.2), 0 4px 6px -1px rgba(0, 0, 0, 0.4)',

  // Специальные тени
  inputFocus: '0 0 0 3px rgba(96, 217, 255, 0.2)',
  notification: '0 4px 12px 0 rgba(0, 0, 0, 0.5)',
  tooltip: '0 2px 8px 0 rgba(0, 0, 0, 0.4)',
  dropdown: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  modal: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
  cardHover: '0 8px 25px -5px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
};
```

### Дополнительные тени

```typescript
// Дополнительные тени для светлой темы
export const additionalShadows = {
  sm: lightShadowValues.sm,
  md: lightShadowValues.md,
  lg: lightShadowValues.lg,
  xl: lightShadowValues.xl,
  primary: lightShadowValues.primary,
  success: lightShadowValues.success,
  warning: lightShadowValues.warning,
  danger: lightShadowValues.danger,
  inputFocus: lightShadowValues.inputFocus,
  notification: lightShadowValues.notification,
  tooltip: lightShadowValues.tooltip,
  dropdown: lightShadowValues.dropdown,
  modal: lightShadowValues.modal,
  cardHover: lightShadowValues.cardHover,
};

// Дополнительные тени для темной темы
export const additionalDarkShadows = {
  sm: darkShadowValues.sm,
  md: darkShadowValues.md,
  lg: darkShadowValues.lg,
  xl: darkShadowValues.xl,
  primary: darkShadowValues.primary,
  success: darkShadowValues.success,
  warning: darkShadowValues.warning,
  danger: darkShadowValues.danger,
  inputFocus: darkShadowValues.inputFocus,
  notification: darkShadowValues.notification,
  tooltip: darkShadowValues.tooltip,
  dropdown: darkShadowValues.dropdown,
  modal: darkShadowValues.modal,
  cardHover: darkShadowValues.cardHover,
};
```

## Использование

### Основные тени (из темы)

```typescript
import styled from 'styled-components';
import { useTheme } from 'styled-components';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  border-radius: 12px;
  padding: 1.5rem;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  box-shadow: ${({ theme }) => theme.boxShadow.sm};

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
  }
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.boxShadow.modal};
`;

const Notification = styled.div`
  background: ${({ theme }) => theme.colors.success};
  color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.boxShadow.notification};
`;
```

### Дополнительные тени

```typescript
import { additionalShadows } from '@/variables/shadows';

const Modal = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: ${additionalShadows.modal};
`;

const Notification = styled.div`
  background: ${({ theme }) => theme.colors.success};
  color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: ${additionalShadows.notification};
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 0.75rem;

  &:focus {
    outline: none;
    box-shadow: ${additionalShadows.inputFocus};
  }
`;
```

## Применение

### Карточки и панели

```typescript
const Card = styled.div`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  box-shadow: ${({ theme }) => theme.boxShadow.default};
  border-radius: 12px;
  padding: 1.5rem;

  &:hover {
    box-shadow: ${additionalShadows.cardHover};
  }
`;
```

### Кнопки

```typescript
const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  box-shadow: ${({ theme }) => theme.boxShadow.buttonDefault};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.buttonActive};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
```

### Модальные окна

```typescript
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  box-shadow: ${additionalShadows.modal};
`;
```

### Уведомления

```typescript
const Notification = styled.div<{ type: 'success' | 'warning' | 'danger' | 'info' }>`
  background: ${({ theme, type }) => theme.colors[type]};
  color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: ${additionalShadows.notification};
  margin-bottom: 1rem;
`;
```

### Акцентные элементы

```typescript
const AccentCard = styled.div<{ accent: 'primary' | 'success' | 'warning' | 'danger' }>`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${additionalShadows[({ accent }) => accent]};
`;
```

## Рекомендации

### Выбор теней

**Основные тени (из темы):**

- `sm`, `md`, `lg`, `xl` - для различных уровней глубины
- `primary`, `success`, `warning`, `danger` - для акцентных элементов
- `modal`, `notification`, `tooltip`, `dropdown` - для специальных компонентов
- `inputFocus`, `cardHover` - для интерактивных элементов

**Дополнительные тени:**

- Дублируют основные тени для удобства прямого импорта
- Используются когда нужен прямой доступ без темы

### Совместимость

- Все тени оптимизированы для светлой и темной тем
- Используйте основные тени для консистентности
- Дополнительные тени для специальных случаев

### Производительность

- Избегайте чрезмерного использования теней
- Используйте `will-change: box-shadow` для анимированных элементов
- Рассмотрите использование `transform: translateZ(0)` для аппаратного ускорения

## Примеры компонентов

Смотрите `ShadowExamples.tsx` для полных примеров использования всех типов теней и различных UI паттернов.
