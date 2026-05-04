import type { TableTheme } from '../../types/theme';
import { colors } from '../../variables/colors';
import { lightShadows } from '../../variables/shadows';

/**
 * Светлая тема для таблицы (`Table`, `DataGrid`): скругления, фоны, зебра, состояния строк.
 */
export const lightTableTheme: TableTheme = {
  borderRadius: '12px',
  shell: {
    border: `1px solid ${colors.grey[200]}`,
    background: colors.neutral[10],
  },
  header: {
    background: colors.grey[200],
    borderBottom: `1px solid ${colors.grey[300]}`,
  },
  footerSection: {
    background: colors.neutral[10],
  },
  cell: {
    text: colors.grey[900],
    textHead: colors.grey[600],
    headBorderBottom: `1px solid ${colors.grey[200]}`,
    headActiveSortBorderBottom: `3px solid ${colors.grey[900]}`,
    headColumnDivider: colors.grey[300],
  },
  body: {
    rowBorder: colors.grey[200],
  },
  zebra: {
    oddRowBackground: colors.grey[100],
  },
  row: {
    selectedBackground: `color-mix(in srgb, ${colors.blue[600]} 10%, ${colors.neutral[10]})`,
    hoverBackground: `color-mix(in srgb, ${colors.blue[600]} 6%, ${colors.neutral[10]})`,
    draggingBackground: `color-mix(in srgb, ${colors.blue[600]} 14%, ${colors.neutral[10]})`,
    draggingOutline: colors.blue[600],
    draggingBoxShadow: lightShadows.md,
  },
  pagination: {
    borderTop: `1px solid ${colors.grey[200]}`,
    textSecondary: colors.grey[600],
  },
  loadingOverlay: {
    background: 'rgba(255, 255, 255, 0.55)',
  },
};
