jest.unmock('styled-components');

import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Tree } from './Tree';
import type { TreeItemData } from '../../../types/ui';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const sampleItems: TreeItemData[] = [
  {
    id: 'docs',
    label: 'Документы',
    children: [
      { id: 'docs-1', label: 'Отчёт' },
      { id: 'docs-2', label: 'Смета' },
    ],
  },
  { id: 'media', label: 'Медиа', disabled: true },
];

describe('Tree', () => {
  it('раскрывает узел по chevron', () => {
    renderWithTheme(
      <Tree aria-label="Файлы" items={sampleItems} defaultExpandedIds={[]} />,
    );

    expect(screen.queryByText('Отчёт')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Развернуть' }));
    expect(screen.getByText('Отчёт')).toBeInTheDocument();
  });

  it('single select кликом по строке', () => {
    const handleSelectedChange = jest.fn();
    renderWithTheme(
      <Tree
        aria-label="Файлы"
        items={sampleItems}
        selectedIds={[]}
        onSelectedChange={handleSelectedChange}
      />,
    );

    fireEvent.click(screen.getByText('Документы'));
    expect(handleSelectedChange).toHaveBeenCalledWith(['docs']);
  });

  it('multiple select toggle', () => {
    const handleSelectedChange = jest.fn();
    renderWithTheme(
      <Tree
        aria-label="Файлы"
        items={sampleItems}
        selectionMode="multiple"
        selectedIds={['docs']}
        onSelectedChange={handleSelectedChange}
      />,
    );

    fireEvent.click(screen.getByText('Медиа'));
    // disabled — не должен вызывать
    expect(handleSelectedChange).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Развернуть' }));
    fireEvent.click(screen.getByText('Отчёт'));
    expect(handleSelectedChange).toHaveBeenCalledWith(['docs', 'docs-1']);
  });

  it('cascade check отмечает потомков', () => {
    const handleCheckedChange = jest.fn();
    renderWithTheme(
      <Tree
        aria-label="Файлы"
        items={sampleItems}
        checkable
        defaultExpandedIds={['docs']}
        checkedIds={[]}
        onCheckedChange={handleCheckedChange}
      />,
    );

    const docsRow = screen.getByRole('treeitem', { name: /Документы/i });
    const checkbox = within(docsRow).getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleCheckedChange).toHaveBeenCalledWith(
      expect.arrayContaining(['docs', 'docs-1', 'docs-2']),
    );
  });

  it('checkStrictly независим', () => {
    const handleCheckedChange = jest.fn();
    renderWithTheme(
      <Tree
        aria-label="Файлы"
        items={sampleItems}
        checkable
        checkStrictly
        defaultExpandedIds={['docs']}
        checkedIds={[]}
        onCheckedChange={handleCheckedChange}
      />,
    );

    const docsRow = screen.getByRole('treeitem', { name: /Документы/i });
    fireEvent.click(within(docsRow).getByRole('checkbox'));
    expect(handleCheckedChange).toHaveBeenCalledWith(['docs']);
  });

  it('selectionControl radio выбирает один узел', () => {
    const handleSelectedChange = jest.fn();
    renderWithTheme(
      <Tree
        aria-label="Файлы"
        items={sampleItems}
        selectionControl="radio"
        defaultExpandedIds={['docs']}
        selectedIds={[]}
        onSelectedChange={handleSelectedChange}
      />,
    );

    const reportRow = screen.getByRole('treeitem', { name: /Отчёт/i });
    fireEvent.click(within(reportRow).getByRole('radio'));
    expect(handleSelectedChange).toHaveBeenCalledWith(['docs-1']);

    const planRow = screen.getByRole('treeitem', { name: /Смета/i });
    fireEvent.click(within(planRow).getByRole('radio'));
    expect(handleSelectedChange).toHaveBeenLastCalledWith(['docs-2']);
  });

  it('onItemClick и onItemSelect вызываются при клике', () => {
    const handleItemClick = jest.fn();
    const handleItemSelect = jest.fn();
    const handleNodeClick = jest.fn();

    renderWithTheme(
      <Tree
        aria-label="Файлы"
        items={[
          {
            id: 'docs',
            label: 'Документы',
            onClick: handleNodeClick,
            children: [{ id: 'docs-1', label: 'Отчёт' }],
          },
        ]}
        defaultExpandedIds={['docs']}
        selectedIds={[]}
        onItemClick={handleItemClick}
        onItemSelect={handleItemSelect}
      />,
    );

    fireEvent.click(screen.getByText('Отчёт'));
    expect(handleItemClick).toHaveBeenCalledWith(
      expect.objectContaining({ itemId: 'docs-1' }),
    );
    expect(handleItemSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        itemId: 'docs-1',
        selectedIds: ['docs-1'],
      }),
    );

    fireEvent.click(screen.getByText('Документы'));
    expect(handleNodeClick).toHaveBeenCalledWith(
      expect.objectContaining({ itemId: 'docs' }),
    );
  });

  it('пустой items даёт пустое дерево', () => {
    renderWithTheme(
      <Tree aria-label="Пусто" items={[]}>
        <Tree.Item id="hidden" label="Скрытый" />
      </Tree>,
    );

    expect(screen.queryByText('Скрытый')).not.toBeInTheDocument();
    expect(screen.getByRole('tree')).toBeInTheDocument();
  });

  it('compound children рендерятся', () => {
    renderWithTheme(
      <Tree aria-label="Составное" defaultExpandedIds={['parent']}>
        <Tree.Item id="parent" label="Родитель">
          <Tree.Item id="child" label="Ребёнок" />
        </Tree.Item>
      </Tree>,
    );

    expect(screen.getByText('Родитель')).toBeInTheDocument();
    expect(screen.getByText('Ребёнок')).toBeInTheDocument();
  });

  it('disabled не выбирается', () => {
    const handleSelectedChange = jest.fn();
    renderWithTheme(
      <Tree
        aria-label="Файлы"
        items={sampleItems}
        selectedIds={[]}
        onSelectedChange={handleSelectedChange}
      />,
    );

    fireEvent.click(screen.getByText('Медиа'));
    expect(handleSelectedChange).not.toHaveBeenCalled();
  });

  it('клавиатура ArrowRight раскрывает', () => {
    renderWithTheme(
      <Tree aria-label="Файлы" items={sampleItems} defaultExpandedIds={[]} />,
    );

    const tree = screen.getByRole('tree');
    const docsItem = screen.getByRole('treeitem', { name: /Документы/i });
    fireEvent.focus(docsItem);
    fireEvent.keyDown(tree, { key: 'ArrowRight' });
    expect(screen.getByText('Отчёт')).toBeInTheDocument();
  });

  it('canDrop false блокирует onDrop', () => {
    const handleDrop = jest.fn();
    renderWithTheme(
      <Tree
        aria-label="Файлы"
        items={sampleItems}
        defaultExpandedIds={['docs']}
        draggable
        canDrop={() => false}
        onDrop={handleDrop}
      />,
    );

    const source = screen.getByText('Отчёт').closest('[role="treeitem"]') as HTMLElement;
    const target = screen.getByText('Смета').closest('[role="treeitem"]') as HTMLElement;

    const dataTransfer = {
      setData: jest.fn(),
      getData: jest.fn(() => JSON.stringify(['docs-1'])),
      types: ['application/x-plainerv-tree-id'],
      effectAllowed: 'move',
      dropEffect: 'move',
    };

    fireEvent.dragStart(source, { dataTransfer });
    fireEvent.dragOver(target, { dataTransfer });
    fireEvent.drop(target, { dataTransfer });

    expect(handleDrop).not.toHaveBeenCalled();
  });

  it('onDrop вызывается при успешном drop', () => {
    const handleDrop = jest.fn();
    renderWithTheme(
      <Tree
        aria-label="Файлы"
        items={sampleItems}
        defaultExpandedIds={['docs']}
        draggable
        onDrop={handleDrop}
      />,
    );

    const source = screen.getByText('Отчёт').closest('[role="treeitem"]') as HTMLElement;
    const target = screen.getByText('Смета').closest('[role="treeitem"]') as HTMLElement;

    const dataStore: Record<string, string> = {};
    const dataTransfer = {
      setData: jest.fn((key: string, value: string) => {
        dataStore[key] = value;
      }),
      getData: jest.fn((key: string) => dataStore[key] ?? ''),
      types: ['application/x-plainerv-tree-id'],
      effectAllowed: 'move',
      dropEffect: 'move',
    };

    fireEvent.dragStart(source, { dataTransfer });
    fireEvent.dragOver(target, {
      dataTransfer,
      nativeEvent: { offsetY: 5 },
    });
    fireEvent.drop(target, {
      dataTransfer,
      nativeEvent: { offsetY: 5 },
    });

    expect(handleDrop).toHaveBeenCalledWith(
      expect.objectContaining({
        dragIds: ['docs-1'],
        targetId: 'docs-2',
      }),
    );
  });

  it('onExternalDrop вызывается для внешнего payload', () => {
    const handleExternalDrop = jest.fn();
    renderWithTheme(
      <Tree
        aria-label="Файлы"
        items={sampleItems}
        onExternalDrop={handleExternalDrop}
      />,
    );

    const target = screen.getByText('Документы').closest('[role="treeitem"]') as HTMLElement;
    const dataTransfer = {
      setData: jest.fn(),
      getData: jest.fn(() => 'external'),
      types: ['text/plain'],
      effectAllowed: 'copy',
      dropEffect: 'copy',
    };

    fireEvent.drop(target, { dataTransfer });
    expect(handleExternalDrop).toHaveBeenCalled();
  });
});
