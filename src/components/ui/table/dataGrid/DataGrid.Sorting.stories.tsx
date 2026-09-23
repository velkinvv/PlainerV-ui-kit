import type { Meta } from '@storybook/react';
import { DataGrid } from './DataGrid';
import legacyMeta, { MultiColumnSort } from './DataGrid.stories.legacy';

const meta: Meta<typeof DataGrid> = {
  ...(legacyMeta as Meta<typeof DataGrid>),
  title: 'UI Kit/Data Display/DataGrid/Sorting',
};

export default meta;

export { MultiColumnSort };
