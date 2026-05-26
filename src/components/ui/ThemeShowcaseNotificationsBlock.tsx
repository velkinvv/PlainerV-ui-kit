import React from 'react';
import { Button } from './buttons/Button';
import { ToastProvider, useToast } from './Toast/ToastProvider';
import { SnackbarProvider, useSnackbar } from './Snackbar/SnackbarProvider';
import { ButtonVariant } from '../../types/ui';
import { themeShowcaseStoriesStyles } from './ThemeShowcase.stories.styles';

const ToastDemoButtons = () => {
  const { showToast } = useToast();

  return (
    <Button
      variant={ButtonVariant.OUTLINE}
      onClick={() => showToast('Изменения сохранены', 'success', 'Toast')}
    >
      Toast
    </Button>
  );
};

const SnackbarDemoButtons = () => {
  const { showSnackbar } = useSnackbar();

  return (
    <Button
      variant={ButtonVariant.OUTLINE}
      onClick={() =>
        showSnackbar('Действие выполнено', {
          actionLabel: 'Отменить',
          onAction: () => undefined,
        })
      }
    >
      Snackbar
    </Button>
  );
};

/**
 * Кнопки демонстрации Toast и Snackbar (с провайдерами).
 */
export const ThemeShowcaseNotificationsBlock = () => (
  <div style={themeShowcaseStoriesStyles.horizontalGap16Center}>
    <ToastProvider placement="top-right">
      <ToastDemoButtons />
    </ToastProvider>
    <SnackbarProvider placement="bottom-center">
      <SnackbarDemoButtons />
    </SnackbarProvider>
  </div>
);
