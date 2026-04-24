import styled, { css } from 'styled-components';
import { BorderRadiusHandler } from '../../../handlers/uiHandlers';
import { Size } from '../../../types/sizes';

/** Размеры ячеек дня по размеру календаря */
const dayCellSize = (size: Size | undefined): string => {
  switch (size) {
    case Size.SM:
      return '32px';
    case Size.LG:
      return '44px';
    case Size.XL:
      return '48px';
    default:
      return '40px';
  }
};

const titleSize = (size: Size | undefined): string => {
  switch (size) {
    case Size.SM:
      return '14px';
    case Size.LG:
      return '18px';
    case Size.XL:
      return '20px';
    default:
      return '16px';
  }
};

/**
 * Карточка календаря.
 * @property $size - Влияет на отступы и размер шрифта заголовка.
 */
export const CalendarRoot = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$size', '$embedded'].includes(prop),
})<{ $size?: Size; $embedded?: boolean }>`
  box-sizing: border-box;
  padding: ${({ $size, $embedded }) => {
    if ($embedded) {
      return '0';
    }
    return $size === Size.SM ? '12px' : $size === Size.LG ? '20px' : '16px';
  }};
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: ${({ $embedded, theme }) =>
    $embedded ? 'none' : `1px solid ${theme.colors.border}`};
  box-shadow: ${({ $embedded, theme }) => ($embedded ? 'none' : theme.boxShadow.md)};
  max-width: 100%;
`;

/**
 * Заголовок «Календарь» над панелью.
 * @property $size - Размер шрифта.
 */
export const CalendarTitle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$size',
})<{ $size?: Size }>`
  text-align: center;
  font-weight: 600;
  font-size: ${({ $size }) => titleSize($size)};
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`;

/** Верхняя строка: выбор месяца и стрелки */
export const CalendarToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
`;

/** Обёртка триггера месяца + выпадающего списка */
export const CalendarMonthDropdownWrap = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
`;

/** Два триггера «месяц» и «год» в одной строке (`monthYearLayout="split"`) */
export const CalendarSplitMonthYearRow = styled.div`
  display: flex;
  flex: 1;
  gap: 8px;
  min-width: 0;
  align-items: stretch;
`;

/**
 * Кнопка «месяц год» с шевроном.
 * @property $open - Выпадающий список открыт (поворот шеврона).
 * @property $disabled - Заблокирована.
 */
export const CalendarMonthTrigger = styled.button.withConfig({
  shouldForwardProp: (prop) => !['$open', '$disabled'].includes(prop),
})<{ $open?: boolean; $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  padding: 6px 10px;
  margin: 0;
  border: 1px solid transparent;
  border-radius: 9999px;
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-weight: 600;
  font-size: 15px;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.text};
  text-align: left;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.backgroundTertiary};
  }

  ${({ $open, theme }) =>
    $open &&
    css`
      background: ${theme.colors.backgroundSecondary};
      border-color: ${theme.colors.borderSecondary};
    `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;

export const CalendarMonthTriggerLabel = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/** Текст месяца без выпадающего списка (`showMonthPicker={false}`) */
export const CalendarReadonlyMonth = styled.div`
  flex: 1;
  min-width: 0;
  font-weight: 600;
  font-size: 15px;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/** Поворот шеврона при открытом списке месяцев */
export const CalendarChevronFlip = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== '$open',
})<{ $open?: boolean }>`
  display: inline-flex;
  flex-shrink: 0;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

export const CalendarNavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

/**
 * Стрелка переключения месяца.
 * @property $disabled - Неактивна.
 */
export const CalendarNavButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== '$disabled',
})<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.textTertiary : theme.colors.textSecondary};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.backgroundTertiary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

/** Строка заголовков дней недели; колонки совпадают с сеткой дней по ширине ячейки */
export const CalendarWeekdays = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$size',
})<{ $size?: Size }>`
  display: grid;
  grid-template-columns: repeat(7, ${({ $size }) => dayCellSize($size)});
  gap: 4px;
  margin-bottom: 6px;
`;

export const CalendarWeekdayCell = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 4px 0;
`;

/** Сетка дней: фиксированная ширина колонок, без растягивания во внешнем широком контейнере */
export const CalendarGrid = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$size',
})<{ $size?: Size }>`
  display: grid;
  grid-template-columns: repeat(7, ${({ $size }) => dayCellSize($size)});
  gap: 6px;
`;

/** Подвал календаря (кнопки действий) */
export const CalendarFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSecondary};
`;

/**
 * Кнопка дня (круг).
 * @property $size - Диаметр ячейки.
 * @property $inCurrentMonth - День видимого месяца.
 * @property $selected - Выбранная дата (одиночный режим).
 * @property $rangeStart / $rangeEnd - Границы диапазона (режим range).
 * @property $inRange - День внутри диапазона (не граница).
 * @property $today - Сегодняшний день.
 * @property $disabled - Недоступен для выбора.
 */
export const CalendarDayButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    ![
      '$size',
      '$inCurrentMonth',
      '$selected',
      '$today',
      '$disabled',
      '$inRange',
      '$rangeStart',
      '$rangeEnd',
    ].includes(prop),
})<{
  $size?: Size;
  $inCurrentMonth: boolean;
  $selected: boolean;
  $today: boolean;
  $disabled?: boolean;
  $inRange?: boolean;
  $rangeStart?: boolean;
  $rangeEnd?: boolean;
}>`
  width: ${({ $size }) => dayCellSize($size)};
  height: ${({ $size }) => dayCellSize($size)};
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-radius: 50%;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ theme, $selected, $rangeStart, $rangeEnd, $inRange, $inCurrentMonth, $today, $disabled }) => {
    if ($disabled) {
      return css`
        border: 2px solid transparent;
        background: ${theme.colors.backgroundTertiary};
        color: ${theme.colors.textTertiary};
        opacity: 0.55;
      `;
    }
    /* Круг выбранного дня — яркий синий как в макете (`info`), не тёмный `primary` бренда */
    if ($rangeStart || $rangeEnd || $selected) {
      return css`
        border: 2px solid transparent;
        background: ${theme.colors.info};
        color: ${theme.colors.backgroundSecondary};
      `;
    }
    // Дни между началом и концом: светлая подложка и акцентный текст (не тёмный primaryHover — иначе цифры нечитаемы)
    if ($inRange) {
      return css`
        border: 1px solid ${theme.colors.primary};
        border-radius: 50%;
        background: color-mix(in srgb, ${theme.colors.primary} 14%, ${theme.colors.backgroundSecondary});
        color: ${theme.colors.primary};
        &:hover {
          background: color-mix(in srgb, ${theme.colors.primary} 24%, ${theme.colors.backgroundSecondary});
          color: ${theme.colors.primaryActive};
          border-color: ${theme.colors.primaryActive};
        }
      `;
    }
    if ($inCurrentMonth) {
      return css`
        border: ${$today ? `2px solid ${theme.colors.info}` : `1px solid ${theme.colors.borderSecondary}`};
        background: ${theme.colors.backgroundSecondary};
        color: ${theme.colors.text};
        &:hover {
          border-color: ${theme.colors.info};
          color: ${theme.colors.info};
        }
      `;
    }
    return css`
      border: 1px solid transparent;
      background: transparent;
      color: ${theme.colors.textTertiary};
      opacity: 0.45;
      &:hover:not(:disabled) {
        opacity: 0.75;
      }
    `;
  }}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
