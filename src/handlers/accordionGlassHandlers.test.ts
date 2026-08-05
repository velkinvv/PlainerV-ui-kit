import { ThemeColorScheme } from '../types/theme';
import type { Colors } from '../types/theme';
import { lightAccordionTheme } from '../themes/accordion/light';
import { mixColorWithTransparent } from './glassColorHandlers';
import {
  getAccordionGlassSurfaceTokens,
  getAccordionPositionStyles,
  getAccordionSurfaceTokens,
  isAccordionGlassTheme,
} from './accordionGlassHandlers';

describe('accordionGlassHandlers', () => {
  const colors = {
    borderSecondary: '#ececec',
    onAccent: '#ffffff',
  } as Colors;

  const glassContext = {
    mode: ThemeColorScheme.LIGHT,
    colors,
    accordions: {
      ...lightAccordionTheme,
      settings: {
        ...lightAccordionTheme.settings,
        backdropFilter: 'blur(12px)',
      },
    },
  };

  it('isAccordionGlassTheme определяет glass по backdropFilter', () => {
    expect(isAccordionGlassTheme(glassContext)).toBe(true);
    expect(
      isAccordionGlassTheme({
        mode: ThemeColorScheme.LIGHT,
        colors,
        accordions: lightAccordionTheme,
      }),
    ).toBe(false);
  });

  it('getAccordionGlassSurfaceTokens возвращает полупрозрачный фон', () => {
    const tokens = getAccordionGlassSurfaceTokens(glassContext);
    expect(tokens.background).toBe(mixColorWithTransparent('#ffffff', 26));
    expect(tokens.hoverBackground).toBe(mixColorWithTransparent('#ffffff', 18));
    expect(tokens.dividerBorder).toBe('1px solid #ececec');
  });

  it('getAccordionSurfaceTokens возвращает непрозрачный фон в обычной теме', () => {
    const tokens = getAccordionSurfaceTokens({
      mode: ThemeColorScheme.LIGHT,
      colors,
      accordions: lightAccordionTheme,
    });
    expect(tokens.background).toBe(lightAccordionTheme.variants.default.background);
  });

  it('getAccordionPositionStyles использует glass-разделители', () => {
    const positionStyles = getAccordionPositionStyles('center', glassContext);
    expect(positionStyles.borderTop).toBe('1px solid #ececec');
    expect(positionStyles.borderBottom).toBe('1px solid #ececec');
  });
});
