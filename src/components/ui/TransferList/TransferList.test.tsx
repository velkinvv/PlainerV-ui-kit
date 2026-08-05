/** Реальный styled-components — иначе мок ломает Checkbox / Input */
jest.unmock('styled-components');

import React, { useState } from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { TransferList } from './TransferList';
import type { TransferListItem } from '../../../types/ui';

const wrap = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const demoItems: TransferListItem[] = [
  { value: '1', label: 'Пункт 1' },
  { value: '2', label: 'Пункт 2' },
  { value: '3', label: 'Пункт 3', disabled: true },
  { value: '4', label: 'Пункт 4', description: 'описание' },
];

describe('TransferList', () => {
  it('basic: переносит выбранный пункт направо', () => {
    const onChange = jest.fn();
    wrap(
      <TransferList
        items={demoItems}
        defaultValue={[]}
        onChange={onChange}
        searchable={false}
        draggable={false}
      />,
    );

    const leftPanel = screen.getByText('Доступные').closest('section');
    expect(leftPanel).toBeTruthy();
    fireEvent.click(within(leftPanel as HTMLElement).getByLabelText('Пункт 1'));
    fireEvent.click(screen.getByRole('button', { name: 'Перенести выбранные вправо' }));

    expect(onChange).toHaveBeenCalled();
    const payload = onChange.mock.calls[0][0];
    expect(payload.rightValue).toContain('1');
    expect(payload.leftValue).not.toContain('1');
    expect(payload.reason).toBe('move');
  });

  it('basic: move all переносит доступные, пропускает disabled', () => {
    const onChange = jest.fn();
    wrap(
      <TransferList
        items={demoItems}
        defaultValue={[]}
        onChange={onChange}
        searchable={false}
        draggable={false}
        showMoveAll
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Перенести все вправо' }));
    const payload = onChange.mock.calls[0][0];
    expect(payload.rightValue.sort()).toEqual(['1', '2', '4']);
    expect(payload.leftValue).toEqual(['3']);
    expect(payload.reason).toBe('move-all');
  });

  it('enhanced: select all отмечает видимые', () => {
    wrap(
      <TransferList
        items={demoItems}
        defaultValue={[]}
        variant="enhanced"
        searchable={false}
        draggable={false}
      />,
    );

    fireEvent.click(screen.getAllByLabelText('Выбрать все')[0]);
    const leftPanel = screen.getByText('Доступные').closest('section') as HTMLElement;
    expect(within(leftPanel).getByLabelText('Пункт 1')).toBeChecked();
    expect(within(leftPanel).getByLabelText('Пункт 2')).toBeChecked();
    expect(within(leftPanel).getByLabelText('Пункт 3')).not.toBeChecked();
  });

  it('простой value контролирует правую панель', () => {
    wrap(
      <TransferList
        items={demoItems}
        value={['2']}
        searchable={false}
        draggable={false}
      />,
    );

    const rightPanel = screen.getByText('Выбранные').closest('section') as HTMLElement;
    expect(within(rightPanel).getByLabelText('Пункт 2')).toBeInTheDocument();
    const leftPanel = screen.getByText('Доступные').closest('section') as HTMLElement;
    expect(within(leftPanel).queryByLabelText('Пункт 2')).toBeNull();
  });

  it('поиск скрывает пункт, но value не меняется', () => {
    const onChange = jest.fn();
    wrap(
      <TransferList
        items={demoItems}
        defaultValue={['1']}
        onChange={onChange}
        searchable
        draggable={false}
        leftSearch="Пункт 2"
      />,
    );

    const leftPanel = screen.getByText('Доступные').closest('section') as HTMLElement;
    expect(within(leftPanel).queryByLabelText('Пункт 4')).toBeNull();
    expect(within(leftPanel).getByLabelText('Пункт 2')).toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('disabled блокирует кнопки', () => {
    wrap(
      <TransferList
        items={demoItems}
        defaultValue={[]}
        disabled
        searchable={false}
        draggable={false}
      />,
    );

    expect(screen.getByRole('button', { name: 'Перенести выбранные вправо' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Перенести все вправо' })).toBeDisabled();
  });

  it('item.disabled нельзя отметить', () => {
    wrap(
      <TransferList
        items={demoItems}
        defaultValue={[]}
        searchable={false}
        draggable={false}
      />,
    );

    expect(screen.getByLabelText('Пункт 3')).toBeDisabled();
  });

  it('controlled onChange при переносе', () => {
    const Harness = () => {
      const [right, setRight] = useState<string[]>([]);
      return (
        <TransferList
          items={demoItems}
          value={right}
          onChange={(payload) => setRight(payload.rightValue)}
          searchable={false}
          draggable={false}
        />
      );
    };
    wrap(<Harness />);
    const leftPanel = screen.getByText('Доступные').closest('section') as HTMLElement;
    fireEvent.click(within(leftPanel).getByLabelText('Пункт 4'));
    fireEvent.click(screen.getByRole('button', { name: 'Перенести выбранные вправо' }));
    const rightPanel = screen.getByText('Выбранные').closest('section') as HTMLElement;
    expect(within(rightPanel).getByLabelText('Пункт 4')).toBeInTheDocument();
  });

  /**
   * Общий mock dataTransfer для HTML5 DnD в jsdom.
   */
  const createTransferListDataTransfer = () => {
    const dataStore: Record<string, string> = {};
    return {
      setData: jest.fn((mimeType: string, value: string) => {
        dataStore[mimeType] = value;
      }),
      getData: jest.fn((mimeType: string) => dataStore[mimeType] ?? ''),
      types: [] as string[],
      effectAllowed: 'all' as string,
      dropEffect: 'move' as string,
    };
  };

  it('dnd: переносит пункт с левой панели на правую (drop на список)', () => {
    const onChange = jest.fn();
    wrap(
      <TransferList
        items={demoItems}
        defaultValue={[]}
        onChange={onChange}
        searchable={false}
        draggable
      />,
    );

    const leftPanel = screen.getByText('Доступные').closest('section') as HTMLElement;
    const rightPanel = screen.getByText('Выбранные').closest('section') as HTMLElement;
    const sourceRow = leftPanel.querySelector('[data-value="1"]') as HTMLElement;
    const targetList = rightPanel.querySelector('[role="list"]') as HTMLElement;
    expect(sourceRow).toBeTruthy();
    expect(targetList).toBeTruthy();

    const dataTransfer = createTransferListDataTransfer();
    fireEvent.dragStart(sourceRow, { dataTransfer });
    expect(dataTransfer.setData).toHaveBeenCalled();
    fireEvent.dragOver(targetList, { dataTransfer });
    fireEvent.drop(targetList, { dataTransfer });

    expect(onChange).toHaveBeenCalled();
    const payload = onChange.mock.calls[0][0];
    expect(payload.reason).toBe('dnd');
    expect(payload.rightValue).toContain('1');
    expect(payload.leftValue).not.toContain('1');
  });

  it('dnd: reorder внутри правой панели', () => {
    const onChange = jest.fn();
    wrap(
      <TransferList
        items={demoItems}
        defaultValue={['1', '2', '4']}
        onChange={onChange}
        searchable={false}
        draggable
      />,
    );

    const rightPanel = screen.getByText('Выбранные').closest('section') as HTMLElement;
    const sourceRow = rightPanel.querySelector('[data-value="4"]') as HTMLElement;
    const targetRow = rightPanel.querySelector('[data-value="1"]') as HTMLElement;
    expect(sourceRow).toBeTruthy();
    expect(targetRow).toBeTruthy();

    const dataTransfer = createTransferListDataTransfer();
    fireEvent.dragStart(sourceRow, { dataTransfer });
    fireEvent.dragOver(targetRow, { dataTransfer });
    fireEvent.drop(targetRow, { dataTransfer });

    expect(onChange).toHaveBeenCalled();
    const payload = onChange.mock.calls[0][0];
    expect(payload.reason).toBe('reorder');
    // В jsdom rect/clientY дают placeAfter → «4» сразу после «1»
    expect(payload.rightValue).toEqual(['1', '4', '2']);
    expect(payload.leftValue).toEqual(['3']);
  });

  it('dnd: disabled не даёт dragStart', () => {
    const onChange = jest.fn();
    wrap(
      <TransferList
        items={demoItems}
        defaultValue={[]}
        onChange={onChange}
        searchable={false}
        draggable
        disabled
      />,
    );

    const leftPanel = screen.getByText('Доступные').closest('section') as HTMLElement;
    const sourceRow = leftPanel.querySelector('[data-value="1"]') as HTMLElement;
    const dataTransfer = createTransferListDataTransfer();
    fireEvent.dragStart(sourceRow, { dataTransfer });

    expect(dataTransfer.setData).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });
});
