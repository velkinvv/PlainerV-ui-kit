import React, { useCallback, useState } from 'react';
import { ButtonVariant } from '@/types/ui';
import { IconSize, Size } from '@/types/sizes';
import { Icon } from '@/components/ui/Icon/Icon';
import { IconButton } from '@/components/ui/buttons/IconButton/IconButton';
import { TableHeaderFilterIconButton } from '../basicTable/tableHeaderFilterIconButton.style';
import { DataGridHeaderToolbarBuiltinActionsGroup } from './DataGrid.style';
import { DataGridResetFiltersConfirmModal } from './DataGridResetFiltersConfirmModal';
import type { DataGridResetFiltersConfirmTexts } from './dataGridResetFiltersConfirmHandlers';

/**
 * Встроенные действия строки `headerToolbar` у **DataGrid**.
 *
 * @param size — размер грида (**Size**), для кнопок
 * @param refetch — при передаче показывается кнопка обновления данных
 * @param isRefetching — индикатор загрузки на кнопке обновления
 * @param onResetFilters — при передаче показывается кнопка сброса фильтров (с модалкой подтверждения)
 * @param hasActiveFilters — подсветка «фильтры применены» (как `filterApplied` у колонки)
 * @param resetFiltersConfirmTexts — переопределение текстов модалки подтверждения сброса
 */
export type DataGridHeaderToolbarBuiltinActionsProps = {
  size: Size;
  refetch?: () => void | Promise<void>;
  isRefetching?: boolean;
  onResetFilters?: () => void;
  hasActiveFilters?: boolean;
  resetFiltersConfirmTexts?: DataGridResetFiltersConfirmTexts;
};

/**
 * Кнопки «обновить» и «сбросить фильтры» для панели над шапкой таблицы.
 */
export function DataGridHeaderToolbarBuiltinActions({
  size,
  refetch,
  isRefetching = false,
  onResetFilters,
  hasActiveFilters = false,
  resetFiltersConfirmTexts,
}: DataGridHeaderToolbarBuiltinActionsProps): React.ReactElement | null {
  const iconButtonSize = size === Size.SM || size === Size.XS ? Size.SM : Size.MD;
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleRefetchClick = useCallback(() => {
    void refetch?.();
  }, [refetch]);

  const handleResetFiltersRequest = useCallback(() => {
    setIsResetConfirmOpen(true);
  }, []);

  const handleResetConfirmClose = useCallback(() => {
    setIsResetConfirmOpen(false);
  }, []);

  const handleResetFiltersConfirm = useCallback(() => {
    onResetFilters?.();
  }, [onResetFilters]);

  const showRefetchButton = typeof refetch === 'function';
  const showResetFiltersButton = typeof onResetFilters === 'function';

  if (!showRefetchButton && !showResetFiltersButton) {
    return null;
  }

  return (
    <>
      <DataGridHeaderToolbarBuiltinActionsGroup>
        {showResetFiltersButton ? (
          <TableHeaderFilterIconButton
            type="button"
            $filterApplied={Boolean(hasActiveFilters)}
            aria-label={
              hasActiveFilters
                ? 'Сбросить все фильтры, фильтры применены'
                : 'Сбросить все фильтры'
            }
            disabled={!hasActiveFilters}
            onClick={handleResetFiltersRequest}
          >
            <Icon
              name={hasActiveFilters ? 'IconExFilterFilled' : 'IconExFilter'}
              size={IconSize.XS}
              color="currentColor"
            />
          </TableHeaderFilterIconButton>
        ) : null}
        {showRefetchButton ? (
          <IconButton
            variant={ButtonVariant.GHOST}
            size={iconButtonSize}
            loading={isRefetching}
            aria-label="Обновить данные"
            showTooltip
            tooltipText="Обновить данные"
            icon={<Icon name="PhosphorArrowsClockwise" size={IconSize.SM} color="currentColor" />}
            onClick={handleRefetchClick}
          />
        ) : null}
      </DataGridHeaderToolbarBuiltinActionsGroup>
      {showResetFiltersButton ? (
        <DataGridResetFiltersConfirmModal
          isOpen={isResetConfirmOpen}
          onClose={handleResetConfirmClose}
          onConfirm={handleResetFiltersConfirm}
          texts={resetFiltersConfirmTexts}
        />
      ) : null}
    </>
  );
}

DataGridHeaderToolbarBuiltinActions.displayName = 'DataGridHeaderToolbarBuiltinActions';
