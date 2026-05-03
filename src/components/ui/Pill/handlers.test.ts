import { Size } from '../../../types/sizes';
import {
  getPillGeometry,
  getPillSkeletonDefaultWidthPx,
  getPillSkeletonMinHeightPx,
} from './handlers';

describe('Pill handlers', () => {
  it('getPillGeometry: MD по умолчанию', () => {
    const geometry = getPillGeometry();
    expect(geometry.indicator).toBe(16);
    expect(geometry.fontSize).toBe('14px');
  });

  it('getPillGeometry: SM и LG', () => {
    expect(getPillGeometry(Size.SM).indicator).toBe(14);
    expect(getPillGeometry(Size.LG).indicator).toBe(20);
  });

  it('getPillSkeletonDefaultWidthPx: размеры по SM / MD / LG', () => {
    expect(getPillSkeletonDefaultWidthPx(Size.SM)).toBe(76);
    expect(getPillSkeletonDefaultWidthPx(Size.MD)).toBe(88);
    expect(getPillSkeletonDefaultWidthPx(Size.LG)).toBe(108);
  });

  it('getPillSkeletonMinHeightPx: размеры по SM / MD / LG', () => {
    expect(getPillSkeletonMinHeightPx(Size.SM)).toBe(28);
    expect(getPillSkeletonMinHeightPx(Size.MD)).toBe(34);
    expect(getPillSkeletonMinHeightPx(Size.LG)).toBe(40);
  });
});
