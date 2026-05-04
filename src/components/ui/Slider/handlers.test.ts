import { Size } from '../../../types/sizes';
import {
  clampSliderValue,
  snapSliderToStep,
  valueToPercent,
  mergeRangeAfterThumbMove,
  parseManualSliderNumber,
  getSliderThumbSizePx,
  getSliderTrackMetrics,
  resolveSliderTrackMetrics,
  resolveSliderAccentKind,
  clientXToSliderValue,
  sliderThumbLeftCalcCss,
  getSliderValueLabelRootPaddingHorizontalPx,
} from './handlers';

describe('Slider handlers', () => {
  it('clampSliderValue', () => {
    expect(clampSliderValue(5, 0, 10)).toBe(5);
    expect(clampSliderValue(-1, 0, 10)).toBe(0);
    expect(clampSliderValue(99, 0, 10)).toBe(10);
  });

  it('snapSliderToStep', () => {
    expect(snapSliderToStep(13, 0, 100, 5)).toBe(15);
    expect(snapSliderToStep(2, 0, 10, 3)).toBe(3);
  });

  it('valueToPercent', () => {
    expect(valueToPercent(50, 0, 100)).toBe(50);
    expect(valueToPercent(0, 0, 200)).toBe(0);
  });

  it('mergeRangeAfterThumbMove', () => {
    expect(mergeRangeAfterThumbMove(0, 30, 40, 80, 0, 100, 1)).toEqual([30, 80]);
    expect(mergeRangeAfterThumbMove(1, 50, 40, 80, 0, 100, 1)).toEqual([40, 50]);
  });

  it('parseManualSliderNumber', () => {
    expect(parseManualSliderNumber('1 000 000')).toBe(1000000);
    expect(parseManualSliderNumber('')).toBeNull();
  });

  it('getSliderThumbSizePx', () => {
    expect(getSliderThumbSizePx(Size.XS)).toBe(12);
    expect(getSliderThumbSizePx(Size.SM)).toBe(16);
    expect(getSliderThumbSizePx(Size.MD)).toBe(20);
    expect(getSliderThumbSizePx(Size.LG)).toBe(24);
    expect(getSliderThumbSizePx(Size.XL)).toBe(28);
  });

  it('getSliderTrackMetrics: толщина трека растёт от XS к XL', () => {
    const xs = getSliderTrackMetrics(Size.XS);
    const xl = getSliderTrackMetrics(Size.XL);
    expect(xs.railHeightPx).toBeLessThan(xl.railHeightPx);
    expect(xs.activeHeightPx).toBeLessThan(xl.activeHeightPx);
    expect(xs.trackWrapHeightPx).toBeLessThan(xl.trackWrapHeightPx);
    expect(getSliderTrackMetrics(Size.MD)).toMatchObject({
      railHeightPx: 4,
      activeHeightPx: 6,
      hitHeightPx: 24,
      trackWrapHeightPx: 32,
    });
  });

  it('resolveSliderTrackMetrics: переопределение только рельсы', () => {
    const resolved = resolveSliderTrackMetrics(Size.MD, { trackRailHeightPx: 10 });
    expect(resolved.railHeightPx).toBe(10);
    expect(resolved.activeHeightPx).toBeGreaterThanOrEqual(11);
    expect(resolved.hitHeightPx).toBeGreaterThanOrEqual(24);
  });

  it('resolveSliderTrackMetrics: без overrides совпадает с базой', () => {
    expect(resolveSliderTrackMetrics(Size.LG)).toEqual(getSliderTrackMetrics(Size.LG));
  });

  it('clientXToSliderValue: с инсетом бегунка min/max по внутреннему треку', () => {
    const rect = { left: 100, width: 120 } as DOMRect;
    const thumb = 20;
    expect(clientXToSliderValue(110, rect, 0, 100, 1, thumb)).toBe(0);
    expect(clientXToSliderValue(210, rect, 0, 100, 1, thumb)).toBe(100);
  });

  it('sliderThumbLeftCalcCss', () => {
    expect(sliderThumbLeftCalcCss(20, 0)).toBe('calc(10px + (100% - 20px) * 0 / 100)');
    expect(sliderThumbLeftCalcCss(20, 50)).toBe('calc(10px + (100% - 20px) * 50 / 100)');
  });

  it('getSliderValueLabelRootPaddingHorizontalPx', () => {
    expect(getSliderValueLabelRootPaddingHorizontalPx(12)).toBe(24);
    expect(getSliderValueLabelRootPaddingHorizontalPx(28)).toBe(24);
    expect(getSliderValueLabelRootPaddingHorizontalPx(40)).toBe(24);
    expect(getSliderValueLabelRootPaddingHorizontalPx(56)).toBe(28);
  });

  it('resolveSliderAccentKind', () => {
    expect(resolveSliderAccentKind('Ошибка', false, undefined)).toBe('error');
    expect(resolveSliderAccentKind(undefined, true, undefined)).toBe('success');
    expect(resolveSliderAccentKind(undefined, false, 'warning')).toBe('warning');
    expect(resolveSliderAccentKind('', false, undefined)).toBe('default');
  });
});
