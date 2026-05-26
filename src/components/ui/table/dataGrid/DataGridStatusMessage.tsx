import React from 'react';
import type { DataGridStatusMessageVariant } from '@/types/ui';
import { IconSize } from '@/types/sizes';
import { Icon } from '../../Icon/Icon';
import {
  DataGridStatusMessageIconWrap,
  DataGridStatusMessageRoot,
  DataGridStatusMessageText,
} from './DataGridStatusMessage.style';

/**
 * Информационная полоса в теле **DataGrid** (над строками данных).
 *
 * @param message — текст или произвольный React-узел
 * @param variant — визуальный тон: `info`, `warning`, `success`
 */
export type DataGridStatusMessageProps = {
  message: React.ReactNode;
  variant?: DataGridStatusMessageVariant;
};

const statusMessageIconByVariant: Record<DataGridStatusMessageVariant, 'IconExInfoCircle'> = {
  info: 'IconExInfoCircle',
  warning: 'IconExInfoCircle',
  success: 'IconExInfoCircle',
};

/**
 * Полоса статуса/подсказки над данными таблицы.
 */
export function DataGridStatusMessage({
  message,
  variant = 'info',
}: DataGridStatusMessageProps): React.ReactElement {
  return (
    <DataGridStatusMessageRoot role="status" aria-live="polite" $variant={variant}>
      <DataGridStatusMessageIconWrap aria-hidden>
        <Icon name={statusMessageIconByVariant[variant]} size={IconSize.SM} color="currentColor" />
      </DataGridStatusMessageIconWrap>
      <DataGridStatusMessageText>{message}</DataGridStatusMessageText>
    </DataGridStatusMessageRoot>
  );
}

DataGridStatusMessage.displayName = 'DataGridStatusMessage';
