import { resolveInputAutocompleteAttribute } from './handlers';

describe('Input handlers', () => {
  describe('resolveInputAutocompleteAttribute', () => {
    it('возвращает явный autoComplete из пропсов', () => {
      expect(
        resolveInputAutocompleteAttribute({
          autoComplete: 'name',
          inputType: 'text',
        }),
      ).toBe('name');
    });

    it('для email возвращает email', () => {
      expect(
        resolveInputAutocompleteAttribute({
          inputType: 'email',
        }),
      ).toBe('email');
    });

    it('для пароля с confirm в placeholder даёт new-password', () => {
      expect(
        resolveInputAutocompleteAttribute({
          inputType: 'password',
          placeholder: 'Confirm password',
        }),
      ).toBe('new-password');
    });

    it('для пароля с current в placeholder даёт current-password', () => {
      expect(
        resolveInputAutocompleteAttribute({
          inputType: 'password',
          placeholder: 'Current password',
        }),
      ).toBe('current-password');
    });

    it('для text и username в placeholder даёт username', () => {
      expect(
        resolveInputAutocompleteAttribute({
          inputType: 'text',
          placeholder: 'Username',
        }),
      ).toBe('username');
    });

    it('для обычного text без эвристик возвращает undefined', () => {
      expect(
        resolveInputAutocompleteAttribute({
          inputType: 'text',
          placeholder: 'Name',
        }),
      ).toBeUndefined();
    });
  });
});
