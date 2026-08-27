import React, { useEffect, useMemo, useState } from 'react';
import { Size } from '../../../../types/sizes';
import type {
  CalendarSelectionMode,
  DateInputPrecision,
  WeekOfMonthMode,
} from '../../../../types/ui';
import { CalendarFooter } from '../../Calendar/Calendar.style';
import { getRangeDayVisualFlags } from '../../Calendar/handlers';
import {
  createPeriodDate,
  getImplicitYearForMonthPrecision,
  getMonthPeriodLabels,
  isMonthPeriodDisabled,
  isYearPeriodDisabled,
  buildYearList,
} from '../../../../handlers/dateInputPrecisionHandlers';
import {
  formatMonthWeekRangeLabel,
  formatWeekOfMonthOrdinal,
  getMonthWeeks,
  getWeekOfMonthFromDate,
  isWeekPeriodDisabled,
} from '../../../../handlers/dateInputWeekHandlers';
import {
  DateInputPeriodGrid,
  DateInputPeriodItemButton,
  DateInputPeriodItemHint,
  DateInputPeriodItemStack,
  DateInputPeriodPickerRoot,
  DateInputPeriodSection,
  DateInputPeriodSectionTitle,
  DateInputPeriodYearScroller,
} from './DateInputPeriodPicker.style';

export type DateInputPeriodPickerProps = {
  /** Точность без дня: месяц, год, месяц с годом или неделя месяца */
  precision: Exclude<DateInputPrecision, 'day'>;
  /** Нумерация недель при `precision="week"` */
  weekOfMonthMode?: WeekOfMonthMode;
  /** Локаль подписей месяцев */
  locale?: string;
  /** Размер кнопок, как у поля */
  size?: Size;
  /** Полная блокировка пикера */
  disabled?: boolean;
  /** Нижняя граница */
  minDate?: Date;
  /** Верхняя граница */
  maxDate?: Date;
  /** Та же проверка, что у календарных дней DateInput */
  isDateDisabled: (date: Date) => boolean;
  /** Одиночный выбор или диапазон */
  selectionMode?: CalendarSelectionMode;
  /** Выбранная дата в одиночном режиме */
  selectedDate?: Date | null;
  /** Начало диапазона */
  rangeStart?: Date | null;
  /** Конец диапазона */
  rangeEnd?: Date | null;
  /** Предпросмотр конца диапазона при наведении */
  rangeHoverDate?: Date | null;
  /**
   * Выбор периода. Дата — начало недели, первое число месяца или 1 января года.
   * Не вызывается для отключённых пунктов.
   */
  onSelectDate: (date: Date) => void;
  /** Наведение на пункт (предпросмотр диапазона) */
  onItemMouseEnter?: (date: Date) => void;
  /** Уход курсора с пункта */
  onItemMouseLeave?: () => void;
  /** Подвал: «Очистить» / «Применить», как у Calendar */
  footer?: React.ReactNode;
};

/**
 * Пикер месяца, года и/или недели месяца без сетки дней.
 * @param props - Точность, границы, выбранные даты и колбэки клика
 */
export const DateInputPeriodPicker: React.FC<DateInputPeriodPickerProps> = ({
  precision,
  weekOfMonthMode = 'calendar',
  locale = 'ru-RU',
  size = Size.SM,
  disabled = false,
  minDate,
  maxDate,
  isDateDisabled,
  selectionMode = 'single',
  selectedDate = null,
  rangeStart = null,
  rangeEnd = null,
  rangeHoverDate = null,
  onSelectDate,
  onItemMouseEnter,
  onItemMouseLeave,
  footer,
}) => {
  const todayDate = useMemo(() => new Date(), []);
  const monthLabels = useMemo(() => getMonthPeriodLabels(locale), [locale]);
  const implicitYear = getImplicitYearForMonthPrecision(selectedDate ?? rangeStart, todayDate);
  const implicitMonthIndex = (selectedDate ?? rangeStart)?.getMonth() ?? todayDate.getMonth();

  const [activeYear, setActiveYear] = useState(implicitYear);
  const [activeMonthIndex, setActiveMonthIndex] = useState(implicitMonthIndex);

  useEffect(() => {
    setActiveYear(implicitYear);
    setActiveMonthIndex(implicitMonthIndex);
  }, [implicitMonthIndex, implicitYear]);

  const yearList = useMemo(
    () =>
      buildYearList(activeYear, {
        minDate,
        maxDate,
      }),
    [activeYear, minDate, maxDate],
  );

  const disabledOptions = useMemo(
    () => ({
      minDate,
      maxDate,
      isDateDisabled,
    }),
    [minDate, maxDate, isDateDisabled],
  );

  const showWeekList = precision === 'week';
  const showMonthList = precision === 'month' || precision === 'monthYear' || precision === 'week';
  const showYearList = precision === 'year' || precision === 'monthYear' || precision === 'week';
  const yearForMonths = precision === 'month' ? implicitYear : activeYear;
  const monthForWeeks = activeMonthIndex;

  const monthWeeks = useMemo(
    () => (showWeekList ? getMonthWeeks(activeYear, monthForWeeks, { weekOfMonthMode }) : []),
    [activeYear, monthForWeeks, showWeekList, weekOfMonthMode],
  );

  const handleMonthClick = (monthIndex: number) => {
    if (disabled) {
      return;
    }

    if (isMonthPeriodDisabled(yearForMonths, monthIndex, disabledOptions)) {
      return;
    }

    if (precision === 'week') {
      setActiveMonthIndex(monthIndex);
      return;
    }

    onSelectDate(createPeriodDate(yearForMonths, monthIndex));
  };

  const handleYearClick = (year: number) => {
    if (disabled) {
      return;
    }

    if (isYearPeriodDisabled(year, disabledOptions)) {
      return;
    }

    if (precision === 'monthYear' || precision === 'week') {
      setActiveYear(year);
      return;
    }

    onSelectDate(createPeriodDate(year, 0));
  };

  const handleWeekClick = (weekStartDate: Date) => {
    if (disabled) {
      return;
    }

    onSelectDate(weekStartDate);
  };

  const resolveItemVisual = (itemDate: Date, isSelectedSingle: boolean) => {
    const rangeFlags = getRangeDayVisualFlags(
      itemDate,
      selectionMode,
      rangeStart,
      rangeEnd,
      rangeHoverDate,
    );

    return {
      selected: selectionMode === 'single' ? isSelectedSingle : false,
      rangeStart: rangeFlags.rangeStart,
      rangeEnd: rangeFlags.rangeEnd,
      inRange: rangeFlags.inRange,
    };
  };

  const selectedWeekNumber =
    selectedDate && precision === 'week'
      ? getWeekOfMonthFromDate(selectedDate, { weekOfMonthMode })?.weekNumber
      : null;

  const todayWeekNumber =
    todayDate.getFullYear() === activeYear && todayDate.getMonth() === monthForWeeks
      ? getWeekOfMonthFromDate(todayDate, { weekOfMonthMode })?.weekNumber
      : null;

  return (
    <DateInputPeriodPickerRoot data-testid="date-input-period-picker">
      {showWeekList ? (
        <DateInputPeriodSection aria-label="Недели месяца">
          <DateInputPeriodSectionTitle>Неделя</DateInputPeriodSectionTitle>
          <DateInputPeriodGrid $columns={2} role="listbox" aria-label="Список недель месяца">
            {monthWeeks.map((week) => {
              const isDisabled = disabled || isWeekPeriodDisabled(week, disabledOptions);
              const isSelectedSingle = Boolean(
                selectedDate &&
                selectedDate.getFullYear() === activeYear &&
                selectedDate.getMonth() === monthForWeeks &&
                selectedWeekNumber === week.weekNumber,
              );
              const visual = resolveItemVisual(week.startDate, isSelectedSingle);
              const weekLabel = `${formatWeekOfMonthOrdinal(week.weekNumber)} неделя`;
              const rangeLabel = formatMonthWeekRangeLabel(week, locale);

              return (
                <DateInputPeriodItemButton
                  key={week.weekNumber}
                  type="button"
                  role="option"
                  aria-selected={visual.selected || visual.rangeStart || visual.rangeEnd}
                  aria-label={`${weekLabel}, ${rangeLabel}`}
                  data-testid={`date-input-period-week-${week.weekNumber}`}
                  $size={size}
                  $selected={visual.selected}
                  $today={todayWeekNumber === week.weekNumber}
                  $disabled={isDisabled}
                  $inRange={visual.inRange}
                  $rangeStart={visual.rangeStart}
                  $rangeEnd={visual.rangeEnd}
                  $capitalize={false}
                  disabled={isDisabled}
                  onClick={() => handleWeekClick(week.startDate)}
                  onMouseEnter={() => onItemMouseEnter?.(week.startDate)}
                  onMouseLeave={onItemMouseLeave}
                >
                  <DateInputPeriodItemStack>
                    <span>{weekLabel}</span>
                    <DateInputPeriodItemHint>{rangeLabel}</DateInputPeriodItemHint>
                  </DateInputPeriodItemStack>
                </DateInputPeriodItemButton>
              );
            })}
          </DateInputPeriodGrid>
        </DateInputPeriodSection>
      ) : null}

      {showMonthList ? (
        <DateInputPeriodSection aria-label="Месяцы">
          {precision === 'monthYear' || precision === 'week' ? (
            <DateInputPeriodSectionTitle>Месяц</DateInputPeriodSectionTitle>
          ) : null}
          <DateInputPeriodGrid $columns={3} role="listbox" aria-label="Список месяцев">
            {monthLabels.map((monthLabel, monthIndex) => {
              const periodDate = createPeriodDate(yearForMonths, monthIndex);
              const isDisabled =
                disabled || isMonthPeriodDisabled(yearForMonths, monthIndex, disabledOptions);
              const isSelectedSingle =
                precision === 'week'
                  ? activeMonthIndex === monthIndex
                  : Boolean(
                      selectedDate &&
                      selectedDate.getFullYear() === yearForMonths &&
                      selectedDate.getMonth() === monthIndex,
                    );
              const visual =
                precision === 'week'
                  ? {
                      selected: activeMonthIndex === monthIndex,
                      rangeStart: false,
                      rangeEnd: false,
                      inRange: false,
                    }
                  : resolveItemVisual(periodDate, isSelectedSingle);
              const isToday =
                todayDate.getFullYear() === yearForMonths && todayDate.getMonth() === monthIndex;

              return (
                <DateInputPeriodItemButton
                  key={monthLabel}
                  type="button"
                  role="option"
                  aria-selected={visual.selected || visual.rangeStart || visual.rangeEnd}
                  aria-label={monthLabel}
                  data-testid={`date-input-period-month-${monthIndex}`}
                  $size={size}
                  $selected={visual.selected}
                  $today={isToday}
                  $disabled={isDisabled}
                  $inRange={visual.inRange}
                  $rangeStart={visual.rangeStart}
                  $rangeEnd={visual.rangeEnd}
                  disabled={isDisabled}
                  onClick={() => handleMonthClick(monthIndex)}
                  onMouseEnter={() => {
                    if (precision !== 'week') {
                      onItemMouseEnter?.(periodDate);
                    }
                  }}
                  onMouseLeave={precision === 'week' ? undefined : onItemMouseLeave}
                >
                  {monthLabel}
                </DateInputPeriodItemButton>
              );
            })}
          </DateInputPeriodGrid>
        </DateInputPeriodSection>
      ) : null}

      {showYearList ? (
        <DateInputPeriodSection aria-label="Годы">
          {precision === 'monthYear' || precision === 'week' ? (
            <DateInputPeriodSectionTitle>Год</DateInputPeriodSectionTitle>
          ) : null}
          <DateInputPeriodYearScroller>
            <DateInputPeriodGrid $columns={4} role="listbox" aria-label="Список годов">
              {yearList.map((year) => {
                const periodDate = createPeriodDate(year, 0);
                const isDisabled = disabled || isYearPeriodDisabled(year, disabledOptions);
                const isSelectedSingle = Boolean(
                  precision === 'year' ? selectedDate?.getFullYear() === year : activeYear === year,
                );
                const visual =
                  precision === 'year'
                    ? resolveItemVisual(periodDate, isSelectedSingle)
                    : {
                        selected: activeYear === year,
                        rangeStart: false,
                        rangeEnd: false,
                        inRange: false,
                      };
                const isToday = todayDate.getFullYear() === year;

                return (
                  <DateInputPeriodItemButton
                    key={year}
                    type="button"
                    role="option"
                    aria-selected={visual.selected || visual.rangeStart || visual.rangeEnd}
                    aria-label={String(year)}
                    data-testid={`date-input-period-year-${year}`}
                    $size={size}
                    $selected={visual.selected}
                    $today={isToday}
                    $disabled={isDisabled}
                    $inRange={visual.inRange}
                    $rangeStart={visual.rangeStart}
                    $rangeEnd={visual.rangeEnd}
                    disabled={isDisabled}
                    onClick={() => handleYearClick(year)}
                    onMouseEnter={() => {
                      if (precision === 'year') {
                        onItemMouseEnter?.(periodDate);
                      }
                    }}
                    onMouseLeave={precision === 'year' ? onItemMouseLeave : undefined}
                  >
                    {year}
                  </DateInputPeriodItemButton>
                );
              })}
            </DateInputPeriodGrid>
          </DateInputPeriodYearScroller>
        </DateInputPeriodSection>
      ) : null}

      {footer ? <CalendarFooter>{footer}</CalendarFooter> : null}
    </DateInputPeriodPickerRoot>
  );
};

DateInputPeriodPicker.displayName = 'DateInputPeriodPicker';
