import React, { useMemo } from 'react';
import { ButtonVariant } from '@/types/ui';
import { Size, IconSize } from '@/types/sizes';
import { Button } from '../../buttons/Button/Button';
import { Icon } from '../../Icon/Icon';
import {
  DATA_GRID_ERROR_STATE_DEFAULT_DESCRIPTION,
  DATA_GRID_ERROR_STATE_DEFAULT_RETRY_LABEL,
  DATA_GRID_ERROR_STATE_DEFAULT_TITLE,
  getDataGridErrorMessage,
} from './dataGridDataStatusHandlers';
import {
  DataGridErrorStateActions,
  DataGridErrorStateDescription,
  DataGridErrorStateIconWrap,
  DataGridErrorStateRoot,
  DataGridErrorStateTitle,
} from './DataGridErrorState.style';

/**
 * Блок ошибки загрузки данных **DataGrid** (шапка таблицы остаётся на месте).
 *
 * @param title — заголовок
 * @param description — пояснение; если не задано, берётся текст из `error` или значение по умолчанию
 * @param error — объект или строка ошибки для извлечения сообщения
 * @param onRetry — обработчик кнопки «Повторить»; кнопка не показывается, если не передан
 * @param retryLabel — подпись кнопки повтора
 * @param compact — уменьшенные отступы (раскрытая подстрока)
 */
export type DataGridErrorStateProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  error?: unknown;
  onRetry?: () => void;
  retryLabel?: React.ReactNode;
  compact?: boolean;
};

/**
 * Встроенное состояние ошибки таблицы с иконкой и опциональной кнопкой повтора.
 */
export function DataGridErrorState({
  title = DATA_GRID_ERROR_STATE_DEFAULT_TITLE,
  description,
  error,
  onRetry,
  retryLabel = DATA_GRID_ERROR_STATE_DEFAULT_RETRY_LABEL,
  compact = false,
}: DataGridErrorStateProps): React.ReactElement {
  const resolvedDescription = useMemo(() => {
    if (description != null && description !== '') {
      return description;
    }
    return getDataGridErrorMessage(error, DATA_GRID_ERROR_STATE_DEFAULT_DESCRIPTION);
  }, [description, error]);

  return (
    <DataGridErrorStateRoot role="alert" aria-live="assertive" $compact={compact}>
      <DataGridErrorStateIconWrap aria-hidden $compact={compact}>
        <Icon name="IconExDanger" size={compact ? IconSize.SM : IconSize.LG} color="currentColor" />
      </DataGridErrorStateIconWrap>
      {title ? <DataGridErrorStateTitle $compact={compact}>{title}</DataGridErrorStateTitle> : null}
      {resolvedDescription ? (
        <DataGridErrorStateDescription $compact={compact}>
          {resolvedDescription}
        </DataGridErrorStateDescription>
      ) : null}
      {onRetry ? (
        <DataGridErrorStateActions>
          <Button variant={ButtonVariant.SECONDARY} size={Size.SM} onClick={onRetry}>
            {retryLabel}
          </Button>
        </DataGridErrorStateActions>
      ) : null}
    </DataGridErrorStateRoot>
  );
}

DataGridErrorState.displayName = 'DataGridErrorState';
