import type { Meta } from '@storybook/react';
import { DataGrid } from './DataGrid';
import legacyMeta, {
  HeaderToolbarBuiltinActions,
  RenderRowWrapper,
  RowReorder,
} from './DataGrid.stories.legacy';

const meta: Meta<typeof DataGrid> = {
  ...(legacyMeta as Meta<typeof DataGrid>),
  title: 'UI Kit/Data Display/DataGrid/Editing',
};

export default meta;

export { HeaderToolbarBuiltinActions, RenderRowWrapper, RowReorder };
