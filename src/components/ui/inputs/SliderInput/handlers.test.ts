import {
  normalizeSliderInputScale,
  resolveSliderInputSnappedValue,
  getSliderInputNumericDraftSeed,
  resolveSliderInputNumericDraftOnCommit,
  resolveSliderInputThumbKeyboardIntent,
  getSliderInputClearButtonPseudoValue,
  shouldShowSliderInputCharacterCounter,
} from './handlers';

describe('SliderInput handlers', () => {
  it('normalizeSliderInputScale поднимает max и шаг', () => {
    expect(normalizeSliderInputScale({ minProp: 0, maxProp: -1, stepProp: 0 })).toEqual({
      min: 0,
      max: 0,
      step: 1,
    });
  });

  it('resolveSliderInputSnappedValue режет к шагу', () => {
    expect(resolveSliderInputSnappedValue(12, 0, 100, 10)).toBe(10);
  });

  it('getSliderInputNumericDraftSeed учитывает valueProp', () => {
    expect(
      getSliderInputNumericDraftSeed({
        valueProp: 7,
        defaultValue: 1,
        min: 0,
        max: 10,
        step: 1,
      }),
    ).toBe('7');
  });

  it('resolveSliderInputNumericDraftOnCommit отклоняет пустой черновик', () => {
    expect(resolveSliderInputNumericDraftOnCommit('')).toEqual({ outcome: 'revert' });
  });

  it('resolveSliderInputNumericDraftOnCommit парсит число', () => {
    expect(resolveSliderInputNumericDraftOnCommit(' 42 ')).toEqual({
      outcome: 'commit',
      nextValue: 42,
    });
  });

  it('resolveSliderInputThumbKeyboardIntent возвращает toMin на Home', () => {
    expect(resolveSliderInputThumbKeyboardIntent('Home', 1)).toEqual({ kind: 'toMin' });
  });

  it('getSliderInputClearButtonPseudoValue', () => {
    expect(getSliderInputClearButtonPseudoValue(5, 0)).toBe('1');
    expect(getSliderInputClearButtonPseudoValue(0, 0)).toBe('');
  });

  it('shouldShowSliderInputCharacterCounter', () => {
    expect(
      shouldShowSliderInputCharacterCounter({
        displayCharacterCounter: true,
        maxLength: 10,
        draftLength: 5,
        visibilityThreshold: 0,
      }),
    ).toBe(true);
  });
});
