import { Size } from '../../../types/sizes';
import { getPillGeometry } from './handlers';

describe('Pill handlers', () => {
  it('getPillGeometry: MD по умолчанию', () => {
    const g = getPillGeometry();
    expect(g.indicator).toBe(16);
    expect(g.fontSize).toBe('14px');
  });

  it('getPillGeometry: SM и LG', () => {
    expect(getPillGeometry(Size.SM).indicator).toBe(14);
    expect(getPillGeometry(Size.LG).indicator).toBe(20);
  });
});
