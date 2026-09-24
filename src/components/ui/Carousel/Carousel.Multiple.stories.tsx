import type { Meta } from '@storybook/react';
import legacyMeta from './Carousel.stories.legacy';

const meta: Meta = {
  ...legacyMeta,
  title: 'UI Kit/Data Display/Carousel/Multiple',
};

export default meta;

export {
  ItemsFromData as Multiple,
  Thumbnails,
  ThumbnailsWithNavigation,
  SlideIdControl,
} from './Carousel.stories.legacy';
