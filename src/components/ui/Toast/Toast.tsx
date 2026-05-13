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
  ToastProgressFill,
  ToastProgressTrack,
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
  onPauseTimer: (id: string) => void;
  onResumeTimer: (id: string) => void;
  timing?: {
    duration: number;
    remaining: number;
  };
}

/**
 * Визуальная карточка уведомления: по умолчанию «пилюля» по макету Figma, опционально классика с полосой слева (`ToastAppearance.CARD`).
 */
export const Toast: React.FC<ToastProps> = ({
  toast,
  onClose,
  onPauseTimer,
  onResumeTimer,
  timing,
}) => {
  const { mode } = useTheme();
  const resolvedAppearance = toast.appearance ?? ToastAppearance.PILL;

  if (resolvedAppearance === ToastAppearance.PILL) {
    return (
      <ToastPillView
        toast={toast}
        onClose={onClose}
        mode={mode}
        onPauseTimer={onPauseTimer}
        onResumeTimer={onResumeTimer}
        timing={timing}
      />
    );
  }

  return (
    <ToastCardView
      toast={toast}
      onClose={onClose}
      mode={mode}
      onPauseTimer={onPauseTimer}
      onResumeTimer={onResumeTimer}
      timing={timing}
    />
  );
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
  onPauseTimer: (id: string) => void;
  onResumeTimer: (id: string) => void;
  timing?: {
    duration: number;
    remaining: number;
  };
}> = ({ toast, onClose, mode, onPauseTimer, onResumeTimer, timing }) => {
  const tokens = getToastSurfaceTokens(toast.type, mode);
  const iconColor = mode === ThemeMode.DARK ? neutral[400] : grey[500];
  const progressPercent =
    timing && timing.duration > 0
      ? Math.max(0, Math.min(100, (timing.remaining / timing.duration) * 100))
      : 0;

  return (
    <ToastCard
      $tokens={tokens}
      role="status"
      aria-live="polite"
      onMouseEnter={() => onPauseTimer(toast.id)}
      onMouseLeave={() => onResumeTimer(toast.id)}
      onClick={() => {
        if (toast.closeOnClick) {
          onClose(toast.id);
        }
      }}
    >
      <ToastHeaderRow>
        <ToastTextBlock>
          {toast.title ? <ToastTitle $color={tokens.titleColor}>{toast.title}</ToastTitle> : null}
          <ToastMessage $color={tokens.bodyColor}>{toast.message}</ToastMessage>
        </ToastTextBlock>
        <ToastDismiss
          type="button"
          aria-label="Закрыть уведомление"
          onClick={(event) => {
            event.stopPropagation();
            onClose(toast.id);
          }}
        >
          <Icon name="PhosphorX" size={IconSize.SM} color={iconColor} />
        </ToastDismiss>
      </ToastHeaderRow>
      {toast.showProgressBar && timing && timing.duration > 0 ? (
        <ToastProgressTrack>
          <ToastProgressFill $color={tokens.accent} style={{ width: `${progressPercent}%` }} />
        </ToastProgressTrack>
      ) : null}
    </ToastCard>
  );
};

/**
 * Вид «пилюля» (макет Figma): пастельный фон, рамка типа, иконка с glow, заголовок/текст, действие, крестик в строке.
 * @property toast - Запись уведомления
 * @property onClose - Закрытие по id
 * @property mode - Тема оформления
 */
const ToastPillView: React.FC<{
  toast: ToastItem;
  onClose: (id: string) => void;
  mode: ThemeMode;
  onPauseTimer: (id: string) => void;
  onResumeTimer: (id: string) => void;
  timing?: {
    duration: number;
    remaining: number;
  };
}> = ({ toast, onClose, mode, onPauseTimer, onResumeTimer, timing }) => {
  const pill = getToastPillVisualTokens(toast.type, mode);
  const iconName = getToastPillIconName(toast.type);
  const hasAction = Boolean(toast.actionLabel?.trim());
  const progressPercent =
    timing && timing.duration > 0
      ? Math.max(0, Math.min(100, (timing.remaining / timing.duration) * 100))
      : 0;

  const handleAction = () => {
    toast.onAction?.();
    onClose(toast.id);
  };

  return (
    <ToastPillRoot
      $tokens={pill}
      role="status"
      aria-live="polite"
      onMouseEnter={() => onPauseTimer(toast.id)}
      onMouseLeave={() => onResumeTimer(toast.id)}
      onClick={() => {
        if (toast.closeOnClick) {
          onClose(toast.id);
        }
      }}
    >
      <ToastPillRow>
        <ToastPillIconWrap $glow={pill.iconGlow}>
          <Icon name={iconName} size={IconSize.LG} color={pill.iconColor} />
        </ToastPillIconWrap>
        <ToastPillTextCol>
          {toast.title ? (
            <ToastPillTitle $color={pill.titleColor}>{toast.title}</ToastPillTitle>
          ) : null}
          <ToastPillMessage $color={pill.bodyColor}>{toast.message}</ToastPillMessage>
        </ToastPillTextCol>
        {hasAction && toast.actionLabel ? (
          <ToastPillAction
            type="button"
            $bg={pill.actionBg}
            $fg={pill.actionText}
            onClick={(event) => {
              event.stopPropagation();
              handleAction();
            }}
          >
            {toast.actionLabel}
          </ToastPillAction>
        ) : null}
        <ToastPillDismiss
          type="button"
          aria-label="Закрыть уведомление"
          onClick={(event) => {
            event.stopPropagation();
            onClose(toast.id);
          }}
        >
          <Icon name="PhosphorX" size={IconSize.SM} color={pill.dismissIcon} />
        </ToastPillDismiss>
      </ToastPillRow>
      {toast.showProgressBar && timing && timing.duration > 0 ? (
        <ToastProgressTrack>
          <ToastProgressFill $color={pill.iconColor} style={{ width: `${progressPercent}%` }} />
        </ToastProgressTrack>
      ) : null}
    </ToastPillRoot>
  );
};
