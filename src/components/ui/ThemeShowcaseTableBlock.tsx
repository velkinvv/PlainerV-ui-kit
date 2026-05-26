import React from 'react';
import {
  TableContainer,
  TableContainerScroll,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from './table';

const tableRows = [
  { id: '1', name: 'Йогурт', calories: 159 },
  { id: '2', name: 'Мороженое', calories: 237 },
  { id: '3', name: 'Эклер', calories: 262 },
];

/**
 * Компактная таблица для Theme Showcase.
 */
export const ThemeShowcaseTableBlock = () => (
  <TableContainer elevated>
    <TableContainerScroll>
      <Table size="md" striped aria-label="Пример таблицы в Theme Showcase">
        <TableHead>
          <TableRow>
            <TableCell>Блюдо</TableCell>
            <TableCell align="right">Ккал</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((rowItem) => (
            <TableRow key={rowItem.id}>
              <TableCell>{rowItem.name}</TableCell>
              <TableCell align="right">{rowItem.calories}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainerScroll>
  </TableContainer>
);
