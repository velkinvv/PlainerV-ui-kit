import type { DragEvent } from 'react';
import {
  applyDataGridColDragGhostPreview,
  applyDataGridRowDragGhostPreview,
  DATA_GRID_COL_DRAG_FALLBACK_WIDTH_PX,
  getDataGridCellValue,
  getDataGridColDragDisplacementPx,
  getDataGridRowDragDisplacementPx,
  reorderByIndex,
  resolveDataGridExpandedRowDataStatus,
  sliceRowsForPagination,
} from './dataGridHandlers';
import type { DataGridBaseRow } from '@/types/ui';

type R = DataGridBaseRow & { user: { name: string }; age: number };

describe('dataGridHandlers', () => {
  it('sliceRowsForPagination ╤А╨╡╨╢╨╡╤В ╤Б╤В╤А╨░╨╜╨╕╤Ж╤Г', () => {
    const rows: R[] = [
      { id: '1', user: { name: 'a' }, age: 1 },
      { id: '2', user: { name: 'b' }, age: 2 },
      { id: '3', user: { name: 'c' }, age: 3 },
    ];
    expect(sliceRowsForPagination(rows, { page: 0, pageSize: 2 }).map((r) => r.id)).toEqual([
      '1',
      '2',
    ]);
    expect(sliceRowsForPagination(rows, { page: 1, pageSize: 2 }).map((r) => r.id)).toEqual(['3']);
  });

  it('getDataGridCellValue ╤З╨╕╤В╨░╨╡╤В ╨▓╨╗╨╛╨╢╨╡╨╜╨╜╨╛╨╡ ╨┐╨╛╨╗╨╡ ╨┐╨╛ ╤В╨╛╤З╨║╨╡', () => {
    const row: R = { id: '1', user: { name: 'Ann' }, age: 20 };
    expect(getDataGridCellValue(row, 'user.name')).toBe('Ann');
    expect(getDataGridCellValue(row, 'age')).toBe(20);
  });

  it('reorderByIndex ╨┐╨╡╤А╨╡╤Б╤В╨░╨▓╨╗╤П╨╡╤В ╤Н╨╗╨╡╨╝╨╡╨╜╤В', () => {
    expect(reorderByIndex([1, 2, 3], 0, 2)).toEqual([2, 3, 1]);
  });

  it('resolveDataGridExpandedRowDataStatus учитывает явный статус и getExpandedRowLoading', () => {
    const row = { id: '1' };
    expect(
      resolveDataGridExpandedRowDataStatus(row, {
        getExpandedRowDataStatus: () => 'error',
        getExpandedRowLoading: () => true,
      }),
    ).toBe('error');
    expect(
      resolveDataGridExpandedRowDataStatus(row, {
        getExpandedRowLoading: () => true,
      }),
    ).toBe('loading');
    expect(resolveDataGridExpandedRowDataStatus(row, {})).toBe('ready');
  });

  it('applyDataGridRowDragGhostPreview задаёт превью строки через dataTransfer', () => {
    const rowElement = document.createElement('tr');
    const dragHandle = document.createElement('span');
    rowElement.appendChild(dragHandle);
    document.body.appendChild(rowElement);
    rowElement.getBoundingClientRect = () =>
      ({
        left: 100,
        top: 200,
        width: 300,
        height: 44,
        right: 400,
        bottom: 244,
        x: 100,
        y: 200,
        toJSON: () => ({}),
      }) as DOMRect;
    const setDragImage = jest.fn();
    const dataTransfer = { setDragImage } as unknown as DataTransfer;
    const event = {
      currentTarget: dragHandle,
      clientX: 160,
      clientY: 222,
      dataTransfer,
    } as DragEvent<HTMLElement>;
    applyDataGridRowDragGhostPreview(event);
    expect(setDragImage).toHaveBeenCalledTimes(1);
    expect(setDragImage.mock.calls[0]?.[0]).toBe(rowElement);
    expect(setDragImage.mock.calls[0]?.[1]).toBe(60);
    expect(setDragImage.mock.calls[0]?.[2]).toBe(22);
    document.body.removeChild(rowElement);
  });

  it('getDataGridRowDragDisplacementPx сдвигает диапазон строк к цели вставки', () => {
    const height = 40;
    expect(getDataGridRowDragDisplacementPx(1, 2, 5, height)).toBe(0);
    expect(getDataGridRowDragDisplacementPx(3, 2, 5, height)).toBe(-height);
    expect(getDataGridRowDragDisplacementPx(5, 2, 5, height)).toBe(-height);
    expect(getDataGridRowDragDisplacementPx(2, 2, 5, height)).toBe(0);
    expect(getDataGridRowDragDisplacementPx(3, 5, 2, height)).toBe(height);
    expect(getDataGridRowDragDisplacementPx(2, 5, 2, height)).toBe(height);
    expect(getDataGridRowDragDisplacementPx(5, 5, 2, height)).toBe(0);
  });

  it('getDataGridColDragDisplacementPx совпадает с построчной логикой для тех же индексов', () => {
    expect(getDataGridColDragDisplacementPx(3, 2, 5, 100)).toBe(
      getDataGridRowDragDisplacementPx(3, 2, 5, 100),
    );
    expect(getDataGridColDragDisplacementPx(2, 5, 2, 0)).toBe(
      getDataGridRowDragDisplacementPx(2, 5, 2, DATA_GRID_COL_DRAG_FALLBACK_WIDTH_PX),
    );
  });

  it('applyDataGridColDragGhostPreview задаёт превью ячейки заголовка', () => {
    const th = document.createElement('th');
    document.body.appendChild(th);
    th.getBoundingClientRect = () =>
      ({
        left: 50,
        top: 60,
        width: 180,
        height: 48,
        right: 230,
        bottom: 108,
        x: 50,
        y: 60,
        toJSON: () => ({}),
      }) as DOMRect;
    const setDragImage = jest.fn();
    const dataTransfer = { setDragImage } as unknown as DataTransfer;
    const event = {
      currentTarget: th,
      clientX: 100,
      clientY: 80,
      dataTransfer,
    } as DragEvent<HTMLElement>;
    applyDataGridColDragGhostPreview(event);
    expect(setDragImage.mock.calls[0]?.[0]).toBe(th);
    expect(setDragImage.mock.calls[0]?.[1]).toBe(50);
    expect(setDragImage.mock.calls[0]?.[2]).toBe(20);
    document.body.removeChild(th);
  });
});
