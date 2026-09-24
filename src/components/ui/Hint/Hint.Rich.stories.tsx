import type { Meta } from '@storybook/react';
import legacyMeta from './Hint.stories.legacy';

const meta: Meta = {
  ...legacyMeta,
  title: 'UI Kit/Feedback/Hint/Rich',
};

export default meta;

export {
  TourGuide,
  ArrowsWithVariants,
  ArrowsCornerPositions,
  WithAnchorCssMixin,
} from './Hint.stories.legacy';
