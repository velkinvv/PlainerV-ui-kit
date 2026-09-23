import type { Meta } from '@storybook/react';
import { DataGrid } from './DataGrid';
import legacyMeta, { RowClickHandlers, SingleSelect } from './DataGrid.stories.legacy';

const meta: Meta<typeof DataGrid> = {
  ...(legacyMeta as Meta<typeof DataGrid>),
  title: 'UI Kit/Data Display/DataGrid/Selection',
};

export default meta;

export { RowClickHandlers, SingleSelect };
