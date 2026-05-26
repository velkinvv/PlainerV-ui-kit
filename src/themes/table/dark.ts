import { Size } from '../../types/sizes';
import type { TableTheme } from '../../types/theme';
import { darkCardTheme } from '../card/dark';
import { darkColors } from '../colors/dark';
import { colors } from '../../variables/colors';
import { darkShadows } from '../../variables/shadows';

/**
 * Тёмная тема для таблицы (`Table`, `DataGrid`): скругления, фоны, зебра, состояния строк.
 */
export const darkTableTheme: TableTheme = {
  /** Источник скругления таблицы (`tableBorderRadiusFromTheme`); по умолчанию как у Card MD. */
  borderRadius: darkCardTheme.sizes[Size.MD].borderRadius,
  shell: {
    border: `1px solid ${colors.grey[600]}`,
    background: darkColors.card,
    insetPadding: darkCardTheme.sizes[Size.MD].padding,
    insetFrameBackground: darkColors.card,
    insetSurfaceBackground: darkColors.card,
    insetSurfaceBorder: `1px solid ${colors.grey[600]}`,
    insetSurfaceBorderRadius: darkCardTheme.sizes[Size.SM].borderRadius,
  },
  header: {
    background: colors.grey[800],
    borderBottom: `1px solid ${colors.grey[700]}`,
  },
  footerSection: {
    background: darkColors.card,
  },
  cell: {
    text: colors.neutral[10],
    textHead: colors.grey[300],
    headBorderBottom: `1px solid ${colors.grey[600]}`,
    headActiveSortBorderBottom: `3px solid ${colors.neutral[10]}`,
    headColumnDivider: colors.grey[600],
  },
  body: {
    rowBorder: colors.grey[700],
  },
  zebra: {
    oddRowBackground: 'rgba(255, 255, 255, 0.02)',
  },
  row: {
    selectedBackground: 'rgba(255, 255, 255, 0.08)',
    hoverBackground: 'rgba(255, 255, 255, 0.04)',
    draggingBackground: 'rgba(255, 255, 255, 0.06)',
    draggingOutline: colors.primary[400],
    draggingBoxShadow: darkShadows.md,
  },
  pagination: {
    borderTop: `1px solid ${colors.grey[600]}`,
    textSecondary: colors.grey[300],
  },
  loadingOverlay: {
    background: 'rgba(0, 0, 0, 0.35)',
  },
};
