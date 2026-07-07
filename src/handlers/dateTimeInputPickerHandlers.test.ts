import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import {
  buildDateTimePickerDraftValue,
  parseDateTimePickerDraftValue,
  resolveDateTimePickerDraft,
} from './dateTimeInputPickerHandlers';
import { DEFAULT_DATETIME_FORMAT } from './dateTimeHandlers';

dayjs.extend(customParseFormat);

describe('dateTimeInputPickerHandlers', () => {
  it('modifyPickerValue может подменить конец диапазона (+2 часа)', () => {
    const startDateTime = dayjs('06.07.2026 09:00', DEFAULT_DATETIME_FORMAT).toDate();
    const endDateTime = dayjs('06.07.2026 18:00', DEFAULT_DATETIME_FORMAT).toDate();

    const resolvedDates = resolveDateTimePickerDraft({
      draftDates: {
        selectedDateTime: null,
        rangeStart: startDateTime,
        rangeEnd: endDateTime,
      },
      range: true,
      format: DEFAULT_DATETIME_FORMAT,
      phase: 'pick',
      modifyPickerValue: (draft) => {
        if (typeof draft !== 'object' || !draft.start) {
          return draft;
        }

        const parsedStart = dayjs(draft.start, DEFAULT_DATETIME_FORMAT, true);
        if (!parsedStart.isValid()) {
          return draft;
        }

        const autoEnd = parsedStart.add(2, 'hour');

        return {
          start: draft.start,
          end: autoEnd.format(DEFAULT_DATETIME_FORMAT),
        };
      },
    });

    expect(resolvedDates.rangeStart?.getHours()).toBe(9);
    expect(resolvedDates.rangeEnd?.getHours()).toBe(11);
  });

  it('buildDateTimePickerDraftValue и parseDateTimePickerDraftValue симметричны для диапазона', () => {
    const draftDates = {
      selectedDateTime: null,
      rangeStart: dayjs('01.07.2026 09:00', DEFAULT_DATETIME_FORMAT).toDate(),
      rangeEnd: dayjs('06.07.2026 18:00', DEFAULT_DATETIME_FORMAT).toDate(),
    };

    const draftValue = buildDateTimePickerDraftValue(
      draftDates,
      true,
      DEFAULT_DATETIME_FORMAT,
    );
    const parsedDates = parseDateTimePickerDraftValue(draftValue, true);

    expect(parsedDates.rangeStart?.getDate()).toBe(1);
    expect(parsedDates.rangeEnd?.getDate()).toBe(6);
  });
});
