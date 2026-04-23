import { Size } from '../../../types/sizes';
import { getTagMetrics } from './handlers';

describe('Tag handlers', () => {
  it('getTagMetrics: SM по умолчанию', () => {
    const m = getTagMetrics();
    expect(m.fontSize).toBe('12px');
  });

  it('getTagMetrics: MD', () => {
    expect(getTagMetrics(Size.MD).minHeight).toBe('28px');
  });
});
