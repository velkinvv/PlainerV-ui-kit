import type { Meta } from '@storybook/react';
import legacyMeta from './Carousel.stories.legacy';

const meta: Meta = {
  ...legacyMeta,
  title: 'UI Kit/Data Display/Carousel/Autoplay',
};

export default meta;

export {
  Autoplay,
  AutoplayProgress,
  ProgressBar,
  Loop,
  Random,
  RandomSeed,
} from './Carousel.stories.legacy';
