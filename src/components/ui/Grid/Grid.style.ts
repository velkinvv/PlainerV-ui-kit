import styled, { css } from 'styled-components';
import { type GridProps, GridMode } from '../../../types/ui';

// Утилиты для форматирования значений
const formatValue = (value: number | string | undefined): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `${value}px`;
  return value;
};

const formatGridValue = (value: number | string): string => {
  if (typeof value === 'number') {
    return `repeat(${value}, 1fr)`;
  }
  return value;
};

// Функция для преобразования Size enum в пиксели
const sizeToPixels = (value: unknown): string => {
  if (typeof value === 'number') return `${value}px`;
  if (typeof value === 'string') {
    // Обработка enum Size (строковые значения)
    const sizeMap: Record<string, string> = {
      XS: '4px',
      SM: '8px',
      MD: '16px',
      LG: '24px',
      XL: '32px',
    };

    if (sizeMap[value]) {
      return sizeMap[value];
    }

    // Если это не enum значение, возвращаем как есть
    return value;
  }

  return '16px'; // значение по умолчанию
};

// Функция для создания адаптивных стилей
const createResponsiveStyles = (
  breakpoint: keyof Record<string, unknown>,
  value: number | string | undefined,
  property: string,
): string => {
  if (value === undefined) return '';

  const mediaQueries: Record<string, string> = {
    xs: '(min-width: 0px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
  };

  const formattedValue =
    typeof value === 'number' && property.includes('columns')
      ? formatGridValue(value)
      : sizeToPixels(value);

  return `
    @media ${mediaQueries[breakpoint]} {
      ${property}: ${formattedValue};
    }
  `;
};

// Тип для адаптивных значений
type ResponsiveValue = {
  xs?: number | string;
  sm?: number | string;
  md?: number | string;
  lg?: number | string;
  xl?: number | string;
};

// Функция для генерации CSS Grid template
const generateGridTemplate = (
  value: number | string | ResponsiveValue | undefined,
  property: 'columns' | 'rows',
): string => {
  if (!value) return '';

  if (typeof value === 'number' || typeof value === 'string') {
    return `${property === 'columns' ? 'grid-template-columns' : 'grid-template-rows'}: ${formatGridValue(value)};`;
  }

  if (typeof value === 'object') {
    let styles = '';

    // Базовый стиль (xs)
    if (value.xs !== undefined) {
      const formattedValue =
        typeof value.xs === 'number' ? formatGridValue(value.xs) : formatValue(value.xs);
      styles += `${property === 'columns' ? 'grid-template-columns' : 'grid-template-rows'}: ${formattedValue};`;
    }

    // Адаптивные стили
    Object.entries(value).forEach(([breakpoint, val]) => {
      if (breakpoint !== 'xs' && val !== undefined) {
        styles += createResponsiveStyles(
          breakpoint,
          val as number | string,
          `${property === 'columns' ? 'grid-template-columns' : 'grid-template-rows'}`,
        );
      }
    });

    return styles;
  }

  return '';
};

// Функция для генерации gap стилей
const generateGapStyles = (
  value: number | string | ResponsiveValue | undefined,
  property: 'gap' | 'rowGap' | 'columnGap',
): string => {
  if (!value) return '';

  if (typeof value === 'number' || typeof value === 'string') {
    const cssProperty =
      property === 'gap' ? 'gap' : property === 'rowGap' ? 'row-gap' : 'column-gap';
    return `${cssProperty}: ${sizeToPixels(value)};`;
  }

  if (typeof value === 'object') {
    let styles = '';

    // Базовый стиль (xs)
    if (value.xs !== undefined) {
      const cssProperty =
        property === 'gap' ? 'gap' : property === 'rowGap' ? 'row-gap' : 'column-gap';
      styles += `${cssProperty}: ${sizeToPixels(value.xs)};`;
    }

    // Адаптивные стили
    Object.entries(value).forEach(([breakpoint, val]) => {
      if (breakpoint !== 'xs' && val !== undefined) {
        const cssProperty =
          property === 'gap' ? 'gap' : property === 'rowGap' ? 'row-gap' : 'column-gap';
        styles += createResponsiveStyles(breakpoint, val as number | string, cssProperty);
      }
    });

    return styles;
  }

  return '';
};

/**
 * Обертка для Grid компонента
 */
export const GridWrapper = styled.div<GridProps>`
  display: grid;

  /* Режим контейнера */
  ${({ mode, container, theme }) => {
    if (mode === GridMode.CONTAINER || container) {
      return css`
        max-width: ${theme?.sizes?.container?.width || 1200}px;
        margin: 0 auto;
        padding: 0 16px;

        @media (min-width: 576px) {
          padding: 0 24px;
        }

        @media (min-width: 992px) {
          padding: 0 32px;
        }
      `;
    }

    if (mode === GridMode.FULLSCREEN) {
      return css`
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
      `;
    }

    return '';
  }}

  /* Колонки */
  ${({ columns }) => generateGridTemplate(columns, 'columns')}

  /* Строки */
  ${({ rows }) => generateGridTemplate(rows, 'rows')}

  /* Отступы */
  ${({ gap }) => generateGapStyles(gap, 'gap')}
  ${({ rowGap }) => generateGapStyles(rowGap, 'rowGap')}
  ${({ columnGap }) => generateGapStyles(columnGap, 'columnGap')}

  /* Выравнивание */
  ${({ justifyContent }) =>
    justifyContent &&
    css`
      justify-content: ${justifyContent};
    `}

  ${({ alignItems }) =>
    alignItems &&
    css`
      align-items: ${alignItems};
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

  /* Автоматическое размещение */
  ${({ autoFit, minColumnWidth }) =>
    autoFit &&
    minColumnWidth &&
    css`
      grid-template-columns: repeat(auto-fit, minmax(${formatValue(minColumnWidth)}, 1fr));
    `}

  ${({ autoFill, minColumnWidth }) =>
    autoFill &&
    minColumnWidth &&
    css`
      grid-template-columns: repeat(auto-fill, minmax(${formatValue(minColumnWidth)}, 1fr));
    `}

  /* Максимальная ширина колонок */
  ${({ maxColumnWidth }) =>
    maxColumnWidth &&
    css`
      grid-template-columns: repeat(auto-fit, minmax(0, ${formatValue(maxColumnWidth)}));
    `}
`;
