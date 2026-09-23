import type { Meta } from '@storybook/react';
import { Sidemenu } from './Sidemenu';
import legacyMeta, {
  Collapsed,
  ExpandPanelCustomToggle,
  ExpandPanelOnClick,
  ExpandPanelOnHover,
  ExpandPanelToggleButton,
} from './Sidemenu.stories.legacy';

const meta: Meta<typeof Sidemenu> = {
  ...(legacyMeta as Meta<typeof Sidemenu>),
  title: 'UI Kit/Navigation/Sidemenu/Collapsed',
};

export default meta;

export {
  Collapsed,
  ExpandPanelCustomToggle,
  ExpandPanelOnClick,
  ExpandPanelOnHover,
  ExpandPanelToggleButton,
};
