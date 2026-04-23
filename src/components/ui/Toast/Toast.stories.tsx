import type { Decorator, Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../buttons/Button';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Toast } from './Toast';
import { ToastProvider, useToast } from './ToastProvider';
import { ToastAppearance, type ToastItem, type ToastPlacement } from '@/types/ui';

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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/nXAzUL74f5DbMpolFYlKl7/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82--Copy-?node-id=4911-4334&t=eb4vmm0U8WfOr8yP-4',
    },
    docs: {
      description: {
        component:
          'Карточка уведомления: классический вид (полоса слева) или «пилюля» по макету Figma — иконка с glow, текст, кнопка действия, круглое закрытие. В приложении — `ThemeProvider` + `ToastProvider` + хук `useToast` (сторис **Hooks/useToast**). Внешний вид задаётся полем `appearance` у записи или `defaultAppearance` у провайдера.',
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

export const NeutralCard: Story = {
  name: 'Neutral (card)',
  args: {
    toast: sample({
      type: 'neutral',
      title: 'Уведомление',
      message: 'Нейтральное сообщение без акцента ошибки или успеха.',
    }),
    onClose: () => {},
  },
};

export const PillInfo: Story = {
  name: 'Pill / Info',
  args: {
    toast: sample({
      type: 'info',
      appearance: ToastAppearance.PILL,
      message: 'Notification',
      actionLabel: 'Action',
      onAction: () => {},
    }),
    onClose: () => {},
  },
};

export const PillSuccess: Story = {
  name: 'Pill / Success',
  args: {
    toast: sample({
      type: 'success',
      appearance: ToastAppearance.PILL,
      title: 'Готово',
      message: 'Изменения сохранены.',
      actionLabel: 'Action',
      onAction: () => {},
    }),
    onClose: () => {},
  },
};

export const PillNeutralNoAction: Story = {
  name: 'Pill / Neutral без действия',
  args: {
    toast: sample({
      type: 'neutral',
      appearance: ToastAppearance.PILL,
      message: 'Короткое уведомление без кнопки действия.',
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
