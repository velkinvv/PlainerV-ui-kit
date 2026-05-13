import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';
import React from 'react';
import { storybookDemoStyles } from '@/handlers/storybookDemo.styles';
import {
  storybookFadeSlideVariants,
  storybookStaggerContainerVariants,
  storybookStaggerItemVariants,
  useStorybookMotionTransitions,
} from '@/handlers/storybookMotion';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Tag } from '../components/ui/Tag';
import { Button } from '../components/ui/buttons/Button';
import { StorybookStaggerStack } from '@/handlers/storybookMotionContainers';
import {
  HOOK_OVERVIEW_CARD_BORDER_ACCENTS,
  hookOverviewCardStyle,
  hooksOverviewCodeBlockWithBottomMargin,
  hooksOverviewStoriesStyles,
} from './hooksOverview.stories.styles';

const meta: Meta = {
  title: 'UI Kit/Hooks/Overview',
  parameters: {
    docs: {
      description: {
        component: `
# Обзор хуков

Хуки - это React хуки для управления состоянием и побочными эффектами в приложениях.

## Доступные хуки:

### State Management
- **useModal** - управление модальными окнами
- **useToast** - стек карточек Toast (нужны **ThemeProvider** + **ToastProvider**)
- **useSnackbar** - стек полос Snackbar внизу экрана (**ThemeProvider** + **SnackbarProvider**)
- **useLocalStorage** - работа с localStorage

### Performance & Optimization
- **useDebounce** - задержка выполнения операций
- **useClickOutside** - обработка кликов вне элемента

### Browser APIs
- **useKeyPress** - обработка нажатий клавиш
- **useMediaQuery** - отслеживание медиа-запросов
- **useScrollPosition** - отслеживание позиции скролла
- **useWindowSize** - отслеживание размера окна (**useIsDesktop** по ширине innerWidth)

## Особенности:

- Единообразный API для всех хуков
- TypeScript типизация
- Оптимизация производительности
- Обработка edge cases
- SSR совместимость
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Компонент для обзора хуков
const HooksOverview = () => {
  const motionTransitions = useStorybookMotionTransitions();

  const hooks = [
    {
      category: 'State Management',
      hooks: [
        {
          name: 'useModal',
          description: 'Управление модальными окнами',
          features: ['Открытие/закрытие', 'Переключение состояния', 'Начальное состояние'],
          icon: '🪟',
        },
        {
          name: 'useToast',
          description: 'Стек Toast (карточки, портал в body)',
          features: ['Типы success/error/warning/info', 'Заголовок и текст', 'Таймер и ручное закрытие'],
          icon: '🔔',
        },
        {
          name: 'useSnackbar',
          description: 'Стек Snackbar (компактная полоса снизу)',
          features: ['Опция действия actionLabel + onAction', 'Таймер по умолчанию 4 с', 'Позиция bottom-*'],
          icon: '📣',
        },
        {
          name: 'useLocalStorage',
          description: 'Работа с localStorage',
          features: ['Синхронизация между вкладками', 'Обработка ошибок', 'TypeScript типизация'],
          icon: '💾',
        },
      ],
    },
    {
      category: 'Performance & Optimization',
      hooks: [
        {
          name: 'useDebounce',
          description: 'Задержка выполнения операций',
          features: ['Задержка значений', 'Задержка функций', 'Настраиваемая задержка'],
          icon: '⏱️',
        },
        {
          name: 'useClickOutside',
          description: 'Обработка кликов вне элемента',
          features: ['Отслеживание кликов', 'Включение/отключение', 'Множественные элементы'],
          icon: '👆',
        },
      ],
    },
    {
      category: 'Browser APIs',
      hooks: [
        {
          name: 'useKeyPress',
          description: 'Обработка нажатий клавиш',
          features: ['Одиночные клавиши', 'Комбинации с модификаторами', 'Множественные клавиши'],
          icon: '⌨️',
        },
        {
          name: 'useMediaQuery',
          description: 'Отслеживание медиа-запросов',
          features: ['Адаптивность', 'Ориентация', 'Поддержка устройств'],
          icon: '📱',
        },
        {
          name: 'useScrollPosition',
          description: 'Отслеживание позиции скролла',
          features: ['Позиция окна', 'Позиция элемента', 'Throttling'],
          icon: '📜',
        },
        {
          name: 'useWindowSize',
          description: 'Отслеживание размера окна',
          features: ['Размер окна', 'Размер экрана', 'Доступный размер', 'useIsDesktop по innerWidth'],
          icon: '🖥️',
        },
      ],
    },
  ];

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Обзор хуков
      </Typography>

      <div style={storybookDemoStyles.marginBottom24}>
        <Typography variant="body1" marginBottom="md">
          Хуки предоставляют готовые решения для управления состоянием и побочными эффектами в React
          приложениях.
        </Typography>
      </div>

      {hooks.map((category, categoryIndex) => {
        const hooksBeforeCount = hooks
          .slice(0, categoryIndex)
          .reduce((total, categoryItem) => total + categoryItem.hooks.length, 0);

        return (
          <div key={category.category} style={storybookDemoStyles.marginBottom32}>
            <Typography variant="h4" marginBottom="md" style={hooksOverviewStoriesStyles.sectionHeading}>
              {category.category}
            </Typography>

            <motion.div
              style={hooksOverviewStoriesStyles.overviewCardGrid}
              variants={storybookStaggerContainerVariants(motionTransitions.stagger)}
              initial="hidden"
              animate="visible"
            >
              {category.hooks.map((hook, hookIndex) => {
                const accentBorder =
                  HOOK_OVERVIEW_CARD_BORDER_ACCENTS[
                    (hooksBeforeCount + hookIndex) % HOOK_OVERVIEW_CARD_BORDER_ACCENTS.length
                  ];

                return (
                  <motion.div
                    key={hook.name}
                    style={hookOverviewCardStyle(accentBorder)}
                    variants={storybookStaggerItemVariants}
                    transition={motionTransitions.springSoft}
                  >
                    <div style={hooksOverviewStoriesStyles.flexAlignCenterMarginBottom12}>
                      <Typography variant="h4" style={{ marginRight: '12px' }}>
                        {hook.icon}
                      </Typography>
                      <Typography variant="h5">{hook.name}</Typography>
                    </div>

                    <Typography variant="body1" marginBottom="md" style={hooksOverviewStoriesStyles.bodyTextMuted}>
                      {hook.description}
                    </Typography>

                    <Typography variant="body2" marginBottom="sm" style={{ fontWeight: 'bold' }}>
                      Возможности:
                    </Typography>

                    <ul style={hooksOverviewStoriesStyles.listUnstyled}>
                      {hook.features.map((feature, featureIndex) => (
                        <li key={featureIndex} style={hooksOverviewStoriesStyles.listItemMarginBottom4}>
                          <Typography variant="body2">{feature}</Typography>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        );
      })}

      <motion.div
        style={hooksOverviewStoriesStyles.principlesPanel}
        variants={storybookFadeSlideVariants}
        initial="hidden"
        animate="visible"
        transition={motionTransitions.panel}
      >
        <Typography variant="body1" marginBottom="sm">
          <strong>Общие принципы:</strong>
        </Typography>
        <ul style={hooksOverviewStoriesStyles.listUnstyled}>
          <li style={hooksOverviewStoriesStyles.listItemMarginBottom4}>
            <Typography variant="body2">Единообразный API для всех хуков</Typography>
          </li>
          <li style={hooksOverviewStoriesStyles.listItemMarginBottom4}>
            <Typography variant="body2">TypeScript типизация</Typography>
          </li>
          <li style={hooksOverviewStoriesStyles.listItemMarginBottom4}>
            <Typography variant="body2">Оптимизация производительности</Typography>
          </li>
          <li style={hooksOverviewStoriesStyles.listItemMarginBottom4}>
            <Typography variant="body2">Обработка edge cases</Typography>
          </li>
          <li>
            <Typography variant="body2">SSR совместимость</Typography>
          </li>
        </ul>
      </motion.div>
    </Card>
  );
};

// Компонент для демонстрации использования
const HooksUsageExamples = () => {
  const motionTransitions = useStorybookMotionTransitions();

  const examples = [
    {
      title: 'State Management',
      hooks: [
        {
          name: 'useModal',
          code: `import { useModal } from '@/hooks';

const MyComponent = () => {
  const { isOpen, open, close, toggle } = useModal();

  return (
    <div>
      <button onClick={open}>Открыть модальное окно</button>
      <Modal isOpen={isOpen} onClose={close} lazy unmountOnClose>
        <div>Содержимое модального окна</div>
      </Modal>
    </div>
  );
};`,
          description: 'Управление состоянием модальных окон',
        },
        {
          name: 'useToast',
          code: `// Корень приложения: <ThemeProvider><ToastProvider>...</ToastProvider></ThemeProvider>
import { useToast } from '@/hooks';

const MyComponent = () => {
  const { showToast } = useToast();

  const handleSuccess = () => {
    showToast('Операция выполнена успешно', 'success');
  };

  const handleError = () => {
    showToast('Произошла ошибка', 'error', 'Ошибка', 3000);
  };

  return (
    <div>
      <button onClick={handleSuccess}>Успех</button>
      <button onClick={handleError}>Ошибка</button>
    </div>
  );
};`,
          description: 'Показ карточек Toast (провайдеры на корне)',
        },
        {
          name: 'useSnackbar',
          code: `// Корень: <ThemeProvider><SnackbarProvider placement="bottom-center">...</SnackbarProvider></ThemeProvider>
import { useSnackbar } from '@/hooks';

const MyComponent = () => {
  const { showSnackbar } = useSnackbar();

  return (
    <button
      type="button"
      onClick={() =>
        showSnackbar('Удалено', {
          actionLabel: 'Отменить',
          onAction: () => console.log('отмена'),
        })
      }
    >
      Показать snackbar
    </button>
  );
};`,
          description: 'Компактные полосы снизу с опциональным действием',
        },
        {
          name: 'useLocalStorage',
          code: `import { useLocalStorage } from '@/hooks';

const MyComponent = () => {
  const [value, setValue, removeValue] = useLocalStorage('myKey', 'defaultValue');

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={removeValue}>Очистить</button>
    </div>
  );
};`,
          description: 'Работа с localStorage с синхронизацией',
        },
      ],
    },
    {
      title: 'Performance & Optimization',
      hooks: [
        {
          name: 'useDebounce',
          code: `import { useDebounce, useDebounceCallback } from '@/hooks';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const debouncedCallback = useDebounceCallback((value) => {
    console.log('Поиск:', value);
  }, 300);

  return (
    <input
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        debouncedCallback(e.target.value);
      }}
    />
  );
};`,
          description: 'Оптимизация поиска и API запросов',
        },
        {
          name: 'useClickOutside',
          code: `import { useClickOutside } from '@/hooks';

const DropdownComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useClickOutside(() => {
    setIsOpen(false);
  });

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        Открыть дропдаун
      </button>
      {isOpen && (
        <div ref={ref}>
          Содержимое дропдауна
        </div>
      )}
    </div>
  );
};`,
          description: 'Закрытие элементов при клике вне их области',
        },
      ],
    },
    {
      title: 'Browser APIs',
      hooks: [
        {
          name: 'useKeyPress',
          code: `import { useKeyPress } from '@/hooks';

const MyComponent = () => {
  useKeyPress({
    targetKey: 'Escape',
    handler: () => console.log('Escape pressed'),
  });

  useKeyPress({
    targetKey: 's',
    modifier: 'ctrl',
    handler: () => console.log('Ctrl+S pressed'),
  });

  return <div>Нажмите Escape или Ctrl+S</div>;
};`,
          description: 'Обработка нажатий клавиш и комбинаций',
        },
        {
          name: 'useMediaQuery',
          code: `import { useMediaQuery, useIsMobile } from '@/hooks';
import { useTheme } from 'styled-components';

const ResponsiveComponent = () => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div style={{
      padding: isMobile ? '16px' : '32px',
      backgroundColor: isDarkMode ? theme.colors.background : theme.colors.backgroundSecondary
    }}>
      {isMobile ? 'Мобильная версия' : 'Десктопная версия'}
    </div>
  );
};`,
          description: 'Адаптивность и медиа-запросы',
        },
        {
          name: 'useScrollPosition',
          code: `import { useScrollPosition } from '@/hooks';

const ScrollComponent = () => {
  const { x, y } = useScrollPosition({ throttle: 100 });

  return (
    <div>
      <div>Позиция скролла: {x}, {y}</div>
      <div style={{ height: '2000px' }}>
        Прокрутите страницу
      </div>
    </div>
  );
};`,
          description: 'Отслеживание позиции скролла',
        },
        {
          name: 'useWindowSize',
          code: `import { useWindowSize, useIsDesktop } from '@/hooks';

const SizeComponent = () => {
  const { width, height } = useWindowSize();
  const isDesktop = useIsDesktop();

  return (
    <div>
      <div>Размер окна: {width} × {height}</div>
      <div>Десктоп (innerWidth ≥ 1025): {isDesktop ? 'да' : 'нет'}</div>
    </div>
  );
};`,
          description: 'Отслеживание размера окна браузера',
        },
      ],
    },
  ];

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Примеры использования
      </Typography>

      <div style={storybookDemoStyles.marginBottom24}>
        <Typography variant="body1" marginBottom="md">
          Практические примеры использования хуков в React компонентах.
        </Typography>
      </div>

      {examples.map(category => (
        <div key={category.title} style={storybookDemoStyles.marginBottom32}>
          <Typography variant="h4" marginBottom="md" style={hooksOverviewStoriesStyles.sectionHeading}>
            {category.title}
          </Typography>

          <motion.div
            style={hooksOverviewStoriesStyles.columnFlexGap20}
            variants={storybookStaggerContainerVariants(motionTransitions.stagger)}
            initial="hidden"
            animate="visible"
          >
            {category.hooks.map(hook => (
              <motion.div
                key={hook.name}
                style={hooksOverviewStoriesStyles.hookExampleCard}
                variants={storybookStaggerItemVariants}
                transition={motionTransitions.springSoft}
              >
                <div style={hooksOverviewStoriesStyles.flexAlignCenterMarginBottom12}>
                  <Typography variant="h5" marginRight="sm">
                    {hook.name}
                  </Typography>
                  <span style={hooksOverviewStoriesStyles.hookDescriptionPill}>{hook.description}</span>
                </div>

                <div style={hooksOverviewStoriesStyles.codeBlockContainer}>
                  <pre style={hooksOverviewStoriesStyles.codeBlockPre}>{hook.code}</pre>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </Card>
  );
};

// Компонент для демонстрации лучших практик
const HooksBestPractices = () => {
  const motionTransitions = useStorybookMotionTransitions();

  const practices = [
    {
      title: 'Импорт хуков',
      description: 'Импортируйте только необходимые хуки',
      code: `// ✅ Хорошо - импорт только нужных хуков
import { useModal, useToast, useSnackbar } from '@/hooks';

// ❌ Плохо - импорт всех хуков
import * as hooks from '@/hooks';`,
      tips: [
        'Импортируйте только используемые хуки',
        'Используйте именованные импорты',
        'Группируйте импорты по типу',
      ],
    },
    {
      title: 'Обработка ошибок',
      description: 'Всегда обрабатывайте возможные ошибки',
      code: `// useToast / useSnackbar работают только внутри соответствующих провайдеров (см. README)
const MyComponent = () => {
  const { showToast } = useToast();

  const handleAction = async () => {
    try {
      await someAsyncOperation();
      showToast('Операция выполнена', 'success');
    } catch (error) {
      showToast('Произошла ошибка', 'error');
      console.error(error);
    }
  };

  return <button onClick={handleAction}>Выполнить</button>;
};`,
      tips: [
        'Используйте try-catch для асинхронных операций',
        'Показывайте пользователю понятные сообщения об ошибках',
        'Логируйте ошибки для отладки',
      ],
    },
    {
      title: 'Оптимизация производительности',
      description: 'Используйте хуки для оптимизации производительности',
      code: `const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Выполняем поиск только после задержки
  useEffect(() => {
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};`,
      tips: [
        'Используйте useDebounce для оптимизации поиска',
        'Избегайте лишних ре-рендеров',
        'Используйте useMemo и useCallback при необходимости',
      ],
    },
    {
      title: 'Типизация',
      description: 'Используйте TypeScript для лучшей типизации',
      code: `interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const useModal = (initialState = false): UseModalReturn => {
  // реализация хука
};

// Использование с типизацией
const MyComponent = () => {
  const modal: UseModalReturn = useModal();
  // TypeScript будет проверять типы
};`,
      tips: [
        'Определяйте интерфейсы для возвращаемых значений',
        'Используйте дженерики для гибкости',
        'Документируйте типы в JSDoc',
      ],
    },
  ];

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Лучшие практики
      </Typography>

      <div style={storybookDemoStyles.marginBottom24}>
        <Typography variant="body1" marginBottom="md">
          Рекомендации по эффективному использованию хуков в приложениях.
        </Typography>
      </div>

      <motion.div
        style={hooksOverviewStoriesStyles.columnFlexGap24}
        variants={storybookStaggerContainerVariants(motionTransitions.stagger)}
        initial="hidden"
        animate="visible"
      >
        {practices.map((practice, index) => (
          <motion.div
            key={practice.title}
            style={hooksOverviewStoriesStyles.hookExampleCard}
            variants={storybookStaggerItemVariants}
            transition={motionTransitions.springSoft}
          >
            <div style={hooksOverviewStoriesStyles.flexAlignCenterMarginBottom12}>
              <Tag
                colorVariant="primary"
                appearance="filled"
                style={hooksOverviewStoriesStyles.tagNumberBadge}
              >
                {index + 1}
              </Tag>
              <Typography variant="h5">{practice.title}</Typography>
            </div>

            <Typography variant="body1" marginBottom="md" style={hooksOverviewStoriesStyles.bodyTextMuted}>
              {practice.description}
            </Typography>

            <div style={hooksOverviewCodeBlockWithBottomMargin}>
              <pre style={hooksOverviewStoriesStyles.codeBlockPre}>{practice.code}</pre>
            </div>

            <Typography variant="body2" marginBottom="sm" style={{ fontWeight: 'bold' }}>
              Советы:
            </Typography>
            <ul style={hooksOverviewStoriesStyles.listUnstyled}>
              {practice.tips.map((tip, tipIndex) => (
                <li key={tipIndex} style={hooksOverviewStoriesStyles.listItemMarginBottom4}>
                  <Typography variant="body2">{tip}</Typography>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </Card>
  );
};

export const Overview: Story = {
  render: () => <HooksOverview />,
};

export const UsageExamples: Story = {
  render: () => <HooksUsageExamples />,
};

export const BestPractices: Story = {
  render: () => <HooksBestPractices />,
};

export const AllExamples: Story = {
  render: () => (
    <StorybookStaggerStack>
      <HooksOverview />
      <HooksUsageExamples />
      <HooksBestPractices />
    </StorybookStaggerStack>
  ),
};

