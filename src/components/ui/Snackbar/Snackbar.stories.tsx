import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Snackbar } from './Snackbar';
import type { SnackbarItem } from '@/types/ui';
import { DOC_SNACKBAR } from '@/components/ui/storyDocs/uiKitDocs';

const withTheme: Decorator = (Story) => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
);

const meta: Meta<typeof Snackbar> = {
  title: 'UI Kit/Feedback/Snackbar',
  component: Snackbar,
  decorators: [withTheme],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_SNACKBAR,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    snackbar: {
      description: 'Данные полосы: id, message, duration, опционально actionLabel и onAction',
      control: 'object',
      table: {
        type: {
          summary:
            'SnackbarItem: { id: string; message: string; duration: number; actionLabel?: string; onAction?: () => void }',
        },
      },
    },
    onClose: {
      description: 'Закрытие по id (крестик или после действия)',
      table: {
        type: { summary: '(id: string) => void' },
      },
    },
    onActionClick: {
      description: 'Клик по кнопке действия; провайдер вызывает onAction у записи и закрытие',
      table: {
        type: { summary: '(id: string) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

const sample = (partial: Partial<SnackbarItem>): SnackbarItem => ({
  id: 'story-snackbar',
  message: 'Текст уведомления.',
  duration: 0,
  ...partial,
});

export const MessageOnly: Story = {
  args: {
    snackbar: sample({}),
    onClose: fn(),
    onActionClick: fn(),
  },
};

export const WithAction: Story = {
  args: {
    snackbar: sample({
      message: 'Изменения отменены',
      actionLabel: 'Отменить',
    }),
    onClose: fn(),
    onActionClick: fn(),
  },
};

