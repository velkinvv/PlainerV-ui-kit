import type { Meta } from '@storybook/react';
import { DataGrid } from './DataGrid';
import legacyMeta, {
  ClientPagination,
  ClientPaginationPlainBody,
  CompactPaginationHideRowsSelect,
  CompactRowsPerPageSelect,
  PaginationToolbarCentered,
  PaginationToolbarReversed,
} from './DataGrid.stories.legacy';

const meta: Meta<typeof DataGrid> = {
  ...(legacyMeta as Meta<typeof DataGrid>),
  title: 'UI Kit/Data Display/DataGrid/Pagination',
};

export default meta;

export {
  ClientPagination,
  ClientPaginationPlainBody,
  CompactPaginationHideRowsSelect,
  CompactRowsPerPageSelect,
  PaginationToolbarCentered,
  PaginationToolbarReversed,
};
