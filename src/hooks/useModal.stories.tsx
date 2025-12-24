import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../components/ui/buttons/Button';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Modal } from '../components/ui/Modal';
import { useModal } from './useModal';

const meta: Meta = {
  title: 'Hooks/useModal',
  parameters: {
    docs: {
      description: {
        component: `
# useModal Hook

Хук для управления состоянием модальных окон.

## Возвращаемые значения:

- **isOpen** - boolean, состояние открытости модального окна
- **open** - функция для открытия модального окна
- **close** - функция для закрытия модального окна
- **toggle** - функция для переключения состояния модального окна

## Использование:

\`\`\`typescript
const { isOpen, open, close, toggle } = useModal(initialState);
\`\`\`

## Параметры:

- **initialState** (optional) - начальное состояние модального окна (по умолчанию false)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Компонент для демонстрации базового использования
const BasicModalDemo = () => {
  const { isOpen, open, close, toggle } = useModal();

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Базовое использование useModal
      </Typography>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Button onClick={open}>Открыть модальное окно</Button>
        <Button onClick={close} disabled={!isOpen}>
          Закрыть модальное окно
        </Button>
        <Button onClick={toggle} variant="outlined">
          {isOpen ? 'Закрыть' : 'Открыть'}
        </Button>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body2">
          <strong>Состояние:</strong> {isOpen ? 'Открыто' : 'Закрыто'}
        </Typography>
      </div>

      <Modal isOpen={isOpen} onClose={close}>
        <Card padding="lg" style={{ maxWidth: '400px' }}>
          <Typography variant="h4" marginBottom="md">
            Модальное окно
          </Typography>
          <Typography variant="body1" marginBottom="lg">
            Это пример модального окна, управляемого через useModal хук.
          </Typography>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={close}>
              Отмена
            </Button>
            <Button onClick={close}>ОК</Button>
          </div>
        </Card>
      </Modal>
    </Card>
  );
};

// Компонент для демонстрации начального состояния
const InitialStateDemo = () => {
  const { isOpen, open, close, toggle } = useModal(true); // Начинаем с открытого состояния

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        useModal с начальным состоянием
      </Typography>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Button onClick={open}>Открыть</Button>
        <Button onClick={close} disabled={!isOpen}>
          Закрыть
        </Button>
        <Button onClick={toggle} variant="outlined">
          Переключить
        </Button>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body2">
          <strong>Состояние:</strong> {isOpen ? 'Открыто' : 'Закрыто'}
        </Typography>
        <Typography variant="body2" marginTop="xs">
          <strong>Начальное состояние:</strong> true (открыто)
        </Typography>
      </div>

      <Modal isOpen={isOpen} onClose={close}>
        <Card padding="lg" style={{ maxWidth: '400px' }}>
          <Typography variant="h4" marginBottom="md">
            Модальное окно с начальным состоянием
          </Typography>
          <Typography variant="body1" marginBottom="lg">
            Это модальное окно было открыто при инициализации.
          </Typography>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={close}>
              Закрыть
            </Button>
          </div>
        </Card>
      </Modal>
    </Card>
  );
};

// Компонент для демонстрации множественных модальных окон
const MultipleModalsDemo = () => {
  const modal1 = useModal();
  const modal2 = useModal();
  const modal3 = useModal();

  const modals = [
    { hook: modal1, title: 'Первое модальное окно', color: '#007bff' },
    { hook: modal2, title: 'Второе модальное окно', color: '#28a745' },
    { hook: modal3, title: 'Третье модальное окно', color: '#dc3545' },
  ];

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Множественные модальные окна
      </Typography>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {modals.map((modal, index) => (
          <Button key={index} onClick={modal.hook.open} style={{ backgroundColor: modal.color }}>
            Открыть {index + 1}
          </Button>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        {modals.map((modal, index) => (
          <div
            key={index}
            style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}
          >
            <Typography variant="body2" marginBottom="xs">
              <strong>Модальное окно {index + 1}:</strong>
            </Typography>
            <Typography variant="body2">{modal.hook.isOpen ? 'Открыто' : 'Закрыто'}</Typography>
          </div>
        ))}
      </div>

      {modals.map((modal, index) => (
        <Modal key={index} isOpen={modal.hook.isOpen} onClose={modal.hook.close}>
          <Card padding="lg" style={{ maxWidth: '400px' }}>
            <Typography variant="h4" marginBottom="md" style={{ color: modal.color }}>
              {modal.title}
            </Typography>
            <Typography variant="body1" marginBottom="lg">
              Это {index + 1}-е модальное окно. Каждое управляется своим экземпляром useModal.
            </Typography>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={modal.hook.close}>
                Закрыть
              </Button>
            </div>
          </Card>
        </Modal>
      ))}
    </Card>
  );
};

// Компонент для демонстрации интеграции с другими хуками
const IntegrationDemo = () => {
  const { isOpen, open, close, toggle } = useModal();
  const [counter, setCounter] = React.useState(0);

  const handleOpen = () => {
    setCounter(prev => prev + 1);
    open();
  };

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Интеграция с другими хуками
      </Typography>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Button onClick={handleOpen}>Открыть (счетчик: {counter})</Button>
        <Button onClick={close} disabled={!isOpen}>
          Закрыть
        </Button>
        <Button onClick={toggle} variant="outlined">
          Переключить
        </Button>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body2" marginBottom="xs">
          <strong>Состояние:</strong> {isOpen ? 'Открыто' : 'Закрыто'}
        </Typography>
        <Typography variant="body2">
          <strong>Количество открытий:</strong> {counter}
        </Typography>
      </div>

      <Modal isOpen={isOpen} onClose={close}>
        <Card padding="lg" style={{ maxWidth: '400px' }}>
          <Typography variant="h4" marginBottom="md">
            Интеграция с useState
          </Typography>
          <Typography variant="body1" marginBottom="lg">
            Это модальное окно было открыто {counter} раз(а). useModal легко интегрируется с другими
            хуками React.
          </Typography>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={close}>
              Закрыть
            </Button>
          </div>
        </Card>
      </Modal>
    </Card>
  );
};

export const BasicUsage: Story = {
  render: () => <BasicModalDemo />,
};

export const InitialState: Story = {
  render: () => <InitialStateDemo />,
};

export const MultipleModals: Story = {
  render: () => <MultipleModalsDemo />,
};

export const Integration: Story = {
  render: () => <IntegrationDemo />,
};

export const AllExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <BasicModalDemo />
      <InitialStateDemo />
      <MultipleModalsDemo />
      <IntegrationDemo />
    </div>
  ),
};
