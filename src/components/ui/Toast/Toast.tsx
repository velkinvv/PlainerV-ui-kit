import React from 'react';
import type { ToastItem } from '@/types/ui';
import { useTheme } from '@/themes/ThemeProvider';
import { Icon } from '../Icon/Icon';
import { IconSize } from '@/types/sizes';
import grey from '@/variables/colors/grey';
import { neutral } from '@/variables/colors/neutral';
import { ThemeMode } from '@/types/theme';
import {
  ToastCard,
  ToastDismiss,
  ToastHeaderRow,
  ToastMessage,
  ToastTextBlock,
  ToastTitle,
} from './Toast.style';
import { getToastSurfaceTokens } from './handlers';

/**
 * Пропсы карточки одного toast (рендер внутри `ToastProvider`).
 * @property toast - Данные уведомления (`ToastItem`)
 * @property onClose - Закрытие по id (кнопка и внешняя логика)
 */
export interface ToastProps {
  toast: ToastItem;
  onClose: (id: string) => void;
}

/**
 * Визуальная карточка уведомления: акцент слева, заголовок, текст, кнопка закрытия.
 */
export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const { mode } = useTheme();
  const tokens = getToastSurfaceTokens(toast.type, mode);
  const iconColor = mode === ThemeMode.DARK ? neutral[400] : grey[500];

  return (
    <ToastCard $tokens={tokens} role="status" aria-live="polite">
      <ToastHeaderRow>
        <ToastTextBlock>
          {toast.title ? <ToastTitle $color={tokens.titleColor}>{toast.title}</ToastTitle> : null}
          <ToastMessage $color={tokens.bodyColor}>{toast.message}</ToastMessage>
        </ToastTextBlock>
        <ToastDismiss
          type="button"
          aria-label="Закрыть уведомление"
          onClick={() => onClose(toast.id)}
        >
          <Icon name="PhosphorX" size={IconSize.SM} color={iconColor} />
        </ToastDismiss>
      </ToastHeaderRow>
    </ToastCard>
  );
};
