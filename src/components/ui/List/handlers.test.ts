import { Size } from '../../../types/sizes';
import {
  getDefaultListMarkerStyle,
  getListGeometry,
  getListRootTag,
  listGapToCss,
  resolveListMarkerStyle,
  shouldRenderCssListMarker,
} from './handlers';

describe('List handlers', () => {
  it('getListGeometry: MD по умолчанию', () => {
    expect(getListGeometry().markerSlotSize).toBe(24);
    expect(getListGeometry(Size.SM).markerSlotSize).toBe(20);
  });

  it('listGapToCss', () => {
    expect(listGapToCss(undefined)).toBe('8px');
    expect(listGapToCss(12)).toBe('12px');
    expect(listGapToCss('1rem')).toBe('1rem');
  });

  it('getDefaultListMarkerStyle', () => {
    expect(getDefaultListMarkerStyle('ordered')).toBe('numbers');
    expect(getDefaultListMarkerStyle('unordered')).toBe('bullet');
  });

  it('resolveListMarkerStyle: несовместимый стиль → дефолт', () => {
    expect(resolveListMarkerStyle('ordered', 'bullet')).toBe('numbers');
    expect(resolveListMarkerStyle('unordered', 'numbers')).toBe('bullet');
    expect(resolveListMarkerStyle('ordered', 'lower-letters')).toBe('lower-letters');
    expect(resolveListMarkerStyle('unordered', 'icon')).toBe('icon');
  });

  it('getListRootTag', () => {
    expect(getListRootTag('ordered')).toBe('ol');
    expect(getListRootTag('unordered')).toBe('ul');
  });

  it('shouldRenderCssListMarker', () => {
    expect(shouldRenderCssListMarker('bullet')).toBe(true);
    expect(shouldRenderCssListMarker('icon')).toBe(false);
  });
});
