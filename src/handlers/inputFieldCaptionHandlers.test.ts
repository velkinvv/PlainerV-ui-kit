import {
  DEFAULT_INPUT_LABEL_VARIANT,
  isFloatingInputLabel,
  resolveInputLabelVariant,
  shouldReserveFloatingInputCaptionSpace,
} from './inputFieldCaptionHandlers';

describe('inputFieldCaptionHandlers', () => {
  it('по умолчанию возвращает field', () => {
    expect(resolveInputLabelVariant()).toBe('field');
    expect(DEFAULT_INPUT_LABEL_VARIANT).toBe('field');
    expect(isFloatingInputLabel()).toBe(false);
  });

  it('сохраняет явный floating', () => {
    expect(resolveInputLabelVariant('floating')).toBe('floating');
    expect(isFloatingInputLabel('floating')).toBe(true);
  });

  it('не резервирует padding-top без лейбла', () => {
    expect(shouldReserveFloatingInputCaptionSpace(undefined, false)).toBe(false);
    expect(shouldReserveFloatingInputCaptionSpace('field', false)).toBe(false);
    expect(shouldReserveFloatingInputCaptionSpace('floating', false)).toBe(false);
  });

  it('не резервирует padding-top в режиме field даже с лейблом', () => {
    expect(shouldReserveFloatingInputCaptionSpace('field', true)).toBe(false);
    expect(shouldReserveFloatingInputCaptionSpace(undefined, true)).toBe(false);
  });

  it('резервирует padding-top только для floating при наличии подписи', () => {
    expect(shouldReserveFloatingInputCaptionSpace('floating', true)).toBe(true);
  });
});
