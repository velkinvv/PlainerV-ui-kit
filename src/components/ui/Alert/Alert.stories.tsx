import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { Button } from '../buttons/Button/Button';
import { ButtonVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { DOC_ALERT } from '@/components/ui/storyDocs/uiKitDocs';
import { Icon } from '../Icon/Icon';
import { IconSize } from '../../../types/sizes';
import { AlertStoriesStack } from './Alert.stories.style';

const meta: Meta<typeof Alert> = {
  title: 'UI Kit/Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_ALERT,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'radio',
      options: ['success', 'info', 'warning', 'error'],
    },
    variant: {
      control: 'radio',
      options: ['standard', 'filled', 'outlined'],
    },
    color: { control: 'text' },
    size: { control: 'select', options: Object.values(Size) },
    fullWidth: { control: 'boolean' },
    role: { control: 'radio', options: ['alert', 'status'] },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Basic: Story = {
  args: {
    severity: 'success',
    title: 'Успешно',
    children: 'Операция выполнена.',
    fullWidth: true,
  },
};

export const Severities: Story = {
  name: 'Severities',
  render: () => (
    <AlertStoriesStack>
      <Alert severity="success" title="Success" fullWidth>
        Успешное уведомление
      </Alert>
      <Alert severity="info" title="Info" fullWidth>
        Информационное уведомление
      </Alert>
      <Alert severity="warning" title="Warning" fullWidth>
        Предупреждение
      </Alert>
      <Alert severity="error" title="Error" fullWidth>
        Ошибка
      </Alert>
    </AlertStoriesStack>
  ),
};

export const Variants: Story = {
  name: 'Variants',
  render: () => (
    <AlertStoriesStack>
      <Alert severity="info" variant="standard" fullWidth>
        standard
      </Alert>
      <Alert severity="info" variant="filled" fullWidth>
        filled
      </Alert>
      <Alert severity="info" variant="outlined" fullWidth>
        outlined
      </Alert>
    </AlertStoriesStack>
  ),
};

export const WithCloseAndAction: Story = {
  name: 'Close / action',
  render: () => (
    <AlertStoriesStack>
      <Alert severity="warning" onClose={() => undefined} fullWidth>
        С кнопкой закрытия
      </Alert>
      <Alert severity="error" variant="filled" onClose={() => undefined} fullWidth>
        Filled + close (контрастный крестик)
      </Alert>
      <Alert
        severity="success"
        fullWidth
        action={
          <Button variant={ButtonVariant.GHOST} size={Size.SM}>
            Отменить
          </Button>
        }
      >
        Со слотом action
      </Alert>
    </AlertStoriesStack>
  ),
};

export const ColorOverride: Story = {
  name: 'Color override',
  args: {
    severity: 'success',
    color: 'warning',
    title: 'Success + warning palette',
    children: 'Иконка success, цвета warning.',
    fullWidth: true,
  },
};

export const CustomIcon: Story = {
  name: 'Custom icon / no icon',
  render: () => (
    <AlertStoriesStack>
      <Alert
        severity="success"
        fullWidth
        icon={<Icon name="IconPlainerCheck" size={IconSize.SM} color="currentColor" />}
      >
        Кастомная иконка
      </Alert>
      <Alert severity="success" icon={false} fullWidth>
        Без иконки
      </Alert>
    </AlertStoriesStack>
  ),
};

export const WithAlertTitle: Story = {
  name: 'Alert.Title',
  render: () => (
    <Alert severity="error" fullWidth onClose={() => undefined}>
      <Alert.Title>Ошибка загрузки</Alert.Title>
      Не удалось получить данные. Попробуйте позже.
    </Alert>
  ),
};
