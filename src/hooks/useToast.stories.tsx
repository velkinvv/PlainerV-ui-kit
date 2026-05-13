import type { Decorator, Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../components/ui/buttons/Button';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { ToastProvider } from '../components/ui/Toast';
import { useToast } from './useToast';
import { ToastAppearance, type ToastType } from '@/types/ui';
import { storybookDemoStyles } from '@/handlers/storybookDemo.styles';
import { StorybookStaggerStack } from '@/handlers/storybookMotionContainers';

const withToast: Decorator = (Story) => (
  <ToastProvider>
    <Story />
  </ToastProvider>
);

/** Провайдер с внешним видом «пилюля» по умолчанию */
const withPillToast: Decorator = (Story) => (
  <ToastProvider defaultAppearance={ToastAppearance.PILL}>
    <Story />
  </ToastProvider>
);

const meta: Meta = {
  title: 'UI Kit/Hooks/useToast',
  decorators: [withToast],
  parameters: {
    docs: {
      description: {
        component: `
# useToast

Хук для показа стека уведомлений. Карточки рендерятся в **портале** (\`document.body\`) внутри \`<ToastProvider>\`.

## Настройка

\`\`\`tsx
import { ThemeProvider } from '@velkinvv/plainerv';
import { ToastProvider, useToast, ToastAppearance } from '@velkinvv/plainerv';

<ThemeProvider>
  <ToastProvider placement="top-right" defaultAppearance={ToastAppearance.CARD}>
    <App />
  </ToastProvider>
</ThemeProvider>
\`\`\`

## API

- **toasts** — активные записи (\`ToastItem\`: \`id\`, \`type\`, \`message\`, \`title\`, \`duration\`, опционально \`appearance\`, \`actionLabel\`, \`onAction\`)
- **showToast(message, type?, title?, duration?, options?)** — показать (\`duration\` по умолчанию 5000 мс, \`0\` — без автоскрытия). В \`options\` можно передать \`appearance\`, \`actionLabel\`, \`onAction\`, \`toastId\`, \`preventDuplicate\`, \`dedupeStrategy\` (\`id\` | \`content\` | \`both\`).
- **hideToast(id)** — закрыть по id
- **updateToast(id, patch)** — обновить существующий toast
- **isActiveToast(id)** — проверить, активен ли toast с id
- **pauseToasts(id?) / playToasts(id?)** — пауза/возобновление таймера для одного или всех
- **clearToasts()** — очистить всё

Витрина карточки: **Components/Feedback/Toast** (компонент \`Toast\`).
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const BasicToastDemo = () => {
  const { toasts, showToast, clearToasts } = useToast();

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Базовое использование useToast
      </Typography>

      <div style={storybookDemoStyles.rowFlexGap12MarginBottom16Wrap}>
        <Button onClick={() => showToast('Простое уведомление')}>Простое уведомление</Button>
        <Button onClick={() => showToast('Успешная операция', 'success', 'Успех')}>Успех</Button>
        <Button onClick={() => showToast('Произошла ошибка', 'error', 'Ошибка')}>Ошибка</Button>
        <Button onClick={() => showToast('Внимание!', 'warning', 'Предупреждение')}>
          Предупреждение
        </Button>
        <Button onClick={() => showToast('Информация', 'info', 'Инфо')}>Информация</Button>
      </div>

      <div style={storybookDemoStyles.rowFlexGap12MarginBottom16}>
        <Button onClick={clearToasts} variant="outlined" disabled={toasts.length === 0}>
          Очистить все ({toasts.length})
        </Button>
      </div>

      <div style={storybookDemoStyles.demoResultPanel}>
        <Typography variant="body2" marginBottom="xs">
          <strong>Активные уведомления:</strong> {toasts.length}
        </Typography>
        {toasts.length > 0 ? (
          <div style={storybookDemoStyles.marginTop8}>
            {toasts.map((toast) => (
              <div key={toast.id} style={storybookDemoStyles.marginBottom4}>
                <Typography variant="body2" style={storybookDemoStyles.typographyFinePrint12}>
                  {toast.type}: {toast.message} (ID: {toast.id.slice(0, 6)})
                </Typography>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
};

const ToastTypesDemo = () => {
  const { toasts, showToast, clearToasts } = useToast();

  const toastExamples: Array<{
    message: string;
    type: ToastType;
    title: string;
    duration: number;
  }> = [
    {
      message: 'Данные успешно сохранены',
      type: 'success',
      title: 'Успех',
      duration: 3000,
    },
    {
      message: 'Не удалось подключиться к серверу',
      type: 'error',
      title: 'Ошибка',
      duration: 5000,
    },
    {
      message: 'Пожалуйста, проверьте введенные данные',
      type: 'warning',
      title: 'Предупреждение',
      duration: 4000,
    },
    {
      message: 'Новая версия приложения доступна',
      type: 'info',
      title: 'Информация',
      duration: 6000,
    },
    {
      message: 'Нейтральное сообщение без акцента статуса',
      type: 'neutral',
      title: 'Уведомление',
      duration: 4000,
    },
  ];

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Различные типы уведомлений
      </Typography>

      <div style={storybookDemoStyles.gridAutoFillMin160Gap12MarginBottom16}>
        {toastExamples.map((example, index) => (
          <Button
            key={index}
            onClick={() =>
              showToast(example.message, example.type, example.title, example.duration)
            }
            variant={
              example.type === 'success'
                ? 'success'
                : example.type === 'error'
                  ? 'danger'
                  : 'outlined'
            }
          >
            {example.title}
          </Button>
        ))}
      </div>

      <div style={storybookDemoStyles.rowFlexGap12MarginBottom16}>
        <Button onClick={clearToasts} variant="outlined" disabled={toasts.length === 0}>
          Очистить все
        </Button>
      </div>
    </Card>
  );
};

const AutoHideDemo = () => {
  const { toasts, showToast, clearToasts } = useToast();

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Автоматическое скрытие уведомлений
      </Typography>

      <div style={storybookDemoStyles.rowFlexGap12MarginBottom16Wrap}>
        <Button onClick={() => showToast('Быстрое уведомление', 'info', 'Быстро', 1000)}>
          1 секунда
        </Button>
        <Button onClick={() => showToast('Среднее уведомление', 'info', 'Средне', 3000)}>
          3 секунды
        </Button>
        <Button onClick={() => showToast('Долгое уведомление', 'info', 'Долго', 8000)}>
          8 секунд
        </Button>
        <Button onClick={() => showToast('Постоянное уведомление', 'info', 'Постоянно', 0)}>
          Не скрывать
        </Button>
      </div>

      <div style={storybookDemoStyles.rowFlexGap12MarginBottom16}>
        <Button onClick={clearToasts} variant="outlined" disabled={toasts.length === 0}>
          Очистить все
        </Button>
      </div>

      <div style={storybookDemoStyles.demoResultPanel}>
        <Typography variant="body2" marginBottom="xs">
          <strong>Активные уведомления:</strong> {toasts.length}
        </Typography>
        <Typography variant="body2" style={storybookDemoStyles.typographyFinePrint12Secondary}>
          Уведомления с длительностью 0 не скрываются автоматически
        </Typography>
      </div>
    </Card>
  );
};

const PillToastDemo = () => {
  const { showToast, clearToasts, toasts } = useToast();

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Внешний вид «пилюля» (по умолчанию у провайдера)
      </Typography>
      <Typography
        variant="body2"
        marginBottom="md"
        style={storybookDemoStyles.typographyMutedParagraph}
      >
        Типы уведомлений: иконка с glow, кнопка «Action» закрывает toast после колбэка.
      </Typography>

      <div style={storybookDemoStyles.rowFlexGap12MarginBottom16Wrap}>
        <Button
          onClick={() =>
            showToast('Notification', 'neutral', undefined, 6000, {
              actionLabel: 'Action',
              onAction: () => {},
            })
          }
        >
          Neutral + Action
        </Button>
        <Button
          onClick={() =>
            showToast('Notification', 'info', undefined, 6000, {
              actionLabel: 'Action',
              onAction: () => {},
            })
          }
        >
          Info + Action
        </Button>
        <Button
          onClick={() =>
            showToast('Сохранено', 'success', undefined, 5000, {
              actionLabel: 'Action',
              onAction: () => {},
            })
          }
        >
          Success + Action
        </Button>
        <Button
          onClick={() =>
            showToast('Сбой операции', 'error', undefined, 5000, {
              actionLabel: 'Action',
              onAction: () => {},
            })
          }
        >
          Error + Action
        </Button>
        <Button
          onClick={() =>
            showToast('Проверьте данные', 'warning', undefined, 5000, {
              actionLabel: 'Action',
              onAction: () => {},
            })
          }
        >
          Warning + Action
        </Button>
        <Button
          onClick={() => showToast('Без кнопки действия', 'neutral', 'Заметка', 4000)}
          variant="outlined"
        >
          Без действия
        </Button>
      </div>

      <Button onClick={clearToasts} variant="outlined" disabled={toasts.length === 0}>
        Очистить все ({toasts.length})
      </Button>
    </Card>
  );
};

const BulkOperationsDemo = () => {
  const { toasts, showToast, hideToast, clearToasts } = useToast();

  const showMultipleToasts = () => {
    showToast('Первое уведомление', 'info', 'Уведомление 1');
    setTimeout(() => showToast('Второе уведомление', 'success', 'Уведомление 2'), 500);
    setTimeout(() => showToast('Третье уведомление', 'warning', 'Уведомление 3'), 1000);
  };

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Массовые операции
      </Typography>

      <div style={storybookDemoStyles.rowFlexGap12MarginBottom16Wrap}>
        <Button onClick={showMultipleToasts}>Показать несколько уведомлений</Button>
        <Button onClick={() => showToast('Новое уведомление', 'info', 'Новое')}>
          Добавить еще одно
        </Button>
        <Button onClick={clearToasts} variant="outlined" disabled={toasts.length === 0}>
          Очистить все ({toasts.length})
        </Button>
      </div>

      <div style={storybookDemoStyles.demoResultPanel}>
        <Typography variant="body2" marginBottom="xs">
          <strong>Активные уведомления:</strong> {toasts.length}
        </Typography>
        {toasts.length > 0 ? (
          <div style={storybookDemoStyles.marginTop8}>
            {toasts.map((toast, index) => (
              <div key={toast.id} style={storybookDemoStyles.toastDemoActiveRow}>
                <Typography variant="body2" style={storybookDemoStyles.typographyFinePrint12}>
                  {index + 1}. {toast.title}: {toast.message}
                </Typography>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => hideToast(toast.id)}
                  style={storybookDemoStyles.toastDismissIconButtonTight}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
};

const AdvancedControlsDemo = () => {
  const { showToast, updateToast, pauseToasts, playToasts, clearToasts, isActiveToast } =
    useToast();

  const showPauseOnHover = () => {
    showToast('Наведи мышку на карточку: таймер остановится.', 'info', 'Pause on hover', 7000, {
      toastId: 'hover-demo',
      pauseOnHover: true,
      showProgressBar: true,
    });
  };

  const showAndUpdate = () => {
    showToast('Стартовала операция...', 'info', 'Update by id', 0, {
      toastId: 'update-demo',
      showProgressBar: false,
    });

    setTimeout(() => {
      updateToast('update-demo', {
        type: 'success',
        title: 'Готово',
        message: 'Toast обновлён по id без пересоздания.',
        duration: 5000,
        showProgressBar: true,
      });
    }, 1500);
  };

  const showWithoutDuplicate = () => {
    showToast('Этот toast не дублируется при повторных кликах.', 'info', 'preventDuplicate', 5000, {
      toastId: 'dedupe-demo',
      preventDuplicate: true,
      showProgressBar: true,
    });
  };

  const showWithDedupeById = () => {
    showToast('Дедупликация по id.', 'info', 'dedupe:id', 5000, {
      toastId: 'dedupe-id-demo',
      preventDuplicate: true,
      dedupeStrategy: 'id',
      showProgressBar: true,
    });
  };

  const showWithDedupeByContent = () => {
    showToast('Дедупликация по content.', 'info', 'dedupe:content', 5000, {
      preventDuplicate: true,
      dedupeStrategy: 'content',
      showProgressBar: true,
    });
  };

  const showWithDedupeByBoth = () => {
    showToast('Дедупликация по both.', 'info', 'dedupe:both', 5000, {
      toastId: 'dedupe-both-demo',
      preventDuplicate: true,
      dedupeStrategy: 'both',
      showProgressBar: true,
    });
  };

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Продвинутые функции
      </Typography>

      <div style={storybookDemoStyles.rowFlexGap12MarginBottom16Wrap}>
        <Button onClick={showPauseOnHover}>Pause on hover</Button>
        <Button onClick={showAndUpdate}>Update by id</Button>
        <Button variant="outlined" onClick={() => pauseToasts()}>
          Pause all
        </Button>
        <Button variant="outlined" onClick={() => playToasts()}>
          Play all
        </Button>
        <Button variant="outlined" onClick={() => pauseToasts('hover-demo')}>
          Pause one
        </Button>
        <Button variant="outlined" onClick={() => playToasts('hover-demo')}>
          Play one
        </Button>
        <Button variant="outlined" onClick={showWithoutDuplicate}>
          preventDuplicate
        </Button>
        <Button variant="outlined" onClick={showWithDedupeById}>
          dedupe: id
        </Button>
        <Button variant="outlined" onClick={showWithDedupeByContent}>
          dedupe: content
        </Button>
        <Button variant="outlined" onClick={showWithDedupeByBoth}>
          dedupe: both
        </Button>
        <Button variant="outlined" onClick={clearToasts}>
          Очистить
        </Button>
      </div>
      <Typography variant="body2">
        dedupe-demo активен: {isActiveToast('dedupe-demo') ? 'Да' : 'Нет'}
      </Typography>
      <Typography variant="body2">
        dedupe-id-demo активен: {isActiveToast('dedupe-id-demo') ? 'Да' : 'Нет'}
      </Typography>
      <Typography variant="body2">
        dedupe-both-demo активен: {isActiveToast('dedupe-both-demo') ? 'Да' : 'Нет'}
      </Typography>
    </Card>
  );
};

const LimitAndStackDemo = () => {
  const { showToast, clearToasts } = useToast();

  const showMany = () => {
    showToast('Первый', 'info', 'Queue #1', 6000);
    showToast('Второй', 'success', 'Queue #2', 6000);
    showToast('Третий', 'warning', 'Queue #3', 6000);
    showToast('Четвертый', 'error', 'Queue #4', 6000);
    showToast('Пятый', 'neutral', 'Queue #5', 6000);
  };

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        limit + newestOnTop + stacked
      </Typography>
      <div style={storybookDemoStyles.rowFlexGap12Wrap}>
        <Button onClick={showMany}>Показать 5 уведомлений</Button>
        <Button variant="outlined" onClick={clearToasts}>
          Очистить
        </Button>
      </div>
    </Card>
  );
};

export const BasicUsage: Story = {
  render: () => <BasicToastDemo />,
};

export const ToastTypes: Story = {
  render: () => <ToastTypesDemo />,
};

export const PillAppearance: Story = {
  decorators: [withPillToast],
  render: () => <PillToastDemo />,
};

export const AutoHide: Story = {
  render: () => <AutoHideDemo />,
};

export const BulkOperations: Story = {
  render: () => <BulkOperationsDemo />,
};

export const AdvancedControls: Story = {
  render: () => <AdvancedControlsDemo />,
};

export const LimitedStack: Story = {
  decorators: [
    (Story) => (
      <ToastProvider limit={3} newestOnTop stacked>
        <Story />
      </ToastProvider>
    ),
  ],
  render: () => <LimitAndStackDemo />,
};

export const AllExamples: Story = {
  render: () => (
    <StorybookStaggerStack>
      <BasicToastDemo />
      <ToastTypesDemo />
      <AutoHideDemo />
      <BulkOperationsDemo />
      <AdvancedControlsDemo />
    </StorybookStaggerStack>
  ),
};
