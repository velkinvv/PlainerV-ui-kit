import {
  getDataGridErrorMessage,
  resolveDataGridDataStatus,
  resolveDataGridLoadingDisplay,
  resolveDataGridSkeletonRowCount,
} from './dataGridDataStatusHandlers';

describe('dataGridDataStatusHandlers', () => {
  it('resolveDataGridDataStatus: явный dataStatus и устаревший isLoading', () => {
    expect(resolveDataGridDataStatus({ dataStatus: 'error' })).toBe('error');
    expect(resolveDataGridDataStatus({ isLoading: true })).toBe('loading');
    expect(resolveDataGridDataStatus({ dataStatus: 'ready', isLoading: true })).toBe('ready');
    expect(resolveDataGridDataStatus({})).toBe('ready');
  });

  it('resolveDataGridLoadingDisplay: skeleton с данными → overlay', () => {
    expect(
      resolveDataGridLoadingDisplay('skeleton', { isTableLoading: true, hasVisibleRows: true }),
    ).toBe('overlay');
    expect(
      resolveDataGridLoadingDisplay('skeleton', { isTableLoading: true, hasVisibleRows: false }),
    ).toBe('skeleton');
    expect(
      resolveDataGridLoadingDisplay('overlay', { isTableLoading: true, hasVisibleRows: false }),
    ).toBe('overlay');
  });

  it('resolveDataGridSkeletonRowCount учитывает пропсы и лимит', () => {
    expect(resolveDataGridSkeletonRowCount({ skeletonRowCount: 3 })).toBe(3);
    expect(resolveDataGridSkeletonRowCount({ paginationPageSize: 10 })).toBe(10);
    expect(resolveDataGridSkeletonRowCount({ skeletonRowCount: 100 })).toBe(50);
    expect(resolveDataGridSkeletonRowCount({})).toBe(8);
  });

  it('getDataGridErrorMessage извлекает текст из Error и строки', () => {
    expect(getDataGridErrorMessage(new Error('Сеть недоступна'), 'fallback')).toBe(
      'Сеть недоступна',
    );
    expect(getDataGridErrorMessage('Таймаут', 'fallback')).toBe('Таймаут');
    expect(getDataGridErrorMessage(null, 'fallback')).toBe('fallback');
  });
});
