import { DataGrid } from './DataGrid';
import type { DataGridColumn } from '../../../../types/ui';
import { Size } from '../../../../types/sizes';
import { defineComponentDocs } from '../../../../docs/defineComponentDocs';

type EmployeeRow = {
  id: string;
  name: string;
  role: string;
  status: string;
};

const employeeColumns: DataGridColumn<EmployeeRow>[] = [
  { field: 'name', headerName: 'Имя', sortable: true },
  { field: 'role', headerName: 'Роль', sortable: true },
  { field: 'status', headerName: 'Статус' },
];

const employeeRows: EmployeeRow[] = [
  { id: 'u-1', name: 'Анна Иванова', role: 'Designer', status: 'Active' },
  { id: 'u-2', name: 'Иван Петров', role: 'Frontend', status: 'Pending' },
  { id: 'u-3', name: 'Мария Смирнова', role: 'QA', status: 'Active' },
];

export default defineComponentDocs({
  meta: {
    name: 'DataGrid',
    group: 'Data Display',
    platform: 'web',
    since: '0.3.4',
    status: 'beta',
    description: 'Таблица с сортировкой, пагинацией, выбором строк и расширяемой конфигурацией колонок.',
  },
  examples: [
    {
      id: 'basic-grid',
      title: 'Базовая таблица',
      description: 'Минимальный grid с колонками и строками.',
      code: '<DataGrid tableId="employees-grid" columns={employeeColumns} rows={employeeRows} totalRows={employeeRows.length} size={Size.MD} />',
      render: () => (
        <DataGrid
          tableId="employees-grid"
          columns={employeeColumns}
          rows={employeeRows}
          totalRows={employeeRows.length}
          size={Size.MD}
        />
      ),
      showCode: true,
      themes: ['theme', 'colorMode'],
      layout: 'block',
    },
    {
      id: 'with-row-selection',
      title: 'Выбор строк',
      description: 'Показывает колонку выбора и множественный выбор.',
      code: '<DataGrid tableId="employees-grid-selection" columns={employeeColumns} rows={employeeRows} totalRows={employeeRows.length} displayRowSelectionColumn multiselect />',
      render: () => (
        <DataGrid
          tableId="employees-grid-selection"
          columns={employeeColumns}
          rows={employeeRows}
          totalRows={employeeRows.length}
          displayRowSelectionColumn
          multiselect
        />
      ),
      showCode: true,
      themes: ['theme', 'colorMode'],
      layout: 'block',
    },
  ],
  props: {
    mode: 'autogen',
  },
  a11y: {
    roles: ['table', 'row', 'columnheader', 'cell'],
    keyboard: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
  },
  related: [
    { name: 'Table', href: '/components/table' },
    { name: 'Pagination', href: '/components/pagination' },
  ],
});
