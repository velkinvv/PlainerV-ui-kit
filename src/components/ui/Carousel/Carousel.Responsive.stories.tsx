import type { Meta } from '@storybook/react';
import legacyMeta from './Carousel.stories.legacy';

const meta: Meta = {
  ...legacyMeta,
  title: 'UI Kit/Data Display/Carousel/Responsive',
};

export default meta;

export {
  Sizes as Responsive,
  NarrowContainer,
  Fullscreen,
  Vertical,
  GlassVibrancy,
} from './Carousel.stories.legacy';
