import type { Meta } from '@storybook/react';
import legacyMeta from './Carousel.stories.legacy';

const meta: Meta = {
  ...legacyMeta,
  title: 'UI Kit/Data Display/Carousel/CustomControls',
};

export default meta;

export {
  ArrowsOnly,
  DotsOnly,
  DotsInner,
  DotsOuter,
  NoControls,
  Controlled,
  SlideEvents,
} from './Carousel.stories.legacy';
