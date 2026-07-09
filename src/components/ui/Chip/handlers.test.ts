import { Size } from '../../../types/sizes';
import {
  chipLengthToCss,
  getChipGeometry,
  getChipsGroupRole,
  getNextChipFocusIndex,
  getNextChipsSelectionValue,
  isChipValueSelected,
  normalizeChipsValueToArray,
  shouldShowChipBadge,
} from './handlers';

describe('Chip handlers', () => {
  it('getChipGeometry: SM по умолчанию', () => {
    const geometry = getChipGeometry();
    expect(geometry.fontSize).toBe('12px');
    expect(geometry.minHeight).toBe('24px');
  });

  it('getChipGeometry: MD выше SM', () => {
    expect(getChipGeometry(Size.MD).minHeight).toBe('28px');
    expect(getChipGeometry(Size.MD).fontSize).toBe('13px');
  });

  it('chipLengthToCss', () => {
    expect(chipLengthToCss(120)).toBe('120px');
    expect(chipLengthToCss('50%')).toBe('50%');
    expect(chipLengthToCss(undefined)).toBeUndefined();
  });

  it('shouldShowChipBadge: только положительные числа', () => {
    expect(shouldShowChipBadge(undefined)).toBe(false);
    expect(shouldShowChipBadge(0)).toBe(false);
    expect(shouldShowChipBadge(3)).toBe(true);
  });

  it('normalizeChipsValueToArray', () => {
    expect(normalizeChipsValueToArray(undefined)).toEqual([]);
    expect(normalizeChipsValueToArray('a')).toEqual(['a']);
    expect(normalizeChipsValueToArray(['a', 'b'])).toEqual(['a', 'b']);
  });

  it('isChipValueSelected', () => {
    expect(isChipValueSelected('none', 'a', 'a')).toBe(false);
    expect(isChipValueSelected('single', 'a', 'a')).toBe(true);
    expect(isChipValueSelected('single', 'a', 'b')).toBe(false);
    expect(isChipValueSelected('multiple', ['a', 'b'], 'b')).toBe(true);
  });

  it('getNextChipsSelectionValue: single не снимает выбор повторным кликом', () => {
    expect(getNextChipsSelectionValue('single', 'a', 'a')).toBe('a');
    expect(getNextChipsSelectionValue('single', 'a', 'b')).toBe('b');
  });

  it('getNextChipsSelectionValue: multiple переключает', () => {
    expect(getNextChipsSelectionValue('multiple', ['a'], 'b')).toEqual(['a', 'b']);
    expect(getNextChipsSelectionValue('multiple', ['a', 'b'], 'a')).toEqual(['b']);
  });

  it('getNextChipsSelectionValue: none → undefined', () => {
    expect(getNextChipsSelectionValue('none', undefined, 'a')).toBeUndefined();
  });

  it('getNextChipFocusIndex: циклическая навигация', () => {
    expect(getNextChipFocusIndex(0, 3, 1)).toBe(1);
    expect(getNextChipFocusIndex(2, 3, 1)).toBe(0);
    expect(getNextChipFocusIndex(0, 3, -1)).toBe(2);
    expect(getNextChipFocusIndex(-1, 3, 1)).toBe(0);
  });

  it('getChipsGroupRole', () => {
    expect(getChipsGroupRole('single')).toBe('radiogroup');
    expect(getChipsGroupRole('multiple')).toBe('group');
    expect(getChipsGroupRole('none')).toBe('group');
  });
});
