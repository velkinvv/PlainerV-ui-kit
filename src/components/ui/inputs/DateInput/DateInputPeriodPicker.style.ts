import styled from 'styled-components';
import { createStyledShouldForwardProp } from '../../../../handlers/styledComponentHandlers';
import { resolveControlBorderRadius } from '../../../../handlers/controlChromeHandlers';
import { Size } from '../../../../types/sizes';

/**
 * Сетка месяцев (3 колонки) или годов.
 * @property $columns - Число колонок
 */
export const DateInputPeriodGrid = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns ?? 3}, minmax(0, 1fr));
  gap: 6px;
`;

/** Обёртка списков месяца и года */
export const DateInputPeriodPickerRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 280px;
`;

/** Подпись группы (месяцы / годы) */
export const DateInputPeriodSectionTitle = styled.h3`
  margin: 0 0 8px;
  padding: 0;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** Секция списка с заголовком */
export const DateInputPeriodSection = styled.section`
  min-width: 0;
`;

/** Прокрутка длинного списка годов */
export const DateInputPeriodYearScroller = styled.div`
  max-height: 220px;
  overflow-y: auto;
  padding-right: 2px;
`;

/**
 * Кнопка месяца или года.
 * @property $selected - Выбранный период
 * @property $today - Текущий месяц или год
 * @property $disabled - Недоступен
 * @property $inRange - Внутри диапазона
 * @property $rangeStart / $rangeEnd - Границы диапазона
 * @property $size - Размер контрола
 */
export const DateInputPeriodItemButton = styled.button.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{
  $size?: Size;
  $selected: boolean;
  $today: boolean;
  $disabled?: boolean;
  $inRange?: boolean;
  $rangeStart?: boolean;
  $rangeEnd?: boolean;
  $capitalize?: boolean;
}>`
  box-sizing: border-box;
  margin: 0;
  width: 100%;
  min-height: ${({ $size }) => {
    switch ($size) {
      case Size.SM:
        return '32px';
      case Size.LG:
        return '44px';
      default:
        return '40px';
    }
  }};
  padding: 6px 8px;
  border-radius: ${({ theme }) => resolveControlBorderRadius(theme.borderRadius)};
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.2;
  text-align: center;
  text-transform: ${({ $capitalize }) => ($capitalize === false ? 'none' : 'capitalize')};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

  ${({ theme, $selected, $rangeStart, $rangeEnd, $inRange, $today, $disabled }) => {
    if ($disabled) {
      return `
        border: 1px solid transparent;
        background: ${theme.colors.backgroundTertiary};
        color: ${theme.colors.textTertiary};
        opacity: 0.55;
      `;
    }

    if ($rangeStart || $rangeEnd || $selected) {
      return `
        border: 2px solid transparent;
        background: ${theme.colors.info};
        color: ${theme.colors.backgroundSecondary};
      `;
    }

    if ($inRange) {
      return `
        border: 1px solid ${theme.colors.primary};
        background: color-mix(in srgb, ${theme.colors.primary} 14%, ${theme.colors.backgroundSecondary});
        color: ${theme.colors.primary};
      `;
    }

    return `
      border: ${$today ? `2px solid ${theme.colors.info}` : `1px solid ${theme.colors.borderSecondary}`};
      background: ${theme.colors.backgroundSecondary};
      color: ${theme.colors.text};

      &:hover {
        border-color: ${theme.colors.info};
        color: ${theme.colors.info};
      }
    `;
  }}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

/** Две строки в кнопке недели: номер и диапазон дней */
export const DateInputPeriodItemStack = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 0;
`;

/** Вторичная подпись диапазона дней недели */
export const DateInputPeriodItemHint = styled.span`
  font-size: 11px;
  font-weight: 400;
  line-height: 1.2;
  opacity: 0.85;
`;
