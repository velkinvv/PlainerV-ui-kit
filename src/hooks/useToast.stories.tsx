import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../components/ui/buttons/Button';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Badge } from '../components/ui/Badge';
import { useToast, ToastType } from './useToast';

const meta: Meta = {
  title: 'Hooks/useToast',
  parameters: {
    docs: {
      description: {
        component: `
# useToast Hook

Хук для управления уведомлениями (toast) в приложении.

## Возвращаемые значения:

- **toasts** - массив активных уведомлений
- **showToast** - функция для показа уведомления
- **hideToast** - функция для скрытия конкретного уведомления
- **clearToasts** - функция для очистки всех уведомлений

## Параметры showToast:

- **message** - текст сообщения (обязательный)
- **type** - тип уведомления: 'success' | 'error' | 'warning' | 'info' (по умолчанию 'info')
- **title** - заголовок уведомления (опциональный)
- **duration** - длительность показа в миллисекундах (по умолчанию 5000, 0 = не скрывать автоматически)

## Использование:

\`\`\`typescript
const { toasts, showToast, hideToast, clearToasts } = useToast();

// Показать простое уведомление
showToast('Операция выполнена успешно');

// Показать уведомление с типом и заголовком
showToast('Ошибка загрузки', 'error', 'Ошибка', 3000);

// Скрыть конкретное уведомление
hideToast(toastId);

// Очистить все уведомления
clearToasts();
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Компонент для отображения toast
const ToastDisplay = ({ toast, onHide }: { toast: any; onHide: (id: string) => void }) => {
  const getToastColor = (type: ToastType) => {
    switch (type) {
      case 'success':
        return '#28a745';
      case 'error':
        return '#dc3545';
      case 'warning':
        return '#ffc107';
      case 'info':
        return '#17a2b8';
      default:
        return '#6c757d';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: 'white',
        border: `2px solid ${getToastColor(toast.type)}`,
        borderRadius: '8px',
        padding: '16px',
        minWidth: '300px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        marginBottom: '10px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          {toast.title && (
            <Typography variant="h6" marginBottom="xs" style={{ color: getToastColor(toast.type) }}>
              {toast.title}
            </Typography>
          )}
          <Typography variant="body2">{toast.message}</Typography>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <Badge variant="outlined" size="sm">
              {toast.type}
            </Badge>
            <Badge variant="outlined" size="sm">
              ID: {toast.id.slice(0, 6)}
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onHide(toast.id)}
          style={{ marginLeft: '12px' }}
        >
          ×
        </Button>
      </div>
    </div>
  );
};

// Компонент для демонстрации базового использования
const BasicToastDemo = () => {
  const { toasts, showToast, hideToast, clearToasts } = useToast();

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
        {toasts.length > 0 && (
          <div style={{ marginTop: '8px' }}>
            {toasts.map(toast => (
              <div key={toast.id} style={{ marginBottom: '4px' }}>
                <Typography variant="body2" style={{ fontSize: '12px' }}>
                  {toast.type}: {toast.message} (ID: {toast.id.slice(0, 6)})
                </Typography>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Отображение toast */}
      {toasts.map(toast => (
        <ToastDisplay key={toast.id} toast={toast} onHide={hideToast} />
      ))}
    </Card>
  );
};

// Компонент для демонстрации различных типов уведомлений
const ToastTypesDemo = () => {
  const { toasts, showToast, hideToast, clearToasts } = useToast();

  const toastExamples = [
    {
      message: 'Данные успешно сохранены',
      type: 'success' as ToastType,
      title: 'Успех',
      duration: 3000,
    },
    {
      message: 'Не удалось подключиться к серверу',
      type: 'error' as ToastType,
      title: 'Ошибка',
      duration: 5000,
    },
    {
      message: 'Пожалуйста, проверьте введенные данные',
      type: 'warning' as ToastType,
      title: 'Предупреждение',
      duration: 4000,
    },
    {
      message: 'Новая версия приложения доступна',
      type: 'info' as ToastType,
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

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body2" marginBottom="xs">
          <strong>Примеры уведомлений:</strong>
        </Typography>
        <div style={{ marginTop: '8px' }}>
          {toastExamples.map((example, index) => (
            <div
              key={index}
              style={{
                marginBottom: '8px',
                padding: '8px',
                backgroundColor: 'white',
                borderRadius: '4px',
              }}
            >
              <Typography
                variant="body2"
                style={{
                  fontWeight: 'bold',
                  color:
                    example.type === 'success'
                      ? '#28a745'
                      : example.type === 'error'
                        ? '#dc3545'
                        : example.type === 'warning'
                          ? '#ffc107'
                          : '#17a2b8',
                }}
              >
                {example.title}
              </Typography>
              <Typography variant="body2" style={{ fontSize: '12px' }}>
                {example.message}
              </Typography>
              <Typography variant="body2" style={{ fontSize: '10px', color: '#6c757d' }}>
                Тип: {example.type}, Длительность: {example.duration}мс
              </Typography>
            </div>
          ))}
        </div>
      </div>

      {/* Отображение toast */}
      {toasts.map(toast => (
        <ToastDisplay key={toast.id} toast={toast} onHide={hideToast} />
      ))}
    </Card>
  );
};

// Компонент для демонстрации автоматического скрытия
const AutoHideDemo = () => {
  const { toasts, showToast, hideToast, clearToasts } = useToast();

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

      {/* Отображение toast */}
      {toasts.map(toast => (
        <ToastDisplay key={toast.id} toast={toast} onHide={hideToast} />
      ))}
    </Card>
  );
};

// Компонент для демонстрации массовых операций
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
        {toasts.length > 0 && (
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
        )}
      </div>

      {/* Отображение toast */}
      {toasts.map(toast => (
        <ToastDisplay key={toast.id} toast={toast} onHide={hideToast} />
      ))}
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
