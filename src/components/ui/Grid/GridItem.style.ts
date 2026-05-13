import styled, { css } from 'styled-components';
import type { GridItemProps } from '../../../types/ui';

// Утилиты для форматирования значений
const formatValue = (value: number | string | undefined): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `${value}`;
  return value;
};

/**
 * Обертка для элемента сетки
 * @param column - позиция колонки
 * @param row - позиция строки
 * @param columnSpan - растяжение по колонкам
 * @param rowSpan - растяжение по строкам
 * @param area - область сетки
 * @param justifySelf - выравнивание по горизонтали
 * @param alignSelf - выравнивание по вертикали
 * @param placeSelf - выравнивание по обеим осям
 */
export const GridItemWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      'column',
      'row',
      'columnSpan',
      'rowSpan',
      'area',
      'justifySelf',
      'alignSelf',
      'placeSelf',
      'width',
      'height',
      'minWidth',
      'maxWidth',
      'minHeight',
      'maxHeight',
    ].includes(prop),
})<GridItemProps>`
  /* Расположение в сетке */
  ${({ column }) =>
    column &&
    css`
      grid-column: ${formatValue(column)};
    `}
  ${({ row }) =>
    row &&
    css`
      grid-row: ${formatValue(row)};
    `}

  /* Растяжение по колонкам/строкам */
  ${({ columnSpan }) =>
    columnSpan &&
    css`
      grid-column: span ${formatValue(columnSpan)};
    `}
  ${({ rowSpan }) =>
    rowSpan &&
    css`
      grid-row: span ${formatValue(rowSpan)};
    `}

  /* Выравнивание внутри ячейки */
  ${({ justifySelf }) =>
    justifySelf &&
    css`
      justify-self: ${justifySelf};
    `}
  ${({ alignSelf }) =>
    alignSelf &&
    css`
      align-self: ${alignSelf};
    `}

  /* Размеры */
  ${({ width }) =>
    width &&
    css`
      width: ${formatValue(width)};
    `}
  ${({ height }) =>
    height &&
    css`
      height: ${formatValue(height)};
    `}
  ${({ minWidth }) =>
    minWidth &&
    css`
      min-width: ${formatValue(minWidth)};
    `}
  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${formatValue(maxWidth)};
    `}
  ${({ minHeight }) =>
    minHeight &&
    css`
      min-height: ${formatValue(minHeight)};
    `}
  ${({ maxHeight }) =>
    maxHeight &&
    css`
      max-height: ${formatValue(maxHeight)};
    `}
`;
