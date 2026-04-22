import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Button } from '../components/ui/buttons/Button';
import { Badge } from '../components/ui/Badge';

const meta: Meta = {
  title: 'Hooks/Overview',
  parameters: {
    docs: {
      description: {
        component: `
# Обзор хуков

Хуки - это React хуки для управления состоянием и побочными эффектами в приложениях.

## Доступные хуки:

### State Management
- **useModal** - управление модальными окнами
- **useToast** - стек карточек Toast (нужны `ThemeProvider` + `ToastProvider`)
- **useSnackbar** - стек полос Snackbar внизу экрана (`ThemeProvider` + `SnackbarProvider`)
- **useLocalStorage** - работа с localStorage

### Performance & Optimization
- **useDebounce** - задержка выполнения операций
- **useClickOutside** - обработка кликов вне элемента

### Browser APIs
- **useKeyPress** - обработка нажатий клавиш
- **useMediaQuery** - отслеживание медиа-запросов
- **useScrollPosition** - отслеживание позиции скролла
- **useWindowSize** - отслеживание размера окна

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
  const hooks = [
    {
      category: 'State Management',
      hooks: [
        {
          name: 'useModal',
          description: 'Управление модальными окнами',
          features: ['Открытие/закрытие', 'Переключение состояния', 'Начальное состояние'],
          color: '#e3f2fd',
          borderColor: '#2196f3',
          icon: '🪟',
        },
        {
          name: 'useToast',
          description: 'Стек Toast (карточки, портал в body)',
          features: ['Типы success/error/warning/info', 'Заголовок и текст', 'Таймер и ручное закрытие'],
          color: '#e8f5e8',
          borderColor: '#4caf50',
          icon: '🔔',
        },
        {
          name: 'useSnackbar',
          description: 'Стек Snackbar (компактная полоса снизу)',
          features: ['Опция действия actionLabel + onAction', 'Таймер по умолчанию 4 с', 'Позиция bottom-*'],
          color: '#eceff1',
          borderColor: '#607d8b',
          icon: '📣',
        },
        {
          name: 'useLocalStorage',
          description: 'Работа с localStorage',
          features: ['Синхронизация между вкладками', 'Обработка ошибок', 'TypeScript типизация'],
          color: '#fff3e0',
          borderColor: '#ff9800',
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
          color: '#f3e5f5',
          borderColor: '#9c27b0',
          icon: '⏱️',
        },
        {
          name: 'useClickOutside',
          description: 'Обработка кликов вне элемента',
          features: ['Отслеживание кликов', 'Включение/отключение', 'Множественные элементы'],
          color: '#e0f2f1',
          borderColor: '#009688',
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
          color: '#fce4ec',
          borderColor: '#e91e63',
          icon: '⌨️',
        },
        {
          name: 'useMediaQuery',
          description: 'Отслеживание медиа-запросов',
          features: ['Адаптивность', 'Ориентация', 'Поддержка устройств'],
          color: '#e8f5e8',
          borderColor: '#4caf50',
          icon: '📱',
        },
        {
          name: 'useScrollPosition',
          description: 'Отслеживание позиции скролла',
          features: ['Позиция окна', 'Позиция элемента', 'Throttling'],
          color: '#e3f2fd',
          borderColor: '#2196f3',
          icon: '📜',
        },
        {
          name: 'useWindowSize',
          description: 'Отслеживание размера окна',
          features: ['Размер окна', 'Размер экрана', 'Доступный размер'],
          color: '#fff3e0',
          borderColor: '#ff9800',
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

      <div style={{ marginBottom: '24px' }}>
        <Typography variant="body1" marginBottom="md">
          Хуки предоставляют готовые решения для управления состоянием и побочными эффектами в React
          приложениях.
        </Typography>
      </div>

      {hooks.map((category, categoryIndex) => (
        <div key={categoryIndex} style={{ marginBottom: '32px' }}>
          <Typography variant="h4" marginBottom="md" style={{ color: '#333' }}>
            {category.category}
          </Typography>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            {category.hooks.map((hook, hookIndex) => (
              <div
                key={hookIndex}
                style={{
                  padding: '20px',
                  backgroundColor: hook.color,
                  border: `2px solid ${hook.borderColor}`,
                  borderRadius: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <Typography variant="h4" style={{ marginRight: '12px' }}>
                    {hook.icon}
                  </Typography>
                  <Typography variant="h5">{hook.name}</Typography>
                </div>

                <Typography variant="body1" marginBottom="md" style={{ color: '#666' }}>
                  {hook.description}
                </Typography>

                <Typography variant="body2" marginBottom="sm" style={{ fontWeight: 'bold' }}>
                  Возможности:
                </Typography>

                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  {hook.features.map((feature, featureIndex) => (
                    <li key={featureIndex} style={{ marginBottom: '4px' }}>
                      <Typography variant="body2">{feature}</Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Общие принципы:</strong>
        </Typography>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li style={{ marginBottom: '4px' }}>
            <Typography variant="body2">Единообразный API для всех хуков</Typography>
          </li>
          <li style={{ marginBottom: '4px' }}>
            <Typography variant="body2">TypeScript типизация</Typography>
          </li>
          <li style={{ marginBottom: '4px' }}>
            <Typography variant="body2">Оптимизация производительности</Typography>
          </li>
          <li style={{ marginBottom: '4px' }}>
            <Typography variant="body2">Обработка edge cases</Typography>
          </li>
          <li>
            <Typography variant="body2">SSR совместимость</Typography>
          </li>
        </ul>
      </div>
    </Card>
  );
};

// Компонент для демонстрации использования
const HooksUsageExamples = () => {
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
      {isOpen && (
        <Modal onClose={close}>
          <div>Содержимое модального окна</div>
        </Modal>
      )}
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

const ResponsiveComponent = () => {
  const isMobile = useIsMobile();
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div style={{
      padding: isMobile ? '16px' : '32px',
      backgroundColor: isDarkMode ? '#333' : '#fff'
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
          code: `import { useWindowSize } from '@/hooks';

const SizeComponent = () => {
  const { width, height } = useWindowSize();

  return (
    <div>
      <div>Размер окна: {width} × {height}</div>
      <div>Тип устройства: {width <= 768 ? 'Мобильное' : 'Десктоп'}</div>
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

      <div style={{ marginBottom: '24px' }}>
        <Typography variant="body1" marginBottom="md">
          Практические примеры использования хуков в React компонентах.
        </Typography>
      </div>

      {examples.map((category, categoryIndex) => (
        <div key={categoryIndex} style={{ marginBottom: '32px' }}>
          <Typography variant="h4" marginBottom="md" style={{ color: '#333' }}>
            {category.title}
          </Typography>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {category.hooks.map((hook, hookIndex) => (
              <div
                key={hookIndex}
                style={{
                  padding: '20px',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <Typography variant="h5" marginRight="sm">
                    {hook.name}
                  </Typography>
                  <Badge variant="outlined">{hook.description}</Badge>
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
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{hook.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Card>
  );
};

// Компонент для демонстрации лучших практик
const HooksBestPractices = () => {
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

      <div style={{ marginBottom: '24px' }}>
        <Typography variant="body1" marginBottom="md">
          Рекомендации по эффективному использованию хуков в приложениях.
        </Typography>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {practices.map((practice, index) => (
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
                {index + 1}
              </Badge>
              <Typography variant="h5">{practice.title}</Typography>
            </div>

            <Typography variant="body1" marginBottom="md" style={{ color: '#666' }}>
              {practice.description}
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
                marginBottom: '16px',
              }}
            >
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{practice.code}</pre>
            </div>

            <Typography variant="body2" marginBottom="sm" style={{ fontWeight: 'bold' }}>
              Советы:
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {practice.tips.map((tip, tipIndex) => (
                <li key={tipIndex} style={{ marginBottom: '4px' }}>
                  <Typography variant="body2">{tip}</Typography>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <HooksOverview />
      <HooksUsageExamples />
      <HooksBestPractices />
    </div>
  ),
};
