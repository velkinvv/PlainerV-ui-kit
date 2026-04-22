import type { Decorator, Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../components/ui/buttons/Button';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { ThemeProvider } from '../themes/ThemeProvider';
import { ToastProvider } from '../components/ui/Toast';
import { useToast } from './useToast';
import type { ToastType } from '@/types/ui';

const withToast: Decorator = (Story) => (
  <ThemeProvider>
    <ToastProvider>
      <Story />
    </ToastProvider>
  </ThemeProvider>
);

const meta: Meta = {
  title: 'Hooks/useToast',
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
import { ToastProvider, useToast } from '@velkinvv/plainerv';

<ThemeProvider>
  <ToastProvider placement="top-right">
    <App />
  </ToastProvider>
</ThemeProvider>
\`\`\`

## API

- **toasts** — активные записи (\`ToastItem\`: \`id\`, \`type\`, \`message\`, \`title\`, \`duration\`)
- **showToast(message, type?, title?, duration?)** — показать (\`duration\` по умолчанию 5000 мс, \`0\` — без автоскрытия)
- **hideToast(id)** — закрыть по id
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

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <Button onClick={() => showToast('Простое уведомление')}>Простое уведомление</Button>
        <Button onClick={() => showToast('Успешная операция', 'success', 'Успех')}>Успех</Button>
        <Button onClick={() => showToast('Произошла ошибка', 'error', 'Ошибка')}>Ошибка</Button>
        <Button onClick={() => showToast('Внимание!', 'warning', 'Предупреждение')}>
          Предупреждение
        </Button>
        <Button onClick={() => showToast('Информация', 'info', 'Инфо')}>Информация</Button>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Button onClick={clearToasts} variant="outlined" disabled={toasts.length === 0}>
          Очистить все ({toasts.length})
        </Button>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body2" marginBottom="xs">
          <strong>Активные уведомления:</strong> {toasts.length}
        </Typography>
        {toasts.length > 0 ? (
          <div style={{ marginTop: '8px' }}>
            {toasts.map((toast) => (
              <div key={toast.id} style={{ marginBottom: '4px' }}>
                <Typography variant="body2" style={{ fontSize: '12px' }}>
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
  ];

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Различные типы уведомлений
      </Typography>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
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

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
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

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
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

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Button onClick={clearToasts} variant="outlined" disabled={toasts.length === 0}>
          Очистить все
        </Button>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body2" marginBottom="xs">
          <strong>Активные уведомления:</strong> {toasts.length}
        </Typography>
        <Typography variant="body2" style={{ fontSize: '12px', color: '#6c757d' }}>
          Уведомления с длительностью 0 не скрываются автоматически
        </Typography>
      </div>
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

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <Button onClick={showMultipleToasts}>Показать несколько уведомлений</Button>
        <Button onClick={() => showToast('Новое уведомление', 'info', 'Новое')}>
          Добавить еще одно
        </Button>
        <Button onClick={clearToasts} variant="outlined" disabled={toasts.length === 0}>
          Очистить все ({toasts.length})
        </Button>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body2" marginBottom="xs">
          <strong>Активные уведомления:</strong> {toasts.length}
        </Typography>
        {toasts.length > 0 ? (
          <div style={{ marginTop: '8px' }}>
            {toasts.map((toast, index) => (
              <div
                key={toast.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '4px',
                  padding: '4px 8px',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                }}
              >
                <Typography variant="body2" style={{ fontSize: '12px' }}>
                  {index + 1}. {toast.title}: {toast.message}
                </Typography>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => hideToast(toast.id)}
                  style={{ padding: '2px 6px', minWidth: 'auto' }}
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

export const BasicUsage: Story = {
  render: () => <BasicToastDemo />,
};

export const ToastTypes: Story = {
  render: () => <ToastTypesDemo />,
};

export const AutoHide: Story = {
  render: () => <AutoHideDemo />,
};

export const BulkOperations: Story = {
  render: () => <BulkOperationsDemo />,
};

export const AllExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <BasicToastDemo />
      <ToastTypesDemo />
      <AutoHideDemo />
      <BulkOperationsDemo />
    </div>
  ),
};
