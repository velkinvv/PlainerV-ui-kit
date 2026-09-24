import type { Meta } from '@storybook/react';
import legacyMeta from './Hint.stories.legacy';

const meta: Meta = {
  ...legacyMeta,
  title: 'UI Kit/Feedback/Hint/Trigger',
};

export default meta;

export {
  ClickMode,
  WithVisibilityChange,
  WithHintClick,
  ControlledMode,
  UncontrolledMode,
  ControlledWithClick,
  CloseOnScroll,
} from './Hint.stories.legacy';
