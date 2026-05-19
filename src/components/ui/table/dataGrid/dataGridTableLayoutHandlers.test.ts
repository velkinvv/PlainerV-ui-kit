import { describe, expect, it } from 'vitest';
import { resolveDataGridTableLayout } from './dataGridTableLayoutHandlers';

describe('resolveDataGridTableLayout', () => {
  it('возвращает fixed при горизонтальном скролле', () => {
    expect(resolveDataGridTableLayout(true, false)).toBe('fixed');
  });

  it('возвращает fixed при ресайзе колонок', () => {
    expect(resolveDataGridTableLayout(false, true)).toBe('fixed');
  });

  it('возвращает undefined без скролла и ресайза', () => {
    expect(resolveDataGridTableLayout(false, false)).toBeUndefined();
  });
});
