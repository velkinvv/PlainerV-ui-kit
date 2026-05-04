import { Size } from '../../../../types/sizes';
import { getButtonGroupAttachedOuterRadius } from './handlers';

describe('ButtonGroup handlers', () => {
  it('segment: радиус зависит от размера', () => {
    expect(getButtonGroupAttachedOuterRadius(Size.SM, 'segment')).toBe('4px');
    expect(getButtonGroupAttachedOuterRadius(Size.MD, 'segment')).toBe('8px');
    expect(getButtonGroupAttachedOuterRadius(Size.LG, 'segment')).toBe('12px');
  });

  it('pill: капсула', () => {
    expect(getButtonGroupAttachedOuterRadius(Size.SM, 'pill')).toBe('9999px');
  });
});
