import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { storybookDemoStyles } from '@/handlers/storybookDemo.styles';
import { lightTheme } from '@/themes/themes';
import { Button } from '../components/ui/buttons/Button';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { useClickOutside } from './useClickOutside';
import { ClickOutsideDropdownOptionButton } from './useClickOutside.stories.styles';

const meta: Meta = {
  title: 'UI Kit/Hooks/useClickOutside',
  parameters: {
    docs: {
      description: {
        component: `
# useClickOutside Hook

Хук для обработки кликов вне указанного элемента. Полезен для закрытия модальных окон, дропдаунов и других элементов при клике вне их области.

## Возвращаемые значения:

- **ref** - ссылка на элемент, который нужно отслеживать

## Параметры:

- **handler** - функция, которая вызывается при клике вне элемента
- **enabled** - включен ли хук (по умолчанию true)

## Особенности:

- Поддерживает как мышь, так и сенсорные события
- Автоматически очищает слушатели при размонтировании
- Можно отключить через параметр enabled

## Использование:

\`\`\`typescript
const ref = useClickOutside((event) => {
  console.log('Клик вне элемента');
});

return <div ref={ref}>Элемент</div>;
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Демо-трилементы с цветами из темы (фон панели + акцент рамки). */
const clickOutsideMultiDemoElements = [
  {
    title: 'Элемент 1',
    panelBackground: lightTheme.colors.backgroundTertiary,
    borderAccent: lightTheme.colors.primary,
  },
  {
    title: 'Элемент 2',
    panelBackground: lightTheme.colors.backgroundTertiary,
    borderAccent: lightTheme.colors.success,
  },
  {
    title: 'Элемент 3',
    panelBackground: lightTheme.colors.backgroundQuaternary,
    borderAccent: lightTheme.colors.warning,
  },
] as const;

// Компонент для демонстрации базового использования
const BasicClickOutsideDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const ref = useClickOutside(() => {
    setIsOpen(false);
    setClickCount(prev => prev + 1);
  });

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Базовое использование useClickOutside
      </Typography>

      <div style={storybookDemoStyles.marginBottom16}>
        <Button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Закрыть' : 'Открыть'} элемент</Button>
      </div>

      {isOpen && (
        <div ref={ref} style={storybookDemoStyles.clickOutsideTrackedPanel}>
          <Typography variant="h4" marginBottom="sm">
            Отслеживаемый элемент
          </Typography>
          <Typography variant="body1" marginBottom="md">
            Кликните вне этого элемента, чтобы закрыть его.
          </Typography>
          <Typography variant="body2" style={{ color: lightTheme.colors.textSecondary }}>
            Этот элемент отслеживается с помощью useClickOutside
          </Typography>
        </div>
      )}

      <div style={storybookDemoStyles.demoResultPanel}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Статус:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Элемент: {isOpen ? 'Открыт' : 'Закрыт'}
        </Typography>
        <Typography variant="body2">Кликов вне элемента: {clickCount}</Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации отключения хука
const DisabledClickOutsideDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [clickCount, setClickCount] = useState(0);

  const ref = useClickOutside(() => {
    setIsOpen(false);
    setClickCount(prev => prev + 1);
  }, isEnabled);

  const trackedPanelStyle = isEnabled
    ? storybookDemoStyles.clickOutsideTrackedPanel
    : storybookDemoStyles.clickOutsideTrackedPanelHookDisabled;

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Управление состоянием useClickOutside
      </Typography>

      <div style={storybookDemoStyles.rowFlexGap12MarginBottom16Wrap}>
        <Button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Закрыть' : 'Открыть'} элемент</Button>
        <Button
          variant={isEnabled ? 'primary' : 'outlined'}
          onClick={() => setIsEnabled(!isEnabled)}
        >
          {isEnabled ? 'Отключить' : 'Включить'} отслеживание
        </Button>
      </div>

      {isOpen && (
        <div ref={ref} style={trackedPanelStyle}>
          <Typography variant="h4" marginBottom="sm">
            Отслеживаемый элемент
          </Typography>
          <Typography variant="body1" marginBottom="md">
            {isEnabled
              ? 'Кликните вне этого элемента, чтобы закрыть его.'
              : 'Отслеживание отключено. Клики вне элемента не обрабатываются.'}
          </Typography>
          <Typography variant="body2" style={{ color: lightTheme.colors.textSecondary }}>
            Статус отслеживания: {isEnabled ? 'Включено' : 'Отключено'}
          </Typography>
        </div>
      )}

      <div style={storybookDemoStyles.demoResultPanel}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Статус:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Элемент: {isOpen ? 'Открыт' : 'Закрыт'}
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Отслеживание: {isEnabled ? 'Включено' : 'Отключено'}
        </Typography>
        <Typography variant="body2">Кликов вне элемента: {clickCount}</Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации множественных элементов
const MultipleElementsDemo = () => {
  const [openElements, setOpenElements] = useState<Set<number>>(new Set());
  const [clickCounts, setClickCounts] = useState<Record<number, number>>({});

  const toggleElement = (index: number) => {
    setOpenElements(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const createClickOutsideHandler = (index: number) => () => {
    setOpenElements(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
    setClickCounts(prev => ({
      ...prev,
      [index]: (prev[index] || 0) + 1,
    }));
  };

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Множественные элементы
      </Typography>

      <div style={storybookDemoStyles.rowFlexGap12MarginBottom16Wrap}>
        {clickOutsideMultiDemoElements.map((_element, index) => (
          <Button
            key={clickOutsideMultiDemoElements[index].title}
            onClick={() => toggleElement(index)}
            style={{ backgroundColor: clickOutsideMultiDemoElements[index].borderAccent }}
          >
            {openElements.has(index) ? 'Закрыть' : 'Открыть'}{' '}
            {clickOutsideMultiDemoElements[index].title}
          </Button>
        ))}
      </div>

      <div style={storybookDemoStyles.columnFlexGap16MarginBottom16}>
        {clickOutsideMultiDemoElements.map((element, index) => {
          const isOpen = openElements.has(index);
          const clickCount = clickCounts[index] || 0;

          return (
            <div key={element.title}>
              {isOpen && (
                <ClickOutsideElement
                  title={element.title}
                  panelBackground={element.panelBackground}
                  borderAccent={element.borderAccent}
                  onClose={createClickOutsideHandler(index)}
                />
              )}
              <div style={storybookDemoStyles.demoStatusStripCompact}>
                <Typography variant="body2">
                  {element.title}: {isOpen ? 'Открыт' : 'Закрыт'} | Кликов вне: {clickCount}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

/** Полоска статуса: те же токены, что и в обзоре хуков, без циклического импорта сторис. */
const hooksOverviewDemoStatusStrip = {
  padding: '8px',
  backgroundColor: lightTheme.colors.backgroundTertiary,
  borderRadius: '4px',
} as const;

// Компонент для отдельного отслеживаемого элемента
const ClickOutsideElement = ({
  title,
  panelBackground,
  borderAccent,
  onClose,
}: {
  title: string;
  /** Фон панели из палитры темы. */
  panelBackground: string;
  /** Цвет рамки из палитры темы. */
  borderAccent: string;
  onClose: () => void;
}) => {
  const ref = useClickOutside(onClose);

  return (
    <div
      ref={ref}
      style={{
        padding: '20px',
        backgroundColor: panelBackground,
        border: `2px solid ${borderAccent}`,
        borderRadius: '8px',
      }}
    >
      <Typography variant="h4" marginBottom="sm">
        {title}
      </Typography>
      <Typography variant="body1" marginBottom="md">
        Кликните вне этого элемента, чтобы закрыть его.
      </Typography>
      <Typography variant="body2" style={{ color: lightTheme.colors.textSecondary }}>
        Этот элемент отслеживается с помощью useClickOutside
      </Typography>
    </div>
  );
};

// Компонент для демонстрации интеграции с модальными окнами
const ModalIntegrationDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalClickCount, setModalClickCount] = useState(0);

  const modalRef = useClickOutside(() => {
    setIsModalOpen(false);
    setModalClickCount(prev => prev + 1);
  });

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Интеграция с модальными окнами
      </Typography>

      <div style={storybookDemoStyles.marginBottom16}>
        <Button onClick={() => setIsModalOpen(true)}>Открыть модальное окно</Button>
      </div>

      {isModalOpen && (
        <div style={storybookDemoStyles.modalStoryBackdrop}>
          <div ref={modalRef} style={storybookDemoStyles.modalStoryPanel}>
            <Typography variant="h4" marginBottom="md">
              Модальное окно
            </Typography>
            <Typography variant="body1" marginBottom="lg">
              Это модальное окно закрывается при клике вне его области.
            </Typography>
            <div style={storybookDemoStyles.rowFlexGap12JustifyFlexEnd}>
              <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
                Закрыть
              </Button>
            </div>
          </div>
        </div>
      )}

      <div style={storybookDemoStyles.demoResultPanel}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Статус:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Модальное окно: {isModalOpen ? 'Открыто' : 'Закрыто'}
        </Typography>
        <Typography variant="body2">Кликов вне модального окна: {modalClickCount}</Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации дропдауна
const DropdownDemo = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [clickCount, setClickCount] = useState(0);

  const dropdownRef = useClickOutside(() => {
    setIsDropdownOpen(false);
    setClickCount(prev => prev + 1);
  });

  const options = ['Опция 1', 'Опция 2', 'Опция 3', 'Опция 4'];

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Дропдаун с useClickOutside
      </Typography>

      <div style={storybookDemoStyles.marginBottom16}>
        <div style={storybookDemoStyles.inlineBlockRelative}>
          <Button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {selectedOption || 'Выберите опцию'} ▼
          </Button>

          {isDropdownOpen && (
            <div ref={dropdownRef} style={storybookDemoStyles.dropdownStoryMenuPanel}>
              {options.map((option, index) => (
                <ClickOutsideDropdownOptionButton
                  key={option}
                  $withBottomDivider={index < options.length - 1}
                  onClick={() => {
                    setSelectedOption(option);
                    setIsDropdownOpen(false);
                  }}
                >
                  <Typography variant="body2">{option}</Typography>
                </ClickOutsideDropdownOptionButton>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={storybookDemoStyles.demoResultPanel}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Статус:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Дропдаун: {isDropdownOpen ? 'Открыт' : 'Закрыт'}
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Выбранная опция: {selectedOption || 'Не выбрано'}
        </Typography>
        <Typography variant="body2">Кликов вне дропдауна: {clickCount}</Typography>
      </div>
    </Card>
  );
};

export const BasicUsage: Story = {
  render: () => <BasicClickOutsideDemo />,
};

export const DisabledState: Story = {
  render: () => <DisabledClickOutsideDemo />,
};

export const MultipleElements: Story = {
  render: () => <MultipleElementsDemo />,
};

export const ModalIntegration: Story = {
  render: () => <ModalIntegrationDemo />,
};

export const DropdownExample: Story = {
  render: () => <DropdownDemo />,
};

export const AllExamples: Story = {
  render: () => (
    <div style={storybookDemoStyles.columnFlexGap24}>
      <BasicClickOutsideDemo />
      <DisabledClickOutsideDemo />
      <MultipleElementsDemo />
      <ModalIntegrationDemo />
      <DropdownDemo />
    </div>
  ),
};
