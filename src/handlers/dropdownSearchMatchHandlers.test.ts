import { defaultDropdownSearchMatches, getDropdownItemSearchHaystackParts } from './dropdownSearchMatchHandlers';

describe('defaultDropdownSearchMatches', () => {
  const parts = { labelLower: 'new york city', descriptionLower: '' };

  it('wholly: подстрока целиком', () => {
    expect(defaultDropdownSearchMatches('york city', 'wholly', parts)).toBe(true);
    expect(defaultDropdownSearchMatches('york  city', 'wholly', parts)).toBe(false);
  });

  it('word: все слова запроса должны встречаться', () => {
    expect(defaultDropdownSearchMatches('city new', 'word', parts)).toBe(true);
    expect(defaultDropdownSearchMatches('new paris', 'word', parts)).toBe(false);
  });

  it('по умолчанию wholly', () => {
    expect(defaultDropdownSearchMatches('york', undefined, parts)).toBe(true);
  });
});

describe('getDropdownItemSearchHaystackParts', () => {
  it('собирает label и description', () => {
    expect(
      getDropdownItemSearchHaystackParts({
        label: 'Ab',
        description: 'Cd',
      }),
    ).toEqual({ labelLower: 'ab', descriptionLower: 'cd' });
  });
});
