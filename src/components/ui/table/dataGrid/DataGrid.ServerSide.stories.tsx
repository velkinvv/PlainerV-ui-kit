import type { Meta } from '@storybook/react';
import { DataGrid } from './DataGrid';
import legacyMeta, { ExcelExport, ServerPaginationMode } from './DataGrid.stories.legacy';

const meta: Meta<typeof DataGrid> = {
  ...(legacyMeta as Meta<typeof DataGrid>),
  title: 'UI Kit/Data Display/DataGrid/ServerSide',
};

export default meta;

export { ExcelExport, ServerPaginationMode };
