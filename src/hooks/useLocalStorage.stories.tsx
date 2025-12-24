import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../components/ui/buttons/Button';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Input } from '../components/ui/inputs/Input';
import { useLocalStorage } from './useLocalStorage';

const meta: Meta = {
  title: 'Hooks/useLocalStorage',
  parameters: {
    docs: {
      description: {
        component: `
# useLocalStorage Hook

Хук для работы с localStorage с автоматической синхронизацией между вкладками.

## Возвращаемые значения:

- **storedValue** - текущее значение из localStorage
- **setValue** - функция для установки значения
- **removeValue** - функция для удаления значения

## Параметры:

- **key** - ключ в localStorage
- **initialValue** - начальное значение (используется если ключ не найден)

## Особенности:

- Автоматическая синхронизация между вкладками
- Обработка ошибок парсинга JSON
- Поддержка функций как значения (как в useState)
- Безопасная работа с localStorage

## Использование:

\`\`\`typescript
const [value, setValue, removeValue] = useLocalStorage('myKey', 'defaultValue');

// Установка значения
setValue('new value');

// Установка через функцию
setValue(prev => prev + ' updated');

// Удаление значения
removeValue();
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Компонент для демонстрации базового использования
const BasicLocalStorageDemo = () => {
  const [name, setName, removeName] = useLocalStorage('demo-name', '');
  const [age, setAge, removeAge] = useLocalStorage('demo-age', 0);
  const [isActive, setIsActive, removeIsActive] = useLocalStorage('demo-active', false);

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Базовое использование useLocalStorage
      </Typography>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '16px',
        }}
      >
        <div>
          <Typography variant="body1" marginBottom="sm">
            Имя:
          </Typography>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Введите имя" />
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <Button size="sm" onClick={() => setName('')}>
              Очистить
            </Button>
            <Button size="sm" variant="outlined" onClick={removeName}>
              Удалить
            </Button>
          </div>
        </div>

        <div>
          <Typography variant="body1" marginBottom="sm">
            Возраст:
          </Typography>
          <Input
            type="number"
            value={age}
            onChange={e => setAge(parseInt(e.target.value) || 0)}
            placeholder="Введите возраст"
          />
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <Button size="sm" onClick={() => setAge(age + 1)}>
              +1
            </Button>
            <Button size="sm" variant="outlined" onClick={removeAge}>
              Удалить
            </Button>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Активен:
        </Typography>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Button
            variant={isActive ? 'primary' : 'outlined'}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? 'Активен' : 'Неактивен'}
          </Button>
          <Button size="sm" variant="outlined" onClick={removeIsActive}>
            Удалить
          </Button>
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Текущие значения:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Имя: {name || 'не задано'}
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Возраст: {age}
        </Typography>
        <Typography variant="body2">Активен: {isActive ? 'Да' : 'Нет'}</Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации работы с объектами
const ObjectLocalStorageDemo = () => {
  const [user, setUser, removeUser] = useLocalStorage('demo-user', {
    name: '',
    email: '',
    preferences: {
      theme: 'light',
      notifications: true,
    },
  });

  const updateUser = (field: string, value: any) => {
    setUser(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updatePreferences = (field: string, value: any) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }));
  };

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Работа с объектами
      </Typography>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '16px',
        }}
      >
        <div>
          <Typography variant="body1" marginBottom="sm">
            Имя пользователя:
          </Typography>
          <Input
            value={user.name}
            onChange={e => updateUser('name', e.target.value)}
            placeholder="Введите имя"
          />
        </div>

        <div>
          <Typography variant="body1" marginBottom="sm">
            Email:
          </Typography>
          <Input
            value={user.email}
            onChange={e => updateUser('email', e.target.value)}
            placeholder="Введите email"
          />
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Настройки:
        </Typography>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div>
            <Typography variant="body2" marginBottom="xs">
              Тема:
            </Typography>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                size="sm"
                variant={user.preferences.theme === 'light' ? 'primary' : 'outlined'}
                onClick={() => updatePreferences('theme', 'light')}
              >
                Светлая
              </Button>
              <Button
                size="sm"
                variant={user.preferences.theme === 'dark' ? 'primary' : 'outlined'}
                onClick={() => updatePreferences('theme', 'dark')}
              >
                Темная
              </Button>
            </div>
          </div>

          <div>
            <Typography variant="body2" marginBottom="xs">
              Уведомления:
            </Typography>
            <Button
              size="sm"
              variant={user.preferences.notifications ? 'primary' : 'outlined'}
              onClick={() => updatePreferences('notifications', !user.preferences.notifications)}
            >
              {user.preferences.notifications ? 'Включены' : 'Отключены'}
            </Button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <Button onClick={removeUser} variant="outlined">
          Удалить пользователя
        </Button>
        <Button
          onClick={() =>
            setUser({
              name: 'Новый пользователь',
              email: 'new@example.com',
              preferences: {
                theme: 'light',
                notifications: false,
              },
            })
          }
        >
          Сбросить к новому пользователю
        </Button>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Текущий пользователь:</strong>
        </Typography>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </Card>
  );
};

// Компонент для демонстрации синхронизации между вкладками
const SyncDemo = () => {
  const [sharedValue, setSharedValue, removeSharedValue] = useLocalStorage('demo-sync', '');
  const [counter, setCounter] = useLocalStorage('demo-counter', 0);

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Синхронизация между вкладками
      </Typography>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Откройте эту страницу в нескольких вкладках, чтобы увидеть синхронизацию в действии.
        </Typography>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '16px',
        }}
      >
        <div>
          <Typography variant="body1" marginBottom="sm">
            Общее значение:
          </Typography>
          <Input
            value={sharedValue}
            onChange={e => setSharedValue(e.target.value)}
            placeholder="Введите значение"
          />
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <Button size="sm" onClick={() => setSharedValue('')}>
              Очистить
            </Button>
            <Button size="sm" variant="outlined" onClick={removeSharedValue}>
              Удалить
            </Button>
          </div>
        </div>

        <div>
          <Typography variant="body1" marginBottom="sm">
            Счетчик:
          </Typography>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Button size="sm" onClick={() => setCounter(counter - 1)}>
              -
            </Button>
            <Typography variant="h4" style={{ margin: '0 16px' }}>
              {counter}
            </Typography>
            <Button size="sm" onClick={() => setCounter(counter + 1)}>
              +
            </Button>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <Button size="sm" onClick={() => setCounter(0)}>
              Сбросить
            </Button>
          </div>
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Текущие значения:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Общее значение: {sharedValue || 'пусто'}
        </Typography>
        <Typography variant="body2">Счетчик: {counter}</Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации работы с массивами
const ArrayLocalStorageDemo = () => {
  const [items, setItems, removeItems] = useLocalStorage('demo-items', ['Первый элемент']);

  const addItem = () => {
    const newItem = `Элемент ${items.length + 1}`;
    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const clearItems = () => {
    setItems([]);
  };

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Работа с массивами
      </Typography>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <Button onClick={addItem}>Добавить элемент</Button>
        <Button onClick={clearItems} variant="outlined">
          Очистить массив
        </Button>
        <Button onClick={removeItems} variant="outlined">
          Удалить из localStorage
        </Button>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Элементы ({items.length}):
        </Typography>
        {items.length === 0 ? (
          <Typography variant="body2" style={{ color: '#6c757d', fontStyle: 'italic' }}>
            Массив пуст
          </Typography>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  border: '1px solid #dee2e6',
                }}
              >
                <Typography variant="body2">
                  {index + 1}. {item}
                </Typography>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeItem(index)}
                  style={{ padding: '4px 8px', minWidth: 'auto' }}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Массив в localStorage:</strong>
        </Typography>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>{JSON.stringify(items, null, 2)}</pre>
      </div>
    </Card>
  );
};

export const BasicUsage: Story = {
  render: () => <BasicLocalStorageDemo />,
};

export const ObjectStorage: Story = {
  render: () => <ObjectLocalStorageDemo />,
};

export const SyncBetweenTabs: Story = {
  render: () => <SyncDemo />,
};

export const ArrayStorage: Story = {
  render: () => <ArrayLocalStorageDemo />,
};

export const AllExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <BasicLocalStorageDemo />
      <ObjectLocalStorageDemo />
      <SyncDemo />
      <ArrayLocalStorageDemo />
    </div>
  ),
};
