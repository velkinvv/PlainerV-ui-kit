import {
  normalizeSliderInputScale,
  resolveSliderInputSnappedValue,
  getSliderInputNumericDraftSeed,
  resolveSliderInputNumericDraftOnCommit,
  resolveSliderInputThumbKeyboardIntent,
  getSliderInputClearButtonPseudoValue,
  shouldShowSliderInputCharacterCounter,
  getSliderInputTrackFooterHeightPx,
  getSliderInputThumbBottomCss,
  isSliderInputTrackFilledToEnd,
  sliderInputThumbLeftCalcCss,
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

  it('getSliderInputTrackFooterHeightPx учитывает центр бегунка на линии трека', () => {
    expect(getSliderInputTrackFooterHeightPx(20, 3, 4)).toBe(12);
  });

  it('sliderInputThumbLeftCalcCss без бокового inset', () => {
    expect(sliderInputThumbLeftCalcCss(20, 0)).toBe('calc((100% - 20px) * 0 / 100)');
  });

  it('getSliderInputThumbBottomCss ставит центр бегунка на середину линии трека', () => {
    expect(getSliderInputThumbBottomCss(4)).toBe('2px');
  });

  it('isSliderInputTrackFilledToEnd определяет заполнение до правого края', () => {
    expect(isSliderInputTrackFilledToEnd(99.4)).toBe(false);
    expect(isSliderInputTrackFilledToEnd(100)).toBe(true);
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
