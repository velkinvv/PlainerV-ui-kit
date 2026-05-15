import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import type { TimeInputProps } from '../../../../types/ui';
import { ButtonVariant, TooltipPosition } from '../../../../types/ui';
import {
  parseTime,
  formatTimeForDisplay,
  toISOTimeString,
  isCurrentTime,
  getHours,
  getMinutes,
  getSeconds,
  getCurrentTime,
  createTime,
  getHoursFromTime,
  getMinutesFromTime,
  getSecondsFromTime,
  formatHours,
  formatMinutes,
  formatSeconds,
  isInTimeRange,
  isTimeRangeStart,
  isTimeRangeEnd,
} from './handlers';
import { getClearIconSizeForInputField } from '../../../../handlers/iconHandlers';
import { Size, IconSize } from '../../../../types/sizes';
import { Icon } from '../../Icon/Icon';
import { Tooltip } from '../../Tooltip/Tooltip';
import { Hint, HintPosition, HintVariant } from '../../Hint/Hint';
import { SkeletonEffect } from '../shared';
import {
  ActionButton,
  CharacterCounter,
  Container,
  ErrorMessage,
  ExtraText,
  Footer,
  IconButton,
  IconWrapper,
  InputWrapper,
  LeftLabel,
  LoadingSpinner,
  RangeContainer,
  RangeFooter,
  RangePickerContainer,
  RangePickerHeader,
  RangePickerTitle,
  RangePickersWrapper,
  RangeTimeContainer,
  RangeTimeGroup,
  RangeTimeLabel,
  RangeTimeSeparator,
  RegularTimeInput,
  RightLabel,
  TimeColumn,
  TimeColumnContent,
  TimeColumnLabel,
  TimeOption,
  TimePickerGrid,
  TimePickerPopup,
  TimeSegment,
  TimeSegmentsContainer,
  TimeSeparator,
} from './TimeInput.style';

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  (
    {
      value,
      onChange,
      label,
      placeholder,
      disabled = false,
      size = Size.SM,
      error,
      className,
      range = false,
      minTime,
      maxTime,
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
      tooltip,
      tooltipType = 'tooltip',
      tooltipPosition = 'top',
      displayCharacterCounter = true,
      ignoreMaskCharacters = false,
      characterCounterVisibilityThreshold = 0,
      additionalLabel,
      showSeconds = false,
      minuteStep = 1,
      secondStep = 1,
      disabledTimes = [],
      disabledHours = [],
      disabledMinutes = [],
      disabledSeconds = [],
      displayClearIcon = false,
      onClearIconClick,
      clearIconProps,
      textAlign = 'left',
      segmented = true, // По умолчанию используем сегментированный ввод
      format = 'HH:mm', // Формат отображения времени по умолчанию
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [activeSegment, setActiveSegment] = useState<'hours' | 'minutes' | 'seconds' | null>(
      null,
    );
    const [inputBuffer, setInputBuffer] = useState('');
    const [inputTimeout, setInputTimeout] = useState<NodeJS.Timeout | null>(null);

    // Refs для сегментов времени (отдельные для каждого picker в range режиме)
    const startHoursRef = useRef<HTMLSpanElement>(null);
    const startMinutesRef = useRef<HTMLSpanElement>(null);
    const startSecondsRef = useRef<HTMLSpanElement>(null);
    const endHoursRef = useRef<HTMLSpanElement>(null);
    const endMinutesRef = useRef<HTMLSpanElement>(null);
    const endSecondsRef = useRef<HTMLSpanElement>(null);

    // Функция для установки фокуса на сегмент
    const focusSegment = (
      segment: 'hours' | 'minutes' | 'seconds',
      pickerType?: 'start' | 'end',
    ) => {
      let ref: React.RefObject<HTMLSpanElement>;

      if (range) {
        if (pickerType === 'start') {
          ref =
            segment === 'hours'
              ? startHoursRef
              : segment === 'minutes'
                ? startMinutesRef
                : startSecondsRef;
        } else {
          ref =
            segment === 'hours'
              ? endHoursRef
              : segment === 'minutes'
                ? endMinutesRef
                : endSecondsRef;
        }
      } else {
        // Для single режима используем start refs
        ref =
          segment === 'hours'
            ? startHoursRef
            : segment === 'minutes'
              ? startMinutesRef
              : startSecondsRef;
      }

      if (ref.current) {
        ref.current.focus();
      }
    };

    // Очистка таймера при размонтировании
    useEffect(() => {
      return () => {
        if (inputTimeout) {
          clearTimeout(inputTimeout);
        }
      };
    }, [inputTimeout]);
    const [currentTime, setCurrentTime] = useState(() => {
      // Если есть начальное значение, используем его
      if (!range && typeof value === 'string' && value) {
        const result = parseTime(value);
        return result.isValid && result.time ? result.time : getCurrentTime();
      }
      return getCurrentTime();
    });
    const [inputValue, setInputValue] = useState('');

    // Инициализируем состояния в зависимости от режима и типа value
    const [selectedTime, setSelectedTime] = useState<Date | null>(() => {
      if (!range && typeof value === 'string' && value) {
        const result = parseTime(value);
        return result.isValid && result.time ? result.time : null;
      }
      // Если нет значения, используем текущее время как начальное
      return getCurrentTime();
    });

    const [rangeStart, setRangeStart] = useState<Date | null>(() => {
      if (range && typeof value === 'object' && value?.start) {
        const result = parseTime(value.start);
        return result.isValid ? result.time : null;
      }
      return null;
    });

    const [rangeEnd, setRangeEnd] = useState<Date | null>(() => {
      if (range && typeof value === 'object' && value?.end) {
        const result = parseTime(value.end);
        return result.isValid ? result.time : null;
      }
      return null;
    });

    const [tempRangeEnd, setTempRangeEnd] = useState<Date | null>(null);
    const [activePicker, setActivePicker] = useState<'start' | 'end'>('start');
    const _inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Обработчик кликов вне компонента
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setIsFocused(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    // Обновляем inputValue при изменении value
    useEffect(() => {
      if (range && rangeStart && rangeEnd) {
        setInputValue(
          `${formatTimeForDisplay(rangeStart, format)} — ${formatTimeForDisplay(rangeEnd, format)}`,
        );
      } else if (!range && selectedTime) {
        setInputValue(formatTimeForDisplay(selectedTime, format));
      } else {
        setInputValue('');
      }
    }, [range, rangeStart, rangeEnd, selectedTime, format]);

    // Обработчики событий
    const _handleFocus = () => {
      if (!disabled) {
        setIsFocused(true);
        // Убираем автоматическое открытие пикера при фокусе
      }
    };

    const _handleBlur = (_e: React.FocusEvent) => {
      // Просто убираем фокус, попап закроется через handleClickOutside
      setIsFocused(false);
      setActiveSegment(null);
    };

    const handleIconClick = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    const _handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        // Если используется handleInput, только обновляем значение без парсинга времени
        setInputValue(newValue);
        return;
      }

      setInputValue(newValue);

      if (range) {
        // Проверяем, является ли введенное значение диапазоном времени
        const rangeMatch = newValue.match(/^(.+?)\s*—\s*(.+)$/);
        if (rangeMatch) {
          const startTimeStr = rangeMatch[1].trim();
          const endTimeStr = rangeMatch[2].trim();

          const startTime = parseTime(startTimeStr);
          const endTime = parseTime(endTimeStr);

          if (startTime.isValid && endTime.isValid) {
            setRangeStart(startTime.time);
            setRangeEnd(endTime.time);
            setTempRangeEnd(null);
            setCurrentTime(startTime.time!);
          }
        } else {
          // Одиночное время в range режиме
          const parsedTime = parseTime(newValue);
          if (parsedTime.isValid) {
            setRangeStart(parsedTime.time);
            setCurrentTime(parsedTime.time!);
            setRangeEnd(null);
            setTempRangeEnd(null);
          }
        }
      } else {
        // Одиночное время в обычном режиме
        const parsedTime = parseTime(newValue);
        if (parsedTime.isValid) {
          setSelectedTime(parsedTime.time);
          setCurrentTime(parsedTime.time!);
          if (onChange) {
            onChange(toISOTimeString(parsedTime.time, showSeconds ? 'HH:mm:ss' : 'HH:mm'));
          }
        }
      }
    };

    const _handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      // Убираем открытие пикера при нажатии Enter
      // Пикер теперь открывается только при клике на иконку
    };

    const handleTimeClick = (
      type: 'hour' | 'minute' | 'second',
      value: number,
      pickerType?: 'start' | 'end',
    ) => {
      if (range) {
        // В range режиме используем переданный pickerType или активный пикер
        const targetPicker = pickerType || activePicker;
        const currentTime =
          targetPicker === 'start' ? rangeStart || getCurrentTime() : rangeEnd || getCurrentTime();

        // Проверяем дизейбл перед созданием нового времени
        let isDisabled = false;
        if (type === 'hour') {
          isDisabled = isHourDisabled(value, currentTime);
        } else if (type === 'minute') {
          isDisabled = isMinuteDisabled(value, currentTime);
        } else {
          isDisabled = isSecondDisabled(value, currentTime);
        }

        // Если время дизейблено, не обновляем
        if (isDisabled) {
          return;
        }

        let newTime: Date;

        // Создаем новое время, сохраняя остальные компоненты
        if (type === 'hour') {
          newTime = createTime(
            value,
            getMinutesFromTime(currentTime),
            getSecondsFromTime(currentTime),
          );
        } else if (type === 'minute') {
          newTime = createTime(
            getHoursFromTime(currentTime),
            value,
            getSecondsFromTime(currentTime),
          );
        } else {
          newTime = createTime(
            getHoursFromTime(currentTime),
            getMinutesFromTime(currentTime),
            value,
          );
        }

        // Обновляем соответствующее время
        if (targetPicker === 'start') {
          setRangeStart(newTime);
          setCurrentTime(newTime);
        } else {
          setRangeEnd(newTime);
          setCurrentTime(newTime);
        }
      } else {
        // В обычном режиме используем старую логику
        const activeTime = getActiveTime();

        // Проверяем дизейбл перед созданием нового времени
        let isDisabled = false;
        if (type === 'hour') {
          isDisabled = isHourDisabled(value, activeTime);
        } else if (type === 'minute') {
          isDisabled = isMinuteDisabled(value, activeTime);
        } else {
          isDisabled = isSecondDisabled(value, activeTime);
        }

        // Если время дизейблено, не обновляем
        if (isDisabled) {
          return;
        }

        let newTime: Date;

        if (type === 'hour') {
          newTime = createTime(
            value,
            getMinutesFromTime(activeTime),
            getSecondsFromTime(activeTime),
          );
        } else if (type === 'minute') {
          newTime = createTime(getHoursFromTime(activeTime), value, getSecondsFromTime(activeTime));
        } else {
          newTime = createTime(getHoursFromTime(activeTime), getMinutesFromTime(activeTime), value);
        }

        setCurrentTime(newTime);
        setSelectedTime(newTime);

        if (onChange) {
          onChange(toISOTimeString(newTime, showSeconds ? 'HH:mm:ss' : 'HH:mm'));
        }
      }
    };

    const handleTimeMouseEnter = (time: Date) => {
      if (range && rangeStart && !rangeEnd) {
        setTempRangeEnd(time);
      }
    };

    const handleTimeMouseLeave = () => {
      if (range) {
        setTempRangeEnd(null);
      }
    };

    const handleClear = () => {
      setSelectedTime(null);
      setRangeStart(null);
      setRangeEnd(null);
      setTempRangeEnd(null);
      setActivePicker('start');
      setInputValue('');
      setActiveSegment(null);
      if (onChange) {
        onChange(range ? { start: '', end: '' } : '');
      }
      setIsOpen(false);
    };

    const handleClearIconClick = () => {
      handleClear();
      if (onClearIconClick) {
        onClearIconClick();
      }
    };

    // Обработчики для сегментированного ввода
    const handleSegmentClick = (
      segment: 'hours' | 'minutes' | 'seconds',
      pickerType?: 'start' | 'end',
    ) => {
      if (disabled) return;
      setActiveSegment(segment);
      setIsFocused(true);
      // НЕ открываем пикер при клике на сегмент - только при клике на иконку
      if (range && pickerType) {
        setActivePicker(pickerType);
      }
      // Сбрасываем буфер ввода при смене сегмента
      setInputBuffer('');
      if (inputTimeout) {
        clearTimeout(inputTimeout);
        setInputTimeout(null);
      }
      // Устанавливаем фокус на сегмент
      setTimeout(() => focusSegment(segment, range ? pickerType : 'start'), 0);
    };

    // Обработка ввода цифр с клавиатуры
    const handleDigitInput = (
      e: React.KeyboardEvent,
      segment: 'hours' | 'minutes' | 'seconds',
      pickerType?: 'start' | 'end',
    ) => {
      if (disabled) return;

      // Обрабатываем только цифры
      if (!/^\d$/.test(e.key)) return;

      // Для single режима всегда используем 'start' как pickerType
      const actualPickerType = range ? pickerType : 'start';

      e.preventDefault();

      const currentTime = range
        ? actualPickerType === 'start'
          ? rangeStart || new Date()
          : actualPickerType === 'end'
            ? rangeEnd || new Date()
            : null
        : selectedTime;

      if (!currentTime) return;

      // Добавляем цифру в буфер
      const newBuffer = inputBuffer + e.key;
      setInputBuffer(newBuffer);

      // Очищаем предыдущий таймер
      if (inputTimeout) {
        clearTimeout(inputTimeout);
      }

      // Устанавливаем новый таймер для сброса буфера
      const timeout = setTimeout(() => {
        setInputBuffer('');
        setInputTimeout(null);
      }, 1000);
      setInputTimeout(timeout);

      // Определяем максимальное значение для сегмента
      const maxValue = segment === 'hours' ? 23 : 59;
      const _maxDigits = segment === 'hours' ? 2 : 2;

      let newValue: number;

      if (newBuffer.length === 1) {
        // Если введена одна цифра, применяем её как есть
        newValue = parseInt(newBuffer);
      } else if (newBuffer.length === 2) {
        // Если введены две цифры, применяем значение
        newValue = parseInt(newBuffer);
        if (newValue > maxValue) {
          // Если значение превышает максимум, берем только последнюю цифру
          newValue = parseInt(newBuffer[1]);
        }
      } else {
        // Если введено больше двух цифр, берем последние две
        const lastTwoDigits = newBuffer.slice(-2);
        newValue = parseInt(lastTwoDigits);
        if (newValue > maxValue) {
          newValue = parseInt(lastTwoDigits[1]);
        }
      }

      // Создаем новое время
      const newTime = new Date(currentTime);
      if (segment === 'hours') {
        newTime.setHours(newValue);
      } else if (segment === 'minutes') {
        newTime.setMinutes(newValue);
      } else {
        newTime.setSeconds(newValue);
      }

      // Применяем изменения
      if (range) {
        if (actualPickerType === 'start') {
          setRangeStart(newTime);
          setTempRangeEnd(null);
        } else if (actualPickerType === 'end') {
          setRangeEnd(newTime);
        }
      } else {
        setSelectedTime(newTime);
      }

      const timeString = formatTimeForDisplay(newTime, format);
      setInputValue(timeString);

      if (onChange) {
        if (range) {
          const startTime =
            pickerType === 'start' || activePicker === 'start' ? newTime : rangeStart;
          const endTime = actualPickerType === 'end' || activePicker === 'end' ? newTime : rangeEnd;
          if (startTime && endTime) {
            onChange({
              start: formatTimeForDisplay(startTime, format),
              end: formatTimeForDisplay(endTime, format),
            });
          }
        } else {
          onChange(timeString);
        }
      }

      // Переход к следующему сегменту
      let shouldMoveToNext = false;

      if (newBuffer.length === 1) {
        // Если введена одна цифра, переходим к следующему сегменту, если:
        // - Для часов: цифра больше 2 (3-9)
        // - Для минут/секунд: цифра больше 5 (6-9)
        const singleDigit = parseInt(newBuffer);
        if (segment === 'hours' && singleDigit > 2) {
          shouldMoveToNext = true;
        } else if (segment !== 'hours' && singleDigit > 5) {
          shouldMoveToNext = true;
        }
      } else if (newBuffer.length >= 2) {
        // Если введены две цифры, всегда переходим к следующему сегменту
        shouldMoveToNext = true;
      }

      if (shouldMoveToNext) {
        setInputBuffer('');
        if (inputTimeout) {
          clearTimeout(inputTimeout);
          setInputTimeout(null);
        }

        // Переход к следующему сегменту
        if (segment === 'hours') {
          setActiveSegment('minutes');
          setTimeout(() => focusSegment('minutes', range ? pickerType : 'start'), 0);
        } else if (segment === 'minutes' && showSeconds) {
          setActiveSegment('seconds');
          setTimeout(() => focusSegment('seconds', range ? pickerType : 'start'), 0);
        } else {
          setActiveSegment(null);
        }
      }
      // Если не переходим к следующему сегменту, фокус остается на текущем
    };

    const handleSegmentKeyDown = (
      e: React.KeyboardEvent,
      segment: 'hours' | 'minutes' | 'seconds',
      pickerType?: 'start' | 'end',
    ) => {
      if (disabled) return;

      // Для single режима всегда используем 'start' как pickerType
      const actualPickerType = range ? pickerType : 'start';

      // Если это цифра, обрабатываем в handleDigitInput
      if (/^\d$/.test(e.key)) {
        handleDigitInput(e, segment, actualPickerType);
        return;
      }

      const currentTime = range
        ? actualPickerType === 'start'
          ? rangeStart || new Date()
          : actualPickerType === 'end'
            ? rangeEnd || new Date()
            : null
        : selectedTime;
      if (!currentTime) return;

      let newTime: Date;
      const currentValue =
        segment === 'hours'
          ? currentTime.getHours()
          : segment === 'minutes'
            ? currentTime.getMinutes()
            : currentTime.getSeconds();

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          if (segment === 'hours') {
            newTime = new Date(currentTime);
            newTime.setHours((currentValue + 1) % 24);
          } else if (segment === 'minutes') {
            newTime = new Date(currentTime);
            newTime.setMinutes((currentValue + minuteStep) % 60);
          } else {
            newTime = new Date(currentTime);
            newTime.setSeconds((currentValue + secondStep) % 60);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (segment === 'hours') {
            newTime = new Date(currentTime);
            newTime.setHours(currentValue === 0 ? 23 : currentValue - 1);
          } else if (segment === 'minutes') {
            newTime = new Date(currentTime);
            newTime.setMinutes(currentValue === 0 ? 60 - minuteStep : currentValue - minuteStep);
          } else {
            newTime = new Date(currentTime);
            newTime.setSeconds(currentValue === 0 ? 60 - secondStep : currentValue - secondStep);
          }
          break;
        case 'Tab':
          e.preventDefault();
          if (e.shiftKey) {
            // Переход к предыдущему сегменту
            if (segment === 'minutes') {
              setActiveSegment('hours');
              setTimeout(() => focusSegment('hours', range ? pickerType : 'start'), 0);
            } else if (segment === 'seconds') {
              setActiveSegment('minutes');
              setTimeout(() => focusSegment('minutes', range ? pickerType : 'start'), 0);
            }
          } else {
            // Переход к следующему сегменту
            if (segment === 'hours') {
              setActiveSegment('minutes');
              setTimeout(() => focusSegment('minutes', range ? pickerType : 'start'), 0);
            } else if (segment === 'minutes' && showSeconds) {
              setActiveSegment('seconds');
              setTimeout(() => focusSegment('seconds', range ? pickerType : 'start'), 0);
            }
          }
          return;
        case 'Escape':
          e.preventDefault();
          setActiveSegment(null);
          setInputBuffer('');
          if (inputTimeout) {
            clearTimeout(inputTimeout);
            setInputTimeout(null);
          }
          return;
        default:
          return;
      }

      // Применяем изменения
      if (range) {
        if (actualPickerType === 'start') {
          setRangeStart(newTime);
          setTempRangeEnd(null);
        } else if (actualPickerType === 'end') {
          setRangeEnd(newTime);
        }
      } else {
        setSelectedTime(newTime);
      }

      const timeString = formatTimeForDisplay(newTime, format);
      setInputValue(timeString);

      if (onChange) {
        if (range) {
          const startTime =
            pickerType === 'start' || activePicker === 'start' ? newTime : rangeStart;
          const endTime = actualPickerType === 'end' || activePicker === 'end' ? newTime : rangeEnd;
          if (startTime && endTime) {
            onChange({
              start: formatTimeForDisplay(startTime, format),
              end: formatTimeForDisplay(endTime, format),
            });
          }
        } else {
          onChange(timeString);
        }
      }
    };

    const handleApply = () => {
      if (range && rangeStart && rangeEnd) {
        if (onChange) {
          onChange({
            start: toISOTimeString(rangeStart, format),
            end: toISOTimeString(rangeEnd, format),
          });
        }
      }
      setIsOpen(false);
    };

    // Получаем данные для отображения
    const hours = getHours();
    const minutes = getMinutes(minuteStep);
    const seconds = showSeconds ? getSeconds(secondStep) : [];

    // Используем хендлеры для проверки диапазонов
    const _checkIsInRange = (time: Date): boolean => {
      if (!range || !rangeStart) return false;
      const end = rangeEnd || tempRangeEnd;
      if (!end) return false;
      return isInTimeRange(time, rangeStart, end);
    };

    const _checkIsRangeStart = (time: Date): boolean => {
      if (!range || !rangeStart) return false;
      return isTimeRangeStart(time, rangeStart);
    };

    const _checkIsRangeEnd = (time: Date): boolean => {
      if (!range) return false;
      const end = rangeEnd || tempRangeEnd;
      if (!end) return false;
      return isTimeRangeEnd(time, end);
    };

    // Функция для определения активного времени для отображения и создания опций
    const getActiveTime = (): Date => {
      if (range) {
        // В режиме диапазона показываем время активного пикера
        if (activePicker === 'start') {
          return rangeStart || currentTime;
        } else {
          return rangeEnd || currentTime;
        }
      }
      // В обычном режиме используем выбранное время или текущее
      return selectedTime || currentTime;
    };

    // Функции для проверки дизейбла времени
    const _isTimeDisabled = (time: Date): boolean => {
      // Проверяем minTime и maxTime
      if ((minTime && time < minTime) || (maxTime && time > maxTime)) {
        return true;
      }

      // Проверяем disabledTimes
      const timeString = formatTimeForDisplay(time, showSeconds ? 'HH:mm:ss' : 'HH:mm');
      if (disabledTimes.includes(timeString)) {
        return true;
      }

      // Проверяем disabledHours, disabledMinutes, disabledSeconds
      const hours = getHoursFromTime(time);
      const minutes = getMinutesFromTime(time);
      const seconds = getSecondsFromTime(time);

      if (
        disabledHours.includes(hours) ||
        disabledMinutes.includes(minutes) ||
        disabledSeconds.includes(seconds)
      ) {
        return true;
      }

      return false;
    };

    const isHourDisabled = (hour: number, currentTime?: Date): boolean => {
      // Проверяем disabledHours
      if (disabledHours.includes(hour)) {
        return true;
      }

      // Проверяем disabledTimes для этого часа
      if (currentTime) {
        const testTime = createTime(
          hour,
          getMinutesFromTime(currentTime),
          getSecondsFromTime(currentTime),
        );
        const timeString = formatTimeForDisplay(testTime, format);
        if (disabledTimes.includes(timeString)) {
          return true;
        }
      }

      return false;
    };

    const isMinuteDisabled = (minute: number, currentTime?: Date): boolean => {
      // Проверяем disabledMinutes
      if (disabledMinutes.includes(minute)) {
        return true;
      }

      // Проверяем disabledTimes для этой минуты
      if (currentTime) {
        const testTime = createTime(
          getHoursFromTime(currentTime),
          minute,
          getSecondsFromTime(currentTime),
        );
        const timeString = formatTimeForDisplay(testTime, format);
        if (disabledTimes.includes(timeString)) {
          return true;
        }
      }

      return false;
    };

    const isSecondDisabled = (second: number, currentTime?: Date): boolean => {
      // Проверяем disabledSeconds
      if (disabledSeconds.includes(second)) {
        return true;
      }

      // Проверяем disabledTimes для этой секунды
      if (currentTime) {
        const testTime = createTime(
          getHoursFromTime(currentTime),
          getMinutesFromTime(currentTime),
          second,
        );
        const timeString = formatTimeForDisplay(testTime, format);
        if (disabledTimes.includes(timeString)) {
          return true;
        }
      }

      return false;
    };

    // Обработчики для обычного input режима
    const handleRegularInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      // Парсим введенное время
      if (newValue.trim()) {
        if (range) {
          // Проверяем, является ли введенное значение диапазоном времени
          const rangeMatch = newValue.match(/^(.+?)\s*—\s*(.+)$/);
          if (rangeMatch) {
            const startTimeStr = rangeMatch[1].trim();
            const endTimeStr = rangeMatch[2].trim();

            const startResult = parseTime(startTimeStr);
            const endResult = parseTime(endTimeStr);

            if (startResult.isValid && endResult.isValid && startResult.time && endResult.time) {
              setRangeStart(startResult.time);
              setRangeEnd(endResult.time);
              setTempRangeEnd(null);
            }
          } else {
            // Одиночное время в range режиме
            const parsedResult = parseTime(newValue);
            if (parsedResult.isValid && parsedResult.time) {
              setRangeStart(parsedResult.time);
              setRangeEnd(null);
              setTempRangeEnd(null);
            }
          }
        } else {
          // Одиночное время в обычном режиме
          const parsedResult = parseTime(newValue);
          if (parsedResult.isValid && parsedResult.time) {
            setSelectedTime(parsedResult.time);
            if (onChange) {
              onChange(toISOTimeString(parsedResult.time, format));
            }
          }
        }
      }
    };

    const handleRegularInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        if (range) {
          // Проверяем, является ли введенное значение диапазоном времени
          const rangeMatch = inputValue.match(/^(.+?)\s*—\s*(.+)$/);
          if (rangeMatch) {
            const startTimeStr = rangeMatch[1].trim();
            const endTimeStr = rangeMatch[2].trim();

            const startResult = parseTime(startTimeStr);
            const endResult = parseTime(endTimeStr);

            if (startResult.isValid && endResult.isValid && startResult.time && endResult.time) {
              setRangeStart(startResult.time);
              setRangeEnd(endResult.time);
              setTempRangeEnd(null);
              if (onChange) {
                onChange({
                  start: toISOTimeString(startResult.time, format),
                  end: toISOTimeString(endResult.time, format),
                });
              }
            }
          } else {
            // Одиночное время в range режиме
            const parsedResult = parseTime(inputValue);
            if (parsedResult.isValid && parsedResult.time) {
              setRangeStart(parsedResult.time);
              setRangeEnd(null);
              setTempRangeEnd(null);
            }
          }
        } else {
          // Одиночное время в обычном режиме
          const parsedResult = parseTime(inputValue);
          if (parsedResult.isValid && parsedResult.time) {
            setSelectedTime(parsedResult.time);
            if (onChange) {
              onChange(toISOTimeString(parsedResult.time, format));
            }
          }
        }
        setIsOpen(false);
      }
    };

    const handleRegularInputFocus = () => {
      setIsFocused(true);
      // Не открываем пикер при фокусе на input
    };

    const handleRegularInputBlur = () => {
      // Не закрываем сразу, чтобы можно было кликнуть на время в popup
      setTimeout(() => {
        if (!containerRef.current?.contains(document.activeElement)) {
          setIsFocused(false);
          setIsOpen(false);
        }
      }, 150);
    };

    const handleRegularInputClick = () => {
      // Не открываем пикер при клике на input
      // Пикер открывается только при клике на иконку
    };

    // Функция для получения значения для обычного input
    const getRegularInputValue = (): string => {
      if (!range) {
        return selectedTime ? formatTimeForDisplay(selectedTime, format) : '';
      } else {
        if (rangeStart && rangeEnd) {
          return `${formatTimeForDisplay(rangeStart, format)} — ${formatTimeForDisplay(rangeEnd, format)}`;
        } else if (rangeStart) {
          return formatTimeForDisplay(rangeStart, format);
        }
        return '';
      }
    };

    // Компонент для отображения range сегментов времени
    const renderRangeTimeSegments = () => {
      return (
        <RangeTimeContainer>
          <RangeTimeGroup>
            <RangeTimeLabel size={size}>От:</RangeTimeLabel>
            {renderTimeSegments(rangeStart, 'start')}
          </RangeTimeGroup>
          <RangeTimeSeparator>—</RangeTimeSeparator>
          <RangeTimeGroup>
            <RangeTimeLabel size={size}>До:</RangeTimeLabel>
            {renderTimeSegments(rangeEnd, 'end')}
          </RangeTimeGroup>
        </RangeTimeContainer>
      );
    };

    // Компонент для отображения сегментированного времени
    const renderTimeSegments = (time: Date | null, pickerType?: 'start' | 'end') => {
      // В range режиме, если time равен null, создаем временное время для отображения сегментов
      const displayTime = time || (range ? new Date() : null);

      if (!displayTime) {
        return (
          <TimeSegmentsContainer size={size} textAlign={textAlign}>
            <TimeSegment
              ref={pickerType === 'start' ? startHoursRef : endHoursRef}
              isActive={
                activeSegment === 'hours' && (!range || (range && pickerType === activePicker))
              }
              size={size}
              disabled={disabled}
              onClick={() => handleSegmentClick('hours', pickerType)}
              onKeyDown={(e) => handleSegmentKeyDown(e, 'hours', pickerType)}
              tabIndex={0}
            >
              --
            </TimeSegment>
            <TimeSeparator size={size}>:</TimeSeparator>
            <TimeSegment
              ref={pickerType === 'start' ? startMinutesRef : endMinutesRef}
              isActive={
                activeSegment === 'minutes' && (!range || (range && pickerType === activePicker))
              }
              size={size}
              disabled={disabled}
              onClick={() => handleSegmentClick('minutes', pickerType)}
              onKeyDown={(e) => handleSegmentKeyDown(e, 'minutes', pickerType)}
              tabIndex={0}
            >
              --
            </TimeSegment>
            {showSeconds && (
              <>
                <TimeSeparator size={size}>:</TimeSeparator>
                <TimeSegment
                  ref={pickerType === 'start' ? startSecondsRef : endSecondsRef}
                  isActive={
                    activeSegment === 'seconds' &&
                    (!range || (range && pickerType === activePicker))
                  }
                  size={size}
                  disabled={disabled}
                  onClick={() => handleSegmentClick('seconds', pickerType)}
                  onKeyDown={(e) => handleSegmentKeyDown(e, 'seconds', pickerType)}
                  tabIndex={0}
                >
                  --
                </TimeSegment>
              </>
            )}
          </TimeSegmentsContainer>
        );
      }

      const hours = displayTime.getHours().toString().padStart(2, '0');
      const minutes = displayTime.getMinutes().toString().padStart(2, '0');
      const seconds = displayTime.getSeconds().toString().padStart(2, '0');

      return (
        <TimeSegmentsContainer size={size} textAlign={textAlign}>
          <TimeSegment
            ref={pickerType === 'start' ? startHoursRef : endHoursRef}
            isActive={
              activeSegment === 'hours' && (!range || (range && pickerType === activePicker))
            }
            size={size}
            disabled={disabled}
            onClick={() => handleSegmentClick('hours', pickerType)}
            onKeyDown={(e) => handleSegmentKeyDown(e, 'hours', pickerType)}
            tabIndex={0}
          >
            {hours}
          </TimeSegment>
          <TimeSeparator size={size}>:</TimeSeparator>
          <TimeSegment
            ref={pickerType === 'start' ? startMinutesRef : endMinutesRef}
            isActive={
              activeSegment === 'minutes' && (!range || (range && pickerType === activePicker))
            }
            size={size}
            disabled={disabled}
            onClick={() => handleSegmentClick('minutes', pickerType)}
            onKeyDown={(e) => handleSegmentKeyDown(e, 'minutes', pickerType)}
            tabIndex={0}
          >
            {minutes}
          </TimeSegment>
          {showSeconds && (
            <>
              <TimeSeparator size={size}>:</TimeSeparator>
              <TimeSegment
                ref={pickerType === 'start' ? startSecondsRef : endSecondsRef}
                isActive={
                  activeSegment === 'seconds' && (!range || (range && pickerType === activePicker))
                }
                size={size}
                disabled={disabled}
                onClick={() => handleSegmentClick('seconds', pickerType)}
                onKeyDown={(e) => handleSegmentKeyDown(e, 'seconds', pickerType)}
                tabIndex={0}
              >
                {seconds}
              </TimeSegment>
            </>
          )}
        </TimeSegmentsContainer>
      );
    };

    const timeInputContent = (
      <Container
        ref={containerRef}
        className={clsx('ui-time-input', className)}
        disabled={disabled}
        error={!!error}
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
              <LeftLabel focused={isFocused} disabled={disabled} error={!!error} size={size}>
                {label}
              </LeftLabel>
            )}
            {additionalLabel && (
              <RightLabel focused={isFocused} disabled={disabled} error={!!error} size={size}>
                {additionalLabel}
              </RightLabel>
            )}
          </div>
        )}
        {skeleton ? (
          <SkeletonEffect size={size} fullWidth />
        ) : (
          <InputWrapper
            focused={isFocused}
            disabled={disabled}
            error={!!error}
            size={size}
            status={status}
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
                        name="IconPlainerClock"
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
              // Сегментированный режим ввода
              range ? (
                renderRangeTimeSegments()
              ) : (
                renderTimeSegments(selectedTime, 'start')
              )
            ) : (
              // Обычный режим ввода времени
              <RegularTimeInput
                ref={ref}
                type="text"
                value={inputValue || getRegularInputValue()}
                onChange={handleRegularInputChange}
                onKeyDown={handleRegularInputKeyDown}
                onFocus={handleRegularInputFocus}
                onBlur={handleRegularInputBlur}
                onClick={handleRegularInputClick}
                disabled={disabled}
                placeholder={placeholder || (range ? 'HH:mm — HH:mm' : 'HH:mm')}
                size={size}
                hasIcon={showIcon}
                textAlign={textAlign}
                onSelect={disableCopying ? (e) => e.preventDefault() : undefined}
                onCopy={disableCopying ? (e) => e.preventDefault() : undefined}
                onCut={disableCopying ? (e) => e.preventDefault() : undefined}
                onPaste={disableCopying ? (e) => e.preventDefault() : undefined}
                {...props}
              />
            )}
            {displayClearIcon && inputValue && !disabled && (
              <IconWrapper size={size} $marginLeftAuto>
                <IconButton onClick={handleClearIconClick}>
                  <Icon
                    name="IconPlainerClose"
                    size={getClearIconSizeForInputField(size)}
                    {...clearIconProps}
                  />
                </IconButton>
              </IconWrapper>
            )}
          </InputWrapper>
        )}
        {error && <ErrorMessage size={size}>{error}</ErrorMessage>}
        {extraText && <ExtraText size={size}>{extraText}</ExtraText>}
        {displayCharacterCounter &&
          props.maxLength &&
          (() => {
            const currentValue = inputValue || '';
            const currentLength = ignoreMaskCharacters
              ? currentValue.replace(/[-:\/]/g, '').length
              : currentValue.length;

            // Проверяем threshold для отображения счетчика
            const shouldShowCounter =
              characterCounterVisibilityThreshold === 0 ||
              (characterCounterVisibilityThreshold === 1
                ? false
                : currentLength >= props.maxLength! * characterCounterVisibilityThreshold);

            return shouldShowCounter ? (
              <CharacterCounter size={size} $isOverLimit={currentLength > props.maxLength!}>
                {`${currentLength}/${props.maxLength}`}
              </CharacterCounter>
            ) : null;
          })()}

        <TimePickerPopup
          isOpen={isOpen}
          size={size}
          showSeconds={showSeconds}
          className="time-picker-popup"
          style={
            range
              ? {
                  minWidth: showSeconds ? '800px' : '600px',
                  maxWidth: showSeconds ? '800px' : '600px',
                }
              : {}
          }
        >
          {renderTopPanel && (
            <div style={{ padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
              {renderTopPanel()}
            </div>
          )}

          {range ? (
            // Range режим - два пикера рядом
            <RangeContainer showSeconds={showSeconds}>
              <RangePickersWrapper>
                {/* Пикер для начального времени */}
                <RangePickerContainer
                  isActive={activePicker === 'start'}
                  onClick={() => setActivePicker('start')}
                >
                  <RangePickerHeader>
                    <RangePickerTitle>Начальное время</RangePickerTitle>
                  </RangePickerHeader>

                  <TimePickerGrid>
                    <TimeColumn>
                      <TimeColumnLabel>Часы</TimeColumnLabel>
                      <TimeColumnContent>
                        {hours.map((hour) => {
                          const currentTime = rangeStart || getCurrentTime();
                          const time = createTime(
                            hour,
                            getMinutesFromTime(currentTime),
                            getSecondsFromTime(currentTime),
                          );
                          return (
                            <TimeOption
                              key={hour}
                              isSelected={
                                getHoursFromTime(currentTime) === hour &&
                                !isHourDisabled(hour, currentTime)
                              }
                              isCurrent={isCurrentTime(time)}
                              isDisabled={isHourDisabled(hour, currentTime)}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActivePicker('start');
                                handleTimeClick('hour', hour, 'start');
                              }}
                            >
                              {formatHours(hour)}
                            </TimeOption>
                          );
                        })}
                      </TimeColumnContent>
                    </TimeColumn>

                    <TimeColumn>
                      <TimeColumnLabel>Минуты</TimeColumnLabel>
                      <TimeColumnContent>
                        {minutes.map((minute) => {
                          const currentTime = rangeStart || getCurrentTime();
                          const time = createTime(
                            getHoursFromTime(currentTime),
                            minute,
                            getSecondsFromTime(currentTime),
                          );
                          return (
                            <TimeOption
                              key={minute}
                              isSelected={
                                getMinutesFromTime(currentTime) === minute &&
                                !isMinuteDisabled(minute, currentTime)
                              }
                              isCurrent={isCurrentTime(time)}
                              isDisabled={isMinuteDisabled(minute, currentTime)}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActivePicker('start');
                                handleTimeClick('minute', minute, 'start');
                              }}
                            >
                              {formatMinutes(minute)}
                            </TimeOption>
                          );
                        })}
                      </TimeColumnContent>
                    </TimeColumn>

                    {showSeconds && (
                      <TimeColumn>
                        <TimeColumnLabel>Секунды</TimeColumnLabel>
                        <TimeColumnContent>
                          {seconds.map((second) => {
                            const currentTime = rangeStart || getCurrentTime();
                            const time = createTime(
                              getHoursFromTime(currentTime),
                              getMinutesFromTime(currentTime),
                              second,
                            );
                            return (
                              <TimeOption
                                key={second}
                                isSelected={
                                  getSecondsFromTime(currentTime) === second &&
                                  !isSecondDisabled(second, currentTime)
                                }
                                isCurrent={isCurrentTime(time)}
                                isDisabled={isSecondDisabled(second, currentTime)}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActivePicker('start');
                                  handleTimeClick('second', second, 'start');
                                }}
                              >
                                {formatSeconds(second)}
                              </TimeOption>
                            );
                          })}
                        </TimeColumnContent>
                      </TimeColumn>
                    )}
                  </TimePickerGrid>
                </RangePickerContainer>

                {/* Пикер для конечного времени */}
                <RangePickerContainer
                  isActive={activePicker === 'end'}
                  onClick={() => setActivePicker('end')}
                >
                  <RangePickerHeader>
                    <RangePickerTitle>Конечное время</RangePickerTitle>
                  </RangePickerHeader>

                  <TimePickerGrid>
                    <TimeColumn>
                      <TimeColumnLabel>Часы</TimeColumnLabel>
                      <TimeColumnContent>
                        {hours.map((hour) => {
                          const currentTime = rangeEnd || getCurrentTime();
                          const time = createTime(
                            hour,
                            getMinutesFromTime(currentTime),
                            getSecondsFromTime(currentTime),
                          );
                          return (
                            <TimeOption
                              key={hour}
                              isSelected={
                                getHoursFromTime(currentTime) === hour &&
                                !isHourDisabled(hour, currentTime)
                              }
                              isCurrent={isCurrentTime(time)}
                              isDisabled={isHourDisabled(hour, currentTime)}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActivePicker('end');
                                handleTimeClick('hour', hour, 'end');
                              }}
                            >
                              {formatHours(hour)}
                            </TimeOption>
                          );
                        })}
                      </TimeColumnContent>
                    </TimeColumn>

                    <TimeColumn>
                      <TimeColumnLabel>Минуты</TimeColumnLabel>
                      <TimeColumnContent>
                        {minutes.map((minute) => {
                          const currentTime = rangeEnd || getCurrentTime();
                          const time = createTime(
                            getHoursFromTime(currentTime),
                            minute,
                            getSecondsFromTime(currentTime),
                          );
                          return (
                            <TimeOption
                              key={minute}
                              isSelected={
                                getMinutesFromTime(currentTime) === minute &&
                                !isMinuteDisabled(minute, currentTime)
                              }
                              isCurrent={isCurrentTime(time)}
                              isDisabled={isMinuteDisabled(minute, currentTime)}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActivePicker('end');
                                handleTimeClick('minute', minute, 'end');
                              }}
                            >
                              {formatMinutes(minute)}
                            </TimeOption>
                          );
                        })}
                      </TimeColumnContent>
                    </TimeColumn>

                    {showSeconds && (
                      <TimeColumn>
                        <TimeColumnLabel>Секунды</TimeColumnLabel>
                        <TimeColumnContent>
                          {seconds.map((second) => {
                            const currentTime = rangeEnd || getCurrentTime();
                            const time = createTime(
                              getHoursFromTime(currentTime),
                              getMinutesFromTime(currentTime),
                              second,
                            );
                            return (
                              <TimeOption
                                key={second}
                                isSelected={
                                  getSecondsFromTime(currentTime) === second &&
                                  !isSecondDisabled(second, currentTime)
                                }
                                isCurrent={isCurrentTime(time)}
                                isDisabled={isSecondDisabled(second, currentTime)}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActivePicker('end');
                                  handleTimeClick('second', second, 'end');
                                }}
                              >
                                {formatSeconds(second)}
                              </TimeOption>
                            );
                          })}
                        </TimeColumnContent>
                      </TimeColumn>
                    )}
                  </TimePickerGrid>
                </RangePickerContainer>
              </RangePickersWrapper>

              <RangeFooter>
                <ActionButton variant={ButtonVariant.SECONDARY} onClick={handleClear}>
                  Очистить
                </ActionButton>
                <ActionButton variant={ButtonVariant.PRIMARY} onClick={handleApply}>
                  Применить
                </ActionButton>
              </RangeFooter>

              {renderBottomPanel && (
                <div style={{ padding: '16px', borderTop: '1px solid #e0e0e0' }}>
                  {renderBottomPanel()}
                </div>
              )}
            </RangeContainer>
          ) : (
            // Обычный режим - стандартный интерфейс
            <>
              <TimePickerGrid>
                <TimeColumn>
                  <TimeColumnLabel>Часы</TimeColumnLabel>
                  <TimeColumnContent>
                    {hours.map((hour) => {
                      const activeTime = getActiveTime();
                      const time = createTime(
                        hour,
                        getMinutesFromTime(activeTime),
                        getSecondsFromTime(activeTime),
                      );
                      return (
                        <TimeOption
                          key={hour}
                          isSelected={
                            selectedTime !== null &&
                            getHoursFromTime(selectedTime) === hour &&
                            !isHourDisabled(hour, activeTime)
                          }
                          isCurrent={isCurrentTime(time)}
                          isDisabled={isHourDisabled(hour, activeTime)}
                          onClick={() => handleTimeClick('hour', hour)}
                          onMouseEnter={() => handleTimeMouseEnter(time)}
                          onMouseLeave={handleTimeMouseLeave}
                        >
                          {formatHours(hour)}
                        </TimeOption>
                      );
                    })}
                  </TimeColumnContent>
                </TimeColumn>

                <TimeColumn>
                  <TimeColumnLabel>Минуты</TimeColumnLabel>
                  <TimeColumnContent>
                    {minutes.map((minute) => {
                      const activeTime = getActiveTime();
                      const time = createTime(
                        getHoursFromTime(activeTime),
                        minute,
                        getSecondsFromTime(activeTime),
                      );
                      return (
                        <TimeOption
                          key={minute}
                          isSelected={
                            selectedTime !== null &&
                            getMinutesFromTime(selectedTime) === minute &&
                            !isMinuteDisabled(minute, activeTime)
                          }
                          isCurrent={isCurrentTime(time)}
                          isDisabled={isMinuteDisabled(minute, activeTime)}
                          onClick={() => handleTimeClick('minute', minute)}
                          onMouseEnter={() => handleTimeMouseEnter(time)}
                          onMouseLeave={handleTimeMouseLeave}
                        >
                          {formatMinutes(minute)}
                        </TimeOption>
                      );
                    })}
                  </TimeColumnContent>
                </TimeColumn>

                {showSeconds && (
                  <TimeColumn>
                    <TimeColumnLabel>Секунды</TimeColumnLabel>
                    <TimeColumnContent>
                      {seconds.map((second) => {
                        const activeTime = getActiveTime();
                        const time = createTime(
                          getHoursFromTime(activeTime),
                          getMinutesFromTime(activeTime),
                          second,
                        );
                        return (
                          <TimeOption
                            key={second}
                            isSelected={
                              selectedTime !== null &&
                              getSecondsFromTime(selectedTime) === second &&
                              !isSecondDisabled(second, activeTime)
                            }
                            isCurrent={isCurrentTime(time)}
                            isDisabled={isSecondDisabled(second, activeTime)}
                            onClick={() => handleTimeClick('second', second)}
                            onMouseEnter={() => handleTimeMouseEnter(time)}
                            onMouseLeave={handleTimeMouseLeave}
                          >
                            {formatSeconds(second)}
                          </TimeOption>
                        );
                      })}
                    </TimeColumnContent>
                  </TimeColumn>
                )}
              </TimePickerGrid>

              <Footer>
                <ActionButton variant={ButtonVariant.SECONDARY} onClick={handleClear}>
                  Очистить
                </ActionButton>
                <ActionButton variant={ButtonVariant.PRIMARY} onClick={() => setIsOpen(false)}>
                  OK
                </ActionButton>
              </Footer>

              {renderBottomPanel && (
                <div style={{ padding: '16px', borderTop: '1px solid #e0e0e0' }}>
                  {renderBottomPanel()}
                </div>
              )}
            </>
          )}
        </TimePickerPopup>
      </Container>
    );

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
          <Hint content={tooltip} placement={hintPosition} variant={HintVariant.DEFAULT}>
            {timeInputContent}
          </Hint>
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
          <Tooltip content={tooltip} position={tooltipPos}>
            {timeInputContent}
          </Tooltip>
        );
      }
    }

    return timeInputContent;
  },
);

TimeInput.displayName = 'TimeInput';
