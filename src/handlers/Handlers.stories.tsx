import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';
import React from 'react';
import {
  storybookStaggerContainerVariants,
  storybookStaggerItemVariants,
  useStorybookMotionTransitions,
} from '@/handlers/storybookMotion';
import { StorybookStaggerStack } from '@/handlers/storybookMotionContainers';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Badge } from '../components/ui/Badge';
import {
  SectionDescription,
  HandlersGrid,
  HandlerCard,
  HandlerCardHeader,
  HandlerFeaturesList,
  HandlerFeatureListItem,
  PrinciplesBox,
  ExamplesList,
  ExampleCard,
  ExampleHeader,
  MutedDescriptionText,
  CodeBlock,
  CodePre,
  IntegrationStepsList,
  IntegrationStepCard,
  IntegrationStepHeader,
  StepBadge,
} from './Handlers.stories.style';

const meta: Meta = {
  title: 'UI Kit/Utils/Handlers/Overview',
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
  const motionTransitions = useStorybookMotionTransitions();

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

      <SectionDescription>
        <Typography variant="body1" marginBottom="md">
          Хендлеры предоставляют утилитарные функции для работы с различными типами данных и
          операциями.
        </Typography>
      </SectionDescription>

      <HandlersGrid
        variants={storybookStaggerContainerVariants(motionTransitions.stagger)}
        initial="hidden"
        animate="visible"
      >
        {handlers.map(handler => (
          <motion.div key={handler.name} variants={storybookStaggerItemVariants}>
            <HandlerCard $backgroundColor={handler.color} $borderColor={handler.borderColor}>
            <HandlerCardHeader>
              <Typography variant="h4" marginRight="sm">
                {handler.icon}
              </Typography>
              <Typography variant="h4">{handler.name}</Typography>
            </HandlerCardHeader>

            <MutedDescriptionText>
              <Typography variant="body1" marginBottom="md">
                {handler.description}
              </Typography>
            </MutedDescriptionText>

            <Typography variant="body2" marginBottom="sm" fontWeight="bold">
              Основные возможности:
            </Typography>

            <HandlerFeaturesList>
              {handler.features.map((feature, featureIndex) => (
                <HandlerFeatureListItem key={featureIndex}>
                  <Typography variant="body2">{feature}</Typography>
                </HandlerFeatureListItem>
              ))}
            </HandlerFeaturesList>
          </HandlerCard>
          </motion.div>
        ))}
      </HandlersGrid>

      <PrinciplesBox>
        <Typography variant="body1" marginBottom="sm">
          <strong>Общие принципы:</strong>
        </Typography>
        <HandlerFeaturesList>
          <HandlerFeatureListItem>
            <Typography variant="body2">Единообразный API для всех хендлеров</Typography>
          </HandlerFeatureListItem>
          <HandlerFeatureListItem>
            <Typography variant="body2">Поддержка различных форматов данных</Typography>
          </HandlerFeatureListItem>
          <HandlerFeatureListItem>
            <Typography variant="body2">Валидация и обработка ошибок</Typography>
          </HandlerFeatureListItem>
          <HandlerFeatureListItem>
            <Typography variant="body2">TypeScript типизация</Typography>
          </HandlerFeatureListItem>
          <li>
            <Typography variant="body2">Оптимизация производительности</Typography>
          </li>
        </HandlerFeaturesList>
      </PrinciplesBox>
    </Card>
  );
};

// Компонент для демонстрации использования
const HandlersUsageExamples = () => {
  const motionTransitions = useStorybookMotionTransitions();

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

      <SectionDescription>
        <Typography variant="body1" marginBottom="md">
          Практические примеры использования хендлеров в приложениях.
        </Typography>
      </SectionDescription>

      <ExamplesList
        variants={storybookStaggerContainerVariants(motionTransitions.stagger)}
        initial="hidden"
        animate="visible"
      >
        {examples.map(example => (
          <motion.div key={example.title} variants={storybookStaggerItemVariants}>
            <ExampleCard>
              <ExampleHeader>
                <Typography variant="h5" marginBottom="xs">
                  {example.title}
                </Typography>
                <MutedDescriptionText>
                  <Typography variant="body2">{example.description}</Typography>
                </MutedDescriptionText>
              </ExampleHeader>

              <CodeBlock>
                <CodePre>{example.code}</CodePre>
              </CodeBlock>
            </ExampleCard>
          </motion.div>
        ))}
      </ExamplesList>
    </Card>
  );
};

// Компонент для демонстрации интеграции
const HandlersIntegrationGuide = () => {
  const motionTransitions = useStorybookMotionTransitions();

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

      <SectionDescription>
        <Typography variant="body1" marginBottom="md">
          Пошаговое руководство по интеграции хендлеров в ваши приложения.
        </Typography>
      </SectionDescription>

      <IntegrationStepsList
        variants={storybookStaggerContainerVariants(motionTransitions.stagger)}
        initial="hidden"
        animate="visible"
      >
        {integrationSteps.map(step => (
          <motion.div key={step.title} variants={storybookStaggerItemVariants}>
            <IntegrationStepCard>
              <IntegrationStepHeader>
                <Badge
                  variant="primary"
                  as={StepBadge}
                >
                  {step.step}
                </Badge>
                <Typography variant="h5">{step.title}</Typography>
              </IntegrationStepHeader>

              <MutedDescriptionText>
                <Typography variant="body1" marginBottom="md">
                  {step.description}
                </Typography>
              </MutedDescriptionText>

              <CodeBlock>
                <CodePre>{step.code}</CodePre>
              </CodeBlock>
            </IntegrationStepCard>
          </motion.div>
        ))}
      </IntegrationStepsList>
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
    <StorybookStaggerStack>
      <HandlersOverview />
      <HandlersUsageExamples />
      <HandlersIntegrationGuide />
    </StorybookStaggerStack>
  ),
};

