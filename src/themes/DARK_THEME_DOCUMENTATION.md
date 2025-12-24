# Тёмная тема (Dark Theme) - Документация

## Обзор

Тёмная тема была обновлена в соответствии с макетом Figma для обеспечения точного соответствия дизайну. Все цвета и переменные теперь точно соответствуют дизайн-системе.

## Основные цвета

### Фоновые цвета

- **`background`**: `#06090E` - Основной фон страницы (очень тёмный сине-серый)
- **`backgroundSecondary`**: `#101C26` - Фон для карточек и элементов
- **`backgroundTertiary`**: `#162431` - Фон для элементов интерфейса
- **`backgroundQuaternary`**: `#1C3140` - Фон для неактивных элементов

### Текстовые цвета

- **`text`**: `#FFFFFF` - Основной текст (белый)
- **`textSecondary`**: `rgba(255, 255, 255, 0.8)` - Вторичный текст
- **`textTertiary`**: `rgba(255, 255, 255, 0.6)` - Неактивный текст
- **`textDisabled`**: `rgba(255, 255, 255, 0.4)` - Отключенный текст

### Акцентные цвета

- **`primary`**: `#68D5F8` - Основной акцентный цвет (голубой)
- **`success`**: `#94D263` - Цвет успеха/прогресса (зеленый)
- **`danger`**: `#FF3C3C` - Цвет ошибки/уведомлений (красный)

### Граничные цвета

- **`border`**: `#1C3140` - Основные границы
- **`borderSecondary`**: `#2D3748` - Вторичные границы

## Специальные цвета

### Тени

- **`boxShadow.primary`**: `0px 0px 7px 0px rgba(96, 217, 255, 0.39)` - Тень для акцентных элементов
- **`boxShadow.success`**: `0px 4px 11px 0px rgba(148, 210, 99, 0.2)` - Тень для прогресса

### Дополнительные цвета

- **`imageBackground`**: `#C4C4C4` - Фон для изображений
- **`avatarBackground`**: `#162431` - Фон для аватаров
- **`progressBackground`**: `#1C3140` - Фон для прогресс-баров
- **`progressFill`**: `#94D263` - Заполнение прогресс-бара
- **`onlineIndicator`**: `#94D263` - Индикатор онлайн статуса

## Использование

### В TypeScript/JavaScript

```typescript
import { darkTheme } from '../variables/colors/dark';

const styles = {
  backgroundColor: darkTheme.background,
  color: darkTheme.text,
  border: `1px solid ${darkTheme.border}`,
  boxShadow: darkTheme.boxShadow.primary,
};
```

### С CSS переменными

```typescript
import { applyDarkThemeToDocument } from '../variables/colors/css-variables';

// Применить к документу
applyDarkThemeToDocument();
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
    backgroundColor: darkTheme.backgroundSecondary,
    borderRadius: '20px',
    padding: '20px',
    boxShadow: darkTheme.boxShadow.md,
    border: `1px solid ${darkTheme.border}`
  }}>
    {children}
  </div>
);
```

### Кнопка

```typescript
const Button = ({ children, onClick }) => (
  <button style={{
    backgroundColor: darkTheme.primary,
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: darkTheme.boxShadow.primary
  }} onClick={onClick}>
    {children}
  </button>
);
```

### Прогресс-бар

```typescript
const ProgressBar = ({ progress }) => (
  <div style={{
    backgroundColor: darkTheme.progressBackground,
    borderRadius: '10px',
    height: '20px',
    overflow: 'hidden'
  }}>
    <div style={{
      backgroundColor: darkTheme.progressFill,
      width: `${progress}%`,
      height: '100%',
      boxShadow: darkTheme.boxShadow.success
    }} />
  </div>
);
```

### Аватар с онлайн статусом

```typescript
const Avatar = ({ name, isOnline }) => (
  <div style={{
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: darkTheme.avatarBackground,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  }}>
    <span style={{ color: darkTheme.text }}>{name}</span>
    {isOnline && (
      <div style={{
        position: 'absolute',
        bottom: '2px',
        right: '2px',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: darkTheme.onlineIndicator,
        border: `2px solid ${darkTheme.backgroundSecondary}`
      }} />
    )}
  </div>
);
```

## Соответствие макету Figma

Все цвета точно соответствуют макету Figma:

- Основной фон страницы: `#06090E`
- Фон карточек: `#101C26`
- Основной текст: `#FFFFFF`
- Акцентный голубой: `#68D5F8`
- Уведомления: `#FF3C3C`
- Прогресс: `#94D263`
- Индикатор онлайн: `#94D263`

## Миграция

При переходе на новую тёмную тему:

1. Обновите импорты на новые цветовые переменные
2. Используйте новые CSS переменные для стилизации
3. Примените `applyDarkThemeToDocument()` в корневом компоненте
4. Обновите компоненты для использования новых цветов

## Совместимость

Новая тёмная тема полностью совместима с существующими компонентами и может использоваться как замена старой темы без изменения API.

## Особенности тёмной темы

### Контрастность

Тёмная тема обеспечивает высокую контрастность для лучшей читаемости:

- Белый текст на тёмном фоне
- Полупрозрачные элементы для иерархии

### Акцентные элементы

- Голубой цвет `#68D5F8` используется для акцентных элементов
- Специальные тени для выделения важных элементов

### Состояния

- Четкие различия между активными и неактивными состояниями
- Прозрачность для создания глубины интерфейса
