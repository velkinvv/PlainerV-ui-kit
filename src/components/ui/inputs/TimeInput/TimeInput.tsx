import React, { forwardRef, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { clsx } from 'clsx';
import type { TimeInputProps } from '../../../../types/ui';
import { ButtonVariant, TooltipPosition } from '../../../../types/ui';
import {
  BorderRadiusHandler,
  TransitionHandler,
  InputSizeHandler,
  InputPaddingHandler,
} from '../../../../handlers/uiHandlers';
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
} from '../../../../handlers/timeHandlers';
import { getClearIconSizeForInputField } from '../../../../handlers/iconHandlers';
import { Size, IconSize } from '../../../../types/sizes';
import { Icon } from '../../Icon/Icon';
import { Tooltip } from '../../Tooltip/Tooltip';
import { Hint, HintPosition, HintVariant } from '../../Hint/Hint';
import { Button } from '../../buttons/Button';
import { SkeletonEffect } from '../shared';

// Стилизованные компоненты
const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !['error'].includes(prop),
})<{ disabled?: boolean; error?: boolean }>`
  position: relative;
  width: 100%;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  padding-top: 10px;
`;

const LoadingSpinner = styled.div<{ size?: Size }>`
  width: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '16px';
      case Size.LG:
        return '20px';
      default:
        return '18px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '16px';
      case Size.LG:
        return '20px';
      default:
        return '18px';
    }
  }};
  border: 2px solid ${({ theme }) => theme.colors.borderSecondary};
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: 8px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const InputWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['focused', 'error', 'status'].includes(prop),
})<{
  focused: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: Size;
  status?: 'error' | 'success' | 'warning';
}>`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid
    ${({ theme, focused, error, disabled, status }) => {
      if (disabled) return theme.colors.borderTertiary;
      if (error) return theme.colors.danger;
      if (status === 'error') return theme.colors.danger;
      if (status === 'success') return theme.colors.success;
      if (status === 'warning') return theme.colors.warning;
      if (focused) return theme.colors.primary;
      return theme.colors.borderSecondary;
    }};
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.backgroundTertiary : theme.colors.backgroundSecondary};
  transition: ${TransitionHandler()};
  width: 100%;
  box-sizing: border-box;
  min-height: ${({ size, theme }) => InputSizeHandler(size ?? theme.defaultInputSize)};
  padding: ${({ size, theme }) => InputPaddingHandler(size ?? theme.defaultInputSize)};

  &:hover {
    border-color: ${({ theme, focused, error, disabled, status }) => {
      if (disabled) return theme.colors.borderTertiary;
      if (error) return theme.colors.dangerHover;
      if (status === 'error') return theme.colors.dangerHover;
      if (status === 'success') return theme.colors.successHover;
      if (status === 'warning') return theme.colors.warning;
      if (focused) return theme.colors.primaryHover;
      return theme.colors.borderHover;
    }};
  }
`;

const _StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) => !['textAlign'].includes(prop),
})<{
  size?: Size;
  hasIcon?: boolean;
  textAlign?: 'left' | 'center' | 'right';
}>`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
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
  line-height: 1.4;
  padding-left: ${({ hasIcon }) => (hasIcon ? '8px' : '0')};
  text-align: ${({ textAlign }) => textAlign || 'left'};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.div<{ size?: Size }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-right: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '4px';
      case Size.LG:
        return '8px';
      default:
        return '6px';
    }
  }};
`;

const _Label = styled.label.withConfig({
  shouldForwardProp: (prop) => !['focused', 'error'].includes(prop),
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
        return '12px';
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
  shouldForwardProp: (prop) => !['focused', 'error'].includes(prop),
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
        return '12px';
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

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: ${TransitionHandler()};

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.text};
  }
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
  size?: Size;
  $isOverLimit?: boolean;
}>`
  color: ${({ theme, $isOverLimit }) =>
    $isOverLimit ? theme.colors.danger : theme.colors.textSecondary};
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
  text-align: right;
`;

const TimePickerPopup = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isOpen', 'showSeconds'].includes(prop),
})<{
  isOpen: boolean;
  size?: Size;
  showSeconds?: boolean;
}>`
  position: absolute;
  top: 100%;
  left: 0;
  width: max-content;
  max-width: 100%;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 2px solid ${({ theme }) => theme.colors.borderSecondary};
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  transition: ${TransitionHandler()};
  margin-top: 4px;
  min-width: ${({ showSeconds }) => (showSeconds ? '300px' : '280px')};
`;

const _TimePickerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const _TimeDisplay = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  flex: 1;
`;

const TimePickerGrid = styled.div`
  display: flex;
  gap: 0;
  padding: 0;
  height: 200px;
`;

const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-right: none;
  }
`;

const TimeColumnLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 8px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 500;
  background: ${({ theme }) => theme.colors.backgroundTertiary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TimeColumnContent = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 4px 0;
`;

const TimeOption = styled.button.withConfig({
  shouldForwardProp: (prop) => !['isSelected', 'isCurrent', 'isDisabled'].includes(prop),
})<{
  isSelected: boolean;
  isCurrent: boolean;
  isDisabled: boolean;
}>`
  width: calc(100% - 16px);
  min-height: 32px;
  padding: 0 8px;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  margin: 2px auto;
  box-sizing: border-box;
  background: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.backgroundTertiary : 'transparent'};
  color: ${({ theme, isSelected, isDisabled }) =>
    isSelected
      ? theme.colors.primary
      : isDisabled
        ? theme.colors.textDisabled || theme.colors.textSecondary
        : theme.colors.text};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  transition: ${TransitionHandler()};
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  position: relative;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.backgroundTertiary};
    border-color: ${({ theme }) => theme.colors.borderSecondary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 1px;
  }

  ${({ isSelected, theme, isDisabled }) =>
    isSelected &&
    !isDisabled &&
    `
    background: ${theme.colors.primary} !important;
    border-color: ${theme.colors.primary} !important;
    color: ${theme.colors.backgroundSecondary} !important;
  `}

  ${({ isDisabled, theme }) =>
    isDisabled &&
    `
    &:hover {
      background: ${theme.colors.backgroundTertiary} !important;
    }
    &:active {
      background: ${theme.colors.backgroundTertiary} !important;
    }
  `}
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  gap: 8px;
`;

const ActionButton = styled(Button)`
  flex: 1;
`;

// Стили для range режима
const RangeContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['showSeconds'].includes(prop),
})<{ showSeconds?: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: ${({ showSeconds }) => (showSeconds ? '800px' : '600px')};
  max-width: ${({ showSeconds }) => (showSeconds ? '800px' : '600px')};
`;

const RangePickersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 16px;
`;

const RangePickerContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop),
})<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid
    ${({ theme, isActive }) =>
      isActive
        ? (theme.buttons?.variants?.primary?.background ?? theme.colors.primary)
        : theme.colors.borderSecondary};
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  overflow: hidden;
  background: ${({ theme, isActive }) =>
    isActive ? theme.colors.backgroundSecondary : theme.colors.backgroundTertiary};
  transition: ${TransitionHandler()};
  cursor: pointer;
  box-shadow: none;
`;

const RangePickerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundTertiary};
`;

const RangePickerTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const _RangeTimeDisplay = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  padding: 8px;
  background: ${({ theme }) => theme.colors.backgroundTertiary};
  border-radius: 4px;
  margin: 8px 16px;
`;

const RangeFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  gap: 8px;
  background: ${({ theme }) => theme.colors.backgroundTertiary};
`;

// Компоненты для сегментированного отображения времени
const TimeSegmentsContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['textAlign'].includes(prop),
})<{
  size?: Size;
  textAlign?: 'left' | 'center' | 'right';
}>`
  display: flex;
  align-items: center;
  justify-content: ${({ textAlign }) => {
    switch (textAlign) {
      case 'left':
        return 'flex-start';
      case 'right':
        return 'flex-end';
      case 'center':
      default:
        return 'center';
    }
  }};
  gap: 4px;
  font-family: ${({ theme }) => theme.fonts.monospace};
  font-size: ${({ size, theme }) => {
    switch (size) {
      case Size.SM:
        return theme.fontSizes.sm;
      case Size.LG:
        return theme.fontSizes.lg;
      default:
        return theme.fontSizes.base;
    }
  }};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  user-select: none;
  width: 100%;
`;

const TimeSegment = styled.span.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop),
})<{
  isActive: boolean;
  size?: Size;
  disabled?: boolean;
}>`
  display: inline-block;
  padding: 2px 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  background-color: ${({ isActive, theme }) =>
    isActive ? `${theme.colors.primary}20` : 'transparent'};
  color: ${({ isActive, theme, disabled }) =>
    disabled ? theme.colors.textSecondary : isActive ? theme.colors.primary : theme.colors.text};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  min-width: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '20px';
      case Size.LG:
        return '28px';
      default:
        return '24px';
    }
  }};
  width: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '20px';
      case Size.LG:
        return '28px';
      default:
        return '24px';
    }
  }};

  &:hover {
    background-color: ${({ disabled, theme }) =>
      disabled ? 'transparent' : `${theme.colors.primary}10`};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 1px;
  }
`;

const TimeSeparator = styled.span<{ size?: Size }>`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ size, theme }) => {
    switch (size) {
      case Size.SM:
        return theme.fontSizes.sm;
      case Size.LG:
        return theme.fontSizes.lg;
      default:
        return theme.fontSizes.base;
    }
  }};
`;

const RangeTimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RangeTimeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RangeTimeLabel = styled.span<{ size?: Size }>`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const RangeTimeSeparator = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Стилизованный input для обычного режима ввода времени
const RegularTimeInput = styled.input.withConfig({
  shouldForwardProp: (prop) => !['textAlign', 'hasIcon', 'size'].includes(prop),
})<{
  size?: Size;
  hasIcon?: boolean;
  textAlign?: 'left' | 'center' | 'right';
}>`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
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
  line-height: 1.4;
  padding-left: ${({ hasIcon }) => (hasIcon ? '8px' : '0')};
  text-align: ${({ textAlign }) => textAlign || 'left'};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

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
