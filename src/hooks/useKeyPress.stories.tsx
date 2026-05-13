import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Size } from '../types/sizes';
import { Button } from '../components/ui/buttons/Button';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { StorybookStaggerStack } from '@/handlers/storybookMotionContainers';
import { useKeyPress, useKeyPressSimple } from './useKeyPress';
import {
  ButtonRow,
  ButtonRowWrap,
  ControlsRowWrap,
  SectionContainer,
  StatusContainer,
} from './useKeyPress.stories.style';

const meta: Meta = {
  title: 'UI Kit/Hooks/useKeyPress',
  parameters: {
    docs: {
      description: {
        component: `
# useKeyPress Hook

Хук для обработки нажатий клавиш. Поддерживает одиночные клавиши, комбинации с модификаторами и множественные клавиши.

## Основные функции:

### useKeyPress
Полнофункциональный хук с опциями.

### useKeyPressSimple
Упрощенная версия для одного ключа.

## Параметры useKeyPress:

- **targetKey** - клавиша или массив клавиш для отслеживания
- **handler** - функция-обработчик события
- **modifier** - модификатор (ctrl, alt, shift, meta)
- **preventDefault** - предотвращать стандартное поведение (по умолчанию false)
- **enabled** - включен ли хук (по умолчанию true)

## Использование:

\`\`\`typescript
// Простое использование
useKeyPress({
  targetKey: 'Escape',
  handler: () => console.log('Escape pressed'),
});

// С модификатором
useKeyPress({
  targetKey: 's',
  modifier: 'ctrl',
  handler: () => console.log('Ctrl+S pressed'),
});

// Упрощенная версия
useKeyPressSimple('Enter', () => console.log('Enter pressed'));
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Компонент для демонстрации базового использования
const BasicKeyPressDemo = () => {
  const [lastKey, setLastKey] = useState<string>('');
  const [keyCount, setKeyCount] = useState(0);

  useKeyPress({
    targetKey: 'Enter',
    handler: (event) => {
      setLastKey('Enter');
      setKeyCount((prev) => prev + 1);
    },
  });

  useKeyPress({
    targetKey: 'Escape',
    handler: (event) => {
      setLastKey('Escape');
      setKeyCount((prev) => prev + 1);
    },
  });

  useKeyPress({
    targetKey: ' ',
    handler: (event) => {
      setLastKey('Space');
      setKeyCount((prev) => prev + 1);
    },
  });

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Базовое использование useKeyPress
      </Typography>

      <SectionContainer>
        <Typography variant="body1" marginBottom="sm">
          Нажмите клавиши: Enter, Escape или Space
        </Typography>
      </SectionContainer>

      <StatusContainer>
        <Typography variant="body1" marginBottom="sm">
          <strong>Статус:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Последняя нажатая клавиша: {lastKey || 'Нет'}
        </Typography>
        <Typography variant="body2">Всего нажатий: {keyCount}</Typography>
      </StatusContainer>
    </Card>
  );
};

// Компонент для демонстрации модификаторов
const ModifierKeysDemo = () => {
  const [lastCombination, setLastCombination] = useState<string>('');
  const [combinationCount, setCombinationCount] = useState(0);

  useKeyPress({
    targetKey: 's',
    modifier: 'ctrl',
    handler: (event) => {
      setLastCombination('Ctrl+S');
      setCombinationCount((prev) => prev + 1);
    },
  });

  useKeyPress({
    targetKey: 'z',
    modifier: 'ctrl',
    handler: (event) => {
      setLastCombination('Ctrl+Z');
      setCombinationCount((prev) => prev + 1);
    },
  });

  useKeyPress({
    targetKey: 'a',
    modifier: 'ctrl',
    handler: (event) => {
      setLastCombination('Ctrl+A');
      setCombinationCount((prev) => prev + 1);
    },
  });

  useKeyPress({
    targetKey: 'c',
    modifier: 'ctrl',
    handler: (event) => {
      setLastCombination('Ctrl+C');
      setCombinationCount((prev) => prev + 1);
    },
  });

  useKeyPress({
    targetKey: 'v',
    modifier: 'ctrl',
    handler: (event) => {
      setLastCombination('Ctrl+V');
      setCombinationCount((prev) => prev + 1);
    },
  });

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Комбинации с модификаторами
      </Typography>

      <SectionContainer>
        <Typography variant="body1" marginBottom="sm">
          Попробуйте стандартные комбинации:
        </Typography>
        <ButtonRowWrap>
          <Button size={Size.SM} variant="outlined">
            Ctrl+S
          </Button>
          <Button size={Size.SM} variant="outlined">
            Ctrl+Z
          </Button>
          <Button size={Size.SM} variant="outlined">
            Ctrl+A
          </Button>
          <Button size={Size.SM} variant="outlined">
            Ctrl+C
          </Button>
          <Button size={Size.SM} variant="outlined">
            Ctrl+V
          </Button>
        </ButtonRowWrap>
      </SectionContainer>

      <StatusContainer>
        <Typography variant="body1" marginBottom="sm">
          <strong>Статус:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Последняя комбинация: {lastCombination || 'Нет'}
        </Typography>
        <Typography variant="body2">Всего комбинаций: {combinationCount}</Typography>
      </StatusContainer>
    </Card>
  );
};

// Компонент для демонстрации множественных клавиш
const MultipleKeysDemo = () => {
  const [lastKey, setLastKey] = useState<string>('');
  const [keyCount, setKeyCount] = useState(0);

  useKeyPress({
    targetKey: ['1', '2', '3', '4', '5'],
    handler: (event) => {
      setLastKey(event.key);
      setKeyCount((prev) => prev + 1);
    },
  });

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Множественные клавиши
      </Typography>

      <SectionContainer>
        <Typography variant="body1" marginBottom="sm">
          Нажмите цифры от 1 до 5
        </Typography>
      </SectionContainer>

      <SectionContainer>
        <ButtonRow>
          {['1', '2', '3', '4', '5'].map((num) => (
            <Button key={num} size={Size.SM} variant="outlined">
              {num}
            </Button>
          ))}
        </ButtonRow>
      </SectionContainer>

      <StatusContainer>
        <Typography variant="body1" marginBottom="sm">
          <strong>Статус:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Последняя нажатая цифра: {lastKey || 'Нет'}
        </Typography>
        <Typography variant="body2">Всего нажатий: {keyCount}</Typography>
      </StatusContainer>
    </Card>
  );
};

// Компонент для демонстрации включения/отключения
const EnabledDisabledDemo = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [lastKey, setLastKey] = useState<string>('');
  const [keyCount, setKeyCount] = useState(0);

  useKeyPress({
    targetKey: 'ArrowUp',
    handler: (event) => {
      setLastKey('Arrow Up');
      setKeyCount((prev) => prev + 1);
    },
    enabled: isEnabled,
  });

  useKeyPress({
    targetKey: 'ArrowDown',
    handler: (event) => {
      setLastKey('Arrow Down');
      setKeyCount((prev) => prev + 1);
    },
    enabled: isEnabled,
  });

  useKeyPress({
    targetKey: 'ArrowLeft',
    handler: (event) => {
      setLastKey('Arrow Left');
      setKeyCount((prev) => prev + 1);
    },
    enabled: isEnabled,
  });

  useKeyPress({
    targetKey: 'ArrowRight',
    handler: (event) => {
      setLastKey('Arrow Right');
      setKeyCount((prev) => prev + 1);
    },
    enabled: isEnabled,
  });

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Управление состоянием useKeyPress
      </Typography>

      <ControlsRowWrap>
        <Button
          variant={isEnabled ? 'primary' : 'outlined'}
          onClick={() => setIsEnabled(!isEnabled)}
        >
          {isEnabled ? 'Отключить' : 'Включить'} отслеживание
        </Button>
        <Button onClick={() => setKeyCount(0)} variant="outlined">
          Сбросить счетчик
        </Button>
      </ControlsRowWrap>

      <SectionContainer>
        <Typography variant="body1" marginBottom="sm">
          Нажмите стрелки для навигации
        </Typography>
        <ButtonRow>
          {['↑', '↓', '←', '→'].map((arrow) => (
            <Button key={arrow} size={Size.SM} variant="outlined">
              {arrow}
            </Button>
          ))}
        </ButtonRow>
      </SectionContainer>

      <StatusContainer>
        <Typography variant="body1" marginBottom="sm">
          <strong>Статус:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Отслеживание: {isEnabled ? 'Включено' : 'Отключено'}
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Последняя стрелка: {lastKey || 'Нет'}
        </Typography>
        <Typography variant="body2">Всего нажатий: {keyCount}</Typography>
      </StatusContainer>
    </Card>
  );
};

// Компонент для демонстрации useKeyPressSimple
const SimpleKeyPressDemo = () => {
  const [lastKey, setLastKey] = useState<string>('');
  const [keyCount, setKeyCount] = useState(0);

  useKeyPressSimple('F1', () => {
    setLastKey('F1');
    setKeyCount((prev) => prev + 1);
  });

  useKeyPressSimple('F2', () => {
    setLastKey('F2');
    setKeyCount((prev) => prev + 1);
  });

  useKeyPressSimple('F3', () => {
    setLastKey('F3');
    setKeyCount((prev) => prev + 1);
  });

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        useKeyPressSimple
      </Typography>

      <SectionContainer>
        <Typography variant="body1" marginBottom="sm">
          Нажмите функциональные клавиши F1, F2, F3
        </Typography>
      </SectionContainer>

      <SectionContainer>
        <ButtonRow>
          {['F1', 'F2', 'F3'].map((key) => (
            <Button key={key} size={Size.SM} variant="outlined">
              {key}
            </Button>
          ))}
        </ButtonRow>
      </SectionContainer>

      <StatusContainer>
        <Typography variant="body1" marginBottom="sm">
          <strong>Статус:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Последняя клавиша: {lastKey || 'Нет'}
        </Typography>
        <Typography variant="body2">Всего нажатий: {keyCount}</Typography>
      </StatusContainer>
    </Card>
  );
};

// Компонент для демонстрации preventDefault
const PreventDefaultDemo = () => {
  const [lastKey, setLastKey] = useState<string>('');
  const [keyCount, setKeyCount] = useState(0);

  useKeyPress({
    targetKey: 'Tab',
    handler: (event) => {
      setLastKey('Tab (prevented)');
      setKeyCount((prev) => prev + 1);
    },
    preventDefault: true,
  });

  useKeyPress({
    targetKey: 'Tab',
    handler: (event) => {
      setLastKey('Tab (normal)');
      setKeyCount((prev) => prev + 1);
    },
    preventDefault: false,
  });

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        preventDefault опция
      </Typography>

      <SectionContainer>
        <Typography variant="body1" marginBottom="sm">
          Нажмите Tab - первое нажатие предотвратит стандартное поведение
        </Typography>
      </SectionContainer>

      <StatusContainer>
        <Typography variant="body1" marginBottom="sm">
          <strong>Статус:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Последняя клавиша: {lastKey || 'Нет'}
        </Typography>
        <Typography variant="body2">Всего нажатий: {keyCount}</Typography>
      </StatusContainer>
    </Card>
  );
};

export const BasicUsage: Story = {
  render: () => <BasicKeyPressDemo />,
};

export const ModifierKeys: Story = {
  render: () => <ModifierKeysDemo />,
};

export const MultipleKeys: Story = {
  render: () => <MultipleKeysDemo />,
};

export const EnabledDisabled: Story = {
  render: () => <EnabledDisabledDemo />,
};

export const SimpleUsage: Story = {
  render: () => <SimpleKeyPressDemo />,
};

export const PreventDefault: Story = {
  render: () => <PreventDefaultDemo />,
};

export const AllExamples: Story = {
  render: () => (
    <StorybookStaggerStack>
      <BasicKeyPressDemo />
      <ModifierKeysDemo />
      <MultipleKeysDemo />
      <EnabledDisabledDemo />
      <SimpleKeyPressDemo />
      <PreventDefaultDemo />
    </StorybookStaggerStack>
  ),
};
