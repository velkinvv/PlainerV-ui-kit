import type { Meta } from '@storybook/react';
import { Sidemenu } from './Sidemenu';
import legacyMeta, {
  MenuNestedItems,
  MenuNestedItemsCollapsedFlyout,
} from './Sidemenu.stories.legacy';

const meta: Meta<typeof Sidemenu> = {
  ...(legacyMeta as Meta<typeof Sidemenu>),
  title: 'UI Kit/Navigation/Sidemenu/Nested',
};

export default meta;

export { MenuNestedItems, MenuNestedItemsCollapsedFlyout };
