import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { Button } from '../buttons/Button';
import { Toast } from './Toast';
import { ToastProvider, useToast } from './ToastProvider';
import { ToastAppearance, type ToastItem, type ToastPlacement } from '@/types/ui';
import { DOC_TOAST } from '@/components/ui/storyDocs/uiKitDocs';
import { toastStoriesStyles } from './Toast.stories.styles';

const meta: Meta<typeof Toast> = {
  title: 'UI Kit/Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_TOAST,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    toast: {
      description:
        'Данные уведомления: тип, текст, опционально заголовок, duration, appearance, действие',
      control: 'object',
      table: {
        type: {
          summary:
            'ToastItem: id, type (success, error, warning, info, neutral), message, title?, duration?, appearance?, actionLabel?, onAction?',
        },
      },
    },
    onClose: {
      description: 'Закрытие по id',
      table: {
        type: { summary: '(id: string) => void' },
      },
    },
    onPauseTimer: { control: false, table: { disable: true } },
    onResumeTimer: { control: false, table: { disable: true } },
    timing: { control: false, table: { disable: true } },
  },
  args: {
    onPauseTimer: fn(),
    onResumeTimer: fn(),
  },
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
    onClose: fn(),
  },
};

export const Success: Story = {
  args: {
    toast: sample({
      type: 'success',
      title: 'Успех',
      message: 'Операция выполнена успешно.',
    }),
    onClose: fn(),
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
    onClose: fn(),
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
    onClose: fn(),
  },
};

export const NeutralCard: Story = {
  name: 'Neutral (card)',
  args: {
    toast: sample({
      type: 'neutral',
      appearance: ToastAppearance.CARD,
      title: 'Уведомление',
      message: 'Нейтральное сообщение без акцента ошибки или успеха.',
    }),
    onClose: fn(),
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
      onAction: fn(),
    }),
    onClose: fn(),
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
      onAction: fn(),
    }),
    onClose: fn(),
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
    onClose: fn(),
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

const AdvancedToastControls = () => {
  const { showToast, updateToast, pauseToasts, playToasts } = useToast();

  const handleShowHoverToast = () => {
    showToast(
      'Наведи курсор: автозакрытие остановится до ухода мыши.',
      'info',
      'Pause on hover',
      6000,
      {
        toastId: 'hover-pause-toast',
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        showProgressBar: true,
      },
    );
  };

  const handleShowAndUpdate = () => {
    showToast('Имитация загрузки началась...', 'info', 'Обновление по id', 0, {
      toastId: 'update-toast',
      showProgressBar: false,
    });

    setTimeout(() => {
      updateToast('update-toast', {
        type: 'success',
        title: 'Готово',
        message: 'Операция завершена. Этот toast обновился без пересоздания.',
        duration: 4000,
        showProgressBar: true,
      });
    }, 1400);
  };

  const handlePauseAll = () => {
    pauseToasts();
  };

  const handlePlayAll = () => {
    playToasts();
  };

  const handlePauseSingle = () => {
    pauseToasts('hover-pause-toast');
  };

  const handlePlaySingle = () => {
    playToasts('hover-pause-toast');
  };

  return (
    <div style={toastStoriesStyles.controlsRow}>
      <Button onClick={handleShowHoverToast}>Pause on hover</Button>
      <Button onClick={handleShowAndUpdate}>Update by id</Button>
      <Button variant="outlined" onClick={handlePauseAll}>
        Pause all
      </Button>
      <Button variant="outlined" onClick={handlePlayAll}>
        Play all
      </Button>
      <Button variant="outlined" onClick={handlePauseSingle}>
        Pause one
      </Button>
      <Button variant="outlined" onClick={handlePlaySingle}>
        Play one
      </Button>
    </div>
  );
};

export const PauseOnHoverAndProgress: Story = {
  render: () => (
    <ToastProvider pauseOnHover showProgressBar>
      <AdvancedToastControls />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация pauseOnHover + progress bar: таймер останавливается на hover и возобновляется после ухода курсора.',
      },
    },
  },
};

const ToastLimitDemoControls = () => {
  const { showToast, clearToasts } = useToast();

  const handlePushMany = () => {
    showToast('Первое уведомление', 'info', 'Queue #1', 7000);
    showToast('Второе уведомление', 'success', 'Queue #2', 7000);
    showToast('Третье уведомление', 'warning', 'Queue #3', 7000);
    showToast('Четвертое уведомление', 'error', 'Queue #4', 7000);
    showToast('Пятое уведомление', 'neutral', 'Queue #5', 7000);
  };

  return (
    <div style={toastStoriesStyles.controlsRow}>
      <Button onClick={handlePushMany}>Показать 5 уведомлений</Button>
      <Button variant="outlined" onClick={clearToasts}>
        Очистить
      </Button>
    </div>
  );
};

export const LimitNewestOnTopStacked: Story = {
  render: () => (
    <ToastProvider limit={3} newestOnTop stacked>
      <ToastLimitDemoControls />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация limit/newestOnTop/stacked: в стеке максимум 3 уведомления, новые сверху, плотная компоновка.',
      },
    },
  },
};
