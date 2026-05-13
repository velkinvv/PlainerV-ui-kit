import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Size } from '../types/sizes';
import { Button } from '../components/ui/buttons/Button';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Input } from '../components/ui/inputs/Input';
import { StorybookStaggerStack } from '@/handlers/storybookMotionContainers';
import { useLocalStorage } from './useLocalStorage';
import {
  ActionsRow,
  ActionsRowCenter,
  ActionsRowTop,
  ActionsRowWrap,
  CounterValue,
  EmptyItemsText,
  ItemRow,
  ItemsList,
  RemoveItemButton,
  SectionContainer,
  StatusContainer,
  TwoColumnsGrid,
  UserJsonPreview,
} from './useLocalStorage.stories.style';

const meta: Meta = {
  title: 'UI Kit/Hooks/useLocalStorage',
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

      <TwoColumnsGrid>
        <div>
          <Typography variant="body1" marginBottom="sm">
            Имя:
          </Typography>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Введите имя" />
          <ActionsRowTop>
            <Button size={Size.SM} onClick={() => setName('')}>
              Очистить
            </Button>
            <Button size={Size.SM} variant="outlined" onClick={removeName}>
              Удалить
            </Button>
          </ActionsRowTop>
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
          <ActionsRowTop>
            <Button size={Size.SM} onClick={() => setAge(age + 1)}>
              +1
            </Button>
            <Button size={Size.SM} variant="outlined" onClick={removeAge}>
              Удалить
            </Button>
          </ActionsRowTop>
        </div>
      </TwoColumnsGrid>

      <SectionContainer>
        <Typography variant="body1" marginBottom="sm">
          Активен:
        </Typography>
        <ActionsRowCenter>
          <Button
            variant={isActive ? 'primary' : 'outlined'}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? 'Активен' : 'Неактивен'}
          </Button>
          <Button size={Size.SM} variant="outlined" onClick={removeIsActive}>
            Удалить
          </Button>
        </ActionsRowCenter>
      </SectionContainer>

      <StatusContainer>
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
      </StatusContainer>
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

  const updateUser = (fieldName: string, fieldValue: string) => {
    setUser(prev => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const updatePreferences = (fieldName: string, fieldValue: string | boolean) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev?.preferences,
        [fieldName]: fieldValue,
      },
    }));
  };

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Работа с объектами
      </Typography>

      <TwoColumnsGrid>
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
      </TwoColumnsGrid>

      <SectionContainer>
        <Typography variant="body1" marginBottom="sm">
          Настройки:
        </Typography>
        <ActionsRow>
          <div>
            <Typography variant="body2" marginBottom="xs">
              Тема:
            </Typography>
            <ActionsRow>
              <Button
                size={Size.SM}
                variant={user?.preferences?.theme === 'light' ? 'primary' : 'outlined'}
                onClick={() => updatePreferences('theme', 'light')}
              >
                Светлая
              </Button>
              <Button
                size={Size.SM}
                variant={user?.preferences?.theme === 'dark' ? 'primary' : 'outlined'}
                onClick={() => updatePreferences('theme', 'dark')}
              >
                Темная
              </Button>
            </ActionsRow>
          </div>

          <div>
            <Typography variant="body2" marginBottom="xs">
              Уведомления:
            </Typography>
            <Button
              size={Size.SM}
              variant={user?.preferences?.notifications ? 'primary' : 'outlined'}
              onClick={() => updatePreferences('notifications', !user?.preferences?.notifications)}
            >
              {user?.preferences?.notifications ? 'Включены' : 'Отключены'}
            </Button>
          </div>
        </ActionsRow>
      </SectionContainer>

      <SectionContainer>
        <ActionsRow>
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
        </ActionsRow>
      </SectionContainer>

      <StatusContainer>
        <Typography variant="body1" marginBottom="sm">
          <strong>Текущий пользователь:</strong>
        </Typography>
        <UserJsonPreview>{JSON.stringify(user, null, 2)}</UserJsonPreview>
      </StatusContainer>
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

      <SectionContainer>
        <Typography variant="body1" marginBottom="sm">
          Откройте эту страницу в нескольких вкладках, чтобы увидеть синхронизацию в действии.
        </Typography>
      </SectionContainer>

      <TwoColumnsGrid>
        <div>
          <Typography variant="body1" marginBottom="sm">
            Общее значение:
          </Typography>
          <Input
            value={sharedValue}
            onChange={e => setSharedValue(e.target.value)}
            placeholder="Введите значение"
          />
          <ActionsRowTop>
            <Button size={Size.SM} onClick={() => setSharedValue('')}>
              Очистить
            </Button>
            <Button size={Size.SM} variant="outlined" onClick={removeSharedValue}>
              Удалить
            </Button>
          </ActionsRowTop>
        </div>

        <div>
          <Typography variant="body1" marginBottom="sm">
            Счетчик:
          </Typography>
          <ActionsRowCenter>
            <Button size={Size.SM} onClick={() => setCounter(counter - 1)}>
              -
            </Button>
            <CounterValue variant="h4">
              {counter}
            </CounterValue>
            <Button size={Size.SM} onClick={() => setCounter(counter + 1)}>
              +
            </Button>
          </ActionsRowCenter>
          <ActionsRowTop>
            <Button size={Size.SM} onClick={() => setCounter(0)}>
              Сбросить
            </Button>
          </ActionsRowTop>
        </div>
      </TwoColumnsGrid>

      <StatusContainer>
        <Typography variant="body1" marginBottom="sm">
          <strong>Текущие значения:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Общее значение: {sharedValue || 'пусто'}
        </Typography>
        <Typography variant="body2">Счетчик: {counter}</Typography>
      </StatusContainer>
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

      <SectionContainer>
        <ActionsRowWrap>
        <Button onClick={addItem}>Добавить элемент</Button>
        <Button onClick={clearItems} variant="outlined">
          Очистить массив
        </Button>
        <Button onClick={removeItems} variant="outlined">
          Удалить из localStorage
        </Button>
        </ActionsRowWrap>
      </SectionContainer>

      <SectionContainer>
        <Typography variant="body1" marginBottom="sm">
          Элементы ({items.length}):
        </Typography>
        {items.length === 0 ? (
          <EmptyItemsText variant="body2">
            Массив пуст
          </EmptyItemsText>
        ) : (
          <ItemsList>
            {items.map((item, itemIndex) => (
              <ItemRow key={itemIndex}>
                <Typography variant="body2">
                  {itemIndex + 1}. {item}
                </Typography>
                <RemoveItemButton
                  size={Size.SM}
                  variant="ghost"
                  onClick={() => removeItem(itemIndex)}
                >
                  ×
                </RemoveItemButton>
              </ItemRow>
            ))}
          </ItemsList>
        )}
      </SectionContainer>

      <StatusContainer>
        <Typography variant="body1" marginBottom="sm">
          <strong>Массив в localStorage:</strong>
        </Typography>
        <UserJsonPreview>{JSON.stringify(items, null, 2)}</UserJsonPreview>
      </StatusContainer>
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
    <StorybookStaggerStack>
      <BasicLocalStorageDemo />
      <ObjectLocalStorageDemo />
      <SyncDemo />
      <ArrayLocalStorageDemo />
    </StorybookStaggerStack>
  ),
};

