import {
  buildTransferListItemMap,
  filterTransferListItems,
  getTransferListDragValues,
  moveAllTransferListValues,
  moveTransferListValues,
  parseTransferListDragPayload,
  reorderTransferListValues,
  resolveTransferListDropInsertIndex,
  resolveTransferListPanels,
  resolveTransferListSelectAllState,
  serializeTransferListDragPayload,
  toggleTransferListSelectAllChecked,
  transferListHeightToCss,
} from './handlers';

describe('resolveTransferListPanels', () => {
  const items = [
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' },
  ];

  it('простой режим: value = справа, слева = остаток в порядке items', () => {
    expect(resolveTransferListPanels({ items, rightValue: ['b'] })).toEqual({
      leftValue: ['a', 'c'],
      rightValue: ['b'],
    });
  });

  it('explicit: сохраняет порядок left/right и докидывает leftovers влево', () => {
    expect(
      resolveTransferListPanels({
        items,
        leftValue: ['c'],
        rightValue: ['a'],
        explicitPanels: true,
      }),
    ).toEqual({
      leftValue: ['c', 'b'],
      rightValue: ['a'],
    });
  });
});

describe('moveTransferListValues', () => {
  it('переносит выбранные слева направо в конец', () => {
    expect(
      moveTransferListValues({
        leftValue: ['a', 'b', 'c'],
        rightValue: ['d'],
        movingValues: ['a', 'c'],
        direction: 'to-right',
      }),
    ).toEqual({ leftValue: ['b'], rightValue: ['d', 'a', 'c'] });
  });

  it('вставляет по insertIndex', () => {
    expect(
      moveTransferListValues({
        leftValue: ['a', 'b'],
        rightValue: ['x', 'y'],
        movingValues: ['a'],
        direction: 'to-right',
        insertIndex: 1,
      }),
    ).toEqual({ leftValue: ['b'], rightValue: ['x', 'a', 'y'] });
  });
});

describe('moveAllTransferListValues', () => {
  it('не переносит disabled', () => {
    const itemsByValue = buildTransferListItemMap([
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', disabled: true },
    ]);
    expect(
      moveAllTransferListValues({
        leftValue: ['a', 'b'],
        rightValue: [],
        itemsByValue,
        direction: 'to-right',
      }),
    ).toEqual({ leftValue: ['b'], rightValue: ['a'] });
  });
});

describe('filterTransferListItems', () => {
  it('фильтрует по label/description', () => {
    const items = [
      { value: '1', label: 'Alpha', description: 'one' },
      { value: '2', label: 'Beta' },
    ];
    expect(filterTransferListItems(items, 'alp').map((item) => item.value)).toEqual(['1']);
    expect(filterTransferListItems(items, 'one').map((item) => item.value)).toEqual(['1']);
  });
});

describe('select-all helpers', () => {
  const visible = [
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B', disabled: true },
    { value: 'c', label: 'C' },
  ];

  it('resolveTransferListSelectAllState', () => {
    expect(
      resolveTransferListSelectAllState({ visibleItems: visible, checkedValues: [] }),
    ).toEqual({ checked: false, indeterminate: false });
    expect(
      resolveTransferListSelectAllState({ visibleItems: visible, checkedValues: ['a'] }),
    ).toEqual({ checked: false, indeterminate: true });
    expect(
      resolveTransferListSelectAllState({
        visibleItems: visible,
        checkedValues: ['a', 'c'],
      }),
    ).toEqual({ checked: true, indeterminate: false });
  });

  it('toggleTransferListSelectAllChecked', () => {
    expect(
      toggleTransferListSelectAllChecked({
        visibleItems: visible,
        checkedValues: [],
        selectAll: true,
      }).sort(),
    ).toEqual(['a', 'c']);
    expect(
      toggleTransferListSelectAllChecked({
        visibleItems: visible,
        checkedValues: ['a', 'c', 'x'],
        selectAll: false,
      }),
    ).toEqual(['x']);
  });
});

describe('reorder / drag', () => {
  it('reorderTransferListValues', () => {
    expect(reorderTransferListValues(['a', 'b', 'c'], ['b'], 0)).toEqual(['b', 'a', 'c']);
  });

  it('getTransferListDragValues: выбранный тянет все checked', () => {
    expect(
      getTransferListDragValues({
        itemValue: 'b',
        checkedValues: ['a', 'b'],
        panelValues: ['a', 'b', 'c'],
      }),
    ).toEqual(['a', 'b']);
  });

  it('getTransferListDragValues: невыбранный — один пункт', () => {
    expect(
      getTransferListDragValues({
        itemValue: 'c',
        checkedValues: ['a'],
        panelValues: ['a', 'b', 'c'],
      }),
    ).toEqual(['c']);
  });

  it('serialize/parse drag payload', () => {
    const raw = serializeTransferListDragPayload({ side: 'left', values: ['a'] });
    expect(parseTransferListDragPayload(raw)).toEqual({ side: 'left', values: ['a'] });
    expect(parseTransferListDragPayload('not-json')).toBeNull();
  });

  it('resolveTransferListDropInsertIndex', () => {
    expect(
      resolveTransferListDropInsertIndex({
        panelValues: ['a', 'b', 'c'],
        targetValue: 'c',
        placeBefore: true,
        movingValues: ['b'],
      }),
    ).toBe(1);
  });
});

describe('transferListHeightToCss', () => {
  it('default и number/string', () => {
    expect(transferListHeightToCss()).toBe('240px');
    expect(transferListHeightToCss(120)).toBe('120px');
    expect(transferListHeightToCss('50vh')).toBe('50vh');
  });
});
