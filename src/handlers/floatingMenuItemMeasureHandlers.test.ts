import { measureFloatingMenuItemWidthPx } from '@/handlers/floatingMenuItemMeasureHandlers';

describe('floatingMenuItemMeasureHandlers', () => {
  it('measureFloatingMenuItemWidthPx не падает на DOM-элементе', () => {
    const sourceElement = document.createElement('button');
    sourceElement.textContent = 'Пункт';

    expect(() => measureFloatingMenuItemWidthPx(sourceElement)).not.toThrow();
  });
});
