import React, { useCallback, useLayoutEffect, useMemo, useRef, type ComponentProps } from 'react';
import type { DateRollerPickerProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import {
  DateRollerRoot,
  DateRollerColumn,
  DateRollerViewport,
  DateRollerOption,
  DateRollerLens,
  DATE_ROLLER_ITEM_PX,
  DATE_ROLLER_VIEWPORT_PX,
} from './DateRollerPicker.style';
import {
  buildDayRollerItems,
  buildMonthRollerItems,
  buildYearRollerItems,
  clampDateToMinMaxCalendar,
  clampDayForMonth,
  composeNormalizedDate,
  type DateRollerNumericItem,
} from './handlers';

const PAD = (DATE_ROLLER_VIEWPORT_PX - DATE_ROLLER_ITEM_PX) / 2;

type RollerColumnProps = {
  /** Подпись для a11y */
  ariaLabel: string;
  /** Варианты в порядке сверху вниз */
  items: DateRollerNumericItem[];
  /** Выбранное значение (`value` из элемента) */
  selectedValue: number;
  /** Выбор значения (клик или snap после прокрутки) */
  onCommit: (value: number) => void;
  /** Размер отступов колонки */
  size?: Size;
  /** Блокировка колонки */
  disabled?: boolean;
  /** Отключение отдельных значений */
  isItemDisabled?: (value: number) => boolean;
};

/**
 * Одна колонка роллера: snap-прокрутка и клик по строке.
 * @param props - Пропсы колонки.
 */
const RollerColumn = ({
  ariaLabel,
  items,
  selectedValue,
  onCommit,
  size,
  disabled = false,
  isItemDisabled,
}: RollerColumnProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedIndex = useMemo(() => {
    const idx = items.findIndex((it) => it.value === selectedValue);
    return idx >= 0 ? idx : 0;
  }, [items, selectedValue]);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = 'auto') => {
      const el = viewportRef.current;
      if (!el) {
        return;
      }
      const clamped = Math.max(0, Math.min(items.length - 1, index));
      el.scrollTo({ top: clamped * DATE_ROLLER_ITEM_PX, behavior });
    },
    [items.length],
  );

  useLayoutEffect(() => {
    scrollToIndex(selectedIndex, 'auto');
  }, [selectedIndex, scrollToIndex, items]);

  const flushScrollSelection = useCallback(() => {
    const el = viewportRef.current;
    if (!el || disabled) {
      return;
    }
    const raw = el.scrollTop / DATE_ROLLER_ITEM_PX;
    const i = Math.round(Math.max(0, Math.min(items.length - 1, raw)));
    const next = items[i]?.value;
    if (next === undefined) {
      return;
    }
    if (isItemDisabled?.(next)) {
      scrollToIndex(selectedIndex, 'smooth');
      return;
    }
    scrollToIndex(i, 'smooth');
    if (next !== selectedValue) {
      onCommit(next);
    }
  }, [disabled, isItemDisabled, items, onCommit, scrollToIndex, selectedIndex, selectedValue]);

  const handleScroll = useCallback(() => {
    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current);
    }
    scrollEndTimerRef.current = setTimeout(() => {
      flushScrollSelection();
      scrollEndTimerRef.current = null;
    }, 140);
  }, [flushScrollSelection]);

  const handlePick = useCallback(
    (index: number) => {
      if (disabled) {
        return;
      }
      const v = items[index]?.value;
      if (v === undefined || isItemDisabled?.(v)) {
        return;
      }
      scrollToIndex(index, 'smooth');
      onCommit(v);
    },
    [disabled, isItemDisabled, items, onCommit, scrollToIndex],
  );

  const dateRollerColumnProps: ComponentProps<typeof DateRollerColumn> = {
    $size: size,
  };

  return (
    <DateRollerColumn {...dateRollerColumnProps}>
      <DateRollerLens aria-hidden />
      <DateRollerViewport
        ref={viewportRef}
        aria-label={ariaLabel}
        onScroll={handleScroll}
        role="listbox"
      >
        <div style={{ height: PAD, flexShrink: 0 }} aria-hidden />
        {items.map((it, index) => {
          const dis = Boolean(disabled) || Boolean(isItemDisabled?.(it.value));
          const active = it.value === selectedValue;
          return (
            <DateRollerOption
              key={`${ariaLabel}-${it.value}`}
              type="button"
              role="option"
              aria-selected={active}
              $active={active}
              $disabled={dis}
              disabled={dis}
              onClick={() => handlePick(index)}
            >
              {it.label}
            </DateRollerOption>
          );
        })}
        <div style={{ height: PAD, flexShrink: 0 }} aria-hidden />
      </DateRollerViewport>
    </DateRollerColumn>
  );
};

/**
 * Три роллера «день — месяц — год» по макету Figma; синхронизируется с `value`.
 * @param props - Пропсы: текущая дата, `onChange`, границы и локаль.
 */
export const DateRollerPicker: React.FC<DateRollerPickerProps> = ({
  value,
  onChange,
  locale = 'ru-RU',
  minDate,
  maxDate,
  isDateDisabled,
  size = Size.MD,
  disabled = false,
  className,
}) => {
  const y = value.getFullYear();
  const m = value.getMonth();
  const d = value.getDate();

  const dayItems = useMemo(() => buildDayRollerItems(y, m), [y, m]);
  const monthItems = useMemo(() => buildMonthRollerItems(locale), [locale]);
  const yearItems = useMemo(() => buildYearRollerItems(minDate, maxDate, y), [minDate, maxDate, y]);

  const tryEmit = useCallback(
    (year: number, monthIndex0: number, day: number) => {
      const composed = composeNormalizedDate(year, monthIndex0, day);
      const clamped = clampDateToMinMaxCalendar(composed, minDate, maxDate);
      if (isDateDisabled?.(clamped)) {
        return;
      }
      onChange(clamped);
    },
    [isDateDisabled, maxDate, minDate, onChange],
  );

  const onDay = useCallback(
    (nextDay: number) => {
      tryEmit(y, m, nextDay);
    },
    [m, tryEmit, y],
  );

  const onMonth = useCallback(
    (nextMonth: number) => {
      const nextD = clampDayForMonth(y, nextMonth, d);
      tryEmit(y, nextMonth, nextD);
    },
    [d, tryEmit, y],
  );

  const onYear = useCallback(
    (nextYear: number) => {
      const nextD = clampDayForMonth(nextYear, m, d);
      tryEmit(nextYear, m, nextD);
    },
    [d, m, tryEmit],
  );

  const isDayDisabled = useCallback(
    (day: number) => {
      const cand = composeNormalizedDate(y, m, day);
      const clamped = clampDateToMinMaxCalendar(cand, minDate, maxDate);
      return isDateDisabled?.(clamped) ?? false;
    },
    [isDateDisabled, m, maxDate, minDate, y],
  );

  const dateRollerRootProps: ComponentProps<typeof DateRollerRoot> = {
    className,
    $size: size,
    role: 'group',
    'aria-label': 'Выбор даты роллерами',
  };

  return (
    <DateRollerRoot {...dateRollerRootProps}>
      <RollerColumn
        ariaLabel="День"
        items={dayItems}
        selectedValue={d}
        onCommit={onDay}
        size={size}
        disabled={disabled}
        isItemDisabled={isDayDisabled}
      />
      <RollerColumn
        ariaLabel="Месяц"
        items={monthItems}
        selectedValue={m}
        onCommit={onMonth}
        size={size}
        disabled={disabled}
      />
      <RollerColumn
        ariaLabel="Год"
        items={yearItems}
        selectedValue={y}
        onCommit={onYear}
        size={size}
        disabled={disabled}
      />
    </DateRollerRoot>
  );
};

DateRollerPicker.displayName = 'DateRollerPicker';
