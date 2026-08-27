import React, { forwardRef, useState, useRef, useEffect, useCallback, useId, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import { useTheme } from 'styled-components';
import { ButtonVariant, TooltipPosition, type DatePickerProps } from '../../../../types/ui';
import { formatDateForDisplay, getWeekdayNames } from '../../../../handlers/dateHandlers';
import {
  computeRangeDatesAfterDayClick,
  datePickerDraftDatesFromValue,
  resolveDatePickerDraft,
  type DatePickerDraftDates,
  type DatePickerDraftPhase,
} from '../../../../handlers/dateInputPickerHandlers';
import {
  doesFormatUseNamedMonth,
  formatDateByPrecision,
  formatDateInputByPrecision,
  formatPeriodForDisplay,
  getDateInputVisibleSegments,
  getNeighborDateSegment,
  isCompleteDateStringByPrecision,
  isMonthPeriodDisabled,
  isPeriodPrecision,
  isYearPeriodDisabled,
  parseMonthInputValue,
  parsePrecisionValue,
  resolveDateInputFormat,
  type DateInputSegment,
} from '../../../../handlers/dateInputPrecisionHandlers';
import {
  getMonthWeekByNumber,
  getWeekOfMonthFromDate,
  isWeekPeriodDisabled,
} from '../../../../handlers/dateInputWeekHandlers';
import { getClearIconSizeForInputField } from '../../../../handlers/iconHandlers';
import {
  isFloatingInputLabel,
  shouldReserveFloatingInputCaptionSpace,
} from '../../../../handlers/inputFieldCaptionHandlers';
import { Size, IconSize } from '../../../../types/sizes';
import { Calendar } from '../../Calendar/Calendar';
import { DateInputPeriodPicker } from './DateInputPeriodPicker';
import { Button } from '../../buttons/Button/Button';
import { Icon } from '../../Icon/Icon';
import { Tooltip } from '../../Tooltip/Tooltip';
import { Hint, HintPosition, HintVariant } from '../../Hint/Hint';
import {
  resolveFloatingOverlayPortalRoot,
  resolveFloatingOverlayZIndex,
  getFloatingOverlayPlacementStyle,
} from '../../../../handlers/floatingOverlayHandlers';
import { useFloatingOverlayLayer } from '../../../../contexts/FloatingOverlayLayerContext';
import { useFloatingOverlayPosition } from '../../../../hooks/useFloatingOverlayPosition';
import {
  InputControlStack,
  LoadingSpinner,
  SkeletonEffect,
  StyledInput,
  IconWrapper,
  CharacterCounterMotion,
  InputFieldCaption,
} from '../shared';
import { InputFieldShell } from '../Input/InputFieldShell';
import {
  CalendarPopup,
  DateSegment,
  DateSegmentsContainer,
  DateSeparator,
  ErrorMessage,
  ExtraText,
  IconButton,
  RangeDateContainer,
  RangeDateGroup,
  RangeDateLabel,
  RangeDateSeparator,
  DateInputPickerChrome,
  DateInputRoot,
} from './DateInput.style';

export const DateInput = forwardRef<HTMLInputElement, DatePickerProps>(
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
      autoWidth = false,
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
      segmented = false, // По умолчанию используем обычный input
      format: formatProp,
      precision = 'day',
      weekOfMonthMode = 'calendar',
      showDateRollers = false,
      calendarMonthYearLayout = 'combined',
      calendarFullWidth = false,
      prefix,
      suffix,
      onPickerChange,
      modifyPickerValue,
      deferPickerCommit,
      required,
      labelVariant,
      ...props
    },
    ref,
  ) => {
    const shouldDeferPickerCommit =
      deferPickerCommit ?? Boolean(onPickerChange || modifyPickerValue);
    const format = resolveDateInputFormat(formatProp, precision);
    const weekOptions = useMemo(() => ({ weekOfMonthMode }), [weekOfMonthMode]);
    const dateInputId = useId();
    const hasFieldCaption = Boolean(label || additionalLabel);
    const useFloatingCaption = isFloatingInputLabel(labelVariant);
    const reserveFloatingCaptionPadding = shouldReserveFloatingInputCaptionSpace(
      labelVariant,
      hasFieldCaption,
    );

    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [inputValue, setInputValue] = useState('');

    // Инициализируем состояния в зависимости от режима и типа value
    const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
      if (!range && typeof value === 'string' && value) {
        const result = parsePrecisionValue(value, precision, { weekOfMonthMode });
        return result.isValid ? result.date : null;
      }
      return null;
    });

    const [rangeStart, setRangeStart] = useState<Date | null>(() => {
      if (range && typeof value === 'object' && value?.start) {
        const result = parsePrecisionValue(value.start, precision, { weekOfMonthMode });
        return result.isValid ? result.date : null;
      }
      return null;
    });

    const [rangeEnd, setRangeEnd] = useState<Date | null>(() => {
      if (range && typeof value === 'object' && value?.end) {
        const result = parsePrecisionValue(value.end, precision, { weekOfMonthMode });
        return result.isValid ? result.date : null;
      }
      return null;
    });
    const [tempRangeEnd, setTempRangeEnd] = useState<Date | null>(null);

    // Состояния для сегментированного ввода даты
    const [activeSegment, setActiveSegment] = useState<DateInputSegment | null>(null);
    const [activePicker, setActivePicker] = useState<'start' | 'end'>('start');

    // Состояния для ввода с клавиатуры
    const [inputBuffer, setInputBuffer] = useState<{
      day: string;
      month: string;
      year: string;
      week: string;
    }>({ day: '', month: '', year: '', week: '' });

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const calendarPopupRef = useRef<HTMLDivElement>(null);
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
    const { position: calendarPopupPosition, isPositionReady: isCalendarPopupPositionReady } =
      useFloatingOverlayPosition({
        isOpen,
        anchorRef: containerRef,
        overlayRef: calendarPopupRef,
        positioningMode: 'autoFlip',
      });

    // Refs для сегментов даты (отдельные для каждого picker в range режиме)
    const startDayRef = useRef<HTMLSpanElement>(null);
    const startMonthRef = useRef<HTMLSpanElement>(null);
    const startYearRef = useRef<HTMLSpanElement>(null);
    const startWeekRef = useRef<HTMLSpanElement>(null);
    const endDayRef = useRef<HTMLSpanElement>(null);
    const endMonthRef = useRef<HTMLSpanElement>(null);
    const endYearRef = useRef<HTMLSpanElement>(null);
    const endWeekRef = useRef<HTMLSpanElement>(null);

    const handleFocus = () => {
      // Убираем автоматическое открытие календаря при фокусе
      // Календарь должен открываться только при клике на иконку
    };
    const handleBlur = () => {
      // Не закрываем сразу, чтобы можно было кликнуть на календарь
      setTimeout(() => {
        if (!containerRef.current?.contains(document.activeElement)) {
          setIsOpen(false);
        }
      }, 150);
    };

    const handleIconClick = () => {
      setIsOpen(!isOpen);
      // Фокусируемся на инпуте после клика по иконке
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const handleClearIconClick = () => {
      setInputValue('');
      if (onChange) {
        onChange('');
      }
      if (onClearIconClick) {
        onClearIconClick();
      }
    };

    const handleInputClick = () => {
      // Убираем переключение состояния, так как handleFocus уже открывает календарь
      // setIsOpen(!isOpen);
    };

    // Маска и полнота строки зависят от точности (день / месяц / год)
    const formatDateInput = (value: string): string => {
      return formatDateInputByPrecision(value, precision, format);
    };

    const isCompleteDateString = (value: string): boolean => {
      return isCompleteDateStringByPrecision(value, precision, format);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;
      let cursorPosition = e.target.selectionStart || 0;

      // Применяем handleInput если он предоставлен
      if (handleInput) {
        const result = handleInput(newValue, cursorPosition);
        newValue = result.value;
        cursorPosition = result.cursorPosition;

        // Создаем новое событие с обработанным значением
        const _syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: newValue,
          },
        } as React.ChangeEvent<HTMLInputElement>;

        // Устанавливаем позицию курсора после следующего рендера
        setTimeout(() => {
          if (e.target.setSelectionRange) {
            e.target.setSelectionRange(cursorPosition, cursorPosition);
          }
        }, 0);

        // Если используется handleInput, только обновляем значение без парсинга даты
        setInputValue(newValue);
        return;
      }

      // Применяем автоматическое форматирование (если не используется handleInput)
      const formattedValue = formatDateInput(newValue);
      setInputValue(formattedValue);

      // Парсим введенную дату только если строка выглядит как полная дата
      // (содержит разделители и достаточную длину)
      if (formattedValue.trim() && isCompleteDateString(formattedValue)) {
        if (range) {
          // Проверяем, является ли введенное значение диапазоном дат
          const rangeMatch = formattedValue.match(/^(.+?)\s*—\s*(.+)$/);
          if (rangeMatch) {
            const startDateStr = rangeMatch[1].trim();
            const endDateStr = rangeMatch[2].trim();

            const startResult = parsePrecisionValue(startDateStr, precision, weekOptions);
            const endResult = parsePrecisionValue(endDateStr, precision, weekOptions);

            if (startResult.isValid && endResult.isValid && startResult.date && endResult.date) {
              setRangeStart(startResult.date);
              setRangeEnd(endResult.date);
              setTempRangeEnd(null);
              setCurrentDate(startResult.date); // Обновляем текущий месяц в календаре на начало диапазона
            }
          } else {
            // Одиночная дата в range режиме
            const parsedResult = parsePrecisionValue(formattedValue, precision, weekOptions);
            if (parsedResult.isValid && parsedResult.date) {
              setRangeStart(parsedResult.date);
              setCurrentDate(parsedResult.date); // Обновляем текущий месяц в календаре
              setRangeEnd(null);
              setTempRangeEnd(null);
            }
          }
        } else {
          // Одиночная дата в обычном режиме
          const parsedResult = parsePrecisionValue(formattedValue, precision, weekOptions);
          if (parsedResult.isValid && parsedResult.date) {
            setSelectedDate(parsedResult.date);
            setCurrentDate(parsedResult.date); // Обновляем текущий месяц в календаре
            if (onChange) {
              onChange(formatDateByPrecision(parsedResult.date, precision, weekOptions));
            }
          }
        }
      } else if (!formattedValue.trim()) {
        // Если поле очищено, сбрасываем выбранные даты
        if (range) {
          setRangeStart(null);
          setRangeEnd(null);
          setTempRangeEnd(null);
        } else {
          setSelectedDate(null);
        }
        if (onChange) {
          onChange(range ? { start: '', end: '' } : '');
        }
      }
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Обрабатываем только Enter для подтверждения ввода
      if (e.key === 'Enter') {
        if (range) {
          // Проверяем, является ли введенное значение диапазоном дат
          const rangeMatch = inputValue.match(/^(.+?)\s*—\s*(.+)$/);
          if (rangeMatch) {
            const startDateStr = rangeMatch[1].trim();
            const endDateStr = rangeMatch[2].trim();

            const startResult = parsePrecisionValue(startDateStr, precision, weekOptions);
            const endResult = parsePrecisionValue(endDateStr, precision, weekOptions);

            if (startResult.isValid && endResult.isValid && startResult.date && endResult.date) {
              setRangeStart(startResult.date);
              setRangeEnd(endResult.date);
              setTempRangeEnd(null);
              setCurrentDate(startResult.date); // Обновляем текущий месяц в календаре на начало диапазона
              if (onChange) {
                onChange({
                  start: formatDateByPrecision(startResult.date, precision, weekOptions),
                  end: formatDateByPrecision(endResult.date, precision, weekOptions),
                });
              }
            }
          } else {
            // Одиночная дата в range режиме
            const parsedResult = parsePrecisionValue(inputValue, precision, weekOptions);
            if (parsedResult.isValid && parsedResult.date) {
              setRangeStart(parsedResult.date);
              setCurrentDate(parsedResult.date); // Обновляем текущий месяц в календаре
              setRangeEnd(null);
              setTempRangeEnd(null);
            }
          }
        } else {
          // Одиночная дата в обычном режиме
          const parsedResult = parsePrecisionValue(inputValue, precision, weekOptions);
          if (parsedResult.isValid && parsedResult.date) {
            setSelectedDate(parsedResult.date);
            setCurrentDate(parsedResult.date); // Обновляем текущий месяц в календаре
            if (onChange) {
              onChange(formatDateByPrecision(parsedResult.date, precision, weekOptions));
            }
          }
        }
        setIsOpen(false);
      }
    };

    const formatDate = useCallback(
      (date: Date | null) => formatPeriodForDisplay(date, format, precision, weekOptions),
      [format, precision, weekOptions],
    );

    const syncDraftFromValue = useCallback(() => {
      const draftDates = datePickerDraftDatesFromValue(value, range, {
        precision,
        weekOfMonthMode,
      });

      if (!range) {
        setSelectedDate(draftDates.selectedDate);
        if (draftDates.selectedDate) {
          setCurrentDate(draftDates.selectedDate);
        }
        return;
      }

      setRangeStart(draftDates.rangeStart);
      setRangeEnd(draftDates.rangeEnd);
      if (draftDates.rangeStart) {
        setCurrentDate(draftDates.rangeStart);
      }
      setTempRangeEnd(null);
    }, [range, value, precision, weekOfMonthMode]);

    /**
     * Обновляет черновик пикера с учётом `modifyPickerValue` / `onPickerChange`.
     * @param nextDraftDates — новые даты черновика
     * @param phase — фаза изменения
     * @param options.updateInputPreview — обновить текст в поле (по умолчанию false при отложенном коммите)
     */
    const applyPickerDraftUpdate = useCallback(
      (
        nextDraftDates: DatePickerDraftDates,
        phase: DatePickerDraftPhase,
        options?: { updateInputPreview?: boolean },
      ) => {
        const resolvedDates = resolveDatePickerDraft({
          draftDates: nextDraftDates,
          range,
          format,
          precision,
          weekOfMonthMode,
          phase,
          modifyPickerValue,
          onPickerChange,
        });

        if (!range) {
          setSelectedDate(resolvedDates.selectedDate);
          if (resolvedDates.selectedDate) {
            setCurrentDate(resolvedDates.selectedDate);
          }
        } else {
          if (resolvedDates.rangeStart) {
            setCurrentDate(resolvedDates.rangeStart);
          }
          setRangeStart(resolvedDates.rangeStart);
          setRangeEnd(resolvedDates.rangeEnd);
          setTempRangeEnd(null);
        }

        const shouldUpdateInputPreview = options?.updateInputPreview ?? !shouldDeferPickerCommit;

        if (shouldUpdateInputPreview) {
          if (!range) {
            setInputValue(resolvedDates.selectedDate ? formatDate(resolvedDates.selectedDate) : '');
          } else if (resolvedDates.rangeStart && resolvedDates.rangeEnd) {
            setInputValue(
              `${formatDate(resolvedDates.rangeStart)} — ${formatDate(resolvedDates.rangeEnd)}`,
            );
          } else if (resolvedDates.rangeStart) {
            setInputValue(formatDate(resolvedDates.rangeStart));
          } else {
            setInputValue('');
          }
        }

        return resolvedDates;
      },
      [
        range,
        format,
        precision,
        weekOfMonthMode,
        modifyPickerValue,
        onPickerChange,
        shouldDeferPickerCommit,
        formatDate,
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

    const _getDisplayValue = (): string => {
      if (!range) {
        return selectedDate ? formatDate(selectedDate) : '';
      } else {
        if (rangeStart && rangeEnd) {
          return `${formatDate(rangeStart)} — ${formatDate(rangeEnd)}`;
        } else if (rangeStart) {
          return formatDate(rangeStart);
        }
        return '';
      }
    };

    // Синхронизируем inputValue с применённым значением (не с черновиком пикера)
    useEffect(() => {
      if (shouldDeferPickerCommit && isOpen) {
        return;
      }

      if (!range) {
        setInputValue(selectedDate ? formatDate(selectedDate) : '');
      } else {
        if (rangeStart && rangeEnd) {
          setInputValue(`${formatDate(rangeStart)} — ${formatDate(rangeEnd)}`);
        } else if (rangeStart) {
          setInputValue(formatDate(rangeStart));
        } else {
          setInputValue('');
        }
      }
    }, [selectedDate, rangeStart, rangeEnd, range, formatDate, shouldDeferPickerCommit, isOpen]);

    const handleDayClick = (date: Date) => {
      if (!range) {
        if (shouldDeferPickerCommit) {
          applyPickerDraftUpdate({ selectedDate: date, rangeStart: null, rangeEnd: null }, 'pick');
          return;
        }

        setSelectedDate(date);
        setInputValue(formatDate(date));
        onChange?.(formatDateByPrecision(date, precision, weekOptions));
        setIsOpen(false);
        return;
      }

      const nextDraftDates = computeRangeDatesAfterDayClick(date, rangeStart, rangeEnd);
      applyPickerDraftUpdate(nextDraftDates, 'pick');
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

    /** Роллеры: одиночная дата без закрытия попапа; диапазон — та же логика, что у клика по дню */
    const handleCalendarRollersDate = (pickedDate: Date) => {
      if (!range) {
        if (shouldDeferPickerCommit) {
          applyPickerDraftUpdate(
            { selectedDate: pickedDate, rangeStart: null, rangeEnd: null },
            'pick',
          );
          setCurrentDate(pickedDate);
          return;
        }

        setSelectedDate(pickedDate);
        setInputValue(formatDate(pickedDate));
        onChange?.(formatDateByPrecision(pickedDate, precision, weekOptions));
        setCurrentDate(pickedDate);
        return;
      }

      handleDayClick(pickedDate);
    };

    const handleApply = () => {
      if (range) {
        if (!rangeStart || !rangeEnd) {
          return;
        }

        const resolvedDates = applyPickerDraftUpdate(
          { selectedDate: null, rangeStart, rangeEnd },
          'apply',
          { updateInputPreview: true },
        );

        if (resolvedDates.rangeStart && resolvedDates.rangeEnd) {
          onChange?.({
            start: formatDateByPrecision(resolvedDates.rangeStart, precision, weekOptions),
            end: formatDateByPrecision(resolvedDates.rangeEnd, precision, weekOptions),
          });
        }
      } else if (selectedDate) {
        const resolvedDates = applyPickerDraftUpdate(
          { selectedDate, rangeStart: null, rangeEnd: null },
          'apply',
          { updateInputPreview: true },
        );

        if (resolvedDates.selectedDate) {
          onChange?.(formatDateByPrecision(resolvedDates.selectedDate, precision, weekOptions));
        }
      }

      setIsOpen(false);
    };

    const handleClear = () => {
      applyPickerDraftUpdate({ selectedDate: null, rangeStart: null, rangeEnd: null }, 'clear', {
        updateInputPreview: true,
      });

      if (!range) {
        onChange?.('');
      } else {
        onChange?.({ start: '', end: '' });
      }

      setIsOpen(false);
    };

    // Обработчики для сегментированного ввода даты
    const handleSegmentClick = (segment: DateInputSegment, pickerType?: 'start' | 'end') => {
      if (disabled) return;
      setActiveSegment(segment);
      if (range && pickerType) {
        setActivePicker(pickerType);
      }
      // Очищаем буфер при клике на новый сегмент
      setInputBuffer({ day: '', month: '', year: '', week: '' });
    };

    // Функция для валидации и применения введенного значения
    const applyInputValue = (
      segment: DateInputSegment,
      value: string,
      pickerType?: 'start' | 'end',
    ) => {
      const actualPickerType = range ? pickerType : 'start';
      const currentDate = range
        ? actualPickerType === 'start'
          ? rangeStart || new Date()
          : actualPickerType === 'end'
            ? rangeEnd || new Date()
            : null
        : selectedDate;

      if (!currentDate) return;

      const newDate = new Date(currentDate);
      let isValid = true;

      switch (segment) {
        case 'day': {
          const day = parseInt(value);
          if (day >= 1 && day <= 31) {
            newDate.setDate(day);
          } else {
            isValid = false;
          }
          break;
        }
        case 'month': {
          const monthIndex = parseMonthInputValue(value);
          if (monthIndex !== null) {
            newDate.setMonth(monthIndex);
          } else {
            isValid = false;
          }
          break;
        }
        case 'year': {
          const year = parseInt(value);
          if (year >= 1900 && year <= 2100) {
            newDate.setFullYear(year);
          } else {
            isValid = false;
          }
          break;
        }
        case 'week': {
          const weekNumber = Number.parseInt(value, 10);
          const week = getMonthWeekByNumber(
            newDate.getFullYear(),
            newDate.getMonth(),
            weekNumber,
            weekOptions,
          );
          if (week) {
            newDate.setTime(week.startDate.getTime());
          } else {
            isValid = false;
          }
          break;
        }
      }

      const selectedWeek = getWeekOfMonthFromDate(newDate, weekOptions);
      const isPeriodDisabled =
        precision === 'year'
          ? isYearPeriodDisabled(newDate.getFullYear(), {
              minDate,
              maxDate,
              isDateDisabled,
            })
          : precision === 'month' || precision === 'monthYear'
            ? isMonthPeriodDisabled(newDate.getFullYear(), newDate.getMonth(), {
                minDate,
                maxDate,
                isDateDisabled,
              })
            : precision === 'week'
              ? !selectedWeek ||
                isWeekPeriodDisabled(selectedWeek, {
                  minDate,
                  maxDate,
                  isDateDisabled,
                })
              : isDateDisabled(newDate);

      if (isValid && !isPeriodDisabled) {
        // Применяем изменения
        if (range) {
          if (actualPickerType === 'start') {
            setRangeStart(newDate);
            setTempRangeEnd(null);
          } else if (actualPickerType === 'end') {
            setRangeEnd(newDate);
          }
        } else {
          setSelectedDate(newDate);
          if (onChange) {
            onChange(formatDateByPrecision(newDate, precision, weekOptions));
          }
        }
        setCurrentDate(newDate);
      }
    };

    const handleSegmentKeyDown = (
      e: React.KeyboardEvent,
      segment: DateInputSegment,
      pickerType?: 'start' | 'end',
    ) => {
      if (disabled) return;

      const actualPickerType = range ? pickerType : 'start';
      const currentDate = range
        ? actualPickerType === 'start'
          ? rangeStart || new Date()
          : actualPickerType === 'end'
            ? rangeEnd || new Date()
            : null
        : selectedDate;

      if (!currentDate) return;

      const newDate = new Date(currentDate);

      // Обработка ввода цифр
      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();

        const currentBuffer = inputBuffer;
        const newBuffer = { ...currentBuffer };

        // Добавляем цифру в буфер
        newBuffer[segment] += e.key;

        // Ограничиваем длину буфера
        const maxLength = segment === 'year' ? 4 : segment === 'week' ? 1 : 2;
        if (newBuffer[segment].length > maxLength) {
          newBuffer[segment] = e.key; // Заменяем на новую цифру
        }

        setInputBuffer(newBuffer);

        // Автоматически применяем значение при достижении максимальной длины
        if (newBuffer[segment].length === maxLength) {
          applyInputValue(segment, newBuffer[segment], pickerType);

          const nextSegment = getNeighborDateSegment(segment, 'next', precision);
          setActiveSegment(nextSegment);
          if (nextSegment) {
            setTimeout(() => focusSegment(nextSegment, pickerType), 0);
          }
        }
        return;
      }

      // Обработка Backspace
      if (e.key === 'Backspace') {
        e.preventDefault();
        const currentBuffer = inputBuffer;
        const newBuffer = { ...currentBuffer };

        if (newBuffer[segment].length > 0) {
          newBuffer[segment] = newBuffer[segment].slice(0, -1);
        } else {
          const previousSegment = getNeighborDateSegment(segment, 'previous', precision);
          if (previousSegment) {
            setActiveSegment(previousSegment);
            setTimeout(() => focusSegment(previousSegment, pickerType), 0);
          }
        }

        setInputBuffer(newBuffer);
        return;
      }

      // Обработка стрелок
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          if (segment === 'day') {
            newDate.setDate(newDate.getDate() + 1);
          } else if (segment === 'month') {
            newDate.setMonth(newDate.getMonth() + 1);
          } else if (segment === 'week') {
            const currentWeek = getWeekOfMonthFromDate(newDate, weekOptions);
            const nextWeek = getMonthWeekByNumber(
              newDate.getFullYear(),
              newDate.getMonth(),
              (currentWeek?.weekNumber ?? 1) + 1,
              weekOptions,
            );
            if (nextWeek) {
              newDate.setTime(nextWeek.startDate.getTime());
            }
          } else {
            newDate.setFullYear(newDate.getFullYear() + 1);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (segment === 'day') {
            newDate.setDate(newDate.getDate() - 1);
          } else if (segment === 'month') {
            newDate.setMonth(newDate.getMonth() - 1);
          } else if (segment === 'week') {
            const currentWeek = getWeekOfMonthFromDate(newDate, weekOptions);
            const previousWeek = getMonthWeekByNumber(
              newDate.getFullYear(),
              newDate.getMonth(),
              (currentWeek?.weekNumber ?? 1) - 1,
              weekOptions,
            );
            if (previousWeek) {
              newDate.setTime(previousWeek.startDate.getTime());
            }
          } else {
            newDate.setFullYear(newDate.getFullYear() - 1);
          }
          break;
        case 'Tab':
          e.preventDefault();
          {
            const tabSegment = getNeighborDateSegment(
              segment,
              e.shiftKey ? 'previous' : 'next',
              precision,
            );
            if (tabSegment) {
              setActiveSegment(tabSegment);
              setTimeout(() => focusSegment(tabSegment, pickerType), 0);
            }
          }
          return;
        case 'Escape':
          e.preventDefault();
          setActiveSegment(null);
          setInputBuffer({ day: '', month: '', year: '', week: '' });
          return;
        case 'Enter':
          e.preventDefault();
          // Применяем текущий буфер
          if (inputBuffer[segment]) {
            applyInputValue(segment, inputBuffer[segment], pickerType);
          }
          setActiveSegment(null);
          setInputBuffer({ day: '', month: '', year: '', week: '' });
          return;
        default:
          return;
      }

      // Применяем изменения для стрелок
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        if (range) {
          if (actualPickerType === 'start') {
            setRangeStart(newDate);
            setTempRangeEnd(null);
          } else if (actualPickerType === 'end') {
            setRangeEnd(newDate);
          }
        } else {
          setSelectedDate(newDate);
          if (onChange) {
            onChange(formatDateByPrecision(newDate, precision, weekOptions));
          }
        }
        setCurrentDate(newDate);
      }
    };

    // Функция для установки фокуса на сегмент
    const focusSegment = (segment: DateInputSegment, pickerType?: 'start' | 'end') => {
      const useEndRefs = pickerType === 'end';
      const segmentRefs = {
        day: useEndRefs ? endDayRef : startDayRef,
        month: useEndRefs ? endMonthRef : startMonthRef,
        year: useEndRefs ? endYearRef : startYearRef,
        week: useEndRefs ? endWeekRef : startWeekRef,
      };
      const segmentRef = segmentRefs[segment];

      if (segmentRef?.current) {
        segmentRef.current.focus();
      }
    };

    // Функции для проверки дизейбленных дат
    const isDateDisabled = (date: Date): boolean => {
      // Проверяем minDate и maxDate
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;

      // Проверяем disabledDates
      if (
        disabledDates.some(
          (disabledDate) =>
            disabledDate.getFullYear() === date.getFullYear() &&
            disabledDate.getMonth() === date.getMonth() &&
            disabledDate.getDate() === date.getDate(),
        )
      )
        return true;

      // Проверяем disabledDays (дни недели)
      if (disabledDays.includes(date.getDay())) return true;

      // Проверяем disabledMonths
      if (disabledMonths.includes(date.getMonth())) return true;

      // Проверяем disabledYears
      if (disabledYears.includes(date.getFullYear())) return true;

      return false;
    };

    // Функции для рендера сегментированных дат
    const renderDateSegments = (date: Date | null, pickerType?: 'start' | 'end') => {
      const isActivePicker = !range || (range && pickerType === activePicker);
      const visibleSegments = getDateInputVisibleSegments(precision);
      const segmentSeparator = doesFormatUseNamedMonth(format) ? '\u00A0' : '.';

      // Получаем значения для отображения (либо из буфера, либо из даты)
      const getDisplayValue = (segment: DateInputSegment): string => {
        if (isActivePicker && activeSegment === segment && inputBuffer[segment]) {
          return inputBuffer[segment];
        }

        if (date) {
          switch (segment) {
            case 'day':
              return date.getDate().toString().padStart(2, '0');
            case 'week':
              return String(getWeekOfMonthFromDate(date, weekOptions)?.weekNumber ?? '');
            case 'month':
              if (doesFormatUseNamedMonth(format)) {
                return formatDateForDisplay(date, /MMMM/.test(format) ? 'MMMM' : 'MMM');
              }
              return (date.getMonth() + 1).toString().padStart(2, '0');
            case 'year':
              return date.getFullYear().toString();
          }
        }

        if (segment === 'year') {
          return '----';
        }

        if (segment === 'month' && doesFormatUseNamedMonth(format)) {
          return '------';
        }

        return segment === 'week' ? '-' : '--';
      };

      const segmentRefs = {
        day: pickerType === 'start' ? startDayRef : endDayRef,
        month: pickerType === 'start' ? startMonthRef : endMonthRef,
        year: pickerType === 'start' ? startYearRef : endYearRef,
        week: pickerType === 'start' ? startWeekRef : endWeekRef,
      };

      return (
        <DateSegmentsContainer size={size} textAlign={textAlign}>
          {visibleSegments.map((segment, segmentIndex) => (
            <React.Fragment key={segment}>
              {segmentIndex > 0 ? (
                <DateSeparator size={size}>{segmentSeparator}</DateSeparator>
              ) : null}
              <DateSegment
                ref={segmentRefs[segment]}
                isActive={activeSegment === segment && isActivePicker}
                size={size}
                disabled={disabled}
                onClick={() => handleSegmentClick(segment, pickerType)}
                onKeyDown={(keyboardEvent: React.KeyboardEvent) =>
                  handleSegmentKeyDown(keyboardEvent, segment, pickerType)
                }
                tabIndex={0}
              >
                {getDisplayValue(segment)}
              </DateSegment>
            </React.Fragment>
          ))}
        </DateSegmentsContainer>
      );
    };

    // Компонент для отображения range сегментов даты
    const renderRangeDateSegments = () => {
      return (
        <RangeDateContainer>
          <RangeDateGroup>
            <RangeDateLabel size={size}>От:</RangeDateLabel>
            {renderDateSegments(rangeStart, 'start')}
          </RangeDateGroup>
          <RangeDateSeparator>—</RangeDateSeparator>
          <RangeDateGroup>
            <RangeDateLabel size={size}>До:</RangeDateLabel>
            {renderDateSegments(rangeEnd, 'end')}
          </RangeDateGroup>
        </RangeDateContainer>
      );
    };

    // Очищаем буфер при изменении даты
    useEffect(() => {
      setInputBuffer({ day: '', month: '', year: '', week: '' });
    }, [selectedDate, rangeStart, rangeEnd]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (containerRef.current?.contains(target) || calendarPopupRef.current?.contains(target)) {
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

    const fieldCaption = (
      <InputFieldCaption
        label={label}
        additionalLabel={additionalLabel}
        labelVariant={labelVariant}
        htmlFor={segmented ? undefined : dateInputId}
        required={required}
        focused={isOpen}
        disabled={disabled}
        error={!!error}
        size={size}
      />
    );

    const dateInputContent = (
      <DateInputRoot
        ref={containerRef}
        fullWidth={fullWidth}
        disabled={disabled}
        error={!!error}
        $floatingCaption={reserveFloatingCaptionPadding}
        data-input-caption-padding={reserveFloatingCaptionPadding ? 'floating' : undefined}
        className={clsx('ui-date-picker', className)}
      >
        {useFloatingCaption ? fieldCaption : null}
        <InputControlStack fullWidth={fullWidth} autoWidth={autoWidth}>
          {useFloatingCaption ? null : fieldCaption}
          {skeleton ? (
            <SkeletonEffect size={size} fullWidth={fullWidth} autoWidth={autoWidth} />
          ) : (
            <InputFieldShell
              focused={isOpen}
              error={error}
              success={success}
              size={size}
              status={status}
              fullWidth={fullWidth}
              autoWidth={autoWidth}
              readOnly={readOnly}
              prefix={prefix}
              suffix={suffix}
              disabled={disabled}
            >
              {showIcon && (
                <IconWrapper size={size}>
                  {isLoading ? (
                    <LoadingSpinner size={size} />
                  ) : (
                    <IconButton onClick={handleIconClick}>
                      {icon ? (
                        icon
                      ) : (
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
              )}
              {segmented ? (
                // Сегментированный режим ввода даты
                range ? (
                  renderRangeDateSegments()
                ) : (
                  renderDateSegments(selectedDate, 'start')
                )
              ) : (
                // Обычный режим ввода даты
                <StyledInput
                  ref={ref || inputRef}
                  id={dateInputId}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onClick={handleInputClick}
                  disabled={disabled}
                  readOnly={readOnly}
                  required={required}
                  placeholder={placeholder || 'Выберите дату'}
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
              )}
              {displayClearIcon && inputValue && !disabled && (
                <IconWrapper size={size} style={{ marginLeft: 'auto' }}>
                  <IconButton onClick={handleClearIconClick}>
                    <Icon
                      name="IconPlainerClose"
                      size={getClearIconSizeForInputField(size)}
                      {...clearIconProps}
                    />
                  </IconButton>
                </IconWrapper>
              )}
            </InputFieldShell>
          )}
          {error && <ErrorMessage size={size}>{error}</ErrorMessage>}
          {extraText && <ExtraText size={size}>{extraText}</ExtraText>}
          {helperText && <ExtraText size={size}>{helperText}</ExtraText>}
          {displayCharacterCounter &&
            props.maxLength &&
            (() => {
              const currentValue = inputValue || '';
              const currentLength = ignoreMaskCharacters
                ? currentValue.replace(/[.\-/]/g, '').length
                : currentValue.length;

              // Проверяем threshold для отображения счетчика
              const shouldShowCounter =
                characterCounterVisibilityThreshold === 0 ||
                (characterCounterVisibilityThreshold === 1
                  ? false
                  : currentLength >= props.maxLength! * characterCounterVisibilityThreshold);

              return (
                <CharacterCounterMotion
                  visible={shouldShowCounter}
                  currentLength={currentLength}
                  maxLength={props.maxLength!}
                />
              );
            })()}
        </InputControlStack>
      </DateInputRoot>
    );

    const calendarPopupPortal =
      isOpen && floatingPortalRoot
        ? createPortal(
            <CalendarPopup
              ref={calendarPopupRef}
              isOpen={isOpen}
              size={size}
              $calendarFullWidth={calendarFullWidth}
              $portaled
              style={getFloatingOverlayPlacementStyle({
                position: calendarPopupPosition,
                isPositionReady: isCalendarPopupPositionReady,
                zIndex: floatingOverlayZIndex,
              })}
            >
              {renderTopPanel && (
                <DateInputPickerChrome $edge="bottom">{renderTopPanel()}</DateInputPickerChrome>
              )}

              {isPeriodPrecision(precision) ? (
                <DateInputPeriodPicker
                  precision={precision}
                  weekOfMonthMode={weekOfMonthMode}
                  locale="ru-RU"
                  size={size}
                  disabled={disabled}
                  minDate={minDate}
                  maxDate={maxDate}
                  isDateDisabled={isDateDisabled}
                  selectionMode={range ? 'range' : 'single'}
                  selectedDate={range ? null : selectedDate}
                  rangeStart={range ? rangeStart : null}
                  rangeEnd={range ? rangeEnd : null}
                  rangeHoverDate={range ? tempRangeEnd : null}
                  onSelectDate={handleDayClick}
                  onItemMouseEnter={handleDayMouseEnter}
                  onItemMouseLeave={handleDayMouseLeave}
                  footer={
                    <>
                      <Button
                        variant={ButtonVariant.SECONDARY}
                        size={size}
                        type="button"
                        onClick={handleClear}
                      >
                        Очистить
                      </Button>
                      {range || shouldDeferPickerCommit ? (
                        <Button
                          variant={ButtonVariant.PRIMARY}
                          size={size}
                          type="button"
                          onClick={handleApply}
                        >
                          {range ? 'Применить' : 'OK'}
                        </Button>
                      ) : null}
                    </>
                  }
                />
              ) : (
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
                  {...(!range ? { value: selectedDate } : {})}
                  rangeStart={range ? rangeStart : null}
                  rangeEnd={range ? rangeEnd : null}
                  rangeHoverDate={range ? tempRangeEnd : null}
                  onSelectDate={handleDayClick}
                  onDayMouseEnter={handleDayMouseEnter}
                  onDayMouseLeave={handleDayMouseLeave}
                  weekdays={getWeekdayNames()}
                  footer={
                    <>
                      <Button
                        variant={ButtonVariant.SECONDARY}
                        size={size}
                        type="button"
                        onClick={handleClear}
                      >
                        Очистить
                      </Button>
                      {range || shouldDeferPickerCommit ? (
                        <Button
                          variant={ButtonVariant.PRIMARY}
                          size={size}
                          type="button"
                          onClick={handleApply}
                        >
                          {range ? 'Применить' : 'OK'}
                        </Button>
                      ) : null}
                    </>
                  }
                />
              )}

              {renderBottomPanel && (
                <DateInputPickerChrome $edge="top">{renderBottomPanel()}</DateInputPickerChrome>
              )}
            </CalendarPopup>,
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
              {dateInputContent}
            </Hint>
            {calendarPopupPortal}
          </>
        );
      } else {
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
              {dateInputContent}
            </Tooltip>
            {calendarPopupPortal}
          </>
        );
      }
    }

    return (
      <>
        {dateInputContent}
        {calendarPopupPortal}
      </>
    );
  },
);

DateInput.displayName = 'DateInput';
