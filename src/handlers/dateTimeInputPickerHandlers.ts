import {
  parseDateTime,
  toISODateTimeString,
} from './dateTimeHandlers';
import type {
  DateTimePickerDraftContext,
  DateTimePickerDraftPhase,
  DateTimeRange,
} from '../types/ui';

export type { DateTimePickerDraftContext, DateTimePickerDraftPhase };

/** Черновик даты и времени внутри пикера */
export interface DateTimePickerDraftDates {
  /** Одиночное значение */
  selectedDateTime: Date | null;
  /** Начало диапазона */
  rangeStart: Date | null;
  /** Конец диапазона */
  rangeEnd: Date | null;
}

/**
 * Преобразует черновик пикера в значение API (`onChange` / колбэки).
 * @param draftDates — даты черновика
 * @param range — режим диапазона
 * @param format — формат поля
 */
export function buildDateTimePickerDraftValue(
  draftDates: DateTimePickerDraftDates,
  range: boolean,
  format: string,
): string | DateTimeRange {
  if (!range) {
    return toISODateTimeString(draftDates.selectedDateTime, format);
  }

  return {
    start: toISODateTimeString(draftDates.rangeStart, format),
    end: toISODateTimeString(draftDates.rangeEnd, format),
  };
}

/**
 * Парсит значение черновика обратно в даты пикера.
 * @param draft — строка или диапазон в формате `onChange`
 * @param range — режим диапазона
 */
export function parseDateTimePickerDraftValue(
  draft: string | DateTimeRange,
  range: boolean,
): DateTimePickerDraftDates {
  if (!range) {
    if (typeof draft !== 'string') {
      return { selectedDateTime: null, rangeStart: null, rangeEnd: null };
    }

    const parsedResult = parseDateTime(draft);
    return {
      selectedDateTime: parsedResult.isValid ? parsedResult.date : null,
      rangeStart: null,
      rangeEnd: null,
    };
  }

  if (typeof draft !== 'object') {
    return { selectedDateTime: null, rangeStart: null, rangeEnd: null };
  }

  const startResult = parseDateTime(draft.start);
  const endResult = parseDateTime(draft.end);

  return {
    selectedDateTime: null,
    rangeStart: startResult.isValid ? startResult.date : null,
    rangeEnd: endResult.isValid ? endResult.date : null,
  };
}

/**
 * Параметры {@link resolveDateTimePickerDraft}.
 */
export interface ResolveDateTimePickerDraftOptions {
  /** Черновик до модификации */
  draftDates: DateTimePickerDraftDates;
  /** Режим диапазона */
  range: boolean;
  /** Формат поля */
  format: string;
  /** Фаза изменения */
  phase: DateTimePickerDraftPhase;
  /** Модификатор черновика */
  modifyPickerValue?: (
    draft: string | DateTimeRange,
    context: DateTimePickerDraftContext,
  ) => string | DateTimeRange | undefined;
  /** Уведомление о черновике без применения в `onChange` поля */
  onPickerChange?: (draft: string | DateTimeRange, context: DateTimePickerDraftContext) => void;
}

/**
 * Применяет модификатор и уведомляет `onPickerChange`; возвращает итоговые даты пикера.
 * @param options — черновик, колбэки и контекст
 */
export function resolveDateTimePickerDraft(
  options: ResolveDateTimePickerDraftOptions,
): DateTimePickerDraftDates {
  const context: DateTimePickerDraftContext = {
    phase: options.phase,
    range: options.range,
    format: options.format,
  };

  let draftValue = buildDateTimePickerDraftValue(
    options.draftDates,
    options.range,
    options.format,
  );

  if (options.modifyPickerValue) {
    const modifiedDraft = options.modifyPickerValue(draftValue, context);
    if (modifiedDraft !== undefined) {
      draftValue = modifiedDraft;
    }
  }

  options.onPickerChange?.(draftValue, context);

  return parseDateTimePickerDraftValue(draftValue, options.range);
}

/**
 * Синхронизирует черновик пикера из контролируемого `value`.
 * @param value — значение поля
 * @param range — режим диапазона
 */
export function dateTimePickerDraftDatesFromValue(
  value: string | DateTimeRange | undefined,
  range: boolean,
): DateTimePickerDraftDates {
  if (!range) {
    if (typeof value === 'string' && value) {
      const parsedResult = parseDateTime(value);
      return {
        selectedDateTime: parsedResult.isValid ? parsedResult.date : null,
        rangeStart: null,
        rangeEnd: null,
      };
    }

    return { selectedDateTime: null, rangeStart: null, rangeEnd: null };
  }

  if (typeof value === 'object' && value) {
    const startResult = parseDateTime(value.start);
    const endResult = parseDateTime(value.end);

    return {
      selectedDateTime: null,
      rangeStart: startResult.isValid ? startResult.date : null,
      rangeEnd: endResult.isValid ? endResult.date : null,
    };
  }

  return { selectedDateTime: null, rangeStart: null, rangeEnd: null };
}
