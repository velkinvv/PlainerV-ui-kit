import { parseDate, toISODateString } from './dateHandlers';
import {
  buildDatePickerDraftValue,
  computeRangeDatesAfterDayClick,
  parseDatePickerDraftValue,
  resolveDatePickerDraft,
} from './dateInputPickerHandlers';

describe('dateInputPickerHandlers', () => {
  it('computeRangeDatesAfterDayClick начинает новый диапазон', () => {
    const clickedDate = new Date(2026, 6, 10);
    const result = computeRangeDatesAfterDayClick(clickedDate, null, null);

    expect(result.rangeStart?.getDate()).toBe(10);
    expect(result.rangeEnd).toBeNull();
  });

  it('modifyPickerValue может подменить конец диапазона', () => {
    const startDate = new Date(2026, 6, 1);
    const endDate = new Date(2026, 6, 20);

    const resolvedDates = resolveDatePickerDraft({
      draftDates: {
        selectedDate: null,
        rangeStart: startDate,
        rangeEnd: endDate,
      },
      range: true,
      format: 'DD.MM.YYYY',
      phase: 'pick',
      modifyPickerValue: (draft) => {
        if (typeof draft !== 'object' || !draft.start) {
          return draft;
        }

        const parsedStart = parseDate(draft.start);
        if (!parsedStart.isValid || !parsedStart.date) {
          return draft;
        }

        const autoEnd = new Date(parsedStart.date);
        autoEnd.setDate(autoEnd.getDate() + 7);

        return {
          start: draft.start,
          end: toISODateString(autoEnd),
        };
      },
    });

    expect(resolvedDates.rangeStart?.getDate()).toBe(1);
    expect(resolvedDates.rangeEnd?.getDate()).toBe(8);
  });

  it('buildDatePickerDraftValue и parseDatePickerDraftValue симметричны для диапазона', () => {
    const draftDates = {
      selectedDate: null,
      rangeStart: new Date(2026, 0, 15),
      rangeEnd: new Date(2026, 0, 20),
    };

    const draftValue = buildDatePickerDraftValue(draftDates, true);
    const parsedDates = parseDatePickerDraftValue(draftValue, true);

    expect(parsedDates.rangeStart?.getDate()).toBe(15);
    expect(parsedDates.rangeEnd?.getDate()).toBe(20);
  });
});
