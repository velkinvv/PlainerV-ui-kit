import type { Meta } from '@storybook/react';
import { DataGrid } from './DataGrid';
import legacyMeta, {
  ColumnBackgroundByColumnColor,
  ColumnReorder,
  ColumnResize,
  FitColumnsNoHorizontalScroll,
  GlobalRenderCell,
  HeaderMaxLines,
  ManyColumnsHorizontalScroll,
  ManyColumnsHorizontalScrollHeaderToolbar,
  ManyColumnsHorizontalScrollShellInset,
} from './DataGrid.stories.legacy';

const meta: Meta<typeof DataGrid> = {
  ...(legacyMeta as Meta<typeof DataGrid>),
  title: 'UI Kit/Data Display/DataGrid/Columns',
};

export default meta;

export {
  ColumnBackgroundByColumnColor,
  ColumnReorder,
  ColumnResize,
  FitColumnsNoHorizontalScroll,
  GlobalRenderCell,
  HeaderMaxLines,
  ManyColumnsHorizontalScroll,
  ManyColumnsHorizontalScrollHeaderToolbar,
  ManyColumnsHorizontalScrollShellInset,
};
