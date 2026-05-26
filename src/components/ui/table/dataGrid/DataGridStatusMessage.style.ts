import styled, { css } from 'styled-components';
import type { DataGridStatusMessageVariant } from '@/types/ui';

const statusMessageVariantStyles: Record<DataGridStatusMessageVariant, ReturnType<typeof css>> = {
  info: css`
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.text};
    border-bottom: ${({ theme }) => theme.tables.cell.headBorderBottom};
  `,
  warning: css`
    background: ${({ theme }) =>
      `color-mix(in srgb, ${theme.colors.warning} 10%, ${theme.colors.backgroundSecondary})`};
    color: ${({ theme }) => theme.colors.text};
    border-bottom: ${({ theme }) => theme.tables.cell.headBorderBottom};
  `,
  success: css`
    background: ${({ theme }) =>
      `color-mix(in srgb, ${theme.colors.success} 10%, ${theme.colors.backgroundSecondary})`};
    color: ${({ theme }) => theme.colors.text};
    border-bottom: ${({ theme }) => theme.tables.cell.headBorderBottom};
  `,
};

/**
 * Информационная полоса над строками данных в `tbody`.
 * @property $variant — тон фона и рамки
 */
export const DataGridStatusMessageRoot = styled.div<{ $variant: DataGridStatusMessageVariant }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  font-size: 14px;
  line-height: 1.45;
  text-align: left;

  ${({ $variant }) => statusMessageVariantStyles[$variant]}
`;

export const DataGridStatusMessageIconWrap = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  line-height: 0;
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const DataGridStatusMessageText = styled.span`
  flex: 1 1 auto;
  min-width: 0;
`;
