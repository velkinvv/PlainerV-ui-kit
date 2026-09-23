import type { Meta } from '@storybook/react';
import { DataGrid } from './DataGrid';
import legacyMeta, {
  BuiltinColumnFilterIcon,
  ColumnFilterInHeader,
  FilterIconCustomization,
  FilterIconCustomNode,
  FilterIconPositions,
} from './DataGrid.stories.legacy';

const meta: Meta<typeof DataGrid> = {
  ...(legacyMeta as Meta<typeof DataGrid>),
  title: 'UI Kit/Data Display/DataGrid/Filtering',
};

export default meta;

export {
  BuiltinColumnFilterIcon,
  ColumnFilterInHeader,
  FilterIconCustomization,
  FilterIconCustomNode,
  FilterIconPositions,
};
