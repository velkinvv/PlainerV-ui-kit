import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '../components/ui/buttons/Button';
import { Input } from '../components/ui/inputs/Input';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import {
  parseDate,
  formatDateForDisplay,
  parseDateRange,
  toISODateString,
  getCurrentDate,
  isToday,
  getDaysInMonth,
  getMonthYearDisplay,
  getWeekdayNames,
  isInRange,
  isRangeStart,
  isRangeEnd,
  isCurrentMonth,
  isValidDate,
} from './dateHandlers';

const meta: Meta = {
  title: 'Handlers/Date Handlers',
  parameters: {
    docs: {
      description: {
        component: `
# Хендлеры для работы с датами

Набор утилит для парсинга, форматирования и работы с датами в различных форматах.

## Основные функции:

- **parseDate** - парсит дату из различных форматов
- **formatDateForDisplay** - форматирует дату для отображения
- **parseDateRange** - парсит диапазон дат
- **toISODateString** - преобразует в ISO строку
- **getCurrentDate** - получает текущую дату
- **isToday** - проверяет, является ли дата сегодняшней
- **getDaysInMonth** - получает дни месяца для календаря
- **getMonthYearDisplay** - получает название месяца и года
- **getWeekdayNames** - получает названия дней недели
- **isInRange** - проверяет, находится ли дата в диапазоне
- **isRangeStart/isRangeEnd** - проверяет границы диапазона
- **isCurrentMonth** - проверяет, является ли дата текущего месяца
- **isValidDate** - проверяет валидность даты

## Поддерживаемые форматы:

- DD.MM.YYYY, DD-MM-YYYY, DD/MM/YYYY
- YYYY-MM-DD, YYYY.MM.DD, YYYY/MM/DD
- ISO строки (с временем и часовым поясом)
- Timestamp (число или строка)
- UTC строки
- Объект Date
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Компонент для демонстрации парсинга дат
const DateParserDemo = () => {
  const [input, setInput] = useState('25.12.2023');
  const [result, setResult] = useState<any>(null);

  const handleParse = () => {
    const parseResult = parseDate(input);
    setResult(parseResult);
  };

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Парсинг дат
      </Typography>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Введите дату (например: 25.12.2023)"
          style={{ flex: 1 }}
        />
        <Button onClick={handleParse}>Парсить</Button>
      </div>
      {result && (
        <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <Typography variant="body1" marginBottom="sm">
            <strong>Результат:</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs">
            Валидная: {result.isValid ? 'Да' : 'Нет'}
          </Typography>
          <Typography variant="body2" marginBottom="xs">
            Дата: {result.date ? result.date.toLocaleString() : 'null'}
          </Typography>
          {result.error && (
            <Typography variant="body2" color="danger">
              Ошибка: {result.error}
            </Typography>
          )}
        </div>
      )}
    </Card>
  );
};

// Компонент для демонстрации форматирования дат
const DateFormatterDemo = () => {
  const [date, setDate] = useState(new Date());
  const [format, setFormat] = useState('DD.MM.YYYY');

  const formats = ['DD.MM.YYYY', 'YYYY-MM-DD', 'MMMM YYYY г.', 'dddd, MMMM Do YYYY', 'MM/DD/YYYY'];

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Форматирование дат
      </Typography>
      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Выберите формат:
        </Typography>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {formats.map(fmt => (
            <Button
              key={fmt}
              variant={format === fmt ? 'primary' : 'outlined'}
              size="sm"
              onClick={() => setFormat(fmt)}
            >
              {fmt}
            </Button>
          ))}
        </div>
      </div>
      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body2" marginBottom="xs">
          <strong>Исходная дата:</strong> {date.toLocaleString()}
        </Typography>
        <Typography variant="body2">
          <strong>Отформатированная:</strong> {formatDateForDisplay(date, format)}
        </Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации работы с диапазонами дат
const DateRangeDemo = () => {
  const [rangeInput, setRangeInput] = useState('01.01.2023 — 31.12.2023');
  const [rangeResult, setRangeResult] = useState<any>(null);

  const handleParseRange = () => {
    const result = parseDateRange(rangeInput);
    setRangeResult(result);
  };

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Парсинг диапазонов дат
      </Typography>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Input
          value={rangeInput}
          onChange={e => setRangeInput(e.target.value)}
          placeholder="Введите диапазон (например: 01.01.2023 — 31.12.2023)"
          style={{ flex: 1 }}
        />
        <Button onClick={handleParseRange}>Парсить</Button>
      </div>
      {rangeResult && (
        <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <Typography variant="body1" marginBottom="sm">
            <strong>Результат:</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs">
            Начало: {rangeResult.start ? rangeResult.start.toLocaleDateString() : 'null'}
          </Typography>
          <Typography variant="body2">
            Конец: {rangeResult.end ? rangeResult.end.toLocaleDateString() : 'null'}
          </Typography>
        </div>
      )}
    </Card>
  );
};

// Компонент для демонстрации календарных функций
const CalendarDemo = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const days = getDaysInMonth(currentDate);
  const weekdays = getWeekdayNames();

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Календарные функции
      </Typography>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <Button onClick={prevMonth}>←</Button>
        <Typography variant="h4">{getMonthYearDisplay(currentDate)}</Typography>
        <Button onClick={nextMonth}>→</Button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          marginBottom: '16px',
        }}
      >
        {weekdays.map(day => (
          <div key={day} style={{ textAlign: 'center', padding: '8px', fontWeight: 'bold' }}>
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const isCurrentMonth = isCurrentMonth(day, currentDate);
          const isTodayDate = isToday(day);

          return (
            <div
              key={index}
              style={{
                padding: '8px',
                textAlign: 'center',
                backgroundColor: isTodayDate ? '#007bff' : isCurrentMonth ? '#f8f9fa' : '#e9ecef',
                color: isTodayDate ? 'white' : isCurrentMonth ? 'black' : '#6c757d',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body2" marginBottom="xs">
          <strong>Текущая дата:</strong> {getCurrentDate().toLocaleDateString()}
        </Typography>
        <Typography variant="body2">
          <strong>Сегодня:</strong> {isToday(currentDate) ? 'Да' : 'Нет'}
        </Typography>
      </div>
    </Card>
  );
};

export const DateParser: Story = {
  render: () => <DateParserDemo />,
};

export const DateFormatter: Story = {
  render: () => <DateFormatterDemo />,
};

export const DateRange: Story = {
  render: () => <DateRangeDemo />,
};

export const Calendar: Story = {
  render: () => <CalendarDemo />,
};

export const AllExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <DateParserDemo />
      <DateFormatterDemo />
      <DateRangeDemo />
      <CalendarDemo />
    </div>
  ),
};
