import {
  applyTreeDrop,
  canDropOnTreeTarget,
  collectDescendantIds,
  findTreeItemById,
  getIndeterminateIds,
  getNextCheckedIds,
  getNextExpandedIds,
  getNextSelectedIds,
  isAncestorOf,
  resolveTreeItems,
  resolveTreeSelectionControl,
  toggleIdInList,
  treeChildrenToItems,
} from './handlers';
import type { TreeItemData } from '../../../types/ui';
import React from 'react';

const sampleItems: TreeItemData[] = [
  {
    id: 'root',
    label: 'Root',
    children: [
      { id: 'child-a', label: 'A' },
      {
        id: 'child-b',
        label: 'B',
        children: [{ id: 'grandchild', label: 'G' }],
      },
    ],
  },
];

describe('Tree handlers — selection / ancestry', () => {
  it('collectDescendantIds собирает всех потомков', () => {
    expect(collectDescendantIds(sampleItems, 'root').sort()).toEqual(
      ['child-a', 'child-b', 'grandchild'].sort(),
    );
  });

  it('isAncestorOf определяет предка', () => {
    expect(isAncestorOf(sampleItems, 'root', 'grandchild')).toBe(true);
    expect(isAncestorOf(sampleItems, 'child-a', 'grandchild')).toBe(false);
  });

  it('getNextSelectedIds в single заменяет выбор', () => {
    expect(getNextSelectedIds('single', ['child-a'], 'child-b')).toEqual(['child-b']);
  });

  it('getNextSelectedIds в multiple делает toggle', () => {
    expect(getNextSelectedIds('multiple', ['child-a'], 'child-b')).toEqual([
      'child-a',
      'child-b',
    ]);
    expect(getNextSelectedIds('multiple', ['child-a', 'child-b'], 'child-a')).toEqual([
      'child-b',
    ]);
  });

  it('toggleIdInList добавляет и удаляет id', () => {
    expect(toggleIdInList(['a'], 'b')).toEqual(['a', 'b']);
    expect(toggleIdInList(['a', 'b'], 'a')).toEqual(['b']);
  });
});

describe('Tree handlers — check / expand', () => {
  it('cascade: check родителя отмечает потомков', () => {
    const next = getNextCheckedIds({
      items: sampleItems,
      currentCheckedIds: [],
      itemId: 'root',
      nextChecked: true,
      checkStrictly: false,
    });
    expect(next.sort()).toEqual(['root', 'child-a', 'child-b', 'grandchild'].sort());
  });

  it('checkStrictly не трогает потомков', () => {
    const next = getNextCheckedIds({
      items: sampleItems,
      currentCheckedIds: [],
      itemId: 'root',
      nextChecked: true,
      checkStrictly: true,
    });
    expect(next).toEqual(['root']);
  });

  it('indeterminate у предка при частичном выборе', () => {
    const indeterminate = getIndeterminateIds(sampleItems, ['grandchild'], false);
    expect(indeterminate).toContain('root');
    // у child-b единственный потомок отмечен — это полный выбор ветки, не indeterminate
    expect(indeterminate).not.toContain('child-b');
  });

  it('indeterminate у родителя с несколькими детьми', () => {
    const itemsWithSiblings: TreeItemData[] = [
      {
        id: 'folder',
        label: 'Folder',
        children: [
          { id: 'file-1', label: '1' },
          { id: 'file-2', label: '2' },
        ],
      },
    ];
    expect(getIndeterminateIds(itemsWithSiblings, ['file-1'], false)).toEqual(['folder']);
  });

  it('toggle expand', () => {
    expect(getNextExpandedIds(['root'], 'child-b')).toEqual(['root', 'child-b']);
    expect(getNextExpandedIds(['root', 'child-b'], 'root')).toEqual(['child-b']);
  });
});

describe('Tree handlers — drop', () => {
  it('запрещает drop в себя и в потомка', () => {
    expect(
      canDropOnTreeTarget({
        items: sampleItems,
        dragIds: ['root'],
        targetId: 'grandchild',
        position: 'into',
      }),
    ).toBe(false);
  });

  it('разрешает drop before соседа', () => {
    expect(
      canDropOnTreeTarget({
        items: sampleItems,
        dragIds: ['child-a'],
        targetId: 'child-b',
        position: 'before',
      }),
    ).toBe(true);
  });

  it('applyTreeDrop перемещает узел into', () => {
    const next = applyTreeDrop(sampleItems, {
      dragIds: ['child-a'],
      targetId: 'child-b',
      position: 'into',
    });
    const childB = findTreeItemById(next, 'child-b');
    expect(childB?.children?.some((child) => child.id === 'child-a')).toBe(true);
    expect(
      findTreeItemById(next, 'root')?.children?.some((child) => child.id === 'child-a'),
    ).toBe(false);
  });
});

describe('Tree handlers — resolve items', () => {
  it('resolveTreeSelectionControl: checkable → checkbox', () => {
    expect(resolveTreeSelectionControl(undefined, true)).toBe('checkbox');
    expect(resolveTreeSelectionControl(undefined, false)).toBe('none');
    expect(resolveTreeSelectionControl('radio', true)).toBe('radio');
    expect(resolveTreeSelectionControl('none', true)).toBe('none');
  });

  it('пустой items даёт пустое дерево без fallback на children', () => {
    const FakeItem = Object.assign(
      (props: { id: string; label: string }) => React.createElement('div', null, props.label),
      { displayName: 'Tree.Item' },
    );

    const resolved = resolveTreeItems([], React.createElement(FakeItem, { id: 'x', label: 'X' }));
    expect(resolved).toEqual([]);
  });

  it('без items парсит children с displayName Tree.Item', () => {
    const FakeItem = Object.assign(
      (props: { id: string; label: string; children?: React.ReactNode }) =>
        React.createElement('div', null, props.label, props.children),
      { displayName: 'Tree.Item' },
    );

    const resolved = treeChildrenToItems(
      React.createElement(
        FakeItem,
        { id: 'parent', label: 'Parent' },
        React.createElement(FakeItem, { id: 'child', label: 'Child' }),
      ),
    );

    expect(resolved).toEqual([
      {
        id: 'parent',
        label: 'Parent',
        icon: undefined,
        disabled: undefined,
        draggable: undefined,
        droppable: undefined,
        data: undefined,
        children: [
          {
            id: 'child',
            label: 'Child',
            icon: undefined,
            disabled: undefined,
            draggable: undefined,
            droppable: undefined,
            data: undefined,
            children: undefined,
          },
        ],
      },
    ]);
  });
});
