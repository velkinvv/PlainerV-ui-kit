import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '../components/ui/buttons/Button';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { useClickOutside } from './useClickOutside';

const meta: Meta = {
  title: 'Hooks/useClickOutside',
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

      <div style={{ marginBottom: '16px' }}>
        <Button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Закрыть' : 'Открыть'} элемент</Button>
      </div>

      {isOpen && (
        <div
          ref={ref}
          style={{
            padding: '20px',
            backgroundColor: '#e3f2fd',
            border: '2px solid #2196f3',
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        >
          <Typography variant="h4" marginBottom="sm">
            Отслеживаемый элемент
          </Typography>
          <Typography variant="body1" marginBottom="md">
            Кликните вне этого элемента, чтобы закрыть его.
          </Typography>
          <Typography variant="body2" style={{ color: '#666' }}>
            Этот элемент отслеживается с помощью useClickOutside
          </Typography>
        </div>
      )}

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
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

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Управление состоянием useClickOutside
      </Typography>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <Button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Закрыть' : 'Открыть'} элемент</Button>
        <Button
          variant={isEnabled ? 'primary' : 'outlined'}
          onClick={() => setIsEnabled(!isEnabled)}
        >
          {isEnabled ? 'Отключить' : 'Включить'} отслеживание
        </Button>
      </div>

      {isOpen && (
        <div
          ref={ref}
          style={{
            padding: '20px',
            backgroundColor: isEnabled ? '#e3f2fd' : '#fff3cd',
            border: `2px solid ${isEnabled ? '#2196f3' : '#ffc107'}`,
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        >
          <Typography variant="h4" marginBottom="sm">
            Отслеживаемый элемент
          </Typography>
          <Typography variant="body1" marginBottom="md">
            {isEnabled
              ? 'Кликните вне этого элемента, чтобы закрыть его.'
              : 'Отслеживание отключено. Клики вне элемента не обрабатываются.'}
          </Typography>
          <Typography variant="body2" style={{ color: '#666' }}>
            Статус отслеживания: {isEnabled ? 'Включено' : 'Отключено'}
          </Typography>
        </div>
      )}

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
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

  const elements = [
    { title: 'Элемент 1', color: '#e3f2fd', borderColor: '#2196f3' },
    { title: 'Элемент 2', color: '#e8f5e8', borderColor: '#4caf50' },
    { title: 'Элемент 3', color: '#fff3e0', borderColor: '#ff9800' },
  ];

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Множественные элементы
      </Typography>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {elements.map((element, index) => (
          <Button
            key={index}
            onClick={() => toggleElement(index)}
            style={{ backgroundColor: element.borderColor }}
          >
            {openElements.has(index) ? 'Закрыть' : 'Открыть'} {element.title}
          </Button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
        {elements.map((element, index) => {
          const isOpen = openElements.has(index);
          const clickCount = clickCounts[index] || 0;

          return (
            <div key={index}>
              {isOpen && (
                <ClickOutsideElement
                  title={element.title}
                  color={element.color}
                  borderColor={element.borderColor}
                  onClose={createClickOutsideHandler(index)}
                />
              )}
              <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
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

// Компонент для отдельного отслеживаемого элемента
const ClickOutsideElement = ({
  title,
  color,
  borderColor,
  onClose,
}: {
  title: string;
  color: string;
  borderColor: string;
  onClose: () => void;
}) => {
  const ref = useClickOutside(onClose);

  return (
    <div
      ref={ref}
      style={{
        padding: '20px',
        backgroundColor: color,
        border: `2px solid ${borderColor}`,
        borderRadius: '8px',
      }}
    >
      <Typography variant="h4" marginBottom="sm">
        {title}
      </Typography>
      <Typography variant="body1" marginBottom="md">
        Кликните вне этого элемента, чтобы закрыть его.
      </Typography>
      <Typography variant="body2" style={{ color: '#666' }}>
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

      <div style={{ marginBottom: '16px' }}>
        <Button onClick={() => setIsModalOpen(true)}>Открыть модальное окно</Button>
      </div>

      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            ref={modalRef}
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              maxWidth: '400px',
              width: '90%',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            <Typography variant="h4" marginBottom="md">
              Модальное окно
            </Typography>
            <Typography variant="body1" marginBottom="lg">
              Это модальное окно закрывается при клике вне его области.
            </Typography>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
                Закрыть
              </Button>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
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

      <div style={{ marginBottom: '16px' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {selectedOption || 'Выберите опцию'} ▼
          </Button>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
                marginTop: '4px',
              }}
            >
              {options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedOption(option);
                    setIsDropdownOpen(false);
                  }}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderBottom: index < options.length - 1 ? '1px solid #eee' : 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <Typography variant="body2">{option}</Typography>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <BasicClickOutsideDemo />
      <DisabledClickOutsideDemo />
      <MultipleElementsDemo />
      <ModalIntegrationDemo />
      <DropdownDemo />
    </div>
  ),
};
