import React from 'react';
import type { SnackbarItem } from '@/types/ui';
import { useTheme } from '@/themes/ThemeProvider';
import { Icon } from '../Icon/Icon';
import { IconSize } from '@/types/sizes';
import grey from '@/variables/colors/grey';
import { neutral } from '@/variables/colors/neutral';
import { ThemeMode } from '@/types/theme';
import { SnackbarAction, SnackbarBar, SnackbarDismiss, SnackbarMessage } from './Snackbar.style';
import { getSnackbarSurfaceTokens } from './handlers';

/**
 * Пропсы одной полосы snackbar (рендер внутри `SnackbarProvider`).
 * @property snackbar - Данные (`SnackbarItem`)
 * @property onClose - Закрытие по id (крестик и после действия)
 * @property onActionClick - Клик по кнопке действия: вызывает `onAction` у записи и закрытие
 */
export interface SnackbarProps {
  snackbar: SnackbarItem;
  onClose: (id: string) => void;
  onActionClick: (id: string) => void;
}

/**
 * Компактная полоса внизу экрана: сообщение, опциональное действие, закрытие.
 */
export const Snackbar: React.FC<SnackbarProps> = ({ snackbar, onClose, onActionClick }) => {
  const { mode } = useTheme();
  const tokens = getSnackbarSurfaceTokens(mode);
  const dismissIconColor = mode === ThemeMode.DARK ? neutral[300] : grey[400];

  return (
    <SnackbarBar $tokens={tokens} role="status" aria-live="polite">
      <SnackbarMessage>{snackbar.message}</SnackbarMessage>
      {snackbar.actionLabel ? (
        <SnackbarAction
          type="button"
          $color={tokens.actionColor}
          onClick={() => onActionClick(snackbar.id)}
        >
          {snackbar.actionLabel}
        </SnackbarAction>
      ) : null}
      <SnackbarDismiss
        type="button"
        aria-label="Закрыть уведомление"
        onClick={() => onClose(snackbar.id)}
      >
        <Icon name="PhosphorX" size={IconSize.SM} color={dismissIconColor} />
      </SnackbarDismiss>
    </SnackbarBar>
  );
};
