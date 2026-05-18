import type { ReactNode } from 'react';
import type { DataGridExcelExportCellStyle } from '@/types/ui';
import {
  resolveDataGridExcelExportStyleFromPillStatus,
  resolveDataGridExcelExportStyleFromTagColorVariant,
} from './dataGridExcelExportPresetStyleHandlers';

/**
 * Пытается извлечь стиль ячейки Excel из пропсов React-компонента (Tag, Pill и т.п.).
 * @param node — результат `columns[].render`
 */
export function extractDataGridExcelExportStyleFromReactNode(
  node: ReactNode,
): DataGridExcelExportCellStyle | undefined {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return undefined;
  }
  if (Array.isArray(node)) {
    for (const part of node) {
      const extracted = extractDataGridExcelExportStyleFromReactNode(part);
      if (extracted) {
        return extracted;
      }
    }
    return undefined;
  }
  if (typeof node !== 'object' || !('props' in node)) {
    return undefined;
  }

  const elementProps = (node as { props?: Record<string, unknown> }).props;
  if (!elementProps) {
    return undefined;
  }

  const dataStatus = elementProps['data-status'];
  if (typeof dataStatus === 'string') {
    const fromPill = resolveDataGridExcelExportStyleFromPillStatus(dataStatus);
    if (fromPill) {
      return fromPill;
    }
  }

  const pillStatus = elementProps.status;
  if (typeof pillStatus === 'string') {
    const fromPillStatus = resolveDataGridExcelExportStyleFromPillStatus(pillStatus);
    if (fromPillStatus) {
      return fromPillStatus;
    }
  }

  const tagColorVariant = elementProps.colorVariant;
  if (typeof tagColorVariant === 'string') {
    const fromTag = resolveDataGridExcelExportStyleFromTagColorVariant(tagColorVariant);
    if (fromTag) {
      return fromTag;
    }
  }

  if (elementProps.children !== undefined) {
    return extractDataGridExcelExportStyleFromReactNode(elementProps.children as ReactNode);
  }

  return undefined;
}
