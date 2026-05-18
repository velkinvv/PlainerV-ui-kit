import React from 'react';
import type { DataGridColumn } from '@/types/ui';
import { resolveDataGridExportCellValue } from './dataGridExcelExportCellValueHandlers';

type DemoRow = { id: string; status: string; title: string };

describe('resolveDataGridExportCellValue', () => {
  it('подставляет подпись и exportStyle из enum', () => {
    const column: DataGridColumn<DemoRow> = {
      field: 'status',
      format: {
        type: 'enum',
        options: [
          {
            value: 'active',
            label: 'Активен',
            exportStyle: { textColor: '#1B5E20', backgroundColor: '#E8F5E9' },
          },
        ],
      },
    };
    const cell = resolveDataGridExportCellValue(
      { id: '1', status: 'active', title: 'x' },
      column,
      0,
    );
    expect(cell.text).toBe('Активен');
    expect(cell.style?.textColor).toBe('#1B5E20');
    expect(cell.style?.backgroundColor).toBe('#E8F5E9');
  });

  it('извлекает стиль из Tag (colorVariant)', () => {
    const column: DataGridColumn<DemoRow> = {
      field: 'status',
      render: () => React.createElement('span', { colorVariant: 'danger' }, 'Ошибка'),
    };
    const cell = resolveDataGridExportCellValue(
      { id: '1', status: 'error', title: 'x' },
      column,
      0,
    );
    expect(cell.text).toBe('Ошибка');
    expect(cell.style?.textColor).toBe('#B71C1C');
  });

  it('exportValueGetter может вернуть text и style', () => {
    const column: DataGridColumn<DemoRow> = {
      field: 'status',
      exportValueGetter: () => ({
        text: 'Внимание',
        style: { textColor: '#E65100', backgroundColor: '#FFF3E0' },
      }),
    };
    const cell = resolveDataGridExportCellValue(
      { id: '1', status: 'warning', title: 'x' },
      column,
      0,
    );
    expect(cell.text).toBe('Внимание');
    expect(cell.style?.backgroundColor).toBe('#FFF3E0');
  });
});
