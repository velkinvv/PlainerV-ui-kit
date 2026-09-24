import type { Meta } from '@storybook/react';
import legacyMeta from './Hint.stories.legacy';

const meta: Meta = {
  ...legacyMeta,
  title: 'UI Kit/Feedback/Hint/States',
};

export default meta;

export {
  DefaultVariant,
  Info,
  Success,
  Warning,
  Error,
  Sizes,
  AllVariants,
  DifferentDelays,
  WithIcons,
  ArrowDemo,
} from './Hint.stories.legacy';
