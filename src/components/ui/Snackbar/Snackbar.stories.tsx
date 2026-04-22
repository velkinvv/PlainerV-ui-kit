import type { Decorator, Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Snackbar } from './Snackbar';
import type { SnackbarItem } from '@/types/ui';

const withTheme: Decorator = (Story) => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
);

const meta: Meta<typeof Snackbar> = {
  title: 'Components/Feedback/Snackbar',
  component: Snackbar,
  decorators: [withTheme],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Компактная полоса в стиле Material Snackbar: тёмный фон, текст, опциональное действие. В приложении — `ThemeProvider` + `SnackbarProvider` + `useSnackbar` (сторис **Hooks/useSnackbar**).',
      },
    },
  },
  tags: ['autodocs'],
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
    onClose: () => {},
    onActionClick: () => {},
  },
};

export const WithAction: Story = {
  args: {
    snackbar: sample({
      message: 'Изменения отменены',
      actionLabel: 'Отменить',
    }),
    onClose: () => {},
    onActionClick: () => {},
  },
};
