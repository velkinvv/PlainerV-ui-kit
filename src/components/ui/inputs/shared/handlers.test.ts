import {
  getInputDisplayValue,
  shouldShowInputClearButton,
  hasInputRightControls,
} from './handlers';

describe('inputs/shared/handlers', () => {
  describe('getInputDisplayValue', () => {
    it('возвращает controlled значение, если оно передано', () => {
      expect(getInputDisplayValue('controlled', 'internal')).toBe('controlled');
    });

    it('возвращает internal значение, если controlled значение не передано', () => {
      expect(getInputDisplayValue(undefined, 'internal')).toBe('internal');
    });
  });

  describe('shouldShowInputClearButton', () => {
    it('возвращает true для непустого значения в доступном поле', () => {
      expect(
        shouldShowInputClearButton({
          displayClearIcon: true,
          currentValue: 'text',
          disabled: false,
          readOnly: false,
        }),
      ).toBe(true);
    });

    it('возвращает false, если displayClearIcon выключен', () => {
      expect(
        shouldShowInputClearButton({
          displayClearIcon: false,
          currentValue: 'text',
          disabled: false,
          readOnly: false,
        }),
      ).toBe(false);
    });

    it('возвращает false для пустого значения', () => {
      expect(
        shouldShowInputClearButton({
          displayClearIcon: true,
          currentValue: '',
          disabled: false,
          readOnly: false,
        }),
      ).toBe(false);
    });

    it('возвращает false для disabled поля', () => {
      expect(
        shouldShowInputClearButton({
          displayClearIcon: true,
          currentValue: 'text',
          disabled: true,
          readOnly: false,
        }),
      ).toBe(false);
    });

    it('возвращает false для readOnly поля', () => {
      expect(
        shouldShowInputClearButton({
          displayClearIcon: true,
          currentValue: 'text',
          disabled: false,
          readOnly: true,
        }),
      ).toBe(false);
    });
  });

  describe('hasInputRightControls', () => {
    it('возвращает true при активном индикаторе загрузки', () => {
      expect(hasInputRightControls({ isLoading: true, showClearButton: false })).toBe(true);
    });

    it('возвращает true при видимой кнопке очистки', () => {
      expect(hasInputRightControls({ isLoading: false, showClearButton: true })).toBe(true);
    });

    it('возвращает false, если нет правых контролов', () => {
      expect(hasInputRightControls({ isLoading: false, showClearButton: false })).toBe(false);
    });
  });
});
