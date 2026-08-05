import {
  isSliderSideIconButtonDisabled,
  resolveSliderSideIconAriaLabel,
  resolveSliderSideIconVisibility,
  shouldWrapSliderSideIconAsButton,
} from './sliderSideIconHandlers';

describe('sliderSideIconHandlers', () => {
  it('resolveSliderSideIconVisibility: без иконки — hide', () => {
    expect(resolveSliderSideIconVisibility({ hasIcon: false })).toBe('hide');
  });

  it('resolveSliderSideIconVisibility: show по умолчанию', () => {
    expect(resolveSliderSideIconVisibility({ hasIcon: true })).toBe('show');
    expect(
      resolveSliderSideIconVisibility({
        hasIcon: true,
        disabled: true,
        sideIconsWhenDisabled: 'disable',
      }),
    ).toBe('show');
  });

  it('resolveSliderSideIconVisibility: hide при disabled + hide', () => {
    expect(
      resolveSliderSideIconVisibility({
        hasIcon: true,
        disabled: true,
        sideIconsWhenDisabled: 'hide',
      }),
    ).toBe('hide');
  });

  it('shouldWrapSliderSideIconAsButton', () => {
    expect(shouldWrapSliderSideIconAsButton(undefined)).toBe(false);
    expect(shouldWrapSliderSideIconAsButton(() => undefined)).toBe(true);
  });

  it('resolveSliderSideIconAriaLabel: дефолты и кастом', () => {
    expect(resolveSliderSideIconAriaLabel({ side: 'left' })).toBe('Действие слева');
    expect(resolveSliderSideIconAriaLabel({ side: 'right' })).toBe('Действие справа');
    expect(resolveSliderSideIconAriaLabel({ side: 'left', ariaLabel: 'Минус' })).toBe('Минус');
  });

  it('isSliderSideIconButtonDisabled', () => {
    expect(
      isSliderSideIconButtonDisabled({
        disabled: true,
        sideIconsWhenDisabled: 'disable',
        wrappedAsButton: true,
      }),
    ).toBe(true);
    expect(
      isSliderSideIconButtonDisabled({
        disabled: true,
        sideIconsWhenDisabled: 'hide',
        wrappedAsButton: true,
      }),
    ).toBe(false);
    expect(
      isSliderSideIconButtonDisabled({
        disabled: true,
        wrappedAsButton: false,
      }),
    ).toBe(false);
  });
});
