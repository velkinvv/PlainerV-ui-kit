import { ButtonVariant } from '../../../../types/ui';
import { Size } from '../../../../types/sizes';
import {
  getMultiButtonChevronHorizontalPadding,
  getMultiButtonChevronPadding,
  getMultiButtonOuterRadius,
  isMultiButtonMainDisabled,
  isMultiButtonMenuDisabled,
  mapMultiButtonAppearanceToVariant,
} from './handlers';

describe('MultiButton handlers', () => {
  it('mapMultiButtonAppearanceToVariant', () => {
    expect(mapMultiButtonAppearanceToVariant('primary')).toBe(ButtonVariant.PRIMARY);
    expect(mapMultiButtonAppearanceToVariant('secondary')).toBe(ButtonVariant.SECONDARY);
    expect(mapMultiButtonAppearanceToVariant('outline')).toBe(ButtonVariant.OUTLINE);
    expect(mapMultiButtonAppearanceToVariant('primary', true)).toBe(ButtonVariant.SKELETON);
  });

  it('getMultiButtonOuterRadius совпадает с радиусом Button из темы', () => {
    expect(getMultiButtonOuterRadius(Size.MD)).toBe('8px');
    expect(getMultiButtonOuterRadius(Size.SM)).toBe('6px');
    expect(getMultiButtonOuterRadius(Size.LG)).toBe('10px');
  });

  it('getMultiButtonChevronHorizontalPadding', () => {
    expect(getMultiButtonChevronHorizontalPadding(Size.SM)).toBe('8px');
    expect(getMultiButtonChevronHorizontalPadding(Size.MD)).toBe('10px');
  });

  it('getMultiButtonChevronPadding сохраняет вертикаль темы Button', () => {
    expect(getMultiButtonChevronPadding('10px 18px', Size.MD)).toBe('10px 10px');
    expect(getMultiButtonChevronPadding('8px 12px', Size.SM)).toBe('8px 8px');
  });

  it('isMultiButtonMainDisabled', () => {
    expect(isMultiButtonMainDisabled(false, false, false)).toBe(false);
    expect(isMultiButtonMainDisabled(true, false, false)).toBe(true);
    expect(isMultiButtonMainDisabled(false, true, false)).toBe(true);
    expect(isMultiButtonMainDisabled(false, false, true)).toBe(true);
  });

  it('isMultiButtonMenuDisabled', () => {
    expect(isMultiButtonMenuDisabled(false, false)).toBe(false);
    expect(isMultiButtonMenuDisabled(true, false)).toBe(true);
    expect(isMultiButtonMenuDisabled(false, true)).toBe(true);
  });
});
