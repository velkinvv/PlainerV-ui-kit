import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ButtonVariant,
  type DataGridBaseRow,
  type DataGridColumn,
  type DataGridExcelExportColumn,
  type DataGridExcelExportConfig,
  type DataGridExcelExportProgress,
} from '@/types/ui';
import { IconSize, Size } from '@/types/sizes';
import { Icon } from '@/components/ui/Icon/Icon';
import { IconButton } from '@/components/ui/buttons/IconButton/IconButton';
import {
  buildDataGridExcelExportSpreadsheet,
  downloadDataGridExcelSpreadsheetFile,
} from './dataGridExcelExportSpreadsheetHandlers';
import { DataGridExcelExportModal } from './DataGridExcelExportModal';
import {
  calculateDataGridExcelExportTotalPages,
  createDataGridExcelExportInitialPageRange,
  hasDataGridExcelExportPageRangeErrors,
  parseDataGridExcelExportPageNumber,
  validateDataGridExcelExportPageRange,
} from './dataGridExcelExportPageRangeHandlers';
import {
  resolveDataGridExcelExportTexts,
  type DataGridExcelExportPageRangeForm,
} from './dataGridExcelExportTextHandlers';

/**
 * Кнопка выгрузки **DataGrid** в Excel и связанная модалка диапазона страниц.
 *
 * @param size — размер грида (для **IconButton**)
 * @param totalCount — всего записей в наборе
 * @param pageSize — строк на странице
 * @param currentPage — текущая страница грида (0-based); для подстановки в форму (1-based)
 * @param gridColumns — колонки грида
 * @param exportColumns — колонки файла
 * @param excelExport — конфигурация выгрузки
 */
export type DataGridExcelExportButtonProps<Row extends DataGridBaseRow> = {
  size: Size;
  totalCount: number;
  pageSize: number;
  currentPage: number;
  gridColumns: readonly DataGridColumn<Row>[];
  exportColumns: readonly DataGridExcelExportColumn[];
  excelExport: DataGridExcelExportConfig<Row>;
};

/**
 * Иконка и модалка выгрузки в `headerToolbar`.
 */
export function DataGridExcelExportButton<Row extends DataGridBaseRow>({
  size,
  totalCount,
  pageSize,
  currentPage,
  gridColumns,
  exportColumns,
  excelExport,
}: DataGridExcelExportButtonProps<Row>): React.ReactElement {
  const resolvedTexts = useMemo(
    () => resolveDataGridExcelExportTexts(excelExport.texts),
    [excelExport.texts],
  );

  const totalPages = useMemo(
    () => calculateDataGridExcelExportTotalPages(totalCount, pageSize),
    [totalCount, pageSize],
  );

  const initialPageOneBased = Math.max(1, currentPage + 1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<DataGridExcelExportProgress | null>(null);
  const [form, setForm] = useState<DataGridExcelExportPageRangeForm>(() =>
    createDataGridExcelExportInitialPageRange(initialPageOneBased, initialPageOneBased),
  );

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }
    setForm(createDataGridExcelExportInitialPageRange(initialPageOneBased, initialPageOneBased));
  }, [initialPageOneBased, isModalOpen]);

  const formErrors = useMemo(
    () => validateDataGridExcelExportPageRange(form, totalPages),
    [form, totalPages],
  );

  const handleAbortExport = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    if (isLoading) {
      handleAbortExport();
    }
    setIsModalOpen(false);
    setIsLoading(false);
    setProgress(null);
  }, [handleAbortExport, isLoading]);

  const handleFormChange = useCallback((patch: Partial<DataGridExcelExportPageRangeForm>) => {
    setForm((previous) => ({ ...previous, ...patch }));
  }, []);

  const handleExport = useCallback(async () => {
    if (hasDataGridExcelExportPageRangeErrors(formErrors)) {
      return;
    }

    const startPage = parseDataGridExcelExportPageNumber(form.startPage);
    const endPage = parseDataGridExcelExportPageNumber(form.endPage);
    const exportFileName = excelExport.fileName ?? `Выгрузка_${Date.now()}.xls`;

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setIsLoading(true);
    setProgress({ loaded: 0, total: 1 });

    try {
      const xml = await buildDataGridExcelExportSpreadsheet<Row>({
        dataFetcher: excelExport.dataFetcher,
        exportColumns,
        gridColumns,
        totalCount,
        pageSize,
        startPage,
        endPage,
        sheetName: excelExport.sheetName,
        mapRowData: excelExport.mapRowData,
        signal: controller.signal,
        onProgress: (nextProgress) => {
          setProgress(nextProgress);
        },
      });

      downloadDataGridExcelSpreadsheetFile(xml, exportFileName);
      excelExport.onSuccess?.();
      setIsModalOpen(false);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      excelExport.onError?.(error);
    } finally {
      setIsLoading(false);
      setProgress(null);
      abortControllerRef.current = null;
    }
  }, [excelExport, exportColumns, form, formErrors, gridColumns, pageSize, totalCount]);

  const handleModalExport = useCallback(() => {
    void handleExport();
  }, [handleExport]);

  const iconButtonSize = size === Size.SM || size === Size.XS ? Size.SM : Size.MD;
  const isDisabled = totalCount <= 0 || excelExport.disabled === true;

  return (
    <>
      <IconButton
        variant={ButtonVariant.GHOST}
        size={iconButtonSize}
        loading={isLoading}
        disabled={isDisabled}
        aria-label={resolvedTexts.exportButtonAriaLabel}
        showTooltip
        tooltipText={resolvedTexts.tooltipText}
        icon={<Icon name="IconExDocument" size={IconSize.SM} color="currentColor" />}
        onClick={handleOpenModal}
      />
      <DataGridExcelExportModal
        isOpen={isModalOpen}
        isLoading={isLoading}
        progress={progress}
        form={form}
        formErrors={formErrors}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={pageSize}
        texts={resolvedTexts}
        onClose={handleCloseModal}
        onFormChange={handleFormChange}
        onExport={handleModalExport}
      />
    </>
  );
}

DataGridExcelExportButton.displayName = 'DataGridExcelExportButton';
