# План реализации React Native версии UI Kit

## 🎯 Цель

Создать React Native версию `@plainerV/ui` с сохранением всех стилей, тем и функционала.

---

## 📋 Этап 1: Подготовка инфраструктуры (1-2 недели)

### Шаг 1.1: Настройка Monorepo

**Выбор инструмента:** Turborepo или Nx

**Структура:**
```
plainerV/
├── apps/
│   ├── web-example/        # Пример использования web версии
│   └── native-example/     # Пример использования native версии
├── packages/
│   ├── ui-web/             # Web версия (текущий проект)
│   ├── ui-native/          # React Native версия
│   ├── ui-themes/          # Общие темы и типы
│   ├── ui-core/            # Общая бизнес-логика
│   └── ui-icons/           # Общие иконки
├── package.json
└── turbo.json
```

**Команды:**
```bash
# Установка Turborepo
npm install -g turbo
npx create-turbo@latest

# Или Nx
npx create-nx-workspace@latest plainerV
```

### Шаг 1.2: Создание пакета ui-themes

**Цель:** Вынести все темы в отдельный пакет

**Структура:**
```
packages/ui-themes/
├── src/
│   ├── themes/
│   │   ├── light.ts
│   │   ├── dark.ts
│   │   └── index.ts
│   ├── types/
│   │   └── theme.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

**Действия:**
1. Скопировать `web/src/themes/` в `packages/ui-themes/src/`
2. Удалить платформо-специфичные части (media queries)
3. Создать адаптеры для платформ
4. Настроить экспорты

**package.json:**
```json
{
  "name": "@plainerV/ui-themes",
  "version": "0.1.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./web": "./dist/web.js",
    "./native": "./dist/native.js"
  }
}
```

### Шаг 1.3: Создание пакета ui-core

**Цель:** Вынести общую бизнес-логику

**Структура:**
```
packages/ui-core/
├── src/
│   ├── handlers/
│   │   ├── dateHandlers.ts
│   │   ├── timeHandlers.ts
│   │   ├── buttonThemeHandlers.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── ui.ts
│   │   ├── sizes.ts
│   │   └── index.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

**Действия:**
1. Скопировать обработчики из `web/src/handlers/`
2. Удалить DOM-специфичный код
3. Создать платформо-независимые версии

### Шаг 1.4: Создание пакета ui-native

**Инициализация:**
```bash
cd packages
npx react-native init ui-native --template react-native-template-typescript
```

**Структура:**
```
packages/ui-native/
├── src/
│   ├── components/
│   │   └── ui/
│   ├── hooks/
│   ├── adapters/
│   └── index.ts
├── package.json
└── tsconfig.json
```

**package.json зависимости:**
```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-native": "^0.72.0",
    "styled-components": "^6.1.0",
    "react-native-reanimated": "^3.5.0",
    "react-native-gesture-handler": "^2.13.0",
    "@react-native-async-storage/async-storage": "^1.19.0",
    "@plainerV/ui-themes": "workspace:*",
    "@plainerV/ui-core": "workspace:*"
  }
}
```

---

## 📋 Этап 2: Адаптеры и утилиты (1 неделя)

### Шаг 2.1: Создание адаптеров для платформ

**Файл:** `packages/ui-native/src/adapters/index.ts`

```typescript
// Адаптер для styled-components
export { styled } from 'styled-components/native';

// Адаптер для анимаций
export {
  Animated,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

// Адаптер для навигации
export { Pressable, TouchableOpacity } from 'react-native';

// Адаптер для хранения
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  getItem: (key: string) => AsyncStorage.getItem(key),
  setItem: (key: string, value: string) => AsyncStorage.setItem(key, value),
  removeItem: (key: string) => AsyncStorage.removeItem(key),
};

// Адаптер для размеров экрана
import { Dimensions, useWindowDimensions } from 'react-native';

export const getWindowSize = () => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};

export { useWindowDimensions };

// Адаптер для медиа-запросов
export const useMediaQuery = (query: string): boolean => {
  const { width, height } = useWindowDimensions();

  // Простая реализация для основных breakpoints
  if (query.includes('max-width: 768px')) {
    return width <= 768;
  }
  if (query.includes('min-width: 769px') && query.includes('max-width: 1024px')) {
    return width >= 769 && width <= 1024;
  }
  // Добавить другие запросы

  return false;
};
```

### Шаг 2.2: Адаптация хуков

**useLocalStorage → useAsyncStorage**

```typescript
// packages/ui-native/src/hooks/useAsyncStorage.ts
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then(item => {
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      })
      .catch(() => {
        // Игнорируем ошибки
      });
  }, [key]);

  const setValue = useCallback(
    async (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // Обработка ошибок
      }
    },
    [key, storedValue],
  );

  const removeValue = useCallback(async () => {
    try {
      setStoredValue(initialValue);
      await AsyncStorage.removeItem(key);
    } catch (error) {
      // Обработка ошибок
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
```

**useClickOutside → usePressOutside**

```typescript
// packages/ui-native/src/hooks/usePressOutside.ts
import { useEffect, useRef } from 'react';
import { Pressable } from 'react-native';

export function usePressOutside<T extends React.Component>(
  handler: () => void,
  enabled: boolean = true,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    // В React Native используем другой подход
    // Можно использовать react-native-root-siblings для глобальных обработчиков
  }, [handler, enabled]);

  return ref;
}
```

**useWindowSize → useDimensions**

```typescript
// packages/ui-native/src/hooks/useDimensions.ts
import { useWindowDimensions } from 'react-native';

export function useWindowSize() {
  const { width, height } = useWindowDimensions();
  return { width, height };
}
```

---

## 📋 Этап 3: Базовые компоненты (3-4 недели)

### Шаг 3.1: Button

**Приоритет:** Высокий

**Файлы:**
- `packages/ui-native/src/components/ui/Button/Button.tsx`
- `packages/ui-native/src/components/ui/Button/Button.style.ts`

**Особенности:**
- Заменить `motion.button` на `Animated.createAnimatedComponent(Pressable)`
- Использовать `react-native-reanimated` для анимаций
- Адаптировать стили под React Native

**Пример реализации:** См. `REACT_NATIVE_ANALYSIS.md`

### Шаг 3.2: Input

**Приоритет:** Высокий

**Особенности:**
- Использовать `TextInput` из React Native
- Адаптировать стили
- Обработать клавиатуру (iOS/Android различия)

### Шаг 3.3: Typography

**Приоритет:** Высокий

**Особенности:**
- Использовать `Text` компонент
- Адаптировать все варианты типографики
- Учесть различия в рендеринге текста

### Шаг 3.4: Card

**Приоритет:** Средний

**Особенности:**
- Использовать `View` с соответствующими стилями
- Адаптировать тени (elevation для Android, shadowColor для iOS)

### Шаг 3.5: Badge

**Приоритет:** Средний

**Особенности:**
- Простой компонент, легко адаптируется
- Использовать `View` + `Text`

---

## 📋 Этап 4: Интерактивные компоненты (4-6 недель)

### Шаг 4.1: Modal

**Приоритет:** Высокий

**Проблемы:**
- Порты не работают как в web
- Анимации требуют другой подход

**Решение:**
```typescript
import { Modal } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export const Modal = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
      >
        {children}
      </Animated.View>
    </Modal>
  );
};
```

**Альтернатива:** Использовать `react-native-modal`

### Шаг 4.2: Dropdown

**Приоритет:** Высокий

**Проблемы:**
- Позиционирование относительно элемента
- Порты для выпадающего меню

**Решение:**
- Использовать `react-native-portalize` или `react-native-root-siblings`
- Использовать `onLayout` для позиционирования
- Рассмотреть использование `react-native-dropdown-picker` как основу

### Шаг 4.3: Checkbox и RadioButton

**Приоритет:** Средний

**Особенности:**
- Использовать `Pressable` или `TouchableOpacity`
- Создать кастомные компоненты (нет нативных в React Native)

### Шаг 4.4: Tabs

**Приоритет:** Средний

**Особенности:**
- Использовать `ScrollView` для горизонтальных табов
- Адаптировать анимации переключения

---

## 📋 Этап 5: Сложные компоненты (4-6 недель)

### Шаг 5.1: Tooltip и Hint

**Проблемы:**
- Позиционирование относительно элемента
- Порты

**Решение:**
- Использовать `react-native-portalize`
- Использовать `onLayout` для позиционирования
- Рассмотреть библиотеки типа `react-native-tooltip`

### Шаг 5.2: Progress

**Особенности:**
- Использовать `Animated.View` для анимации
- Адаптировать все варианты

### Шаг 5.3: Accordion

**Особенности:**
- Использовать `LayoutAnimation` или `react-native-reanimated`
- Адаптировать анимации раскрытия/сворачивания

### Шаг 5.4: Sidemenu

**Особенности:**
- Интеграция с навигацией (React Navigation)
- Адаптация под мобильные устройства

---

## 📋 Этап 6: Тестирование и документация (2-3 недели)

### Шаг 6.1: Настройка тестов

```bash
npm install --save-dev @testing-library/react-native @testing-library/jest-native
```

**Пример теста:**
```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

test('renders button with text', () => {
  const { getByText } = render(<Button>Press me</Button>);
  expect(getByText('Press me')).toBeTruthy();
});
```

### Шаг 6.2: Документация

- Создать Storybook для React Native (используя `@storybook/react-native`)
- Обновить README с примерами для React Native
- Создать migration guide

---

## 🛠️ Инструменты и библиотеки

### Обязательные:
- `react-native-reanimated` - анимации
- `react-native-gesture-handler` - жесты
- `@react-native-async-storage/async-storage` - хранение
- `styled-components` - стилизация (работает с /native)

### Рекомендуемые:
- `react-native-modal` - модалки
- `react-native-portalize` - порты
- `react-native-root-siblings` - глобальные компоненты
- `@storybook/react-native` - документация

### Опциональные:
- `react-native-svg` - для иконок SVG
- `react-native-vector-icons` - готовые иконки
- `react-native-safe-area-context` - безопасные зоны

---

## 📊 Чеклист реализации

### Инфраструктура
- [ ] Настроить monorepo
- [ ] Создать пакет ui-themes
- [ ] Создать пакет ui-core
- [ ] Создать пакет ui-native
- [ ] Настроить сборку и публикацию

### Адаптеры
- [ ] Создать адаптеры для styled-components
- [ ] Создать адаптеры для анимаций
- [ ] Адаптировать все хуки
- [ ] Создать утилиты для платформ

### Компоненты
- [ ] Button
- [ ] Input
- [ ] Typography
- [ ] Card
- [ ] Badge
- [ ] Modal
- [ ] Dropdown
- [ ] Checkbox
- [ ] RadioButton
- [ ] Tabs
- [ ] Accordion
- [ ] Progress
- [ ] Spinner
- [ ] Skeleton
- [ ] Tooltip
- [ ] Hint
- [ ] Sidemenu

### Тестирование
- [ ] Настроить тестовую среду
- [ ] Написать тесты для компонентов
- [ ] Написать тесты для хуков
- [ ] Настроить CI/CD

### Документация
- [ ] Создать Storybook
- [ ] Обновить README
- [ ] Создать migration guide
- [ ] Добавить примеры использования

---

## 🎯 Метрики успеха

- ✅ Все базовые компоненты работают
- ✅ Темы полностью совместимы
- ✅ Анимации плавные
- ✅ Покрытие тестами > 60%
- ✅ Документация полная
- ✅ Примеры работают

---

**Оценка времени:** 3-4 месяца для полной версии

**Последнее обновление:** 2025-01-XX
