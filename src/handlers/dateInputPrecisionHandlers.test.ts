import { parseDate } from './dateHandlers';
import {
  buildYearList,
  doesFormatUseNamedMonth,
  formatDateByPrecision,
  formatDateInputByPrecision,
  getImplicitYearForMonthPrecision,
  isCompleteDateStringByPrecision,
  isMonthPeriodDisabled,
  isYearPeriodDisabled,
  parseMonthInputValue,
  resolveDateInputFormat,
} from './dateInputPrecisionHandlers';

describe('dateInputPrecisionHandlers', () => {
  describe('resolveDateInputFormat', () => {
    it('оставляет переданный format без изменений', () => {
      expect(resolveDateInputFormat('MMMM YYYY', 'monthYear')).toBe('MMMM YYYY');
    });

    it('без format даёт цифровые шаблоны', () => {
      expect(resolveDateInputFormat(undefined, 'day')).toBe('DD.MM.YYYY');
      expect(resolveDateInputFormat(undefined, 'month')).toBe('MM.YYYY');
      expect(resolveDateInputFormat(undefined, 'monthYear')).toBe('MM.YYYY');
      expect(resolveDateInputFormat(undefined, 'year')).toBe('YYYY');
      expect(resolveDateInputFormat(undefined, 'week')).toBe('W.MM.YYYY');
    });
  });

  describe('formatDateByPrecision', () => {
    const augustDate = new Date(2026, 7, 15);

    it('для дня отдаёт YYYY-MM-DD', () => {
      expect(formatDateByPrecision(augustDate, 'day')).toBe('2026-08-15');
    });

    it('для месяца и месяца с годом отдаёт YYYY-MM', () => {
      expect(formatDateByPrecision(augustDate, 'month')).toBe('2026-08');
      expect(formatDateByPrecision(augustDate, 'monthYear')).toBe('2026-08');
    });

    it('для недели отдаёт YYYY-MM-Wn', () => {
      expect(formatDateByPrecision(augustDate, 'week')).toBe('2026-08-W3');
    });

    it('для пустой даты отдаёт пустую строку', () => {
      expect(formatDateByPrecision(null, 'month')).toBe('');
    });
  });

  describe('doesFormatUseNamedMonth', () => {
    it('отличает числовой месяц от названия', () => {
      expect(doesFormatUseNamedMonth('MM.YYYY')).toBe(false);
      expect(doesFormatUseNamedMonth('MMMM YYYY')).toBe(true);
      expect(doesFormatUseNamedMonth('MMM YYYY')).toBe(true);
    });
  });

  describe('getImplicitYearForMonthPrecision', () => {
    it('берёт год из выбранной даты, иначе из опорной', () => {
      expect(getImplicitYearForMonthPrecision(new Date(2024, 5, 1), new Date(2026, 0, 1))).toBe(
        2024,
      );
      expect(getImplicitYearForMonthPrecision(null, new Date(2026, 0, 1))).toBe(2026);
    });
  });

  describe('isMonthPeriodDisabled', () => {
    it('не отключает месяц, если minDate внутри этого месяца', () => {
      const isDisabled = isMonthPeriodDisabled(2026, 7, {
        minDate: new Date(2026, 7, 15),
        isDateDisabled: (date) => date < new Date(2026, 7, 15),
      });

      expect(isDisabled).toBe(false);
    });

    it('отключает месяц целиком до minDate', () => {
      const isDisabled = isMonthPeriodDisabled(2026, 6, {
        minDate: new Date(2026, 7, 15),
      });

      expect(isDisabled).toBe(true);
    });

    it('отключает месяц из disabledMonths через isDateDisabled', () => {
      const isDisabled = isMonthPeriodDisabled(2026, 7, {
        isDateDisabled: (date) => date.getMonth() === 7,
      });

      expect(isDisabled).toBe(true);
    });
  });

  describe('isYearPeriodDisabled', () => {
    it('не отключает год, если minDate внутри года', () => {
      expect(
        isYearPeriodDisabled(2026, {
          minDate: new Date(2026, 5, 1),
        }),
      ).toBe(false);
    });

    it('отключает год целиком до minDate', () => {
      expect(
        isYearPeriodDisabled(2025, {
          minDate: new Date(2026, 0, 1),
        }),
      ).toBe(true);
    });
  });

  describe('buildYearList', () => {
    it('строит список от minDate до maxDate', () => {
      expect(
        buildYearList(2026, {
          minDate: new Date(2024, 0, 1),
          maxDate: new Date(2026, 11, 31),
        }),
      ).toEqual([2024, 2025, 2026]);
    });
  });

  describe('formatDateInputByPrecision', () => {
    it('для месяца с цифрами ставит точку после двух знаков', () => {
      expect(formatDateInputByPrecision('082026', 'monthYear', 'MM.YYYY')).toBe('08.2026');
    });

    it('для года оставляет четыре цифры', () => {
      expect(formatDateInputByPrecision('20261', 'year', 'YYYY')).toBe('2026');
    });

    it('для названий месяца не вырезает буквы', () => {
      expect(formatDateInputByPrecision('август 2026', 'monthYear', 'MMMM YYYY')).toBe(
        'август 2026',
      );
    });
  });

  describe('isCompleteDateStringByPrecision', () => {
    it('для дня требует полную дату', () => {
      expect(isCompleteDateStringByPrecision('08.2026', 'day', 'DD.MM.YYYY')).toBe(false);
      expect(isCompleteDateStringByPrecision('15.08.2026', 'day', 'DD.MM.YYYY')).toBe(true);
    });

    it('для месяца с годом принимает MM.YYYY и YYYY-MM', () => {
      expect(isCompleteDateStringByPrecision('08.2026', 'monthYear', 'MM.YYYY')).toBe(true);
      expect(isCompleteDateStringByPrecision('2026-08', 'monthYear', 'MM.YYYY')).toBe(true);
    });

    it('для года принимает четыре цифры', () => {
      expect(isCompleteDateStringByPrecision('2026', 'year', 'YYYY')).toBe(true);
    });

    it('для названного месяца принимает «август 2026»', () => {
      expect(isCompleteDateStringByPrecision('август 2026', 'monthYear', 'MMMM YYYY')).toBe(true);
      expect(isCompleteDateStringByPrecision('август  2026', 'monthYear', 'MMMM YYYY')).toBe(true);
    });

    it('не считает полным название месяца без пробела перед годом', () => {
      expect(isCompleteDateStringByPrecision('август2026', 'monthYear', 'MMMM YYYY')).toBe(false);
    });
  });

  describe('parseMonthInputValue', () => {
    it('понимает номер и русское название', () => {
      expect(parseMonthInputValue('08')).toBe(7);
      expect(parseMonthInputValue('август')).toBe(7);
      expect(parseMonthInputValue('Авг')).toBe(7);
    });
  });
});

describe('parseDate — неполные даты', () => {
  it('парсит YYYY-MM', () => {
    const result = parseDate('2026-08');
    expect(result.isValid).toBe(true);
    expect(result.date?.getFullYear()).toBe(2026);
    expect(result.date?.getMonth()).toBe(7);
  });

  it('парсит YYYY', () => {
    const result = parseDate('2026');
    expect(result.isValid).toBe(true);
    expect(result.date?.getFullYear()).toBe(2026);
  });

  it('парсит MM.YYYY', () => {
    const result = parseDate('08.2026');
    expect(result.isValid).toBe(true);
    expect(result.date?.getMonth()).toBe(7);
    expect(result.date?.getFullYear()).toBe(2026);
  });

  it('парсит русское название месяца с годом', () => {
    const result = parseDate('август 2026');
    expect(result.isValid).toBe(true);
    expect(result.date?.getMonth()).toBe(7);
    expect(result.date?.getFullYear()).toBe(2026);
  });

  it('не ломает полную дату DD.MM.YYYY', () => {
    const result = parseDate('15.08.2026');
    expect(result.isValid).toBe(true);
    expect(result.date?.getDate()).toBe(15);
    expect(result.date?.getMonth()).toBe(7);
  });
});
