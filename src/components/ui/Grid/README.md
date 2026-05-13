# Grid Component

Адаптивный CSS Grid компонент с поддержкой полноэкранного режима, контейнера и вложенности. Поддерживает настройку колонок и строк под разные разрешения экранов.

## Компоненты

- **Grid** - основной контейнер для создания CSS Grid макетов
- **GridItem** - компонент для управления расположением элементов внутри Grid

## Возможности

- ✅ **Полноэкранный режим** - занимает весь экран
- ✅ **Режим контейнера** - с максимальной шириной и отступами
- ✅ **Адаптивность** - настройка под разные разрешения экранов
- ✅ **Вложенность** - возможность помещать Grid внутрь самого себя
- ✅ **Автоматическое размещение** - auto-fit и auto-fill
- ✅ **Гибкая настройка** - колонки, строки, отступы, выравнивание
- ✅ **GridItem** - управление позиционированием элементов без inline стилей

## Использование

### Базовое использование

```tsx
import { Grid } from '@/components/ui';

<Grid columns={3} gap={16}>
  <div>Элемент 1</div>
  <div>Элемент 2</div>
  <div>Элемент 3</div>
</Grid>;
```

### Режимы отображения

```tsx
// Контейнер (по умолчанию)
<Grid mode="container" columns={4} gap={20}>
  {/* содержимое */}
</Grid>

// Полноэкранный
<Grid mode="fullscreen" columns={2} rows={2} gap={16}>
  {/* содержимое */}
</Grid>
```

### Адаптивные настройки

```tsx
<Grid
  columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6 }}
  gap={{ xs: 8, sm: 12, md: 16, lg: 20, xl: 24 }}
>
  {/* содержимое */}
</Grid>
```

### Автоматическое размещение

```tsx
// Auto-fit - автоматически подстраивается под количество элементов
<Grid autoFit minColumnWidth="200px" gap={16}>
  {/* содержимое */}
</Grid>

// Auto-fill - заполняет доступное пространство
<Grid autoFill minColumnWidth="150px" gap={12}>
  {/* содержимое */}
</Grid>
```

### Выравнивание

```tsx
<Grid
  columns={3}
  rows={2}
  gap={16}
  justifyContent="space-between"
  alignItems="center"
  height="300px"
>
  {/* содержимое */}
</Grid>
```

### Вложенность

```tsx
<Grid columns={2} gap={20}>
  <Card>
    <h3>Внешний элемент</h3>
    <Grid columns={2} gap={8} style={{ marginTop: '16px' }}>
      <div>Вложенный 1</div>
      <div>Вложенный 2</div>
    </Grid>
  </Card>
  <Card>
    <h3>Другой внешний элемент</h3>
    <Grid columns={1} gap={8} style={{ marginTop: '16px' }}>
      <div>Вложенный 3</div>
      <div>Вложенный 4</div>
    </Grid>
  </Card>
</Grid>
```

### Использование GridItem

```tsx
import { Grid, GridItem } from '@/components/ui';

<Grid columns={3} gap={16}>
  <GridItem columnSpan={2}>
    <Card>Растянутый на 2 колонки</Card>
  </GridItem>
  <GridItem rowSpan={2}>
    <Card style={{ height: '100%' }}>Высокий элемент</Card>
  </GridItem>
  <GridItem column={3} row={2}>
    <Card>Позиционированный элемент</Card>
  </GridItem>
</Grid>;
```

### Сложные макеты с GridItem

```tsx
<Grid columns={6} rows={4} gap={12}>
  {/* Заголовок */}
  <GridItem columnSpan={6}>
    <Card>Заголовок страницы</Card>
  </GridItem>

  {/* Боковая панель */}
  <GridItem rowSpan={3}>
    <Card style={{ height: '100%' }}>Боковая панель</Card>
  </GridItem>

  {/* Основной контент */}
  <GridItem column={2} columnSpan={3} rowSpan={2}>
    <Card style={{ height: '100%' }}>Основной контент</Card>
  </GridItem>

  {/* Виджет */}
  <GridItem column={5} row={2} rowSpan={2}>
    <Card style={{ height: '100%' }}>Виджет</Card>
  </GridItem>
</Grid>
```

## API

### Props

| Prop             | Тип                                  | По умолчанию  | Описание                              |
| ---------------- | ------------------------------------ | ------------- | ------------------------------------- |
| `mode`           | `GridMode`                           | `'container'` | Режим отображения                     |
| `container`      | `boolean`                            | `false`       | Использовать режим контейнера         |
| `columns`        | `number \| string \| GridBreakpoint` | -             | Количество колонок                    |
| `rows`           | `number \| string \| GridBreakpoint` | -             | Количество строк                      |
| `gap`            | `number \| string \| GridBreakpoint` | -             | Отступы между элементами              |
| `rowGap`         | `number \| string \| GridBreakpoint` | -             | Отступы между строками                |
| `columnGap`      | `number \| string \| GridBreakpoint` | -             | Отступы между колонками               |
| `justifyContent` | `string`                             | -             | Выравнивание по горизонтали           |
| `alignItems`     | `string`                             | -             | Выравнивание по вертикали             |
| `width`          | `string \| number`                   | -             | Ширина                                |
| `height`         | `string \| number`                   | -             | Высота                                |
| `minHeight`      | `string \| number`                   | -             | Минимальная высота                    |
| `maxHeight`      | `string \| number`                   | -             | Максимальная высота                   |
| `autoFit`        | `boolean`                            | `false`       | Автоматическое размещение с auto-fit  |
| `autoFill`       | `boolean`                            | `false`       | Автоматическое размещение с auto-fill |
| `minColumnWidth` | `string \| number`                   | -             | Минимальная ширина колонки            |
| `maxColumnWidth` | `string \| number`                   | -             | Максимальная ширина колонки           |

### GridMode

```tsx
enum GridMode {
  FULLSCREEN = 'fullscreen',
  CONTAINER = 'container',
}
```

### GridBreakpoint

```tsx
interface GridBreakpoint {
  xs?: number | string; // 0px+
  sm?: number | string; // 576px+
  md?: number | string; // 768px+
  lg?: number | string; // 992px+
  xl?: number | string; // 1200px+
}
```

### GridItemProps

```tsx
interface GridItemProps {
  // Расположение в сетке
  column?: number | string;
  row?: number | string;

  // Растяжение по колонкам/строкам
  columnSpan?: number | string;
  rowSpan?: number | string;

  // Выравнивание внутри ячейки
  justifySelf?: 'start' | 'end' | 'center' | 'stretch';
  alignSelf?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';

  // Размеры
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
}
```

## Брейкпоинты

Компонент использует стандартные брейкпоинты:

- **xs**: 0px и выше
- **sm**: 576px и выше
- **md**: 768px и выше
- **lg**: 992px и выше
- **xl**: 1200px и выше

## Лучшие практики

1. **Используйте адаптивные настройки** для лучшего UX на разных устройствах
2. **Комбинируйте auto-fit/auto-fill** с `minColumnWidth` для гибких макетов
3. **Применяйте вложенность** для создания сложных макетов
4. **Используйте режим контейнера** для основного контента
5. **Применяйте полноэкранный режим** для дашбордов и панелей управления

## Примеры использования

### Карточная сетка

```tsx
<Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap={{ xs: 16, sm: 20, md: 24 }}>
  {items.map((item) => (
    <Card key={item.id}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </Card>
  ))}
</Grid>
```

### Дашборд

```tsx
<Grid mode="fullscreen" columns={4} rows={3} gap={16}>
  <Card style={{ gridColumn: 'span 2', gridRow: 'span 2' }}>Основная статистика</Card>
  <Card>Быстрые действия</Card>
  <Card>Уведомления</Card>
  <Card style={{ gridColumn: 'span 2' }}>График активности</Card>
  <Card>Последние события</Card>
</Grid>
```

### Форма

```tsx
<Grid columns={2} gap={20}>
  <Grid columns={1} gap={16}>
    <Input label="Имя" />
    <Input label="Email" />
  </Grid>
  <Grid columns={1} gap={16}>
    <Input label="Телефон" />
    <Input label="Компания" />
  </Grid>
</Grid>
```

### Дашборд с GridItem

```tsx
<Grid columns={4} rows={3} gap={16}>
  <GridItem columnSpan={2} rowSpan={2}>
    <Card style={{ height: '100%' }}>Основная статистика</Card>
  </GridItem>
  <GridItem column={3}>
    <Card>Быстрые действия</Card>
  </GridItem>
  <GridItem column={4}>
    <Card>Уведомления</Card>
  </GridItem>
  <GridItem column={3} row={2} columnSpan={2}>
    <Card>График активности</Card>
  </GridItem>
  <GridItem column={3} row={3}>
    <Card>Последние события</Card>
  </GridItem>
</Grid>
```
