import dayjs from 'dayjs';
import { parseDate, type DateParseResult } from './dateHandlers';
import {
  getHoursFromTime,
  getMinutesFromTime,
  getSecondsFromTime,
} from '../components/ui/inputs/TimeInput/handlers';

/** Формат даты и времени по умолчанию */
export const DEFAULT_DATETIME_FORMAT = 'DD.MM.YYYY HH:mm';

/** Формат даты и времени с секундами */
export const DEFAULT_DATETIME_FORMAT_WITH_SECONDS = 'DD.MM.YYYY HH:mm:ss';

/**
 * Парсит дату и время из строки, числа или объекта Date.
 * @param input - значение для разбора
 */
export const parseDateTime = (
  input: string | number | Date | null | undefined,
): DateParseResult => {
  return parseDate(input);
};

/**
 * Форматирует дату и время для отображения в поле.
 * @param date - дата со временем
 * @param format - шаблон dayjs (по умолчанию `DD.MM.YYYY HH:mm`)
 */
export const formatDateTimeForDisplay = (
  date: Date | null,
  format: string = DEFAULT_DATETIME_FORMAT,
): string => {
  if (!date) {
    return '';
  }

  const dayjsDate = dayjs(date);
  if (!dayjsDate.isValid()) {
    return '';
  }

  return dayjsDate.format(format);
};

/**
 * Преобразует дату и время в строку для `onChange`.
 * @param date - дата со временем
 * @param format - шаблон dayjs
 */
export const toISODateTimeString = (
  date: Date | null,
  format: string = DEFAULT_DATETIME_FORMAT,
): string => {
  if (!date) {
    return '';
  }

  const dayjsDate = dayjs(date);
  if (!dayjsDate.isValid()) {
    return '';
  }

  return dayjsDate.format(format);
};

/**
 * Объединяет дату из одного значения и время из другого.
 * @param datePart - источник календарной даты
 * @param timePart - источник часов, минут и секунд
 */
export const mergeDateAndTime = (datePart: Date, timePart: Date): Date => {
  return dayjs(datePart)
    .hour(getHoursFromTime(timePart))
    .minute(getMinutesFromTime(timePart))
    .second(getSecondsFromTime(timePart))
    .millisecond(0)
    .toDate();
};

/**
 * Устанавливает время в существующую дату.
 * @param baseDate - базовая дата
 * @param hours - часы
 * @param minutes - минуты
 * @param seconds - секунды
 */
export const applyTimeToDate = (
  baseDate: Date,
  hours: number,
  minutes: number,
  seconds: number = 0,
): Date => {
  return dayjs(baseDate).hour(hours).minute(minutes).second(seconds).millisecond(0).toDate();
};

/**
 * Парсит диапазон даты и времени из строки вида «начало — конец».
 * @param input - строка диапазона
 */
export const parseDateTimeRange = (input: string): { start: Date | null; end: Date | null } => {
  const rangeSeparator = '—';
  const parts = input.split(rangeSeparator);

  if (parts.length !== 2) {
    return { start: null, end: null };
  }

  const startResult = parseDateTime(parts[0].trim());
  const endResult = parseDateTime(parts[1].trim());

  return {
    start: startResult.isValid ? startResult.date : null,
    end: endResult.isValid ? endResult.date : null,
  };
};
