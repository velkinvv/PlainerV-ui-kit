import type { Meta } from '@storybook/react';
import { DataGrid } from './DataGrid';
import legacyMeta, {
  EmptyState,
  ExpandAndLoading,
  ExpandLazyRowData,
  HideFooterFlatCard,
} from './DataGrid.stories.legacy';

const meta: Meta<typeof DataGrid> = {
  ...(legacyMeta as Meta<typeof DataGrid>),
  title: 'UI Kit/Data Display/DataGrid/EmptyAndLoading',
};

export default meta;

export { EmptyState, ExpandAndLoading, ExpandLazyRowData, HideFooterFlatCard };
