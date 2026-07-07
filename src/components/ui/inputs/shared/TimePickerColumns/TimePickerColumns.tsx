import React, { useCallback } from 'react';
import {
  createTime,
  formatHours,
  formatMinutes,
  formatSeconds,
  formatTimeForDisplay,
  getHours,
  getHoursFromTime,
  getMinutes,
  getMinutesFromTime,
  getSeconds,
  getSecondsFromTime,
  isCurrentTime,
} from '../../TimeInput/handlers';
import {
  TimeColumn,
  TimeColumnContent,
  TimeColumnLabel,
  TimeOption,
  TimePickerGrid,
} from '../../TimeInput/TimeInput.style';
import type { TimePickerColumnsProps } from './TimePickerColumns.types';

/**
 * Сетка выбора времени: колонки часов, минут и опционально секунд.
 * Переиспользуется в `TimeInput` и `DateTimeInput`.
 */
export const TimePickerColumns: React.FC<TimePickerColumnsProps> = ({
  selectedTime,
  onTimePartChange,
  showSeconds = false,
  minuteStep = 1,
  secondStep = 1,
  disabledHours = [],
  disabledMinutes = [],
  disabledSeconds = [],
  disabledTimes = [],
  timeFormat = 'HH:mm',
}) => {
  const hours = getHours();
  const minutes = getMinutes(minuteStep);
  const seconds = showSeconds ? getSeconds(secondStep) : [];

  const isHourDisabled = useCallback(
    (hour: number, currentTime: Date): boolean => {
      if (disabledHours.includes(hour)) {
        return true;
      }

      const testTime = createTime(
        hour,
        getMinutesFromTime(currentTime),
        getSecondsFromTime(currentTime),
      );
      const timeString = formatTimeForDisplay(testTime, timeFormat);
      return disabledTimes.includes(timeString);
    },
    [disabledHours, disabledTimes, timeFormat],
  );

  const isMinuteDisabled = useCallback(
    (minute: number, currentTime: Date): boolean => {
      if (disabledMinutes.includes(minute)) {
        return true;
      }

      const testTime = createTime(
        getHoursFromTime(currentTime),
        minute,
        getSecondsFromTime(currentTime),
      );
      const timeString = formatTimeForDisplay(testTime, timeFormat);
      return disabledTimes.includes(timeString);
    },
    [disabledMinutes, disabledTimes, timeFormat],
  );

  const isSecondDisabled = useCallback(
    (second: number, currentTime: Date): boolean => {
      if (disabledSeconds.includes(second)) {
        return true;
      }

      const testTime = createTime(
        getHoursFromTime(currentTime),
        getMinutesFromTime(currentTime),
        second,
      );
      const timeString = formatTimeForDisplay(testTime, timeFormat);
      return disabledTimes.includes(timeString);
    },
    [disabledSeconds, disabledTimes, timeFormat],
  );

  const handleTimePartClick = (
    partType: 'hour' | 'minute' | 'second',
    partValue: number,
  ) => {
    let nextTime: Date;

    if (partType === 'hour') {
      if (isHourDisabled(partValue, selectedTime)) {
        return;
      }
      nextTime = createTime(
        partValue,
        getMinutesFromTime(selectedTime),
        getSecondsFromTime(selectedTime),
      );
    } else if (partType === 'minute') {
      if (isMinuteDisabled(partValue, selectedTime)) {
        return;
      }
      nextTime = createTime(
        getHoursFromTime(selectedTime),
        partValue,
        getSecondsFromTime(selectedTime),
      );
    } else {
      if (isSecondDisabled(partValue, selectedTime)) {
        return;
      }
      nextTime = createTime(
        getHoursFromTime(selectedTime),
        getMinutesFromTime(selectedTime),
        partValue,
      );
    }

    onTimePartChange(nextTime);
  };

  return (
    <TimePickerGrid>
      <TimeColumn>
        <TimeColumnLabel>Часы</TimeColumnLabel>
        <TimeColumnContent>
          {hours.map((hour) => {
            const optionTime = createTime(
              hour,
              getMinutesFromTime(selectedTime),
              getSecondsFromTime(selectedTime),
            );
            const isSelected =
              getHoursFromTime(selectedTime) === hour && !isHourDisabled(hour, selectedTime);

            return (
              <TimeOption
                key={hour}
                isSelected={isSelected}
                isCurrent={isCurrentTime(optionTime)}
                isDisabled={isHourDisabled(hour, selectedTime)}
                onClick={() => handleTimePartClick('hour', hour)}
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
            const optionTime = createTime(
              getHoursFromTime(selectedTime),
              minute,
              getSecondsFromTime(selectedTime),
            );
            const isSelected =
              getMinutesFromTime(selectedTime) === minute &&
              !isMinuteDisabled(minute, selectedTime);

            return (
              <TimeOption
                key={minute}
                isSelected={isSelected}
                isCurrent={isCurrentTime(optionTime)}
                isDisabled={isMinuteDisabled(minute, selectedTime)}
                onClick={() => handleTimePartClick('minute', minute)}
              >
                {formatMinutes(minute)}
              </TimeOption>
            );
          })}
        </TimeColumnContent>
      </TimeColumn>

      {showSeconds ? (
        <TimeColumn>
          <TimeColumnLabel>Секунды</TimeColumnLabel>
          <TimeColumnContent>
            {seconds.map((second) => {
              const optionTime = createTime(
                getHoursFromTime(selectedTime),
                getMinutesFromTime(selectedTime),
                second,
              );
              const isSelected =
                getSecondsFromTime(selectedTime) === second &&
                !isSecondDisabled(second, selectedTime);

              return (
                <TimeOption
                  key={second}
                  isSelected={isSelected}
                  isCurrent={isCurrentTime(optionTime)}
                  isDisabled={isSecondDisabled(second, selectedTime)}
                  onClick={() => handleTimePartClick('second', second)}
                >
                  {formatSeconds(second)}
                </TimeOption>
              );
            })}
          </TimeColumnContent>
        </TimeColumn>
      ) : null}
    </TimePickerGrid>
  );
};

TimePickerColumns.displayName = 'TimePickerColumns';
