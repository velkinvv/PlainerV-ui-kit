import { parseTime, toISOTimeString } from '../components/ui/inputs/TimeInput/handlers';
import type { TimePickerDraftContext, TimePickerDraftPhase, TimeRange } from '../types/ui';

export type { TimePickerDraftContext, TimePickerDraftPhase };

/** Черновик времени внутри пикера (объекты Date) */
export interface TimePickerDraftTimes {
  /** Одиночное время */
  selectedTime: Date | null;
  /** Начало диапазона */
  rangeStart: Date | null;
  /** Конец диапазона */
  rangeEnd: Date | null;
}

/**
 * Преобразует черновик пикера в значение API (`onChange` / колбэки).
 * @param draftTimes — время черновика
 * @param range — режим диапазона
 * @param format — формат строки времени
 */
export function buildTimePickerDraftValue(
  draftTimes: TimePickerDraftTimes,
  range: boolean,
  format: string,
): string | TimeRange {
  if (!range) {
    return toISOTimeString(draftTimes.selectedTime, format);
  }

  return {
    start: toISOTimeString(draftTimes.rangeStart, format),
    end: toISOTimeString(draftTimes.rangeEnd, format),
  };
}

/**
 * Парсит значение черновика обратно во время пикера.
 * @param draft — строка или диапазон в формате `onChange`
 * @param range — режим диапазона
 */
export function parseTimePickerDraftValue(
  draft: string | TimeRange,
  range: boolean,
): TimePickerDraftTimes {
  if (!range) {
    if (typeof draft !== 'string') {
      return { selectedTime: null, rangeStart: null, rangeEnd: null };
    }

    const parsedResult = parseTime(draft);
    return {
      selectedTime: parsedResult.isValid ? parsedResult.time : null,
      rangeStart: null,
      rangeEnd: null,
    };
  }

  if (typeof draft !== 'object') {
    return { selectedTime: null, rangeStart: null, rangeEnd: null };
  }

  const startResult = parseTime(draft.start);
  const endResult = parseTime(draft.end);

  return {
    selectedTime: null,
    rangeStart: startResult.isValid ? startResult.time : null,
    rangeEnd: endResult.isValid ? endResult.time : null,
  };
}

/**
 * Параметры {@link resolveTimePickerDraft}.
 */
export interface ResolveTimePickerDraftOptions {
  /** Черновик до модификации */
  draftTimes: TimePickerDraftTimes;
  /** Режим диапазона */
  range: boolean;
  /** Формат поля */
  format: string;
  /** Фаза изменения */
  phase: TimePickerDraftPhase;
  /** Модификатор черновика */
  modifyPickerValue?: (
    draft: string | TimeRange,
    context: TimePickerDraftContext,
  ) => string | TimeRange | undefined;
  /** Уведомление о черновике без применения в `onChange` поля */
  onPickerChange?: (draft: string | TimeRange, context: TimePickerDraftContext) => void;
}

/**
 * Применяет модификатор и уведомляет `onPickerChange`; возвращает итоговое время пикера.
 * @param options — черновик, колбэки и контекст
 */
export function resolveTimePickerDraft(options: ResolveTimePickerDraftOptions): TimePickerDraftTimes {
  const context: TimePickerDraftContext = {
    phase: options.phase,
    range: options.range,
    format: options.format,
  };

  let draftValue = buildTimePickerDraftValue(options.draftTimes, options.range, options.format);

  if (options.modifyPickerValue) {
    const modifiedDraft = options.modifyPickerValue(draftValue, context);
    if (modifiedDraft !== undefined) {
      draftValue = modifiedDraft;
    }
  }

  options.onPickerChange?.(draftValue, context);

  return parseTimePickerDraftValue(draftValue, options.range);
}

/**
 * Синхронизирует черновик пикера из контролируемого `value`.
 * @param value — значение поля
 * @param range — режим диапазона
 */
export function timePickerDraftTimesFromValue(
  value: string | TimeRange | undefined,
  range: boolean,
): TimePickerDraftTimes {
  if (!range) {
    if (typeof value === 'string' && value) {
      const parsedResult = parseTime(value);
      return {
        selectedTime: parsedResult.isValid ? parsedResult.time : null,
        rangeStart: null,
        rangeEnd: null,
      };
    }

    return { selectedTime: null, rangeStart: null, rangeEnd: null };
  }

  if (typeof value === 'object' && value) {
    const startResult = parseTime(value.start);
    const endResult = parseTime(value.end);

    return {
      selectedTime: null,
      rangeStart: startResult.isValid ? startResult.time : null,
      rangeEnd: endResult.isValid ? endResult.time : null,
    };
  }

  return { selectedTime: null, rangeStart: null, rangeEnd: null };
}
