import React from 'react';
import { clsx } from 'clsx';
import type { TransferListVariant } from '../../../types/ui';
import { ButtonVariant } from '../../../types/ui';
import { IconSize, Size } from '../../../types/sizes';
import { IconButton } from '../buttons/IconButton/IconButton';
import { Icon } from '../Icon/Icon';
import { TransferListActionsColumn, TransferListFlipIcon } from './TransferList.style';

/**
 * Пропсы колонки кнопок переноса.
 * @property variant - basic | enhanced
 * @property showMoveAll - Показать ≫ ≪ (только basic)
 * @property size - Размер кнопок
 * @property disabled - Глобальная блокировка
 * @property canMoveRight / canMoveLeft - Есть выбранные для переноса
 * @property canMoveAllRight / canMoveAllLeft - Есть доступные для move-all
 */
export type TransferListActionsProps = {
  variant: TransferListVariant;
  showMoveAll: boolean;
  size: Size;
  disabled: boolean;
  canMoveRight: boolean;
  canMoveLeft: boolean;
  canMoveAllRight: boolean;
  canMoveAllLeft: boolean;
  moveSelectedRightAriaLabel: string;
  moveSelectedLeftAriaLabel: string;
  moveAllRightAriaLabel: string;
  moveAllLeftAriaLabel: string;
  onMoveRight: () => void;
  onMoveLeft: () => void;
  onMoveAllRight: () => void;
  onMoveAllLeft: () => void;
};

/**
 * Сопоставление Size панели и IconSize.
 * @param size - Размер TransferList
 */
const resolveActionIconSize = (size: Size): IconSize => {
  switch (size) {
    case Size.XS:
    case Size.SM:
      return IconSize.SM;
    case Size.LG:
    case Size.XL:
      return IconSize.MD;
    case Size.MD:
    default:
      return IconSize.SM;
  }
};

/**
 * Колонка кнопок переноса между панелями.
 * @param props - См. TransferListActionsProps
 */
export const TransferListActions: React.FC<TransferListActionsProps> = ({
  variant,
  showMoveAll,
  size,
  disabled,
  canMoveRight,
  canMoveLeft,
  canMoveAllRight,
  canMoveAllLeft,
  moveSelectedRightAriaLabel,
  moveSelectedLeftAriaLabel,
  moveAllRightAriaLabel,
  moveAllLeftAriaLabel,
  onMoveRight,
  onMoveLeft,
  onMoveAllRight,
  onMoveAllLeft,
}) => {
  const iconSize = resolveActionIconSize(size);
  const showAllButtons = variant === 'basic' && showMoveAll;

  return (
    <TransferListActionsColumn className={clsx('ui-transfer-list__actions')}>
      {showAllButtons ? (
        <IconButton
          type="button"
          variant={ButtonVariant.SECONDARY}
          size={size}
          disabled={disabled || !canMoveAllRight}
          aria-label={moveAllRightAriaLabel}
          onClick={onMoveAllRight}
          icon={
            <TransferListFlipIcon aria-hidden>
              <Icon name="PhosphorCaretDoubleLeft" size={iconSize} color="currentColor" />
            </TransferListFlipIcon>
          }
        />
      ) : null}
      <IconButton
        type="button"
        variant={ButtonVariant.SECONDARY}
        size={size}
        disabled={disabled || !canMoveRight}
        aria-label={moveSelectedRightAriaLabel}
        onClick={onMoveRight}
        icon={<Icon name="PhosphorCaretRight" size={iconSize} color="currentColor" />}
      />
      <IconButton
        type="button"
        variant={ButtonVariant.SECONDARY}
        size={size}
        disabled={disabled || !canMoveLeft}
        aria-label={moveSelectedLeftAriaLabel}
        onClick={onMoveLeft}
        icon={<Icon name="PhosphorCaretLeft" size={iconSize} color="currentColor" />}
      />
      {showAllButtons ? (
        <IconButton
          type="button"
          variant={ButtonVariant.SECONDARY}
          size={size}
          disabled={disabled || !canMoveAllLeft}
          aria-label={moveAllLeftAriaLabel}
          onClick={onMoveAllLeft}
          icon={<Icon name="PhosphorCaretDoubleLeft" size={iconSize} color="currentColor" />}
        />
      ) : null}
    </TransferListActionsColumn>
  );
};
