import {
  DATA_GRID_RESET_FILTERS_CONFIRM_DEFAULTS,
  resolveDataGridResetFiltersConfirmTexts,
} from './dataGridResetFiltersConfirmHandlers';

describe('resolveDataGridResetFiltersConfirmTexts', () => {
  it('возвращает значения по умолчанию без overrides', () => {
    expect(resolveDataGridResetFiltersConfirmTexts()).toEqual(
      DATA_GRID_RESET_FILTERS_CONFIRM_DEFAULTS,
    );
  });

  it('мержит частичные overrides', () => {
    expect(
      resolveDataGridResetFiltersConfirmTexts({
        title: 'Сброс?',
        confirmLabel: 'Да',
      }),
    ).toEqual({
      ...DATA_GRID_RESET_FILTERS_CONFIRM_DEFAULTS,
      title: 'Сброс?',
      confirmLabel: 'Да',
    });
  });
});
