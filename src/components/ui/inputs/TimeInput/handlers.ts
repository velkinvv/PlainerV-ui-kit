/**
 * Парсинг и форматирование времени для `TimeInput`; barrel `@/handlers` реэкспортирует этот модуль.
 */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import localeData from 'dayjs/plugin/localeData.js';
import isBetween from 'dayjs/plugin/isBetween.js';
import 'dayjs/locale/ru.js';

// Расширяем dayjs плагинами
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(localeData);
dayjs.extend(isBetween);

// Устанавливаем русскую локаль
dayjs.locale('ru');

/**
 * Хендлеры для работы со временем
 */

export interface TimeParseResult {
  time: Date | null;
  isValid: boolean;
  error?: string;
}

/**
 * Проверяет, является ли время валидным
 */
export const isValidTime = (time: Date): boolean => {
  return !isNaN(time.getTime());
};

/**
 * Парсит время из различных форматов
 * Поддерживаемые форматы:
 * - HH:mm, HH:mm:ss, HH:mm:ss.SSS
 * - HH.mm, HH.mm.ss, HH.mm.ss.SSS
 * - HH/mm, HH/mm/ss, HH/mm/ss/SSS
 * - ISO строки (с датой и временем)
 * - Timestamp (число или строка)
 * - Объект Date
 */
export const parseTime = (input: string | number | Date | null | undefined): TimeParseResult => {
  // Обработка null/undefined
  if (input === null || input === undefined) {
    return { time: null, isValid: false, error: 'Пустое значение' };
  }

  // Если это уже Date объект
  if (input instanceof Date) {
    const dayjsTime = dayjs(input);
    return {
      time: dayjsTime.isValid() ? input : null,
      isValid: dayjsTime.isValid(),
      error: dayjsTime.isValid() ? undefined : 'Некорректное время',
    };
  }

  // Если это число (timestamp)
  if (typeof input === 'number') {
    const dayjsTime = dayjs(input);
    return {
      time: dayjsTime.isValid() ? dayjsTime.toDate() : null,
      isValid: dayjsTime.isValid(),
      error: dayjsTime.isValid() ? undefined : 'Некорректный timestamp',
    };
  }

  // Если это строка
  if (typeof input === 'string') {
    const trimmedInput = input.trim();
    if (!trimmedInput) {
      return { time: null, isValid: false, error: 'Пустая строка' };
    }

    // 1. Сначала парсим кастомные форматы времени
    const customTime = parseCustomTimeFormats(trimmedInput);
    if (customTime && customTime.isValid()) {
      return {
        time: customTime.toDate(),
        isValid: true,
      };
    }

    // 2. Пробуем парсить как ISO строку (включая с датой и временем)
    let dayjsTime = dayjs(trimmedInput);
    if (dayjsTime.isValid()) {
      return {
        time: dayjsTime.toDate(),
        isValid: true,
      };
    }

    // 3. Пробуем парсить как timestamp (строка)
    const timestamp = parseInt(trimmedInput, 10);
    if (!isNaN(timestamp)) {
      dayjsTime = dayjs(timestamp);
      if (dayjsTime.isValid()) {
        return {
          time: dayjsTime.toDate(),
          isValid: true,
        };
      }
    }

    return {
      time: null,
      isValid: false,
      error: 'Неподдерживаемый формат времени',
    };
  }

  return {
    time: null,
    isValid: false,
    error: 'Неподдерживаемый тип данных',
  };
};

/**
 * Парсит кастомные форматы времени с помощью dayjs
 */
const parseCustomTimeFormats = (input: string): dayjs.Dayjs | null => {
  // Поддерживаемые форматы
  const formats = [
    'HH:mm',
    'HH:mm:ss',
    'HH:mm:ss.SSS',
    'HH.mm',
    'HH.mm.ss',
    'HH.mm.ss.SSS',
    'HH/mm',
    'HH/mm/ss',
    'HH/mm/ss/SSS',
  ];

  for (const format of formats) {
    const parsed = dayjs(input, format, true); // strict mode
    if (parsed.isValid()) {
      return parsed;
    }
  }

  return null;
};

/**
 * Форматирует время в строку для отображения
 */
export const formatTimeForDisplay = (time: Date | null, format: string = 'HH:mm'): string => {
  if (!time) {
    return '';
  }

  const dayjsTime = dayjs(time);
  if (!dayjsTime.isValid()) {
    return '';
  }

  return dayjsTime.format(format);
};

/**
 * Парсит диапазон времени из строки формата "HH:mm — HH:mm"
 */
export const parseTimeRange = (input: string): { start: Date | null; end: Date | null } => {
  const rangeSeparator = '—';
  const parts = input.split(rangeSeparator);

  if (parts.length !== 2) {
    return { start: null, end: null };
  }

  const startResult = parseTime(parts[0].trim());
  const endResult = parseTime(parts[1].trim());

  return {
    start: startResult.isValid ? startResult.time : null,
    end: endResult.isValid ? endResult.time : null,
  };
};

/**
 * Преобразует время в ISO строку (только время, без даты)
 */
export const toISOTimeString = (time: Date | null, format: string = 'HH:mm:ss'): string => {
  if (!time) {
    return '';
  }

  const dayjsTime = dayjs(time);
  if (!dayjsTime.isValid()) {
    return '';
  }

  return dayjsTime.format(format);
};

/**
 * Получает текущее время
 */
export const getCurrentTime = (): Date => {
  return dayjs().toDate();
};

/**
 * Проверяет, является ли время текущим (с точностью до минуты)
 */
export const isCurrentTime = (time: Date): boolean => {
  return dayjs(time).isSame(dayjs(), 'minute');
};

/**
 * Получает часы для отображения в селекторе
 */
export const getHours = (): number[] => {
  return Array.from({ length: 24 }, (_, i) => i);
};

/**
 * Получает минуты для отображения в селекторе
 */
export const getMinutes = (step: number = 1): number[] => {
  return Array.from({ length: Math.floor(60 / step) }, (_, i) => i * step);
};

/**
 * Получает секунды для отображения в селекторе
 */
export const getSeconds = (step: number = 1): number[] => {
  return Array.from({ length: Math.floor(60 / step) }, (_, i) => i * step);
};

/**
 * Проверяет, находится ли время в диапазоне
 */
export const isInTimeRange = (time: Date, start: Date, end: Date): boolean => {
  const dayjsTime = dayjs(time);
  const dayjsStart = dayjs(start);
  const dayjsEnd = dayjs(end);

  return dayjsTime.isBetween(dayjsStart, dayjsEnd, 'minute', '[]'); // включая границы
};

/**
 * Проверяет, является ли время началом диапазона
 */
export const isTimeRangeStart = (time: Date, start: Date): boolean => {
  return dayjs(time).isSame(dayjs(start), 'minute');
};

/**
 * Проверяет, является ли время концом диапазона
 */
export const isTimeRangeEnd = (time: Date, end: Date): boolean => {
  return dayjs(time).isSame(dayjs(end), 'minute');
};

/**
 * Создает время из часов и минут
 */
export const createTime = (hours: number, minutes: number, seconds: number = 0): Date => {
  return dayjs().hour(hours).minute(minutes).second(seconds).millisecond(0).toDate();
};

/**
 * Получает часы из времени
 */
export const getHoursFromTime = (time: Date): number => {
  return dayjs(time).hour();
};

/**
 * Получает минуты из времени
 */
export const getMinutesFromTime = (time: Date): number => {
  return dayjs(time).minute();
};

/**
 * Получает секунды из времени
 */
export const getSecondsFromTime = (time: Date): number => {
  return dayjs(time).second();
};

/**
 * Форматирует часы для отображения (с ведущим нулем)
 */
export const formatHours = (hours: number): string => {
  return hours.toString().padStart(2, '0');
};

/**
 * Форматирует минуты для отображения (с ведущим нулем)
 */
export const formatMinutes = (minutes: number): string => {
  return minutes.toString().padStart(2, '0');
};

/**
 * Форматирует секунды для отображения (с ведущим нулем)
 */
export const formatSeconds = (seconds: number): string => {
  return seconds.toString().padStart(2, '0');
};
