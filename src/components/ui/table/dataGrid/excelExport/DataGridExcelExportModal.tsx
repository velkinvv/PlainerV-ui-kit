import React, { useCallback, useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/inputs/Input/Input';
import { Progress } from '@/components/ui/Progress/Progress';
import { ButtonVariant, type DataGridExcelExportProgress } from '@/types/ui';
import { ModalSize, Size } from '@/types/sizes';
import {
  calculateDataGridExcelExportProgressPercent,
  calculateDataGridExcelExportRowCountInRange,
  type DataGridExcelExportPageRangeErrors,
} from './dataGridExcelExportPageRangeHandlers';
import {
  resolveDataGridExcelExportTexts,
  type DataGridExcelExportPageRangeForm,
  type DataGridExcelExportResolvedTexts,
} from './dataGridExcelExportTextHandlers';
import {
  DataGridExcelExportFieldsRow,
  DataGridExcelExportForm,
  DataGridExcelExportHint,
  DataGridExcelExportProgressLabel,
  DataGridExcelExportProgressWrap,
  DataGridExcelExportSummary,
} from './DataGridExcelExportModal.style';

/**
 * Модальное окно выбора диапазона страниц для выгрузки **DataGrid** в Excel.
 *
 * @param isOpen — открыта ли модалка
 * @param isLoading — идёт ли выгрузка (показ прогресса вместо формы)
 * @param progress — загружено / всего строк
 * @param form — значения полей начальной и конечной страницы
 * @param formErrors — ошибки валидации полей
 * @param totalPages — всего страниц в таблице
 * @param totalCount — всего записей
 * @param pageSize — размер страницы
 * @param texts — переопределение текстов
 * @param onClose — закрытие модалки
 * @param onFormChange — изменение полей формы
 * @param onExport — подтверждение выгрузки
 */
export type DataGridExcelExportModalProps = {
  isOpen: boolean;
  isLoading: boolean;
  progress: DataGridExcelExportProgress | null;
  form: DataGridExcelExportPageRangeForm;
  formErrors: DataGridExcelExportPageRangeErrors;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  texts?: DataGridExcelExportResolvedTexts;
  onClose: () => void;
  onFormChange: (patch: Partial<DataGridExcelExportPageRangeForm>) => void;
  onExport: () => void;
};

/**
 * Диалог диапазона страниц и прогресса выгрузки Excel.
 */
export function DataGridExcelExportModal({
  isOpen,
  isLoading,
  progress,
  form,
  formErrors,
  totalPages,
  totalCount,
  pageSize,
  texts: textsOverride,
  onClose,
  onFormChange,
  onExport,
}: DataGridExcelExportModalProps): React.ReactElement {
  const resolvedTexts = useMemo(
    () => textsOverride ?? resolveDataGridExcelExportTexts(),
    [textsOverride],
  );

  const exportRowCount = useMemo(
    () => calculateDataGridExcelExportRowCountInRange(form, totalCount, pageSize),
    [form, totalCount, pageSize],
  );

  const progressPercent = useMemo(() => {
    if (!progress) {
      return 0;
    }
    return calculateDataGridExcelExportProgressPercent(progress.loaded, progress.total);
  }, [progress]);

  const hasFormErrors = Boolean(formErrors.startPage ?? formErrors.endPage);

  const handleStartPageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFormChange({ startPage: event.target.value });
    },
    [onFormChange],
  );

  const handleEndPageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFormChange({ endPage: event.target.value });
    },
    [onFormChange],
  );

  const modalButtons = useMemo(() => {
    if (isLoading) {
      return undefined;
    }
    return [
      {
        label: resolvedTexts.cancelLabel,
        variant: ButtonVariant.OUTLINE,
        placement: 'secondary' as const,
        onClick: onClose,
      },
      {
        label: resolvedTexts.exportLabel,
        variant: ButtonVariant.PRIMARY,
        placement: 'primary' as const,
        onClick: onExport,
        disabled: hasFormErrors || exportRowCount <= 0,
      },
    ];
  }, [
    exportRowCount,
    hasFormErrors,
    isLoading,
    onClose,
    onExport,
    resolvedTexts.cancelLabel,
    resolvedTexts.exportLabel,
  ]);

  const modalContent = isLoading ? (
    <DataGridExcelExportProgressWrap>
      <DataGridExcelExportProgressLabel>
        {resolvedTexts.loadingLabel} {progressPercent}%
      </DataGridExcelExportProgressLabel>
      <Progress value={progressPercent} max={100} variant="linear" size={Size.SM} />
    </DataGridExcelExportProgressWrap>
  ) : (
    <DataGridExcelExportForm>
      <DataGridExcelExportHint>{resolvedTexts.rangeHint}</DataGridExcelExportHint>
      <DataGridExcelExportSummary>
        {resolvedTexts.rowsSummary({ totalRows: totalCount, totalPages })}
      </DataGridExcelExportSummary>
      {exportRowCount > 0 ? (
        <DataGridExcelExportSummary>
          Будет выгружено строк: {exportRowCount}
        </DataGridExcelExportSummary>
      ) : null}
      <DataGridExcelExportFieldsRow>
        <Input
          label={resolvedTexts.startPageLabel}
          placeholder={resolvedTexts.startPagePlaceholder}
          value={form.startPage}
          onChange={handleStartPageChange}
          error={formErrors.startPage}
          type="text"
          inputMode="numeric"
          size={Size.SM}
          displayCharacterCounter={false}
          fullWidth
        />
        <Input
          label={resolvedTexts.endPageLabel}
          placeholder={resolvedTexts.endPagePlaceholder}
          value={form.endPage}
          onChange={handleEndPageChange}
          error={formErrors.endPage}
          type="text"
          inputMode="numeric"
          size={Size.SM}
          displayCharacterCounter={false}
          fullWidth
        />
      </DataGridExcelExportFieldsRow>
    </DataGridExcelExportForm>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={resolvedTexts.modalTitle}
      description={resolvedTexts.modalDescription}
      content={modalContent}
      size={ModalSize.SM}
      modalVariant="info"
      buttons={modalButtons}
      closeOnOverlayClick={!isLoading}
      closeOnEscape={!isLoading}
    />
  );
}

DataGridExcelExportModal.displayName = 'DataGridExcelExportModal';
