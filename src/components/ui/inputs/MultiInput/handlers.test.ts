import {
  normalizeMultiInputToken,
  shouldAcceptMultiInputToken,
  splitMultiInputPaste,
} from './handlers';

describe('MultiInput handlers', () => {
  it('normalizeMultiInputToken обрезает пробелы', () => {
    expect(normalizeMultiInputToken('  a  ')).toBe('a');
  });

  it('splitMultiInputPaste режет по разделителям', () => {
    expect(splitMultiInputPaste('a, b\nc; d')).toEqual(['a', 'b', 'c', 'd']);
  });

  it('shouldAcceptMultiInputToken отклоняет дубликат при reject', () => {
    expect(
      shouldAcceptMultiInputToken({
        token: 'x',
        currentValues: ['x'],
        duplicates: 'reject',
      }),
    ).toBe(false);
  });

  it('shouldAcceptMultiInputToken учитывает maxItems', () => {
    expect(
      shouldAcceptMultiInputToken({
        token: 'z',
        currentValues: ['a', 'b'],
        duplicates: 'allow',
        maxItems: 2,
      }),
    ).toBe(false);
  });
});
