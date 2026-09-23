import type { Meta } from '@storybook/react';
import { Sidemenu } from './Sidemenu';
import legacyMeta, {
  DynamicHeight,
  DynamicHeightRemoveSelected,
} from './Sidemenu.stories.legacy';

const meta: Meta<typeof Sidemenu> = {
  ...(legacyMeta as Meta<typeof Sidemenu>),
  title: 'UI Kit/Navigation/Sidemenu/Active',
};

export default meta;

export { DynamicHeight, DynamicHeightRemoveSelected };
