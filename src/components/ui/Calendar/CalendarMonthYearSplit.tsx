import React, { useCallback, useMemo, useState } from 'react';
import type { DropdownMenuItemProps, DropdownMenuItemValue } from '../../../types/ui';
import { Size, IconSize } from '../../../types/sizes';
import { Icon } from '../Icon/Icon';
import { Dropdown } from '../Dropdown/Dropdown';
import {
  CalendarToolbar,
  CalendarMonthDropdownWrap,
  CalendarMonthTrigger,
  CalendarMonthTriggerLabel,
  CalendarChevronFlip,
  CalendarNavGroup,
  CalendarNavButton,
  CalendarSplitMonthYearRow,
} from './Calendar.style';
import { startOfMonth } from './handlers';

export type CalendarMonthYearSplitProps = {
  /** Видимый месяц (любой день внутри месяца) */
  visibleMonth: Date;
  /** Установить первое число выбранного месяца/года */
  onVisibleMonthChange: (monthStart: Date) => void;
  /** Локаль подписей месяцев */
  locale: string;
  /** Предыдущий месяц */
  onPrevMonth: () => void;
  /** Следующий месяц */
  onNextMonth: () => void;
  /** Стрелка «назад» неактивна */
  prevNavDisabled: boolean;
  /** Стрелка «вперёд» неактивна */
  nextNavDisabled: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
};

/**
 * Шапка календаря: два выпадающих списка «месяц» и «год» + стрелки (макет Figma «триггеры»).
 * @param props - Видимый месяц, колбэки навигации и границы дат.
 */
export const CalendarMonthYearSplit: React.FC<CalendarMonthYearSplitProps> = ({
  visibleMonth,
  onVisibleMonthChange,
  locale,
  onPrevMonth,
  onNextMonth,
  prevNavDisabled,
  nextNavDisabled,
  minDate,
  maxDate,
  disabled = false,
}) => {
  const [monthMenuOpen, setMonthMenuOpen] = useState(false);
  const [yearMenuOpen, setYearMenuOpen] = useState(false);

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();

  const monthItems: DropdownMenuItemProps[] = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale, { month: 'long' });
    return Array.from({ length: 12 }, (_, m) => ({
      label: fmt.format(new Date(2000, m, 1)),
      value: String(m),
    }));
  }, [locale]);

  const yearItems: DropdownMenuItemProps[] = useMemo(() => {
    const minY = minDate?.getFullYear() ?? year - 80;
    const maxY = maxDate?.getFullYear() ?? year + 20;
    const lo = Math.min(minY, maxY);
    const hi = Math.max(minY, maxY);
    const out: DropdownMenuItemProps[] = [];
    for (let y = lo; y <= hi; y += 1) {
      out.push({ label: String(y), value: String(y) });
    }
    return out;
  }, [maxDate, minDate, year]);

  const handleMonthSelect = useCallback(
    (v: DropdownMenuItemValue | undefined) => {
      if (v == null || typeof v !== 'string') {
        return;
      }
      const mi = Number.parseInt(v, 10);
      if (Number.isNaN(mi) || mi < 0 || mi > 11) {
        return;
      }
      onVisibleMonthChange(startOfMonth(new Date(year, mi, 1)));
    },
    [onVisibleMonthChange, year],
  );

  const handleYearSelect = useCallback(
    (v: DropdownMenuItemValue | undefined) => {
      if (v == null || typeof v !== 'string') {
        return;
      }
      const yi = Number.parseInt(v, 10);
      if (Number.isNaN(yi)) {
        return;
      }
      onVisibleMonthChange(startOfMonth(new Date(yi, month, 1)));
    },
    [month, onVisibleMonthChange],
  );

  const monthLabelFmt = useMemo(() => new Intl.DateTimeFormat(locale, { month: 'long' }), [locale]);

  return (
    <CalendarToolbar>
      <CalendarSplitMonthYearRow>
        <CalendarMonthDropdownWrap>
          <Dropdown
            trigger={
              <CalendarMonthTrigger
                type="button"
                $open={monthMenuOpen}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={monthMenuOpen}
              >
                <CalendarMonthTriggerLabel>
                  {monthLabelFmt.format(new Date(year, month, 1))}
                </CalendarMonthTriggerLabel>
                <CalendarChevronFlip $open={monthMenuOpen} aria-hidden>
                  <Icon name="IconPlainerArrowDown" size={IconSize.SM} color="currentColor" />
                </CalendarChevronFlip>
              </CalendarMonthTrigger>
            }
            items={monthItems}
            value={String(month)}
            onSelect={handleMonthSelect}
            disabled={disabled}
            size={Size.SM}
            searchable={false}
            menuMaxHeight={280}
            isMenuOpen={monthMenuOpen}
            onMenuOpenChange={setMonthMenuOpen}
            disableAutoFocus
            positioningMode="autoFlip"
          />
        </CalendarMonthDropdownWrap>
        <CalendarMonthDropdownWrap>
          <Dropdown
            trigger={
              <CalendarMonthTrigger
                type="button"
                $open={yearMenuOpen}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={yearMenuOpen}
              >
                <CalendarMonthTriggerLabel>{String(year)}</CalendarMonthTriggerLabel>
                <CalendarChevronFlip $open={yearMenuOpen} aria-hidden>
                  <Icon name="IconPlainerArrowDown" size={IconSize.SM} color="currentColor" />
                </CalendarChevronFlip>
              </CalendarMonthTrigger>
            }
            items={yearItems}
            value={String(year)}
            onSelect={handleYearSelect}
            disabled={disabled}
            size={Size.SM}
            searchable={false}
            menuMaxHeight={280}
            isMenuOpen={yearMenuOpen}
            onMenuOpenChange={setYearMenuOpen}
            disableAutoFocus
            positioningMode="autoFlip"
          />
        </CalendarMonthDropdownWrap>
      </CalendarSplitMonthYearRow>
      <CalendarNavGroup>
        <CalendarNavButton
          type="button"
          aria-label="Предыдущий месяц"
          $disabled={disabled || prevNavDisabled}
          disabled={disabled || prevNavDisabled}
          onClick={onPrevMonth}
        >
          <Icon name="IconPlainerArrowLeft" size={IconSize.SM} color="currentColor" />
        </CalendarNavButton>
        <CalendarNavButton
          type="button"
          aria-label="Следующий месяц"
          $disabled={disabled || nextNavDisabled}
          disabled={disabled || nextNavDisabled}
          onClick={onNextMonth}
        >
          <Icon name="IconPlainerArrowRight" size={IconSize.SM} color="currentColor" />
        </CalendarNavButton>
      </CalendarNavGroup>
    </CalendarToolbar>
  );
};

CalendarMonthYearSplit.displayName = 'CalendarMonthYearSplit';
