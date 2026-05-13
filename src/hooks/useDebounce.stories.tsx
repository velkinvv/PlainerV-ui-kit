import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Size } from '../types/sizes';
import { Button } from '../components/ui/buttons/Button';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Input } from '../components/ui/inputs/Input';
import { StorybookStaggerStack } from '@/handlers/storybookMotionContainers';
import { useDebounce, useDebounceCallback } from './useDebounce';
import {
  CenteredMessage,
  DebouncedQueryCard,
  LogContainer,
  LogEntry,
  LogEntryText,
  LogHeader,
  NumberInput,
  QueryValueCard,
  ReadOnlyInputDanger,
  ReadOnlyInputMuted,
  ReadOnlyInputSuccess,
  ReadOnlyInputWarning,
  ResultItem,
  ResultsList,
  SectionContainer,
  SourceQueryCard,
  StatusContainer,
  ThreeColumnsGrid,
  TwoColumnsGrid,
} from './useDebounce.stories.style';

const meta: Meta = {
  title: 'UI Kit/Hooks/useDebounce',
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

      <SectionContainer>
        <Typography variant="body1" marginBottom="sm">
          Задержка (мс):
        </Typography>
        <NumberInput
          type="number"
          value={delay}
          onChange={e => setDelay(parseInt(e.target.value) || 500)}
        />
      </SectionContainer>

      <TwoColumnsGrid>
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
          <ReadOnlyInputMuted value={debouncedValue} readOnly />
        </div>
      </TwoColumnsGrid>

      <StatusContainer>
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
      </StatusContainer>
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

      <SectionContainer>
        <Typography variant="body1" marginBottom="sm">
          Поиск:
        </Typography>
        <Input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Введите поисковый запрос..."
        />
      </SectionContainer>

      <TwoColumnsGrid>
        <div>
          <Typography variant="body1" marginBottom="sm">
            Исходный запрос:
          </Typography>
          <SourceQueryCard>
            <Typography variant="body2">"{searchTerm}"</Typography>
          </SourceQueryCard>
        </div>

        <div>
          <Typography variant="body1" marginBottom="sm">
            Отложенный запрос:
          </Typography>
          <DebouncedQueryCard>
            <Typography variant="body2">"{debouncedSearchTerm}"</Typography>
          </DebouncedQueryCard>
        </div>
      </TwoColumnsGrid>

      <SectionContainer>
        <Typography variant="body1" marginBottom="sm">
          Результаты поиска:
        </Typography>
        {isSearching ? (
          <CenteredMessage>
            <Typography variant="body2">Поиск...</Typography>
          </CenteredMessage>
        ) : results.length === 0 ? (
          <CenteredMessage>
            <Typography variant="body2">
              {searchTerm ? 'Результаты не найдены' : 'Введите поисковый запрос'}
            </Typography>
          </CenteredMessage>
        ) : (
          <ResultsList>
            {results.map((result, resultIndex) => (
              <ResultItem key={resultIndex}>
                <Typography variant="body2">{result}</Typography>
              </ResultItem>
            ))}
          </ResultsList>
        )}
      </SectionContainer>

      <StatusContainer>
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
      </StatusContainer>
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

      <SectionContainer>
        <Typography variant="body1" marginBottom="sm">
          Задержка (мс):
        </Typography>
        <NumberInput
          type="number"
          value={delay}
          onChange={e => setDelay(parseInt(e.target.value) || 500)}
        />
      </SectionContainer>

      <SectionContainer>
        <Typography variant="body1" marginBottom="sm">
          Введите текст:
        </Typography>
        <Input
          value={inputValue}
          onChange={e => handleInputChange(e.target.value)}
          placeholder="Введите что-нибудь..."
        />
      </SectionContainer>

      <SectionContainer>
        <LogHeader>
          <Typography variant="body1">Лог обработки:</Typography>
          <Button size={Size.SM} variant="outlined" onClick={clearLog}>
            Очистить
          </Button>
        </LogHeader>
        <LogContainer>
          {log.length === 0 ? (
            <CenteredMessage>
              <Typography variant="body2">Лог пуст</Typography>
            </CenteredMessage>
          ) : (
            log.map((entry, entryIndex) => (
              <LogEntry
                key={entryIndex}
                $isLast={entryIndex === log.length - 1}
                $isEven={entryIndex % 2 === 0}
              >
                <LogEntryText variant="body2">
                  {entry}
                </LogEntryText>
              </LogEntry>
            ))
          )}
        </LogContainer>
      </SectionContainer>

      <StatusContainer>
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
      </StatusContainer>
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

      <SectionContainer>
        <Typography variant="body1" marginBottom="sm">
          Введите текст:
        </Typography>
        <Input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Введите что-нибудь..."
        />
      </SectionContainer>

      <ThreeColumnsGrid>
        <div>
          <Typography variant="body1" marginBottom="sm">
            Быстро (100мс):
          </Typography>
          <ReadOnlyInputSuccess value={debouncedFast} readOnly />
        </div>

        <div>
          <Typography variant="body1" marginBottom="sm">
            Средне (500мс):
          </Typography>
          <ReadOnlyInputWarning value={debouncedMedium} readOnly />
        </div>

        <div>
          <Typography variant="body1" marginBottom="sm">
            Медленно (1000мс):
          </Typography>
          <ReadOnlyInputDanger value={debouncedSlow} readOnly />
        </div>
      </ThreeColumnsGrid>

      <StatusContainer>
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
      </StatusContainer>
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
    <StorybookStaggerStack>
      <BasicDebounceDemo />
      <SearchDemo />
      <DebounceCallbackDemo />
      <DelayComparisonDemo />
    </StorybookStaggerStack>
  ),
};

