import type { TableTheme } from '../../types/theme';
import { colors } from '../../variables/colors';
import { darkShadows } from '../../variables/shadows';

/**
 * Тёмная тема для таблицы (`Table`, `DataGrid`): скругления, фоны, зебра, состояния строк.
 */
export const darkTableTheme: TableTheme = {
  borderRadius: '12px',
  shell: {
    border: `1px solid ${colors.blue[600]}`,
    background: colors.blue['A700'],
  },
  header: {
    background: colors.blue[800],
    borderBottom: `1px solid ${colors.blue[500]}`,
  },
  footerSection: {
    background: colors.blue['A700'],
  },
  cell: {
    text: colors.neutral[10],
    textHead: colors.grey[300],
    headBorderBottom: `1px solid ${colors.blue[600]}`,
    headActiveSortBorderBottom: `3px solid ${colors.neutral[10]}`,
    headColumnDivider: colors.blue[500],
  },
  body: {
    rowBorder: colors.blue[600],
  },
  zebra: {
    oddRowBackground: 'rgba(255, 255, 255, 0.02)',
  },
  row: {
    selectedBackground: 'rgba(255, 255, 255, 0.08)',
    hoverBackground: 'rgba(255, 255, 255, 0.04)',
    draggingBackground: 'rgba(255, 255, 255, 0.06)',
    draggingOutline: colors.blue[400],
    draggingBoxShadow: darkShadows.md,
  },
  pagination: {
    borderTop: `1px solid ${colors.blue[600]}`,
    textSecondary: colors.grey[300],
  },
  loadingOverlay: {
    background: 'rgba(0, 0, 0, 0.35)',
  },
};
