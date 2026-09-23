import type { Meta } from '@storybook/react';
import { Dropdown } from './Dropdown';
import legacyMeta, {
  CustomContainerMixin,
  CustomContainerStyle,
  SmartPositioning,
} from './Dropdown.stories.legacy';

const meta: Meta<typeof Dropdown> = {
  ...(legacyMeta as Meta<typeof Dropdown>),
  title: 'UI Kit/Navigation/Dropdown/Placement',
};

export default meta;

export { CustomContainerMixin, CustomContainerStyle, SmartPositioning };
