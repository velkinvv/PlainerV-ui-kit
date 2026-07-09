import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
} from 'react';
import type {
  CalendarProps,
  DropdownMenuItemProps,
  DropdownMenuItemValue,
} from '../../../types/ui';
import { ButtonVariant } from '../../../types/ui';
import { Size, IconSize } from '../../../types/sizes';
import { Icon } from '../Icon/Icon';
import { Button } from '../buttons/Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';
import {
  computeRangeDatesAfterDayClick,
  resolveDatePickerDraft,
  type DatePickerDraftDates,
  type DatePickerDraftPhase,
} from '../../../handlers/dateInputPickerHandlers';
import {
  CalendarRoot,
  CalendarTitle,
  CalendarToolbar,
  CalendarMonthDropdownWrap,
  CalendarMonthTrigger,
  CalendarMonthTriggerLabel,
  CalendarReadonlyMonth,
  CalendarChevronFlip,
  CalendarNavGroup,
  CalendarNavButton,
  CalendarWeekdays,
  CalendarWeekdayCell,
  CalendarGrid,
  CalendarDayButton,
  CalendarFooter,
} from './Calendar.style';
import {
  addMonths,
  buildCalendarGrid,
  buildMonthYearOptions,
  clampVisibleMonthStart,
  getRangeDayVisualFlags,
  getWeekdayLabels,
  isDateOutsideMinMax,
  isSameCalendarDay,
  monthYearKey,
  parseMonthYearKey,
  startOfMonth,
} from './handlers';
import { DateRollerPicker } from '../DateRollerPicker/DateRollerPicker';
import { CalendarMonthYearSplit } from './CalendarMonthYearSplit';

/** Формат строк черновика в колбэках Calendar (ISO-дата) */
const CALENDAR_PICKER_DRAFT_FORMAT = 'YYYY-MM-DD';

/**
 * Календарь по макету: сетка месяца, навигация, выбор дня, выпадающий список месяца/года.
 * @param props - Пропсы календаря.
 * @param ref - Ref на корневой контейнер.
 */
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value: valueProp,
      defaultValue = null,
      defaultVisibleMonth,
      visibleMonth: visibleMonthProp,
      onChange,
      onVisibleMonthChange,
      locale = 'ru-RU',
      minDate,
      maxDate,
      isDateDisabled,
      showTitle = false,
      weekStartsOn = 1,
      headerMode = 'monthYear',
      showMonthPicker = true,
      monthPickerRange = 36,
      size = Size.MD,
      disabled = false,
      selectionMode = 'single',
      rangeStart = null,
      rangeEnd = null,
      rangeHoverDate = null,
      onSelectDate,
      weekdays: weekdaysProp,
      footer,
      embedded = false,
      fullWidth = false,
      onDayMouseEnter,
      onDayMouseLeave,
      showDateRollers = false,
      monthYearLayout = 'combined',
      onRollersDateChange,
      onPickerChange,
      modifyPickerValue,
      deferPickerCommit,
      onRangeChange,
      className,
      ...rest
    },
    ref,
  ) => {
    /** Черновик только в standalone; при `onSelectDate` коммит на стороне родителя (DateInput и т.д.) */
    const shouldUsePickerDraft =
      !onSelectDate && Boolean(onPickerChange || modifyPickerValue);
    const shouldDeferPickerCommit = deferPickerCommit ?? shouldUsePickerDraft;

    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState<Date | null>(defaultValue ?? null);
    const selected = isControlled ? (valueProp ?? null) : internalValue;

    const isVisibleControlled = visibleMonthProp !== undefined;
    const [internalVisible, setInternalVisible] = useState<Date>(() =>
      clampVisibleMonthStart(
        startOfMonth(visibleMonthProp ?? defaultVisibleMonth ?? selected ?? new Date()),
        minDate,
        maxDate,
      ),
    );

    const effectiveVisible = useMemo(() => {
      const base = isVisibleControlled ? visibleMonthProp! : internalVisible;
      return clampVisibleMonthStart(startOfMonth(base), minDate, maxDate);
    }, [isVisibleControlled, visibleMonthProp, internalVisible, minDate, maxDate]);

    useEffect(() => {
      if (!isVisibleControlled && isControlled && valueProp) {
        setInternalVisible(clampVisibleMonthStart(startOfMonth(valueProp), minDate, maxDate));
      }
    }, [isVisibleControlled, isControlled, valueProp, minDate, maxDate]);

    const setVisibleMonth = useCallback(
      (next: Date) => {
        const clamped = clampVisibleMonthStart(startOfMonth(next), minDate, maxDate);
        if (!isVisibleControlled) {
          setInternalVisible(clamped);
        }
        onVisibleMonthChange?.(clamped);
      },
      [isVisibleControlled, minDate, maxDate, onVisibleMonthChange],
    );

    const [monthMenuOpen, setMonthMenuOpen] = useState(false);

    const [draftSelectedDate, setDraftSelectedDate] = useState<Date | null>(null);
    const [draftRangeStart, setDraftRangeStart] = useState<Date | null>(null);
    const [draftRangeEnd, setDraftRangeEnd] = useState<Date | null>(null);
    const [draftRangeHoverDate, setDraftRangeHoverDate] = useState<Date | null>(null);

    const syncDraftFromProps = useCallback(() => {
      if (!shouldUsePickerDraft) {
        return;
      }

      if (selectionMode === 'single') {
        setDraftSelectedDate(selected);
        return;
      }

      setDraftRangeStart(rangeStart);
      setDraftRangeEnd(rangeEnd);
      setDraftRangeHoverDate(null);
    }, [shouldUsePickerDraft, selectionMode, selected, rangeStart, rangeEnd]);

    /**
     * Обновляет черновик с учётом модификатора и `onPickerChange`.
     * @param nextDraftDates — новые даты черновика
     * @param phase — фаза изменения
     */
    const applyPickerDraftUpdate = useCallback(
      (nextDraftDates: DatePickerDraftDates, phase: DatePickerDraftPhase) => {
        const isRangeMode = selectionMode === 'range';
        const resolvedDates = resolveDatePickerDraft({
          draftDates: nextDraftDates,
          range: isRangeMode,
          format: CALENDAR_PICKER_DRAFT_FORMAT,
          phase,
          modifyPickerValue,
          onPickerChange,
        });

        if (!isRangeMode) {
          setDraftSelectedDate(resolvedDates.selectedDate);
        } else {
          setDraftRangeStart(resolvedDates.rangeStart);
          setDraftRangeEnd(resolvedDates.rangeEnd);
          setDraftRangeHoverDate(null);
        }

        if (!shouldDeferPickerCommit) {
          if (!isRangeMode && resolvedDates.selectedDate) {
            if (!isControlled) {
              setInternalValue(resolvedDates.selectedDate);
            }
            onChange?.(resolvedDates.selectedDate);
          } else if (
            isRangeMode &&
            resolvedDates.rangeStart &&
            resolvedDates.rangeEnd
          ) {
            onRangeChange?.(resolvedDates.rangeStart, resolvedDates.rangeEnd);
          }
        }

        return resolvedDates;
      },
      [
        selectionMode,
        modifyPickerValue,
        onPickerChange,
        shouldDeferPickerCommit,
        isControlled,
        onChange,
        onRangeChange,
      ],
    );

    useEffect(() => {
      syncDraftFromProps();
    }, [syncDraftFromProps]);

    const effectiveSelected = shouldUsePickerDraft ? draftSelectedDate : selected;
    const effectiveRangeStart = shouldUsePickerDraft ? draftRangeStart : rangeStart;
    const effectiveRangeEnd = shouldUsePickerDraft ? draftRangeEnd : rangeEnd;
    const effectiveRangeHover = shouldUsePickerDraft ? draftRangeHoverDate : rangeHoverDate;

    const handleDraftApply = useCallback(() => {
      if (selectionMode === 'single') {
        if (!draftSelectedDate) {
          return;
        }

        const resolvedDates = applyPickerDraftUpdate(
          { selectedDate: draftSelectedDate, rangeStart: null, rangeEnd: null },
          'apply',
        );

        if (resolvedDates.selectedDate) {
          if (!isControlled) {
            setInternalValue(resolvedDates.selectedDate);
          }
          onChange?.(resolvedDates.selectedDate);
        }
        return;
      }

      if (!draftRangeStart || !draftRangeEnd) {
        return;
      }

      const resolvedDates = applyPickerDraftUpdate(
        { selectedDate: null, rangeStart: draftRangeStart, rangeEnd: draftRangeEnd },
        'apply',
      );

      if (resolvedDates.rangeStart && resolvedDates.rangeEnd) {
        onRangeChange?.(resolvedDates.rangeStart, resolvedDates.rangeEnd);
      }
    }, [
      selectionMode,
      draftSelectedDate,
      draftRangeStart,
      draftRangeEnd,
      applyPickerDraftUpdate,
      isControlled,
      onChange,
      onRangeChange,
    ]);

    const handleDraftClear = useCallback(() => {
      applyPickerDraftUpdate(
        { selectedDate: null, rangeStart: null, rangeEnd: null },
        'clear',
      );

      if (!isControlled) {
        setInternalValue(null);
      }
    }, [applyPickerDraftUpdate, isControlled]);

    const weekdayLabels = useMemo(() => {
      if (weekdaysProp?.length === 7) {
        return weekdaysProp;
      }
      return getWeekdayLabels(locale, weekStartsOn);
    }, [weekdaysProp, locale, weekStartsOn]);

    const cells = useMemo(
      () => buildCalendarGrid(effectiveVisible, weekStartsOn),
      [effectiveVisible, weekStartsOn],
    );

    const monthItems: DropdownMenuItemProps[] = useMemo(
      () =>
        buildMonthYearOptions(
          effectiveVisible,
          monthPickerRange,
          monthPickerRange,
          locale,
          minDate,
          maxDate,
        ).map((o) => ({ label: o.label, value: o.value })),
      [effectiveVisible, monthPickerRange, locale, minDate, maxDate],
    );

    const triggerLabel = useMemo(() => {
      const refDate =
        headerMode === 'monthYear' ? effectiveVisible : (selected ?? effectiveVisible);
      if (headerMode === 'full') {
        return new Intl.DateTimeFormat(locale, {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format(refDate);
      }
      if (headerMode === 'dayMonth') {
        return new Intl.DateTimeFormat(locale, {
          day: 'numeric',
          month: 'long',
        }).format(refDate);
      }
      return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
        effectiveVisible,
      );
    }, [headerMode, effectiveVisible, selected, locale]);

    const dropdownValue = monthYearKey(effectiveVisible);

    const handleMonthSelect = useCallback(
      (v: DropdownMenuItemValue | undefined) => {
        if (v == null || typeof v !== 'string') {
          return;
        }
        const parsed = parseMonthYearKey(v);
        if (parsed) {
          setVisibleMonth(parsed);
        }
      },
      [setVisibleMonth],
    );

    const goPrevMonth = useCallback(() => {
      setVisibleMonth(addMonths(effectiveVisible, -1));
    }, [effectiveVisible, setVisibleMonth]);

    const goNextMonth = useCallback(() => {
      setVisibleMonth(addMonths(effectiveVisible, 1));
    }, [effectiveVisible, setVisibleMonth]);

    const prevNavDisabled = useMemo(() => {
      if (!minDate) {
        return false;
      }
      const prev = addMonths(effectiveVisible, -1);
      return startOfMonth(prev).getTime() < startOfMonth(minDate).getTime();
    }, [effectiveVisible, minDate]);

    const nextNavDisabled = useMemo(() => {
      if (!maxDate) {
        return false;
      }
      const nxt = addMonths(effectiveVisible, 1);
      return startOfMonth(nxt).getTime() > startOfMonth(maxDate).getTime();
    }, [effectiveVisible, maxDate]);

    const handleDayClick = useCallback(
      (d: Date) => {
        if (disabled) {
          return;
        }
        const dayOnly = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        if (isDateOutsideMinMax(dayOnly, minDate, maxDate)) {
          return;
        }
        if (isDateDisabled?.(dayOnly)) {
          return;
        }

        if (onSelectDate) {
          onSelectDate(dayOnly);
          return;
        }

        if (shouldUsePickerDraft) {
          if (selectionMode === 'single') {
            applyPickerDraftUpdate(
              { selectedDate: dayOnly, rangeStart: null, rangeEnd: null },
              'pick',
            );
            return;
          }

          const nextDraftDates = computeRangeDatesAfterDayClick(
            dayOnly,
            draftRangeStart,
            draftRangeEnd,
          );
          applyPickerDraftUpdate(nextDraftDates, 'pick');
          return;
        }

        if (!isControlled) {
          setInternalValue(dayOnly);
        }
        onChange?.(dayOnly);
      },
      [
        disabled,
        minDate,
        maxDate,
        isDateDisabled,
        onSelectDate,
        shouldUsePickerDraft,
        selectionMode,
        applyPickerDraftUpdate,
        draftRangeStart,
        draftRangeEnd,
        isControlled,
        onChange,
      ],
    );

    const handleDraftDayMouseEnter = useCallback(
      (dayOnly: Date) => {
        if (shouldUsePickerDraft && selectionMode === 'range' && draftRangeStart && !draftRangeEnd) {
          setDraftRangeHoverDate(dayOnly);
        }
        onDayMouseEnter?.(dayOnly);
      },
      [
        shouldUsePickerDraft,
        selectionMode,
        draftRangeStart,
        draftRangeEnd,
        onDayMouseEnter,
      ],
    );

    const handleDraftDayMouseLeave = useCallback(() => {
      if (shouldUsePickerDraft && selectionMode === 'range') {
        setDraftRangeHoverDate(null);
      }
      onDayMouseLeave?.();
    }, [shouldUsePickerDraft, selectionMode, onDayMouseLeave]);

    const rollerValue = useMemo(() => {
      if (selectionMode === 'range') {
        const anchor = effectiveRangeEnd ?? effectiveRangeStart;
        if (anchor) {
          return new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate());
        }
        return new Date(effectiveVisible.getFullYear(), effectiveVisible.getMonth(), 1);
      }
      if (effectiveSelected) {
        return new Date(
          effectiveSelected.getFullYear(),
          effectiveSelected.getMonth(),
          effectiveSelected.getDate(),
        );
      }
      return new Date(effectiveVisible.getFullYear(), effectiveVisible.getMonth(), 1);
    }, [selectionMode, effectiveRangeEnd, effectiveRangeStart, effectiveSelected, effectiveVisible]);

    const handleRollersChange = useCallback(
      (next: Date) => {
        const dayOnly = new Date(next.getFullYear(), next.getMonth(), next.getDate());
        if (disabled) {
          return;
        }
        if (isDateOutsideMinMax(dayOnly, minDate, maxDate)) {
          return;
        }
        if (isDateDisabled?.(dayOnly)) {
          return;
        }
        setVisibleMonth(startOfMonth(dayOnly));
        if (onRollersDateChange) {
          onRollersDateChange(dayOnly);
          return;
        }
        handleDayClick(next);
      },
      [
        disabled,
        minDate,
        maxDate,
        isDateDisabled,
        onRollersDateChange,
        setVisibleMonth,
        handleDayClick,
      ],
    );

    const today = useMemo(() => new Date(), []);

    const calendarRootProps: ComponentProps<typeof CalendarRoot> = {
      ref,
      ...rest,
      className,
      $size: size,
      $embedded: embedded,
      $fullWidth: fullWidth,
      role: 'group',
      'aria-label': 'Календарь',
    };

    return (
      <CalendarRoot {...calendarRootProps}>
        {showTitle ? <CalendarTitle $size={size}>Календарь</CalendarTitle> : null}
        {showMonthPicker && monthYearLayout === 'split' ? (
          <CalendarMonthYearSplit
            visibleMonth={effectiveVisible}
            onVisibleMonthChange={setVisibleMonth}
            locale={locale}
            onPrevMonth={goPrevMonth}
            onNextMonth={goNextMonth}
            prevNavDisabled={prevNavDisabled}
            nextNavDisabled={nextNavDisabled}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
          />
        ) : (
          <CalendarToolbar>
            {showMonthPicker ? (
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
                      <CalendarMonthTriggerLabel>{triggerLabel}</CalendarMonthTriggerLabel>
                      <CalendarChevronFlip $open={monthMenuOpen} aria-hidden>
                        <Icon
                          name="IconPlainerChevronDown"
                          size={IconSize.MD}
                          color="currentColor"
                        />
                      </CalendarChevronFlip>
                    </CalendarMonthTrigger>
                  }
                  items={monthItems}
                  value={dropdownValue}
                  onSelect={handleMonthSelect}
                  disabled={disabled}
                  size={Size.SM}
                  menuDensity="compact"
                  searchable={false}
                  menuMaxHeight={240}
                  isMenuOpen={monthMenuOpen}
                  onMenuOpenChange={setMonthMenuOpen}
                  disableAutoFocus
                  positioningMode="autoFlip"
                />
              </CalendarMonthDropdownWrap>
            ) : (
              <CalendarReadonlyMonth>{triggerLabel}</CalendarReadonlyMonth>
            )}
            <CalendarNavGroup>
              <CalendarNavButton
                type="button"
                aria-label="Предыдущий месяц"
                $disabled={disabled || prevNavDisabled}
                disabled={disabled || prevNavDisabled}
                onClick={goPrevMonth}
              >
                <Icon name="IconPlainerArrowLeft" size={IconSize.SM} color="currentColor" />
              </CalendarNavButton>
              <CalendarNavButton
                type="button"
                aria-label="Следующий месяц"
                $disabled={disabled || nextNavDisabled}
                disabled={disabled || nextNavDisabled}
                onClick={goNextMonth}
              >
                <Icon name="IconPlainerArrowRight" size={IconSize.SM} color="currentColor" />
              </CalendarNavButton>
            </CalendarNavGroup>
          </CalendarToolbar>
        )}

        {showDateRollers ? (
          <DateRollerPicker
            value={rollerValue}
            onChange={handleRollersChange}
            locale={locale}
            minDate={minDate}
            maxDate={maxDate}
            isDateDisabled={isDateDisabled}
            size={size}
            disabled={disabled}
          />
        ) : null}

        <CalendarWeekdays $size={size} $fullWidth={fullWidth}>
          {weekdayLabels.map((wd, i) => (
            <CalendarWeekdayCell key={`${wd}-${i}`}>{wd}</CalendarWeekdayCell>
          ))}
        </CalendarWeekdays>

        <CalendarGrid $size={size} $fullWidth={fullWidth}>
          {cells.map((cell, idx) => {
            const dayOnly = new Date(
              cell.date.getFullYear(),
              cell.date.getMonth(),
              cell.date.getDate(),
            );
            const outside = isDateOutsideMinMax(dayOnly, minDate, maxDate);
            const customDis = isDateDisabled?.(dayOnly) ?? false;
            const isDis = disabled || outside || customDis;
            const isSel =
              selectionMode === 'single' &&
              effectiveSelected != null &&
              isSameCalendarDay(dayOnly, effectiveSelected);
            const rangeFlags = getRangeDayVisualFlags(
              dayOnly,
              selectionMode,
              effectiveRangeStart,
              effectiveRangeEnd,
              effectiveRangeHover,
            );
            const isTod = isSameCalendarDay(dayOnly, today);

            return (
              <CalendarDayButton
                key={idx}
                type="button"
                $size={size}
                $fullWidth={fullWidth}
                $inCurrentMonth={cell.inCurrentMonth}
                $selected={Boolean(isSel)}
                $inRange={rangeFlags.inRange}
                $rangeStart={rangeFlags.rangeStart}
                $rangeEnd={rangeFlags.rangeEnd}
                $today={isTod}
                $disabled={isDis}
                disabled={isDis}
                onClick={() => handleDayClick(cell.date)}
                onMouseEnter={() => handleDraftDayMouseEnter(dayOnly)}
                onMouseLeave={handleDraftDayMouseLeave}
              >
                {cell.date.getDate()}
              </CalendarDayButton>
            );
          })}
        </CalendarGrid>

        {footer ? (
          <CalendarFooter>{footer}</CalendarFooter>
        ) : shouldDeferPickerCommit && shouldUsePickerDraft ? (
          <CalendarFooter>
            <Button
              variant={ButtonVariant.SECONDARY}
              size={size}
              type="button"
              onClick={handleDraftClear}
            >
              Очистить
            </Button>
            <Button
              variant={ButtonVariant.PRIMARY}
              size={size}
              type="button"
              onClick={handleDraftApply}
            >
              {selectionMode === 'range' ? 'Применить' : 'OK'}
            </Button>
          </CalendarFooter>
        ) : null}
      </CalendarRoot>
    );
  },
);

Calendar.displayName = 'Calendar';
