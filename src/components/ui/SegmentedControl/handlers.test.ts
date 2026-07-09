import { Size } from '../../../types/sizes';
import {
  getNextSegmentedControlValue,
  getSegmentedControlGeometry,
  getSegmentedInputType,
  isSegmentedValueSelected,
  normalizeSegmentedValueToArray,
} from './handlers';

describe('SegmentedControl handlers', () => {
  it('getSegmentedControlGeometry', () => {
    expect(getSegmentedControlGeometry(Size.SM).minHeight).toBe('28px');
    expect(getSegmentedControlGeometry(Size.MD).minHeight).toBe('36px');
    expect(getSegmentedControlGeometry(Size.LG).minHeight).toBe('44px');
  });

  it('normalizeSegmentedValueToArray', () => {
    expect(normalizeSegmentedValueToArray(undefined)).toEqual([]);
    expect(normalizeSegmentedValueToArray('a')).toEqual(['a']);
    expect(normalizeSegmentedValueToArray(['a', 'b'])).toEqual(['a', 'b']);
  });

  it('isSegmentedValueSelected', () => {
    expect(isSegmentedValueSelected('single', 'a', 'a')).toBe(true);
    expect(isSegmentedValueSelected('single', 'a', 'b')).toBe(false);
    expect(isSegmentedValueSelected('multiple', ['a', 'b'], 'b')).toBe(true);
  });

  it('getNextSegmentedControlValue single', () => {
    expect(getNextSegmentedControlValue('single', 'a', 'b', true)).toBe('b');
  });

  it('getNextSegmentedControlValue multiple', () => {
    expect(getNextSegmentedControlValue('multiple', ['a'], 'b', true)).toEqual(['a', 'b']);
    expect(getNextSegmentedControlValue('multiple', ['a', 'b'], 'a', false)).toEqual(['b']);
  });

  it('getSegmentedInputType', () => {
    expect(getSegmentedInputType('single')).toBe('radio');
    expect(getSegmentedInputType('multiple')).toBe('checkbox');
  });
});
