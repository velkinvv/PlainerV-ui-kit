# Светлая тема (Light Theme) - Документация

## Обзор

Светлая тема была обновлена в соответствии с макетом Figma для обеспечения точного соответствия дизайну. Все цвета и переменные теперь точно соответствуют дизайн-системе.

## Основные цвета

### Фоновые цвета

- **`background`**: `#EDF1F2` - Основной фон страницы
- **`backgroundSecondary`**: `#FFFFFF` - Белый фон для карточек и элементов
- **`backgroundTertiary`**: `#F9F9F9` - Фон для элементов интерфейса
- **`backgroundQuaternary`**: `#F2F2F2` - Фон для неактивных элементов

### Текстовые цвета

- **`text`**: `#262626` - Основной текст
- **`textSecondary`**: `rgba(38, 38, 38, 0.8)` - Вторичный текст
- **`textTertiary`**: `rgba(38, 38, 38, 0.6)` - Неактивный текст
- **`textDisabled`**: `rgba(38, 38, 38, 0.4)` - Отключенный текст

### Акцентные цвета

- **`primary`**: `#68D5F8` - Основной акцентный цвет (голубой)
- **`success`**: `#94D263` - Цвет успеха/прогресса (зеленый)
- **`danger`**: `#FF3C3C` - Цвет ошибки/уведомлений (красный)

### Граничные цвета

- **`border`**: `#F2F2F2` - Основные границы
- **`borderSecondary`**: `#E2E2E2` - Вторичные границы

## Специальные цвета

### Тени

- **`boxShadow.primary`**: `0px 0px 7px 0px rgba(96, 217, 255, 0.39)` - Тень для акцентных элементов
- **`boxShadow.success`**: `0px 4px 11px 0px rgba(148, 210, 99, 0.2)` - Тень для прогресса

### Дополнительные цвета

- **`imageBackground`**: `#C4C4C4` - Фон для изображений
- **`avatarBackground`**: `#F9F9F9` - Фон для аватаров
- **`progressBackground`**: `#F2F2F2` - Фон для прогресс-баров
- **`progressFill`**: `#94D263` - Заполнение прогресс-бара

## Использование

### В TypeScript/JavaScript

```typescript
import { lightTheme } from '../variables/colors/light';

const styles = {
  backgroundColor: lightTheme.background,
  color: lightTheme.text,
  border: `1px solid ${lightTheme.border}`,
  boxShadow: lightTheme.boxShadow.primary,
};
```

### С CSS переменными

```typescript
import { applyLightThemeToDocument } from '../variables/colors/css-variables';

// Применить к документу
applyLightThemeToDocument();
```

```css
.my-component {
  background-color: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-primary);
}
```

## Примеры компонентов

### Карточка

```typescript
const Card = ({ children }) => (
  <div style={{
    backgroundColor: lightTheme.backgroundSecondary,
    borderRadius: '20px',
    padding: '20px',
    boxShadow: lightTheme.boxShadow.md,
    border: `1px solid ${lightTheme.border}`
  }}>
    {children}
  </div>
);
```

### Кнопка

```typescript
const Button = ({ children, onClick }) => (
  <button style={{
    backgroundColor: lightTheme.primary,
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: lightTheme.boxShadow.primary
  }} onClick={onClick}>
    {children}
  </button>
);
```

### Прогресс-бар

```typescript
const ProgressBar = ({ progress }) => (
  <div style={{
    backgroundColor: lightTheme.progressBackground,
    borderRadius: '10px',
    height: '20px',
    overflow: 'hidden'
  }}>
    <div style={{
      backgroundColor: lightTheme.progressFill,
      width: `${progress}%`,
      height: '100%',
      boxShadow: lightTheme.boxShadow.success
    }} />
  </div>
);
```

## Соответствие макету Figma

Все цвета точно соответствуют макету Figma:

- Основной фон страницы: `#EDF1F2`
- Белые карточки: `#FFFFFF`
- Основной текст: `#262626`
- Акцентный голубой: `#68D5F8`
- Уведомления: `#FF3C3C`
- Прогресс: `#94D263`

## Миграция

При переходе на новую светлую тему:

1. Обновите импорты на новые цветовые переменные
2. Используйте новые CSS переменные для стилизации
3. Примените `applyLightThemeToDocument()` в корневом компоненте
4. Обновите компоненты для использования новых цветов

## Совместимость

Новая светлая тема полностью совместима с существующими компонентами и может использоваться как замена старой темы без изменения API.
