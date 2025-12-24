import React, { forwardRef, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { clsx } from 'clsx';
import type { DatePickerProps, TooltipPosition } from '../../../../types/ui';
import { BorderRadiusHandler, TransitionHandler } from '../../../../handlers/uiHandlers';
import {
  parseDate,
  formatDateForDisplay,
  toISODateString,
  isToday,
  getDaysInMonth,
  getMonthYearDisplay,
  getWeekdayNames,
  isInRange,
  isRangeStart,
  isRangeEnd,
  isCurrentMonth,
} from '../../../../handlers/dateHandlers';
import { Size, IconSize } from '../../../../types/sizes';
import { Icon } from '../../Icon/Icon';
import { Tooltip } from '../../Tooltip/Tooltip';
import { Hint, HintPosition, HintVariant } from '../../Hint/Hint';
import {
  InputContainerWithPadding,
  LoadingSpinner,
  SkeletonEffect,
  InputWrapper,
  StyledInput,
  IconWrapper,
} from '../shared';

// Используем InputContainerWithPadding из общих стилей

// Используем LoadingSpinner из общих стилей

// Используем SkeletonEffect из общих стилей

// Используем SkeletonEffect из общих стилей

// Используем InputWrapper из общих стилей

// Используем StyledInput из общих стилей

// Используем IconWrapper из общих стилей

const _Label = styled.label.withConfig({
  shouldForwardProp: prop => !['focused', 'disabled', 'error', 'size'].includes(prop),
})<{
  focused: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: Size;
}>`
  position: absolute;
  top: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '-8px';
      case Size.LG:
        return '-12px';
      default:
        return '-10px';
    }
  }};
  left: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '8px';
      case Size.LG:
        return '16px';
      default:
        return '12px';
    }
  }};
  background: ${({ theme }) => theme.colors.backgroundTertiary};
  padding: 0 4px;
  font-size: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '10px';
      case Size.LG:
        return '14px';
      default:
        return '12px';
    }
  }};
  color: ${({ theme, focused, error, disabled }) => {
    if (disabled) return theme.colors.textDisabled;
    if (error) return theme.colors.danger;
    if (focused) return theme.colors.primary;
    return theme.colors.textSecondary;
  }};
  transition: ${TransitionHandler()};
  pointer-events: none;
  z-index: 1;
`;

const AbsoluteLabel = styled.label.withConfig({
  shouldForwardProp: prop => !['focused', 'disabled', 'error', 'size'].includes(prop),
})<{
  focused: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: Size;
}>`
  position: absolute !important;
  top: 0 !important;
  margin: 0 !important;
  background: none !important;
  padding: 0 !important;
  color: ${({ theme, focused, error, disabled }) => {
    if (disabled) return theme.colors.textDisabled;
    if (error) return theme.colors.danger;
    if (focused) return theme.colors.primary;
    return theme.colors.textSecondary;
  }};
  transition: ${TransitionHandler()};
`;

const LeftLabel = styled(AbsoluteLabel)`
  left: 0 !important;
  font-size: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '10px';
      case Size.LG:
        return '14px';
      default:
        return '12px';
    }
  }};
`;

const RightLabel = styled(AbsoluteLabel)`
  right: 0 !important;
  font-size: 12px;
  opacity: 0.7;
`;

const ErrorMessage = styled.div<{ size?: Size }>`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '10px';
      case Size.LG:
        return '14px';
      default:
        return '12px';
    }
  }};
  margin-top: 4px;
  line-height: 1.4;
`;

const ExtraText = styled.div<{ size?: Size }>`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '10px';
      case Size.LG:
        return '14px';
      default:
        return '12px';
    }
  }};
  margin-top: 4px;
  line-height: 1.4;
  display: block;
`;

const CharacterCounter = styled.div<{
  $size?: Size;
  $isOverLimit?: boolean;
}>`
  color: ${({ theme, $isOverLimit }) =>
    $isOverLimit ? theme.colors.danger : theme.colors.textSecondary};
  font-size: ${({ $size }) => {
    switch ($size) {
      case Size.SM:
        return '10px';
      case Size.LG:
        return '14px';
      default:
        return '12px';
    }
  }};
  margin-top: 4px;
  line-height: 1.4;
  display: block;
  text-align: right;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: ${TransitionHandler()};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CalendarPopup = styled.div.withConfig({
  shouldForwardProp: prop => !['isOpen', 'size'].includes(prop),
})<{ isOpen: boolean; size?: Size }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 2px solid ${({ theme }) => theme.colors.borderSecondary};
  border-radius: ${BorderRadiusHandler(Size.SM)};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  transition: ${TransitionHandler()};
  margin-top: 4px;
  padding: 16px;
  min-width: 280px;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const MonthYear = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: ${TransitionHandler()};
  border-radius: 4px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const WeekdayHeader = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 8px 4px;
`;

const DayButton = styled.button.withConfig({
  shouldForwardProp: prop =>
    ![
      'isCurrentMonth',
      'isSelected',
      'isToday',
      'isInRange',
      'isRangeStart',
      'isRangeEnd',
    ].includes(prop),
})<{
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  isInRange?: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
}>`
  background: ${({ theme, isSelected, isInRange, isRangeStart, isRangeEnd }) => {
    if (isSelected || isRangeStart || isRangeEnd) return theme.colors.primary;
    if (isInRange) return theme.colors.primaryHover;
    return 'transparent';
  }};
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: ${TransitionHandler()};
  color: ${({ theme, isCurrentMonth, isSelected, isRangeStart, isRangeEnd }) => {
    if (isSelected || isRangeStart || isRangeEnd) return theme.colors.text;
    if (!isCurrentMonth) return theme.colors.textDisabled;
    return theme.colors.text;
  }};
  font-weight: ${({ isToday, isSelected, isRangeStart, isRangeEnd }) =>
    isToday || isSelected || isRangeStart || isRangeEnd ? 600 : 400};

  &:hover {
    background: ${({ theme, isSelected, isRangeStart, isRangeEnd }) => {
      if (isSelected || isRangeStart || isRangeEnd) return theme.colors.primaryHover;
      return theme.colors.backgroundSecondary;
    }};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSecondary};
`;

const ActionButton = styled.button.withConfig({
  shouldForwardProp: prop => !['variant'].includes(prop),
})<{ variant?: 'primary' | 'secondary' }>`
  background: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.primary : 'transparent'};
  color: ${({ theme, variant }) => (variant === 'primary' ? theme.colors.text : theme.colors.text)};
  border: 1px solid
    ${({ theme, variant }) =>
      variant === 'primary' ? theme.colors.primary : theme.colors.borderSecondary};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: ${TransitionHandler()};

  &:hover {
    background: ${({ theme, variant }) =>
      variant === 'primary' ? theme.colors.primaryHover : theme.colors.backgroundSecondary};
  }
`;

// Стилизованные компоненты для сегментированного ввода даты
const DateSegmentsContainer = styled.div.withConfig({
  shouldForwardProp: prop => !['size', 'textAlign'].includes(prop),
})<{
  size?: Size;
  textAlign?: 'left' | 'center' | 'right';
}>`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  justify-content: ${({ textAlign }) => {
    switch (textAlign) {
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      default:
        return 'flex-start';
    }
  }};
`;

const DateSegment = styled.span.withConfig({
  shouldForwardProp: prop => !['isActive', 'size', 'disabled'].includes(prop),
})<{
  isActive: boolean;
  size?: Size;
  disabled?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '24px';
      case Size.LG:
        return '40px';
      default:
        return '32px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '20px';
      case Size.LG:
        return '32px';
      default:
        return '24px';
    }
  }};
  padding: 2px 4px;
  border-radius: 4px;
  font-size: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '12px';
      case Size.LG:
        return '16px';
      default:
        return '14px';
    }
  }};
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: ${TransitionHandler()};
  background: ${({ theme, isActive }) => (isActive ? theme.colors.primary : 'transparent')};
  color: ${({ theme, isActive, disabled }) => {
    if (disabled) return theme.colors.textDisabled;
    if (isActive) return theme.colors.text;
    return theme.colors.text;
  }};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    background: ${({ theme, isActive, disabled }) => {
      if (disabled) return 'transparent';
      if (isActive) return theme.colors.primaryHover;
      return theme.colors.backgroundSecondary;
    }};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const DateSeparator = styled.span<{ size?: Size }>`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '12px';
      case Size.LG:
        return '16px';
      default:
        return '14px';
    }
  }};
  font-weight: 500;
  user-select: none;
`;

// Для range режима
const RangeDateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const RangeDateGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RangeDateLabel = styled.span<{ size?: Size }>`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const RangeDateSeparator = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const DateInput = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      label,
      placeholder,
      disabled = false,
      readOnly = false,
      size = Size.MD,
      error,
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
      clearIcon = false,
      onClearIconClick,
      disabledDates = [],
      disabledDays = [],
      disabledMonths = [],
      disabledYears = [],
      segmented = false, // По умолчанию используем обычный input
      format = 'DD.MM.YYYY', // Формат отображения даты по умолчанию
      ...props
    },
    ref,
  ) => {
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

    // Используем хендлеры для работы с датами
    const formatDate = useCallback(
      (date: Date | null) => formatDateForDisplay(date, format),
      [format],
    );

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

    // Синхронизируем inputValue с выбранными датами
    useEffect(() => {
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
    }, [selectedDate, rangeStart, rangeEnd, range, formatDate]);

    // Используем хендлеры для работы с датами

    // Используем хендлеры для проверки диапазонов
    const checkIsInRange = (date: Date): boolean => {
      if (!range || !rangeStart) return false;
      const end = rangeEnd || tempRangeEnd;
      if (!end) return false;
      return isInRange(date, rangeStart, end);
    };

    const checkIsRangeStart = (date: Date): boolean => {
      if (!range || !rangeStart) return false;
      return isRangeStart(date, rangeStart);
    };

    const checkIsRangeEnd = (date: Date): boolean => {
      if (!range) return false;
      const end = rangeEnd || tempRangeEnd;
      if (!end) return false;
      return isRangeEnd(date, end);
    };

    const handleDayClick = (date: Date) => {
      if (!range) {
        setSelectedDate(date);
        setInputValue(formatDate(date));
        if (onChange) {
          onChange(toISODateString(date));
        }
        setIsOpen(false);
      } else {
        if (!rangeStart || (rangeStart && rangeEnd)) {
          setRangeStart(date);
          setCurrentDate(date); // Обновляем текущий месяц в календаре
          setRangeEnd(null);
          setTempRangeEnd(null);
          setInputValue(formatDate(date));
        } else {
          if (date < rangeStart) {
            setRangeStart(date);
            setCurrentDate(date); // Обновляем текущий месяц в календаре
            setRangeEnd(rangeStart);
            setInputValue(`${formatDate(date)} — ${formatDate(rangeStart)}`);
          } else {
            setRangeEnd(date);
            setTempRangeEnd(null);
            setInputValue(`${formatDate(rangeStart)} — ${formatDate(date)}`);
          }
        }
      }
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

    const handleApply = () => {
      if (range && rangeStart && rangeEnd) {
        if (onChange) {
          onChange({
            start: toISODateString(rangeStart),
            end: toISODateString(rangeEnd),
          });
        }
      }
      setIsOpen(false);
    };

    const handleClear = () => {
      if (!range) {
        setSelectedDate(null);
        setInputValue('');
        if (onChange) {
          onChange('');
        }
      } else {
        setRangeStart(null);
        setRangeEnd(null);
        setTempRangeEnd(null);
        setInputValue('');
        if (onChange) {
          onChange({ start: '', end: '' });
        }
      }
      setIsOpen(false);
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
      setCurrentDate(prev => {
        const newDate = new Date(prev);
        if (direction === 'prev') {
          newDate.setMonth(newDate.getMonth() - 1);
        } else {
          newDate.setMonth(newDate.getMonth() + 1);
        }
        return newDate;
      });
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
      let ref: React.RefObject<HTMLSpanElement> | null = null;

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
          disabledDate =>
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
            onKeyDown={e => handleSegmentKeyDown(e, 'day', pickerType)}
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
            onKeyDown={e => handleSegmentKeyDown(e, 'month', pickerType)}
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
            onKeyDown={e => handleSegmentKeyDown(e, 'year', pickerType)}
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

    const weekdays = getWeekdayNames();
    const days = getDaysInMonth(currentDate);

    // Очищаем буфер при изменении даты
    useEffect(() => {
      setInputBuffer({ day: '', month: '', year: '' });
    }, [selectedDate, rangeStart, rangeEnd]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
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
        {skeleton ? (
          <SkeletonEffect size={size} />
        ) : (
          <InputWrapper focused={isOpen} error={error} size={size} status={status}>
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
                onSelect={disableCopying ? e => e.preventDefault() : undefined}
                onCopy={disableCopying ? e => e.preventDefault() : undefined}
                onCut={disableCopying ? e => e.preventDefault() : undefined}
                onPaste={disableCopying ? e => e.preventDefault() : undefined}
                {...props}
              />
            )}
            {clearIcon && inputValue && !disabled && (
              <IconWrapper size={size} style={{ marginLeft: 'auto' }}>
                <IconButton onClick={handleClearIconClick}>
                  <Icon
                    name="IconPlainerClose"
                    size={
                      size === Size.SM ? IconSize.XS : size === Size.LG ? IconSize.MD : IconSize.SM
                    }
                  />
                </IconButton>
              </IconWrapper>
            )}
          </InputWrapper>
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

            return shouldShowCounter ? (
              <CharacterCounter $size={size} $isOverLimit={currentLength > props.maxLength!}>
                {`${currentLength}/${props.maxLength}`}
              </CharacterCounter>
            ) : null;
          })()}

        <CalendarPopup isOpen={isOpen} size={size}>
          {renderTopPanel && (
            <div style={{ padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
              {renderTopPanel()}
            </div>
          )}

          <CalendarHeader>
            <NavigationButton onClick={() => navigateMonth('prev')}>
              <Icon name="IconPlainerArrowLeft" size={IconSize.SM} />
            </NavigationButton>
            <MonthYear>{getMonthYearDisplay(currentDate)}</MonthYear>
            <NavigationButton onClick={() => navigateMonth('next')}>
              <Icon name="IconPlainerArrowRight" size={IconSize.SM} />
            </NavigationButton>
          </CalendarHeader>

          <CalendarGrid>
            {weekdays.map(day => (
              <WeekdayHeader key={day}>{day}</WeekdayHeader>
            ))}
            {days.map((date, index) => (
              <DayButton
                key={index}
                isCurrentMonth={isCurrentMonth(date, currentDate)}
                isSelected={
                  !range ? selectedDate !== null && isRangeStart(date, selectedDate) : false
                }
                isToday={isToday(date)}
                isInRange={checkIsInRange(date)}
                isRangeStart={checkIsRangeStart(date)}
                isRangeEnd={checkIsRangeEnd(date)}
                onClick={() => handleDayClick(date)}
                onMouseEnter={() => handleDayMouseEnter(date)}
                onMouseLeave={handleDayMouseLeave}
                disabled={isDateDisabled(date)}
              >
                {date.getDate()}
              </DayButton>
            ))}
          </CalendarGrid>

          <Footer>
            <ActionButton variant="secondary" onClick={handleClear}>
              Очистить
            </ActionButton>
            {range && (
              <ActionButton variant="primary" onClick={handleApply}>
                Применить
              </ActionButton>
            )}
          </Footer>

          {renderBottomPanel && (
            <div style={{ padding: '16px', borderTop: '1px solid #e0e0e0' }}>
              {renderBottomPanel()}
            </div>
          )}
        </CalendarPopup>
      </InputContainerWithPadding>
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
            {dateInputContent}
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
            {dateInputContent}
          </Tooltip>
        );
      }
    }

    return dateInputContent;
  },
);

DateInput.displayName = 'DateInput';
