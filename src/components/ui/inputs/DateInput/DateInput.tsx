import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import { useTheme } from 'styled-components';
import { ButtonVariant, TooltipPosition, type DatePickerProps } from '../../../../types/ui';
import {
  parseDate,
  formatDateForDisplay,
  toISODateString,
  getWeekdayNames,
} from '../../../../handlers/dateHandlers';
import {
  computeRangeDatesAfterDayClick,
  datePickerDraftDatesFromValue,
  resolveDatePickerDraft,
  type DatePickerDraftDates,
  type DatePickerDraftPhase,
} from '../../../../handlers/dateInputPickerHandlers';
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
import {
  CalendarPopup,
  DateInputFieldStack,
  DateSegment,
  DateSegmentsContainer,
  DateSeparator,
  ErrorMessage,
  ExtraText,
  IconButton,
  LeftLabel,
  RangeDateContainer,
  RangeDateGroup,
  RangeDateLabel,
  RangeDateSeparator,
  RightLabel,
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
      format = 'DD.MM.YYYY', // Формат отображения даты по умолчанию
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

    // Инициализируем состояния в зависимости от режима и типа value
    const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
      if (!range && typeof value === 'string' && value) {
        const result = parseDate(value);
        return result.isValid ? result.date : null;
      }
      return null;
    });

    const [rangeStart, setRangeStart] = useState<Date | null>(() => {
      if (range && typeof value === 'object' && value?.start) {
        const result = parseDate(value.start);
        return result.isValid ? result.date : null;
      }
      return null;
    });

    const [rangeEnd, setRangeEnd] = useState<Date | null>(() => {
      if (range && typeof value === 'object' && value?.end) {
        const result = parseDate(value.end);
        return result.isValid ? result.date : null;
      }
      return null;
    });
    const [tempRangeEnd, setTempRangeEnd] = useState<Date | null>(null);

    // Состояния для сегментированного ввода даты
    const [activeSegment, setActiveSegment] = useState<'day' | 'month' | 'year' | null>(null);
    const [activePicker, setActivePicker] = useState<'start' | 'end'>('start');

    // Состояния для ввода с клавиатуры
    const [inputBuffer, setInputBuffer] = useState<{
      day: string;
      month: string;
      year: string;
    }>({ day: '', month: '', year: '' });

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
    const { position: calendarPopupPosition } = useFloatingOverlayPosition({
      isOpen,
      anchorRef: containerRef,
      overlayRef: calendarPopupRef,
      positioningMode: 'autoFlip',
    });

    // Refs для сегментов даты (отдельные для каждого picker в range режиме)
    const startDayRef = useRef<HTMLSpanElement>(null);
    const startMonthRef = useRef<HTMLSpanElement>(null);
    const startYearRef = useRef<HTMLSpanElement>(null);
    const endDayRef = useRef<HTMLSpanElement>(null);
    const endMonthRef = useRef<HTMLSpanElement>(null);
    const endYearRef = useRef<HTMLSpanElement>(null);

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

    // Функция для автоматического форматирования ввода даты
    const formatDateInput = (value: string): string => {
      // Удаляем все нецифровые символы
      const digits = value.replace(/\D/g, '');

      // Если нет цифр, возвращаем пустую строку
      if (!digits) return '';

      // Ограничиваем количество цифр (максимум 8 для DD.MM.YYYY)
      const limitedDigits = digits.slice(0, 8);

      // Форматируем в зависимости от количества цифр
      if (limitedDigits.length <= 2) {
        // Только день: "12"
        return limitedDigits;
      } else if (limitedDigits.length <= 4) {
        // День и месяц: "12.34"
        return `${limitedDigits.slice(0, 2)}.${limitedDigits.slice(2)}`;
      } else {
        // День, месяц и год: "12.34.5678"
        return `${limitedDigits.slice(0, 2)}.${limitedDigits.slice(2, 4)}.${limitedDigits.slice(4)}`;
      }
    };

    // Функция для проверки, выглядит ли строка как полная дата
    const isCompleteDateString = (value: string): boolean => {
      const trimmed = value.trim();

      // Если строка слишком короткая, не парсим
      if (trimmed.length < 10) {
        // Минимум "01.01.2000" = 10 символов
        return false;
      }

      // Проверяем наличие разделителей даты
      const hasDateSeparators = /[.\-/]/.test(trimmed);
      if (!hasDateSeparators) {
        return false;
      }

      // Проверяем, что строка содержит ровно 2 разделителя (для полной даты)
      const separatorCount = (trimmed.match(/[.\-/]/g) || []).length;
      if (separatorCount !== 2) {
        return false;
      }

      // Проверяем, что есть достаточно цифр для даты (минимум 8 цифр для DD.MM.YYYY)
      const digitCount = (trimmed.match(/\d/g) || []).length;
      if (digitCount < 8) {
        return false;
      }

      // Дополнительная проверка: строка должна содержать ровно 3 части (день, месяц, год)
      const parts = trimmed.split(/[.\-/]/);
      if (parts.length !== 3) {
        return false;
      }

      // Проверяем, что все части содержат цифры и не пустые
      for (const part of parts) {
        if (!part.trim() || !/^\d+$/.test(part.trim())) {
          return false;
        }
      }

      // Проверяем, что год содержит минимум 4 цифры (полный год)
      const yearPart = parts[2].trim();
      if (yearPart.length < 4) {
        return false;
      }

      return true;
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

            const startResult = parseDate(startDateStr);
            const endResult = parseDate(endDateStr);

            if (startResult.isValid && endResult.isValid && startResult.date && endResult.date) {
              setRangeStart(startResult.date);
              setRangeEnd(endResult.date);
              setTempRangeEnd(null);
              setCurrentDate(startResult.date); // Обновляем текущий месяц в календаре на начало диапазона
            }
          } else {
            // Одиночная дата в range режиме
            const parsedResult = parseDate(formattedValue);
            if (parsedResult.isValid && parsedResult.date) {
              setRangeStart(parsedResult.date);
              setCurrentDate(parsedResult.date); // Обновляем текущий месяц в календаре
              setRangeEnd(null);
              setTempRangeEnd(null);
            }
          }
        } else {
          // Одиночная дата в обычном режиме
          const parsedResult = parseDate(formattedValue);
          if (parsedResult.isValid && parsedResult.date) {
            setSelectedDate(parsedResult.date);
            setCurrentDate(parsedResult.date); // Обновляем текущий месяц в календаре
            if (onChange) {
              onChange(toISODateString(parsedResult.date));
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

            const startResult = parseDate(startDateStr);
            const endResult = parseDate(endDateStr);

            if (startResult.isValid && endResult.isValid && startResult.date && endResult.date) {
              setRangeStart(startResult.date);
              setRangeEnd(endResult.date);
              setTempRangeEnd(null);
              setCurrentDate(startResult.date); // Обновляем текущий месяц в календаре на начало диапазона
              if (onChange) {
                onChange({
                  start: toISODateString(startResult.date),
                  end: toISODateString(endResult.date),
                });
              }
            }
          } else {
            // Одиночная дата в range режиме
            const parsedResult = parseDate(inputValue);
            if (parsedResult.isValid && parsedResult.date) {
              setRangeStart(parsedResult.date);
              setCurrentDate(parsedResult.date); // Обновляем текущий месяц в календаре
              setRangeEnd(null);
              setTempRangeEnd(null);
            }
          }
        } else {
          // Одиночная дата в обычном режиме
          const parsedResult = parseDate(inputValue);
          if (parsedResult.isValid && parsedResult.date) {
            setSelectedDate(parsedResult.date);
            setCurrentDate(parsedResult.date); // Обновляем текущий месяц в календаре
            if (onChange) {
              onChange(toISODateString(parsedResult.date));
            }
          }
        }
        setIsOpen(false);
      }
    };

    const formatDate = useCallback(
      (date: Date | null) => formatDateForDisplay(date, format),
      [format],
    );

    const syncDraftFromValue = useCallback(() => {
      const draftDates = datePickerDraftDatesFromValue(value, range);

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
    }, [range, value]);

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

        const shouldUpdateInputPreview =
          options?.updateInputPreview ?? !shouldDeferPickerCommit;

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
    }, [
      selectedDate,
      rangeStart,
      rangeEnd,
      range,
      formatDate,
      shouldDeferPickerCommit,
      isOpen,
    ]);

    const handleDayClick = (date: Date) => {
      if (!range) {
        if (shouldDeferPickerCommit) {
          applyPickerDraftUpdate(
            { selectedDate: date, rangeStart: null, rangeEnd: null },
            'pick',
          );
          return;
        }

        setSelectedDate(date);
        setInputValue(formatDate(date));
        onChange?.(toISODateString(date));
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
        onChange?.(toISODateString(pickedDate));
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
            start: toISODateString(resolvedDates.rangeStart),
            end: toISODateString(resolvedDates.rangeEnd),
          });
        }
      } else if (selectedDate) {
        const resolvedDates = applyPickerDraftUpdate(
          { selectedDate, rangeStart: null, rangeEnd: null },
          'apply',
          { updateInputPreview: true },
        );

        if (resolvedDates.selectedDate) {
          onChange?.(toISODateString(resolvedDates.selectedDate));
        }
      }

      setIsOpen(false);
    };

    const handleClear = () => {
      applyPickerDraftUpdate(
        { selectedDate: null, rangeStart: null, rangeEnd: null },
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

    // Обработчики для сегментированного ввода даты
    const handleSegmentClick = (
      segment: 'day' | 'month' | 'year',
      pickerType?: 'start' | 'end',
    ) => {
      if (disabled) return;
      setActiveSegment(segment);
      if (range && pickerType) {
        setActivePicker(pickerType);
      }
      // Очищаем буфер при клике на новый сегмент
      setInputBuffer({ day: '', month: '', year: '' });
    };

    // Функция для валидации и применения введенного значения
    const applyInputValue = (
      segment: 'day' | 'month' | 'year',
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
          const month = parseInt(value);
          if (month >= 1 && month <= 12) {
            newDate.setMonth(month - 1);
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
      }

      if (isValid && !isDateDisabled(newDate)) {
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
            onChange(toISODateString(newDate));
          }
        }
        setCurrentDate(newDate);
      }
    };

    const handleSegmentKeyDown = (
      e: React.KeyboardEvent,
      segment: 'day' | 'month' | 'year',
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
        const maxLength = segment === 'year' ? 4 : 2;
        if (newBuffer[segment].length > maxLength) {
          newBuffer[segment] = e.key; // Заменяем на новую цифру
        }

        setInputBuffer(newBuffer);

        // Автоматически применяем значение при достижении максимальной длины
        if (newBuffer[segment].length === maxLength) {
          applyInputValue(segment, newBuffer[segment], pickerType);

          // Переходим к следующему сегменту
          if (segment === 'day') {
            setActiveSegment('month');
            setTimeout(() => focusSegment('month', pickerType), 0);
          } else if (segment === 'month') {
            setActiveSegment('year');
            setTimeout(() => focusSegment('year', pickerType), 0);
          } else if (segment === 'year') {
            setActiveSegment(null);
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
          // Если буфер пустой, переходим к предыдущему сегменту
          if (segment === 'month') {
            setActiveSegment('day');
            setTimeout(() => focusSegment('day', pickerType), 0);
          } else if (segment === 'year') {
            setActiveSegment('month');
            setTimeout(() => focusSegment('month', pickerType), 0);
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
          } else {
            newDate.setFullYear(newDate.getFullYear() - 1);
          }
          break;
        case 'Tab':
          e.preventDefault();
          if (e.shiftKey) {
            // Переход к предыдущему сегменту
            if (segment === 'month') {
              setActiveSegment('day');
              setTimeout(() => focusSegment('day', pickerType), 0);
            } else if (segment === 'year') {
              setActiveSegment('month');
              setTimeout(() => focusSegment('month', pickerType), 0);
            }
          } else {
            // Переход к следующему сегменту
            if (segment === 'day') {
              setActiveSegment('month');
              setTimeout(() => focusSegment('month', pickerType), 0);
            } else if (segment === 'month') {
              setActiveSegment('year');
              setTimeout(() => focusSegment('year', pickerType), 0);
            }
          }
          return;
        case 'Escape':
          e.preventDefault();
          setActiveSegment(null);
          setInputBuffer({ day: '', month: '', year: '' });
          return;
        case 'Enter':
          e.preventDefault();
          // Применяем текущий буфер
          if (inputBuffer[segment]) {
            applyInputValue(segment, inputBuffer[segment], pickerType);
          }
          setActiveSegment(null);
          setInputBuffer({ day: '', month: '', year: '' });
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
            onChange(toISODateString(newDate));
          }
        }
        setCurrentDate(newDate);
      }
    };

    // Функция для установки фокуса на сегмент
    const focusSegment = (segment: 'day' | 'month' | 'year', pickerType?: 'start' | 'end') => {
      let ref: React.RefObject<HTMLSpanElement | null> | null = null;

      if (range && pickerType) {
        if (pickerType === 'start') {
          ref =
            segment === 'day' ? startDayRef : segment === 'month' ? startMonthRef : startYearRef;
        } else {
          ref = segment === 'day' ? endDayRef : segment === 'month' ? endMonthRef : endYearRef;
        }
      } else {
        // Для single режима используем start refs
        ref = segment === 'day' ? startDayRef : segment === 'month' ? startMonthRef : startYearRef;
      }

      if (ref?.current) {
        ref.current.focus();
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

      // Получаем значения для отображения (либо из буфера, либо из даты)
      const getDisplayValue = (segment: 'day' | 'month' | 'year'): string => {
        if (isActivePicker && activeSegment === segment && inputBuffer[segment]) {
          return inputBuffer[segment];
        }

        if (date) {
          switch (segment) {
            case 'day':
              return date.getDate().toString().padStart(2, '0');
            case 'month':
              return (date.getMonth() + 1).toString().padStart(2, '0');
            case 'year':
              return date.getFullYear().toString();
          }
        }

        return segment === 'year' ? '----' : '--';
      };

      return (
        <DateSegmentsContainer size={size} textAlign={textAlign}>
          <DateSegment
            ref={pickerType === 'start' ? startDayRef : endDayRef}
            isActive={activeSegment === 'day' && isActivePicker}
            size={size}
            disabled={disabled}
            onClick={() => handleSegmentClick('day', pickerType)}
            onKeyDown={(keyboardEvent: React.KeyboardEvent) =>
              handleSegmentKeyDown(keyboardEvent, 'day', pickerType)
            }
            tabIndex={0}
          >
            {getDisplayValue('day')}
          </DateSegment>
          <DateSeparator size={size}>.</DateSeparator>
          <DateSegment
            ref={pickerType === 'start' ? startMonthRef : endMonthRef}
            isActive={activeSegment === 'month' && isActivePicker}
            size={size}
            disabled={disabled}
            onClick={() => handleSegmentClick('month', pickerType)}
            onKeyDown={(keyboardEvent: React.KeyboardEvent) =>
              handleSegmentKeyDown(keyboardEvent, 'month', pickerType)
            }
            tabIndex={0}
          >
            {getDisplayValue('month')}
          </DateSegment>
          <DateSeparator size={size}>.</DateSeparator>
          <DateSegment
            ref={pickerType === 'start' ? startYearRef : endYearRef}
            isActive={activeSegment === 'year' && isActivePicker}
            size={size}
            disabled={disabled}
            onClick={() => handleSegmentClick('year', pickerType)}
            onKeyDown={(keyboardEvent: React.KeyboardEvent) =>
              handleSegmentKeyDown(keyboardEvent, 'year', pickerType)
            }
            tabIndex={0}
          >
            {getDisplayValue('year')}
          </DateSegment>
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
      setInputBuffer({ day: '', month: '', year: '' });
    }, [selectedDate, rangeStart, rangeEnd]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          containerRef.current?.contains(target) ||
          calendarPopupRef.current?.contains(target)
        ) {
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

    const dateInputContent = (
      <InputContainerWithPadding
        ref={containerRef}
        disabled={disabled}
        error={!!error}
        className={clsx('ui-date-picker', className)}
      >
        {(label || additionalLabel) && (
          <div
            style={{
              position: 'relative',
              marginBottom: '4px',
              width: '100%',
              height: '20px', // Фиксированная высота для контейнера
            }}
          >
            {label && (
              <LeftLabel focused={isOpen} disabled={disabled} error={!!error} size={size}>
                {label}
              </LeftLabel>
            )}
            {additionalLabel && (
              <RightLabel focused={isOpen} disabled={disabled} error={!!error} size={size}>
                {additionalLabel}
              </RightLabel>
            )}
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
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onClick={handleInputClick}
                  disabled={disabled}
                  readOnly={readOnly}
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
        </DateInputFieldStack>
      </InputContainerWithPadding>
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
              style={{
                left: calendarPopupPosition.x,
                top: calendarPopupPosition.y,
                zIndex: floatingOverlayZIndex,
              }}
            >
              {renderTopPanel && (
                <div style={{ padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
                  {renderTopPanel()}
                </div>
              )}

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

              {renderBottomPanel && (
                <div style={{ padding: '16px', borderTop: '1px solid #e0e0e0' }}>
                  {renderBottomPanel()}
                </div>
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
