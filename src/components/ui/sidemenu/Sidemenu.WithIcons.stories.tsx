import type { Meta } from '@storybook/react';
import { Sidemenu } from './Sidemenu';
import legacyMeta, {
  MenuItemStatuses,
  MultipleNotifications,
  WithNotifications,
} from './Sidemenu.stories.legacy';

const meta: Meta<typeof Sidemenu> = {
  ...(legacyMeta as Meta<typeof Sidemenu>),
  title: 'UI Kit/Navigation/Sidemenu/WithIcons',
};

export default meta;

export { MenuItemStatuses, MultipleNotifications, WithNotifications };
