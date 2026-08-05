import {
  avatarBorderToInsetBoxShadow,
  avatarOuterRingBoxShadow,
} from './avatarBorderHandlers';

describe('avatarBorderHandlers', () => {
  describe('avatarBorderToInsetBoxShadow', () => {
    it('преобразует solid border в inset box-shadow', () => {
      expect(avatarBorderToInsetBoxShadow('1px solid rgba(0, 0, 0, 0.12)')).toBe(
        'inset 0 0 0 1px rgba(0, 0, 0, 0.12)',
      );
    });

    it('возвращает null для none / пустого значения', () => {
      expect(avatarBorderToInsetBoxShadow('none')).toBeNull();
      expect(avatarBorderToInsetBoxShadow(undefined)).toBeNull();
      expect(avatarBorderToInsetBoxShadow('')).toBeNull();
    });
  });

  describe('avatarOuterRingBoxShadow', () => {
    it('собирает внешнее кольцо', () => {
      expect(avatarOuterRingBoxShadow('2px', '#ffffff')).toBe('0 0 0 2px #ffffff');
    });

    it('возвращает null при пустых аргументах', () => {
      expect(avatarOuterRingBoxShadow(undefined, '#fff')).toBeNull();
      expect(avatarOuterRingBoxShadow('2px', null)).toBeNull();
    });
  });
});
