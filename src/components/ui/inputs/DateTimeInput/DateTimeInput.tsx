import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import { useTheme } from 'styled-components';
import {
  ButtonVariant,
  TooltipPosition,
  type DateTimeInputProps,
  type DateTimeRange,
} from '../../../../types/ui';
import { getWeekdayNames } from '../../../../handlers/dateHandlers';
import {
  DEFAULT_DATETIME_FORMAT,
  formatDateTimeForDisplay,
  mergeDateAndTime,
  parseDateTime,
  toISODateTimeString,
} from '../../../../handlers/dateTimeHandlers';
import {
  dateTimePickerDraftDatesFromValue,
  resolveDateTimePickerDraft,
  type DateTimePickerDraftDates,
  type DateTimePickerDraftPhase,
} from '../../../../handlers/dateTimeInputPickerHandlers';
import { getCurrentTime } from '../TimeInput/handlers';
import { getClearIconSizeForInputField } from '../../../../handlers/iconHandlers';
import { Size, IconSize } from '../../../../types/sizes';
import { Calendar } from '../../Calendar/Calendar';
import { Button } from '../../buttons/Button/Button';
import { Icon } from '../../Icon/Icon';
import { Tooltip } from '../../Tooltip/Tooltip';
import { Hint, HintPosition, HintVariant } from '../../Hint/Hint';
import {
  resolveFloatingOverlayPortalRoot,
  resolveFloatingOverlayZIndex,
} from '../../../../handlers/floatingOverlayHandlers';
import { useFloatingOverlayLayer } from '../../../../contexts/FloatingOverlayLayerContext';
import { useFloatingOverlayPosition } from '../../../../hooks/useFloatingOverlayPosition';
import {
  InputContainerWithPadding,
  LoadingSpinner,
  SkeletonEffect,
  StyledInput,
  IconWrapper,
  CharacterCounterMotion,
} from '../shared';
import { InputFieldShell } from '../Input/InputFieldShell';
import { TimePickerColumns } from '../shared/TimePickerColumns';
import {
  DateInputFieldStack,
  DateTimeCalendarColumn,
  DateTimePickerBody,
  DateTimePopup,
  DateTimePopupFooter,
  DateTimeRangeTimePickerBlock,
  DateTimeRangeTimePickerLabel,
  DateTimeRangeTimePickers,
  DateTimeTimeSection,
  DateTimeTimeSectionTitle,
  ErrorMessage,
  ExtraText,
  IconButton,
  LeftLabel,
  RightLabel,
} from './DateTimeInput.style';

/**
 * Поле ввода даты и времени: календарь и выбор времени в одном попапе.
 * Поддерживает одиночное значение и диапазон (`range: true`).
 */
export const DateTimeInput = forwardRef<HTMLInputElement, DateTimeInputProps>(
  (
    {
      value,
      onChange,
      label,
      placeholder,
      disabled = false,
      readOnly = false,
      size = Size.SM,
      fullWidth = false,
      error,
      success,
      className,
      range = false,
      minDate,
      maxDate,
      showIcon = true,
      icon,
      renderTopPanel,
      renderBottomPanel,
      status,
      isLoading = false,
      skeleton = false,
      handleInput,
      disableCopying = false,
      extraText,
      helperText,
      tooltip,
      tooltipType = 'tooltip',
      tooltipPosition = 'top',
      displayCharacterCounter = true,
      ignoreMaskCharacters = false,
      characterCounterVisibilityThreshold = 0,
      additionalLabel,
      textAlign = 'left',
      displayClearIcon = false,
      onClearIconClick,
      clearIconProps,
      disabledDates = [],
      disabledDays = [],
      disabledMonths = [],
      disabledYears = [],
      showSeconds = false,
      minuteStep = 1,
      secondStep = 1,
      disabledTimes = [],
      disabledHours = [],
      disabledMinutes = [],
      disabledSeconds = [],
      format = DEFAULT_DATETIME_FORMAT,
      showDateRollers = false,
      calendarMonthYearLayout = 'combined',
      calendarFullWidth = false,
      prefix,
      suffix,
      onPickerChange,
      modifyPickerValue,
      deferPickerCommit,
      ...props
    },
    ref,
  ) => {
    const shouldDeferPickerCommit =
      deferPickerCommit ?? Boolean(onPickerChange || modifyPickerValue);

    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [inputValue, setInputValue] = useState('');
    const [activeTimePicker, setActiveTimePicker] = useState<'start' | 'end'>('start');

    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(() => {
      if (!range && typeof value === 'string' && value) {
        const result = parseDateTime(value);
        return result.isValid ? result.date : null;
      }
      return null;
    });

    const [rangeStart, setRangeStart] = useState<Date | null>(() => {
      if (range && typeof value === 'object' && value?.start) {
        const result = parseDateTime(value.start);
        return result.isValid ? result.date : null;
      }
      return null;
    });

    const [rangeEnd, setRangeEnd] = useState<Date | null>(() => {
      if (range && typeof value === 'object' && value?.end) {
        const result = parseDateTime(value.end);
        return result.isValid ? result.date : null;
      }
      return null;
    });

    const [tempRangeEnd, setTempRangeEnd] = useState<Date | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();
    const floatingOverlayLayer = useFloatingOverlayLayer();
    const floatingOverlayZIndex = resolveFloatingOverlayZIndex(
      floatingOverlayLayer.minimumZIndex,
      theme.dropdowns?.settings?.zIndex,
    );
    const floatingPortalRoot = resolveFloatingOverlayPortalRoot(
      undefined,
      floatingOverlayLayer.portalRoot,
    );
    const { position: popupPosition } = useFloatingOverlayPosition({
      isOpen,
      anchorRef: containerRef,
      overlayRef: popupRef,
      positioningMode: 'autoFlip',
    });

    const timeFormat = showSeconds ? 'HH:mm:ss' : 'HH:mm';

    const formatDateTime = useCallback(
      (date: Date | null) => formatDateTimeForDisplay(date, format),
      [format],
    );

    const isDateDisabled = useCallback(
      (date: Date): boolean => {
        if (minDate && date < minDate) {
          return true;
        }
        if (maxDate && date > maxDate) {
          return true;
        }
        if (
          disabledDates.some(
            (disabledDate) =>
              disabledDate.getFullYear() === date.getFullYear() &&
              disabledDate.getMonth() === date.getMonth() &&
              disabledDate.getDate() === date.getDate(),
          )
        ) {
          return true;
        }
        if (disabledDays.includes(date.getDay())) {
          return true;
        }
        if (disabledMonths.includes(date.getMonth())) {
          return true;
        }
        if (disabledYears.includes(date.getFullYear())) {
          return true;
        }
        return false;
      },
      [minDate, maxDate, disabledDates, disabledDays, disabledMonths, disabledYears],
    );

    const getActiveDateTime = (): Date => {
      if (range) {
        if (activeTimePicker === 'start') {
          return rangeStart ?? getCurrentTime();
        }
        return rangeEnd ?? getCurrentTime();
      }
      return selectedDateTime ?? getCurrentTime();
    };

    const syncDraftFromValue = useCallback(() => {
      const draftDates = dateTimePickerDraftDatesFromValue(value, range);

      if (!range) {
        setSelectedDateTime(draftDates.selectedDateTime);
        if (draftDates.selectedDateTime) {
          setCurrentDate(draftDates.selectedDateTime);
        }
        return;
      }

      setRangeStart(draftDates.rangeStart);
      setRangeEnd(draftDates.rangeEnd);
      if (draftDates.rangeStart) {
        setCurrentDate(draftDates.rangeStart);
      }
      setTempRangeEnd(null);
    }, [range, value]);

    /**
     * Обновляет черновик пикера с учётом `modifyPickerValue` / `onPickerChange`.
     * @param nextDraftDates — новые значения черновика
     * @param phase — фаза изменения
     * @param options.updateInputPreview — обновить текст в поле
     */
    const applyPickerDraftUpdate = useCallback(
      (
        nextDraftDates: DateTimePickerDraftDates,
        phase: DateTimePickerDraftPhase,
        options?: { updateInputPreview?: boolean },
      ) => {
        const resolvedDates = resolveDateTimePickerDraft({
          draftDates: nextDraftDates,
          range,
          format,
          phase,
          modifyPickerValue,
          onPickerChange,
        });

        if (!range) {
          setSelectedDateTime(resolvedDates.selectedDateTime);
          if (resolvedDates.selectedDateTime) {
            setCurrentDate(resolvedDates.selectedDateTime);
          }
        } else {
          if (resolvedDates.rangeStart) {
            setCurrentDate(resolvedDates.rangeStart);
          }
          setRangeStart(resolvedDates.rangeStart);
          setRangeEnd(resolvedDates.rangeEnd);
          setTempRangeEnd(null);
        }

        const shouldUpdateInputPreview =
          options?.updateInputPreview ?? !shouldDeferPickerCommit;

        if (shouldUpdateInputPreview) {
          if (!range) {
            setInputValue(
              resolvedDates.selectedDateTime ? formatDateTime(resolvedDates.selectedDateTime) : '',
            );
          } else if (resolvedDates.rangeStart && resolvedDates.rangeEnd) {
            setInputValue(
              `${formatDateTime(resolvedDates.rangeStart)} — ${formatDateTime(resolvedDates.rangeEnd)}`,
            );
          } else if (resolvedDates.rangeStart) {
            setInputValue(formatDateTime(resolvedDates.rangeStart));
          } else {
            setInputValue('');
          }
        }

        return resolvedDates;
      },
      [
        range,
        format,
        modifyPickerValue,
        onPickerChange,
        shouldDeferPickerCommit,
        formatDateTime,
      ],
    );

    useEffect(() => {
      if (isOpen) {
        syncDraftFromValue();
        return;
      }

      if (shouldDeferPickerCommit) {
        syncDraftFromValue();
      }
    }, [isOpen, shouldDeferPickerCommit, syncDraftFromValue]);

    // Синхронизируем inputValue с применённым значением (не с черновиком пикера)
    useEffect(() => {
      if (shouldDeferPickerCommit && isOpen) {
        return;
      }

      if (!range) {
        setInputValue(selectedDateTime ? formatDateTime(selectedDateTime) : '');
        return;
      }

      if (rangeStart && rangeEnd) {
        setInputValue(`${formatDateTime(rangeStart)} — ${formatDateTime(rangeEnd)}`);
      } else if (rangeStart) {
        setInputValue(formatDateTime(rangeStart));
      } else {
        setInputValue('');
      }
    }, [
      range,
      rangeStart,
      rangeEnd,
      selectedDateTime,
      formatDateTime,
      shouldDeferPickerCommit,
      isOpen,
    ]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (containerRef.current?.contains(target) || popupRef.current?.contains(target)) {
          return;
        }
        setIsOpen(false);
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, []);

    const handleIconClick = () => {
      setIsOpen(!isOpen);
      inputRef.current?.focus();
    };

    const handleClearIconClick = () => {
      handleClear();
      onClearIconClick?.();
    };

    const handleClear = () => {
      applyPickerDraftUpdate(
        { selectedDateTime: null, rangeStart: null, rangeEnd: null },
        'clear',
        { updateInputPreview: true },
      );

      if (!range) {
        onChange?.('');
      } else {
        onChange?.({ start: '', end: '' });
      }
      setIsOpen(false);
    };

    const handleDayClick = (date: Date) => {
      if (!range) {
        const nextDateTime = mergeDateAndTime(date, selectedDateTime ?? getCurrentTime());
        applyPickerDraftUpdate(
          { selectedDateTime: nextDateTime, rangeStart: null, rangeEnd: null },
          'pick',
        );
        setCurrentDate(date);
        return;
      }

      let nextRangeStart = rangeStart;
      let nextRangeEnd = rangeEnd;

      if (!rangeStart || (rangeStart && rangeEnd)) {
        nextRangeStart = mergeDateAndTime(date, rangeStart ?? getCurrentTime());
        nextRangeEnd = null;
        setActiveTimePicker('start');
      } else if (date < rangeStart) {
        nextRangeStart = mergeDateAndTime(date, rangeStart);
        nextRangeEnd = mergeDateAndTime(rangeStart, rangeEnd ?? getCurrentTime());
      } else {
        nextRangeEnd = mergeDateAndTime(date, rangeEnd ?? getCurrentTime());
      }

      applyPickerDraftUpdate(
        { selectedDateTime: null, rangeStart: nextRangeStart, rangeEnd: nextRangeEnd },
        'pick',
      );
      setCurrentDate(date);
    };

    const handleDayMouseEnter = (date: Date) => {
      if (range && rangeStart && !rangeEnd) {
        setTempRangeEnd(date);
      }
    };

    const handleDayMouseLeave = () => {
      if (range) {
        setTempRangeEnd(null);
      }
    };

    const handleCalendarRollersDate = (date: Date) => {
      handleDayClick(date);
    };

    const handleSingleTimeChange = (nextTime: Date) => {
      const baseDate = selectedDateTime ?? currentDate;
      const nextDateTime = mergeDateAndTime(baseDate, nextTime);
      applyPickerDraftUpdate(
        { selectedDateTime: nextDateTime, rangeStart: null, rangeEnd: null },
        'pick',
      );
    };

    const handleRangeStartTimeChange = (nextTime: Date) => {
      const baseDate = rangeStart ?? currentDate;
      const nextDateTime = mergeDateAndTime(baseDate, nextTime);
      applyPickerDraftUpdate(
        { selectedDateTime: null, rangeStart: nextDateTime, rangeEnd },
        'pick',
      );
    };

    const handleRangeEndTimeChange = (nextTime: Date) => {
      const baseDate = rangeEnd ?? currentDate;
      const nextDateTime = mergeDateAndTime(baseDate, nextTime);
      applyPickerDraftUpdate(
        { selectedDateTime: null, rangeStart, rangeEnd: nextDateTime },
        'pick',
      );
    };

    const handleApply = () => {
      if (!range) {
        if (!selectedDateTime) {
          setIsOpen(false);
          return;
        }

        const resolvedDates = applyPickerDraftUpdate(
          { selectedDateTime, rangeStart: null, rangeEnd: null },
          'apply',
          { updateInputPreview: true },
        );

        if (resolvedDates.selectedDateTime) {
          onChange?.(toISODateTimeString(resolvedDates.selectedDateTime, format));
        }
        setIsOpen(false);
        return;
      }

      if (!rangeStart || !rangeEnd) {
        return;
      }

      const resolvedDates = applyPickerDraftUpdate(
        { selectedDateTime: null, rangeStart, rangeEnd },
        'apply',
        { updateInputPreview: true },
      );

      if (resolvedDates.rangeStart && resolvedDates.rangeEnd) {
        onChange?.({
          start: toISODateTimeString(resolvedDates.rangeStart, format),
          end: toISODateTimeString(resolvedDates.rangeEnd, format),
        });
      }
      setIsOpen(false);
    };

    const handleInputChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
      let nextValue = changeEvent.target.value;
      let cursorPosition = changeEvent.target.selectionStart || 0;

      if (handleInput) {
        const result = handleInput(nextValue, cursorPosition);
        nextValue = result.value;
        cursorPosition = result.cursorPosition;

        setTimeout(() => {
          changeEvent.target.setSelectionRange?.(cursorPosition, cursorPosition);
        }, 0);

        setInputValue(nextValue);
        return;
      }

      setInputValue(nextValue);

      if (!nextValue.trim()) {
        handleClear();
        return;
      }

      if (range) {
        const rangeMatch = nextValue.match(/^(.+?)\s*—\s*(.+)$/);
        if (rangeMatch) {
          const startResult = parseDateTime(rangeMatch[1].trim());
          const endResult = parseDateTime(rangeMatch[2].trim());
          if (startResult.isValid && endResult.isValid && startResult.date && endResult.date) {
            setRangeStart(startResult.date);
            setRangeEnd(endResult.date);
            setTempRangeEnd(null);
            setCurrentDate(startResult.date);
          }
        } else {
          const parsedResult = parseDateTime(nextValue);
          if (parsedResult.isValid && parsedResult.date) {
            setRangeStart(parsedResult.date);
            setRangeEnd(null);
            setTempRangeEnd(null);
            setCurrentDate(parsedResult.date);
          }
        }
        return;
      }

      const parsedResult = parseDateTime(nextValue);
      if (parsedResult.isValid && parsedResult.date) {
        setSelectedDateTime(parsedResult.date);
        setCurrentDate(parsedResult.date);
        onChange?.(toISODateTimeString(parsedResult.date, format));
      }
    };

    const handleInputKeyDown = (keyboardEvent: React.KeyboardEvent<HTMLInputElement>) => {
      if (keyboardEvent.key !== 'Enter') {
        return;
      }

      if (range) {
        const rangeMatch = inputValue.match(/^(.+?)\s*—\s*(.+)$/);
        if (rangeMatch) {
          const startResult = parseDateTime(rangeMatch[1].trim());
          const endResult = parseDateTime(rangeMatch[2].trim());
          if (startResult.isValid && endResult.isValid && startResult.date && endResult.date) {
            onChange?.({
              start: toISODateTimeString(startResult.date, format),
              end: toISODateTimeString(endResult.date, format),
            });
          }
        }
      } else {
        const parsedResult = parseDateTime(inputValue);
        if (parsedResult.isValid && parsedResult.date) {
          onChange?.(toISODateTimeString(parsedResult.date, format));
        }
      }

      setIsOpen(false);
    };

    const renderSingleTimePicker = () => (
      <DateTimeTimeSection>
        <DateTimeTimeSectionTitle>Время</DateTimeTimeSectionTitle>
        <TimePickerColumns
          selectedTime={getActiveDateTime()}
          onTimePartChange={handleSingleTimeChange}
          size={size}
          showSeconds={showSeconds}
          minuteStep={minuteStep}
          secondStep={secondStep}
          disabledHours={disabledHours}
          disabledMinutes={disabledMinutes}
          disabledSeconds={disabledSeconds}
          disabledTimes={disabledTimes}
          timeFormat={timeFormat}
        />
      </DateTimeTimeSection>
    );

    const renderRangeTimePickers = () => (
      <DateTimeTimeSection>
        <DateTimeTimeSectionTitle>Время диапазона</DateTimeTimeSectionTitle>
        <DateTimeRangeTimePickers>
          <DateTimeRangeTimePickerBlock
            $isActive={activeTimePicker === 'start'}
            onClick={() => setActiveTimePicker('start')}
          >
            <DateTimeRangeTimePickerLabel>Начало</DateTimeRangeTimePickerLabel>
            <TimePickerColumns
              selectedTime={rangeStart ?? getCurrentTime()}
              onTimePartChange={handleRangeStartTimeChange}
              size={size}
              showSeconds={showSeconds}
              minuteStep={minuteStep}
              secondStep={secondStep}
              disabledHours={disabledHours}
              disabledMinutes={disabledMinutes}
              disabledSeconds={disabledSeconds}
              disabledTimes={disabledTimes}
              timeFormat={timeFormat}
            />
          </DateTimeRangeTimePickerBlock>

          <DateTimeRangeTimePickerBlock
            $isActive={activeTimePicker === 'end'}
            onClick={() => setActiveTimePicker('end')}
          >
            <DateTimeRangeTimePickerLabel>Конец</DateTimeRangeTimePickerLabel>
            <TimePickerColumns
              selectedTime={rangeEnd ?? getCurrentTime()}
              onTimePartChange={handleRangeEndTimeChange}
              size={size}
              showSeconds={showSeconds}
              minuteStep={minuteStep}
              secondStep={secondStep}
              disabledHours={disabledHours}
              disabledMinutes={disabledMinutes}
              disabledSeconds={disabledSeconds}
              disabledTimes={disabledTimes}
              timeFormat={timeFormat}
            />
          </DateTimeRangeTimePickerBlock>
        </DateTimeRangeTimePickers>
      </DateTimeTimeSection>
    );

    const dateTimeInputContent = (
      <InputContainerWithPadding
        ref={containerRef}
        disabled={disabled}
        error={!!error}
        className={clsx('ui-date-time-input', className)}
      >
        {(label || additionalLabel) && (
          <div
            style={{
              position: 'relative',
              marginBottom: '4px',
              width: '100%',
              height: '20px',
            }}
          >
            {label ? (
              <LeftLabel focused={isOpen} disabled={disabled} error={!!error} size={size}>
                {label}
              </LeftLabel>
            ) : null}
            {additionalLabel ? (
              <RightLabel focused={isOpen} disabled={disabled} error={!!error} size={size}>
                {additionalLabel}
              </RightLabel>
            ) : null}
          </div>
        )}

        <DateInputFieldStack fullWidth={fullWidth}>
          {skeleton ? (
            <SkeletonEffect size={size} fullWidth />
          ) : (
            <InputFieldShell
              focused={isOpen}
              error={error}
              success={success}
              size={size}
              status={status}
              fullWidth={fullWidth}
              readOnly={readOnly}
              prefix={prefix}
              suffix={suffix}
              disabled={disabled}
            >
              {showIcon ? (
                <IconWrapper size={size}>
                  {isLoading ? (
                    <LoadingSpinner size={size} />
                  ) : (
                    <IconButton type="button" onClick={handleIconClick}>
                      {icon ?? (
                        <Icon
                          name="IconPlainerCalendar"
                          size={
                            size === Size.SM
                              ? IconSize.XS
                              : size === Size.LG
                                ? IconSize.MD
                                : IconSize.SM
                          }
                        />
                      )}
                    </IconButton>
                  )}
                </IconWrapper>
              ) : null}

              <StyledInput
                ref={ref || inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                disabled={disabled}
                readOnly={readOnly}
                placeholder={placeholder || (range ? 'ДД.ММ.ГГГГ ЧЧ:ММ — ДД.ММ.ГГГГ ЧЧ:ММ' : 'Выберите дату и время')}
                textAlign={textAlign}
                onSelect={
                  disableCopying
                    ? (selectEvent: React.SyntheticEvent<HTMLInputElement>) =>
                        selectEvent.preventDefault()
                    : undefined
                }
                onCopy={
                  disableCopying
                    ? (clipboardEvent: React.ClipboardEvent<HTMLInputElement>) =>
                        clipboardEvent.preventDefault()
                    : undefined
                }
                onCut={
                  disableCopying
                    ? (clipboardEvent: React.ClipboardEvent<HTMLInputElement>) =>
                        clipboardEvent.preventDefault()
                    : undefined
                }
                onPaste={
                  disableCopying
                    ? (clipboardEvent: React.ClipboardEvent<HTMLInputElement>) =>
                        clipboardEvent.preventDefault()
                    : undefined
                }
                {...props}
              />

              {displayClearIcon && inputValue && !disabled ? (
                <IconWrapper size={size} style={{ marginLeft: 'auto' }}>
                  <IconButton type="button" onClick={handleClearIconClick}>
                    <Icon
                      name="IconPlainerClose"
                      size={getClearIconSizeForInputField(size)}
                      {...clearIconProps}
                    />
                  </IconButton>
                </IconWrapper>
              ) : null}
            </InputFieldShell>
          )}

          {error ? <ErrorMessage size={size}>{error}</ErrorMessage> : null}
          {extraText ? <ExtraText size={size}>{extraText}</ExtraText> : null}
          {helperText ? <ExtraText size={size}>{helperText}</ExtraText> : null}

          {displayCharacterCounter && props.maxLength
            ? (() => {
                const currentLength = ignoreMaskCharacters
                  ? inputValue.replace(/[.\-:\s/]/g, '').length
                  : inputValue.length;
                const shouldShowCounter =
                  characterCounterVisibilityThreshold === 0 ||
                  (characterCounterVisibilityThreshold !== 1 &&
                    currentLength >= props.maxLength! * characterCounterVisibilityThreshold);

                return (
                  <CharacterCounterMotion
                    visible={shouldShowCounter}
                    currentLength={currentLength}
                    maxLength={props.maxLength!}
                  />
                );
              })()
            : null}
        </DateInputFieldStack>
      </InputContainerWithPadding>
    );

    const popupPortal =
      isOpen && floatingPortalRoot
        ? createPortal(
            <DateTimePopup
              ref={popupRef}
              isOpen={isOpen}
              size={size}
              $calendarFullWidth={calendarFullWidth}
              $range={range}
              $showSeconds={showSeconds}
              $portaled
              style={{
                left: popupPosition.x,
                top: popupPosition.y,
                zIndex: floatingOverlayZIndex,
              }}
            >
              {renderTopPanel ? (
                <div style={{ padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
                  {renderTopPanel()}
                </div>
              ) : null}

              <DateTimePickerBody>
                <DateTimeCalendarColumn>
                  <Calendar
                    embedded
                    showTitle={false}
                    visibleMonth={currentDate}
                    onVisibleMonthChange={(monthStart) => setCurrentDate(monthStart)}
                    locale="ru-RU"
                    weekStartsOn={1}
                    headerMode="monthYear"
                    showMonthPicker
                    monthYearLayout={calendarMonthYearLayout}
                    showDateRollers={showDateRollers}
                    onRollersDateChange={handleCalendarRollersDate}
                    size={size}
                    disabled={disabled}
                    minDate={minDate}
                    maxDate={maxDate}
                    isDateDisabled={isDateDisabled}
                    selectionMode={range ? 'range' : 'single'}
                    {...(!range ? { value: selectedDateTime } : {})}
                    rangeStart={range ? rangeStart : null}
                    rangeEnd={range ? rangeEnd : null}
                    rangeHoverDate={range ? tempRangeEnd : null}
                    onSelectDate={handleDayClick}
                    onDayMouseEnter={handleDayMouseEnter}
                    onDayMouseLeave={handleDayMouseLeave}
                    weekdays={getWeekdayNames()}
                  />
                </DateTimeCalendarColumn>

                {range ? renderRangeTimePickers() : renderSingleTimePicker()}
              </DateTimePickerBody>

              <DateTimePopupFooter>
                <Button variant={ButtonVariant.SECONDARY} size={size} type="button" onClick={handleClear}>
                  Очистить
                </Button>
                <Button variant={ButtonVariant.PRIMARY} size={size} type="button" onClick={handleApply}>
                  {range ? 'Применить' : 'OK'}
                </Button>
              </DateTimePopupFooter>

              {renderBottomPanel ? (
                <div style={{ padding: '16px', borderTop: '1px solid #e0e0e0' }}>
                  {renderBottomPanel()}
                </div>
              ) : null}
            </DateTimePopup>,
            floatingPortalRoot,
          )
        : null;

    if (tooltip) {
      if (tooltipType === 'hint') {
        const hintPosition =
          tooltipPosition === 'top'
            ? HintPosition.TOP
            : tooltipPosition === 'bottom'
              ? HintPosition.BOTTOM
              : tooltipPosition === 'left'
                ? HintPosition.LEFT
                : HintPosition.RIGHT;

        return (
          <>
            <Hint content={tooltip} placement={hintPosition} variant={HintVariant.DEFAULT}>
              {dateTimeInputContent}
            </Hint>
            {popupPortal}
          </>
        );
      }

      const tooltipPos =
        tooltipPosition === 'top'
          ? TooltipPosition.TOP
          : tooltipPosition === 'bottom'
            ? TooltipPosition.BOTTOM
            : tooltipPosition === 'left'
              ? TooltipPosition.LEFT
              : TooltipPosition.RIGHT;

      return (
        <>
          <Tooltip content={tooltip} position={tooltipPos}>
            {dateTimeInputContent}
          </Tooltip>
          {popupPortal}
        </>
      );
    }

    return (
      <>
        {dateTimeInputContent}
        {popupPortal}
      </>
    );
  },
);

DateTimeInput.displayName = 'DateTimeInput';

/**
 * Алиас для режима диапазона даты и времени.
 * @param props - пропсы `DateTimeInput` с принудительным `range: true`
 */
export const DateTimeInputRange = forwardRef<
  HTMLInputElement,
  Omit<DateTimeInputProps, 'range'> & { value?: DateTimeRange; onChange?: (range: DateTimeRange) => void }
>((props, ref) => <DateTimeInput {...props} range ref={ref} />);

DateTimeInputRange.displayName = 'DateTimeInputRange';
