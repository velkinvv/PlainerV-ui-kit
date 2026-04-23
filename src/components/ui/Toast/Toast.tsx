import React from 'react';
import { ToastAppearance, type ToastItem } from '@/types/ui';
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
  ToastPillAction,
  ToastPillDismiss,
  ToastPillIconWrap,
  ToastPillMessage,
  ToastPillRoot,
  ToastPillRow,
  ToastPillTextCol,
  ToastPillTitle,
  ToastTextBlock,
  ToastTitle,
} from './Toast.style';
import { getToastPillIconName, getToastPillVisualTokens, getToastSurfaceTokens } from './handlers';

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
 * Визуальная карточка уведомления: классическая (полоса слева) или «пилюля» по макету Figma.
 */
export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const { mode } = useTheme();
  const resolvedAppearance = toast.appearance ?? ToastAppearance.CARD;

  if (resolvedAppearance === ToastAppearance.PILL) {
    return <ToastPillView toast={toast} onClose={onClose} mode={mode} />;
  }

  return <ToastCardView toast={toast} onClose={onClose} mode={mode} />;
};

/**
 * Классический вид (акцент слева)
 * @property toast - Запись уведомления
 * @property onClose - Закрытие по id
 * @property mode - Тема оформления
 */
const ToastCardView: React.FC<{
  toast: ToastItem;
  onClose: (id: string) => void;
  mode: ThemeMode;
}> = ({ toast, onClose, mode }) => {
  const tokens = getToastSurfaceTokens(toast.type, mode);
  const iconColor = mode === ThemeMode.DARK ? neutral[400] : grey[500];

  return (
    <ToastCard $tokens={tokens} role="status" aria-live="polite">
      <ToastHeaderRow>
        <ToastTextBlock>
          {toast.title ? <ToastTitle $color={tokens.titleColor}>{toast.title}</ToastTitle> : null}
          <ToastMessage $color={tokens.bodyColor}>{toast.message}</ToastMessage>
        </ToastTextBlock>
        <ToastDismiss type="button" aria-label="Закрыть уведомление" onClick={() => onClose(toast.id)}>
          <Icon name="PhosphorX" size={IconSize.SM} color={iconColor} />
        </ToastDismiss>
      </ToastHeaderRow>
    </ToastCard>
  );
};

/**
 * Вид «пилюля»: иконка с glow, текст, опциональное действие, круглое закрытие
 * @property toast - Запись уведомления
 * @property onClose - Закрытие по id
 * @property mode - Тема оформления
 */
const ToastPillView: React.FC<{
  toast: ToastItem;
  onClose: (id: string) => void;
  mode: ThemeMode;
}> = ({ toast, onClose, mode }) => {
  const pill = getToastPillVisualTokens(toast.type, mode);
  const iconName = getToastPillIconName(toast.type);
  const hasAction = Boolean(toast.actionLabel?.trim());

  const handleAction = () => {
    toast.onAction?.();
    onClose(toast.id);
  };

  return (
    <ToastPillRoot $tokens={pill} role="status" aria-live="polite">
      <ToastPillRow>
        <ToastPillIconWrap $glow={pill.iconGlow}>
          <Icon name={iconName} size={IconSize.LG} color={pill.iconColor} />
        </ToastPillIconWrap>
        <ToastPillTextCol>
          {toast.title ? <ToastPillTitle $color={pill.titleColor}>{toast.title}</ToastPillTitle> : null}
          <ToastPillMessage $color={pill.bodyColor}>{toast.message}</ToastPillMessage>
        </ToastPillTextCol>
        {hasAction && toast.actionLabel ? (
          <ToastPillAction
            type="button"
            $bg={pill.actionBg}
            $fg={pill.actionText}
            onClick={handleAction}
          >
            {toast.actionLabel}
          </ToastPillAction>
        ) : null}
      </ToastPillRow>
      <ToastPillDismiss
        type="button"
        aria-label="Закрыть уведомление"
        $bg={pill.closeBg}
        onClick={() => onClose(toast.id)}
      >
        <Icon name="PhosphorX" size={IconSize.SM} color={pill.closeIcon} />
      </ToastPillDismiss>
    </ToastPillRoot>
  );
};
