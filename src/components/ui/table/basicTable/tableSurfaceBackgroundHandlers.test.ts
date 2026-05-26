import { describe, expect, it } from 'vitest';
import {
  normalizeTableSurfaceBackgrounds,
  resolveTableHeaderSurfaceBackgroundColor,
  resolveTableHeaderToolbarSurfaceBackgroundColor,
  resolveTableSurfaceBackgroundColor,
  TABLE_SURFACE_BACKGROUND_KEYS,
} from './tableSurfaceBackgroundHandlers';

describe('normalizeTableSurfaceBackgrounds', () => {
  it('по умолчанию все фоны из темы', () => {
    const surfaces = normalizeTableSurfaceBackgrounds();
    for (const surfaceKey of TABLE_SURFACE_BACKGROUND_KEYS) {
      expect(surfaces[surfaceKey]).toBe(false);
    }
  });

  it('shorthand transparent включает все поверхности', () => {
    const surfaces = normalizeTableSurfaceBackgrounds('transparent');
    for (const surfaceKey of TABLE_SURFACE_BACKGROUND_KEYS) {
      expect(surfaces[surfaceKey]).toBe(true);
    }
  });

  it('частичный объект переопределяет только переданные ключи', () => {
    const surfaces = normalizeTableSurfaceBackgrounds({ header: true, bodyRowHover: true });
    expect(surfaces.header).toBe(true);
    expect(surfaces.bodyRowHover).toBe(true);
    expect(surfaces.shell).toBe(false);
  });
});

describe('resolveTableSurfaceBackgroundColor', () => {
  it('возвращает transparent при флаге поверхности', () => {
    const surfaces = normalizeTableSurfaceBackgrounds({ footer: true });
    expect(resolveTableSurfaceBackgroundColor(surfaces, 'footer', '#fff')).toBe('transparent');
  });

  it('возвращает цвет темы без флага', () => {
    const surfaces = normalizeTableSurfaceBackgrounds();
    expect(resolveTableSurfaceBackgroundColor(surfaces, 'footer', '#eee')).toBe('#eee');
  });
});

describe('resolveTableHeaderSurfaceBackgroundColor', () => {
  it('прозрачная шапка при header или headerToolbar', () => {
    expect(
      resolveTableHeaderSurfaceBackgroundColor(
        normalizeTableSurfaceBackgrounds({ header: true }),
        '#ccc',
      ),
    ).toBe('transparent');
    expect(
      resolveTableHeaderSurfaceBackgroundColor(
        normalizeTableSurfaceBackgrounds({ headerToolbar: true }),
        '#ccc',
      ),
    ).toBe('transparent');
  });
});

describe('resolveTableHeaderToolbarSurfaceBackgroundColor', () => {
  it('только headerToolbar делает панель прозрачной', () => {
    const surfaces = normalizeTableSurfaceBackgrounds({ headerToolbar: true });
    expect(resolveTableHeaderToolbarSurfaceBackgroundColor(surfaces, '#ccc')).toBe('transparent');
  });

  it('без headerToolbar наследует фон шапки', () => {
    const surfaces = normalizeTableSurfaceBackgrounds({ header: true });
    expect(resolveTableHeaderToolbarSurfaceBackgroundColor(surfaces, '#ccc')).toBe('#ccc');
  });
});
