import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Button } from '../components/ui/buttons/Button';
import { Badge } from '../components/ui/Badge';

const meta: Meta = {
  title: 'Handlers/Overview',
  parameters: {
    docs: {
      description: {
        component: `
# Обзор хендлеров

Хендлеры - это утилитарные функции для работы с различными типами данных и операциями.

## Доступные хендлеры:

### Date Handlers
Утилиты для работы с датами: парсинг, форматирование, валидация, календарные функции.

### Time Handlers
Утилиты для работы со временем: парсинг, форматирование, создание времени, проверки.

### Button Theme Handlers
Утилиты для работы с темами кнопок: получение стилей, размеров, состояний.

### Dropdown Theme Handlers
Утилиты для работы с темами dropdown: получение стилей, размеров, состояний, анимаций.

## Особенности:

- Единообразный API для всех хендлеров
- Поддержка различных форматов данных
- Валидация и обработка ошибок
- TypeScript типизация
- Оптимизация производительности
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Компонент для обзора хендлеров
const HandlersOverview = () => {
  const handlers = [
    {
      name: 'Date Handlers',
      description: 'Работа с датами и календарем',
      features: [
        'Парсинг различных форматов дат',
        'Форматирование для отображения',
        'Валидация дат',
        'Календарные функции',
        'Работа с диапазонами дат',
      ],
      color: '#e3f2fd',
      borderColor: '#2196f3',
      icon: '📅',
    },
    {
      name: 'Time Handlers',
      description: 'Работа со временем',
      features: [
        'Парсинг времени',
        'Форматирование времени',
        'Создание времени из компонентов',
        'Проверка временных диапазонов',
        'Работа с часовыми поясами',
      ],
      color: '#e8f5e8',
      borderColor: '#4caf50',
      icon: '⏰',
    },
    {
      name: 'Button Theme Handlers',
      description: 'Работа с темами кнопок',
      features: [
        'Получение стилей кнопок',
        'Работа с размерами',
        'Управление состояниями',
        'Анимации и эффекты',
        'Интеграция с темами',
      ],
      color: '#fff3e0',
      borderColor: '#ff9800',
      icon: '🎨',
    },
    {
      name: 'Dropdown Theme Handlers',
      description: 'Работа с темами dropdown',
      features: [
        'Получение стилей dropdown',
        'Работа с размерами и вариантами',
        'Управление состояниями элементов',
        'Анимации открытия/закрытия',
        'Интеграция с темами',
      ],
      color: '#f3e5f5',
      borderColor: '#9c27b0',
      icon: '📋',
    },
  ];

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Обзор хендлеров
      </Typography>

      <div style={{ marginBottom: '24px' }}>
        <Typography variant="body1" marginBottom="md">
          Хендлеры предоставляют утилитарные функции для работы с различными типами данных и
          операциями.
        </Typography>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        {handlers.map((handler, index) => (
          <div
            key={index}
            style={{
              padding: '20px',
              backgroundColor: handler.color,
              border: `2px solid ${handler.borderColor}`,
              borderRadius: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <Typography variant="h4" style={{ marginRight: '12px' }}>
                {handler.icon}
              </Typography>
              <Typography variant="h4">{handler.name}</Typography>
            </div>

            <Typography variant="body1" marginBottom="md" style={{ color: '#666' }}>
              {handler.description}
            </Typography>

            <Typography variant="body2" marginBottom="sm" style={{ fontWeight: 'bold' }}>
              Основные возможности:
            </Typography>

            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {handler.features.map((feature, featureIndex) => (
                <li key={featureIndex} style={{ marginBottom: '4px' }}>
                  <Typography variant="body2">{feature}</Typography>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Общие принципы:</strong>
        </Typography>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li style={{ marginBottom: '4px' }}>
            <Typography variant="body2">Единообразный API для всех хендлеров</Typography>
          </li>
          <li style={{ marginBottom: '4px' }}>
            <Typography variant="body2">Поддержка различных форматов данных</Typography>
          </li>
          <li style={{ marginBottom: '4px' }}>
            <Typography variant="body2">Валидация и обработка ошибок</Typography>
          </li>
          <li style={{ marginBottom: '4px' }}>
            <Typography variant="body2">TypeScript типизация</Typography>
          </li>
          <li>
            <Typography variant="body2">Оптимизация производительности</Typography>
          </li>
        </ul>
      </div>
    </Card>
  );
};

// Компонент для демонстрации использования
const HandlersUsageExamples = () => {
  const examples = [
    {
      title: 'Date Handlers',
      code: `import { parseDate, formatDateForDisplay, isToday } from '@/handlers/dateHandlers';

// Парсинг даты
const result = parseDate('25.12.2023');
if (result.isValid) {
  console.log(result.date);
}

// Форматирование даты
const formatted = formatDateForDisplay(new Date(), 'DD.MM.YYYY');

// Проверка на сегодня
const isTodayDate = isToday(new Date());`,
      description: 'Работа с датами в различных форматах',
    },
    {
      title: 'Time Handlers',
      code: `import { parseTime, createTime, formatTimeForDisplay } from '@/handlers/timeHandlers';

// Парсинг времени
const timeResult = parseTime('14:30');
if (timeResult.isValid) {
  console.log(timeResult.time);
}

// Создание времени
const time = createTime(14, 30, 0);

// Форматирование времени
const formatted = formatTimeForDisplay(time, 'HH:mm');`,
      description: 'Работа со временем и временными операциями',
    },
    {
      title: 'Button Theme Handlers',
      code: `import { getButtonSize, getButtonVariant, getButtonHoverStyles } from '@/handlers/buttonThemeHandlers';
import { useTheme } from '@/themes/ThemeProvider';

const MyComponent = () => {
  const theme = useTheme();

  // Получение стилей кнопки
  const size = getButtonSize(theme.buttons, 'md');
  const variant = getButtonVariant(theme.buttons, 'primary');
  const hoverStyles = getButtonHoverStyles(theme.buttons, 'primary');

  return <button style={{...size, ...variant, ...hoverStyles}}>Кнопка</button>;
};`,
      description: 'Работа с темами кнопок и стилями',
    },
  ];

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Примеры использования
      </Typography>

      <div style={{ marginBottom: '24px' }}>
        <Typography variant="body1" marginBottom="md">
          Практические примеры использования хендлеров в приложениях.
        </Typography>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {examples.map((example, index) => (
          <div
            key={index}
            style={{
              padding: '20px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <Typography variant="h5" marginRight="sm">
                {example.title}
              </Typography>
              <Badge variant="outlined">{example.description}</Badge>
            </div>

            <div
              style={{
                backgroundColor: '#2d3748',
                color: '#e2e8f0',
                padding: '16px',
                borderRadius: '6px',
                fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                fontSize: '14px',
                overflow: 'auto',
              }}
            >
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{example.code}</pre>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Компонент для демонстрации интеграции
const HandlersIntegrationGuide = () => {
  const integrationSteps = [
    {
      step: 1,
      title: 'Импорт хендлеров',
      description: 'Импортируйте необходимые хендлеры в ваш компонент',
      code: `import { parseDate, formatDateForDisplay } from '@/handlers/dateHandlers';
import { useModal, useToast } from '@/hooks';
// useToast: в корне приложения оберните дерево в ThemeProvider + ToastProvider`,
    },
    {
      step: 2,
      title: 'Использование в компонентах',
      description: 'Используйте хендлеры в логике ваших компонентов',
      code: `// Компонент должен рендериться внутри ToastProvider (и ThemeProvider)
const MyComponent = () => {
  const { showToast } = useToast();

  const handleDateChange = (dateString: string) => {
    const result = parseDate(dateString);
    if (result.isValid) {
      const formatted = formatDateForDisplay(result.date, 'DD.MM.YYYY');
      showToast(\`Дата: \${formatted}\`, 'success');
    } else {
      showToast('Неверный формат даты', 'error');
    }
  };

  return <div>...</div>;
};`,
    },
    {
      step: 3,
      title: 'Обработка ошибок',
      description: 'Всегда проверяйте результаты хендлеров на валидность',
      code: `const result = parseDate(inputValue);
if (result.isValid) {
  // Используем result.date
  console.log('Валидная дата:', result.date);
} else {
  // Обрабатываем ошибку
  console.error('Ошибка парсинга:', result.error);
}`,
    },
    {
      step: 4,
      title: 'Типизация',
      description: 'Используйте TypeScript для лучшей типизации',
      code: `interface DateParseResult {
  isValid: boolean;
  date: Date | null;
  error?: string;
}

const handleDateParse = (input: string): DateParseResult => {
  return parseDate(input);
};`,
    },
  ];

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Руководство по интеграции
      </Typography>

      <div style={{ marginBottom: '24px' }}>
        <Typography variant="body1" marginBottom="md">
          Пошаговое руководство по интеграции хендлеров в ваши приложения.
        </Typography>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {integrationSteps.map((step, index) => (
          <div
            key={index}
            style={{
              padding: '20px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <Badge
                variant="primary"
                style={{
                  marginRight: '12px',
                  minWidth: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {step.step}
              </Badge>
              <Typography variant="h5">{step.title}</Typography>
            </div>

            <Typography variant="body1" marginBottom="md" style={{ color: '#666' }}>
              {step.description}
            </Typography>

            <div
              style={{
                backgroundColor: '#2d3748',
                color: '#e2e8f0',
                padding: '16px',
                borderRadius: '6px',
                fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                fontSize: '14px',
                overflow: 'auto',
              }}
            >
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{step.code}</pre>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export const Overview: Story = {
  render: () => <HandlersOverview />,
};

export const UsageExamples: Story = {
  render: () => <HandlersUsageExamples />,
};

export const IntegrationGuide: Story = {
  render: () => <HandlersIntegrationGuide />,
};

export const AllExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <HandlersOverview />
      <HandlersUsageExamples />
      <HandlersIntegrationGuide />
    </div>
  ),
};
