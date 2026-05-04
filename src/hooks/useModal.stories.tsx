import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../components/ui/buttons/Button';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Modal } from '../components/ui/Modal';
import { ButtonVariant } from '../types/ui';
import { useModal } from './useModal';
import {
  AllExamplesContainer,
  ColoredTriggerButton,
  ModalsStateGrid,
  ModalsTriggerContainer,
  ModalStateCard,
  StoryControlsContainer,
  StoryStateContainer,
} from './useModal.stories.style';

const meta: Meta = {
  title: 'UI Kit/Hooks/useModal',
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

      <StoryControlsContainer>
        <Button onClick={open}>Открыть модальное окно</Button>
        <Button onClick={close} disabled={!isOpen}>
          Закрыть модальное окно
        </Button>
        <Button onClick={toggle} variant="outlined">
          {isOpen ? 'Закрыть' : 'Открыть'}
        </Button>
      </StoryControlsContainer>

      <StoryStateContainer>
        <Typography variant="body2">
          <strong>Состояние:</strong> {isOpen ? 'Открыто' : 'Закрыто'}
        </Typography>
      </StoryStateContainer>

      <Modal
        isOpen={isOpen}
        onClose={close}
        title="Modal Window"
        description="Lorem ipsum dolor sit amet consectetur. Sit enim pretium ac eu porttitor interdum eu leo."
        buttons={[
          {
            label: 'Okey',
            onClick: close,
            placement: 'secondary',
          },
          {
            label: 'Button',
              variant: ButtonVariant.OUTLINE,
            onClick: close,
            placement: 'primary',
          },
        ]}
      />
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

      <StoryControlsContainer>
        <Button onClick={open}>Открыть</Button>
        <Button onClick={close} disabled={!isOpen}>
          Закрыть
        </Button>
        <Button onClick={toggle} variant="outlined">
          Переключить
        </Button>
      </StoryControlsContainer>

      <StoryStateContainer>
        <Typography variant="body2">
          <strong>Состояние:</strong> {isOpen ? 'Открыто' : 'Закрыто'}
        </Typography>
        <Typography variant="body2" marginTop="xs">
          <strong>Начальное состояние:</strong> true (открыто)
        </Typography>
      </StoryStateContainer>

      <Modal
        isOpen={isOpen}
        onClose={close}
        title="Modal Window"
        description="Lorem ipsum dolor sit amet consectetur. Sit enim pretium ac eu porttitor interdum eu leo."
        buttons={[
          {
            label: 'Okey',
            onClick: close,
            placement: 'secondary',
          },
          {
            label: 'Button',
              variant: ButtonVariant.OUTLINE,
            onClick: close,
            placement: 'primary',
          },
        ]}
      />
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

      <ModalsTriggerContainer>
        {modals.map((modal, modalIndex) => (
          <ColoredTriggerButton
            key={modalIndex}
            onClick={modal.hook.open}
            $backgroundColor={modal.color}
          >
            Открыть {modalIndex + 1}
          </ColoredTriggerButton>
        ))}
      </ModalsTriggerContainer>

      <ModalsStateGrid>
        {modals.map((modal, modalIndex) => (
          <ModalStateCard key={modalIndex}>
            <Typography variant="body2" marginBottom="xs">
              <strong>Модальное окно {modalIndex + 1}:</strong>
            </Typography>
            <Typography variant="body2">{modal.hook.isOpen ? 'Открыто' : 'Закрыто'}</Typography>
          </ModalStateCard>
        ))}
      </ModalsStateGrid>

      {modals.map((modal, modalIndex) => (
        <Modal
          key={modalIndex}
          isOpen={modal.hook.isOpen}
          onClose={modal.hook.close}
          title="Modal Window"
          description="Lorem ipsum dolor sit amet consectetur. Sit enim pretium ac eu porttitor interdum eu leo."
          buttons={[
            {
              label: 'Okey',
              onClick: modal.hook.close,
              placement: 'secondary',
            },
            {
              label: 'Button',
              variant: ButtonVariant.OUTLINE,
              onClick: modal.hook.close,
              placement: 'primary',
            },
          ]}
          modalVariant={modalIndex === 0 ? 'default' : modalIndex === 1 ? 'success' : 'danger'}
        />
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

      <StoryControlsContainer>
        <Button onClick={handleOpen}>Открыть (счетчик: {counter})</Button>
        <Button onClick={close} disabled={!isOpen}>
          Закрыть
        </Button>
        <Button onClick={toggle} variant="outlined">
          Переключить
        </Button>
      </StoryControlsContainer>

      <StoryStateContainer>
        <Typography variant="body2" marginBottom="xs">
          <strong>Состояние:</strong> {isOpen ? 'Открыто' : 'Закрыто'}
        </Typography>
        <Typography variant="body2">
          <strong>Количество открытий:</strong> {counter}
        </Typography>
      </StoryStateContainer>

      <Modal
        isOpen={isOpen}
        onClose={close}
        title="Modal Window"
        description={`Lorem ipsum dolor sit amet consectetur. Opened ${counter} times.`}
        buttons={[
          {
            label: 'Okey',
            onClick: close,
            placement: 'secondary',
          },
          {
            label: 'Button',
              variant: ButtonVariant.OUTLINE,
            onClick: close,
            placement: 'primary',
          },
        ]}
      />
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
    <AllExamplesContainer>
      <BasicModalDemo />
      <InitialStateDemo />
      <MultipleModalsDemo />
      <IntegrationDemo />
    </AllExamplesContainer>
  ),
};

