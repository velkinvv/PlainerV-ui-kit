import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import { DEFAULT_DATETIME_FORMAT } from '../../../../handlers/dateTimeHandlers';
import type { DateTimePickerDraftContext, DateTimeRange } from '../../../../types/ui';

dayjs.extend(customParseFormat);

/**
 * Модификатор черновика: конец диапазона = начало + указанное число часов.
 * @param hourOffset — смещение в часах от начала
 * @param dateTimeFormat — формат строки (по умолчанию `DD.MM.YYYY HH:mm`)
 */
export function createDateTimeRangeEndPlusHoursModifier(
  hourOffset: number,
  dateTimeFormat: string = DEFAULT_DATETIME_FORMAT,
) {
  return (
    draft: string | DateTimeRange,
    _context?: DateTimePickerDraftContext,
  ): DateTimeRange | undefined => {
    if (typeof draft !== 'object' || !draft.start) {
      return undefined;
    }

    const parsedStart = dayjs(draft.start, dateTimeFormat, true);
    if (!parsedStart.isValid()) {
      return undefined;
    }

    const autoEnd = parsedStart.add(hourOffset, 'hour');

    return {
      start: draft.start,
      end: autoEnd.format(dateTimeFormat),
    };
  };
}

/**
 * Форматирует черновик пикера для отображения в сторис.
 * @param draft — значение из `onPickerChange`
 * @param range — режим диапазона
 */
export function formatDateTimePickerDraftForDisplay(
  draft: string | DateTimeRange,
  range: boolean,
): string {
  if (!range) {
    return typeof draft === 'string' && draft ? draft : '—';
  }

  if (typeof draft !== 'object') {
    return '—';
  }

  const startLabel = draft.start || '—';
  const endLabel = draft.end || '—';

  return `${startLabel} → ${endLabel}`;
}
