import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef } from 'react';
import { Button } from '../components/ui/buttons/Button';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Tag } from '../components/ui/Tag';
import {
  useScrollPosition,
  useWindowScrollPosition,
  useScrollDirection,
} from './useScrollPosition';
import { storybookDemoStyles } from '@/handlers/storybookDemo.styles';
import { lightTheme } from '@/themes/themes';

const meta: Meta = {
  title: 'UI Kit/Hooks/useScrollPosition',
  parameters: {
    docs: {
      description: {
        component: `
# useScrollPosition Hook

Хук для отслеживания позиции скролла. Поддерживает как window, так и произвольные элементы с настройкой throttling.

## Основные функции:

### useScrollPosition
Полнофункциональный хук с опциями.

### useWindowScrollPosition
Упрощенная версия для window.

### useScrollDirection
Хук для определения направления скролла.

## Параметры useScrollPosition:

- **element** - элемент для отслеживания (по умолчанию window)
- **throttle** - задержка обновления в миллисекундах (по умолчанию 100)
- **enabled** - включен ли хук (по умолчанию true)

## Возвращаемые значения:

- **x** - позиция по горизонтали
- **y** - позиция по вертикали

## Использование:

\`\`\`typescript
// Базовое использование
const { x, y } = useScrollPosition();

// С настройками
const { x, y } = useScrollPosition({
  element: myElement,
  throttle: 50,
  enabled: true
});

// Упрощенная версия
const { x, y } = useWindowScrollPosition(100);

// Направление скролла
const direction = useScrollDirection();
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Рендерит тег с направлением скролла.
 * @param scrollDirection - Направление скролла: вниз, вверх или null.
 * @param isCompact - Компактный режим для короткой подписи.
 */
const renderScrollDirectionTag = (
  scrollDirection: 'up' | 'down' | null,
  isCompact: boolean = false,
) => {
  const directionLabel = scrollDirection === 'down' ? (isCompact ? '↓' : '↓ Вниз') : scrollDirection === 'up' ? (isCompact ? '↑' : '↑ Вверх') : '—';
  const colorVariant = scrollDirection === 'down' ? 'success' : scrollDirection === 'up' ? 'warning' : 'neutral';
  const appearance = scrollDirection ? 'filled' : 'outline';

  return (
    <Tag colorVariant={colorVariant} appearance={appearance}>
      {directionLabel}
    </Tag>
  );
};

// Компонент для демонстрации базового использования
const BasicScrollPositionDemo = () => {
  const { x, y } = useScrollPosition();
  const direction = useScrollDirection();

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Базовое использование useScrollPosition
      </Typography>

      <div style={storybookDemoStyles.marginBottom16}>
        <Typography variant="body1" marginBottom="sm">
          Прокрутите страницу, чтобы увидеть изменения позиции
        </Typography>
      </div>

      <div style={storybookDemoStyles.gridAutoFitMin150Gap12MarginBottom16}>
        <div style={storybookDemoStyles.windowSizeMetricTile}>
          <Typography variant="body2" marginBottom="xs">
            <strong>X позиция</strong>
          </Typography>
          <Typography variant="h4" style={storybookDemoStyles.windowSizeValuePrimary}>
            {x}
          </Typography>
        </div>

        <div style={storybookDemoStyles.windowSizeMetricTile}>
          <Typography variant="body2" marginBottom="xs">
            <strong>Y позиция</strong>
          </Typography>
          <Typography variant="h4" style={storybookDemoStyles.windowSizeValueSuccess}>
            {y}
          </Typography>
        </div>

        <div style={storybookDemoStyles.windowSizeMetricTile}>
          <Typography variant="body2" marginBottom="xs">
            <strong>Направление</strong>
          </Typography>
          {renderScrollDirectionTag(direction)}
        </div>
      </div>

      <div style={storybookDemoStyles.demoResultPanel}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Текущая позиция:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          X: {x}px
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Y: {y}px
        </Typography>
        <Typography variant="body2">Направление: {direction || 'Неизвестно'}</Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации элемента
const ElementScrollDemo = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { x, y } = useScrollPosition({ element: scrollRef.current });

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Скролл элемента
      </Typography>

      <div style={storybookDemoStyles.marginBottom16}>
        <Typography variant="body1" marginBottom="sm">
          Прокрутите содержимое ниже, чтобы увидеть позицию скролла элемента
        </Typography>
      </div>

      <div style={storybookDemoStyles.gridTwoColumnsGap12MarginBottom16}>
        <div style={storybookDemoStyles.windowSizeMetricTile}>
          <Typography variant="body2" marginBottom="xs">
            <strong>X позиция элемента</strong>
          </Typography>
          <Typography variant="h4" style={storybookDemoStyles.windowSizeValuePrimary}>
            {x}
          </Typography>
        </div>

        <div style={storybookDemoStyles.windowSizeMetricTile}>
          <Typography variant="body2" marginBottom="xs">
            <strong>Y позиция элемента</strong>
          </Typography>
          <Typography variant="h4" style={storybookDemoStyles.windowSizeValueSuccess}>
            {y}
          </Typography>
        </div>
      </div>

      <div ref={scrollRef} style={storybookDemoStyles.scrollViewportStory}>
        <div style={storybookDemoStyles.scrollContentOversized}>
          <Typography variant="h4" marginBottom="md">
            Прокручиваемый контент
          </Typography>
          <Typography variant="body1" marginBottom="md">
            Этот контент можно прокручивать в любом направлении. Позиция скролла отслеживается в
            реальном времени.
          </Typography>
          <div style={storybookDemoStyles.gridThreeColumnsGap16}>
            {Array.from({ length: 9 }, (_, tileIndex) => (
              <div key={tileIndex} style={storybookDemoStyles.scrollDemoContentTile}>
                <Typography variant="h6">Блок {tileIndex + 1}</Typography>
                <Typography variant="body2">Содержимое блока {tileIndex + 1}</Typography>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={storybookDemoStyles.demoResultPanelMarginTop16}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Позиция скролла элемента:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          X: {x}px
        </Typography>
        <Typography variant="body2">Y: {y}px</Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации throttling
const ThrottlingDemo = () => {
  const [throttle, setThrottle] = React.useState(100);
  const { x, y } = useScrollPosition({ throttle });
  const [updateCount, setUpdateCount] = React.useState(0);

  React.useEffect(() => {
    setUpdateCount(prev => prev + 1);
  }, [x, y]);

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Настройка throttling
      </Typography>

      <div style={storybookDemoStyles.marginBottom16}>
        <Typography variant="body1" marginBottom="sm">
          Измените задержку обновления и прокрутите страницу
        </Typography>
      </div>

      <div style={storybookDemoStyles.rowFlexGap12MarginBottom16Wrap}>
        <Button
          size="sm"
          variant={throttle === 0 ? 'primary' : 'outlined'}
          onClick={() => setThrottle(0)}
        >
          Без задержки (0мс)
        </Button>
        <Button
          size="sm"
          variant={throttle === 50 ? 'primary' : 'outlined'}
          onClick={() => setThrottle(50)}
        >
          Быстро (50мс)
        </Button>
        <Button
          size="sm"
          variant={throttle === 100 ? 'primary' : 'outlined'}
          onClick={() => setThrottle(100)}
        >
          Средне (100мс)
        </Button>
        <Button
          size="sm"
          variant={throttle === 500 ? 'primary' : 'outlined'}
          onClick={() => setThrottle(500)}
        >
          Медленно (500мс)
        </Button>
      </div>

      <div style={storybookDemoStyles.gridAutoFitMin150Gap12MarginBottom16}>
        <div style={storybookDemoStyles.windowSizeMetricTile}>
          <Typography variant="body2" marginBottom="xs">
            <strong>X позиция</strong>
          </Typography>
          <Typography variant="h4" style={storybookDemoStyles.windowSizeValuePrimary}>
            {x}
          </Typography>
        </div>

        <div style={storybookDemoStyles.windowSizeMetricTile}>
          <Typography variant="body2" marginBottom="xs">
            <strong>Y позиция</strong>
          </Typography>
          <Typography variant="h4" style={storybookDemoStyles.windowSizeValueSuccess}>
            {y}
          </Typography>
        </div>

        <div style={storybookDemoStyles.windowSizeMetricTile}>
          <Typography variant="body2" marginBottom="xs">
            <strong>Обновлений</strong>
          </Typography>
          <Typography variant="h4" style={storybookDemoStyles.windowSizeValueDanger}>
            {updateCount}
          </Typography>
        </div>
      </div>

      <div style={storybookDemoStyles.demoResultPanel}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Настройки:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Throttle: {throttle}мс
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Позиция: ({x}, {y})
        </Typography>
        <Typography variant="body2">Количество обновлений: {updateCount}</Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации включения/отключения
const EnabledDisabledDemo = () => {
  const [isEnabled, setIsEnabled] = React.useState(true);
  const { x, y } = useScrollPosition({ enabled: isEnabled });

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Управление состоянием useScrollPosition
      </Typography>

      <div style={storybookDemoStyles.rowFlexGap12MarginBottom16Wrap}>
        <Button
          variant={isEnabled ? 'primary' : 'outlined'}
          onClick={() => setIsEnabled(!isEnabled)}
        >
          {isEnabled ? 'Отключить' : 'Включить'} отслеживание
        </Button>
      </div>

      <div style={storybookDemoStyles.marginBottom16}>
        <Typography variant="body1" marginBottom="sm">
          Прокрутите страницу, чтобы увидеть разницу
        </Typography>
      </div>

      <div style={storybookDemoStyles.gridAutoFitMin150Gap12MarginBottom16}>
        <div
          style={{
            ...storybookDemoStyles.windowSizeMetricTile,
            backgroundColor: isEnabled
              ? lightTheme.colors.backgroundQuaternary
              : lightTheme.colors.backgroundTertiary,
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>X позиция</strong>
          </Typography>
          <Typography variant="h4" style={storybookDemoStyles.windowSizeValuePrimary}>
            {x}
          </Typography>
        </div>

        <div
          style={{
            ...storybookDemoStyles.windowSizeMetricTile,
            backgroundColor: isEnabled
              ? lightTheme.colors.backgroundQuaternary
              : lightTheme.colors.backgroundTertiary,
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Y позиция</strong>
          </Typography>
          <Typography variant="h4" style={storybookDemoStyles.windowSizeValueSuccess}>
            {y}
          </Typography>
        </div>

        <div
          style={{
            ...storybookDemoStyles.windowSizeMetricTile,
            backgroundColor: isEnabled
              ? lightTheme.colors.backgroundQuaternary
              : lightTheme.colors.backgroundTertiary,
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Статус</strong>
          </Typography>
          <Tag colorVariant={isEnabled ? 'success' : 'neutral'} appearance={isEnabled ? 'filled' : 'outline'}>
            {isEnabled ? 'Активно' : 'Отключено'}
          </Tag>
        </div>
      </div>

      <div style={storybookDemoStyles.demoResultPanel}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Статус отслеживания:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Включено: {isEnabled ? 'Да' : 'Нет'}
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          X: {x}px
        </Typography>
        <Typography variant="body2">Y: {y}px</Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации useWindowScrollPosition
const WindowScrollDemo = () => {
  const { x, y } = useWindowScrollPosition(50);
  const direction = useScrollDirection();

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        useWindowScrollPosition
      </Typography>

      <div style={storybookDemoStyles.marginBottom16}>
        <Typography variant="body1" marginBottom="sm">
          Упрощенная версия для отслеживания скролла окна
        </Typography>
      </div>

      <div style={storybookDemoStyles.gridAutoFitMin150Gap12MarginBottom16}>
        <div style={storybookDemoStyles.windowSizeMetricTile}>
          <Typography variant="body2" marginBottom="xs">
            <strong>X позиция</strong>
          </Typography>
          <Typography variant="h4" style={storybookDemoStyles.windowSizeValuePrimary}>
            {x}
          </Typography>
        </div>

        <div style={storybookDemoStyles.windowSizeMetricTile}>
          <Typography variant="body2" marginBottom="xs">
            <strong>Y позиция</strong>
          </Typography>
          <Typography variant="h4" style={storybookDemoStyles.windowSizeValueSuccess}>
            {y}
          </Typography>
        </div>

        <div style={storybookDemoStyles.windowSizeMetricTile}>
          <Typography variant="body2" marginBottom="xs">
            <strong>Направление</strong>
          </Typography>
          {renderScrollDirectionTag(direction, true)}
        </div>
      </div>

      <div style={storybookDemoStyles.demoResultPanel}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Позиция окна:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          X: {x}px
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Y: {y}px
        </Typography>
        <Typography variant="body2">Направление: {direction || 'Неизвестно'}</Typography>
      </div>
    </Card>
  );
};

export const BasicUsage: Story = {
  render: () => <BasicScrollPositionDemo />,
};

export const ElementScroll: Story = {
  render: () => <ElementScrollDemo />,
};

export const Throttling: Story = {
  render: () => <ThrottlingDemo />,
};

export const EnabledDisabled: Story = {
  render: () => <EnabledDisabledDemo />,
};

export const WindowScroll: Story = {
  render: () => <WindowScrollDemo />,
};

export const AllExamples: Story = {
  render: () => (
    <div style={storybookDemoStyles.columnFlexGap24}>
      <BasicScrollPositionDemo />
      <ElementScrollDemo />
      <ThrottlingDemo />
      <EnabledDisabledDemo />
      <WindowScrollDemo />
    </div>
  ),
};

