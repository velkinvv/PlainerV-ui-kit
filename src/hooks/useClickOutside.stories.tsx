import type { Meta, StoryObj } from '@storybook/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { storybookDemoStyles } from '@/handlers/storybookDemo.styles';
import { StorybookStaggerStack } from '@/handlers/storybookMotionContainers';
import {
  storybookBackdropFadeVariants,
  storybookDropdownRevealVariants,
  storybookFadeSlideVariants,
  storybookModalPopVariants,
  useStorybookMotionTransitions,
} from '@/handlers/storybookMotion';
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
  const motionTransitions = useStorybookMotionTransitions();

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

      <AnimatePresence mode="sync">
        {isOpen && (
          <motion.div
            key="basic-tracked-panel"
            ref={ref}
            style={storybookDemoStyles.clickOutsideTrackedPanel}
            variants={storybookFadeSlideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={motionTransitions.panel}
          >
            <Typography variant="h4" marginBottom="sm">
              Отслеживаемый элемент
            </Typography>
            <Typography variant="body1" marginBottom="md">
              Кликните вне этого элемента, чтобы закрыть его.
            </Typography>
            <Typography variant="body2" style={{ color: lightTheme.colors.textSecondary }}>
              Этот элемент отслеживается с помощью useClickOutside
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>

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
  const motionTransitions = useStorybookMotionTransitions();

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

      <AnimatePresence mode="sync">
        {isOpen && (
          <motion.div
            key="disabled-demo-panel"
            ref={ref}
            style={trackedPanelStyle}
            variants={storybookFadeSlideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={motionTransitions.panel}
          >
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
          </motion.div>
        )}
      </AnimatePresence>

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
        {clickOutsideMultiDemoElements.map((element, index) => (
          <Button
            key={element.title}
            onClick={() => toggleElement(index)}
            style={{ backgroundColor: element.borderAccent }}
          >
            {openElements.has(index) ? 'Закрыть' : 'Открыть'} {element.title}
          </Button>
        ))}
      </div>

      <div style={storybookDemoStyles.columnFlexGap16MarginBottom16}>
        {clickOutsideMultiDemoElements.map((element, index) => {
          const isOpen = openElements.has(index);
          const clickCount = clickCounts[index] || 0;

          return (
            <div key={element.title}>
              <AnimatePresence mode="popLayout">
                {isOpen && (
                  <ClickOutsideElement
                    key={element.title}
                    title={element.title}
                    panelBackground={element.panelBackground}
                    borderAccent={element.borderAccent}
                    onClose={createClickOutsideHandler(index)}
                  />
                )}
              </AnimatePresence>
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
  const motionTransitions = useStorybookMotionTransitions();

  return (
    <motion.div
      ref={ref}
      style={{
        padding: '20px',
        backgroundColor: panelBackground,
        border: `2px solid ${borderAccent}`,
        borderRadius: '8px',
      }}
      variants={storybookFadeSlideVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={motionTransitions.panel}
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
    </motion.div>
  );
};

// Компонент для демонстрации интеграции с модальными окнами
const ModalIntegrationDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalClickCount, setModalClickCount] = useState(0);
  const motionTransitions = useStorybookMotionTransitions();

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

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="modal-demo-backdrop"
            style={storybookDemoStyles.modalStoryBackdrop}
            variants={storybookBackdropFadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={motionTransitions.backdrop}
          >
            <motion.div
              key="modal-demo-panel"
              ref={modalRef}
              style={storybookDemoStyles.modalStoryPanel}
              variants={storybookModalPopVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={motionTransitions.panel}
            >
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
  const motionTransitions = useStorybookMotionTransitions();

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

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                key="dropdown-panel"
                ref={dropdownRef}
                style={storybookDemoStyles.dropdownStoryMenuPanel}
                variants={storybookDropdownRevealVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={motionTransitions.panel}
              >
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
              </motion.div>
            )}
          </AnimatePresence>
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
    <StorybookStaggerStack>
      <BasicClickOutsideDemo />
      <DisabledClickOutsideDemo />
      <MultipleElementsDemo />
      <ModalIntegrationDemo />
      <DropdownDemo />
    </StorybookStaggerStack>
  ),
};
