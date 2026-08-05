import { lightTheme, darkTheme } from '../themes/themes';
import { resolveOnAccentTextColor } from './onAccentColorHandlers';

describe('resolveOnAccentTextColor', () => {
  it('светлая тема — onAccent', () => {
    expect(resolveOnAccentTextColor(lightTheme)).toBe(lightTheme.colors.onAccent);
  });

  it('тёмная тема — onAccent', () => {
    expect(resolveOnAccentTextColor(darkTheme)).toBe(darkTheme.colors.onAccent);
  });
});
