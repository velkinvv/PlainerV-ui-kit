import {
  getActionBarItemOccupiedWidthPx,
  splitActionBarItemsByContainerWidth,
} from './handlers';

describe('ActionBar handlers', () => {
  const sampleItems = [
    { itemId: 'search', withDivider: false },
    { itemId: 'edit', withDivider: false },
    { itemId: 'archive', withDivider: true },
    { itemId: 'delete', withDivider: false },
  ];

  it('getActionBarItemOccupiedWidthPx учитывает разделитель', () => {
    expect(getActionBarItemOccupiedWidthPx(sampleItems[0], 56, 1)).toBe(56);
    expect(getActionBarItemOccupiedWidthPx(sampleItems[2], 56, 1)).toBe(57);
  });

  it('splitActionBarItemsByContainerWidth переносит лишние элементы в overflow', () => {
    const splitResult = splitActionBarItemsByContainerWidth(sampleItems, 170, 56, 1);

    expect(splitResult.visibleItems.length).toBeGreaterThan(0);
    expect(splitResult.hiddenItems.length).toBeGreaterThan(0);
    expect(splitResult.visibleItems.length + splitResult.hiddenItems.length).toBe(sampleItems.length);
  });

  it('splitActionBarItemsByContainerWidth возвращает все элементы видимыми при достаточной ширине', () => {
    const splitResult = splitActionBarItemsByContainerWidth(sampleItems, 1000, 56, 1);

    expect(splitResult.visibleItems).toEqual(sampleItems);
    expect(splitResult.hiddenItems).toEqual([]);
  });

  it('splitActionBarItemsByContainerWidth резервирует место под overflow-кнопку', () => {
    const splitResult = splitActionBarItemsByContainerWidth(sampleItems, 120, 56, 1);

    expect(splitResult.hiddenItems.length).toBeGreaterThan(0);
    expect(splitResult.visibleItems.every((item) => item.itemId)).toBe(true);
  });

  it('splitActionBarItemsByContainerWidth работает для компактного размера', () => {
    const splitResult = splitActionBarItemsByContainerWidth(sampleItems, 80, 32, 1);

    expect(splitResult.visibleItems.length + splitResult.hiddenItems.length).toBe(sampleItems.length);
  });
});
