import type { Decorator, Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../buttons/Button';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Toast } from './Toast';
import { ToastProvider, useToast } from './ToastProvider';
import type { ToastItem, ToastPlacement } from '@/types/ui';

const withTheme: Decorator = (Story) => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
);

const meta: Meta<typeof Toast> = {
  title: 'Components/Feedback/Toast',
  component: Toast,
  decorators: [withTheme],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Карточка уведомления по макету Plainer: акцент слева, заголовок, текст, закрытие. В приложении — `ThemeProvider` + `ToastProvider` + хук `useToast` (сторис **Hooks/useToast**).',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toast>;

const sample = (partial: Partial<ToastItem>): ToastItem => ({
  id: 'story-toast',
  type: 'info',
  message: 'Текст уведомления для предпросмотра.',
  duration: 0,
  ...partial,
});

export const Info: Story = {
  args: {
    toast: sample({ type: 'info', title: 'Информация' }),
    onClose: () => {},
  },
};

export const Success: Story = {
  args: {
    toast: sample({
      type: 'success',
      title: 'Успех',
      message: 'Операция выполнена успешно.',
    }),
    onClose: () => {},
  },
};

export const ErrorToast: Story = {
  name: 'Error',
  args: {
    toast: sample({
      type: 'error',
      title: 'Ошибка',
      message: 'Не удалось сохранить изменения.',
    }),
    onClose: () => {},
  },
};

export const WarningToast: Story = {
  name: 'Warning',
  args: {
    toast: sample({
      type: 'warning',
      title: 'Внимание',
      message: 'Проверьте введённые данные.',
    }),
    onClose: () => {},
  },
};

/** Кнопка внутри провайдера — хук вызывается ниже по дереву */
const PlacementInner = ({ placement }: { placement: ToastPlacement }) => {
  const { showToast } = useToast();
  return (
    <Button onClick={() => showToast(`Угол: ${placement}`, 'info', 'Toast')}>
      Показать в {placement}
    </Button>
  );
};

const PlacementDemo = ({ placement }: { placement: ToastPlacement }) => (
  <ToastProvider placement={placement}>
    <PlacementInner placement={placement} />
  </ToastProvider>
);

export const PlacementTopRight: Story = {
  render: () => <PlacementDemo placement="top-right" />,
};

export const PlacementTopCenter: Story = {
  render: () => <PlacementDemo placement="top-center" />,
};

export const PlacementBottomRight: Story = {
  render: () => <PlacementDemo placement="bottom-right" />,
};
