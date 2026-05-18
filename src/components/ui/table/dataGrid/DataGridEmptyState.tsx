import React from 'react';
import { IconSize } from '@/types/sizes';
import { Icon } from '@/components/ui/Icon/Icon';
import {
  DataGridEmptyStateDescription,
  DataGridEmptyStateIconWrap,
  DataGridEmptyStateRoot,
  DataGridEmptyStateTitle,
} from './DataGridEmptyState.style';

/** Тексты пустого состояния по умолчанию */
export const DATA_GRID_EMPTY_STATE_DEFAULT_TITLE = 'Ничего не найдено';
export const DATA_GRID_EMPTY_STATE_DEFAULT_DESCRIPTION = 'По заданным критериям ничего не найдено';

/**
 * Пустое состояние тела **DataGrid** (заголовки таблицы остаются видимыми).
 *
 * @param title — заголовок
 * @param description — пояснение под заголовком
 */
export type DataGridEmptyStateProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
};

/**
 * Блок «нет данных» с иконкой поиска для **DataGrid**.
 */
export function DataGridEmptyState({
  title = DATA_GRID_EMPTY_STATE_DEFAULT_TITLE,
  description = DATA_GRID_EMPTY_STATE_DEFAULT_DESCRIPTION,
}: DataGridEmptyStateProps): React.ReactElement {
  return (
    <DataGridEmptyStateRoot role="status" aria-live="polite">
      <DataGridEmptyStateIconWrap aria-hidden>
        <Icon name="IconExSearch" size={IconSize.LG} color="currentColor" />
      </DataGridEmptyStateIconWrap>
      {title ? <DataGridEmptyStateTitle>{title}</DataGridEmptyStateTitle> : null}
      {description ? (
        <DataGridEmptyStateDescription>{description}</DataGridEmptyStateDescription>
      ) : null}
    </DataGridEmptyStateRoot>
  );
}

DataGridEmptyState.displayName = 'DataGridEmptyState';
