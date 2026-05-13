import { Size } from '../../../types/sizes';
import { getTagMetrics, getTagSkeletonDefaultWidthPx, tagLengthToCss } from './handlers';

describe('Tag handlers', () => {
  it('getTagMetrics: SM по умолчанию', () => {
    const m = getTagMetrics();
    expect(m.fontSize).toBe('12px');
  });

  it('getTagMetrics: MD', () => {
    expect(getTagMetrics(Size.MD).minHeight).toBe('28px');
  });

  it('getTagSkeletonDefaultWidthPx: растёт с размером', () => {
    expect(getTagSkeletonDefaultWidthPx(Size.XS)).toBeLessThan(
      getTagSkeletonDefaultWidthPx(Size.XL),
    );
    expect(getTagSkeletonDefaultWidthPx(Size.MD)).toBe(80);
  });

  it('tagLengthToCss', () => {
    expect(tagLengthToCss(120)).toBe('120px');
    expect(tagLengthToCss('50%')).toBe('50%');
    expect(tagLengthToCss(undefined)).toBeUndefined();
  });
});
