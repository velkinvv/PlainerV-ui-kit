import { Size } from '@/types/sizes';
import type { ThemeType } from '@/types/theme';
import {
  tableBorderRadiusFromTheme,
  tableCardBorderRadiusFromTheme,
} from './tableThemeRadiusHandlers';

const themeWithCards: ThemeType = {
  cards: {
    sizes: {
      [Size.MD]: { minHeight: '60px', padding: '20px', borderRadius: '16px' },
      [Size.SM]: { minHeight: '60px', padding: '16px', borderRadius: '12px' },
    },
  },
  tables: { borderRadius: '12px' },
} as unknown as ThemeType;

describe('tableThemeRadiusHandlers', () => {
  it('tableBorderRadiusFromTheme приоритет у theme.tables.borderRadius', () => {
    expect(tableBorderRadiusFromTheme(themeWithCards)).toBe('12px');
  });

  it('tableCardBorderRadiusFromTheme учитывает ступень карточки', () => {
    expect(tableCardBorderRadiusFromTheme(themeWithCards, Size.SM)).toBe('12px');
    expect(tableCardBorderRadiusFromTheme(themeWithCards, Size.MD)).toBe('16px');
  });

  it('fallback на tables.borderRadius, если нет cards', () => {
    const themeTablesOnly = { tables: { borderRadius: '10px' } } as unknown as ThemeType;
    expect(tableBorderRadiusFromTheme(themeTablesOnly)).toBe('10px');
  });
});
