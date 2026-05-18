import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { DataGridBaseRow, DataGridColumn } from '@/types/ui';
import { Size } from '@/types/sizes';
import { DataGrid } from './DataGrid';

/**
 * Строка демонстрации пресетов `columns[].format`.
 */
interface FormatShowcaseRow extends DataGridBaseRow {
  title: string;
  slug: string;
  phoneDigits: string;
  bankAccountDigits: string;
  cardDigits: string;
  innDigits: string;
  snilsDigits: string;
  balance: number;
  progressRatio: number;
  createdAtIso: string;
  isVerified: boolean;
  roleCode: string;
  inbox: string;
}

const formatShowcaseRows: FormatShowcaseRow[] = [
  {
    id: '1',
    title: 'договор №104',
    slug: 'contract-104',
    phoneDigits: '9161234567',
    bankAccountDigits: '40817810099910004312',
    cardDigits: '4276123456789012',
    innDigits: '7707083893',
    snilsDigits: '11223344595',
    balance: 98234.6,
    progressRatio: 0.375,
    createdAtIso: '2025-03-12T09:15:00',
    isVerified: true,
    roleCode: 'manager',
    inbox: 'client@example.com',
  },
  {
    id: '2',
    title: 'Заявление',
    slug: 'claim-22',
    phoneDigits: '9031112233',
    bankAccountDigits: '30301810400000000825',
    cardDigits: '2200220022002200',
    innDigits: '500100732259',
    snilsDigits: '12847184772',
    balance: 1200,
    progressRatio: 1,
    createdAtIso: '2024-11-01',
    isVerified: false,
    roleCode: 'guest',
    inbox: 'guest@example.org',
  },
];

const formatShowcaseColumns: DataGridColumn<FormatShowcaseRow>[] = [
  {
    field: 'title',
    headerName: 'Документ',
    sortable: true,
    width: 160,
    format: { type: 'text', transform: 'capitalize' },
  },
  {
    field: 'slug',
    headerName: 'Карточка',
    sortable: false,
    width: 200,
    valueGetter: (row) => row.title,
    format: {
      type: 'link',
      href: ({ row: formatRow }) =>
        formatRow != null ? `/docs/${encodeURIComponent(formatRow.slug)}` : '#',
    },
  },
  {
    field: 'phoneDigits',
    headerName: 'Телефон',
    sortable: false,
    width: 168,
    format: { type: 'phone', country: 'RU' },
  },
  {
    field: 'bankAccountDigits',
    headerName: 'Счёт',
    sortable: false,
    width: 200,
    format: { type: 'bankAccount' },
  },
  {
    field: 'cardDigits',
    headerName: 'Карта',
    sortable: false,
    width: 180,
    format: { type: 'bankCard' },
  },
  {
    field: 'innDigits',
    headerName: 'ИНН',
    sortable: false,
    width: 148,
    format: { type: 'inn' },
  },
  {
    field: 'snilsDigits',
    headerName: 'СНИЛС',
    sortable: false,
    width: 148,
    format: { type: 'snils' },
  },
  {
    field: 'balance',
    headerName: 'Сумма',
    align: 'right',
    sortable: true,
    width: 120,
    format: { type: 'currency', currency: 'RUB' },
  },
  {
    field: 'progressRatio',
    headerName: 'Готовность',
    align: 'right',
    sortable: false,
    width: 108,
    format: { type: 'percent', decimals: 1 },
  },
  {
    field: 'createdAtIso',
    headerName: 'Создан',
    sortable: true,
    width: 148,
    format: { type: 'datetime', pattern: 'DD.MM.YYYY HH:mm' },
  },
  {
    field: 'isVerified',
    headerName: 'Проверка',
    sortable: false,
    width: 100,
    format: {
      type: 'boolean',
      trueLabel: 'Да',
      falseLabel: 'Нет',
    },
  },
  {
    field: 'roleCode',
    headerName: 'Роль',
    sortable: false,
    width: 112,
    format: {
      type: 'enum',
      options: {
        manager: 'Менеджер',
        guest: 'Гость',
      },
      fallback: '—',
    },
  },
  {
    field: 'inbox',
    headerName: 'Почта',
    sortable: false,
    width: 200,
    format: {
      type: 'email',
      subject: 'Вопрос по документу',
      label: ({ value }) => String(value),
    },
  },
];

/** Статическая модель сортировки для сторис (без `useMemo` внутри `render`). */
const FORMAT_SHOWCASE_SORT_MODEL = [{ field: 'title', direction: 'asc' as const }];

const meta: Meta<typeof DataGrid> = {
  title: 'UI Kit/Data Display/DataGrid/Column formats',
  component: DataGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Примеры поля `columns[].format`: ссылки (`link`), `phone`, `bankAccount`, `bankCard`, `inn`, `snils`, `currency`, `percent`, `datetime`, `boolean`, `enum`, `email`. Приоритет отображения: `columns[].render` → `renderCell` → `format`.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DataGrid>;

export const BuiltInColumnFormats: Story = {
  name: 'Встроенные форматы колонок',
  render: () => {
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    return (
      <DataGrid<FormatShowcaseRow>
        tableId="story-datagrid-column-formats"
        columns={formatShowcaseColumns}
        rows={formatShowcaseRows}
        totalRows={formatShowcaseRows.length}
        paginationModel={paginationModel}
        onPaginationChange={setPaginationModel}
        sortModel={FORMAT_SHOWCASE_SORT_MODEL}
        size={Size.MD}
        striped
        aria-label="Таблица с форматированием колонок"
      />
    );
  },
};
