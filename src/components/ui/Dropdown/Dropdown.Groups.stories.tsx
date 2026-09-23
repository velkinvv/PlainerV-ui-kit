import type { Meta } from '@storybook/react';
import { Dropdown } from './Dropdown';
import legacyMeta, { GroupedItems } from './Dropdown.stories.legacy';

const meta: Meta<typeof Dropdown> = {
  ...(legacyMeta as Meta<typeof Dropdown>),
  title: 'UI Kit/Navigation/Dropdown/Groups',
};

export default meta;

export { GroupedItems };
