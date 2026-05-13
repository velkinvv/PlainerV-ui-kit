import type { ThemeType } from '@/types/theme';
import { resolveDataGridTableHeaderBackground } from './dataGridTableHeaderSurfaceHandlers';

const mockTheme: ThemeType = {
  fonts: { primary: 'sans-serif' },
  tables: {
    borderRadius: '12px',
    shell: { border: '1px solid #eee', background: '#ffffff' },
    header: { background: '#e5e5e5', borderBottom: '1px solid #ccc' },
    footerSection: { background: '#fff' },
    cell: {
      text: '#111',
      textHead: '#666',
      headBorderBottom: '1px solid #eee',
      headActiveSortBorderBottom: '3px solid #111',
      headColumnDivider: '#ddd',
    },
    body: { rowBorder: '#eee' },
    zebra: { oddRowBackground: '#f5f5f5' },
    row: {
      selectedBackground: '#eef',
      hoverBackground: '#f9f9f9',
      draggingBackground: '#ddd',
      draggingOutline: '#00f',
      draggingBoxShadow: 'none',
    },
    pagination: { borderTop: '1px solid #eee', textSecondary: '#888' },
    loadingOverlay: { background: 'rgba(255,255,255,0.5)' },
  },
} as unknown as ThemeType;

describe('resolveDataGridTableHeaderBackground', () => {
  it('возвращает фон header при variant undefined', () => {
    expect(resolveDataGridTableHeaderBackground(mockTheme, undefined, undefined)).toBe('#e5e5e5');
  });

  it('возвращает фон header при variant default', () => {
    expect(resolveDataGridTableHeaderBackground(mockTheme, 'default', undefined)).toBe('#e5e5e5');
  });

  it('возвращает фон shell при variant card', () => {
    expect(resolveDataGridTableHeaderBackground(mockTheme, 'card', undefined)).toBe('#ffffff');
  });

  it('custom перекрывает variant', () => {
    expect(resolveDataGridTableHeaderBackground(mockTheme, 'card', '#abc')).toBe('#abc');
  });

  it('игнорирует пустую строку custom', () => {
    expect(resolveDataGridTableHeaderBackground(mockTheme, 'card', '   ')).toBe('#ffffff');
  });
});
