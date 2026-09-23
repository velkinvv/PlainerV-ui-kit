import type { Meta } from '@storybook/react';
import { Sidemenu } from './Sidemenu';
import legacyMeta, {
  EdgeAttachedOffScreenInteractive,
  OffScreenHoverReveal,
  OffScreenHoverRevealCollapsed,
  OffScreenHoverRevealExpandOnClick,
  OffScreenHoverRevealExpandOnHover,
} from './Sidemenu.stories.legacy';

const meta: Meta<typeof Sidemenu> = {
  ...(legacyMeta as Meta<typeof Sidemenu>),
  title: 'UI Kit/Navigation/Sidemenu/Mobile',
};

export default meta;

export {
  EdgeAttachedOffScreenInteractive,
  OffScreenHoverReveal,
  OffScreenHoverRevealCollapsed,
  OffScreenHoverRevealExpandOnClick,
  OffScreenHoverRevealExpandOnHover,
};
