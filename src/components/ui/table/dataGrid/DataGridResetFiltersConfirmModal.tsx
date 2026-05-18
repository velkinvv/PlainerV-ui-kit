import React, { useCallback, useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { ButtonVariant } from '@/types/ui';
import { ModalSize } from '@/types/sizes';
import {
  resolveDataGridResetFiltersConfirmTexts,
  type DataGridResetFiltersConfirmTexts,
} from './dataGridResetFiltersConfirmHandlers';

/**
 * Модальное окно подтверждения сброса всех фильтров таблицы.
 *
 * @param isOpen — открыта ли модалка
 * @param onClose — закрытие без сброса (отмена, оверлей, Escape, крестик)
 * @param onConfirm — подтверждённый сброс фильтров
 * @param texts — необязательные переопределения заголовка и подписей кнопок
 */
export type DataGridResetFiltersConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  texts?: DataGridResetFiltersConfirmTexts;
};

/**
 * Диалог подтверждения для кнопки сброса фильтров в `headerToolbar` **DataGrid**.
 */
export function DataGridResetFiltersConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  texts,
}: DataGridResetFiltersConfirmModalProps): React.ReactElement {
  const resolvedTexts = useMemo(() => resolveDataGridResetFiltersConfirmTexts(texts), [texts]);

  const handleConfirm = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  const modalButtons = useMemo(
    () => [
      {
        label: resolvedTexts.cancelLabel,
        variant: ButtonVariant.OUTLINE,
        placement: 'secondary' as const,
        onClick: onClose,
      },
      {
        label: resolvedTexts.confirmLabel,
        variant: ButtonVariant.PRIMARY,
        placement: 'primary' as const,
        onClick: handleConfirm,
      },
    ],
    [handleConfirm, onClose, resolvedTexts.cancelLabel, resolvedTexts.confirmLabel],
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={resolvedTexts.title}
      description={resolvedTexts.description}
      size={ModalSize.SM}
      modalVariant="info"
      buttons={modalButtons}
      closeOnOverlayClick
      closeOnEscape
    />
  );
}

DataGridResetFiltersConfirmModal.displayName = 'DataGridResetFiltersConfirmModal';
