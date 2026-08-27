import { Size } from '../../../../types/sizes';
import { getButtonGroupAttachedOuterRadius } from './handlers';
import { BorderRadiusHandler } from '../../../../handlers/uiHandlers';

describe('ButtonGroup handlers', () => {
  it('segment: радиус из theme.borderRadius, не из отдельной шкалы size', () => {
    expect(getButtonGroupAttachedOuterRadius(Size.SM, 'segment', Size.MD)).toBe(
      BorderRadiusHandler(Size.MD),
    );
    expect(getButtonGroupAttachedOuterRadius(Size.LG, 'segment', Size.MD)).toBe(
      BorderRadiusHandler(Size.MD),
    );
    expect(getButtonGroupAttachedOuterRadius(Size.SM, 'segment', Size.LG)).toBe(
      BorderRadiusHandler(Size.LG),
    );
  });

  it('pill: капсула', () => {
    expect(getButtonGroupAttachedOuterRadius(Size.SM, 'pill')).toBe('9999px');
  });
});
