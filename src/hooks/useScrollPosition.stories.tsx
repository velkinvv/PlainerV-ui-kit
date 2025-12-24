import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef } from 'react';
import { Button } from '../components/ui/buttons/Button';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Badge } from '../components/ui/Badge';
import {
  useScrollPosition,
  useWindowScrollPosition,
  useScrollDirection,
} from './useScrollPosition';

const meta: Meta = {
  title: 'Hooks/useScrollPosition',
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

// Компонент для демонстрации базового использования
const BasicScrollPositionDemo = () => {
  const { x, y } = useScrollPosition();
  const direction = useScrollDirection();

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Базовое использование useScrollPosition
      </Typography>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Прокрутите страницу, чтобы увидеть изменения позиции
        </Typography>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>X позиция</strong>
          </Typography>
          <Typography variant="h4" style={{ color: '#007bff' }}>
            {x}
          </Typography>
        </div>

        <div
          style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Y позиция</strong>
          </Typography>
          <Typography variant="h4" style={{ color: '#28a745' }}>
            {y}
          </Typography>
        </div>

        <div
          style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Направление</strong>
          </Typography>
          <Badge
            variant={direction === 'down' ? 'success' : direction === 'up' ? 'warning' : 'outlined'}
          >
            {direction === 'down' ? '↓ Вниз' : direction === 'up' ? '↑ Вверх' : '—'}
          </Badge>
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
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

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Прокрутите содержимое ниже, чтобы увидеть позицию скролла элемента
        </Typography>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>X позиция элемента</strong>
          </Typography>
          <Typography variant="h4" style={{ color: '#007bff' }}>
            {x}
          </Typography>
        </div>

        <div
          style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Y позиция элемента</strong>
          </Typography>
          <Typography variant="h4" style={{ color: '#28a745' }}>
            {y}
          </Typography>
        </div>
      </div>

      <div
        ref={scrollRef}
        style={{
          height: '200px',
          width: '100%',
          overflow: 'auto',
          border: '2px solid #dee2e6',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
        }}
      >
        <div style={{ width: '300%', height: '300%', padding: '20px' }}>
          <Typography variant="h4" marginBottom="md">
            Прокручиваемый контент
          </Typography>
          <Typography variant="body1" marginBottom="md">
            Этот контент можно прокручивать в любом направлении. Позиция скролла отслеживается в
            реальном времени.
          </Typography>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {Array.from({ length: 9 }, (_, i) => (
              <div
                key={i}
                style={{
                  padding: '16px',
                  backgroundColor: '#e3f2fd',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6">Блок {i + 1}</Typography>
                <Typography variant="body2">Содержимое блока {i + 1}</Typography>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          padding: '12px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          marginTop: '16px',
        }}
      >
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

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Измените задержку обновления и прокрутите страницу
        </Typography>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
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

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>X позиция</strong>
          </Typography>
          <Typography variant="h4" style={{ color: '#007bff' }}>
            {x}
          </Typography>
        </div>

        <div
          style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Y позиция</strong>
          </Typography>
          <Typography variant="h4" style={{ color: '#28a745' }}>
            {y}
          </Typography>
        </div>

        <div
          style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Обновлений</strong>
          </Typography>
          <Typography variant="h4" style={{ color: '#dc3545' }}>
            {updateCount}
          </Typography>
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
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

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <Button
          variant={isEnabled ? 'primary' : 'outlined'}
          onClick={() => setIsEnabled(!isEnabled)}
        >
          {isEnabled ? 'Отключить' : 'Включить'} отслеживание
        </Button>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Прокрутите страницу, чтобы увидеть разницу
        </Typography>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            padding: '12px',
            backgroundColor: isEnabled ? '#e8f5e8' : '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>X позиция</strong>
          </Typography>
          <Typography variant="h4" style={{ color: '#007bff' }}>
            {x}
          </Typography>
        </div>

        <div
          style={{
            padding: '12px',
            backgroundColor: isEnabled ? '#e8f5e8' : '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Y позиция</strong>
          </Typography>
          <Typography variant="h4" style={{ color: '#28a745' }}>
            {y}
          </Typography>
        </div>

        <div
          style={{
            padding: '12px',
            backgroundColor: isEnabled ? '#e8f5e8' : '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Статус</strong>
          </Typography>
          <Badge variant={isEnabled ? 'success' : 'outlined'}>
            {isEnabled ? 'Активно' : 'Отключено'}
          </Badge>
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
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

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Упрощенная версия для отслеживания скролла окна
        </Typography>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>X позиция</strong>
          </Typography>
          <Typography variant="h4" style={{ color: '#007bff' }}>
            {x}
          </Typography>
        </div>

        <div
          style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Y позиция</strong>
          </Typography>
          <Typography variant="h4" style={{ color: '#28a745' }}>
            {y}
          </Typography>
        </div>

        <div
          style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Направление</strong>
          </Typography>
          <Badge
            variant={direction === 'down' ? 'success' : direction === 'up' ? 'warning' : 'outlined'}
          >
            {direction === 'down' ? '↓' : direction === 'up' ? '↑' : '—'}
          </Badge>
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <BasicScrollPositionDemo />
      <ElementScrollDemo />
      <ThrottlingDemo />
      <EnabledDisabledDemo />
      <WindowScrollDemo />
    </div>
  ),
};
