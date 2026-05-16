import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  TableContainer,
  TableContainerScroll,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from './index';
import { TableCellFormatted } from './TableCellFormatted';

const meta: Meta<typeof TableCellFormatted> = {
  title: 'UI Kit/Data Display/Table/TableCellFormatted',
  component: TableCellFormatted,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Ячейка с теми же пресетами, что и `columns[].format` у **DataGrid**: передайте `value`, опционально `row`, и объект `format`. Если заданы `children`, они имеют приоритет над `format`.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TableCellFormatted>;

export const PhoneAndCurrencyCells: Story = {
  name: 'Маска телефона и валюта',
  render: () => (
    <TableContainer elevated>
      <TableContainerScroll>
        <Table size="md" striped aria-label="Пример TableCellFormatted">
          <TableHead>
            <TableRow>
              <TableCell>Телефон</TableCell>
              <TableCell align="right">Цена</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCellFormatted
                value="9161234567"
                field="phone"
                row={{ phone: '9161234567' }}
                format={{ type: 'phone', country: 'RU' }}
              />
              <TableCellFormatted
                align="right"
                value={15499}
                field="price"
                format={{ type: 'currency', currency: 'RUB' }}
              />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainerScroll>
    </TableContainer>
  ),
};
