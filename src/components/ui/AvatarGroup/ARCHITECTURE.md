# Архитектура AvatarGroup

## Структура компонента

```mermaid
graph TD
    A[AvatarGroup] --> B[AvatarGroupContainer]
    B --> C[AvatarWrapper]
    B --> D[AvatarCounter]

    C --> E[Avatar Component]
    E --> F[AvatarImage/AvatarFallback]
    E --> G[Badge для сообщений]
    E --> H[Tooltip]

    D --> I[+N Counter]

    J[AvatarGroupProps] --> A
    J --> K[variant: STACK | ROW]
    J --> L[maxVisible: number]
    J --> M[avatars: Array]
    J --> N[size: Size]
    J --> O[spacing: number]
```

## Варианты отображения

### STACK (наложение)

```mermaid
graph LR
    A[Avatar 1] --> B[Avatar 2]
    B --> C[Avatar 3]
    C --> D[+2 Counter]

    A -.->|margin-left: -8px| B
    B -.->|margin-left: -8px| C
    C -.->|margin-left: -8px| D

    A -->|z-index: 10| A
    B -->|z-index: 9| B
    C -->|z-index: 8| C
    D -->|z-index: 0| D
```

### ROW (в ряд)

```mermaid
graph LR
    A[Avatar 1] -->|gap: spacing| B[Avatar 2]
    B -->|gap: spacing| C[Avatar 3]
    C -->|gap: spacing| D[+2 Counter]
```

## Стили

### AvatarGroupContainer

- `display: flex`
- `align-items: center`
- Для STACK: отрицательные отступы и z-index
- Для ROW: gap между элементами

### AvatarWrapper

- `position: relative`
- `display: inline-block`
- Белая обводка для отделения

### AvatarCounter

- Круглая форма
- Фон из темы
- Hover эффекты
- Позиционирование в зависимости от варианта

## Логика работы

1. **Ограничение видимых аватаров**: `avatars.slice(0, maxVisible)`
2. **Подсчет скрытых**: `avatars.length - maxVisible`
3. **Рендеринг счетчика**: только если `remainingCount > 0`
4. **Передача пропсов**: все пропсы аватара передаются в компонент Avatar
5. **Тултипы**: глобальный `showTooltip` или индивидуальный для каждого аватара
