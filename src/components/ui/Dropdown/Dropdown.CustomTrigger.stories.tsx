import type { Meta } from '@storybook/react';
import { Dropdown } from './Dropdown';
import legacyMeta, { CustomPortalContainer, CustomTrigger } from './Dropdown.stories.legacy';

const meta: Meta<typeof Dropdown> = {
  ...(legacyMeta as Meta<typeof Dropdown>),
  title: 'UI Kit/Navigation/Dropdown/CustomTrigger',
};

export default meta;

export { CustomPortalContainer, CustomTrigger };
