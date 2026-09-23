import type { Meta } from '@storybook/react';
import { Dropdown } from './Dropdown';
import legacyMeta, {
  MultiSelection,
  MultiSelectionWithDisabled,
  MultiSelectionWithoutHighlight,
  TreeMultiSelect,
  TreeMultiSelectCollapsedDefault,
  TreeMultiSelectControlledBranches,
} from './Dropdown.stories.legacy';

const meta: Meta<typeof Dropdown> = {
  ...(legacyMeta as Meta<typeof Dropdown>),
  title: 'UI Kit/Navigation/Dropdown/MultiSelect',
};

export default meta;

export {
  MultiSelection,
  MultiSelectionWithDisabled,
  MultiSelectionWithoutHighlight,
  TreeMultiSelect,
  TreeMultiSelectCollapsedDefault,
  TreeMultiSelectControlledBranches,
};
