import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '../components/ui/buttons/Button';
import { Input } from '../components/ui/inputs/Input';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import {
  parseTime,
  formatTimeForDisplay,
  parseTimeRange,
  isCurrentTime,
  getHours,
  getMinutes,
  getSeconds,
  isInTimeRange,
  isTimeRangeStart,
  isTimeRangeEnd,
  createTime,
  getHoursFromTime,
  getMinutesFromTime,
  getSecondsFromTime,
  formatHours,
  formatMinutes,
  formatSeconds,
  isValidTime,
} from './timeHandlers';
import { inputFieldStoriesStyles } from '@/handlers/inputFieldStories.styles';
import { storybookDemoStyles } from '@/handlers/storybookDemo.styles';
import { StorybookStaggerStack } from '@/handlers/storybookMotionContainers';

const meta: Meta = {
  title: 'UI Kit/Utils/Handlers/Time Handlers',
  parameters: {
    docs: {
      description: {
        component: `
# Хендлеры для работы со временем

Набор утилит для парсинга, форматирования и работы со временем в различных форматах.

## Основные функции:

- **parseTime** - парсит время из различных форматов
- **formatTimeForDisplay** - форматирует время для отображения
- **parseTimeRange** - парсит диапазон времени
- **toISOTimeString** - преобразует в ISO строку времени
- **getCurrentTime** - получает текущее время
- **isCurrentTime** - проверяет, является ли время текущим
- **getHours/getMinutes/getSeconds** - получает часы/минуты/секунды для селекторов
- **isInTimeRange** - проверяет, находится ли время в диапазоне
- **isTimeRangeStart/isTimeRangeEnd** - проверяет границы диапазона времени
- **createTime** - создает время из часов, минут, секунд
- **getHoursFromTime/getMinutesFromTime/getSecondsFromTime** - извлекает компоненты времени
- **formatHours/formatMinutes/formatSeconds** - форматирует компоненты времени
- **isValidTime** - проверяет валидность времени

## Поддерживаемые форматы:

- HH:mm, HH:mm:ss, HH:mm:ss.SSS
- HH.mm, HH.mm.ss, HH.mm.ss.SSS
- HH/mm, HH/mm/ss, HH/mm/ss/SSS
- ISO строки (с датой и временем)
- Timestamp (число или строка)
- Объект Date
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Компонент для демонстрации парсинга времени
const TimeParserDemo = () => {
  const [input, setInput] = useState('14:30');
  const [result, setResult] = useState<any>(null);

  const handleParse = () => {
    const parseResult = parseTime(input);
    setResult(parseResult);
  };

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Парсинг времени
      </Typography>
      <div style={storybookDemoStyles.rowFlexGap12MarginBottom16}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите время (например: 14:30)"
          style={storybookDemoStyles.flexGrowFull}
        />
        <Button onClick={handleParse}>Парсить</Button>
      </div>
      {result && (
        <div style={storybookDemoStyles.demoResultPanel}>
          <Typography variant="body1" marginBottom="sm">
            <strong>Результат:</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs">
            Валидное: {result.isValid ? 'Да' : 'Нет'}
          </Typography>
          <Typography variant="body2" marginBottom="xs">
            Время: {result.time ? result.time.toLocaleTimeString() : 'null'}
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

// Компонент для демонстрации форматирования времени
const TimeFormatterDemo = () => {
  const [time, setTime] = useState(new Date());
  const [format, setFormat] = useState('HH:mm');

  const formats = ['HH:mm', 'HH:mm:ss', 'HH:mm:ss.SSS', 'hh:mm A', 'HH.mm', 'HH/mm'];

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Форматирование времени
      </Typography>
      <div style={storybookDemoStyles.marginBottom16}>
        <Typography variant="body1" marginBottom="sm">
          Выберите формат:
        </Typography>
        <div style={inputFieldStoriesStyles.rowWrapGap8}>
          {formats.map((fmt) => (
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
      <div style={storybookDemoStyles.demoResultPanel}>
        <Typography variant="body2" marginBottom="xs">
          <strong>Исходное время:</strong> {time.toLocaleTimeString()}
        </Typography>
        <Typography variant="body2">
          <strong>Отформатированное:</strong> {formatTimeForDisplay(time, format)}
        </Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации работы с диапазонами времени
const TimeRangeDemo = () => {
  const [rangeInput, setRangeInput] = useState('09:00 — 18:00');
  const [rangeResult, setRangeResult] = useState<any>(null);

  const handleParseRange = () => {
    const result = parseTimeRange(rangeInput);
    setRangeResult(result);
  };

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Парсинг диапазонов времени
      </Typography>
      <div style={storybookDemoStyles.rowFlexGap12MarginBottom16}>
        <Input
          value={rangeInput}
          onChange={(e) => setRangeInput(e.target.value)}
          placeholder="Введите диапазон (например: 09:00 — 18:00)"
          style={storybookDemoStyles.flexGrowFull}
        />
        <Button onClick={handleParseRange}>Парсить</Button>
      </div>
      {rangeResult && (
        <div style={storybookDemoStyles.demoResultPanel}>
          <Typography variant="body1" marginBottom="sm">
            <strong>Результат:</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs">
            Начало: {rangeResult.start ? rangeResult.start.toLocaleTimeString() : 'null'}
          </Typography>
          <Typography variant="body2">
            Конец: {rangeResult.end ? rangeResult.end.toLocaleTimeString() : 'null'}
          </Typography>
        </div>
      )}
    </Card>
  );
};

// Компонент для демонстрации создания времени
const TimeCreatorDemo = () => {
  const [hours, setHours] = useState(14);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [createdTime, setCreatedTime] = useState<Date | null>(null);

  const handleCreateTime = () => {
    const time = createTime(hours, minutes, seconds);
    setCreatedTime(time);
  };

  const hoursOptions = getHours();
  const minutesOptions = getMinutes(5); // с шагом 5 минут
  const secondsOptions = getSeconds(10); // с шагом 10 секунд

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Создание времени
      </Typography>

      <div style={storybookDemoStyles.rowFlexGap12MarginBottom16}>
        <div>
          <Typography variant="body2" marginBottom="xs">
            Часы:
          </Typography>
          <select
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value))}
            style={storybookDemoStyles.nativeSelectBordered}
          >
            {hoursOptions.map((h) => (
              <option key={h} value={h}>
                {formatHours(h)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Typography variant="body2" marginBottom="xs">
            Минуты:
          </Typography>
          <select
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value))}
            style={storybookDemoStyles.nativeSelectBordered}
          >
            {minutesOptions.map((m) => (
              <option key={m} value={m}>
                {formatMinutes(m)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Typography variant="body2" marginBottom="xs">
            Секунды:
          </Typography>
          <select
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value))}
            style={storybookDemoStyles.nativeSelectBordered}
          >
            {secondsOptions.map((s) => (
              <option key={s} value={s}>
                {formatSeconds(s)}
              </option>
            ))}
          </select>
        </div>

        <Button onClick={handleCreateTime} style={storybookDemoStyles.alignSelfFlexEnd}>
          Создать
        </Button>
      </div>

      {createdTime && (
        <div style={storybookDemoStyles.demoResultPanel}>
          <Typography variant="body1" marginBottom="sm">
            <strong>Созданное время:</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs">
            Полное время: {createdTime.toLocaleString()}
          </Typography>
          <Typography variant="body2" marginBottom="xs">
            Часы: {getHoursFromTime(createdTime)}
          </Typography>
          <Typography variant="body2" marginBottom="xs">
            Минуты: {getMinutesFromTime(createdTime)}
          </Typography>
          <Typography variant="body2">Секунды: {getSecondsFromTime(createdTime)}</Typography>
        </div>
      )}
    </Card>
  );
};

// Компонент для демонстрации проверки времени
const TimeValidationDemo = () => {
  const [testTime, setTestTime] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date(2023, 0, 1, 9, 0));
  const [endTime, setEndTime] = useState(new Date(2023, 0, 1, 18, 0));

  const isInRangeResult = isInTimeRange(testTime, startTime, endTime);
  const isStartResult = isTimeRangeStart(testTime, startTime);
  const isEndResult = isTimeRangeEnd(testTime, endTime);
  const isCurrentResult = isCurrentTime(testTime);
  const isValidResult = isValidTime(testTime);

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Проверка времени
      </Typography>

      <div style={storybookDemoStyles.gridTwoColumnsGap16MarginBottom16}>
        <div>
          <Typography variant="body2" marginBottom="xs">
            Тестовое время:
          </Typography>
          <Input
            type="time"
            value={testTime.toTimeString().slice(0, 5)}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(':').map(Number);
              setTestTime(new Date(2023, 0, 1, hours, minutes));
            }}
          />
        </div>

        <div>
          <Typography variant="body2" marginBottom="xs">
            Начало диапазона:
          </Typography>
          <Input
            type="time"
            value={startTime.toTimeString().slice(0, 5)}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(':').map(Number);
              setStartTime(new Date(2023, 0, 1, hours, minutes));
            }}
          />
        </div>

        <div>
          <Typography variant="body2" marginBottom="xs">
            Конец диапазона:
          </Typography>
          <Input
            type="time"
            value={endTime.toTimeString().slice(0, 5)}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(':').map(Number);
              setEndTime(new Date(2023, 0, 1, hours, minutes));
            }}
          />
        </div>
      </div>

      <div style={storybookDemoStyles.demoResultPanel}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Результаты проверки:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Валидное время: {isValidResult ? 'Да' : 'Нет'}
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Текущее время: {isCurrentResult ? 'Да' : 'Нет'}
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          В диапазоне: {isInRangeResult ? 'Да' : 'Нет'}
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Начало диапазона: {isStartResult ? 'Да' : 'Нет'}
        </Typography>
        <Typography variant="body2">Конец диапазона: {isEndResult ? 'Да' : 'Нет'}</Typography>
      </div>
    </Card>
  );
};

export const TimeParser: Story = {
  render: () => <TimeParserDemo />,
};

export const TimeFormatter: Story = {
  render: () => <TimeFormatterDemo />,
};

export const TimeRange: Story = {
  render: () => <TimeRangeDemo />,
};

export const TimeCreator: Story = {
  render: () => <TimeCreatorDemo />,
};

export const TimeValidation: Story = {
  render: () => <TimeValidationDemo />,
};

export const AllExamples: Story = {
  render: () => (
    <StorybookStaggerStack>
      <TimeParserDemo />
      <TimeFormatterDemo />
      <TimeRangeDemo />
      <TimeCreatorDemo />
      <TimeValidationDemo />
    </StorybookStaggerStack>
  ),
};
