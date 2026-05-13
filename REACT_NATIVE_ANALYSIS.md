# Анализ возможности создания React Native версии UI Kit

## 📋 Обзор

Этот документ анализирует возможность создания React Native версии `@plainerV/ui` с сохранением всех стилей и функционала.

---

## ✅ Что можно переиспользовать

### 1. Архитектура тем
**Статус:** ✅ Полностью переиспользуемо

- Структура тем (light/dark) может быть использована как есть
- Типы TypeScript полностью совместимы
- Логика переключения тем работает аналогично

**Пример:**
```typescript
// Общий файл для web и native
export const lightTheme: ThemeType = {
  colors: lightColors,
  buttons: lightButtonTheme,
  // ...
};

// React Native версия
import { lightTheme } from '@plainerV/ui-themes';
```

### 2. Типы и интерфейсы
**Статус:** ✅ Полностью переиспользуемо

- Все TypeScript типы (`ButtonProps`, `InputProps`, etc.) работают одинаково
- Enum'ы (`ButtonVariant`, `Size`, etc.) совместимы
- Интерфейсы компонентов идентичны

### 3. Бизнес-логика и обработчики
**Статус:** ✅ Частично переиспользуемо

**Переиспользуемые:**
- `dateHandlers.ts` - полностью
- `timeHandlers.ts` - полностью
- `buttonThemeHandlers.ts` - логика переиспользуема
- `dropdownThemeHandlers.ts` - логика переиспользуема

**Требуют адаптации:**
- `uiHandlers.ts` - может содержать DOM-специфичный код

### 4. Хуки
**Статус:** ⚠️ Требуют адаптации

| Хук | Статус | Что нужно изменить |
|-----|--------|-------------------|
| `useModal` | ✅ | Полностью переиспользуем |
| `useDebounce` | ✅ | Полностью переиспользуем |
| `useClickOutside` | ⚠️ | Заменить на `react-native` аналог |
| `useKeyPress` | ⚠️ | Адаптировать для React Native |
| `useLocalStorage` | ⚠️ | Заменить на `AsyncStorage` |
| `useMediaQuery` | ⚠️ | Заменить на `react-native` размеры экрана |
| `useScrollPosition` | ⚠️ | Адаптировать для `ScrollView` |
| `useWindowSize` | ⚠️ | Заменить на `Dimensions` API |
| `useToast` | ⚠️ | Адаптировать для React Native |

---

## ❌ Что требует полной переработки

### 1. Стилизация (styled-components → styled-components/native)

**Проблема:** Web использует `styled-components`, React Native требует `styled-components/native`

**Решение:** Создать адаптер или использовать условные импорты

**Пример:**
```typescript
// web/src/components/ui/Button/Button.style.ts
import styled from 'styled-components';
import { motion } from 'framer-motion';

// native/src/components/ui/Button/Button.style.ts
import styled from 'styled-components/native';
import { Animated } from 'react-native';
```

**Изменения в стилях:**
- `div` → `View`
- `button` → `Pressable` или `TouchableOpacity`
- `input` → `TextInput`
- `span` → `Text`
- CSS свойства → React Native StyleSheet свойства

**Пример конвертации:**
```typescript
// Web
const StyledButton = styled(motion.button)`
  display: flex;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
`;

// React Native
const StyledButton = styled(Animated.createAnimatedComponent(Pressable))`
  padding: 12px 24px;
  border-radius: 8px;
`;
```

### 2. Анимации (framer-motion → react-native-reanimated)

**Проблема:** `framer-motion` не работает в React Native

**Решение:** Использовать `react-native-reanimated` + `react-native-gesture-handler`

**Пример:**
```typescript
// Web
import { motion } from 'framer-motion';

<StyledButton
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>

// React Native
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';

const scale = useSharedValue(1);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));

<Animated.View style={animatedStyle}>
  <Pressable
    onPressIn={() => { scale.value = withSpring(0.95); }}
    onPressOut={() => { scale.value = withSpring(1.05); }}
  />
</Animated.View>
```

### 3. Порты и модальные окна

**Проблема:** `react-dom` `createPortal` не существует в React Native

**Решение:** Использовать библиотеки:
- `react-native-modal` для модалок
- `react-native-portalize` для портов
- Или создать собственное решение на основе `Modal` из React Native

**Пример:**
```typescript
// Web
import { createPortal } from 'react-dom';

return createPortal(
  <ModalContent />,
  document.body
);

// React Native
import { Modal } from 'react-native';
import { Portal } from 'react-native-portalize';

return (
  <Portal>
    <Modal visible={isOpen}>
      <ModalContent />
    </Modal>
  </Portal>
);
```

### 4. DOM API

**Проблемы:**
- `window`, `document` не существуют
- `localStorage` не существует
- `addEventListener` не работает
- `getBoundingClientRect()` не существует

**Решения:**

| Web API | React Native замена |
|---------|---------------------|
| `window.localStorage` | `@react-native-async-storage/async-storage` |
| `window.innerWidth` | `Dimensions.get('window').width` |
| `document.getElementById` | `useRef` + `findNodeHandle` |
| `getBoundingClientRect()` | `onLayout` callback |
| `addEventListener` | React Native event handlers |
| `matchMedia` | `Dimensions` + `useWindowDimensions` |

### 5. CSS-специфичные свойства

**Проблема:** Многие CSS свойства не поддерживаются

**Примеры замены:**

| CSS | React Native |
|-----|--------------|
| `display: flex` | По умолчанию |
| `position: fixed` | `position: 'absolute'` + правильный контейнер |
| `z-index` | Работает, но по-другому |
| `cursor: pointer` | Не применимо |
| `user-select: none` | `selectable={false}` на Text |
| `overflow: hidden` | Работает |
| `box-shadow` | `elevation` (Android) или `shadowColor` (iOS) |
| `backdrop-filter` | Не поддерживается напрямую |

### 6. Медиа-запросы

**Проблема:** Медиа-запросы не работают в React Native

**Решение:** Использовать `Dimensions` API и хуки

```typescript
// Web
const isMobile = useMediaQuery('(max-width: 768px)');

// React Native
import { useWindowDimensions } from 'react-native';

const { width } = useWindowDimensions();
const isMobile = width < 768;
```

---

## 🏗️ Рекомендуемая архитектура

### Вариант 1: Monorepo с общими пакетами (Рекомендуется)

```
plainerV/
├── packages/
│   ├── ui-web/          # Web версия
│   ├── ui-native/       # React Native версия
│   ├── ui-themes/       # Общие темы и типы
│   ├── ui-core/         # Общая бизнес-логика
│   └── ui-icons/        # Общие иконки (SVG → React Native компоненты)
```

**Преимущества:**
- Максимальное переиспользование кода
- Единая система версионирования
- Общие тесты для логики
- Проще поддерживать

### Вариант 2: Отдельные репозитории

```
plainerV-web/     # Текущий проект
plainerV-native/  # Новый проект
```

**Преимущества:**
- Независимое развитие
- Разные команды могут работать отдельно

**Недостатки:**
- Дублирование кода
- Сложнее синхронизировать изменения

---

## 📦 Зависимости для React Native версии

### Обязательные замены:

```json
{
  "dependencies": {
    "react-native": "^0.72.0",
    "styled-components": "^6.1.0",  // Работает с /native
    "react-native-reanimated": "^3.5.0",
    "react-native-gesture-handler": "^2.13.0",
    "@react-native-async-storage/async-storage": "^1.19.0",
    "react-native-portalize": "^1.0.0",  // Для портов
    "react-native-modal": "^13.0.0"  // Опционально
  }
}
```

### Общие зависимости (можно переиспользовать):

```json
{
  "dependencies": {
    "clsx": "^2.0.0",  // ✅ Работает
    "dayjs": "^1.11.13",  // ✅ Работает
    "react-hook-form": "^7.48.0"  // ⚠️ Требует react-native версию
  }
}
```

---

## 🔄 План миграции компонентов

### Фаза 1: Подготовка инфраструктуры
- [ ] Настроить monorepo (если выбран вариант 1)
- [ ] Создать `ui-themes` пакет с общими темами
- [ ] Создать `ui-core` пакет с общей логикой
- [ ] Настроить TypeScript для React Native

### Фаза 2: Базовые компоненты
- [ ] Button (высокий приоритет)
- [ ] Input (высокий приоритет)
- [ ] Text/Typography
- [ ] Card
- [ ] Badge

### Фаза 3: Интерактивные компоненты
- [ ] Modal
- [ ] Dropdown
- [ ] Checkbox
- [ ] RadioButton
- [ ] Tabs

### Фаза 4: Сложные компоненты
- [ ] Accordion
- [ ] Progress
- [ ] Spinner
- [ ] Skeleton
- [ ] Tooltip
- [ ] Hint

### Фаза 5: Хуки и утилиты
- [ ] Адаптировать все хуки
- [ ] Создать React Native версии обработчиков
- [ ] Настроить тестирование

---

## 🎨 Стратегия стилизации

### Подход 1: Условные импорты (Рекомендуется)

```typescript
// shared/Button.style.ts
import { Platform } from 'react-native';

const StyledButton = Platform.select({
  web: () => require('./Button.web.style').StyledButton,
  default: () => require('./Button.native.style').StyledButton,
})();
```

### Подход 2: Абстракция через адаптеры

```typescript
// core/adapters/StyledAdapter.ts
export const createStyledComponent = (component: any) => {
  if (Platform.OS === 'web') {
    return styled(component);
  }
  return styled(component);
};
```

### Подход 3: Отдельные файлы стилей

```
components/
  Button/
    Button.tsx          # Общая логика
    Button.web.style.ts # Web стили
    Button.native.style.ts # Native стили
```

---

## 🧪 Тестирование

### Общие тесты (переиспользуемые):
- Логика компонентов
- Обработчики тем
- Бизнес-логика
- Типы TypeScript

### Платформо-специфичные тесты:
- Рендеринг компонентов
- Стили
- Анимации
- Навигация

**Рекомендация:** Использовать Jest + React Native Testing Library

---

## 📊 Оценка сложности

### Легко адаптируемые (1-2 дня каждый):
- ✅ Button
- ✅ Badge
- ✅ Card
- ✅ Typography
- ✅ Divider
- ✅ Spinner
- ✅ Skeleton

### Средняя сложность (3-5 дней каждый):
- ⚠️ Input
- ⚠️ Checkbox
- ⚠️ RadioButton
- ⚠️ Progress
- ⚠️ Accordion
- ⚠️ Tabs

### Высокая сложность (1-2 недели каждый):
- ❌ Modal (порты, анимации)
- ❌ Dropdown (позиционирование, порты)
- ❌ Tooltip (позиционирование)
- ❌ Hint (позиционирование)
- ❌ Sidemenu (навигация)

---

## 🚀 Рекомендации

### 1. Начать с monorepo структуры
Это позволит максимально переиспользовать код и упростит поддержку.

### 2. Создать общий пакет тем
Вынести все темы в отдельный пакет `@plainerV/ui-themes`, который будет использоваться и web, и native версиями.

### 3. Использовать TypeScript строгий режим
Это поможет выявить проблемы на этапе компиляции.

### 4. Создать адаптеры для платформо-специфичного кода
Абстрагировать различия между платформами через адаптеры.

### 5. Постепенная миграция
Начать с простых компонентов, затем переходить к сложным.

### 6. Документация
Создать отдельную документацию для React Native версии с примерами использования.

---

## 📝 Пример реализации Button для React Native

```typescript
// native/src/components/ui/Button/Button.tsx
import React, { forwardRef } from 'react';
import { Pressable, ActivityIndicator } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { StyledButton, LoadingContainer } from './Button.style';
import { ButtonProps, ButtonVariant } from '@plainerV/ui-core/types';
import { useTheme } from '@plainerV/ui-themes';

export const Button = forwardRef<any, ButtonProps>(
  (
    {
      children,
      variant = ButtonVariant.PRIMARY,
      size = Size.MD,
      disabled = false,
      loading = false,
      onPress,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
      if (!disabled && !loading) {
        scale.value = withSpring(0.95);
      }
    };

    const handlePressOut = () => {
      if (!disabled && !loading) {
        scale.value = withSpring(1);
      }
    };

    return (
      <Animated.View style={animatedStyle}>
        <StyledButton
          ref={ref}
          variant={variant}
          size={size}
          disabled={disabled || loading}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          {...props}
        >
          {loading ? (
            <LoadingContainer>
              <ActivityIndicator size="small" color={theme.colors.text} />
              <Text>Загрузка...</Text>
            </LoadingContainer>
          ) : (
            children
          )}
        </StyledButton>
      </Animated.View>
    );
  },
);
```

```typescript
// native/src/components/ui/Button/Button.style.ts
import styled from 'styled-components/native';
import { Pressable } from 'react-native';
import { ButtonProps, ButtonVariant } from '@plainerV/ui-core/types';
import { getButtonVariant, getButtonSize } from '@plainerV/ui-core/handlers';

export const StyledButton = styled(Pressable).attrs<ButtonProps>(({ theme, variant, size }) => {
  const variantStyles = getButtonVariant(theme.buttons, variant);
  const sizeStyles = getButtonSize(theme.buttons, size);

  return {
    style: {
      backgroundColor: variantStyles.background,
      padding: sizeStyles.padding,
      borderRadius: sizeStyles.borderRadius,
      // ...
    },
  };
})<ButtonProps>``;
```

---

## 🎯 Выводы

### ✅ Возможно создать React Native версию
- Большая часть логики переиспользуема
- Темы полностью совместимы
- Типы работают одинаково

### ⚠️ Требуется значительная работа
- Переписать все стили
- Заменить анимации
- Адаптировать DOM API
- Переработать порты и модалки

### 💡 Рекомендуемый подход
1. Создать monorepo структуру
2. Вынести общие части в отдельные пакеты
3. Постепенно мигрировать компоненты
4. Начать с простых, затем сложные

### 📈 Оценка времени
- **Подготовка инфраструктуры:** 1-2 недели
- **Базовые компоненты (10-15):** 3-4 недели
- **Сложные компоненты (5-7):** 4-6 недель
- **Хуки и утилиты:** 1-2 недели
- **Тестирование и документация:** 2-3 недели

**Итого:** 3-4 месяца для полной версии

---

**Последнее обновление:** 2025-01-XX
