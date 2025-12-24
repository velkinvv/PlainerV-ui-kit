import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '../components/ui/buttons/Button';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Input } from '../components/ui/inputs/Input';
import { useDebounce, useDebounceCallback } from './useDebounce';

const meta: Meta = {
  title: 'Hooks/useDebounce',
  parameters: {
    docs: {
      description: {
        component: `
# useDebounce Hook

Хук для задержки выполнения операций, полезен для оптимизации поиска, API запросов и других операций.

## Основные функции:

### useDebounce
Задерживает обновление значения на указанное время.

### useDebounceCallback
Задерживает выполнение функции на указанное время.

## Параметры:

- **value** - значение для задержки
- **delay** - задержка в миллисекундах
- **callback** - функция для задержки (для useDebounceCallback)

## Использование:

\`\`\`typescript
// Задержка значения
const debouncedValue = useDebounce(value, 500);

// Задержка функции
const debouncedCallback = useDebounceCallback(callback, 500);
\`\`\`

## Применение:

- Поиск с задержкой
- API запросы при вводе
- Валидация форм
- Оптимизация производительности
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Компонент для демонстрации базового использования
const BasicDebounceDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [delay, setDelay] = useState(500);
  const debouncedValue = useDebounce(inputValue, delay);

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Базовое использование useDebounce
      </Typography>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Задержка (мс):
        </Typography>
        <Input
          type="number"
          value={delay}
          onChange={e => setDelay(parseInt(e.target.value) || 500)}
          style={{ width: '100px', marginBottom: '12px' }}
        />
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
            Введите текст:
          </Typography>
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Введите что-нибудь..."
          />
        </div>

        <div>
          <Typography variant="body1" marginBottom="sm">
            Отложенное значение:
          </Typography>
          <Input value={debouncedValue} readOnly style={{ backgroundColor: '#f8f9fa' }} />
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Статус:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Исходное значение: "{inputValue}"
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Отложенное значение: "{debouncedValue}"
        </Typography>
        <Typography variant="body2">Задержка: {delay}мс</Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации поиска с задержкой
const SearchDemo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Имитация поиска
  const mockSearch = (term: string) => {
    if (!term.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Имитация API запроса
    setTimeout(() => {
      const mockResults = [
        `Результат 1 для "${term}"`,
        `Результат 2 для "${term}"`,
        `Результат 3 для "${term}"`,
        `Результат 4 для "${term}"`,
        `Результат 5 для "${term}"`,
      ].filter(result => result.toLowerCase().includes(term.toLowerCase()));

      setResults(mockResults);
      setIsSearching(false);
    }, 500);
  };

  // Выполняем поиск при изменении отложенного значения
  React.useEffect(() => {
    mockSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Поиск с задержкой
      </Typography>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Поиск:
        </Typography>
        <Input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Введите поисковый запрос..."
        />
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
            Исходный запрос:
          </Typography>
          <div
            style={{
              padding: '8px',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              border: '1px solid #dee2e6',
            }}
          >
            <Typography variant="body2">"{searchTerm}"</Typography>
          </div>
        </div>

        <div>
          <Typography variant="body1" marginBottom="sm">
            Отложенный запрос:
          </Typography>
          <div
            style={{
              padding: '8px',
              backgroundColor: '#e3f2fd',
              borderRadius: '4px',
              border: '1px solid #2196f3',
            }}
          >
            <Typography variant="body2">"{debouncedSearchTerm}"</Typography>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Результаты поиска:
        </Typography>
        {isSearching ? (
          <div style={{ padding: '12px', textAlign: 'center', color: '#6c757d' }}>
            <Typography variant="body2">Поиск...</Typography>
          </div>
        ) : results.length === 0 ? (
          <div style={{ padding: '12px', textAlign: 'center', color: '#6c757d' }}>
            <Typography variant="body2">
              {searchTerm ? 'Результаты не найдены' : 'Введите поисковый запрос'}
            </Typography>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {results.map((result, index) => (
              <div
                key={index}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  border: '1px solid #dee2e6',
                }}
              >
                <Typography variant="body2">{result}</Typography>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Статус:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Поиск: {isSearching ? 'В процессе' : 'Завершен'}
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Результатов: {results.length}
        </Typography>
        <Typography variant="body2">Задержка: 300мс</Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации useDebounceCallback
const DebounceCallbackDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [delay, setDelay] = useState(500);

  const handleInput = (value: string) => {
    setLog(prev => [...prev, `Обработка: "${value}" в ${new Date().toLocaleTimeString()}`]);
  };

  const debouncedHandleInput = useDebounceCallback(handleInput, delay);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    debouncedHandleInput(value);
  };

  const clearLog = () => {
    setLog([]);
  };

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        useDebounceCallback
      </Typography>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Задержка (мс):
        </Typography>
        <Input
          type="number"
          value={delay}
          onChange={e => setDelay(parseInt(e.target.value) || 500)}
          style={{ width: '100px', marginBottom: '12px' }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Введите текст:
        </Typography>
        <Input
          value={inputValue}
          onChange={e => handleInputChange(e.target.value)}
          placeholder="Введите что-нибудь..."
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          <Typography variant="body1">Лог обработки:</Typography>
          <Button size="sm" variant="outlined" onClick={clearLog}>
            Очистить
          </Button>
        </div>
        <div
          style={{
            maxHeight: '200px',
            overflow: 'auto',
            border: '1px solid #dee2e6',
            borderRadius: '4px',
          }}
        >
          {log.length === 0 ? (
            <div style={{ padding: '12px', textAlign: 'center', color: '#6c757d' }}>
              <Typography variant="body2">Лог пуст</Typography>
            </div>
          ) : (
            log.map((entry, index) => (
              <div
                key={index}
                style={{
                  padding: '8px 12px',
                  borderBottom: index < log.length - 1 ? '1px solid #dee2e6' : 'none',
                  backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                }}
              >
                <Typography variant="body2" style={{ fontSize: '12px' }}>
                  {entry}
                </Typography>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Информация:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Текущее значение: "{inputValue}"
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Задержка: {delay}мс
        </Typography>
        <Typography variant="body2">Записей в логе: {log.length}</Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации различных задержек
const DelayComparisonDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const debouncedFast = useDebounce(inputValue, 100);
  const debouncedMedium = useDebounce(inputValue, 500);
  const debouncedSlow = useDebounce(inputValue, 1000);

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Сравнение различных задержек
      </Typography>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Введите текст:
        </Typography>
        <Input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Введите что-нибудь..."
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '16px',
        }}
      >
        <div>
          <Typography variant="body1" marginBottom="sm">
            Быстро (100мс):
          </Typography>
          <Input
            value={debouncedFast}
            readOnly
            style={{ backgroundColor: '#d4edda', borderColor: '#c3e6cb' }}
          />
        </div>

        <div>
          <Typography variant="body1" marginBottom="sm">
            Средне (500мс):
          </Typography>
          <Input
            value={debouncedMedium}
            readOnly
            style={{ backgroundColor: '#fff3cd', borderColor: '#ffeaa7' }}
          />
        </div>

        <div>
          <Typography variant="body1" marginBottom="sm">
            Медленно (1000мс):
          </Typography>
          <Input
            value={debouncedSlow}
            readOnly
            style={{ backgroundColor: '#f8d7da', borderColor: '#f5c6cb' }}
          />
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Текущие значения:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Исходное: "{inputValue}"
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Быстро: "{debouncedFast}"
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Средне: "{debouncedMedium}"
        </Typography>
        <Typography variant="body2">Медленно: "{debouncedSlow}"</Typography>
      </div>
    </Card>
  );
};

export const BasicUsage: Story = {
  render: () => <BasicDebounceDemo />,
};

export const SearchWithDebounce: Story = {
  render: () => <SearchDemo />,
};

export const DebounceCallback: Story = {
  render: () => <DebounceCallbackDemo />,
};

export const DelayComparison: Story = {
  render: () => <DelayComparisonDemo />,
};

export const AllExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <BasicDebounceDemo />
      <SearchDemo />
      <DebounceCallbackDemo />
      <DelayComparisonDemo />
    </div>
  ),
};
