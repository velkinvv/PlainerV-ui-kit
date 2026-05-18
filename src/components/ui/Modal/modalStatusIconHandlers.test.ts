import { getModalStatusIconConfig, isModalStatusVariant } from './modalStatusIconHandlers';

const mockTheme = {
  colors: {
    danger: '#dc2626',
    success: '#16a34a',
    info: '#2563eb',
  },
} as const;

describe('modalStatusIconHandlers', () => {
  it('isModalStatusVariant определяет статусные варианты', () => {
    expect(isModalStatusVariant('info')).toBe(true);
    expect(isModalStatusVariant('default')).toBe(false);
  });

  it('getModalStatusIconConfig возвращает иконку и цвет для info', () => {
    expect(getModalStatusIconConfig('info', mockTheme)).toEqual({
      iconName: 'IconExInfoCircle',
      accentColor: '#2563eb',
    });
  });
});
