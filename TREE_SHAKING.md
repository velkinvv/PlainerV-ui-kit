# Tree-shaking проверка

## Настройка

Библиотека настроена для поддержки tree-shaking:

1. ✅ `sideEffects: false` в `package.json`
2. ✅ Все экспорты именованные (не default)
3. ✅ Поддержка ESM формата (`dist/index.esm.js`)

## Проверка tree-shaking

### Тест 1: Импорт одного компонента

Создайте тестовый проект и импортируйте только один компонент:

```tsx
// test-project/src/App.tsx
import { Button } from '@plainerV/ui';
import '@plainerV/ui/styles';

function App() {
  return <Button>Test</Button>;
}
```

Затем проверьте размер бандла. Должен быть импортирован только код Button, а не весь пакет.

### Тест 2: Импорт нескольких компонентов

```tsx
import { Button, Input, Card } from '@plainerV/ui';
```

Проверьте, что импортируется только код этих трех компонентов.

### Тест 3: Импорт всего пакета (не рекомендуется)

```tsx
import * as UI from '@plainerV/ui';
```

Это должно импортировать весь пакет, что не рекомендуется для production.

## Рекомендации

### ✅ Хорошо

```tsx
// Именованные импорты
import { Button, Input } from '@plainerV/ui';

// Импорт типов отдельно
import type { ButtonProps, InputProps } from '@plainerV/ui';
```

### ❌ Плохо

```tsx
// Импорт всего пакета
import * as UI from '@plainerV/ui';

// Default импорты (если бы они были)
import Button from '@plainerV/ui/Button';
```

## Автоматическая проверка

Для автоматической проверки tree-shaking можно использовать:

1. **webpack-bundle-analyzer** - для анализа бандла
2. **rollup-plugin-visualizer** - для визуализации зависимостей
3. **size-limit** - для проверки размера бандла

## Результаты

После настройки bundle size анализа, здесь будут размещены результаты проверки tree-shaking.
