import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/themes/ThemeProvider';
import { Table } from './Table';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { TableRow } from './TableRow';
import { TableCell } from './TableCell';

const renderTable = (stickyHeader: boolean) =>
  render(
    <ThemeProvider applyGlobalStyles={false}>
      <Table stickyHeader={stickyHeader} size="sm" aria-label="Таблица с разделителями строк">
        <TableHead>
          <TableRow>
            <TableCell>Колонка</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Первая</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Вторая</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ThemeProvider>,
  );

describe('Table row dividers', () => {
  it.each([true, false])(
    'при stickyHeader=%s помечает th шапки и tbody td как ячейки с горизонтальным разделителем',
    (stickyHeader) => {
      renderTable(stickyHeader);

      const headCell = screen.getByRole('columnheader', { name: 'Колонка' });
      const firstBodyCell = screen.getByRole('cell', { name: 'Первая' });
      const secondBodyCell = screen.getByRole('cell', { name: 'Вторая' });

      expect(headCell).toHaveAttribute('data-plainer-table-row-divider', 'head');
      expect(firstBodyCell).toHaveAttribute('data-plainer-table-row-divider', 'body');
      expect(secondBodyCell).toHaveAttribute('data-plainer-table-row-divider', 'body');
    },
  );
});
