import { ThemeColorScheme } from '../types/theme';
import { lightTheme } from './themes';
import { mergeTheme } from './mergeTheme';

describe('mergeTheme', () => {
  it('сохраняет базовые значения, если переопределение пустое', () => {
    const merged = mergeTheme(lightTheme, {});

    expect(merged).toEqual(lightTheme);
  });

  it('переопределяет поля верхнего уровня', () => {
    const merged = mergeTheme(lightTheme, {
      mode: ThemeColorScheme.DARK,
      borderRadius: lightTheme.borderRadius,
    });

    expect(merged.mode).toBe(ThemeColorScheme.DARK);
    expect(merged.colors).toEqual(lightTheme.colors);
  });

  it('глубоко сливает вложенные объекты colors', () => {
    const customPrimary = '#AABBCC';

    const merged = mergeTheme(lightTheme, {
      colors: {
        primary: customPrimary,
      },
    });

    expect(merged.colors.primary).toBe(customPrimary);
    expect(merged.colors.background).toBe(lightTheme.colors.background);
  });
});
